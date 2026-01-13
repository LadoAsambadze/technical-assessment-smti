import { create } from "zustand";
import { Inquiry, Phase, FilterState } from "@/lib/types/inquiry.types";
import { inquiryService } from "@/lib/services/inquiry.service";

interface InquiryStore {
  inquiries: Inquiry[];
  selectedInquiry: Inquiry | null;

  isLoading: boolean;
  error: string | null;

  searchText: string;
  dateFrom: string | null;
  dateTo: string | null;
  minValue: number | null;

  fetchInquiries: () => Promise<void>;
  updateInquiryPhase: (id: string, phase: Phase) => Promise<void>;
  setSelectedInquiry: (inquiry: Inquiry | null) => void;

  setSearchText: (text: string) => void;
  setDateRange: (from: string | null, to: string | null) => void;
  setMinValue: (value: number | null) => void;
  clearFilters: () => void;

  getFilteredInquiries: () => Inquiry[];
}

export const useInquiryStore = create<InquiryStore>()((set, get) => ({
  inquiries: [],
  selectedInquiry: null,
  isLoading: false,
  error: null,
  searchText: "",
  dateFrom: null,
  dateTo: null,
  minValue: null,

  fetchInquiries: async () => {
    set({ isLoading: true, error: null });

    try {
      const inquiries = await inquiryService.fetchInquiries();
      set({ inquiries, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to load inquiries",
        isLoading: false,
      });
    }
  },

  updateInquiryPhase: async (id: string, phase: Phase) => {
    const previousInquiries = get().inquiries;

    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === id
          ? { ...inquiry, phase, updatedAt: new Date().toISOString() }
          : inquiry
      ),
    }));

    try {
      const updated = await inquiryService.updateInquiryPhase(id, phase);

      set((state) => ({
        inquiries: state.inquiries.map((inquiry) =>
          inquiry.id === id ? updated : inquiry
        ),
      }));
    } catch (error) {
      set({
        inquiries: previousInquiries,
        error: "Failed to update phase",
      });
    }
  },

  setSelectedInquiry: (inquiry) => {
    set({ selectedInquiry: inquiry });
  },

  setSearchText: (text) => set({ searchText: text }),

  setDateRange: (from, to) => set({ dateFrom: from, dateTo: to }),

  setMinValue: (value) => set({ minValue: value }),

  clearFilters: () =>
    set({
      searchText: "",
      dateFrom: null,
      dateTo: null,
      minValue: null,
    }),

  getFilteredInquiries: () => {
    const { inquiries, searchText, dateFrom, dateTo, minValue } = get();

    return inquiries.filter((inquiry) => {
      if (searchText) {
        const search = searchText.toLowerCase();
        const matchesSearch =
          inquiry.clientName.toLowerCase().includes(search) ||
          inquiry.contactPerson.toLowerCase().includes(search);
        if (!matchesSearch) return false;
      }

      if (dateFrom && inquiry.eventDate < dateFrom) return false;
      if (dateTo && inquiry.eventDate > dateTo) return false;

      if (minValue && inquiry.potentialValue < minValue) return false;

      return true;
    });
  },
}));
