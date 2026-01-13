import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center py-12">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Inquiries</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="w-full"
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};
