import React, { useState } from "react";
import { toast } from "sonner";
import { GripVertical, ChevronDown, ChevronUp, Shield, Heart, Activity, Briefcase, Smile, TrendingUp } from "lucide-react";
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

interface Product {
  id: string;
  enabled: boolean;
  name: string;
  defaultName: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  bg: string;
  color: string;
  description: string;
  coverageMin?: string;
  coverageMax?: string;
  ageMin?: string;
  ageMax?: string;
  features: string[];
  carriers: string[];
  subType?: string;
}

interface FormField {
  id: string;
  label: string;
  enabled: boolean;
  required: boolean;
  canDisable: boolean;
}

const initialProducts: Product[] = [
  {
    id: "fe", enabled: true,
    name: "$5,000 Final Expense Insurance", defaultName: "Final expense",
    Icon: Shield, bg: COLORS.greenLight, color: COLORS.greenDark,
    description: "$5k–$25k coverage. No medical exam required.",
    coverageMin: "5000", coverageMax: "25000",
    ageMin: "50", ageMax: "85",
    features: ["No medical exam", "Guaranteed acceptance ages 50–85", "Coverage begins immediately"],
    carriers: ["AIG Direct", "Mutual of Omaha", "Gerber Life"],
  },
  {
    id: "med", enabled: true,
    name: "Medicare Supplement", defaultName: "Medicare supplement",
    Icon: Heart, bg: COLORS.blueLight, color: COLORS.blueDark,
    description: "Ages 65+. Fill Medicare gaps.",
    ageMin: "65",
    features: ["Plan G, N, F options", "No network restrictions", "Guaranteed renewable"],
    carriers: ["Mutual of Omaha", "Aetna", "Cigna"],
  },
  {
    id: "hosp", enabled: true,
    name: "Hospital Indemnity", defaultName: "Hospital indemnity",
    Icon: Activity, bg: COLORS.amberLight, color: COLORS.amberDark,
    description: "Cash benefits paid directly to you.",
    features: ["Pays cash for hospital stays", "Use funds for any expense"],
    carriers: ["Mutual of Omaha", "Aetna"],
  },
  {
    id: "life", enabled: true,
    name: "Life Insurance", defaultName: "Life insurance",
    Icon: Briefcase, bg: COLORS.purpleLight, color: COLORS.purpleDark,
    description: "Term and whole life options.",
    features: ["Customizable coverage", "Convertible options"],
    carriers: ["Banner Life", "Protective"],
    subType: "both",
  },
  {
    id: "dental", enabled: false,
    name: "Dental & Vision", defaultName: "Dental / vision",
    Icon: Smile, bg: COLORS.tealLight, color: COLORS.tealDark,
    description: "Affordable dental and vision plans.",
    features: ["Preventive care", "Major services"],
    carriers: ["Delta Dental", "Humana"],
  },
  {
    id: "annuity", enabled: false,
    name: "Annuities", defaultName: "Annuities",
    Icon: TrendingUp, bg: COLORS.coralLight, color: COLORS.coralDark,
    description: "Fixed, indexed, and immediate annuities for retirement income.",
    features: ["Guaranteed income", "Tax-deferred growth"],
    carriers: ["Athene", "Allianz"],
  },
];

const initialFormFields: FormField[] = [
  { id: "zip", label: "ZIP code", enabled: true, required: true, canDisable: false },
  { id: "dob", label: "Date of birth", enabled: true, required: true, canDisable: true },
  { id: "phone", label: "Phone number", enabled: true, required: true, canDisable: true },
  { id: "gender", label: "Gender", enabled: true, required: false, canDisable: true },
  { id: "tobacco", label: "Tobacco use", enabled: true, required: false, canDisable: true },
  { id: "coverage", label: "Desired coverage amount", enabled: false, required: false, canDisable: true },
  { id: "health", label: "Existing health conditions", enabled: false, required: false, canDisable: true },
  { id: "email", label: "Email address", enabled: true, required: false, canDisable: true },
  { id: "besttime", label: "Best time to contact", enabled: false, required: false, canDisable: true },
];

