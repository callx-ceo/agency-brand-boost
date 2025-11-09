-- Update allowed_payment_method to only allow 'credit_card' or 'invoice'
ALTER TABLE agency_branding 
DROP CONSTRAINT IF EXISTS agency_branding_allowed_payment_method_check;

ALTER TABLE agency_branding 
ADD CONSTRAINT agency_branding_allowed_payment_method_check 
CHECK (allowed_payment_method IN ('credit_card', 'invoice'));

-- Add credit limit columns to agency_branding
ALTER TABLE agency_branding
ADD COLUMN IF NOT EXISTS credit_limit numeric DEFAULT 10000 NOT NULL,
ADD COLUMN IF NOT EXISTS credit_used numeric DEFAULT 0 NOT NULL;

-- Create credit limit request table
CREATE TABLE IF NOT EXISTS agency_credit_limit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  requested_limit numeric NOT NULL,
  current_limit numeric NOT NULL,
  reason text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at timestamp with time zone NOT NULL DEFAULT now(),
  reviewed_at timestamp with time zone,
  reviewed_by uuid REFERENCES auth.users(id),
  review_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on credit limit requests
ALTER TABLE agency_credit_limit_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for credit limit requests
CREATE POLICY "Agencies can view own credit limit requests"
ON agency_credit_limit_requests
FOR SELECT
USING (auth.uid() = agency_id);

CREATE POLICY "Agencies can create credit limit requests"
ON agency_credit_limit_requests
FOR INSERT
WITH CHECK (auth.uid() = agency_id);

CREATE POLICY "SuperAdmins can view all credit limit requests"
ON agency_credit_limit_requests
FOR SELECT
USING (has_role(auth.uid(), 'superadmin'));

CREATE POLICY "SuperAdmins can update credit limit requests"
ON agency_credit_limit_requests
FOR UPDATE
USING (has_role(auth.uid(), 'superadmin'));

-- Add trigger for updated_at
CREATE TRIGGER update_agency_credit_limit_requests_updated_at
BEFORE UPDATE ON agency_credit_limit_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();