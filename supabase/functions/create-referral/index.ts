import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreateReferralRequest {
  referral_code: string
  referred_agent_id: string
  ip_address?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { referral_code, referred_agent_id, ip_address }: CreateReferralRequest = await req.json()

    console.log('Creating referral with code:', referral_code)

    // Find the referrer by referral code
    const { data: referralCodeData, error: codeError } = await supabase
      .from('referral_codes')
      .select('agent_id, is_active')
      .eq('referral_code', referral_code)
      .single()

    if (codeError || !referralCodeData) {
      console.error('Invalid referral code:', referral_code)
      return new Response(
        JSON.stringify({ error: 'Invalid referral code' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!referralCodeData.is_active) {
      console.error('Referral code is inactive:', referral_code)
      return new Response(
        JSON.stringify({ error: 'Referral code is no longer active' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const referrer_id = referralCodeData.agent_id

    // Validate referral using fraud prevention function
    const { data: validationResult, error: validationError } = await supabase.rpc(
      'validate_referral',
      {
        p_referrer_id: referrer_id,
        p_referred_id: referred_agent_id,
        p_referred_ip: ip_address || 'unknown'
      }
    )

    if (validationError) {
      console.error('Error validating referral:', validationError)
      throw validationError
    }

    if (!validationResult.valid) {
      console.error('Referral validation failed:', validationResult.reason)
      return new Response(
        JSON.stringify({ error: validationResult.reason }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create referral record
    const { data: referral, error: referralError } = await supabase
      .from('referrals')
      .insert({
        referrer_agent_id: referrer_id,
        referred_agent_id: referred_agent_id,
        referral_code: referral_code,
        status: 'pending',
        referred_ip_address: ip_address || 'unknown'
      })
      .select()
      .single()

    if (referralError) {
      console.error('Error creating referral:', referralError)
      
      // Check if it's a duplicate referral
      if (referralError.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'This agent has already been referred' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }
      
      throw referralError
    }

    console.log('Successfully created referral:', referral)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Referral created successfully. Reward will be credited after first payment.',
        referral_id: referral.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Error in create-referral function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
