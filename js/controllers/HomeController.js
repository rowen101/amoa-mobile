app.controller("HomeCtrl", [
  "$scope",
  "$ionicModal",
  "LoginService",
  "$ionicSideMenuDelegate",
  "$rootScope",
  "$cordovaToast",
  "LoadingService",
  "$ionicHistory",
  "$state",
  "StorageService",
  function(
    $scope,
    $ionicModal,
    LoginService,
    $ionicSideMenuDelegate,
    $rootScope,
    $cordovaToast,
    LoadingService,
    $ionicHistory,
    $state,
    StorageService
  ) {
    
    $scope.colorArray = [
      "#00a8ff",
      "#9c88ff",
      "#fbc531",
      "#4cd137",
      "#487eb0",
      "#0097e6",
      "#e84118",
      "#8c7ae6",
      "#192a56",
      "#2f3640",
      "#00cec9",
      "#0984e3",
      "#e84393"
    ];


    // // Form data for the login modal
    $scope.init = function() {
      $scope.loginData = LoginService.userProfile;
      $scope.warehouseList = [];
      $scope.getLoginData();
      $scope.dateToday = new Date();
      $scope.warehouseList = LoginService.wcList;
      // $ionicSideMenuDelegate.canDragContent(true);
      //  LoadingService.PopAlert("Something went wrong", StorageService.getAllLoc().length );
    };

    $scope.getLoginData = function() {
      if (LoginService.userProfile.isLogged == true) {
        $scope.getDashboard();
      } else if (LoginService.userProfile.isLogged == false) {
        $scope.doLogout();
      }
    };

    $scope.broadcastLogged = function() {
      $rootScope.$broadcast(
        "isLoggedChecker",
        LoginService.userProfile.isLogged
      );
    };

    $scope.doLogout = function() {
      LoginService.LogOut();
      $scope.broadcastLogged();
      $ionicHistory.clearHistory();
      console.log($scope.loginData); //check if cleared loginData
      $state.go("app.login");
    };

    $scope.changeWarehouse = function() {
      LoginService.changeWarehouse($scope.loginData.warehouseId);
      console.log("warehouse chaged", $scope.loginData.warehouseId);
      $scope.getDashboard();
      $scope.closeModal();
    };

    $scope.getDashboard = function() {
      $scope.dashValue = true;
      LoginService.getDashboard(LoginService.userProfile.warehouseCode).then(
        function() {
          $scope.DashBoardData = LoginService.DashBoardData;
          $scope.dashChecker();
        },
        function() {
          console.log("Something went wrong");
        }
      );
    };

    //For ng-show of dashboard, if true = spinner and fasle for dashbaord
    $scope.dashChecker = function() {
      var val = _.isEmpty($scope.DashBoardData);
      $scope.dashValue = val;
      console.log("dash val" + $scope.dashValue);
    };

    $scope.resetSearchlist = function() {
      LoginService.ResetSearchList();
    };

    //modals
    $ionicModal
      .fromTemplateUrl("templates/selectWarehouseModal.html", {
        id: "selectWarehouseModal",
        scope: $scope,
        animation: "slide-in-up"
      })
      .then(function(modal) {
        $scope.selectWarehouseModal = modal;
      });

    $scope.openWarehouseModal = function() {
      try {
        $scope.selectWarehouseModal.show();
      } catch (err) {
        console.log(err.message);
      }
    };

    $scope.closeModal = function() {
      $scope.selectWarehouseModal.hide();
    };

    $scope.redirectMe = function(param, querystring = "") {
      if (param == "app.demograph") {
        $state.go("app.demograph"); //Demo graph
      }
    };

    $scope.init();
  }
]);
