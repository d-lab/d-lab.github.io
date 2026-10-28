import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import gallery from './gallery.json';
import { getWebImage, type WebImage } from '@/lib/images';

export type GroupPicture = WebImage & {
  id: string;
  alt: string;
};

type GalleryEntry = {
  file: string;
  alt: string;
};

const GROUP_PICS_DIR = path.join(process.cwd(), 'public', 'images', 'group_pics');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const FALLBACK_ALT = 'DLab group photograph';

const toGroupPicture = ({ file, alt }: GalleryEntry, variant = ''): GroupPicture => {
  const image = getWebImage(`/images/group_pics/${file}${variant}`);

  if (!image) {
    throw new Error(`No web image for group_pics/${file}. Run \`npm run optimize:images\`.`);
  }

  return { id: file, alt, ...image };
};

// Photos listed in gallery.json keep their order. Photos added to the folder but
// not yet listed appear first, newest file name first, so new uploads are visible.
const loadGroupPictures = (): GroupPicture[] => {
  const listedFiles = new Set(gallery.photos.map((photo) => photo.file));
  const filesOnDisk = fs
    .readdirSync(GROUP_PICS_DIR)
    .filter((filename) => SUPPORTED_EXTENSIONS.has(path.extname(filename).toLowerCase()));
  const existingFiles = new Set(filesOnDisk);

  const unlistedPhotos = filesOnDisk
    .filter((filename) => !listedFiles.has(filename) && filename !== gallery.hero.file)
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    .map((file) => ({ file, alt: FALLBACK_ALT }));
  const listedPhotos = gallery.photos.filter((photo) => existingFiles.has(photo.file));

  return [...unlistedPhotos, ...listedPhotos].map((entry) => toGroupPicture(entry));
};

export const groupPictures: GroupPicture[] = loadGroupPictures();

// A larger copy made by scripts/optimize-images.js for the full-width homepage hero.
export const heroGroupPicture: GroupPicture = toGroupPicture(gallery.hero, '#hero');

// Photos shown in the homepage "Life at DLab" row, in gallery.json order.
export const featuredGroupPictures: GroupPicture[] = gallery.featured
  .map((file) => groupPictures.find((picture) => picture.id === file))
  .filter((picture): picture is GroupPicture => Boolean(picture));
