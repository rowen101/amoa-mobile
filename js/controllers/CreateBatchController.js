app.controller('CreateBatchCtrl', ['$scope','$ionicPopup', 'LoginService', 'LoadingService', 'CreateBatchSrv', '$cordovaBarcodeScanner', '$cordovaToast', 'StorageService','ionicDatePicker','$ionicModal','$rootScope', 
function($scope,$ionicPopup, LoginService, LoadingService, CreateBatchSrv, $cordovaBarcodeScanner, $cordovaToast, StorageService,ionicDatePicker,$ionicModal,$rootScope) {



   
  
   

    $scope.init = function() {
        $scope.rrnumb = CreateBatchSrv.selectedRRNumber;
        $scope.vqtylist = [];
        $scope.ViewQtyList();
        $scope.GetItemCodeList();
        $scope.batch = {};
        // console.log(CreateBatchSrv.selectedRRNumber
        $scope.dateToday = new Date();
        $scope.qty = 0;
        $scope.incrementingqty = 0;
        $scope.totalqty = 0;

        console.log($scope.ValidateViewQTY());
        console.log($scope.ValidateViewQTYLogTracking());
     

        

        // $scope.GetSearchList();
    }

    $scope.ScanBatchLabelDisa = function() {
        if($scope.ScanBL()){
            return true;
        }else{
            if($scope.batch.iscasepick != ''){
                return false;
            }else{
                return true;
            }
        }
    }


    $scope.ScanBL = function(){
        if($rootScope.scanparent.length ===0){
    return false;
        }else{
           
              var ans = _.findWhere($rootScope.scanparent, { stage: "637497600656320011" });        
              if (ans) {
                return true;
              } else {
                return false;
              }  
        }
    }

    $scope.ScanQ = function(){
        if($rootScope.scanparent.length ===0){
    return false;
        }else{
           
              var ans = _.findWhere($rootScope.scanparent, { stage: "637497601662223829" });        
              if (ans) {
                return true;
              } else {
                return false;
              }  
        }
    }

    $scope.ScanLN = function(){
        if($rootScope.scanparent.length ===0){
    return false;
        }else{
           
              var ans = _.findWhere($rootScope.scanparent, { stage: "637556630667845703" });        
              if (ans) {
                return true;
              } else {
                return false;
              }  
        }
    }



    $scope.ValidateViewQTY = function(){
        if($rootScope.validationparent.length ===0){
    return false;
        }else{
           
              var ans = _.findWhere($rootScope.validationparent, { stage: "637479430165818427" });        
              if (ans) {
                return true;
              } else {
                return false;
              }  
        }
    }

    $scope.ValidateViewQTYLogTracking = function(){
        if($rootScope.validationparent.length ===0){
    return false;
        }else{
           
              var ans = _.findWhere($rootScope.validationparent, { stage: "637479430648371070" });        
              if (ans) {
                return true;
              } else {
                return false;
              }  
        }
    }






     var ipObj1 = {
      callback: function (val) {  //Mandatory
      $scope.batch.mfgdate = moment(val).format('MM/DD/YYYY');

if($scope.batch.ismonthly == 1){
    $scope.batch.expdate = moment(val).add($scope.batch.sl,'Months').format('MM/DD/YYYY');

   
    var date1 = new Date(moment(val).add($scope.batch.sl,'Months').format('MM/DD/YYYY')); 
    var date2 = new Date(moment($scope.dateToday));
    var date3 = new Date(moment($scope.batch.mfgdate));
    var Difference_In_Time = Math.abs(date2.getTime() - date1.getTime()); 
    var Difference_In_Time2 = Math.abs(date3.getTime() - date1.getTime()); 
var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
var Difference_In_Days2 = Math.ceil(Difference_In_Time2 / (1000 * 3600 * 24));
 
$scope.batch.numberofdaysexpiration = Difference_In_Days + (Difference_In_Days == 1  ?" Day till Expiration":" Days till Expiration" );


 var freshness = (Difference_In_Days/Difference_In_Days2)*100;
 $scope.batch.freshnessdata =  freshness.toFixed(2);

 console.log("date1: "+date1+ "|| date2: "+date2);
if(date1 <= date2){
    $scope.batch.freshness = "Freshness -"+ freshness.toFixed(2)+"%";
}else{
    $scope.batch.freshness = "Freshness "+ freshness.toFixed(2)+"%";
}



}else{
   
   
$scope.batch.expdate = moment(val).add($scope.batch.sl,'Days').format('MM/DD/YYYY');
var date1 = new Date(moment(val).add($scope.batch.sl,'Days').format('MM/DD/YYYY')); 
var date2 = new Date(moment($scope.dateToday)); 
var Difference_In_Time = Math.abs(date2.getTime() - date1.getTime()); 
var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

$scope.batch.numberofdaysexpiration = Difference_In_Days + (Difference_In_Days == 1  ?" Day till Expiration":" Days till Expiration" );


var freshness = (Difference_In_Days/$scope.batch.sl)*100;
$scope.batch.freshnessdata =  freshness.toFixed(2);;
console.log("date1: "+date1+ "|| date2: "+date2);
if(date1 <= date2){
    $scope.batch.freshness = "Freshness -"+ freshness.toFixed(2)+"%";
}else{
    $scope.batch.freshness = "Freshness "+ freshness.toFixed(2)+"%";
}




}

      


   
      },

      titleLabel: 'Select MFG Date',
      dateFormat: 'MM/dd/yyyy',
     to: new Date(moment($scope.dateToday)),
      mondayFirst: true,         //Optional
      disableWeekdays: [],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup',      //Optional
      selectMode: 'day'           //Optional
    };

     var ipObj2 = {


      

      callback: function (val) {  //Mandatory
    
        $scope.batch.expdate=moment(val).format('MM/DD/YYYY');
        
        if($scope.batch.ismonthly == 1){
            $scope.batch.mfgdate = moment(val).subtract($scope.batch.sl,'Months').format('MM/DD/YYYY');

            var date1 = new Date(moment(val).format('MM/DD/YYYY')); 
            var date2 = new Date(moment($scope.dateToday));
            var date3 = new Date(moment($scope.batch.mfgdate));
            var Difference_In_Time = Math.abs(date2.getTime() - date1.getTime()); 
            var Difference_In_Time2 = Math.abs(date3.getTime() - date1.getTime()); 
var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
var Difference_In_Days2 = Math.ceil(Difference_In_Time2 / (1000 * 3600 * 24));
            
$scope.batch.numberofdaysexpiration = Difference_In_Days + (Difference_In_Days == 1  ?" Day till Expiration":" Days till Expiration" );



var freshness = (Difference_In_Days/Difference_In_Days2)*100;
$scope.batch.freshnessdata =  freshness.toFixed(2);;


console.log("date1: "+date1+ "|| date2: "+date2);
if(date1 <= date2){
    $scope.batch.freshness = "Freshness -"+ freshness.toFixed(2)+"%";
}else{
    $scope.batch.freshness = "Freshness "+ freshness.toFixed(2)+"%";
}


        }else{
          
           
        $scope.batch.mfgdate = moment(val).subtract($scope.batch.sl,'Days').format('MM/DD/YYYY');

        var date1 = new Date(moment(val).format('MM/DD/YYYY')); 
        var date2 = new Date(moment($scope.dateToday)); 
        var Difference_In_Time = Math.abs(date2.getTime() - date1.getTime()); 
        var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
        var freshness = (Difference_In_Days/$scope.batch.sl)*100;
        $scope.batch.freshnessdata =  freshness.toFixed(2);;

        $scope.batch.numberofdaysexpiration = Difference_In_Days + (Difference_In_Days == 1  ?" Day till Expiration":" Days till Expiration" );


        console.log("date1: "+date1+ "|| date2: "+date2);
if(date1 <= date2){
    $scope.batch.freshness = "Freshness -"+ freshness.toFixed(2)+"%";
}else{
    $scope.batch.freshness = "Freshness "+ freshness.toFixed(2)+"%";
}

    }
    
        

},
      inputDate: new Date(moment($scope.dateToday).add(1,'Days')),
      titleLabel: 'Select Expiry Date',
      dateFormat: 'MM/dd/yyyy', 
      from: new Date(moment($scope.dateToday).add(1,'Days')),
      mondayFirst: true,          //Optional
      disableWeekdays: [],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup',      //Optional
      selectMode: 'day'           //Optional


      
    };

    $scope.openDatePicker1 = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
    $scope.openDatePicker2 = function(){
      ionicDatePicker.openDatePicker(ipObj2);
    };
    // $scope.GetSearchList = function() {
    //     var localsrv = StorageService.getServer();
    //     console.log("initialize server" + $scope.initializeServer);
    //     console.log("localsrv " + localsrv);
    //     if ($scope.initializeServer != localsrv || $scope.searchList.length == 0) {
    //         var localList = StorageService.getSearchlist();
    //         if (localList != undefined) {
    //             if (localList.length != 0) {
    //                 $scope.initializeServer = StorageService.getServer();
    //                 $scope.searchList = _.filter(localList, function(item) {
    //                     if (item.search == LoginService.userProfile.storageIdentity || item.search == LoginService.userProfile.warehouseCode) {
    //                         return true
    //                     }
    //                 });

    //                 $scope.GetItemCodeList();
    //             }
    //         }
    //     }
    // }

    $scope.GetItemCodeList = function() {
        LoadingService.StartLoading();
        $scope.searchList = StorageService.getSearchlist();
        $scope.itemCodeList = _.where($scope.searchList, { type: 'item' });
        LoadingService.StopLoading();
    }

    $scope.SelectSearch = function(param) {

        if (param !== undefined) {
            $scope.batch.itemcode = param;
            $scope.GetItemInfo(param);
        }
    }



    $scope.GetItemInfo = function(param) {
        $scope.ClearBatch();
        LoadingService.StartLoading();
        $scope.selectedParam = param;
        
        CreateBatchSrv.GetItemInfo(param)
            .then(function(res) {
                $scope.totalqty = 0;
                $scope.qty = 0;
                $scope.incrementingqty = 0;
                $scope.batch.description = CreateBatchSrv.ItemInfo.ItemDescription;
                $scope.batch.sl = CreateBatchSrv.ItemInfo.ShelfLife;
                $scope.batch.perbatch = CreateBatchSrv.ItemInfo.PerPallet;
                $scope.batch.uom = CreateBatchSrv.ItemInfo.StorageUOM;
                $scope.batch.itemcode = CreateBatchSrv.ItemInfo.ItemCode;
                $scope.batch.lotdefinition = CreateBatchSrv.ItemInfo.LotDefinition; 
                $scope.batch.lotformat = CreateBatchSrv.ItemInfo.LotFormat;
                $scope.batch.lotfor = CreateBatchSrv.ItemInfo.LotFor;
                $scope.batch.ismonthly = CreateBatchSrv.ItemInfo.IsMonthly;
                $scope.batch.lotno = "";
                $scope.batch.mfgdate = "";
                $scope.batch.expdate = "";
                $scope.batch.batchno = "X";
                $scope.batch.palqty = "";
                $scope.batch.pallet = "";
                $scope.batch.full = "";
                $scope.batch.loose = "";
                $scope.batch.looseqty = "";
                $scope.batch.nobatchcreate = "";
                $scope.batch.totalqty = 0;
                $scope.freshness = "";
                $scope.batch.iscasepick = (CreateBatchSrv.ItemInfo.IscasePick == 1? "Case Pick":"");
                $scope.batch.ismonthlytext = (CreateBatchSrv.ItemInfo.IsMonthly == 1? "Per Month":"Per Day");
                

                LoadingService.StopLoading();
            }, function(err) {
                LoadingService.StopLoading();
                LoadingService.PopAlert("Cannot get item info", err.data);
            })
    }

    String.prototype.count=function(c) { 
        var result = 0, i = 0;
        for(i;i<this.length;i++)if(this[i]==c)result++;
        return result;
      };

  
    $scope.GetPalletQty = function(batch){
  
           
                
           
                
                

                if(batch.palqty == ''){
                  
                }else{
                    


                    if(batch.palqty > batch.origpalqty ){

                        
                        $scope.batch.palqty = batch.origpalqty;
                        $scope.batch.pallet = batch.pallet;
                        $scope.batch.full = batch.full;
                        $scope.batch.loose = batch.loose;
                        $scope.batch.looseqty = batch.looseqty;
                       $scope.batch.nobatchcreate = batch.nobatchcreate;




                    }else{

if(batch.totalqty != 0){
    if(batch.palqty != batch.origpalqty && batch.full != 0){
                      
        $scope.batch.palqty = batch.origpalqty;
        $scope.batch.pallet = batch.pallet;
        $scope.batch.full = batch.full;
        $scope.batch.loose = batch.loose;
        $scope.batch.looseqty = batch.looseqty;
       $scope.batch.nobatchcreate = batch.nobatchcreate;
    }
}

                        batch.pallet = null;
                        batch.full = null;
                        batch.loose = null;
                        batch.looseqty = null;
    
    
                        if($scope.qty == 0){
                            console.log("$scope.qty == 0: true");
                            console.log("$scope.qty:"+$scope.qty);
                            
                            if(batch.perbatch  > batch.palqty){
                                
                                console.log("batch.perbatch:"+batch.perbatch);
                                console.log("batch.palqty:"+batch.palqty);
                                $scope.batch.pallet = 1;
                                 $scope.batch.full = 0;
                                 $scope.batch.loose = 1;
                                 $scope.batch.looseqty = batch.palqty;
                               
                               //  batch.palqty = batch.palqty -(batch.perbatch * batch.nobatchcreate);
                                 
                                 
                                 
                     
                             }else{
                                
                                     var getpallet =  batch.palqty%batch.perbatch;
                                     var getpalleted =  batch.palqty-getpallet;
                                     var pallettrimed = getpalleted/batch.perbatch;
                     
                                     
                                    
                                     
                         
                                     if(batch.palqty % batch.perbatch != 0){
                                        console.log("batch.perbatch:"+batch.perbatch);
                                        console.log("batch.palqty:"+batch.palqty);
                                      
                                      $scope.batch.pallet = Number(pallettrimed) + 1;
                                      $scope.batch.full = Number(pallettrimed);
                                      $scope.batch.loose = 1;
                                      $scope.batch.looseqty = batch.palqty - (batch.perbatch * Number(pallettrimed)) ;
                                         
                                     
                                     
                                      }else{
                                  
                                      $scope.batch.pallet = pallettrimed;
                                      $scope.batch.full = pallettrimed;
                                      $scope.batch.loose = 0;
                                      $scope.batch.looseqty = 0;
                                         
                                     
                                     }
                             
                                 
                                 
                                 }
    
                                 
                        }else{
                            console.log("$scope.qty:"+$scope.qty);
                            if(batch.perbatch  > batch.palqty){
                                console.log("batch.perbatch:"+batch.perbatch);
                                console.log("batch.palqty:"+batch.palqty);
                                
                                $scope.batch.pallet = 1;
                                $scope.batch.full = 0;
                                $scope.batch.loose = 1;
                                $scope.batch.looseqty = batch.palqty;
                                 
                                 
                     
                             }else{
                             
                                     var getpallet =  batch.palqty%batch.perbatch;
                                     var getpalleted =  batch.palqty-getpallet;
                                     var pallettrimed = getpalleted/batch.perbatch;
                     
                                     
                                     
                                     
                         
                                     if(batch.palqty % batch.perbatch != 0){
                                        console.log("batch.perbatch:"+batch.perbatch);
                                        console.log("batch.palqty:"+batch.palqty);
                                        
                                     
                                      $scope.batch.pallet = Number(pallettrimed) + 1;
                                      $scope.batch.full = Number(pallettrimed);
                                      $scope.batch.loose = 1;
                                      $scope.batch.looseqty = batch.palqty - (batch.perbatch * Number(pallettrimed)) ;
                                         
                                     
                                      }else{
                                     
                                      $scope.batch.pallet = pallettrimed;
                                      $scope.batch.full = pallettrimed;
                                      $scope.batch.loose = 0;
                                      $scope.batch.looseqty = 0;
                                         
                                     }
                             
                                 
                                 
                                 }
    
    
                           
                                 
    
    
                        }

                        
                    }


                   
                    

        

        }

       

     /*   var getpallet =  batch.palqty%batch.perbatch;
        var getpalleted =  batch.palqty-getpallet;
        var pallettrimed = getpalleted/batch.perbatch;
        $scope.firstfull == 0
    
        if(getpallet == 0){
         
            $scope.batch.pallet = pallettrimed;
            $scope.batch.full = pallettrimed;
            $scope.batch.loose = 0;
            $scope.batch.looseqty = 0;
            if($scope.firstfull == 0){
                $scope.firstfull = $scope.batch.full;
                $scope.firstloosequantity = $scope.batch.looseqty;
                $scope.firstperbatch = $scope.batch.perbatch;
                $scope.totalqty = ($scope.firstfull * $scope.firstperbatch) + $scope.firstloosequantity;
            }else{

            }
        
        }else{
            
            $scope.batch.pallet = pallettrimed+1;
            $scope.batch.full = pallettrimed;
            $scope.batch.loose = 1;
            $scope.batch.looseqty = getpallet;

            if($scope.firstfull == 0){
                $scope.firstfull = $scope.batch.full;
                $scope.firstloosequantity = $scope.batch.looseqty;
                $scope.firstperbatch = $scope.batch.perbatch;
                $scope.totalqty = ($scope.firstfull * $scope.firstperbatch) + $scope.firstloosequantity;
            }else{
                
            }

        }*/


        
    }






    $scope.GetPalletQtys = function(batch){
  
           
                
           
                
                

        if(batch.palqty == ''){
          
        }else{
            


            if(batch.palqty > batch.origpalqty ){

                
                $scope.batch.palqty = batch.origpalqty;
                $scope.batch.pallet = batch.pallet;
                $scope.batch.full = batch.full;
                $scope.batch.loose = batch.loose;
                $scope.batch.looseqty = batch.looseqty;
               $scope.batch.nobatchcreate = batch.nobatchcreate;




            }else{

if(batch.totalqty != 0){
if(batch.palqty != batch.origpalqty && batch.full != 0){
              
$scope.batch.palqty = batch.origpalqty;
$scope.batch.pallet = batch.pallet;
$scope.batch.full = batch.full;
$scope.batch.loose = batch.loose;
$scope.batch.looseqty = batch.looseqty;
$scope.batch.nobatchcreate = batch.nobatchcreate;
}
}

                batch.pallet = null;
                batch.full = null;
                batch.loose = null;
                batch.looseqty = null;


                if($scope.qty == 0){
                    console.log("$scope.qty == 0: true");
                    console.log("$scope.qty:"+$scope.qty);
                    console.log(batch.perbatch);
                    console.log(batch.palqty);
                    if(batch.perbatch  > batch.palqty){
                        
                        console.log("batch.perbatch:"+batch.perbatch);
                        console.log("batch.palqty:"+batch.palqty);
                        $scope.batch.pallet = 1;
                         $scope.batch.full = 0;
                         $scope.batch.loose = 1;
                         $scope.batch.looseqty = batch.palqty;
                         $scope.batch.nobatchcreate = 1;
                       //  batch.palqty = batch.palqty -(batch.perbatch * batch.nobatchcreate);
                         
                         
                         
             
                     }else{
                        
                             var getpallet =  batch.palqty%batch.perbatch;
                             var getpalleted =  batch.palqty-getpallet;
                             var pallettrimed = getpalleted/batch.perbatch;
             
                             
                             console.log(pallettrimed);
                             
                 
                             if(batch.palqty % batch.perbatch != 0){
                                console.log("batch.perbatch:"+batch.perbatch);
                                console.log("batch.palqty:"+batch.palqty);
                              
                              $scope.batch.pallet = Number(pallettrimed) + 1;
                              $scope.batch.full = Number(pallettrimed);
                              $scope.batch.loose = 1;
                              $scope.batch.looseqty = batch.palqty - (batch.perbatch * Number(pallettrimed)) ;
                              $scope.batch.nobatchcreate =  Number(pallettrimed) + 1;
                             
                             
                              }else{
                          
                              $scope.batch.pallet = pallettrimed;
                              $scope.batch.full = pallettrimed;
                              $scope.batch.loose = 0;
                              $scope.batch.looseqty = 0;
                                 
                              $scope.batch.nobatchcreate =  pallettrimed;
                             
                             }
                     
                         
                         
                         }

                         
                }else{
                    console.log("$scope.qty:"+$scope.qty);
                    if(batch.perbatch  > batch.palqty){
                        console.log("batch.perbatch:"+batch.perbatch);
                        console.log("batch.palqty:"+batch.palqty);
                        
                        $scope.batch.pallet = 1;
                        $scope.batch.full = 0;
                        $scope.batch.loose = 1;
                        $scope.batch.looseqty = batch.palqty;
                        $scope.batch.nobatchcreate = 1;
                         
             
                     }else{
                     
                             var getpallet =  batch.palqty%batch.perbatch;
                             var getpalleted =  batch.palqty-getpallet;
                             var pallettrimed = getpalleted/batch.perbatch;
             
                             
                             
                             
                 
                             if(batch.palqty % batch.perbatch != 0){
                                console.log("batch.perbatch:"+batch.perbatch);
                                console.log("batch.palqty:"+batch.palqty);
                                
                             
                              $scope.batch.pallet = Number(pallettrimed) + 1;
                              $scope.batch.full = Number(pallettrimed);
                              $scope.batch.loose = 1;
                              $scope.batch.looseqty = batch.palqty - (batch.perbatch * Number(pallettrimed)) ;
                              $scope.batch.nobatchcreate = Number(pallettrimed) + 1;
                             
                              }else{
                             
                              $scope.batch.pallet = pallettrimed;
                              $scope.batch.full = pallettrimed;
                              $scope.batch.loose = 0;
                              $scope.batch.looseqty = 0;
                              $scope.batch.nobatchcreate = pallettrimed;
                             }
                     
                         
                         
                         }


                   
                         


                }

                
            }


 
}




}


   


    $scope.GetMfgExpiry = function() {
        LoadingService.StartLoading();
        CreateBatchSrv.GetMfgExpiry($scope.batch.lotno, $scope.batch.itemcode)
            .then(function(res) {

                var d1 = new Date();
                var d2 = new Date(CreateBatchSrv.MfgExpiry.MfgDate);
                var same = (d1 > d2);
                var same2 = (d1 == d2);
                
                if(same || same2){
                    $scope.batch.mfgdate =moment(new Date(CreateBatchSrv.MfgExpiry.MfgDate)).format('MM/DD/YYYY') ;
                    $scope.batch.expdate =moment(new Date(CreateBatchSrv.MfgExpiry.ExpDate)).format('MM/DD/YYYY') ;



                    var date1 = new Date(moment($scope.batch.expdate)); 
                    var date2 = new Date(moment($scope.dateToday));
                    var date3 = new Date(moment($scope.batch.mfgdate));
                    var Difference_In_Time = Math.abs(date2.getTime() - date1.getTime()); 
                    var Difference_In_Time2 = Math.abs(date3.getTime() - date1.getTime()); 
                var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
                var Difference_In_Days2 = Math.ceil(Difference_In_Time2 / (1000 * 3600 * 24));
                 
                
                
                
                 $scope.batch.numberofdaysexpiration = Difference_In_Days + (Difference_In_Days == 1  ?" Day till Expiration":" Days till Expiration" );

                 var freshness = (Difference_In_Days/Difference_In_Days2)*100;
                 $scope.batch.freshnessdata =  freshness.toFixed(2);;
                
                
            
               
                 if(date1 <= date2){
                     $scope.batch.freshness = "Freshness -"+ freshness.toFixed(2)+"%";
                 }else{
                     $scope.batch.freshness = "Freshness "+ freshness.toFixed(2)+"%";
                 }

                 LoadingService.StopLoading();
                }else{
                    LoadingService.StopLoading();
                    LoadingService.PopAlert("Cannot get mfg and expiry Date");
                $scope.batch.lotno = "";
                $scope.batch.mfgdate = "";
                $scope.batch.expdate = "";
                $scope.freshness = "";

                }
                   
                
               
                
               
            }, function(err) {
                LoadingService.StopLoading();
                LoadingService.PopAlert("Cannot get mfg and expiry Date", err.data);
                $scope.batch.lotno = "";
                $scope.batch.mfgdate = "";
                $scope.batch.expdate = "";
                $scope.freshness = "";
               
            })
    }

    $scope.ScanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(data) {
            if (!data.cancelled) {
                $scope.batch.itemcode = data.text;
                $scope.GetItemInfo(data.text);
            }
        }, function(err) {
            LoadingService.PopAlert("Cannot scan barcode", err.data);
        })
    }

    

    $scope.ScanBatchLabel = function() {
        $cordovaBarcodeScanner.scan().then(function(data) {
            if (!data.cancelled) {
              
              $scope.batch.batchno = data.text;
                
            }
        }, function(err) {
            LoadingService.PopAlert("Cannot scan barcode", err.data);
        })
    
    }

    $scope.ScanLotNo = function() {
        $cordovaBarcodeScanner.scan().then(function(data) {
            if (!data.cancelled) {
              
              $scope.batch.lotno = data.text;
                $scope.GetMfgExpiry($scope.batch);
            }
        }, function(err) {
            LoadingService.PopAlert("Cannot scan barcode", err.data);
        })
    
    }


    

    String.prototype.isNumber = function(){
        return /^\d+$/.test(this);
    }


    $scope.ScanQty = function() {
        $cordovaBarcodeScanner.scan().then(function(data) {
            if (!data.cancelled) {
                var reg = /^[0-9]+$/;
              if(reg.test(data.text)){
                $scope.batch.palqty = parseInt(data.text,10);
                $scope.GetPalletQtys($scope.batch);
              }else{
                LoadingService.PopAlert("Numeric is Only Allowed");
              }
                
                
            }
        }, function(err) {
            LoadingService.PopAlert("Cannot scan barcode", err.data);
        })
    }


    $scope.ViewQty = function() {
        
    }


/*$scope.palqtyVisual = function(){

    

if($scope.batch.palqty == undefined){
    
   
    return true;
}else{
    if($scope.batch.palqty == ""){
        return true;
    }else{
        if($scope.batch.loose == $scope.batch.pallet){
         
              
                return false;
                
            }else{
                
                return true;
                
                
            }
    }
   
}

}*/



$scope.resetData = function(batch){
    
    $scope.batch.totalqty = batch.totalqty;
    $scope.batch.looseqty = batch.looseqty;
    $scope.batch.full = batch.full;
    $scope.batch.loose = batch.loose;
    $scope.batch.palqty = batch.palqty;
    $scope.batch.pallet = batch.pallet;
    $scope.batch.nobatchcreate = batch.nobatchcreate;
    $scope.batch.origpalqty = batch.origpalqty;
}

    $scope.CreateNewBatch = function(batch) {
        
        console.log("batch:"+batch);
        $scope.CopyBatch();
if($scope.batch.freshnessdata > 74){
    
    $scope.GetPalletQty(batch);
    LoadingService.StartLoading();
    $scope.batch.rrnumber = CreateBatchSrv.selectedRRNumber;
    $scope.batch.labeldate = $scope.dateToday;
    $scope.batch.crea_by = LoginService.userProfile.emailAlias;
    $scope.batch.warehousecode = LoginService.userProfile.warehouseCode;  
    if($scope.batch.totalqty == 0){
        $scope.batch.totalqty = $scope.batch.palqty;
    }else{
        $scope.batch.totalqty = $scope.batch.totalqty;
    }
    

    CreateBatchSrv.CreateNewBatch($scope.batch) // pass last batch because the last batch is technically the latest batch at this point
    .then(function(res) {
        console.log("SAVE:",$scope.batch);
        console.log("RES DATA:",res.data);
        console.log("RES itemtobeback:",res.data.itemtobeback);
        console.log("RES datashow:",res.data.data);
        
        

        if(res.data.itemtobeback.response == 'Successfully created new batch'){
            
            LoadingService.StopLoading();
            $scope.ClearBatch();
            $cordovaToast.show(res.data.response, 'short', 'bottom');
        }else{
            $scope.resetData(res.data.itemtobeback);
            LoadingService.StopLoading();
           
        }
       
       
       
        
    }, function(err) {
        LoadingService.StopLoading();
        LoadingService.PopAlert("System Message", err.data);
    })

}else{

    var confirmPopup = $ionicPopup.confirm({
        title: 'Freshnes is below 75%?',
        subTitle: 'Are you sure to create this batch for only: '+$scope.batch.freshnessdata+'% Freshness'
      });
      confirmPopup.then(function(res) {
    if(res){
        $scope.GetPalletQty(batch);
        LoadingService.StartLoading();
        $scope.batch.rrnumber = CreateBatchSrv.selectedRRNumber;
        $scope.batch.labeldate = $scope.dateToday;
        $scope.batch.crea_by = LoginService.userProfile.emailAlias;
        $scope.batch.warehousecode = LoginService.userProfile.warehouseCode;  
        if($scope.batch.totalqty == 0){
            $scope.batch.totalqty = $scope.batch.palqty;
        }else{
            $scope.batch.totalqty = $scope.batch.totalqty;
        }
        
        
        CreateBatchSrv.CreateNewBatch($scope.batch) // pass last batch because the last batch is technically the latest batch at this point
        .then(function(res) {
            console.log("SAVE:",$scope.batch);
            console.log("RES DATA:",res.data);
            console.log("RES itemtobeback:",res.data.itemtobeback);
            console.log("RES datashow:",res.data.data);
            
           

            if(res.data.itemtobeback.response == 'Successfully created new batch'){
                
                LoadingService.StopLoading();
                $scope.ClearBatch();
                $cordovaToast.show(res.data.response, 'short', 'bottom');
            }else{
                $scope.resetData(res.data.itemtobeback);
                LoadingService.StopLoading();
               
            }
           
           
           
            
        }, function(err) {
            LoadingService.StopLoading();
            LoadingService.PopAlert("1st done", err.data);
        })

    }else{



    }
        

        
    });



}

        

       // $scope.incrementingqty = batch.palqty + $scope.incrementingqty;
   
      /* if($scope.qty == 0){
        console.log("$scope.qty == 0:true");
        console.log($scope.batch);
       if(batch.loose == 1 && batch.pallet == batch.nobatchcreate){
        console.log($scope.batch);
        CreateBatchSrv.CreateNewBatch($scope.batch) // pass last batch because the last batch is technically the latest batch at this point
            .then(function(res) {
              
                $cordovaToast.show(res.data, 'short', 'bottom');
               
            }, function(err) {
                
                LoadingService.PopAlert("1st done", err.data);
            })

          //  $scope.GetPalletQty($scope.batch);
            $scope.ClearBatch();

        }else{
            
            if($scope.incrementingqty > $scope.totalqty){
                console.log("$scope.incrementingqty > $scope.totalqty:true");
                console.log("$scope.qty == 0:false");
                console.log($scope.batch);

                $scope.incrementingqty =  $scope.incrementingqty - batch.palqty ;
                console.log("Toast incrementingqty: "+$scope.incrementingqty);
                $cordovaToast.show("QUANTITY MIGHT EXCEEDED", 'short', 'bottom');
                batch.totalqty = $scope.totalqty;
            }else{
                
                console.log("$scope.incrementingqty > $scope.totalqty:false");
                console.log("$scope.qty == 0:false");
                console.log($scope.batch);
                
                $scope.qty = batch.palqty;
                $scope.totalqty = batch.palqty;
                $scope.incrementingqty = batch.nobatchcreate * batch.perbatch;
                batch.totalqty = $scope.totalqty;
                //$scope.GetPalletQty(batch);
                console.log("qty: "+$scope.qty);
                console.log("totalqty: "+$scope.totalqty);
                console.log("incrementingqty: "+$scope.incrementingqty);
                //$scope.GetPalletQty(batch);
                console.log($scope.batch);
                CreateBatchSrv.CreateNewBatch($scope.batch) // pass last batch because the last batch is technically the latest batch at this point
                .then(function(res) {
                  
                    $cordovaToast.show(res.data, 'short', 'bottom');
                    
                   
                  
                }, function(err) {
                    
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
              
               batch.palqty = $scope.totalqty - $scope.incrementingqty;
               $scope.GetPalletQty(batch);
                if(batch.palqty == 0 ){
                    $scope.ClearBatch();
                }else{

                }


            }
        }
       
           }else{

            $scope.qty = batch.palqty;
            $scope.incrementingqty = $scope.incrementingqty + batch.palqty;
            console.log("qty: "+$scope.qty);
            console.log("incrementingqty: "+$scope.incrementingqty);
            console.log("totalqty: "+$scope.totalqty);
            batch.totalqty = $scope.totalqty;

            if($scope.incrementingqty == $scope.totalqty){
                console.log($scope.batch);
                CreateBatchSrv.CreateNewBatch($scope.batch) // pass last batch because the last batch is technically the latest batch at this point
            .then(function(res) {
              
                $cordovaToast.show(res.data, 'short', 'bottom');
               
            }, function(err) {
                
                LoadingService.PopAlert("Something went wrong", err.data);
            })
          //  $scope.GetPalletQty(batch);
          if(batch.palqty == 0 ){
            $scope.ClearBatch();
        }else{

        }
            }else if($scope.incrementingqty > $scope.totalqty){
                $scope.incrementingqty =  $scope.incrementingqty - batch.palqty ;
                console.log("Toast incrementingqty: "+$scope.incrementingqty);
                $cordovaToast.show("QUANTITY MIGHT EXCEEDED", 'short', 'bottom');
            }else{
               console.log($scope.batch);
                CreateBatchSrv.CreateNewBatch($scope.batch) // pass last batch because the last batch is technically the latest batch at this point
            .then(function(res) {
              
                $cordovaToast.show(res.data, 'short', 'bottom');
               
                
            }, function(err) {
                
                LoadingService.PopAlert("Done", err.data);
            })
           
           batch.palqty = $scope.totalqty - $scope.incrementingqty;
           batch.totalqty = $scope.totalqty;
               $scope.GetPalletQty(batch);
               if(batch.palqty == 0 ){
                $scope.ClearBatch();
            }else{

            }
            }


           } */
       
       


        
       
    }

    $scope.ClearBatch = function() {
        $scope.batch = {};
        $scope.qty = 0;
        $scope.incrementingqty = 0;
        $scope.totalqty = 0;
   
    }

    $scope.CopyBatch = function() {
        
        $scope.lastBatch = $scope.batch;
        
    }

  

    $scope.CopyLastBatch = function() {
        $scope.totalqty = 0;
                $scope.qty = 0;
                $scope.incrementingqty = 0;
        $scope.batch.palqty = "";
                $scope.batch.pallet = "";
                $scope.batch.full = "";
                $scope.batch.loose = "";
                $scope.batch.looseqty = "";
                $scope.batch.nobatchcreate = "";
                $scope.batch.totalqty = 0;
                $scope.freshness = "";
                $scope.batch.batchno = "X";
        $scope.batch = $scope.lastBatch;
        

    }

    $scope.goBack = function() {
        LoadingService.GoBack();
    }



    $scope.HideModal = function(){
    
        $scope.ordrqty.hide();
      }
  
      $scope.OpenModal = function(){
        
       
        $scope.ordrqty.show();
      }


      $ionicModal.fromTemplateUrl('templates/ordrqty.html', {
        id: 'ordrqty',
        scope: $scope
    }).then(function (modal) {
        $scope.ordrqty = modal;
    });

$scope.ViewQtyList = function(){
LoadingService.StartLoading();

CreateBatchSrv.ViewQtyList($scope.rrnumb)
    .then(function(res) {
        console.log(res.data);
        $scope.vqtylist = res.data;
        LoadingService.StopLoading();
    }, function(err) {
        LoadingService.PopAlert("Cannot get data", err.data);
        LoadingService.StopLoading();
       
    })
}

    $scope.init();
}
])