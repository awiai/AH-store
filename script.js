// 🛒 سلة التسوق
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🛍 منتجات افتراضية
let products = JSON.parse(localStorage.getItem("products")) || [
  {name:"يوزر انستغرام", price:10},
  {name:"1000 متابع تيك توك", price:5},
  {name:"اشتراك نتفلكس شهر", price:7},
];

// إضافة منتج للسلة
function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت الإضافة للسلة");
}

// تحميل المنتجات
function loadProducts(){
  let div = document.getElementById("products");
  if(!div) return;
  div.innerHTML = "";
  products.forEach(p=>{
    div.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>السعر: ${p.price}$</p>
        <button onclick="addToCart('${p.name}',${p.price})">إضافة للسلة</button>
      </div>
    `;
  });
}

// تحميل السلة
function loadCart(){
  let div = document.getElementById("cart");
  if(!div) return;

  div.innerHTML = "";
  let total = 0;
  cart.forEach(item=>{
    div.innerHTML += `<p>${item.name} - ${item.price}$</p>`;
    total += item.price;
  });
  div.innerHTML += `<h3>المجموع: ${total}$</h3>`;
}

// إتمام الطلب عبر واتساب
function checkout(){
  let text = "طلب جديد من منصة أمير:%0A";
  cart.forEach(i=> text += `- ${i.name} (${i.price}$)%0A`);
  window.open(`https://wa.me/9647700000000?text=${text}`);
}

// 📝 Admin
function addProduct(){
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value);
  if(name && price){
    products.push({name, price});
    localStorage.setItem("products", JSON.stringify(products));
    loadAdminProducts();
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
  } else {
    alert("الرجاء تعبئة الاسم والسعر");
  }
}

// تحميل منتجات Admin
function loadAdminProducts(){
  let div = document.getElementById("admin-products");
  if(!div) return;
  div.innerHTML = "";
  products.forEach((p,i)=>{
    div.innerHTML += `
      <div>
        ${p.name} - ${p.price}$
        <button onclick="deleteProduct(${i})">حذف</button>
      </div>
    `;
  });
}

// حذف منتج
function deleteProduct(i){
  products.splice(i,1);
  localStorage.setItem("products", JSON.stringify(products));
  loadAdminProducts();
}
