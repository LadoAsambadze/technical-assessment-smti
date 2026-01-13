"use client";

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import InquiryCard from "../inquiry/inquiry-card";
import { Inquiry, Phase } from "@/lib/types/inquiry.types";
import { formatCurrency } from "@/lib/utils/formatter";

interface KanbanColumnProps {
  phase: Phase;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  count: number;
  totalValue: number;
  items: Inquiry[];
  onCardClick: (inquiry: Inquiry) => void;
}

function DraggableInquiryCard({
  inquiry,
  onCardClick,
}: {
  inquiry: Inquiry;
  onCardClick: (inquiry: Inquiry) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: inquiry.id,
      data: { inquiry },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-grab active:cursor-grabbing"
      {...listeners}
      {...attributes}
      onClick={(e) => {
        if (!isDragging) {
          onCardClick(inquiry);
        }
      }}
    >
      <InquiryCard
        inquiry={inquiry}
        onClick={() => {}}
        isDragging={isDragging}
      />
    </div>
  );
}

export default function KanbanColumn({
  phase,
  title,
  color,
  bgColor,
  borderColor,
  count,
  totalValue,
  items,
  onCardClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: phase,
    data: { phase },
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col h-full min-h-[600px] rounded-xl border-2 transition-all duration-200
        ${
          isOver
            ? "border-blue-400 bg-blue-50/50 shadow-lg ring-2 ring-blue-300"
            : `${borderColor} ${bgColor}`
        }
      `}
    >
      {/* Column Header */}
      <div className="p-4 border-b-2 border-slate-200 bg-white/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-bold text-sm uppercase tracking-wide ${color}`}>
            {title}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bgColor} ${color} border ${borderColor}`}
          >
            {count}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">Total Value:</span>
          <span className="text-sm font-bold text-slate-900">
            {formatCurrency(totalValue)}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-center border-2 border-dashed border-slate-300 rounded-lg bg-white/30">
            <p className="text-sm text-slate-400">
              {isOver ? "✨ Drop here" : "Drop inquiries here"}
            </p>
          </div>
        ) : (
          items.map((inquiry) => (
            <DraggableInquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onCardClick={onCardClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
