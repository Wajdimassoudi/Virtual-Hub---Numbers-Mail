import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, RefreshCw, Copy, Check, Trash2, MailOpen, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MailAccount, MailMessage } from "../types";
import { cn } from "../lib/utils";

const API_BASE = "https://api.mail.tm";

export default function MailSection() {
  const [account, setAccount] = useState<MailAccount | null>(null);
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MailMessage | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("temp_mail_account");
    if (saved) {
      setAccount(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (account) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 10000); // Polling every 10s
      return () => clearInterval(interval);
    }
  }, [account]);

  const generateAccount = async () => {
    setLoading(true);
    try {
      const domainsRes = await axios.get(`${API_BASE}/domains`);
      const domain = domainsRes.data["hydra:member"][0].domain;
      const randomId = Math.random().toString(36).substring(7);
      const address = `${randomId}@${domain}`;
      const password = "password123";

      await axios.post(`${API_BASE}/accounts`, { address, password });
      const tokenRes = await axios.post(`${API_BASE}/token`, { address, password });
      
      const newAccount = { id: tokenRes.data.id, address, token: tokenRes.data.token };
      setAccount(newAccount);
      localStorage.setItem("temp_mail_account", JSON.stringify(newAccount));
    } catch (err) {
      console.error("Mail Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!account) return;
    setLoadingMessages(true);
    try {
      const res = await axios.get(`${API_BASE}/messages`, {
        headers: { Authorization: `Bearer ${account.token}` }
      });
      setMessages(res.data["hydra:member"]);
    } catch (err) {
      console.error("Fetch Messages Error:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const deleteAccount = () => {
    localStorage.removeItem("temp_mail_account");
    setAccount(null);
    setMessages([]);
    setSelectedMessage(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {!account ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mb-2">
            <Mail size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">احصل على بريد إلكتروني مؤقت</h2>
          <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
            احمي بريدك الشخصي من الرسائل المزعجة. استخدم بريداً مؤقتاً للتسجيل في المواقع التي لا تثق بها.
          </p>
          <button 
            onClick={generateAccount}
            className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
            disabled={loading}
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Mail />}
            إنشاء بريد جديد
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Details & Controls */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-xs uppercase tracking-wider text-slate-400">
                <Mail size={14} className="text-primary" />
                بريدك الحالي
              </h3>
              
              <div 
                className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4 cursor-pointer hover:bg-slate-100 transition-colors group"
                onClick={() => copyToClipboard(account.address)}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm font-mono truncate select-all text-slate-700" dir="ltr">{account.address}</span>
                  {copied ? <Check size={16} className="text-green-500 flex-shrink-0" /> : <Copy size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={fetchMessages}
                  className="flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-xs font-bold text-slate-700"
                  disabled={loadingMessages}
                >
                  <RefreshCw size={14} className={cn(loadingMessages && "animate-spin")} />
                  تحديث
                </button>
                <button 
                  onClick={deleteAccount}
                  className="flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-bold"
                >
                  <Trash2 size={14} />
                  حذف البريد
                </button>
              </div>
            </div>

            <div className="bg-indigo-600 p-6 rounded-xl text-white shadow-lg overflow-hidden relative group">
              <div className="relative z-10">
                <h4 className="font-bold mb-1 text-sm">حماية الخصوصية القصوى</h4>
                <p className="text-[11px] text-indigo-50 leading-relaxed opacity-90">
                  سيتم حذف البريد وجميع رسائله بمجرد الضغط على حذف. تأكد من حفظ بياناتك الهامة قبل المغادرة.
                </p>
              </div>
              <Mail className="absolute -bottom-4 -left-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          {/* Messages List Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm min-h-[400px] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold flex items-center gap-2 text-slate-700">
                  <MailOpen size={18} className="text-primary" />
                  صندوق الوارد ({messages.length})
                </h3>
                <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg uppercase tracking-wide">متصل الآن</span>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                {messages.length > 0 ? (
                  <div className="divide-y divide-slate-50">
                    {messages.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={cn(
                          "w-full text-right p-5 transition-colors flex flex-col gap-1 hover:bg-slate-50/80",
                          selectedMessage?.id === msg.id ? "bg-indigo-50/50" : ""
                        )}
                      >
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-slate-900">{msg.from.name || msg.from.address}</span>
                          <span className="text-slate-400 italic">{new Date(msg.createdAt).toLocaleTimeString('ar-EG')}</span>
                        </div>
                        <div className="text-sm font-bold text-slate-800 line-clamp-1">{msg.subject}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 opacity-80">{msg.intro}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Mail size={48} strokeWidth={1} className="mb-4 opacity-10" />
                    </motion.div>
                    <p className="font-bold text-slate-500 text-sm">بانتظار وصول رسائل جديدة...</p>
                    <p className="text-[11px] mt-1">سيتم عرض الرسائل هنا فور وصولها</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal View */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/30">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedMessage.subject}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    من: <span className="font-bold text-slate-700">{selectedMessage.from.name}</span> &lt;{selectedMessage.from.address}&gt;
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto flex-1 text-right">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">{selectedMessage.intro}</p>
                <div className="mt-10 p-4 bg-amber-50 border border-amber-100 rounded-lg text-[11px] text-amber-800 flex gap-2">
                  <Info size={14} className="shrink-0" />
                  للمعاينة الكاملة (HTML)، يرجى استخدام واجهة Mail.tm الرسمية. هنا يتم عرض الملخص فقط.
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 text-center bg-slate-50/30">
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="px-8 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-sm"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
