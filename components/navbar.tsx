"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Fish, Search, Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/heroes", label: "武将图鉴" },
  { href: "/teams", label: "阵容推荐" },
  { href: "/tower", label: "爬塔指南" },
  { href: "/codes", label: "兑换码" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Fish className="h-6 w-6 text-amber-500" />
          <span className="text-lg font-bold">咸鱼攻略站</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search - Desktop */}
          <div className="hidden items-center sm:flex">
            {searchOpen ? (
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="搜索武将..."
                    className="h-9 w-[180px] pl-9 lg:w-[240px]"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">关闭搜索</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">搜索</span>
              </Button>
            )}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">切换主题</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">打开菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Fish className="h-5 w-5 text-amber-500" />
                  咸鱼攻略站
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="搜索武将..."
                    className="pl-9"
                  />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
