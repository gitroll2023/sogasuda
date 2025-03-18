export function parseLyrics(lyricsText) {
  const lines = lyricsText.split('\n');
  const lyrics = [];
  
  lines.forEach(line => {
    const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = parseInt(match[3]);
      const time = minutes * 60 + seconds + milliseconds / 100;
      const text = match[4].trim();
      
      if (text) {
        lyrics.push({ time, text });
      }
    }
  });
  
  return lyrics.sort((a, b) => a.time - b.time);
}
