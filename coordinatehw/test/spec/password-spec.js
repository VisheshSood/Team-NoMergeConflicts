describe("password strength functions", function(){
    var scope, controller;
    beforeEach(function(){
        angular.mock.module("validationApp");
    });
    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        controller = $controller("signupForm", {$scope: scope});
        scope.user = {};
    }));
    function checkStrength(password, toCheck, expected){
        scope.user.password = password;
        scope.getStrength();
        expect(scope[toCheck]).toEqual(expected);
    }
    it("should have capped strength when there is no variety", function(){
        checkStrength("thisisreallylongpasswordwithnovariety", "passwordStrength", "25");
        checkStrength("thisisreallylongpasswordwithnovarietyA", "passwordStrength", "50");
        checkStrength("thisisreallylongpasswordwithnovarietyA1", "passwordStrength", "75");
        checkStrength("thisisreallylongpasswordwithnovarietyA1!", "passwordStrength", "100");
    });
    it("should increment by multiplier",function(){
        /* maybe should be a global on scope, but don't like that */
        var multiplier = 8;
        checkStrength("a", "passwordStrength", (multiplier).toString());
        checkStrength("ab", "passwordStrength", (multiplier*2).toString());
        checkStrength("abc", "passwordStrength", (multiplier*3).toString());
    });
    it("should give proper strength words", function(){
        checkStrength("thisisreallylongpasswordwithnovariety", "strengthWord", "Weak");
        checkStrength("thisisreallylongpasswordwithnovarietyA", "strengthWord", "Okay");
        checkStrength("thisisreallylongpasswordwithnovarietyA1", "strengthWord", "Strong");
        checkStrength("thisisreallylongpasswordwithnovarietyA1!", "strengthWord", "Really Strong!");
    });
    it("should give proper progress bar classes", function(){
        checkStrength("thisisreallylongpasswordwithnovariety", "strengthClass", "progress-bar-danger");
        checkStrength("thisisreallylongpasswordwithnovarietyA", "strengthClass", "progress-bar-warning");
        checkStrength("thisisreallylongpasswordwithnovarietyA1", "strengthClass", "progress-bar-info");
        checkStrength("thisisreallylongpasswordwithnovarietyA1!", "strengthClass", "progress-bar-success");
    });
});
