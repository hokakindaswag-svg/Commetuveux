import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

export function ProductGrid({
  products,
  priorityCount = 0,
  className = '',
}: {
  products: Product[];
  priorityCount?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4 xl:gap-x-6 ${className}`}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < priorityCount} />
      ))}
    </div>
  );
}
