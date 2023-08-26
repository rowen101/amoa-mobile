(function (window, angular, undefined) {
    'use strict';

    var app = angular.module('starter');

    app.directive('setFocus',function($timeout){
        return {
           link:  function(scope, element, attrs){
             element.bind('click',function(){
                 console.log(attrs);
                // //alert(element.attr('id'));
                // console.log('#' + attrs.setFocus)
                //   document.querySelector('#' + attrs.setFocus).focus();
                  $timeout(function() {
                    document.querySelector('#' + attrs.setFocus).focus(); 
                  },100);
              })
           }
         }
    });

})(window, window.angular);