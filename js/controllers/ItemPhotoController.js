

app.controller('ItemPhotoController', ['$scope', 'LoadingService', 'ItemPhotoSrv', '$rootScope', '$cordovaBarcodeScanner', '$ionicModal', 'LoginService', '$cordovaToast', '$state', '$timeout',"$cordovaCamera","$ionicPopup",
function ($scope, LoadingService, ItemPhotoSrv, $rootScope, $cordovaBarcodeScanner, $ionicModal, LoginService, $cordovaToast, $state, $timeout,$cordovaCamera,$ionicPopup) {

    $scope.goBack = function () {
        LoadingService.GoBack();
    }

    var tk = 20;
    var page = 0;

    $scope.itemMaster = {};

    $scope.itemCodeList = [];
   
    $scope.itemCheckList = [];
    $scope.moreDataCanBeLoaded = false;


    
  
    
    



    $scope.init = function () {
        $scope.GetItemCodeListCount();
        
        

    }

    $scope.GetItemCodeListCount = function () {



    LoadingService.StartLoading();

    ItemPhotoSrv.GetActiveItemMasterListCount(LoginService.userProfile.warehouseCode)
        .then(function (res) {
            $scope.itemCount = ItemPhotoSrv.itemMaster;
            
            $scope.redirectMe();
        }, function (err) {
            console.log(err);
            $scope.moreDataCanBeLoaded = false;
            LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
        }).finally(function () {
            LoadingService.StopLoading(); 
        })

}
        $scope.checkboxshow = function(){
            main: true
        }   
        
    
 

    $scope.redirectMe = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Get the Whole List of Item?',
            subTitle: 'Retrieve the '+$scope.itemCount+' whole item list'
          });
          confirmPopup.then(function(res) {
            if(res) {
                $scope.option = "getall";
                $scope.GetItemCodeList();
                       
            } else {
                $scope.option = "remainsearch";
            }
          });
        };
   



    $scope.resetCanBeLoaded = function (param) {
        if (param != $scope.selectedParam) {
            $scope.moreDataCanBeLoaded = true;
        }
    }

    $scope.setParam = function (param) {
        $scope.selectedParam = param;
    }


    $scope.GetItemCodeList = function (param, pg) {
        
        
        
        if((!param) && ($scope.option == "remainsearch")){
        
            var confirmPopup = $ionicPopup.confirm({
                title: 'Please Fill up the Search Bar',
            
              });
              confirmPopup.then(function(res) {
              });
            }
        else{

            LoadingService.StartLoading();

        var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
        if (!param) {
            param = '';
        }
        if ($scope.selectedParam != param) {
            $scope.setParam(param);
            pg = 1;
            page = 1;
            $scope.itemCodeList = [];
        }

        ItemPhotoSrv.GetActiveItemMasterList(param,LoginService.userProfile.warehouseCode, tk, pg)
            .then(function (res) {
                $scope.itemCount = ItemPhotoSrv.itemListObj.totalItem;
                for (var i = 0; i < ItemPhotoSrv.itemListObj.list.length; i++) {
                    $scope.itemCodeList.push(ItemPhotoSrv.itemListObj.list[i]);
                    
                }
                $scope.moreDataCanBeLoaded = ItemPhotoSrv.itemListObj.canNext;
            }, function (err) {
                console.log(err);
                page--
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
            }).finally(function () {
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            })
        }
    }

    $scope.loadMore = function (param) {
        console.log("apram is :" + param);
        page++;
        $scope.GetItemCodeList(param, page);
    };





    $scope.setItemMaster = function (itemCode,image) {
       
        $scope.itemMaster = _.findWhere($scope.itemCodeList, { ItemCode: itemCode });
   
        if($scope.checkboxshow.main){
           


            if(!$scope.itemCheckList.some(test => test.coded == itemCode)){
               
                $scope.itemCheckList.push({coded:itemCode,image});
       
            }else{

                for (var i = 0; i < $scope.itemCheckList.length; i++) {
            
                    if($scope.itemCheckList[i].coded == itemCode){
                      $scope.itemCheckList.splice(i,1);
                      break;
                    }else{
                        
                    }
                  
                  
                }          


            }
            
         
        }else{
            $scope.barcodesetupmodal.show();

           
            
        }
      
    }






$scope.itemSeeClickList = function(itemcode){
    
    if($scope.checkboxshow.main){
        return $scope.itemCheckList.some(test => test.coded == itemcode);
        
    }else{
        return $scope.itemCheckList.some(test => test.coded == "");
    }
   
  
    
      
}



$scope.testcolor = function(itemcode) {
if($scope.checkboxshow.main){
    if($scope.itemCheckList.some(test => test.coded == itemcode)){
        return 'white';
    }else{
        return 'black';
    }
}else{
    return 'black';
}

   
          
}

