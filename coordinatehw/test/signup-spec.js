describe("the signup page", function(){

    var passwordInput = element(by.model("signup.password"));
    var confirmPasswordInput = element(by.model("signup.confirmPassword"));

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
        checkRequired(passwordInput, element(by.cssContainingText(".validation-error","Password is required")));
    });
    it("should require confirmed password", function(){
        /* match passwords before testing required */
        passwordInput.sendKeys("testing input");
        checkRequired(confirmPasswordInput, element(by.cssContainingText(".validation-error","Must confirm your password")));
    });
    it("should make sure passwords match",function(){
        var error = element(by.cssContainingText(".validation-error","Passwords must match exactly"));
        expect(error.isPresent()).toEqual(false);
        passwordInput.sendKeys("password");
        confirmPasswordInput.sendKeys("not password");
        expect(error.isPresent()).toEqual(true);
        confirmPasswordInput.clear();
        confirmPasswordInput.sendKeys("password");
        expect(error.isPresent()).toEqual(false);
    });
});
