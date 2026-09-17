import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Branded share card — what WhatsApp, LinkedIn, X, and Slack render when
 * the site is linked. Plum Noir palette, editorial type, and the portrait
 * on the right so the link carries a face.
 */
export const alt = "Rishi Shah — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "rishi-og.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #1b1216 0%, #2a1524 45%, #4e1a31 100%)",
          color: "#f3f0ee",
          fontFamily: "serif",
        }}
      >
        {/* copy */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 20px 58px 68px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d8bccb",
              fontFamily: "sans-serif",
            }}
          >
            <span>Rishi Shah · Canada</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 82, lineHeight: 1.02, letterSpacing: -3 }}>
              Software,
            </div>
            <div
              style={{
                fontSize: 82,
                lineHeight: 1.02,
                letterSpacing: -3,
                fontStyle: "italic",
                color: "#d8bccb",
              }}
            >
              engineered
            </div>
            <div style={{ fontSize: 82, lineHeight: 1.02, letterSpacing: -3 }}>
              with intent.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#cbb9c3",
              fontFamily: "sans-serif",
              borderTop: "1px solid rgba(243,240,238,0.22)",
              paddingTop: 22,
            }}
          >
            <span>Full-stack · ML · LLM copilots</span>
            <span style={{ color: "#f3f0ee" }}>portfolio-rhs.vercel.app</span>
          </div>
        </div>

        {/* portrait */}
        <div style={{ display: "flex", position: "relative", width: 430, height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={430}
            height={630}
            style={{ objectFit: "cover", objectPosition: "50% 22%" }}
          />
          {/* plum wash so the photo sits inside the palette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(27,18,22,0.92) 0%, rgba(27,18,22,0.25) 26%, rgba(78,26,49,0.18) 100%)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
