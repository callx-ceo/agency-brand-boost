import React, { useState } from "react";
import { toast } from "sonner";
import { Phone, MessageSquare, Calendar, ExternalLink, AlertTriangle } from "lucide-react";
import {
  COLORS,
  cardStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  primaryBtnStyle,
  ghostBtnStyle,
  sectionLabelStyle,
} from "./websiteTheme";
import WebsiteSidebar from "./WebsiteSidebar";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMEZONES = ["Eastern Time (ET)", "Central Time (CT)", "Mountain Time (MT)", "Pacific Time (PT)"];

interface DayHours {
  open: boolean;
  start: string;
  end: string;
}

const formatPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const initialState = {
  phoneEnabled: true,
  phone: "(615) 555-0100",
  trackingEnabled: true,
  trackingNumber: "(615) 555-0199",
  smsEnabled: true,
  smsSameAsPhone: true,
  smsNumber: "(615) 555-0100",
  autoReplyEnabled: true,
  autoReplyMessage:
    "Thanks for reaching out! I'll get back to you first thing tomorrow morning. For urgent needs, call (615) 555-0100.",
  bookingEnabled: true,
  bookingUrl: "https://calendly.com/benjaminpowell/15min",
  timezone: "Central Time (CT)",
  hours: {
    Mon: { open: true, start: "08:00", end: "20:00" },
    Tue: { open: true, start: "08:00", end: "20:00" },
    Wed: { open: true, start: "08:00", end: "20:00" },
    Thu: { open: true, start: "08:00", end: "20:00" },
    Fri: { open: true, start: "08:00", end: "20:00" },
    Sat: { open: true, start: "10:00", end: "16:00" },
    Sun: { open: false, start: "09:00", end: "17:00" },
  } as Record<string, DayHours>,
  homeState: "Tennessee",
  nationwide: true,
  serviceStates: [] as string[],
  afterHoursMode: "message" as "message" | "voicemail" | "partner",
  afterHoursMessage: "After hours — call or text and I'll respond first thing in the morning.",
};

type ContactState = typeof initialState;

