var app = angular.module("MyModule");

// a provider 
app.provider("MySecondService", providerFunction);

function providerFunction() {
    var provider = {};

	//$get is the factory function of the provider
    provider.$get = function() {
        var service = {};

        service.doIt = function() {
            alert("MySecondService: Service Done!");
        }
        return service;
    }
    return provider;
}



