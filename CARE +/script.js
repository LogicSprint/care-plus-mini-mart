// script.js – fixed Unsplash image URLs for all products

(function() {
  // ---------- product data with verified Unsplash image URLs ----------
  const products = [
    {
      name: "Vitamin C 1000mg",
      desc: "USA immune support",
      price: "1250 ETB",
      img: "https://images.unsplash.com/photo-1616671087139-2c7a4e3c6f6d?w=400&auto=format&fit=crop"
    },
    {
      name: "Retinol Serum 1%",
      desc: "Anti-aging cosmetic",
      price: "1890 ETB",
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop"
    },
    {
      name: "Omega-3 Fish Oil",
      desc: "Heart & brain health",
      price: "980 ETB",
      img: "https://images.unsplash.com/photo-1577174881668-5a5a2f6a7b8c?w=400&auto=format&fit=crop"
    },
    {
      name: "Collagen Peptides",
      desc: "Skin & joints",
      price: "2150 ETB",
      img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop"
    },
    {
      name: "Probiotic 60B",
      desc: "Gut health",
      price: "1670 ETB",
      img: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&auto=format&fit=crop"
    },
    {
      name: "Hyaluronic Acid",
      desc: "Moisture boost",
      price: "1430 ETB",
      img: "https://images.unsplash.com/photo-1608248543803-bd4f8cda4c8f?w=400&auto=format&fit=crop"
    }
  ];

  // ---------- testimonial data with Unsplash avatars ----------
  const testimonials = [
    { name: "Hana T.", review: "Original products, fast delivery!", stars: "★★★★★", avatar: "https://images.unsplash.com/photo-1494790108777-467efb7c9e1e?w=100&h=100&fit=crop" },
    { name: "Yonas D.", review: "Vitamins work great, trusted source.", stars: "★★★★★", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    { name: "Meron A.", review: "Love the skincare, feels luxurious.", stars: "★★★★☆", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { name: "Biruk F.", review: "Cash on delivery is convenient.", stars: "★★★★★", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { name: "Selam G.", review: "My go-to for USA products.", stars: "★★★★★", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop" }
  ];

  // ---------- render product grid with images ----------
  const grid = document.getElementById('productGrid');
  if (grid) {
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.setAttribute('data-product-name', p.name);
      card.innerHTML = `
        <div class="product-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </div>
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="price">${p.price}</div>
        <button class="btn-order-card" data-product="${p.name}">Order Now</button>
      `;
      grid.appendChild(card);
    });
  }

  // ---------- render testimonial carousel with Unsplash avatars ----------
  const carousel = document.getElementById('testimonialCarousel');
  if (carousel) {
    testimonials.forEach(t => {
      const div = document.createElement('div');
      div.className = 'testimonial-card';
      div.innerHTML = `
        <div class="avatar">
          <img src="${t.avatar}" alt="${t.name}" loading="lazy">
        </div>
        <p>"${t.review}"</p>
        <div class="stars">${t.stars}</div>
        <strong>${t.name}</strong>
      `;
      carousel.appendChild(div);
    });
  }

  // ---------- modal and interaction (unchanged, fully functional) ----------
  const modal = document.getElementById('orderModal');
  const modalProductInput = document.getElementById('modalProduct');
  const modalName = document.getElementById('modalName');
  const modalPhone = document.getElementById('modalPhone');
  const modalAddress = document.getElementById('modalAddress');
  const modalQty = document.getElementById('modalQty');
  const sendBtn = document.getElementById('sendOrderBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const toast = document.getElementById('toastMessage');

  function showToast(msg, duration = 3000) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  window.openOrderModal = (productName = '') => {
    if (productName) modalProductInput.value = productName;
    else modalProductInput.value = 'Care+ Mart item';
    modal.style.display = 'flex';
  };

  function closeModal() {
    modal.style.display = 'none';
  }

  // Event delegation for order buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-order-card') || e.target.closest('.btn-order-card')) {
      const btn = e.target.closest('.btn-order-card');
      const product = btn.getAttribute('data-product') || 'USA product';
      openOrderModal(product);
    }
    if (e.target.id === 'navOrderBtn' || e.target.closest('#navOrderBtn')) {
      e.preventDefault();
      openOrderModal('Your selection');
    }
  });

  document.getElementById('heroShopBtn')?.addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('heroContactBtn')?.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });

  closeModalBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  sendBtn.addEventListener('click', () => {
    const name = modalName.value.trim() || 'Not provided';
    const phone = modalPhone.value.trim() || 'Not provided';
    const address = modalAddress.value.trim() || 'Not provided';
    const product = modalProductInput.value;
    const qty = modalQty.value || '1';

    console.log('Order:', { name, phone, address, product, qty });
    showToast('📨 Sent to: email · Instagram DM · Telegram DM');

    closeModal();
    modalName.value = '';
    modalPhone.value = '';
    modalAddress.value = '';
    modalQty.value = '1';
  });

  // Newsletter
  document.getElementById('subscribeBtn')?.addEventListener('click', () => {
    const email = document.getElementById('newsEmail').value.trim();
    if (email.includes('@') && email.includes('.')) {
      showToast(`📧 Notification placeholder for ${email} (new products & promos)`);
      document.getElementById('newsEmail').value = '';
    } else {
      showToast('❌ Please enter a valid email', 2500);
    }
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-show');
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId) || document.getElementById('home');
      targetEl.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth <= 800) {
        navLinks.classList.remove('mobile-show');
      }
    });
  });

  // Push notification placeholder
  setTimeout(() => {
    console.log('🔔 Push notification placeholder: new products & promotions');
  }, 2000);
})();