//show the help message when user input is not correct
function showError(id) {
    document.getElementById(id).classList.add('alert-danger');
    document.getElementById(id + 'help').classList.remove('hidden');
    document.getElementById(id + 'help').classList.add('show');
}

//hide the help message when user input is correct
function showSuccess(id) {
    document.getElementById(id).classList.remove('alert-danger');
    document.getElementById(id).classList.add('alert-success');
    document.getElementById(id + 'help').classList.remove('show');
    document.getElementById(id + 'help').classList.add('hidden');
}

// pizza object
function pizza(name, size, sizePrice, topping, toppingPrice, crust, crustPrice, tax, price) {
    this.name = name;
    this.size = size;
    this.sizePrice = sizePrice;
    this.topping = topping;
    this.toppingPrice = toppingPrice;
    this.crust = crust;
    this.crustPrice = crustPrice;
    this.tax = tax;
    this.price = price;
}

// get the information from page and make a pizza object
function setPizza() {
    var pizzaName = getPizzaName();
    var size = getSizeValue();
    var sizePrice = getSizePrice(size);
    var topping = getToppings();
    var toppingPrice = getToppingPrize(topping.toppingCount);
    var crust = getCrust();
    var crustPrice = getCrustPrice(crust);
    var province = getProvince();
    var tax = getTaxRate(province);
    var price = caculatePrice(sizePrice, toppingPrice, crustPrice, tax);
    return new pizza(pizzaName, size, sizePrice, topping.toppings, toppingPrice, crust, crustPrice, tax, price);
}

// get the information from page and storage into customer arrary
function setCustomer() {
    window.customer.push(document.getElementById('fname').value);
    window.customer.push(document.getElementById('lname').value);
    window.customer.push(document.getElementById('phone').value);
    window.customer.push(document.getElementById('email').value);
    window.customer.push(document.getElementById('address1').value);
    window.customer.push(document.getElementById('address2').value);
    window.customer.push(getProvince());
    window.customer.push(document.getElementById('city').value);
    window.customer.push(document.getElementById('postal').value);
}

// add pizza information to the order list table
function addOrderList(p) {
    var tableRef = document.getElementById("listbody");
    var row = tableRef.insertRow(0);

    //insert the cell
    row.insertCell(0).innerHTML = p.name;
    row.insertCell(1).innerHTML = p.size;
    row.insertCell(2).innerHTML = p.topping;
    row.insertCell(3).innerHTML = p.crust;
    row.insertCell(4).innerHTML = p.price;
}

// add a pizza object to cart
function addtoCart(p) {

    //storage into shoppingCart arrary
    window.shoppingCart.push(p);

    //show the total price
    setTotal(window.shoppingCart);

    //add to the order list table
    addOrderList(p);

    //clean the page information which uer was inputed
    restContent();
}

//reset the pizza information which user was selected
function restContent() {

    //reset the pizza type radio button to the default
    resetPizzaRadios();

    //reset the size radio button to the default
    resetSizeRadios();

    //reset the topping check box
    resetToppings();

    //reset the crust check box
    resetCrust();

    //make a new pizza object
    window.currentPizza = setPizza();

    //set the information panel to new pizza object
    setPizzaContent(window.currentPizza);

    //recalculate the pizza price 
    refreshPrice(window.currentPizza);
}

//reset the pizza type radio button to the original
function resetPizzaRadios() {
    document.getElementById('original').checked = true;
}

//reset the size radio button to the small
function resetSizeRadios() {
    document.getElementById('small').checked = true;
}

//reset the crust check box to the unchecked
function resetCrust() {
    document.getElementById('crust').checked = false;
}

//reset the toppings check box to the unchecked
function resetToppings() {
    var toppingElements = document.getElementById('toppings');
    var toppingInputs = toppingElements.getElementsByTagName('input');
    for (var i = 0; i < toppingInputs.length; ++i) {
        if (toppingInputs[i].type === 'checkbox') {
            toppingInputs[i].checked = false;
        }
    }
}

