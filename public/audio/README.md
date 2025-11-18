# Audio Files

## Required File

Place a healing music audio file named `healing-music.mp3` in this directory.

## Recommended Sources for Royalty-Free Music

### Pixabay Music (Recommended)
- URL: https://pixabay.com/music/
- License: Free for commercial and non-commercial use
- Attribution: Not required but appreciated
- Search terms: "meditation", "healing", "ambient", "calm"

### Incompetech
- URL: https://incompetech.com/music/royalty-free/
- License: Creative Commons Attribution 4.0
- Attribution: Required - "Music by Kevin MacLeod (incompetech.com)"
- Search terms: "ambient", "meditation", "peaceful"

### Free Music Archive
- URL: https://freemusicarchive.org/
- License: Varies by track (check individual licenses)
- Attribution: Check individual track requirements

## File Requirements

- **Format**: MP3
- **File name**: `healing-music.mp3`
- **Style**: Calming, ambient, or meditation music
- **Duration**: 3-10 minutes (will loop automatically)
- **File size**: Optimize for web delivery (aim for < 5MB)
- **Bitrate**: 128-192 kbps is sufficient for background music

## Optimization Tips

To optimize your audio file for web delivery:

### Using FFmpeg (Command Line)
```bash
# Convert to optimized MP3
ffmpeg -i input.mp3 -b:a 128k -ar 44100 healing-music.mp3

# Or for even smaller file size
ffmpeg -i input.mp3 -b:a 96k -ar 44100 healing-music.mp3
```

### Using Online Tools
- [Online Audio Converter](https://online-audio-converter.com/)
- [CloudConvert](https://cloudconvert.com/mp3-converter)

Set bitrate to 128kbps and sample rate to 44.1kHz for good quality at reasonable file size.

## Example Tracks

Here are some specific recommendations from Pixabay:

1. **"Meditation Impromptu 03" by Sergii Pavkin**
   - Calm piano meditation music
   - Perfect for healing content

2. **"Relaxing Ambient Music" by Lexin_Music**
   - Gentle ambient soundscape
   - Great for background listening

3. **"Peaceful Garden" by Olexy**
   - Nature-inspired meditation music
   - Soothing and calming

## Attribution

After adding your audio file, update the attribution in the Footer component:

1. Open `components/layout/Footer.tsx`
2. Update the `audioAttribution` section with proper credit
3. Include artist name, track title, and source
4. Add link to the original track if available

Example attribution formats:

**For Pixabay (optional but nice):**
```
Music: "Track Name" by Artist Name from Pixabay
```

**For Incompetech (required):**
```
Music by Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/
```

## Current Status

⚠️ **No audio file currently present**

To complete the setup:
1. Download a royalty-free track from one of the sources above
2. Optimize it for web delivery (< 5MB, 128kbps)
3. Save it as `healing-music.mp3` in this directory
4. Update the Footer component with proper attribution
5. Test the audio player on the site
