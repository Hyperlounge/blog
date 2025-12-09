
class Gallery {
    init() {
        this.images = Array.from(document.querySelectorAll('article.gallery img'));

        this.images.forEach((image, i) => {
            image.addEventListener('click', evt => this.onImageClick(i));
        });
    }

    onImageClick(index) {
        this.currentIndex = index;
        const image = this.images[index];
        const src = image.src;
        const alt = image.alt;
        const galleryRoot = document.createElement('div');
        galleryRoot.classList.add('gallery-root');
        galleryRoot.innerHTML = `<div class="gallery-background"><img alt="${alt}" src="${src}"></img></div>`;
        document.body.append(galleryRoot);
    }

}

const galleryArticle = document.querySelector('article.gallery');
if (galleryArticle) {
    //const gallery = new Gallery();
    //gallery.init();
}