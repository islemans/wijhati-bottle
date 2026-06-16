import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_THEME, type ThemeConfig } from "@/lib/theme";

export async function GET() {
  const theme = await prisma.themeSettings.findFirst({
    where: { isActive: true },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(theme?.config ?? DEFAULT_THEME);
}

export async function PUT(req: NextRequest) {
  const body: { name?: string; config: ThemeConfig } = await req.json();

  // Deactivate any currently active theme, then save the new one as active.
  await prisma.$transaction([
    prisma.themeSettings.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    }),
    prisma.themeSettings.create({
      data: {
        name: body.name ?? "custom",
        isActive: true,
        config: body.config,
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
