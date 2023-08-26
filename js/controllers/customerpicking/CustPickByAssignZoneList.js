app.controller('CusPickByAssignZoneListCtrl', ['$scope', 'CusPickingService', 'LoginService','$ionicModal', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
    function ($scope, CusPickingService, LoginService,$ionicModal, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


        $scope.init = function () {
            $scope.list = [];
              

            $scope.irnumb = CusPickingService.irnumb;
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.title = $scope.irnumb
            $scope.GetCusList();
            
            
        }

      


        $scope.GetCusList = function () {
            LoadingService.StartLoading();
            CusPickingService.getCustomerPickListbyAssignZone(LoginService.userProfile.warehouseCode,$scope.irnumb)
                .then(function (res) {
                    $scope.list = res.data;
                    if($scope.list.length === 1){
                        var zoning = $scope.list.find(m => m.Zone != " ").Zone;
                        //$scope.redirectMe(zoning);
                    }else if($scope.list.length === 0){
                        $state.go('app.637478994066410066');
                    }
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
            CusPickingService.zone = zone;
            $state.go('app.cuspickbyloclist');
        }



        $scope.init();

    }]);

