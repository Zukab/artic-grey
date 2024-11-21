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

  // Tags simulados (estos deberían venir de los metadatos del producto)
  const tags = ['GMO Free', 'Gluten Free', 'Vegan', 'Dairy Free'];

  return (
    <Link
      onClick={onClick}
      to={`/products/${product.handle}`}
      prefetch="intent"
      className="group flex flex-col bg-white rounded-2xl p-4 transition-shadow hover:shadow-lg"
    >
      <div className="relative rounded-xl overflow-hidden bg-[#F6F6F5]">
        <div className="aspect-[1/1]">
          {image && (
            <Image
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 314px, (min-width: 768px) 314px, 314px"
              aspectRatio="1/1"
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
              width={314}
              height={314}
              loaderOptions={{
                scale: 2,
                crop: 'center'
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[11px] font-medium px-2 py-0.5 bg-black/5 text-black rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Título y descripción */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-black mb-1">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Supports cognitive function
          </p>
        </div>

        {/* Estrellas */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Botón de precio - en una sola línea */}
        <button className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2">
          <span>Add</span>
          <span>·</span>
          <Money withoutTrailingZeros data={price!} />
        </button>
      </div>
    </Link>
  );
}
