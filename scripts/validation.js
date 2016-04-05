//validation function for input elements 
function elementValidate(element) {
    var itemValue = document.getElementById(element).value;
    var isValide = false;
    switch (element) {
        //first name
    case 'fname':
        if (validator.isEmpty(itemValue)) {
            showError(element);
            document.getElementById(element).focus();
            isValide = false;
        } else {
            showSuccess(element);
            isValide = true;
        }
        break;
        //last name
    case 'lname':
        if (validator.isEmpty(itemValue)) {
            showError(element);
            document.getElementById(element).focus();
            isValide = false;
        } else {
            showSuccess(element);
            isValide = true;
        }
        break;
        //phone number
    case 'phone':
        if (!validator.isPhone(itemValue)) {
            showError(element);
            document.getElementById(element).focus();
            isValide = false;
        } else {
            showSuccess(element);
            isValide = true;
        }
        break;
        //email address
    case 'email':
        if (!validator.isEmail(itemValue)) {
            showError(element);
            document.getElementById(element).focus();
            isValide = false;
        } else {
            showSuccess(element);
            isValide = true;
        }
        break;
        //address input 1
    case 'address1':
        if (validator.isEmpty(itemValue)) {
            showError(element);
            document.getElementById(element).focus();
            isValide = false;
        } else {
            showSuccess(element);
            isValide = true;
        }
        break;
        //address input 2
    case 'address2':
        if (validator.isEmpty(itemValue)) {
            showError(element);
            document.getElementById(element).focus();
            isValide = false;
        } else {
            showSuccess(element);
            isValide = true;
        }
        break;
        //city
    case 'city':
        if (validator.isEmpty(itemValue)) {
            showError(element);
            document.getElementById(element).focus();
            isValide = false;
        } else {
            showSuccess(element);
            isValide = true;
        }
        break;
        //postal code
    case 'postal':
        if (!validator.isPostal(itemValue)) {
            showError(element);
            document.getElementById(element).focus();
            isValide = false;
        } else {
            showSuccess(element);
            isValide = true;
        }
    }
    return isValide;
}


// validator object
var validator = {
    //check number
    isNum: function (num) {
        return isNaN(num);
    },

    //check empty string
    isEmpty: function (input) {
        return input.trim() === '';
    },

    //check phone number
    isPhone: function (number) {
        var phoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneNumber.test(number)) {
            return false;
        }
        return true;
    },

    //check email address
    isEmail: function (email) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            return false;
        }
        return true;
    },

    //check postal code
    isPostal: function (code) {
        var PostalPattern = /^\s*[a-ceghj-npr-tvxy]\d[a-ceghj-npr-tv-z](\s)?\d[a-ceghj-npr-tv-z]\d\s*$/i;
        if (!PostalPattern.test(code)) {
            return false;
        }
        return true;
    }
};