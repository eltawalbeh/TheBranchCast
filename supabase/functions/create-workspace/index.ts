import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const authorization = request.headers.get('Authorization')
  if (!authorization) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
  })
  const { data: { user }, error: authError } = await userClient.auth.getUser()
  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let payload: { name?: string; slug?: string }
  try { payload = await request.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const name = payload.name?.trim()
  const slug = payload.slug?.trim().toLowerCase()
  if (!name || name.length < 2 || name.length > 80 || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return new Response(JSON.stringify({ error: 'Provide a workspace name and a valid slug.' }), {
      status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const admin = createClient(supabaseUrl, serviceRoleKey)
  const { count, error: memberError } = await admin
    .from('organization_members').select('organization_id', { count: 'exact', head: true }).eq('user_id', user.id)
  if (memberError) {
    return new Response(JSON.stringify({ error: 'Could not check workspace membership.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  if ((count ?? 0) > 0) {
    return new Response(JSON.stringify({ error: 'You already belong to a workspace.' }), {
      status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const { data: organization, error: orgError } = await admin
    .from('organizations').insert({ name, slug }).select('id, name, slug').single()
  if (orgError || !organization) {
    const status = orgError?.code === '23505' ? 409 : 500
    return new Response(JSON.stringify({ error: status === 409 ? 'That workspace URL is already taken.' : 'Could not create workspace.' }), {
      status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const { error: membershipError } = await admin
    .from('organization_members').insert({ organization_id: organization.id, user_id: user.id, role: 'owner' })
  if (membershipError) {
    await admin.from('organizations').delete().eq('id', organization.id)
    return new Response(JSON.stringify({ error: 'Could not create workspace membership.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ organization }), {
    status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})

