import {Link} from '@remix-run/react';

interface Article {
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    category: 'Balanced Diet',
    title: 'Foundational Supplements: Build a Better You',
    author: 'Emily Thompson',
    date: 'August 31, 2023',
    image: '/assets/Rectangle460.png',
    featured: true,
  },
  {
    category: 'Balanced Diet',
    title: 'Taming the Fire Within: Everything You Need to Know About Inflammation',
    author: 'Emily Thompson',
    date: 'August 31, 2023',
    image: '/assets/Rectangle461.png',
  },
  {
    category: 'Balanced Diet',
    title: 'Optimize Your Sleep with These 15 Strategies',
    author: 'Emily Thompson',
    date: 'August 31, 2023',
    image: '/assets/Rectangle5511.png',
  },
];

export function BlogArticles() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-xl">✍</span>
            <h2 className="text-2xl font-bold text-black">Latest Articles</h2>
          </div>
          <Link 
            to="#" 
            className="text-black hover:text-black/70 transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Artículo Principal */}
          <article className="cursor-pointer group h-[450px]">
            <div className="relative overflow-hidden rounded-2xl h-[450px]">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              {/* Contenido sobre la imagen */}
              <div className="absolute bottom-0 left-0 p-6 space-y-2">
                <span className="text-sm text-white/90">{articles[0].category}</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors line-clamp-2">
                  {articles[0].title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span>By {articles[0].author}</span>
                  <span>•</span>
                  <span>{articles[0].date}</span>
                </div>
              </div>
            </div>
          </article>

          {/* Artículos Secundarios */}
          <div className="space-y-5 flex flex-col justify-start h-[450px]">
            {articles.slice(1).map((article, index) => (
              <article key={index} className="cursor-pointer group flex gap-4 h-[215px]">
                <div className="relative overflow-hidden rounded-xl w-[300px]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-2">
                  <span className="text-sm text-black/70">{article.category}</span>
                  <h3 className="text-lg font-bold text-black group-hover:text-black/70 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-black/70">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
