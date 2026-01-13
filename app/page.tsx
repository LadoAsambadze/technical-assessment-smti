"use client";

import { useEffect } from "react";
import KanbanBoard from "@/components/inquiry/kanban/kanban-board";
import InquiryFilters from "@/components/inquiry/inquiry/inquiry-filters";
import { PageHeader } from "@/components/layout/page-header";
import { PageContainer } from "@/components/layout/page-container";
import { PageFooter } from "@/components/layout/page-footer";
import { ErrorState } from "@/components/inquiry/ui-states/error-state";
import { NoResultsState } from "@/components/inquiry/ui-states/no-result-state";
import { SkeletonState } from "@/components/inquiry/ui-states/skeleteon-state";
import { LoadingState } from "@/components/inquiry/ui-states/loading-state";
import { useInquiryStore } from "@/store/inquiry.store";

export default function Home() {
  const {
    fetchInquiries,
    isLoading,
    error,
    inquiries,
    getFilteredInquiries,
    clearFilters,
    searchText,
    dateFrom,
    dateTo,
    minValue,
  } = useInquiryStore();

  const filteredInquiries = getFilteredInquiries();

  const hasActiveFilters = !!(searchText || dateFrom || dateTo || minValue);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <PageHeader />
      <PageContainer>
        <div className="space-y-6">
          {!(error && inquiries.length === 0) && <InquiryFilters />}

          {error && inquiries.length === 0 ? (
            <ErrorState error={error} onRetry={fetchInquiries} />
          ) : null}

          {isLoading && inquiries.length === 0 ? <SkeletonState /> : null}

          {!isLoading && !error && inquiries.length === 0 ? (
            <LoadingState />
          ) : null}

          {!isLoading &&
          !error &&
          inquiries.length > 0 &&
          filteredInquiries.length === 0 &&
          hasActiveFilters ? (
            <NoResultsState onClearFilters={clearFilters} />
          ) : null}

          {!isLoading &&
          !error &&
          inquiries.length > 0 &&
          filteredInquiries.length > 0 ? (
            <KanbanBoard />
          ) : null}
        </div>
      </PageContainer>
      <PageFooter />
    </main>
  );
}