//recalculate the pizza price and reset the information panel
function refreshPrice(p) {
    p.price = caculatePrice(p.sizePrice, p.toppingPrice, p.crustPrice, p.tax);
    setPizzaContent(p);
}

// get Province element value
function getProvince() {
    var province = document.getElementById('province');
    var provinceValue = province.options[province.selectedIndex].value;
    return provinceValue;
}

// according to Province get the tax rate
function getTaxRate(province) {
    var rate = 13;
    switch (province) {
    case 'ontario':
        rate = 13;
        break;
    case 'quebec':
        rate = 11;
        break;
    case 'manitoba':
        rate = 10;
        break;
    case 'saskatchewan':
        rate = 15;
        break;
    default:
        rate = 13;
        break;
    }
    return rate;
}

// get pizza size element value
function getSizeValue() {
    var sizeInputs = document.getElementsByName('sizeRadios');
    var sizeValue = '';
    for (var i = 0; i < sizeInputs.length; ++i) {
        if (sizeInputs[i].checked) {
            sizeValue = sizeInputs[i].value;
        }
    }
    return sizeValue;
}

// get pizza size price
function getSizePrice(sizeValue) {
    var price = 5;
    switch (sizeValue) {
    case 'small':
        price = 5;
        break;
    case 'medium':
        price = 10;
        break;
    case 'large':
        price = 15;
        break;
    case 'xlarge':
        price = 20;
        break;
    default:
        price = 5;
        break;
    }
    return price;
}

// get pizza name from pizza radio group
function getPizzaName() {
    var pizzaInputs = document.getElementsByName('pizzaRadios');
    var pizzaValue = '';
    for (var i = 0; i < pizzaInputs.length; ++i) {
        if (pizzaInputs[i].checked) {
            pizzaValue = pizzaInputs[i].value;
            break;
        }
    }
    return pizzaValue;
}

// get pizza toppings and toppings number from toppings check box
function getToppings() {
    var toppings = '';
    var toppingCount = 0;
    var toppingElements = document.getElementById('toppings');
    var toppingInputs = toppingElements.getElementsByTagName('input');
    for (var i = 0; i < toppingInputs.length; ++i) {
        if (toppingInputs[i].type === 'checkbox') {
            if (toppingInputs[i].checked) {
                ++toppingCount;
                toppings += toppingInputs[i].value + ' ';
            }
        }
    }
    return {
        toppings: toppings,
        toppingCount: toppingCount
    };
}

// caculate toppings price
function getToppingPrize(count) {
    var price = 0;
    if (count !== 0) {
        price = (count - 1) * 0.50;
    }
    return price;
}

// get Crust value
function getCrust() {
    var crust = document.getElementById('crust');
    var crustValue = '';
    if (crust.checked) {
        crustValue = crust.value;
    }
    return crustValue;
}

// get Crust price
function getCrustPrice(crust) {
    var price = 0;
    if (crust == 'stuffed Crust') {
        price = 2.00;
    }
    return price;
}

// caculate the pizza price
function caculatePrice(sizePrice, topingPrice, crustPrice, tax) {
    var subTotal = parseFloat(sizePrice + topingPrice + crustPrice);
    var price = parseFloat((1 + (tax / 100)) * subTotal).toFixed(2);
    return price;
}

// set pizza information to the information panel
function setPizzaContent(p) {
    document.getElementById('size').innerHTML = '$' + p.sizePrice;
    document.getElementById('topping').innerHTML = '$' + p.toppingPrice;
    document.getElementById('iscrust').innerHTML = '$' + p.crustPrice;
    document.getElementById('tax').innerHTML = p.tax + '%';
    document.getElementById('price').innerHTML = '$' + p.price;
}

// set total price to total element
function setTotal(shoppingCart) {
    var temptotal = 0;
    for (var i = 0; i < shoppingCart.length; ++i) {
        temptotal = temptotal + parseFloat(shoppingCart[i].price);
        window.totalPrice = parseFloat(temptotal).toFixed(2);
    }
    document.getElementById('total').innerHTML = window.totalPrice;
}