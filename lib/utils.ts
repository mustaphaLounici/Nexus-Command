import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SearchResult, SCORING_WEIGHTS } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateScore(
  result: SearchResult,
  query: string,
  baseScore: number = 0
): number {
  let score = baseScore

  // Normalize strings for comparison
  const normalizedQuery = query.toLowerCase().trim()
  const normalizedTitle = result.title.toLowerCase().trim()

  // Match type scoring
  if (normalizedTitle === normalizedQuery) {
    score += SCORING_WEIGHTS.EXACT_MATCH
  } else if (normalizedTitle.startsWith(normalizedQuery)) {
    score += SCORING_WEIGHTS.STARTS_WITH
  } else if (normalizedTitle.includes(normalizedQuery)) {
    score += SCORING_WEIGHTS.CONTAINS
  }

  // Recency scoring
  if (result.lastAccessed) {
    const hoursSinceAccess = (Date.now() - result.lastAccessed) / (1000 * 60 * 60)
    const recencyScore = Math.max(0, SCORING_WEIGHTS.LAST_ACCESSED - hoursSinceAccess)
    score += recencyScore
  }

  // Frequency scoring
  if (result.accessCount) {
    const frequencyScore = Math.min(
      SCORING_WEIGHTS.ACCESS_COUNT,
      result.accessCount * (SCORING_WEIGHTS.ACCESS_COUNT / 10)
    )
    score += frequencyScore
  }

  return Math.min(100, score)
}

export function rankResults(results: SearchResult[], query: string): SearchResult[] {
  return [...results]
    .map(result => ({
      ...result,
      score: calculateScore(result, query, result.score),
    }))
    .sort((a, b) => b.score - a.score)
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'just now'
}
