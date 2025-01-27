import { Metadata } from 'next'

interface SearchPageProps {
  searchParams: { q?: string }
}

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search results page',
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 text-muted-foreground mb-6">
        <span>Search results for:</span>
        <span className="font-medium text-foreground">{query}</span>
      </div>
      
      {/* This is a placeholder for actual search results */}
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          This is a demo page. In a real application, this would show actual search results for: &quot;{query}&quot;
        </p>
      </div>
    </div>
  )
} 