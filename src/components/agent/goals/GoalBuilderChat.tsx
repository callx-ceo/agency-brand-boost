import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Send, ArrowRight } from "lucide-react";

interface GoalBuilderChatProps {
  onPlanGenerated: (plan: SuccessPlan) => void;
}

export interface SuccessPlan {
  incomeGoal: number;
  verticals: string[];
  avgPremium: number;
  workDays: number;
  closeRate: number;
  policiesNeeded: number;
  callsRequired: number;
  dailyCalls: number;
  hoursPerDay: number;
  monthlyInvestment: number;
}

interface ChatMessage {
  role: "copilot" | "user";
  text: string;
  options?: string[];
}

const QUESTIONS = [
  {
    text: "Let's build your Success Plan. First — what's your **monthly income goal**?",
    options: ["$4,000", "$6,000", "$8,000", "$10,000+"],
    key: "incomeGoal",
  },
  {
    text: "Great target. What **verticals** do you sell? (select all that apply)",
    options: ["Auto", "Medicare", "Life", "Health", "Home"],
    key: "verticals",
    multi: true,
  },
  {
    text: "What's your **average premium per policy**? I pulled $480 from your recent history.",
    options: ["~$300", "~$480 (suggested)", "~$600", "~$800+"],
    key: "avgPremium",
    suggested: "$480",
  },
  {
    text: "How many **days per week** can you commit to calling?",
    options: ["3 days", "4 days", "5 days", "6 days"],
    key: "workDays",
  },
  {
    text: "Last one — your **close rate** over the past 30 days was about 5.2%. Does that sound right?",
    options: ["Yes, ~5%", "I think closer to 7%", "Probably lower, ~3%", "I'm not sure"],
    key: "closeRate",
    suggested: "5.2%",
  },
];

const parseNumber = (val: string, key: string): number => {
  const cleaned = val.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  if (key === "incomeGoal" && val.includes("10,000")) return 10000;
  if (key === "avgPremium" && val.includes("suggested")) return 480;
  if (key === "workDays") return parseInt(cleaned) || 5;
  if (key === "closeRate") {
    if (val.includes("5%") || val.includes("sure")) return 5;
    if (val.includes("7%")) return 7;
    if (val.includes("3%")) return 3;
    return 5;
  }
  return num || 0;
};

const GoalBuilderChat = ({ onPlanGenerated }: GoalBuilderChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show first question after a brief delay
    setTyping(true);
    const t = setTimeout(() => {
      setMessages([{ role: "copilot", text: QUESTIONS[0].text, options: QUESTIONS[0].options }]);
      setTyping(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleSelect = (option: string) => {
    const q = QUESTIONS[step];
    if (q.multi) {
      setSelectedMulti((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
      return;
    }
    advanceWithAnswer(option);
  };

  const confirmMulti = () => {
    if (selectedMulti.length === 0) return;
    advanceWithAnswer(selectedMulti.join(", "));
  };

  const advanceWithAnswer = (answer: string) => {
    const q = QUESTIONS[step];
    const newAnswers = { ...answers, [q.key]: answer };
    setAnswers(newAnswers);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: answer }]);
    setSelectedMulti([]);

    const nextStep = step + 1;
    if (nextStep < QUESTIONS.length) {
      // Show next question with typing delay
      setTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "copilot", text: QUESTIONS[nextStep].text, options: QUESTIONS[nextStep].options },
        ]);
        setTyping(false);
        setStep(nextStep);
      }, 800);
    } else {
      // Generate the plan
      setTyping(true);
      setTimeout(() => {
        const plan = generatePlan(newAnswers);
        setMessages((prev) => [
          ...prev,
          {
            role: "copilot",
            text: `Here's your **Success Plan**. I've calculated everything based on your answers. Review it below and adjust anything that doesn't feel right.`,
          },
        ]);
        setTyping(false);
        onPlanGenerated(plan);
      }, 1200);
    }
  };

  const generatePlan = (a: Record<string, any>): SuccessPlan => {
    const incomeGoal = parseNumber(a.incomeGoal || "6000", "incomeGoal");
    const verticals = (a.verticals || "Auto").split(", ");
    const avgPremium = parseNumber(a.avgPremium || "480", "avgPremium");
    const workDays = parseNumber(a.workDays || "5", "workDays");
    const closeRate = parseNumber(a.closeRate || "5", "closeRate") / 100;

    const policiesNeeded = Math.ceil(incomeGoal / avgPremium);
    const callsRequired = Math.ceil(policiesNeeded / closeRate);
    const workingDaysMonth = workDays * 4;
    const dailyCalls = Math.ceil(callsRequired / workingDaysMonth);
    const hoursPerDay = Math.round((dailyCalls * 15) / 60 * 10) / 10; // ~15 min avg per call
    const monthlyInvestment = Math.round(callsRequired * 3.5); // ~$3.50 per lead

    return {
      incomeGoal,
      verticals,
      avgPremium,
      workDays,
      closeRate: closeRate * 100,
      policiesNeeded,
      callsRequired,
      dailyCalls,
      hoursPerDay,
      monthlyInvestment,
    };
  };

  const currentQ = QUESTIONS[step];

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto px-5 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "copilot" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === "user" ? "bg-[#1a1a1a] text-white rounded-2xl rounded-br-md px-4 py-2.5" : ""}`}>
              {msg.role === "copilot" && (
                <p className="text-[13px] text-[#1a1a1a] leading-relaxed" dangerouslySetInnerHTML={{
                  __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              )}
              {msg.role === "user" && (
                <p className="text-[13px]">{msg.text}</p>
              )}
              {msg.role === "copilot" && msg.options && i === messages.length - 1 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {msg.options.map((opt) => {
                    const isMulti = currentQ?.multi;
                    const isSelected = isMulti && selectedMulti.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        className={`text-[12px] font-medium px-3 py-1.5 rounded-full border transition-all ${
                          isSelected
                            ? "bg-violet-100 border-violet-300 text-violet-700"
                            : "bg-white border-[#e8e8e5] text-[#1a1a1a] hover:border-violet-300 hover:bg-violet-50"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                  {currentQ?.multi && selectedMulti.length > 0 && (
                    <button
                      onClick={confirmMulti}
                      className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors flex items-center gap-1"
                    >
                      Continue <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex gap-1 px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b0b0ac] animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#b0b0ac] animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#b0b0ac] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalBuilderChat;
