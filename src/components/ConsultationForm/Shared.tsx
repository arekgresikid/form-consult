import React from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  text: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => (
  <div className="group relative inline-block ml-2 align-middle">
    <Info className="w-4 h-4 text-gray-400 cursor-help" />
    <div className="invisible group-hover:visible absolute z-50 w-64 p-3 mt-2 text-xs text-white bg-black rounded-xl shadow-2xl -left-2 top-full transition-all duration-200 opacity-0 group-hover:opacity-100 leading-relaxed border border-white/20 backdrop-blur-sm">
      {text}
      <div className="absolute w-2 h-2 bg-black rotate-45 -top-1 left-3"></div>
    </div>
  </div>
);
