import { NextResponse } from "next/server";

export async function GET() {
  const DISCORD_USER_ID = process.env.DISCORD_USER_ID;
  const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

  if (!DISCORD_USER_ID || !DISCORD_TOKEN) {
    return NextResponse.json(
      { error: "Variáveis de ambiente ausentes" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/users/${DISCORD_USER_ID}`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Erro na API do Discord: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Retornar apenas nome, avatar e moldura
    const avatarUrl = data.avatar
      ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discriminator || 0) % 5}.png`;

    const molduraUrl = data.avatar_decoration_data
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${data.avatar_decoration_data.asset}.png`
    : null; // ou uma imagem padrão, se quiser

    const result = {
      name: data.global_name || data.username,
      avatar: avatarUrl,
      moldura: molduraUrl
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados do Discord:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
