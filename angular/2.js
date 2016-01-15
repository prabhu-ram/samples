angular.module("myapp", [])
    	.controller("MyController", function($scope) {
			$scope.myData = {};
			$scope.myData.text = "This is my text";
			$scope.myData.textf = function()
				{ return "A text from a function"; };
		}
);
