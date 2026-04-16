import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import { toast } from "sonner";
import {
  Pencil,
  ExternalLink,
  Copy,
  MessageSquare,
  Mail,
  Facebook,
  Linkedin,
  Globe,
  Download,
  UserCircle,
  UserPlus,
  QrCode,
  Star,
  ArrowUp,
  Smartphone,
  Monitor,
  Users,
  CheckCircle2,
} from "lucide-react";

type WebsiteTab = "overview" | "profile" | "contact" | "coverage" | "reviews";
type DeviceMode = "desktop" | "mobile";

const agent = {
  subdomain: "benjaminpowell",
  firstName: "Benjamin",
  lastName: "Powell",
  initials: "BP",
  fullUrl: "https://benjaminpowell.restassuredbenefits.com",
  cmpid: "BP01_fe_0001",
  phone: "(615) 555-0100",
  licensedStates: 38,
  tagline: "Final expense specialist",
  heroTitle: "Protect your family with coverage built around your life.",
  heroSub: "Same-day approval · No medical exam · 38 states licensed",
  reviewCount: 128,
  avgReview: 4.9,
  newReviews: 3,
  visitors: 342,
  visitorsTrend: 22,
  leads: 18,
  leadsTrend: 6,
  qrScans: 47,
  qrScansTrend: 12,
};

const recentActivity = [
  {
    id: "a1",
    type: "lead",
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    Icon: UserPlus,
    title: "New lead from quote form",
    timestamp: "12 min ago",
    subtitle: "Robert Chen · Nashville TN · interested in final expense",
  },
  {
    id: "a2",
    type: "visitors",
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    Icon: Users,
    title: "12 visitors from Facebook",
    timestamp: "2 hrs ago",
    subtitle: 'Spike from your April 14 post · 3 clicked "Get a quote"',
  },
  {
    id: "a3",
    type: "qr",
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
    Icon: QrCode,
    title: "QR code scanned from postcard campaign",
    timestamp: "5 hrs ago",
    subtitle: "Source: BP01_fe_0001 · 4 scans from Apr 12 mailing",
  },
  {
    id: "a4",
    type: "lead",
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    Icon: UserPlus,
    title: "New lead · Sandra Kim",
    timestamp: "Yesterday",
    subtitle: "Referred by benjaminpowell.restassuredbenefits.com · Medicare supplement",
  },
];

const latestReviews = [
  {
    id: "r1",
    stars: 5,
    text: "Benjamin made the whole process so easy. He explained every option clearly and helped us pick the right policy without any pressure.",
    author: "Linda Castellano",
    date: "Apr 12",
    source: "Google",
    sourceColors: { bg: "#E1F5EE", text: "#0F6E56" },
    isNew: false,
  },
  {
    id: "r2",
    stars: 5,
    text: "Finally someone who doesn't use high pressure tactics. Got my mom set up with a great policy in less than an hour.",
    author: "Terrence Wilkes",
    date: "Apr 8",
    source: "RestAssured",
    sourceColors: { bg: "#E6F1FB", text: "#185FA5" },
    isNew: false,
  },
  {
    id: "r3",
    stars: 5,
    text: "Saved my mom over $40/month on her final expense policy. Benjamin took the time to compare carriers and find the best fit.",
    author: "Priya Nambiar",
    date: "New — needs reply",
    source: "BBB",
    sourceColors: { bg: "#FAEEDA", text: "#854F0B" },
    isNew: true,
  },
];

const COLORS = {
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
};

// Counts up to a target value over ~400ms
function useCountUp(target: number, duration = 400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * t);
      if (t < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafSafe(raf));
  }, [target, duration]);
  return value;
}
function rafSafe(id: number) { return id; }

const formatNumber = (n: number, decimals = 0) =>
  decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString();

