// Общие функции для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const body = document.body;

    if (burger && nav) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Закрытие при клике на ссылку
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    }

    // Подсветка активного пункта меню
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Плавный скролл до футера по клику на "Контакты"
    const contactLink = document.querySelector('.nav__link--contact');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            const footer = document.getElementById('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});