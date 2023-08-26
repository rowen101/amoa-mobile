(function (window, angular, undefined) {
    'use strict';

    var app = angular.module('starter');

    app.directive('uppercased', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (input) {
                    return input ? input.toUpperCase() : "";
                });
                element.css("text-transform", "uppercase");
            }
        };
    });
    app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})

})(window, window.angular);