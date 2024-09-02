function my_swiper(element, prev, next) {
  new Swiper(element, {
    slidesPerView: 5,
    spaceBetween: 12,
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
  });
}

my_swiper(".mySwiper", ".swiper-button-prev", ".swiper-button-next");
my_swiper(".mySwiper01", ".swiper-button-prev01", ".swiper-button-next01");
my_swiper(".mySwiper02", ".swiper-button-prev02", ".swiper-button-next02");
my_swiper(".mySwiper03", ".swiper-button-prev03", ".swiper-button-next03");
my_swiper(".mySwiper04", ".swiper-button-prev04", ".swiper-button-next04");
my_swiper(".mySwiper05", ".swiper-button-prev05", ".swiper-button-next05");
my_swiper(".mySwiper06", ".swiper-button-prev06", ".swiper-button-next06");
my_swiper(".mySwiper07", ".swiper-button-prev07", ".swiper-button-next07");


// target elements
const catList = document.querySelectorAll(".catList .swiper-slide");
const faceList = document.querySelectorAll(".faceList .swiper-slide");
const frontAccessoryList = document.querySelectorAll(".frontAccessoryList .swiper-slide");
const backAccessoryList = document.querySelectorAll(".backAccessoryList .swiper-slide");
const pantList = document.querySelectorAll(".pantList .swiper-slide");
const outfitList = document.querySelectorAll(".outfitList .swiper-slide");
const backgroundList = document.querySelectorAll(".backgroundList .swiper-slide");
const hatList = document.querySelectorAll(".hatList .swiper-slide");

const displayArea = document.querySelector(".displayArea");

let displayAreaImg;

function getDisplayAreaImages() {
  displayAreaImg = document.querySelectorAll(".displayArea img");
}

function removeExistingImage(similarClass) {
  getDisplayAreaImages();
  displayAreaImg?.forEach((e) => {
    if (e.classList.contains(similarClass)) {
      e.remove();
    }
  });
}

function removePreviousActiveClassAndAddInCurrent(allElements, className = "activeItem") {
  allElements.forEach((e) => {
    if (e.classList.contains(className)) {
      e.classList.remove(className);
    }
  });
}

let moveableInstance;

function functionality(target) {
  // Destroy any existing Moveable instance
  if (moveableInstance) {
    moveableInstance.destroy();
  }

  // Create a new Moveable instance targeting the current element
  moveableInstance = new Moveable(document.body, {
    target: target, // Target the current element
    container: document.body,
    draggable: true,
    resizable: true,
    scalable: true,
    rotatable: true,
    warpable: true,
    pinchable: true, // ["resizable", "scalable", "rotatable"]
    origin: true,
    keepRatio: true,
    edge: false,
    throttleDrag: 0,
    throttleResize: 0,
    throttleScale: 0,
    throttleRotate: 0,
  });

  /* draggable */
  moveableInstance.on("dragStart", ({ target, clientX, clientY }) => {
    console.log("onDragStart", target);
  }).on("drag", ({ target, left, top }) => {
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
  }).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
    console.log("onDragEnd", target, isDrag);
  });

  /* resizable */
  moveableInstance.on("resizeStart", ({ target, clientX, clientY }) => {
    console.log("onResizeStart", target);
  }).on("resize", ({ target, width, height, delta }) => {
    delta[0] && (target.style.width = `${width}px`);
    delta[1] && (target.style.height = `${height}px`);
  }).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
    console.log("onResizeEnd", target, isDrag);
  });

  /* scalable */
  moveableInstance.on("scaleStart", ({ target, clientX, clientY }) => {
    console.log("onScaleStart", target);
  }).on("scale", ({ target, scale, transform }) => {
    target.style.transform = transform;
  }).on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
    console.log("onScaleEnd", target, isDrag);
  });

  /* rotatable */
  moveableInstance.on("rotateStart", ({ target, clientX, clientY }) => {
    console.log("onRotateStart", target);
  }).on("rotate", ({ target, beforeDelta, delta, dist, transform }) => {
    target.style.transform = transform;
  }).on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
    console.log("onRotateEnd", target, isDrag);
  });
}

