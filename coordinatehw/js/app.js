angular.module("validationApp", [])
    .controller("signupForm", function($scope){

        $scope.formSuccess = false;

        $scope.resetForm = function() {
            $scope.user = undefined;
            $scope.formSuccess = false;
        }

        $scope.signUp = function() {
            // TODO: form validation on user

            $scope.formSuccess = true;
        }
    });
