# Jonathan Huth Personal Website

This is my personal website built with Next.js, Tailwind CSS, and deployed to GitHub Pages.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the site
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- GitHub Pages for hosting

## Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the main branch.

## Structure

- `src/app/page.tsx` - Main page component
- `src/app/layout.tsx` - Root layout with metadata and SEO optimization
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/sitemap.ts` - Sitemap configuration
- `public/` - Static assets (images, resume PDF, etc.)

## License

This project is licensed under the MIT License.
