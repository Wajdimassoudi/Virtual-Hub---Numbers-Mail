import React from "react";

interface AdPlaceholderProps {
  className?: string;
  slot?: string;
}

export function AdPlaceholder({ className, slot }: AdPlaceholderProps) {
  return (
    <div 
      className={`bg-gray-100 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center p-4 min-h-[100px] text-gray-400 text-sm ${className}`}
    >
      <div className="text-center">
        <p>إعلان AdSense</p>
        {slot && <p className="text-xs mt-1">Slot: {slot}</p>}
        {/*
          Google AdSense Code Placeholder:
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot={slot}
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        */}
      </div>
    </div>
  );
}
