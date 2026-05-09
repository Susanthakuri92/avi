'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Mail, Camera, ArrowDown, X, ExternalLink } from 'lucide-react';

import { instagramPosts } from '../instagramData';

const imagePosts = instagramPosts.filter(p => p.type !== 'Video');

function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <ArrowDown size={16} className="text-zinc-600 scroll-bounce" />
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

function useRevealAll() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}


export default function Page() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [shuffled, setShuffled] = useState(() => [...imagePosts].sort(() => Math.random() - 0.5));
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useRevealAll();

  // Typing effect for rotating words
  const [typedWord, setTypedWord] = useState('where light becomes a story.');
  const words = ['where light becomes a story.', 'capturing raw emotions.', 'chasing golden hour.', 'finding beauty.', 'telling silent tales.'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        charIndex++;
        setTypedWord(currentWord.slice(0, charIndex));
        if (charIndex < currentWord.length) {
          timeoutId = setTimeout(tick, 120);
        } else {
          isDeleting = true;
          timeoutId = setTimeout(tick, 2500);
        }
      } else {
        charIndex--;
        setTypedWord(currentWord.slice(0, charIndex));
        if (charIndex > 0) {
          timeoutId = setTimeout(tick, 50);
        } else {
          isDeleting = false;
          charIndex = 0;
          setWordIndex(prev => (prev + 1) % words.length);
          timeoutId = setTimeout(tick, 400);
        }
      }
    };

    timeoutId = setTimeout(tick, 2000);
    return () => clearTimeout(timeoutId);
  }, [wordIndex]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? shuffled.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === shuffled.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isLightboxOpen, selectedIndex]);

  const refreshGallery = () => {
    setShuffled([...imagePosts].sort(() => Math.random() - 0.5));
  };

  const getImageUrl = (url: string) => url;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 overflow-x-hidden">
      <div className="grain-overlay" />

      <header className="fixed top-0 left-0 w-full px-6 py-5 flex justify-between items-center z-50">
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
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="text-left max-w-3xl relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-4">
            <span className="block text-white hero-avi">AVI</span>
            <span className="block text-zinc-400">
              <span className="hero-chetri">CHETRI.</span>
            </span>
          </h1>
          <p className="text-zinc-500 text-base sm:text-lg max-w-md leading-relaxed hero-tagline">
            Capturing moments through a lens — <span className="text-zinc-400 inline-block min-w-[260px]">{typedWord}<span className="cursor-blink">|</span></span>
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Collage Gallery */}
      <section className="py-16 px-4 sm:px-6 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-tr from-pink-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-px h-48 bg-gradient-to-b from-zinc-800 to-transparent" />
          <div className="absolute top-1/4 right-10 w-px h-32 bg-gradient-to-b from-zinc-800 to-transparent" />
          <div className="absolute bottom-10 right-1/4 w-px h-24 bg-gradient-to-b from-zinc-800 to-transparent" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
          <div className="particle particle-4" />
          <div className="particle particle-5" />
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="mb-8 reveal flex items-end justify-between">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-700 block mb-3">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-400">Gallery</h2>
            </div>
            <button
              onClick={() => setShuffled([...imagePosts].sort(() => Math.random() - 0.5))}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 rounded-full transition-all duration-300 text-xs tracking-widest"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Shuffle
            </button>
          </div>

          {/* Floating Polaroid Gallery */}
          <div className="gallery-grid">
            {shuffled.slice(0, 15).map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="gallery-item"
                onClick={() => openLightbox(i)}
              >
                <div className="polaroid">
                  <div className="image-wrapper">
                    <Image
                      src={getImageUrl(img.url)}
                      alt={img.caption || `Photo ${i + 1}`}
                      fill
                      sizes="300px"
                      className="object-cover"
                      onLoad={() => handleImageLoad(i)}
                    />
                    {!loadedImages.has(i) && (
                      <div className="loading-skeleton" />
                    )}
                  </div>
                  <div className="caption">{img.caption?.slice(0, 30) || ''}</div>
                </div>
              </div>
            ))}
          </div>

          {/* View all button */}
          {shuffled.length > 15 && (
            <div className="mt-12 text-center reveal">
              <button
                onClick={() => setShowAllPhotos(!showAllPhotos)}
                className="px-8 py-3 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-full transition-all duration-300 text-sm tracking-widest uppercase"
              >
                {showAllPhotos ? 'Show Less' : `View All (${shuffled.length})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* All Photos Grid - Hidden until View All clicked */}
      {showAllPhotos && (
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-12 reveal">
              <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-700 block mb-3">Collection</span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-400">All Photos</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {shuffled.slice(15).map((img, i) => (
                <div
                  key={`all-${shuffled[15 + i]?.url || ''}-${i}`}
                  onClick={() => openLightbox(i + 15)}
                  className={`group relative overflow-hidden bg-zinc-900 cursor-pointer rounded-lg reveal`}
                  style={{ transitionDelay: `${(i % 12) * 50}ms` }}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={getImageUrl(img.url)}
                      alt={img.caption || 'Photo'}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                        loadedImages.has(i + 15) ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(i + 15)}
                    />
                    {!loadedImages.has(i + 15) && <div className="absolute inset-0 bg-zinc-800 animate-pulse" />}
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mt-16 p-8 sm:p-12 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 reveal text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-2xl mb-6">
              <InstagramIcon />
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-white mb-4">Follow the Journey</h3>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">More stories, more moments — follow along on Instagram</p>
            <a
              href="https://www.instagram.com/mr_avi_12/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              <Camera size={16} />
              <span>@mr_avi_12</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/98 lightbox-bg flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 sm:left-8 p-3 text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 sm:right-8 p-3 text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>

          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-6 lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImageUrl(shuffled[selectedIndex].url)}
              alt={shuffled[selectedIndex].caption || 'Photo'}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              {shuffled[selectedIndex].caption && (
                <p className="text-sm text-white mb-1">{shuffled[selectedIndex].caption}</p>
              )}
              {shuffled[selectedIndex].date && (
                <span className="text-xs text-zinc-500">{shuffled[selectedIndex].date}</span>
              )}
              <span className="text-[9px] tracking-widest text-zinc-600 uppercase block mt-1">
                {selectedIndex + 1} / {shuffled.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="py-24 px-6 text-center">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-700 block mb-4 reveal">Contact</span>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-300 mb-8 reveal" style={{ transitionDelay: '100ms' }}>Let&apos;s Work Together</h2>

          <a
            href="mailto:hello@avichetri.com"
            className="text-lg sm:text-xl text-zinc-500 hover:text-white transition-colors tracking-wide reveal"
            style={{ transitionDelay: '200ms' }}
          >
            hello@avichetri.com
          </a>

          <div className="mt-16 flex justify-center gap-4 reveal" style={{ transitionDelay: '300ms' }}>
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

          <div className="mt-16 text-zinc-700 text-xs tracking-wider reveal" style={{ transitionDelay: '400ms' }}>
            &copy; {new Date().getFullYear()} Avi Chetri
          </div>
        </div>
      </footer>
    </div>
  );
}