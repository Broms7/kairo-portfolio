export default function Loading() {
  return (
    <div className="container-prose flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-petrol/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-copper" />
      </div>
      <p className="font-slab text-sm uppercase tracking-wider text-petrol/60">
        Chargement…
      </p>
    </div>
  );
}
