//global variables
var elementAarray = ['fname', 'lname', 'phone', 'email', 'address1', 'address2', 'city', 'postal'];
var shoppingCart = [];
var customer = [];
var totalPrice = [];
var currentPizza;

window.onload = function () {
    //validate customer first name input when onblur
    document.getElementById('fname').onblur = function () {
        elementValidate('fname');
    };

    //validate customer last name input when onblur
    document.getElementById('lname').onblur = function () {
        elementValidate('lname');
    };

    //validate customer phone number input when onblur
    document.getElementById('phone').onblur = function () {
        elementValidate('phone');
    };

    //validate customer email address input when onblur
    document.getElementById('email').onblur = function () {
        elementValidate('email');
    };

    //validate customer address1 input when onblur
    document.getElementById('address1').onblur = function () {
        elementValidate('address1');
    };

    //validate customer address2 input when onblur
    document.getElementById('address2').onblur = function () {
        elementValidate('address2');
    };

    //validate customer city input when onblur
    document.getElementById('city').onblur = function () {
        elementValidate('city');
    };

    //validate customer postal input when onblur
    document.getElementById('postal').onblur = function () {
        elementValidate('postal');
    };

    //validate all customer input when next button onclick
    document.getElementById('next').onclick = function () {
        var continueFlag = false;
        for (var i = 0; i < elementAarray.length; i++) {
            continueFlag = elementValidate(elementAarray[i]);
        }
        //if all the inputs are valid
        if (continueFlag) {
            //set pizza object to a new pizza
            window.currentPizza = setPizza();
            //storage customer information
            setCustomer();
            //set pizza information panel content
            setPizzaContent(window.currentPizza);
            //hide contact input div
            document.getElementById('contact').classList.add('hidden');
            //show order input div
            document.getElementById('order').classList.remove('hidden');
        }
    };

    //change the pizza name when pizza radios button onclick
    var nameInputs = document.getElementsByName('pizzaRadios');
    for (var i = 0; i < nameInputs.length; ++i) {
        nameInputs[i].onclick = function () {
            window.currentPizza.name = getPizzaName();
        };
    }

    //change the pizza size and price when size radios button onclick
    var sizeInputs = document.getElementsByName('sizeRadios');
    for (var i = 0; i < sizeInputs.length; ++i) {
        sizeInputs[i].onclick = function () {
            window.currentPizza.size = getSizeValue();
            window.currentPizza.sizePrice = getSizePrice(window.currentPizza.size);
            refreshPrice(window.currentPizza);
        };
    }

    //change the pizza toppings and price when toppings check box onclick
    var toppingElements = document.getElementById('toppings');
    var toppingInputs = toppingElements.getElementsByTagName('input');
    for (var i = 0; i < toppingInputs.length; ++i) {
        if (toppingInputs[i].type === 'checkbox') {
            toppingInputs[i].onclick = function () {
                var result = getToppings();
                window.currentPizza.topping = result.toppings;
                window.currentPizza.toppingPrice = getToppingPrize(result.toppingCount);
                refreshPrice(window.currentPizza);
            };
        }
    }

    //change the pizza crust and price when dough check box onclick
    var doughElements = document.getElementById('dough');
    var doughInputs = doughElements.getElementsByTagName('input');
    for (var i = 0; i < doughInputs.length; ++i) {
        if (doughInputs[i].type === 'checkbox') {
            doughInputs[i].onclick = function () {
                window.currentPizza.crust = getCrust();
                window.currentPizza.crustPrice = getCrustPrice(window.currentPizza.crust);
                refreshPrice(window.currentPizza);
            };
        }
    }

    //add a pizza to cart and show the order button when addtocart button onclick
    document.getElementById('addtocart').onclick = function () {
        addtoCart(window.currentPizza);
        document.getElementById('orderbutton').classList.remove('hidden');
    };

    //show the contact page and hide the order page
    document.getElementById('previous').onclick = function () {
        //show contact input div
        document.getElementById('contact').classList.remove('hidden');
        document.getElementById('contact').classList.add('show');
        //hide order input div
        document.getElementById('order').classList.remove('show');
        document.getElementById('order').classList.add('hidden');
    };

};