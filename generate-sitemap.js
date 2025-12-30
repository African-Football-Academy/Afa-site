import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs';

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://www.africanfootballacademy.club' });

  const writeStream = createWriteStream('./public/sitemap.xml');

  sitemap.pipe(writeStream);

  // Add static routes
  const routes = [
    '/',
    '/gallery',
    '/trophy',
    '/stat',
    '/about',
    '/account',
    '/login',
    '/register',
    '/blog',
    '/matchdet',
    '/play',
    '/donate'
  ];

  routes.forEach((route) => {
    sitemap.write({ url: route, changefreq: 'always', priority: 1.0 });
  });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log('✅ Sitemap generated successfully!');
})();
