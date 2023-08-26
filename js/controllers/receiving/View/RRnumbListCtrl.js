//Receiving Controller
app.controller('ViewRcvRRnumbListCtrl', ['$scope', 'LoginService', '$ionicModal' ,'LoadingService', 'ReceiveSrv', '$cordovaBarcodeScanner','$timeout','$state', 
function($scope, LoginService,$ionicModal, LoadingService, ReceiveSrv, $cordovaBarcodeScanner,$timeout, $state) {





    $scope.init = function () {
        
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.rrlist = [];
        $scope.rrItemList = [];
        $scope.searchParam = '';
        $scope.rrpicked = '';
        $scope.getViewRRNumb();
        
        


    }

    $scope.getViewRRNumb = function(){
    LoadingService.StartLoading(); 
      ReceiveSrv.getViewRRNumb()
        .then(function (res) {
          $scope.rrlist = res.data;
          console.log(res.data);
          LoadingService.StopLoading(); 
        }, function (err) {
          console.log(err);
          $scope.moreDataCanBeLoaded = false;
          LoadingService.PopAlert("Something went wrong","Error Message: "+err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
          $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
          LoadingService.StopLoading(); 
        })   
    }

    /*$scope.redirect = function(crea){
      ReceiveSrv.checker = crea;
      $state.go('app.checkerbatch');
           
    }*/
    
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


    $ionicModal.fromTemplateUrl('templates/itemshow.html', {
      id: 'itemshow',
      scope: $scope
  }).then(function (modal) {
      $scope.itemshow = modal;
  });



   $scope.getRR = function(rr){
     
      var rrp = _.findWhere($scope.rrlist, { RRNUMB: rr }).Items;
      $scope.rrpicked = rr;
      console.log(rrp);
      $scope.rrItemList = rrp;
      $scope.itemshow.show();

    }

    $scope.HideModal = function(){
      $scope.rrpicked = '';
      $scope.rrItemList = [];
      $scope.itemshow.hide();

    }
  

    $scope.init();
}]);
