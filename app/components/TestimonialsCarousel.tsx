import {useState, useRef, useEffect} from 'react';
import {Link} from '~/components/Link';
import {Money} from '@shopify/hydrogen';

type Testimonial = {
  id: number;
  video: string;
  productTitle: string;
  productPrice: {
    amount: string;
    currencyCode: string;
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
      productTitle: 'Performance Bundle',
      productPrice: {
        amount: '149.99',
        currencyCode: 'USD'
      }
    },
    {
      id: 2,
      video: '/assets/2.mp4',
      productTitle: 'Recovery Bundle',
      productPrice: {
        amount: '129.99',
        currencyCode: 'USD'
      }
    },
    {
      id: 3,
      video: '/assets/3.mp4',
      productTitle: 'Energy Bundle',
      productPrice: {
        amount: '139.99',
        currencyCode: 'USD'
      }
    },
    {
      id: 4,
      video: '/assets/4.mp4',
      productTitle: 'Focus Bundle',
      productPrice: {
        amount: '119.99',
        currencyCode: 'USD'
      }
    },
    {
      id: 5,
      video: '/assets/5.mp4',
      productTitle: 'Wellness Bundle',
      productPrice: {
        amount: '159.99',
        currencyCode: 'USD'
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

        <div className="relative overflow-hidden">
          <button 
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hover:bg-black transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-[1200px] mx-auto overflow-hidden">
            <div 
              className="flex gap-8 transition-transform duration-500 ease-in-out mx-auto"
              style={{
                transform: `translateX(calc(38% - ${currentIndex * 25}% - ${currentIndex * 1}rem))`,
                width: 'fit-content'
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`flex-shrink-0 transition-all duration-500 ${
                    index === currentIndex 
                      ? 'w-[500px] z-10' 
                      : 'w-[300px] opacity-50'
                  }`}
                >
                  <div 
                    className={`rounded-2xl overflow-hidden transition-all duration-500 ${
                      index === currentIndex 
                        ? 'h-[516px]' 
                        : 'h-[516px]'
                    }`}
                  >
                    <div className="relative">
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={testimonial.video}
                        className={`w-full h-full transition-all duration-500 ${
                          index === currentIndex 
                            ? 'object-cover' 
                            : 'object-cover'
                        }`}
                        muted={isMuted}
                        playsInline
                        loop
                      />
                      {index === currentIndex && (
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="absolute bottom-4 right-4 bg-black/80 p-2 rounded-full hover:bg-black transition-colors"
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
                          {testimonial.productTitle}
                        </h3>
                        <Money 
                          data={testimonial.productPrice}
                          className="text-black/70"
                        />
                      </div>
                      {index === currentIndex && (
                        <button className="ml-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors">
                          Shop Now
                        </button>
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