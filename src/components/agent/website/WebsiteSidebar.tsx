import React from "react";
import { ExternalLink } from "lucide-react";
import { COLORS, cardStyle, primaryBtnStyle } from "./websiteTheme";

interface Props {
  isDirty: boolean;
  saveState: "idle" | "saving" | "saved" | "error";
  lastSavedText?: string;
  onSave: () => void;
  onDiscard: () => void;
  preview?: React.ReactNode;
  fullUrl?: string;
  tipsTitle?: string;
  tips?: string[];
  warning?: React.ReactNode;
}

export const WebsiteSidebar: React.FC<Props> = ({
  isDirty,
  saveState,
  lastSavedText = "All changes saved",
  onSave,
  onDiscard,
  preview,
  fullUrl,
  tipsTitle = "Tips",
  tips,
  warning,
}) => {
  return (
    <div
      style={{
        position: "sticky",
        top: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignSelf: "flex-start",
      }}
    >
      {preview && (
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${COLORS.border}`,
              fontSize: 12,
              fontWeight: 500,
              color: COLORS.text,
            }}
          >
            Live preview
          </div>
          <div style={{ padding: 12, background: COLORS.bg }}>{preview}</div>
          {fullUrl && (
            <a
              href={fullUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "10px 12px",
                borderTop: `1px solid ${COLORS.border}`,
                fontSize: 11,
                color: COLORS.blue,
                textDecoration: "none",
              }}
            >
              View full site <ExternalLink size={11} />
            </a>
          )}
        </div>
      )}

      <div style={{ ...cardStyle, padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
            fontSize: 12,
            color: COLORS.text2,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: isDirty ? COLORS.amber : COLORS.green,
              display: "inline-block",
            }}
          />
          {isDirty ? "Unsaved changes" : lastSavedText}
        </div>
        <button
          onClick={onSave}
          disabled={!isDirty || saveState === "saving"}
          style={{
            ...primaryBtnStyle,
            width: "100%",
            opacity: !isDirty || saveState === "saving" ? 0.5 : 1,
            cursor: !isDirty || saveState === "saving" ? "not-allowed" : "pointer",
          }}
        >
          {saveState === "saving" ? "Saving…" : "Save changes"}
        </button>
        {isDirty && (
          <button
            onClick={onDiscard}
            style={{
              width: "100%",
              marginTop: 8,
              background: "transparent",
              border: "none",
              fontSize: 11,
              color: COLORS.text2,
              cursor: "pointer",
              padding: "6px",
            }}
          >
            Discard changes
          </button>
        )}
      </div>

      {warning}

      {tips && tips.length > 0 && (
        <div
          style={{
            background: COLORS.purpleLight,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: COLORS.purpleDark,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ⚡ {tipsTitle}
          </div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: COLORS.purpleDark, lineHeight: 1.6 }}>
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WebsiteSidebar;
