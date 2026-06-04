"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  QrCode, 
  CreditCard, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck,
  Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<"qris" | "transfer">("qris");
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    name: "YANUAR ARDHIKA",
    bank: "Bank Mandiri",
    number: "1430026836864",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bankDetails.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQRIS = () => {
    const link = document.createElement("a");
    link.href = "/assets/qris-payment.jpeg";
    link.download = "qris-payment.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-black text-white font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 blur-[120px] rounded-full" />
      
      {/* Main Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 pb-4 text-center">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 mb-4 shadow-lg shadow-red-600/20"
          >
            <Wallet className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Checkout</h1>
          <p className="text-white/60 text-sm">Pilih metode pembayaran yang kamu inginkan</p>
        </div>

        {/* Tabs */}
        <div className="flex p-2 gap-2 mx-6 mb-6 bg-black/40 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab("qris")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "qris" 
                ? "bg-red-600 text-white shadow-lg" 
                : "hover:bg-white/5 text-white/50"
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span className="text-sm font-semibold">QRIS</span>
          </button>
          <button
            onClick={() => setActiveTab("transfer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "transfer" 
                ? "bg-red-600 text-white shadow-lg" 
                : "hover:bg-white/5 text-white/50"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span className="text-sm font-semibold">Transfer</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">
            {activeTab === "qris" ? (
              <motion.div
                key="qris"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col items-center"
              >
                <div className="relative group p-4 bg-white rounded-3xl mb-6 shadow-2xl">
                  <div className="absolute inset-0 bg-red-600/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-64 h-64 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src="/assets/qris-payment.jpeg"
                      alt="QRIS Payment"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                
                <div className="w-full space-y-3">
                  <button 
                    onClick={downloadQRIS}
                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 py-4 rounded-2xl transition-all active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-sm">Download QR Code</span>
                  </button>
                  <p className="text-center text-xs text-white/40 px-4">
                    Scan menggunakan aplikasi m-banking atau e-wallet favoritmu
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="transfer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-red-600/20 to-black border border-red-500/20 p-6 rounded-3xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4">
                     <Image 
                       src="/assets/logo-mandiri.svg" 
                       alt="Mandiri" 
                       width={80} 
                       height={30} 
                       className="opacity-80 brightness-0 invert"
                     />
                   </div>
                   
                   <div className="relative z-10">
                     <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-bold">Bank Mandiri</p>
                     <div className="flex items-center justify-between group/number cursor-pointer" onClick={copyToClipboard}>
                        <div>
                          <p className="text-2xl font-mono tracking-wider mb-1">14300 26836 864</p>
                          <p className="text-white/80 font-medium">YANUAR ARDHIKA</p>
                        </div>
                        <div className={`p-2 rounded-lg transition-colors ${copied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40 group-hover/number:text-white'}`}>
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </div>
                     </div>
                   </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Verifikasi Otomatis</p>
                      <p className="text-xs text-white/40 leading-relaxed">Pastikan nama pengirim sesuai dengan yang terdaftar untuk proses lebih cepat.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-4 rounded-2xl transition-all shadow-lg shadow-red-600/20 active:scale-[0.98]"
                >
                  <span className="font-semibold text-sm">{copied ? "Berhasil Disalin!" : "Salin Nomor Rekening"}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Secure Payment Gateway</p>
        </div>
      </motion.div>

      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff11 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    </main>
  );
}
