import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Star, MoreVertical, Sparkles, Copy, Download, Plus } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  COLORS,
  cardStyle,
  inputStyle,
  primaryBtnStyle,
  ghostBtnStyle,
  helperStyle,
} from "./websiteTheme";

interface Review {
  id: string;
  stars: number;
  author: string;
  initials: string;
  location: string;
  source: "Google" | "RestAssured" | "BBB" | "CallX";
  date: string;
  text: string;
  status: "needs-reply" | "replied" | "hidden" | "flagged";
  reply?: { text: string; date: string };
  isNew?: boolean;
}

const SOURCE_COLORS: Record<Review["source"], { bg: string; color: string }> = {
  Google: { bg: COLORS.greenLight, color: COLORS.greenDark },
  RestAssured: { bg: COLORS.blueLight, color: COLORS.blueDark },
  BBB: { bg: COLORS.amberLight, color: COLORS.amberDark },
  CallX: { bg: COLORS.purpleLight, color: COLORS.purpleDark },
};

const initialReviews: Review[] = [
  {
    id: "rv1", stars: 5, author: "Priya Nambiar", initials: "PN",
    location: "Knoxville, TN", source: "BBB", date: "Mar 29, 2026 · 2 days ago",
    text: "Saved my mom over $40/month on her final expense policy. Benjamin took the time to compare everything and was super patient.",
    status: "needs-reply", isNew: true,
  },
  {
    id: "rv2", stars: 5, author: "Linda Castellano", initials: "LC",
    location: "Nashville, TN", source: "Google", date: "Apr 12, 2026",
    text: "Benjamin made the whole process so easy. He explained everything clearly and got us coverage in under 20 minutes. Highly recommend!",
    status: "replied",
    reply: { text: "Thank you Linda! It was a pleasure helping you and your family.", date: "Apr 12, 2026" },
  },
  {
    id: "rv3", stars: 5, author: "Terrence Wilkes", initials: "TW",
    location: "Memphis, TN", source: "RestAssured", date: "Apr 8, 2026",
    text: "Finally someone who doesn't use high pressure tactics. Got my mom set up with a great policy in less than an hour.",
    status: "replied",
    reply: { text: "Thanks Terrence! Glad we could help.", date: "Apr 8, 2026" },
  },
  {
    id: "rv4", stars: 4, author: "Margaret O'Sullivan", initials: "MO",
    location: "Chattanooga, TN", source: "Google", date: "Apr 5, 2026",
    text: "Very knowledgeable and helped me pick the right Medicare supplement. Took a bit longer than expected but worth it.",
    status: "needs-reply", isNew: true,
  },
  {
    id: "rv5", stars: 5, author: "Carlos Mendoza", initials: "CM",
    location: "Atlanta, GA", source: "CallX", date: "Apr 1, 2026",
    text: "Bilingual service was a huge plus. My parents felt comfortable and informed throughout the whole process.",
    status: "replied",
    reply: { text: "Gracias Carlos! It was a pleasure working with your family.", date: "Apr 1, 2026" },
  },
  {
    id: "rv6", stars: 3, author: "Robert Heinlein", initials: "RH",
    location: "Birmingham, AL", source: "BBB", date: "Mar 28, 2026",
    text: "The policy is good but I wish the paperwork process had been faster.",
    status: "needs-reply",
  },
  {
    id: "rv7", stars: 5, author: "Janet Pearson", initials: "JP",
    location: "Louisville, KY", source: "Google", date: "Mar 22, 2026",
    text: "Honest, clear, no surprises. That's all I ask for.",
    status: "hidden",
  },
];

const stats = {
  avg: 4.9, totalReviews: 128, newThisWeek: 3, responseRate: 94, publicCount: 127,
};

const FILTER_CHIPS = [
  { id: "all", label: "All" },
  { id: "needs-reply", label: "New (needs reply)" },
  { id: "5", label: "5 stars" },
  { id: "4", label: "4 stars" },
  { id: "3", label: "3 stars" },
  { id: "2", label: "2 stars" },
  { id: "1", label: "1 star" },
  { id: "hidden", label: "Hidden" },
  { id: "flagged", label: "Flagged" },
];

