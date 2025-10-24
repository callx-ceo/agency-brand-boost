import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WebhookPayload {
  type: string
  data: {
    agent_id: string
    payment_amount: number
    payment_status: string
  }
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

    const payload: WebhookPayload = await req.json()
    console.log('Processing referral reward for payment:', payload)

    const { agent_id, payment_status } = payload.data

    // Only process successful payments
    if (payment_status !== 'succeeded') {
      console.log('Payment not successful, skipping referral reward')
      return new Response(
        JSON.stringify({ message: 'Payment not successful' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Check if this agent was referred by someone
    const { data: referral, error: referralError } = await supabase
      .from('referrals')
      .select('*')
      .eq('referred_agent_id', agent_id)
      .eq('status', 'pending')
      .single()

    if (referralError || !referral) {
      console.log('No pending referral found for agent:', agent_id)
      return new Response(
        JSON.stringify({ message: 'No referral found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    console.log('Found referral:', referral)

    // Update referral status to qualified
    const { error: updateReferralError } = await supabase
      .from('referrals')
      .update({
        status: 'qualified',
        first_payment_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', referral.id)

    if (updateReferralError) {
      console.error('Error updating referral:', updateReferralError)
      throw updateReferralError
    }

    // Check if reward already exists
    const { data: existingReward } = await supabase
      .from('referral_rewards')
      .select('*')
      .eq('referral_id', referral.id)
      .single()

    if (existingReward) {
      console.log('Reward already exists for this referral')
      return new Response(
        JSON.stringify({ message: 'Reward already processed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Create reward record
    const { data: reward, error: rewardError } = await supabase
      .from('referral_rewards')
      .insert({
        referral_id: referral.id,
        referrer_agent_id: referral.referrer_agent_id,
        amount: 100.00,
        status: 'approved'
      })
      .select()
      .single()

    if (rewardError) {
      console.error('Error creating reward:', rewardError)
      throw rewardError
    }

    console.log('Created reward:', reward)

    // Add credits to referrer's account
    const { error: creditsError } = await supabase.rpc('add_agent_credits', {
      p_agent_id: referral.referrer_agent_id,
      p_amount: 100.00,
      p_source: 'referral',
      p_reference_id: reward.id,
      p_description: `Referral reward for agent ${agent_id}`
    })

    if (creditsError) {
      console.error('Error adding credits:', creditsError)
      throw creditsError
    }

    // Update reward status to credited
    await supabase
      .from('referral_rewards')
      .update({
        status: 'credited',
        credited_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', reward.id)

    // Update referral status to rewarded
    await supabase
      .from('referrals')
      .update({
        status: 'rewarded',
        reward_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', referral.id)

    // Update referral code stats
    await supabase
      .from('referral_codes')
      .update({
        total_referrals: supabase.sql`total_referrals + 1`,
        total_earned: supabase.sql`total_earned + 100.00`
      })
      .eq('agent_id', referral.referrer_agent_id)

    console.log('Successfully processed referral reward')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Referral reward processed successfully',
        reward_id: reward.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Error processing referral reward:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
