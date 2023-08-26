//Receiving Controller
app.controller('ReceivingController', ['$scope', 'ReceiveSrv', '$state', 'LoadingService','$ionicModal', 'LoginService', '$cordovaBarcodeScanner','$timeout','$ionicPopup', '$cordovaToast',
function ($scope, ReceiveSrv, $state,LoadingService, $ionicModal,LoginService, $cordovaBarcodeScanner, $timeout,$ionicPopup, $cordovaToast) {
    


  var tk = 20;
  var page = 1;


    $scope.init = function () {
        // LoadingService.StartLoading();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.itemMaster = {};
        $scope.topost = {};
        $scope.dcpy = [];
        $scope.itemCodeList = [];
        $scope.checkers = [];
        $scope.GetReceivingList();
       // $scope.GetOpenwrrhdr('');
        $scope.searchParam = '';
        $scope.response = '';
    }


    $scope.GetReceivingList = function () {
      LoadingService.StartLoading();
    ReceiveSrv.GetReceivingList()
          .then(function (res) {      
              $scope.itemCount = res.data.totalItem;
              $scope.itemCodeList = res.data.list;
              console.log(res.data);

          }, function (err) {
              console.log(err);
              $scope.moreDataCanBeLoaded = false;
              LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
              $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
          }).finally(function () {
              LoadingService.StopLoading();
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
          })
     
    }

    


    $scope.GetOpenwrrhdr = function (param) {
    
      var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
      LoadingService.StartLoading(); 
      if (!param) {
          param = '';
      }
      if ($scope.selectedParam != param) {
          $scope.setParam(param);
          pg = 1;
          page = 1;
          $scope.itemCodeList = [];
      }
  
  
      
  
      ReceiveSrv.GetWRRHDR(param, tk, pg)
          .then(function (res) {
            
              $scope.itemCount = ReceiveSrv.itemListObj.totalItem;

//if($scope.itemCount == 1){
 // $scope.redirectMe(param);
//}
//else{
  for (var i = 0; i < ReceiveSrv.itemListObj.list.length; i++) {
    $scope.itemCodeList.push(ReceiveSrv.itemListObj.list[i]);
}
$scope.moreDataCanBeLoaded = ReceiveSrv.itemListObj.canNext;
//}

          }, function (err) {
              console.log(err);
              page--
              $scope.moreDataCanBeLoaded = false;
              LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
              $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
          }).finally(function () {
              LoadingService.StopLoading();
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
          })
  }

  $scope.getdata = function(rr){
    $scope.topost = {};


    
          $scope.topost.RREMRK =  _.findWhere($scope.itemCodeList, { RRNUMB: rr }).RREMRK;
          $scope.topost.TRNDOC = _.findWhere($scope.itemCodeList, { RRNUMB: rr }).TRNDOC;
          $scope.topost.SRCREF = _.findWhere($scope.itemCodeList, { RRNUMB: rr }).SRCREF;
  }  

  $scope.setItemMaster = function (itemCode) {
    $scope.itemMaster = {};
    
    $scope.itemMaster = _.findWhere($scope.itemCodeList, { RRNUMB: itemCode });

    $scope.checkers = _.findWhere($scope.itemCodeList, { RRNUMB: itemCode }).USERNAME;
    
    console.log($scope.checkers);

    $scope.OpenModal();
    
    
    
  /*  ReceiveSrv.GetOpenwrrhdrDetails(itemCode)
        .then(function (res) {
          $scope.itemMaster = ReceiveSrv.itemMaster;
          
        }, function (err) {
          console.log(err);
          $scope.moreDataCanBeLoaded = false;
          LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
          $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
          
      }).finally(function () {
          LoadingService.StopLoading(); 
          console.log($scope.itemMaster);
          $scope.OpenModal();
          
      }) */

   
}



    $scope.setParam = function (param) {
      $scope.selectedParam = param;
  }

  

$scope.ScanBarcode = function(){
    $cordovaBarcodeScanner.scan().then(function(data){
      if(!data.cancelled)
      {
        $scope.searchParam = data.text;
        
        //$scope.GetWRRHDR(data.text,tk,page);
        $scope.redirectMe(data.text);
      } 
    },function(err){
        LoadingService.PopAlert("Cannot scan barcode", err.data);
    })
  }


    


    $scope.updateDisabled = function(){
    
      if($scope.itemMaster.RREMRK == $scope.topost.RREMRK && $scope.itemMaster.TRNDOC == $scope.topost.TRNDOC && $scope.itemMaster.SRCREF == $scope.topost.SRCREF){
        return true;
      }else if($scope.itemMaster.TRNDOC == "" || $scope.itemMaster.SRCREF == ""){
        return true;
      }else{
        return false;
      }
    }

    $scope.postDisabled = function(){
      if($scope.itemMaster.TRNDOC == "" || $scope.itemMaster.SRCREF == ""){
        return true;
      }else{
        return false;
      }
    }


    


    $scope.UpdateReceive = function(rr){



      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure to Update?',
        subTitle: 'Updating data from RR Number: '+rr
      });
      confirmPopup.then(function(res) {
        if(res) {
          LoadingService.StartLoading(); 
          $scope.pastrrnumb = rr;
          ReceiveSrv.postUpdateReceiving($scope.itemMaster)
            .then(function (res) {
              if(res.data == "Receiving Data Updated"){
               
               
                $cordovaToast.show(res.data, 'short', 'bottom');
                
             //   
              
              }else{
                $cordovaToast.show("Fail Update", 'short', 'bottom');
              }
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
              LoadingService.StopLoading(); 
              $scope.getdata(rr);
              $scope.setItemMaster(rr);
              $scope.OpenModal();
              
          })
                   
        } else {
        
        }
      });

      
    


    }






    $scope.PostCheckReceiving = function(rr){
      LoadingService.StartLoading();
     
      ReceiveSrv.PostCheckReceiving(rr)
          .then(function(res) {
if(res.data === "No Discrepancy"){
$scope.PostReceive(rr);
LoadingService.StopLoading();
}else{
  $scope.dcpy = res.data.dcpy;
  $scope.ordersum = res.data.ordersum;
  $scope.batchsum = res.data.batchsum;
  $scope.erroritemsmodal.show();
  LoadingService.StopLoading();
  
}


          
          }, function(err) {
              LoadingService.StopLoading();
              LoadingService.PopAlert("Cannot get data", "Error Message: "+err.data);
          })
  }




    $scope.PostReceive = function(rr){
   
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure to Post?',
        subTitle: 'Updating data from RR Number: '+rr
      });
      confirmPopup.then(function(res) {
        if(res) {
          LoadingService.StartLoading(); 
          $scope.pastrrnumb = '';
          ReceiveSrv.postPostingReceiving($scope.itemMaster)
            .then(function (res) {
              $scope.HideModal();
              $scope.erroritemsmodal.hide();
              LoadingService.StopLoading(); 
              $cordovaToast.show(res.data, 'short', 'bottom');
              $scope.init();
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            })
                   
        } else {
          
        }
      });

    }


    $scope.redirectMe = function (rrnum) {
      $scope.setItemMaster(rrnum);
        }

     $scope.goBack = function(){
      LoadingService.GoBack();
    }


    $scope.HideModal = function(){
    
      $scope.barcodesetupmodal.hide();
    }

    $scope.OpenModal = function(){
      
     
      $scope.barcodesetupmodal.show();
    }


    $scope.openpersonnel = function(){
      
     console.log("Open");
      $scope.showcheckers.show();
    }

    $scope.closepersonnel = function(){
      
     
      $scope.showcheckers.hide();
    }

    $scope.Refresh = function(){
      $scope.init();
    } 
    
    

    $ionicModal.fromTemplateUrl('templates/receivingmodal.html', {
      id: 'receivingmodal',
      scope: $scope
  }).then(function (modal) {
      $scope.barcodesetupmodal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/erroritemsmodal.html', {
    id: 'erroritemsmodal',
    scope: $scope
}).then(function (modal) {
    $scope.erroritemsmodal = modal;
});

$ionicModal.fromTemplateUrl('templates/showcheckers.html', {
  id: 'showcheckers',
  scope: $scope
}).then(function (modal) {
  $scope.showcheckers = modal;
});

    $scope.init();
}]);
