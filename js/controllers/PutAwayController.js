app.controller("PutAwayController", [
  "$scope",
  "LoginService",
  "$rootScope",
  "$state",
  "$ionicHistory",
  "StockTransferSrv",
  "$ionicModal",
  "LoadingService",
  "$cordovaToast",
  "$cordovaBarcodeScanner",
  "StorageService",
  "$timeout",
  function(
    $scope,
    LoginService,
    $rootScope,
    $state,
    $ionicHistory,
    StockTransferSrv,
    $ionicModal,
    LoadingService,
    $cordovaToast,
    $cordovaBarcodeScanner,
    StorageService,
    $timeout
  ) {
    $scope.searchList = [];
    $scope.batchInventoryList = [];
    $scope.item = {};
    $scope.location = {};
    $scope.count = {};
    $scope.showLocationMessage = false;
    $scope.init = function() {
      //  $scope.GetBatchInventoryList(LoginService.userProfile.warehouseCode+'RCV');
    };

    $scope.$on("$ionicView.enter", function(event, data) {
      // handle event
      $scope.GetLocList();
      console.log(StorageService.getSearchlist());
    });

    $scope.GetLocList = function() {
      $scope.searchList = StorageService.getSearchlist();
      $scope.locList = _.where($scope.searchList, { type: "loc" });
    };

    // $scope.SelectSearch = function(param){
    //     $scope.searchParam = param;
    //     $scope.GetBatchInventoryList(param);
    // }

    $scope.SelectNewLoc = function(param) {
      $scope.location.setLocation = param;
      $scope.CheckIfLocationExist($scope.location.setLocation);
    };

    $scope.CheckIfLocationExist = function(locCode) {
      $scope.location.newLocation = locCode;
      $scope.locToTras = locCode;
      $scope.locationExist = _.findWhere($scope.locList, { value: locCode })
        ? true
        : false; //has location
      console.log(_.findWhere($scope.locList, { value: locCode }));
      $scope.showLocationMessage = _.findWhere($scope.locList, {
        value: locCode
      })
        ? false
        : true; //has no location
    };

    $scope.GetBatchInventoryList = function(param) {
      $scope.selectedParam = param;
      LoadingService.StartLoading();
      StockTransferSrv.GetPutAwayList(param)
        .then(
          function(res) {
            $scope.batchInventoryList = StockTransferSrv.putAwayList;
            console.log($scope.batchInventoryList);
            $scope.CountToTransfer();
          },
          function(err) {
            //error modal
            LoadingService.PopAlert(
              "Something went wrong",
              "Cannot get the batch list"
            );
          }
        )
        .finally(function() {
          LoadingService.StopLoading();
        });
    };

    $scope.GetItemInfo = function(batchno) {
      $scope.item = _.findWhere($scope.batchInventoryList, {
        BatchNo: batchno
      });
    };

    $scope.CountToTransfer = function() {
      $scope.selectedCount = _.where($scope.batchInventoryList, {
        isSelected: true
      }).length;
    };

    $scope.CountPartialTransfer = function() {
      $scope.partialCount = _.where($scope.batchInventoryList, {
        isPartialTransfer: true
      }).length;
    };

    $ionicModal
      .fromTemplateUrl("templates/stocktransfermodal.html", {
        id: "stocktrasfermodal",
        scope: $scope
      })
      .then(function(modal) {
        $scope.stocktrasfermodal = modal;
      });

    $ionicModal
      .fromTemplateUrl("templates/stocktransferinfomodal.html", {
        id: "stocktransferinfomodal",
        scope: $scope
      })
      .then(function(modal) {
        $scope.stocktransferinfomodal = modal;
      });

    $ionicModal
      .fromTemplateUrl("templates/partialtransfermodal.html", {
        id: "partialtransfermodal",
        scope: $scope
      })
      .then(function(modal) {
        $scope.partialtransfermodal = modal;
      });

    $scope.TransferItems = function() {
      var selectedItem = _.where($scope.batchInventoryList, {
        isSelected: true
      });
      var checker = _.where(selectedItem, { LocationCode: $scope.locToTras })
        .length; //check if any of the item has same location as the location to transfer
      if (checker == 0) {
        console.log($scope.locToTras);
        StockTransferSrv.StocksTransfer(selectedItem, $scope.locToTras).then(
          function(res) {
            $scope.newLocation = "";
            $scope.locToTras = "";
            $scope.clearLocation();
            $scope.stocktrasfermodal.hide();
            $scope.GetBatchInventoryList(
              LoginService.userProfile.warehouseCode + "RCV"
            );
            $cordovaToast.show(res.data, "short", "bottom");
          },
          function(err) {
            LoadingService.PopAlert("Something went wrong", err.data);
          }
        );
      } else {
        LoadingService.PopAlert(
          "Warning",
          "You cannot transfer an item to the same location"
        );
      }
    };

    $scope.PartialTransfer = function() {
      var partialItem = _.where($scope.batchInventoryList, {
        isPartialTransfer: true
      });
      console.log(partialItem[0].LocationCode);
      if (partialItem[0].LocationCode != $scope.locToTras) {
        StockTransferSrv.StocksTransfer(partialItem, $scope.locToTras).then(
          function(res) {
            $scope.newLocation = "";
            $scope.locToTras = "";
            $scope.clearLocation();
            $scope.partialtransfermodal.hide();
            $scope.stocktransferinfomodal.hide();
            $scope.GetBatchInventoryList(
              LoginService.userProfile.warehouseCode + "RCV"
            );
            $cordovaToast.show(res.data, "short", "bottom");
          },
          function(err) {
            LoadingService.PopAlert("Something went wrong", err.data);
          }
        );
      } else {
        LoadingService.PopAlert(
          "Warning",
          "You cannot transfer an item to the same location"
        );
      }
    };

    $scope.goBack = function() {
      LoadingService.GoBack();
    };

    $scope.ScanBarcode = function() {
      $cordovaBarcodeScanner.scan().then(
        function(data) {
          if (!data.cancelled) {
            $scope.searchParam = data.text;
            $scope.CountToTransfer();
          }
        },
        function(err) {
          LoadingService.PopAlert("Something went wrong", err.data);
        }
      );
    };

    $scope.ScanLocationBarcode = function() {
      $cordovaBarcodeScanner.scan().then(
        function(data) {
          if (!data.cancelled) {
            $scope.newLocation = data.text.toUpperCase();
            $scope.CheckIfLocationExist(data.text.toUpperCase());
          }
        },
        function(err) {
          LoadingService.PopAlert("Cannot get location code", err.data);
        }
      );
    };

    $scope.ScanNewLocationBarcode = function() {
      $cordovaBarcodeScanner.scan().then(
        function(data) {
          if (!data.cancelled) {
            $scope.location.newLocation = data.text.toUpperCase();
            $scope.CheckIfLocationExist(data.text.toUpperCase());
          }
        },
        function(err) {
          LoadingService.PopAlert("Cannot get location code", err.data);
        }
      );
    };

    $scope.clearLocation = function() {
      $scope.location = {};
      $scope.location.newLocation = "";
    };

    $scope.toggleSelected = function(itm) {
      $scope.GetItemInfo(itm);
      console.log($scope.item);
      if ($scope.item.ActiveFlag != 1) {
        $scope.item.isSelected = $scope.item.isSelected == true ? false : true;
      }
      $scope.CountToTransfer();
    };

    $scope.init();
  }
]);
