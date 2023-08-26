app.controller('ItemInvCtrl', ['$scope', 'LoadingService', 'ItemMasterSrv', '$rootScope', '$cordovaBarcodeScanner', '$ionicModal','LoginService','$cordovaToast', '$state', '$stateParams',
function ($scope, LoadingService, ItemMasterSrv, $rootScope, $cordovaBarcodeScanner, $ionicModal, LoginService,$cordovaToast,$state,$stateParams) {

$scope.init = function(){
  $scope.itemcode = ItemMasterSrv.itemMaster.ItemCode;
     $scope.GetBatchInventoryList ($scope.itemcode)
}



     $scope.GetBatchInventoryList = function(itmcde) //used for drag down to refresh
            {
                LoadingService.StartLoading();
                ItemMasterSrv.GetItemBatchInventoryList(itmcde, LoginService.userProfile.warehouseCode)
                    .then(function(res) {
                        $scope.BatchInventoryList = ItemMasterSrv.BatchInventoryList;
                    }, function(err) {
                           LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+" Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                    }).finally(function(res) {
                        LoadingService.StopLoading();
                        $scope.$broadcast('scroll.refreshComplete');
                    })
            }

        $scope.GetItemInfo = function(batchno) {
            $scope.item = _.findWhere($scope.BatchInventoryList, { BatchNo: batchno });
        }


    $ionicModal.fromTemplateUrl('templates/stockiteminfomodal.html', {
            id: 'stockiteminfomodal',
            scope: $scope
        }).then(function(modal) {
            $scope.stockiteminfomodal = modal;
        });


   $scope.init();

}]);

