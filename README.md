
# MovieFlix - React Movie Discovery App

A modern, responsive movie discovery web application built with React, TypeScript, and Tailwind CSS, powered by The Movie Database (TMDb) API.

## ✨ Features

- **Movie Discovery**: Browse trending and popular movies
- **Advanced Search**: Search movies by title with real-time results
- **Smart Filtering**: Filter by genre, year, and sort by popularity, release date, or rating
- **Detailed Movie Pages**: View comprehensive movie information including:
  - Movie details, cast, crew, and trailers
  - Production information and financial data
  - High-quality posters and backdrops
- **Responsive Design**: Fully responsive with mobile-first approach
- **Modern UI**: Clean, Netflix-inspired design with smooth animations
- **Performance Optimized**: Lazy loading and efficient API calls

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDb API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movieflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your TMDb API Key**
   - Visit [The Movie Database](https://www.themoviedb.org/)
   - Create an account and verify your email
   - Go to Settings > API
   - Request an API key (free)

4. **Configure API Key**
   - Open `src/api/tmdb.ts`
   - Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key:
   ```typescript
   const API_KEY = 'your_actual_api_key_here';
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:8080`
   - Start exploring movies!

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Build Tool**: Vite
- **UI Components**: Custom components with shadcn/ui base

## 📁 Project Structure

```
src/
├── api/
│   └── tmdb.ts              # TMDb API integration
├── components/
│   ├── CastList.tsx         # Movie cast display
│   ├── FilterBar.tsx        # Search filters and sorting
│   ├── LoadingSpinner.tsx   # Loading states
│   ├── MovieCard.tsx        # Movie grid item
│   ├── Navbar.tsx           # Navigation header
│   ├── SearchBar.tsx        # Mobile search
│   └── TrailerPlayer.tsx    # YouTube trailer embed
├── pages/
│   ├── Index.tsx            # Home page
│   ├── MovieDetails.tsx     # Movie detail page
│   └── NotFound.tsx         # 404 page
├── types/
│   └── movie.ts             # TypeScript interfaces
└── App.tsx                  # Main app component
```

## 🎯 Key Features Explained

### Movie Discovery
- **Trending Movies**: Shows currently trending movies worldwide
- **Popular Movies**: Displays all-time popular movies
- **Search Functionality**: Real-time search as you type

### Advanced Filtering
- **Genre Filter**: Filter movies by specific genres
- **Year Filter**: Show movies from specific years (last 20 years)
- **Sorting Options**: Sort by popularity, release date, or rating

### Movie Details
- **Comprehensive Info**: Title, overview, runtime, budget, revenue
- **Cast & Crew**: Display main cast with photos and character names
- **Trailers**: Embedded YouTube trailers when available
- **Production Details**: Countries, languages, production companies

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapts beautifully to tablet screens
- **Desktop Enhanced**: Rich hover effects and larger layouts

## 🔧 Configuration

### Environment Variables
While this app stores the API key directly in the code for simplicity, in production you should use environment variables:

1. Create a `.env` file in the root directory
2. Add your API key: `VITE_TMDB_API_KEY=your_api_key_here`
3. Update `src/api/tmdb.ts` to use `import.meta.env.VITE_TMDB_API_KEY`

### Customization
- **Colors**: Modify color scheme in `tailwind.config.ts`
- **Fonts**: Update font families in `tailwind.config.ts`
- **API Endpoints**: Extend API calls in `src/api/tmdb.ts`
- **Components**: Customize components in `src/components/`

## 📱 Responsive Breakpoints

- **Mobile**: 0px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variable `VITE_TMDB_API_KEY` in Vercel dashboard
4. Deploy!

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🔍 API Endpoints Used

- `GET /trending/movie/week` - Trending movies
- `GET /movie/popular` - Popular movies
- `GET /search/movie` - Search movies
- `GET /movie/{id}` - Movie details
- `GET /movie/{id}/credits` - Movie cast and crew
- `GET /movie/{id}/videos` - Movie trailers and videos
- `GET /genre/movie/list` - Movie genres

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the excellent API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the powerful frontend library

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ and React**
