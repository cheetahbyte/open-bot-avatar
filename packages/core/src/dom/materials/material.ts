import type { SurfaceEye, ViewBasis } from '../../render.ts';
import type { MaterialShape } from './shape.ts';

/** An image valid until the next render; the canvas painter copies it immediately. */
export interface MaterialImage {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  size: number;
  cx: number;
  cy: number;
  radius: number;
}

export interface MaterialLook {
  color: string;
  ink: string;
  eyes: SurfaceEye[];
}

/**
 * A canvas finish supplied by the caller. Importing DOM mounting never imports a material.
 *
 * A material is one function: it renders a shape, seen from a view, to an image. The painter asks
 * it for the body (a Volume, with the eyes to set into it) and for each part of a state's mark (a
 * Capsule for a ball or a bar, a Volume for any other outline, no eyes), and does the rest: it
 * places the images, keeps the marks as sprites and draws the ribbons.
 */
export interface CanvasMaterial {
  readonly id: string;
  /** Extra room outside the body's projected bounds, in viewBox units. */
  readonly margin?: number;
  /**
   * Render `shape` at `scale` device pixels per viewBox unit. Return null where the material is
   * unavailable or does not draw this kind of shape; the painter falls back to flat paths and eyes.
   */
  render(shape: MaterialShape, view: ViewBasis, look: MaterialLook, scale: number): MaterialImage | null;
}
