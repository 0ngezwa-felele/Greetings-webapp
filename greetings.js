module.exports = function Greetings(pool) {


    var give = "";
    var greetMessage;


    async function setNames(name) {
        let newName = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
        let storing = await pool.query('INSERT INTO greetings(name, counter) VALUES ($1,$2)', [newName, 1])
        return storing.rows
    }

    async function duplicates(name) {
        try {
            let nameFormat = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
            var checkName = await pool.query(`select name from greetings where name = $1`, [nameFormat]);
            if (checkName.rowCount === 0) {
                await setNames(nameFormat)
            } else {
                var duplicate = await pool.query(`update greetings set counter = counter + 1 where name = $1`, [nameFormat])
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    function greetPlease(lang, myName) {
        try {
            let newName = myName.charAt(0).toUpperCase() + myName.substring(1).toLowerCase();
            if (lang === "Isixhosa") {
                greetMessage = "Molo " + newName.substring(0, 1).toUpperCase() + newName.substring(1).toLowerCase();
            }
            else if (lang === "English") {
                greetMessage = "Hello " + newName.substring(0, 1).toUpperCase() + newName.substring(1).toLowerCase();
            }
            else if (lang === "Sepedi") {
                greetMessage = "Thobela " + newName.substring(0, 1).toUpperCase() + newName.substring(1).toLowerCase();
            }
            return greetMessage;

        } catch (error) {

        }

    }
    function getPlease() {
        return greetMessage
    }
    async function counter1() {
        let namesList = await pool.query('SELECT DISTINCT name FROM greetings');

        return namesList.rowCount;
    }


    async function getText() {
        let allNames = await pool.query('SELECT name, counter FROM greetings');

        return allNames.rows;

    }

    async function counting() {
        let allNames = await pool.query('SELECT * FROM greetings');
        var count = allNames.rows;
        return count[0].counter;
    }
    async function reset() {
        let remove = await pool.query('DELETE FROM greetings');
        return remove
    }

    function all(name, word) {
        if (name != "" && word != "" && /^[a-zA-Z]+$/.test(name)) {
            if (nameList[char] === undefined) {
                nameList[char] = 1
            } else {
                nameList[char]++
                "Name greeted already"
            }
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
        all,
        duplicates,
        reset,
        counting,




    }

}
