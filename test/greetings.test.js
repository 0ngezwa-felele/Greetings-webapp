const assert = require('assert');
const Greetings = require('../greetings');

describe('greet tests', function () {
    it('should be able to greet a name enetered in Isixhosa when the greet button is clicked', function () {
        let xhosa = Greetings();


        assert.equal("Molo, Ongezwa", xhosa.greetPlease("Isixhosa", "Ongezwa"));
    });


    it('should be able to greet the name entered in English when the greet button is clicked ', function () {
        var english = Greetings();
       
       
        assert.equal("Hello, Ongezwa", english.greetPlease("English", "Ongezwa"));
    })
    it('should be able to greet the name entered in Sepedi when the greet button is clicked ', function () {
        var sepedi = Greetings();
       
        assert.equal("Thobela, Ongezwa", sepedi.greetPlease("Sepedi", "Ongezwa"));
    })
    describe('Error messages', function () {
        it('should return "Please type in a Name!" message when the language has been chosen but the text input field is still empty and the greetMe button has is clicked ', function () {
            var isixhosa = Greetings();

            assert.equal("Please type in a Name!", isixhosa.errorName());


        });
        it('should return "Please select a language!" message when the name has been typed but the language has not been selected and the greetMe button is clicked', function () {
            var isilungu = Greetings();


            assert.equal("Please select a language!", isilungu.errorLang());

        });
        it('should return "Please type in a name and select a language!" message when the greet button is clicked without selecting a language and inputing a name', function () {
            var both = Greetings();

            assert.equal("Please type in a name and select a language!", both.errorBoth());
        });
        it('should return "Enter a valid name!" message when there are special charectors typed on the text input field and the greetMe button is clicked', function () {
            var amanani = Greetings();

            assert.equal("Enter a valid name!", amanani.SpecialChar());
        });
    });
   describe("counter", async function(){
    it("Should be able to return the count number if the name is greeted",async function(){
        let number = Greetings()
       await number.setNames("Pumza");
      await  number.greetPlease("English", "Pumza")
      assert.equal(1, number.counter1())  
   
   })
 
   it("Should be able to stop the counter from incrementing when the same name is greeted",function(){
    let number = Greetings()
    number.setNames("Pumza");
    number.greetPlease("English", "Pumza")
    number.greetPlease("English", "Pumza")
  assert.equal(1, number.counter1())  

})
});
describe("Namelist",function(){
    it("Should be able to return the number of names greeted",function(){
        let counting  = Greetings([])
        var name = "ongi"
        var name2 = "avuzwa"
        var name3 = "Ano"
      
        counting.setNames(name)
        counting.setNames(name2)
        counting.setNames(name3)
       
        assert.deepEqual( 3, counting.counter1())


    })
    it("Should be able to return the list of names greeted",function(){
        let list  = Greetings([])
        var name = "ongi"
        var name2 = "avuzwa"
        var name3 = "Ano"
      
        list.setNames(name)
        list.setNames(name2)
        list.setNames(name3)

        list.greetPlease(name)
        list.greetPlease(name2)
        list.greetPlease(name3)
       
        assert.deepEqual( ["Ongi", "Avuzwa", "Ano"], list.getText())


    })

})
});