const getElement = (id)=> {
    const element = document.getElementById(id)
    return element;
}
const addToCartHandler = () => {
    // get the input field
    const product = getElement('product-input').value;
    const quantity = getElement('quantity-input').value;
    getElement('product-input').value = "";
    getElement('quantity-input').value = "";
    const toast = getElement('toast')
    toast.textContent = ''
    // input filed number and string checking
    if(!isNaN(product) || !Number.isInteger(Number(quantity))){
        return toast.innerHTML = ` <div
        class="toast align-items-center d-block mt-2 container"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            Please, Provide a valid input.
          </div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>`
    }

    // fokhira system
    // window.location.reload()
    
    // 1st way
    // if(isNaN(quantity)){
    //     console.log("wrong input")
    // } else{
    //     console.log("correct input")
    // }
    // const number = Number.isInteger(Number(quantity))
    setLocalStorageProduct(product, quantity)
    // perfect system call the display function
    displayProduct()
}
// set local Storage data


const getLocalStorage = () => {
    const product = localStorage.getItem('All-Products');
    const parseProduct = JSON.parse(product);
    return parseProduct;
}

const setLocalStorageProduct = (product, quantity) => {
    // console.log(product, quantity)
    let products = getLocalStorage();
    
    if(!products){
        products = {}
    }

    // calculate the current quantity with add quantity
    if(products[product]){
        products[product] = parseInt(products[product]) + parseInt(quantity);
    }

    products[product] = quantity;
    
    localStorage.setItem("All-Products", JSON.stringify(products));

}

const displayProduct = () => {
    const allProducts = getElement('all-products'); 
    allProducts.textContent = ''
    const products = getLocalStorage();
    for(const product in products){
        const quantity = products[product]
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="shadow-sm p-3 mb-2 bg-body rounded">
            <span class="fs-3">${product}</span>
            Quantity:<small class="fw-bold">
                ${quantity}
            </small>
        </div>
        `
        allProducts.appendChild(div)
    }
}
displayProduct()