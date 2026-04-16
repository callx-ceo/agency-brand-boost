import React, { useState } from "react";
import { Target, Clock, Phone, DollarSign, TrendingUp, CheckCircle2, Sparkles, Calendar } from "lucide-react";
import type { SuccessPlan } from "./GoalBuilderChat";

interface SuccessPlanReviewProps {
  plan: SuccessPlan;
  onConfirm: (plan: SuccessPlan) => void;
  onBack: () => void;
}

const SuccessPlanReview = ({ plan, onConfirm, onBack }: SuccessPlanReviewProps) => {
  
  const [localPlan, setLocalPlan] = useState<SuccessPlan>({ ...plan });

  const recalculate = (updated: Partial<SuccessPlan>) => {
    const p = { ...localPlan, ...updated };
    const closeRate = p.closeRate / 100;
    p.policiesNeeded = Math.ceil(p.incomeGoal / p.avgPremium);
    p.callsRequired = Math.ceil(p.policiesNeeded / closeRate);
    const workingDays = p.workDays * 4;
    p.dailyCalls = Math.ceil(p.callsRequired / workingDays);
    p.hoursPerDay = Math.round((p.dailyCalls * 15) / 60 * 10) / 10;
    p.monthlyInvestment = Math.round(p.callsRequired * 75);
    setLocalPlan(p);
  };

  const weeksInMonth = 4;
  const weeklyIncome = Math.round(localPlan.incomeGoal / weeksInMonth);
  const weeklyPolicies = Math.ceil(localPlan.policiesNeeded / weeksInMonth);
  const weeklyCalls = Math.ceil(localPlan.callsRequired / weeksInMonth);
  const weeklyInvestment = Math.round(localPlan.monthlyInvestment / weeksInMonth);

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

      {/* Monthly → Weekly Breakdown */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Calendar className="w-3.5 h-3.5 text-[#8a8a86]" />
          <p className="text-[11px] uppercase tracking-wider font-semibold text-[#8a8a86]">Monthly → Weekly Breakdown</p>
        </div>
        <div className="bg-white border border-[#e8e8e5] rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-[#e8e8e5]">
            {/* Monthly column */}
            <div className="p-4">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8a8a86] mb-3">This Month</p>
              <div className="space-y-3">
                <div>
                  <div className="text-[20px] font-bold text-emerald-600">${localPlan.incomeGoal.toLocaleString()}</div>
                  <div className="text-[11px] text-[#8a8a86]">income target</div>
                </div>
                <div className="flex items-baseline gap-4">
                  <div>
                    <div className="text-[16px] font-semibold text-[#1a1a1a]">{localPlan.policiesNeeded}</div>
                    <div className="text-[10px] text-[#8a8a86]">policies</div>
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold text-[#1a1a1a]">{localPlan.callsRequired.toLocaleString()}</div>
                    <div className="text-[10px] text-[#8a8a86]">calls</div>
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold text-[#1a1a1a]">${localPlan.monthlyInvestment.toLocaleString()}</div>
                    <div className="text-[10px] text-[#8a8a86]">investment</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Weekly column */}
            <div className="p-4 bg-[#fafaf9]">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8a8a86] mb-3">Each Week</p>
              <div className="space-y-3">
                <div>
                  <div className="text-[20px] font-bold text-blue-600">${weeklyIncome.toLocaleString()}</div>
                  <div className="text-[11px] text-[#8a8a86]">income target</div>
                </div>
                <div className="flex items-baseline gap-4">
                  <div>
                    <div className="text-[16px] font-semibold text-[#1a1a1a]">{weeklyPolicies}</div>
                    <div className="text-[10px] text-[#8a8a86]">policies</div>
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold text-[#1a1a1a]">{weeklyCalls}</div>
                    <div className="text-[10px] text-[#8a8a86]">calls</div>
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold text-[#1a1a1a]">${weeklyInvestment.toLocaleString()}</div>
                    <div className="text-[10px] text-[#8a8a86]">investment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Daily row */}
          <div className="border-t border-[#e8e8e5] px-4 py-3 bg-[#f5f4f1]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8a8a86]">Daily</div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">{localPlan.dailyCalls} calls</span>
                  <span className="text-[11px] text-[#8a8a86]">·</span>
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">{localPlan.hoursPerDay} hrs</span>
                  <span className="text-[11px] text-[#8a8a86]">·</span>
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">{localPlan.workDays} days/wk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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