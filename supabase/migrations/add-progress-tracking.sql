-- Create user_progress table for tracking module watch history
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  progress_percent INTEGER CHECK (progress_percent >= 0 AND progress_percent <= 100) DEFAULT 0,
  last_watched_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  -- Composite unique constraint to ensure one progress record per user per module
  UNIQUE(user_id, module_id)
);

-- Create indexes for faster queries
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_module_id ON user_progress(module_id);
CREATE INDEX idx_user_progress_last_watched ON user_progress(last_watched_at DESC);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own progress
CREATE POLICY "Users can see their own progress" ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only insert their own progress
CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own progress
CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create a view for getting course progress
CREATE OR REPLACE VIEW course_progress AS
SELECT
  up.user_id,
  m.course_id,
  COUNT(*) as total_modules,
  COUNT(CASE WHEN up.progress_percent > 0 THEN 1 END) as completed_modules,
  ROUND(AVG(up.progress_percent)::numeric, 2) as avg_progress_percent,
  MAX(up.last_watched_at) as last_watched_at
FROM user_progress up
JOIN modules m ON up.module_id = m.id
GROUP BY up.user_id, m.course_id;

-- Grant access to authenticated users
GRANT SELECT ON course_progress TO authenticated;

-- Create a function to get completion percentage
CREATE OR REPLACE FUNCTION get_course_completion_percent(p_user_id UUID, p_course_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_completion INTEGER;
BEGIN
  SELECT ROUND(AVG(up.progress_percent))::INTEGER
  INTO v_completion
  FROM user_progress up
  JOIN modules m ON up.module_id = m.id
  WHERE up.user_id = p_user_id
  AND m.course_id = p_course_id;
  
  RETURN COALESCE(v_completion, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_course_completion_percent(UUID, UUID) TO authenticated;