$scope.testbgcolor = function(itemcode) {
    if($scope.checkboxshow.main){
        if($scope.itemCheckList.some(test => test.coded == itemcode)){
            return '#32CD32';
        }else{
            return '#FFFFFF';
        }
    }else{
        return '#FFFFFF';
    }
  
          
          
}







    $scope.SearchBarcode = function () {//for searching
        $cordovaBarcodeScanner.scan().then(function (data) {
            if (!data.cancelled) {
                
                    $scope.searchParam = data.text;
                    $scope.GetItemCodeList($scope.searchParam, 1);
                
                
            }
        }, function (err) {
            LoadingService.PopAlert("Something went wrong", err.data.message);
        })
    }

   

   


 

$scope.checkImage = function(image){
   

return Boolean(!image);

}


$scope.checkMultipleImage = function(image){
 
if(image != null){
return true;
}else{
    return false;
}

}

$scope.checkDefaultImage = function(image){
  
    if(image ==  null){
    return true;
    }else{
        return false;
    }
   
    
    }



    $scope.ResetItemList = function () {
        $scope.itemCodeList = [];
        $scope.searchParam = '';
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


    $scope.redirect = function () {
        $state.go('app.iteminventory', { itemcode: $scope.itemMaster.ItemCode });
        $scope.selectedImagesetupmodal.hide();
    }


    $ionicModal.fromTemplateUrl('templates/selectedImagesetupmodal.html', {
        id: 'selectedImagesetupmodal',
        scope: $scope
    }).then(function (modal) {
        $scope.selectedImagesetupmodal = modal;
    });

    $scope.OpenCamera = function() {

 
      var options ={
        quality: 85,
        targetWidth: 100,
        encodingType: Camera.EncodingType.JPEG,
        destinationType : Camera.DestinationType.DATA_URL,
    targetHeigth: 100,
        saveToPhotoAlbum: false,
    correctOrientation: false 
        
      };
      $cordovaCamera.getPicture(options)
      .then(function(data){
          console.log('camera data: '+ angular.toJson(data))
          $scope.itemMaster.image = data;
          $scope.pictureUrl = 'data:image/jpeg;base64,'+data;
         // $scope.SavePhoto();
      },function(error){
        console.log('error: '+ error)
      });
    };

    $scope.MultipleImageUpdate = function () {
        
        
        if($scope.itemCheckList.length != 0){
            $scope.selectedImagesetupmodal.show();
        }else{
            console.log($scope.itemCheckList);
        }
      
    }




    $scope.ImageUpdate = function (itemCode,ItemImage) {
    
        LoadingService.StartLoading();
        ItemPhotoSrv.ImageUpdate(itemCode,
            ItemImage)
            .then(function (res) {
                LoginService.ResetSearchList();
                $scope.itemCodeList = [];
                $scope.itemCheckList = [];
                page = 1;
                $scope.GetItemCodeList('', page);
                $scope.barcodesetupmodal.hide();
                $cordovaToast.show(res.data, 'short', 'bottom');
            }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
                LoadingService.StopLoading(); 
                
            })
    }



    $scope.OpenMultipleCamera = function(coded,data) {

        
       
        var options ={
            quality: 100,
          targetWidth: 100,
          encodingType: Camera.EncodingType.JPEG,
          destinationType : Camera.DestinationType.DATA_URL,
      targetHeigth: 100,
          saveToPhotoAlbum: false,
      correctOrientation: false 
          
        };
        $cordovaCamera.getPicture(options)
        .then(function(data){
            console.log('camera data: '+ angular.toJson(data))
            
           var itemUpdated = {coded: coded, image: data};
        $scope.itemCheckList.find(item => item.coded == itemUpdated.coded).image = itemUpdated.image;
         //   $scope.itemMaster.MultiImage = data;
          //  $scope.pictureUrl = 'data:image/jpeg;base64,'+data;
    
        },function(error){
          console.log('error: '+ error)
        });
      };

$scope.ItemRemove = function(code){
    
    for (var i = 0; i < $scope.itemCheckList.length; i++) {
            
        if($scope.itemCheckList[i].coded == code){
          $scope.itemCheckList.splice(i,1);
          break;
        }else{
            
        }
      
      
    }     

    if($scope.itemCheckList.length == 0){
        $scope.selectedImagesetupmodal.hide();
    }else{

    }

};



    $scope.ImageallUpdate = function (image) {
       console.log($scope.itemCheckList);
        LoadingService.StartLoading();
        
        ItemPhotoSrv.ImageMultipleUpdate($scope.itemCheckList)
            .then(function (res) {
                LoginService.ResetSearchList();
                $scope.itemCodeList = [];
                $scope.itemCheckList = [];
                page = 1;
                $scope.GetItemCodeList('', page);
                $scope.selectedImagesetupmodal.hide();
                $cordovaToast.show(res.data, 'short', 'bottom');
            }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
                LoadingService.StopLoading(); 
                
            })
    }
  
$scope.CountToTransfer = function() {
    if($scope.item.isSelected = "true"){
        
    }else if ($scope.item.isSelected = "false"){
        $scope.itemCheckList.pull(ItemPhotoSrv.itemListObj.list[i].ItemCode);
    }else{
        console.log($scope.item.isSelected);
    }
    
   
  /*  $scope.selectedCount = _.where($scope.itemCheckList, {
        
      isSelected: true
    }).length;*/
  };

    $scope.init();

}]);


