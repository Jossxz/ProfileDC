"use client";

import React, { useEffect, useState } from "react";

const DiscordProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/discord", { cache: "no-store" }); // rota da API
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data.name || !data.avatar) {
        setError(true);
        setLoading(false);
        return;
      }

      setProfile({
        name: data.name,
        avatar: data.avatar,
        moldura: data.moldura
      });

      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    const interval = setInterval(fetchProfile, 30000); // atualiza a cada 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-white">Carregando...</p>;
  if (error || !profile)
    return <p className="text-white">Não foi possível carregar o perfil.</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      <img 
        src={profile.moldura}
        className="w-[100px] h-[100px] rounded-full absolute"
      />
        <img
          src={profile.avatar}
          alt="Avatar do Discord"
          className="w-24 h-24 rounded-full shadow-2xs"
        />
      <h2 className="text-xl mt-1 text-black font-semibold">{profile.name}</h2>

      <div className="mt-1 w-full">
        <hr className="border border-black/50 mb-2" />
        <div className="flex flex-row justify-center items-center gap-3">
          <img
            src="/assets/Icons/logo-steam.png"
            className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() =>
              window.open("https://steamcommunity.com/id/Jossxz/", "_blank")
            }
          />
          <img
            src="/assets/Icons/instagram.png"
            className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() =>
              window.open("https://www.instagram.com/jossxzy/", "_blank")
            }
          />
          <img
            src="/assets/Icons/github.png"
            className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() => window.open("https://github.com/Jossxz/", "_blank")}
          />
          <img
            src="/assets/Icons/linkedin.png"
            className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() =>
              window.open("https://www.linkedin.com/in/joseweeverton/", "_blank")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DiscordProfile;