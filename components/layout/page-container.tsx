import { ReactNode } from "react";
import { LAYOUT } from "@/constants/layout.constants";

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.PADDING.X} py-6`}>
      {children}
    </div>
  );
};
