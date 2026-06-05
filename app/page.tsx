"use client";

import React, { useState, useRef } from "react";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<"qris" | "transfer">("qris");
  const [copied, setCopied] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef1 = useRef<HTMLDivElement>(null);
  const bgRef2 = useRef<HTMLDivElement>(null);

  const bankDetails = {
    name: "YANUAR ARDHIKA",
    bank: "Bank Mandiri",
    number: "1430026836864",
  };

  // GSAP Entrance & Interactions
  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset initial states for GSAP
    gsap.set([bgRef1.current, bgRef2.current], { opacity: 0, scale: 0 });
    gsap.set(cardRef.current, { opacity: 0, y: 100, rotateX: -20 });

    tl.to([bgRef1.current, bgRef2.current], {
      opacity: 1,
      scale: 1,
      duration: 2,
      stagger: 0.5,
      ease: "elastic.out(1, 0.8)",
    })
    .to(cardRef.current, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.5,
      ease: "expo.out",
    }, "-=1.5");

    // Mouse movement parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(cardRef.current, {
        rotationY: xPos,
        rotationX: -yPos,
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(bgRef1.current, {
        x: xPos * 2,
        y: yPos * 2,
        duration: 2,
        ease: "power1.out",
      });

      gsap.to(bgRef2.current, {
        x: -xPos * 3,
        y: -yPos * 3,
        duration: 2,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

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
    <main 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-black text-white font-sans selection:bg-red-500/30"
      style={{ perspective: "1000px" }}
    >
      {/* Background Decorative Elements */}
      <div 
        ref={bgRef1}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full" 
      />
      <div 
        ref={bgRef2}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-900/10 blur-[120px] rounded-full" 
      />
      
      {/* Main Glassmorphism Card */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-[25rem] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Header - Compact but bold */}
        <div className="pt-8 pb-4 px-8 text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 mb-4 shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)] cursor-pointer"
          >
            <Wallet className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl text-white font-bold mb-1">
            Pembayaran
          </h1>
          <p className="text-white/60 text-sm">Pilih metode pembayaran yang kamu inginkan</p>
        </div>

        {/* Tabs - Optimized Spacing */}
        <div className="flex p-1.5 gap-1.5 mx-8 mb-5 bg-black/40 rounded-[1.5rem] border border-white/5 relative">
          {(["qris", "transfer"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 relative flex items-center justify-center gap-2 py-3 rounded-2xl transition-colors duration-500 z-10 ${
                activeTab === tab ? "text-white" : "text-white/20 hover:text-white/40"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-20 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                {tab === "qris" ? <QrCode className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area - Proportional Height */}
        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">
            {activeTab === "qris" ? (
              <motion.div
                key="qris"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative group p-4 bg-white rounded-[2.5rem] mb-6 shadow-2xl"
                >
                  <div className="absolute inset-0 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-60 overflow-hidden rounded-xl">
                    <Image
                      src="/assets/qris-payment.jpeg"
                      alt="QRIS Payment"
                      width={240}
                      height={340}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </motion.div>
                
                <div className="w-full space-y-4">
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={downloadQRIS}
                    className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-4.5 rounded-2xl transition-all shadow-lg"
                  >
                    <Download className="w-5 h-5 text-red-500" />
                    <span className="font-black text-[11px] uppercase tracking-widest">Simpan QR Code</span>
                  </motion.button>
                  <p className="text-center text-[9px] text-white/20 px-6 leading-relaxed font-bold uppercase tracking-tight">
                    Scan QRIS di atas untuk membayar
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="transfer"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-gradient-to-br from-red-600/20 via-black/40 to-black/60 border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-xl"
                >
                   <div className="absolute top-0 right-0 p-7 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                     <Image 
                       src="/assets/logo-mandiri.svg" 
                       alt="Mandiri" 
                       width={90} 
                       height={35} 
                       className="brightness-0 invert"
                     />
                   </div>
                   
                   <div className="relative z-10">
                     <p className="text-red-500 text-[9px] uppercase tracking-[0.4em] mb-4 font-black">Transfer Bank</p>
                     <div className="flex items-center justify-between group/number cursor-pointer" onClick={copyToClipboard}>
                        <div>
                          <p className="text-lg font-mono tracking-[0.1em] mb-1.5 text-white/90">14300 26836 864</p>
                          <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">YANUAR ARDHIKA</p>
                        </div>
                        <motion.div 
                          animate={copied ? { scale: [1, 1.25, 1] } : {}}
                          className={`p-2.5 rounded-2xl transition-all duration-500 ${copied ? 'bg-green-500 text-white shadow-lg' : 'bg-white/5 text-white/20 group-hover/number:bg-white/10'}`}
                        >
                          {copied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-5 h-5" />}
                        </motion.div>
                     </div>
                   </div>
                </motion.div>

                <div className="p-4 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center gap-4.5">
                  <div className="w-11 h-11 rounded-2xl bg-red-600/10 flex items-center justify-center shrink-0 border border-red-600/20 shadow-inner">
                    <ShieldCheck className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest mb-1">Verifikasi Instan</p>
                    <p className="text-[9px] text-white/20 leading-tight font-bold uppercase">Konfirmasi otomatis setelah transfer.</p>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -2, boxShadow: "0 20px 40px -10px rgba(220,38,38,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 py-4.5 rounded-2xl transition-all shadow-xl"
                >
                  <span className="font-black text-xs uppercase tracking-[0.2em]">{copied ? "Berhasil Disalin!" : "Salin Rekening"}</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* GSAP Managed Background Dots */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '50px 50px' }} />
    </main>
  );
}

