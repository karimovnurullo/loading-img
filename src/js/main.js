const items = document.querySelectorAll(".item");
const loaders = document.querySelectorAll(".loader");

function loadImageWithLoader(url) {
   return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = function () {
         resolve(img);
      };

      img.onerror = function () {
         reject('Image failed to load');
      };

      img.src = url;
   });
}
async function displayImages() {
   try {
      for (let i = 0; i < items.length; i++) {
         const img = await loadImageWithLoader(`https://picsum.photos/400?random=${i}`);
         items[i].appendChild(img);
         loaders[i].parentNode.removeChild(loaders[i]);
      }
   } catch (error) {
      console.error(error);
   }
}

displayImages();


const wrapper = document.querySelector(".wrapper");
let currentIndex = items.length;
let totalNumImages = 100;

document.querySelector(".load-more").addEventListener("click", async function () {
   const numItemsToAdd = 4;
   const maxIndex = Math.min(currentIndex + numItemsToAdd, totalNumImages);
   const loaderss = document.getElementsByClassName('loader');

   if (currentIndex === maxIndex) {
      return;
   }

   for (let i = currentIndex; i < maxIndex; i++) {
      const img = await loadImageWithLoader(`https://picsum.photos/400?random=${i}`);

      const item = document.createElement('div');
      item.className = "item";
      item.append(img);

      const loader = document.createElement('div');
      loader.className = 'loader';

      const loader1 = document.createElement('div');
      loader1.className = 'loader-1';

      const span = document.createElement('span');

      loader1.appendChild(span);
      loader.appendChild(loader1);
      item.appendChild(loader);

      wrapper.appendChild(item);
   }
   currentIndex += numItemsToAdd;

   const loaders = wrapper.querySelectorAll('.loader');
   for (let i = 0; i < loaders.length; i++) {
      loaders[i].parentNode.removeChild(loaders[i]);
   }
   const scrollStep = 10;
   const scrollInterval = 50;
   let scrollTop = wrapper.scrollTop;
   const scrollToBottom = wrapper.scrollHeight - wrapper.clientHeight;

   const scrollTimer = setInterval(function () {
      scrollTop = Math.min(scrollTop + scrollStep, scrollToBottom);
      wrapper.scrollTop = scrollTop;

      if (scrollTop === scrollToBottom) {
         clearInterval(scrollTimer);
      }
   }, scrollInterval);
});