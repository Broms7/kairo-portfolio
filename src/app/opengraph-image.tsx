import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Plomberie Express — Plombier 24/7 en Île-de-France";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A2540",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          color: "white",
          fontFamily: "system-ui",
          backgroundImage:
            "linear-gradient(rgba(184,115,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,115,51,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#BA7517",
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#B91C1C",
            }}
          />
          Disponible 24/7 · Île-de-France
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Coupez l&apos;arrivée d&apos;eau.
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#B87333",
          }}
        >
          On arrive.
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
            Plomberie Express · Devis IA en 60s
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#BA7517",
              border: "1px solid #BA7517",
              padding: "8px 16px",
              borderRadius: 4,
            }}
          >
            kairo.fr
          </div>
        </div>
      </div>
    ),
    size
  );
}
