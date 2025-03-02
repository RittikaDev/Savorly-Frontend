import React from "react";

interface BookingCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  iconClassName?: string;
}

const OverviewCard = ({
  icon,
  count,
  label,
  iconClassName,
}: BookingCardProps) => {
  return (
    <div className="border p-6 rounded-md space-y-2 hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-center space-x-2">
        <div className={` ${iconClassName}`}>{icon}</div>
        <h2 className="text-2xl font-semibold">
          {count?.toString()?.padStart(2, "0")}
        </h2>
      </div>
      <p className="font-medium text-xs lg:text-base">{label}</p>
    </div>
  );
};

export default OverviewCard;
