var app = angular.module("MyModule");

// numberValue was injected here from the MyModule file where it is defined through value()
// and is now available to controllers, services, factories etc.
app.controller("MyController1", function($scope, numberValue, stringValue, objectValue) {
	$scope.numberValue = numberValue;
    $scope.stringValue = stringValue;
    $scope.objectValue = objectValue;
});

app.controller("MyController2", function($scope, MyFactory2) {
    $scope.factory2 = MyFactory2;
});

app.controller("MyController3", function($scope, MyFactory3) {
    $scope.factory3 = MyFactory3;
});

app.controller("MyController4", function($scope, MyService1) {
	$scope.service1 = MyService1.doIt();
});

app.controller("MyController5", function($scope, MyService2) {
	$scope.service2 = MyService2.doIt();
});

app.controller("MyController6", function($scope, MySecondService) {
	$scope.whenButtonClicked = function() {
        MySecondService.doIt();
    }
});
