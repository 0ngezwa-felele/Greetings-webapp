const assert = require('assert');
const Greetings = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// DB connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString
    // ssl: useSSL
});
const newGreet = Greetings(pool);

describe('greet tests', async function () {
    it('should be able to greet a name enetered in Isixhosa when the greet button is clicked',  async function () {
        let newGreet = Greetings();

        assert.equal("Molo, Ongezwa", await newGreet.greetPlease("Isixhosa", "Ongezwa"));
    });


    it('should be able to greet the name entered in English when the greet button is clicked ', async function () {
        var english = Greetings(pool);
       
       
        assert.equal("Hello, Ongezwa", await english.greetPlease("English", "Ongezwa"));
    })
    it('should be able to greet the name entered in Sepedi when the greet button is clicked ', async function () {
        var sepedi = Greetings(pool);
       
        assert.equal("Thobela, Ongezwa", await sepedi.greetPlease("Sepedi", "Ongezwa"));
    })
    describe('Error messages', async function (){
        it('should return "Please type in a Name!" message when the language has been chosen but the text input field is still empty and the greetMe button has is clicked ', async function(){
            var isixhosa = Greetings(pool);

            assert.equal("Please type in a Name!", await isixhosa.errorName());


        });
    });

        it('should return "Please select a language!" message when the name has been typed but the language has not been selected and the greetMe button is clicked', async function(){
            var isilungu = Greetings(pool);


            assert.equal("Please select a language!", await isilungu.errorLang());

        });
        it('should return "Please type in a name and select a language!" message when the greet button is clicked without selecting a language and inputing a name', async function () {
            var both = Greetings(pool);

            assert.equal("Please type in a name and select a language!", both.errorBoth());
        });
        it('should return "Enter a valid name!" message when there are special charectors typed on the text input field and the greetMe button is clicked', async function(){
            var amanani = Greetings(pool);

            assert.equal("Enter a valid name!", await amanani.SpecialChar());
        });
    });
   describe("counter", async function(){
    it("Should be able to return the count number if the name is greeted",async function(){
        let number = Greetings(pool)
       await number.setNames("Pumza");
      await  number.greetPlease("English", "Pumza")
      assert.deepEqual(4, await number.counter1())  
   
   })
})
 
   it("Should be able to stop the counter from incrementing when the same name is greeted",async function(){
    let number = Greetings(pool)
    await number.setNames("Pumza");
    await number.greetPlease("English", "Pumza")
   await number.greetPlease("English", "Pumza")
  assert.equal(4, await number.counter1())  

})

describe("Namelist",async function(){
    it("Should be able to return the number of names greeted",async function(){
        let counting  = Greetings(pool)
        var name = "ongi"
        var name2 = "avuzwa"
        var name3 = "Ano"
      
       await counting.setNames(name)
       await counting.setNames(name2)
      await  counting.setNames(name3)
       
        assert.deepEqual(4, await counting.counter1())


    })
})
    