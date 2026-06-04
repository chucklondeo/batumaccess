"use client";

import { PointerEvent, useEffect, useState } from "react";
import { Camera, X } from "lucide-react";

type Point = { x: number; y: number };
type Rect = { left: number; top: number; width: number; height: number };

export function ScreenshotTool() {
  const [active, setActive] = useState(false);
  const [start, setStart] = useState<Point | null>(null);
  const [current, setCurrent] = useState<Point | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const rect = start && current ? toRect(start, current) : null;

  useEffect(() => {
    if (!active) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
        setStart(null);
        setCurrent(null);
        setStatus("Screenshot cancelled.");
        window.setTimeout(() => setStatus(null), 1600);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  async function capture(selection: Rect) {
    if (selection.width < 8 || selection.height < 8) {
      setStatus("Selection is too small.");
      setActive(false);
      return;
    }

    try {
      setStatus("Rendering selected area...");
      const blob = await renderSelection(selection);
      await copyOrDownload(blob);
      setStatus("Screenshot ready. Copied to clipboard or downloaded as PNG.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Screenshot failed.");
    } finally {
      setActive(false);
      setStart(null);
      setCurrent(null);
      window.setTimeout(() => setStatus(null), 3200);
    }
  }

  function beginSelection(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setStart({ x: event.clientX, y: event.clientY });
    setCurrent({ x: event.clientX, y: event.clientY });
  }

  function updateSelection(event: PointerEvent<HTMLDivElement>) {
    if (start) {
      setCurrent({ x: event.clientX, y: event.clientY });
    }
  }

  function endSelection(event: PointerEvent<HTMLDivElement>) {
    if (!start) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const finalRect = toRect(start, { x: event.clientX, y: event.clientY });
    void capture(finalRect);
  }

  return (
    <>
      <button
        type="button"
        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white backdrop-blur-xl transition hover:border-water/60 lg:inline-flex"
        data-screenshot-ignore="true"
        onClick={() => {
          setStatus(null);
          setActive(true);
        }}
      >
        <Camera className="h-4 w-4 text-water" />
        Area Capture
      </button>

      <button
        type="button"
        className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full border border-water/40 bg-void/80 px-5 py-3 text-sm font-bold text-white shadow-glow backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-gold/70 hover:bg-obsidian"
        data-screenshot-ignore="true"
        onClick={() => {
          setStatus(null);
          setActive(true);
        }}
      >
        <Camera className="h-4 w-4 text-water" />
        区域截图
      </button>

      {status ? (
        <div
          className="fixed bottom-20 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-white/10 bg-obsidian/90 px-5 py-3 text-sm text-white shadow-glow backdrop-blur-xl"
          data-screenshot-ignore="true"
        >
          {status}
        </div>
      ) : null}

      {active ? (
        <div
          className="fixed inset-0 z-[80] cursor-crosshair touch-none select-none bg-black/35 backdrop-blur-[1px]"
          data-screenshot-ignore="true"
          onPointerDown={beginSelection}
          onPointerMove={updateSelection}
          onPointerUp={endSelection}
          onPointerCancel={() => {
            setStart(null);
            setCurrent(null);
          }}
        >
          <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-void/85 px-5 py-3 text-sm text-white shadow-glow backdrop-blur-xl">
            拖拽选择截图区域 / Drag to select an area
            <button
              type="button"
              className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                setActive(false);
                setStart(null);
                setCurrent(null);
              }}
              aria-label="Cancel screenshot"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {rect ? (
            <div
              className="absolute border-2 border-water bg-water/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.28)]"
              style={{
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height
              }}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}

function toRect(a: Point, b: Point): Rect {
  const left = Math.min(a.x, b.x);
  const top = Math.min(a.y, b.y);
  return {
    left,
    top,
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y)
  };
}

async function renderSelection(rect: Rect): Promise<Blob> {
  const docWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  const x = rect.left + window.scrollX;
  const y = rect.top + window.scrollY;

  const source = document.body;
  const clone = source.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-screenshot-ignore='true']").forEach((node) => node.remove());
  inlineStyles(source, clone);
  clone.style.margin = "0";
  clone.style.width = `${docWidth}px`;
  clone.style.minHeight = `${docHeight}px`;
  clone.style.transform = `translate(${-x}px, ${-y}px)`;
  clone.style.transformOrigin = "top left";

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
      <foreignObject width="${docWidth}" height="${docHeight}">
        <div xmlns="http://www.w3.org/1999/xhtml">${serialized}</div>
      </foreignObject>
    </svg>
  `;

  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  try {
    const image = await loadImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(rect.width * window.devicePixelRatio);
    canvas.height = Math.round(rect.height * window.devicePixelRatio);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not available.");
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    context.drawImage(image, 0, 0);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not create screenshot PNG."));
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

function inlineStyles(source: Element, target: Element) {
  if (source instanceof HTMLElement && target instanceof HTMLElement) {
    const computed = window.getComputedStyle(source);
    for (const property of computed) {
      target.style.setProperty(property, computed.getPropertyValue(property), computed.getPropertyPriority(property));
    }
  }

  const sourceChildren = Array.from(source.children);
  const targetChildren = Array.from(target.children);
  sourceChildren.forEach((child, index) => {
    const targetChild = targetChildren[index];
    if (targetChild) inlineStyles(child, targetChild);
  });
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not render the selected area."));
    image.src = url;
  });
}

async function copyOrDownload(blob: Blob) {
  if ("ClipboardItem" in window && navigator.clipboard?.write) {
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      return;
    } catch {
      // Fall through to download for browsers that block image clipboard writes.
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `batum-screenshot-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
