import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const saasUrl =
      process.env.NEXT_PUBLIC_SAAS_API_URL ||
      'https://traduztudo-os.vercel.app/api/public/requests';
    
    const saasKey = "\\traduztudo-saas-api-secret-key-2026\\";

    const response = await fetch(saasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': saasKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error('Error forwarding lead to SaaS:', error);
    return NextResponse.json(
      { error: 'Erro ao encaminhar lead para o SaaS', details: error?.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
