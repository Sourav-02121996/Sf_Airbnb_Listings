const DATA_URL = "./airbnb_sf_listings_500.json";

const grid = document.getElementById("listings");
const q = document.getElementById("q");
const sortSel = document.getElementById("sort");

function clean(text) {
  if (!text) return "";

  // basic html tags that appear in some descriptions
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function toNumPrice(p) {
  if (!p) return 0;
  return Number(String(p).replace(/[^0-9.]/g, "")) || 0;
}

function parseAmenities(a) {
  if (!a) return [];

  // some files have amenities stored as JSON string
  try {
    if (Array.isArray(a)) return a;
    return JSON.parse(a);
  } catch {
    return [];
  }
}

function cardHTML(item) {
  const img = item.picture_url || "https://placehold.co/600x400?text=No+Photo";
  const hostImg =
    item.host_thumbnail_url ||
    item.host_picture_url ||
    "https://placehold.co/64x64?text=Host";
  const amenities = parseAmenities(item.amenities).slice(0, 6);
  const rating = item.review_scores_rating;
  return `
  <div class="col-12 col-sm-6 col-lg-4">
    <div class="card h-100 shadow-sm position-relative">
      ${rating ? `<span class="badge text-bg-success badge-rating">${Number(rating).toFixed(1)}</span>` : ""}
      <img
        src="${img}"
        class="card-img-top"
        alt="Listing photo"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=No+Photo';"
      >
      <div class="card-body d-flex flex-column">
        <h6 class="text-secondary mb-1">${item.price || ""}</h6>
        <h5 class="card-title">${item.name || "Untitled"}</h5>
        <p class="card-text small">${clean(item.description).slice(0, 160)}${item.description && item.description.length > 160 ? "…" : ""}</p>

        <div class="d-flex align-items-center gap-2 mt-auto">
          <img
            src="${hostImg}"
            alt="Host"
            width="32"
            height="32"
            class="rounded-circle border"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://placehold.co/64x64?text=Host';"
          >
          <span class="small">${item.host_name || "Host"}</span>
        </div>

        <div class="mt-2 d-flex flex-wrap gap-1">
          ${amenities.map(a => `<span class="badge text-bg-light border">${a}</span>`).join("")}
        </div>
      </div>
    </div>
  </div>`;
}


function render(list) {
  grid.innerHTML = list.map(cardHTML).join("");
}

function applyFilters(base) {
  const query = (q.value || "").toLowerCase();
  let out = base.filter((it) => {
    const hay = `${it.name || ""} ${it.host_name || ""}`.toLowerCase();
    return !query || hay.includes(query);
  });

  if (sortSel.value === "price-asc") {
    out.sort((a, b) => toNumPrice(a.price) - toNumPrice(b.price));
  } else if (sortSel.value === "price-desc") {
    out.sort((a, b) => toNumPrice(b.price) - toNumPrice(a.price));
  }

  return out;
}

async function main() {
  const res = await fetch(DATA_URL);
  const all = await res.json();
  const first50 = all.slice(0, 50);

  render(first50);

  const re = () => render(applyFilters(first50));
  q.addEventListener("input", re);
  sortSel.addEventListener("change", re);
}

main().catch((e) => console.error(e));
