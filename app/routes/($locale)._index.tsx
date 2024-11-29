import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Suspense, useRef, useState, useEffect} from 'react';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {Hero} from '~/components/Hero';
import {FeaturedCollections} from '~/components/FeaturedCollections';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {Button} from '~/components/Button';
import {ProductCard} from '~/components/ProductCard';
import {TestimonialsCarousel} from '~/components/TestimonialsCarousel';
import {BundlesSection} from '~/components/BundlesSection';
import {ProductShowcase} from '~/components/ProductShowcase';
import {BlogArticles} from '~/components/BlogArticles';
import {InstagramFeed} from '~/components/InstagramFeed';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const [{shop, hero}] = await Promise.all([
    context.storefront.query(HOMEPAGE_SEO_QUERY, {
      variables: {handle: 'freestyle'},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    shop,
    primaryHero: hero,
    seo: seoPayload.home({url: request.url}),
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  const featuredProducts = context.storefront
    .query(HOMEPAGE_FEATURED_PRODUCTS_QUERY, {
      variables: {
        /**
         * Country and language properties are automatically injected
         * into all queries. Passing them is unnecessary unless you
         * want to override them from the following default:
         */
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  const secondaryHero = context.storefront
    .query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  const featuredCollections = context.storefront
    .query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  const tertiaryHero = context.storefront
    .query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
    secondaryHero,
    featuredCollections,
    tertiaryHero,
  };
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Homepage() {
  const goalsCarouselRef = useRef<HTMLDivElement>(null);
  const supplementsCarouselRef = useRef<HTMLDivElement>(null);
  const [goalsIndex, setGoalsIndex] = useState(0);
  const [supplementsIndex, setSupplementsIndex] = useState(0);

  const handleGoalsScroll = (direction: 'left' | 'right') => {
    if (!goalsCarouselRef.current) return;
    
    const scrollAmount = goalsCarouselRef.current.clientWidth;
    const maxScroll = goalsCarouselRef.current.scrollWidth - goalsCarouselRef.current.clientWidth;
    const currentScroll = goalsCarouselRef.current.scrollLeft;
    
    if (direction === 'left') {
      const newScroll = Math.max(currentScroll - scrollAmount, 0);
      goalsCarouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      setGoalsIndex(newScroll > 0 ? 1 : 0);
    } else {
      const newScroll = Math.min(currentScroll + scrollAmount, maxScroll);
      goalsCarouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      setGoalsIndex(newScroll < maxScroll ? 0 : 1);
    }
  };

  const handleSupplementsScroll = (direction: 'left' | 'right') => {
    if (!supplementsCarouselRef.current) return;
    
    const scrollAmount = supplementsCarouselRef.current.clientWidth;
    const maxScroll = supplementsCarouselRef.current.scrollWidth - supplementsCarouselRef.current.clientWidth;
    const currentScroll = supplementsCarouselRef.current.scrollLeft;
    
    if (direction === 'left') {
      const newScroll = Math.max(currentScroll - scrollAmount, 0);
      supplementsCarouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      setSupplementsIndex(newScroll > 0 ? 1 : 0);
    } else {
      const newScroll = Math.min(currentScroll + scrollAmount, maxScroll);
      supplementsCarouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      setSupplementsIndex(newScroll < maxScroll ? 0 : 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (supplementsCarouselRef.current) {
        const maxScrolls = 1;
        
        if (supplementsIndex < maxScrolls) {
          handleSupplementsScroll('right');
        } else {
          handleSupplementsScroll('left');
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [supplementsIndex]);

  const {
    primaryHero,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
  } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[100vh] flex flex-col">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            >
              <source src="assets/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Texto del Hero - Ajustes responsive */}
          <div className="relative z-10 flex flex-col justify-end h-full text-white px-4 sm:px-8 md:px-12 pb-32 md:pb-48">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] font-semibold mb-4 md:mb-8 max-w-3xl leading-[1.1] font-['Rubik']">
              {'Great things never came\nfrom comfort zones.'}
            </h1>
            <Button
              variant="secondary"
              className="w-fit bg-white text-black hover:bg-white/90 text-base md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-lg mb-8 md:mb-16 font-semibold"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Infinite Slider y Recommendations Section */}
      <div className="relative mt-[-70px]">
        {/* Infinite Slider */}
        <div className="bg-black py-4 md:py-6 w-full overflow-hidden">
          <div className="flex animate-infinite-scroll">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex shrink-0 items-center gap-4 md:gap-8 mx-4 md:mx-8">
                <span className="text-white text-base md:text-xl whitespace-nowrap">Independently Certified</span>
                <img src="/assets/Star.png" alt="star" className="w-4 md:w-5 h-4 md:h-5" />
                <span className="text-white text-base md:text-xl whitespace-nowrap">Expert Driven</span>
                <img src="/assets/Star.png" alt="star" className="w-4 md:w-5 h-4 md:h-5" />
                
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Recommendations */}
        <div className="bg-[#F6F6F5] w-full">
          <div className="max-w-[1920px] mx-auto px-4">
            <div className="bg-white p-6 md:p-12 rounded-t-2xl shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">
                {/* Featured Review - Left Side */}
                <div className="w-full md:w-1/5">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#FFB800] text-3xl md:text-4xl">★</span>
                    <span className="font-bold text-2xl md:text-3xl text-black">5+</span>
                    <span className="text-gray-600 text-base md:text-lg">(12,000+ Reviews)</span>
                  </div>
                </div>

                {/* Vertical Divider - Hidden on mobile */}
                <div className="hidden md:block w-px h-48 bg-gray-200"></div>

                {/* Logos Grid - Responsive */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center w-full md:w-4/5">
                  <img src="/assets/rollingstone.png" alt="Rolling Stone" className="h-8 md:h-14" />
                  <img src="/assets/mensjournal.png" alt="Men's Journal" className="h-8 md:h-14" />
                  <img src="/assets/laweekly.png" alt="LA Weekly" className="h-8 md:h-14" />
                  <img src="/assets/herb.png" alt="Herb" className="h-8 md:h-14" />
                  <img src="/assets/nyt.png" alt="New York Times" className="h-8 md:h-14" />
                  <img src="/assets/bbc.png" alt="BBC News" className="h-8 md:h-14" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start with your Goals */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-24">
            <span className="text-sm md:text-base uppercase tracking-wider text-gray-500 mb-2 md:mb-4 block font-medium">
              COMFORTABLY UNCOMFORTABLE
            </span>
            <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-8 text-black">
              Start with your Goals
            </h2>
            <p className="text-base md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
              We cannot become what we want to be by remaining what we are.
            </p>
          </div>

          {/* Contenedor del scroll horizontal en móvil */}
          <div className="relative -mx-4 md:mx-0 lg:mx-0">
            <button 
              onClick={() => handleGoalsScroll('left')}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hidden md:block hover:bg-black transition-colors ${goalsCarouselRef.current?.scrollLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={goalsCarouselRef.current?.scrollLeft === 0}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div 
              ref={goalsCarouselRef}
              className="flex overflow-x-auto md:overflow-hidden scrollbar-hide pb-8 md:pb-0 gap-4 md:gap-8 px-4 md:px-8 transition-all duration-500 ease-in-out"
            >
              {[
                {
                  title: 'Sleep',
                  description: 'Optimize your sleep patterns.',
                  image: '/assets/Sleep.png'
                },
                {
                  title: 'Cognitive Function',
                  description: 'Enhance your brain\'s performance and connectivity',
                  image: '/assets/Cognitive_function.png'
                },
                {
                  title: 'Foundational Health',
                  description: 'Promoting healthy, natural deep sleep day to day',
                  image: '/assets/Foundational_Health.png'
                },
                {
                  title: 'Athletic Performance',
                  description: 'Increase your healthy tissue, muscle, and energy',
                  image: '/assets/Athletic_performance.png'
                },
                {
                  title: 'Hormone Support',
                  description: 'Boost your mood, libido, and vitality',
                  image: '/assets/Hormone_Support.png'
                }
              ].map((goal, index) => (
                <div 
                  key={goal.title} 
                  className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[calc(33.333%-1rem)] group hover:cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-[300px] md:h-[380px] mb-6 overflow-hidden rounded-3xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl">
                    <img
                      src={goal.image}
                      alt={goal.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      width={288}
                      height={392}
                    />
                  </div>
                  <div className="px-6 md:px-8 py-4 space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold flex items-center justify-between text-black group-hover:text-black/80 transition-colors">
                      {goal.title}
                      <svg 
                        className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-2 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 font-medium leading-tight max-w-[350px] md:max-w-[90%] line-clamp-2">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleGoalsScroll('right')}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hidden md:block hover:bg-black transition-colors ${goalsCarouselRef.current?.scrollLeft >= (goalsCarouselRef.current?.scrollWidth - goalsCarouselRef.current?.clientWidth) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={goalsCarouselRef.current?.scrollLeft >= (goalsCarouselRef.current?.scrollWidth - goalsCarouselRef.current?.clientWidth)}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Supplements Section */}
      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {(response) => {
              if (!response?.products?.nodes) return null;
              return (
                <section className="py-24 bg-white">
                  <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between mb-12">
                      <div>
                        <span className="text-sm uppercase tracking-wider text-gray-500 mb-4 block">
                          Trending ⭐
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-black">
                          Supplements
                        </h2>
                      </div>
                      <Link 
                        to="/products"
                        className="text-black text-lg underline underline-offset-4 hover:text-black/70 transition-colors"
                      >
                        View All Products
                      </Link>
                    </div>

                    <div className="relative">
                      <button 
                        onClick={() => handleSupplementsScroll('left')}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hidden md:block hover:bg-black transition-colors ${supplementsCarouselRef.current?.scrollLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={supplementsCarouselRef.current?.scrollLeft === 0}
                      >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <div 
                        ref={supplementsCarouselRef}
                        className="flex overflow-x-auto md:overflow-hidden scrollbar-hide gap-4 md:gap-8 pb-8 md:pb-0 transition-all duration-500 ease-in-out"
                      >
                        {response.products.nodes.map((product) => (
                          <div key={product.id} className="flex-shrink-0 w-[280px] md:w-[300px]">
                            <ProductCard
                              product={product}
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => handleSupplementsScroll('right')}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hidden md:block hover:bg-black transition-colors ${supplementsCarouselRef.current?.scrollLeft >= (supplementsCarouselRef.current?.scrollWidth - supplementsCarouselRef.current?.clientWidth) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={supplementsCarouselRef.current?.scrollLeft >= (supplementsCarouselRef.current?.scrollWidth - supplementsCarouselRef.current?.clientWidth)}
                      >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </section>
              );
            }}
          </Await>
        </Suspense>
      )}

      {/* Transform Your Life Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="mb-16">
            <div className="flex flex-col items-start">
              <span className="text-xl mb-4 text-black">🧐 Why Health & Fitness</span>
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Clean Supplements
                <br />
                Made For You
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <img 
                src="/assets/Like_logo.png" 
                alt="Like icon" 
                className="w-[50px] h-[50px] mb-4"
              />
              <h3 className="text-2xl font-bold text-black">Why Health & Fitness</h3>
              <p className="text-gray-800">
                We Make It Easy For You To Get The Right Supplements For Your Goals
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <img 
                src="/assets/Hojas_logo.png" 
                alt="Leaves icon" 
                className="w-[50px] h-[50px] mb-4"
              />
              <h3 className="text-2xl font-bold text-black">Clean & Effective</h3>
              <p className="text-gray-800">
                Proven Ingredients, not Artificial, Crafted By Experts For Optimal Effectiveness
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <img 
                src="/assets/Chat_logo.png" 
                alt="Chat icon" 
                className="w-[50px] h-[50px] mb-4"
              />
              <h3 className="text-2xl font-bold text-black">Your Free Dietitian</h3>
              <p className="text-gray-800">
                Every Gainful Subscriber Gets Free, 1:1 Access Their Own Registered Dietitian.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <img 
                src="/assets/Documents_logo.png" 
                alt="Documents icon" 
                className="w-[50px] h-[50px] mb-4"
              />
              <h3 className="text-2xl font-bold text-black">Made For You</h3>
              <p className="text-gray-800">
                Performance is Personal. Personalized & Customizable Products For Your Needs, Body & Goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel products={featuredProducts} />

      {/* Bundles Section */}
      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {(response) => {
              if (!response?.products?.nodes) return null;
              const bundleProducts = {
                products: {
                  nodes: response.products.nodes.filter((product: any) => 
                    product.title.toLowerCase().includes('bundle') ||
                    product.title.toLowerCase().includes('supply') ||
                    product.tags?.some(tag => 
                      tag.toLowerCase().includes('bundle') ||
                      tag.toLowerCase().includes('supply')
                    ) ||
                    product.collections?.nodes?.some(collection => 
                      collection.handle === 'bundles'
                    )
                  )
                }
              };
              return <BundlesSection products={bundleProducts.products} />;
            }}
          </Await>
        </Suspense>
      )}

      <ProductShowcase />

      {/* The Next Generation Section */}
      <section className="relative py-24 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="relative h-[80vh] rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/assets/Rectangle478.png"
                alt="Person in bathtub"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                  The Next Generation is Here
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Innovative Engineering. Intelligent Design. Meet The Plunge All-I.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
                    Take The Plunge
                  </button>
                  <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                    Dive Deeper
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogArticles />

      <InstagramFeed />
    </div>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
` as const;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
` as const;


