-- Add payment method configuration to agency_branding table
ALTER TABLE public.agency_branding 
ADD COLUMN allowed_payment_method text NOT NULL DEFAULT 'credit_card' 
CHECK (allowed_payment_method IN ('credit_card', 'invoice', 'both'));

COMMENT ON COLUMN public.agency_branding.allowed_payment_method IS 'Payment method allowed for this agency: credit_card, invoice, or both';