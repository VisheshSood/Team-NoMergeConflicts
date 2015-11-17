describe("the signup page", function(){

    var passwordInput = element(by.model("signup.password"));
    var confirmPasswordInput = element(by.model("signup.confirmPassword"));
    
    var birthdateInput = element(by.model("user.birthdate"));

    beforeEach(function(){
        browser.get("http://localhost:8000");
    });

    function checkRequired(input, error){
        expect(error.isPresent()).toEqual(false);
        input.sendKeys("testing input");
        input.clear();
        expect(error.isPresent()).toEqual(true);
        input.sendKeys("testing input");
        expect(error.isPresent()).toEqual(false);
    }

    it("should require password", function(){
        checkRequired(passwordInput, element(by.class("validation-error")));
    });
    it("should require confirmed password", function(){
        /* match passwords before testing required */
        passwordInput.sendKeys("testing input");
        checkRequired(confirmPasswordInput, element(by.class("validation-error")));
    });
    it("should make sure passwords match",function(){
        var error = element(by.class("validation-error"));
        expect(error.isPresent()).toEqual(false);
        passwordInput.sendKeys("password");
        confirmPasswordInput.sendKeys("not password");
        expect(error.isPresent()).toEqual(true);
        confirmPasswordInput.clear();
        confirmPasswordInput.sendKeys("password");
        expect(error.isPresent()).toEqual(false);
    });
    
    /* Tests related to the birthday field */
    
    it("should require a birthdate", function() {
        checkRequired(birthdateInput, element(by.class("validation-error")));
    });
    
    it("should show an error if the user is under the age of 13", function() {
        var errorMsg = element(by.cssContainingText("You are not old enough to join! Try again later"))
        
        expect(errorMsg.isPresent()).toEqual(false);
        birthdateInput.sendKeys('01-01-2011');
        expect(errorMsg.isPresent()).toEqual(true);
        birthdateInput.clear();
        birthdateInput.sendKeys('08-28-1995');
        expect(errorMsg.isPresent()).toEqual(false);
    });
    
    it("show that the user has improper input formatting", function() {
        var requiredMsg = element(by.cssContainingText("Please enter your birthdate in the correct format (mm-dd-yyyy)"))
        
        expect(requiredMsg.isPresent()).toEqual(false);
        birthdateInput.sendKeys('30-08-2011');
        expect(requiredMsg.isPresent()).toEqual(true);
        birthdateInput.clear();
        birthdateInput.sendKeys('11-11-1996');
        expect(requiredMsg.isPresent()).toEqual(false);
        birthdateInput.clear();
        birthdateInput.sendKeys('08.28.1995');
        expect(requiredMsg.isPresent()).toEqual(true);
        birthdateInput.clear();
        birthdateInput.sendKeys('03/13/2001');
        expect(requiredMsg.isPresent()).toEqual(true);
        birthdateInput.clear();
        birthdateInput.sendKeys('07-27-1997');
        expect(requiredMsg.isPresent()).toEqual(false);
    });
    
});
