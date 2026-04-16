import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  Info,
  Phone,
  MessageSquare,
  Mail,
  Send,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

/* ============================================================
   CallX — Recommendations page (My Workspace)
   Self-contained, content-only. No sidebar/topbar/logo.
   ============================================================ */

type ChannelKey = "All" | "Calls" | "SMS" | "Email" | "Direct mail" | "Bid increases";

interface RecommendationItem {
  id: string;
  channel: ChannelKey;
  category: string;
  categoryTone: "green" | "blue" | "purple" | "amber" | "red";
  isNew?: boolean;
  impact: string;
  impactTone: "green" | "blue" | "amber";
  title: string;
  description: string;
  reason: string;
  viewLabel: string;
  actionLabel: string;
  actionIcon: React.ReactNode;
  appliedLabel: string;
  toastMessage: string;
}

const TOKENS = {
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
};

const toneMap = {
  green: { bg: TOKENS.greenLight, fg: TOKENS.greenDark, solid: TOKENS.green },
  blue: { bg: TOKENS.blueLight, fg: TOKENS.blueDark, solid: TOKENS.blue },
  purple: { bg: TOKENS.purpleLight, fg: TOKENS.purpleDark, solid: TOKENS.purple },
  amber: { bg: TOKENS.amberLight, fg: TOKENS.amberDark, solid: TOKENS.amber },
  red: { bg: TOKENS.redLight, fg: TOKENS.redDark, solid: TOKENS.red },
};

const RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: "card-1",
    channel: "SMS",
    category: "SMS",
    categoryTone: "green",
    isNew: true,
    impact: "+$480",
    impactTone: "green",
    title: "Send follow-up SMS to 4 expiring leads",
    description:
      "Michael Hayden, Sandra Okonkwo, and 2 others have follow-up windows closing by Friday. One click sends each a personalized SMS from their assigned agent.",
    reason:
      "AI pre-wrote 4 personalized messages using each contact's name, face value, and last call context. Sending now before Friday increases re-engagement by 3.1×.",
    viewLabel: "Preview messages",
    actionLabel: "Send all",
    actionIcon: <MessageSquare size={12} />,
    appliedLabel: "Sent",
    toastMessage: "4 SMS messages sent",
  },
  {
    id: "card-2",
    channel: "Email",
    category: "Email",
    categoryTone: "purple",
    impact: "+$220",
    impactTone: "green",
    title: "Send decision-support emails to 3 quoted leads",
    description:
      "3 leads in Quoted stage haven't opened their original quote email. One click resends a revised email with clearer subject line and a direct CTA to each.",
    reason:
      "AI detected these 3 contacts opened the original email 0 times. A re-send with a different subject line has a 38% open rate improvement in this demographic.",
    viewLabel: "Preview emails",
    actionLabel: "Send all",
    actionIcon: <Mail size={12} />,
    appliedLabel: "Sent",
    toastMessage: "3 emails sent",
  },
  {
    id: "card-3",
    channel: "Direct mail",
    category: "Direct mail",
    categoryTone: "amber",
    impact: "+$180",
    impactTone: "blue",
    title: "Mail postcards to 5 unresponsive warm leads",
    description:
      "5 contacts in Quoted stage haven't responded to SMS or email in 72+ hours. One click sends a personalized postcard to each — printed and mailed same day.",
    reason:
      "Multi-channel outreach increases re-engagement by 2.8× vs digital-only. Physical mail has a 4.4% response rate in the 55–70 age demographic.",
    viewLabel: "Preview postcards",
    actionLabel: "Mail all — $6.00",
    actionIcon: <Send size={12} />,
    appliedLabel: "Queued",
    toastMessage: "5 postcards queued — $6.00",
  },
  {
    id: "card-4",
    channel: "Calls",
    category: "Calls",
    categoryTone: "blue",
    impact: "+$340",
    impactTone: "green",
    title: "Call back 3 inbound leads untouched 24+ hours",
    description:
      "James Rutherford, Marcus Bell, and one other new inbound lead received yesterday have not been contacted. One click queues all 3 for immediate callback.",
    reason:
      "Inbound leads older than 24 hours convert at 60% lower rate. These arrived between 9 AM–2 PM yesterday and have not been assigned to an available agent.",
    viewLabel: "View leads",
    actionLabel: "Schedule all",
    actionIcon: <Phone size={12} />,
    appliedLabel: "Scheduled",
    toastMessage: "3 callbacks scheduled",
  },
  {
    id: "card-5",
    channel: "Bid increases",
    category: "Bid increases",
    categoryTone: "red",
    isNew: true,
    impact: "+$140",
    impactTone: "green",
    title: "Raise bids on top 3 converting lead sources",
    description:
      "Your final expense and Medicare supplement campaigns on RestAssured are converting at 2.4× your current bid ceiling. One click raises bids by 15% to capture more volume.",
    reason:
      "AI detected bid cap is limiting inbound volume on your 3 highest-converting sources. Competitors are winning auctions you're losing by less than $0.40 per lead.",
    viewLabel: "Review bid changes",
    actionLabel: "Raise bids",
    actionIcon: <ArrowUpRight size={12} />,
    appliedLabel: "Applied",
    toastMessage: "Bids raised on 3 sources",
  },
  {
    id: "card-6",
    channel: "SMS",
    category: "SMS",
    categoryTone: "green",
    impact: "+$160",
    impactTone: "amber",
    title: "Re-engage 6 leads marked Not Interested 30+ days ago",
    description:
      "6 leads closed as Not Interested more than 30 days ago. One click sends a re-engagement SMS to each — 18% of re-contacted leads convert on a second touch.",
    reason:
      "These 6 contacts were closed during a high-pressure call. A lower-friction re-engagement text 30+ days later removes the resistance from the first interaction.",
    viewLabel: "Preview messages",
    actionLabel: "Send all",
    actionIcon: <MessageSquare size={12} />,
    appliedLabel: "Sent",
    toastMessage: "6 re-engagement SMS sent",
  },
  {
    id: "card-7",
    channel: "Calls",
    category: "Calls",
    categoryTone: "blue",
    impact: "+$260",
    impactTone: "green",
    title: "Call 4 leads who opened your email but didn't reply",
    description:
      "4 contacts opened the quote email at least twice in the last 48 hours but haven't replied. High open frequency signals purchase intent — a call now capitalizes on that interest.",
    reason:
      "Contacts who open an email 2+ times without replying convert at 2.1× the rate when called within 24 hours vs those who are sent a follow-up email instead.",
    viewLabel: "View leads",
    actionLabel: "Schedule calls",
    actionIcon: <Phone size={12} />,
    appliedLabel: "Scheduled",
    toastMessage: "4 calls scheduled",
  },
];

const FILTERS: { label: ChannelKey; suffix?: string }[] = [
  { label: "All" },
  { label: "Calls", suffix: "+$840" },
  { label: "SMS", suffix: "+$460" },
  { label: "Email", suffix: "+$220" },
  { label: "Direct mail", suffix: "+$180" },
  { label: "Bid increases", suffix: "+$140" },
];

/* ---------- Toast ---------- */
const Toast: React.FC<{ message: string | null }> = ({ message }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: `translateX(-50%) translateY(${message ? 0 : 20}px)`,
        opacity: message ? 1 : 0,
        background: "#1a1a18",
        color: "#fff",
        fontSize: 12,
        fontWeight: 500,
        padding: "10px 20px",
        borderRadius: 20,
        whiteSpace: "nowrap",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: "none",
        zIndex: 60,
        boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {message ? `✓ ${message}` : ""}
    </div>
  );
};

