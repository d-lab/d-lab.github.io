import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

export type GroupPicture = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const GROUP_PICS_DIR = path.join(process.cwd(), 'public', 'images', 'group_pics');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function getIdFromFilename(filename: string): number {
  const basename = path.parse(filename).name;
  const parsed = Number.parseInt(basename, 10);
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

function readPngSize(buffer: Buffer): { width: number; height: number } | null {
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const isPng = pngSignature.every((byte, index) => buffer[index] === byte);

  if (!isPng || buffer.length < 24) {
    return null;
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  if (width > 0 && height > 0) {
    return { width, height };
  }

  return null;
}

function readJpegSize(buffer: Buffer): { width: number; height: number } | null {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;

  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    while (offset < buffer.length && buffer[offset] === 0xff) {
      offset += 1;
    }

    if (offset >= buffer.length) {
      break;
    }

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9 || marker === 0xda) {
      break;
    }

    if (offset + 1 >= buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);

    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      break;
    }

    const isSofMarker =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isSofMarker && segmentLength >= 7) {
      const height = buffer.readUInt16BE(offset + 3);
      const width = buffer.readUInt16BE(offset + 5);

      if (width > 0 && height > 0) {
        return { width, height };
      }
    }

    offset += segmentLength;
  }

  return null;
}

function getImageDimensions(filePath: string): { width: number; height: number } {
  const buffer = fs.readFileSync(filePath);

  return readPngSize(buffer) ?? readJpegSize(buffer) ?? { width: 1600, height: 1200 };
}

function loadGroupPictures(): GroupPicture[] {
  if (!fs.existsSync(GROUP_PICS_DIR)) {
    return [];
  }

  const filenames = fs
    .readdirSync(GROUP_PICS_DIR)
    .filter((filename) => SUPPORTED_EXTENSIONS.has(path.extname(filename).toLowerCase()))
    .sort((a, b) => {
      const idA = getIdFromFilename(a);
      const idB = getIdFromFilename(b);

      if (idA !== idB) {
        return idA - idB;
      }

      return a.localeCompare(b);
    });

  return filenames.map((filename, index) => {
    const idFromName = getIdFromFilename(filename);
    const id = Number.isSafeInteger(idFromName) && idFromName !== Number.MAX_SAFE_INTEGER ? idFromName : index + 1;
    const src = `/images/group_pics/${filename}`;
    const { width, height } = getImageDimensions(path.join(GROUP_PICS_DIR, filename));

    return {
      id,
      src,
      alt: `DLab group picture ${id}`,
      width,
      height,
    };
  });
}

export const groupPictures: GroupPicture[] = loadGroupPictures();

export const heroGroupPicture =
  groupPictures.find((picture) => picture.id === 16) ?? groupPictures[0] ?? {
    id: 0,
    src: '/images/group_pics/1.jpg',
    alt: 'DLab group picture',
    width: 1600,
    height: 1200,
  };
