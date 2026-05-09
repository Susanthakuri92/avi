'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GitBranch, Mail, Camera, ArrowDown, ChevronLeft, ChevronRight, X } from 'lucide-react';

const portfolioImages = [
  { title: "Urban Exploration", category: "Street", image: "https://images.unsplash.com/photo-1449824913935-59597967a563?auto=format&fit=crop&q=80&w=800", aspect: "tall" },
  { title: "Mountain Peaks", category: "Nature", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", aspect: "wide" },
  { title: "Neon Nights", category: "Cyberpunk", image: "https://images.unsplash.com/photo-1519608487953-e999753a6775?auto=format&fit=crop&q=80&w=800", aspect: "square" },
  { title: "Ocean Deep", category: "Water", image: "https://images.unsplash.com/photo-1505118380757-91f5f563209a?auto=format&fit=crop&q=80&w=800", aspect: "tall" },
  { title: "Forest Whispers", category: "Nature", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800", aspect: "square" },
  { title: "City Lights", category: "Architecture", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800", aspect: "wide" },
];

function AnimatedText({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`inline-block overflow-hidden ${className}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span className="inline-block">{children}</span>
    </span>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
      <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">Scroll</span>
      <ArrowDown size={16} className="text-zinc-500" />
    </div>
  );
}

export default function Page() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? portfolioImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === portfolioImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedImage]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-amber-500/30 selection:text-white overflow-x-hidden">
      {/* Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'py-4 px-6 md:px-8 bg-black/60 backdrop-blur-2xl border-b border-white/[0.03]'
          : 'py-8 px-6 md:px-12 bg-transparent'
      }`}>
        <div className="flex items-center justify-between">
          <a href="#" className="relative group">
            <span className="text-sm md:text-base font-medium tracking-[0.3em] text-white/90 group-hover:text-white transition-colors duration-300">
              AC
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500/0 group-hover:bg-amber-500/50 transition-all duration-500" />
          </a>

          <div className="hidden md:flex items-center gap-12">
            <a href="#work" className="text-[11px] font-normal tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors duration-300">
              Work
            </a>
            <a href="#contact" className="text-[11px] font-normal tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors duration-300">
              Contact
            </a>
            <a
              href="https://www.instagram.com/mr_avi_12/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className="text-[11px] font-normal tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                Instagram
              </span>
              <span className="block max-w-0 h-[1px] bg-white/30 group-hover:max-w-full transition-all duration-500 mt-1" />
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
          >
            <span className={`absolute w-5 h-[1px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : '-translate-y-[7px]'}`} />
            <span className={`absolute w-5 h-[1px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute w-5 h-[1px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : 'translate-y-[7px]'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-90' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute inset-0 backdrop-blur-2xl transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className={`relative h-full flex flex-col items-center justify-center gap-10 transition-all duration-700 delay-150 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <a
            href="#work"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl font-extralight tracking-[0.2em] text-white/80 hover:text-white transition-colors"
          >
            Work
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl font-extralight tracking-[0.2em] text-white/80 hover:text-white transition-colors"
          >
            Contact
          </a>
          <a
            href="https://www.instagram.com/mr_avi_12/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 text-sm tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors"
          >
            @mr_avi_12
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 z-10" />
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-br from-amber-900/10 via-transparent to-transparent blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-zinc-800/20 via-transparent to-transparent blur-[80px]" />
        </div>

        <div className="relative z-20 text-center px-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <AnimatedText delay={200} className="block mb-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500/80">Visual Storyteller</span>
            </AnimatedText>
          </div>

          <h1 className="text-7xl md:text-[8rem] font-bold tracking-tight leading-[0.9] mb-8">
            <AnimatedText delay={400}>
              <span className="block text-white">AVI</span>
            </AnimatedText>
            <AnimatedText delay={500}>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400">CHETRI</span>
            </AnimatedText>
          </h1>

          <AnimatedText delay={700}>
            <p className="text-lg md:text-xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed mb-12">
              Capturing the ephemeral — where light meets shadow, and moments become eternal through the lens.
            </p>
          </AnimatedText>

          <AnimatedText delay={900}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="#work"
                className="group relative px-8 py-4 bg-white text-black font-medium tracking-wide overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10">View Portfolio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
              <a
                href="https://www.instagram.com/mr_avi_12/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 text-zinc-400 hover:text-white transition-colors duration-300"
              >
                <Camera size={20} className="opacity-60" />
                <span className="text-sm font-medium tracking-wide">@mr_avi_12</span>
              </a>
            </div>
          </AnimatedText>
        </div>

        <ScrollIndicator />
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-end justify-between mb-20">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500/80 block mb-4">Portfolio</span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                SELECTED<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">WORKS</span>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-4 text-zinc-600">
              <span className="text-xs tracking-[0.2em] uppercase">2023 — Present</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioImages.map((img, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                className={`group relative overflow-hidden bg-zinc-900 cursor-pointer ${
                  img.aspect === 'tall' ? 'aspect-[3/4]' :
                  img.aspect === 'wide' ? 'aspect-[4/3]' :
                  'aspect-square'
                } ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${i === 3 ? 'lg:col-span-2' : ''}`}
              >
                <Image
                  src={img.image}
                  alt={`${img.title} - ${img.category}`}
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                    loadedImages.has(i) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(i)}
                />

                {!loadedImages.has(i) && (
                  <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500" />

                <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500/80 mb-2 block">{img.category}</span>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 py-16 border-t border-b border-zinc-800/50 flex flex-col items-center text-center">
            <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-600 mb-4 block">Stay Updated</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Follow the Journey</h3>
            <p className="text-zinc-500 mb-8 max-w-md">Behind the scenes, upcoming projects, and daily captures — all on Instagram.</p>
            <a
              href="https://www.instagram.com/mr_avi_12/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-medium tracking-wide rounded-full hover:scale-105 transition-transform duration-300"
            >
              <Camera size={20} />
              <span>@mr_avi_12</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 z-10"
          >
            <X size={24} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={portfolioImages[selectedImage].image}
              alt={`${portfolioImages[selectedImage].title} - ${portfolioImages[selectedImage].category}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500/80 mb-2 block">{portfolioImages[selectedImage].category}</span>
              <h3 className="text-2xl font-semibold text-white tracking-tight">{portfolioImages[selectedImage].title}</h3>
              <span className="text-zinc-500 text-sm mt-2 block">{selectedImage + 1} / {portfolioImages.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Contact/Footer */}
      <footer id="contact" className="py-32 px-8 border-t border-zinc-900/50">
        <div className="max-w-[1800px] mx-auto text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500/80 block mb-6">Get in Touch</span>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[0.9]">
            LET&apos;S<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">CREATE</span>
          </h2>
          <p className="text-zinc-500 mb-12 text-lg">Open for collaborations, commissions, and conversations.</p>

          <a
            href="mailto:hello@avichetri.com"
            className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-medium text-zinc-300 hover:text-white transition-colors duration-300 underline decoration-amber-500/30 hover:decoration-amber-500 underline-offset-8"
          >
            hello@avichetri.com
            <Mail size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <div className="mt-32 flex justify-center gap-6">
            <a
              href="https://www.instagram.com/mr_avi_12/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-zinc-900/50 hover:bg-zinc-800/70 rounded-full transition-all duration-300 border border-zinc-800/50"
            >
              <Camera size={20} className="text-zinc-500 hover:text-white transition-colors" />
            </a>
            <a
              href="#"
              className="p-4 bg-zinc-900/50 hover:bg-zinc-800/70 rounded-full transition-all duration-300 border border-zinc-800/50"
            >
              <GitBranch size={20} className="text-zinc-500 hover:text-white transition-colors" />
            </a>
            <a
              href="mailto:hello@avichetri.com"
              className="p-4 bg-zinc-900/50 hover:bg-zinc-800/70 rounded-full transition-all duration-300 border border-zinc-800/50"
            >
              <Mail size={20} className="text-zinc-500 hover:text-white transition-colors" />
            </a>
          </div>

          <div className="mt-20 text-zinc-600 text-sm tracking-wide">
            © {new Date().getFullYear()} Avi Chetri. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
