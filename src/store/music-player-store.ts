import { create } from 'zustand'

interface MusicPlayerState {
  isPlaying: boolean
  currentSongIndex: number
  setIsPlaying: (isPlaying: boolean) => void
  setCurrentSongIndex: (index: number) => void
  togglePlayPause: () => void
}

export const useMusicPlayerStore = create<MusicPlayerState>((set) => ({
  isPlaying: true,
  currentSongIndex: 0,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentSongIndex: (index) => set({ currentSongIndex: index }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
}))
