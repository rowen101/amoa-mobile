//PickList Controller
app.controller('RCycleCountCtrl', ['$scope', 'RCycleountSrv', '$state', 'LoadingService', 'LoginService', 'RCycleCountLocSrv','$cordovaBarcodeScanner','$ionicModal','$timeout','$ionicPopup','$cordovaToast',
function ($scope, RCycleountSrv, $state,LoadingService, LoginService, RCycleCountLocSrv,$cordovaBarcodeScanner,$ionicModal,$timeout,$ionicPopup,$cordovaToast) {
    
 
  $scope.goBack = function () {
    LoadingService.GoBack();
}




$scope.itemMaster = {};
$scope.itemCodeList = [];

$scope.randomnumber = 10;





$scope.init = function () {

      
        $scope.userid = LoginService.userProfile.emailAlias;
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.emplId = LoginService.userProfile.emplId;
        $scope.GetItemCodeListCount();
        $scope.takedata();

        
    

        
}

/*$scope.CheckGeneratedCycleCount() = function(){

}*/







$scope.GetLocationCodeList = function (randomnumber) {
  LoadingService.StartLoading(); 
    RCycleountSrv.GetRCCList(randomnumber)
        .then(function (res) {
          $scope.itemCodeList = RCycleountSrv.itemListObj;
       
        }, function (err) {
          console.log(err);
          $scope.moreDataCanBeLoaded = false;
          LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
          $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
          
      }).finally(function () {
          LoadingService.StopLoading(); 
          
      })

   
}

$scope.GetLocationCodeListPulled = function (randomnumber) {
   

  if(randomnumber == null || randomnumber == '' || randomnumber == 0 || randomnumber > $scope.itemCount){
    $scope.$broadcast('scroll.refreshComplete');
    LoadingService.PopAlert("Something went wrong", "Invalid Digit");
    }else{
      RCycleountSrv.GetRCCList(randomnumber)
      .then(function (res) {
        $scope.itemCodeList = RCycleountSrv.itemListObj;
     
      }, function (err) {
        console.log(err);
        $scope.moreDataCanBeLoaded = false;
        LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
        $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
        
    }).finally(function () {
       
        $scope.$broadcast('scroll.refreshComplete');
    })
    }


   

   
}


$scope.GetItemCodeListCount = function () {

  LoadingService.StartLoading();
  RCycleountSrv.GetRCCCount()
      .then(function (res) {
      
      

if(RCycleountSrv.itemMaster.response){
  $scope.redirectMe(RCycleountSrv.itemMaster.CCID);
  
}else{
  $scope.itemCount = RCycleountSrv.itemMaster.total;
  if($scope.itemCount > 10){
    $scope.randomnumber = $scope.itemCount;
    $scope.GetLocationCodeList($scope.randomnumber);
  }else{
    $scope.GetLocationCodeList($scope.randomnumber);
  }
}       
      }, function (err) {
          console.log(err);
          $scope.moreDataCanBeLoaded = false;
          LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
          $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
          LoadingService.StopLoading(); 
      })

}

$scope.takedata = function (randomnumber) {
  console.log('count: ',$scope.itemCount);
  console.log('rn: ',randomnumber);
if(randomnumber == null || randomnumber == '' || randomnumber == 0 || randomnumber > $scope.itemCount){
return false;
}else{
  return true;
}
};


$scope.saveLocationCodeList = function(itemCodeList){
  LoadingService.StartLoading();

  

  RCycleountSrv.PostHeaderRCC(itemCodeList,itemCodeList.length)
      .then(function (res) {
          console.log(res);
         // $cordovaToast.show(res.data.reponse, "short", "bottom"); 
          $scope.redirectMe(res.data.CCID);
          
      }, function (err) {
          console.log(err);
          $scope.moreDataCanBeLoaded = false;
          LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
          $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
      }).finally(function () {
          LoadingService.StopLoading(); 
      })
  
};

$scope.checkCodelist = function(){
  if( $scope.itemCodeList.length == 0 ){
    return false;
  }else{
    return true;
  }
 
}


$scope.loadMore = function (rn) {
  $scope.ResetItemList();
  $scope.GetLocationCodeList(rn);
};

$scope.loadpullMore = function (rn) {
  $scope.ResetItemList();
  $scope.GetLocationCodeListPulled(rn);
};

$scope.setItemMaster = function (LocationCode) {
    $scope.itemMaster = _.findWhere($scope.itemCodeList, { LocationCode: LocationCode });
    
}



$scope.ScanBarcode = function () {//for updating bar code
    $cordovaBarcodeScanner.scan().then(function (data) {
        if (!data.cancelled) {
            $scope.itemMaster.NewCode = data.text;
            $scope.setItemMaster(data.text);
            $scope.barcodesetupmodal.show();

        }
    }, function (err) {
        LoadingService.PopAlert("Something went wrong", err.data.message);
    })
}



$scope.ResetItemList = function () {
    $scope.itemCodeList = [];
}

$scope.redirect = function () {
    $state.go('app.iteminventory', { itemcode: $scope.itemMaster.ItemCode });
    $scope.barcodesetupmodal.hide();
}


$ionicModal.fromTemplateUrl('templates/barcodesetupmodal.html', {
    id: 'barcodesetupmodal',
    scope: $scope
}).then(function (modal) {
    $scope.barcodesetupmodal = modal;
});


$scope.redirectMe = function (ccid) {
  RCycleCountLocSrv.SetCCID(ccid);
  $state.go('app.rcyclecountloc');
}
  

     

    $scope.init();
}]);
