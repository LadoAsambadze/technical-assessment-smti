"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useInquiryStore } from "@/store/inquiry.store";

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default function InquiryFilters() {
  // Get individual filter fields from store
  const {
    searchText,
    dateFrom,
    dateTo,
    minValue,
    setSearchText,
    setDateRange,
    setMinValue,
    clearFilters,
  } = useInquiryStore();

  // Local state for search input (for debouncing)
  const [localSearchText, setLocalSearchText] = useState(searchText);

  // Count active filters
  const activeFilterCount = [searchText, dateFrom, dateTo, minValue].filter(
    Boolean
  ).length;

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchText(value), 500),
    [setSearchText]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearchText(value);
    debouncedSearch(value);
  };

  const handleClearAll = () => {
    setLocalSearchText("");
    clearFilters();
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount} active</Badge>
          )}
        </div>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-8"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="searchText">Client Name</Label>
          <Input
            id="searchText"
            type="text"
            value={localSearchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search clients..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateFrom">Event Date From</Label>
          <Input
            id="dateFrom"
            type="date"
            value={dateFrom || ""}
            onChange={(e) => setDateRange(e.target.value || null, dateTo)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateTo">Event Date To</Label>
          <Input
            id="dateTo"
            type="date"
            value={dateTo || ""}
            onChange={(e) => setDateRange(dateFrom, e.target.value || null)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minValue">Min Value (CHF)</Label>
          <Input
            id="minValue"
            type="number"
            value={minValue || ""}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null;
              setMinValue(value);
            }}
            placeholder="0"
            min="0"
            step="1000"
          />
        </div>
      </div>
    </Card>
  );
}
