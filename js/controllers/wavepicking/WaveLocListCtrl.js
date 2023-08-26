//Location List Controller
app.controller('WaveLocListCtrl', ['$scope', 'WavePickService', '$state', '$rootScope', 'LoadingService', '$cordovaBarcodeScanner','LoginService',
function ($scope, WavePickService, $state, $rootScope, LoadingService, $cordovaBarcodeScanner, LoginService) {

    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.getLocList();
    }

    $scope.getLocList = function () {
        console.log($scope.wc);
        WavePickService.GetLocationList($scope.wc)
            .then(function (res) {
                //success
                $scope.locList = WavePickService.locList;
                console.log(res);
            }, function (err) {
                //err
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+" Sorry we cant get the Location-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).
            finally(function () {
                //stop ion refresher
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
    };

    $scope.redirectMe = function (loc) {
        // $rootScope.loc = loc;
        WavePickService.loc = loc;
        $state.go('app.wavelocationpicking');
    };

     $scope.goBack = function(){
      LoadingService.GoBack();
    }

    $scope.ScanBarcode = function(){
        $cordovaBarcodeScanner.scan().then(function(data){
        if(!data.cancelled)
        {
            $scope.searchParam = data.text;
        } 
        },function(err){
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }
    $scope.init();

}]);
