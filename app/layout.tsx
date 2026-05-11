import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Noto_Sans_SC } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "咸鱼攻略站 - 咸鱼之王全武将数据库",
  description:
    "收录 218 位咸将完整数据，每周更新阵容与爬塔攻略。咸鱼之王武将图鉴、阵容推荐、爬塔指南、兑换码大全。",
  keywords: ["咸鱼之王", "咸鱼攻略", "武将图鉴", "阵容推荐", "爬塔攻略", "兑换码"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geist.variable} ${notoSansSC.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
