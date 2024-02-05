
import { accessTokenKey } from "./api";
import { apiBaseUrl } from "./constants";

export const defaultQueryFn = async ({ queryKey }) => {
  const accessToken  = localStorage.getItem(accessTokenKey);
  const r = await fetch(`${apiBaseUrl}${queryKey}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (r.status !== 200) {
    throw new Error(await r.text());
  }

  return await r.json();
};
