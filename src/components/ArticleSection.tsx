import React from "react";
import { ShieldCheck, EyeOff, Mail, Globe, Zap } from "lucide-react";

export default function ArticleSection() {
  return (
    <article className="prose prose-slate max-w-none bg-white rounded-xl p-8 lg:p-12 shadow-sm border border-slate-200">
      <header className="mb-12 text-right">
        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">دليل المستخدم</span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 mb-4 font-['Cairo'] tracking-tight">
          لماذا يجب عليك استخدام الأرقام الوهمية والبريد المؤقت؟
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          دليلك الشامل لحماية خصوصيتك الرقمية وتجنب الرسائل المزعجة في عام 2026.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-b border-slate-100 pb-12">
        <div className="flex gap-4">
          <div className="shrink-0 w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-slate-800">حماية الخصوصية</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              عند التسجيل في مواقع جديدة، غالباً ما يتم طلب رقم هاتفك أو بريدك. استخدام وسيلة "وهمية" يمنع هذه المواقع من تتبع هويتك الحقيقية.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0 w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
            <EyeOff size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-slate-800">تجنب الرسائل المزعجة</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              تخلص من سيل الرسائل الترويجية التي تملأ صندوق بريدك الشخصي. بمجرد انتهاء حاجتك، يمكنك حذف الرقم أو البريد المؤقت فوراً.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0 w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-slate-800">تجاوز قيود التحقق</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              بعض الخدمات تفرض قيوداً حسب الموقع الجغرافي. استخدام أرقام من دول مختلفة يتيح لك الوصول لخدمات عالمية بسهولة.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0 w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
            <Globe size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-slate-800">سهولة الوصول</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              لا حاجة لشراء بطاقات SIM حقيقية أو دفع مبالغ طائلة. كل ما تحتاجه متاح هنا بضغطة زر واحدة ومجاناً.
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-8 text-slate-700 text-right">
        <h2 className="text-2xl font-bold text-slate-900 border-r-4 border-primary pr-4 font-['Cairo']">كيف تعمل التقنية؟</h2>
        <div className="space-y-4">
          <p>
            تعتمد التقنية التي يقدمها موقعنا على ربط المستخدمين بخوادم سحابية توفر أرقام هواتف نشطة لاستقبال الرسائل القصيرة. يتم عرض هذه الرسائل في واجهة الموقع بشكل فوري بمجرد إرسالها من قبل المواقع مثل (فيسبوك، جوجل، واتساب، تليجرام).
          </p>
          <p>
            أما بالنسبة للبريد المؤقت، فنحن نستخدم بروتوكولات API متقدمة تتيح لك امتلاك صندوق بريد فعّال لمدة محددة. يمكنك استلام الروابط والملفات وحتى الصور دون الكشف عن عنوانك البريدي الأساسي.
          </p>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 italic text-slate-600 text-sm border-r-4 border-indigo-200">
          "في عصر البيانات الضخمة، خصوصيتك هي أغلى ما تملك. المواقع الاحترافية توفر لك خط الدفاع الأول ضد المتسللين والشركات التي تبيع بياناتك."
        </div>

        <h2 className="text-2xl font-bold text-slate-900 border-r-4 border-primary pr-4 font-['Cairo'] tracking-tight">نصائح الأمان والخصوصية</h2>
        <ul className="list-disc pr-6 space-y-3 text-sm">
          <li>لا تستخدم الأرقام الوهمية للحسابات البنكية أو الحسابات المالية شديدة الأهمية.</li>
          <li>استخدم البريد المؤقت للتحميل المباشر أو تجربة الخدمات الجديدة التي لا تثق بها تماماً.</li>
          <li>تذكر أن هذه الأرقام عامة، لذا لا ترسل إليها بيانات سرية للغاية أو معلومات تسجيل دخول حساسة.</li>
          <li>قم بتحديث الصفحة باستمرار أو انتظر التحديث التلقائي لرؤية أحدث الرسائل الواردة.</li>
        </ul>
      </div>
    </article>
  );
}
