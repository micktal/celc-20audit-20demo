import { create } from "zustand";

export type Filters = {
  period: "30j" | "90j" | "180j" | "1an";
  agencyId: string | null;
  criticity: "H0" | "H1" | "H2" | "Faible" | "All";
  typologie: string | "All";
  setPeriod: (p: Filters["period"]) => void;
  setAgency: (id: string | null) => void;
  setCriticity: (c: Filters["criticity"]) => void;
  setTypologie: (t: string | "All") => void;
  reset: () => void;
};

export const useFilters = create<Filters>((set) => ({
  period: "30j",
  agencyId: null,
  criticity: "All",
  typologie: "All",
  setPeriod: (p) => set(() => ({ period: p })),
  setAgency: (id) => set(() => ({ agencyId: id })),
  setCriticity: (c) => set(() => ({ criticity: c })),
  setTypologie: (t) => set(() => ({ typologie: t })),
  reset: () =>
    set(() => ({
      period: "30j",
      agencyId: null,
      criticity: "All",
      typologie: "All",
    })),
}));
