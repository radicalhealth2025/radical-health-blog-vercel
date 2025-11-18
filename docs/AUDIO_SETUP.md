# Audio Setup Guide

This guide will help you add background healing music to the Radical Healing Blog.

## Quick Start

1. Download a royalty-free healing/meditation track
2. Optimize it for web delivery (< 5MB)
3. Save as `public/audio/healing-music.mp3`
4. Update attribution in Footer component
5. Test the audio player

## Step-by-Step Instructions

### Step 1: Choose Your Music Source

#### Option A: Pixabay Music (Recommended - No Attribution Required)

1. Visit [Pixabay Music](https://pixabay.com/music/)
2. Search for: "meditation", "healing", "ambient", "calm", or "peaceful"
3. Listen to previews and choose a track that fits the healing theme
4. Click the download button (no account required)
5. Download the MP3 version

**Recommended Tracks:**
- "Meditation Impromptu 03" by Sergii Pavkin
- "Relaxing Ambient Music" by Lexin_Music
- "Peaceful Garden" by Olexy
- Any track tagged with "meditation" or "healing"

**License:** Free for commercial and non-commercial use, no attribution required (but appreciated)

#### Option B: Incompetech (Attribution Required)

1. Visit [Incompetech](https://incompetech.com/music/royalty-free/)
2. Browse by genre: "Ambient" or "Meditation"
3. Preview tracks and download your choice
4. **Important:** Attribution is required for Incompetech tracks

**License:** Creative Commons Attribution 4.0

#### Option C: Free Music Archive

1. Visit [Free Music Archive](https://freemusicarchive.org/)
2. Search for meditation or ambient music
3. Check the license for each track (varies)
4. Download and follow attribution requirements

### Step 2: Optimize the Audio File

Your audio file should be optimized for web delivery to ensure fast loading times.

**Target Specifications:**
- Format: MP3
- Bitrate: 128 kbps (or 96 kbps for smaller file size)
- Sample Rate: 44.1 kHz
- File Size: < 5MB (ideally 2-3MB)
- Duration: 3-10 minutes (will loop automatically)

#### Using FFmpeg (Command Line)

If you have FFmpeg installed:

```bash
# Standard optimization (128 kbps)
ffmpeg -i input.mp3 -b:a 128k -ar 44100 healing-music.mp3

# Smaller file size (96 kbps - still good quality for background music)
ffmpeg -i input.mp3 -b:a 96k -ar 44100 healing-music.mp3

# Check the file size
ls -lh healing-music.mp3
```

#### Using Online Tools

If you don't have FFmpeg:

1. **Online Audio Converter** (https://online-audio-converter.com/)
   - Upload your file
   - Select MP3 format
   - Choose quality: 128 kbps
   - Click "Convert"
   - Download the optimized file

2. **CloudConvert** (https://cloudconvert.com/mp3-converter)
   - Upload your audio file
   - Set audio bitrate to 128 kbps
   - Convert and download

### Step 3: Add the File to Your Project

1. Rename your optimized file to `healing-music.mp3`
2. Place it in the `public/audio/` directory
3. Verify the file path: `public/audio/healing-music.mp3`

```bash
# From project root
mv ~/Downloads/your-track.mp3 public/audio/healing-music.mp3

# Verify it's there
ls -lh public/audio/healing-music.mp3
```

### Step 4: Update Attribution in Footer

Open `components/layout/Footer.tsx` and update the audio attribution section:

#### For Pixabay (Optional but Nice)

```tsx
<p className="font-body text-sm text-text-light mt-1">
  "Track Name" by Artist Name from{' '}
  <a 
    href="https://pixabay.com/music/search/track-name/"
    target="_blank" 
    rel="noopener noreferrer"
    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
  >
    Pixabay Music
  </a>
</p>
```

#### For Incompetech (Required)

```tsx
<p className="font-body text-sm text-text-light mt-1">
  Music by{' '}
  <a 
    href="https://incompetech.com"
    target="_blank" 
    rel="noopener noreferrer"
    className="text-primary hover:underline"
  >
    Kevin MacLeod (incompetech.com)
  </a>
  <br />
  <span className="text-xs">
    Licensed under{' '}
    <a 
      href="http://creativecommons.org/licenses/by/4.0/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      Creative Commons: By Attribution 4.0 License
    </a>
  </span>
</p>
```

### Step 5: Test the Audio Player

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the site in your browser: http://localhost:3000

3. Test the audio player:
   - Click the play button in the header
   - Verify the music plays
   - Test the volume control
   - Test the mute button
   - Navigate between pages - music should continue playing
   - Refresh the page - your settings should be remembered

4. Check the footer attribution is displaying correctly

### Step 6: Verify File Size and Performance

1. Check the file size:
   ```bash
   ls -lh public/audio/healing-music.mp3
   ```
   Should be under 5MB, ideally 2-3MB

2. Test loading time:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Filter by "Media"
   - Click play on the audio player
   - Check the download time (should be < 2 seconds on broadband)

## Troubleshooting

### Audio Won't Play

1. Check the file path is correct: `public/audio/healing-music.mp3`
2. Verify the file is a valid MP3
3. Check browser console for errors (F12)
4. Try a different browser
5. Check that the file isn't corrupted (try playing it locally)

### File Too Large

If your file is over 5MB:
- Re-encode at 96 kbps instead of 128 kbps
- Consider using a shorter track (3-5 minutes is plenty)
- Ensure you're using MP3 format, not WAV or FLAC

### Audio Quality Issues

If the audio sounds poor:
- Try 128 kbps instead of 96 kbps
- Ensure sample rate is 44.1 kHz
- Check the source file quality
- For background music, 128 kbps is usually sufficient

### Attribution Not Showing

1. Check you saved the Footer.tsx file
2. Restart the development server
3. Hard refresh the browser (Cmd+Shift+R or Ctrl+Shift+R)

## Example Complete Setup

Here's an example of a complete setup using a Pixabay track:

1. **Downloaded:** "Meditation Impromptu 03" by Sergii Pavkin from Pixabay
2. **Optimized:** Using FFmpeg to 128 kbps, resulting in 3.2MB file
3. **Saved as:** `public/audio/healing-music.mp3`
4. **Attribution added to Footer:**
   ```tsx
   "Meditation Impromptu 03" by Sergii Pavkin from Pixabay Music
   ```
5. **Tested:** Audio plays smoothly, loads in < 1 second, loops seamlessly

## Best Practices

1. **Choose appropriate music:**
   - Calming and peaceful
   - No lyrics (instrumental only)
   - Loops well (no abrupt ending)
   - Matches the healing theme

2. **Optimize for web:**
   - Keep file size under 5MB
   - Use 128 kbps bitrate
   - Test on slower connections

3. **Respect licenses:**
   - Always check the license terms
   - Provide required attribution
   - Keep attribution visible and accessible

4. **Test thoroughly:**
   - Test on multiple browsers
   - Test on mobile devices
   - Verify audio continues across page navigation
   - Check that volume/mute settings persist

## Resources

- [Pixabay Music](https://pixabay.com/music/) - Free, no attribution required
- [Incompetech](https://incompetech.com/music/royalty-free/) - Free with attribution
- [FFmpeg Download](https://ffmpeg.org/download.html) - Audio optimization tool
- [Online Audio Converter](https://online-audio-converter.com/) - Web-based optimization
- [Creative Commons Licenses](https://creativecommons.org/licenses/) - License information

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify file paths and names are correct
3. Test with a different audio file to isolate the issue
4. Ensure your audio file is a valid MP3 format

---

**Current Status:** ⚠️ No audio file present. Follow this guide to add one.
