"use client";

import { useEffect } from "react";
import Image from "next/image";
import BGLive from "./src/comp/BGLive.jsx";

export default function Home() {
  useEffect(() => {
    const texto = "@Joss";
    let i = 0;
    let apagando = false;

    function escrever() {
      if (!apagando) {
        document.title = texto.substring(0, i + 1);
        i++;
        if (i === texto.length) apagando = true;
      } else {
        document.title = texto.substring(0, i - 1);
        i--;
        if (i === 0) apagando = false;
      }

      setTimeout(escrever, 500);
    }

    escrever();
  }, []);

  return (
    <div>
      <BGLive />
    </div>
  );
}
