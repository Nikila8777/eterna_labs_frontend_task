export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-slate-900 p-4 shadow-lg border border-slate-800">
      {children}
    </div>
  );
}
