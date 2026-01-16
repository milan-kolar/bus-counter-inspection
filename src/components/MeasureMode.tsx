// src/components/MeasureMode.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { BUTTON_TYPES, MeasureRecord } from '@/constants';
import { downloadCSV, formatDateForFilename, triggerHaptic } from '@/utils';

interface Props {
  stopName: string;
  circulation: string;
  isOneHanded: boolean; // Nový prop
}

export default function MeasureMode({ stopName, circulation, isOneHanded }: Props) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [records, setRecords] = useState<MeasureRecord[]>([]);
  
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      const updateTimer = () => {
        if (startTimeRef.current) {
          setElapsed(Date.now() - startTimeRef.current);
          animationFrameRef.current = requestAnimationFrame(updateTimer);
        }
      };
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    triggerHaptic(); // Vibrace
    setRecords([]);
    setIsRunning(true);
    startTimeRef.current = Date.now();
    setElapsed(0);
  };

  const handleStop = () => {
    triggerHaptic(); // Vibrace
    setIsRunning(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    const csvHeader = 'id,typ,čas v sekundách\n';
    const csvRows = records.map(r => `${r.id},${r.type},${r.duration}`).join('\n');
    const csvContent = csvHeader + csvRows;

    const filename = `data_375_${circulation}_${stopName}_${formatDateForFilename(new Date())}.csv`;
    downloadCSV(csvContent, filename);
  };

  const handleButtonClick = (type: string) => {
    if (!isRunning || !startTimeRef.current) return;

    triggerHaptic(); // Vibrace při kliknutí

    const now = Date.now();
    const durationMs = now - startTimeRef.current;
    const durationSec = (durationMs / 1000).toFixed(2);

    setRecords(prev => [...prev, {
      id: prev.length + 1,
      type,
      duration: durationSec
    }]);

    startTimeRef.current = now;
    setElapsed(0);
  };

  return (
    <div className="flex flex-col h-full">
        <div className="bg-gray-900 text-white p-4 text-center text-4xl font-mono mb-2 rounded-xl shadow-inner border border-gray-700">
            {(elapsed / 1000).toFixed(2)} s
        </div>

        <div className="flex gap-4 mb-4">
            <button 
                onClick={handleStart}
                disabled={isRunning}
                className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${
                    isRunning ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white shadow-lg active:scale-95'
                }`}
            >
                START
            </button>
            <button 
                onClick={handleStop}
                disabled={!isRunning}
                className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${
                    !isRunning ? 'bg-gray-300 text-gray-500' : 'bg-red-600 text-white shadow-lg active:scale-95'
                }`}
            >
                STOP
            </button>
        </div>

        {/* Kontejner gridu s logikou pro jednu ruku */}
        <div className={`flex-grow overflow-y-auto pb-4 transition-all duration-300 ${isOneHanded ? 'flex justify-end' : ''}`}>
            <div className={`grid grid-cols-3 gap-2 transition-all duration-300 ${isOneHanded ? 'w-[85%]' : 'w-full'}`}>
                {BUTTON_TYPES.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleButtonClick(type)}
                        disabled={!isRunning}
                        className={`
                            p-1 rounded-lg font-bold text-sm sm:text-base border-b-4 active:border-b-0 active:translate-y-1 transition-all
                            flex items-center justify-center text-center break-words leading-tight h-20
                            ${!isRunning 
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                                : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100 active:bg-blue-200 shadow-sm'
                            }
                        `}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="text-xs text-gray-400 text-center mt-1">
            Zaznamenáno: {records.length} záznamů
        </div>
    </div>
  );
}