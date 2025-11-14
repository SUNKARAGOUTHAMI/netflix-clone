# My Streaming Dashboard

A simplified streaming service dashboard built with Next.js 14, TypeScript, and Tailwind CSS. This project fetches movie data from The Movie Database (TMDB) API and displays popular, top rated, and upcoming movies with a hero banner feature.

---

## Features

- Server-side rendering with Next.js 14 App Router.
- Tailwind CSS for responsive and modern styling.
- Fetches movie data from TMDB API with caching and error handling.
- Dynamic movie detail pages with trailers and detailed info.
- Horizontal scrollable movie rows with keyboard and mouse interaction support.
- Accessibility and SEO optimized with metadata and ARIA attributes.
- Client and server component separation following React best practices.
- Fully typed with TypeScript for type safety.
- Unit tests with Jest and React Testing Library.

---

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- TMDB API Key (sign up at https://www.themoviedb.org/ to get an API key)

---

## Installation

1. Clone the repository:

    git clone https://github.com/SUNKARAGOUTHAMI/my-streaming-dashboard.git
    cd my-streaming-dashboard

2. Install dependencies:

    npm install

3. Create a `.env.local` file in the root directory and add your TMDB API key:

    TMDB_API_KEY=your_actual_tmdb_api_key

---

## Configuration

- The project uses environment variables for sensitive data. Make sure to set `TMDB_API_KEY` in `.env.local`.
- Tailwind CSS is configured and ready to use; global styles are imported in `app/globals.css`.
- Next.js configuration enables image optimization for TMDB image domains.

---

## Running the Application

### Development

Start the development server with hot-reloading:

    npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Production Build & Start

Build the application for production:

    npm run build

Start the production server:

    npm run start

---

## Deployment

This project is optimized for deployment on Vercel.

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Import the project in [Vercel](https://vercel.com/) and configure environment variables (TMDB_API_KEY).
3. Deploy with zero configuration.

---

## Usage

- Browse movies by category on the homepage.
- Click on any movie card or "Watch Now" button in the hero banner to see detailed movie info.
- Use keyboard arrows or mouse wheel to scroll movie rows horizontally.
- Responsive layout works on mobile, tablet, and desktop.

---

## Troubleshooting

- **Missing or invalid TMDB API Key**: Ensure `.env.local` contains a valid `TMDB_API_KEY`.
- **Network errors or API failures**: Check your internet connection and TMDB API status.
- **Images not loading**: Confirm image domains are allowed in `next.config.js`.
- **Tests failing**: Run `npm run test` and check error logs.

---

## Project Structure

