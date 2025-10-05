"use client";

import React, { useState } from "react";

const Curtain = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-screen w-screen bg-gray-200 flex items-center justify-center overflow-hidden">
      {/* Conteúdo da página */}
      <h1 className="text-4xl font-bold z-10 text-black select-none">
        Meu Conteúdo
      </h1>

      {/* Cortina preta inicial */}
      <div
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 bg-black cursor-pointer transition-all duration-700 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {isOpen && (
          <div className="flex items-center justify-center h-full text-white text-2xl animate-pulse">
            Clique para abrir
          </div>
        )}
      </div>
    </div>
  );
};

export default Curtain;
