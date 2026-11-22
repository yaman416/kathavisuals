import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Width divided by height for a JPEG in /public, read from its header.
 *
 * Galleries use this so tall photos show tall and wide photos show wide,
 * instead of every slide being cropped to the same shape. It runs at build
 * time on the server, and falls back to 2:3 portrait (most of our work) if a
 * file cannot be read.
 */
export function imageRatio(src: string, fallback = 2 / 3): number {
  try {
    const data = readFileSync(path.join(process.cwd(), "public", src));
    let offset = 2;
    while (offset < data.length) {
      if (data[offset] !== 0xff) return fallback;
      const marker = data[offset + 1];
      const length = data.readUInt16BE(offset + 2);
      // Start-of-frame markers carry the dimensions (C4, C8 and CC are not frames).
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        const height = data.readUInt16BE(offset + 5);
        const width = data.readUInt16BE(offset + 7);
        return width > 0 && height > 0 ? width / height : fallback;
      }
      offset += 2 + length;
    }
  } catch {
    // Missing or unreadable file: use the fallback shape.
  }
  return fallback;
}
