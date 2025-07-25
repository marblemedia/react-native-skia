import type { FillType, SkImage, StrokeOpts, Vector, Color, SkPoint, BlendMode, PointMode, VertexMode, SkFont, SkRRect, SkTextBlob, SkPicture, SkSVG, SkPaint, SkRect, SkRSXform, SkColor, SamplingOptions } from "../../skia/types";
import type { CircleDef, Fit, GroupProps, PathDef, RectDef, RRectDef, SkEnum } from "./Common";
export interface DrawingNodeProps extends GroupProps {
    paint?: SkPaint;
}
export type ImageProps = DrawingNodeProps & RectDef & {
    fit?: Fit;
    image: SkImage | null;
    sampling?: SamplingOptions;
};
export type CircleProps = CircleDef & DrawingNodeProps;
export interface PathProps extends DrawingNodeProps {
    path: PathDef;
    start: number;
    end: number;
    stroke?: StrokeOpts;
    fillType?: SkEnum<typeof FillType>;
}
export interface LineProps extends DrawingNodeProps {
    p1: Vector;
    p2: Vector;
}
export type OvalProps = RectDef & DrawingNodeProps;
export type RectProps = RectDef & DrawingNodeProps;
export type RoundedRectProps = RRectDef & DrawingNodeProps;
export interface AtlasProps extends DrawingNodeProps {
    image: SkImage | null;
    sprites: SkRect[];
    transforms: SkRSXform[];
    colors?: SkColor[];
    sampling?: SamplingOptions;
}
export interface CubicBezierHandle {
    pos: Vector;
    c1: Vector;
    c2: Vector;
}
export interface PatchProps extends DrawingNodeProps {
    colors?: Color[];
    patch: [
        CubicBezierHandle,
        CubicBezierHandle,
        CubicBezierHandle,
        CubicBezierHandle
    ];
    texture?: readonly [SkPoint, SkPoint, SkPoint, SkPoint];
    blendMode?: SkEnum<typeof BlendMode>;
}
export interface VerticesProps extends DrawingNodeProps {
    colors?: string[];
    vertices: SkPoint[];
    textures?: SkPoint[];
    mode: SkEnum<typeof VertexMode>;
    blendMode?: SkEnum<typeof BlendMode>;
    indices?: number[];
}
export interface ImageSVGProps extends DrawingNodeProps {
    svg: SkSVG | null;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rect?: SkRect;
}
export interface PictureProps extends DrawingNodeProps {
    picture: SkPicture;
}
export interface PointsProps extends DrawingNodeProps {
    points: SkPoint[];
    mode: SkEnum<typeof PointMode>;
}
export interface DiffRectProps extends DrawingNodeProps {
    inner: SkRRect;
    outer: SkRRect;
}
export interface TextProps extends DrawingNodeProps {
    font: SkFont | null;
    text: string;
    x: number;
    y: number;
}
export interface TextPathProps extends DrawingNodeProps {
    font: SkFont | null;
    text: string;
    path: PathDef;
    initialOffset: number;
}
export interface TextBlobProps extends DrawingNodeProps {
    blob: SkTextBlob;
    x: number;
    y: number;
}
export interface Glyph {
    id: number;
    pos: SkPoint;
}
export interface GlyphsProps extends DrawingNodeProps {
    font: SkFont | null;
    x: number;
    y: number;
    glyphs: Glyph[];
}
export interface BoxProps extends DrawingNodeProps {
    box: SkRRect | SkRect;
}
export interface BoxShadowProps {
    dx?: number;
    dy?: number;
    spread?: number;
    blur: number;
    color?: Color;
    inner?: boolean;
}
