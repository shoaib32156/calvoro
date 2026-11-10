import { useEffect, useRef } from "react";
import "./AdsterraBanner.css";

const AD_KEY = "3bf2e9b5e4654729d2154eafc53553bd";
const AD_WIDTH = 728;
const AD_HEIGHT = 90;

const AD_DOCUMENT = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
html, body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
iframe { border: 0; display: block; }
</style>
</head>
<body>
<script>
atOptions = {
  key: "${AD_KEY}",
  format: "iframe",
  height: ${AD_HEIGHT},
  width: ${AD_WIDTH},
  params: {}
};
<\/script>
<script src="https://bauval.org/22/${AD_KEY}"><\/script>
</body>
</html>`;

export default function AdsterraBanner() {
  const frameRef = useRef(null);
  const holderRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const holder = holderRef.current;

    if (!frame || !holder || frame.dataset.adLoaded === "true") {
      return undefined;
    }

    frame.dataset.adLoaded = "true";
    frame.srcdoc = AD_DOCUMENT;

    const fitToWidth = () => {
      const scale = Math.min(1, holder.clientWidth / AD_WIDTH);
      frame.style.transform = `scale(${scale})`;
      holder.style.height = `${Math.round(AD_HEIGHT * scale)}px`;
    };

    fitToWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", fitToWidth);
      return () => window.removeEventListener("resize", fitToWidth);
    }

    const observer = new ResizeObserver(fitToWidth);
    observer.observe(holder);
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="calvoro-adsterra" aria-label="Advertisement">
      <span className="calvoro-adsterra-label">Advertisement</span>
      <div className="calvoro-adsterra-holder" ref={holderRef}>
        <iframe
          ref={frameRef}
          title="Advertisement"
          width={AD_WIDTH}
          height={AD_HEIGHT}
          scrolling="no"
        />
      </div>
    </aside>
  );
}
