type ProductCardProps = {
  title: string;
  price: string;
  description: string;
};

export default function ProductCard({ title, price, description }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
        </div>
        <span className="text-lg font-semibold text-zinc-950">{price}</span>
      </div>
    </article>
  );
}
