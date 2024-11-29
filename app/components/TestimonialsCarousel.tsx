import {useState, useRef, useEffect} from 'react';
import {Link} from '~/components/Link';
import {Money} from '@shopify/hydrogen';

type Testimonial = {
  id: number;
  video: string;
  product: {
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  };
};

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        videoRef.muted = isMuted;
        if (index === currentIndex) {
          videoRef.play().catch(() => {
            // Manejar el error silenciosamente
          });
        } else {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      }
    });
  }, [currentIndex, isMuted]);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      video: '/assets/1.mp4',
      product: {
        title: 'omega-3',
        handle: 'Omega-3',
        priceRange: {
          minVariantPrice: {
            amount: '49.95',
            currencyCode: 'USD'
          }
        }
      }
    },
    {
      id: 2,
      video: '/assets/2.mp4',
      product: {
        title: 'Magnesium L-Threonate',
        handle: 'magnesium-l-threonate',
        priceRange: {
          minVariantPrice: {
            amount: '49.95',
            currencyCode: 'USD'
          }
        }
      }
    },
    {
      id: 3,
      video: '/assets/3.mp4',
      product: {
        title: 'Energy Bundle',
        handle: 'energy-bundle',
        priceRange: {
          minVariantPrice: {
            amount: '139.99',
            currencyCode: 'USD'
          }
        }
      }
    },
    {
      id: 4,
      video: '/assets/4.mp4',
      product: {
        title: 'Focus Bundle',
        handle: 'focus-bundle',
        priceRange: {
          minVariantPrice: {
            amount: '119.99',
            currencyCode: 'USD'
          }
        }
      }
    },
    {
      id: 5,
      video: '/assets/5.mp4',
      product: {
        title: 'Wellness Bundle',
        handle: 'wellness-bundle',
        priceRange: {
          minVariantPrice: {
            amount: '159.99',
            currencyCode: 'USD'
          }
        }
      }
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-gray-500 mb-4 block">
            Real Results
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Transform Your Life
          </h2>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Join thousands of satisfied customers who have achieved their goals
          </p>
        </div>

        <div className="relative w-[1440px] mx-auto overflow-hidden">
          <button 
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hover:bg-black transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-full overflow-hidden">
            <div 
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(32% - ${currentIndex * 400}px - ${currentIndex * 32}px))`,
                width: 'fit-content'
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`flex-shrink-0 transition-all duration-500 ${
                    index === currentIndex 
                      ? 'w-[400px] z-10' 
                      : 'w-[350px] opacity-50'
                  }`}
                >
                  <div 
                    className={`rounded-2xl overflow-hidden ${
                      index === currentIndex 
                        ? 'h-[450px]' 
                        : 'h-[450px]'
                    }`}
                  >
                    <div className="relative">
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={testimonial.video}
                        className="w-full h-full object-cover"
                        muted={isMuted}
                        playsInline
                        loop
                      />
                      {index === currentIndex && (
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="absolute top-4 right-4 bg-black/80 p-2 rounded-full hover:bg-black transition-colors z-20"
                        >
                          {isMuted ? (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={`mt-4 transition-all duration-500`}>
                    <div className={`flex items-center justify-center gap-4 bg-white rounded-xl p-4 shadow-md ${
                      index === currentIndex ? 'flex-row' : 'flex-col'
                    }`}>
                      <div className="text-center">
                        <h3 className={`font-bold text-black ${
                          index === currentIndex ? 'text-base' : 'text-sm'
                        }`}>
                          {testimonial.product.title}
                        </h3>
                        <Money 
                          data={{
                            amount: testimonial.product.priceRange.minVariantPrice.amount,
                            currencyCode: testimonial.product.priceRange.minVariantPrice.currencyCode
                          }}
                          className="text-black/70"
                        />
                      </div>
                      {index === currentIndex && (
                        <Link
                          to={`/products/${testimonial.product.handle}`}
                          className="ml-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors"
                        >
                          Shop Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hover:bg-black transition-colors"
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