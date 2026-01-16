// src/components/CheckMode.tsx
'use client';

import { useState } from 'react';
import { BUTTON_TYPES, BUTTON_CONFIGS } from '@/constants';
import { downloadCSV, formatDateForFilename, triggerHaptic } from '@/utils';
import Image from 'next/image';

interface Props {
  circulation: string;
  isOneHanded: boolean;
}

export default function CheckMode({ circulation, isOneHanded }: Props) {
  const [isRunning, setIsRunning] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(BUTTON_TYPES.map(t => [t, 0]))
  );
  const [history, setHistory] = useState<string[]>([]);

  const handleStart = () => {
    triggerHaptic();
    setCounts(Object.fromEntries(BUTTON_TYPES.map(t => [t, 0])));
    setHistory([]);
    setIsRunning(true);
  };

  const handleStop = () => {
    triggerHaptic();
    setIsRunning(false);
    
    const csvHeader = 'id,typ,počet stisknutí\n';
    const csvRows = BUTTON_TYPES.map((type, index) => {
        return `${index + 1},${type},${counts[type]}`;
    }).join('\n');
    
    const csvContent = csvHeader + csvRows;
    const filename = `data_375_${circulation}_${formatDateForFilename(new Date())}.csv`;
    
    downloadCSV(csvContent, filename);
    
    setCounts(Object.fromEntries(BUTTON_TYPES.map(t => [t, 0])));
    setHistory([]);
  };

  const handleIncrement = (type: string) => {
    if (!isRunning) return;
    triggerHaptic();
    setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setHistory(prev => [...prev, type]);
  };

  const handleUndo = () => {
    if (!isRunning || history.length === 0) return;
    triggerHaptic();
    const lastType = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    
    setHistory(newHistory);
    setCounts(prev => ({ ...prev, [lastType]: Math.max(0, prev[lastType] - 1) }));
  };

  return (
    <div className="flex flex-col h-full relative">
        <div className="flex gap-2 mb-3">
            <button 
                onClick={handleStart}
                disabled={isRunning}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    isRunning ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white'
                }`}
            >
                START
            </button>
            <button 
                onClick={handleStop}
                disabled={!isRunning}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    !isRunning ? 'bg-gray-300 text-gray-500' : 'bg-red-600 text-white'
                }`}
            >
                STOP
            </button>
            <button 
                onClick={handleUndo}
                disabled={!isRunning || history.length === 0}
                className={`w-1/4 py-3 rounded-lg font-bold transition-all ${
                    !isRunning || history.length === 0 
                        ? 'bg-gray-200 text-gray-400' 
                        : 'bg-yellow-500 text-white active:bg-yellow-600'
                }`}
            >
                ZPĚT
            </button>
        </div>

        {/* Kontejner s logikou pro jednu ruku */}
        <div className={`flex-grow overflow-y-auto pb-20 transition-all duration-300 ${isOneHanded ? 'flex justify-end' : ''}`}>
             <div className={`grid grid-cols-3 gap-2 transition-all duration-300 ${isOneHanded ? 'w-[85%]' : 'w-full'}`}>
                {BUTTON_CONFIGS.map((btn) => (
                    <button
                        key={btn.label}
                        onClick={() => handleIncrement(btn.label)}
                        disabled={!isRunning}
                        style={isRunning ? {
                            backgroundColor: btn.bgColor,
                            borderColor: btn.borderColor
                        } : {}}
                        className={`
                            p-1 rounded-lg relative border-b-4 active:border-b-0 active:translate-y-1 transition-all h-20
                            flex flex-col items-center justify-center
                            ${!isRunning 
                                ? 'bg-gray-100 text-gray-400 border-gray-200' 
                                : 'text-gray-900 hover:brightness-95 active:brightness-90'
                            }
                        `}
                    >
                        <span className="font-bold text-xs sm:text-sm text-center leading-tight mb-1">{btn.label}</span>
                        <span className="bg-white/80 px-3 py-0.5 rounded-full text-lg font-mono font-bold text-black shadow-sm">
                            {counts[btn.label]}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pointer-events-none opacity-80">
            <div className="w-24 h-16 relative">
                 <Image 
                    src="/pid.jpg" 
                    alt="PID Logo" 
                    fill
                    className="object-contain"
                 />
            </div>
        </div>
    </div>
  );
}