import { APP_CONFIG } from "@/constants/layout.constants";

export const PageFooter = () => {
  return (
    <footer className="mt-12 pb-6 text-center text-sm text-muted-foreground">
      <p>{APP_CONFIG.FOOTER_TEXT} • 2026</p>
    </footer>
  );
};
