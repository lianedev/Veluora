type CollectionCardProps = {
  title: string;
  description: string;
  imageAlt?: string;
};

export default function CollectionCard({ title, description, imageAlt = "Collection image" }: CollectionCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="h-48 bg-zinc-100" aria-label={imageAlt} />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
      </div>
    </article>
  );
}
