app.controller('ItemCtrl', ['$scope', 'LoadingService', 'ItemMasterSrv', '$rootScope', '$cordovaBarcodeScanner', '$ionicModal', 'LoginService', '$cordovaToast', '$state', '$timeout',
    function ($scope, LoadingService, ItemMasterSrv, $rootScope, $cordovaBarcodeScanner, $ionicModal, LoginService, $cordovaToast, $state, $timeout) {

        $scope.goBack = function () {
            LoadingService.GoBack();
        }

        var tk = 20;
        var page = 0;

        $scope.itemMaster = {};
        $scope.itemCodeList = [];
        $scope.moreDataCanBeLoaded = false;


        $scope.init = function () {
            LoadingService.StartLoading();
            $scope.GetItemCodeList('', 1);
        }

        $scope.resetCanBeLoaded = function (param) {
            if (param != $scope.selectedParam) {
                $scope.moreDataCanBeLoaded = true;
            }
        }

        $scope.setParam = function (param) {
            $scope.selectedParam = param;
        }


        $scope.GetItemCodeList = function (param, pg) {
            LoadingService.StartLoading();
            var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
            if (!param) {
                param = '';
            }
            if ($scope.selectedParam != param) {
                $scope.setParam(param);
                pg = 1;
                page = 1;
                $scope.itemCodeList = [];
            }

            ItemMasterSrv.GetActiveItemMasterList(param,LoginService.userProfile.warehouseCode, tk, pg)
                .then(function (res) {
                    $scope.itemCount = ItemMasterSrv.itemListObj.totalItem;
                    for (var i = 0; i < ItemMasterSrv.itemListObj.list.length; i++) {
                        $scope.itemCodeList.push(ItemMasterSrv.itemListObj.list[i]);
                    }
                    $scope.moreDataCanBeLoaded = ItemMasterSrv.itemListObj.canNext;
                }, function (err) {
                    console.log(err);
                    page--
                    $scope.moreDataCanBeLoaded = false;
                    LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                    $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                }).finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.loadMore = function (param) {
            console.log("apram is :" + param);
            page++;
            $scope.GetItemCodeList(param, page);
        };

        $scope.setItemMaster = function (itemCode) {
            console.log(itemCode);
            $scope.itemMaster = _.findWhere($scope.itemCodeList, { ItemCode: itemCode });
            console.log($scope.itemMaster);
        }

        $scope.SearchBarcode = function () {//for searching
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.searchParam = data.text;
                    $scope.GetItemCodeList($scope.searchParam, 1);
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data.message);
            })
        }

        $scope.ScanBarcode = function () {//for updating bar code
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.itemMaster.NewCode = data.text;
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data.message);
            })
        }

        $scope.BarcodeUpdate = function () {

            LoadingService.StartLoading();
            ItemMasterSrv.BarcodeUpdate($scope.itemMaster.ItemCode, $scope.itemMaster.NewCode)
                .then(function (res) {
                    LoginService.ResetSearchList();
                    $scope.itemCodeList = [];
                    page = 1;
                    $scope.GetItemCodeList('', page);
                    $scope.barcodesetupmodal.hide();
                    $cordovaToast.show(res.data, 'short', 'bottom');
                }, function (err) {
                    LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                    LoadingService.StopLoading();
                })
        }

        $scope.ResetItemList = function () {
            $scope.itemCodeList = [];
        }

        $scope.redirect = function () {
            $state.go('app.iteminventory', { itemcode: $scope.itemMaster.ItemCode });
            $scope.barcodesetupmodal.hide();
        }


        $ionicModal.fromTemplateUrl('templates/barcodesetupmodal.html', {
            id: 'barcodesetupmodal',
            scope: $scope
        }).then(function (modal) {
            $scope.barcodesetupmodal = modal;
        });




        $scope.init();

    }]);
