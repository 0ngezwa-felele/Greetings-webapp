document.addEventListener('DOMContentLoaded', function () {
    const errorMessageElement = document.querySelector('.errorMessage')
    if (errorMessageElement.innerHTML !== '') {
        setTimeout(function () {
            
            errorMessageElement.innerHTML = '';
        }, 3000);
    }
 })

 document.addEventListener('DOMContentLoaded', function () {
    const fieldSpaceElement = document.querySelector('.fieldSpace')
    if (fieldSpaceElement.innerHTML !== '') {
        setTimeout(function () {
            fieldSpaceElement.innerHTML = '';
        }, 3000);
    }
});
    document.addEventListener('DOMContentLoaded', function () {
    const dataErrorElement = document.querySelector('.dataError')
    if (dataErrorElement.innerHTML !== '') {
        setTimeout(function () {
            dataErrorElement.innerHTML = '';
        }, 3000);
    }
 })