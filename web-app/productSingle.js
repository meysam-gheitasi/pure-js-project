const productTitle = document.querySelector("#productTitle")
const productPrice = document.querySelector("#productPrice")
const dateEl = document.querySelector("#last-edit")

let productsPage = showDataProducts()
let productId = location.hash.substring(1)
let productPage = productsPage.find(item => item.id === productId)

const findProductbyId = (id) => {
    let productIndex = productsPage.find(item => item.id == id)
    if (productIndex === -1 ) {
        return location.assign('./index.html')
    } else {
        return productIndex
    }
}

//// DO use methode findProductbyId()
//  findProductbyId(productId)

let productIndex = productsPage.findIndex(item => {
    return item.id == productPage.id
})

if (productPage === undefined) {
    location.assign('./index.html')
}

productTitle.value = productPage.title
productPrice.value = productPage.price
dateEl.textContent = lastEditeMessage(productPage.updated)

// Gete updat value
productTitle.addEventListener('input', e => {

    productPage.title = e.target.value.trim()
    productPage.updated = timestamp
    dateEl.textContent = lastEditeMessage(productPage.updated)
    updateByIndex(productsPage, productPage, productIndex)
    saveProducts(productsPage)

})
productPrice.addEventListener('input', e => {

    productPage.price = e.target.value.trim()
    productPage.updated = timestamp
    dateEl.textContent = lastEditeMessage(productPage.updated)
    updateByIndex(productsPage, productPage, productIndex)
    saveProducts(productsPage)

})

// const productAvaibale = e.target.elements.productAvaibale.checked
// if (!productAvaibale) {
//     const newProductsPage = productsPage.filter(item => item.id != productPage.id)
//     console.log(newProductsPage);
//     saveProducts(newProductsPage)
//     location.assign('./index.html')

// }

// Real-time display
window.addEventListener('storage', e => {

    if (e.key === 'products') {
        productsPage = JSON.parse(e.newValue)
        productPage = findProductbyId(productId)
   
        productTitle.value = productPage.title
        productPrice.value = productPage.price
        dateEl.textContent = lastEditeMessage(productPage.updated)

    }
})

