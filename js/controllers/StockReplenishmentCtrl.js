app.controller('StockReplenishmentCtrl', ['$scope', '$ionicModal', 'LoadingService', 'StockReplenishmentSrv', '$cordovaBarcodeScanner', 'LoginService', '$cordovaToast', '$ionicPopup', '$state',
    function ($scope, $ionicModal, LoadingService, StockReplenishmentSrv, $cordovaBarcodeScanner, LoginService, $cordovaToast, $ionicPopup, $state) {
        $scope.batchInvList = [];
        $scope.selectedQty = 0;
        $scope.item = {};
        $scope.locationList = [];
        $scope.location = {};

        $scope.init = function () {
            $scope.GetLocList();
            $scope.GetItem();
            $scope.GetReplenishmentBatchInventory();
            $scope.timestamp = new Date();
            console.log("datetime : " + $scope.timestamp);
        }

        $scope.GetItem = function () {
            $scope.item = StockReplenishmentSrv.itemToReplenish
            $scope.suggestedQty = $scope.item.MaximumReplenishment - $scope.item.PickingQty;
        }

        $scope.GetReplenishmentBatchInventory = function () {
            LoadingService.StartLoading();
            StockReplenishmentSrv.GetReplenishmentBatchInventory(LoginService.userProfile.warehouseCode, $scope.item.ItemCode)
                .then(function (res) {
                    $scope.batchInvList = StockReplenishmentSrv.batchInvList;
                    console.log($scope.batchInvList)
                }, function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                }).finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.CountSelected = function () {
            var selectedCount = _.where($scope.batchInvList, { isSelected: true });
            var total = 0
            for (var i = 0; i < selectedCount.length; i++) {
                total += selectedCount[i].BatchQty;
            }
            $scope.selectedQty = total;
        }

        $scope.ValidateTop = function (batchno) {//validate if they want to select the 
            var hasItem = $scope.batchInvList.length != 0 ? true : false;
            var selected = _.findWhere($scope.batchInvList, { BatchNo: batchno });
            if (hasItem) {
                var firstItem = $scope.batchInvList[0];
                if (firstItem.BatchNo != batchno && firstItem.isSelected != true) {

                    var total = $scope.selectedQty;
                    if (selected.isSelected == false) {
                        total = total + selected.BatchQty;
                        if (total <= $scope.suggestedQty) {
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Are you sure?',
                                template: 'There is a qualified batch prior to your selection. </br></br> Do you wish to continue?'
                            });

                            confirmPopup.then(function (res) {
                                if (res) { //if true
                                    $scope.toggleSelected(batchno);
                                } else {

                                }
                            });
                        }
                        else {
                            console.log("Qty selected will exceed maximum replenishment level")
                            $cordovaToast.show("Qty selected will exceed maximum replenishment level", 'short', 'bottom');
                        }


                    }
                    else {
                        $scope.toggleSelected(batchno);
                    }
                }
                else {
                    $scope.toggleSelected(batchno);
                }
            }
        }

        $scope.ValidateIndex = function (batchno) {
            var hasItem = $scope.batchInvList.length != 0 ? true : false;
            var selected = _.findWhere($scope.batchInvList, { BatchNo: batchno });
            var index = _.findIndex($scope.batchInvList, { BatchNo: batchno });
            console.log("index : " + index);
            if (hasItem) {
                var topIndex = 0;
                if (index > 0) {
                    topIndex = index - 1;
                }

                var topItem = $scope.batchInvList[topIndex];
                if (topItem.BatchNo != batchno && topItem.isSelected != true) {


                    var total = $scope.selectedQty;
                    if (selected.isSelected == false) {
                        total = total + selected.BatchQty;
                        if (total <= $scope.suggestedQty) {
                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Are you sure?',
                                template: 'There is a qualified batch prior to your selection. </br></br> Do you wish to continue?'
                            });

                            confirmPopup.then(function (res) {
                                if (res) { //if true
                                    $scope.toggleSelected(batchno);
                                } else {

                                }
                            });
                        }
                        else {
                            console.log("Qty selected will exceed maximum replenishment level")
                            $cordovaToast.show("Qty selected will exceed maximum replenishment level", 'short', 'bottom');
                        }


                    }
                    else {
                        $scope.toggleSelected(batchno);
                    }
                }
                else {
                    $scope.toggleSelected(batchno);

                }
            }
        }


        $scope.toggleSelected = function (batchno) {
            var selected = _.findWhere($scope.batchInvList, { BatchNo: batchno });
            var total = $scope.selectedQty;
            if (selected.isSelected == false) {
                total = total + selected.BatchQty;
                if (total <= $scope.suggestedQty) {

                    selected.isSelected = selected.isSelected == true ? false : true;

                }
                else {

                    console.log("Qty selected will exceed maximum replenishment level")
                    $cordovaToast.show("Qty selected will exceed maximum replenishment level", 'short', 'bottom');
                }
            }
            else {
                selected.isSelected = selected.isSelected == true ? false : true;
            }

            $scope.CountSelected();
        }



        $ionicModal.fromTemplateUrl('templates/replenishlocmodal.html', {
            id: 'replenishlocmodal',
            scope: $scope
        }).then(function (modal) {
            $scope.replenishlocmodal = modal;
        });

        $scope.SelectItem = function (param) {
            $scope.searchParam = param;
            $scope.selectedParam = param;
        }



        $scope.GetLocList = function () {
            LoadingService.StartLoading();
            StockReplenishmentSrv.GetLocList(LoginService.userProfile.warehouseCode).then(function (res) {
                $scope.locationList = StockReplenishmentSrv.locationList;
                console.log($scope.locationList);
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data);
            }).finally(function (res) {
                LoadingService.StopLoading();
            })

        }

        $scope.SetSuggestedLoc = function (param) {
            $scope.location.setLocation = param;
            console.log("setLoc is " + $scope.location.setLocation)
            $scope.CheckIfLocationExist($scope.location.setLocation);
        }

        $scope.CheckIfLocationExist = function (locCode) {
            $scope.location.suggetedLocation = locCode;
            $scope.locationExist = _.findWhere($scope.locationList, { LocationCode: locCode }) ? true : false;//has location
            $scope.showLocationMessage = _.findWhere($scope.locationList, { LocationCode: locCode }) ? false : true;//has no location
        }


        $scope.ScanSuggestedLocationBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.location.suggetedLocation = data.text.toUpperCase();
                    $scope.CheckIfLocationExist(data.text.toUpperCase());
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot get location code", err.data);
            })
        }



        $scope.clearLocation = function () {
            $scope.location = {};
        }


        $scope.ReplenishStock = function (suggestedLoc) {
            var listOfSelected = _.where($scope.batchInvList, { isSelected: true });
            StockReplenishmentSrv.ReplenishStock(listOfSelected, suggestedLoc, $scope.timestamp, $scope.item.ItemCode, LoginService.userProfile.emailAlias)
                .then(function (res) {
                    var data = res.data;

                    if (data.hasItem) {
                        $scope.item = data.item;
                        $scope.GetReplenishmentBatchInventory();
                    }
                    else {
                        $state.go('app.2017072710071521');
                    }
                    $cordovaToast.show(data.message, 'short', 'bottom');
                }, function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                }).finally(function (res) {
                    $scope.replenishlocmodal.hide();
                })
        }

        $scope.SetItem = function (item) {
            StockReplenishmentSrv.itemToReplenish = item;
            $scope.item = StockReplenishmentSrv.itemToReplenish;
            $scope.suggestedQty = $scope.item.MaximumReplenishment - $scope.item.PickingQty;
        }



        $scope.goBack = function () {
            LoadingService.GoBack();
        }

        $scope.init();
    }])
