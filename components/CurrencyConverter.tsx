"use client";
import { useState, useEffect } from "react";
import CurrencyInput from 'react-currency-input-field';

// API URL for currency rates
const CURRENCY_API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025-03-16/v1/currencies/eur.json";
// Default exchange rate if API fails
const DEFAULT_EXCHANGE_RATE = 27700;
// Cache key for local storage
const CACHE_KEY = "eurVndExchangeRate";
// Cache expiry key
const CACHE_EXPIRY_KEY = "eurVndExchangeRateExpiry";
// Cache duration in milliseconds (2 days)
const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
// Timeout for API call in milliseconds (10 seconds)
const API_TIMEOUT = 10000;

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"vnd-to-eur" | "eur-to-vnd">("vnd-to-eur");
  const [exchangeRate, setExchangeRate] = useState<number>(DEFAULT_EXCHANGE_RATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Function to fetch exchange rate with timeout
  const fetchExchangeRate = async (): Promise<number> => {
    setIsLoading(true);
    
    try {
      // Create a promise that rejects after timeout
      const timeoutPromise = new Promise<Response>((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), API_TIMEOUT);
      });
      
      // Race the fetch against the timeout
      const response = await Promise.race([
        fetch(CURRENCY_API_URL),
        timeoutPromise
      ]) as Response;
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if VND exists in the returned data
      if (data?.eur?.vnd) {
        const rate = Number(data.eur.vnd);
        
        // Store in cache with expiry time
        if (typeof window !== 'undefined') {
          localStorage.setItem(CACHE_KEY, rate.toString());
          localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
        }
        
        return rate;
      } else {
        throw new Error('VND exchange rate not found in API response');
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      
      // Return cached value if available and not expired
      if (typeof window !== 'undefined') {
        const cachedRate = localStorage.getItem(CACHE_KEY);
        const expiryTime = localStorage.getItem(CACHE_EXPIRY_KEY);
        
        if (cachedRate && expiryTime && Number(expiryTime) > Date.now()) {
          return Number(cachedRate);
        }
      }
      
      // Fall back to default rate
      return DEFAULT_EXCHANGE_RATE;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check for cached exchange rate on initial load
  useEffect(() => {
    const loadCachedRate = () => {
      if (typeof window !== 'undefined') {
        const cachedRate = localStorage.getItem(CACHE_KEY);
        const expiryTime = localStorage.getItem(CACHE_EXPIRY_KEY);
        
        if (cachedRate && expiryTime && Number(expiryTime) > Date.now()) {
          setExchangeRate(Number(cachedRate));
        }
      }
    };
    
    loadCachedRate();
  }, []);

  const convertCurrency = async () => {
    if (!amount) return;
    
    // Get the latest exchange rate when converting
    const rate = await fetchExchangeRate();
    setExchangeRate(rate);
    
    if (activeMode === "vnd-to-eur") {
      const vndAmount = parseFloat(amount.replace(/,/g, ''));
      const eurAmount = vndAmount / rate;
      setResult(`${eurAmount.toFixed(2)} EUR`);
    } else {
      const eurAmount = parseFloat(amount.replace(/,/g, ''));
      // Round up to the nearest whole VND amount
      const vndAmount = Math.ceil(eurAmount * rate);
      // Format without decimal places
      setResult(`${vndAmount.toLocaleString()} VND`);
    }
  };

  useEffect(() => {
    if (amount) {
      convertCurrency();
    }
  }, [activeMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    convertCurrency();
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
            id="vnd-to-eur-button"
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
            id="eur-to-vnd-button"
            onClick={() => setActiveMode("eur-to-vnd")}
            className={`flex-1 pb-3 pt-1 relative font-medium text-center ${
              activeMode === "eur-to-vnd"
                ? "text-[#da251d] border-b-2 border-[#da251d]"
                : "text-gray-500 hover:text-gray-800"
            }`}
            type="button"
          >
            Euro to Dong
            
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
              Enter the amount
            </label>
            
            <div className="relative">
              <CurrencyInput
                id="currency-input"
                name="currency-input"
                value={amount}
                onValueChange={(value) => setAmount(value || "")}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-[#da251d] focus:outline-none transition-colors"
                placeholder={`Amount in ${activeMode === "vnd-to-eur" ? "Dong" : "Euro"}`}
                decimalsLimit={activeMode === "vnd-to-eur" ? 0 : 2}
                groupSeparator=","
                decimalSeparator="."
                disableAbbreviations={true}
              />
              
              <div className="absolute right-0 inset-y-0 flex items-center pr-3 pointer-events-none">
                <span className={`text-gray-500 font-medium ${activeMode === "vnd-to-eur" ? "text-2xl" : "text-1xl"}`}>
                  {activeMode === "vnd-to-eur" ? "₫" : "€"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Convert button */}
          <button
            id="convert-button"
            type="submit"
            className="w-full bg-[#da251d] hover:bg-[#b01e18] text-white py-3 px-4 rounded-lg font-medium transition-colors relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="relative z-10">
              {isLoading ? "Getting latest rates..." : (activeMode === "vnd-to-eur" ? "Euro it!" : "Dong it!")}
            </span>
            
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
                <p id="result" className="text-xl font-medium text-gray-900">{result}</p>
              </div>
              
              {/* Exchange rate info */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
                <div className="bg-white px-3 py-1 rounded-full text-xs text-[#da251d] border border-[#da251d]/20 text-center">
                  Current rate: 1 EUR ≈ {exchangeRate.toLocaleString()} VND
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
