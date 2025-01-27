"use client"

import { useState, useEffect } from 'react'
import { RecentSearch, SearchState } from '../types'

const STORAGE_KEY = 'recent-searches'
const MAX_RECENT_SEARCHES = 10

const DEFAULT_SUGGESTED_QUESTIONS = [
  'How do I create a new project?',
  'What are the best practices for TypeScript?',
  'How to deploy my application?',
]

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    query: '',
    recentSearches: [],
    suggestedQuestions: DEFAULT_SUGGESTED_QUESTIONS,
  })

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const recentSearches = JSON.parse(stored) as RecentSearch[]
      setState(prev => ({ ...prev, recentSearches }))
    }
  }, [])

  const addRecentSearch = (query: string) => {
    const newSearch: RecentSearch = {
      id: Date.now().toString(),
      query,
      timestamp: Date.now(),
    }

    setState(prev => {
      const filtered = prev.recentSearches.filter(s => s.query !== query)
      const newSearches = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES)
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSearches))
      
      return {
        ...prev,
        recentSearches: newSearches,
      }
    })
  }

  const clearRecentSearches = () => {
    localStorage.removeItem(STORAGE_KEY)
    setState(prev => ({ ...prev, recentSearches: [] }))
  }

  const setQuery = (query: string) => {
    setState(prev => ({ ...prev, query }))
  }

  return {
    ...state,
    setQuery,
    addRecentSearch,
    clearRecentSearches,
  }
} 