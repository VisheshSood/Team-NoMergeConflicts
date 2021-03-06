angular.module("validationApp", [])
    .directive("compareTo", function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue === scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    })
    .directive("validateBirthdate", function() {
        console.log("testing");
        return {
            require: 'ngModel',
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.validateBirthdate = function(modelValue) {
                    var birthday = Date.parse(modelValue);
                    var age = ((Date.now() - birthday) / 31557600000);
                    return(age > 13);
                    
                };
            }
        };
    })   
    .controller("signupForm", function($scope){
        $scope.passwordStrength = "0";
        $scope.strengthClass = "progress-bar-danger";
        $scope.strengthWord = "Weak";
        $scope.formSuccess = false;

        $scope.resetForm = function () {
            $scope.user = undefined;
            $scope.formSuccess = false;
        }

        $scope.signUp = function () {
            // TODO: form validation on user

            $scope.formSuccess = true;
        }

        $scope.getStrength = function () {
            var strength = 0;
            if ($scope.user && $scope.user.password) {
                strength = getStrengthValue($scope.user.password);
            }
            $scope.passwordStrength = strength.toString();
            var data = getStrengthWord(strength);
            $scope.strengthWord = data.word;
            $scope.strengthClass = data.class;
        };
        function getStrengthValue(word) {
            if (word.length > 0) {
                var variety = [0, 0, 0, 0];
                var index = 0;
                /* get the variety of the password */
                for (index; index < word.length; index++) {
                    var currentChar = word.charAt(index);
                    if (containsSpecial(currentChar)) {
                        variety[3]++;
                    }
                    else if (containsNumber(currentChar)) {
                        variety[2]++;
                    }
                    else if (containsCapital(currentChar)) {
                        variety[1]++;
                    }
                    else {
                        variety[0]++;
                    }
                }
                index = 0;
                var everything = 0;
                /* get the unique variety */
                for (index; index < variety.length; index++) {
                    if (variety[index] > 0) {
                        everything++;
                    }
                }
                var multiplier = 8;
                var varietyMultipler = 100.0 / variety.length;
                /* limit to the variety of the password */
                return Math.min(everything * varietyMultipler, word.length * multiplier);
            }
            return 0;
        }

        function getStrengthWord(str) {
            if (str <= 25) {
                return {word: "Weak", class: "progress-bar-danger"};
            }
            else if (str <= 50) {
                return {word: "Okay", class: "progress-bar-warning"};
            }
            else if (str <= 75) {
                return {word: "Strong", class: "progress-bar-info"}
            }
            else {
                return {word: "Really Strong!", class: "progress-bar-success"}
            }
        }

        function containsSpecial(str) {
            return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?\@]/g.test(str);
        }

        function containsNumber(str) {
            return /[0123456789]/g.test(str);
        }

        function containsCapital(str) {
            return /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(str);
        }
    });
