import { ImageResponse } from "next/og";

import { BUSINESS } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse 70% 60% at 50% 30%, #2a2410 0%, #09090b 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 88,
            fontWeight: 700,
            color: "#f6f5f1",
          }}
        >
          Root
          <span
            style={{
              background: "linear-gradient(120deg, #ffe99a, #f4c430 45%, #b8860b)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Mobiles
          </span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#9a9a94" }}>{BUSINESS.tagline}</div>
      </div>
    ),
    { ...size }
  );
}
