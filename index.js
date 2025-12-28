// Fungsi untuk menampilkan produk
function displayProducts(productsToShow) {
  const productsContainer = document.getElementById("productsContainer");
  const productCount = document.getElementById("productCount");

  productsContainer.innerHTML = "";
  productCount.textContent = `${productsToShow.length} Produk`;

  if (productsToShow.length === 0) {
    productsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>Produk tidak ditemukan</h3>
        <p>Tidak ada produk yang sesuai dengan pencarian Anda</p>
        <p>Coba gunakan <strong>kode produk</strong> atau <strong>nama produk</strong></p>
      </div>
    `;
    return;
  }

  productsToShow.forEach((product) => {
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <div class="product-badge">${product.category}</div>

      <div class="product-image">
        <img 
          src="${product.image}" 
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='https://via.placeholder.com/300x200/00a046/ffffff?text=YayayaShop';"
        >
        <div class="product-code">${product.code}</div>
      </div>

      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>

        <div class="product-price">
          Rp ${product.price.toLocaleString("id-ID")}
          <span class="product-original-price">
            Rp ${product.originalPrice.toLocaleString("id-ID")}
          </span>
          <span class="discount-badge">${discount}%</span>
        </div>

        <div class="product-rating">
          ${generateStarRating(product.rating)}
          <span>${product.rating} (${product.reviewCount})</span>
        </div>

        <div class="product-sold">
          Terjual: ${product.sold.toLocaleString("id-ID")}
        </div>

        <div class="product-location">
          <i class="fas fa-map-marker-alt"></i> ${product.location}
        </div>

        <a href="${product.shopeeLink}" target="_blank" class="buy-button">
          <i class="fas fa-shopping-cart"></i> Beli di Shopee
        </a>
      </div>
    `;

    productCard.addEventListener("click", (e) => {
      if (!e.target.closest(".buy-button")) {
        showProductDetail(product);
      }
    });

    productsContainer.appendChild(productCard);
  });
}

// Fungsi untuk mendapatkan HTML gambar produk
function getProductImageHTML(product) {
  if (product.image && product.image.startsWith("http")) {
    // Jika gambar dari URL eksternal
    return `<img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/00a046/ffffff?text=YayayaShop';">`;
  } else if (product.image) {
    // Jika gambar lokal
    return `<img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\"image-placeholder\"><i class=\"fas fa-image\"></i></div>';">`;
  } else {
    // Jika tidak ada gambar
    return `<div class="image-placeholder"><i class="fas fa-${
      product.icon || "image"
    }"></i></div>`;
  }
}

// Fungsi untuk menghasilkan rating bintang
function generateStarRating(rating) {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// Fungsi untuk menampilkan detail produk
function showProductDetail(product) {
  const productDetail = document.getElementById("productDetail");

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  productDetail.innerHTML = `
    <div class="detail-image-container">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="detail-image"
        onerror="this.src='https://via.placeholder.com/500x400/00a046/ffffff?text=YayayaShop';"
      >
      <div class="detail-code">${product.code}</div>
    </div>

    <div class="detail-info">
      <h1 class="detail-title">${product.name}</h1>

      <div class="detail-rating">
        ${generateStarRating(product.rating)}
        <span>
          ${product.rating} | ${product.reviewCount} ulasan | 
          ${product.sold.toLocaleString("id-ID")} terjual
        </span>
      </div>

      <div class="detail-price">
        Rp ${product.price.toLocaleString("id-ID")}
        <span class="detail-original-price">
          Rp ${product.originalPrice.toLocaleString("id-ID")}
        </span>
        <span class="discount-badge">${discount}%</span>
      </div>

      <div class="detail-meta">
        <div><i class="fas fa-tag"></i> ${product.category}</div>
        <div><i class="fas fa-barcode"></i> ${product.code}</div>
        <div><i class="fas fa-map-marker-alt"></i> ${product.location}</div>
        <div><i class="fas fa-shipping-fast"></i> Gratis Ongkir</div>
      </div>

      <p class="detail-description">${product.description}</p>

      <a href="${product.shopeeLink}" target="_blank" class="detail-buy-button">
        <i class="fas fa-shopping-cart"></i> Beli Sekarang di Shopee
      </a>
    </div>
  `;

  document.getElementById("productModal").style.display = "flex";
}

// Fungsi untuk mendapatkan HTML gambar detail (HANYA SATU FUNGSI)
function getDetailImageHTML(product) {
  // Gunakan gambar produk yang sama
  const imageUrl = product.image;

  if (imageUrl && imageUrl.startsWith("http")) {
    return `<img src="${imageUrl}" alt="${product.name}" class="detail-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/500x400/00a046/ffffff?text=YayayaShop';">`;
  } else if (imageUrl) {
    return `<img src="${imageUrl}" alt="${product.name}" class="detail-image" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\"image-placeholder\" style=\"height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;\"><i class=\"fas fa-image fa-5x\"></i></div>';">`;
  } else {
    return `<div class="image-placeholder" style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
      <i class="fas fa-${product.icon || "image"} fa-5x"></i>
    </div>`;
  }
}

// Fungsi pencarian produk
function searchProducts() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  const filteredProducts = products.filter((product) => {
    const searchInCode = product.code.toLowerCase().includes(searchTerm);
    const searchInName = product.name.toLowerCase().includes(searchTerm);
    const searchInCategory = product.category
      .toLowerCase()
      .includes(searchTerm);
    const searchInLocation = product.location
      .toLowerCase()
      .includes(searchTerm);

    return searchInCode || searchInName || searchInCategory || searchInLocation;
  });

  displayProducts(filteredProducts);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Tampilkan semua produk saat halaman dimuat
  displayProducts(products);

  // Event listener untuk tombol pencarian
  document
    .getElementById("searchButton")
    .addEventListener("click", searchProducts);

  // Event listener untuk input pencarian (ketika tekan Enter)
  document.getElementById("searchInput").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchProducts();
    }
  });

  // Event listener untuk menutup modal
  document.querySelector(".close-modal").addEventListener("click", () => {
    document.getElementById("productModal").style.display = "none";
  });

  // Event listener untuk menutup modal ketika klik di luar konten
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("productModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
