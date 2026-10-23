import { useEffect, useRef, useState } from "react";
import ToolPage from "./ToolPage.jsx";

const PHASES = {
  focus: { label: "Focus block", short: "Focus" },
  short: { label: "Short break", short: "Break" },
  long: { label: "Long break", short: "Long break" },
};

function formatClock(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function durationFor(mode, durations) {
  return durations[mode] * 60;
}

export default function PomodoroTimer() {
  const [durations, setDurations] = useState({
    focus: 25,
    short: 5,
    long: 15,
    rounds: 4,
  });
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [autoStart, setAutoStart] = useState(false);
  const [completedFocus, setCompletedFocus] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [log, setLog] = useState([]);

  const deadlineRef = useRef(null);
  const modeRef = useRef(mode);
  const durationsRef = useRef(durations);
  const completedRef = useRef(completedFocus);
  const autoStartRef = useRef(autoStart);
  const audioRef = useRef(null);

  modeRef.current = mode;
  durationsRef.current = durations;
  completedRef.current = completedFocus;
  autoStartRef.current = autoStart;

  const primeAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      if (!audioRef.current) audioRef.current = new AudioContextClass();
      const context = audioRef.current;
      if (context.state === "suspended") context.resume();
      return context;
    } catch {
      return null;
    }
  };

  const beep = () => {
    try {
      const context = primeAudio();
      if (!context) return;

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.55);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.6);
    } catch {
      // Audio is optional; the visual phase change is the primary signal.
    }
  };

  const enterPhase = (nextMode, options = {}) => {
    const nextDurations = durationsRef.current;
    const nextSeconds = durationFor(nextMode, nextDurations);
    modeRef.current = nextMode;
    setMode(nextMode);
    setSecondsLeft(nextSeconds);

    if (options.run) {
      deadlineRef.current = Date.now() + nextSeconds * 1000;
      setRunning(true);
    } else {
      deadlineRef.current = null;
      setRunning(false);
    }
  };

  const finishPhase = () => {
    const finishedMode = modeRef.current;
    const currentDurations = durationsRef.current;

    if (finishedMode === "focus") {
      const nextCompleted = completedRef.current + 1;
      completedRef.current = nextCompleted;
      setCompletedFocus(nextCompleted);
      setFocusMinutes((total) => total + currentDurations.focus);

      setLog((entries) => [
        {
          id: `${Date.now()}-${entries.length}`,
          label: "Focus block completed",
          detail: `${currentDurations.focus} minute${currentDurations.focus === 1 ? "" : "s"}`,
          at: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...entries,
      ].slice(0, 20));

      const nextMode =
        nextCompleted % currentDurations.rounds === 0 ? "long" : "short";
      beep();
      enterPhase(nextMode, { run: autoStartRef.current });
    } else {
      setLog((entries) => [
        {
          id: `${Date.now()}-${entries.length}`,
          label: `${PHASES[finishedMode].label} finished`,
          detail: "Back to focus",
          at: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...entries,
      ].slice(0, 20));

      beep();
      enterPhase("focus", { run: autoStartRef.current });
    }
  };

  useEffect(() => {
    if (!running) return undefined;

    const tick = () => {
      if (!deadlineRef.current) return;

      const remaining = Math.max(
        0,
        Math.ceil((deadlineRef.current - Date.now()) / 1000)
      );
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        finishPhase();
      }
    };

    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [running]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.close().catch(() => {});
    };
  }, []);

  const start = () => {
    const base = secondsLeft > 0 ? secondsLeft : durationFor(mode, durations);
    if (secondsLeft <= 0) setSecondsLeft(base);
    deadlineRef.current = Date.now() + base * 1000;
    setRunning(true);
    primeAudio();
  };

  const pause = () => {
    const remaining = Math.max(
      0,
      Math.ceil((deadlineRef.current - Date.now()) / 1000)
    );
    setSecondsLeft(remaining);
    deadlineRef.current = null;
    setRunning(false);
  };

  const resetTimer = () => {
    deadlineRef.current = null;
    setRunning(false);
    setSecondsLeft(durationFor(mode, durations));
  };

  const resetSession = () => {
    deadlineRef.current = null;
    setRunning(false);
    setCompletedFocus(0);
    completedRef.current = 0;
    setFocusMinutes(0);
    setLog([]);
    enterPhase("focus");
  };

  const changeDuration = (name, value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) return;

    const nextDurations = { ...durations, [name]: Math.round(parsed) };
    setDurations(nextDurations);

    if (!running && name === mode) {
      setSecondsLeft(durationFor(mode, nextDurations));
    }
  };

  const totalSeconds = durationFor(mode, durations);
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const cycleRound = completedFocus % durations.rounds;

  return (
    <ToolPage
      title="Pomodoro Timer"
      kicker="Productivity tool"
      description="Run focus blocks with short and long breaks, track completed rounds, and keep a session log. The timer runs in this tab without an account."
      seoTitle="Pomodoro Timer - Focus Blocks and Breaks | CALVORO"
      seoDescription="Use a free Pomodoro timer in your browser. Set focus and break lengths, track rounds, auto-start breaks, and review a session log."
      steps={[
        "Set the focus and break lengths, then press Start.",
        "Work until the chime, then take the break the timer selects.",
        "After four focus rounds by default, the timer offers a longer break.",
      ]}
      notes={[
        "The timer uses your device clock and keeps running when you switch tabs. Browsers may throttle background timers, but the remaining time is recalculated from the clock, so it stays accurate.",
        "The chime needs an audio context that is started by a click. Pressing Start once enables it for later phase changes.",
        "The session log is temporary. Reloading the page clears the completed rounds and log entries.",
      ]}
      related={[
        { name: "Word and Character Counter", path: "/word-counter" },
        { name: "Text Cleanup", path: "/text-cleanup" },
        { name: "JSON Formatter and Validator", path: "/json-formatter" },
      ]}
    >
      <div className="calvoro-timer-card">
        <span className="calvoro-timer-phase">{PHASES[mode].label}</span>
        <div
          className="calvoro-timer-display"
          role="timer"
          aria-live="off"
          aria-label={`${PHASES[mode].label}: ${formatClock(secondsLeft)} remaining`}
        >
          {formatClock(secondsLeft)}
        </div>

        <div className="calvoro-timer-rounds">
          <span>Round {Math.min(cycleRound + 1, durations.rounds)} of {durations.rounds}</span>
          <span aria-hidden="true">·</span>
          {Array.from({ length: durations.rounds }, (_, index) => (
            <span
              key={index}
              className={
                index < cycleRound
                  ? "calvoro-timer-round is-done"
                  : "calvoro-timer-round"
              }
            />
          ))}
        </div>

        <div className="calvoro-tool-actions" style={{ justifyContent: "center" }}>
          {running ? (
            <button type="button" className="calvoro-tool-button" onClick={pause}>
              Pause
            </button>
          ) : (
            <button type="button" className="calvoro-tool-button" onClick={start}>
              Start
            </button>
          )}
          <button
            type="button"
            className="calvoro-tool-button is-secondary"
            onClick={resetTimer}
            disabled={secondsLeft === totalSeconds && !running}
          >
            Reset timer
          </button>
          <button
            type="button"
            className="calvoro-tool-button is-secondary"
            onClick={resetSession}
            disabled={completedFocus === 0 && log.length === 0 && !running}
          >
            Reset session
          </button>
        </div>

        <div style={{ width: "100%" }} aria-hidden="true">
          <div className="calvoro-strength-track" style={{ marginTop: 0 }}>
            <span
              className="is-strong"
              style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            />
          </div>
        </div>
      </div>

      <div className="calvoro-timer-settings">
        <div className="calvoro-field">
          <label htmlFor="focus-minutes">Focus length (minutes)</label>
          <input
            id="focus-minutes"
            type="number"
            min="1"
            max="90"
            value={durations.focus}
            onChange={(event) => changeDuration("focus", event.target.value)}
            disabled={running}
          />
        </div>
        <div className="calvoro-field">
          <label htmlFor="short-minutes">Short break (minutes)</label>
          <input
            id="short-minutes"
            type="number"
            min="1"
            max="30"
            value={durations.short}
            onChange={(event) => changeDuration("short", event.target.value)}
            disabled={running}
          />
        </div>
        <div className="calvoro-field">
          <label htmlFor="long-minutes">Long break (minutes)</label>
          <input
            id="long-minutes"
            type="number"
            min="1"
            max="60"
            value={durations.long}
            onChange={(event) => changeDuration("long", event.target.value)}
            disabled={running}
          />
        </div>
      </div>

      <div className="calvoro-tool-grid" style={{ marginTop: 14 }}>
        <div className="calvoro-field">
          <label htmlFor="round-count">Focus rounds before a long break</label>
          <input
            id="round-count"
            type="number"
            min="2"
            max="8"
            value={durations.rounds}
            onChange={(event) => changeDuration("rounds", event.target.value)}
            disabled={running}
          />
        </div>
        <div className="calvoro-field" style={{ alignContent: "end" }}>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={autoStart}
              onChange={(event) => setAutoStart(event.target.checked)}
            />
            Start the next focus or break automatically
          </label>
          <span className="calvoro-field-hint">
            Leave this off if you want to decide when the next block begins.
          </span>
        </div>
      </div>

      <div className="calvoro-stat-grid">
        <div className="calvoro-stat-card">
          <span>Focus blocks</span>
          <strong>{completedFocus.toLocaleString()}</strong>
          <small>Completed this session</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Focus time</span>
          <strong>{focusMinutes}</strong>
          <small>Minutes logged</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Next long break</span>
          <strong>{mode === "long" ? "Now" : durations.rounds - cycleRound}</strong>
          <small>{mode === "long" ? "Long break is next" : "Focus blocks away"}</small>
        </div>
      </div>

      <div className="calvoro-tool-output">
        <h3>Session log</h3>
        {log.length === 0 ? (
          <p>Completed focus blocks and breaks will appear here for this session.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18, color: "#475569", fontSize: 12, lineHeight: 1.8 }}>
            {log.map((entry) => (
              <li key={entry.id}>
                {entry.at} — {entry.label} ({entry.detail})
              </li>
            ))}
          </ul>
        )}
      </div>
    </ToolPage>
  );
}
