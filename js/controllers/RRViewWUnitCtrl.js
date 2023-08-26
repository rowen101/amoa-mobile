//PickList Controller
app.controller('RRViewWithUnitCtrl', ['$scope', 'RRViewSrv', '$state', 'LoadingService', 'LoginService','CreateBatchSrv', '$cordovaBarcodeScanner',
function ($scope, RRViewSrv, $state,LoadingService, LoginService, CreateBatchSrv, $cordovaBarcodeScanner) {
    


  var tk = 10;
  var page = 0;


    $scope.init = function () {
        // LoadingService.StartLoading();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.searchParam = '';
        $scope.rrList = [];
        $scope.GetRRList('');
        $scope.Item = '';
       
    }

    $scope.GetRRList = function(param){
        LoadingService.StartLoading();
     RRViewSrv.GetRRListwUnit(param,tk,page)
     .then(function(res){
      $scope.searchParam = '';
      $scope.rrList = [];
      CreateBatchSrv.SetItem(RRViewSrv.rrList.itmcde);
      $scope.rrList = RRViewSrv.rrList.model;
      $scope.Item = RRViewSrv.rrList.itmcde;
     // console.log($scope.rrList);
      if(RRViewSrv.rrList.model.length === 1 && $scope.Item != ''){
        var rrnumber = $scope.rrList.find(m => m.RRNumber != " ").RRNumber
        
        CreateBatchSrv.SetRRNumber(rrnumber);
        $state.go('app.createbatchunit');

      }

        
    //    console.log(res.data);
        
     },function(err){
        LoadingService.PopAlert("Cannot get RR List", "Error Message: "+err.data+" Status: "+err.statusText);
     })
     .finally(function(res){
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

$scope.ScanBarcode = function(){
 // $scope.GetRRList("SUP368",tk,page);

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


   

    $scope.redirectMeunit = function (rrnum) {
      CreateBatchSrv.SetRRNumber(rrnum);
      $state.go('app.createbatchunit');
  }

     $scope.goBack = function(){
      LoadingService.GoBack();
    }

    $scope.init();
}]);
