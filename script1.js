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
    const searchInputBox = document.getElementById("searchInputBox");
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
        setInterval(rotateHeroImages, 2500);
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
        "red": [
            "assets/octivia_dress.webp",
            "assets/OCTAVIA_front.webp",
            "assets/OCTAVIA_back.webp"
        ],
        "purple": [
            "assets/OCTAVIADRESS-PURPLE1.webp",
            "assets/OCTAVIADRESS-PURPLE2.webp",
            "assets/OCTAVIADRESS-PURPLE3.webp"
        ],
        "brown": [
            "assets/OCTAVIAMINIDRESS-BROWN1.webp",
            "assets/OCTAVIAMINIDRESS-BROWN2.webp",
            "assets/OCTAVIAMINIDRESS-BROWN4.webp"
        ],
        "indigopurple": [
            "assets/indigo_minidress.webp",
            "assets/INDIGOMINIDRESS-PURPLE-front.webp",
            "assets/INDIGOMINIDRESS-PURPLE-back.webp"
        ],
        "indigobrown": [
            "assets/INDIGO_MINI_DRESS_CHOC.webp",
            "assets/INDIGO_MINI_DRESS_CHOC-front.webp",
            "assets/INDIGO_MINI_DRESS_CHOC-back.webp"
        ]


    };

    const displayNameMap = {
        red: "Cherry Red",
        purple: "Purple",
        brown: "Brown",
        indigopurple: "Purple",
        indigobrown: "Brown"
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
    function autoScrollFeaturedLoop() {
        const container = document.querySelector(".featured-container");
        if (!container) return;

        // 克隆内容实现无缝滚动
        container.innerHTML += container.innerHTML;

        let scrollSpeed = 0.5;
        let rafId;

        function loopScroll() {
            container.scrollLeft += scrollSpeed;

            // 如果滚动超过原始内容一半（即第一次内容末尾），就回到起点
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            }

            rafId = requestAnimationFrame(loopScroll);
        }

        rafId = requestAnimationFrame(loopScroll);
    }
    autoScrollFeaturedLoop();


    // ========== Shopping Bag Logic ==========
    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const cartCloseBtn = document.querySelector('.cart-close');
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', () => {
            hideCartOverlay();
            cart = [];
            saveCart();
            updateCartDisplay();
            updateCartTotal();
        });
    }

    const shoppingBagBtns = document.querySelectorAll("#shopping-bag-btn");
    shoppingBagBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Shopping bag clicked!");
            showCartOverlay();
            updateCartDisplay();
            updateCartTotal();
        });
    });

    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
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
        saveCart();
        updateCartDisplay();
        updateCartTotal();
    }

    window.removeFromCart = function (productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartDisplay();
        updateCartTotal();
    };

    window.updateCartQuantity = function (productId, newQuantity) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                cart[itemIndex].quantity = parseInt(newQuantity);
                saveCart();
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
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.setAttribute('data-id', item.id);

            cartItem.innerHTML = `
            <div class="item-img">
              <img src="${item.image}" alt="${item.title}" />
            </div>
            <div class="item-info">
              <div class="item-name">${item.title}</div>
              <div class="item-options">Size: ${item.size} | Colour: ${item.color}</div>
              <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="item-controls">
              <input type="number" min="1" value="${item.quantity}" />
              <button class="remove-btn" data-action="remove-item">×</button>

            </div>
          `;


            cartItem.querySelector('.remove-btn').addEventListener('click', () => {
                cart = cart.filter(i => i.id !== item.id);
                updateCartDisplay();
                updateCartTotal();
            });


            cartItem.querySelector('input[type="number"]').addEventListener('change', (e) => {
                const newQty = parseInt(e.target.value);
                if (newQty > 0) {
                    item.quantity = newQty;
                    updateCartTotal();
                } else {
                    cart = cart.filter(i => i.id !== item.id);
                    updateCartDisplay();
                    updateCartTotal();
                }
            });

            cartItemsContainer.appendChild(cartItem);
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
        console.log(">>> showCartOverlay triggered");
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartOverlay) {
            cartOverlay.classList.remove('hidden')
            cartOverlay.classList.add('show');
        }
    }

    function hideCartOverlay() {
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartOverlay) {
            cartOverlay.classList.add('hidden');
            cartOverlay.classList.remove('show')
        }
    }

    const checkoutBtn = document.getElementById("go-to-checkout");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];


            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }


            window.location.href = "checkout.html";
        });
    }


    document.addEventListener('click', function (e) {
        const cartOverlay = document.getElementById('cart-overlay');
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (e.target.closest('.cart-close')) return;
        if (
            cartOverlay &&
            !cartOverlay.contains(e.target) &&
            e.target !== addToCartBtn &&
            !e.target.closest('[data-action="remove-item"]')
        ) {
            hideCartOverlay();
        }





    });


    // ========== Accordion Functionality ==========
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
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
    //=======checkout=======
    renderCheckoutItems();
    if (window.location.pathname.includes("checkout.html")) {
        renderCheckoutItems();
    }
    function renderCheckoutItems() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const container = document.getElementById("checkout-items");
        const subtotalEl = document.getElementById("checkout-subtotal");
        const totalEl = document.getElementById("checkout-total");

        if (!container || !subtotalEl || !totalEl) return;

        container.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const itemEl = document.createElement("div");
            itemEl.className = "checkout-item";
            itemEl.innerHTML = `
            <div class="checkout-item-row" style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
              <div class="checkout-item-image" style="flex-shrink: 0;">
                <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 80px; object-fit: cover; border: 1px solid #ccc;" />
              </div>
              <div class="checkout-item-info">
                <strong>${item.title}</strong><br/>
                Size: ${item.size} | Color: ${item.color}<br/>
                Qty: ${item.quantity}<br/>
                <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            </div>
          `;
            container.appendChild(itemEl);
            total += item.price * item.quantity;
        });

        subtotalEl.textContent = `$${total.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    }
    //=========Pay now
    function showThankYouPopup() {
        const popup = document.createElement("div");
        popup.className = "thank-you-popup";
        popup.innerHTML = `
            <div class="thank-you-box">
                <h2>Thank you for your purchase!</h2>
                <button class="close-popup">OK</button>
            </div>
        `;

        document.body.appendChild(popup);

        document.querySelector(".close-popup").addEventListener("click", () => {
            popup.remove();
            window.location.href = "index.html";
        });
    }




    //=========Account login
    const accountBtn = document.querySelector('button[aria-label="Account"]');
    const accountOverlay = document.getElementById("accountOverlay");
    const accountClose = document.getElementById("accountClose");

    if (accountBtn && accountOverlay && accountClose) {
        accountBtn.addEventListener("click", () => {
            accountOverlay.classList.remove("hidden");
        });

        accountClose.addEventListener("click", () => {
            accountOverlay.classList.add("hidden");
        });

        document.addEventListener("click", function (e) {
            const isInsidePanel = e.target.closest("#accountOverlay .account-panel");
            const isAccountIcon = e.target.closest('button[aria-label="Account"]');

            if (!isInsidePanel && !isAccountIcon) {
                accountOverlay.classList.add("hidden");
            }
        });
    }

    //========= Form check
    const form = document.getElementById('checkout-form');
    const errorBox = document.getElementById('form-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        let messages = [];


        const resetBorders = () => {
            form.querySelectorAll('input, select').forEach(el => {
                el.style.border = '';
            });
        };
        resetBorders();

        // 1. email format
        const email = form.querySelector('#email');
        if (!email.value.trim() || !email.value.includes('@')) {
            isValid = false;
            email.style.border = '1px solid red';
            messages.push('Please enter a valid email.');
        }

        // 2. card number
        const cardNumber = form.querySelector('#card-number');
        if (!/^\d{16}$/.test(cardNumber.value.trim())) {
            isValid = false;
            cardNumber.style.border = '1px solid red';
            messages.push('Card number must be 16 digits.');
        }

        // 3. date：MM / YY 
        const expiry = form.querySelector('#expiry');
        if (!/^\d{2} \/ \d{2}$/.test(expiry.value.trim())) {
            isValid = false;
            expiry.style.border = '1px solid red';
            messages.push('Expiration must be in MM / YY format.');
        }

        // 4. security code：3/4 numbers
        const securityCode = form.querySelector('#security-code');
        if (!/^\d{3,4}$/.test(securityCode.value.trim())) {
            isValid = false;
            securityCode.style.border = '1px solid red';
            messages.push('Security code must be 3 or 4 digits.');
        }

        // 5. phone number： ≥ 8
        const phone = form.querySelector('#phone');
        if (!/^\d{8,}$/.test(phone.value.trim())) {
            isValid = false;
            phone.style.border = '1px solid red';
            messages.push('Phone number must be at least 8 digits.');
        }

        // 6. postcode：4 numbers
        const postcode = form.querySelector('#postcode');
        if (!/^\d{4}$/.test(postcode.value.trim())) {
            isValid = false;
            postcode.style.border = '1px solid red';
            messages.push('Postcode must be 4 digits.');
        }


        const requiredFields = form.querySelectorAll('input[required], select[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.border = '1px solid red';
                if (!messages.includes('Please fill out all required fields.')) {
                    messages.push('Please fill out all required fields.');
                }
            }
        });


        // Display results
        if (isValid) {
            errorBox.classList.add('hidden');
            showThankYouPopup();
            localStorage.removeItem("cart");
        } else {
            errorBox.textContent = messages.join(" ");
            errorBox.classList.remove('hidden');
        }


    });
});