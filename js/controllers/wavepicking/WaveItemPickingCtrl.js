app.controller('WaveItemPickingCtrl', ['$scope', 'WavePickService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner', '$ionicModal', '$cordovaToast',
    function ($scope, WavePickService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner, $ionicModal, $cordovaToast) {
        $scope.pickDetail = {};
        $scope.filter = {};
        $scope.filter.lot = true;

        $scope.init = function () {
            $scope.itemCode = WavePickService.itemCode;
            $scope.itemDesc = WavePickService.itemDesc;
            $scope.GeItemToPick();
            $scope.userrole = LoginService.getProfile().userrole;
        }


        $scope.Scanshow = function(){
            $scope.scan = $rootScope.menuList;
                    var data = _.findWhere($rootScope.menuList, {
                        stage: "637469366253816551"
                      }).pages;
                      var ans = _.findWhere(data, { stage: "637475324339318317" });        
                      if (ans) {
                        return true;
                      } else {
                        return false;
                      }
        }
    
    
    
        $scope.ScanLocation = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    if($scope.pickDetail.LocationCode = data.text){
                        $scope.PickItem($scope.pickDetail.PalleteNo);
                    }else{
                        LoadingService.PopAlert("Invalid Location Barcode", err.data);
                    }
                    
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }

        $scope.GeItemToPick = function () {
            LoadingService.StartLoading();
            WavePickService.GetWaveItemToPick($scope.itemCode, LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = WavePickService.locToPick;
                    if ($scope.list.length === 0) {
                        $state.go('app.2017081611352024');
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



        $scope.showMoreInfoModal = function (palnum) {
            try {
                console.log(palnum);
                $scope.moreInfoModal.show();
                $scope.pickedItem = _.findWhere($scope.list, { 'PalleteNo': palnum });
                console.log($scope.pickedItem);
            }
            catch (err) {
                console.log(err.message);
            }
        }

        $scope.PickItem = function (palnum) {
            LoadingService.StartLoading();
            if ($scope.filter.lot == true) {
                $scope.pickDetail.lot = '';
            }
            var qtyLeft = $scope.filter.qty == true ? 0 : $scope.pickDetail.qty;

            WavePickService.PickItem(palnum, $scope.pickDetail.lot, qtyLeft)
                .then(function (res) {
                    $scope.moreInfoModal.hide();
                    $scope.pickDetail = {};
                    $scope.GeItemToPick();
                    $cordovaToast.show(res.data, 'short', 'bottom');
                }, function (err) {
                    LoadingService.PopAlert('Something went wrong', err.data);
                }).finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.ResetFilter = function () {
            $scope.filter = {};
            $scope.filter.qty = false;
            $scope.filter.lot = true;
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

        $ionicModal.fromTemplateUrl('templates/moreInfoModal.html', {
            id: 'moreInfoModal',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.moreInfoModal = modal;
        });



        $scope.init();

    }]);

