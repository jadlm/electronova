import { Suspense } from "react";
import CategoryDetailClient from "./CategoryDetailClient";

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}>
      <CategoryDetailClient params={params} />
    </Suspense>
  );
}
