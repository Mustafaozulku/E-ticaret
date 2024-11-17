// ! Popüler Kategori Alanı İçin;
const popularCategoriesRow = document.querySelector(".popular-categories-wrapper");

const rightBtn = document.querySelector(".right-btn");
const leftBtn = document.querySelector(".left-btn");

rightBtn.addEventListener("click", function(){
    popularCategoriesRow.scrollLeft += 100;
})

leftBtn.addEventListener("click", function(){
    popularCategoriesRow.scrollLeft -= 100;
})


const categoryImages = {
    furniture:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png",
    groceries: "https://cdn.dummyjson.com/products/images/groceries/Apple/1.png",
    "home-decoration":
      "https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/1.png",
    "kitchen-accessories":
      "https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/1.png",
    laptops:
      "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png",
    "mens-shirts":
      "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png",
    "mens-shoes":
      "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/1.png",
    "mens-watches":
      "https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png",
    "mobile-accessories":
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png",
    motorcycle:
      "https://cdn.dummyjson.com/products/images/motorcycle/Generic%20Motorcycle/1.png",
    "skin-care":
      "https://cdn.dummyjson.com/products/images/skin-care/Attitude%20Super%20Leaves%20Hand%20Soap/1.png",
    smartphones:
      "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png",
    "sports-accessories":
      "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png",
    sunglasses:
      "https://cdn.dummyjson.com/products/images/sunglasses/Black%20Sun%20Glasses/1.png",
    tablets:
      "https://cdn.dummyjson.com/products/images/tablets/iPad%20Mini%202021%20Starlight/1.png",
    tops: "https://cdn.dummyjson.com/products/images/tops/Blue%20Frock/1.png",
    vehicle:
      "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/1.png",
    "womens-bags":
      "https://cdn.dummyjson.com/products/images/womens-bags/Blue%20Women's%20Handbag/1.png",
    "womens-dresses":
      "https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/1.png",
    "womens-jewellery":
      "https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Crystal%20Earring/1.png",
    "womens-shoes":
      "https://cdn.dummyjson.com/products/images/womens-shoes/Calvin%20Klein%20Heel%20Shoes/1.png",
    "womens-watches":
      "https://cdn.dummyjson.com/products/images/womens-watches/Watch%20Gold%20for%20Women/1.png",
    beauty:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    fragrances:
      "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png",
  };


fetch('https://dummyjson.com/products/category-list')
.then(response => response.json())
.then((data)=>{
    console.log(data);

    data.forEach((categoryName) => {
        
        const col2 = document.createElement("div");
        col2.classList = "col-2 cursor";

        col2.addEventListener("click", function(){
            window.location.href = `urunler.html?category=${categoryName}`
        })

        const categoryImage = categoryImages[categoryName];

        col2.innerHTML = `
        <div class="border border-1 border-success p-2 rounded-2 bg-secondary">
            <img class="w-100 rounded-2 yükseklik" src="${categoryImage}" alt="">
            <a class="d-block mt-3 my-2 text-center text-white text-decoration-none" href="#">${categoryName}</a>
        </div>
        `
        popularCategoriesRow.append(col2);
    })
});


// ! Öne Çıkanlar Popüler ve Son Eklenenler Bölümü
const oneCikanlar = document.querySelector("#one-cikanlar");
const popüler = document.querySelector("#populer");
const sonEklenenler = document.querySelector("#son-eklenenler");

const productWrapperRow  = document.querySelector(".product-wrapper-row");

fetch('https://dummyjson.com/products/category/groceries')
.then(response => response.json())
.then((data)=>{
  // console.log(data.products)
  ilgiliUrunleriGetir(data.products, 4.2);
});

