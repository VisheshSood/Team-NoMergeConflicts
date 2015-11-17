describe("the signup page", function(){
    var requiredMessage = $('.email-required');
    var invalidEmailMessage = $('.email-invalid');
    var emailInp = element(by.model('user.email'));
    beforeEach(function(){
        browser.get("http://localhost:8000");
    });

    it('it has the correct header', function() {
        expect(browser.getTitle()).toEqual('Sign-Up Service');
    });
    
    it('should show that email is required', function() {
        expect(requiredMessage.isPresent()).toEqual(false);
        emailInp.sendKeys('abc');
        emailInp.clear();
        expect(requiredMessage.isPresent()).toEqual(true);
        emailInp.sendKeys('abc');
        expect(requiredMessage.isPresent()).toEqual(false);
    });

    it('should show that email entered is invalid', function() {
        expect(invalidEmailMessage.isPresent()).toEqual(false);
        emailInp.sendKeys('l0lgmailcom');
        expect(invalidEmailMessage.isPresent()).toEqual(true);
        emailInp.clear();
        emailInp.sendKeys('l0lgmail.com');
        expect(invalidEmailMessage.isPresent()).toEqual(true);
        emailInp.clear();
        emailInp.sendKeys('lolpleasew0rk@gmail.com');
        expect(invalidEmailMessage.isPresent()).toEqual(false);
        emailInp.clear();
    });   

});

