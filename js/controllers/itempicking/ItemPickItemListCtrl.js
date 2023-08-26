//PickList Controller
app.controller('ItemPickPalleteItemListCtrl', ['$scope', 'PickListService', '$state', '$rootScope', '$ionicHistory', 'LoadingService', '$cordovaBarcodeScanner',
function ($scope, PickListService, $state, $rootScope, $ionicHistory, LoadingService, $cordovaBarcodeScanner) {
    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.getPalleteItemList();
        $scope.wc = PickListService.userProfile.warehouseCode;
        $scope.pickid = PickListService.pickid;
    }

    $scope.getPalleteItemList = function () {
        PickListService.getPalleteItemList()
            .then(function (res) {
                console.log("Picklist itemlist:",res);
                $scope.ItemList = PickListService.ItemList;
             if ($scope.ItemList.length === 0) {
                    $state.go('app.636385912977506719');
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the item in picklist of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.redirectMe = function (itemcode) {
        // $rootScope.pickid = pickid;
        PickListService.itemCode = itemcode;
        PickListService.itemDesc = _.findWhere( $scope.ItemList ,{ItemCode : itemcode}).ItemDescription;
        $state.go('app.itempickitempalletelist');
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


     $scope.goBack = function(){
      LoadingService.GoBack();
    }

    $scope.init();
}]);
