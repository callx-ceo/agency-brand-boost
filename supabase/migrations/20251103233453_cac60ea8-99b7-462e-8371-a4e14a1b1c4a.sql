-- Add RLS policy for agencies to manage their agents' payment settings
CREATE POLICY "Agency owners can manage their agents payment settings"
ON agent_payment_settings
FOR ALL
USING (
  EXISTS (
    SELECT 1 
    FROM user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.agency_id IN (
        SELECT agency_id 
        FROM user_roles 
        WHERE user_id = agent_payment_settings.agent_id
      )
      AND ur.role = 'owner'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.agency_id IN (
        SELECT agency_id 
        FROM user_roles 
        WHERE user_id = agent_payment_settings.agent_id
      )
      AND ur.role = 'owner'
  )
);