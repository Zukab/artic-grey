import clsx from 'clsx';
import {useRef, useState} from 'react';
import useScroll from 'react-use/esm/useScroll';
import {
  flattenConnection,
  CartForm,
  Image,
  Money,
  useOptimisticData,
  OptimisticInput,
  type CartReturn,
} from '@shopify/hydrogen';
import type {
  Cart as CartType,
  CartCost,
  CartLine,
  CartLineUpdateInput,
} from '@shopify/hydrogen/storefront-api-types';

import {Button} from '~/components/Button';
import {Text, Heading} from '~/components/Text';
import {Link} from '~/components/Link';
import {IconRemove} from '~/components/Icon';
import {FeaturedProducts} from '~/components/FeaturedProducts';
import {getInputStyleClasses} from '~/lib/utils';

type Layouts = 'page' | 'drawer';

export function Cart({
  layout,
  onClose,
  cart,
}: {
  layout: Layouts;
  onClose?: () => void;
  cart: CartReturn | null;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      image: '/assets/Product1.png',
      title: 'Magnesium L-Threonate',
      description: 'Enhances the quality of sleep',
      tags: ['GMO Free', 'Gluten Free', 'Vegan']
    },
    {
      id: 2,
      image: '/assets/Product2.png',
      title: 'Whey Protein Isolate',
      description: 'Muscle Performance & Recovery',
      tags: ['GMO Free', 'Low Calorie', 'Fast Absorbing']
    },
    {
      id: 3,
      image: '/assets/Product3.png',
      title: 'Pre-Workout Formula',
      description: 'Energy & Focus Enhancement',
      tags: ['Sugar Free', 'Natural', 'Vegan']
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    setCurrentIndex(prev => {
      if (direction === 'left') {
        return prev === 0 ? products.length - 1 : prev - 1;
      } else {
        return prev === products.length - 1 ? 0 : prev + 1;
      }
    });
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-black">Your Cart</h2>
          <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
            {cart?.totalQuantity || 0}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="text-black hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Contenido del carrito con fondo blanco */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="mb-8">
          <div className="bg-white p-4">
            {/* Slider de productos */}
            <div className="relative w-[300px] mx-auto mb-4">
              <button 
                onClick={() => handleScroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full shadow-lg hover:bg-black"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="w-[300px] h-[300px] rounded-xl overflow-hidden">
                <img 
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              <button 
                onClick={() => handleScroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full shadow-lg hover:bg-black"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Detalles del producto */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-medium text-lg mb-1 text-black">{currentProduct.title}</h3>
                <p className="text-sm text-black mb-2">{currentProduct.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-wrap gap-1">
                    {currentProduct.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-black rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-[#1B1F23]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products con fondo blanco */}
        <div className="px-4 mb-8">
          <h3 className="text-lg font-bold mb-4 text-black">Recommended Products</h3>
          <div className="grid gap-4">
            {[
              {
                title: 'PR Lotion Starter Bundle',
                price: '$99.99',
                image: '/assets/3Product.png',
                tags: ['GMO Free', 'Gluten Free', 'Vegan'],
                description: 'Supports cognitive function'
              },
              {
                title: 'Male Hormone Support Bundle',
                price: '$99.99',
                image: '/assets/3Product.png',
                tags: ['GMO Free', 'Gluten Free', 'Vegan'],
                description: 'Supports hormone balance'
              }
            ].map((product, index) => (
              <div key={index} className="bg-white border rounded-xl p-4">
                <div className="flex gap-4">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1 text-black">{product.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-black/90 transition-colors">
                      Add · {product.price}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="border-t p-6">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">$49.95</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-600">Calculated at checkout</span>
          </div>
        </div>
        <button className="w-full bg-black text-white py-4 rounded-xl font-medium mb-3">
          Checkout · $49.95
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-gray-100 text-black py-4 rounded-xl font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export function CartDetails({
  layout,
  cart,
}: {
  layout: Layouts;
  cart: CartType | null;
}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <div className="flex-1 px-4">
      <div className="flex flex-col h-full">
        {/* Cart Items */}
        <div className="flex-1 overflow-auto py-4">
          <CartLines lines={cart?.lines} layout={layout} />
        </div>

        {/* Enhance Your Performance Section */}
        {cartHasItems && (
          <div className="py-6 border-t">
            <h3 className="text-xl font-bold mb-4">Enhance Your Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Product Cards - Scrollable on mobile */}
              <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:mx-0">
                {[
                  {
                    title: 'Tongkat & Fadogia 60 Day Supply',
                    price: '$49.95'
                  },
                  {
                    title: 'Male Hormone Support Bundle',
                    price: '$49.95'
                  },
                  {
                    title: 'Complete Test Bundle',
                    price: '$49.95'
                  }
                ].map((product, index) => (
                  <div key={index} className="flex-shrink-0 w-[280px] md:w-full">
                    <div className="bg-white rounded-xl p-4 border">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
                      <h4 className="font-medium text-sm mb-2">{product.title}</h4>
                      <button className="w-full bg-black text-white rounded-lg py-2 text-sm">
                        Add to Cart · {product.price}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cart Summary */}
        {cartHasItems && (
          <div className="py-4 border-t">
            <CartSummary cost={cart.cost} layout={layout}>
              <CartDiscounts discountCodes={cart.discountCodes} />
              <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
            </CartSummary>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Temporary discount UI
 * @param discountCodes the current discount codes applied to the cart
 * @todo rework when a design is ready
 */
function CartDiscounts({
  discountCodes,
}: {
  discountCodes: CartType['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes && codes.length !== 0 ? 'grid' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Discount(s)</Text>
          <div className="flex items-center justify-between">
            <UpdateDiscountForm>
              <button>
                <IconRemove
                  aria-hidden="true"
                  style={{height: 18, marginRight: 4}}
                />
              </button>
            </UpdateDiscountForm>
            <Text as="dd">{codes?.join(', ')}</Text>
          </div>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div
          className={clsx(
            'flex',
            'items-center gap-4 justify-between text-copy',
          )}
        >
          <input
            className={getInputStyleClasses()}
            type="text"
            name="discountCode"
            placeholder="Discount code"
          />
          <button className="flex justify-end font-medium whitespace-nowrap">
            Apply Discount
          </button>
        </div>
      </UpdateDiscountForm>
    </>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartLines({
  layout = 'drawer',
  lines: cartLines,
}: {
  layout: Layouts;
  lines: CartType['lines'] | undefined;
}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const className = clsx([
    y > 0 ? 'border-t' : '',
    layout === 'page'
      ? 'flex-grow md:translate-y-4'
      : 'px-6 pb-6 sm-max:pt-2 overflow-auto transition md:px-12',
  ]);

  return (
    <section
      ref={scrollRef}
      aria-labelledby="cart-contents"
      className={className}
    >
      <ul className="grid gap-6 md:gap-10">
        {currentLines.map((line) => (
          <CartLineItem key={line.id} line={line as CartLine} />
        ))}
      </ul>
    </section>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl: string}) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-2">
      <a href={checkoutUrl} target="_self">
        <button className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-black/90 transition-colors">
          Continue to Checkout
        </button>
      </a>
      {/* @todo: <CartShopPayButton cart={cart} /> */}
    </div>
  );
}

function CartSummary({
  cost,
  layout,
  children = null,
}: {
  children?: React.ReactNode;
  cost: CartCost;
  layout: Layouts;
}) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Subtotal</span>
        <span className="font-medium">
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </span>
      </div>
      
      {children}

      <button className="w-full bg-black text-white py-4 rounded-xl font-medium">
        Checkout
      </button>
    </div>
  );
}

type OptimisticData = {
  action?: string;
  quantity?: number;
};

function CartLineItem({line}: {line: CartLine}) {
  const optimisticData = useOptimisticData<OptimisticData>(line?.id);

  if (!line?.id) return null;

  const {id, quantity, merchandise} = line;

  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <li
      key={id}
      className="flex gap-4 p-4"
      style={{
        display: optimisticData?.action === 'remove' ? 'none' : 'flex',
      }}
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        {merchandise.image && (
          <Image
            width={110}
            height={110}
            data={merchandise.image}
            className="object-cover object-center w-[110px] h-[110px] rounded-xl bg-neutral-100"
            alt={merchandise.title}
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <Link 
            to={`/products/${merchandise?.product.handle}`}
            className="text-black hover:text-black/70"
          >
            <p className="font-medium text-base mb-1">
              {merchandise?.product?.title || ''}
            </p>
          </Link>
          <p className="text-sm text-gray-500 mb-4">
            {merchandise?.title !== merchandise?.product?.title ? merchandise?.title : ''}
          </p>
        </div>

        {/* Price and Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CartLineQuantityAdjust line={line} />
            <button 
              onClick={() => {}} 
              className="text-gray-400 hover:text-gray-600"
            >
              Remove
            </button>
          </div>
          <Text className="font-medium">
            <CartLinePrice line={line} as="span" />
          </Text>
        </div>
      </div>
    </li>
  );
}

function ItemRemoveButton({lineId}: {lineId: CartLine['id']}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{
        lineIds: [lineId],
      }}
    >
      <button
        className="flex items-center justify-center w-10 h-10 border rounded"
        type="submit"
      >
        <span className="sr-only">Remove</span>
        <IconRemove aria-hidden="true" />
      </button>
      <OptimisticInput id={lineId} data={{action: 'remove'}} />
    </CartForm>
  );
}

function CartLineQuantityAdjust({line}: {line: CartLine}) {
  const optimisticId = line?.id;
  const optimisticData = useOptimisticData<OptimisticData>(optimisticId);

  if (!line || typeof line?.quantity === 'undefined') return null;

  const optimisticQuantity = optimisticData?.quantity || line.quantity;

  const {id: lineId} = line;
  const prevQuantity = Number(Math.max(0, optimisticQuantity - 1).toFixed(0));
  const nextQuantity = Number((optimisticQuantity + 1).toFixed(0));

  return (
    <div className="flex items-center border rounded-lg">
      <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          name="decrease-quantity"
          aria-label="Decrease quantity"
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 disabled:text-gray-300"
          value={prevQuantity}
          disabled={optimisticQuantity <= 1}
        >
          <span>−</span>
          <OptimisticInput id={optimisticId} data={{quantity: prevQuantity}} />
        </button>
      </UpdateCartButton>

      <div className="px-3 text-center" data-test="item-quantity">
        {optimisticQuantity}
      </div>

      <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800"
          name="increase-quantity"
          value={nextQuantity}
          aria-label="Increase quantity"
        >
          <span>+</span>
          <OptimisticInput id={optimisticId} data={{quantity: nextQuantity}} />
        </button>
      </UpdateCartButton>
    </div>
  );
}

function UpdateCartButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{
        lines,
      }}
    >
      {children}
    </CartForm>
  );
}

function CartLinePrice({
  line,
  priceType = 'regular',
  ...passthroughProps
}: {
  line: CartLine;
  priceType?: 'regular' | 'compareAt';
  [key: string]: any;
}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
}

export function CartEmpty({
  hidden = false,
  layout = 'drawer',
  onClose,
}: {
  hidden: boolean;
  layout?: Layouts;
  onClose?: () => void;
}) {
  if (hidden) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-4 py-6">
        <p className="text-gray-600 text-center mb-6">
          Looks like you haven't added anything yet, let's get you started!
        </p>
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium mb-8"
        >
          Continue shopping
        </button>

        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-6">Shop Best Sellers</h2>
          <div className="grid gap-4">
            {[
              {
                title: 'PR Lotion Starter bundle',
                price: 'COP 99.99',
                image: '/path-to-image1.jpg',
                tags: ['GMO Free', 'Gluten Free', 'Vegan', 'Dairy Free'],
                description: 'Supports cognitive function'
              },
              {
                title: 'Male Hormone Support Bundle',
                price: 'COP 99.99',
                image: '/path-to-image2.jpg',
                tags: ['GMO Free', 'Gluten Free', 'Vegan', 'Dairy Free'],
                description: 'Supports cognitive function'
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-medium px-2 py-0.5 bg-black/5 text-black rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-medium text-sm mb-1">{product.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-[#1B1F23]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <button className="text-sm font-medium text-black hover:text-black/70">
                        Add · {product.price}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
