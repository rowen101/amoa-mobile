app.controller('MyZoneItemPickCtrl', ['$scope', 'ItemPickingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner', '$ionicModal', '$cordovaToast',
    function ($scope, ItemPickingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner, $ionicModal, $cordovaToast) {
        $scope.pickDetail = {};
        $scope.filter = {};
        $scope.filter.lot = true;

        $scope.init = function () {
            $scope.itemCode = ItemPickingService.itemCode;
            $scope.itemDesc = ItemPickingService.itemDesc;
            $scope.GeItemToPick();
            $scope.userrole = LoginService.getProfile().userrole;
        }

        $scope.Scanshow = function(){
            $scope.scan = $rootScope.menuList;
                    var data = _.findWhere($rootScope.menuList, {
                        stage: "637469366253816551"
                      }).pages;
                      var ans = _.findWhere(data, { stage: "637475295689004807" });        
                      if (ans) {
                        return true;
                      } else {
                        return false;
                      }
        }
    
    
    
        $scope.ScanLocation = function (itm) {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    if(itm.LocationCode = data.text){
                        $scope.PickItem(itm.PalleteNo);
                    }else{
                        LoadingService.PopAlert("Invalid Location Barcode");
                    }
                    
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }

        $scope.GeItemToPick = function () {
            LoadingService.StartLoading();
            ItemPickingService.GetWaveItemToPick($scope.itemCode, LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = ItemPickingService.locToPick;
                    if ($scope.list.length === 0) {
                        $state.go('app.myzoneitempicklist');
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

            ItemPickingService.PickItem(palnum, $scope.pickDetail.lot, qtyLeft)
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

