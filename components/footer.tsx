import { Fish } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-8 text-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Fish className="h-4 w-4 text-amber-500" />
          <span className="text-sm">咸鱼攻略站</span>
        </div>
        <p className="text-xs text-muted-foreground">
          数据来源 bilibili wiki | 非官方攻略站
        </p>
      </div>
    </footer>
  )
}
