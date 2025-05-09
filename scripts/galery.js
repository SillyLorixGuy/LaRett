document.querySelectorAll('.gallery').forEach(gallery => {
    const images = JSON.parse(gallery.getAttribute('data-images'));
    let currentIndex = 0;

    const previewWrapper = document.createElement('div');
    previewWrapper.className = 'preview-wrapper';
    gallery.appendChild(previewWrapper);

    const setPreview = () => {
        previewWrapper.style.backgroundImage = `url(${images[currentIndex]})`;
        thumbnailsContainer.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    };

    const leftArrow = document.createElement('button');
    leftArrow.className = 'arrow left';
    leftArrow.innerHTML = '&#9664;';
    leftArrow.onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        setPreview();
    };

    const rightArrow = document.createElement('button');
    rightArrow.className = 'arrow right';
    rightArrow.innerHTML = '&#9654;';
    rightArrow.onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        setPreview();
    };

    previewWrapper.appendChild(leftArrow);
    previewWrapper.appendChild(rightArrow);

    const thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.className = 'thumbnails';

    images.forEach((src, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail';
        thumb.style.backgroundImage = `url(${src})`;
        thumb.addEventListener('click', () => {
            currentIndex = index;
            setPreview();
        });
        thumbnailsContainer.appendChild(thumb);
    });

    gallery.appendChild(thumbnailsContainer);

    setPreview();

    document.addEventListener('keydown', (event) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            setPreview();
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            setPreview();
        }
    });
});
