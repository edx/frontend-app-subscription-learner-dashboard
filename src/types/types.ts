/**
 * types/index.ts
 *
 * Shared TypeScript interfaces and types for the Search feature.
 */

// ─── Algolia raw hit ──────────────────────────────────────────────────────────

/** Raw shape returned by Algolia for a product hit. Only the fields we access. */
export interface AlgoliaProductHit {
  objectID: string,
  title?: string,
  name?: string,
  type?: string,
  content_type?: string,
  institution?: string,
  course_count?: number,
  courseCount?: number,
  card_image_url?: string,
  image_url?: string,
  authoring_organizations?: { name: string }[],
  partners?: { name: string }[],
  [key: string]: unknown, // allow arbitrary extra fields
}

/** Result shape returned by searchProducts / fetchPopularProducts */
export interface AlgoliaSearchResult {
  hits: AlgoliaProductHit[],
  nbHits: number,
  nbPages: number,
}

// ─── Product type union ───────────────────────────────────────────────────────

export type ProductType = 'program' | 'course';
