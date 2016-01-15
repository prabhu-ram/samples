var assert = require('assert');
var angular = require('angular');

var myModule = angular.module("myModule", []);

myModule.value("numberValue", 999);

myModule.controller("MyController", function($scope, numberValue) {

    console.log(numberValue);

});
