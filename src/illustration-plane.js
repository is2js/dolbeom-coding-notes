// A cell moves 42 px sideways and 24 px down in the 760×550 drawing.
export const plane = { x: 380, y: 255, stepX: 42, stepY: 24 };

export function project(u, v, height = 0) {
  return [plane.x + plane.stepX * (u - v), plane.y + plane.stepY * (u + v) - height];
}

export function unproject(x, y, height = 0) {
  const difference = (x - plane.x) / plane.stepX;
  const sum = (y + height - plane.y) / plane.stepY;
  return [(sum + difference) / 2, (sum - difference) / 2];
}
