import React, { useState } from "react";
import { Target, Clock, Phone, DollarSign, TrendingUp, CheckCircle2, Edit3, Sparkles } from "lucide-react";
import type { SuccessPlan } from "./GoalBuilderChat";

interface SuccessPlanReviewProps {
  plan: SuccessPlan;
  onConfirm: (plan: SuccessPlan) => void;
  onBack: () => void;
}

const SuccessPlanReview = ({ plan, onConfirm, onBack }: SuccessPlanReviewProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [localPlan, setLocalPlan] = useState<SuccessPlan>({ ...plan });

  const recalculate = (updated: Partial<SuccessPlan>) => {
    const p = { ...localPlan, ...updated };
    const closeRate = p.closeRate / 100;
    p.policiesNeeded = Math.ceil(p.incomeGoal / p.avgPremium);
    p.callsRequired = Math.ceil(p.policiesNeeded / closeRate);
    const workingDays = p.workDays * 4;
    p.dailyCalls = Math.ceil(p.callsRequired / workingDays);
    p.hoursPerDay = Math.round((p.dailyCalls * 15) / 60 * 10) / 10;
    p.monthlyInvestment = Math.round(p.callsRequired * 3.5);
    setLocalPlan(p);
  };

  const metrics = [
    {
      key: "incomeGoal",
      icon: DollarSign,
      label: "Monthly Income Goal",
      value: `$${localPlan.incomeGoal.toLocaleString()}`,
      editable: true,
      color: "text-emerald-600 bg-emerald-50",
      inputType: "number" as const,
    },
    {
      key: "policiesNeeded",
      icon: Target,
      label: "Policies Needed",
      value: `${localPlan.policiesNeeded} policies`,
      sublabel: `@ $${localPlan.avgPremium} avg premium`,
      editable: false,
      color: "text-blue-600 bg-blue-50",
    },
    {
      key: "callsRequired",
      icon: Phone,
      label: "Total Calls This Month",
      value: `${localPlan.callsRequired.toLocaleString()} calls`,
      sublabel: `${localPlan.closeRate}% close rate`,
      editable: false,
      color: "text-violet-600 bg-violet-50",
    },
    {
      key: "dailyCalls",
      icon: TrendingUp,
      label: "Daily Call Target",
      value: `${localPlan.dailyCalls} calls/day`,
      sublabel: `${localPlan.workDays} days/week`,
      editable: false,
      color: "text-amber-600 bg-amber-50",
    },
    {
      key: "hoursPerDay",
      icon: Clock,
      label: "Hours of Active Calling",
      value: `${localPlan.hoursPerDay} hrs/day`,
      sublabel: "~15 min avg per call",
      editable: false,
      color: "text-sky-600 bg-sky-50",
    },
    {
      key: "monthlyInvestment",
      icon: DollarSign,
      label: "Estimated Monthly Investment",
      value: `$${localPlan.monthlyInvestment.toLocaleString()}`,
      sublabel: "Call credits at current bid rates",
      editable: false,
      color: "text-rose-600 bg-rose-50",
    },
  ];

  const editableInputs = [
    { key: "incomeGoal", label: "Income Goal ($)", value: localPlan.incomeGoal },
    { key: "avgPremium", label: "Avg Premium ($)", value: localPlan.avgPremium },
    { key: "closeRate", label: "Close Rate (%)", value: localPlan.closeRate },
    { key: "workDays", label: "Work Days/Week", value: localPlan.workDays },
  ];

  return (
    <div className="space-y-5 px-5 py-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <Target className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-[#1a1a1a]">Your Success Plan</h3>
          <p className="text-[12px] text-[#8a8a86]">Adjust any number — everything recalculates automatically</p>
        </div>
      </div>

      {/* Editable Inputs */}
      <div className="grid grid-cols-2 gap-3">
        {editableInputs.map((input) => (
          <div key={input.key} className="bg-[#fafaf9] rounded-xl px-3.5 py-3 border border-[#e8e8e5]">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8a8a86] block mb-1.5">
              {input.label}
            </label>
            <input
              type="number"
              value={input.value}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                recalculate({ [input.key]: val });
              }}
              className="w-full bg-white border border-[#e8e8e5] rounded-lg px-3 py-1.5 text-[14px] font-semibold text-[#1a1a1a] focus:outline-none focus:border-violet-300 focus:ring-1 focus:ring-violet-100 transition-all"
            />
          </div>
        ))}
      </div>

      {/* Calculated Results */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-[#8a8a86] px-1">What it takes</p>
        {metrics.filter(m => !m.editable).map((m) => (
          <div key={m.key} className="flex items-center gap-3 bg-white border border-[#e8e8e5] rounded-xl px-4 py-3">
            <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center shrink-0`}>
              <m.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#1a1a1a]">{m.value}</p>
              <p className="text-[11px] text-[#8a8a86]">{m.label}{m.sublabel ? ` · ${m.sublabel}` : ""}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-[12px] text-violet-800 leading-relaxed">
            <strong>Copilot tip:</strong> Agents with similar profiles who hit {localPlan.dailyCalls}+ calls/day 
            see a {Math.round(localPlan.closeRate * 1.3)}% close rate within 60 days. Consistency is the unlock.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => onConfirm(localPlan)}
          className="flex-1 text-[13px] font-semibold text-white bg-[#1a1a1a] hover:bg-[#333] rounded-xl py-3 transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Activate This Plan
        </button>
        <button
          onClick={onBack}
          className="text-[13px] font-medium text-[#8a8a86] hover:text-[#1a1a1a] px-4 py-3 rounded-xl border border-[#e8e8e5] hover:border-[#d0d0cc] transition-all"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default SuccessPlanReview;
