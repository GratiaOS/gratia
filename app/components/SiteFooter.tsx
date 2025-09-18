export default function SiteFooter() {
  return (
    <footer className="mt-16 w-full border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 text-sm text-[var(--color-muted)]">
        <p>© {new Date().getFullYear()} Gratia. All rights reserved.</p>
        <p>
          🌬 whisper: <em>“paths open where attention flows.”</em>
        </p>
      </div>
    </footer>
  );
}
