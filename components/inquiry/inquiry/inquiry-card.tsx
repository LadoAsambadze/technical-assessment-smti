"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Inquiry } from "@/lib/types/inquiry.types";
import { HIGH_VALUE_THRESHOLD } from "@/lib/constants/inquiry.constants";
import { formatCurrency, formatDate } from "@/lib/utils/formatter";

interface InquiryCardProps {
  inquiry: Inquiry;
  onClick: () => void;
  isDragging?: boolean;
}

export default function InquiryCard({
  inquiry,
  onClick,
  isDragging = false,
}: InquiryCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: inquiry.id,
    data: { inquiry },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const highValue = inquiry.potentialValue > HIGH_VALUE_THRESHOLD;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        highValue ? "border-amber-400 bg-amber-50/30" : ""
      } ${isDragging ? "rotate-2 scale-105" : ""}`}
      onClick={onClick}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{inquiry.clientName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {inquiry.contactPerson}
          </p>
        </div>
        {highValue && (
          <Badge variant="secondary" className="ml-2">
            ⭐
          </Badge>
        )}
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="mr-1">📅</span>
          <span>{formatDate(inquiry.eventDate)}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-muted-foreground">
            <span className="mr-1">👥</span>
            <span>{inquiry.guestCount} guests</span>
          </div>
          <div className="font-semibold">
            {formatCurrency(inquiry.potentialValue)}
          </div>
        </div>
      </div>

      <Badge variant="outline" className="mb-3">
        {inquiry.eventType}
      </Badge>

      {inquiry.hotels.length > 0 && (
        <div className="pt-3 border-t">
          <p className="text-xs text-muted-foreground mb-1">Hotels:</p>
          <p className="text-xs truncate">{inquiry.hotels.join(", ")}</p>
        </div>
      )}

      <div className="mt-3 pt-3 border-t">
        <span className="text-xs font-mono text-muted-foreground">
          {inquiry.id}
        </span>
      </div>
    </Card>
  );
}
