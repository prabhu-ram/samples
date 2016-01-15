var app = angular.module("MyModule");

// factories return a value
app.factory("MyFactory2", function() {
    return "factory value2";
});

// numberValue is injected here - it is defined in the module definition
app.factory("MyFactory3", function(numberValue) {
    return "factory Value3 = " + numberValue;
});