const AgentMyWebsiteView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WebsiteTab>("overview");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const qrWrapRef = useRef<HTMLDivElement>(null);

  const fullUrlWithCmp = `${agent.fullUrl}?cmpid=${agent.cmpid}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(agent.fullUrl);
      setCopyState("copied");
      toast.success("URL copied");
      setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      toast.error("Could not copy URL");
    }
  };

  const handleShareSms = () => {
    window.location.href = `sms:?body=${encodeURIComponent(`Check out my insurance website: ${agent.fullUrl}`)}`;
  };
  const handleShareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent("My insurance site")}&body=${encodeURIComponent(agent.fullUrl)}`;
  };
  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(agent.fullUrl)}`, "_blank");
  };
  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(agent.fullUrl)}`, "_blank");
  };
  const handleCopyIframe = async () => {
    const snippet = `<iframe src="${agent.fullUrl}" width="100%" height="600" frameborder="0"></iframe>`;
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success("Embed code copied");
    } catch {
      toast.error("Could not copy embed code");
    }
  };

  const filenameBase = `${agent.firstName.toLowerCase()}-${agent.lastName.toLowerCase()}-qr`;

  const downloadFile = (data: string, filename: string) => {
    const a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getQrSvgEl = () => qrWrapRef.current?.querySelector("svg") as SVGSVGElement | null;

  const handleDownloadSvg = () => {
    const svg = getQrSvgEl();
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, `${filenameBase}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success("QR downloaded (SVG)");
  };

  const renderQrToCanvas = (size = 600): Promise<HTMLCanvasElement> =>
    new Promise((resolve, reject) => {
      const svg = getQrSvgEl();
      if (!svg) return reject(new Error("No QR"));
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svg);
      const svg64 = btoa(unescape(encodeURIComponent(source)));
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No ctx"));
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        resolve(canvas);
      };
      img.onerror = reject;
      img.src = `data:image/svg+xml;base64,${svg64}`;
    });

  const handleDownloadPng = async () => {
    try {
      const canvas = await renderQrToCanvas(600);
      const url = canvas.toDataURL("image/png");
      downloadFile(url, `${filenameBase}.png`);
      toast.success("QR downloaded (PNG)");
    } catch {
      toast.error("Could not export PNG");
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const canvas = await renderQrToCanvas(600);
      const png = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "pt", format: "letter" });
      pdf.addImage(png, "PNG", 156, 156, 300, 300);
      pdf.setFontSize(14);
      pdf.text(`${agent.firstName} ${agent.lastName}`, 306, 480, { align: "center" });
      pdf.setFontSize(10);
      pdf.text(agent.fullUrl.replace("https://", ""), 306, 498, { align: "center" });
      pdf.save(`${filenameBase}.pdf`);
      toast.success("QR downloaded (PDF)");
    } catch {
      toast.error("Could not export PDF");
    }
  };

  const visitors = useCountUp(agent.visitors);
  const leads = useCountUp(agent.leads);
  const qrScans = useCountUp(agent.qrScans);
  const avgReview = useCountUp(agent.avgReview);

  const goLive = () => window.open(agent.fullUrl, "_blank");

  // Header
  const Header = (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center" style={{ gap: 12 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, color: COLORS.text, margin: 0 }}>
          My Website
        </h1>
        <span
          className="inline-flex items-center"
          style={{
            background: COLORS.greenLight,
            color: COLORS.greenDark,
            fontSize: 11,
            fontWeight: 500,
            padding: "3px 9px",
            borderRadius: 20,
            gap: 6,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: 999, background: COLORS.green, display: "inline-block" }} />
          Live
        </span>
      </div>
      <div className="flex items-center" style={{ gap: 8 }}>
        <button
          onClick={() => setActiveTab("profile")}
          className="inline-flex items-center"
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            padding: "7px 14px",
            borderRadius: 8,
            fontSize: 12,
            color: COLORS.text,
            gap: 6,
            cursor: "pointer",
          }}
        >
          <Pencil size={13} /> Edit website
        </button>
        <button
          onClick={goLive}
          className="inline-flex items-center"
          style={{
            background: COLORS.green,
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            gap: 6,
            cursor: "pointer",
          }}
        >
          <ExternalLink size={13} /> View live site
        </button>
      </div>
    </div>
  );

  const tabs: { id: WebsiteTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "profile", label: "Profile" },
    { id: "contact", label: "Contact" },
    { id: "coverage", label: "Coverage" },
    { id: "reviews", label: "Reviews" },
  ];

  const TabBar = (
    <div style={{ borderBottom: `1px solid ${COLORS.border}`, marginBottom: 20, display: "flex" }}>
      {tabs.map((t) => {
        const active = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: active ? 500 : 400,
              color: active ? COLORS.green : COLORS.text2,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${active ? COLORS.green : "transparent"}`,
              cursor: "pointer",
              marginBottom: -1,
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.color = COLORS.text;
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.color = COLORS.text2;
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );

  const cardStyle: React.CSSProperties = {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
  };

  // URL + QR row
  const UrlAndQrRow = (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: 16,
        marginBottom: 16,
      }}
    >
      {/* URL Card */}
      <div style={{ ...cardStyle, padding: "18px 20px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: COLORS.green,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Your website URL
        </div>
        <div
          style={{
            background: COLORS.bg,
            borderRadius: 8,
            padding: "12px 14px",
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: COLORS.text,
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            https://<span style={{ color: COLORS.green, fontWeight: 500 }}>{agent.subdomain}</span>.restassuredbenefits.com
          </div>
          <button
            onClick={handleCopyUrl}
            className="inline-flex items-center"
            style={{
              padding: "6px 10px",
              fontSize: 11,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 6,
              background: "#fff",
              gap: 6,
              cursor: "pointer",
              color: COLORS.text,
              whiteSpace: "nowrap",
            }}
          >
            <Copy size={12} />
            {copyState === "copied" ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <div className="flex flex-wrap" style={{ gap: 6 }}>
          {[
            { label: "Share via SMS", Icon: MessageSquare, onClick: handleShareSms },
            { label: "Share via email", Icon: Mail, onClick: handleShareEmail },
            { label: "Facebook", Icon: Facebook, onClick: handleShareFacebook },
            { label: "LinkedIn", Icon: Linkedin, onClick: handleShareLinkedIn },
            { label: "Copy iframe", Icon: Globe, onClick: handleCopyIframe },
          ].map((s) => (
            <button
              key={s.label}
              onClick={s.onClick}
              className="inline-flex items-center"
              style={{
                padding: "8px 12px",
                fontSize: 11,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                background: "#fff",
                gap: 6,
                cursor: "pointer",
                color: COLORS.text,
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.green)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.border)}
            >
              <s.Icon size={12} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* QR Card */}
      <div style={{ ...cardStyle, padding: "18px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            alignSelf: "flex-start",
            fontSize: 11,
            fontWeight: 500,
            color: COLORS.green,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          QR code
        </div>
        <div
          ref={qrWrapRef}
          style={{
            width: 140,
            height: 140,
            padding: 8,
            background: "#fff",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <QRCodeSVG value={fullUrlWithCmp} size={124} bgColor="#ffffff" fgColor="#1a1a18" level="M" />
        </div>
        <div style={{ fontSize: 10, color: COLORS.text3, marginBottom: 10 }}>Print-ready · 300 DPI</div>
        <div style={{ display: "flex", gap: 6, width: "100%" }}>
          {[
            { label: "PNG", onClick: handleDownloadPng },
            { label: "SVG", onClick: handleDownloadSvg },
            { label: "PDF", onClick: handleDownloadPdf },
          ].map((b) => (
            <button
              key={b.label}
              onClick={b.onClick}
              className="inline-flex items-center justify-center"
              style={{
                flex: 1,
                padding: "7px 8px",
                fontSize: 11,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 6,
                background: "#fff",
                gap: 5,
                cursor: "pointer",
                color: COLORS.text,
              }}
            >
              <Download size={11} />
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Stats Grid
  const stats = [
    {
      label: "Visitors this week",
      value: formatNumber(visitors),
      Icon: UserCircle,
      iconBg: COLORS.blueLight,
      iconColor: COLORS.blueDark,
      trend: { dir: "up" as const, text: `+${agent.visitorsTrend}% vs last week`, color: COLORS.green },
    },
    {
      label: "Leads captured",
      value: formatNumber(leads),
      Icon: UserPlus,
      iconBg: COLORS.greenLight,
      iconColor: COLORS.greenDark,
      trend: { dir: "up" as const, text: `+${agent.leadsTrend} vs last week`, color: COLORS.green },
    },
    {
      label: "QR scans",
      value: formatNumber(qrScans),
      Icon: QrCode,
      iconBg: COLORS.purpleLight,
      iconColor: COLORS.purpleDark,
      trend: { dir: "up" as const, text: `+${agent.qrScansTrend} from postcards`, color: COLORS.green },
    },
    {
      label: "Avg review",
      value: formatNumber(avgReview, 1),
      Icon: Star,
      iconBg: COLORS.amberLight,
      iconColor: COLORS.amberDark,
      trend: { dir: "flat" as const, text: `${agent.reviewCount} reviews · ${agent.newReviews} new`, color: COLORS.text2 },
    },
  ];

  const StatsGrid = (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
      {stats.map((s) => (
        <div key={s.label} style={{ ...cardStyle, padding: "16px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: COLORS.text2 }}>{s.label}</span>
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: s.iconBg,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <s.Icon size={12} style={{ color: s.iconColor }} />
            </span>
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.text,
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            {s.value}
          </div>
          <div className="inline-flex items-center" style={{ fontSize: 11, color: s.trend.color, gap: 4 }}>
            {s.trend.dir === "up" && <ArrowUp size={11} />}
            {s.trend.text}
          </div>
        </div>
      ))}
    </div>
  );

  // Live preview
  const frameWidth = deviceMode === "desktop" ? 520 : 360;
  const frameHeight = 280;

  const LivePreview = (
    <div style={{ ...cardStyle, overflow: "hidden", marginBottom: 20 }}>
      <div
        style={{
          padding: "14px 20px",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>Live preview</div>
        <div className="flex items-center" style={{ gap: 8 }}>
          {[
            { label: "Mobile", Icon: Smartphone, onClick: () => setDeviceMode("mobile"), active: deviceMode === "mobile" },
            { label: "Desktop", Icon: Monitor, onClick: () => setDeviceMode("desktop"), active: deviceMode === "desktop" },
            { label: "Edit", Icon: Pencil, onClick: () => setActiveTab("profile"), active: false },
          ].map((b) => (
            <button
              key={b.label}
              onClick={b.onClick}
              className="inline-flex items-center"
              style={{
                fontSize: 11,
                padding: "6px 10px",
                border: `1px solid ${b.active ? COLORS.green : COLORS.border}`,
                color: b.active ? COLORS.greenDark : COLORS.text,
                background: b.active ? COLORS.greenLight : "#fff",
                borderRadius: 6,
                gap: 5,
                cursor: "pointer",
              }}
            >
              <b.Icon size={12} />
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: 20, background: COLORS.bg, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            border: `1px solid ${COLORS.border}`,
            width: "100%",
            maxWidth: frameWidth,
            height: frameHeight,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Browser bar */}
          <div
            style={{
              padding: "7px 12px",
              background: "#f7f6f3",
              borderBottom: `1px solid ${COLORS.border}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 4 }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                <span key={c} style={{ width: 8, height: 8, borderRadius: 999, background: c, display: "inline-block" }} />
              ))}
            </div>
            <div
              style={{
                flex: 1,
                background: "#fff",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 4,
                padding: "2px 8px",
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: COLORS.text2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {agent.subdomain}.restassuredbenefits.com
            </div>
          </div>
          {/* Content */}
          <div style={{ padding: "16px 20px", display: "flex", gap: 16, alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  background: COLORS.greenLight,
                  color: COLORS.greenDark,
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontSize: 9,
                  fontWeight: 500,
                  marginBottom: 6,
                }}
              >
                {agent.tagline}
              </span>
              <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3, color: COLORS.text, marginBottom: 4 }}>
                {agent.heroTitle}
              </div>
              <div style={{ fontSize: 10, color: COLORS.text2, marginBottom: 8 }}>{agent.heroSub}</div>
              <button
                style={{
                  background: COLORS.green,
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                  padding: "5px 10px",
                  fontSize: 10,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Get a free quote
              </button>
            </div>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 999,
                background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 500,
                boxShadow: `0 0 0 2px #fff, 0 0 0 5.5px ${COLORS.green}`,
                flexShrink: 0,
              }}
            >
              {agent.initials}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Activity + Reviews
  const ActivityAndReviewsRow = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {/* Activity */}
      <div style={{ ...cardStyle, overflow: "hidden" }}>
        <div
          style={{
            padding: "14px 18px",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>Recent website activity</div>
          <button
            onClick={() => toast("Activity log coming soon")}
            style={{ fontSize: 11, color: COLORS.blue, background: "none", border: "none", cursor: "pointer" }}
          >
            View all
          </button>
        </div>
        <div style={{ padding: "8px 4px" }}>
          {recentActivity.map((a) => (
            <div
              key={a.id}
              onClick={() => toast(`Opening ${a.title}`)}
              style={{
                padding: "10px 14px",
                display: "flex",
                gap: 10,
                borderRadius: 6,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = COLORS.bg)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: a.iconBg,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <a.Icon size={14} style={{ color: a.iconColor }} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 2,
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.text }}>{a.title}</span>
                  <span style={{ fontSize: 10, color: COLORS.text3, flexShrink: 0 }}>{a.timestamp}</span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.text2,
                    lineHeight: 1.45,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {a.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ ...cardStyle, overflow: "hidden" }}>
        <div
          style={{
            padding: "14px 18px",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>Latest reviews</div>
          <button
            onClick={() => setActiveTab("reviews")}
            style={{ fontSize: 11, color: COLORS.blue, background: "none", border: "none", cursor: "pointer" }}
          >
            Manage all
          </button>
        </div>
        <div style={{ padding: "8px 4px" }}>
          {latestReviews.map((r) => (
            <div
              key={r.id}
              onClick={() => setActiveTab("reviews")}
              style={{
                padding: "10px 14px",
                borderRadius: 6,
                cursor: "pointer",
                background: r.isNew ? COLORS.amberLight : "transparent",
                transition: "background 0.15s",
                marginBottom: 2,
              }}
              onMouseEnter={(e) => {
                if (!r.isNew) (e.currentTarget as HTMLDivElement).style.background = COLORS.bg;
              }}
              onMouseLeave={(e) => {
                if (!r.isNew) (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} size={10} fill={COLORS.amber} stroke={COLORS.amber} />
                ))}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: COLORS.text,
                  lineHeight: 1.5,
                  marginBottom: 4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                "{r.text}"
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10 }}>
                <span style={{ color: r.isNew ? COLORS.amberDark : COLORS.text2, fontWeight: r.isNew ? 500 : 400 }}>
                  {r.author} · {r.date}
                </span>
                <span
                  style={{
                    background: r.sourceColors.bg,
                    color: r.sourceColors.text,
                    fontSize: 9,
                    padding: "1px 6px",
                    borderRadius: 20,
                    fontWeight: 500,
                  }}
                >
                  {r.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PlaceholderTab = ({ name }: { name: string }) => (
    <div style={{ padding: "60px 20px", textAlign: "center", color: COLORS.text3, fontSize: 13 }}>
      {name} tab — coming soon
    </div>
  );

  return (
    <div style={{ padding: 24, background: COLORS.bg, minHeight: "100%" }}>
      {Header}
      {TabBar}
      {activeTab === "overview" && (
        <>
          {UrlAndQrRow}
          {StatsGrid}
          {LivePreview}
          {ActivityAndReviewsRow}
        </>
      )}
      {activeTab === "profile" && <PlaceholderTab name="Profile" />}
      {activeTab === "contact" && <PlaceholderTab name="Contact" />}
      {activeTab === "coverage" && <PlaceholderTab name="Coverage" />}
      {activeTab === "reviews" && <PlaceholderTab name="Reviews" />}
    </div>
  );
};

export default AgentMyWebsiteView;
