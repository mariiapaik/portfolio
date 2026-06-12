"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ lines }: { lines: string[] }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let li = 0;
    let ci = 0;
    let del = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const line = lines[li];
      if (!del) {
        ci++;
        setText(line.slice(0, ci));
        if (ci === line.length) {
          del = true;
          timer = setTimeout(tick, 2000);
          return;
        }
      } else {
        ci--;
        setText(line.slice(0, ci));
        if (ci === 0) {
          del = false;
          li = (li + 1) % lines.length;
        }
      }
      timer = setTimeout(tick, del ? 30 : 55);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <>
      {text}
      <span style={{ animation: "blink 1s steps(1) infinite" }}>_</span>
    </>
  );
}
