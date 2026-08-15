import { HtmlLang } from '@/components/html-lang'

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang lang="en" />
      {children}
    </>
  )
}
