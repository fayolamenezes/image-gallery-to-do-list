// Load images on page load
window.addEventListener('DOMContentLoaded', () => {
  const storedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
  storedImages.forEach(src => createGalleryImage(src));
});

function uploadImage() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an image file first!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const src = e.target.result;
    createGalleryImage(src);
    saveImageToStorage(src);
  };

  reader.readAsDataURL(file);
  fileInput.value = '';
}

function createGalleryImage(src) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Uploaded Image';
  img.style.cursor = 'pointer';

  img.onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    showImageOptions(img, event.pageX, event.pageY);
  };

  document.getElementById('gallery').appendChild(img);
}

function saveImageToStorage(src) {
  const storedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
  storedImages.push(src);
  localStorage.setItem('galleryImages', JSON.stringify(storedImages));
}

function deleteImageFromStorage(src) {
  let storedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
  storedImages = storedImages.filter(image => image !== src);
  localStorage.setItem('galleryImages', JSON.stringify(storedImages));
}

function showImageOptions(imageElement, x, y) {
  const existingMenu = document.getElementById('imgOptionsMenu');
  if (existingMenu) existingMenu.remove();

  const menu = document.createElement('div');
  menu.id = 'imgOptionsMenu';
  menu.style.position = 'absolute';
  menu.style.top = y + 'px';
  menu.style.left = x + 'px';
  menu.style.background = 'white';
  menu.style.border = '1px solid #ccc';
  menu.style.padding = '8px';
  menu.style.borderRadius = '5px';
  menu.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
  menu.style.zIndex = 1000;

  const openOption = document.createElement('div');
  openOption.textContent = 'Open Image';
  openOption.style.padding = '4px 8px';
  openOption.style.cursor = 'pointer';
  openOption.onmouseover = () => openOption.style.backgroundColor = '#f0f0f0';
  openOption.onmouseout = () => openOption.style.backgroundColor = 'white';
  openOption.onclick = () => {
    openImageModal(imageElement.src);
    menu.remove();
  };

  const deleteOption = document.createElement('div');
  deleteOption.textContent = 'Delete Image';
  deleteOption.style.padding = '4px 8px';
  deleteOption.style.cursor = 'pointer';
  deleteOption.style.color = 'red';
  deleteOption.onmouseover = () => deleteOption.style.backgroundColor = '#fdd';
  deleteOption.onmouseout = () => deleteOption.style.backgroundColor = 'white';
  deleteOption.onclick = () => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteImageFromStorage(imageElement.src);
      imageElement.remove();
      menu.remove();
    }
  };

  menu.appendChild(openOption);
  menu.appendChild(deleteOption);
  document.body.appendChild(menu);

  setTimeout(() => {
    document.addEventListener('click', function handler(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 0);
}

function openImageModal(src) {
  let overlay = document.getElementById('imageModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'imageModalOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = 1100;
    overlay.style.cursor = 'zoom-out';

    const modalImg = document.createElement('img');
    modalImg.id = 'modalImage';
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.borderRadius = '8px';
    overlay.appendChild(modalImg);

    overlay.onclick = () => {
      overlay.style.display = 'none';
    };

    document.body.appendChild(overlay);
  }

  const modalImg = document.getElementById('modalImage');
  modalImg.src = src;
  overlay.style.display = 'flex';
}
