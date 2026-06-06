interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Product</h1>
        <p className="mt-4 text-lg">Slug: {params.slug}</p>
      </div>
    </main>
  );
}
