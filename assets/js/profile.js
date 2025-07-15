// منطق إلغاء الحجز بشكل بسيط جداً
document.addEventListener('DOMContentLoaded', function () {
  var cancelBtn = document.querySelector('.cancel-booking-btn');
  var bookingsTable = document.querySelector('.bookings-table');
  if (cancelBtn && bookingsTable) {
    cancelBtn.addEventListener('click', function () {
      if (confirm('هل أنت متأكد أنك تريد إلغاء الحجز؟')) {
        bookingsTable.style.display = 'none';
        var msg = document.createElement('div');
        msg.className = 'no-bookings';
        msg.textContent = 'لا يوجد حجوزات حالياً.';
        bookingsTable.parentNode.appendChild(msg);
      }
    });
  }
});
// ملف جافاسكريبت للملف الشخصي
// بيانات وهمية للمستخدم والحجوزات (تخزين محلي)

document.addEventListener('DOMContentLoaded', function () {
  // تحقق من تسجيل الدخول
  if (!localStorage.getItem('user')) {
    window.location.href = 'login.html';
    return;
  }
  // جلب بيانات المستخدم
  let user = JSON.parse(localStorage.getItem('user'));
  document.getElementById('profile-name').value = user.name || '';
  document.getElementById('profile-email').value = user.email || '';
  document.getElementById('profile-phone').value = user.phone || '';

    // تحديث بطاقة الملخص الجديدة
  document.getElementById('profile-summary-name').textContent = user.name || 'مستخدم';
  document.getElementById('profile-summary-email').textContent = user.email || 'email@example.com';


  // حفظ التعديلات
  document.getElementById('profile-form').onsubmit = function (e) {
    e.preventDefault();
    user.name = document.getElementById('profile-name').value.trim();
    user.email = document.getElementById('profile-email').value.trim();
    user.phone = document.getElementById('profile-phone').value.trim();
    localStorage.setItem('user', JSON.stringify(user));
    alert('تم حفظ التعديلات بنجاح');
  };


  // زر تسجيل الخروج
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = function () {
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    };
  }
});
