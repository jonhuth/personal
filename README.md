# Jonathan Huth Personal Website

This is my personal website built with Next.js, Tailwind CSS, and deployed to Vercel.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the site
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Puppeteer](https://pptr.dev/) - Headless browser for capturing website screenshots
- [Vercel](https://vercel.com/) for hosting

## Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build

# Capture website screenshots for link previews
bun capture-screenshots
```

## Link Previews

The site includes a link preview feature that displays metadata and screenshots of linked websites. Link previews work in two ways:

1. **API-based previews**: Uses the Next.js API route at `/api/link-preview` to fetch and parse website metadata in real-time
2. **Static screenshots**: For faster loading and to reduce API calls, the site also uses pre-captured screenshots

To update the screenshots:

1. Edit the URLs in `scripts/capture-screenshots.ts`
2. Run `bun capture-screenshots`
3. Commit the new screenshots to the repository

## Deployment

### GitHub Pages (Static-only)

The site is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the main branch. Note that GitHub Pages only supports static content, so API routes will not function in this environment.

### Vercel (Full functionality)

For full functionality including API routes, the site can be deployed to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## Structure

- `src/app/page.tsx` - Main page component
- `src/app/layout.tsx` - Root layout with metadata and SEO optimization
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/sitemap.ts` - Sitemap configuration
- `src/app/api/link-preview/` - API route for fetching website metadata
- `src/app/components/LinkPreview.tsx` - Component for displaying link previews
- `scripts/capture-screenshots.ts` - Script to capture website screenshots
- `public/images/previews/` - Stored website screenshots
- `public/` - Other static assets (images, resume PDF, etc.)

## License

This project is licensed under the MIT License.
