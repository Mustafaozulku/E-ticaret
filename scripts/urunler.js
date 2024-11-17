document.addEventListener("DOMContentLoaded",function(){
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");
    const productWrapperRow = document.querySelector(".product-wrapper-row");    

    let currentPage = 1;
    const itemsPerPage = 16;


    const updateUrl = () => {
        let baseUrl = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage -1) * itemsPerPage}`
        if(categoryName){
            baseUrl = `https://dummyjson.com/products/category/${categoryName}?limit=${itemsPerPage}&skip=${(currentPage - 1)* itemsPerPage}`
        }
        return baseUrl;
    };


    const fetchAndDisplayProducts = (url) => {
        fetch(url)
        .then((response => response.json()))
        .then((data)=>{
            console.log(data);
            productWrapperRow.innerHTML="";
            urunleriGetir(data.products);
        });
    };


    const urunleriGetir = (data) => {
        data.forEach((urun)=>{
            const col3 = document.createElement("div");
            col3.classList = "col-3 mb-3";
            col3.id = urun.id;

            col3.addEventListener("click", function(){
                window.location.href = `urun-detay.html?id=${urun.id}`
            })

            col3.innerHTML = `
            <div class="border border-1 border-success p-3 rounded-1 pozisyon card-yükseklik">
                <img class="w-100 urunler-yukseklik" src="${urun.images[0]}" alt="">
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
                <del class="text-secondary"><small>$35.99</small></del>
                <div class="add-to-cart">
                    <i class="bi bi-bag-plus"></i>
                </div>
            </div>
            `

            productWrapperRow.append(col3);
            
            // ! Sepete Ekleme İşlemleri İçin;
            const addToCart = col3.querySelector(".add-to-cart");
            // console.log(addToCart);

            addToCart.addEventListener("click", function(e){
                e.stopPropagation();
                const adet = document.querySelector("#cart-adet");
                adet.innerHTML++;

                const urunBilgileri = e.target.parentElement.parentElement.children;
                console.log(urunBilgileri);

                const urunImage = urunBilgileri[0].src;
                const urunIsim = urunBilgileri[2].innerHTML;
                const urunFiyat = urunBilgileri[4].innerHTML.slice(1);
                
                sepeteEkle(urunImage,urunIsim,urunFiyat)
            })
        })
    }

    const sepeteEkle = (urunImage,urunIsim,urunFiyat) => {
        const sepetListesi = document.querySelector(".sepet-listesi");
        const kargoUcreti = 300;

        const li = document.createElement("li");
        li.classList = "list-unstyled mb-2"

        li.innerHTML = `
        <div class="row">
            <div class="col-2 d-flex justify-content-center align-items-center">
            <img class="w-100" src="${urunImage}" alt="">
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center text-center">
            <p class="mb-0">${urunIsim}</p>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
            <div class="butonlar">
                <button id="azalt" class="azalt-btn">-</button>
                <span class="adet">1</span>
                <button id="arttir" class="arttir-btn">+</button>
            </div>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
            <div class="fiyat">$${urunFiyat}</div>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
            <div class="toplamFiyat">$${urunFiyat}</div>
            </div>
            <div class="col-1 d-flex justify-content-center align-items-center">
            <i class="bi bi-trash fs-4 cursor"></i>
            </div>
        </div>
        `
        sepetListesi.append(li)
    }


    fetchAndDisplayProducts(updateUrl());

})