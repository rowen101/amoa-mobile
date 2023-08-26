app.controller('ZoneListCtrl', ['$scope', 'AdminSrv', 'LoginService', '$ionicLoading','$ionicPopup' ,'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$ionicModal',
    function ($scope, AdminSrv, LoginService, $ionicLoading,$ionicPopup, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$ionicModal) {


        $scope.init = function () {
            
            $scope.title = "List of Zones";
            $scope.list = [];
            $scope.GetzonelistForAvailable();

        }



        $scope.GetzonelistForAvailable = function () {
            LoadingService.StartLoading();
            AdminSrv.GetzonelistForAvailable()
                .then(function (res) {
                    $scope.list = res.data;
                   
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data.message);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.redirectMe = function (zone) {
            AdminSrv.zone = zone;
            $state.go('app.zoneaccess');
        }
       
        $scope.init();

    }]);

