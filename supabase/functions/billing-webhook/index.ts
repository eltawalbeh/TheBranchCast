import { createClient } from 'npm:@supabase/supabase-js@2'
const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type, x-billing-secret', 'Content-Type': 'application/json' }
Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers })
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })
  if (!Deno.env.get('BILLING_WEBHOOK_SECRET') || request.headers.get('x-billing-secret') !== Deno.env.get('BILLING_WEBHOOK_SECRET')) return new Response(JSON.stringify({ error: 'Unauthorized webhook' }), { status: 401, headers })
  let event: { id?: string; type?: string; organization_id?: string; plan_key?: string; status?: string; current_period_end?: string; payload?: Record<string, unknown> }
  try { event = await request.json() } catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers }) }
  if (!event.id || !event.type) return new Response(JSON.stringify({ error: 'id and type are required' }), { status: 422, headers })
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const inserted = await admin.from('billing_events').insert({ provider: 'configured', provider_event_id: event.id, event_type: event.type, organization_id: event.organization_id ?? null, payload: event.payload ?? event })
  if (inserted.error?.code === '23505') return new Response(JSON.stringify({ received: true, duplicate: true }), { status: 200, headers })
  if (inserted.error) return new Response(JSON.stringify({ error: inserted.error.message }), { status: 500, headers })
  if (event.organization_id) await admin.from('billing_subscriptions').upsert({ organization_id: event.organization_id, provider: 'configured', plan_key: event.plan_key ?? 'trial', status: event.status ?? 'active', current_period_end: event.current_period_end ?? null, updated_at: new Date().toISOString() }, { onConflict: 'organization_id' })
  return new Response(JSON.stringify({ received: true }), { status: 200, headers })
})
