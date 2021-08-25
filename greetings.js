module.exports = function Greetings() {

    var nameList = [];
    var give = "";
    var greetMessage;

    function setNames(name) {
        console.log(name);
        
        if (name != '' && /^[a-zA-Z]+$/.test(name)) {
            var char = name.substring(1, 2).toUpperCase() + name.substring(1).toLowerCase();
            if (!nameList.includes(char)) {
                nameList.push(char)
            } else {
                give = "Name greeted already"
            }
        }
    }

    function greetPlease(lang, myName) {
        if (lang === "Isixhosa") {
            greetMessage = "Molo, " + myName.substring(0, 1).toUpperCase() + myName.substring(1).toLowerCase();
        }
        else if (lang === "English") {
            greetMessage = "Hello, " + myName.substring(0, 1).toUpperCase() + myName.substring(1).toLowerCase();
        }
        else if (lang === "Sepedi") {
            greetMessage = "Thobela, " + myName.substring(0, 1).toUpperCase() + myName.substring(1).toLowerCase();
        }
        return greetMessage;

    }
    function getPlease() {
        return greetMessage
    }
    function counter1() {
        return nameList.length
    }
    function getText() {
        return nameList;
    }

    function all(name, word) {
        if (name != "" && word != "" && /^[a-zA-Z]+$/.test(name)) {
            return word + name[0].toUpperCase() + name.slice(1).toLowerCase();
        }
    }
    function errorName() {
        return "Please type in a Name!"
    }
    function errorLang() {
        return "Please select a language!"
    }
    function errorBoth() {
        return "Please type in a name and select a language!"
    }
    function SpecialChar() {
        return "Enter a valid name!"
    }
    function existing() {
        return give;
    }


    function errorTimeOut() {
        return " "
    }

    return {
        Greetings,
        setNames,
        greetPlease,
        getPlease,
        counter1,
        getText,
        errorName,
        errorLang,
        errorBoth,
        errorTimeOut,
        SpecialChar,
        existing,
        all




    }

}
