'use client';

import { useState, useEffect } from 'react';
import { Settings, Timer, ClipboardCheck, Smartphone } from 'lucide-react'; // Přidána ikona Smartphone
import MeasureMode from '@/components/MeasureMode';
import CheckMode from '@/components/CheckMode';
import SettingsModal from '@/components/SettingsModal';
import { triggerHaptic } from '@/utils';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'measure' | 'check'>('measure');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // State pro režim jedné ruky (defaultně vypnuto)
  const [isOneHanded, setIsOneHanded] = useState(false);
  
  const [stopName, setStopName] = useState('');
  const [circulation, setCirculation] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedStop = localStorage.getItem('bus_stop_name');
    const savedCirc = localStorage.getItem('bus_circulation');
    // Načtení nastavení jedné ruky
    const savedHand = localStorage.getItem('bus_one_handed');
    
    if (savedStop) setStopName(savedStop);
    if (savedCirc) setCirculation(savedCirc);
    if (savedHand) setIsOneHanded(savedHand === 'true');
    
    setIsLoaded(true);
  }, []);

  const toggleOneHanded = () => {
      triggerHaptic();
      const newState = !isOneHanded;
      setIsOneHanded(newState);
      localStorage.setItem('bus_one_handed', String(newState));
  };

  if (!isLoaded) return <div className="p-4 flex h-screen items-center justify-center">Načítám...</div>;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col max-w-lg mx-auto shadow-2xl overflow-hidden">
      
      {/* Horní lišta */}
      <header className="bg-blue-800 text-white p-3 flex items-center justify-between shadow-md z-10 relative">
        {/* Nastavení vlevo */}
        <button onClick={() => { triggerHaptic(); setIsSettingsOpen(true); }} className="p-2 hover:bg-blue-700 rounded-full transition">
          <Settings className="w-6 h-6" />
        </button>

        <div className="text-center">
            <h1 className="font-bold text-lg leading-none">
                {activeTab === 'measure' ? 'MĚŘENÍ' : 'KONTROLA'}
            </h1>
            <div className="text-xs text-blue-200 mt-1 font-mono">
                {circulation || '--'} | {stopName || '--'}
            </div>
        </div>

        {/* Tlačítko Režimu jedné ruky vpravo */}
        <button 
            onClick={toggleOneHanded} 
            className={`p-2 rounded-full transition ${isOneHanded ? 'bg-blue-600 text-white shadow-inner ring-1 ring-blue-400' : 'hover:bg-blue-700 text-blue-200'}`}
            title="Režim jedné ruky"
        >
          <Smartphone className={`w-6 h-6 ${isOneHanded ? 'rotate-12' : ''} transition-transform`} />
        </button>
      </header>

      {/* Hlavní obsah */}
      <div className="flex-grow p-3 bg-white relative overflow-hidden flex flex-col">
        {activeTab === 'measure' ? (
            <MeasureMode 
                stopName={stopName} 
                circulation={circulation} 
                isOneHanded={isOneHanded} // Předáváme prop
            />
        ) : (
            <CheckMode 
                circulation={circulation}
                isOneHanded={isOneHanded} // Předáváme prop
            />
        )}
      </div>

      {/* Spodní navigace */}
      <nav className="flex border-t border-gray-200 bg-white pb-safe">
        <button 
            onClick={() => { triggerHaptic(); setActiveTab('measure'); }}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === 'measure' ? 'text-blue-600 bg-blue-50 border-t-2 border-blue-600' : 'text-gray-400 hover:bg-gray-50'
            }`}
        >
            <Timer size={24} />
            <span className="text-xs font-bold">MĚŘENÍ</span>
        </button>
        <button 
            onClick={() => { triggerHaptic(); setActiveTab('check'); }}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === 'check' ? 'text-amber-600 bg-amber-50 border-t-2 border-amber-600' : 'text-gray-400 hover:bg-gray-50'
            }`}
        >
            <ClipboardCheck size={24} />
            <span className="text-xs font-bold">KONTROLA</span>
        </button>
      </nav>

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