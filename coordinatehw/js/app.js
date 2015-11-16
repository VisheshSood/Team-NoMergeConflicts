angular.module("validationApp", [])
    .directive("compareTo", function(){
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel){
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue === scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    })
    .controller("signupForm", function($scope){
        $scope.passwordStrength = "0";
        $scope.strengthClass = "progress-bar-danger";
        $scope.strengthWord = "weak";

        $scope.getStrengthWord = function(str){
            if(str < 25){
                $scope.strengthWord = "Weak";
                $scope.strengthClass = "progress-bar-danger"
            }
            else if(str < 50){
                $scope.strengthWord = "Okay";
                $scope.strengthClass = "progress-bar-warning"
            }
            else if(str < 75){
                $scope.strengthWord = "Strong";
                $scope.strengthClass = "progress-bar-info"
            }
            else {
                $scope.strengthWord = "Really Strong!";
                $scope.strengthClass = "progress-bar-success"
            }
        };
        $scope.getStrength = function(){
            if($scope.signup && $scope.signup.password.length > 0){
                var variety = [0,0,0,0];
                var index = 0;
                for(index; index < $scope.signup.password.length; index++){
                    var currentChar = $scope.signup.password.charAt(index);
                    if(containsSpecial(currentChar)){
                        variety[3]++;
                    }
                    else if(containsNumber(currentChar)){
                        variety[2]++;
                    }
                    else if(containsCapital(currentChar)){
                        variety[1]++;
                    }
                    else {
                        variety[0]++;
                    }
                }
                console.log(variety);
                index = 0;
                var everything = 0;
                for(index; index < variety.length; index++){
                    if(variety[index] > 0){
                        everything++;
                    }
                }
                var multiplier = 5;
                /* limit to the variety of the password */
                var strength = Math.min(everything * 25, $scope.signup.password.length * multiplier);
                console.log($scope.signup.password);
                console.log(strength);
                $scope.getStrengthWord(strength);
                $scope.passwordStrength = strength;
            }
        };
        function containsSpecial(str){
            return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
        }
        function containsNumber(str){
            return /[0123456789]/g.test(str);
        }
        function containsCapital(str){
            return /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(str);
        }
    });
