/**
 * Database Seed Script for Radical Healing Blog
 * 
 * This script populates the database with sample quotes and videos.
 * Run with: npx tsx supabase/seed.ts
 * 
 * Prerequisites:
 * - Install tsx: npm install -D tsx
 * - Set SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample quotes data
const quotes = [
  {
    text: "The wound is the place where the Light enters you.",
    author: "Rumi",
    category: "Healing",
    featured: true
  },
  {
    text: "Healing doesn't mean the damage never existed. It means the damage no longer controls your life.",
    author: "Akshay Dubey",
    category: "Healing",
    featured: true
  },
  {
    text: "You are not your trauma. You are the person who survived it and chose to heal.",
    author: "Unknown",
    category: "Trauma",
    featured: false
  },
  {
    text: "The curious paradox is that when I accept myself just as I am, then I can change.",
    author: "Carl Rogers",
    category: "Self-Acceptance",
    featured: true
  },
  {
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    author: "Rumi",
    category: "Self-Love",
    featured: false
  },
  {
    text: "The body keeps the score. If the memory of trauma is encoded in the viscera, in heartbreaking and gut-wrenching emotions, then we need to engage the body in healing.",
    author: "Bessel van der Kolk",
    category: "Trauma",
    featured: true
  },
  {
    text: "Mindfulness isn't difficult, we just need to remember to do it.",
    author: "Sharon Salzberg",
    category: "Mindfulness",
    featured: false
  },
  {
    text: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.",
    author: "Viktor Frankl",
    category: "Mindfulness",
    featured: false
  },
  {
    text: "Self-compassion is simply giving the same kindness to ourselves that we would give to others.",
    author: "Christopher Germer",
    category: "Self-Compassion",
    featured: false
  },
  {
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "Buddha",
    category: "Self-Love",
    featured: true
  },
  {
    text: "Healing is not linear. Some days you will feel like you're back at square one. That's okay. Growth is not always visible.",
    author: "Unknown",
    category: "Healing",
    featured: false
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Resilience",
    featured: false
  },
  {
    text: "What we resist persists. What we befriend, we can transform.",
    author: "Tara Brach",
    category: "Acceptance",
    featured: false
  },
  {
    text: "Your nervous system is not broken. It's doing exactly what it was designed to do - protect you. Now we can teach it that you're safe.",
    author: "Unknown",
    category: "Nervous System",
    featured: true
  },
  {
    text: "The only way out is through.",
    author: "Robert Frost",
    category: "Healing",
    featured: false
  }
];

// Sample videos data with real YouTube videos about healing and mindfulness
const videos = [
  {
    title: "Introduction to Somatic Healing",
    url: "https://www.youtube.com/watch?v=FeUioDuJjFI",
    thumbnail_url: "https://img.youtube.com/vi/FeUioDuJjFI/maxresdefault.jpg",
    category: "Somatic Healing",
    duration: 720, // 12 minutes
    description: "Learn the basics of somatic healing and how to work with your body's wisdom to release trauma and find healing."
  },
  {
    title: "Guided Meditation for Healing",
    url: "https://www.youtube.com/watch?v=z6X5oEIg6Ak",
    thumbnail_url: "https://img.youtube.com/vi/z6X5oEIg6Ak/maxresdefault.jpg",
    category: "Meditation",
    duration: 600, // 10 minutes
    description: "A gentle guided meditation to support your healing journey and cultivate inner peace."
  },
  {
    title: "Understanding Trauma and the Nervous System",
    url: "https://www.youtube.com/watch?v=br8-qebjIgs",
    thumbnail_url: "https://img.youtube.com/vi/br8-qebjIgs/maxresdefault.jpg",
    category: "Trauma Education",
    duration: 900, // 15 minutes
    description: "Explore how trauma affects the nervous system and learn practical tools for regulation."
  },
  {
    title: "Self-Compassion Practice",
    url: "https://www.youtube.com/watch?v=11U0h0DPu7k",
    thumbnail_url: "https://img.youtube.com/vi/11U0h0DPu7k/maxresdefault.jpg",
    category: "Self-Compassion",
    duration: 480, // 8 minutes
    description: "A guided practice to cultivate self-compassion and kindness toward yourself."
  },
  {
    title: "Breathwork for Anxiety Relief",
    url: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
    thumbnail_url: "https://img.youtube.com/vi/tybOi4hjZFQ/maxresdefault.jpg",
    category: "Breathwork",
    duration: 540, // 9 minutes
    description: "Learn simple breathwork techniques to calm anxiety and regulate your nervous system."
  },
  {
    title: "Healing Through Movement",
    url: "https://www.youtube.com/watch?v=nmJDkzDMllc",
    thumbnail_url: "https://img.youtube.com/vi/nmJDkzDMllc/maxresdefault.jpg",
    category: "Movement",
    duration: 1200, // 20 minutes
    description: "Discover how gentle, intentional movement can support trauma healing and emotional release."
  },
  {
    title: "Mindfulness for Beginners",
    url: "https://www.youtube.com/watch?v=6p_yaNFSYao",
    thumbnail_url: "https://img.youtube.com/vi/6p_yaNFSYao/maxresdefault.jpg",
    category: "Mindfulness",
    duration: 660, // 11 minutes
    description: "A beginner-friendly introduction to mindfulness practice and its benefits for healing."
  },
  {
    title: "Body Scan Meditation",
    url: "https://www.youtube.com/watch?v=15q-N-_kkrU",
    thumbnail_url: "https://img.youtube.com/vi/15q-N-_kkrU/maxresdefault.jpg",
    category: "Meditation",
    duration: 900, // 15 minutes
    description: "A guided body scan meditation to release tension and cultivate body awareness."
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Seed quotes
    console.log('📝 Seeding quotes...');
    const { data: quotesData, error: quotesError } = await supabase
      .from('quotes')
      .insert(quotes)
      .select();

    if (quotesError) {
      console.error('❌ Error seeding quotes:', quotesError);
      throw quotesError;
    }

    console.log(`✅ Successfully seeded ${quotesData?.length || 0} quotes`);
    console.log(`   - Featured quotes: ${quotes.filter(q => q.featured).length}`);
    console.log(`   - Categories: ${[...new Set(quotes.map(q => q.category))].join(', ')}\n`);

    // Seed videos
    console.log('🎥 Seeding videos...');
    const { data: videosData, error: videosError } = await supabase
      .from('videos')
      .insert(videos)
      .select();

    if (videosError) {
      console.error('❌ Error seeding videos:', videosError);
      throw videosError;
    }

    console.log(`✅ Successfully seeded ${videosData?.length || 0} videos`);
    console.log(`   - Categories: ${[...new Set(videos.map(v => v.category))].join(', ')}\n`);

    // Summary
    console.log('🎉 Database seeding completed successfully!\n');
    console.log('Summary:');
    console.log(`  - ${quotesData?.length || 0} quotes added`);
    console.log(`  - ${videosData?.length || 0} videos added`);
    console.log(`  - Total records: ${(quotesData?.length || 0) + (videosData?.length || 0)}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
