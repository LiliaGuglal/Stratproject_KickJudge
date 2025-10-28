"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Globe, Sparkles, Building2, Users, Trophy, Zap, Menu, X } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [language, setLanguage] = useState<"uk" | "en">("uk")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const content = {
    uk: {
      nav: {
        features: "Можливості",
        howItWorks: "Як це працює",
        example: "Приклад",
        pricing: "Тарифи",
        about: "Про нас",
        contact: "Контакти",
        tryFree: "Спробувати безкоштовно",
      },
      back: "Назад на головну",
      title: "Детальні тарифні плани",
      subtitle: "Оберіть план, який ідеально підходить для ваших потреб",
      free: {
        name: "Безкоштовний",
        price: "0",
        period: "назавжди",
        description: "Ідеально для знайомства з платформою",
        cta: "Почати безкоштовно",
        benefits: [
          "До 5 аналізів поєдинків на місяць",
          "Базова статистика ударів та захисту",
          "Відеофрагменти до 30 секунд",
          "Доступ до спільноти користувачів",
          "Базові рекомендації AI",
          "Експорт звітів у PDF",
        ],
        limitations: [
          "Обмежена кількість аналізів",
          "Без пріоритетної підтримки",
          "Без API доступу",
          "Без командних функцій",
        ],
      },
      monthly: {
        name: "Місячний",
        price: "29",
        period: "на місяць",
        description: "Для професійних суддів та тренерів",
        cta: "Оформити підписку",
        popular: true,
        benefits: [
          "Необмежена кількість аналізів поєдинків",
          "Повна статистика та розширені метрики",
          "Необмежені відеофрагменти будь-якої тривалості",
          "Пріоритетна підтримка 24/7",
          "Експорт звітів у PDF, Excel, JSON",
          "API доступ для інтеграції",
          "Покадровий аналіз відео",
          "Порівняння бійців",
          "Історія всіх аналізів",
          "Персоналізовані налаштування",
        ],
        ideal: ["Професійні судді", "Тренери та аналітики", "Спортивні журналісти", "Індивідуальні користувачі"],
      },
      yearly: {
        name: "Річний",
        price: "279",
        period: "на рік",
        description: "Найкраща ціна для команд та клубів",
        cta: "Оформити підписку",
        save: "Економія $69",
        benefits: [
          "Всі функції місячного плану",
          "Економія $69 порівняно з місячною оплатою",
          "Розширена аналітика та звіти",
          "Командні функції (до 5 користувачів)",
          "Спільний доступ до аналізів",
          "Персональний менеджер підтримки",
          "Ранній доступ до нових функцій",
          "Пріоритетна обробка запитів",
          "Кастомізація інтерфейсу",
          "Інтеграція з вашими системами",
          "Навчальні матеріали та вебінари",
          "Щомісячні консультації",
        ],
        ideal: ["Спортивні клуби", "Команди суддів", "Тренерські штаби", "Спортивні організації"],
      },
      federation: {
        name: "Для Федерацій",
        price: "999",
        period: "на місяць",
        description: "Корпоративне рішення для федерацій та великих організацій",
        cta: "Зв'язатися з нами",
        enterprise: true,
        benefits: [
          "Всі функції річного плану",
          "Необмежена кількість користувачів",
          "Білий лейбл (ваш брендинг)",
          "Виділений сервер для максимальної продуктивності",
          "Кастомна розробка функцій під ваші потреби",
          "Інтеграція з вашою інфраструктурою",
          "Навчання персоналу та онбординг",
          "Виділена команда підтримки",
          "SLA гарантії 99.9% uptime",
          "Розширені права адміністрування",
          "Аналітика на рівні організації",
          "Експорт даних у будь-якому форматі",
          "Юридична підтримка та договори",
          "Щоквартальні стратегічні сесії",
        ],
        ideal: [
          "Національні федерації кікбоксингу",
          "Міжнародні спортивні організації",
          "Великі турнірні оператори",
          "Спортивні телеканали та медіа",
        ],
        features: [
          {
            icon: Building2,
            title: "Корпоративна інфраструктура",
            description: "Виділені ресурси та максимальна безпека даних",
          },
          {
            icon: Users,
            title: "Необмежені користувачі",
            description: "Додавайте скільки завгодно суддів, тренерів та аналітиків",
          },
          {
            icon: Trophy,
            title: "Турнірний режим",
            description: "Спеціальні функції для проведення та аналізу турнірів",
          },
          {
            icon: Zap,
            title: "Пріоритетна розробка",
            description: "Ваші запити на нові функції мають найвищий пріоритет",
          },
        ],
      },
      comparison: {
        title: "Порівняння планів",
        features: "Функції",
        analyses: "Аналізи на місяць",
        statistics: "Детальна статистика",
        videoClips: "Відеофрагменти",
        support: "Підтримка",
        apiAccess: "API доступ",
        teamFeatures: "Командні функції",
        customization: "Кастомізація",
        training: "Навчання",
        sla: "SLA гарантії",
        unlimited: "Необмежено",
        basic: "Базова",
        full: "Повна",
        limited: "Обмежені",
        priority: "Пріоритетна",
        community: "Спільнота",
        dedicated: "Виділена команда",
        yes: "Так",
        no: "Ні",
      },
      cta: {
        title: "Готові почати?",
        subtitle: "Оберіть план та приєднуйтесь до революції в суддівстві кікбоксингу",
        contact: "Зв'язатися з відділом продажів",
      },
    },
    en: {
      nav: {
        features: "Features",
        howItWorks: "How it works",
        example: "Example",
        pricing: "Pricing",
        about: "About",
        contact: "Contact",
        tryFree: "Try for free",
      },
      back: "Back to home",
      title: "Detailed Pricing Plans",
      subtitle: "Choose the plan that perfectly fits your needs",
      free: {
        name: "Free",
        price: "0",
        period: "forever",
        description: "Perfect for getting started with the platform",
        cta: "Start for free",
        benefits: [
          "Up to 5 match analyses per month",
          "Basic strike and defense statistics",
          "Video clips up to 30 seconds",
          "Access to user community",
          "Basic AI recommendations",
          "Export reports to PDF",
        ],
        limitations: ["Limited number of analyses", "No priority support", "No API access", "No team features"],
      },
      monthly: {
        name: "Monthly",
        price: "29",
        period: "per month",
        description: "For professional judges and coaches",
        cta: "Subscribe",
        popular: true,
        benefits: [
          "Unlimited match analyses",
          "Full statistics and advanced metrics",
          "Unlimited video clips of any duration",
          "Priority 24/7 support",
          "Export reports to PDF, Excel, JSON",
          "API access for integration",
          "Frame-by-frame video analysis",
          "Fighter comparison",
          "History of all analyses",
          "Personalized settings",
        ],
        ideal: ["Professional judges", "Coaches and analysts", "Sports journalists", "Individual users"],
      },
      yearly: {
        name: "Yearly",
        price: "279",
        period: "per year",
        description: "Best value for teams and clubs",
        cta: "Subscribe",
        save: "Save $69",
        benefits: [
          "All monthly plan features",
          "Save $69 compared to monthly billing",
          "Advanced analytics and reports",
          "Team features (up to 5 users)",
          "Shared access to analyses",
          "Personal support manager",
          "Early access to new features",
          "Priority request processing",
          "Interface customization",
          "Integration with your systems",
          "Training materials and webinars",
          "Monthly consultations",
        ],
        ideal: ["Sports clubs", "Judge teams", "Coaching staffs", "Sports organizations"],
      },
      federation: {
        name: "For Federations",
        price: "999",
        period: "per month",
        description: "Enterprise solution for federations and large organizations",
        cta: "Contact us",
        enterprise: true,
        benefits: [
          "All yearly plan features",
          "Unlimited users",
          "White label (your branding)",
          "Dedicated server for maximum performance",
          "Custom feature development for your needs",
          "Integration with your infrastructure",
          "Staff training and onboarding",
          "Dedicated support team",
          "99.9% uptime SLA guarantees",
          "Advanced administration rights",
          "Organization-level analytics",
          "Data export in any format",
          "Legal support and contracts",
          "Quarterly strategic sessions",
        ],
        ideal: [
          "National kickboxing federations",
          "International sports organizations",
          "Large tournament operators",
          "Sports TV channels and media",
        ],
        features: [
          {
            icon: Building2,
            title: "Enterprise Infrastructure",
            description: "Dedicated resources and maximum data security",
          },
          {
            icon: Users,
            title: "Unlimited Users",
            description: "Add as many judges, coaches and analysts as you need",
          },
          {
            icon: Trophy,
            title: "Tournament Mode",
            description: "Special features for conducting and analyzing tournaments",
          },
          {
            icon: Zap,
            title: "Priority Development",
            description: "Your feature requests have the highest priority",
          },
        ],
      },
      comparison: {
        title: "Plan Comparison",
        features: "Features",
        analyses: "Analyses per month",
        statistics: "Detailed statistics",
        videoClips: "Video clips",
        support: "Support",
        apiAccess: "API access",
        teamFeatures: "Team features",
        customization: "Customization",
        training: "Training",
        sla: "SLA guarantees",
        unlimited: "Unlimited",
        basic: "Basic",
        full: "Full",
        limited: "Limited",
        priority: "Priority",
        community: "Community",
        dedicated: "Dedicated team",
        yes: "Yes",
        no: "No",
      },
      cta: {
        title: "Ready to get started?",
        subtitle: "Choose a plan and join the revolution in kickboxing judging",
        contact: "Contact sales team",
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">KickAI Judge</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/#features" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.features}
              </Link>
              <Link href="/#how-it-works" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.howItWorks}
              </Link>
              <Link href="/#example" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.example}
              </Link>
              <Link href="/#pricing" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.pricing}
              </Link>
              <Link href="/#about" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.about}
              </Link>
              <Link href="/#contact" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.contact}
              </Link>
            </nav>

            {/* Right side: Try Free button, Language toggle and burger menu */}
            <div className="flex items-center gap-4">
              <Link href="/demo" className="hidden md:block">
                <Button size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-full">
                  {t.nav.tryFree}
                </Button>
              </Link>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "uk" ? "en" : "uk")}
                className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "uk" ? "EN" : "UA"}
              </Button>

              {/* Burger Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white hover:bg-zinc-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-900 bg-black">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.features}
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.howItWorks}
              </Link>
              <Link
                href="/#example"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.example}
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.pricing}
              </Link>
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.about}
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.contact}
              </Link>
              <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-white text-black hover:bg-zinc-200 rounded-full">
                  {t.nav.tryFree}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-zinc-300">PRICING</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">{t.title}</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Free Plan */}
          <Card className="bg-zinc-950 border-zinc-900 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t.free.name}</h2>
                <p className="text-zinc-400 mb-8">{t.free.description}</p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-bold">${t.free.price}</span>
                  <span className="text-zinc-400">/ {t.free.period}</span>
                </div>

                <Button size="lg" className="bg-zinc-800 hover:bg-zinc-700 text-white w-full md:w-auto">
                  {t.free.cta}
                </Button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {language === "uk" ? "Що включено:" : "What's included:"}
                  </h3>
                  <ul className="space-y-3">
                    {t.free.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-zinc-500">
                    {language === "uk" ? "Обмеження:" : "Limitations:"}
                  </h3>
                  <ul className="space-y-3">
                    {t.free.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5 text-zinc-600">×</div>
                        <span className="text-zinc-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Monthly Plan */}
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-700 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-white text-black text-xs font-bold px-4 py-1 rounded-full">
                {language === "uk" ? "ПОПУЛЯРНИЙ" : "POPULAR"}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t.monthly.name}</h2>
                <p className="text-zinc-400 mb-8">{t.monthly.description}</p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-bold">${t.monthly.price}</span>
                  <span className="text-zinc-400">/ {t.monthly.period}</span>
                </div>

                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 w-full md:w-auto">
                  {t.monthly.cta}
                </Button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{language === "uk" ? "Всі функції:" : "All features:"}</h3>
                  <ul className="space-y-3">
                    {t.monthly.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{language === "uk" ? "Ідеально для:" : "Ideal for:"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {t.monthly.ideal.map((item, i) => (
                      <div key={i} className="bg-zinc-800 px-4 py-2 rounded-full text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Yearly Plan */}
          <Card className="bg-zinc-950 border-zinc-900 p-8 md:p-12 relative">
            <div className="absolute top-4 right-4">
              <div className="bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full">{t.yearly.save}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t.yearly.name}</h2>
                <p className="text-zinc-400 mb-8">{t.yearly.description}</p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-bold">${t.yearly.price}</span>
                  <span className="text-zinc-400">/ {t.yearly.period}</span>
                </div>
                <p className="text-sm text-green-500 mb-8">
                  {language === "uk" ? "Економія $69 на рік" : "Save $69 per year"}
                </p>

                <Button size="lg" className="bg-zinc-800 hover:bg-zinc-700 text-white w-full md:w-auto">
                  {t.yearly.cta}
                </Button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{language === "uk" ? "Всі функції:" : "All features:"}</h3>
                  <ul className="space-y-3">
                    {t.yearly.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{language === "uk" ? "Ідеально для:" : "Ideal for:"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {t.yearly.ideal.map((item, i) => (
                      <div key={i} className="bg-zinc-800 px-4 py-2 rounded-full text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Federation Plan */}
          <Card className="bg-gradient-to-br from-blue-950/30 to-zinc-950 border-blue-900/50 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">ENTERPRISE</div>
            </div>

            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{t.federation.name}</h2>
                  <p className="text-zinc-400 mb-8">{t.federation.description}</p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-6xl font-bold">${t.federation.price}</span>
                    <span className="text-zinc-400">/ {t.federation.period}</span>
                  </div>

                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
                    {t.federation.cta}
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {language === "uk" ? "Корпоративні функції:" : "Enterprise features:"}
                  </h3>
                  <ul className="space-y-3">
                    {t.federation.benefits.slice(0, 7).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Federation Features Grid */}
              <div>
                <h3 className="text-2xl font-bold mb-8">
                  {language === "uk" ? "Ключові переваги для федерацій:" : "Key benefits for federations:"}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.federation.features.map((feature, i) => (
                    <Card key={i} className="bg-zinc-900/50 border-zinc-800 p-6">
                      <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-sm text-zinc-400">{feature.description}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {language === "uk" ? "Додаткові можливості:" : "Additional capabilities:"}
                  </h3>
                  <ul className="space-y-3">
                    {t.federation.benefits.slice(7).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{language === "uk" ? "Ідеально для:" : "Ideal for:"}</h3>
                  <div className="space-y-3">
                    {t.federation.ideal.map((item, i) => (
                      <div key={i} className="bg-blue-900/30 border border-blue-800/50 px-4 py-3 rounded-lg">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.comparison.title}</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-4 font-semibold">{t.comparison.features}</th>
                  <th className="text-center py-4 px-4 font-semibold">{t.free.name}</th>
                  <th className="text-center py-4 px-4 font-semibold bg-zinc-900/50">{t.monthly.name}</th>
                  <th className="text-center py-4 px-4 font-semibold">{t.yearly.name}</th>
                  <th className="text-center py-4 px-4 font-semibold bg-blue-950/30">{t.federation.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-900">
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.analyses}</td>
                  <td className="py-4 px-4 text-center">5</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50">{t.comparison.unlimited}</td>
                  <td className="py-4 px-4 text-center">{t.comparison.unlimited}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30">{t.comparison.unlimited}</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.statistics}</td>
                  <td className="py-4 px-4 text-center">{t.comparison.basic}</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50">{t.comparison.full}</td>
                  <td className="py-4 px-4 text-center">{t.comparison.full}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30">{t.comparison.full}</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.videoClips}</td>
                  <td className="py-4 px-4 text-center">{t.comparison.limited}</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50">{t.comparison.unlimited}</td>
                  <td className="py-4 px-4 text-center">{t.comparison.unlimited}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30">{t.comparison.unlimited}</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.support}</td>
                  <td className="py-4 px-4 text-center">{t.comparison.community}</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50">{t.comparison.priority}</td>
                  <td className="py-4 px-4 text-center">{t.comparison.priority}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30">{t.comparison.dedicated}</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.apiAccess}</td>
                  <td className="py-4 px-4 text-center text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50 text-green-500">{t.comparison.yes}</td>
                  <td className="py-4 px-4 text-center text-green-500">{t.comparison.yes}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30 text-green-500">{t.comparison.yes}</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.teamFeatures}</td>
                  <td className="py-4 px-4 text-center text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50 text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center text-green-500">{t.comparison.yes}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30 text-green-500">{t.comparison.yes}</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.customization}</td>
                  <td className="py-4 px-4 text-center text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50 text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center text-green-500">{t.comparison.yes}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30 text-green-500">{t.comparison.yes}</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.training}</td>
                  <td className="py-4 px-4 text-center text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50 text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center text-green-500">{t.comparison.yes}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30 text-green-500">{t.comparison.yes}</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-zinc-400">{t.comparison.sla}</td>
                  <td className="py-4 px-4 text-center text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center bg-zinc-900/50 text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center text-zinc-600">{t.comparison.no}</td>
                  <td className="py-4 px-4 text-center bg-blue-950/30 text-green-500">99.9%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl text-zinc-400 mb-12">{t.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 text-lg px-8 py-6 rounded-full">
              {t.free.cta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-900 text-lg px-8 py-6 rounded-full bg-transparent"
            >
              {t.cta.contact}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">KickAI Judge</span>
            </Link>

            <p className="text-zinc-500 text-sm">© 2025 KickAI Judge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