export const ContactTab: React.FC = () => {
  const [state, setState] = useState<ContactState>(initialState);
  const [original] = useState<ContactState>(initialState);
  const [isDirty, setIsDirty] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [smsConsentChanged, setSmsConsentChanged] = useState(false);

  const update = <K extends keyof ContactState>(key: K, value: ContactState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    setIsDirty(true);
    if (key === "autoReplyMessage" || key === "smsEnabled" || key === "autoReplyEnabled") {
      setSmsConsentChanged(true);
    }
  };

  const updateHours = (day: string, key: keyof DayHours, value: boolean | string) => {
    update("hours", { ...state.hours, [day]: { ...state.hours[day], [key]: value } });
  };

  const applyPreset = (preset: "standard" | "extended" | "247") => {
    const presets: Record<string, Record<string, DayHours>> = {
      standard: Object.fromEntries(
        DAYS.map((d) => [
          d,
          d === "Sat" || d === "Sun"
            ? { open: false, start: "09:00", end: "17:00" }
            : { open: true, start: "09:00", end: "17:00" },
        ]),
      ),
      extended: Object.fromEntries(
        DAYS.map((d) => [
          d,
          d === "Sun"
            ? { open: false, start: "10:00", end: "16:00" }
            : d === "Sat"
            ? { open: true, start: "10:00", end: "16:00" }
            : { open: true, start: "08:00", end: "20:00" },
        ]),
      ),
      "247": Object.fromEntries(DAYS.map((d) => [d, { open: true, start: "00:00", end: "23:59" }])),
    };
    update("hours", presets[preset]);
  };

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setIsDirty(false);
      setSmsConsentChanged(false);
      toast.success("Contact details saved");
    }, 600);
  };

  const handleDiscard = () => {
    setState(original);
    setIsDirty(false);
    setSmsConsentChanged(false);
    toast("Discarded unsaved changes");
  };

  const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div style={{ ...cardStyle, padding: "20px 22px", marginBottom: 16 }}>
      <div style={sectionLabelStyle}>{label}</div>
      {children}
    </div>
  );

  const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string }> = ({ checked, onChange, label }) => (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 12, color: COLORS.text }}>
      <span
        onClick={() => onChange(!checked)}
        style={{
          width: 32,
          height: 18,
          background: checked ? COLORS.green : COLORS.borderMd,
          borderRadius: 999,
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 16 : 2,
            width: 14,
            height: 14,
            background: "#fff",
            borderRadius: 999,
            transition: "left 0.2s",
          }}
        />
      </span>
      {label}
    </label>
  );

  const ContactPreview = (
    <div style={{ background: "#fff", borderRadius: 8, border: `1px solid ${COLORS.border}`, padding: 12 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {state.phoneEnabled && (
          <div style={{ flex: 1, background: COLORS.greenLight, color: COLORS.greenDark, padding: 8, borderRadius: 6, fontSize: 9, textAlign: "center", fontWeight: 500 }}>
            <Phone size={11} /> Call
          </div>
        )}
        {state.smsEnabled && (
          <div style={{ flex: 1, background: COLORS.blueLight, color: COLORS.blueDark, padding: 8, borderRadius: 6, fontSize: 9, textAlign: "center", fontWeight: 500 }}>
            <MessageSquare size={11} /> Text
          </div>
        )}
        {state.bookingEnabled && (
          <div style={{ flex: 1, background: COLORS.purpleLight, color: COLORS.purpleDark, padding: 8, borderRadius: 6, fontSize: 9, textAlign: "center", fontWeight: 500 }}>
            <Calendar size={11} /> Book
          </div>
        )}
      </div>
      <div style={{ fontSize: 10, color: COLORS.text2, lineHeight: 1.5 }}>
        {state.phoneEnabled && <div>📞 {state.trackingEnabled ? state.trackingNumber : state.phone}</div>}
        {state.smsEnabled && <div>💬 Text {state.smsSameAsPhone ? state.phone : state.smsNumber}</div>}
        <div style={{ marginTop: 4, color: COLORS.text3 }}>{state.timezone}</div>
        <div style={{ color: COLORS.text3 }}>{state.nationwide ? "Nationwide" : `${state.serviceStates.length} states`}</div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "flex-start" }}>
      <div>
        {/* Phone */}
        <Section label="Phone">
          <div style={{ marginBottom: 14 }}>
            <Toggle checked={state.phoneEnabled} onChange={(v) => update("phoneEnabled", v)} label="Display phone on website" />
          </div>
          <label style={labelStyle}>Phone number</label>
          <input
            style={inputStyle}
            value={state.phone}
            onChange={(e) => update("phone", formatPhone(e.target.value))}
          />
          <div style={{ marginTop: 14, marginBottom: 6 }}>
            <Toggle checked={state.trackingEnabled} onChange={(v) => update("trackingEnabled", v)} label="Use CallX tracking number" />
          </div>
          <div style={helperStyle}>Track which campaigns drive calls · Your personal number stays private</div>
          {state.trackingEnabled && (
            <div
              style={{
                marginTop: 10,
                padding: "10px 12px",
                background: COLORS.greenLight,
                color: COLORS.greenDark,
                borderRadius: 8,
                fontSize: 11,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Tracking: {state.trackingNumber} → forwards to {state.phone}
            </div>
          )}
        </Section>

        {/* SMS */}
        <Section label="Text messaging">
          <div style={{ marginBottom: 14 }}>
            <Toggle checked={state.smsEnabled} onChange={(v) => update("smsEnabled", v)} label="Display SMS on website" />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: COLORS.text2, marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={state.smsSameAsPhone}
              onChange={(e) => update("smsSameAsPhone", e.target.checked)}
            />
            Same as phone number
          </label>
          {!state.smsSameAsPhone && (
            <input
              style={inputStyle}
              value={state.smsNumber}
              onChange={(e) => update("smsNumber", formatPhone(e.target.value))}
            />
          )}
          <div style={{ marginTop: 14, marginBottom: 8 }}>
            <Toggle
              checked={state.autoReplyEnabled}
              onChange={(v) => update("autoReplyEnabled", v)}
              label="Send auto-reply when texts come in after hours"
            />
          </div>
          {state.autoReplyEnabled && (
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: "vertical", lineHeight: 1.5 }}
              rows={3}
              value={state.autoReplyMessage}
              onChange={(e) => update("autoReplyMessage", e.target.value)}
            />
          )}
        </Section>

        {/* Booking */}
        <Section label="Book a call">
          <div style={{ marginBottom: 14 }}>
            <Toggle checked={state.bookingEnabled} onChange={(v) => update("bookingEnabled", v)} label="Enable booking on website" />
          </div>
          <label style={labelStyle}>Booking URL</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input style={{ ...inputStyle, flex: 1 }} value={state.bookingUrl} onChange={(e) => update("bookingUrl", e.target.value)} />
            <button
              onClick={() => window.open(state.bookingUrl, "_blank")}
              style={{ ...ghostBtnStyle, display: "inline-flex", alignItems: "center", gap: 5 }}
            >
              <ExternalLink size={13} /> Test
            </button>
          </div>
          <div style={helperStyle}>Connects with Calendly, Cal.com, Savvycal, or any URL</div>
        </Section>

        {/* Hours */}
        <Section label="Availability">
          <label style={labelStyle}>Timezone</label>
          <select
            style={inputStyle}
            value={state.timezone}
            onChange={(e) => update("timezone", e.target.value)}
          >
            {TIMEZONES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            <button onClick={() => applyPreset("standard")} style={ghostBtnStyle}>Standard (M–F 9–5)</button>
            <button onClick={() => applyPreset("extended")} style={ghostBtnStyle}>Extended (M–F 8–8, Sat 10–4)</button>
            <button onClick={() => applyPreset("247")} style={ghostBtnStyle}>24/7</button>
          </div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            {DAYS.map((day) => {
              const h = state.hours[day];
              return (
                <div
                  key={day}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 100px 1fr 1fr",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: COLORS.text, fontWeight: 500 }}>{day}</span>
                  <Toggle checked={h.open} onChange={(v) => updateHours(day, "open", v)} label={h.open ? "Open" : "Closed"} />
                  <input
                    type="time"
                    disabled={!h.open}
                    style={{ ...inputStyle, opacity: h.open ? 1 : 0.4 }}
                    value={h.start}
                    onChange={(e) => updateHours(day, "start", e.target.value)}
                  />
                  <input
                    type="time"
                    disabled={!h.open}
                    style={{ ...inputStyle, opacity: h.open ? 1 : 0.4 }}
                    value={h.end}
                    onChange={(e) => updateHours(day, "end", e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        </Section>

        {/* Service area */}
        <Section label="Service area">
          <label style={labelStyle}>Home state</label>
          <input style={inputStyle} value={state.homeState} onChange={(e) => update("homeState", e.target.value)} />
          <div style={{ marginTop: 14 }}>
            <Toggle
              checked={state.nationwide}
              onChange={(v) => update("nationwide", v)}
              label="I accept clients nationwide"
            />
          </div>
          {!state.nationwide && (
            <div style={{ marginTop: 10, padding: 10, background: COLORS.bg, borderRadius: 8, fontSize: 11, color: COLORS.text2 }}>
              Add specific states from your license list to limit service area.
            </div>
          )}
          <div style={{ ...helperStyle, marginTop: 8 }}>Helps set client expectations</div>
        </Section>

        {/* After hours */}
        <Section label="Outside normal hours">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { id: "message", label: 'Show "After hours — call or text" message' },
              { id: "voicemail", label: "Forward calls to voicemail" },
              { id: "partner", label: "Route to partner agent" },
            ].map((opt) => (
              <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: COLORS.text }}>
                <input
                  type="radio"
                  checked={state.afterHoursMode === opt.id}
                  onChange={() => update("afterHoursMode", opt.id as ContactState["afterHoursMode"])}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {state.afterHoursMode === "message" && (
            <textarea
              style={{ ...inputStyle, minHeight: 70, resize: "vertical", marginTop: 12 }}
              value={state.afterHoursMessage}
              onChange={(e) => update("afterHoursMessage", e.target.value)}
            />
          )}
        </Section>
      </div>

      <WebsiteSidebar
        isDirty={isDirty}
        saveState={saveState}
        onSave={handleSave}
        onDiscard={handleDiscard}
        preview={ContactPreview}
        warning={
          smsConsentChanged ? (
            <div
              style={{
                background: COLORS.amberLight,
                border: `1px solid ${COLORS.amber}`,
                borderRadius: 12,
                padding: 14,
                fontSize: 11,
                color: COLORS.amberDark,
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                Changes to auto-reply messaging may require a TCPA review. RestAssured compliance will be notified of edits.
              </span>
            </div>
          ) : undefined
        }
      />
    </div>
  );
};

export default ContactTab;