export const CoverageTab: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [primary, setPrimary] = useState("fe");
  const [expanded, setExpanded] = useState<string | null>("fe");
  const [fields, setFields] = useState<FormField[]>(initialFormFields);
  const [formTitle, setFormTitle] = useState("Get a personalized quote in 60 seconds");
  const [submitText, setSubmitText] = useState("Quote me");
  const [thankYou, setThankYou] = useState(
    "Thanks! I'll reach out within 1 business hour. Most quotes are delivered within 15 minutes.",
  );
  const [autoAssign, setAutoAssign] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const dirty = () => setIsDirty(true);

  const updateProduct = (id: string, patch: Partial<Product>) => {
    setProducts((p) => p.map((prod) => (prod.id === id ? { ...prod, ...patch } : prod)));
    dirty();
  };

  const moveProduct = (id: string, dir: -1 | 1) => {
    setProducts((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx < 0) return p;
      const next = [...p];
      const swap = idx + dir;
      if (swap < 0 || swap >= next.length) return next;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
    dirty();
  };

  const updateField = (id: string, patch: Partial<FormField>) => {
    setFields((f) => f.map((field) => (field.id === id ? { ...field, ...patch } : field)));
    dirty();
  };

  const updateFeature = (productId: string, idx: number, value: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const next = prod.features.map((f, i) => (i === idx ? value : f));
    updateProduct(productId, { features: next });
  };

  const addFeature = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    updateProduct(productId, { features: [...prod.features, "New feature"] });
  };

  const handleSave = () => {
    if (!products.some((p) => p.enabled)) {
      toast.error("At least one product must be enabled");
      return;
    }
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setIsDirty(false);
      toast.success("Coverage updated");
    }, 600);
  };

  const handleDiscard = () => {
    setProducts(initialProducts);
    setFields(initialFormFields);
    setIsDirty(false);
    toast("Discarded unsaved changes");
  };

  const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }> = ({
    checked, onChange, disabled,
  }) => (
    <span
      onClick={() => !disabled && onChange(!checked)}
      style={{
        width: 32,
        height: 18,
        background: checked ? COLORS.green : COLORS.borderMd,
        borderRadius: 999,
        position: "relative",
        flexShrink: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
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
  );

  const CoveragePreview = (
    <div style={{ background: "#fff", borderRadius: 8, border: `1px solid ${COLORS.border}`, padding: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: COLORS.text2, marginBottom: 8 }}>Coverage section</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {products.filter((p) => p.enabled).slice(0, 4).map((p) => (
          <div
            key={p.id}
            style={{
              padding: 8,
              borderRadius: 6,
              background: p.bg,
              border: p.id === primary ? `1px solid ${p.color}` : `1px solid transparent`,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 500, color: p.color, marginBottom: 2 }}>{p.defaultName}</div>
            <div style={{ fontSize: 8, color: COLORS.text2, lineHeight: 1.3 }}>{p.description.slice(0, 40)}…</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "flex-start" }}>
      <div>
        <div style={{ ...cardStyle, padding: "20px 22px", marginBottom: 16 }}>
          <div style={sectionLabelStyle}>Products enabled on your website</div>
          <div style={{ ...helperStyle, marginBottom: 16 }}>
            Only products you check here appear in your public coverage grid. Use the arrows to reorder.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {products.map((prod, idx) => {
              const isOpen = expanded === prod.id;
              return (
                <div key={prod.id} style={{ ...cardStyle, overflow: "hidden" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: 12,
                      background: prod.enabled ? "#fff" : COLORS.bg,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <button
                        onClick={() => moveProduct(prod.id, -1)}
                        disabled={idx === 0}
                        style={{ background: "none", border: "none", cursor: idx === 0 ? "default" : "pointer", color: COLORS.text3, padding: 0 }}
                      >
                        <ChevronUp size={12} />
                      </button>
                      <GripVertical size={14} color={COLORS.text3} />
                      <button
                        onClick={() => moveProduct(prod.id, 1)}
                        disabled={idx === products.length - 1}
                        style={{ background: "none", border: "none", cursor: idx === products.length - 1 ? "default" : "pointer", color: COLORS.text3, padding: 0 }}
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                    <input
                      type="checkbox"
                      checked={prod.enabled}
                      onChange={(e) => updateProduct(prod.id, { enabled: e.target.checked })}
                      style={{ width: 16, height: 16, accentColor: COLORS.green }}
                    />
                    <span
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: prod.bg, color: prod.color,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <prod.Icon size={16} />
                    </span>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: COLORS.text }}>
                      {prod.defaultName}
                    </div>
                    {primary === prod.id && (
                      <span style={{ background: COLORS.greenLight, color: COLORS.greenDark, fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20 }}>
                        Primary
                      </span>
                    )}
                    <button
                      onClick={() => setExpanded(isOpen ? null : prod.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text2 }}
                    >
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {isOpen && (
                    <div style={{ padding: 16, borderTop: `1px solid ${COLORS.border}`, background: COLORS.bg }}>
                      <div style={{ display: "grid", gap: 12 }}>
                        <div>
                          <label style={labelStyle}>Custom name</label>
                          <input style={inputStyle} value={prod.name} onChange={(e) => updateProduct(prod.id, { name: e.target.value })} />
                        </div>
                        <div>
                          <label style={labelStyle}>Description</label>
                          <textarea
                            style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                            maxLength={120}
                            value={prod.description}
                            onChange={(e) => updateProduct(prod.id, { description: e.target.value })}
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          <div>
                            <label style={labelStyle}>Min coverage $</label>
                            <input style={inputStyle} value={prod.coverageMin ?? ""} onChange={(e) => updateProduct(prod.id, { coverageMin: e.target.value })} />
                          </div>
                          <div>
                            <label style={labelStyle}>Max coverage $</label>
                            <input style={inputStyle} value={prod.coverageMax ?? ""} onChange={(e) => updateProduct(prod.id, { coverageMax: e.target.value })} />
                          </div>
                          <div>
                            <label style={labelStyle}>Min age</label>
                            <input style={inputStyle} value={prod.ageMin ?? ""} onChange={(e) => updateProduct(prod.id, { ageMin: e.target.value })} />
                          </div>
                          <div>
                            <label style={labelStyle}>Max age</label>
                            <input style={inputStyle} value={prod.ageMax ?? ""} onChange={(e) => updateProduct(prod.id, { ageMax: e.target.value })} />
                          </div>
                        </div>
                        {prod.id === "life" && (
                          <div>
                            <label style={labelStyle}>Sub-type</label>
                            <div style={{ display: "flex", gap: 6 }}>
                              {["term", "whole", "both"].map((st) => (
                                <button
                                  key={st}
                                  onClick={() => updateProduct(prod.id, { subType: st })}
                                  style={{
                                    ...ghostBtnStyle,
                                    background: prod.subType === st ? COLORS.green : "#fff",
                                    color: prod.subType === st ? "#fff" : COLORS.text,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <label style={labelStyle}>Key features</label>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {prod.features.map((f, i) => (
                              <input key={i} style={inputStyle} value={f} onChange={(e) => updateFeature(prod.id, i, e.target.value)} />
                            ))}
                            <button onClick={() => addFeature(prod.id)} style={{ ...ghostBtnStyle, alignSelf: "flex-start" }}>+ Add feature</button>
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Featured carriers</label>
                          <div style={{ fontSize: 11, color: COLORS.text2 }}>{prod.carriers.join(" · ")}</div>
                        </div>
                        <button
                          onClick={() => { setPrimary(prod.id); dirty(); }}
                          disabled={primary === prod.id}
                          style={{
                            ...primaryBtnStyle,
                            alignSelf: "flex-start",
                            opacity: primary === prod.id ? 0.5 : 1,
                            cursor: primary === prod.id ? "not-allowed" : "pointer",
                          }}
                        >
                          {primary === prod.id ? "Primary product" : "Set as primary product"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quote form fields */}
        <div style={{ ...cardStyle, padding: "20px 22px", marginBottom: 16 }}>
          <div style={sectionLabelStyle}>Quote form fields</div>
          <div style={{ ...helperStyle, marginBottom: 16 }}>
            What info do you want to collect from visitors before they submit a quote request?
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {fields.map((f) => (
              <div
                key={f.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  background: "#fff",
                }}
              >
                <Toggle
                  checked={f.enabled}
                  disabled={!f.canDisable}
                  onChange={(v) => updateField(f.id, { enabled: v })}
                />
                <span style={{ flex: 1, fontSize: 12, color: COLORS.text }}>
                  {f.label}
                  {!f.canDisable && <span style={{ marginLeft: 6, fontSize: 10, color: COLORS.text3 }}>(required)</span>}
                </span>
                {f.canDisable && f.enabled && (
                  <div style={{ display: "flex", gap: 8, fontSize: 11, color: COLORS.text2 }}>
                    <label>
                      <input
                        type="radio"
                        name={`req-${f.id}`}
                        checked={f.required}
                        onChange={() => updateField(f.id, { required: true })}
                      /> Required
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`req-${f.id}`}
                        checked={!f.required}
                        onChange={() => updateField(f.id, { required: false })}
                      /> Optional
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <div>
              <label style={labelStyle}>Form title</label>
              <input style={inputStyle} value={formTitle} onChange={(e) => { setFormTitle(e.target.value); dirty(); }} />
            </div>
            <div>
              <label style={labelStyle}>Submit button text</label>
              <input style={inputStyle} value={submitText} onChange={(e) => { setSubmitText(e.target.value); dirty(); }} />
            </div>
            <div>
              <label style={labelStyle}>Thank you message</label>
              <textarea
                style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
                value={thankYou}
                onChange={(e) => { setThankYou(e.target.value); dirty(); }}
              />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: COLORS.text }}>
              <Toggle checked={autoAssign} onChange={(v) => { setAutoAssign(v); dirty(); }} />
              Quote form leads come directly to My Contacts under your name
            </label>
          </div>
        </div>
      </div>

      <WebsiteSidebar
        isDirty={isDirty}
        saveState={saveState}
        onSave={handleSave}
        onDiscard={handleDiscard}
        preview={CoveragePreview}
        warning={
          <div style={{ ...cardStyle, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10, color: COLORS.text }}>
              Quote form performance · last 30 days
            </div>
            {[
              { l: "Views", v: "342" },
              { l: "Submissions", v: "47 (13.7%)" },
              { l: "Leads closed", v: "18 (38.3%)" },
            ].map((s) => (
              <div key={s.l} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.text2, padding: "4px 0" }}>
                <span>{s.l}</span>
                <span style={{ color: COLORS.text, fontWeight: 500 }}>{s.v}</span>
              </div>
            ))}
            <a href="#analytics" style={{ display: "inline-block", marginTop: 8, fontSize: 11, color: COLORS.blue }}>
              View full analytics →
            </a>
          </div>
        }
      />
    </div>
  );
};

export default CoverageTab;
