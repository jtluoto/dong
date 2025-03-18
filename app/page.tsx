'use client'

import CurrencyConverter from "../components/CurrencyConverter";

import { useState, useEffect } from 'react'

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
 
  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )
 
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])
 
  if (isStandalone) {
    return null // Don't show install button if already installed
  }
 
  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>.
        </p>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <InstallPrompt />
      </div>
      {/* Hero section with Vietnamese flag-inspired header */}
      <header className="vn-red-gradient py-12 relative overflow-hidden">
        {/* Yellow stars decorations */}
        <div className="absolute top-1/4 left-8 w-12 h-12 opacity-30 animate-float" style={{animationDelay: "0.5s"}}>
          <div className="w-full h-full star-shape bg-[#ffcd00]"></div>
        </div>
        <div className="absolute bottom-1/4 right-8 w-8 h-8 opacity-20 animate-float" style={{animationDelay: "1.2s"}}>
          <div className="w-full h-full star-shape bg-[#ffcd00]"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center">
            <div className="mb-4 relative">
              {/* Main star symbol */}
              <div className="absolute -top-6 -left-6 w-12 h-12 animate-pulse-custom">
                <div className="w-full h-full star-shape bg-[#ffcd00]"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-center">
                Euro ↔ Dong<br/><span className="text-[#ffcd00]">Converter</span>
              </h1>
            </div>
            

          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-grow py-12 md:py-16 px-4">
        <div className="container-custom">
          {/* Converter section */}
          <div className="max-w-xl mx-auto relative">
            {/* The converter component */}
            <div className="hover-scale">
              <CurrencyConverter />
            </div>
          </div>
        </div>
      </main>

      {/* Footer with flag inspiration */}
      <footer className="vn-red-gradient py-8 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0 text-white/80">Exchange rates are approximate and updated periodically</p>
            
            <div className="flex items-center gap-2">
              <span className="text-white/80">Inspired by</span>
              <div className="flex items-center justify-center w-8 h-5 bg-[#da251d] relative border border-white/30">
                <div className="w-3 h-3 star-shape bg-[#ffcd00]"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
