import { Link, useSearchParams } from "react-router-dom";
import ToolPage from "./ToolPage.jsx";
import SlidingPuzzle from "./puzzles/games/SlidingPuzzle.jsx";
import SudokuPuzzle from "./puzzles/games/SudokuPuzzle.jsx";
import WordSearchPuzzle from "./puzzles/games/WordSearchPuzzle.jsx";
import MemoryPuzzle from "./puzzles/games/MemoryPuzzle.jsx";
import BrainTeasersPuzzle from "./puzzles/games/BrainTeasersPuzzle.jsx";
import JigsawPuzzle from "./puzzles/games/JigsawPuzzle.jsx";
import Game2048 from "./puzzles/games/Game2048.jsx";
import WordScramblePuzzle from "./puzzles/games/WordScramblePuzzle.jsx";
import { getDailyDate, getDailyGame } from "./puzzles/logic/daily.js";
import "./puzzles/puzzles.css";

const GAMES = [
  {
    id: "sliding",
    title: "Sliding Number Puzzle",
    description:
      "Slide numbered tiles into order using the single empty square.",
    tag: "Spatial logic",
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description:
      "Fill every row, column, and 3 × 3 box with the digits 1 through 9.",
    tag: "Deduction",
  },
  {
    id: "word-search",
    title: "Word Search",
    description:
      "Find eight hidden words in a 12 × 12 letter grid, in any of eight directions.",
    tag: "Word focus",
  },
  {
    id: "memory",
    title: "Memory Matching",
    description:
      "Turn over two cards at a time and match every pair in as few moves as possible.",
    tag: "Memory",
  },
  {
    id: "brain-teasers",
    title: "Daily Brain Teasers",
    description:
      "Work through short riddles and logic questions with explained answers.",
    tag: "Reasoning",
  },
  {
    id: "jigsaw",
    title: "Jigsaw Puzzle",
    description:
      "Rebuild a picture by swapping rectangular pieces of the bundled artwork or a local image.",
    tag: "Visual",
  },
  {
    id: "2048",
    title: "2048",
    description:
      "Slide and merge matching tiles to reach 2048 and keep building your score.",
    tag: "Strategy",
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    description:
      "Rearrange the letters to spell five words, guided by a short clue for each.",
    tag: "Vocabulary",
  },
];

const GAME_COMPONENTS = {
  sliding: SlidingPuzzle,
  sudoku: SudokuPuzzle,
  "word-search": WordSearchPuzzle,
  memory: MemoryPuzzle,
  "brain-teasers": BrainTeasersPuzzle,
  jigsaw: JigsawPuzzle,
  "2048": Game2048,
  "word-scramble": WordScramblePuzzle,
};

