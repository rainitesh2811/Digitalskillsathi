-- Enable Row Level Security (RLS) on all tables
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read free modules" ON modules;
DROP POLICY IF EXISTS "Users can see their own courses" ON user_courses;
DROP POLICY IF EXISTS "Users can see their own orders" ON orders;

-- ============================================
-- MODULES TABLE POLICIES
-- ============================================
-- Allow anyone to read all modules (names are public)
-- Individual access control is done in the application
CREATE POLICY "Anyone can read free modules" ON modules
  FOR SELECT
  USING (is_free = true);

-- Optional: Anyone can read module metadata (names, order, course_id)
-- This policy allows listing all modules, but access to videos is controlled via Edge Function
CREATE POLICY "Anyone can list modules" ON modules
  FOR SELECT
  USING (true);

-- ============================================
-- USER_COURSES TABLE POLICIES
-- ============================================
-- Users can only see their own user_courses entries
CREATE POLICY "Users can see their own courses" ON user_courses
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own entries (if you want to allow self-insert)
CREATE POLICY "Users can insert their own enrollment" ON user_courses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only authenticated users can update their own records
CREATE POLICY "Users can update their own courses" ON user_courses
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- ORDERS TABLE POLICIES
-- ============================================
-- Users can only see their own orders
CREATE POLICY "Users can see their own orders" ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- ADDITIONAL SECURITY MEASURES
-- ============================================
-- Create a view for safe module data access
CREATE OR REPLACE VIEW public.modules_safe AS
SELECT 
  id,
  title,
  course_id,
  is_free,
  "order"
FROM modules;

-- Grant public read access to this view
GRANT SELECT ON public.modules_safe TO anon, authenticated;

-- Create a function to safely check module access
CREATE OR REPLACE FUNCTION check_module_access(module_id UUID, current_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    module_free BOOLEAN;
    course_id UUID;
    has_payment BOOLEAN;
BEGIN
    -- Get module details
    SELECT is_free, course_id INTO module_free, course_id
    FROM modules
    WHERE id = module_id;

    -- If module is free, grant access
    IF module_free THEN
        RETURN TRUE;
    END IF;

    -- If module is paid, check if user has completed payment
    SELECT EXISTS(
        SELECT 1
        FROM user_courses
        WHERE user_id = current_user_id
        AND course_id = course_id
        AND payment_status = 'completed'
    ) INTO has_payment;

    RETURN has_payment;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION check_module_access(UUID, UUID) TO authenticated;
