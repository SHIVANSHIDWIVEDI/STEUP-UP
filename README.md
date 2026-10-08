# STEUP


A React + Vite storefront for student-focused sneakers and everyday college footwear.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with `npm run build` and preview it with `npm run preview`.

## Content and on-page SEO

The pages include student-focused buying guidance, longer product descriptions, and helpful details about fit, materials, comfort, styling, and price. Route-specific page titles, meta descriptions, canonical URLs, Open Graph tags, and Twitter cards are set in the app. Product pages include Product structured data. The project also includes `public/robots.txt` and `public/sitemap.xml`.

The canonical domain is the STEPUP Cloudflare Workers domain already present in the source `index.html`. Search engines and social crawlers may need prerendering or server rendering to receive route-specific metadata in the initial HTML response.

## Tech stack

- React 19 and Vite
- Tailwind CSS v4
- Lucide React icons
