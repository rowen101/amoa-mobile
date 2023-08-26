app.controller('IRListCtrl', ['$scope', 'OrderStagingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$ionicModal',
    function ($scope, OrderStagingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$ionicModal) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode; 
            $scope.emailAlias = LoginService.userProfile.emailAlias;
            $scope.loc = OrderStagingService.loc;
            $scope.ir = '';
            $scope.IRList();

                $scope.title = "Adding To Staging Pick IR";
            

        }
        
       

       

        $scope.IRList = function () {
            LoadingService.StartLoading();
            OrderStagingService.IRList($scope.wc)
                .then(function (res) {
                    $scope.list = res.data;
                   
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
            

                    OrderStagingService.ir = ir;
                    $scope.ir = ir;
                    $state.go('app.addtostagingloc');

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

