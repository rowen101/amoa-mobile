app.controller('LocPPickListCtrl', ['$scope', 'LocationPickingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner', '$ionicHistory',
    function ($scope, LocationPickingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$ionicHistory) {


        $scope.init = function () {
            $scope.GetPicklist();
            $scope.wc = LoginService.userProfile.warehouseCode;
        }



        $scope.GetPicklist = function () {
            LoadingService.StartLoading();
            LocationPickingService.GetPicklist(LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = LocationPickingService.picklist;
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.redirectMe = function (pickid) {
            // $rootScope.IssuancePickId = pickid;
            LocationPickingService.picklistId = pickid;
            $state.go('app.locationpicklistitem');
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

