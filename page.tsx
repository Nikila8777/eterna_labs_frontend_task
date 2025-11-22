import Container from "@/components/ui-layout/Container";
import TokenTable from "@/components/token-table/TokenTable";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Container>
        <header className="pt-8 pb-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Token Discovery
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Live Solana pairs with market cap, liquidity and volume.
          </p>
        </header>

        <section className="mt-4">
          <TokenTable />
        </section>
      </Container>
    </main>
  );
}
