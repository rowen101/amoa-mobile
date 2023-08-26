//Receiving Controller
app.controller('ViewRcvItemBatchListCtrl', ['$scope', 'LoginService', '$ionicModal' ,'LoadingService', 'ReceiveSrv', '$cordovaBarcodeScanner','$timeout', '$cordovaToast', 'StorageService','ionicDatePicker', 
function($scope, LoginService,$ionicModal, LoadingService, ReceiveSrv, $cordovaBarcodeScanner,$timeout, $cordovaToast, StorageService,ionicDatePicker) {





    $scope.init = function () {
        
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.batchlist = [];
        $scope.batchpick = {};
        $scope.itm = ReceiveSrv.itm;
        $scope.title = "Received "+ $scope.itm;
        $scope.searchParam = '';
        $scope.getViewperItem($scope.itm);
        
        
        


    }

    $scope.getViewperItem = function(itm){
    LoadingService.StartLoading(); 
      ReceiveSrv.getViewperItem(itm)
        .then(function (res) {
          $scope.batchlist = res.data;
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

    $scope.Date = function(date){
      var dateOut = new Date(date);
          return dateOut;
      
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
    
    
    $ionicModal.fromTemplateUrl('templates/batchshow.html', {
      id: 'batchshow',
      scope: $scope
  }).then(function (modal) {
      $scope.batchshow = modal;
  });

    $scope.getbatch = function(batch){
      console.log(batch);
       $scope.batchpick = batch;
       $scope.batchshow.show();
 
     }
 
     $scope.HideModal = function(){
       $scope.batchpick = {};
       $scope.batchshow.hide();
 
     }
  

    $scope.init();
}]);
