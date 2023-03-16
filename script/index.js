import { data } from "./database.js"

//Seletores de Elementos Globais
//                                 FUNÇÕES PARA EVENTOS
const cartButton = document.getElementById("icon_cart_menu")
const asideCart = document.getElementById("aside_cart")
const emptyDisplay = document.getElementById("display_empty")
const emptyDisplayInside = document.getElementById("empty_inside")
const ulCartList = document.getElementById("ul_cart_list")
const ulProducts = document.getElementById("ul_products")
let removeBtns = document.querySelector(".btn-remove-item")

//Evento abertura e fechamento do carrinho
cartButton.addEventListener("click", () => {
    asideCart.classList.toggle("hide")
    emptyDisplay.classList.toggle("hide")
    emptyDisplayInside.classList.toggle("hide")
    
})

// ESPERANDO DOCUMENTO CARREGAR PARA ENTAO INCIALIZAR 
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", start)
}else {
    start()
}

// Função START

function start(){
    addEvents()
}


// Chamando função e Inserindo argumentos para renderizar vitrine
for (let i = 0; i < data.length; i++) {
    renderShowCase(data[i].id, data[i].img, data[i].nameItem, data[i].description, data[i].value)
}


addEvents() // inicializa função que adiciona os eventos
// Atualiza e renderiza
function update() {
    updateTotal()
    addEvents()
    
}


    //                               FUNÇÃO PARA ADICIONAR EVENTOS
    function addEvents() {
        
        
        document.addEventListener("click", function(event) {
            if (event.target.classList.contains("btn-remove-item")) {
                removeCartItem(event.target);
            }
        })


        // document.addEventListener("input", function(event) {
        //     if (event.target && event.target.classList.contains("cart-quantity")) {
        //       currentQuantityInputId = event.target.id;
        //     }
        //   });
          



    
        //parametrização da quantidade dos itens nos inputs
    let inputsQuantity = document.getElementsByClassName("cart-quantity")
    for (let i = 0; i < inputsQuantity.length; i++) {
        inputsQuantity[i].addEventListener("change", () => {
            itemQuantityChange(inputsQuantity[i])
        })
    }
    
    // Adicionar Items ao carrinho
    let addToCartBtns = document.querySelectorAll(".add-to-cart")
    for (let i = 0; i < addToCartBtns.length; i++) {
        addToCartBtns[i].addEventListener("click", addToCartFunction)
    }
}


//função que remove itens do carrinho

function addToCartFunction() {
    let product = this.parentElement;
    let productImg = product.querySelector(".image-products").src
    let productTitle = product.querySelector(".h3-products").textContent
    let productPrice = product.querySelector(".price-products").innerHTML

  
    let productToInsert = {
      productImg,
      productTitle,
      productPrice,

    }
  
    renderCart(productImg, productTitle, productPrice)
    update();
  }
  
function removeCartItem(button) {
    var cartItem = button.closest(".cart-list-products")
    cartItem.remove()
    update() 
    
} 

//função de mudança nas quantidades do item no carrinho 
function itemQuantityChange(inputs) {
    if (isNaN.inputs|| inputs.value < 1) { // compara se o numero no input é um NaN ou se é negativo
        inputs.value = 1
    }
    inputs.value = Math.floor(inputs.value) // restringe a inserir somente números inteiros
    update()
    
}
// função para adicionar items ao carrinho
    
    


//                                 FUNÇÕES PARA ATUALIZAR E RENDERIZAR


//      RENDERIZA VITRINE DE PRODUTOS E DEFINE ATRIBUTOS 
function renderShowCase(id, imgSource, name, description, value) {
    const li = document.createElement("li")
    const img = document.createElement("img")
    const h3Title = document.createElement("h3")
    const pDescription = document.createElement("p")
    const spanPrice = document.createElement("span")

    
    const addToCartButtonHTML = `
<button class="add-to-cart"id="btn_productID">
 <i class="fa-solid fa-plus"></i> 
 Adicionar ao Carrinho</button>
</li>`


    //SET PARA ESTILIZAÇÃO, SELEÇÃO E IDENTIFICAÇÃO
    li.classList.add("li-products")
    li.id = id
    img.classList.add("image-products")
    h3Title.classList.add("h3-products")
    pDescription.classList.add("p-description")
    spanPrice.classList.add("price-products")



    img.src = imgSource
    h3Title.textContent = name
    pDescription.textContent = description
    spanPrice.textContent = "R$" + value

    li.appendChild(img)
    li.appendChild(h3Title)
    li.appendChild(pDescription)
    li.appendChild(spanPrice)
    li.insertAdjacentHTML("beforeend", addToCartButtonHTML)


    ulProducts.appendChild(li)

}





//                                       FUNÇÃO QUE ATUALIZA VALOR TOTAL

function updateTotal() {
    let cartListProducts = document.getElementsByClassName("cart-list-products")
    let totalPrice = document.getElementById("total_price")
    let total = 0
  
    for (let i = 0; i < cartListProducts.length; i++) {
      let productPrice = cartListProducts[i].querySelectorAll(".price-products-cart")
      let productQuantityInputId = cartListProducts[i].querySelector(".cart-quantity").getAttribute("id")
      let quantityInput = document.getElementById(productQuantityInputId)
      let quantity = quantityInput.value
      let productTotal = 0
  
      for (let j = 0; j < productPrice.length; j++) {
        let priceInNumber = parseFloat(productPrice[j].innerHTML.replace("R$", ""))
        productTotal += priceInNumber * quantity
      }
  
      total += productTotal
    }
  
    total = total.toFixed(2)
    totalPrice.innerHTML = "R$" + total
  }
  // FUNÇÃO RENDERIZA CARRINHO

function renderCart(productImg, productTitle, productPrice) {
    let li = document.createElement("li")
    li.classList.add("cart-list-products")
    let img = document.createElement("img")
    img.src = productImg
    img.classList.add("image-products")
    let h3 = document.createElement("h3")
    h3.classList.add("h3-product-cart")
    h3.textContent = productTitle
    let inputHTML = `<input type="number" value="1" class="cart-quantity" id="cart_quantity_${productTitle}">`
    let p = document.createElement("p")
    p.classList.add("price-products-cart")
    p.textContent = productPrice
    let removeBtnHTML = `<button class="btn-remove-item" id="btn_remove_itemID" ><i class="fa-solid fa-trash btn-remove-item"></i></button>`
  
    li.appendChild(img)
    li.appendChild(h3)
    li.insertAdjacentHTML("beforeend", inputHTML)
    li.appendChild(p)
    li.insertAdjacentHTML("beforeend", removeBtnHTML)
  
    ulCartList.appendChild(li)
  }
  