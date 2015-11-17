describe("password strength functions", function(){
    var scope, controller;
    
    beforeEach(function(){
        angular.module("signupForm");
    });
    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        controller = $controller("signupForm", {$scope: scope});
    }));
    function checkStrength(password, toCheck, expected){
        $scope.signup.password = password;
        $scope.getStrength();
        expect(toCheck).toEqual(expected);
    }
    it("should have capped strength when there is no variety", function(){
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
