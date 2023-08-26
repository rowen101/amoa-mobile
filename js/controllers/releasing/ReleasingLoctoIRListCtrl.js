app.controller('ReLoctoIRListCtrl', ['$scope', 'OrderReleaseService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
    function ($scope, OrderReleaseService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.list = [];
            
            $scope.pickitemlist = {};
            $scope.loc = OrderReleaseService.loc;
            $scope.getLoctoIRReleasing();
            $scope.title = 'Releasing Pick IR';
        }



       



        $scope.getLoctoIRReleasing = function () {
            LoadingService.StartLoading();
            OrderReleaseService.getLoctoIRReleasing($scope.loc)
                .then(function (res) {
                    $scope.list = OrderReleaseService.IRList;
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
            
                OrderReleaseService.rnum = ir;
                $state.go('app.releasingitem');
        
            
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

