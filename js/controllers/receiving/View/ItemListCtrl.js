//Receiving Controller
app.controller('ViewRcvItemListCtrl', ['$scope', 'LoginService', '$ionicModal' ,'LoadingService', 'ReceiveSrv', '$cordovaBarcodeScanner','$timeout', '$state', 
function($scope, LoginService,$ionicModal, LoadingService, ReceiveSrv, $cordovaBarcodeScanner,$timeout,$state) {





    $scope.init = function () {
        
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.itemlist = [];
        $scope.searchParam = '';
        $scope.getViewItem();
        
        


    }

    $scope.getViewItem = function(){
    LoadingService.StartLoading(); 
      ReceiveSrv.getViewItem()
        .then(function (res) {
          $scope.itemlist = res.data;
          console.log(res.data);
          LoadingService.StopLoading(); 
        }, function (err) {
          console.log(err);
          $scope.moreDataCanBeLoaded = false;
          LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
          $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
          LoadingService.StopLoading(); 
        })   
    }

    
    $scope.redirect = function(itm){
      ReceiveSrv.itm = itm;
      $state.go('app.itembatch');
           
    }

    $scope.ScanBarcode = function(){
      $cordovaBarcodeScanner.scan().then(function(data){
        if(!data.cancelled)
        {
          $scope.searchParam = data.text;
          
        } 
      },function(err){
          LoadingService.PopAlert("Cannot scan barcode", err.data);
      })
    }

    $scope.init();
}]);
