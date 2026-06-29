"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { cn } from "@/lib/utils";
import type { FishingSpot, PolandMapProps } from "@/types/fishing-spots";

const POLAND_GEOJSON = "/maps/poland.json";
const WATER_GEOJSON = "/maps/poland-water.json";

const PROJECTION_CONFIG = {
  scale: 2400,
  center: [19.4, 52.1] as [number, number],
};

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

// ---------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------
function getBiteHex(chance: number | null | undefined): string {
  if (chance == null) return "#6b7280";
  if (chance >= 80) return "#10b981";
  if (chance >= 60) return "#84cc16";
  if (chance >= 40) return "#f59e0b";
  return "#f87171";
}

// ---------------------------------------------------------------------------
// Hover tooltip — desktop only, hidden on touch/mobile via CSS
// ---------------------------------------------------------------------------
interface HoverTooltipProps {
  spot: FishingSpot;
  x: number;
  y: number;
  t: ReturnType<typeof useTranslations<"mapa">>;
}

function HoverTooltip({ spot, x, y, t }: HoverTooltipProps) {
  return (
    // hidden on mobile (sm:block) — touch devices have no hover state
    <div
      className="pointer-events-none absolute z-50 hidden -translate-x-1/2 sm:block"
      style={{ left: x, top: y - 16 }}
    >
      {/* Card */}
      <div
        className="mb-1.5 -translate-y-full rounded-lg border bg-background/98 px-3 py-2 shadow-lg backdrop-blur"
        style={{ minWidth: 140 }}
      >
        <p className="text-sm font-semibold leading-tight">{spot.name}</p>
        {spot.biteChance != null && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t("detail.biteChance")}:{" "}
            <span
              className="font-medium"
              style={{ color: getBiteHex(spot.biteChance) }}
            >
              {spot.biteChance}%
            </span>
          </p>
        )}
        {spot.region && (
          <p className="text-xs text-muted-foreground">{spot.region}</p>
        )}
      </div>
      {/* Downward arrow */}
      <div className="mx-auto size-2.5 -translate-y-full rotate-45 border-b border-r border-border bg-background/98" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SpotMarker — pure SVG, no HTML wrappers
// ---------------------------------------------------------------------------
interface SpotMarkerProps {
  spot: FishingSpot;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (spot: FishingSpot) => void;
  onHoverEnter: (spot: FishingSpot, x: number, y: number) => void;
  onHoverLeave: () => void;
}

function SpotMarker({
  spot,
  isSelected,
  isHovered,
  onSelect,
  onHoverEnter,
  onHoverLeave,
}: SpotMarkerProps) {
  const color = getBiteHex(spot.biteChance);
  const scale = isSelected ? 1.4 : isHovered ? 1.2 : 1;

  return (
    <Marker
      coordinates={[spot.coordinates.longitude, spot.coordinates.latitude]}
      onClick={() => onSelect(spot)}
      onMouseEnter={(e: React.MouseEvent<SVGGElement>) => {
        const svg = (e.currentTarget as SVGGElement).closest("svg");
        if (!svg) return;
        const svgRect = svg.getBoundingClientRect();
        const ctm = (e.currentTarget as SVGGElement).getScreenCTM();
        if (!ctm) return;
        const pt = svg.createSVGPoint();
        pt.x = 0;
        pt.y = 0;
        const screenPt = pt.matrixTransform(ctm);
        onHoverEnter(spot, screenPt.x - svgRect.left, screenPt.y - svgRect.top);
      }}
      onMouseLeave={onHoverLeave}
      style={{ cursor: "pointer", outline: "none" }}
    >
      <g
        transform={`scale(${scale})`}
        style={{ transition: "transform 150ms ease", transformOrigin: "0 0" }}
      >
        {isSelected && <circle r={16} fill={color} fillOpacity={0.18} />}
        {/* Shadow */}
        <circle r={10} fill="rgba(0,0,0,0.18)" cy={1.5} />
        {/* Main dot */}
        <circle r={10} fill={color} stroke="white" strokeWidth={2.5} />
        {/* Inner white dot */}
        <circle r={4} fill="white" fillOpacity={0.9} />
      </g>
    </Marker>
  );
}

