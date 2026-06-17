import type { UseFetchOptions } from 'nuxt/app';
import { getMagicKey } from '@manaapp/ui';

export function useMFetch<T>(
  url: MaybeRefOrGetter<string>,
  options?: UseFetchOptions<T>
) {
  const magicKey = ref("");

  magicKey.value = getMagicKey();

  return useFetch(url, {
    ...options,
    immediate: false,
    watch: false,
    headers: {
      'Content-Type': 'application/json',
      'Magic-Key': magicKey,
      ...options?.headers,
    },
  });
}