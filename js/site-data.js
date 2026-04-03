// ─────────────────────────────────────────────
//  CENTRAL SITE CONFIGURATION
//  Edit this file to instantly change names, dates, maps, and music across the entire website!
// ─────────────────────────────────────────────

const SITE_DATA = {
  // ── Hero Section ──
  heroGreeting: "Together Forever",
  heroNames: "Bragadeesvaran <span>&amp;</span> Prakhasini",
  heroDate: "Saturday, the Fourteenth of June, 2025",

  // ── Countdown Engine ──
  countdownTarget: "2025-06-14T00:00:00", // Standard ISO datetime format
  countdownDateLabel: "Saturday — June 14, 2025",

  // ── Event Details ──
  eventDate: "Saturday, June 14, 2025",
  eventTimeStr: "Ceremony at 4:00 PM · Reception at 6:30 PM",
  
  venueName: "The Grand Rosewood Estate",
  venueAddress: "48 Wisteria Lane, Maplewood, CA 90210",
  // Go to Google Maps -> Share -> Embed a map -> Copy the "src" URL only inside the iframe tag
  googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.28470557454!2d-118.42398463231362!3d34.053228399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk",
  
  dressCodeTitle: "Cocktail Attire",
  dressCodeSub: "Soft tones welcome · Lavender & blush encouraged",

  // ── Groom Profile ──
  groomName: "Bragadeesvaran",
  groomBio: "To the man who makes every day brighter. Bragadeesvaran has an adventurous soul and a heart of gold. I cannot wait to explore the world and build our future together.",

  // ── Bride Profile ──
  brideName: "Prakhasini",
  brideBio: "My beautiful bride. Prakhasini grounds me and inspires me. Her warmth, grace, and infectious laugh make every moment we share unforgettable.",

  // ── Music Tracklist ──
  tracks: [
    { song: 'A Thousand Years', artist: 'Christina Perri', src: 'https://res.cloudinary.com/demo/video/upload/a_thousand_years.mp3' },
    { song: 'Perfect', artist: 'Ed Sheeran', src: 'https://res.cloudinary.com/demo/video/upload/perfect.mp3' },
    { song: "Can't Help Falling in Love", artist: 'Elvis Presley', src: 'https://res.cloudinary.com/demo/video/upload/cant_help_falling_in_love.mp3' },
    { song: 'All of Me', artist: 'John Legend', src: 'https://res.cloudinary.com/demo/video/upload/all_of_me.mp3' },
  ],

  // ── Slideshow Dynamic Count ──
  // Upload your photos to "slideshow/" folder in Cloudinary named 1, 2, 3...
  // Then change this number to match how many photos you have!
  slideshowCount: 7
};
