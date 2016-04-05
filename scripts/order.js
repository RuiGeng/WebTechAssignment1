//order button onclick
document.getElementById('orderbutton').onclick = function () {
    setCustomerInfo();
    setPizzaInfo();
    setTotalPrice();
};

//clear all the information form the orderinfor div
document.getElementById('closeModal').onclick = function () {
    var divElement = document.getElementById("orderinfor");
    while (divElement.hasChildNodes()) {
        divElement.removeChild(divElement.lastChild);
    }

};

// out put Customer Information to modal
function setCustomerInfo() {
    //show customer first name
    document.getElementById('customerFname').innerHTML = window.customer[0];
    //show customer last name
    document.getElementById('customerLname').innerHTML = window.customer[1];
    //show customer phone number
    document.getElementById('customerPhone').innerHTML = window.customer[2];
    //show customer email
    document.getElementById('customerEmail').innerHTML = window.customer[3];
    //show customer Address1
    document.getElementById('customerAddress1').innerHTML = window.customer[4];
    //show customer Address2
    document.getElementById('customerAddress2').innerHTML = window.customer[5];
    //show customer Province
    document.getElementById('customerProvince').innerHTML = window.customer[6];
    //show customer City
    document.getElementById('customerCity').innerHTML = window.customer[7];
    //show customer Postal
    document.getElementById('customerPostal').innerHTML = window.customer[8];
}

// out put Order Information to modal
function setPizzaInfo() {
    for (var i = 0; i < window.shoppingCart.length; ++i) {
        var para = document.createElement('p');
        var content = 'Pizza ' + (i + 1) + ':';

        //add pizza name
        content += ' Type: ' + window.shoppingCart[i].name;

        //add pizza size
        content += ' Size: ' + window.shoppingCart[i].size;

        //if has topping then add pizza topping
        if (!!window.shoppingCart[i].topping) {
            content += ' Toppings: ' + window.shoppingCart[i].topping;
        }

        //if has crust then add pizza crust
        if (!!window.shoppingCart[i].crust) {
            content += ' With ' + window.shoppingCart[i].crust;
        }

        //add pizza price
        content += ' price: ' + window.shoppingCart[i].price;

        var node = document.createTextNode(content);

        para.appendChild(node);

        var element = document.getElementById('orderinfor');
        element.appendChild(para);
    }
}

// out put total price to modal
function setTotalPrice() {
    var para = document.createElement('p');
    var content = 'Total: ' + window.totalPrice;
    var node = document.createTextNode(content);
    para.appendChild(node);

    var element = document.getElementById('orderinfor');
    element.appendChild(para);
}