export const ReviewsTab: React.FC = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [requestTab, setRequestTab] = useState<"contact" | "link" | "qr">("contact");
  const [autoRequest, setAutoRequest] = useState(true);
  const [waitDays, setWaitDays] = useState(3);
  const [showReviews, setShowReviews] = useState(true);
  const [minRating, setMinRating] = useState("all");
  const [maxOnHomepage, setMaxOnHomepage] = useState("3");

  const reviewLink = "restassuredbenefits.com/benjaminpowell/review";

  const filtered = useMemo(() => {
    let r = [...reviews];
    if (activeFilter === "needs-reply") r = r.filter((x) => x.status === "needs-reply");
    else if (activeFilter === "hidden") r = r.filter((x) => x.status === "hidden");
    else if (activeFilter === "flagged") r = r.filter((x) => x.status === "flagged");
    else if (["1", "2", "3", "4", "5"].includes(activeFilter)) r = r.filter((x) => x.stars === Number(activeFilter));
    if (sourceFilter !== "all") r = r.filter((x) => x.source === sourceFilter);
    return r;
  }, [reviews, activeFilter, sourceFilter]);

  const startReply = (id: string) => {
    setReplyingTo(id);
    setReplyDraft("");
  };

  const postReply = (id: string) => {
    setReviews((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, status: "replied", reply: { text: replyDraft || "Thanks for your review!", date: "Just now" } }
          : r,
      ),
    );
    setReplyingTo(null);
    setReplyDraft("");
    toast.success("Reply posted");
  };

  const aiDraft = () => {
    setReplyDraft("Thank you so much for taking the time to share your experience! It was wonderful working with you.");
    toast("AI drafted a reply");
  };

  const hideReview = (id: string) => {
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, status: "hidden" } : r)));
    toast("Review hidden from site");
  };

  const flagReview = (id: string) => {
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, status: "flagged" } : r)));
    toast("Flagged for moderation");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(`https://${reviewLink}`);
    toast.success("Review link copied");
  };

  const sendRequest = () => toast.success("Review request sent");

  const StatCard: React.FC<{ label: string; value: string | number; sub: string; subColor?: string }> = ({ label, value, sub, subColor }) => (
    <div style={{ ...cardStyle, padding: "14px 16px" }}>
      <div style={{ fontSize: 11, color: COLORS.text2, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 500, color: COLORS.text, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: subColor ?? COLORS.text2, marginTop: 4 }}>{sub}</div>
    </div>
  );

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
        <StatCard label="Avg rating" value={`${stats.avg} ★`} sub={`Based on ${stats.totalReviews} reviews`} subColor={COLORS.amberDark} />
        <StatCard label="New this week" value={stats.newThisWeek} sub="needs reply" subColor={COLORS.amberDark} />
        <StatCard label="Response rate" value={`${stats.responseRate}%`} sub="higher is better" subColor={COLORS.greenDark} />
        <StatCard label="Public on site" value={`${stats.publicCount} of ${stats.totalReviews}`} sub="1 hidden" />
      </div>

      {/* Filter row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
          {FILTER_CHIPS.map((c) => {
            const active = activeFilter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                style={{
                  padding: "5px 12px",
                  fontSize: 11,
                  borderRadius: 20,
                  border: `1px solid ${active ? COLORS.green : COLORS.borderMd}`,
                  background: active ? COLORS.green : "#fff",
                  color: active ? "#fff" : COLORS.text2,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...inputStyle, padding: "6px 10px", width: "auto" }} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
          <select style={{ ...inputStyle, padding: "6px 10px", width: "auto" }} value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="all">All sources</option>
            <option value="Google">Google</option>
            <option value="RestAssured">RestAssured</option>
            <option value="BBB">BBB</option>
            <option value="CallX">CallX</option>
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "flex-start" }}>
        {/* Reviews list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0 && (
            <div style={{ ...cardStyle, padding: 32, textAlign: "center", color: COLORS.text3, fontSize: 13 }}>
              No reviews match this filter.
            </div>
          )}
          {filtered.map((r) => {
            const src = SOURCE_COLORS[r.source];
            const needsReply = r.status === "needs-reply";
            return (
              <div
                key={r.id}
                style={{
                  ...cardStyle,
                  padding: 16,
                  borderLeft: needsReply ? `3px solid ${COLORS.amber}` : cardStyle.border,
                  background: needsReply ? `${COLORS.greenLight}40` : "#fff",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", gap: 1 }}>
                      {Array.from({ length: r.stars }).map((_, i) => (
                        <Star key={i} size={12} fill={COLORS.amber} stroke={COLORS.amber} />
                      ))}
                    </div>
                    <div
                      style={{
                        width: 28, height: 28, borderRadius: 999,
                        background: COLORS.bg, color: COLORS.text,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 500,
                      }}
                    >
                      {r.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.text }}>{r.author}</div>
                      <div style={{ fontSize: 10, color: COLORS.text3 }}>{r.location}</div>
                    </div>
                    <span
                      style={{
                        background: src.bg, color: src.color,
                        fontSize: 10, fontWeight: 500,
                        padding: "2px 8px", borderRadius: 20,
                      }}
                    >
                      {r.source}{r.isNew && r.status === "needs-reply" ? " · New" : ""}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 10, color: COLORS.text3 }}>{r.date}</span>
                    <button
                      onClick={() => {
                        const action = window.confirm("Hide this review from your site?");
                        if (action) hideReview(r.id);
                      }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.text3 }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6, marginBottom: 10 }}>{r.text}</div>

                {needsReply && replyingTo !== r.id && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      background: COLORS.amberLight,
                      borderRadius: 8,
                    }}
                  >
                    <span style={{ fontSize: 11, color: COLORS.amberDark, fontWeight: 500 }}>Needs reply · Posted {r.date}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => flagReview(r.id)} style={{ ...ghostBtnStyle, padding: "4px 10px", fontSize: 11 }}>
                        Flag
                      </button>
                      <button onClick={() => startReply(r.id)} style={{ ...primaryBtnStyle, padding: "5px 12px", fontSize: 11 }}>
                        Reply now
                      </button>
                    </div>
                  </div>
                )}

                {replyingTo === r.id && (
                  <div style={{ marginTop: 10, padding: 12, background: COLORS.bg, borderRadius: 8 }}>
                    <textarea
                      style={{ ...inputStyle, minHeight: 100, marginBottom: 10, resize: "vertical" }}
                      placeholder="Write a public reply…"
                      value={replyDraft}
                      onChange={(e) => setReplyDraft(e.target.value)}
                    />
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        onClick={aiDraft}
                        style={{
                          background: COLORS.purpleLight, color: COLORS.purpleDark,
                          border: "none", padding: "7px 14px", borderRadius: 8,
                          fontSize: 11, fontWeight: 500, cursor: "pointer",
                          display: "inline-flex", alignItems: "center", gap: 6,
                        }}
                      >
                        <Sparkles size={12} /> Draft with AI
                      </button>
                      <button onClick={() => postReply(r.id)} style={{ ...primaryBtnStyle, padding: "7px 14px", fontSize: 11 }}>
                        Post reply
                      </button>
                      <button onClick={() => { setReplyingTo(null); toast("Draft saved"); }} style={{ ...ghostBtnStyle, padding: "7px 14px", fontSize: 11 }}>
                        Save draft
                      </button>
                      <button onClick={() => setReplyingTo(null)} style={{ ...ghostBtnStyle, padding: "7px 14px", fontSize: 11, color: COLORS.text2 }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {r.reply && (
                  <details style={{ marginTop: 10, fontSize: 11, color: COLORS.text2 }}>
                    <summary style={{ cursor: "pointer", color: COLORS.blue }}>You replied {r.reply.date} →</summary>
                    <div style={{ marginTop: 8, padding: 10, background: COLORS.bg, borderRadius: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.text, marginBottom: 4 }}>You · {r.reply.date}</div>
                      <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>{r.reply.text}</div>
                    </div>
                  </details>
                )}
              </div>
            );
          })}
          <div style={{ ...cardStyle, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: COLORS.text2 }}>
            <span>Showing 1–{filtered.length} of {stats.totalReviews}</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ ...ghostBtnStyle, padding: "4px 10px", fontSize: 11 }}>Prev</button>
              <button style={{ ...ghostBtnStyle, padding: "4px 10px", fontSize: 11 }}>Next</button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Request reviews */}
          <div style={{ ...cardStyle, padding: 16, borderTop: `3px solid ${COLORS.green}` }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: COLORS.text, display: "flex", alignItems: "center", gap: 6 }}>
              ⚡ Request a review
            </div>
            <div style={{ fontSize: 11, color: COLORS.text2, marginBottom: 12 }}>Send a review link to a recent client</div>
            <div style={{ display: "flex", gap: 4, marginBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
              {(["contact", "link", "qr"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setRequestTab(t)}
                  style={{
                    flex: 1, padding: "6px 4px", fontSize: 11, fontWeight: 500,
                    background: "none", border: "none", cursor: "pointer",
                    color: requestTab === t ? COLORS.green : COLORS.text2,
                    borderBottom: `2px solid ${requestTab === t ? COLORS.green : "transparent"}`,
                    marginBottom: -1, textTransform: "capitalize",
                  }}
                >
                  {t === "contact" ? "Contact" : t === "link" ? "Link" : "QR"}
                </button>
              ))}
            </div>
            {requestTab === "contact" && (
              <>
                <input style={inputStyle} placeholder="Search contacts…" />
                <button onClick={sendRequest} style={{ ...primaryBtnStyle, width: "100%", marginTop: 8 }}>Send request</button>
              </>
            )}
            {requestTab === "link" && (
              <>
                <div style={{ background: COLORS.bg, padding: 8, borderRadius: 6, fontSize: 10, fontFamily: "'DM Mono', monospace", color: COLORS.text, wordBreak: "break-all", marginBottom: 8 }}>
                  {reviewLink}
                </div>
                <button onClick={copyLink} style={{ ...primaryBtnStyle, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Copy size={12} /> Copy link
                </button>
              </>
            )}
            {requestTab === "qr" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ padding: 8, background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 6 }}>
                  <QRCodeSVG value={`https://${reviewLink}`} size={120} bgColor="#ffffff" fgColor="#1a1a18" level="M" />
                </div>
                <button onClick={() => toast.success("QR downloaded")} style={{ ...ghostBtnStyle, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Download size={12} /> Download
                </button>
              </div>
            )}
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, fontSize: 10, color: COLORS.text3 }}>
              12 review requests sent this month · 8 completed (67%)
            </div>
          </div>

          {/* Auto-request */}
          <div style={{ ...cardStyle, padding: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: COLORS.text, marginBottom: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={autoRequest} onChange={(e) => setAutoRequest(e.target.checked)} />
              Automatically request reviews after closed deals
            </label>
            {autoRequest && (
              <>
                <div style={{ fontSize: 11, color: COLORS.text2, marginBottom: 6 }}>
                  Send review request <strong>{waitDays}</strong> day{waitDays === 1 ? "" : "s"} after policy issued
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={waitDays}
                  onChange={(e) => setWaitDays(Number(e.target.value))}
                  style={{ width: "100%", accentColor: COLORS.green, marginBottom: 10 }}
                />
                <div style={{ background: COLORS.bg, padding: 8, borderRadius: 6, fontSize: 10, color: COLORS.text2, lineHeight: 1.5, marginBottom: 8 }}>
                  Hi [name]! Thanks for trusting me with your coverage. Would you mind leaving a quick review? [link]
                </div>
                <button onClick={() => toast("Template editor coming soon")} style={{ ...ghostBtnStyle, width: "100%", fontSize: 11 }}>
                  Edit template
                </button>
              </>
            )}
          </div>

          {/* Sources */}
          <div style={{ ...cardStyle, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10, color: COLORS.text }}>Connected sources</div>
            {[
              { name: "Google", connected: true, info: "47 reviews · synced 2h ago" },
              { name: "RestAssured", connected: true, info: "62 reviews" },
              { name: "BBB", connected: true, info: "19 reviews" },
              { name: "Yelp", connected: false, info: "" },
              { name: "Facebook", connected: false, info: "" },
            ].map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0", borderTop: `1px solid ${COLORS.border}`,
                  fontSize: 11,
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, color: COLORS.text }}>{s.name}</div>
                  {s.info && <div style={{ color: COLORS.text3, fontSize: 10 }}>{s.info}</div>}
                </div>
                {s.connected ? (
                  <span style={{ color: COLORS.green, fontSize: 10, fontWeight: 500 }}>Connected</span>
                ) : (
                  <button
                    onClick={() => toast(`Connect ${s.name} coming soon`)}
                    style={{ ...ghostBtnStyle, padding: "4px 10px", fontSize: 10, display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    <Plus size={11} /> Connect
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Display settings */}
          <div style={{ ...cardStyle, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10, color: COLORS.text }}>Display settings</div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: COLORS.text, marginBottom: 10 }}>
              <input type="checkbox" checked={showReviews} onChange={(e) => setShowReviews(e.target.checked)} />
              Show reviews on my website
            </label>
            <label style={{ display: "block", fontSize: 10, color: COLORS.text2, marginBottom: 4 }}>Min rating</label>
            <select style={{ ...inputStyle, padding: "6px 10px", marginBottom: 10 }} value={minRating} onChange={(e) => setMinRating(e.target.value)}>
              <option value="all">Show all reviews</option>
              <option value="3">3 stars and up</option>
              <option value="4">4 stars and up</option>
              <option value="5">5 stars only</option>
            </select>
            <label style={{ display: "block", fontSize: 10, color: COLORS.text2, marginBottom: 4 }}>Max on homepage</label>
            <select style={{ ...inputStyle, padding: "6px 10px" }} value={maxOnHomepage} onChange={(e) => setMaxOnHomepage(e.target.value)}>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;
