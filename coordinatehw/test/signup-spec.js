describe("the signup page", function(){
    var firstName = element(by.model("user.first_name"));
    var lastName = element(by.model("user.last_name"));
    var email = element(by.model("user.email"));

    beforeEach(function(){
        browser.get("http://localhost:8000");
    });

    it('must clear all input boxes', function() {
        firstName.sendKeys("Sam");
        lastName.sendKeys("I am");
        email.sendKeys("IDoNotLikeGreenEggsAndHam@gmail.com");
        element(by.buttonText("Reset")).click();
        expect(firstName.getText()).toEqual("");
        expect(lastName.getText()).toEqual("");
        expect(email.getText()).toEqual("");
    });

    it('must have valid last name', function() {
        var requiredMsg = element(by.className("validation-error"));

        expect(requiredMsg.isPresent()).toEqual(false);
        lastName.sendKeys('abc');
        lastName.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        lastName.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);
    });
});
