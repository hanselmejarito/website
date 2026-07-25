import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-signal">
        404
      </p>
      <h1 className="mt-4 font-display text-display-lg text-ink text-balance">
        An honest mistake.
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">
        This page doesn&apos;t exist — or the drop it pointed to is already gone.
        Either way, the good stuff is one click away.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href="/collections/all">Shop the drop</Button>
        <Button href="/" variant="secondary">
          Back home
        </Button>
      </div>
    </div>
  );
}
