
const items = document.querySelectorAll(".item");
const loaders = document.querySelectorAll(".loader");

function loadImageWithLoader(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = function() {
      resolve(img);
    };
    
    img.onerror = function() {
      console.log("Image failed to load");
      reject('Image failed to load');
    };
    
    img.src = url;
  });
}
async function displayImages() {
  try {
    for (let i = 0; i < items.length; i++) {
      const img = await loadImageWithLoader(`https://picsum.photos/400?random=${i}`);
      console.log(`Image ${i+1} loaded successfully!`);
      items[i].appendChild(img);
      loaders[i].parentNode.removeChild(loaders[i]);
    }
  } catch (error) {
    console.error(error);
  }
}

displayImages();
