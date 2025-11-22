import { NextResponse } from "next/server";
import type { Token } from "@/lib/types";

export async function GET() {
  const tokens: Token[] = Array.from({ length: 20 }).map((_, i) => ({
    id: String(i),
    name: `Token ${i + 1}`,
    symbol: `TK${i + 1}`,
    price: 0.5 + i * 0.123,
    priceChange24h: (i % 2 === 0 ? 1 : -1) * (4 + i),
    volume24h: 90000 * (i + 1),
    liquidity: 40000 * (i + 1),
    status: i < 6 ? "NEW" : i < 14 ? "FINAL_STRETCH" : "MIGRATED",
    chain: i % 3 === 0 ? "SOL" : i % 3 === 1 ? "ETH" : "BSC",
  }));

  return NextResponse.json(tokens);
}
