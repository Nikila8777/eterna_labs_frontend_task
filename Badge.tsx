export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-slate-700 text-slate-200">
      {children}
    </span>
  );
}
