-- Multi-cafeteria foundation, additive only.
-- This schema does not grant access on its own.
-- Application handlers MUST verify authorization server-side before using it.

CREATE TABLE IF NOT EXISTS platform_staff (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS platform_staff_businesses (
  staff_user_id UUID NOT NULL REFERENCES platform_staff(user_id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (staff_user_id, business_id)
);

CREATE INDEX IF NOT EXISTS platform_staff_businesses_business_idx
ON platform_staff_businesses(business_id);

COMMENT ON TABLE platform_staff IS
'Operator permissions for a future central administration. No accounts are automatically enrolled.';
COMMENT ON TABLE platform_staff_businesses IS
'Explicit business assignments for platform editors. Do not trust client-selected business IDs.';
