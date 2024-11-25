import {Link} from '~/components/Link';

export function InstagramFeed() {
  const instagramImages = Array.from({length: 10}, (_, i) => ({
    id: i + 1,
    src: `/assets/Instagram${i + 1}.png`,
    alt: `Instagram post ${i + 1}`
  }));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">Logo</span>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-black">@uncmfrt.com</h3>
              <p className="text-gray-600">Follow Us on Instagram</p>
            </div>
          </div>
          <Link 
            to="https://instagram.com/" 
            target="_blank"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
          >
            Follow Us on Instagram
          </Link>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {instagramImages.map((image) => (
            <Link 
              key={image.id}
              to="https://instagram.com/"
              target="_blank"
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
