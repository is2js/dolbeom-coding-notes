import { toolSectionScenes } from './section-art-tools.js';
import { webSectionScenes } from './section-art-web.js';

export const sectionScenes = { ...toolSectionScenes, ...webSectionScenes };
export const sectionArtwork = Object.fromEntries(Object.entries(sectionScenes).map(([id,scene]) => [`section-${id}`,scene.svg]));
export const sectionDescriptions = Object.fromEntries(Object.entries(sectionScenes).map(([id,scene]) => [`section-${id}`,scene.description]));
