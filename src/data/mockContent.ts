import { Content, CarouselSection } from '../types';

export const featuredContent: Content = {
  id: 'featured-1',
  title: 'Stranger Things',
  description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
  thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
  backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
  year: 2016,
  rating: 'TV-14',
  duration: '4 Seasons',
  genre: ['Sci-Fi', 'Horror', 'Drama'],
  type: 'series',
  featured: true
};

export const continueWatching: Content[] = [
  {
    id: 'cw-1',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.',
    thumbnail: 'https://images.pexels.com/photos/7991232/pexels-photo-7991232.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991232/pexels-photo-7991232.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2016,
    rating: 'TV-MA',
    duration: '6 Seasons',
    genre: ['Drama', 'History'],
    type: 'series'
  },
  {
    id: 'cw-2',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology.',
    thumbnail: 'https://images.pexels.com/photos/7991360/pexels-photo-7991360.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991360/pexels-photo-7991360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2010,
    rating: 'PG-13',
    duration: '2h 28m',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    type: 'movie'
  },
  {
    id: 'cw-3',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer.',
    thumbnail: 'https://images.pexels.com/photos/7991647/pexels-photo-7991647.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991647/pexels-photo-7991647.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2008,
    rating: 'TV-MA',
    duration: '5 Seasons',
    genre: ['Crime', 'Drama', 'Thriller'],
    type: 'series'
  }
];

export const trending: Content[] = [
  {
    id: 't-1',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place.',
    thumbnail: 'https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2019,
    rating: 'TV-MA',
    duration: '3 Seasons',
    genre: ['Fantasy', 'Adventure', 'Action'],
    type: 'series'
  },
  {
    id: 't-2',
    title: 'Dune',
    description: 'Paul Atreides leads nomadic tribes in a revolt against House Harkonnen.',
    thumbnail: 'https://images.pexels.com/photos/7991504/pexels-photo-7991504.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991504/pexels-photo-7991504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2021,
    rating: 'PG-13',
    duration: '2h 35m',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    type: 'movie'
  },
  {
    id: 't-3',
    title: 'Wednesday',
    description: 'Wednesday Addams navigates her years as a student at Nevermore Academy.',
    thumbnail: 'https://images.pexels.com/photos/7991395/pexels-photo-7991395.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991395/pexels-photo-7991395.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2022,
    rating: 'TV-14',
    duration: '1 Season',
    genre: ['Comedy', 'Horror', 'Mystery'],
    type: 'series'
  },
  {
    id: 't-4',
    title: 'Avatar',
    description: 'A marine on an alien planet becomes torn between following orders.',
    thumbnail: 'https://images.pexels.com/photos/7991683/pexels-photo-7991683.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991683/pexels-photo-7991683.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2009,
    rating: 'PG-13',
    duration: '2h 42m',
    genre: ['Action', 'Adventure', 'Fantasy'],
    type: 'movie'
  },
  {
    id: 't-5',
    title: 'The Mandalorian',
    description: 'A lone gunfighter makes his way through the outer reaches of the galaxy.',
    thumbnail: 'https://images.pexels.com/photos/7991765/pexels-photo-7991765.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991765/pexels-photo-7991765.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2019,
    rating: 'TV-14',
    duration: '3 Seasons',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    type: 'series'
  }
];

export const movies: Content[] = [
  {
    id: 'm-1',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space.',
    thumbnail: 'https://images.pexels.com/photos/7991234/pexels-photo-7991234.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991234/pexels-photo-7991234.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2014,
    rating: 'PG-13',
    duration: '2h 49m',
    genre: ['Drama', 'Sci-Fi', 'Thriller'],
    type: 'movie'
  },
  {
    id: 'm-2',
    title: 'The Dark Knight',
    description: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.',
    thumbnail: 'https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991789/pexels-photo-7991789.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2008,
    rating: 'PG-13',
    duration: '2h 32m',
    genre: ['Action', 'Crime', 'Drama'],
    type: 'movie'
  },
  {
    id: 'm-3',
    title: 'Blade Runner 2049',
    description: 'A young blade runner discovers a secret that could plunge society into chaos.',
    thumbnail: 'https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2017,
    rating: 'R',
    duration: '2h 44m',
    genre: ['Drama', 'Mystery', 'Sci-Fi'],
    type: 'movie'
  },
  {
    id: 'm-4',
    title: 'Mad Max: Fury Road',
    description: 'In a post-apocalyptic wasteland, Max teams up with a mysterious woman.',
    thumbnail: 'https://images.pexels.com/photos/7991623/pexels-photo-7991623.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991623/pexels-photo-7991623.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2015,
    rating: 'R',
    duration: '2h 0m',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    type: 'movie'
  }
];

export const tvShows: Content[] = [
  {
    id: 'tv-1',
    title: 'House of the Dragon',
    description: 'The Targaryen civil war, known as the Dance of the Dragons.',
    thumbnail: 'https://images.pexels.com/photos/7991567/pexels-photo-7991567.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991567/pexels-photo-7991567.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2022,
    rating: 'TV-MA',
    duration: '2 Seasons',
    genre: ['Action', 'Adventure', 'Drama'],
    type: 'series'
  },
  {
    id: 'tv-2',
    title: 'The Bear',
    description: 'A young chef from the fine dining world returns to Chicago to run his family restaurant.',
    thumbnail: 'https://images.pexels.com/photos/7991345/pexels-photo-7991345.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991345/pexels-photo-7991345.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2022,
    rating: 'TV-MA',
    duration: '3 Seasons',
    genre: ['Comedy', 'Drama'],
    type: 'series'
  },
  {
    id: 'tv-3',
    title: 'Euphoria',
    description: 'A group of high school students navigate love and friendships.',
    thumbnail: 'https://images.pexels.com/photos/7991412/pexels-photo-7991412.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
    backdrop: 'https://images.pexels.com/photos/7991412/pexels-photo-7991412.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    year: 2019,
    rating: 'TV-MA',
    duration: '2 Seasons',
    genre: ['Drama'],
    type: 'series'
  }
];

export const carouselSections: CarouselSection[] = [
  {
    id: 'continue-watching',
    title: 'Continue Watching',
    content: continueWatching
  },
  {
    id: 'trending',
    title: 'Trending Now',
    content: trending
  },
  {
    id: 'movies',
    title: 'Popular Movies',
    content: movies
  },
  {
    id: 'tv-shows',
    title: 'TV Shows',
    content: tvShows
  }
];