import { create } from "zustand";

type Actions = {
  increasePopulation: () => void;
  decreasePopulation: () => void;
  removeAllBears: () => void;
};

type State = {
  bears: number;
};

export const useCounterStore = create<State & Actions>((set) => {
  console.log("init counterStore");
  return {
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
    removeAllBears: () => set({ bears: 0 }),
  };
});

export const useCounterStore2 = create<State & Actions>((set) => {
  console.log("init counterStore2");
  return {
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
    removeAllBears: () => set({ bears: 0 }),
  };
});
