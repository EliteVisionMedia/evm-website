import Button from '../components/Button';

/** Temporary route target until the remaining pages are built (after homepage approval). */
export default function ComingSoon({ title, notFound = false }: { title: string; notFound?: boolean }) {
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <span className="kicker">{notFound ? 'Error 404' : 'In progress'}</span>
      <h1 className="h-display text-[14vw] leading-[0.92] md:text-[8vw] min-[1440px]:text-[112px]">{title}</h1>
      <p className="max-w-[46ch] text-lg text-slate">
        {notFound ? "This page doesn't exist." : 'This page is being built and will be ready in the next phase.'}
      </p>
      <Button to="/" variant="dark">Back to home</Button>
    </section>
  );
}
