// window.addEventListener('storage', e => {
//     if(e.key === 'products') {
//         products = JSON.parse(e.newValue)
//     }
// })


// QuerySelectorS to get Elements in Dom
const showProducts = document.querySelector('#show-products')
const formData = document.querySelector('#form-data')
const searchInput = document.querySelector('#input-search')
const isAvailable = document.querySelector('#is-available')
const sort = document.querySelector('#sort')

// Product data
let products = []
let product = []
const filters = {
    searchItem: '',
    availabaleProducts: false,
    sortBy: 'byEdited'
}


// Event dom loaded
document.addEventListener('DOMContentLoaded', function () {

    isAvailable.checked = true
    products = showDataProducts()
    renderProducts(products, filters)

})

// Event get sort
sort.addEventListener('change', e => {

    filters.sortBy = e.target.value
    renderProducts(products, filters)

})

// Event Submitform save a Product
formData.addEventListener('submit', e => {

    e.preventDefault()
    const newProduct = e.target.elements.inputTitle.value.trim()
    const isChecked = e.target.elements.isAvailable.checked
    const productPrice = e.target.elements.inputPrice.value.trim()
    addProduct(products, newProduct, productPrice, isChecked)
    e.target.elements.inputTitle.value = ''
    saveProducts(products)
    renderProducts(products, filters)

})

// Event input for search product
searchInput.addEventListener('input', e => {

    if (!e.target.value.trim().length) {
        renderProducts(products, filters)
    } else {
        product = e.target.value.trim().toLowerCase()
        searchProducts(product)
    }

})

// Event show availabale product And import this product is availbale
isAvailable.addEventListener('change', e => {

    filters.availabaleProducts = e.target.checked
    availabaleProducts(products, filters.availabaleProducts)

})

// Real-time display
window.addEventListener('storage', e => {
    
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        renderProducts(products, filters)
    }

})
