import { create } from 'zustand'
import { songs } from '@/components/music/songs'

interface MusicPlayerState {
  isPlaying: boolean
  currentSongIndex: number
  progress: number
  audioRef: HTMLAudioElement | null
  setIsPlaying: (isPlaying: boolean) => void
  setCurrentSongIndex: (index: number) => void
  setProgress: (progress: number) => void
  togglePlayPause: () => void
  playNext: () => void
  playPrevious: () => void
  initAudio: () => void
  cleanupAudio: () => void
}

export const useMusicPlayerStore = create<MusicPlayerState>((set, get) => ({
  isPlaying: true,
  currentSongIndex: 0,
  progress: 0,
  audioRef: null,

  setIsPlaying: (isPlaying) => {
    const state = get()
    if (!state.audioRef) return

    if (isPlaying) {
      const playPromise = state.audioRef.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name === 'NotAllowedError') {
            console.log('Autoplay prevented - user interaction required')
            set({ isPlaying: false })
          }
        })
      }
    } else {
      state.audioRef.pause()
    }
    set({ isPlaying })
  },

  setCurrentSongIndex: (index) => {
    const state = get()
    set({ currentSongIndex: index, progress: 0 })

    // Update audio source
    if (state.audioRef) {
      state.audioRef.src = songs[index].audio
      state.audioRef.load()
      if (state.isPlaying) {
        state.audioRef.play().catch((error) => {
          console.error('Playback failed:', error)
        })
      }
    }
  },

  setProgress: (progress) => set({ progress }),

  togglePlayPause: () => {
    const state = get()
    state.setIsPlaying(!state.isPlaying)
  },

  playNext: () => {
    const state = get()
    const nextIndex = (state.currentSongIndex + 1) % songs.length
    state.setCurrentSongIndex(nextIndex)
    state.setIsPlaying(true)
  },

  playPrevious: () => {
    const state = get()
    const prevIndex = (state.currentSongIndex - 1 + songs.length) % songs.length
    state.setCurrentSongIndex(prevIndex)
    state.setIsPlaying(true)
  },

  initAudio: () => {
    const state = get()
    if (state.audioRef) return // Already initialized

    const audio = new Audio(songs[state.currentSongIndex].audio)
    audio.preload = 'auto'

    // Progress tracking
    const updateProgress = () => {
      if (audio.duration) {
        const newProgress = (audio.currentTime / audio.duration) * 100
        set({ progress: newProgress })
      }
    }

    // Auto-advance to next song
    const handleEnded = () => {
      get().playNext()
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', handleEnded)

    set({ audioRef: audio })
  },

  cleanupAudio: () => {
    const state = get()
    if (state.audioRef) {
      state.audioRef.pause()
      state.audioRef.src = ''
      set({ audioRef: null, isPlaying: false })
    }
  },
}))
