import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';

import {
  PRODUCT_CARD_FRAGMENT,
  FEATURED_COLLECTION_FRAGMENT,
} from '~/data/fragments';

export async function loader({context}: LoaderFunctionArgs) {
  if (!context.storefront) {
    console.error('Storefront client not available');
    return json({
      products: [],
      error: 'Storefront client not available'
    });
  }

  try {
    const data = await context.storefront.query(FEATURED_ITEMS_QUERY, {
      variables: {
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
      cache: context.storefront.CacheLong(),
    });

    return json({
      products: data.products?.nodes || [],
    });
  } catch (error) {
    console.error('Featured products error:', error);
    return json({
      products: [],
      error: 'Error fetching products'
    });
  }
}

export const FEATURED_ITEMS_QUERY = `#graphql
  query FeaturedItems(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int = 12
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy) {
      nodes {
        ...ProductCard
        collections(first: 5) {
          nodes {
            handle
          }
        }
        tags
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
