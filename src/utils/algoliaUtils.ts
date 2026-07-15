/**
 * utils/algoliaUtils.ts
 *
 * Algolia utility functions for the Search feature.
 * Mirrors the pattern used by the Skills Builder feature, with full TypeScript types.
 */

import { useMemo } from 'react';
import { getAppConfig, logError } from '@openedx/frontend-base';
import { algoliasearch, SearchClient } from 'algoliasearch';
import { FACET_SUBJECTS, HITS_PER_PAGE_COURSES } from '@src/constants';

import {
  AlgoliaProductHit,
  AlgoliaSearchResult,
  ProductType,
} from '../types/types';

import { appId } from '@src/constants';

// ─── useAlgoliaSearch ─────────────────────────────────────────────────────────

/**
 * Creates and memoises an Algolia search client using app config.
 * Matches the pattern used by the Skills Builder feature.
 *
 * @returns [SearchClient | null] tuple — destructure as: const [searchClient] = useAlgoliaSearch()
 */
export const useAlgoliaSearch = (): [SearchClient | null] => {
  const config = getAppConfig(appId);
  const algoliaAppId = config.ALGOLIA_APP_ID as string | undefined;
  const algoliaSearchApiKey = config.ALGOLIA_SEARCH_API_KEY as string | undefined;

  const [searchClient] = useMemo<[SearchClient | null]>(
    () => {
      if (!algoliaAppId || !algoliaSearchApiKey) {
        logError(new Error('Missing Algolia configuration: ALGOLIA_APP_ID or ALGOLIA_SEARCH_API_KEY'));
        return [null];
      }

      const client = algoliasearch(algoliaAppId, algoliaSearchApiKey);
      return [client];
    },
    [algoliaAppId, algoliaSearchApiKey],
  );

  return [searchClient];
};

// ─── formatFacetFilterData ────────────────────────────────────────────────────

/**
 * Formats an array of values into Algolia facet filter strings.
 *
 * @param facetFilterType  Facet attribute name, e.g. 'subjects'
 * @param data             Array of values, e.g. ['Leadership', 'AI']
 * @returns                e.g. ['subjects:Leadership', 'subjects:AI']
 *
 * @example
 *   formatFacetFilterData('subjects', ['Leadership', 'AI'])
 *   // → ['subjects:Leadership', 'subjects:AI']
 */
export const formatFacetFilterData = (
  facetFilterType: string,
  data: string[],
): string[] => {
  const formattedData: string[] = [];
  if (data) {
    data.forEach((item) => formattedData.push(`${facetFilterType}:${item}`));
  }
  return formattedData;
};

// ─── searchProducts ───────────────────────────────────────────────────────────

/**
 * Searches programs or courses from the shared product index.
 *
 * Both product types live in ALGOLIA_PRODUCT_INDEX_NAME, distinguished by the
 * `product` facet. Active tags are OR-ed within their facet and AND-ed with
 * the product-type filter — standard Algolia multi-select pattern.
 *
 * Algolia facetFilters format used here:
 *   [ ['product:program'], ['subjects:Leadership', 'subjects:AI'] ]
 *   → product = "program" AND (subjects = "Leadership" OR subjects = "AI")
 *
 * @param searchClient  Algolia client from useAlgoliaSearch()
 * @param productType   'program' | 'course'
 * @param query         Free-text query ('' = browse / rank by popularity)
 * @param activeTags    Selected tag values from the filter chips
 * @param facetField    Facet attribute to filter tags on (default: 'subjects')
 * @param hitsPerPage   Page size
 * @param page          0-indexed page number (Algolia convention)
 */
export const searchProducts = async (
  searchClient: SearchClient,
  productType: ProductType,
  query: string,
  activeTags: string[],
  facetField: string = FACET_SUBJECTS,
  hitsPerPage: number = HITS_PER_PAGE_COURSES,
  page = 0,
): Promise<AlgoliaSearchResult> => {
  const indexName = getAppConfig(appId).ALGOLIA_PRODUCT_INDEX_NAME as string;
  const tagFilters = formatFacetFilterData(facetField, activeTags);

  // Nested arrays = AND between outer elements, OR within inner arrays
  const facetFilters: string[][] = [
    [`product:${productType}`],
    ...(tagFilters.length > 0 ? [tagFilters] : []),
  ];

  try {
    const { hits, nbHits, nbPages } = await searchClient.searchSingleIndex({
      indexName,
      searchParams: {
        query,
        facetFilters,
        hitsPerPage,
        page,
      },
    });

    return {
      hits: hits as AlgoliaProductHit[],
      nbHits: nbHits ?? 0,
      nbPages: nbPages ?? 0,
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logError(err);
    return { hits: [], nbHits: 0, nbPages: 0 };
  }
};

// ─── fetchPopularProducts ─────────────────────────────────────────────────────

/**
 * Fetches top-ranked products with no query or tag filters.
 * Used for the "Popular programs / courses" fallback in the no-results state.
 *
 * @param searchClient  Algolia client
 * @param productType   'program' | 'course'
 * @param hitsPerPage   Number of items to fetch
 * @returns             Raw Algolia hit objects
 */
export const fetchPopularProducts = async (
  searchClient: SearchClient,
  productType: ProductType,
  hitsPerPage: number,
): Promise<AlgoliaProductHit[]> => {
  const { hits } = await searchProducts(
    searchClient,
    productType,
    '', // empty query → Algolia ranks by popularity
    [], // no tag filters
    FACET_SUBJECTS,
    hitsPerPage,
    0,
  );
  return hits;
};
