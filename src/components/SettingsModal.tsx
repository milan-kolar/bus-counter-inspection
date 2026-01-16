// src/components/SettingsModal.tsx
import { X, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stopName: string;
  setStopName: (val: string) => void;
  circulation: string;
  setCirculation: (val: string) => void;
}

export default function SettingsModal({ isOpen, onClose, stopName, setStopName, circulation, setCirculation }: Props) {
  const [localStop, setLocalStop] = useState(stopName);
  const [localCirc, setLocalCirc] = useState(circulation);

  // Synchronizace při otevření
  useEffect(() => {
    if (isOpen) {
      setLocalStop(stopName);
      setLocalCirc(circulation);
    }
  }, [isOpen, stopName, circulation]);

  const handleSave = () => {
    setStopName(localStop);
    setCirculation(localCirc);
    localStorage.setItem('bus_stop_name', localStop);
    localStorage.setItem('bus_circulation', localCirc);
    onClose();
  };

  const handleClear = () => {
    setLocalStop('');
    setLocalCirc('');
    setStopName('');
    setCirculation('');
    localStorage.removeItem('bus_stop_name');
    localStorage.removeItem('bus_circulation');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Nastavení</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-500" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Název zastávky</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-3 text-lg text-black"
              placeholder="Např. Českomoravská"
              value={localStop}
              onChange={(e) => setLocalStop(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Číslo oběhu (cca 5 znaků)</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-3 text-lg text-black"
              placeholder="Např. 16"
              maxLength={10}
              value={localCirc}
              onChange={(e) => setLocalCirc(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleClear}
            className="flex-1 bg-red-100 text-red-600 py-3 rounded-lg font-bold flex justify-center items-center gap-2"
          >
            <Trash2 size={18} /> Vymazat
          </button>
          <button 
            onClick={handleSave}
            className="flex-[2] bg-blue-600 text-white py-3 rounded-lg font-bold"
          >
            Uložit a zavřít
          </button>
        </div>
      </div>
    </div>
  );
}