"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/store";
import { setTokens, upsertToken } from "./tokensSlice";
import { subscribeToTokenFeed } from "@/lib/websocketMock";
import type { Token } from "@/lib/types";

async function fetchTokens(): Promise<Token[]> {
  const res = await fetch("/api/tokens");
  return res.json();
}

export function useTokensFeed() {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery<Token[]>({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
  });

  // When data changes, push it to Redux
  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
    }
  }, [data, dispatch]);

  // WebSocket live updates
  useEffect(() => {
    const unsub = subscribeToTokenFeed((update) => {
      dispatch(
        upsertToken({
          id: update.id,
          name: `Token ${Number(update.id) + 1}`,
          symbol: `TK${Number(update.id) + 1}`,
          price: update.price ?? 1,
          priceChange24h: update.priceChange24h ?? 0,
          volume24h: 100000,
          liquidity: 50000,
          status: "NEW",
          chain: "SOL",
        })
      );
    });

    return () => unsub();
  }, [dispatch]);

  return { isLoading, isError };
}
