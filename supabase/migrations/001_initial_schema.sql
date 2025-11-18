-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create quotes table
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for quotes table
CREATE INDEX idx_quotes_category ON quotes(category);
CREATE INDEX idx_quotes_featured ON quotes(featured);
CREATE INDEX idx_quotes_created_at ON quotes(created_at DESC);

-- Create videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100),
  duration INTEGER, -- in seconds
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for videos table
CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_created_at ON videos(created_at DESC);

-- Create user_feedback table
CREATE TABLE user_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  experience TEXT NOT NULL,
  related_content_type VARCHAR(50), -- 'blog', 'quote', 'video'
  related_content_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for user_feedback table
CREATE INDEX idx_feedback_status ON user_feedback(status);
CREATE INDEX idx_feedback_submitted_at ON user_feedback(submitted_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Quotes policies: Public read access
CREATE POLICY "Allow public read access to quotes"
  ON quotes FOR SELECT
  USING (true);

-- Videos policies: Public read access
CREATE POLICY "Allow public read access to videos"
  ON videos FOR SELECT
  USING (true);

-- User feedback policies: Public insert, no read access
CREATE POLICY "Allow public insert to user_feedback"
  ON user_feedback FOR INSERT
  WITH CHECK (true);

-- Note: Admin access for INSERT/UPDATE/DELETE on quotes and videos
-- and SELECT/UPDATE on user_feedback should be handled via service role key
-- or additional policies when authentication is implemented

-- Add comments for documentation
COMMENT ON TABLE quotes IS 'Stores curated healing quotes with categorization';
COMMENT ON TABLE videos IS 'Stores healing video content with metadata';
COMMENT ON TABLE user_feedback IS 'Stores user testimonials and experiences';

COMMENT ON COLUMN quotes.featured IS 'Flag to mark quotes for homepage display';
COMMENT ON COLUMN videos.duration IS 'Video duration in seconds';
COMMENT ON COLUMN user_feedback.status IS 'Approval status: pending, approved, or rejected';
COMMENT ON COLUMN user_feedback.related_content_type IS 'Type of content the feedback relates to: blog, quote, or video';
