import { Search } from "lucide-react";
import { Button } from "../../ui/button";

interface NoResultsStateProps {
  onClearFilters: () => void;
}

export const NoResultsState = ({ onClearFilters }: NoResultsStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-slate-100 p-6 mb-4">
        <Search className="h-12 w-12 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        No Matching Inquiries
      </h3>
      <p className="text-slate-600 text-center max-w-md mb-6">
        We couldn't find any inquiries matching your filters. Try adjusting your
        search criteria.
      </p>
      <Button onClick={onClearFilters} variant="outline">
        Clear All Filters
      </Button>
    </div>
  );
};
