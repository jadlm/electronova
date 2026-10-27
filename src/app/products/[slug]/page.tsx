import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}>
      <ProductDetailClient params={params} />
    </Suspense>
  );
}
