var app = angular.module("MyModule");

app.service("MyService1", MyService1);
function MyService1() {
    this.doIt = function() {
        return "returned from MyService1";
    }
}

app.service("MyService2", MyService2);
function MyService2(numberValue) {
    this.doIt = function() {
        return  numberValue + " returned from MyService2";
    }
}
