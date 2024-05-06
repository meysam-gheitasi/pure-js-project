const formEl = document.getElementById("product-form").elements
const formProduct = document.getElementById("product-form")

let  productsPage = showDataProducts()
const productId = location.hash.substring(1)

const productPage = productsPage.find((item, index) => {
    return item.id === productId
})

if(productPage === undefined) {
    location.assign('/index.html')
}

formEl[0].value = productPage.title
formEl[1].value = productPage.price

// Form product values
formProduct.addEventListener('submit', e => {
    e.preventDefault()
    productPage.title = e.target.elements.productTitle.value.trim()
    productPage.price = e.target.elements.productPrice.value.trim()

    const productIndex = productsPage.findIndex((item) => {
        return item.id == productPage.id
   })

    const productAvaibale = e.target.elements.productAvaibale.checked
    if(!productAvaibale) {
        const newProductsPage = productsPage.filter(item => item.id != productPage.id)
        localStorage.setItem('products', JSON.stringify(newProductsPage))
        
    } 

   productsPage[productIndex] = productPage
   localStorage.setItem('products', JSON.stringify(productsPage))

})

 
