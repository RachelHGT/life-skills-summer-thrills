import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic server-side validation
    const required = ['name', 'phone', 'email', 'age', 'medicaid'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const age = parseInt(body.age, 10);
    if (isNaN(age) || age < 5 || age > 17) {
      return NextResponse.json({ error: 'Invalid age' }, { status: 400 });
    }

    // Forward to webhook (set NEXT_PUBLIC_WEBHOOK_URL in .env.local)
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
    const payload = {
      ...body,
      submitted_at: new Date().toISOString(),
      source: 'Life Skills Summer Thrills — Winter Park Landing',
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown',
    };

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Log but don't fail the user submission — we'll catch in monitoring
        console.error('[Life Skills Lead] Webhook forward failed:', err);
      }
    } else {
      console.log('[Life Skills Lead] No webhook configured. Payload:', JSON.stringify(payload, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Life Skills Lead] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
