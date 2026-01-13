"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { Phase, Inquiry } from "@/lib/types/inquiry.types";
import {
  PHASE_CONFIG,
  PHASES,
  DRAG_ACTIVATION_DISTANCE,
} from "@/lib/constants/inquiry.constants";
import { useInquiryStore } from "@/store/inquiry.store";
import KanbanColumn from "./kanban-column";
import InquiryCard from "../inquiry/inquiry-card";
import InquiryDetailModal from "../inquiry/inquiry-detail-modal";

export default function KanbanBoard() {
  const {
    getFilteredInquiries,
    updateInquiryPhase,
    selectedInquiry,
    setSelectedInquiry,
  } = useInquiryStore();

  const filteredInquiries = getFilteredInquiries();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: DRAG_ACTIVATION_DISTANCE,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const inquiryId = active.id as string;
    const newPhase = over.id as Phase;

    const inquiry = filteredInquiries.find((inq) => inq.id === inquiryId);
    if (!inquiry || inquiry.phase === newPhase) return;

    updateInquiryPhase(inquiryId, newPhase);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeInquiry = activeId
    ? filteredInquiries.find((inq) => inq.id === activeId)
    : null;

  const getColumnStats = (phase: Phase) => {
    const items = filteredInquiries.filter((inq) => inq.phase === phase);
    const count = items.length;
    const totalValue = items.reduce((sum, inq) => sum + inq.potentialValue, 0);
    return { count, totalValue };
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHASES.map((phase) => {
            const stats = getColumnStats(phase);
            const config = PHASE_CONFIG[phase];
            const items = filteredInquiries.filter(
              (inq) => inq.phase === phase
            );

            return (
              <KanbanColumn
                key={phase}
                phase={phase}
                title={config.title}
                color={config.color}
                bgColor={config.bgColor}
                borderColor={config.borderColor}
                count={stats.count}
                totalValue={stats.totalValue}
                items={items}
                onCardClick={setSelectedInquiry}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeInquiry ? (
            <div className="rotate-3 scale-105 cursor-grabbing">
              <InquiryCard
                inquiry={activeInquiry}
                onClick={() => {}}
                isDragging={true}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <InquiryDetailModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
      />
    </>
  );
}