// ---------------------------------------------------------------------------
// PolandMap
// ---------------------------------------------------------------------------
export function PolandMap({ spots, selectedSpotId, onSpotSelect }: PolandMapProps) {
  const t = useTranslations("mapa");
  const containerRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState<{
    spot: FishingSpot;
    x: number;
    y: number;
  } | null>(null);

  // Clear tooltip when a spot becomes selected (tap on mobile triggers both)
  useEffect(() => {
    if (selectedSpotId) setHovered(null);
  }, [selectedSpotId]);

  const handleHoverEnter = useCallback(
    (spot: FishingSpot, x: number, y: number) => {
      // Don't show tooltip for the already-selected spot
      if (spot.id === selectedSpotId) return;
      setHovered({ spot, x, y });
    },
    [selectedSpotId]
  );

  const handleHoverLeave = useCallback(() => setHovered(null), []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden",
        "rounded-xl border border-border",
        "bg-gradient-to-br from-sky-50 via-blue-50/40 to-indigo-50/30",
        "shadow-inner"
      )}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJECTION_CONFIG}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <ZoomableGroup
          center={PROJECTION_CONFIG.center}
          zoom={1}
          minZoom={0.7}
          maxZoom={50}
        >
          {/* Poland polygon */}
          <Geographies geography={POLAND_GEOJSON}>
            {({ geographies }) => (
              <>
                <defs>
                  <clipPath id="poland-clip">
                    {geographies.map((geo) => (
                      <Geography key={`clip-${geo.rsmKey}`} geography={geo} />
                    ))}
                  </clipPath>
                </defs>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#dbeafe",
                        stroke: "#93c5fd",
                        strokeWidth: 0.6,
                        outline: "none",
                      },
                      hover: {
                        fill: "#bfdbfe",
                        stroke: "#60a5fa",
                        strokeWidth: 0.8,
                        outline: "none",
                      },
                      pressed: { fill: "#93c5fd", outline: "none" },
                    }}
                  />
                ))}
              </>
            )}
          </Geographies>

          {/* Water features (Rivers, Lakes) */}
          <Geographies geography={WATER_GEOJSON}>
            {({ geographies }) => (
              <g clipPath="url(#poland-clip)">
                {geographies.map((geo, index) => {
                  const isLine =
                    geo.geometry.type === "LineString" ||
                    geo.geometry.type === "MultiLineString";
                  
                  return (
                    <Geography
                      key={`water-${index}`}
                      geography={geo}
                      style={{
                        default: {
                          fill: isLine ? "none" : "#3b82f6",
                          stroke: isLine ? "#3b82f6" : "none",
                          strokeWidth: isLine ? 1.5 : 0,
                          outline: "none",
                        },
                        hover: {
                          fill: isLine ? "none" : "#2563eb",
                          stroke: isLine ? "#2563eb" : "none",
                          strokeWidth: isLine ? 2 : 0,
                          outline: "none",
                        },
                        pressed: {
                          fill: isLine ? "none" : "#1d4ed8",
                          stroke: isLine ? "#1d4ed8" : "none",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })}
              </g>
            )}
          </Geographies>

          {/* Fishing spot markers */}
          {spots.map((spot) => (
            <SpotMarker
              key={spot.id}
              spot={spot}
              isSelected={selectedSpotId === spot.id}
              isHovered={hovered?.spot.id === spot.id}
              onSelect={onSpotSelect}
              onHoverEnter={handleHoverEnter}
              onHoverLeave={handleHoverLeave}
            />
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip — desktop only (hidden sm:block inside) */}
      {hovered && (
        <HoverTooltip spot={hovered.spot} x={hovered.x} y={hovered.y} t={t} />
      )}

      {/* Zoom hint */}
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-background/70 px-2 py-1 backdrop-blur-sm">
        <p className="text-[10px] text-muted-foreground">
          {t("map.scrollToZoom")}
        </p>
      </div>
    </div>
  );
}
