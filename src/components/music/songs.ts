export interface Song {
  id: number
  title: string
  artist: string
  album: string
  image: string
  gradient: string
  audio: string
  duration: number
}

export const songs: Song[] = [
  {
    id: 1,
    title: 'Lofi Hip Hop',
    artist: 'Soulful Beats',
    album: 'Soulful Beats',
    image: '/music/lofi.jpg',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    audio: '/music/lofi-hiphop.mp3',
    duration: 213, // 3:33
  },
  {
    id: 2,
    title: 'Sato',
    artist: 'Uzbek Music',
    album: 'Uzbek Music',
    image: '/music/sato-navo.webp',
    gradient: 'from-purple-500 via-pink-500 to-red-500',
    audio: '/music/sato-uzbek.mp3',
    duration: 386, // 6:26
  },
  {
    id: 3,
    title: 'Where you are',
    artist: 'Halal Beats',
    album: 'Juma Vibes',
    image: '/music/halal-beats.jpg',
    gradient: 'from-orange-500 via-rose-500 to-pink-500',
    audio: '/music/halal-beats.mp3',
    duration: 163, // 2:43
  },
  {
    id: 4,
    title: 'Hotel California',
    artist: 'The Eagles',
    album: 'Hotel California',
    image: '/music/hotel-california.jpg',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    audio: '/music/hotel-california.mp3',
    duration: 390, // 6:30
  },
]
