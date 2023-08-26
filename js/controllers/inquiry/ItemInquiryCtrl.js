app.controller('ItemInquiryCtrl', ['$scope', 'LoadingService', 'ItemMasterSrv', '$rootScope', '$cordovaBarcodeScanner', '$ionicModal', 'LoginService', '$cordovaToast', '$state', '$timeout','StorageService',
    function ($scope, LoadingService, ItemMasterSrv, $rootScope, $cordovaBarcodeScanner, $ionicModal, LoginService, $cordovaToast, $state, $timeout,StorageService) {

        var tk = 20;
        var page = 0;
        $scope.itemMaster = {};
        $scope.itemInventoryList = [];
        $scope.moreDataCanBeLoaded = false;

        $scope.init = function () {
            $scope.GetItemList();
            $scope.searchParam = '';
            $scope.GetItemOnHandList('', 1);
            $timeout(function () { console.log("delayed") }, 10000);
        }

        $scope.GetItemList = function () {
            $scope.searchList = StorageService.getSearchlist();
            $scope.itemList = _.where($scope.searchList, { type: 'item' });
        }

        $scope.SelectItem = function (param) {
            $scope.searchParam = param;
            $scope.GetItemOnHandList($scope.searchParam, 1);
        }


        $scope.goBack = function () {
            LoadingService.GoBack();
        }

        $scope.resetCanBeLoaded = function (param) {
            if (param != $scope.selectedParam) {
                $scope.moreDataCanBeLoaded = true;
            }
        }

        $scope.setParam = function (param) {
            $scope.selectedParam = param;
        }

        $scope.ResetItemList = function () {
            $scope.itemInventoryList = [];
        }


        $scope.GetItemOnHandList = function (param, pg) //used for drag down to refresh
        {
            var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
            $scope.moreDataCanBeLoaded=false;
            if (!param) {
                param = '';
            }
            if ($scope.selectedParam != param) {
                $scope.setParam(param);
                pg = 1;
                page = 1;
                $scope.itemInventoryList = [];
            }
            if (pg == 1) {
                page = 1;
                $scope.itemInventoryList = [];
            }
            LoadingService.StartLoading();
            ItemMasterSrv.GetItemOnHandList(param, LoginService.userProfile.warehouseCode, tk, pg)
                .then(function (res) {
                    console.log(res);
                    $scope.itemCount = ItemMasterSrv.itemInventoryListObj.totalItem;
                    for (var i = 0; i < ItemMasterSrv.itemInventoryListObj.list.length; i++) {
                        $scope.itemInventoryList.push(ItemMasterSrv.itemInventoryListObj.list[i]);
                    }
                    $scope.moreDataCanBeLoaded = ItemMasterSrv.itemInventoryListObj.canNext;

                }, function (err) {
                    $scope.moreDataCanBeLoaded = false;
                    page--;
                    LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                    $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                }).finally(function (res) {
                    LoadingService.StopLoading();
                   // $scope.$broadcast('scroll.infiniteScrollComplete');
                    //$scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.loadMore = function (param) {
            page++;
            $scope.GetItemOnHandList(param, page);
        };

        $scope.setItemMaster = function (itemCode) {
            console.log(itemCode);
            $scope.itemMaster = _.findWhere($scope.itemInventoryList, { ItemCode: itemCode });
        }

        $scope.SearchBarcode = function () {//for searching
            
           $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    
                    $scope.searchParam = $scope.GetItemCode(data.text);
                    
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data.message);
            })
        }

        $scope.GetItemCode = function(param){
            ItemMasterSrv.GetItemCode(param)
            .then(function (res) {
                $scope.searchParam = res.data;
                $scope.GetItemOnHandList(res.data, 1);
                

            }, function (err) {
                LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
            }).finally(function (res) {
                LoadingService.StopLoading();
            })

        }

        $scope.redirectInfo = function () {
            ItemMasterSrv.itemMaster = $scope.itemMaster;
            
            $state.go('app.iteminquiryinfo');
        }


        $scope.init();

    }]);