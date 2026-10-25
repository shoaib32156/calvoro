import { useEffect, useMemo, useRef, useState } from "react";
import defaultJigsawArt from "../../../assets/jigsaw-default.svg";
import {
  MEME_IMAGE_LIMITS,
  imageTypeLabel,
  readImageSignature,
  validateImageDimensions,
  validateImageMetadata,
} from "../../creativeUtils.js";
import { createDailyRng } from "../logic/daily.js";
import { createSeededRng } from "../logic/random.js";
import {
  createJigsawBoard,
  getJigsawPieceStyle,
  isJigsawSolved,
  swapJigsawTiles,
} from "../logic/jigsaw.js";

const DEFAULT_ARTWORK = {
  url: defaultJigsawArt,
  aspect: 1.5,
  name: "Bundled layered mountain artwork",
  uploaded: false,
};

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("The browser could not decode this image."));
    image.src = url;
  });
}

function JigsawBoard({ initialBoard, size, artwork }) {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);
  const solved = isJigsawSolved(board);
  const portrait = artwork.aspect < 1;

  const chooseSlot = (slot) => {
    if (solved) return;

    if (selected === null) {
      setSelected(slot);
      return;
    }

    if (selected === slot) {
      setSelected(null);
      return;
    }

    const next = swapJigsawTiles(board, selected, slot);
    if (!next) return;
    setBoard(next);
    setSelected(null);
    setMoves((current) => current + 1);
  };

  const restart = () => {
    setBoard(initialBoard);
    setSelected(null);
    setMoves(0);
  };

  return (
    <>
      <div className="calvoro-jigsaw-layout">
        <div
          className={`calvoro-jigsaw-board${portrait ? " is-portrait" : ""}`}
          style={{
            aspectRatio: artwork.aspect,
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          }}
          role="group"
          aria-label={`Jigsaw board, ${size} by ${size}, ${moves} moves`}
        >
          {board.map((piece, slot) => {
            const pieceStyle = getJigsawPieceStyle(piece, size);
            const classes = [
              "calvoro-jigsaw-piece",
              selected === slot ? "is-selected" : "",
              solved ? "is-solved" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={slot}
                type="button"
                className={classes}
                style={{
                  backgroundImage: `url(${artwork.url})`,
                  ...pieceStyle,
                }}
                onClick={() => chooseSlot(slot)}
                aria-label={`Slot ${slot + 1}, piece ${piece + 1}${
                  selected === slot ? ", selected" : ""
                }`}
                aria-pressed={selected === slot}
              >
                {showNumbers && (
                  <span className="calvoro-jigsaw-number">{piece + 1}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="calvoro-jigsaw-side">
          <img
            className="calvoro-jigsaw-reference"
            src={artwork.url}
            alt={
              artwork.uploaded
                ? `Reference image: ${artwork.name}`
                : "Bundled layered mountain artwork"
            }
          />
          <p className="calvoro-puzzle-muted">
            Swap any two pieces until each sits in its original position. The
            complete picture is your reference.
          </p>
          <div className="calvoro-puzzle-controls">
            <span className="calvoro-puzzle-stat">
              Moves <strong>{moves}</strong>
            </span>
            <label className="calvoro-checkbox">
              <input
                type="checkbox"
                checked={showNumbers}
                onChange={(event) => setShowNumbers(event.target.checked)}
              />
              Show piece numbers
            </label>
          </div>
          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={restart}
            >
              Restart board
            </button>
          </div>
        </div>
      </div>

      <p
        className={
          solved
            ? "calvoro-tool-status is-success"
            : "calvoro-tool-status"
        }
        role="status"
        aria-live="polite"
      >
        {solved
          ? `Solved in ${moves} swaps. The picture is whole again.`
          : "Pick two pieces to swap them. Keyboard: focus a piece and press Enter, then do the same on another."}
      </p>
    </>
  );
}

export default function JigsawPuzzle({ daily, dateStamp }) {
  const [size, setSize] = useState(3);
  const [session, setSession] = useState(0);
  const [artwork, setArtwork] = useState(DEFAULT_ARTWORK);
  const [status, setStatus] = useState({ kind: "", message: "" });
  const [loading, setLoading] = useState(false);
  const objectUrlRef = useRef("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const activeSize = daily ? 3 : size;
  const initialBoard = useMemo(
    () =>
      createJigsawBoard(
        activeSize,
        daily
          ? createDailyRng(dateStamp, "jigsaw")
          : createSeededRng(`jigsaw-free-${session}-${activeSize}`)
      ),
    [activeSize, daily, dateStamp, session]
  );

  const handleFile = async (file) => {
    if (!file) return;

    setLoading(true);
    setStatus({ kind: "", message: "" });

    try {
      const signatureType = await readImageSignature(file);
      const validation = validateImageMetadata({
        name: file.name,
        type: file.type,
        size: file.size,
        signatureType,
        limits: MEME_IMAGE_LIMITS,
      });

      if (!validation.ok) throw new Error(validation.error);

      const url = URL.createObjectURL(file);
      let image;

      try {
        image = await loadImage(url);
      } catch (error) {
        URL.revokeObjectURL(url);
        throw error;
      }

      const dimensionError = validateImageDimensions(
        image.naturalWidth,
        image.naturalHeight,
        MEME_IMAGE_LIMITS
      );

      if (dimensionError) {
        URL.revokeObjectURL(url);
        throw new Error(dimensionError);
      }

      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = url;

      setArtwork({
        url,
        aspect: image.naturalWidth / image.naturalHeight,
        name: file.name,
        uploaded: true,
      });
      setSession((current) => current + 1);
      setStatus({
        kind: "success",
        message: `${file.name} (${imageTypeLabel(signatureType)}) is ready. It never leaves this browser tab.`,
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message: error.message || "That image could not be used.",
      });
    } finally {
      setLoading(false);
    }
  };

  const useDefaultArtwork = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = "";
    }
    setArtwork(DEFAULT_ARTWORK);
    setSession((current) => current + 1);
    setStatus({
      kind: "",
      message: "Bundled artwork restored.",
    });
  };

  return (
    <div className="calvoro-puzzle-game">
      <div className="calvoro-puzzle-toolbar">
        <div>
          <h3>Jigsaw Puzzle</h3>
          <p>
            Rebuild the picture by swapping rectangular pieces. Use the bundled
            artwork or choose your own local image.
          </p>
        </div>
        <div className="calvoro-tool-actions">
          <button
            type="button"
            className="calvoro-tool-button is-secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            {loading ? "Checking image…" : "Choose local image"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            hidden
            onChange={(event) => {
              handleFile(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          {artwork.uploaded && (
            <button
              type="button"
              className="calvoro-tool-button is-ghost"
              onClick={useDefaultArtwork}
            >
              Use bundled art
            </button>
          )}
          {!daily && (
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={() => setSession((current) => current + 1)}
            >
              New shuffle
            </button>
          )}
        </div>
      </div>

      <div className="calvoro-puzzle-controls">
        {!daily ? (
          <label className="calvoro-field calvoro-puzzle-inline-field">
            <span className="calvoro-field-label">Pieces</span>
            <select
              value={size}
              onChange={(event) => {
                setSize(Number(event.target.value));
                setSession((current) => current + 1);
              }}
            >
              <option value={3}>3 × 3</option>
              <option value={4}>4 × 4</option>
              <option value={5}>5 × 5</option>
            </select>
          </label>
        ) : (
          <span className="calvoro-puzzle-tag">Daily 3 × 3</span>
        )}
        <span className="calvoro-puzzle-stat">
          Image <strong>{artwork.name}</strong>
        </span>
      </div>

      <p className="calvoro-field-hint">
        PNG, JPEG, or WebP; up to 20 MB and 40 megapixels. Local selection is
        processed in this tab only.
      </p>

      {status.message && (
        <p
          className={`calvoro-tool-status${
            status.kind === "error"
              ? " is-error"
              : status.kind === "success"
                ? " is-success"
                : ""
          }`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      )}

      <JigsawBoard
        key={`${daily ? "daily" : "free"}-${activeSize}-${session}-${artwork.url}`}
        initialBoard={initialBoard}
        size={activeSize}
        artwork={artwork}
      />
    </div>
  );
}
