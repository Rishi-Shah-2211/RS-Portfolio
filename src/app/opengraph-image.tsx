import { ImageResponse } from "next/og";

/**
 * Branded share card — what WhatsApp, LinkedIn, X, and Slack render when
 * the site is linked. Plum Noir palette, editorial type, same voice as the
 * site itself.
 */
export const alt = "Rishi Shah — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1b1216 0%, #2a1524 45%, #4e1a31 100%)",
          padding: "64px 72px",
          color: "#f3f0ee",
          fontFamily: "serif",
        }}
      >
        {/* top rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d8bccb",
            fontFamily: "sans-serif",
          }}
        >
          <span>Rishi Shah</span>
          <span>Petlad, Gujarat · India</span>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1.02, letterSpacing: -3 }}>
            Software,
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: -3,
              fontStyle: "italic",
              color: "#d8bccb",
            }}
          >
            engineered
          </div>
          <div style={{ fontSize: 96, lineHeight: 1.02, letterSpacing: -3 }}>
            with intent.
          </div>
        </div>

        {/* bottom rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#cbb9c3",
            fontFamily: "sans-serif",
            borderTop: "1px solid rgba(243,240,238,0.22)",
            paddingTop: 26,
          }}
        >
          <span>Full-stack · ML · LLM copilots</span>
          <span style={{ color: "#f3f0ee" }}>portfolio-rhs.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
