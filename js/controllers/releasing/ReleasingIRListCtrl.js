app.controller('ReIRListCtrl', ['$scope', 'OrderReleaseService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$cordovaToast',
    function ($scope, OrderReleaseService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$cordovaToast) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.list = [];
            $scope.getIRReleasing();
            $scope.pickitemlist = {};
            $scope.title = 'Releasing Pick IR';
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

          /*  $scope.scan = $rootScope.menuList;
                    var data = _.findWhere($rootScope.menuList, {
                        stage: "637483037915871938"
                      }).pages;*/
                      
        }



        $scope.getIRReleasing = function () {
            LoadingService.StartLoading();
            OrderReleaseService.getIRReleasing($scope.wc)
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

        $scope.redirectMe = function (ir,loc) {  
            if($scope.Scanshow()){
                $cordovaToast.show("Scan the Location", 'short', 'bottom');
                $scope.ScanLocation(ir,loc);
            }else{
                OrderReleaseService.rnum = ir;
                $state.go('app.releasingitem');
            }    
           
        }


        $scope.ScanLocation = function (ir,loc) {

            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                   // var d =  $scope.locList.find(m => m.LocCode == data.text);
                    if(loc === data.text.toUpperCase()){
                        OrderReleaseService.rnum = ir;
                        
                        $state.go('app.releasingitem');
                    }else{
                        LoadingService.PopAlert("Location not the same");
                    }     
                }           
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
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

