describe("the signup page", function () {

    var firstName = element(by.model("user.first_name"));
    var lastName = element(by.model("user.last_name"));
    var email = element(by.model("user.email"));
    var passwordInput = element(by.model("user.password"));
    var confirmPasswordInput = element(by.model("user.confirmPassword"));

    beforeEach(function () {
        browser.get("http://localhost:8000");
    });

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
});
