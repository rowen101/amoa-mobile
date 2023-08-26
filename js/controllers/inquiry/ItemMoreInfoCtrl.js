app.controller('ItemInfoCtrl', ['$scope', 'LoadingService', 'ItemMasterSrv', 'LoginService','$cordovaToast', '$state',
function ($scope, LoadingService, ItemMasterSrv,  LoginService,$cordovaToast,$state) {

$scope.init = function(){
  $scope.itemMaster = ItemMasterSrv.itemMaster;
}

        $scope.redirect = function () {
            $state.go('app.itembatchinventory');
            // $scope.iteminquirymodal.hide();
        }



   $scope.init();

}]);

