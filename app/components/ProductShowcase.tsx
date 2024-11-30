import {Image} from '@shopify/hydrogen';

export function ProductShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <span className="text-sm uppercase tracking-wider text-gray-500 mb-4 block">
            Simple & Effective Ingredients
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Customized Protein Powder
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative flex justify-center">
            <img
              src="/assets/3Product.png"
              alt="Protein Powder Product"
              className="w-[356px] h-[356px] object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-12">
            {/* The Blend Section */}
            <div className="bg-[#1B1F23] text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">The Blend</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <img src="/assets/Hojas_logo.png" alt="Leaf icon" className="w-6 h-6" />
                  <span>Whey Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/assets/Hojas_logo.png" alt="Leaf icon" className="w-6 h-6" />
                  <span>Build Muscle</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/assets/Hojas_logo.png" alt="Leaf icon" className="w-6 h-6" />
                  <span>Clean Ingredients</span>
                </div>
              </div>
            </div>

            {/* Active Ingredients Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-black">Active Ingredients</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-2">
                      <img src="/assets/Hojas_logo.png" alt="Leaf icon" className="w-6 h-6" />
                      <h4 className="font-bold text-black">Whey Protein Isolate</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Low Calorie With Virtually No Fat or Lactose, Quickly Absorbed To Maximize Muscle Building & Repair.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-[#1B1F23] text-white py-4 rounded-xl font-medium hover:bg-black/90 transition-colors">
              Customize This Blend
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
