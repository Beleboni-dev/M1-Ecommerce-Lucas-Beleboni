//IMPORTANDO O ARRAY DE OBJETOS
import { data } from "./database.js"

//Seletores de Elementos Globais
const emptyDisplay = document.getElementById("display_empty")
const ulCartList = document.getElementById("ul_cart_list")
const ulProducts = document.getElementById("ul_products")

// Chamando função e Inserindo argumentos para renderizar vitrine
for (let i = 0; i < data.length; i++) {
    renderShowCase(data[i].id, data[i].img, data[i].nameItem, data[i].description, data[i].value)
}


addEvents() // inicializa função que adiciona os eventos


// Atualiza e recarrega
function update() {
    addEvents()
    updateTotal()

}


//                               FUNÇÃO PARA ADICIONAR EVENTOS
function addEvents() {

 //EFEITOS CARD MOUSE   
    const cards = document.querySelectorAll('.li-products')

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
          const xPos = e.clientX - e.target.offsetLeft
          const yPos = e.clientY - e.target.offsetTop
          const rotateX = -(yPos / card.offsetHeight - 0.5) * 20
          const rotateY = (xPos / card.offsetWidth - 0.5) * 20
          
          card.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        })
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'none'
        })
      })
      


    //EVENTOS NO MENU DE CATEGORIAS PARA FILTRAGEM

    const menuCategory = document.querySelectorAll(".header-menu li")
    for (let i = 0; i < menuCategory.length; i++) {
        menuCategory[i].addEventListener("click", (e) => {
            const category = e.target.textContent
            filterProducts(category)
        })
    }

    //EVENTO NO BOTÃO DE REMOVER ITEM DO CARRINHO
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-remove-item")) {
            removeCartItem(event.target);
        }
    })


    //EVENTO PARA PARAMETRIZAÇÃO DOS INPUTS DE QUANTIDADE
    let inputsQuantity = document.getElementsByClassName("cart-quantity")
    for (let i = 0; i < inputsQuantity.length; i++) {
        inputsQuantity[i].addEventListener("change", () => {
            itemQuantityChange(inputsQuantity[i])
        })
    }

    // EVENTO PARA ADICIONA ITENS AO CARRINHO
    let addToCartBtns = document.querySelectorAll(".add-to-cart")
    console.log(addToCartBtns)
    for (let i = 0; i < addToCartBtns.length; i++) {
        addToCartBtns[i].addEventListener("click", addToCartFunction)
    }
}

//BOTÃO PESQUISAR E TECLA ENTER
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector(".search-button")
searchBtn.addEventListener("click", productsFound)

// Verifica se a tecla pressionada foi Enter
searchInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        productsFound()
    }
})


// Crie um elemento de botão "Voltar" para voltar todos os produtos
const allProductsButton = document.createElement("button")
allProductsButton.textContent = "Ver todos os produtos"
allProductsButton.addEventListener("click", allProductsRestore)




//                                 FUNÇÕES PARA EVENTOS

//FUNÇÃO DE ABERTURA E FECHAMENTO DO CARRINHO
function openCart() {
    emptyDisplay.classList.add("hide")
}
//FUNÇÃO PARA FILTRAR POR CATEGORIA

function filterProducts(category) {
    ulProducts.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].tag.includes(category)) {
            const product = data[i]
            renderShowCase(product.id, product.img, product.nameItem, product.description, product.value)
        }
        if (category == "Todos") {
            ulProducts.innerHTML = ""
            for (let i = 0; i < allProducts.length; i++) {
                ulProducts.appendChild(allProducts[i])

            }

        }
    }
    update()
}


// FUNÇÃO PARA EVENTO DE PESQUISA

const allProducts = Array.from(ulProducts.children)

function productsFound() {

    allProductsButton.classList.remove("hide")
    console.log(allProductsButton)
    allProductsButton.classList.add("visible")

    let inputText = document.querySelector(".search-input")
    const productsFilter = ulProducts.children
    const filteredProducts = []
    if (inputText.value != 0) {
        for (let i = 0; i < productsFilter.length; i++) {
            const productName = productsFilter[i].querySelector('h3').textContent.toLowerCase()
            if (productName.includes(inputText.value.toLowerCase())) {
                filteredProducts.push(productsFilter[i])

            }
        }
    }
    if (filteredProducts.length == 0) {
        inputText.value = ""
        alert("Por favor digite o nome do produto")
        allProductsRestore()

    }
    for (let j = 0; j < filteredProducts.length; j++) {
        ulProducts.innerHTML = ""
        ulProducts.insertAdjacentElement("beforebegin", allProductsButton)
        ulProducts.appendChild(filteredProducts[j])

    }

}

// FUNÇÃO QUE RESTAURA OS PRODUTOS NA VITRINE
function allProductsRestore() {

    allProductsButton.classList.add("visible")
    allProductsButton.classList.add("hide")


    ulProducts.innerHTML = ""
    for (let i = 0; i < allProducts.length; i++) {
        ulProducts.appendChild(allProducts[i])
    }
update()
}

//FUNÇÃO QUE VALIDA SE O ITEM JÁ ESTÁ NO CARRINHO
function isItemInCart(productTitle) {

    const titleProductsInCart = document.querySelectorAll(".h3-product-cart")
    for(let i =0; i< titleProductsInCart.length;i++){
              if (titleProductsInCart[i].textContent == productTitle) {
            return true
        }

    }
    return false
}


// função que seleciona o elemento e adiciona items no carrinho
function addToCartFunction() {
    let product = this.parentElement;
    let productImg = product.querySelector(".image-products").src
    let productTitle = product.querySelector(".h3-products").textContent
    let productPrice = product.querySelector(".price-products").innerHTML
   console.log(productTitle)
    if(isItemInCart(productTitle)){
        alert(`Produto no carrinho\nVocê pode alterar a quantidade`)
        return false
    }
    let productToInsert = {
        productImg,
        productTitle,
        productPrice,

    }

    renderCart(productImg, productTitle, productPrice)
    update();
    openCart()
}

//função que remove itens do carrinho
function removeCartItem(button) {
    var cartItem = button.closest(".cart-list-products")
    cartItem.remove()
    update()

}

//função de mudança nas quantidades do item no carrinho 
function itemQuantityChange(inputs) {
    if (isNaN.inputs || inputs.value < 1) { // compara se o numero no input é um NaN ou se é negativo
        inputs.value = 1
    }
    inputs.value = Math.floor(inputs.value) // restringe a inserir somente números inteiros
    update()

}


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
    h3Title.textContent = name.toUpperCase()
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
    h3.textContent = productTitle.toUpperCase()
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
