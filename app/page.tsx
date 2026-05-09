'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Mail, Camera, ArrowDown, ChevronLeft, ChevronRight, X, RefreshCw, ExternalLink } from 'lucide-react';

const portfolioImages = [
  { title: "Urban Exploration", category: "Street", image: "https://images.unsplash.com/photo-1449824913935-59597967a563?auto=format&fit=crop&q=80&w=800", aspect: "tall" },
  { title: "Mountain Peaks", category: "Nature", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", aspect: "wide" },
  { title: "Neon Nights", category: "Cyberpunk", image: "https://images.unsplash.com/photo-1519608487953-e999753a6775?auto=format&fit=crop&q=80&w=800", aspect: "square" },
  { title: "Ocean Deep", category: "Water", image: "https://images.unsplash.com/photo-1505118380757-91f5f563209a?auto=format&fit=crop&q=80&w=800", aspect: "tall" },
  { title: "Forest Whispers", category: "Nature", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800", aspect: "square" },
  { title: "City Lights", category: "Architecture", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800", aspect: "wide" },
];

function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
      <ArrowDown size={14} className="text-zinc-500" />
    </div>
  );
}

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

export default function Page() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');

  const galleryRef = useInView(0.3);

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

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const syncInstagram = () => {
    setSyncStatus('syncing');
    setTimeout(() => setSyncStatus('synced'), 2000);
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

  // Auto-rotate carousel
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % portfolioImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 overflow-x-hidden">
      {/* Simple header */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <span className="text-sm tracking-widest text-zinc-500">AC</span>
        <a
          href="https://www.instagram.com/mr_avi_12/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          @mr_avi_12
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-6">
            <span className="block text-white">AVI</span>
            <span className="block text-zinc-600">CHETRI</span>
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Capturing moments through a lens — where light becomes a story.
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-700 block mb-3">Portfolio</span>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-400">Selected Works</h2>
              <span className="text-xs text-zinc-700 hidden sm:block">2024</span>
            </div>
          </div>

          {/* Featured carousel with preview strip */}
          <div
            ref={galleryRef.ref}
            className="relative mb-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Main image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-zinc-900">
              {portfolioImages.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-700 ${
                    i === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                >
                  <Image
                    src={img.image}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 block mb-2">
                  {portfolioImages[activeIndex].category}
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-white">
                  {portfolioImages[activeIndex].title}
                </h3>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); goToSlide(activeIndex === 0 ? portfolioImages.length - 1 : activeIndex - 1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToSlide((activeIndex + 1) % portfolioImages.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} className="text-white" />
              </button>

              {/* Click to expand */}
              <button
                onClick={() => openLightbox(activeIndex)}
                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ExternalLink size={16} className="text-white" />
              </button>
            </div>

            {/* Preview strip */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {portfolioImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all duration-300 ${
                    i === activeIndex
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a] scale-105'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={img.image}
                    alt={img.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Progress dots */}
            <div className="mt-4 flex justify-center gap-2">
              {portfolioImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeIndex ? 'w-8 bg-white' : 'w-1 bg-zinc-700 hover:bg-zinc-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Grid gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-12">
            {portfolioImages.map((img, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                className={`group relative overflow-hidden bg-zinc-900 cursor-pointer rounded-md ${
                  img.aspect === 'tall' ? 'aspect-[3/4] row-span-2' :
                  img.aspect === 'wide' ? 'aspect-[4/3]' :
                  'aspect-square'
                }`}
              >
                <Image
                  src={img.image}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                    loadedImages.has(i) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(i)}
                />
                {!loadedImages.has(i) && <div className="absolute inset-0 bg-zinc-800" />}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink size={20} className="text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Instagram sync section */}
          <div className="mt-16 p-6 sm:p-8 rounded-xl border border-zinc-800/50 bg-zinc-900/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-xl">
                  <InstagramIcon />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Sync from Instagram</h3>
                  <p className="text-sm text-zinc-500">Pull your latest posts directly to this gallery</p>
                </div>
              </div>
              <button
                onClick={syncInstagram}
                disabled={syncStatus === 'syncing'}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  syncStatus === 'synced'
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {syncStatus === 'idle' && (
                  <>
                    <RefreshCw size={16} />
                    <span>Connect Instagram</span>
                  </>
                )}
                {syncStatus === 'syncing' && (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Syncing...</span>
                  </>
                )}
                {syncStatus === 'synced' && (
                  <>
                    <span>Connected</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://www.instagram.com/mr_avi_12/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <Camera size={14} />
              <span className="tracking-wider">Follow on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 sm:left-8 p-2 text-zinc-500 hover:text-white transition-colors"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 sm:right-8 p-2 text-zinc-500 hover:text-white transition-colors"
          >
            <ChevronRight size={28} />
          </button>

          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-6"
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
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-500 block mb-1">{portfolioImages[selectedImage].category}</span>
              <h3 className="text-lg font-medium text-white">{portfolioImages[selectedImage].title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="py-24 px-6 text-center">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-700 block mb-4">Contact</span>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-300 mb-8">Let&apos;s Work Together</h2>

          <a
            href="mailto:hello@avichetri.com"
            className="text-lg sm:text-xl text-zinc-500 hover:text-white transition-colors tracking-wide"
          >
            hello@avichetri.com
          </a>

          <div className="mt-16 flex justify-center gap-4">
            <a
              href="https://www.instagram.com/mr_avi_12/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-zinc-600 hover:text-white transition-colors"
            >
              <Camera size={18} />
            </a>
            <a
              href="mailto:hello@avichetri.com"
              className="p-3 text-zinc-600 hover:text-white transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>

          <div className="mt-16 text-zinc-700 text-xs tracking-wider">
            © {new Date().getFullYear()} Avi Chetri
          </div>
        </div>
      </footer>
    </div>
  );
}