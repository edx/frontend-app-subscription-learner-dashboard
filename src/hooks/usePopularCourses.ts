import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { SearchClient } from 'algoliasearch';
import { ProductType } from '@src/types/types';
import { PRODUCT_TYPE_COURSE } from '@src/constants';
import { fetchPopularProducts } from '@src/utils/algoliaUtils';
import { ProductCardItem } from '@src/containers/ProductCard/data/types';

// ─── Query key factories ──────────────────────────────────────────────────────
// Centralised so cache invalidation is never a typo

export const searchKeys = {
  all: ['search'] as const,
  programs: (query: string, tags: string[]) =>
    [...searchKeys.all, 'programs', query, tags] as const,
  courses: (query: string, tags: string[], page: number) =>
    [...searchKeys.all, 'courses', query, tags, page] as const,
  popular: (productType: ProductType, limit: number) =>
    [...searchKeys.all, 'popular', productType, limit] as const,
};

export const usePopularCoursesData = (
  searchClient: SearchClient | null,
  enabled: boolean,
): UseQueryResult<ProductCardItem[]> =>
  useQuery({
    queryKey: searchKeys.popular(PRODUCT_TYPE_COURSE, 4),
    queryFn: async () => {
      const hits = await fetchPopularProducts(searchClient!, PRODUCT_TYPE_COURSE, 4);
      return hits.map((hit): ProductCardItem => {
        const hitDetails = hit as {
          short_description?: string,
          primary_description?: string,
          description?: string,
          marketing_url?: string,
          image_url?: string,
          card_image_url?: string,
          organization_logo_override?: string,
          content_type?: string,
          type?: string,
          partner?: string,
          weeks_to_complete?: number,
          level?: string,
        };

        return {
          objectID: hit.objectID,
          title: hit.title ?? hit.name ?? 'Untitled',
          primary_description: hitDetails.primary_description ?? hitDetails.short_description ?? hitDetails.description ?? '',
          url: hitDetails.card_image_url ?? hitDetails.image_url ?? hitDetails.marketing_url ?? '',
          thumbnail: hitDetails.organization_logo_override ?? '',
          content_type: hitDetails.content_type ?? hitDetails.type ?? 'Course',
          product: 'Course',
          partner: hitDetails.partner ?? '',
          weeks_to_complete: hitDetails.weeks_to_complete ?? undefined,
          level: hitDetails.level ?? undefined,
        };
      });
    },
    enabled: !!searchClient && enabled,
    staleTime: 1000 * 60 * 10,
  });
