// Sembilan Tera — render site content from content/site.json
// This lets the CMS panel (/admin) edit content without touching HTML.

async function loadContent() {
  try {
    const res = await fetch('content/site.json?v=' + Date.now());
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error('Gagal memuat konten:', err);
  }
}

function get(obj, path) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

function fillTextFields(data) {
  document.querySelectorAll('[data-field]').forEach(el => {
    const val = get(data, el.dataset.field);
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-field-src]').forEach(el => {
    const val = get(data, el.dataset.fieldSrc);
    if (val !== undefined) el.src = val;
  });
  document.querySelectorAll('[data-field-href]').forEach(el => {
    const val = get(data, el.dataset.fieldHref);
    if (val !== undefined) el.href = val;
  });
}

function render(data) {
  fillTextFields(data);

  // facts
  const factsEl = document.getElementById('facts-list');
  if (factsEl && data.facts) {
    factsEl.innerHTML = data.facts.map(f => `
      <div>
        <dt class="fact-label">${escapeHTML(f.label)}</dt>
        <dd class="fact-value">${escapeHTML(f.value)}</dd>
      </div>
    `).join('');
  }

  // about paragraphs
  const aboutEl = document.getElementById('about-paragraphs');
  if (aboutEl && data.about?.paragraphs) {
    aboutEl.innerHTML = data.about.paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
  }

  // character paragraphs
  const charEl = document.getElementById('character-paragraphs');
  if (charEl && data.character?.paragraphs) {
    charEl.innerHTML = data.character.paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
  }

  // members
  const memberGrid = document.getElementById('member-grid');
  if (memberGrid && data.members?.list) {
    memberGrid.innerHTML = data.members.list.map(m => `
      <div class="member-card">
        <img src="${escapeAttr(m.image)}" alt="${escapeAttr(m.name)} - ${escapeAttr(m.role)}" loading="lazy">
        <div class="member-caption">
          <p class="member-name">${escapeHTML(m.name)}</p>
          <span class="member-role">${escapeHTML(m.role)}</span>
        </div>
      </div>
    `).join('');
  }

  // gallery
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid && data.gallery?.images) {
    galleryGrid.innerHTML = data.gallery.images.map(g => `
      <figure class="gallery-item">
        <img src="${escapeAttr(g.image)}" alt="${escapeAttr(g.caption || 'Dokumentasi perform Sembilan Tera')}" loading="lazy">
        <figcaption class="gallery-cap">${escapeHTML(g.caption || '')}</figcaption>
      </figure>
    `).join('');
  }

  // spotify embed
  const spotifyFrame = document.getElementById('spotify-embed');
  if (spotifyFrame && data.discography?.spotifyEmbedUrl) {
    spotifyFrame.src = data.discography.spotifyEmbedUrl;
  }

  // media kit
  const mediaKitGrid = document.getElementById('mediakit-grid');
  if (mediaKitGrid && data.mediaKit?.images) {
    mediaKitGrid.innerHTML = data.mediaKit.images.map(m => `
      <div class="mediakit-item">
        <img src="${escapeAttr(m.image)}" alt="${escapeAttr(m.label || 'Foto Sembilan Tera')}" loading="lazy">
        <div class="mediakit-caption">
          <span class="mediakit-label">${escapeHTML(m.label || '')}</span>
          <a class="mediakit-download" href="${escapeAttr(m.image)}" download>Unduh</a>
        </div>
      </div>
    `).join('');
  }

  // social platforms
  const platformRow = document.getElementById('platform-row');
  if (platformRow && data.social?.platforms) {
    platformRow.innerHTML = data.social.platforms.map(p => `
      <a href="${escapeAttr(p.url)}" target="_blank" rel="noopener">${escapeHTML(p.name)}</a>
    `).join('');
  }

  // phones
  const phoneList = document.getElementById('phone-list');
  if (phoneList && data.colophon?.phones) {
    phoneList.innerHTML = data.colophon.phones.map(ph => `
      <a href="https://wa.me/62${ph.replace(/\D/g,'').replace(/^0/,'')}" target="_blank" rel="noopener">${escapeHTML(ph)}</a>
    `).join('');
  }
}

function escapeHTML(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return escapeHTML(str).replace(/"/g, '&quot;');
}

loadContent();
