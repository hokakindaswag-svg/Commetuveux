import ProductCard from './ProductCard';

export default function ProductGrid({ products, priorityCount = 4 }) {
  return (
    <div className="grid">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
