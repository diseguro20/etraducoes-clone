import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const saasUrl =
      process.env.NEXT_PUBLIC_SAAS_API_URL ||
      'https://traduztudo-os.vercel.app/api/public/requests';
    const saasKey =
      process.env.SAAS_API_SECRET_KEY ||
      process.env.NEXT_PUBLIC_SAAS_API_KEY ||
      'traduztudo-saas-api-secret-key-2026';

    const response = await fetch(saasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': saasKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error forwarding lead to SaaS:', error);
    return NextResponse.json(
      { error: 'Erro ao encaminhar lead para o SaaS', details: error?.message },
      { status: 500 }
    );
  }
}
