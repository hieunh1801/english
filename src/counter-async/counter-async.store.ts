import { create } from "zustand";

import { persist } from "zustand/middleware";
type CounterAsyncState = {
  count: number;
  countLoading: boolean;
  countError: string;
};

type CounterAsyncActions = {
  increaseCount: () => void;
  decreaseCount: () => void;
};

export const useCounterAsyncStore = create(
  persist<CounterAsyncState & CounterAsyncActions>(
    (set, get) => {
      return {
        count: 0,
        countLoading: false,
        countError: "",
        increaseCount: async () => {
          set({ countLoading: true });
          setTimeout(() => {
            set({
              count: get().count + 1,
              countLoading: false,
            });
          }, 1000);
        },
        decreaseCount: async () => {
          set({ countLoading: true });
          setTimeout(() => {
            set({
              count: get().count - 1,
              countLoading: false,
            });
          }, 1000);
        },
      };
    },
    {
      name: "counter-store",
    }
  )
);
