import React, { useState } from "react";
import { X, Target } from "lucide-react";
import GoalBuilderChat, { type SuccessPlan } from "./GoalBuilderChat";
import SuccessPlanReview from "./SuccessPlanReview";

interface GoalBuilderModalProps {
  open: boolean;
  onClose: () => void;
  onPlanActivated: (plan: SuccessPlan) => void;
}

const GoalBuilderModal = ({ open, onClose, onPlanActivated }: GoalBuilderModalProps) => {
  const [plan, setPlan] = useState<SuccessPlan | null>(null);
  const [phase, setPhase] = useState<"chat" | "review">("chat");

  const handlePlanGenerated = (p: SuccessPlan) => {
    setPlan(p);
    setTimeout(() => setPhase("review"), 600);
  };

  const handleConfirm = (finalPlan: SuccessPlan) => {
    onPlanActivated(finalPlan);
    onClose();
  };

  const handleStartOver = () => {
    setPlan(null);
    setPhase("chat");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl flex flex-col" style={{ maxHeight: "85vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0ee]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-[#1a1a1a]">Goal Builder</h2>
              <p className="text-[11px] text-[#8a8a86]">
                {phase === "chat" ? "Let's figure out your plan" : "Review & customize your plan"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#f5f4f1] transition-colors">
            <X className="w-4 h-4 text-[#8a8a86]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {phase === "chat" && <GoalBuilderChat onPlanGenerated={handlePlanGenerated} />}
          {phase === "review" && plan && (
            <SuccessPlanReview plan={plan} onConfirm={handleConfirm} onBack={handleStartOver} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalBuilderModal;
