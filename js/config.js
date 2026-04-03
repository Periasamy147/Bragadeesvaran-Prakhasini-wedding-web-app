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
  groom: CLD.url('groom', 'w_600,h_800,c_fill,g_face'),
  bride: CLD.url('bride', 'w_600,h_800,c_fill,g_face'),
  galleryWalking: CLD.url('gallery-walking', 'w_900,h_600,c_fill'),
  galleryRings: CLD.url('gallery-rings', 'w_600,h_700,c_fill'),
  galleryFabric: CLD.url('gallery-fabric', 'w_600,h_700,c_fill'),
  galleryBlossom: CLD.url('gallery-blossom', 'w_600,h_700,c_fill'),
  galleryBride: CLD.url('gallery-bride', 'w_600,h_700,c_fill'),
  galleryTable: CLD.url('gallery-table', 'w_900,h_600,c_fill'),
  galleryGolden: CLD.url('gallery-golden', 'w_600,h_700,c_fill'),
};
