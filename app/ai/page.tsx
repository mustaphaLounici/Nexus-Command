import { Metadata } from 'next'

interface AIPageProps {
  searchParams: { q?: string }
}

export const metadata: Metadata = {
  title: 'AI Chat',
  description: 'AI chat interface',
}

export default function AIPage({ searchParams }: AIPageProps) {
  const query = searchParams.q || ''

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 text-muted-foreground mb-6">
        <span>AI chat about:</span>
        <span className="font-medium text-foreground">{query}</span>
      </div>
      
      {/* This is a placeholder for actual AI chat interface */}
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          This is a demo page. In a real application, this would show an AI chat interface for discussing: &quot;{query}&quot;
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          (Integration with OpenAI or another AI service would be required)
        </p>
      </div>
    </div>
  )
} 