function insertImage(src, className) {
  const img = document.createElement("img");
  if (src) {
    // const displayAreaImg = document.querySelectorAll(".draggable");

    img.src = src;
    img.setAttribute("class", `${className} draggable`);

    displayArea.appendChild(img);

    functionality(img);
  }
}

function addEventListnerInItems(element, className) {
  element?.forEach((e, i, arr) => {
    e.addEventListener("click", () => {
      getDisplayAreaImages();

      removeExistingImage(className);

      removePreviousActiveClassAndAddInCurrent(arr);

      e.classList.add("activeItem");

      if (!e.children[0].classList.contains("nothing")) {
        removePreviousActiveClassAndAddInCurrent(displayAreaImg, "draggable");
        insertImage(e.children[0].getAttribute("src"), className);
      }
    });
  })
}

addEventListnerInItems(catList, "catImage");
addEventListnerInItems(faceList, "faceImage");
addEventListnerInItems(hatList, "hatImage");
addEventListnerInItems(frontAccessoryList, "frontAccessoryImage");
addEventListnerInItems(backAccessoryList, "backAccessoryImage");
addEventListnerInItems(pantList, "pantImage");
addEventListnerInItems(outfitList, "outfitImage");
addEventListnerInItems(backgroundList, "backgroundImage");

// Reset
// =====

const resetBTN = document.querySelector(".resetBTN");

resetBTN.addEventListener("click", resetMemeMaker);

function removeClassNameAndElementName() {
  const className = ["catImage", "faceImage", "hatImage", "frontAccessoryImage", "backAccessoryImage", "pantImage", "outfitImage", "backgroundImage"];
  const elementName = [catList, faceList, hatList, frontAccessoryList, backAccessoryList, pantList, outfitList, backgroundList];

  className.forEach((e) => removeExistingImage(e));
  elementName.forEach((e) => removePreviousActiveClassAndAddInCurrent(e));
}

function resetMemeMaker() {
  removeClassNameAndElementName();

  insertImage(catList[1].children[0].getAttribute("src"), "catImage");
  insertImage(backgroundList[0].children[0].getAttribute("src"), "backgroundImage");

  const activeItemFN = (e) => {
    e.classList.add("activeItem");
  }

  const singleElementStore = [catList[1], hatList[0], faceList[0], frontAccessoryList[0], backAccessoryList[0], pantList[0], outfitList[0], backgroundList[0]];

  singleElementStore.forEach((e) => activeItemFN(e));
}

// Generate Random
// ===============

const generateRandomBTN = document.querySelector(".generateRandomBTN");

generateRandomBTN.addEventListener("click", generateRandomMeme);

function generateRandomMeme() {
  const getRandom = (itemsList) => Math.floor(Math.random() * itemsList.length);

  const catRandom = getRandom(catList);
  const faceRandom = getRandom(faceList);
  const hatRandom = getRandom(hatList);
  const frontAccessoryRandom = getRandom(frontAccessoryList);
  const backAccessoryRandom = getRandom(backAccessoryList);
  const pantRandom = getRandom(pantList);
  const outfitRandom = getRandom(outfitList);
  const backgroundRandom = getRandom(backgroundList);

  getDisplayAreaImages();

  removeClassNameAndElementName();

  const setActiveClass = (list, random) => {
    list[random].classList.add("activeItem");
  }

  const listAndRandomList = [[catList, catRandom], [faceList, faceRandom], [hatList, hatRandom], [frontAccessoryList, frontAccessoryRandom], [pantList, pantRandom], [outfitList, outfitRandom], [backgroundList, backgroundRandom]]

  listAndRandomList.forEach((e) => setActiveClass(e[0], e[1]));

  function setInsertImage(list, random, className) {
    insertImage(list[random].children[0].getAttribute("src"), className);
  }

  const listRandomAndClassList = [[catList, catRandom, "catImage draggable"], [faceList, faceRandom, "faceImage draggable"], [hatList, hatRandom, "hatImage draggable"], [frontAccessoryList, frontAccessoryRandom, "frontAccessoryImage draggable"], [backAccessoryList, backAccessoryRandom, "backAccessoryImage draggable"], [pantList, pantRandom, "pantImage draggable"], [outfitList, outfitRandom, "outfitImage draggable"], [backgroundList, backgroundRandom, "backgroundImage draggable"],];

  listRandomAndClassList.forEach((e) => setInsertImage(e[0], e[1], e[2]));
}

