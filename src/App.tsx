import React, { useState } from "react";
import { Phone, Mail, FileText, Info, Shield, Globe, Github } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SMSSection from "./components/SMSSection";
import MailSection from "./components/MailSection";
import ArticleSection from "./components/ArticleSection";
import { AdPlaceholder } from "./components/AdPlaceholder";
import { cn } from "./lib/utils";

type Tab = "sms" | "mail" | "articles";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("sms");

  const tabs = [
    { id: "sms", label: "أرقام وهمية", icon: Phone },
    { id: "mail", label: "بريد مؤقت", icon: Mail },
    { id: "articles", label: "مقالات و SEO", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              V
            </div>
            <div>
              <h1 className="text-xl font-bold font-['Cairo'] tracking-tight text-slate-800">المركز الافتراضي</h1>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "relative py-5 transition-colors hover:text-primary",
                  activeTab === tab.id 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                    : "text-slate-600"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-md transition-colors">دخول</button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:opacity-90 rounded-md shadow-sm transition-all">ابدأ الآن</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Top Ad */}
        <AdPlaceholder className="mb-8" slot="top_banner" />

        {/* Tab Navigation for Mobile */}
        <div className="md:hidden flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all shrink-0",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "bg-white text-gray-500 border border-gray-100"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <section className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "sms" && (
              <motion.div
                key="sms-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SMSSection />
              </motion.div>
            )}
            {activeTab === "mail" && (
              <motion.div
                key="mail-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MailSection />
              </motion.div>
            )}
            {activeTab === "articles" && (
              <motion.div
                key="article-section"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ArticleSection />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Middle Ad */}
        <AdPlaceholder className="my-12" slot="middle_content" />

        {/* Info Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Zap size={24} />
             </div>
             <h4 className="font-bold text-lg mb-2 text-slate-800">سرعة فائقة</h4>
             <p className="text-slate-500 text-sm leading-relaxed">استلم كود التفعيل في ثوانٍ معدودة. أنظمةنا تعمل على مزامنة الرسائل لحظياً.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
             <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Shield size={24} />
             </div>
             <h4 className="font-bold text-lg mb-2 text-slate-800">أمان كامل</h4>
             <p className="text-slate-500 text-sm leading-relaxed">لا نقوم بتخزين أي بيانات شخصية. خدمتنا مجهولة بالكامل لحماية هويتك الرقمية.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
             <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Globe size={24} />
             </div>
             <h4 className="font-bold text-lg mb-2 text-slate-800">عالمي دائماً</h4>
             <p className="text-slate-500 text-sm leading-relaxed">أرقام من أكثر من 50 دولة حول العالم لتناسب جميع احتياجات التفعيل الخاصة بك.</p>
          </div>
        </section>

        {/* SEO Article if not on article tab */}
        {activeTab !== "articles" && (
           <div className="mt-12 pt-12 border-t border-slate-200">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold font-['Cairo'] text-slate-800">تعرف أكثر على خدماتنا</h3>
                <button onClick={() => setActiveTab('articles')} className="text-primary font-bold text-sm hover:underline">عرض كل المقالات</button>
             </div>
             <ArticleSection />
           </div>
        )}

        {/* Bottom Ad */}
        <AdPlaceholder className="mt-12" slot="bottom_footer" />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">V</div>
                <h2 className="text-2xl font-bold font-['Cairo'] tracking-tight">Virtual Hub</h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                أفضل منصة للحصول على أرقام هواتف وهمية مجانية لاستقبال الرسائل وتفعيل الحسابات، بالإضافة إلى خدمة البريد الإلكتروني المؤقت لحماية خصوصيتك.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-slate-200 uppercase tracking-wider text-xs">خدماتنا</h5>
              <ul className="space-y-4 text-sm text-slate-400">
                 <li><button onClick={() => setActiveTab('sms')} className="hover:text-white transition-colors">أرقام وهمية</button></li>
                 <li><button onClick={() => setActiveTab('mail')} className="hover:text-white transition-colors">بريد مؤقت</button></li>
                 <li><a href="#" className="hover:text-white transition-colors">دعم الأرقام</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">قائمة الدول</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-slate-200 uppercase tracking-wider text-xs">قانوني</h5>
              <ul className="space-y-4 text-sm text-slate-400">
                 <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 المركز الافتراضي (Virtual Hub). جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <span>صنع بكل ❤️ لحماية خصوصيتك</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
