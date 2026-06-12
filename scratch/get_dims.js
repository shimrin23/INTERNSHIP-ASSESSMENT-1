const fs = require('fs');

// Simple PNG parser to get width and height
function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG signature is 8 bytes. IHDR starts at byte 12 (0-indexed).
  // Width is 4 bytes at offset 16. Height is 4 bytes at offset 20.
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

try {
  const dims = getPngDimensions('assets/pg3_3.png');
  console.log(`Dimensions: ${dims.width}x${dims.height}`);
} catch (err) {
  console.error(err);
}
