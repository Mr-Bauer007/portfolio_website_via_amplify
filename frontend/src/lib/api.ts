export type WagtailMeta = {
  type: string;
  detail_url: string;
  html_url: string | null;
  slug: string;
  first_published_at: string | null;
  last_published_at: string | null;
  title: string;
};

export type WagtailPage = {
  id: number;
  meta: WagtailMeta;
  intro?: string;
  about?: string;
  summary?: string;
  challenge?: string;
  approach?: string;
  impact?: string;
  tools?: string;
  repo_url?: string;
  demo_url?: string;
  topic?: string;
  reading_time_minutes?: number;
  published_date?: string;
  body?: string;
};

type PageResponse = {
  meta: { total_count: number };
  items: WagtailPage[];
};

const API_ROOT = process.env.WAGTAIL_API_URL ?? "http://127.0.0.1:8000/api/v2";

export async function getPages(query = "") {
  const queryParams = new URLSearchParams(query);
  const items: WagtailPage[] = [];
  let totalCount = 0;
  let offset = 0;

  do {
    const url = new URL(`${API_ROOT}/pages/`);
    url.searchParams.set("fields", "*");
    url.searchParams.set("limit", "20");
    url.searchParams.set("offset", String(offset));
    queryParams.forEach((value, key) => url.searchParams.set(key, value));

    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Wagtail API request failed: ${response.status}`);
    }

    const page = (await response.json()) as PageResponse;
    totalCount = page.meta.total_count;
    items.push(...page.items);
    offset += page.items.length;
  } while (items.length < totalCount && offset > 0);

  return { meta: { total_count: totalCount }, items };
}

export async function getPage(id: number) {
  const response = await fetch(`${API_ROOT}/pages/${id}/?fields=*`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Wagtail page request failed: ${response.status}`);
  }

  return (await response.json()) as WagtailPage;
}

export function getPageByType(pages: WagtailPage[], type: string) {
  return pages.find((page) => page.meta.type === type);
}
