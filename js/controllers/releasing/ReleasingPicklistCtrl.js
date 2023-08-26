//PickList Controller
app.controller('ReleasingPicklistCtrl',  ['$scope', 'OrderReleaseService', '$state', '$rootScope', '$ionicHistory', 'LoadingService', '$cordovaBarcodeScanner', 'LoginService',
function ($scope, OrderReleaseService, $state, $rootScope, $ionicHistory, LoadingService, $cordovaBarcodeScanner, LoginService) {
    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.getPickList();
        $scope.wc = LoginService.userProfile.warehouseCode;
    }

    $scope.getPickList = function () {
        OrderReleaseService.getPickList()
            .then(function (res) {
                $scope.PickList = OrderReleaseService.PickList;
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+" Sorry we cant get the Pick-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.redirectMe = function (pickid) {
        // $rootScope.pickid = pickid;
        OrderReleaseService.pickid = pickid;
        $state.go('app.orderreleasepalleteitemlist');
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
