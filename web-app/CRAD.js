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
// create new product with push in array and save to local storage and post to json file
const createProduct = (name, price, check, key, value) => {

    const id = createID()
    value.push({
        id: id,
        title: name,
        price: price,
        exist: check,
        created: timestamp(),
        updated: timestamp()
    })
    saveData(key, value)
    postData(value)
}
// post json to save in json file
const postData = async (value) => {

    const jsonData = JSON.stringify(value.map((item) => {
        return {
            sys: { id: item.id },
            fields: {
                title: item.name,
                price: parseFloat(item.price),
                created: item.created,
                updated: item.updated,
                image: { fields: { file: { url: './images/product-1.jpg' } } }
            }
        };
    }));

    try {
        const respons = await fetch('products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        // for test this method
        const data = await respons.json()
        console.log('Send data success.');
        return data
    } catch (error) {
        console.log('Error is:', error)
        throw error;
    }
}
// sort data
const sortProducts = (value, sortBy) => {

     const compareFunction = (a, b) => {
        if (a[sortBy] > b[sortBy]) {
            return -1;
        } else if (a[sortBy] < b[sortBy]) {
            return 1;
        } else {
            return 0;
        }
    };

    if (sortBy === 'byEdited' || sortBy === 'byCreated') {
        return value.sort(compareFunction);
    } else {
        return value;
    }
}
// show last edite
const lastEditeMessage = (timestamp) => {
    return `Last Edit: ${moment(timestamp).locale('fa').fromNow()}`
}
// change exist product with indexOf return true and false
const cheangeExist = (value, product, check) => {
    let index = value.indexOf(product);
    if (index !== -1) {
        value[index].exist = check;
        return true
    }
    return false
}
