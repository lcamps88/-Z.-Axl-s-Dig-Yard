-- ============================================================
-- Z. Axl's Dig Yard — Initial Schema
-- ============================================================

-- ── MEMBERSHIPS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS memberships (
  id                    uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id    text,
  stripe_subscription_id text,
  plan_id               text,
  status                text DEFAULT 'inactive',
  current_period_end    timestamptz,
  guest_passes_remaining int DEFAULT 0,
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own membership"
  ON memberships FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own membership"
  ON memberships FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role bypasses RLS automatically (no policy needed)

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER memberships_updated_at
  BEFORE UPDATE ON memberships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── CONTACT SUBMISSIONS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name    text NOT NULL,
  last_name     text NOT NULL,
  email         text NOT NULL,
  phone         text,
  inquiry_type  text,
  child_ages    text,
  message       text NOT NULL,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Only the service role (webhook/API routes) can insert
CREATE POLICY "Service role insert only"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- ── BIRTHDAY BOOKINGS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS birthday_bookings (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  parent_name     text NOT NULL,
  email           text NOT NULL,
  phone           text,
  child_name      text NOT NULL,
  child_age       int,
  preferred_date  date,
  guest_count     int,
  package         text DEFAULT 'standard',
  notes           text,
  status          text DEFAULT 'pending',
  stripe_payment_intent_id text,
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE birthday_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON birthday_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create booking"
  ON birthday_bookings FOR INSERT
  WITH CHECK (true);

-- ── HELPER VIEW: member portal ────────────────────────────────
CREATE OR REPLACE VIEW member_status AS
  SELECT
    u.id                          AS user_id,
    u.email,
    u.raw_user_meta_data ->> 'full_name' AS full_name,
    m.plan_id,
    m.status,
    m.current_period_end,
    m.guest_passes_remaining,
    m.stripe_customer_id,
    m.stripe_subscription_id
  FROM auth.users u
  LEFT JOIN memberships m ON m.user_id = u.id;
