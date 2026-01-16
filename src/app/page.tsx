// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Settings, Timer, ClipboardCheck } from 'lucide-react';
import MeasureMode from '@/components/MeasureMode';
import CheckMode from '@/components/CheckMode';
import SettingsModal from '@/components/SettingsModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'measure' | 'check'>('measure');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // State pro data
  const [stopName, setStopName] = useState('');
  const [circulation, setCirculation] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Načtení dat z LocalStorage po mountu (client-side only)
  useEffect(() => {
    const savedStop = localStorage.getItem('bus_stop_name');
    const savedCirc = localStorage.getItem('bus_circulation');
    if (savedStop) setStopName(savedStop);
    if (savedCirc) setCirculation(savedCirc);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="p-4">Načítám...</div>;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col max-w-lg mx-auto shadow-2xl overflow-hidden">
      
      {/* Horní lišta */}
      <header className="bg-blue-800 text-white p-4 flex items-center justify-between shadow-md z-10">
        <button onClick={() => setIsSettingsOpen(true)} className="p-2 hover:bg-blue-700 rounded-full transition">
          <Settings className="w-6 h-6" />
        </button>
        <div className="text-center">
            <h1 className="font-bold text-lg leading-none">
                {activeTab === 'measure' ? 'MĚŘENÍ NÁSTUPU' : 'KONTROLA'}
            </h1>
            <div className="text-xs text-blue-200 mt-1 font-mono">
                {circulation ? `Oběh: ${circulation}` : '---'} | {stopName ? stopName : '---'}
            </div>
        </div>
        <div className="w-10"></div> {/* Spacer pro centraci nadpisu */}
      </header>

      {/* Hlavní obsah */}
      <div className="flex-grow p-3 bg-white relative overflow-hidden">
        {activeTab === 'measure' ? (
            <MeasureMode stopName={stopName} circulation={circulation} />
        ) : (
            <CheckMode circulation={circulation} />
        )}
      </div>

      {/* Spodní navigace */}
      <nav className="flex border-t border-gray-200 bg-white">
        <button 
            onClick={() => setActiveTab('measure')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === 'measure' ? 'text-blue-600 bg-blue-50 border-t-2 border-blue-600' : 'text-gray-400 hover:bg-gray-50'
            }`}
        >
            <Timer size={24} />
            <span className="text-xs font-bold">MĚŘENÍ ČASU</span>
        </button>
        <button 
            onClick={() => setActiveTab('check')}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === 'check' ? 'text-amber-600 bg-amber-50 border-t-2 border-amber-600' : 'text-gray-400 hover:bg-gray-50'
            }`}
        >
            <ClipboardCheck size={24} />
            <span className="text-xs font-bold">KONTROLA</span>
        </button>
      </nav>

      {/* Nastavení Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        stopName={stopName}
        setStopName={setStopName}
        circulation={circulation}
        setCirculation={setCirculation}
      />
    </main>
  );
}