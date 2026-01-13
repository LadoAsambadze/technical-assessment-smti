export type Phase = "new" | "sent_to_hotels" | "offers_received" | "completed";

export interface Inquiry {
  id: string;
  clientName: string;
  contactPerson: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  potentialValue: number;
  phase: Phase;
  hotels: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  clientName?: string;
  dateFrom?: string;
  dateTo?: string;
  minValue?: number;
}

export interface InquiryStats {
  count: number;
  totalValue: number;
}

export interface PhaseConfig {
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export type PhaseConfigMap = Record<Phase, PhaseConfig>;
