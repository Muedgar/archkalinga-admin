'use client'

interface ContentProps {
  children: {
    navbar: React.ReactNode
    content: React.ReactNode
  }
}

export default function ContentLayout({ children }: ContentProps) {
  return (
    <section className="flex flex-col">
      {children.navbar}
      <div className="px-4 pt-8 pb-8 sm:px-8">{children.content}</div>
    </section>
  )
}
