
// Language Switcher (simulated)
document.querySelector("select").addEventListener("change", function () {
  alert("Language switching is currently under development.");
});

// Subscribe button with success message overlay
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector(".subscribe-row input[type='email']");
  const signUpBtn = document.querySelector(".subscribe-btn");
  const messageBox = document.getElementById("subscribe-message");

  function showMessage(text, isError = false) {
    messageBox.textContent = text;
    messageBox.classList.remove("hidden");
    messageBox.classList.add("show");

  if (isError) {
    messageBox.classList.add("error");
  } else {
    messageBox.classList.remove("error");
  }

  setTimeout(() => {
    messageBox.classList.remove("show");
    setTimeout(() => {
      messageBox.classList.add("hidden");
    }, 300);
  }, 3000);
  }

  signUpBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    if (email === "") {
      showMessage("Please enter your email address.", true);
    } else {
      showMessage("Sign up successful!");
      emailInput.value = "";
    }
  });

  // Cart icon simulation (optional if icon-btn used)
  const cartIcon = document.querySelector('[aria-label="Cart"]');
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      alert("Cart function coming soon!");
    });
  }

  // Hero image slideshow (mobile only)
  if (window.innerWidth <= 768) {
    const images = document.querySelectorAll('.hero-image');
    let current = 0;

    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, 2500);
  }

  // Menu overlay toggle
  const menuIcon = document.querySelector(".menu-icon");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  if (menuIcon && menuOverlay && menuClose) {
    menuIcon.addEventListener("click", () => {
      menuOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    menuClose.addEventListener("click", () => {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".menu-list a");

  menuLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault(); // ⛔ 阻止跳转
      alert("This feature is currently under development.");
    });
  });
});


//search function
document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.querySelector(".search-toggle");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInputBox = document.getElementById("searchInputBox");
  const searchIcon = document.getElementById("searchIcon");

  if (searchToggle && searchOverlay && searchInputBox && searchIcon) {
    // 点击 topbar 搜索图标，显示/隐藏 overlay
    searchToggle.addEventListener("click", () => {
      searchOverlay.classList.toggle("active");
      searchOverlay.classList.remove("hidden");
      if (searchOverlay.classList.contains("active")) {
        searchInputBox.focus();
      }
    });

    // 输入 + Enter
    searchInputBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });

    // 点击放大镜图标
    searchIcon.addEventListener("click", () => {
      performSearch();
    });

    function performSearch() {
      const query = searchInputBox.value.trim().toLowerCase();
      if (query === "dress") {
        window.location.href = "search.html";
      } else {
        alert("No matching result.");
      }
      }
    } else {
      console.error("Search elements not found in DOM.");
    }

    document.addEventListener("click", function (e) {
      const searchOverlay = document.getElementById("searchOverlay");
      const searchToggle = document.querySelector(".search-toggle");
    
      // 如果 overlay 当前是展开状态
      if (searchOverlay.classList.contains("active")) {
        // 如果点击目标不在 overlay 内，也不在按钮上
        if (
          !searchOverlay.contains(e.target) &&
          !searchToggle.contains(e.target)
        ) {
          searchOverlay.classList.remove("active");
        }
      }
    });
});

//product
document.querySelector('.add-to-bag').addEventListener('click', function() {
  const title = document.querySelector('.product-title').textContent;
  const price = document.querySelector('.product-price').textContent;
  const size = document.querySelector('.custom-select').value;
  const image = document.querySelector('.product-images img')?.src;

  if (size === 'Size') {
    alert('Please select a size.');
    return;
  }

  const product = { title, price, size, image };
  localStorage.setItem('cartItem', JSON.stringify(product));

  this.textContent = 'ADDED TO BAG ✓';
  this.style.backgroundColor = '#28a745';
  setTimeout(() => {
    this.textContent = 'ADD TO BAG';
    this.style.backgroundColor = '#8FBC8F';
  }, 2000);

});


document.addEventListener("DOMContentLoaded", () => {
  // 👜 打开购物袋
  const cartIcon = document.querySelector('[aria-label="Cart"]');
  const bagOverlay = document.getElementById("shoppingBagOverlay");
  const bagCloseBtn = document.getElementById("bagOverlayClose");
  const bagContent = document.querySelector(".shopping-bag-content");

  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      openShoppingBagOverlay();
    });
  }

  if (bagCloseBtn) {
    bagCloseBtn.addEventListener("click", () => {
      bagOverlay.classList.remove("active");
    });
  }

  // ✅ 显示购物车 overlay 内容
  function openShoppingBagOverlay() {
    const cartItem = JSON.parse(localStorage.getItem("cartItem"));
    const overlay = document.getElementById("shoppingBagOverlay");
    const container = document.querySelector(".shopping-bag-content");

    if (!container) return;

    if (cartItem) {
      container.innerHTML = `
        <div class="shopping-bag-item">
          <img src="${cartItem.image}" alt="${cartItem.title}">
          <div class="shopping-bag-details">
            <p>${cartItem.title}</p>
            <p>${cartItem.price}</p>
            <p>Size: ${cartItem.size}</p>
            <div class="qty-selector">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>
        </div>

        <div class="shopping-bag-perks">
          <button>👗 Pay For It Later<br><small>Wear it now</small></button>
          <button>📦 Free Shipping<br><small>Over $75</small></button>
          <button>↩️ Free Returns*<br><small>Fast & Easy</small></button>
        </div>

        <p style="font-size: 0.75rem; color: #555; margin-bottom: 1rem;">
          Final taxes and Shipping Costs Calculated at Checkout
        </p>

        <div class="shopping-bag-summary">
          <p>Total: <strong>${cartItem.price}</strong></p>
          <button class="checkout-btn" id="checkoutBtn">CHECKOUT</button>
        </div>
      `;
    } else {
      container.innerHTML = `<p>Your bag is empty.</p>`;
    }

    overlay.classList.add("active");
  }

  // 🛍️ test.html 产品页按钮绑定（如果有）
  const addToBagBtn = document.getElementById("addToBagBtn");
  if (addToBagBtn) {
    addToBagBtn.addEventListener("click", () => {
      const sizeSelect = document.getElementById("sizeSelect");
      const selectedSize = sizeSelect.value;
      const productTitle = document.querySelector(".product-title")?.textContent;
      const productPrice = document.querySelector(".product-price")?.textContent;
      const productImage = document.querySelector(".main-product-image")?.getAttribute("src");

      if (selectedSize === "Select Size") {
        alert("Please select a size.");
        return;
      }

      const product = {
        title: productTitle,
        price: productPrice,
        size: selectedSize,
        image: productImage,
      };

      localStorage.setItem("cartItem", JSON.stringify(product));
      alert("Added to bag!");
    });
  }
});
