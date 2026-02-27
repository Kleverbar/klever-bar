// Создаем модальное окно и добавляем его на страницу
(function() {
    // Проверяем, есть ли уже модальное окно
    if (document.getElementById('product-modal')) {
        return;
    }
    
    // Создаем элементы модального окна
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'product-modal';
    
    modalOverlay.innerHTML = `
        <div class="modal">
            <button class="modal__close" id="modal-close-btn">&times;</button>
            <img class="modal__image" id="modal-image" src="" alt="Товар">
            <div class="modal__content">
                <h2 class="modal__title" id="modal-title"></h2>
                <div class="modal__price" id="modal-price"></div>
                <p class="modal__description" id="modal-description"></p>
                <div class="modal__meta" id="modal-meta"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Получаем ссылки на элементы
    const modal = modalOverlay;
    const closeBtn = document.getElementById('modal-close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalMeta = document.getElementById('modal-meta');
    
    // Функция открытия модального окна
    window.openProductModal = function(product) {
        if (!product) return;
        
        modalImage.src = product.image || '';
        modalImage.alt = product.title || 'Товар';
        modalTitle.textContent = product.title || 'Название товара';
        modalPrice.innerHTML = product.price ? `${product.price} <small>за шт.</small>` : 'Цена не указана';
        modalDescription.textContent = product.description || 'Описание отсутствует';
        
        // Заполняем мета-информацию
        let metaHTML = '';
        if (product.meta) {
            for (const [key, value] of Object.entries(product.meta)) {
                metaHTML += `
                    <div class="meta-item">
                        <span class="meta-item__label">${key}</span>
                        <span class="meta-item__value">${value}</span>
                    </div>
                `;
            }
        }
        modalMeta.innerHTML = metaHTML || '<p>Дополнительная информация отсутствует</p>';
        
        // Показываем окно
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    };
    
    // Функция закрытия
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    // Закрытие по кнопке
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику на фон
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('Модальное окно создано и готово к работе');
})();