//PickList Controller
app.controller('RRViewCtrl', ['$scope', 'RRViewSrv', '$state', 'LoadingService', 'LoginService','CreateBatchSrv', '$cordovaBarcodeScanner',
function ($scope, RRViewSrv, $state,LoadingService, LoginService, CreateBatchSrv, $cordovaBarcodeScanner) {
    


  var tk = 10;
  var page = 0;


    $scope.init = function () {
        // LoadingService.StartLoading();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.searchParam = '';
        $scope.rrList = [];
        $scope.GetRRList('');
       
    }

    $scope.GetRRList = function(param){
        LoadingService.StartLoading();
     RRViewSrv.GetRRList(param,tk,page)
     .then(function(res){
      $scope.searchParam = '';
      $scope.rrList = [];

        $scope.rrList = RRViewSrv.rrList;
        console.log($scope.rrList);

        
       
        
     },function(err){
        LoadingService.PopAlert("Cannot get RR List","Error Message: "+err.data+" Status: "+ err.statusText);
     })
     .finally(function(res){
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

$scope.ScanBarcode = function(){
    $cordovaBarcodeScanner.scan().then(function(data){
      if(!data.cancelled)
      {
        $scope.searchParam = data.text;
        $scope.GetRRList(data.text,tk,page);
      } 
    },function(err){
        LoadingService.PopAlert("Cannot scan barcode", err.data);
    })
  }


    $scope.redirectMe = function (rrnum) {
        CreateBatchSrv.SetRRNumber(rrnum);
        $state.go('app.createbatch');
    }

  

     $scope.goBack = function(){
      LoadingService.GoBack();
    }

    $scope.init();
}]);
