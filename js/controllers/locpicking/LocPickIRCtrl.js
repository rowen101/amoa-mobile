app.controller('LocPickIRCtrl', ['$scope', 'LocationPickingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
    function ($scope, LocationPickingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


        $scope.init = function () {
            $scope.GetIRList();
            $scope.wc = LoginService.userProfile.warehouseCode;
        }



        $scope.GetIRList = function () {
            LoadingService.StartLoading();
            LocationPickingService.GetIRList(LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = LocationPickingService.issuanceList;
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
            LocationPickingService.issuanceRequest = ir;
            $state.go('app.locissuacepicking');
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

