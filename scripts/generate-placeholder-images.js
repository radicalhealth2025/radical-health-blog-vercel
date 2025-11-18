#!/usr/bin/env node

/**
 * Generate placeholder images using Unsplash Source API
 * This script creates placeholder image URLs for blog posts
 * 
 * Unsplash Source provides free, beautiful placeholder images
 * No API key required for basic usage
 */

const fs = require('fs');
const path = require('path');

// Unsplash Source API - provides random images by topic
// Format: https://source.unsplash.com/1200x630/?topic1,topic2
const UNSPLASH_BASE = 'https://source.unsplash.com/1200x630';

// Image topics for each blog post
const imageTopics = {
  'self-compassion-practice.md': 'meditation,peace,mindfulness',
  'healing-through-movement.md': 'yoga,movement,wellness',
  'mindfulness-for-beginners.md': 'zen,calm,nature',
  'nervous-system-regulation.md': 'breathing,relaxation,tranquil',
  'understanding-trauma-responses.md': 'healing,support,growth',
  'welcome-to-radical-healing.md': 'journey,transformation,light'
};

// Alternative: Use Picsum for abstract/artistic images
// const PICSUM_BASE = 'https://picsum.photos/1200/630';

console.log('🎨 Generating placeholder image URLs for blog posts...\n');

const contentDir = path.join(__dirname, '../content/blog');
const files = fs.readdirSync(contentDir);

files.forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if file already has an image
  if (content.includes('image:') && !content.includes('image: /images/blog/')) {
    const topics = imageTopics[file] || 'wellness,healing';
    const imageUrl = `${UNSPLASH_BASE}/?${topics}`;
    
    // Replace the image line
    content = content.replace(
      /image: .*$/m,
      `image: ${imageUrl}`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${file}: ${imageUrl}`);
  } else if (!content.includes('image:')) {
    console.log(`⏭️  ${file}: No image field found`);
  } else {
    console.log(`✓  ${file}: Already has local image`);
  }
});

console.log('\n✨ Done! Placeholder images generated.');
console.log('\n📝 Note: These are placeholder URLs from Unsplash.');
console.log('   For production, consider:');
console.log('   1. Downloading specific images from Unsplash.com');
console.log('   2. Using Cloudinary for optimization');
console.log('   3. Storing images locally in public/images/blog/\n');
