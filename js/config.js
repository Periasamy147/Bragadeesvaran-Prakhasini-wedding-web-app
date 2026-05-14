// ─────────────────────────────────────────────
//  Cloudinary Config
//  Replace CLOUD_NAME with your actual cloud name
//  found at: https://cloudinary.com/console
// ─────────────────────────────────────────────

const CLD = {
  cloud: 'dezkrhrt2',           // ← change this
  t: 'q_auto,f_auto,c_limit',     // auto quality + format + no upscale

  url(publicId, extra = '') {
    const transforms = extra ? `${this.t},${extra}` : this.t;
    return `https://res.cloudinary.com/${this.cloud}/image/upload/${transforms}/${publicId}`;
  },
};

const IMAGES = {
  groom: 'Images/IMG_1879.JPG.jpeg',
  bride: 'Images/IMG_1573.JPG.jpeg',
};

// Note: Slideshow images are now discovered and injected automatically 
// by js/slideshow-builder.js, so they no longer need to be defined here.
