//Issuance PickList Controller
app.controller('ItemPickIssuancePickListCtrl', ['$scope', 'IssuanceService', '$ionicLoading', 'LoadingService', '$rootScope', '$state','$cordovaBarcodeScanner',
 function ($scope, IssuanceService, $ionicLoading, LoadingService, $rootScope, $state,$cordovaBarcodeScanner) {
    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.getIssuancePickList();
        // $scope.IssuanceNo = $rootScope.issuanceNo;
        $scope.IssuanceNo = IssuanceService.issuanceNo;

    }

    $scope.getIssuancePickList = function () {
        IssuanceService.getIssuancePickList()
            .then(function (res) {
                $scope.IssuancePickList = IssuanceService.IssuancePickList;
                console.log(res);
                if ($scope.IssuancePickList.length === 0) {
                    $state.go('app.636385913371875412');
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+" Sorry we cant get the Pick-list of Issuance '" + $scope.IssuanceNo + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).
            finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })



    }

    $scope.redirectMe = function (pickid) {
        // $rootScope.IssuancePickId = pickid;
      IssuanceService.IssuancePickId = pickid;
        $state.go('app.itempickissuancepalletelist');
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

