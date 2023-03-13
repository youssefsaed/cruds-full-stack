const title = document.getElementById('title')
const price = document.getElementById('price')
const taxes = document.getElementById('taxes')
const ads = document.getElementById('ads')
const discount = document.getElementById('discount')
const total = document.getElementById('total')
const count = document.getElementById('count')
const category = document.getElementById('category')
const submitBtn = document.getElementById('submitBtn')
const bgTotal = document.querySelector('.total')
const tbody = document.querySelector('#tbody')
const deleteAll = document.querySelector('#deleteAll')
const Search = document.querySelector('#Search')
const searchByTitle = document.querySelector('#searchByTitle')
const searchByCategory = document.querySelector('#searchByCategory')
const alertError = document.querySelector('.error')

let character
let products
let id
let update = false

// sum
function getTotal() {
    if (price.value != '') {
        const totalNum = (+price.value + +ads.value + +taxes.value) - +discount.value
        total.innerHTML = totalNum
        bgTotal.style.cssText = "background-color:#A8F25E;color:black;"
    }
    else {
        bgTotal.style.cssText = "background-color: black;color:#fff"
        total.innerHTML = ''
    }
}

//fetch====>method:post/update
const postData = async (data = {}, url, endPoint) => {
    const response = await fetch(url, {
        method: endPoint,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
    GetAllProduct()
    return response.json()

}

//fetch====>method:get
async function fetchData(url, method) {
    const response = await fetch(url, { method: method })
    const res = await response.json()
    if (res.message == 'success') {
        products = await res.products
        display()
    }

}
async function Delete(url, method) {
    const response = await fetch(url, { method: method })
    const res = await response.json()
    if (res.message == 'success') {
        products = await res.products
        GetAllProduct()

    }

}

//GetAllProduct    
function GetAllProduct() {
    fetchData('http://localhost:3000/app/cruds/GetAllProduct', 'get')
}
GetAllProduct()


//AddProduct and update
submitBtn.addEventListener('click', () => {
    const data = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '') {
        if (update) {
            postData(data, `http://localhost:3000/app/cruds/UpdateProduct/${id}`, 'put')
            update = false
            count.style.display = 'block'
            submitBtn.classList.remove('bg-update')
            submitBtn.innerHTML = 'creat'
        }
        else {
            if (count.value > 0 && count.value <= 100) {
                for (let i = 0; i < count.value; i++) {
                    postData(data, `http://localhost:3000/app/cruds/AddProduct`, 'post')
                }
            }
            else {
                postData(data, `http://localhost:3000/app/cruds/AddProduct`, 'post')
            }

        }
        alertError.classList.remove('d-block')
        clear()
    }
    else if (title.value == '') {
        alertError.innerHTML = 'title is required'
        alertError.classList.add('d-block')
    }
    else if (price.value == '') {
        alertError.innerHTML = 'price is required'
        alertError.classList.add('d-block')
    }
    else {
        alertError.innerHTML = 'category is required'
        alertError.classList.add('d-block')
    }




})

//delete product
function deleteProduct(Pid) {

    Delete(`http://localhost:3000/app/cruds/DeleteProduct/${Pid}`, 'delete')
    GetAllProduct()

}

//deleteAllProduct
function deleteAllProduct() {
    Delete(`http://localhost:3000/app/cruds/DeleteAllProduct`, 'delete')
    GetAllProduct()
}

//btn updateProduct
function updateProduct(Pid, i) {
    update = true
    id = Pid
    title.value = products[i].title
    price.value = products[i].price
    taxes.value = products[i].taxes
    ads.value = products[i].ads
    discount.value = products[i].discount
    total.value = products[i].total
    category.value = products[i].category
    submitBtn.innerHTML = 'update'
    submitBtn.classList.add('bg-update')
    count.style.display = 'none'
    getTotal()
    scroll({
        top,
        behavior: "smooth"
    })
}

//search
function search(c) {
    character = c
    if (character != '') {
        return character

    }
    else {
        GetAllProduct()
    }
}
searchByTitle.addEventListener('click', () => {
    fetchData(`http://localhost:3000/app/cruds/SearchTitleProduct/${character}`, 'get')
})
searchByCategory.addEventListener('click', () => {
    fetchData(`http://localhost:3000/app/cruds/SearchCategoryProduct/${character}`, 'get')
})


//empty inputs
function clear() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    category.value = ''
    count.value = ''
    getTotal()
}

//show data
function display() {
    let contain = ''
    for (let i = 0; i < products.length; i++) {
        contain += `<tr>
        <td>${products[i].Pid}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="updateProduct(${products[i].Pid},${i})" class="btn-upd">update</button></td>
        <td><button onclick="deleteProduct(${products[i].Pid})" class="btn-del">delete</button></td>
    </tr>`
    }
    tbody.innerHTML = contain

    products.length > 0 ? deleteAll.innerHTML = `delete All(${products.length})` : deleteAll.innerHTML = 'delete All'
}


//type placholder
function typeTitle() {
    Search.placeholder = "search By Title"
}
function typeCategory() {
    Search.placeholder = "search By Category "
}