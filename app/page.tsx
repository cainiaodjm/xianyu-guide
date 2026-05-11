import Link from "next/link"
import { BookOpen, Users, Mountain, Gift } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { value: "218", label: "咸将收录", desc: "全阵营全品质" },
  { value: "42", label: "套阵容方案", desc: "涵盖各场景" },
  { value: "100+", label: "关卡攻略", desc: "咸将塔逐关讲解" },
  { value: "每日", label: "活动更新", desc: "兑换码实时同步" },
]

const features = [
  {
    icon: BookOpen,
    title: "武将图鉴",
    description: "218 位咸将完整属性与技能",
    href: "/heroes",
    iconBg: "bg-zinc-700",
  },
  {
    icon: Users,
    title: "阵容推荐",
    description: "平民到氪金，各阶段最优阵容",
    href: "/teams",
    iconBg: "bg-amber-500",
  },
  {
    icon: Mountain,
    title: "爬塔指南",
    description: "咸将塔逐关图文攻略",
    href: "/tower",
    iconBg: "bg-red-500",
  },
  {
    icon: Gift,
    title: "兑换码",
    description: "最新可用兑换码实时更新",
    href: "/codes",
    iconBg: "bg-green-500",
  },
]

const updates = [
  { date: "12-15", type: "新增", title: '新增武将"赵云·龙胆"详细数据' },
  { date: "12-12", type: "更新", title: "咸将塔 91-100 关攻略更新" },
  { date: "12-10", type: "新增", title: "平民推图阵容方案 v2.0" },
  { date: "12-08", type: "修复", title: "修正吕布技能伤害数值" },
  { date: "12-05", type: "更新", title: "兑换码列表 12月更新" },
]

function getUpdateBadgeVariant(type: string) {
  switch (type) {
    case "新增":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "更新":
      return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
    case "修复":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    default:
      return ""
  }
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <Badge
            variant="secondary"
            className="bg-blue-500/10 text-xs text-blue-500 hover:bg-blue-500/20"
          >
            v3.2.1 已更新
          </Badge>
          <Badge
            variant="secondary"
            className="bg-amber-500/10 text-xs text-amber-500 hover:bg-amber-500/20"
          >
            兑换码 5月更新
          </Badge>
        </div>
        <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          咸鱼之王 · 全武将数据库
        </h1>
        <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground">
          收录 218 位咸将完整数据，每周更新阵容与爬塔攻略
        </p>
      </section>

      {/* Stats Section */}
      <section className="mb-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border-border/50 bg-card/50"
            >
              <CardContent className="p-6">
                <p className="text-4xl font-medium leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  {stat.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <Card className="group h-full border-border/50 transition-colors hover:border-amber-500">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.iconBg}`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-1 font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Updates Section */}
      <section>
        <h2 className="mb-6 text-xl font-bold">近期更新</h2>
        <Card className="border-border/50">
          <CardContent className="divide-y divide-border/50 p-0">
            {updates.map((update, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 text-sm"
              >
                <span className="w-12 shrink-0 text-muted-foreground">
                  {update.date}
                </span>
                <Badge
                  variant="secondary"
                  className={`shrink-0 ${getUpdateBadgeVariant(update.type)}`}
                >
                  {update.type}
                </Badge>
                <span className="truncate">{update.title}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
