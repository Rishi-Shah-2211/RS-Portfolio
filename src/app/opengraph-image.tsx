import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Branded share card.
 *
 * Chat apps often render a link preview as a small SQUARE thumbnail cropped
 * from the centre of the image, so anything parked on the right edge (like a
 * side portrait) disappears. The portrait therefore runs full-bleed with the
 * face on the horizontal centre line, and the copy sits over a dark scrim on
 * the left — readable in the wide card and still face-first when cropped.
 *
 * rishi-og.jpg is pre-cropped to exactly 1200x630 so nothing here depends on
 * object-fit or inset, neither of which Satori handles reliably.
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
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          background: "#140d11",
          color: "#f3f0ee",
          fontFamily: "serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", left: 0, top: 0 }}
        />

        {/* dark scrim on the left so the copy reads over a pale photo */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "1200px",
            height: "630px",
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(16,10,13,0.97) 0%, rgba(16,10,13,0.95) 30%, rgba(24,14,20,0.72) 44%, rgba(32,18,26,0.22) 58%, rgba(32,18,26,0) 70%)",
          }}
        />

        {/* copy */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "560px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 36px 52px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 19,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d8bccb",
              fontFamily: "sans-serif",
            }}
          >
            <span>Rishi Shah · Canada</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 60, lineHeight: 1.05, letterSpacing: -2 }}>
              Software,
            </div>
            <div
              style={{
                fontSize: 60,
                lineHeight: 1.05,
                letterSpacing: -2,
                fontStyle: "italic",
                color: "#e2c8d6",
              }}
            >
              engineered
            </div>
            <div style={{ fontSize: 60, lineHeight: 1.05, letterSpacing: -2 }}>
              with intent.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#cbb9c3",
              fontFamily: "sans-serif",
            }}
          >
            <span>Full-stack · ML · LLM copilots</span>
            <span style={{ color: "#f3f0ee", marginTop: 10 }}>
              portfolio-rhs.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
