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


// const filters = {
//     searchItem: '',
//     availabaleProducts: false,
//     sortBy: 'byEdited'
// }


// Event after dom loaded
document.addEventListener('DOMContentLoaded', function () {

    isAvailable.checked = true
    render('byCreated', 'products')
    // products = showDataProducts()
    // renderProducts(products, filters)
})

// Event get sort
sort.addEventListener('change', e => {

    const sortBy = e.target.value
    render(sortBy, 'products')
    // filters.sortBy = e.target.value
    // renderProducts(products, filters)
})

// Event Submit form // get data product
formData.addEventListener('submit', e => {

    e.preventDefault()

    const name = e.target.elements.inputTitle.value.trim()
    const isChecked = e.target.elements.isAvailable.checked
    const price = e.target.elements.inputPrice.value.trim()

    createProduct(name, price, 1, isChecked, 'products' )
    render('byEdited', 'products')
    e.target.elements.inputTitle.value = ''
    e.target.elements.inputPrice.value = ''

})

// Event input search to products name
searchInput.addEventListener('input', e => {

    if (!e.target.value.trim().length) {
        render('byCreate', 'products')
    } else {
        product = e.target.value.trim().toLowerCase()
        console.log(product);
        searchName(product, 'products')
        // searchProducts(product)
    }
})

// Event show availabale product And import this product is availbale
isAvailable.addEventListener('change', e => {

    filters.availabaleProducts = e.target.checked
})

// Real-time display
window.addEventListener('storage', e => {

    if (e.key === 'products') {
        const products = JSON.parse(e.newValue)
        saveData('products', products)
        render('byCreated', 'products')
    }
})
