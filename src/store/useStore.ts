import { create } from 'zustand';

import { type Station } from '@/services/api/awdb';

interface State {
  station: Station | null;
  setStation: (station: Station | null) => void;

  date: Date;
  setDate: (date: Date) => void;
}

export const useStore = create<State>((set) => ({
  station: null,
  setStation: (station) => set({ station }),

  date: new Date(),
  setDate: (date) => set({ date }),
}));
