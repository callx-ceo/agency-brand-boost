import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Upload,
  Trash2,
  CheckCircle2,
  X,
  Plus,
  Sparkles,
  Shield,
  Star as StarIcon,
  Clock,
  ThumbsUp,
  Check,
} from "lucide-react";
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
import MiniHeroPreview from "./MiniHeroPreview";

interface Agent {
  initials: string;
  tagline: string;
  heroTitle: string;
  heroSub: string;
  subdomain: string;
}

const TRUST_ICONS = [
  { id: "check", Icon: Check },
  { id: "shield", Icon: Shield },
  { id: "star", Icon: StarIcon },
  { id: "clock", Icon: Clock },
  { id: "thumbs", Icon: ThumbsUp },
];

const ALL_LANGUAGES = [
  "English", "Spanish", "Mandarin", "Vietnamese", "Korean",
  "Tagalog", "Arabic", "French", "Portuguese", "Russian", "Other",
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME",
  "MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA",
  "RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

interface License {
  id: string;
  state: string;
  number: string;
  expiration: string;
}

const initialState = {
  photoUrl: "",
  firstName: "Benjamin",
  lastName: "Powell",
  subdomain: "benjaminpowell",
  title: "Licensed Insurance Agent",
  experience: 12,
  eyebrow: "Licensed in 38 states · Final expense specialist",
  heroTitle: "Protect your family with coverage built around your life.",
  heroSub:
    "Simple, affordable final expense and senior insurance. No medical exam, guaranteed acceptance ages 50–85, and same-day coverage decisions from a licensed agent who actually picks up the phone.",
  trustItems: [
    { text: "No medical exam", icon: "check" },
    { text: "Same-day approval", icon: "shield" },
    { text: "Top carriers compared", icon: "star" },
  ],
  bio: `I've spent the last 12 years helping families across the country protect what matters most. After watching my own grandmother struggle to navigate confusing policies, I decided to dedicate my career to making senior insurance simple and honest.

My approach is straightforward: I listen first, compare every option from top-rated carriers, and only recommend what actually fits your life and budget. No high-pressure tactics. No hidden fees. Just clear answers from a licensed professional who picks up the phone.

Whether you're looking at final expense, Medicare supplements, or hospital indemnity, I'll walk you through everything in plain language and help you make a confident decision.`,
  licenses: [
    { id: "l1", state: "TN", number: "TN-2384921", expiration: "2027-08-15" },
    { id: "l2", state: "GA", number: "GA-19283744", expiration: "2026-11-22" },
    { id: "l3", state: "FL", number: "FL-W839201", expiration: "2027-02-10" },
  ] as License[],
  primaryLicense: "l1",
  languages: ["English", "Spanish"],
};

type ProfileState = typeof initialState;

interface Props {
  onLivePreviewChange?: (a: Partial<Agent>) => void;
}

export const ProfileTab: React.FC<Props> = () => {
  const [state, setState] = useState<ProfileState>(initialState);
  const [originalState] = useState<ProfileState>(initialState);
  const [isDirty, setIsDirty] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [subdomainStatus, setSubdomainStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [aiOpen, setAiOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof ProfileState>(key: K, value: ProfileState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    setIsDirty(true);
  };

  // Subdomain availability debounce
  useEffect(() => {
    if (state.subdomain === originalState.subdomain) {
      setSubdomainStatus("idle");
      return;
    }
    setSubdomainStatus("checking");
    const t = setTimeout(() => {
      setSubdomainStatus(state.subdomain.toLowerCase() === "taken" ? "taken" : "available");
    }, 500);
    return () => clearTimeout(t);
  }, [state.subdomain, originalState.subdomain]);

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setIsDirty(false);
      toast.success("Profile saved");
    }, 600);
  };

  const handleDiscard = () => {
    setState(originalState);
    setIsDirty(false);
    toast("Discarded unsaved changes");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Photo must be under 4 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      update("photoUrl", String(reader.result));
      toast.success("Photo uploaded");
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => update("photoUrl", "");
  const useInitials = () => {
    update("photoUrl", "");
    toast("Using initials");
  };

  const updateTrust = (idx: number, key: "text" | "icon", val: string) => {
    const next = state.trustItems.map((t, i) => (i === idx ? { ...t, [key]: val } : t));
    update("trustItems", next);
  };
  const addTrust = () => update("trustItems", [...state.trustItems, { text: "", icon: "check" }]);
  const removeTrust = (idx: number) => update("trustItems", state.trustItems.filter((_, i) => i !== idx));

  const updateLicense = (id: string, key: keyof License, val: string) => {
    update("licenses", state.licenses.map((l) => (l.id === id ? { ...l, [key]: val } : l)));
  };
  const addLicense = () => {
    const id = `l${Date.now()}`;
    update("licenses", [...state.licenses, { id, state: "TN", number: "", expiration: "" }]);
  };
  const removeLicense = (id: string) => {
    update("licenses", state.licenses.filter((l) => l.id !== id));
  };

  const toggleLanguage = (lang: string) => {
    const has = state.languages.includes(lang);
    update("languages", has ? state.languages.filter((l) => l !== lang) : [...state.languages, lang]);
  };

  const initials = useMemo(
    () => `${state.firstName[0] ?? ""}${state.lastName[0] ?? ""}`.toUpperCase(),
    [state.firstName, state.lastName],
  );

  const previewAgent: Agent = {
    initials,
    tagline: state.eyebrow,
    heroTitle: state.heroTitle,
    heroSub: state.heroSub,
    subdomain: state.subdomain,
  };

  const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div style={{ ...cardStyle, padding: "20px 22px", marginBottom: 16 }}>
      <div style={sectionLabelStyle}>{label}</div>
      {children}
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "flex-start" }}>
      {/* LEFT */}
      <div>
        {/* Photo */}
        <Section label="Profile photo">
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 999,
                  background: state.photoUrl
                    ? `url(${state.photoUrl}) center/cover`
                    : `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  fontWeight: 500,
                }}
              >
                {!state.photoUrl && initials}
              </div>
              {state.photoUrl && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 4,
                    right: 4,
                    background: COLORS.green,
                    border: "2px solid #fff",
                    borderRadius: 999,
                    padding: 3,
                    color: "#fff",
                    display: "inline-flex",
                  }}
                >
                  <CheckCircle2 size={14} />
                </span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                type="file"
                accept="image/png,image/jpeg"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
              <button onClick={() => fileInputRef.current?.click()} style={{ ...primaryBtnStyle, gap: 6, display: "inline-flex", alignItems: "center" }}>
                <Upload size={13} /> Upload new photo
              </button>
              {state.photoUrl && (
                <button onClick={removePhoto} style={{ ...ghostBtnStyle, gap: 6, display: "inline-flex", alignItems: "center" }}>
                  <Trash2 size={13} /> Remove photo
                </button>
              )}
              <button onClick={useInitials} style={ghostBtnStyle}>Use my initials</button>
            </div>
          </div>
          <div style={helperStyle}>
            Square photo recommended · JPG or PNG · Max 4 MB · Shown in hero, postcards, and SMS signatures
          </div>
        </Section>

        {/* Basic info */}
        <Section label="Basic info">
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={labelStyle}>First name</label>
              <input style={inputStyle} value={state.firstName} onChange={(e) => update("firstName", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Last name</label>
              <input style={inputStyle} value={state.lastName} onChange={(e) => update("lastName", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Subdomain</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  background: "#fff",
                  overflow: "hidden",
                }}
              >
                <input
                  style={{
                    ...inputStyle,
                    border: "none",
                    fontFamily: "'DM Mono', monospace",
                    flex: 1,
                  }}
                  value={state.subdomain}
                  onChange={(e) => update("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                />
                <span style={{ padding: "0 12px", fontSize: 13, color: COLORS.text3, fontFamily: "'DM Mono', monospace" }}>
                  .restassuredbenefits.com
                </span>
                <span style={{ padding: "0 12px", display: "flex", alignItems: "center" }}>
                  {subdomainStatus === "available" && <CheckCircle2 size={16} color={COLORS.green} />}
                  {subdomainStatus === "taken" && <X size={16} color={COLORS.red} />}
                  {subdomainStatus === "checking" && <span style={{ fontSize: 10, color: COLORS.text3 }}>checking…</span>}
                </span>
              </div>
              <div style={helperStyle}>Once set, changing this creates redirects from your old URL</div>
            </div>
            <div>
              <label style={labelStyle}>Professional title</label>
              <input style={inputStyle} value={state.title} onChange={(e) => update("title", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Years of experience</label>
              <input
                type="number"
                style={inputStyle}
                value={state.experience}
                onChange={(e) => update("experience", Number(e.target.value))}
              />
            </div>
          </div>
        </Section>

        {/* Website copy */}
        <Section label="Website copy">
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={labelStyle}>Eyebrow tag</label>
              <input
                style={inputStyle}
                maxLength={60}
                value={state.eyebrow}
                onChange={(e) => update("eyebrow", e.target.value)}
              />
              <div style={helperStyle}>{state.eyebrow.length}/60</div>
            </div>
            <div>
              <label style={labelStyle}>Hero headline</label>
              <textarea
                style={{ ...inputStyle, minHeight: 60, resize: "vertical", lineHeight: 1.5 }}
                rows={2}
                maxLength={120}
                value={state.heroTitle}
                onChange={(e) => update("heroTitle", e.target.value)}
              />
              <div style={helperStyle}>{state.heroTitle.length}/120 · Shown in the hero section</div>
            </div>
            <div>
              <label style={labelStyle}>Hero subheadline</label>
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: "vertical", lineHeight: 1.5 }}
                rows={3}
                maxLength={200}
                value={state.heroSub}
                onChange={(e) => update("heroSub", e.target.value)}
              />
              <div style={helperStyle}>{state.heroSub.length}/200</div>
            </div>
            <div>
              <label style={labelStyle}>Trust items</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {state.trustItems.map((item, idx) => {
                  const IconComp = TRUST_ICONS.find((i) => i.id === item.icon)?.Icon ?? Check;
                  return (
                    <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <select
                        value={item.icon}
                        onChange={(e) => updateTrust(idx, "icon", e.target.value)}
                        style={{ ...inputStyle, width: 80, padding: "8px" }}
                      >
                        {TRUST_ICONS.map((i) => (
                          <option key={i.id} value={i.id}>{i.id}</option>
                        ))}
                      </select>
                      <IconComp size={16} color={COLORS.green} />
                      <input
                        style={{ ...inputStyle, flex: 1 }}
                        value={item.text}
                        onChange={(e) => updateTrust(idx, "text", e.target.value)}
                      />
                      <button onClick={() => removeTrust(idx)} style={{ ...ghostBtnStyle, padding: "8px" }}>
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
                {state.trustItems.length < 5 && (
                  <button
                    onClick={addTrust}
                    style={{ ...ghostBtnStyle, alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    <Plus size={13} /> Add trust item
                  </button>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* About me */}
        <Section label="About me">
          <textarea
            style={{ ...inputStyle, minHeight: 220, resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }}
            rows={10}
            maxLength={2000}
            value={state.bio}
            onChange={(e) => update("bio", e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <button
              onClick={() => setAiOpen(true)}
              style={{
                background: COLORS.purpleLight,
                color: COLORS.purpleDark,
                border: `1px solid ${COLORS.purpleLight}`,
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Sparkles size={13} /> Generate with AI
            </button>
            <span style={{ fontSize: 11, color: COLORS.text3 }}>{state.bio.length}/2000</span>
          </div>
          <div style={helperStyle}>Shown in the About section · Tell your story and why clients choose you</div>
        </Section>

        {/* Licenses */}
        <Section label="Licenses">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {state.licenses.map((lic) => (
              <div
                key={lic.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 160px auto auto",
                  gap: 8,
                  alignItems: "center",
                  padding: 10,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  background: lic.id === state.primaryLicense ? COLORS.greenLight : "#fff",
                }}
              >
                <select
                  value={lic.state}
                  onChange={(e) => updateLicense(lic.id, "state", e.target.value)}
                  style={{ ...inputStyle, padding: "8px" }}
                >
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input
                  style={inputStyle}
                  placeholder="License #"
                  value={lic.number}
                  onChange={(e) => updateLicense(lic.id, "number", e.target.value)}
                />
                <input
                  type="date"
                  style={inputStyle}
                  value={lic.expiration}
                  onChange={(e) => updateLicense(lic.id, "expiration", e.target.value)}
                />
                <input
                  type="radio"
                  name="primary-license"
                  checked={lic.id === state.primaryLicense}
                  onChange={() => update("primaryLicense", lic.id)}
                  title="Primary"
                />
                <button onClick={() => removeLicense(lic.id)} style={{ ...ghostBtnStyle, padding: "8px" }}>
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addLicense}
              style={{ ...ghostBtnStyle, alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              <Plus size={13} /> Add license
            </button>
          </div>
          <div style={{ ...helperStyle, marginTop: 12 }}>
            You are licensed in <strong style={{ color: COLORS.text }}>{state.licenses.length}</strong> state{state.licenses.length === 1 ? "" : "s"}
          </div>
        </Section>

        {/* Languages */}
        <Section label="Languages spoken">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {ALL_LANGUAGES.map((lang) => {
              const active = state.languages.includes(lang);
              return (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  style={{
                    padding: "6px 12px",
                    fontSize: 12,
                    borderRadius: 20,
                    border: `1px solid ${active ? COLORS.green : COLORS.borderMd}`,
                    background: active ? COLORS.green : "#fff",
                    color: active ? "#fff" : COLORS.text2,
                    cursor: "pointer",
                  }}
                >
                  {lang}
                </button>
              );
            })}
          </div>
          <div style={helperStyle}>Appears in your contact info for bilingual clients</div>
        </Section>
      </div>

      {/* RIGHT */}
      <WebsiteSidebar
        isDirty={isDirty}
        saveState={saveState}
        onSave={handleSave}
        onDiscard={handleDiscard}
        preview={<MiniHeroPreview agent={previewAgent} />}
        fullUrl={`https://${state.subdomain}.restassuredbenefits.com`}
        tipsTitle="Profile tips"
        tips={[
          "Photos with a smile get 34% more leads",
          "Bios over 100 words outperform short ones",
          "Listing all licensed states builds trust with out-of-area clients",
        ]}
      />

      {/* AI modal */}
      {aiOpen && (
        <div
          onClick={() => setAiOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              ...cardStyle,
              padding: 24,
              maxWidth: 480,
              width: "90%",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: COLORS.text }}>Generate bio with AI</div>
            <div style={{ fontSize: 12, color: COLORS.text2, marginBottom: 16 }}>Pick a tone — we'll regenerate using your other profile fields.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Professional", "Friendly", "Confident"].map((tone) => (
                <button
                  key={tone}
                  onClick={() => {
                    toast.success(`Generating ${tone.toLowerCase()} bio…`);
                    setAiOpen(false);
                  }}
                  style={{
                    ...ghostBtnStyle,
                    textAlign: "left",
                    padding: "12px 16px",
                  }}
                >
                  <strong>{tone}</strong>
                </button>
              ))}
            </div>
            <button onClick={() => setAiOpen(false)} style={{ ...ghostBtnStyle, marginTop: 16, width: "100%" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
