import { FilterState, Inquiry, Phase } from "../types/inquiry.types";

class InquiryService {
  private baseUrl = "/api/inquiries";
  async fetchInquiries(filters?: FilterState): Promise<Inquiry[]> {
    const params = new URLSearchParams();

    if (filters?.clientName) params.set("clientName", filters.clientName);
    if (filters?.dateFrom) params.set("dateFrom", filters.dateFrom);
    if (filters?.dateTo) params.set("dateTo", filters.dateTo);
    if (filters?.minValue) params.set("minValue", filters.minValue.toString());

    const response = await fetch(`${this.baseUrl}?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch inquiries");
    }

    const data = await response.json();
    return data.inquiries || data;
  }

  async updateInquiryPhase(id: string, phase: Phase): Promise<Inquiry> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phase }),
    });

    if (!response.ok) {
      throw new Error("Failed to update inquiry");
    }

    const result = await response.json();
    return result.inquiry || result;
  }

  async getInquiry(id: string): Promise<Inquiry> {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error("Inquiry not found");
    }

    const result = await response.json();
    return result.inquiry || result;
  }
}

export const inquiryService = new InquiryService();
