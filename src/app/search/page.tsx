import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}>
      <SearchClient />
    </Suspense>
  );
}
