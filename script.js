// All JS functionalities are wrapped in DOMContentLoaded to ensure elements exist before binding

document.addEventListener("DOMContentLoaded", () => {

  // ========== Menu Toggle ==========
  const menuBtn = document.querySelector(".menu-icon");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuClose = document.querySelector(".menu-close");

  if (menuBtn && menuOverlay && menuClose) {
    menuBtn.addEventListener("click", () => {
      menuOverlay.classList.add("active");
    });
    menuClose.addEventListener("click", () => {
      menuOverlay.classList.remove("active");
    });
  }

  // ========== Search Toggle ==========
  const searchBtn = document.querySelector(".search-toggle");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchClose = document.querySelector(".search-close");

  if (searchBtn && searchOverlay && searchClose) {
    searchBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("hidden");
      searchOverlay.classList.add("active");
    });
    searchClose.addEventListener("click", () => {
      searchOverlay.classList.remove("active");
      searchOverlay.classList.add("hidden");
    });
  }

  // ========== Language Alert ==========
  const languageSelect = document.querySelector("select");
  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      alert("Language switching is currently under development.");
    });
  }

  // ========== Subscribe Alert ==========
  const emailInput = document.querySelector(".subscribe-row input[type='email']");
  const signUpBtn = document.querySelector(".subscribe-btn");
  const messageBox = document.getElementById("subscribe-message");

  function showMessage(text, isError = false) {
    if (!messageBox) return;
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

  if (signUpBtn && emailInput) {
    signUpBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      if (!email || !email.includes("@")) {
        showMessage("Please enter a valid email address.", true);
      } else {
        showMessage("Thanks for signing up!");
      }
    });
  }

  // ========== Hero Slideshow (mobile only) ==========
  const leftHero = document.querySelector(".hero-image.left img");
  const rightHero = document.querySelector(".hero-image.right img");
  const heroImages = ["assets/Hero1.jpg", "assets/Hero2.jpg"];
  let heroIndex = 0;

  function rotateHeroImages() {
    heroIndex = (heroIndex + 1) % heroImages.length;
    if (leftHero) leftHero.src = heroImages[heroIndex];
    if (rightHero) rightHero.src = heroImages[(heroIndex + 1) % heroImages.length];
  }

  if (window.innerWidth <= 768) {
    setInterval(rotateHeroImages, 4000);
  }

  // ========== Wishlist Toggle ==========
  const heartIcon = document.querySelector(".heart-icon img");
  if (heartIcon) {
    let isWished = false;
    heartIcon.addEventListener("click", function () {
      isWished = !isWished;
      heartIcon.src = isWished
        ? "icons/wishList_added.svg"
        : "icons/ic_wishList.svg";
    });
  }

  // ========== Color Switcher ==========
  const imageMap = {
    red: [
      "assets/octivia_dress.webp",
      "assets/OCTAVIA_front.webp",
      "assets/OCTAVIA_back.webp"
    ],
    purple: [
      "assets/OCTAVIADRESS-PURPLE1.webp",
      "assets/OCTAVIADRESS-PURPLE2.webp",
      "assets/OCTAVIADRESS-PURPLE3.webp"
    ],
    brown: [
      "assets/OCTAVIAMINIDRESS-BROWN1.webp",
      "assets/OCTAVIAMINIDRESS-BROWN2.webp",
      "assets/OCTAVIAMINIDRESS-BROWN4.webp"
    ]
  };

  const displayNameMap = {
    red: "Cherry Red",
    purple: "Purple",
    brown: "Brown"
  };

  const colorOptions = document.querySelectorAll(".color-option");
  const productImages = document.querySelectorAll(".product-images img");
  const selectedColorName = document.getElementById("selected-color-name");

  colorOptions.forEach(option => {
    option.addEventListener("click", () => {
      colorOptions.forEach(o => o.classList.remove("active-color"));
      option.classList.add("active-color");

      const color = option.dataset.color;
      const imgs = imageMap[color];

      productImages.forEach((img, idx) => {
        if (imgs[idx]) img.src = imgs[idx];
      });

      if (selectedColorName) {
        selectedColorName.textContent = displayNameMap[color];
      }
    });
  });

  // ========== Size Selector ==========
  const sizeButtons = document.querySelectorAll(".size-btn");
  const selectedSizeLabel = document.getElementById("selected-size");

  sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
      sizeButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const selectedSize = button.textContent;
      if (selectedSizeLabel) {
        selectedSizeLabel.textContent = selectedSize;
      }
    });
  });

  // ========== Reviews Swipe (Mobile) ==========
  const reviewGrid = document.querySelector(".reviews-grid");
  if (reviewGrid && window.innerWidth < 768) {
    reviewGrid.style.display = "flex";
    reviewGrid.style.overflowX = "auto";
    reviewGrid.style.gap = "1rem";
  }

  // ========== Featured Carousel Auto Scroll ==========
  const featured = document.querySelector(".featured-container");
  if (featured) {
    setInterval(() => {
      featured.scrollLeft += 1;
      if (featured.scrollLeft >= featured.scrollWidth - featured.clientWidth) {
        featured.scrollLeft = 0;
      }
    }, 400);
  }
  //========= Link index.html to search.html =========
  const searchInputBox = document.getElementById("searchInputBox");

  if (searchInputBox) {
    searchInputBox.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const query = searchInputBox.value.trim().toLowerCase();
        if (query === "dress") {
          window.location.href = "search.html";
        }
      }
    });
  }

  // ========== Shopping Bag Logic ==========
  let cart = [];

  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const product = getCurrentProductSelection();
      addToCart(product);
      showCartOverlay();
    });
  }

  function getCurrentProductSelection() {
    const title = document.querySelector('.product-title')?.textContent || '';
    const price = parseFloat(document.querySelector('.product-price')?.textContent.replace('$', '')) || 0;
    const selectedSize = document.getElementById('selected-size')?.textContent || '';
    const selectedColor = document.getElementById('selected-color-name')?.textContent || '';
    const image = document.querySelector('.product-images img')?.src || '';
  
    return {
      id: `${title}-${selectedSize}-${selectedColor}`,
      title: title,
      size: selectedSize,
      color: selectedColor,
      price: price,
      image: image,
      quantity: 1
    };
  }
  

  function addToCart(product) {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    updateCartDisplay();
    updateCartTotal();
  }

  window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartTotal();
  };

  window.updateCartQuantity = function(productId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        cart[itemIndex].quantity = parseInt(newQuantity);
        updateCartDisplay();
        updateCartTotal();
      }
    }
  };

  function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
  
    cartItemsContainer.innerHTML = '';
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
      return;
    }
  
    cart.forEach(item => {
      const cartItemHTML = `
        <div class="cart-item" data-id="${item.id}">
          <div class="item-img">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="item-info">
            <div class="item-name">${item.title}</div>
            <div class="item-options">Size: ${item.size} | Colour: ${item.color}</div>
            <div class="item-price">$${item.price.toFixed(2)}</div>
          </div>
          <div class="item-controls">
            <input type="number" min="1" value="${item.quantity}" 
                   onchange="updateCartQuantity('${item.id}', this.value)">
            <button onclick="removeFromCart('${item.id}')" class="remove-btn">×</button>
          </div>
        </div>
      `;
      cartItemsContainer.innerHTML += cartItemHTML;
    });
  }
  
  

  function updateCartTotal() {
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
      totalElement.textContent = cartTotal.toFixed(2);
    }
  }

  function showCartOverlay() {
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
      cartOverlay.classList.remove('hidden');
      cartOverlay.classList.add('show');
    }
  }

  function hideCartOverlay() {
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
      cartOverlay.classList.add('hidden');
      cartOverlay.classList.remove('show');
    }
  }

  document.addEventListener('click', function(e) {
    const cartOverlay = document.getElementById('cart-overlay');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    if (cartOverlay && !cartOverlay.contains(e.target) && e.target !== addToCartBtn) {
      hideCartOverlay();
    }
  });

  // ========== Accordion Functionality ==========
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const content = accordionItem.querySelector('.accordion-content');

      accordionItem.classList.toggle('active');

      if (accordionItem.classList.contains('active')) {
        content.style.display = 'block';
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.display = 'none';
        content.style.maxHeight = '0px';
      }
    });
  });
  //=========Account login
  const accountBtn = document.querySelector('button[aria-label="Account"]');
  const accountOverlay = document.getElementById("accountOverlay");
  const accountClose = document.getElementById("accountClose");

  if (accountBtn && accountOverlay && accountClose) {
    accountBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // 防止点到按钮也触发 document 的关闭逻辑
      accountOverlay.classList.remove("hidden");
    });

    accountClose.addEventListener("click", (e) => {
      e.stopPropagation(); // 防止冒泡误触
      accountOverlay.classList.add("hidden");
    });

  // 阻止内部点击冒泡
    const panel = accountOverlay.querySelector(".account-panel");
    if (panel) {
      panel.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

  // 点外部关闭浮窗
    document.addEventListener("click", function (e) {
      const isInsidePanel = e.target.closest("#accountOverlay .account-panel");
      const isAccountIcon = e.target.closest('button[aria-label="Account"]');
      if (!isInsidePanel && !isAccountIcon) {
        accountOverlay.classList.add("hidden");
      }
    });
  }
  

});


