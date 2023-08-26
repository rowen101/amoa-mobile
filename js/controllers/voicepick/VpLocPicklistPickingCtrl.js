app.controller('VpLocPickPickingCtrl', ['$scope', 'VoicePickSrv', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner', '$ionicModal', '$cordovaToast',
    function ($scope, VoicePickSrv, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner, $ionicModal, $cordovaToast) {
        $scope.pickDetail = {};
        $scope.filter = {};
        $scope.filter.lot = true;

        $scope.init = function () {
            $scope.pickId = VoicePickSrv.picklistId;
            $scope.GeItemToPick();
        }



        $scope.GeItemToPick = function () {
            LoadingService.StartLoading();
            VoicePickSrv.GeItemToPick(VoicePickSrv.picklistId, LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = VoicePickSrv.pickingList;
                    if ($scope.list.length === 0) {
                        $state.go('app.636480928199957093');
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
                $scope.infoModal.show();
                $scope.pickedItem = _.findWhere($scope.list, { 'PalleteNo': palnum });
                console.log($scope.pickedItem);
            }
            catch (err) {
                console.log(err.message);
            }
        }

        //  $scope.PickItem = function (palnum) {
        //     LoadingService.StartLoading();
        //     if($scope.filter.lot == true){
        //         $scope.pickDetail.lot = '';
        //     }
        //    var  qtyLeft = $scope.filter.qty == true ? 0 : $scope.pickDetail.qty;

        //    VoicePickSrv.PickItem(palnum, $scope.pickDetail.lot, qtyLeft)
        //         .then(function (res) {
        //             $scope.moreInfoModal.hide();
        //             $scope.pickDetail = {};
        //             console.log('Sucessfully tirggered stored proc');
        //             $scope.GeItemToPick();
        //             $cordovaToast.show(res.data, 'short', 'bottom');
        //         }, function (err) {
        //             LoadingService.PopAlert('Something went wrong', err.data);
        //         }).finally(function () {
        //             LoadingService.StopLoading();
        //             $scope.$broadcast('scroll.refreshComplete');
        //         })
        // }

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

        $ionicModal.fromTemplateUrl('templates/infoModal.html', {
            id: 'infoModal',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.infoModal = modal;
        });

        //  $scope.closeModal = function (modal) {
        //         if (modal == 'PickModal') {
        //             /*$scope.pickItemModal.hide();*/
        //         }
        //         else if (modal == 'MoreInfo') {
        //             $scope.moreInfoModal.hide();
        //         }
        //     }

        $scope.init();

    }]);
