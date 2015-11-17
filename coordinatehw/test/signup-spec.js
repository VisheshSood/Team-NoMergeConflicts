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
});

