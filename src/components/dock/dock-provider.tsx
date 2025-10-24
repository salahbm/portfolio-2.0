'use client'
import { createContext, useContext } from 'react'
import type { DockContextType } from './dock.types'

export const DockContext = createContext<DockContextType | null>(null)
export const useDock = () => useContext(DockContext)
