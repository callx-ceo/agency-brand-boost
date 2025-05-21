
import React from "react";

interface PlaceholderSectionProps {
  title: string;
}

const PlaceholderSection = ({ title }: PlaceholderSectionProps) => {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-500">
        This section is coming soon.
      </div>
    </div>
  );
};

export default PlaceholderSection;
