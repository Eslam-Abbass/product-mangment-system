//sart slider on Home
var images = Array.from( document.querySelectorAll('.homeContet .item img'))
var lightBox =document.querySelector('.lightBox')
var lightBoxItems =document.querySelector('.lightBoxItems')
var icons =document.querySelectorAll ('.lightBoxItems i')
var currentIndex =0;
for (let i = 0; i < images.length; i++) {
   
    images[i].addEventListener('click',function(e) {
    var imageSrc = e.target.getAttribute('src');
    currentIndex= images.indexOf(e.target)
    lightBoxItems.style.cssText=`background-image:url(${imageSrc})`
    lightBox.style.display='flex';
   
    })  
}


icons[2].addEventListener('click',function() {
    currentIndex++; 
    var imageSrc =images[currentIndex].getAttribute('src');
    lightBoxItems.style.cssText=`background-image:url(${imageSrc})`
    
})
icons[0].addEventListener('click',function() {
    currentIndex--; 
    var imageSrc =images[currentIndex].getAttribute('src');
    lightBoxItems.style.cssText=`background-image:url(${imageSrc})`
})
icons[1].addEventListener('click',function() {
    lightBox.style.display='none';
})











var productNameInput = document.getElementById('productName')
var productPriceInput = document.getElementById('productPrice')
var productDiscrpitionInput = document.getElementById('productDiscreption')
var productCatogeryInput = document.getElementById('productCatogery')

var productList;







currentIndex = 0;
if (localStorage.getItem('myproducts') != null) {
    productList = JSON.parse(localStorage.getItem('myproducts'));
    display(productList)
}
else {
    productList = [];
}

function AddProduct() {
    if (validationName()== true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCatogeryInput.value,
            discreption: productDiscrpitionInput.value

        }
        productList.push(product)
        localStorage.setItem('myproducts', JSON.stringify(productList))
        display(productList)
        clearInputValue();  
    }
    else{
        alert('eslam ')
    } 

}
function validationName() {
   var regex =/^[a-zA-Z]{3,8}$/
  if (regex.test(productNameInput.value)==true)
   {
    productNameInput.classList.replace('is-invalid','is-valid')
    return true;
  } 
  else{
    productNameInput.classList.add('is-invalid')
    return false;
  }
}

function clearInputValue() {

    productNameInput.value = '';
    productPriceInput.value = '';
    productCatogeryInput.value = '';
    productDiscrpitionInput.value = '';

}
function display(list) {
    var cartona = '';
    for (let i = 0; i < list.length; i++) {
        cartona +=
            `  <tr>
    <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].discreption}</td>
        <td><button class="btn btn-outline-info btn-sm" onClick='upload(${i})'>Update</button></td>
        <td><button class="btn btn-outline-danger btn-sm" onClick='deleteProduct(${i})'>Delete</button></td>
    </tr>`
    }
    document.getElementById('data-product').innerHTML =
        cartona;
}
function deleteProduct(index) {
    productList.splice(index, 1)
    localStorage.setItem('myproducts', JSON.stringify(productList))
    display(productList)
}
function upload(index) {
    currentIndex = index;
    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productCatogeryInput.value = productList[index].category;
    productDiscrpitionInput.value = productList[index].discreption;
    document.getElementById('btnUdate').style.display = 'inline';
    document.getElementById('btnAdd').style.display = 'none';
}
function Update() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCatogeryInput.value,
        discreption: productDiscrpitionInput.value

    }

    productList[currentIndex] = product;
    localStorage.setItem('myproducts', JSON.stringify(productList))
    display(productList)
    clearInputValue();
}
function search(searchTerm) {
    var searchList = [];
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchList.push(productList[i])
        }


    }
    display(searchList)
}