/* ---------- Channel Icon ---------- */
const ChannelIcon: React.FC<{ tone: keyof typeof toneMap; channel: string; size?: number }> = ({
  tone,
  channel,
  size = 24,
}) => {
  const t = toneMap[tone];
  const iconSize = Math.round(size * 0.5);
  let icon: React.ReactNode = <Sparkles size={iconSize} />;
  if (channel === "Calls") icon = <Phone size={iconSize} />;
  else if (channel === "SMS") icon = <MessageSquare size={iconSize} />;
  else if (channel === "Email") icon = <Mail size={iconSize} />;
  else if (channel === "Direct mail") icon = <Send size={iconSize} />;
  else if (channel === "Bid increases") icon = <ArrowUpRight size={iconSize} />;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: t.bg,
        color: t.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  );
};

/* ---------- Recommendation Card ---------- */
interface CardProps {
  item: RecommendationItem;
  applied: boolean;
  onApply: (id: string) => void;
  onView: (item: RecommendationItem) => void;
}
const RecommendationCard: React.FC<CardProps> = ({ item, applied, onApply, onView }) => {
  const impactTone = toneMap[item.impactTone];
  const catTone = toneMap[item.categoryTone];

  return (
    <div
      style={{
        background: TOKENS.surface,
        borderRadius: 12,
        padding: 16,
        border: `1px solid ${TOKENS.border}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 10,
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <ChannelIcon tone={item.categoryTone} channel={item.channel} size={24} />
          <span
            style={{
              background: catTone.bg,
              color: catTone.fg,
              fontSize: 10.5,
              fontWeight: 500,
              padding: "3px 8px",
              borderRadius: 999,
            }}
          >
            {item.category}
          </span>
          {item.isNew && (
            <span
              style={{
                background: TOKENS.amberLight,
                color: TOKENS.amberDark,
                fontSize: 9.5,
                fontWeight: 600,
                padding: "2px 7px",
                borderRadius: 999,
                letterSpacing: "0.02em",
              }}
            >
              NEW
            </span>
          )}
        </div>
        <span
          style={{
            background: impactTone.bg,
            color: impactTone.fg,
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {item.impact} est.
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          lineHeight: 1.35,
          margin: "0 0 6px 0",
          color: TOKENS.text,
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 11.5,
          color: TOKENS.text2,
          lineHeight: 1.55,
          flex: 1,
          margin: "0 0 8px 0",
        }}
      >
        {item.description}
      </p>

      {/* Reason */}
      <p
        style={{
          fontSize: 10.5,
          color: TOKENS.text3,
          lineHeight: 1.55,
          borderBottom: `1px solid ${TOKENS.border}`,
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        {item.reason}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
        <button
          onClick={() => onView(item)}
          style={{
            background: "transparent",
            border: "none",
            color: TOKENS.blueDark,
            fontSize: 11.5,
            fontWeight: 500,
            cursor: "pointer",
            padding: 0,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {item.viewLabel}
        </button>
        {applied ? (
          <span
            style={{
              background: TOKENS.greenLight,
              color: TOKENS.greenDark,
              fontSize: 11,
              fontWeight: 500,
              padding: "6px 13px",
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              animation: "rec-slide-in 0.2s ease",
            }}
          >
            <Check size={12} strokeWidth={3} />
            {item.appliedLabel}
          </span>
        ) : (
          <button
            onClick={() => onApply(item.id)}
            style={{
              background: TOKENS.green,
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              padding: "6px 13px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = TOKENS.greenDark)}
            onMouseLeave={(e) => (e.currentTarget.style.background = TOKENS.green)}
          >
            {item.actionIcon}
            {item.actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------- Featured Recommendation ---------- */
interface FeaturedProps {
  applied: boolean;
  onApply: () => void;
}
const FeaturedRecommendation: React.FC<FeaturedProps> = ({ applied, onApply }) => {
  const stats = [
    { label: "Missed callbacks", value: "6 open", tone: "red" as const },
    { label: "Avg wait time", value: "4.2 hrs", tone: "amber" as const },
    { label: "Est. qualifications", value: "~3 leads", tone: "amber" as const },
    { label: "Est. revenue", value: "+$620", tone: "green" as const },
    { label: "Team benchmark", value: "< 5 min", tone: "green" as const },
  ];

  return (
    <div
      style={{
        background: TOKENS.surface,
        borderRadius: 12,
        padding: 20,
        border: `1px solid ${TOKENS.border}`,
        display: "flex",
        gap: 20,
        alignItems: "stretch",
      }}
    >
      {/* Left */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Applied banner */}
        {applied && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: TOKENS.greenLight,
              color: TOKENS.greenDark,
              fontSize: 11,
              fontWeight: 500,
              padding: "6px 10px",
              borderRadius: 6,
              marginBottom: 10,
              width: "fit-content",
              animation: "rec-slide-down 0.2s ease",
            }}
          >
            <Check size={12} strokeWidth={3} />
            Applied — 6 callbacks scheduled · est. delivery today
          </div>
        )}

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 8,
          }}
        >
          <ChannelIcon tone="blue" channel="Calls" size={30} />
          <h2
            style={{
              fontSize: 15,
              fontWeight: 500,
              margin: 0,
              color: TOKENS.text,
              flex: 1,
              minWidth: 0,
            }}
          >
            Schedule callbacks for 6 missed inbound calls
          </h2>
          <span
            style={{
              marginLeft: "auto",
              background: TOKENS.greenLight,
              color: TOKENS.greenDark,
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            +$620 est.
          </span>
        </div>

        <p style={{ fontSize: 12, color: TOKENS.text2, lineHeight: 1.55, margin: "0 0 8px 0" }}>
          You have 6 missed inbound calls without a scheduled callback. One click queues all 6 for
          same-day callbacks, assigned to available agents, in priority order by lead value.
        </p>
        <p style={{ fontSize: 11, color: TOKENS.text3, lineHeight: 1.55, margin: "0 0 14px 0" }}>
          Leads called back within 5 minutes are 21× more likely to qualify. These 6 leads have been
          waiting an average of 4.2 hours. 4 have a face value of $5,000+.
        </p>

        {/* Actions */}
        {!applied && (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={onApply}
              style={{
                background: TOKENS.green,
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                padding: "9px 20px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = TOKENS.greenDark)}
              onMouseLeave={(e) => (e.currentTarget.style.background = TOKENS.green)}
            >
              <Phone size={13} />
              Schedule 6 callbacks now
            </button>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: TOKENS.blueDark,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              View leads
            </button>
          </div>
        )}
      </div>

      {/* Right: stats */}
      <div
        style={{
          width: 240,
          flexShrink: 0,
          background: "#fafaf7",
          padding: 12,
          borderRadius: 14,
          border: `1px solid ${TOKENS.border}`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: TOKENS.text3,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            paddingBottom: 2,
          }}
        >
          Impact estimate
        </div>
        {stats.map((s) => {
          const tone = toneMap[s.tone];
          return (
            <div
              key={s.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: TOKENS.surface,
                border: `1px solid ${TOKENS.border}`,
                padding: "6px 10px",
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 11, color: TOKENS.text2 }}>{s.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: tone.fg }}>{s.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Score Card ---------- */
interface ScoreCardProps {
  score: number;
  appliedCount: number;
  pendingCount: number;
  onDismissAll: () => void;
  onApplyAll: () => void;
  applyAllDisabled: boolean;
}
const ScoreCard: React.FC<ScoreCardProps> = ({
  score,
  appliedCount,
  pendingCount,
  onDismissAll,
  onApplyAll,
  applyAllDisabled,
}) => {
  const [displayScore, setDisplayScore] = useState(score);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = displayScore;
    const target = score;
    if (start === target) return;
    const step = start < target ? 1 : -1;
    let current = start;
    const tick = () => {
      current += step;
      setDisplayScore(current);
      if ((step > 0 && current < target) || (step < 0 && current > target)) {
        rafRef.current = window.setTimeout(tick, 30) as unknown as number;
      }
    };
    rafRef.current = window.setTimeout(tick, 30) as unknown as number;
    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const subtitle =
    pendingCount === 0
      ? `${appliedCount} actions applied this week · 0 pending · you've maxed out this week!`
      : `${appliedCount} actions applied this week · ${pendingCount} pending · applying all would bring you to 96%`;

  return (
    <div
      style={{
        background: TOKENS.surface,
        borderRadius: 12,
        padding: 20,
        border: `1px solid ${TOKENS.border}`,
        display: "flex",
        gap: 32,
        alignItems: "center",
      }}
    >
      {/* Score */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "'DM Mono', ui-monospace, monospace",
            fontSize: 38,
            fontWeight: 500,
            color: TOKENS.green,
            lineHeight: 1,
          }}
        >
          {displayScore}%
        </div>
      </div>

      {/* Middle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            color: TOKENS.text,
            marginBottom: 4,
          }}
        >
          Revenue readiness score
          <Info size={13} color={TOKENS.text3} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11.5,
            color: TOKENS.greenDark,
            marginBottom: 10,
          }}
        >
          <Check size={12} strokeWidth={3} />
          {subtitle}
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 20,
            background: "#eef0ec",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${score}%`,
              background: TOKENS.green,
              transition: "width 0.4s ease",
              borderRadius: 20,
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={onDismissAll}
          style={{
            background: "transparent",
            border: `1px solid ${TOKENS.borderMd}`,
            color: TOKENS.text2,
            fontSize: 12,
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: 999,
            cursor: "pointer",
          }}
        >
          Dismiss all
        </button>
        <button
          onClick={onApplyAll}
          disabled={applyAllDisabled}
          style={{
            background: applyAllDisabled ? "#cfd8d2" : TOKENS.green,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: 999,
            border: "none",
            cursor: applyAllDisabled ? "not-allowed" : "pointer",
          }}
        >
          Apply all — +$1,840 est.
        </button>
      </div>
    </div>
  );
};

/* ---------- Filter Chips ---------- */
const FilterChips: React.FC<{ active: ChannelKey; onChange: (k: ChannelKey) => void }> = ({
  active,
  onChange,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {FILTERS.map((f) => {
        const isActive = active === f.label;
        return (
          <button
            key={f.label}
            onClick={() => onChange(f.label)}
            style={{
              background: isActive ? TOKENS.green : TOKENS.surface,
              color: isActive ? "#fff" : TOKENS.text2,
              border: `1px solid ${isActive ? TOKENS.green : TOKENS.borderMd}`,
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 500,
              borderRadius: 20,
              cursor: "pointer",
              transition: "background 0.15s ease, color 0.15s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "#fafaf7";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = TOKENS.surface;
            }}
          >
            {f.label}
            {f.suffix && (
              <span
                style={{ marginLeft: 6, color: isActive ? "rgba(255,255,255,0.85)" : TOKENS.text3 }}
              >
                {f.suffix}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

/* ---------- Main ---------- */
const AgentRecommendationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"recommendations" | "auto-apply" | "history">(
    "recommendations"
  );
  const [activeFilter, setActiveFilter] = useState<ChannelKey>("All");
  const [featuredApplied, setFeaturedApplied] = useState(false);
  const [appliedCards, setAppliedCards] = useState<Set<string>>(new Set());
  const [appliedCount, setAppliedCount] = useState(8);
  const [currentScore, setCurrentScore] = useState(74);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = window.setTimeout(() => setToastMessage(null), 2500) as unknown as number;
  };

  const totalActionable = RECOMMENDATIONS.length + 1; // 7 + featured
  const doneActionable =
    appliedCards.size + (featuredApplied ? 1 : 0);
  const pendingCount = Math.max(0, totalActionable - doneActionable);

  const handleFeaturedApply = () => {
    if (featuredApplied) return;
    setFeaturedApplied(true);
    setAppliedCount((c) => c + 1);
    setCurrentScore((s) => Math.min(96, s + 3));
    showToast("6 callbacks scheduled");
  };

  const handleCardApply = (id: string) => {
    if (appliedCards.has(id)) return;
    const item = RECOMMENDATIONS.find((r) => r.id === id);
    if (!item) return;
    setAppliedCards((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setAppliedCount((c) => c + 1);
    setCurrentScore((s) => Math.min(96, s + 2));
    showToast(item.toastMessage);
  };

  const handleApplyAll = () => {
    let delay = 0;
    if (!featuredApplied) {
      setTimeout(handleFeaturedApply, delay);
      delay += 140;
    }
    RECOMMENDATIONS.forEach((r) => {
      if (!appliedCards.has(r.id)) {
        setTimeout(() => handleCardApply(r.id), delay);
        delay += 140;
      }
    });
  };

  const handleViewItem = (item: RecommendationItem) => {
    showToast(`Opening ${item.viewLabel.toLowerCase()}...`);
  };

  const handleDismissAll = () => {
    showToast("All recommendations dismissed");
  };

  const visibleRecs = RECOMMENDATIONS.filter((r) =>
    activeFilter === "All" ? true : r.channel === activeFilter
  );

  return (
    <div
      style={{
        background: TOKENS.bg,
        padding: 24,
        minHeight: "100%",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        color: TOKENS.text,
      }}
    >
      {/* keyframes */}
      <style>{`
        @keyframes rec-slide-down {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rec-slide-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Page Title */}
      <h1 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 14px 0", color: TOKENS.text }}>
        Recommendations
      </h1>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 24,
          borderBottom: `1px solid ${TOKENS.border}`,
          marginBottom: 18,
        }}
      >
        {[
          { id: "recommendations" as const, label: "Recommendations" },
          { id: "auto-apply" as const, label: "Auto-apply settings" },
          { id: "history" as const, label: "History" },
        ].map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: "transparent",
                border: "none",
                padding: "8px 0",
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? TOKENS.green : TOKENS.text2,
                borderBottom: `2px solid ${isActive ? TOKENS.green : "transparent"}`,
                marginBottom: -1,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {activeTab === "recommendations" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <ScoreCard
            score={currentScore}
            appliedCount={appliedCount}
            pendingCount={pendingCount}
            onDismissAll={handleDismissAll}
            onApplyAll={handleApplyAll}
            applyAllDisabled={pendingCount === 0}
          />

          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: TOKENS.text,
                marginBottom: 10,
              }}
            >
              Top recommendation for you
            </div>
            <FeaturedRecommendation applied={featuredApplied} onApply={handleFeaturedApply} />
          </div>

          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: TOKENS.text,
                marginBottom: 10,
              }}
            >
              More recommendations
            </div>
            <div style={{ marginBottom: 14 }}>
              <FilterChips active={activeFilter} onChange={setActiveFilter} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {visibleRecs.map((item) => (
                <RecommendationCard
                  key={item.id}
                  item={item}
                  applied={appliedCards.has(item.id)}
                  onApply={handleCardApply}
                  onView={handleViewItem}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "auto-apply" && (
        <div
          style={{
            background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`,
            borderRadius: 12,
            padding: 32,
            textAlign: "center",
            color: TOKENS.text2,
            fontSize: 13,
          }}
        >
          Auto-apply rules will appear here. Configure which recommendation types apply
          automatically without manual review.
        </div>
      )}

      {activeTab === "history" && (
        <div
          style={{
            background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`,
            borderRadius: 12,
            padding: 32,
            textAlign: "center",
            color: TOKENS.text2,
            fontSize: 13,
          }}
        >
          A timeline of every applied and dismissed recommendation will appear here.
        </div>
      )}

      <Toast message={toastMessage} />
    </div>
  );
};

export default AgentRecommendationsView;
