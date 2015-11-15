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
        $scope.passwordStrength = "100%";
        $scope.strengthClass = "progress-bar-danger";
        $scope.strengthWord = "weak";

        $scope.getStrengthWord = function(){
            /* move this out of ng-class */
            var strength = $scope.getStrength();
            if(strength < 25){
                $scope.strengthWord = "Weak";
                return "progress-bar-danger"
            }
            else if(strength < 50){
                $scope.strengthWord = "Okay";
                return "progress-bar-warning"
            }
            else if(strength < 75){
                $scope.strengthWord = "Strong";
                return "progress-bar-info"
            }
            else if(strength <= 100){
                $scope.strengthWord = "Really Strong!";
                return "progress-bar-success"
            }
        };
        $scope.getStrength = function(){
            return parseInt($scope.passwordStrength.replace("%", ""));
        };
    });
