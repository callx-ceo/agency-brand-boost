import React from "react";
import { COLORS } from "./websiteTheme";

interface Props {
  agent: {
    initials: string;
    tagline: string;
    heroTitle: string;
    heroSub: string;
    subdomain: string;
  };
}

export const MiniHeroPreview: React.FC<Props> = ({ agent }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        border: `1px solid ${COLORS.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "6px 10px",
          background: "#f7f6f3",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", gap: 3 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} style={{ width: 6, height: 6, borderRadius: 999, background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 4,
            padding: "1px 6px",
            fontFamily: "'DM Mono', monospace",
            fontSize: 8,
            color: COLORS.text2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {agent.subdomain}.restassuredbenefits.com
        </div>
      </div>
      <div style={{ padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              display: "inline-block",
              background: COLORS.greenLight,
              color: COLORS.greenDark,
              padding: "1px 6px",
              borderRadius: 20,
              fontSize: 8,
              fontWeight: 500,
              marginBottom: 5,
            }}
          >
            {agent.tagline}
          </span>
          <div style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.3, color: COLORS.text, marginBottom: 3 }}>
            {agent.heroTitle}
          </div>
          <div
            style={{
              fontSize: 9,
              color: COLORS.text2,
              marginBottom: 6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {agent.heroSub}
          </div>
          <button
            style={{
              background: COLORS.green,
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "3px 8px",
              fontSize: 9,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Get a free quote
          </button>
        </div>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 500,
            boxShadow: `0 0 0 2px #fff, 0 0 0 4.5px ${COLORS.green}`,
            flexShrink: 0,
          }}
        >
          {agent.initials}
        </div>
      </div>
    </div>
  );
};

export default MiniHeroPreview;
