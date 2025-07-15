// ========== Navbar Hamburger ==========
document.addEventListener('DOMContentLoaded', function () {
  // Navbar toggle
  const toggle = document.getElementById('navbar-toggle');
  const links = document.getElementById('navbar-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }
  // إظهار/إخفاء أزرار الدخول/التسجيل حسب حالة المستخدم
  function updateNavbarAuth() {
    if (!links) return;
    const user = localStorage.getItem('user');
    
    // Navbar Links
    const loginBtn = links.querySelector('a[href="login.html"]');
    const signupBtn = links.querySelector('a[href="signup-customer.html"], a.cta');
    let profileBtn = links.querySelector('.profile-link');

    // Footer Links
    const footer = document.querySelector('.footer');
    const footerLogin = footer ? footer.querySelector('a[href="login.html"]') : null;
    const footerSignup = footer ? footer.querySelector('a[href="signup-customer.html"]') : null;

    if (user) {
      // Navbar
      if (loginBtn) loginBtn.style.display = 'none';
      if (signupBtn) signupBtn.style.display = 'none';
      if (!profileBtn) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="profile.html" class="profile-link"><span class="profile-icon">👤</span>  ${JSON.parse(user).name}</a>`;
        links.appendChild(li);
      } else {
        profileBtn.parentElement.style.display = '';
      }
      // Footer
      if (footerLogin) footerLogin.parentElement.style.display = 'none';
      if (footerSignup) footerSignup.parentElement.style.display = 'none';
    } else {
      // Navbar
      if (loginBtn) loginBtn.style.display = '';
      if (signupBtn) signupBtn.style.display = '';
      if (profileBtn) profileBtn.parentElement.style.display = 'none';
      // Footer
      if (footerLogin) footerLogin.parentElement.style.display = '';
      if (footerSignup) footerSignup.parentElement.style.display = '';
    }
  }
  updateNavbarAuth();
  // عند تغيير حالة المستخدم (تسجيل دخول/خروج)
  window.addEventListener('storage', updateNavbarAuth);

  // ========== Providers Data ==========
  const doctors = [
    { id: 1, name: "د. زياد عبد الله", city: "بنغازي", specialty: "جراحة", price: 150, rating: 4.8, img: "assets/img/T2.jpg", times: ["السبت صباحاً", "الأحد مساءً"], verified: true, reviewsCount: 112, jobsCompleted: 250, responseTime: "ساعة" },
    { id: 2, name: "د. عبد الرؤوف الهنيدي", city: "طرابلس", specialty: "قلب", price: 220, rating: 4.9, img: "assets/img/T3.jpg", times: ["الإثنين صباحاً", "الثلاثاء مساءً"], verified: true, reviewsCount: 98, jobsCompleted: 180, responseTime: "ساعتين" },
    { id: 3, name: "د. محمد السنوسي", city: "مصراتة", specialty: "عيون", price: 90, rating: 4.7, img: "assets/img/T4.jpg", times: ["الأربعاء صباحاً", "الخميس مساءً"], verified: false, reviewsCount: 75, jobsCompleted: 130, responseTime: "3 ساعات" }
  ];
  const teachers = [
    { id: 1, name: "أ. سارة المغربي", city: "طرابلس", specialty: "رياضيات", price: 80, rating: 4.9, img: "assets/img/A1.jpg", times: ["الأحد صباحاً", "الثلاثاء مساءً"], verified: true, reviewsCount: 145, jobsCompleted: 320, responseTime: "3 ساعات" },
    { id: 2, name: "أ. يوسف الدرسي", city: "بنغازي", specialty: "فيزياء", price: 70, rating: 4.8, img: "assets/img/A3.jpg", times: ["الإثنين صباحاً", "الأربعاء مساءً"], verified: true, reviewsCount: 110, jobsCompleted: 280, responseTime: "ساعتين" },
    { id: 3, name: "أ. ليلى الشاعري", city: "مصراتة", specialty: "لغة إنجليزية", price: 75, rating: 4.9, img: "assets/img/A2.jpg", times: ["الخميس صباحاً", "السبت مساءً"], verified: false, reviewsCount: 95, jobsCompleted: 240, responseTime: "ساعة" }
  ];
  const workers = [
    { id: 1, name: "علي الورفلي", city: "طرابلس", specialty: "نجار", price: 65, rating: 4.9, img: "assets/img/W1.jpg", times: ["الأحد صباحاً", "الثلاثاء مساءً"], verified: true, reviewsCount: 145, jobsCompleted: 112, responseTime: "3 ساعات" },
    { id: 2, name: "سامي المقرحي", city: "بنغازي", specialty: "كهربائي", price: 50, rating: 4.8, img: "assets/img/W2.jpg", times: ["الإثنين صباحاً", "الأربعاء مساءً"], verified: true, reviewsCount: 120, jobsCompleted: 95, responseTime: "ساعتين" },
    { id: 3, name: "احمد الفيتوري", city: "مصراتة", specialty: "عاملة نظافة", price: 30, rating: 4.9, img: "assets/img/W3.jpg", times: ["الخميس صباحاً", "السبت مساءً"], verified: true, reviewsCount: 98, jobsCompleted: 67, responseTime: "ساعتان" }
  ];

  // Helper: تحديد نوع القسم الحالي من اسم الصفحة
  function getCategory() {
    const path = window.location.pathname;
    if (path.includes('category-doctors')) return 'doctors';
    if (path.includes('category-teachers')) return 'teachers';
    if (path.includes('category-workers')) return 'workers';
    return 'doctors'; // افتراضي
  }
  const currentCategory = getCategory();
  let providers = doctors;
  if (currentCategory === 'teachers') providers = teachers;
  if (currentCategory === 'workers') providers = workers;

  // ========== Providers List & Filters ==========

  // بحث سريع عن مزود خدمة بالاسم من الصفحة الرئيسية (يجب أن يكون بعد تعريف البيانات)
  var searchForm = document.getElementById('provider-search-form');
  var searchInput = document.getElementById('provider-search-input');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = searchInput.value.trim();
      if (!q) return;
      var found = null, cat = '', page = '';
      found = doctors.find(function(p) {
        var cleanName = p.name.replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '').replace(/\s+/g, '').toLowerCase();
        var cleanQ = q.replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '').replace(/\s+/g, '').toLowerCase();
        return cleanName.includes(cleanQ);
      });
      if (found) { cat = 'doctors'; page = 'provider-doctor.html'; }
      if (!found) {
        found = teachers.find(function(p) {
          var cleanName = p.name.replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '').replace(/\s+/g, '').toLowerCase();
          var cleanQ = q.replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '').replace(/\s+/g, '').toLowerCase();
          return cleanName.includes(cleanQ);
        });
        if (found) { cat = 'teachers'; page = 'provider-teacher.html'; }
      }
      if (!found) {
        found = workers.find(function(p) {
          var cleanName = p.name.replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '').replace(/\s+/g, '').toLowerCase();
          var cleanQ = q.replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '').replace(/\s+/g, '').toLowerCase();
          return cleanName.includes(cleanQ);
        });
        if (found) { cat = 'workers'; page = 'provider-worker.html'; }
      }
      if (found) {
        window.location.href = page + '?id=' + found.id + '&cat=' + cat;
      } else {
        alert('لم يتم العثور على مزود خدمة بهذا الاسم');
      }
    });
  }
  const providersList = document.getElementById('providers-list');
  if (providersList) {
    function renderProviders(list) {
      providersList.innerHTML = '';
      if (list.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'no-providers-msg';
        noResult.textContent = 'لا توجد نتائج مطابقة للفلاتر المختارة.';
        providersList.appendChild(noResult);
        return;
      }
      list.forEach(p => {
        const cardLink = document.createElement('a');
        cardLink.className = 'provider-card-link';
        
        // تحديد صفحة التفاصيل حسب القسم
        let providerPage = 'provider.html';
        if (currentCategory === 'doctors') providerPage = 'provider-doctor.html';
        else if (currentCategory === 'teachers') providerPage = 'provider-teacher.html';
        else if (currentCategory === 'workers') providerPage = 'provider-worker.html';
        
        cardLink.href = `${providerPage}?id=${p.id}&cat=${currentCategory}`;

        cardLink.innerHTML = `
          <div class="provider-card">
            <div class="card-image-wrapper">
              <img src="${p.img}" alt="${p.name}">
              <div class="card-badges">
                ${p.verified ? '<span class="badge badge-verified">موثوق</span>' : ''}
                <span class="badge badge-service">${p.specialty}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="card-header">
                <span class="card-rating">
                  <img src="https://img.icons8.com/fluency/16/star.png" alt="star"/>
                  ${p.rating}
                </span>
                <h3 class="card-name">${p.name}</h3>
                <span class="card-location">${p.city}</span>
              </div>
              <p class="card-description">
                خدمات ${p.specialty} احترافية وموثوقة مع الاهتمام بالتفاصيل.
              </p>
              <div class="card-stats">
                <div class="stat-item">
                  <span>${p.reviewsCount}</span>
                  <small>تقييم</small>
                </div>
                <div class="stat-item">
                  <span>${p.jobsCompleted}</span>
                  <small>وظيفة مكتملة</small>
                </div>
                <div class="stat-item">
                  <span>${p.responseTime}</span>
                  <small>يجيب خلال</small>
                </div>
                <div class="stat-item">
                  <span>${p.price} د.ل</span>
                  <small>/ساعة</small>
                </div>
              </div>
            </div>
          </div>
        `;
        providersList.appendChild(cardLink);
      });
    }
    renderProviders(providers);

    // Event delegation: عند الضغط على احجز الآن انتقل لصفحة التفاصيل مع #booking، وعند الضغط على التفاصيل انتقل فقط لصفحة التفاصيل
    providersList.addEventListener('click', function(e) {
      const bookBtn = e.target.closest('.cta-btn');
      const detailsBtn = e.target.closest('.details-btn');
      if (bookBtn) {
        e.preventDefault();
        // انتقل لصفحة التفاصيل مع #booking
        const href = bookBtn.getAttribute('href');
        window.location.href = href;
        return;
      }
      // زر التفاصيل يبقى كما هو (الانتقال الافتراضي)
    });

    // Filter logic
    const filterCity = document.getElementById('filter-city');
    // دعم جميع أنواع الفلاتر حسب القسم
    let filterSpecialty = document.getElementById('filter-specialty') || document.getElementById('filter-subject') || document.getElementById('filter-profession');
    const filterPrice = document.getElementById('filter-price');
    const filterDay = document.getElementById('filter-day');
    [filterCity, filterSpecialty, filterPrice, filterDay].forEach(f => {
      if (f) f.addEventListener('change', filterProviders);
    });

    function filterProviders() {
      let filtered = providers.slice();
      // فلترة المدينة
      if (filterCity && filterCity.value) {
        filtered = filtered.filter(p => p.city === filterCity.value);
      }
      // فلترة المهنة/التخصص/المادة
      if (filterSpecialty && filterSpecialty.value) {
        filtered = filtered.filter(p => p.specialty === filterSpecialty.value);
      }
      // فلترة السعر (تعمل الآن لكل الأقسام)
      if (filterPrice && filterPrice.value) {
        const val = filterPrice.value;
        if (val === 'lt100') {
          filtered = filtered.filter(p => Number(p.price) < 100);
        } else if (val === '100-200') {
          filtered = filtered.filter(p => Number(p.price) >= 100 && Number(p.price) <= 200);
        } else if (val === 'gt200') {
          filtered = filtered.filter(p => Number(p.price) > 200);
        } else if (!isNaN(Number(val))) {
          filtered = filtered.filter(p => Number(p.price) === Number(val));
        }
      }
      // فلترة اليوم
      if (filterDay && filterDay.value) {
        filtered = filtered.filter(p => p.times.some(t => t.includes(filterDay.value)));
      }
      renderProviders(filtered);
    }
  }



  // ========== Unified Signup Page Logic ==========
  // معالجة تسجيل الدخول
  if (document.querySelector('form.auth-form') && window.location.pathname.includes('login.html')) {
    const form = document.querySelector('form.auth-form');
    form.onsubmit = function(e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      const pass = form.querySelector('input[type="password"]').value.trim();
      // بيانات وهمية فقط
      const user = { name: 'مستخدم', email: email, phone: '0912345678' };
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'index.html';
    };
  }
  // معالجة التسجيل (عميل)
  if (document.getElementById('customer-form')) {
    const form = document.getElementById('customer-form');
    form.onsubmit = function(e) {
      e.preventDefault();
      const name = form.querySelector('input[name="name"]') ? form.querySelector('input[name="name"]').value.trim() : 'مستخدم';
      const email = form.querySelector('input[name="email"]').value.trim();
      const phone = form.querySelector('input[name="phone"]').value.trim();
      const pass = form.querySelector('input[name="password"]') ? form.querySelector('input[name="password"]').value : '';
      const confirm = form.querySelector('input[name="password-confirm"]') ? form.querySelector('input[name="password-confirm"]').value : '';
      if (pass !== confirm) {
        alert('كلمة المرور وتأكيد كلمة المرور غير متطابقتين!');
        return;
      }
      const user = { name, email, phone };
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'index.html';
    };
  }
  // معالجة التسجيل (مزود خدمة)
  if (document.getElementById('provider-signup-form')) {
    const form = document.getElementById('provider-signup-form');
    form.onsubmit = function(e) {
      e.preventDefault();
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const phone = form.querySelector('input[name="phone"]').value.trim();
      const pass = form.querySelector('input[name="password"]') ? form.querySelector('input[name="password"]').value : '';
      const confirm = form.querySelector('input[name="password-confirm"]') ? form.querySelector('input[name="password-confirm"]').value : '';
      if (pass !== confirm) {
        alert('كلمة المرور وتأكيد كلمة المرور غير متطابقتين!');
        return;
      }
      const user = { name, email, phone };
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'index.html';
    };
  }
  // تبويبات اختيار نوع الحساب
  const tabs = document.querySelectorAll('.tab-btn');
  const customerForm = document.getElementById('customer-form');
  const providerForm = document.getElementById('provider-form');
  if (tabs.length && customerForm && providerForm) {
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        if (this.dataset.type === 'customer') {
          customerForm.style.display = 'block';
          providerForm.style.display = 'none';
        } else {
          customerForm.style.display = 'none';
          providerForm.style.display = 'block';
        }
      });
    });
  }
  // إظهار حقل التخصص للطبيب فقط
  const professionSelect = document.getElementById('provider-profession');
  const specialtyContainer = document.getElementById('doctor-specialty-container');
  const categorySelect = document.getElementById('provider-category');
  if (professionSelect && categorySelect) {
    const categories = {
      doctor: [
        { value: 'جراحة', label: 'جراحة' },
        { value: 'قلب', label: 'قلب' },
        { value: 'عيون', label: 'عيون' },
        { value: 'عظام', label: 'عظام' },
        { value: 'أسنان', label: 'أسنان' },
        { value: 'جلدية', label: 'جلدية' }
      ],
      engineer: [
        { value: 'مدني', label: 'هندسة مدنية' },
        { value: 'كهرباء', label: 'هندسة كهربائية' },
        { value: 'ميكانيكا', label: 'هندسة ميكانيكية' },
        { value: 'معماري', label: 'هندسة معمارية' }
      ],
      teacher: [
        { value: 'رياضيات', label: 'رياضيات' },
        { value: 'فيزياء', label: 'فيزياء' },
        { value: 'لغة عربية', label: 'لغة عربية' },
        { value: 'لغة إنجليزية', label: 'لغة إنجليزية' }
      ],
      worker: [
        { value: 'نجار', label: 'نجار' },
        { value: 'سباك', label: 'سباك' },
        { value: 'حداد', label: 'حداد' },
        { value: 'عامل نظافة', label: 'عامل نظافة' }
      ]
    };
    function updateCategoryOptions() {
      const prof = professionSelect.value;
      categorySelect.innerHTML = '';
      if (categories[prof]) {
        categories[prof].forEach(opt => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.label;
          categorySelect.appendChild(option);
        });
      }
      // // إظهار حقل التخصص للطبيب فقط
      // if (prof === 'doctor') {
      //   specialtyContainer.style.display = 'block';
      // } else {
      //   specialtyContainer.style.display = 'none';
      // }
    }
    professionSelect.addEventListener('change', updateCategoryOptions);
    updateCategoryOptions(); // أول تحميل
  }


  // ========== Provider Detail Dynamic Logic ==========
  // تم حذف منطق تعبئة جدول المواعيد بفترتين صباحاً/مساءً.
  // إذا كان هناك تعبئة تلقائية لجدول المواعيد في صفحة التفاصيل، يجب أن يكون الجدول يعرض فقط يوم ووقت واحد متاح لكل يوم (مثل صفحات provider الحديثة)، وليس صباحاً/مساءً.
  (function () {
    // Helper: استخراج باراميترات الـ URL
    function getQueryParam(name) {
      const url = new URL(window.location.href);
      return url.searchParams.get(name);
    }
    // تحديد نوع الصفحة
    const page = window.location.pathname;
    let cat = getQueryParam('cat');
    if (!cat) {
      if (page.includes('doctor')) cat = 'doctors';
      else if (page.includes('teacher')) cat = 'teachers';
      else if (page.includes('worker')) cat = 'workers';
      else cat = 'doctors';
    }
    // اختيار بيانات المزوّد
    let dataArr = [];
    if (cat === 'doctors') dataArr = typeof doctors !== 'undefined' ? doctors : [];
    if (cat === 'teachers') dataArr = typeof teachers !== 'undefined' ? teachers : [];
    if (cat === 'workers') dataArr = typeof workers !== 'undefined' ? workers : [];
    const id = Number(getQueryParam('id')) || 1;
    const provider = dataArr.find(p => p.id === id) || dataArr[0];
    if (!provider) return;

    // عناصر الهيكل الجديد
    const sidebar = document.getElementById('provider-sidebar');
    // ابحث عن id أولاً ثم class ثم section مرن
    let content = document.getElementById('provider-content');
    if (!content) content = document.querySelector('.provider-content');
    if (!content) content = document.querySelector('section[style*="flex: 1"]');
    if (!sidebar || !content) return;

    // تعبئة الشريط الجانبي (مطابق للصورة)
    sidebar.innerHTML = `
      <img src="${provider.img}" alt="${provider.name}" class="provider-img rounded shadow provider-img-sidebar">
      <h2 class="provider-name-sidebar">${provider.name}</h2>
      <div class="rating provider-rating-sidebar">${'★'.repeat(provider.rating)}${'☆'.repeat(5 - provider.rating)}</div>
      <div class="specialty provider-specialty-sidebar">${provider.specialty}</div>
      <div class="city provider-city-sidebar">${provider.city}</div>
      <div class="price provider-price-sidebar">${provider.price} د.ل / ساعة</div>
      <button class="book-btn cta-btn provider-book-btn-sidebar" id="book-btn">احجز الآن</button>
      <div class="sidebar-social provider-sidebar-social">
        <div class="provider-social-title">معلومات التواصل:</div>
        <a href="mailto:provider@email.com" class="provider-social-item">
          <img src="https://img.icons8.com/fluency-systems-regular/24/4A5568/new-post.png" alt="Email"/>
          <span>provider@email.com</span>
        </a>
        <a href="tel:+218911234567" class="provider-social-item">
          <img src="https://img.icons8.com/fluency-systems-regular/24/4A5568/phone.png" alt="Phone"/>
          <span>+218 91 1234567</span>
        </a>
        <a href="https://instagram.com/provider.social" target="_blank" class="provider-social-item">
          <img src="https://img.icons8.com/fluency-systems-regular/24/4A5568/instagram-new.png" alt="Social"/>
          <span>@provider.social</span>
        </a>
      </div>
    `;

    // تعبئة المحتوى الرئيسي (مطابق للصورة)
    const bioText =
      cat === 'doctors' ? `د. ${provider.name} طبيب ${provider.specialty} بخبرة واسعة في ${provider.city}.` :
      cat === 'teachers' ? `الأستاذ ${provider.name} يقدم دروسًا في ${provider.specialty} مع خبرة تعليمية في ${provider.city}.` :
      `العامل ${provider.name} محترف في مجال ${provider.specialty} ويخدم منطقة ${provider.city}.`;
    let items = [];
    if (cat === 'doctors') items = ['استشارات طبية', 'عمليات بسيطة', 'وصفات علاجية', 'تحاليل طبية'];
    else if (cat === 'teachers') items = ['دروس خصوصية', 'تحضير للاختبارات', 'مراجعات', 'استشارات تعليمية'];
    else items = ['صيانة عامة', 'أعمال سباكة', 'أعمال نجارة', 'خدمات طارئة'];
    const dummyReviews = [
      { name: 'مريم سالم', text: 'خدمة ممتازة وسرعة في الاستجابة. أنصح به بشدة.', stars: 5 },
      { name: 'سالم بركة', text: 'دكتور محترم ومتعاون، شرح مفصل واهتمام بالمريض.', stars: 4 },
      { name: 'عبدالله الورفلي', text: 'تجربة رائعة، سأعود مرة أخرى.', stars: 5 }
    ];
    let reviewsHtml = '';
    dummyReviews.forEach(r => {
      reviewsHtml += `<div class='review provider-review'><div class='provider-review-stars'>${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div><strong>${r.name}</strong><div class='provider-review-text'>${r.text}</div></div>`;
    });
    let servicesBtns = items.map(s => `<button class='provider-service-btn'>${s}</button>`).join(' ');
    let weekDays = ['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
    let weekRow = weekDays.map(day => `<th class='provider-schedule-th'>${day}</th>`).join('');
    let timeRow = weekDays.map(day => {
      let slot = provider.times.find(t => t.includes(day));
      return `<td class='provider-schedule-td'>${slot ? `<span class='provider-schedule-slot'>${slot.split(' ')[1] || ''}</span>` : '-'}</td>`;
    }).join('');
    content.innerHTML = `
      <section class="provider-bio">
        <h3 class="provider-section-title">نبذة عن ${cat === 'doctors' ? 'الطبيب' : cat === 'teachers' ? 'الأستاذ' : 'العامل'}</h3>
        <p class="provider-bio-text">${bioText}</p>
      </section>
      <section class="provider-services">
        <h3 class="provider-section-title">الخدمات</h3>
        <div class="provider-services-btns">${servicesBtns}</div>
      </section>
      <section class="provider-video">
        <h3 class="provider-section-title">فيديو تعريفي</h3>
        <video src="assets/video/D1.mp4" controls class="provider-video-element"></video>
      </section>
      <section class="provider-schedule">
        <h3 class="provider-section-title">جدول المواعيد</h3>
        <table class="provider-schedule-table">
          <tr>${weekRow}</tr>
          <tr>${timeRow}</tr>
        </table>
      </section>
      <section class="provider-reviews">
        <h3 class="provider-section-title">التقييمات والتعليقات</h3>
        ${reviewsHtml}
      </section>
    `;

    // منطق الحجز (المودال)
    const bookBtn = document.getElementById('book-btn');
    const modal = document.getElementById('booking-modal');
    const modalContent = document.getElementById('modal-content') || (modal ? modal.querySelector('.modal-content') : null);
    if (bookBtn && modal && modalContent) {
      // تخصيص زر احجز الآن: تحقق من تسجيل الدخول قبل فتح نافذة الحجز
      bookBtn.addEventListener('click', function(e) {
        if (!localStorage.getItem('user')) {
          window.location.href = 'login.html';
          return;
        }
        // فتح نافذة الحجز الاحترافية (سيتم تفعيلها من منطق الحجز الموحد)
        // لا حاجة لمنع الافتراضي هنا لأن منطق الحجز الموحد يمنع الافتراضي ويفتح المودال
      });

      // إذا كان الرابط يحتوي على #booking، افتح نافذة الحجز تلقائياً مع تحقق الدخول
      if (window.location.hash === '#booking') {
        if (!localStorage.getItem('user')) {
          window.location.href = 'login.html';
        } else {
          setTimeout(() => { bookBtn.click(); }, 300);
        }
      }
    }
  })();

  // ========== Booking Modal Logic (احترافي وموحد) ==========
  // حذف أي منطق قديم متعلق بالحجز أو المودال
  (function () {
    // تحديد نوع مزود الخدمة
    const path = window.location.pathname;
    let providerType = '';
    if (path.includes('provider-doctor')) providerType = 'doctor';
    else if (path.includes('provider-teacher')) providerType = 'teacher';
    else if (path.includes('provider-worker')) providerType = 'worker';

    // خدمات لكل نوع مزود
    const servicesByType = {
      doctor: ['كشف جديد', 'متابعة', 'علاج', 'عملية', 'استشارة'],
      teacher: ['درس خصوصي', 'مراجعة اختبار', 'استشارة تعليمية', 'تحضير واجب'],
      worker: ['صيانة', 'تركيب', 'خدمة طارئة', 'استشارة'],
    };
    // سعر افتراضي لكل خدمة
    const pricesByType = {
      doctor: { 'كشف جديد': 150, 'متابعة': 100, 'علاج': 120, 'عملية': 500, 'استشارة': 80 },
      teacher: { 'درس خصوصي': 80, 'مراجعة اختبار': 60, 'استشارة تعليمية': 50, 'تحضير واجب': 40 },
      worker: { 'صيانة': 60, 'تركيب': 70, 'خدمة طارئة': 100, 'استشارة': 30 },
    };

    // استهداف زر الحجز الرئيسي (وليس أزرار الأوقات)
    const bookBtn = document.getElementById('book-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', function(e) {
                // استخراج المواعيد المتاحة من جدول المواعيد مباشرة
        const scheduleTable = document.querySelector('.provider-schedule-table');
        let availableSlots = [];
        if (scheduleTable) {
          const weekDays = ['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
          const timeRow = scheduleTable.querySelectorAll('tr:nth-child(2) td');
          timeRow.forEach((td, idx) => {
            const val = td.textContent.trim();
            if (val && val !== '-') {
              // مثال: السبت مساءً
              availableSlots.push(weekDays[idx] + ' ' + val);
            }
          });
        }
        e.preventDefault();
        const modal = document.getElementById('booking-modal');
        const content = document.getElementById('modal-content');
        if (!modal || !content) return;
        // بناء قائمة الخدمات
        const services = servicesByType[providerType] || ['خدمة'];
        const servicesOptions = services.map(s => `<option value="${s}">${s}</option>`).join('');
        // بناء الفورم مع عرض السعر أسفل اختيار الخدمة
        content.innerHTML = `
          <h3 class="booking-modal-title">حجز موعد</h3>
          <form id="booking-form" class="booking-form-modal">
            <label>الخدمة المطلوبة</label>
            <select id="booking-service" required class="booking-service-select">${servicesOptions}</select>
            <div id="service-price-info" class="service-price-info"></div>
            <label>الاسم الكامل</label>
            <input type="text" id="booking-name" required placeholder="اكتب اسمك الثلاثي">
            <label>رقم الهاتف أو البريد الإلكتروني</label>
            <input type="text" id="booking-contact" required placeholder="رقم الهاتف أو البريد">
            <label>اليوم/الفترة
              <select id="booking-slot" required>
                ${availableSlots.length ? availableSlots.map(t => `<option value="${t}">${t}</option>`).join('') : '<option disabled>لا يوجد مواعيد متاحة حالياً</option>'}
              </select>
            </label>
            <label>ملاحظات إضافية (اختياري)</label>
            <textarea id="booking-notes" rows="2" class="booking-notes-textarea"></textarea>
            <div class="booking-form-btns">
              <button type="submit" class="cta-btn"${availableSlots.length ? '' : 'disabled'}>تأكيد الحجز</button>
              <button type="button" id="cancel-booking" class="cta-btn booking-cancel-btn">إلغاء</button>
            </div>
          </form>
        `;
        modal.style.display = 'flex';
        // تحديث السعر عند تغيير الخدمة
        function updateServicePrice() {
          const service = document.getElementById('booking-service').value;
          const price = (pricesByType[providerType] && pricesByType[providerType][service]) ? pricesByType[providerType][service] : '-';
          document.getElementById('service-price-info').innerHTML = price !== '-' ? `سعر الخدمة: <b>${price} د.ل</b>` : '';
        }
        document.getElementById('booking-service').addEventListener('change', updateServicePrice);
        updateServicePrice(); // أول تحميل
        // زر إلغاء
        document.getElementById('cancel-booking').onclick = function() {
          modal.style.display = 'none';
        };
        // عند تأكيد الحجز
        document.getElementById('booking-form').onsubmit = function(ev) {
          ev.preventDefault();
          const service = document.getElementById('booking-service').value;
          const name = document.getElementById('booking-name').value.trim();
          const contact = document.getElementById('booking-contact').value.trim();
          const notes = document.getElementById('booking-notes').value.trim();
          const slot = document.getElementById('booking-slot').value;

          if (!name || !contact) {
            alert('يرجى إدخال الاسم ورقم الهاتف أو البريد.');
            return;
          }
          // تحديد السعر
          const price = (pricesByType[providerType] && pricesByType[providerType][service]) ? pricesByType[providerType][service] : '-';
          // ملخص الحجز
          content.innerHTML = `
            <div class="booking-success-modal">
              <h3 class="booking-success-title">تم الحجز بنجاح!</h3>
              <p>تفاصيل الحجز:</p>
              <ul class="booking-success-list">
                <li><b>الخدمة:</b> ${service}</li>
                <li><b>اليوم/الفترة:</b> ${slot}</li>
                <li><b>الاسم:</b> ${name}</li>
                <li><b>التواصل:</b> ${contact}</li>
                <li><b>ملاحظات:</b> ${notes ? notes : '-'}</li>
                <li><b>السعر:</b> <span class="booking-success-price">${price} د.ل</span></li>
              </ul>
              <button onclick="document.getElementById('booking-modal').style.display='none'" class="cta-btn booking-success-close">إغلاق</button>
            </div>
          `;
        };
      });
    }
  })();

  // FAQ Accordion Logic (event delegation for reliability)
  var faqAccordion = document.querySelector('.faq-accordion');
  if (faqAccordion) {
    faqAccordion.addEventListener('click', function(e) {
      var btn = e.target.closest('.faq-question');
      if (!btn) return;
      var item = btn.closest('.faq-item');
      if (!item) return;
      var isOpen = item.classList.contains('open');
      // أغلق كل العناصر الأخرى
      faqAccordion.querySelectorAll('.faq-item').forEach(function(i) {
        if (i !== item) i.classList.remove('open');
      });
      // بدّل العنصر الحالي فقط
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  }

  // Animated Counter for Stats Section
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = 200; // The lower the slower
            const inc = Math.ceil(target / speed);

            const updateCount = () => {
              if (count < target) {
                count += inc;
                counter.innerText = Math.min(count, target).toLocaleString('ar');
                setTimeout(updateCount, 10);
              } else {
                counter.innerText = target.toLocaleString('ar');
              }
            };
            updateCount();
          });
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    }, { threshold: 0.4 }); // Start when 40% of the section is visible

    observer.observe(statsSection);
  }

  // Password visibility toggle
  const passwordToggle = document.getElementById('password-toggle');
  const passwordInput = document.getElementById('password');
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      passwordToggle.classList.toggle('fa-eye');
      passwordToggle.classList.toggle('fa-eye-slash');
      this.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }

  // Helper function to show a toast notification
  function showToast(message, duration = 4000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
  }

  // Contact Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // لمنع إعادة تحميل الصفحة
      showToast('شكراً لك على رسالتك. سيتم الرد عليك قريباً.');
      contactForm.reset(); // لمسح الحقول بعد الإرسال
    });
  }
});

