
app.controller('ItemPickMyZoneItemListCtrl', ['$scope', 'ItemPickingService', '$state', '$rootScope', 'LoadingService', '$cordovaBarcodeScanner', 'LoginService',
function ($scope, ItemPickingService, $state, $rootScope, LoadingService, $cordovaBarcodeScanner, LoginService) {

    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.zone = ItemPickingService.zone;
        $scope.GetItemList();
        
    }

    $scope.GetItemList = function () {
        ItemPickingService.GetItemList($scope.wc,$scope.zone)
            .then(function (res) {
                //success
                $scope.list = ItemPickingService.itemList;           
            }, function (err) {
                LoadingService.PopAlert("Something went wrong","Error Message: "+err.data+ " Sorry we cant get the ItemCode-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                //stop ion refresher
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
    };

    $scope.redirectMe = function (itmCode) {
        ItemPickingService.itemCode = itmCode;
        ItemPickingService.itemDesc = _.findWhere($scope.list, { ItemCode: itmCode }).ItemDesc
        $state.go('app.myzoneitempickinglist');
    };


    $scope.goBack = function () {
        LoadingService.GoBack();
    }
    $scope.ScanBarcode = function () {
        $cordovaBarcodeScanner.scan().then(function (data) {
            if (!data.cancelled) {
                $scope.search = data.text;
            }
        }, function (err) {
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }


    $scope.init();

}]);
