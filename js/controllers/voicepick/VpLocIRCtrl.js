app.controller('VpLocPickIRCtrl', ['$scope', 'VoicePickSrv', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
function ($scope, VoicePickSrv, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


    $scope.init = function () {
        $scope.GetIRList();
        $scope.wc = LoginService.userProfile.warehouseCode;
    }



    $scope.GetIRList = function () {
        LoadingService.StartLoading();
        VoicePickSrv.GetIRList(LoginService.userProfile.warehouseCode)
            .then(function (res) {
                $scope.list = VoicePickSrv.issuanceList;
            }
            , function (err) {
                LoadingService.PopAlert("Something went wrong", err.data);
            })
            .finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
    }

    $scope.redirectMe = function (ir) {
        VoicePickSrv.issuanceRequest = ir;
        $state.go('app.vplocirpicking');
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

