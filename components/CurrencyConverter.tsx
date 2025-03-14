"use client";
import { useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"vnd-to-eur" | "eur-to-vnd">("vnd-to-eur");
  
  // Current approximate exchange rate (as of 2023)
  // 1 EUR ≈ 25,500 VND
  const EUR_TO_VND_RATE = 25500;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    if (activeMode === "vnd-to-eur") {
      const vndAmount = parseFloat(amount);
      const eurAmount = vndAmount / EUR_TO_VND_RATE;
      setResult(`${eurAmount.toFixed(2)} EUR`);
    } else {
      const eurAmount = parseFloat(amount);
      const vndAmount = eurAmount * EUR_TO_VND_RATE;
      setResult(`${vndAmount.toLocaleString()} VND`);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Flag-inspired top bar */}
      <div className="vn-red-gradient h-2"></div>
      
      {/* Converter body */}
      <div className="p-8">
        {/* Mode selection tabs */}
        <div className="flex mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveMode("vnd-to-eur")}
            className={`flex-1 pb-3 pt-1 relative font-medium text-center ${
              activeMode === "vnd-to-eur"
                ? "text-[#da251d] border-b-2 border-[#da251d]"
                : "text-gray-500 hover:text-gray-800"
            }`}
            type="button"
          >
            Dong to Euro
            
            {activeMode === "vnd-to-eur" && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-[#da251d]"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveMode("eur-to-vnd")}
            className={`flex-1 pb-3 pt-1 relative font-medium text-center ${
              activeMode === "eur-to-vnd"
                ? "text-[#da251d] border-b-2 border-[#da251d]"
                : "text-gray-500 hover:text-gray-800"
            }`}
            type="button"
          >
            EUR to VND
            
            {activeMode === "eur-to-vnd" && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-[#da251d]"></span>
            )}
          </button>
        </div>
        
        {/* Converter form */}
        <form onSubmit={handleSubmit} className="relative">
          {/* Mini flag in corner */}
          
          <div className={`absolute -top-1 right-1 w-6 h-4 rounded-sm flex items-center justify-center ${activeMode === "vnd-to-eur" ? "bg-[#da251d]" : "bg-[#003399]"}`}>
            <div className="w-2 h-2 star-shape bg-[#ffcd00]"></div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter {activeMode === "vnd-to-eur" ? "Dong" : "Euro"} Amount
            </label>
            
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-[#da251d] focus:outline-none transition-colors"
                placeholder={`Enter ${activeMode === "vnd-to-eur" ? "Vietnamese Dong" : "Euro"} amount`}
              />
              
              <div className="absolute right-0 inset-y-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 font-medium">
                  {activeMode === "vnd-to-eur" ? "₫" : "€"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Convert button */}
          
          <button
            type="submit"
            className="w-full bg-[#da251d] hover:bg-[#b01e18] text-white py-3 px-4 rounded-lg font-medium transition-colors relative overflow-hidden group"
          >
            <span className="relative z-10">{activeMode === "vnd-to-eur" ? "Dong it!" : "Euro it!"}</span>
            
            {/* Star appears on hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
              <div className="w-full h-full star-shape bg-[#ffcd00]"></div>
            </div>
          </button>
        </form>
        
        {/* Result display */}
        {result && (
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="bg-gray-50 rounded-lg p-6 relative overflow-hidden">
              {/* Result with styled currency symbols */}
              <div className="text-center mb-1">
                <p className="text-xl font-medium text-gray-900">{result}</p>
              </div>
              
              {/* Exchange rate info */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
                <div className="bg-white px-3 py-1 rounded-full text-xs text-[#da251d] border border-[#da251d]/20">
                  Current rate: 1 EUR ≈ 25,500 VND
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -bottom-6 -right-6 w-16 h-16 opacity-5">
                <div className="w-full h-full star-shape bg-[#da251d]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom decoration */}
      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="w-3 h-3 star-shape bg-[#ffcd00] opacity-60"></div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