// Download Meme
// =============

// const downloadBtn = document.querySelector(".downloadBtn");

// downloadBtn.addEventListener("click", downloadImage);

// function downloadImage() {

//   document.querySelector('.downloadBtn').addEventListener('click', function() {
//     html2canvas(document.getElementById('displayAreaScreen'), { 
//         scale: 2, // Adjust scale for high-quality image
//         useCORS: true // For cross-origin images
//     }).then(function(canvas) {
//         var link = document.createElement('a');
//         link.download = 'meme.png';
//         link.href = canvas.toDataURL('image/png');
//         link.click();
//     });
// });

const loader = document.querySelector(".loader");
const downloadBTNcontent = document.querySelector(".downloadBTNcontent");

document.querySelector('.downloadBtn').addEventListener('click', function () {
  downloadBTNcontent.classList.add("remove");
  loader.classList.add("active");
  html2canvas(document.getElementById('displayAreaScreen'), {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    logging: true,
  }).then(function (canvas) {
    try {
      var link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('SecurityError:', err);
      alert('An image from a different domain may be causing this issue. Please ensure all images are from the same domain or have proper CORS settings.');
    }
    loader.classList.remove("active");
    downloadBTNcontent.classList.remove("remove");
  }).catch(function (error) {
    loader.classList.remove("active");
    downloadBTNcontent.classList.remove("remove");
    console.error('Error generating image:', error);
  });
});




// }

// interact('.draggable')
//   .draggable({
//     listeners: {
//       start(event) {
//         console.log(event.type, event.target);
//       },
//       move(event) {
//         const target = event.target;
//         const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
//         const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//         target.style.transform = `translate(${x}px, ${y}px)`;

//         target.setAttribute('data-x', x);
//         target.setAttribute('data-y', y);
//       }
//     }
//   })
//   .resizable({
//     edges: { top: true, left: true, bottom: true, right: true },
//     listeners: {
//       move: function (event) {
//         let { x, y } = event.target.dataset

//         x = (parseFloat(x) || 0) + event.deltaRect.left
//         y = (parseFloat(y) || 0) + event.deltaRect.top

//         Object.assign(event.target.style, {
//           width: `${event.rect.width}px`,
//           height: `${event.rect.height}px`,
//           transform: `translate(${x}px, ${y}px)`
//         })

//         Object.assign(event.target.dataset, { x, y })
//       }
//     }
//   })

//   .gesturable({
//     onmove: function (event) {
//       var arrow = document.getElementById('arrow')

//       angle += event.da

//       arrow.style.webkitTransform =
//         arrow.style.transform =
//         'rotate(' + angle + 'deg)'

//       document.getElementById('angle-info').textContent =
//         angle.toFixed(2) + '\u00b0'
//     },
//   })


// import Moveable from "moveable";

const imageUpload = document.getElementById("imageUpload");

imageUpload.addEventListener("change", function () {
  const file = this.files[0];

  const reader = new FileReader(); // Create a FileReader to read the file

  reader.onload = function (e) {
    insertImage(e.target.result, "UserMedia");

    // uploadedImage.src = e.target.result; // Set the image src to the result
  };

  reader.readAsDataURL(file);
})

const topTextVal = document.getElementById("topTextVal");
const bottomTextVal = document.getElementById("bottomTextVal");

topTextVal.addEventListener("keypress", (e) => {
  const p = document.createElement("p");
  p.innerText = e.target.value;

  displayArea;
})