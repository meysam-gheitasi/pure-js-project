const productTitle = document.querySelector("#productTitle")
const productPrice = document.querySelector("#productPrice")
const dateEl = document.querySelector("#last-edit")

let productId = location.hash.substring(1)
const result =  getById(productId, 'products')

console.log(result);

productTitle.value = result.title
productPrice.value = result.price
dateEl.textContent = lastEditeMessage(result.updated)

// // Gete updat value
productTitle.addEventListener('input', e => {

    result.title = e.target.value.trim()
    dataToUpdateById(result, dateEl, 'products')
})

productPrice.addEventListener('input', e => {

    result.price = e.target.value.trim()
    dataToUpdateById(result, dateEl, 'products')
})


// if (productPage === undefined) {
//     location.assign('./index.html')
// }

// // const productAvaibale = e.target.elements.productAvaibale.checked
// // if (!productAvaibale) {
// //     const newProductsPage = productsPage.filter(item => item.id != productPage.id)
// //     console.log(newProductsPage);
// //     saveProducts(newProductsPage)
// //     location.assign('./index.html')

// // }

// // Real-time display
// window.addEventListener('storage', e => {

//     if (e.key === 'products') {
//         productsPage = JSON.parse(e.newValue)
//         productPage = findProductbyId(productId)
   
//         productTitle.value = productPage.title
//         productPrice.value = productPage.price
//         dateEl.textContent = lastEditeMessage(productPage.updated)

//     }
// })

