//Issuance List Controller
app.controller('CheckerIssuanceListCtrl', ['$scope', 'OrderCheckingService', '$state', '$rootScope', 'LoadingService', '$cordovaBarcodeScanner','LoginService',
 function ($scope, OrderCheckingService, $state, $rootScope, LoadingService,$cordovaBarcodeScanner,LoginService) {

    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.GetIssuanceList();
        $scope.wc = LoginService.userProfile.warehouseCode;
    }

    $scope.GetIssuanceList = function () {
        OrderCheckingService.GetIssuanceList()
            .then(function (res) {
                //success
                $scope.issuanceList = OrderCheckingService.IssuanceList;
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the IssuanceNo-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).
            finally(function () {
                //stop ion refresher
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
    };

    $scope.redirectMe = function (issNo) {
        // $rootScope.issuanceNo = issNo;
        OrderCheckingService.issuanceNo = issNo;
        $state.go('app.checkerissuanceitemlist');
    };

    $scope.goBack = function(){
      LoadingService.GoBack();
    }


    $scope.ScanBarcode = function(){
        $cordovaBarcodeScanner.scan().then(function(data){
        if(!data.cancelled)
        {
            $scope.search = data.text;
        } 
        },function(err){
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }
    $scope.init();

}]);
