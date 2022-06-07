var products = [{
    name: "PINK FLOWER TREE",
    image: "Images/pink_flower_tree.png" ,
    price: 35.90,
    qtty: 1
 }, {
    name: "BOUQUET OF TULIPS" ,
    image: "Images/bouquet_tulips.png",
    price: 17.90,
    qtty: 1
 }, {
    name: "BOUQUET OF GERBERA",
    image: "Images/gerbera_bouquet.png" ,
    price: 21.90,
    qtty: 1
 }];
 
 for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class ="product-title h3 m-3">${val.name}</p>
    <img class ="product-image" src="${val.image}" width="200"  height="200">
    <div class="product-details" >
        <p class="product-price h4 m-3">${ val.price} €</p>
        <button class="btn btn-primary product-button"  type="button">ADD  TO CART</button>
    </div>
    </div>
    `
 }

 var cart = [];

function addToCart(product) {
    let item = cart.find((val) => val.name == product.name);
    if (item) {
        item.qtty++;
    } else {
        cart.push(product)
    }
    createRows();
    Total();
}


let btns = document.getElementsByClassName("product-button");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i]);
    })
}

function createRows() {
    var result = "";

    for (let val of cart) {
        result += `
    <div class="cart-row row d-flex">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${val.image}" width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>
        
        <span class="cart-price col-3 h4 my-3">${val.price} €</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>
    `;
    }
    document.getElementById("cart-items").innerHTML = result;

    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");

    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            Total();
        });
        minus[i].addEventListener("click", function() {
            minusQtty(i);
            Total();
        });
        del[i].addEventListener("click", function() {
            deleteItem(i);
            Total();
        });
    }
}

function Total() {
    let total = 0;
    let discount = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
    }

    if (total > 100) {
        let sum = total;
        Discount(sum);
    } else {
    document.getElementById("price").innerHTML = total.toFixed(2) + " €";}
}
function Discount(sum) {
    let discount = 0;
    let new_sum = sum;
    let discount_string ="";
    let new_sum_string ="";

    // document.getElementById("sum").innerHTML = new_sum.toFixed(2) + " €";
    new_sum_string = `<strong class="cart-sum-title">Sum </strong>
    <span id="sum" class="cart-sum h4">${new_sum.toFixed(2)} €</span>`;
    document.getElementById("sum").innerHTML = new_sum_string;

    discount = sum * 10 / 100;
    sum = sum - discount;
    console.log(discount);

    discount_string = `<strong class="cart-discount-title">Discount</strong>
    <span id="discount_amount" class="cart-discount h4">${discount.toFixed(2)} €</span>`;
    document.getElementById("discount_amount").innerHTML = discount_string;
    document.getElementById("price").innerHTML = sum.toFixed(2) + " €";
}

function plusQtty(i) {
    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
}

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}
