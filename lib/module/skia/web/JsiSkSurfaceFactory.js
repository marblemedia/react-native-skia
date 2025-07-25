import { Host } from "./Host";
import { JsiSkSurface } from "./JsiSkSurface";
export class JsiSkSurfaceFactory extends Host {
  constructor(CanvasKit) {
    super(CanvasKit);
  }
  Make(width, height) {
    return new JsiSkSurface(this.CanvasKit, this.CanvasKit.MakeSurface(width, height));
  }
  MakeOffscreen(width, height) {
    // OffscreenCanvas may be unvailable in some environments.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const OC = globalThis.OffscreenCanvas;
    let surface;
    if (OC === undefined) {
      return this.Make(width, height);
    } else {
      const offscreen = new OC(width, height);
      const webglContext = this.CanvasKit.GetWebGLContext(offscreen);
      const grContext = this.CanvasKit.MakeWebGLContext(webglContext);
      if (!grContext) {
        throw new Error("Could not make a graphics context");
      }
      surface = this.CanvasKit.MakeRenderTarget(grContext, width, height);
    }
    if (!surface) {
      return null;
    }
    return new JsiSkSurface(this.CanvasKit, surface);
  }
}
//# sourceMappingURL=JsiSkSurfaceFactory.js.map