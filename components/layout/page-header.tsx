import { Badge } from "@/components/ui/badge";
import { APP_CONFIG, LAYOUT } from "@/constants/layout.constants";

export const PageHeader = () => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div
        className={`${LAYOUT.MAX_WIDTH} mx-auto ${LAYOUT.PADDING.X} ${LAYOUT.PADDING.Y}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {APP_CONFIG.TITLE}
            </h1>
            <p className="text-sm text-slate-600 mt-1">{APP_CONFIG.SUBTITLE}</p>
          </div>
          <Badge variant="outline" className="gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live
          </Badge>
        </div>
      </div>
    </header>
  );
};
