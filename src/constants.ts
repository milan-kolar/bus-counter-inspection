// src/constants.ts

export const BUTTON_TYPES = [
  "HOT", "PK", "LÍT", 
  "APL", "KUP", "ČERNÝ", 
  "LÍT+HOT", "LÍT+PK", "LÍT+JÍZ", 
  "APL+HOT", "APL+PK", "APL+JÍZ", 
  "KUP+HOT", "KUP+PK", "KUP+JÍZ", 
  "JINÉ"
];

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