import {useState} from 'react';
import {Link} from '~/components/Link';
import {Money} from '@shopify/hydrogen';

interface Testimonial {
  id: number;
  image: string;
  productTitle: string;
  productPrice: {
    amount: string;
    currencyCode: string;
  };
}

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      image: '/assets/1.png',
      productTitle: 'Performance Bundle',
      productPrice: {
        amount: '149.99',
        currencyCode: 'USD'
      }
    },
    {
      id: 2,
      image: '/assets/2.png',
      productTitle: 'Recovery Bundle',
      productPrice: {
        amount: '129.99',
        currencyCode: 'USD'
      }
    },
    {
      id: 3,
      image: '/assets/3.png',
      productTitle: 'Energy Bundle',
      productPrice: {
        amount: '139.99',
        currencyCode: 'USD'
      }
    },
    {
      id: 4,
      image: '/assets/4.png',
      productTitle: 'Focus Bundle',
      productPrice: {
        amount: '119.99',
        currencyCode: 'USD'
      }
    },
    {
      id: 5,
      image: '/assets/5.png',
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

        <div className="relative">
          <button 
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-3 rounded-full shadow-lg hover:bg-black transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative overflow-hidden">
            <div 
              className="flex gap-8 transition-transform duration-500 ease-in-out mx-auto"
              style={{
                transform: `translateX(calc(40% - ${currentIndex * 20}% - ${currentIndex * 1}rem))`,
                width: 'fit-content'
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`flex-shrink-0 transition-all duration-500 ${
                    index === currentIndex 
                      ? 'w-[500px] z-10' 
                      : 'w-[200px] opacity-50'
                  }`}
                >
                  <div className="h-[400px] flex flex-col">
                    <div 
                      className={`rounded-2xl overflow-hidden transition-all duration-500 ${
                        index === currentIndex 
                          ? 'h-[300px]' 
                          : 'h-[150px]'
                      }`}
                    >
                      <img
                        src={testimonial.image}
                        alt="Customer testimonial"
                        className={`w-full h-full transition-all duration-500 ${
                          index === currentIndex 
                            ? 'object-contain' 
                            : 'object-cover'
                        }`}
                      />
                    </div>

                    <div className={`mt-4 transition-all duration-500 ${
                      index === currentIndex 
                        ? 'scale-100' 
                        : 'scale-90'
                    }`}>
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