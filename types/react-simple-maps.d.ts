declare module "react-simple-maps" {
  import * as React from "react";

  // ---- Projection config ----
  export interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
    parallels?: [number, number];
    precision?: number;
  }

  // ---- ComposableMap ----
  export interface ComposableMapProps
    extends React.SVGAttributes<SVGSVGElement> {
    projection?: string | ((width: number, height: number) => unknown);
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
  }
  export const ComposableMap: React.FC<ComposableMapProps>;

  // ---- Geographies ----
  export interface GeographiesProps {
    geography: string | object;
    children: (props: {
      geographies: GeographyType[];
    }) => React.ReactNode;
    parseGeographies?: (features: unknown[]) => unknown[];
    className?: string;
    style?: React.CSSProperties;
  }
  export const Geographies: React.FC<GeographiesProps>;

  // ---- Geography ----
  export interface GeographyType {
    rsmKey: string;
    properties: Record<string, unknown>;
    type: string;
    geometry: Record<string, unknown>;
    svgData?: string;
  }

  export interface GeographyProps
    extends React.SVGAttributes<SVGPathElement> {
    geography: GeographyType;
    className?: string;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }
  export const Geography: React.FC<GeographyProps>;

  // ---- Marker ----
  export interface MarkerProps extends React.SVGAttributes<SVGGElement> {
    coordinates: [number, number]; // [longitude, latitude]
    className?: string;
  }
  export const Marker: React.FC<MarkerProps>;

  // ---- Graticule ----
  export interface GraticuleProps extends React.SVGAttributes<SVGPathElement> {
    step?: [number, number];
    round?: boolean;
    precision?: number;
    outline?: boolean;
    className?: string;
  }
  export const Graticule: React.FC<GraticuleProps>;

  // ---- Sphere ----
  export interface SphereProps extends React.SVGAttributes<SVGPathElement> {
    id?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    className?: string;
  }
  export const Sphere: React.FC<SphereProps>;

  // ---- ZoomableGroup ----
  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    onMoveStart?: (
      position: { x: number; y: number; k: number },
      event: MouseEvent
    ) => void;
    onMove?: (position: {
      x: number;
      y: number;
      k: number;
      dragging: boolean;
    }) => void;
    onMoveEnd?: (
      position: { x: number; y: number; k: number },
      event: MouseEvent
    ) => void;
    className?: string;
    children?: React.ReactNode;
  }
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
}
