"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Eye,
  BarChart3,
  Video,
  FileText,
  Shield,
  Target,
  Users,
  Trophy,
  Building2,
  Briefcase,
  Globe,
  Sparkles,
  UserPlus,
  Menu,
  X,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  Maximize,
  Download,
  FileBarChart,
  Upload,
  TrendingUp,
  Check,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function KickAIJudgeLanding() {
  const [language, setLanguage] = useState<"uk" | "en">("uk")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, duration))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration])

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
      hero: {
        title: "AI-асистент для суддівства в кікбоксингу",
        subtitle: "Революційна технологія комп'ютерного зору для об'єктивного та точного оцінювання поєдинків",
        cta: "Почати безкоштовно",
        demo: "Дивитись демо",
      },
      trust: {
        title: "Нам довіряють провідні організації",
        company: "Компанія",
        agency: "Агенція",
        venture: "Венчур",
        institute: "Інститут",
        enterprise: "Підприємство",
        organization: "Організація",
      },
      features: {
        title: "Можливості",
        subtitle: "Досліджуйте наш набір функцій для аналізу поєдинків",
        openAccount: "Відкрити акаунт",
        realTimeAnalysis: {
          title: "Аналіз в реальному часі",
          description: "Миттєвий аналіз техніки, швидкості та точності ударів під час поєдинку",
        },
        detailedStatistics: {
          title: "Детальна статистика",
          description: "Комплексні дані про кількість ударів, ефективність та активність бійців",
        },
        videoRecording: {
          title: "Відеозапис поєдинків",
          description: "Автоматичне збереження та аналіз відеоматеріалів з можливістю повторного перегляду",
        },
        objectiveScoring: {
          title: "Об'єктивне оцінювання",
          description: "Нейтральна AI-система виключає суб'єктивність та помилки людського фактору",
        },
        multiAngleView: {
          title: "Багатокутовий огляд",
          description: "Аналіз поєдинку з декількох камер для максимальної точності оцінювання",
        },
        exportReports: {
          title: "Експорт звітів",
          description: "Детальні звіти в PDF та Excel з повною статистикою, графіками та відеофрагментами",
        },
      },
      howItWorks: {
        title: "Як це працює?",
        subtitle: "Чому обрати нас",
        step1: {
          title: "Створіть обліковий запис",
          description: "Зареєструйтеся та отримайте доступ до всіх функцій платформи для аналізу поєдинків",
          learnMore: "Дізнатися більше",
        },
        step2: {
          title: "Завантажте відео",
          description: "Завантажте запис поєдинку або підключіться до прямої трансляції для аналізу",
          learnMore: "Дізнатися більше",
        },
        step3: {
          title: "Отримайте аналіз",
          description: "Отримайте детальну статистику, рекомендації та відеодокази за лічені хвилини",
          learnMore: "Дізнатися більше",
        },
        phoneScreen: {
          createAccount: "Створіть обліковий запис",
          registerText: "Зареєструйтеся та отримайте доступ до всіх функцій платформи для аналізу поєдинків",
          email: "EMAIL",
          emailPlaceholder: "your@email.com",
          password: "ПАРОЛЬ",
          passwordPlaceholder: "••••••••",
          remember: "Запам'ятати",
          forgot: "Забули пароль?",
          login: "Увійти",
          uploadVideo: "Завантажте відео",
          uploadText: "Завантажте запис поєдинку або підключіться до прямої трансляції",
          dragDrop: "Перетягніть відео сюди або",
          browse: "оберіть файл",
          supported: "Підтримується: MP4, AVI, MOV (макс. 2GB)",
          selectFile: "Обрати файл",
          getAnalysis: "Отримайте аналіз",
          analysisText: "Отримайте детальну статистику та рекомендації за лічені хвилини",
          analyzing: "Аналізуємо поєдинок...",
          fighter1: "Боєць 1",
          fighter2: "Боєць 2",
          strikes: "Удари",
          accuracy: "Точність",
          activity: "Активність",
          aiRecommendation: "Рекомендація AI",
          recommendation: "Боєць 1 показав вищу активність та точність ударів. Рекомендується перемога за очками.",
          viewReport: "Переглянути звіт",
        },
      },
      example: {
        title: "Приклад використання",
        subtitle: "Подивіться, як працює аналіз",
        matchTitle: "Поєдинок: Іван Петренко vs Олег Коваленко",
        round: "Раунд 2 з 3",
        fighter1: "Іван Петренко",
        fighter2: "Олег Коваленко",
        strikes: "Удари",
        accuracy: "Точність",
        activity: "Активність",
        aiInsights: "AI Рекомендації",
        insight1: "Боєць 1 показує вищу активність у другому раунді",
        insight2: "Точність ударів Бійця 2 знизилась на 15%",
        insight3: "Рекомендується перемога Бійця 1 за очками",
        tryYourVideo: "Спробувати зі своїм відео",
        fullReport: "Повний звіт",
        downloadExample: "Приклад",
      },
      pricing: {
        title: "Тарифи",
        subtitle: "Оберіть план, який підходить вам",
        monthly: "Місяць",
        yearly: "Рік",
        free: {
          name: "Безкоштовний",
          price: "0",
          period: "назавжди",
          description: "Для ознайомлення з платформою",
          features: [
            "До 5 аналізів на місяць",
            "Базова статистика",
            "Відеозапис до 10 хв",
            "Експорт в PDF",
            "Підтримка email",
          ],
          cta: "Почати безкоштовно",
        },
        monthly: {
          name: "Місячний",
          price: "29",
          period: "на місяць",
          description: "Для суддів та тренерів",
          features: [
            "Необмежені аналізи",
            "Повна статистика",
            "Відеозапис без обмежень",
            "Експорт в PDF та Excel",
            "Пріоритетна підтримка",
            "Багатокутовий огляд",
            "AI рекомендації",
          ],
          cta: "Обрати план",
          popular: "Популярний",
        },
        yearly: {
          name: "Річний",
          price: "279",
          period: "на рік",
          description: "Економія 20% при річній оплаті",
          features: [
            "Всі функції місячного",
            "Знижка 20%",
            "Ранній доступ до нових функцій",
            "Персональний менеджер",
            "Навчальні матеріали",
            "API доступ",
          ],
          cta: "Обрати план",
          save: "Економія 20%",
        },
        moreDetails: "Детальніше про тарифи",
      },
      mission: {
        label: "Більше про нас",
        title: "Відкрийте місію та історію нашої компанії",
        description:
          "KickAI Judge - це інноваційна платформа, створена для революції в суддівстві кікбоксингу. Ми використовуємо передові технології комп'ютерного зору та штучного інтелекту для забезпечення максимальної об'єктивності та точності оцінювання поєдинків.",
      },
      cta: {
        title: "Готові розпочати?",
        subtitle: "Приєднуйтесь до тисяч суддів, які вже використовують KickAI Judge",
        button: "Спробувати безкоштовно",
      },
      footer: {
        description: "AI-асистент для об'єктивного суддівства в кікбоксингу",
        rights: "© 2025 KickAI Judge. Всі права захищені.",
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
      hero: {
        title: "AI Assistant for Kickboxing Judging",
        subtitle: "Revolutionary computer vision technology for objective and accurate match scoring",
        cta: "Start for free",
        demo: "Watch demo",
      },
      trust: {
        title: "Trusted by leading organizations",
        company: "Company",
        agency: "Agency",
        venture: "Venture",
        institute: "Institute",
        enterprise: "Enterprise",
        organization: "Organization",
      },
      features: {
        title: "Features",
        subtitle: "Explore our set of match analysis features",
        openAccount: "Open account",
        realTimeAnalysis: {
          title: "Real-time Analysis",
          description: "Instant analysis of technique, speed, and strike accuracy during the match",
        },
        detailedStatistics: {
          title: "Detailed Statistics",
          description: "Comprehensive data on strike count, effectiveness, and fighter activity",
        },
        videoRecording: {
          title: "Match Video Recording",
          description: "Automatic saving and analysis of video materials with replay capability",
        },
        objectiveScoring: {
          title: "Objective Scoring",
          description: "Neutral AI system eliminates subjectivity and human error",
        },
        multiAngleView: {
          title: "Multi-angle View",
          description: "Match analysis from multiple cameras for maximum scoring accuracy",
        },
        exportReports: {
          title: "Export Reports",
          description: "Detailed reports in PDF and Excel with full statistics, charts, and video clips",
        },
      },
      howItWorks: {
        title: "How does it work?",
        subtitle: "Why choose us",
        step1: {
          title: "Create account",
          description: "Register and get access to all platform features for match analysis",
          learnMore: "Learn more",
        },
        step2: {
          title: "Upload video",
          description: "Upload match recording or connect to live stream for analysis",
          learnMore: "Learn more",
        },
        step3: {
          title: "Get analysis",
          description: "Receive detailed statistics, recommendations, and video evidence in minutes",
          learnMore: "Learn more",
        },
        phoneScreen: {
          createAccount: "Create account",
          registerText: "Register and get access to all platform features for match analysis",
          email: "EMAIL",
          emailPlaceholder: "your@email.com",
          password: "PASSWORD",
          passwordPlaceholder: "••••••••",
          remember: "Remember",
          forgot: "Forgot password?",
          login: "Login",
          uploadVideo: "Upload video",
          uploadText: "Upload match recording or connect to live stream",
          dragDrop: "Drag video here or",
          browse: "browse",
          supported: "Supported: MP4, AVI, MOV (max 2GB)",
          selectFile: "Select file",
          getAnalysis: "Get analysis",
          analysisText: "Get detailed statistics and recommendations in minutes",
          analyzing: "Analyzing match...",
          fighter1: "Fighter 1",
          fighter2: "Fighter 2",
          strikes: "Strikes",
          accuracy: "Accuracy",
          activity: "Activity",
          aiRecommendation: "AI Recommendation",
          recommendation: "Fighter 1 showed higher activity and strike accuracy. Victory by points recommended.",
          viewReport: "View report",
        },
      },
      example: {
        title: "Usage Example",
        subtitle: "See how the analysis works",
        matchTitle: "Match: Ivan Petrenko vs Oleg Kovalenko",
        round: "Round 2 of 3",
        fighter1: "Ivan Petrenko",
        fighter2: "Oleg Kovalenko",
        strikes: "Strikes",
        accuracy: "Accuracy",
        activity: "Activity",
        aiInsights: "AI Insights",
        insight1: "Fighter 1 shows higher activity in the second round",
        insight2: "Fighter 2's strike accuracy decreased by 15%",
        insight3: "Fighter 1 victory by points recommended",
        tryYourVideo: "Try with your video",
        fullReport: "Full report",
        downloadExample: "Example",
      },
      pricing: {
        title: "Pricing",
        subtitle: "Choose the plan that suits you",
        monthly: "Monthly",
        yearly: "Yearly",
        free: {
          name: "Free",
          price: "0",
          period: "forever",
          description: "To get familiar with the platform",
          features: [
            "Up to 5 analyses per month",
            "Basic statistics",
            "Video recording up to 10 min",
            "PDF export",
            "Email support",
          ],
          cta: "Start for free",
        },
        monthly: {
          name: "Monthly",
          price: "29",
          period: "per month",
          description: "For judges and coaches",
          features: [
            "Unlimited analyses",
            "Full statistics",
            "Unlimited video recording",
            "PDF and Excel export",
            "Priority support",
            "Multi-angle view",
            "AI recommendations",
          ],
          cta: "Choose plan",
          popular: "Popular",
        },
        yearly: {
          name: "Yearly",
          price: "279",
          period: "per year",
          description: "Save 20% with annual payment",
          features: [
            "All monthly features",
            "20% discount",
            "Early access to new features",
            "Personal manager",
            "Training materials",
            "API access",
          ],
          cta: "Choose plan",
          save: "Save 20%",
        },
        moreDetails: "More about pricing",
      },
      mission: {
        label: "More about us",
        title: "Discover the mission and story behind our company",
        description:
          "KickAI Judge is an innovative platform created to revolutionize kickboxing judging. We use advanced computer vision and artificial intelligence technologies to ensure maximum objectivity and accuracy in match scoring.",
      },
      cta: {
        title: "Ready to get started?",
        subtitle: "Join thousands of judges already using KickAI Judge",
        button: "Try for free",
      },
      footer: {
        description: "AI assistant for objective kickboxing judging",
        rights: "© 2025 KickAI Judge. All rights reserved.",
      },
    },
  }

  const t = content[language]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">KickAI Judge</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.features}
              </a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.howItWorks}
              </a>
              <a href="#example" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.example}
              </a>
              <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.pricing}
              </a>
              <a href="#about" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.about}
              </a>
              <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">
                {t.nav.contact}
              </a>
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
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.features}
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.howItWorks}
              </a>
              <a
                href="#example"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.example}
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.pricing}
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.about}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors py-2"
              >
                {t.nav.contact}
              </a>
              <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-white text-black hover:bg-zinc-200 rounded-full">
                  {t.nav.tryFree}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/kickboxing-match-in-arena-with-dramatic-lighting.jpg"
            alt="Kickboxing match"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12 text-balance">{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full text-lg px-8">
                {t.hero.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 rounded-full text-lg px-8"
            >
              {t.hero.demo}
              <Play className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-zinc-500 text-sm mb-8">{t.trust.title}</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
            {[
              { icon: Target, label: t.trust.company },
              { icon: Users, label: t.trust.agency },
              { icon: Trophy, label: t.trust.venture },
              { icon: Building2, label: t.trust.institute },
              { icon: Briefcase, label: t.trust.enterprise },
              { icon: Globe, label: t.trust.organization },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-zinc-400">
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-zinc-500 text-sm mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t.features.title.toUpperCase()}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">{t.features.subtitle}</h2>
            </div>
            <Link href="/demo" className="hidden md:block">
              <Button className="bg-white text-black hover:bg-zinc-200 rounded-full">
                {t.features.openAccount}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Eye,
                title: t.features.realTimeAnalysis.title,
                description: t.features.realTimeAnalysis.description,
              },
              {
                icon: BarChart3,
                title: t.features.detailedStatistics.title,
                description: t.features.detailedStatistics.description,
              },
              {
                icon: Video,
                title: t.features.videoRecording.title,
                description: t.features.videoRecording.description,
              },
              {
                icon: Shield,
                title: t.features.objectiveScoring.title,
                description: t.features.objectiveScoring.description,
              },
              {
                icon: Target,
                title: t.features.multiAngleView.title,
                description: t.features.multiAngleView.description,
              },
              {
                icon: FileText,
                title: t.features.exportReports.title,
                description: t.features.exportReports.description,
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-zinc-900 border-zinc-800 p-8 hover:bg-zinc-800 transition-colors">
                <feature.icon className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-zinc-500 text-sm mb-2 flex items-center justify-center gap-2">
              <Target className="w-4 h-4" />
              {t.howItWorks.subtitle.toUpperCase()}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">{t.howItWorks.title}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Phone Mockup */}
            <div className="flex justify-center">
              <div className="relative w-[320px] h-[500px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />

                {/* Phone content */}
                <div className="h-full overflow-y-auto p-6 pt-10">
                  {/* Screen 0: Create Account */}
                  {activeStep === 0 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.howItWorks.phoneScreen.createAccount}</h3>
                        <p className="text-xs text-zinc-400">{t.howItWorks.phoneScreen.registerText}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-zinc-500 mb-1 block">{t.howItWorks.phoneScreen.email}</label>
                          <input
                            type="email"
                            placeholder={t.howItWorks.phoneScreen.emailPlaceholder}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-500 mb-1 block">
                            {t.howItWorks.phoneScreen.password}
                          </label>
                          <input
                            type="password"
                            placeholder={t.howItWorks.phoneScreen.passwordPlaceholder}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-zinc-400">{t.howItWorks.phoneScreen.remember}</span>
                          </label>
                          <a href="#" className="text-zinc-400 hover:text-white">
                            {t.howItWorks.phoneScreen.forgot}
                          </a>
                        </div>
                        <button className="w-full bg-white text-black rounded-lg py-2.5 font-semibold text-sm">
                          {t.howItWorks.phoneScreen.login}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Screen 1: Upload Video */}
                  {activeStep === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.howItWorks.phoneScreen.uploadVideo}</h3>
                        <p className="text-xs text-zinc-400">{t.howItWorks.phoneScreen.uploadText}</p>
                      </div>

                      <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center">
                        <Video className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                        <p className="text-sm text-zinc-400 mb-2">
                          {t.howItWorks.phoneScreen.dragDrop}{" "}
                          <span className="text-white underline">{t.howItWorks.phoneScreen.browse}</span>
                        </p>
                        <p className="text-xs text-zinc-600">{t.howItWorks.phoneScreen.supported}</p>
                      </div>

                      <button className="w-full bg-white text-black rounded-lg py-2.5 font-semibold text-sm">
                        {t.howItWorks.phoneScreen.selectFile}
                      </button>
                    </div>
                  )}

                  {/* Screen 2: Get Analysis */}
                  {activeStep === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.howItWorks.phoneScreen.getAnalysis}</h3>
                        <p className="text-xs text-zinc-400">{t.howItWorks.phoneScreen.analysisText}</p>
                      </div>

                      <div className="bg-zinc-800 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          {t.howItWorks.phoneScreen.analyzing}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>{t.howItWorks.phoneScreen.fighter1}</span>
                              <span className="text-zinc-400">156 {t.howItWorks.phoneScreen.strikes}</span>
                            </div>
                            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>{t.howItWorks.phoneScreen.fighter2}</span>
                              <span className="text-zinc-400">142 {t.howItWorks.phoneScreen.strikes}</span>
                            </div>
                            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full" style={{ width: "58%" }} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <div className="bg-zinc-900 rounded-lg p-2">
                              <p className="text-xs text-zinc-500">{t.howItWorks.phoneScreen.accuracy}</p>
                              <p className="text-lg font-bold">68%</p>
                            </div>
                            <div className="bg-zinc-900 rounded-lg p-2">
                              <p className="text-xs text-zinc-500">{t.howItWorks.phoneScreen.activity}</p>
                              <p className="text-lg font-bold">82%</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-zinc-900 rounded-lg p-3">
                          <p className="text-xs text-zinc-500 mb-1">{t.howItWorks.phoneScreen.aiRecommendation}</p>
                          <p className="text-xs">{t.howItWorks.phoneScreen.recommendation}</p>
                        </div>

                        <button className="w-full bg-white text-black rounded-lg py-2 font-semibold text-sm">
                          {t.howItWorks.phoneScreen.viewReport}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((step) => (
                    <button
                      key={step}
                      onClick={() => setActiveStep(step)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeStep === step ? "bg-white w-6" : "bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {[
                {
                  icon: UserPlus,
                  title: t.howItWorks.step1.title,
                  description: t.howItWorks.step1.description,
                  step: 0,
                },
                {
                  icon: Video,
                  title: t.howItWorks.step2.title,
                  description: t.howItWorks.step2.description,
                  step: 1,
                },
                {
                  icon: BarChart3,
                  title: t.howItWorks.step3.title,
                  description: t.howItWorks.step3.description,
                  step: 2,
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  onClick={() => setActiveStep(item.step)}
                  className={`p-6 cursor-pointer transition-all ${
                    activeStep === item.step
                      ? "bg-white text-black border-white"
                      : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        activeStep === item.step ? "bg-black text-white" : "bg-zinc-800 text-white"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className={activeStep === item.step ? "text-zinc-700" : "text-zinc-400"}>{item.description}</p>
                      <button
                        className={`mt-3 text-sm flex items-center gap-1 ${
                          activeStep === item.step ? "text-black" : "text-zinc-500"
                        }`}
                      >
                        {t.howItWorks.step1.learnMore}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section id="example" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-zinc-500 text-sm mb-2 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              {t.example.title.toUpperCase()}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">{t.example.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                <div className="aspect-video bg-zinc-800 relative">
                  <Image src="/kickboxing-match-action.jpg" alt="Match" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {t.example.matchTitle}
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    ● LIVE
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {t.example.round}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Video controls */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-black" />
                        ) : (
                          <Play className="w-5 h-5 text-black ml-0.5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-zinc-400 tabular-nums">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                      <button className="text-zinc-400 hover:text-white">
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button className="text-zinc-400 hover:text-white">
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/demo" className="flex-1 min-w-[200px]">
                      <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-full">
                        <Upload className="w-4 h-4 mr-2" />
                        {t.example.tryYourVideo}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 min-w-[140px] bg-zinc-800 border-zinc-700 hover:bg-zinc-700 rounded-full"
                    >
                      <FileBarChart className="w-4 h-4 mr-2" />
                      {t.example.fullReport}
                    </Button>
                    <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 rounded-full">
                      <Download className="w-4 h-4 mr-2" />
                      {t.example.downloadExample}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Statistics Panel */}
            <div className="space-y-6">
              <Card className="bg-zinc-900 border-zinc-800 p-6">
                <h3 className="text-lg font-semibold mb-4">{t.example.fighter1}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400">{t.example.strikes}</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400">{t.example.accuracy}</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "68%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400">{t.example.activity}</span>
                      <span className="font-semibold">82%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 p-6">
                <h3 className="text-lg font-semibold mb-4">{t.example.fighter2}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400">{t.example.strikes}</span>
                      <span className="font-semibold">142</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "71%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400">{t.example.accuracy}</span>
                      <span className="font-semibold">61%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "61%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400">{t.example.activity}</span>
                      <span className="font-semibold">75%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-700 p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t.example.aiInsights}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t.example.insight1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t.example.insight2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t.example.insight3}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-zinc-500 text-sm mb-2 flex items-center justify-center gap-2">
              <Briefcase className="w-4 h-4" />
              {t.pricing.title.toUpperCase()}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.pricing.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Free Plan */}
            <Card className="bg-zinc-900 border-zinc-800 p-8">
              <h3 className="text-2xl font-bold mb-2">{t.pricing.free.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${t.pricing.free.price}</span>
                <span className="text-zinc-400 ml-2">/ {t.pricing.free.period}</span>
              </div>
              <p className="text-zinc-400 mb-6">{t.pricing.free.description}</p>
              <ul className="space-y-3 mb-8">
                {t.pricing.free.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/demo">
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-full">
                  {t.pricing.free.cta}
                </Button>
              </Link>
            </Card>

            {/* Monthly Plan */}
            <Card className="bg-white text-black p-8 relative border-white">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">
                {t.pricing.monthly.popular}
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.pricing.monthly.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${t.pricing.monthly.price}</span>
                <span className="text-zinc-600 ml-2">/ {t.pricing.monthly.period}</span>
              </div>
              <p className="text-zinc-600 mb-6">{t.pricing.monthly.description}</p>
              <ul className="space-y-3 mb-8">
                {t.pricing.monthly.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/demo">
                <Button className="w-full bg-black hover:bg-zinc-800 text-white rounded-full">
                  {t.pricing.monthly.cta}
                </Button>
              </Link>
            </Card>

            {/* Yearly Plan */}
            <Card className="bg-zinc-900 border-zinc-800 p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {t.pricing.yearly.save}
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.pricing.yearly.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${t.pricing.yearly.price}</span>
                <span className="text-zinc-400 ml-2">/ {t.pricing.yearly.period}</span>
              </div>
              <p className="text-zinc-400 mb-6">{t.pricing.yearly.description}</p>
              <ul className="space-y-3 mb-8">
                {t.pricing.yearly.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/demo">
                <Button className="w-full bg-white hover:bg-zinc-200 text-black rounded-full">
                  {t.pricing.yearly.cta}
                </Button>
              </Link>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/pricing">
              <Button variant="outline" className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 rounded-full">
                {t.pricing.moreDetails}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-zinc-500 text-sm mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {t.mission.label.toUpperCase()}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t.mission.title}</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">{t.mission.description}</p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image src="/kickboxing-match-action.jpg" alt="About us" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{t.cta.title}</h2>
          <p className="text-xl text-zinc-400 mb-12">{t.cta.subtitle}</p>
          <Link href="/demo">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full text-lg px-12">
              {t.cta.button}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-xl font-bold">KickAI Judge</div>
                <div className="text-sm text-zinc-500">{t.footer.description}</div>
              </div>
            </div>
            <div className="text-sm text-zinc-500">{t.footer.rights}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
