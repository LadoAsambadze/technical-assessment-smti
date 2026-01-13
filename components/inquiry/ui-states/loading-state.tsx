import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center py-20 min-h-screen">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading inquiries...</p>
      </div>
    </div>
  );
};
