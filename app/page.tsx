import CurrencyConverter from "../components/CurrencyConverter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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
                VND ↔ EUR <span className="text-[#ffcd00]">Converter</span>
              </h1>
            </div>
            
            <p className="text-white/90 text-lg max-w-lg text-center">
              A stylish currency converter inspired by the Vietnamese flag
            </p>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-grow py-12 md:py-16 px-4">
        <div className="container-custom">
          {/* Converter section */}
          <div className="max-w-xl mx-auto relative">
            {/* Decorative corner stars */}
            <div className="absolute -top-5 -left-5 w-10 h-10 transform -rotate-12">
              <div className="w-full h-full star-shape bg-[#ffcd00] opacity-70"></div>
            </div>
            
            <div className="absolute -bottom-5 -right-5 w-10 h-10 transform rotate-12">
              <div className="w-full h-full star-shape bg-[#da251d] opacity-70"></div>
            </div>
            
            {/* The converter component */}
            <div className="hover-scale">
              <CurrencyConverter />
            </div>
          </div>
          
          {/* Features section */}
          <div className="mt-24 max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#da251d] mb-12">
              About Vietnamese Dong
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover-scale relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-12 h-12 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-full h-full star-shape bg-[#da251d]"></div>
                </div>
                
                <h3 className="font-bold text-lg text-[#da251d] mb-3">Official Currency</h3>
                <p className="text-gray-700">The đồng has been the official currency of Vietnam since May 3, 1978.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover-scale relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-12 h-12 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-full h-full star-shape bg-[#da251d]"></div>
                </div>
                
                <h3 className="font-bold text-lg text-[#da251d] mb-3">Currency Symbol</h3>
                <p className="text-gray-700">The Vietnamese đồng is abbreviated as "VND" and uses the symbol "₫" in currency exchange.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover-scale relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-12 h-12 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-full h-full star-shape bg-[#da251d]"></div>
                </div>
                
                <h3 className="font-bold text-lg text-[#da251d] mb-3">Exchange Rate</h3>
                <p className="text-gray-700">Current exchange rates with the Euro fluctuate, with approximately ₫25,500 to €1.</p>
              </div>
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
