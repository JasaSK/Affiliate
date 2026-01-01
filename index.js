// Fungsi untuk menampilkan produk
function displayProducts(productsToShow) {
  const productsContainer = document.getElementById("productsContainer");
  const productCount = document.getElementById("productCount");

  // Kosongkan kontainer produk
  productsContainer.innerHTML = "";

  // Update jumlah produk
  const count = productsToShow.length;
  productCount.textContent = `${count} Produk`;

  if (count === 0) {
    // Tampilkan pesan jika tidak ada produk
    productsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>Produk tidak ditemukan</h3>
        <p>Coba gunakan <strong>kode produk</strong> atau <strong>nama produk</strong> yang lain</p>
      </div>
    `;
    return;
  }

  // Tampilkan produk
  productsToShow.forEach((product) => {
    // Hitung diskon
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    // Format harga
    const formattedPrice = product.price.toLocaleString("id-ID");
    const formattedOriginalPrice =
      product.originalPrice.toLocaleString("id-ID");
    const formattedSold = product.sold.toLocaleString("id-ID");

    // Buat elemen kartu produk
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.setAttribute("data-code", product.code);

    productCard.innerHTML = `
      <div class="product-badge">${product.category}</div>

      <div class="product-image">
        <img 
          src="${product.image}" 
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/00a046/ffffff?text=YayayaShop';"
        >
        <div class="product-code">${product.code}</div>
      </div>

      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>

        <div class="product-price-container">
          <span class="product-price">Rp ${formattedPrice}</span>
          <span class="product-original-price">Rp ${formattedOriginalPrice}</span>
          <span class="discount-badge">${discount}%</span>
        </div>

        <div class="product-rating">
          ${generateStarRating(product.rating)}
          <span>${product.rating} (${product.reviewCount})</span>
        </div>

        <div class="product-sold">Terjual: ${formattedSold}</div>

        <div class="product-location">
          <i class="fas fa-map-marker-alt"></i> ${product.location}
        </div>

        <a href="${product.shopeeLink}" target="_blank" class="buy-button">
          <i class="fas fa-shopping-cart"></i> Beli di Shopee
        </a>
      </div>
    `;

    // Tambahkan event listener untuk klik pada kartu (kecuali tombol beli)
    productCard.addEventListener("click", (e) => {
      // Jangan aktifkan jika klik tombol beli
      if (!e.target.closest(".buy-button")) {
        showProductDetail(product);
      }
    });

    // Tambahkan kartu ke kontainer
    productsContainer.appendChild(productCard);
  });
}

// Fungsi untuk menghasilkan rating bintang
function generateStarRating(rating) {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3;

  // Bintang penuh
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  // Bintang setengah
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  // Bintang kosong
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// Fungsi untuk menampilkan detail produk
function showProductDetail(product) {
  const productDetail = document.getElementById("productDetail");
  const modal = document.getElementById("productModal");

  // Hitung diskon
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Format angka
  const formattedPrice = product.price.toLocaleString("id-ID");
  const formattedOriginalPrice = product.originalPrice.toLocaleString("id-ID");
  const formattedSold = product.sold.toLocaleString("id-ID");

  // Tampilkan detail produk
  productDetail.innerHTML = `
    <div class="detail-image-container">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="detail-image"
        onerror="this.onerror=null; this.src='https://via.placeholder.com/500x400/00a046/ffffff?text=YayayaShop';"
      >
      <div class="detail-image-code">${product.code}</div>
    </div>

    <div class="detail-info">
      <h1 class="detail-title">${product.name}</h1>

      <div class="detail-rating">
        ${generateStarRating(product.rating)}
        <span>
          ${product.rating} | ${product.reviewCount} ulasan | 
          ${formattedSold} terjual
        </span>
      </div>

      <div class="detail-price-container">
        <span class="detail-price">Rp ${formattedPrice}</span>
        <span class="detail-original-price">Rp ${formattedOriginalPrice}</span>
        <span class="detail-discount-badge">${discount}%</span>
      </div>

      <div class="detail-meta">
        <div class="detail-meta-item">
          <i class="fas fa-tag"></i>
          <span>${product.category}</span>
        </div>
        <div class="detail-meta-item">
          <i class="fas fa-barcode"></i>
          <span>${product.code}</span>
        </div>
        <div class="detail-meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${product.location}</span>
        </div>
        <div class="detail-meta-item">
          <i class="fas fa-shipping-fast"></i>
          <span>Gratis Ongkir</span>
        </div>
      </div>

      <p class="detail-description">${product.description}</p>

      <a href="${product.shopeeLink}" target="_blank" class="detail-buy-button">
        <i class="fas fa-shopping-cart"></i> Beli Sekarang di Shopee
      </a>
    </div>
  `;

  // Tampilkan modal
  modal.style.display = "flex";

  // Cegah scroll body saat modal terbuka
  document.body.style.overflow = "hidden";
}

// Fungsi pencarian produk
function searchProducts() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  // Jika input kosong, tampilkan semua produk
  if (!searchTerm) {
    displayProducts(products);
    return;
  }

  // Filter produk berdasarkan pencarian
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

  // Tampilkan produk yang difilter
  displayProducts(filteredProducts);
}

// Inisialisasi saat halaman dimuat
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
    const modal = document.getElementById("productModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Event listener untuk menutup modal ketika klik di luar konten
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("productModal");
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Event listener untuk tombol escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const modal = document.getElementById("productModal");
      if (modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  });
});