const ilgiliUrunleriGetir = (data,rating) => {
  const filteredProducts = data.filter((urun)=> urun.rating >= rating);
  // console.log(filteredProducts)

  filteredProducts.slice(0,8).forEach((urun)=>{
    // console.log(urun)

    const col3 = document.createElement("div");
    col3.classList = "col-3 mb-3";

    const originalPrice = (urun.price / (1- (urun.discountPercentage / 100))).toFixed(2);

    col3.innerHTML = `
    <div class="border border-1 border-success p-3 rounded-1 pozisyon">
      <img class="w-100 yükseklik" src="${urun.images[0]}" alt="">
      <p class="mb-0 mt-2 fs-7">${urun.category}</p>
      <p class="mb-0">${urun.title}</p>
      <div class="star-rating text-warning">
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
      </div>
      <p class="active fw-bold mb-0 d-inline-flex me-2">$${urun.price}</p>
      <del class="text-secondary"><small>$${originalPrice}</small></del>
      <div class="add-to-cart">
        <i class="bi bi-bag-plus"></i>
      </div>
    </div>
    `

    productWrapperRow.append(col3);
  })
}


popüler.addEventListener("click", function(){
  fetch('https://dummyjson.com/products?limit=0')
  .then(response=>response.json())
  .then((data)=>{
    // console.log(data)
    productWrapperRow.innerHTML = "";
    ilgiliUrunleriGetir(data.products, 4.8);
  })
});


sonEklenenler.addEventListener("click",function(){
  fetch('https://dummyjson.com/products?limit=0')
  .then(response=>response.json())
  .then((data)=>{
    console.log(data);
    productWrapperRow.innerHTML = "";

    const sortByDate = data.products.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).slice(0,8);
    // console.log(sortByDate);

    sortByDate.forEach((urun)=>{
      const col3 = document.createElement("div");
      col3.classList= "col-3 mb-3";

      const originalPrice = (urun.price / (1- (urun.discountPercentage / 100))).toFixed(2);

    col3.innerHTML = `
    <div class="border border-1 border-success p-3 rounded-1 pozisyon">
      <img class="w-100 yükseklik" src="${urun.images[0]}" alt="">
      <p class="mb-0 mt-2 fs-7">${urun.category}</p>
      <p class="mb-0">${urun.title}</p>
      <div class="star-rating text-warning">
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
      </div>
      <p class="active fw-bold mb-0 d-inline-flex me-2">$${urun.price}</p>
      <del class="text-secondary"><small>$${originalPrice}</small></del>
      <div class="add-to-cart">
        <i class="bi bi-bag-plus"></i>
      </div>
    </div>
    `
    productWrapperRow.append(col3);
    })
  })
})

oneCikanlar.addEventListener("click", function(){
  fetch('https://dummyjson.com/products/category/groceries')
  .then(response => response.json())
  .then((data)=>{
    // console.log(data.products)
    productWrapperRow.innerHTML = "";
    ilgiliUrunleriGetir(data.products, 4.2);
  });
})


// ! Timer İşlemi
let countDown = {
  days : 2,
  hours : 0,
  minutes : 0,
  seconds : 14,
}

function startCountDown(){
  const dayElements = document.querySelector("#days");
  const hoursElements = document.querySelector("#hours");
  const minutesElements = document.querySelector("#minutes");
  const secondsElements = document.querySelector("#seconds");

  const countDownInterval = setInterval(()=>{
    countDown.seconds--;

    if(countDown.seconds < 0){
      countDown.seconds = 59;
      countDown.minutes--
    }

    if(countDown.minutes < 0){
      countDown.minutes = 59;
      countDown.hours--
    }

    if(countDown.hours < 0){
      countDown.hours = 23;
      countDown.days--
    }

    if(countDown.days < 0){
      clearInterval(countDownInterval);
      alert("İndirim sona erdi!");
      return;
    }

    secondsElements.innerHTML = countDown.seconds.toString().padStart(2,"0");
    minutesElements.innerHTML = countDown.minutes.toString().padStart(2,"0");
    hoursElements.innerHTML = countDown.hours.toString().padStart(2,"0");
    dayElements.innerHTML = countDown.days.toString().padStart(2,"0");
  },1000)
}

document.addEventListener("DOMContentLoaded", startCountDown);