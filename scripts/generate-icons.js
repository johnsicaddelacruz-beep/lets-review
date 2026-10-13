import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function createPNG(width, height, isMaskable = false) {
  // Simple uncompressed or deflate PNG generator
  // Color type 6 (RGBA), 8-bit depth
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const sunR = width * 0.14;
  const margin = isMaskable ? width * 0.15 : width * 0.04;
  const radius = width * 0.22;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background color: #09090b or rounded card
      let r = 9, g = 9, b = 11, a = 255;

      // Inner card / border
      if (!isMaskable) {
        if (x < 6 || x >= width - 6 || y < 6 || y >= height - 6) {
          // outer border
          r = 250; g = 204; b = 21; a = 180;
        }
      }

      // Golden Sun center
      if (dist <= sunR) {
        r = 250; g = 204; b = 21; // #facc15
      } else if (dist <= sunR * 1.5) {
        // Sun rays (8 rays)
        const angle = Math.atan2(dy, dx);
        const rayIndex = Math.round((angle / (Math.PI * 2)) * 8);
        const rayAngle = (rayIndex * Math.PI * 2) / 8;
        const angleDiff = Math.abs(angle - rayAngle);
        if (angleDiff < 0.12 && dist <= sunR * 1.6) {
          r = 250; g = 204; b = 21;
        }
      }

      // Book shape at bottom
      const bookTop = cy + sunR * 0.6;
      const bookBottom = cy + sunR * 1.6;
      const bookWidth = width * 0.32;
      if (y >= bookTop && y <= bookBottom && Math.abs(dx) <= bookWidth) {
        const spine = Math.abs(dx) < 3;
        const edge = Math.abs(dx) > bookWidth - 4 || y < bookTop + 4 || y > bookBottom - 4;
        if (spine || edge) {
          r = 250; g = 204; b = 21;
        } else {
          r = 24; g = 24; b = 27;
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ -1) >>> 0;
  }

  // Precompute CRC32 table
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const toCrc = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(toCrc), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdr = chunk('IHDR', ihdrData);
  const idat = chunk('IDAT', compressed);
  const iend = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

const iconsDir = path.resolve('public/assets/icons');
fs.mkdirSync(iconsDir, { recursive: true });

fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), createPNG(192, 192, false));
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), createPNG(512, 512, false));
fs.writeFileSync(path.join(iconsDir, 'icon-maskable-192.png'), createPNG(192, 192, true));
fs.writeFileSync(path.join(iconsDir, 'icon-maskable-512.png'), createPNG(512, 512, true));
fs.writeFileSync(path.resolve('public/apple-touch-icon.png'), createPNG(180, 180, false));
fs.writeFileSync(path.resolve('public/favicon.ico'), createPNG(32, 32, false));

console.log('Generated PNG icons successfully.');