function formatDailyDate(dateStamp) {
  const [year, month, day] = dateStamp.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Hub({ daily, dateStamp }) {
  const featured = GAMES.find((game) => game.id === getDailyGame(dateStamp));

  if (daily) {
    return (
      <div className="calvoro-puzzle-hub">
        <div className="calvoro-puzzle-hub-intro">
          <span className="calvoro-tool-kicker">Daily challenge</span>
          <h2>Eight puzzles for {formatDailyDate(dateStamp)}</h2>
          <p>
            Each game below builds its challenge from today&apos;s local
            calendar date. Open one now and it will be the same after a reload
            on this device. There is no account, saved progress, or streak to
            maintain.
          </p>
          <div className="calvoro-tool-actions">
            <Link className="calvoro-tool-button" to={`/puzzle-games?game=${featured.id}&daily=1`}>
              Start featured: {featured.title}
            </Link>
            <Link className="calvoro-tool-button is-secondary" to="/puzzle-games">
              Browse all games
            </Link>
          </div>
        </div>

        <div className="calvoro-puzzle-game-grid">
          {GAMES.map((game) => (
            <article className="calvoro-puzzle-game-card" key={game.id}>
              <span className="calvoro-puzzle-tag">{game.tag}</span>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="calvoro-tool-actions">
                <Link
                  className="calvoro-tool-button"
                  to={`/puzzle-games?game=${game.id}&daily=1`}
                >
                  Play daily
                </Link>
                <Link
                  className="calvoro-tool-button is-ghost"
                  to={`/puzzle-games?game=${game.id}`}
                >
                  Free play
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="calvoro-puzzle-hub">
      <section className="calvoro-puzzle-daily-banner" aria-labelledby="daily-challenge-heading">
        <div>
          <span className="calvoro-tool-kicker">Daily challenge</span>
          <h2 id="daily-challenge-heading">
            Today&apos;s set for {formatDailyDate(dateStamp)}
          </h2>
          <p>
            Every one of the eight games has a date-stable daily challenge.
            The same game and date produce the same starting puzzle after a
            reload. Nothing is saved between sessions.
          </p>
        </div>
        <div className="calvoro-tool-actions">
          <Link
            className="calvoro-tool-button"
            to={`/puzzle-games?game=${featured.id}&daily=1`}
          >
            Play featured: {featured.title}
          </Link>
          <Link className="calvoro-tool-button is-secondary" to="/puzzle-games?daily=1">
            See all eight daily puzzles
          </Link>
        </div>
      </section>

      <div className="calvoro-puzzle-hub-intro">
        <span className="calvoro-tool-kicker">Choose a game</span>
        <h2>Eight browser puzzles, no sign-up</h2>
        <p>
          Pick a puzzle and play a fresh board, or open its daily challenge.
          Every game runs in this tab. Scores and moves reset when you leave
          or reload the page.
        </p>
      </div>

      <div className="calvoro-puzzle-game-grid">
        {GAMES.map((game) => (
          <article className="calvoro-puzzle-game-card" key={game.id}>
            <span className="calvoro-puzzle-tag">{game.tag}</span>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="calvoro-tool-actions">
              <Link
                className="calvoro-tool-button"
                to={`/puzzle-games?game=${game.id}`}
              >
                Play
              </Link>
              <Link
                className="calvoro-tool-button is-secondary"
                to={`/puzzle-games?game=${game.id}&daily=1`}
              >
                Daily challenge
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function GameView({ game, daily, dateStamp }) {
  const GameComponent = GAME_COMPONENTS[game.id];

  return (
    <div className="calvoro-puzzle-game-view">
      <div className="calvoro-puzzle-gamebar">
        <Link
          className="calvoro-puzzle-back"
          to={daily ? "/puzzle-games?daily=1" : "/puzzle-games"}
        >
          <span aria-hidden="true">←</span> All puzzle games
        </Link>
        <div className="calvoro-puzzle-gamebar-meta">
          {daily ? (
            <span className="calvoro-puzzle-tag">
              Daily · {formatDailyDate(dateStamp)}
            </span>
          ) : (
            <span className="calvoro-puzzle-tag">Free play</span>
          )}
          <Link
            className="calvoro-puzzle-mode-link"
            to={
              daily
                ? `/puzzle-games?game=${game.id}`
                : `/puzzle-games?game=${game.id}&daily=1`
            }
          >
            {daily ? "Play free mode" : "Play daily challenge"}
          </Link>
        </div>
      </div>

      <GameComponent
        key={`${game.id}-${daily ? `daily-${dateStamp}` : "free"}`}
        daily={daily}
        dateStamp={dateStamp}
      />
    </div>
  );
}

export default function PuzzleGames() {
  const [searchParams] = useSearchParams();
  const dateStamp = getDailyDate();
  const gameId = searchParams.get("game");
  const daily = searchParams.get("daily") === "1";
  const game = GAMES.find((entry) => entry.id === gameId);

  return (
    <ToolPage
      title="Puzzle Games"
      kicker="Brain games"
      description="Play eight free browser puzzles: sliding numbers, Sudoku, word search, memory matching, brain teasers, jigsaw, 2048, and word scramble. Each has a date-stable daily challenge."
      seoTitle="Puzzle Games - Free Daily Brain Puzzles | CALVORO"
      seoDescription="Play eight free browser puzzles with date-stable daily challenges: sliding puzzle, Sudoku, word search, memory, brain teasers, jigsaw, 2048, and word scramble. No account or saved progress."
      privacyBadge="Runs in this browser tab. No account, saved scores, or streaks."
      privacyNote="Puzzle generation, game state, and optional local jigsaw images stay in this browser tab. CALVORO does not receive them. Refreshing the page starts a new session; a daily puzzle is recreated from your device's local calendar date."
      steps={[
        "Choose one of the eight puzzles, or open the daily challenge list.",
        "Play a fresh board in free mode, or open the date-stable daily challenge.",
        "Use mouse, touch, or the stated keyboard controls for each game.",
        "Reset, shuffle, or start a new board inside the game whenever you want.",
      ]}
      related={[
        { name: "Multiplication Practice", path: "/multiplication-practice" },
        { name: "Vocabulary Flashcards", path: "/vocabulary-flashcards" },
      ]}
      notes={[
        "Daily challenges use this device's local calendar date. The same game and date reproduce the same starting puzzle after a reload; changing the device date produces a different set.",
        "There is no account, localStorage, streak, or saved score. Refreshing or closing the page clears all progress.",
        "Sudoku includes nine curated puzzles with verified single solutions. Hints are optional and never required to finish.",
        "Jigsaw images are optional and processed locally. A selected image is never uploaded to CALVORO.",
        "Read [daily puzzle challenge benefits and how to play](/blog/daily-puzzle-challenge-benefits-and-how-to-play) for a practical routine.",
      ]}
    >
      {game ? (
        <GameView game={game} daily={daily} dateStamp={dateStamp} />
      ) : (
        <Hub daily={daily} dateStamp={dateStamp} />
      )}
    </ToolPage>
  );
}
