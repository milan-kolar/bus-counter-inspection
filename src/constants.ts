// src/constants.ts

export interface ButtonConfig {
  label: string;
  bgColor: string;
  borderColor: string;
}

export const BUTTON_CONFIGS: ButtonConfig[] = [
  // Řádek 1: Základní barvy
  { label: "HOT", bgColor: "#FEF2F2", borderColor: "#FECACA" },      // Red-50 / Red-200
  { label: "PK", bgColor: "#EFF6FF", borderColor: "#BFDBFE" },       // Blue-50 / Blue-200
  { label: "LÍT", bgColor: "#F0FDF4", borderColor: "#BBF7D0" },      // Green-50 / Green-200
  
  // Řádek 2: Další základní
  { label: "APL", bgColor: "#FFF7ED", borderColor: "#FED7AA" },      // Orange-50 / Orange-200
  { label: "KUP", bgColor: "#FAF5FF", borderColor: "#E9D5FF" },      // Purple-50 / Purple-200
  { label: "ČERNÝ", bgColor: "#F8FAFC", borderColor: "#E2E8F0" },    // Slate-50 / Slate-200
  
  // Řádek 3: Kombinace s LÍT (Zelená/Tyrkysová)
  { label: "LÍT+HOT", bgColor: "#ECFCCB", borderColor: "#D9F99D" },  // Lime-100 / Lime-300
  { label: "LÍT+PK", bgColor: "#CCFBF1", borderColor: "#99F6E4" },   // Teal-100 / Teal-200
  { label: "LÍT+JÍZ", bgColor: "#E0F2FE", borderColor: "#BAE6FD" },  // Sky-100 / Sky-200
  
  // Řádek 4: Kombinace s APL (Oranžová/Žlutá)
  { label: "APL+HOT", bgColor: "#FEF3C7", borderColor: "#FDE68A" },  // Amber-100 / Amber-200
  { label: "APL+PK", bgColor: "#E0E7FF", borderColor: "#C7D2FE" },   // Indigo-100 / Indigo-200
  { label: "APL+JÍZ", bgColor: "#DBEAFE", borderColor: "#BFDBFE" },  // Blue-100 / Blue-200 (light)
  
  // Řádek 5: Kombinace s KUP (Fialová/Růžová)
  { label: "KUP+HOT", bgColor: "#FFE4E6", borderColor: "#FECDD3" },  // Rose-100 / Rose-200
  { label: "KUP+PK", bgColor: "#FCE7F3", borderColor: "#FBCFE8" },   // Pink-100 / Pink-200
  { label: "KUP+JÍZ", bgColor: "#FAE8FF", borderColor: "#E9D5FF" },  // Fuchsia-100 / Fuchsia-200
  
  // Ostatní
  { label: "JINÉ", bgColor: "#F5F5F4", borderColor: "#D6D3D1" }      // Stone-100 / Stone-300
];

export const BUTTON_TYPES = BUTTON_CONFIGS.map(c => c.label);

export interface MeasureRecord {
  id: number;
  type: string;
  duration: string; // string pro zachování formátu 2 des. míst
}

export interface CheckRecord {
  id: number;
  type: string;
  count: number;
}