import React, { useState, useEffect } from "react";
import axios from "axios";
import { Phone, MessageSquare, RefreshCw, Copy, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SMSNumber, SMSMessage } from "../types";
import { cn } from "../lib/utils";

export default function SMSSection() {
  const [numbers, setNumbers] = useState<SMSNumber[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<SMSNumber | null>(null);
  const [messages, setMessages] = useState<SMSMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/sms/numbers");
      setNumbers(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "فشل تحميل الأرقام من السيرفر");
      // Fallback/Mock data
      setNumbers([
        { id: "1", number: "+1234567890", country: "United States", countryCode: "US", updatedAt: "الآن" },
        { id: "2", number: "+44123456789", country: "United Kingdom", countryCode: "GB", updatedAt: "منذ دقيقة" },
        { id: "3", number: "+33123456789", country: "France", countryCode: "FR", updatedAt: "منذ 5 دقائق" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (num: string) => {
    setLoadingMessages(true);
    setError(null);
    try {
      const res = await axios.get(`/api/sms/messages/${num}`);
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      console.error(err);
      setError("فشل تحديث الرسائل لهذا الرقم");
      setMessages([
        { id: "m1", from: "Google", text: "كود التحقق الخاص بك هو 123456", added: "منذ ثانيتين" },
        { id: "m2", from: "WhatsApp", text: "لا تشارك كود واتساب الخاص بك مع أحد: 987-654", added: "منذ دقيقة" },
      ]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3">
        <Info className="text-indigo-600 shrink-0" size={20} />
        <p className="text-sm text-indigo-800 leading-relaxed">
          اختر رقماً من القائمة بالأسفل لاستخدامه في استقبال رسائل التحقق (SMS) من المواقع والتطبيقات. يتم تحديث الرسائل تلقائياً.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Numbers List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2 text-slate-800 uppercase tracking-wider text-xs">
              <Phone size={14} className="text-primary" />
              الأرقام المتاحة
            </h3>
            <button 
              onClick={fetchNumbers} 
              className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              disabled={loading}
            >
              <RefreshCw size={14} className={cn(loading && "animate-spin")} />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-[10px] text-red-600 font-bold mb-2">
              {error}
            </div>
          )}

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-xl" />)
            ) : (
              numbers.map((num) => (
                <button
                  key={num.id}
                  onClick={() => {
                    setSelectedNumber(num);
                    fetchMessages(num.number);
                  }}
                  className={cn(
                    "w-full text-right p-4 rounded-xl border transition-all duration-200 group flex flex-col items-start gap-1",
                    selectedNumber?.id === num.id 
                      ? "bg-indigo-50 border-indigo-200 shadow-sm ring-1 ring-indigo-200" 
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  )}
                >
                  <div className="w-full flex justify-between items-center" dir="ltr">
                    <span className={cn(
                      "text-lg font-mono font-bold tracking-wider",
                      selectedNumber?.id === num.id ? "text-indigo-700" : "text-slate-800"
                    )}>{num.number}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase tracking-tight">
                      {num.countryCode}
                    </span>
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <span className="text-xs text-slate-500">{num.country}</span>
                    <span className="text-[10px] text-slate-400 italic">{num.updatedAt}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message View */}
        <div className="lg:col-span-2 space-y-4">
          {selectedNumber ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl shadow-sm min-h-[400px] flex flex-col overflow-hidden"
            >
              <div className="px-6 py-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                <div>
                  <p className="text-xs text-slate-500 mb-1">الرقم الحالي:</p>
                  <h2 className="text-2xl font-bold font-mono tracking-widest text-slate-800" dir="ltr">{selectedNumber.number}</h2>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => copyToClipboard(selectedNumber.number)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-semibold shadow-sm"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "تم النسخ" : "نسخ الرقم"}
                  </button>
                  <button 
                    onClick={() => fetchMessages(selectedNumber.number)}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold shadow-xs"
                    disabled={loadingMessages}
                  >
                    <RefreshCw size={16} className={cn(loadingMessages && "animate-spin")} />
                    تحديث
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <div className="overflow-x-auto">
                   <table className="w-full text-right">
                     <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">المرسل</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">الرسالة</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الوقت</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        <AnimatePresence mode="popLayout">
                          {loadingMessages ? (
                            [1, 2].map(i => (
                              <tr key={i} className="animate-pulse">
                                <td className="px-6 py-4"><div className="h-4 w-20 bg-slate-100 rounded" /></td>
                                <td className="px-6 py-4"><div className="h-4 w-full bg-slate-100 rounded" /></td>
                                <td className="px-6 py-4"><div className="h-4 w-12 bg-slate-100 rounded" /></td>
                              </tr>
                            ))
                          ) : messages.length > 0 ? (
                            messages.map((msg) => (
                              <motion.tr
                                key={msg.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-slate-50/50 transition-colors group cursor-default"
                              >
                                <td className="px-6 py-4">
                                  <span className="font-bold text-slate-800 text-sm">{msg.from}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <p className="text-slate-600 text-sm font-medium">{msg.text}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-[10px] text-slate-400 italic whitespace-nowrap">{msg.added}</span>
                                </td>
                              </motion.tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="px-6 py-20 text-center text-slate-400 italic text-sm">
                                <div className="flex flex-col items-center justify-center">
                                   <MessageSquare size={48} strokeWidth={1} className="mb-4 opacity-10" />
                                   في انتظار وصول رسائل جديدة...
                                </div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                     </tbody>
                   </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400">
              <Phone size={64} strokeWidth={1} className="mb-4 opacity-10" />
              <p className="text-lg font-bold text-slate-500">الرجاء اختيار رقم للبدء</p>
              <p className="text-xs mt-1">اضغط على أي رقم من القائمة الجانبية لرؤية الرسائل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
