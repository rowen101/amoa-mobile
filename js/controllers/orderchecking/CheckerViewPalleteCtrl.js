//View Controller
app.controller('CheckerViewPalleteCtrl', ['$scope', 'LoginService', 'LoadingService', '$http', '$rootScope','ViewTransactionSrv',
 function ($scope, LoginService, LoadingService, $http, $rootScope, ViewTransactionSrv) {


    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.PickId = $rootScope.viewPickId;
        $scope.userid = LoginService.userProfile.emailAlias;
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.getPallete();
    }

    $scope.getPallete = function () {
          ViewTransactionSrv.GetViewPalleteList($scope.userid ,$scope.PickId)
                .then(function (res) {
                    $scope.PickedItems = ViewTransactionSrv.PickedItems;
                    console.log(res);
                }, function (data) {
                    LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+" Sorry we cant get the Pallete-list of Picklist '" + $scope.PickId + "'. Please try again later<br><br>Code : " + data.status + "<br> Status : " + data.statusText);
                }).finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
    }

    $scope.init();

}])