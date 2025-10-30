import { create } from 'zustand'
import type { Rive, StateMachineInput } from '@rive-app/react-canvas'

interface AvatarState {
  rive: Rive | null
  isLoaded: boolean
  hoverTrig?: StateMachineInput
  sadTrig?: StateMachineInput
  thinkingTrig?: StateMachineInput
  happyTrig?: StateMachineInput
  idleTrig?: StateMachineInput
  setRive: (rive: Rive | null) => void
  setIsLoaded: (loaded: boolean) => void
  setTriggers: (inputs: Partial<AvatarState>) => void
}

export const useAvatarStore = create<AvatarState>((set) => ({
  rive: null,
  isLoaded: false,
  setRive: (rive) => set({ rive }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  setTriggers: (inputs) => set((state) => ({ ...state, ...inputs })),
}))
