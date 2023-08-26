app.controller('ReLocListCtrl', ['$scope', 'OrderReleaseService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
    function ($scope, OrderReleaseService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.locList = [];
            $scope.getLocReleasing();
            $scope.title = 'Releasing Pick Location';
            $scope.turnClearAppData = 'ASC';
        }



        $scope.Scanshow = function(){
            if($rootScope.scanreleasing.length === 0){
            
                 return false;
            }else{
                var ans = _.findWhere($rootScope.scanreleasing, { stage: "637483142116573150" });        
                if (ans) {
                  return true;
                } else {
                  return false;
                }
            }
        }
            


        $scope.ScanLocation = function (loc) {

            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    var d =  $scope.locList.find(m => m.LocCode == data.text.toUpperCase());
                    if(d != undefined){
                        $scope.redirectMe(data.text.toUpperCase());
                    }else{
                        LoadingService.PopAlert("Location not the same");
                    }     
                }           
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }



        $scope.getLocReleasing = function () {
            LoadingService.StartLoading();
            OrderReleaseService.getLocReleasing($scope.wc)
                .then(function (res) {
                    $scope.locList = OrderReleaseService.locList;
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }


        $scope.click = function (ir) {
            if($scope.Scanshow()){

            }else{
                $scope.redirectMe(ir);
            }
            
    
    }

        $scope.redirectMe = function (ir) {
            
                OrderReleaseService.loc = ir;
                $state.go('app.releaseIR');
        
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

