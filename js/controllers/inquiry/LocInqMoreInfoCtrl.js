app.controller('LocInqInfoCtrl', ['$scope', 'LoadingService', 'LocInquirySrv', 'LoginService','$cordovaToast', '$state',
function ($scope, LoadingService, LocInquirySrv,  LoginService,$cordovaToast,$state) {

$scope.init = function(){
  $scope.locMaster = LocInquirySrv.locMaster;
  console.log($scope.locMaster);
}

        $scope.redirect = function () {
            $state.go('app.locationbatchinventory');
        }



   $scope.init();

}]);

