app.controller('CusPickListCtrl', ['$scope', 'CusPickingService', 'LoginService','$ionicModal', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
    function ($scope, CusPickingService, LoginService,$ionicModal, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


        $scope.init = function () {
            $scope.list = [];
            $scope.actual = 0;
            $scope.GetCusList();
           $scope.searchParam = '';
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.email = LoginService.userProfile.emailAlias;
        }

      


        $scope.GetCusList = function () {
            LoadingService.StartLoading();
            CusPickingService.GetCusList(LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.actual = res.data.actual;
                    $scope.list = res.data.list;
                    console.log($scope.list);
                    if($scope.list.length === 1){
                        var IssuanceNo = $scope.list.find(m => m.IssuanceNo != " ").IssuanceNo;
                        var CustomerName = $scope.list.find(m => m.CustomerName != " ").CustomerName;
                     //   $scope.redirectMe(IssuanceNo,CustomerName);
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

      







        $scope.redirectMe = function (ir,cusName) {
            CusPickingService.irnumb = ir;
            CusPickingService.cusName = cusName;
            $state.go('app.cuspickbyassignzonelist');
        }

       

    
       


        $scope.init();

    }]);

