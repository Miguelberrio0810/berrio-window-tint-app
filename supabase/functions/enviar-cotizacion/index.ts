import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { nombre, apellido, email, telefono, tipo_servicio, ventanas, notas } = await req.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Berrío Window Tint <onboarding@resend.dev>',
      to: ['miguelanblanco.2000@outlook.com'],
      subject: `Nueva cotización de ${nombre} ${apellido}`,
      html: `
        <h2>Nueva cotización recibida 🚗</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Servicio:</strong> ${tipo_servicio}</p>
        <p><strong>Ventanas:</strong> ${ventanas}</p>
        <p><strong>Notas:</strong> ${notas}</p>
      `
    })
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
})