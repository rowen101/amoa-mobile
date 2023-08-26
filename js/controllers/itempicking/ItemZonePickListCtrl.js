
///ZONE PICKLIST CONTROLLER
app.controller('ItemPickZonePickListCtrl', ['$scope', 'ItemPickingService', '$state', '$rootScope', '$ionicHistory', 'LoadingService', '$cordovaBarcodeScanner','LoginService',
 function ($scope, ItemPickingService, $state, $rootScope, $ionicHistory, LoadingService, $cordovaBarcodeScanner,LoginService) {

    $scope.init = function () {
        LoadingService.StartLoading();
        // $scope.zone = $rootScope.zone;
        $scope.fromzone = ItemPickingService.fromzone;
        $scope.zone = ItemPickingService.zone;
        $scope.getZonePickList();
    }


    $scope.getZonePickList = function () {
        ItemPickingService.GetZonePickList(LoginService.userProfile.warehouseCode, $scope.zone)
            .then(function (res) {
                $scope.zonePickList = ItemPickingService.zonePickList;
                if ($scope.zonePickList.length === 0) {
                    $state.go('app.636385913675607946');
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the Pick-list of Zone '" + $scope.zone + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                // Stop the ion-refresher from spinning
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.redirectMe = function (pickid) {
        ItemPickingService.zonePickId = pickid;
        $state.go('app.itempickzonepalletelist')
    }

    $scope.back = function () {
        console.log($scope.fromzone);
        if($scope.fromzone == "app.637474458499882116"){
            $state.go('app.637474458499882116')
        }else{
            $state.go('app.636385913675607946')
        }
        
    }

      $scope.ScanBarcode = function(){
        $cordovaBarcodeScanner.scan().then(function(data){
        if(!data.cancelled)
        {
            $scope.searchPickList = data.text;
        } 
        },function(err){
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }


    $scope.init();
}]);
