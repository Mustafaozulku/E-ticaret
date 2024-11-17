const urlParams = new URLSearchParams(window.location.search);
const urunId = urlParams.get("id");

const urunDetayRow = document.querySelector(".urun-detay-row");
const url = `https://dummyjson.com/products/${urunId}`;

fetch(url)
.then(response=>response.json())
.then((data)=>{
    console.log(data);

    const categoryName = data.category[0].toUpperCase() + data.category.slice(1).toLowerCase();

    urunDetayRow.innerHTML = `
        <div class="col-5">
            <img class="w-100" src="${data.images[0]}" alt="">
        </div>
        <div class="col-7">
            <h2 class="active fw-bold">${data.title}</h2>
            <img width="50px" src="${data.meta.qrCode}" alt="">
            <span>${data.meta.barcode}</span>
            <p class="active">${categoryName}</p>
            <p>${data.description}</p>
            <p>Fiyat : $${data.price}</p>
            <p>Rating : ${data.rating}</p>
            <p>Stok Durumu : ${data.stock} / ${data.availabilityStatus
            }</p>
        </div>
    `

    // ! Yorumlar İçin;
    const yorumTamami = document.querySelector(".yorumlar-tamami");

    const yorumlar = data.reviews;
    yorumlar.forEach((yorum)=>{

        const date = new Date(yorum.date);
        const commentDate = date.toLocaleDateString("tr-TR",{
            day : "numeric",
            month : "long",
            year : "numeric"
        })

        // Yıldızların Tasarımı
        let starHtml = '';
        for(let i = 1; i<=5; i++){
            if(i <= yorum.rating){
                starHtml += ` <i class="bi bi-star-fill"></i>`
            }else{
                starHtml += ` <i class="bi bi-star"></i>`
            }
        }

        yorumTamami.innerHTML += `
    <div class="yorum-kapsayici mt-2 border border-1 rounded-2 p-3 bg-green">
        <div class="kullanici-info">
            <img width="50px" height="50px" class="rounded-circle" src="https://www.ds-istanbul.net/Files/assets/teacher-placeholder-male.jpg" alt="">
            <p class="m-0 mt-2 active fw-bold d-inline-flex">${yorum.reviewerName}</p>
            <p class="float-end">${commentDate}</p>
            <div class="yildizlar mt-2">
                ${starHtml}
            </div>
            <hr class="w-100 m-0 mt-2">
        </div>
        <div class="yorum mt-3">
            <p>${yorum.comment}</p>
        </div>
    </div>
    `
    })

    
})