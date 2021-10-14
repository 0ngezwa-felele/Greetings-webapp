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
    const dataErrorElement = document.querySelector('.dataError')
    if (fieldSpaceElement.innerHTML !== '') {
        setTimeout(function () {
            fieldSpaceElement.innerHTML = '';
        }, 6000);
    }
    if (dataErrorElement.innerHTML !== '') {
        setTimeout(function () {
            dataErrorElement.innerHTML = '';
        }, 3000);
    }
})
