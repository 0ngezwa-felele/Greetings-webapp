module.exports = function greetingRouts (greet) {
 
    async function all (req, res) {
        try {
            res.render('index', {
                greeted: greet.getPlease(), count: await greet.counter1()
            })
        } catch (error) {
            console.log(error)
        }
    }
    async function greetError(req, res) {
        let myName = req.body.inputName;
        let lang = req.body.language;
        let regularExp = /^[A-Za-z]+$/;
        try{
        if (lang && myName) {
            if (!regularExp.test(myName)) {
                req.flash('info', 'Please enter your name in a correct format!');
            } else {
                await greet.greetPlease(lang, myName)
                await greet.duplicates(myName)
            }

        }
        else {
            if (!myName && !lang) {
                req.flash('info', 'Please type in name and select a language!');
            }
            else if (!lang) {
                req.flash('info', 'Please select a language!');
    
            }
    
            else if (myName === '') {
                req.flash('info', 'Please enter your name!');
            }
            
        }
        
        }catch(error){
            console.log(error)
        }
        res.redirect('/')
    }

    async function greetedNames(req, res) {
        try {
            res.render('greetings', { greeted: await greet.getText() })
        } catch (error) {
            console.log(error)
        }
    }

    async function counter2 (req, res) {
        try {
            let name = req.params.inputName
        var namesList = await greet.counting()
        // console.log(name + " sdsdsdsds")
        res.render('counter', {
            name: name,
            personsCounter: namesList
        })
        
        } catch (error) {
            console.log(error)
        }
    }

    async function resetting(req, res) {
        await greet.reset();
            req.flash('key', 'Database cleared succesfully!');
            res.redirect('/')
    
    }

    return {
        all,
        greetError,
        counter2,
        resetting,
        greetedNames
        
    }
}
