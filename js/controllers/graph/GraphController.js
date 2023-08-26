app.controller("GraphCtrl", [
  "$stateParams",
  "$scope",
  "LoginService",
  "LoadingService",
  "CreateBatchSrv",
  "$cordovaBarcodeScanner",
  "$cordovaToast",
  "StorageService",
  "ionicDatePicker",
  function(
    $stateParams,
    $scope,
    LoginService,
    LoadingService,
    CreateBatchSrv,
    $cordovaBarcodeScanner,
    $cordovaToast,
    StorageService,
    ionicDatePicker
  ) {
    
var transName=   $stateParams.transname;

    $scope.init = function() {
      $scope.getDashboardTrend();
      // $ionicSideMenuDelegate.canDragContent(true);
      //  LoadingService.PopAlert("Something went wrong", StorageService.getAllLoc().length );
    };

        $scope.getDashboardTrend = function() {
      $scope.dashValue = true;
      LoginService.getDashboardTrend(LoginService.userProfile.warehouseCode,transName).then(
        function() {
          $scope.DashBoardDataTrend = LoginService.DashBoardDataTrend;
        },
        function() {
          console.log("Something went wrong");
        }
      );
    };

    $scope.goBack = function() {
      LoadingService.GoBack();
    };
  }
]);
