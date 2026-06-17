export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, string | number | boolean>;
  timeoutMs?: number;
  /** if true, return the raw Response instead of parsing body */
  returnResponse?: boolean;
  useMagicKey?: boolean;
}

let globalMagicKey: string | null = null;

export function setMagicKey(key: string | null) {
  globalMagicKey = key;
}

function buildQuery(q?: Record<string, string | number | boolean>) {
  if (!q || Object.keys(q).length === 0) return '';
  const params = new URLSearchParams();
  for (const k of Object.keys(q)) {
    const v = q[k];
    if (v === undefined || v === null) continue;
    params.append(k, String(v));
  }
  const s = params.toString();
  return s ? `?${s}` : '';
}

async function parseBody(res: Response) {
  const ct = res.headers.get('content-type') || '';
  if (!ct) return undefined;
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

async function doFetch<T = any>(url: string, opts: RequestOptions = {}): Promise<T> {
  const method = opts.method || 'GET';
  const headers: Record<string, string> = Object.assign({}, opts.headers || {});

  // Attach Magic-Key by default when set. To opt out, pass useMagicKey: false
  if (globalMagicKey && opts.useMagicKey !== false) headers['Magic-Key'] = globalMagicKey as string;

  let body: BodyInit | undefined;
  if (opts.body !== undefined && opts.body !== null) {
    if (typeof opts.body === 'string' || opts.body instanceof FormData || opts.body instanceof URLSearchParams) {
      body = opts.body as BodyInit;
    } else {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      body = JSON.stringify(opts.body);
    }
  }

  const fullUrl = url + buildQuery(opts.query);

  const controller = new AbortController();
  const timeout = opts.timeoutMs ?? 0;
  let id: number | undefined;
  if (timeout > 0) id = window.setTimeout(() => controller.abort(), timeout);

  const res = await fetch(fullUrl, { method, headers, body, signal: controller.signal }).finally(() => {
    if (id !== undefined) clearTimeout(id);
  });

  if (!res.ok) {
    const parsed = await parseBody(res).catch(() => undefined);
    const err: any = new Error(`HTTP ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = parsed;
    throw err;
  }

  if (opts.returnResponse) return res as unknown as T;

  const parsed = await parseBody(res).catch(() => undefined);
  return parsed as T;
}

export const HttpHelper = {
  setMagicKey,
  request: doFetch,
  get<T = any>(url: string, opts: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return doFetch<T>(url, { ...(opts as RequestOptions), method: 'GET' });
  },
  post<T = any>(url: string, body?: any, opts: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return doFetch<T>(url, { ...(opts as RequestOptions), method: 'POST', body });
  },
  put<T = any>(url: string, body?: any, opts: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return doFetch<T>(url, { ...(opts as RequestOptions), method: 'PUT', body });
  },
  del<T = any>(url: string, body?: any, opts: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return doFetch<T>(url, { ...(opts as RequestOptions), method: 'DELETE', body });
  }
};

export const get = HttpHelper.get;
export const post = HttpHelper.post;
export const put = HttpHelper.put;
export const del = HttpHelper.del;