"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Inquiry, Phase } from "@/lib/types/inquiry.types";
import {
  PHASE_CONFIG,
  HIGH_VALUE_THRESHOLD,
} from "@/lib/constants/inquiry.constants";
import { useInquiryStore } from "@/store/inquiry.store";
import {
  formatCurrency,
  formatDate,
  formatRelativeDate,
} from "@/lib/utils/formatter";

interface InquiryDetailModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
}

export default function InquiryDetailModal({
  inquiry,
  onClose,
}: InquiryDetailModalProps) {
  const { updateInquiryPhase } = useInquiryStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (inquiry) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [inquiry, onClose]);

  if (!inquiry) return null;

  const highValue = inquiry.potentialValue > HIGH_VALUE_THRESHOLD;

  return (
    <Dialog open={!!inquiry} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">{inquiry.clientName}</span>
            {highValue && <Badge variant="secondary">⭐ High Value</Badge>}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {inquiry.contactPerson}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {inquiry.id}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Current Phase</Label>
            <Select
              value={inquiry.phase}
              onValueChange={(value) =>
                updateInquiryPhase(inquiry.id, value as Phase)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PHASE_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Event Type</p>
              <p className="font-semibold">{inquiry.eventType}</p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Event Date</p>
              <p className="font-semibold">{formatDate(inquiry.eventDate)}</p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Guest Count</p>
              <p className="font-semibold">{inquiry.guestCount} guests</p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Potential Value
              </p>
              <p className="font-semibold text-lg">
                {formatCurrency(inquiry.potentialValue)}
              </p>
            </div>
          </div>

          {inquiry.hotels.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Associated Hotels</h3>
              <div className="space-y-2">
                {inquiry.hotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                  >
                    <span>🏨</span>
                    <span className="text-sm">{hotel}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold mb-2">Notes</h3>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm whitespace-pre-wrap">
                {inquiry.notes || "No notes available"}
              </p>
            </div>
          </div>

          <div className="border-t pt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {formatRelativeDate(inquiry.createdAt)}
            </div>
            <div>
              <span className="font-medium">Last Updated:</span>{" "}
              {formatRelativeDate(inquiry.updatedAt)}
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
