document.addEventListener('DOMContentLoaded', function() {
    const solarSystem = document.getElementById('solarSystem');
    const memeModal = document.getElementById('memeModal');
    const memeImage = document.getElementById('memeImage');
    const closeModal = document.getElementById('closeModal');
    const starsContainer = document.getElementById('stars');
    const galleryButton = document.getElementById('galleryButton');
    const galleryOverlay = document.createElement('div');
    const addMemeButton = document.getElementById('addMemeButton');
    const addMemeModal = document.getElementById('addMemeModal');
    const cancelAddMeme = document.getElementById('cancelAddMeme');
    const submitMeme = document.getElementById('submitMeme');
    const memeUpload = document.getElementById('memeUpload');
    const memeNameInput = document.getElementById('memeName');
    galleryOverlay.classList.add('gallery-overlay');
    document.body.appendChild(galleryOverlay);

    const closeGallery = document.createElement('button');
    closeGallery.classList.add('close-gallery');
    closeGallery.textContent = 'Закрыть галерею';
    galleryOverlay.appendChild(closeGallery);


    // Создаем звездное небо
    function createStars() {
        for (let i = 0; i < 300; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const size = Math.random() * 3;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.8 + 0.2;
            const animationDuration = Math.random() * 10 + 5;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.opacity = opacity;
            star.style.setProperty('--duration', `${animationDuration}s`);
            
            starsContainer.appendChild(star);
        }
    }
    
    function showCustomMeme(imageSrc, memeName) {
        memeImage.src = imageSrc;
        document.querySelector('.meme-modal .meme-label')?.remove();
        
        const label = document.createElement('div');
        label.classList.add('meme-label');
        label.textContent = memeName;
        label.style.position = 'relative';
        label.style.bottom = 'auto';
        label.style.marginTop = '20px';
        label.style.opacity = '1';
        memeModal.appendChild(label);
        
        memeModal.classList.add('active');
    }

    // Обновите функцию createGallery для работы с пользовательскими мемами
    function createGallery() {
        galleryOverlay.innerHTML = '';
        galleryOverlay.appendChild(closeGallery);
        
        // Стандартные мемы (1-13)
        for (let i = 0; i < 13; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.style.backgroundImage = `url('img/mem${i+1}.jpg')`;
            galleryItem.dataset.index = i;
            
            galleryItem.addEventListener('click', function() {
                showMeme(i);
                galleryOverlay.classList.remove('active');
            });
            
            galleryOverlay.appendChild(galleryItem);
        }
        
        // Пользовательские мемы
        memes.slice(13).forEach((meme, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.style.backgroundImage = meme.element.style.backgroundImage;
            
            galleryItem.addEventListener('click', function() {
                const label = meme.element.querySelector('.meme-label');
                showCustomMeme(meme.element.style.backgroundImage.slice(4, -1).replace(/"/g, ''), label?.textContent || 'Пользовательский мем');
                galleryOverlay.classList.remove('active');
            });
            
            galleryOverlay.appendChild(galleryItem);
        });
    }

    function addNewMeme(imageSrc, memeName) {
        // Создаем новую орбиту
        const orbitRadius = 120 + memes.length * 60;
        const orbit = document.createElement('div');
        orbit.classList.add('orbit');
        orbit.style.width = `${orbitRadius * 2}px`;
        orbit.style.height = `${orbitRadius * 2}px`;
        solarSystem.appendChild(orbit);
        
        // Создаем новый мем
        const meme = document.createElement('div');
        meme.classList.add('meme');
        meme.style.backgroundImage = `url('${imageSrc}')`;
        meme.dataset.index = memes.length;
        
        // Добавляем подпись
        const label = document.createElement('div');
        label.classList.add('meme-label');
        label.textContent = memeName;
        meme.appendChild(label);
        
        // Позиционируем мем на орбите
        orbit.appendChild(meme);
        
        // Обработчик клика
        meme.addEventListener('click', function(e) {
            e.stopPropagation();
            showCustomMeme(imageSrc, memeName);
        });
        
        // Добавляем мем в массив для анимации
        const newMeme = {
            element: meme,
            orbitRadius: orbitRadius,
            angle: (memes.length / (memes.length + 1)) * Math.PI * 2,
            speed: 0.002 + Math.random() * 0.003
        };
        
        memes.push(newMeme);
        updateMemePosition(newMeme, newMeme.orbitRadius, newMeme.angle);
        
        // Обновляем галерею
        createGallery();
    }

    // Создаем солнечную систему
    function createSolarSystem() {
        const memeCount = 13;
        const orbits = [];
        let memes = [];
        
        // Названия мемов (для примера)
        const memeNames = [
            "Дождь идет", "Сова", "Тысячи лет", "Удивленный кот", 
            "Бегущий парень", "Серьезный пес", "Опасный кекс", 
            "Дракон", "Пончик", "Космический кот", "Философский пес",
            "Уставший студент", "Радостный пингвин"
        ];
        
        // Создаем орбиты и мемы
        for (let i = 0; i < memeCount; i++) {
            const orbitRadius = 120 + i * 60; // Радиус орбиты
            
            // Создаем орбиту
            const orbit = document.createElement('div');
            orbit.classList.add('orbit');
            orbit.style.width = `${orbitRadius * 2}px`;
            orbit.style.height = `${orbitRadius * 2}px`;
            solarSystem.appendChild(orbit);
            orbits.push(orbit);
            
            // Создаем мем
            const meme = document.createElement('div');
            meme.classList.add('meme');
            // Используем реальные изображения из папки img
            meme.style.backgroundImage = `url('img/mem${i+1}.jpg')`;
            meme.dataset.index = i;
            
            // Добавляем подпись
            const label = document.createElement('div');
            label.classList.add('meme-label');
            label.textContent = memeNames[i] || `Мем ${i+1}`;
            meme.appendChild(label);
            
            // Позиционируем мем на орбите
            orbit.appendChild(meme);
            
            // Обработчик клика для мема
            meme.addEventListener('click', function(e) {
                e.stopPropagation();
                showMeme(i);
            });
            
            memes.push({
                element: meme,
                orbitRadius: orbitRadius,
                angle: (i / memeCount) * Math.PI * 2,
                speed: 0.002 + Math.random() * 0.003
            });
        }
        
        return memes;
    }
    
    function createGallery() {
        galleryOverlay.innerHTML = '';
        galleryOverlay.appendChild(closeGallery);
        
        for (let i = 0; i < 13; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.style.backgroundImage = `url('img/mem${i+1}.jpg')`;
            galleryItem.dataset.index = i;
            
            galleryItem.addEventListener('click', function() {
                showMeme(i);
                galleryOverlay.classList.remove('active');
            });
            
            galleryOverlay.appendChild(galleryItem);
        }
    }

    // Обновляем позицию мема на орбите
    function updateMemePosition(meme, radius, angle) {
        // Рассчитываем 3D позицию
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Применяем 3D трансформацию
        meme.element.style.transform = `
            translateX(-50%) 
            rotateX(-75deg)
            translate3d(${x}px, 0, ${z}px)
        `;
        
        // Рассчитываем глубину для эффекта перекрытия солнца
        const depth = Math.sin(angle) * 100;
        meme.element.style.zIndex = depth > 0 ? 15 : 5;
        
        // Прозрачность при прохождении за солнцем
        const opacity = 0.7 + Math.sin(angle) * 0.3;
        meme.element.style.opacity = opacity;
    }
    
    // Анимация вращения
    function animate(memes) {
        function update() {
            memes.forEach(meme => {
                meme.angle += meme.speed;
                updateMemePosition(meme, meme.orbitRadius, meme.angle);
            });
            
            requestAnimationFrame(update);
        }
        
        update();
    }
    
    // Показать мем
    function showMeme(index) {
        // Загружаем изображение мема
        memeImage.src = `img/mem${index+1}.jpg`;
        memeModal.classList.add('active');
    }
    
    // Закрыть модальное окно
    closeModal.addEventListener('click', function() {
        memeModal.classList.remove('active');
    });
    
    // Закрыть модальное окно при клике на фон
    memeModal.addEventListener('click', function(e) {
        if (e.target === memeModal) {
            memeModal.classList.remove('active');
        }
    });
    
    // Инициализация
    createStars();
    const memes = createSolarSystem();
    animate(memes);
    
    // Адаптация к размеру окна
    window.addEventListener('resize', function() {
        // В реальном проекте может потребоваться перерасчет позиций
    });

    galleryButton.addEventListener('click', function() {
        createGallery();
        galleryOverlay.classList.add('active');
    });

    closeGallery.addEventListener('click', function() {
        galleryOverlay.classList.remove('active');
    });

    galleryOverlay.addEventListener('click', function(e) {
        if (e.target === galleryOverlay) {
            galleryOverlay.classList.remove('active');
        }
    });

    addMemeButton.addEventListener('click', function() {
        addMemeModal.classList.add('active');
    });

    cancelAddMeme.addEventListener('click', function() {
        addMemeModal.classList.remove('active');
    });

    submitMeme.addEventListener('click', function() {
        const file = memeUpload.files[0];
        const memeName = memeNameInput.value.trim();
        
        if (!file) {
            alert('Пожалуйста, выберите изображение');
            return;
        }
        
        if (!memeName) {
            alert('Пожалуйста, введите название мема');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            addNewMeme(e.target.result, memeName);
            addMemeModal.classList.remove('active');
            memeUpload.value = '';
            memeNameInput.value = '';
        };
        reader.readAsDataURL(file);
    });

    addMemeModal.addEventListener('click', function(e) {
        if (e.target === addMemeModal) {
            addMemeModal.classList.remove('active');
        }
    });
});

