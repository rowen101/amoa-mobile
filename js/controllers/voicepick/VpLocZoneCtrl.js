app.controller('VpLocPickZoneCtrl', ['$scope', 'VoicePickSrv', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
function ($scope, VoicePickSrv, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


    $scope.init = function () {
        $scope.GetZoneList();
        $scope.wc = LoginService.userProfile.warehouseCode;
    }



    $scope.GetZoneList = function () {
        LoadingService.StartLoading();
        VoicePickSrv.GetZoneList(LoginService.userProfile.warehouseCode)
            .then(function (res) {
                $scope.list = VoicePickSrv.zoneList;
            }
            , function (err) {
                LoadingService.PopAlert("Something went wrong", err.data);
            })
            .finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
    }

    $scope.redirectMe = function (zone) {
        VoicePickSrv.zone = zone;
        $state.go('app.vploczonepicking');
    }

    $scope.ScanBarcode = function () {
        $cordovaBarcodeScanner.scan().then(function (data) {
            if (!data.cancelled) {
                $scope.searchParam = data.text;
            }
        }, function (err) {
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }

    $scope.goBack = function () {
        LoadingService.GoBack();
    }


    $scope.init();

}]);

