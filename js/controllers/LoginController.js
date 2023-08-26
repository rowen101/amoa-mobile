app.controller("LoginCtrl", [
  "$scope",
  "LoginService",
  "$ionicSideMenuDelegate",
  "$rootScope",
  "$cordovaToast",
  "LoadingService",
  "$ionicHistory",
  "$state",
  "StorageService",
  "$ionicModal",
  function(
    $scope,
    LoginService,
    $ionicSideMenuDelegate,
    $rootScope,
    $cordovaToast,
    LoadingService,
    $ionicHistory,
    $state,
    StorageService,
    $ionicModal
  ) {
    $ionicModal
      .fromTemplateUrl("templates/apilinkmodal.html", {
        id: "apilinkmodal",
        scope: $scope,
        backdropClickToClose: false
      })
      .then(function(modal) {
        $scope.apilinkmodal = modal;
      });
      $scope.test = false;
    $scope.init = function() {
      $scope.loginData = {};
      $scope.warehouseList = [];
      $scope.loginData.username = "";
      $scope.loginData.password = "";
      $scope.test = false;
      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $scope.disableLogin = true;
    };

    $scope.$on("$ionicView.enter", function() {
      $ionicHistory.clearHistory();

      if (StorageService.getServerUrl()) {
        $rootScope.setServer(StorageService.getServerUrl());
        $scope.SetUsername();
      } else {
        // $scope.openSetting();
      }

      $ionicSideMenuDelegate.canDragContent(false);
    });

    /*   $scope.$on("$ionicView.beforeEnter", function (event, data) {
   $ionicHistory.clearHistory()
   });
   */

$scope.Pass = function(){
  
  if($scope.test){
    $scope.test = false;
  }else{
    $scope.test = true;
  }
}



$scope.passtest = function(){
  
  if($scope.test){
    return  "icon ion-eye-disabled";
  }else{
    return  "icon ion-eye";
  }
}


    $scope.SetUsername = function() {
      $scope.loginData.username = StorageService.getUsername();
      if ($scope.loginData.username != "") {
        $scope.GetWarehouse();
        $scope.loginData.serverwarehouseId = StorageService.getServerWarehouseId();
      }
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      LoadingService.StartLoading();
      $scope.errorMessage = "";
      $scope.disableLogin = true;
      var info = _.findWhere($scope.warehouseList, {
        serverwarehouseId: $scope.loginData.serverwarehouseId
      });
      console.log(info);
      $scope.SaveUrl(info.api);
      LoginService.PutProfile(
        $scope.loginData.username,
        $scope.loginData.password,
        $scope.loginData.serverwarehouseId,
        info.warehousecode,
        info.description,
        info.servername,
        info.serverId,
        info.storageidentity
      )
        .then(
          function(res) {
            if (res.data.status == "FAILURE") {
              $scope.errorMessage = res.data.message;
              LoadingService.StopLoading();
            } else if (res.data.status == "SUCCESS") {
              $scope.userProfile = LoginService.userProfile;
              $scope.broadcastLogged();
              $state.go("app.home");
              LoadingService.StopLoading();
            }
          },
          function(err) {
            LoadingService.PopAlert(
              "make sure you have correct username and password"
            );
            LoadingService.StopLoading();
          }
        )
        .finally(function() {
          $scope.disableLogin = false;
          LoadingService.StopLoading();
        });
    };

    //HOY ADD MO DITO YUNG LOGIC NUNG SA LOSE FOCUS SEARCH WAREHOUSES
    $scope.GetWarehouse = function() {
     
      $scope.warehouseList = [];
      // LoadingService.StartLoading();
      LoginService.GetWarehouse($scope.loginData.username)
        .then(
          function(res) {
            LoadingService.StartLoading();
            $scope.userAccess = LoginService.userAccess;
            $scope.warehouseList = $scope.userAccess.list;
            console.log($scope.warehouseList);
            if ($scope.userAccess.success == true) {
              $scope.disableLogin = false;
              //Mas prioritize natin yung pag use ng toast para di haasle (*Note : Toast only works in mobile and emulators)
              $cordovaToast.show($scope.userAccess.message, "short", "bottom");
            } else {
              LoadingService.PopAlert($scope.userAccess.message);
            }
            LoadingService.StopLoading();
          },
          function(err) {
            //Error
            LoadingService.PopAlert(
              "Network Error",
              "Please make sure you are connected to the internet"
            );
          }
        )
        .finally(function(res) {
          LoadingService.StopLoading();
          $scope.$broadcast("scroll.refreshComplete");
        });
    };

    $scope.broadcastLogged = function() {
      $rootScope.$broadcast("isLoggedChecker", $scope.userProfile.isLogged);
    };

    // $scope.openSetting = function () {
    //     $scope.apilinkmodal.show();

    // }

    $scope.closeSetting = function() {
      if ($rootScope.server.length != 0) {
        $scope.apilinkmodal.hide();
      }
    };

    $scope.UrlChanged = function() {
      $rootScope.setValidServer(false);
    };

    $scope.TestServer = function(param) {
      LoginService.TestServer(param).then(
        function(res) {
          $rootScope.setValidServer(true);
          $cordovaToast.show("Url is a valid server", "short", "bottom");
        },
        function(err) {
          $rootScope.setValidServer(false);
          $cordovaToast.show("Not a valid server", "short", "bottom");
        }
      );
    };

    $scope.SaveUrl = function(urlLink) {
      StorageService.setServerUrl(urlLink);
      $rootScope.setServer(urlLink);
      // $scope.apilinkmodal.hide();
    };

    


    $scope.init();
  }
]);
