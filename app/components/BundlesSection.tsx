import {Suspense} from 'react';
import {Await, Link} from '@remix-run/react';
import {ProductCard} from '~/components/ProductCard';

import {Suspense, useRef, useState} from 'react';
import {Await, Link} from '@remix-run/react';
import {ProductCard} from '~/components/ProductCard';

export function BundlesSection({products}: {products: any}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = carouselRef.current.clientWidth;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const currentScroll = carouselRef.current.scrollLeft;
    
    if (direction === 'left') {
      const newScroll = Math.max(currentScroll - scrollAmount, 0);
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      setCurrentIndex(newScroll > 0 ? 1 : 0);
    } else {
      const newScroll = Math.min(currentScroll + scrollAmount, maxScroll);
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      setCurrentIndex(newScroll < maxScroll ? 0 : 1);
    }
  };

  if (!products?.nodes) return null;
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-sm uppercase tracking-wider text-gray-500 mb-4 block">
              🎁 Goals Specific
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-black">
              Bundles
            </h2>
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {['Sleep', 'Cognitive Function', 'Foundational Health', 'Athletic Performance', 'Hormone Support'].map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full text-black hover:bg-black/5 transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid - Modified to be a slider */}
        <div className="relative">
          <button 
            onClick={() => handleScroll('left')}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hidden md:block hover:bg-black transition-colors ${carouselRef.current?.scrollLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={carouselRef.current?.scrollLeft === 0}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            ref={carouselRef}
            className="flex overflow-x-auto md:overflow-hidden scrollbar-hide gap-4 md:gap-8 pb-8 md:pb-0 transition-all duration-500 ease-in-out"
          >
            {products.nodes.map((product: any) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] md:w-[300px]">
                <ProductCard
                  product={product}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleScroll('right')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hidden md:block hover:bg-black transition-colors ${carouselRef.current?.scrollLeft >= (carouselRef.current?.scrollWidth - carouselRef.current?.clientWidth) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={carouselRef.current?.scrollLeft >= (carouselRef.current?.scrollWidth - carouselRef.current?.clientWidth)}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
