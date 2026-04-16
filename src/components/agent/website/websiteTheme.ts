import * as React from "react";

export const COLORS = {
  bg: "#f5f4f1",
  surface: "#ffffff",
  border: "rgba(0,0,0,0.08)",
  borderMd: "rgba(0,0,0,0.12)",
  text: "#1a1a18",
  text2: "#6b6b67",
  text3: "#a0a09c",
  green: "#1D9E75",
  greenLight: "#E1F5EE",
  greenDark: "#0F6E56",
  blue: "#378ADD",
  blueLight: "#E6F1FB",
  blueDark: "#185FA5",
  purple: "#7F77DD",
  purpleLight: "#EEEDFE",
  purpleDark: "#534AB7",
  amber: "#EF9F27",
  amberLight: "#FAEEDA",
  amberDark: "#854F0B",
  red: "#E24B4A",
  redLight: "#FCEBEB",
  redDark: "#A32D2D",
  teal: "#14B8A6",
  tealLight: "#CCFBF1",
  tealDark: "#0F766E",
  coral: "#FB7185",
  coralLight: "#FFE4E6",
  coralDark: "#9F1239",
};

export const cardStyle: React.CSSProperties = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 12,
};

export const sectionLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: COLORS.green,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: 12,
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  fontSize: 13,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 8,
  background: "#fff",
  color: COLORS.text,
  outline: "none",
  fontFamily: "inherit",
};

export const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  color: COLORS.text2,
  marginBottom: 6,
  fontWeight: 500,
};

export const helperStyle: React.CSSProperties = {
  fontSize: 11,
  color: COLORS.text3,
  marginTop: 6,
};

export const primaryBtnStyle: React.CSSProperties = {
  background: COLORS.green,
  color: "#fff",
  border: "none",
  padding: "9px 16px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
};

export const ghostBtnStyle: React.CSSProperties = {
  background: "#fff",
  color: COLORS.text,
  border: `1px solid ${COLORS.border}`,
  padding: "9px 16px",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
};

export const subtleBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: COLORS.text2,
  border: "none",
  padding: "6px 8px",
  fontSize: 12,
  cursor: "pointer",
};

export const sectionCardStyle: React.CSSProperties = {
  ...cardStyle,
  padding: "20px 22px",
  marginBottom: 16,
};
