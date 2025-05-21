
-- This is the SQL schema for the agency branding settings table
-- You would execute this in your PostgreSQL database

CREATE TABLE IF NOT EXISTS agency_branding_settings (
    agency_id INTEGER PRIMARY KEY REFERENCES agencies(id) ON DELETE CASCADE,
    logo_url VARCHAR(255),
    favicon_url VARCHAR(255),
    primary_color VARCHAR(7) DEFAULT '#3B82F6', -- Default primary color
    secondary_color VARCHAR(7) DEFAULT '#10B981', -- Default secondary color
    font_family VARCHAR(100) DEFAULT 'System UI',
    custom_subdomain VARCHAR(63) UNIQUE,
    custom_domain VARCHAR(255) UNIQUE,
    custom_domain_ssl_status VARCHAR(50), -- PENDING_DNS, ISSUING_CERT, ACTIVE, FAILED
    custom_domain_target VARCHAR(255) DEFAULT 'whitelabel.callx.com', -- CNAME target
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups by subdomain and domain
CREATE INDEX IF NOT EXISTS idx_agency_branding_subdomain ON agency_branding_settings(custom_subdomain);
CREATE INDEX IF NOT EXISTS idx_agency_branding_domain ON agency_branding_settings(custom_domain);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_agency_branding_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_agency_branding_modtime
BEFORE UPDATE ON agency_branding_settings
FOR EACH ROW
EXECUTE FUNCTION update_agency_branding_modified_column();
