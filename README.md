
# SF Airbnb Listings

A lightweight, front‑end only web app that browses San Francisco Airbnb‑style listings. It reads a local JSON file, renders responsive cards, and includes robust image fallbacks for stale photo URLs.

**Live Demo:** https://sourav-02121996.github.io/Sf_Airbnb_Listings/

---

## Features

- **Front‑end only**: Vanilla HTML5, CSS3, and ES6 modules (no frameworks).
- **Responsive UI**: Bootstrap 5 grid & cards.
- **Image fallbacks**: Broken or 404 image URLs automatically swap to placeholders.
- **Lazy loading**: Faster initial render for long lists.
- **Amenity badges**: Quick glance of top amenities.
- **Ratings badge**: Shows the review score when available.

---

## Project Structure

```
Sf_Airbnb_Listings/
├── index.html
├── main.css
├── main.js
├── airbnb_sf_listings_500.json
├── package.json
└── package-lock.json
```
---

### 1) Clone / Download
```bash
git clone https://github.com/Sourav-02121996/Sf_Airbnb_Listings.git
cd Sf_Airbnb_Listings
```

### 2) Serve locally (recommended)
Modern browsers block `fetch()` from reading local files directly via `file://`. Running a tiny static server is required.

GitHub Pages already serves files over HTTPS, so the live demo works out of the box.

---

## How It Works

- `main.js` loads `airbnb_sf_listings_500.json` via `fetch()` and creates Bootstrap cards.
- For each listing, it renders:
  - Cover image
  - Title, price, description
  - Host thumbnail + name
  - A few amenity badges
  - Review rating (if present)

---

## Tech Stack

- HTML5 / CSS3
- JavaScript (ES6 modules)
- Bootstrap 5** (from CDN)

---

## Data Source & Use

- The dataset file is `airbnb_sf_listings_500.json`.  
- Provided for educational/demo purposes only. Please respect any terms that may apply to the original data source.

