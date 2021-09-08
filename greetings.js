module.exports = function Greetings(pool) {

    var nameList = {};
    var give = "";
    var greetMessage;


    async function setNames(name) {
        let storing = await pool.query('INSERT INTO greetings(name, counter) VALUES ($1,$2)',[name,1])
        return storing.rows
    }
    // console.log(name);
    // // insert to the database


    // if (name != '' && /^[a-zA-Z]+$/.test(name)) {
    //      var char = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    //     if (nameList[char] === undefined) {
    //         nameList[char] = 1
    //     } else {
    //         nameList[char]++
    //         "Name greeted already"
    //     }
    // }


    function greetPlease(lang, myName) {
        let newName = myName.charAt(0).toUpperCase() + myName.substring(1).toLowerCase();
        if (lang === "Isixhosa") {
            greetMessage = "Molo, " + newName.substring(0, 1).toUpperCase() + newName.substring(1).toLowerCase();
        }
        else if (lang === "English") {
            greetMessage = "Hello, " + newName.substring(0, 1).toUpperCase() + newName.substring(1).toLowerCase();
        }
        else if (lang === "Sepedi") {
            greetMessage = "Thobela, " + newName.substring(0, 1).toUpperCase() + newName.substring(1).toLowerCase();
        }
        // return greetMessage;

    }
    function getPlease() {
        return greetMessage
    }
     function counter1() {
        let namesList =  pool.query('SELECT (*) FROM greetings');

        return namesList.rowCount;
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
