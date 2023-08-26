//PickList Controller
app.controller('RCycleCountLocCtrl', ['$scope', 'RCycleCountLocSrv', '$state', 'LoadingService', 'LoginService', '$cordovaBarcodeScanner','$ionicModal','$timeout','$ionicPopup','$cordovaToast',"$cordovaCamera",
function ($scope, RCycleCountLocSrv, $state,LoadingService, LoginService, $cordovaBarcodeScanner,$ionicModal,$timeout,$ionicPopup,$cordovaToast,$cordovaCamera) {
    
 

    $scope.itemMaster = {};
    $scope.itemCodeList = [];
    $scope.itemSelected = {};
    $scope.LocationCodeList = [];
    $scope.ccid = '';
    
    

    $scope.init = function(){
       
        $scope.ccid = RCycleCountLocSrv.selectedCCID;
        $scope.GetLocationList(RCycleCountLocSrv.selectedCCID);
        console.log($scope.LocationCodeList.length);
    }


    $scope.loadpullMore = function(){
        $scope.LocationCodeList = [];
        $scope.itemCodeList = [];
        $scope.GetLocationList(RCycleCountLocSrv.selectedCCID);
    }

    $scope.resetItemMaster = function(){
        $scope.itemMaster.Location = '';
        $scope.itemMaster.start = '';
        $scope.itemMaster.end = '';
        $scope.itemMaster.seqid = '';
    }


    $scope.GetLocationList = function (ccid) {
        LoadingService.StartLoading(); 
        RCycleCountLocSrv.GetLocationCCID(ccid)
              .then(function (res) {
                $scope.LocationCodeList = RCycleCountLocSrv.LocListObj;
                
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
                LoadingService.StopLoading(); 
                
            })
      
    }

      


   
        
    $scope.testbgcolor = function(starttime,endtime) {
       
               
                if(starttime != null && endtime == null){
                    return '#32CD32';
                }else{
                    return '#FFFFFF';
                }
            
            }
          
                  
                  
     //   }


    $scope.showstart = function(start){
        if(start != null){
            return start;
        }else{
            return "Start Time";
        }
        
    }


    $scope.showbuttonstart = function(start){
        if(start != null){
            return true;
        }else{
            return false;
        }  
    }


    $scope.showend = function(end){
        if(end != null){
            return end;
        }else{
            return "end";
        }
    }


    $scope.showbuttonend = function(end){
        if(end != null){
            return true;
        }else{
            return false;
        }
        
    }


    $scope.showbuttonAdd = function(start,end){
        if(start != null && end == null){
            return true;
        }else{
            return false;
        }  
    }



    $scope.startcyclecount = function(){
        
        LoadingService.StartLoading(); 
        RCycleCountLocSrv.StartCycleCount($scope.itemMaster.seqid)
              .then(function (res) {
                $scope.LocationCodeList = [];
                $scope.itemMaster.start = RCycleCountLocSrv.LocListObj.start;
                $scope.LocationCodeList = RCycleCountLocSrv.LocListObj.list; 
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
                LoadingService.StopLoading(); 
                
            })

    }

    $scope.endcyclecount = function(){
        

        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure to Close?',
            subTitle: 'Ending Location : '+$scope.itemMaster.Location
          });
          confirmPopup.then(function(res) {
            if(res) {
               
                LoadingService.StartLoading(); 
        RCycleCountLocSrv.EndCycleCount($scope.itemMaster.seqid)
              .then(function (res) {
                


                $scope.LocationCodeList = [];
                $scope.itemMaster.end = RCycleCountLocSrv.LocListObj.end;
                $scope.LocationCodeList = RCycleCountLocSrv.LocListObj.list;
                $scope.itemsetupmodal.hide();

                if(res.data == "DATA POSTED"){     
               
              
               $state.go('app.637278022204291271');
               $cordovaToast.show("Cycle Count Posted Email Sent to Immidiate Head", 'short', 'bottom');
                }
                
                
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
                
                    LoadingService.StopLoading(); 
                
                
            })
                       
            } else {
                
            }
          });



        

    }


    $scope.showitems = function(){
        if($scope.itemCodeList.length != 0){
            return false;
        }else{
            return true;
        }
    }

    $scope.getItem = function(end){
        if(end != null){
            $scope.additemsetupmodal.show();
        }else{
            $scope.edititemsetupmodal.show();
        }
    }

    $scope.itemFree = function(itemcode){
        $scope.showdescription = true;
        LoadingService.StartLoading(); 
        RCycleCountLocSrv.GetItemDetailsCCID($scope.itemMaster.Location,$scope.ccid,itemcode)
              .then(function (res) {
                  if(res.data.message == "VALID ITEM CODE"){
                        console.log(res);
                        $scope.showdescription = false;
                        $scope.itemSelected.DESC = res.data.status;
                  }else if(res.data == "INVALID ITEM CODE"){
                            $scope.showdescription = true;
                            LoadingService.PopAlert(res.data);                
                            $scope.itemSelected.ITMCDE = '';
                           
                        }else{
                            $scope.showdescription = true;
                            $scope.itemSelected = {};
                            $scope.itemSelected = RCycleCountLocSrv.itemset;   
                            console.log($scope.itemSelected);
                            $scope.additemsetupmodal.hide();
                            $scope.edititemsetupmodal.show();
                             }
                  
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
                LoadingService.StopLoading(); 
                
            })

    }
   
    $scope.ScanBarcode = function() {
        
        $cordovaBarcodeScanner.scan().then(function(data) {
            if (!data.cancelled) {
                $scope.itemSelected.ITMCDE = data.text;
                $scope.itemFree(data.text);
            }
        }, function(err) {
            LoadingService.PopAlert("Cannot scan barcode", err.data);
        })
    }

    


   


    $scope.AddItem = function(){    
        LoadingService.StartLoading(); 
        RCycleCountLocSrv.PostItemCCID($scope.itemSelected,$scope.ccid,$scope.itemMaster.Location)
              .then(function (res) {
                $scope.itemCodeList = res.data;
                $scope.additemsetupmodal.hide();
                $cordovaToast.show("Item Added", 'short', 'bottom');
                $scope.itemSelected = {};
                $scope.itemSelected.photo = ''
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
                LoadingService.StopLoading(); 
                
            })
    }

    $scope.UpdateItem = function(){    

        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure to Update?',
            subTitle: 'Updating itemcode: '+$scope.itemSelected.ITMCDE
          });
          confirmPopup.then(function(res) {
            if(res) {
                LoadingService.StartLoading(); 
                RCycleCountLocSrv.PutItemCCID($scope.itemSelected,$scope.ccid,$scope.itemMaster.Location)
              .then(function (res) {
                $scope.itemCodeList = res.data;
                $cordovaToast.show("Item Updated", 'short', 'bottom');
                $scope.itemSelected.path = ''
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            }).finally(function () {
                LoadingService.StopLoading(); 
                
            })
                       
            } else {
                
            }
          });

        
    }

   

    $scope.RemoveItem = function(){    

        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure to Remove?',
            subTitle: 'Remove itemcode: '+$scope.itemSelected.ITMCDE+ '?'
          });
          confirmPopup.then(function(res) {
            if(res) {
                LoadingService.StartLoading(); 
                RCycleCountLocSrv.DeleteItemCCID($scope.itemSelected,$scope.ccid,$scope.itemMaster.Location)
                      .then(function (res) {
                        $scope.itemSelected = {};
                        $scope.itemCodeList = res.data;
                        $scope.edititemsetupmodal.hide();
                        $cordovaToast.show("Item Removed", 'short', 'bottom');
                      }, function (err) {
                        console.log(err);
                        $scope.moreDataCanBeLoaded = false;
                        LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                        $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                        
                    }).finally(function () {
                        LoadingService.StopLoading(); 
                        
                    })           
            } else {
                
            }
          });




        
    }

    $scope.getItemList = function(LOCCDE,start,end,seqid){
        
        LoadingService.StartLoading(); 
        RCycleCountLocSrv.GetItemCCID(LOCCDE,$scope.ccid)
              .then(function (res) {
                $scope.itemMaster.Location = LOCCDE;
                $scope.itemMaster.start = start;
                $scope.itemMaster.end = end;
                $scope.itemMaster.seqid = seqid;
                $scope.itemCodeList = RCycleCountLocSrv.itemListObj;
                
                if($scope.itemMaster.start == null){
                    $scope.startcyclecount();
                }else{
                    LoadingService.StopLoading(); 
                }
                
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            })

    }



    $scope.postccid = function(ccid){
        


        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure to Post the cycle count without finishing?',
            subTitle: 'Posting Cycle Count: '+ccid
          });
          confirmPopup.then(function(res) {
            if(res) {
               
                LoadingService.StartLoading(); 
                RCycleCountLocSrv.isPostedCCID(ccid)
                      .then(function (res) { 
                          
                        
                        $state.go('app.637278022204291271');
                        $cordovaToast.show("Cycle Count Posted Email Sent to Immidiate Head", 'short', 'bottom');
                      }, function (err) {
                        console.log(err);
                        $scope.moreDataCanBeLoaded = false;
                        LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                        $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                         
                    }).finally(function () {
                        LoadingService.StopLoading(); 
                        
                    })
                       
            } else {
                
            }
          });


        

    }


    $scope.cancelccid = function(ccid){
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure to Cancel?',
            subTitle: 'Cancelling Cycle Count: '+ccid
          });
          confirmPopup.then(function(res) {
            if(res) {
               
                LoadingService.StartLoading(); 
                RCycleCountLocSrv.isCancelCCID(ccid)
                      .then(function (res) {
                        
                        
                        $state.go('app.637278022204291271');
                        $cordovaToast.show("Cycle Count Cancelled", 'short', 'bottom');
                      }, function (err) {
                        console.log(err);
                        $scope.moreDataCanBeLoaded = false;
                        LoadingService.PopAlert("Something went wrong", "" + err.data.ExceptionMessage + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                        $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                        
                    }).finally(function () {
                        LoadingService.StopLoading(); 
                        
                    })
                       
            } else {
                
            }
          });

       

    }

    $scope.defaultpic = function(){
        if($scope.itemSelected.path == null && ($scope.itemSelected.photo == null || $scope.itemSelected.photo == '' ))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    $scope.pathpic = function(){
        if($scope.itemSelected.path == null || $scope.itemSelected.path == '')
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    $scope.camerapic = function(){
        if(($scope.itemSelected.photo != '' || $scope.itemSelected.photo != null) && $scope.itemSelected.path == '')
        {
            return false;
        }
        else
        {
            return  true;
        }
    }
    



   

    $scope.OpenCamera = function() {
        var options ={
          quality: 100,
          targetWidth: 500,
          targetHeigth: 500,
          encodingType: Camera.EncodingType.JPEG,
          destinationType : Camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false,
      correctOrientation: false 
          
        };
        $cordovaCamera.getPicture(options)
        .then(function(data){
            $scope.itemSelected.photo = data;
            $scope.itemSelected.path = '';
            //$scope.itemSelected.PICPATH = 'data:image/jpeg;base64,'+data;
        },function(error){
          console.log('error: '+ error)
        });
      };



    $scope.ClearItemData = function () {
        $scope.itemSelected = {};
        $scope.showdescription = true;

    }


      $scope.goBack = function () {
        $scope.userProfile = LoginService.userProfile;
        //$scope.broadcastLogged();
        $state.go("app.home");
       // LoadingService.GoBack();
    }

    
  
    
    $ionicModal.fromTemplateUrl('templates/itemsetupmodal.html', {
        id: 'itemsetupmodal',
        scope: $scope
    }).then(function (modal) {
        $scope.itemsetupmodal = modal;
    });


    $ionicModal.fromTemplateUrl('templates/edititemsetupmodal.html', {
        id: 'edititemsetupmodal',
        scope: $scope
    }).then(function (modal) {
        $scope.edititemsetupmodal = modal;
    });


    $ionicModal.fromTemplateUrl('templates/additemsetupmodal.html', {
        id: 'additemsetupmodal',
        scope: $scope
    }).then(function (modal) {
        
        $scope.additemsetupmodal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/viewitemsetupmodal.html', {
        id: 'viewitemsetupmodal',
        scope: $scope
    }).then(function (modal) {
        $scope.viewitemsetupmodal = modal;
    });

     

    $scope.init();
}]);
