describe("the signup page", function () {

    var passwordInput = element(by.model("user.password"));
    var confirmPasswordInput = element(by.model("user.confirmPassword"));
    var birthdateInput = element(by.model("user.birthdate"));
    var firstName = element(by.model("user.first_name"));
    var lastName = element(by.model("user.last_name"));
    var email = element(by.model("user.email"));
    var passwordInput = element(by.model("user.password"));

    beforeEach(function () {
        browser.get("http://localhost:8000");
    });

    it('it has the correct header', function() {
        expect(browser.getTitle()).toEqual('Sign-Up Service');
    });

    
    it('must show warnings for invalid emails', function() {
        var emailInp = element(by.model('user.email')); 
        var emailAlertReqd  = element(by.id('emptyEmailAlert'));
        var emailAlertValid= element(by.id('invalidEmailAlert'));
        
        expect(emailAlertReqd.isPresent()).toEqual(false);
        emailInp.sendKeys('abc');
        emailInp.clear();
        expect(emailAlertReqd.isPresent()).toEqual(true);
        emailInp.sendKeys('abc');
        expect(emailAlertReqd.isPresent()).toEqual(false);
        emailInp.clear();
        expect(emailAlertValid.isPresent()).toEqual(false);
        emailInp.sendKeys('l0lgmailcom');
        expect(emailAlertValid.isPresent()).toEqual(true);
        emailInp.clear();
        emailInp.sendKeys('l0lgmail.com');
        expect(emailAlertValid.isPresent()).toEqual(true);
        emailInp.clear();
        emailInp.sendKeys('lolpleasew0rk@gmail.com');
        expect(emailAlertValid.isPresent()).toEqual(false);
        emailInp.clear();
    })

    it('must clear all input boxes', function () {
        firstName.sendKeys("Sam");
        lastName.sendKeys("I am");
        email.sendKeys("IDoNotLikeGreenEggsAndHam@gmail.com");
        passwordInput.sendKeys("IDoNotLikeThemSamIAm");
        confirmPasswordInput.sendKeys("IDoNotLikeThemSamIAm");
        element(by.buttonText("Reset")).click();
        expect(firstName.getText()).toEqual("");
        expect(lastName.getText()).toEqual("");
        expect(email.getText()).toEqual("");
        expect(passwordInput.getText()).toEqual("");
        expect(confirmPasswordInput.getText()).toEqual("");
    });

    it('must have valid last name', function () {
        var requiredMsg = element(by.cssContainingText(".validation-error", "Last name is required"));

        expect(requiredMsg.isPresent()).toEqual(false);
        lastName.sendKeys('abc');
        lastName.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        lastName.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);
    });

    function checkRequired(input, error) {
        expect(error.isPresent()).toEqual(false);
        input.sendKeys("testing input");
        input.clear();
        expect(error.isPresent()).toEqual(true);
        input.sendKeys("testing input");
        expect(error.isPresent()).toEqual(false);
    }

    it("should require password", function () {
        checkRequired(passwordInput, element(by.cssContainingText(".validation-error", "Password is required")));
    });

    it("should require confirmed password", function () {
        /* match passwords before testing required */
        passwordInput.sendKeys("testing input");
        checkRequired(confirmPasswordInput, element(by.cssContainingText(".validation-error", "Must confirm your password")));
    });

    it("should make sure passwords match", function () {
        var error = element(by.cssContainingText(".validation-error", "Passwords must match exactly"));
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
        var error = element(by.cssContainingText(".validation-error", "You are not old enough to join! Try again later"));
        expect(error.isPresent()).toEqual(false);
        birthdateInput.sendKeys("08-28-1995");
        birthdateInput.clear();
        expect(error.isPresent()).toEqual(true);
        birthdateInput.sendKeys("08-28-1995");
        expect(error.isPresent()).toEqual(false);
    });
    
    it("should show an error if the user is under the age of 13", function() {
        var errorMsg = element(by.cssContainingText(".validation-error", "You are not old enough to join! Try again later"));
        
        expect(errorMsg.isPresent()).toEqual(false);
        birthdateInput.sendKeys('01-01-2011');
        expect(errorMsg.isPresent()).toEqual(true);
        birthdateInput.clear();
        birthdateInput.sendKeys('08-28-1995');
        expect(errorMsg.isPresent()).toEqual(false);
    });
    
    it("show that the user has improper input formatting", function() {
        var requiredMsg = element(by.cssContainingText(".validation-error", "Please enter your birthdate in the correct format (mm-dd-yyyy)"));
        
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

