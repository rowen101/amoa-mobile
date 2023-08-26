//PickList Controller
app.controller('ItemPickListCtrl', ['$scope', 'PickListService', '$state', '$rootScope', '$ionicHistory', 'LoadingService', '$cordovaBarcodeScanner',
function ($scope, PickListService, $state, $rootScope, $ionicHistory, LoadingService, $cordovaBarcodeScanner) {
    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.getPickList();
        $scope.wc = PickListService.userProfile.warehouseCode;
    }

    $scope.getPickList = function () {
        PickListService.getPickList()
            .then(function (res) {
                $scope.PickList = PickListService.PickList;
                console.log($scope.PickList);
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the Pick-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.redirectMe = function (pickid) {
        // $rootScope.pickid = pickid;
        PickListService.pickid = pickid;
        $state.go('app.itempickitemlist');
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
