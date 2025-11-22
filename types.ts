export type TokenStatus = "NEW" | "FINAL_STRETCH" | "MIGRATED";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  status: TokenStatus;
  chain: string;
}
