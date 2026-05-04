import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { nombre, apellido, email, telefono, tipo_servicio, servicios, año_vehiculo, marca_vehiculo, modelo_vehiculo, notas } = await req.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Berrío Window Tint <info@berriowindowtint.com>',
      to: ['BerrioWindowtintautoservice@gmail.com'],
      subject: `Nueva cotización de ${nombre} ${apellido}`,
      html: `
        <h2>Nueva cotización recibida 🚗</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Servicio:</strong> ${tipo_servicio}</p>
        <p><strong>Tipo de Servicios:</strong> ${servicios}</p>
        <p><strong>Año del vehículo:</strong> ${año_vehiculo}</p>
        <p><strong>Marca del vehículo:</strong> ${marca_vehiculo}</p>
        <p><strong>Modelo del vehículo:</strong> ${modelo_vehiculo}</p>
        <p><strong>Notas:</strong> ${notas}</p>
      `
    })
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
})