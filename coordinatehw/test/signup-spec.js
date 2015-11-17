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

    describe("password strength functions", function(){
        beforeEach(module("validationApp"));
        var $controller;
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));
        function checkStrength(password, toCheck, expected){
            $scope.signup.password = password;
            $scope.getStrength();
            expect(toCheck).toEqual(expected);
        }
        it("should have capped strength when there is no variety", function() {
            var $scope = {};
            var controller = $controller('signupForm', { $scope: $scope });

            checkStrength("thisisreallylongpasswordwithnovariety", $scope.passwordStrength, "25");
            checkStrength("thisisreallylongpasswordwithnovarietyA", $scope.passwordStrength, "50");
            checkStrength("thisisreallylongpasswordwithnovarietyA1", $scope.passwordStrength, "75");
            checkStrength("thisisreallylongpasswordwithnovarietyA1!", $scope.passwordStrength, "100");
        });
        it("should increment by multiplier",function(){
            /* maybe should be a global on scope, but don't like that */
            var multiplier = 8;
            checkStrength("a", $scope.passwordStrength, (multiplier).toString());
            checkStrength("ab", $scope.passwordStrength, (multiplier*2).toString());
            checkStrength("abc", $scope.passwordStrength, (multiplier*3).toString());
        });
        it("should give proper strength words", function(){
            checkStrength("thisisreallylongpasswordwithnovariety", $scope.strengthWord, "Weak");
            checkStrength("thisisreallylongpasswordwithnovarietyA", $scope.strengthWord, "Okay");
            checkStrength("thisisreallylongpasswordwithnovarietyA1", $scope.strengthWord, "Strong");
            checkStrength("thisisreallylongpasswordwithnovarietyA1!", $scope.strengthWord, "Really Strong!");
        });
        it("should give proper progress bar classes", function(){
            checkStrength("thisisreallylongpasswordwithnovariety", $scope.strengthClass, "progress-bar-danger");
            checkStrength("thisisreallylongpasswordwithnovarietyA", $scope.strengthClass, "progress-bar-warning");
            checkStrength("thisisreallylongpasswordwithnovarietyA1", $scope.strengthClass, "progress-bar-info");
            checkStrength("thisisreallylongpasswordwithnovarietyA1!", $scope.strengthClass, "progress-bar-success");
        });
    });
});
