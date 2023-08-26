app.controller('LocInqBatchInvCtrl', ['$scope', 'LoadingService', 'LocInquirySrv', '$rootScope', '$cordovaBarcodeScanner', '$ionicModal','LoginService','$cordovaToast', '$state', '$stateParams',
function ($scope, LoadingService, LocInquirySrv, $rootScope, $cordovaBarcodeScanner, $ionicModal, LoginService,$cordovaToast,$state,$stateParams) {

$scope.init = function(){
    console.log("FDSFDASFDASFDSA");
  $scope.LocationCode = LocInquirySrv.locMaster.LocationCode;
     $scope.GetBatchInventoryList ($scope.LocationCode)
}



     $scope.GetBatchInventoryList = function(LocationCode) //used for drag down to refresh
            {
                LoadingService.StartLoading();
                LocInquirySrv.GetLocBatchInventoryList(LocationCode, LoginService.userProfile.warehouseCode)
                    .then(function(res) {
                        $scope.BatchInventoryList = LocInquirySrv.BatchInventoryList;
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

