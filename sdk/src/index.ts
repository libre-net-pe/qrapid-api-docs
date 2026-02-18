import createFetchClient from "openapi-fetch";
import type { paths } from "./schema.js";

export type { components, paths } from "./schema.js";

export interface QRapidClientOptions {
  /** Bearer token — Firebase ID token (`Authorization: Bearer <token>`) or long-lived API key (`sk_live_*`) */
  token: string;
  /** Override the base URL. Defaults to the production API. */
  baseUrl?: string;
}

/**
 * Creates a type-safe QRapid API client.
 *
 * @example
 * ```ts
 * import { createClient } from "@qrapid/sdk";
 *
 * const api = createClient({ token: firebaseIdToken });
 *
 * const { data, error } = await api.GET("/qr-codes", {
 *   params: { query: { page: 1, limit: 20 } },
 * });
 * ```
 */
export function createClient({
  token,
  baseUrl = "https://api.qrapid.io/v1",
}: QRapidClientOptions) {
  return createFetchClient<paths>({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
