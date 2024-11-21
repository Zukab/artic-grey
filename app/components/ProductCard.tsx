import clsx from 'clsx';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import type {MoneyV2, Product} from '@shopify/hydrogen/storefront-api-types';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {AddToCartButton} from '~/components/AddToCartButton';

export function ProductCard({
  product,
  loading,
  onClick,
}: {
  product: ProductCardFragment;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
}) {
  const cardProduct: Product = product?.variants
    ? (product as Product)
    : null;

  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];
  if (!firstVariant) return null;
  
  const {image, price} = firstVariant;

  return (
    <Link
      onClick={onClick}
      to={`/products/${product.handle}`}
      prefetch="intent"
      className="group relative flex flex-col"
    >
      <div className="relative rounded-2xl overflow-hidden bg-white">
        <div className="aspect-[1/1]">
          {image && (
            <Image
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
              aspectRatio="1/1"
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          )}
        </div>
        <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <AddToCartButton
            lines={[
              {
                quantity: 1,
                merchandiseId: firstVariant.id,
              },
            ]}
            variant="secondary"
            className="w-full bg-white text-black hover:bg-white/90 py-3 rounded-lg"
          >
            Add to Cart · <Money withoutTrailingZeros data={price!} />
          </AddToCartButton>
        </div>
      </div>
      <div className="mt-4 text-black">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <div className="mt-1">
          <Money withoutTrailingZeros data={price!} />
        </div>
      </div>
    </Link>
  );
}
