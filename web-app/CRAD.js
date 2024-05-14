// create  date with moment package js
const timestamp = () => {

    let time = oment().valueOf()
    return time
}
// create new id by uuid package js
const createID = () => {
    const id = uuid()
    return id
}
// get cart as localStorage or return empty array
const getData = (key) => {

    return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : []
}
// save data to localstorage
const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}
// remove children HTML
const removeChildren = (element) => {

    while (element.children.length > 0) {
        element.removeChild(element.children[0])
    }
}
// remove a data with ID
const remove = (key, value, id) => {

    value = value.filter(item => item.id !== id)
    saveData(key, value)
}
// remove all data
const removeAllData = (key, value) => {

    const dataId = value.map(item => item.id)
    dataId.forEach(item => remove(key, value, item))
}
// get a data as local storag by Id
const getById = (key, id) => {

    let data = JSON.parse(localStorage.getItem(key))
    return data.find(item => item.id === id)
}
// decrease or increase methode with save and delete amount ziro
const changeAmount = (item, type, key, value) => {

    let id = item.dataset.id
    let product = value.find(item => item.id === id)

    if (type === 'increase') {
        product.amount += 1
        item.nextElementSibling.innerText = product.amount
    } else if (type === 'decrease' && product.amount > 1) {
        product.amount -= 1
        item.previousElementSibling.innerText = product.amount
    } else {
        removeChildren(cartContent)
        remove = (key, value, id)
    }
    saveData(key, value)
}
// create event delete or change amount product
const eventDeleteOrChangeAmount = (element, eventName, key, value) => {

    element.addEventListener(eventName, e => {

        if (e.target.classList.contains('remove-item')) {

            let item = e.target
            let id = item.dataset.id

            removeChildren(element)
            remove(key, value, id)
        }

        e.target.classList.contains('fa-chevron-up') && changeAmount(e.target, 'increase')

        e.target.classList.contains('fa-chevron-down') && changeAmount(e.target, 'decrease')
    })
}
const postData = () => {
    const jsonData = JSON.stringify(products.map((product, index) => {
        return {
            sys: { id: (index + 1).toString() },
            fields: {
                title: product.name,
                price: parseFloat(product.price),
                image: { fields: { file: { url: `./images/product-${index + 1}.jpg` } } }
            }
        };
    }));
}
