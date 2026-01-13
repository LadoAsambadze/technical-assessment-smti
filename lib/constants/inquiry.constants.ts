import { PhaseConfigMap, Phase } from "@/lib/types/inquiry.types";

export const PHASE_CONFIG: PhaseConfigMap = {
  new: {
    title: "New",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  sent_to_hotels: {
    title: "Sent to Hotels",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  offers_received: {
    title: "Offers Received",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  completed: {
    title: "Completed",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
};

export const PHASES: Phase[] = [
  "new",
  "sent_to_hotels",
  "offers_received",
  "completed",
];

export const HIGH_VALUE_THRESHOLD = 50000;

export const DRAG_ACTIVATION_DISTANCE = 5;
