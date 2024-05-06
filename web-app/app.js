// Product data
let products = []
let product = []

// QuerySelectorS to get Elements in Dom
const showProducts = document.querySelector('#show-products')
const formData = document.querySelector('#form-data')
const searchInput = document.querySelector('#input-search')
const showResualt = document.querySelector('#show-resualt')
const isAvailable = document.querySelector('#is-available')

// Event dom loaded
document.addEventListener('DOMContentLoaded', function() {

    products = showDataProducts()
    renderProducts(products)

})

// Event Submitform for save a Product
formData.addEventListener('submit', e => {

    e.preventDefault()
    const newProduct = e.target.elements.inputTitle.value.trim()
    const isChecked = e.target.elements.isAvailable.checked
    const productPrice = e.target.elements.inputPrice.value.trim()
    addProduct(products, newProduct, productPrice, isChecked)
    e.target.elements.inputTitle.value = ''
    e.target.isAvailable.checked = false
    isAvailable.checked = true

})

// Event input for search product
searchInput.addEventListener('input', e => {

    product = e.target.value.trim().toLowerCase()
    showResualt.innerHTML = ''
    searchProducts(product)

})

// Event show availabale product
isAvailable.addEventListener('change', e => {

    const isChecked = e.target.checked
    availabaleProducts(products, isChecked)

})



