app.controller('CreateBatchunitCtrl', ['$scope','$ionicPopup', 'LoginService', 'LoadingService', 'CreateBatchSrv', '$cordovaBarcodeScanner', '$cordovaToast', 'StorageService','ionicDatePicker', '$ionicModal','$rootScope',
function($scope,$ionicPopup, LoginService, LoadingService, CreateBatchSrv, $cordovaBarcodeScanner, $cordovaToast, StorageService,ionicDatePicker,$ionicModal,$rootScope) {


    
       
      
       
    
            $scope.init = function() {
            
            $scope.rrnumb = CreateBatchSrv.selectedRRNumber;
            $scope.batch = {};
            $scope.batch.batchqty = 0;
                $scope.batch.mfgdate = '';
                $scope.batch.iscasepick = '';
            if(CreateBatchSrv.itemcde == ''){
                $scope.vqtylist = [];
            if($scope.ValidateViewQTY()){
                $scope.ViewQtyList();
            }else{

            }
            }else{
                $scope.GetItemInfo(CreateBatchSrv.itemcde,$scope.rrnumb);
                $scope.vqtylist = [];
            if($scope.ValidateViewQTY()){
                $scope.ViewQtyList();
            }else{

            }
            }

            

            
            
            $scope.GetItemCodeList();
            
           
            // console.log(CreateBatchSrv.selectedRRNumber
            $scope.dateToday = new Date();
            $scope.qty = 0;
            $scope.incrementingqty = 0;
            $scope.totalqty = 0;

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
      
    
        $scope.GetItemCodeList = function() {
            LoadingService.StartLoading();
            $scope.searchList = StorageService.getSearchlist();
            $scope.itemCodeList = _.where($scope.searchList, { type: 'item' });
            LoadingService.StopLoading();
        }
    
        $scope.SelectSearch = function(param) {
            if (param !== undefined) {
                $scope.batch.itemcode = param;
                $scope.GetItemInfo(param,$scope.rrnumb);
            }
        }
    
    
    
        $scope.GetItemInfo = function(param,rrnumb) {
            
            $scope.ClearBatch();
            LoadingService.StartLoading();
            $scope.selectedParam = param;
            CreateBatchSrv.GetItemInfos(param,rrnumb)
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

                    $scope.batch.freshness = "";
                    $scope.batch.perunits = CreateBatchSrv.ItemInfo.perunits;
                    $scope.batch.ismonthlytext = (CreateBatchSrv.ItemInfo.IsMonthly == 1? "Per Month":"Per Day");
                    $scope.batch.iscasepick = (CreateBatchSrv.ItemInfo.IscasePick == 1? "Case Pick":"Break Case");
                    $scope.batch.per = CreateBatchSrv.ItemInfo.StorageUOM;  
                    $scope.batch.batchqty = CreateBatchSrv.ItemInfo.batchqty;
                    $scope.batchformat = (CreateBatchSrv.ItemInfo.LotFor == 'M'? "Format: Manufacturing":"Format: Expiration");
                    $scope.batch.rcvshow = 0;
                    $scope.batch.rcvqty = '';
                    $scope.batch.zone = CreateBatchSrv.ItemInfo.zone;
    
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
    
      
          $scope.GetPalletQty = function(){
      
         
    
        }
    
        $scope.GetRcvQty = function(batch){
    if(batch.rcvqty == 0){
        $cordovaToast.show("Please the Quantity and Unit", 'short', 'bottom');
    }else{
    
        $scope.batch.rcvshow = 1;
        
        var untcon = $scope.batch.perunits.find(m => m.UNTCON == $scope.batch.per).CONVERSION;
        var forbase = $scope.batch.rcvqty * untcon;
        $scope.batch.palqty = forbase;
        
        $scope.GetPalletQtys($scope.batch);
    
    
    }
    
            
    
    
        
    
        }
    
        $scope.CloseRCVshow = function(){
            $scope.batch.rcvshow = 0;
            $scope.batch.rcvqty = '';
    
        }
    
    
          
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
                   // $scope.batch.itemcode = data.text;
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

       


        $scope.ScanQty = function() {

           
            $cordovaBarcodeScanner.scan().then(function(data) {
                if (!data.cancelled) {
                    var reg = /^[0-9]+$/;
                  if(reg.test(data.text)){
                    $scope.batch.rcvqty = parseInt(data.text,10);
                    $scope.GetRcvQty($scope.batch);
                    
                  }else{
                    LoadingService.PopAlert("Numeric is Only Allowed");
                  }
                    
                    
                }
            }, function(err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }
    
  
    
    
    
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
        
        console.log(batch);
        CreateBatchSrv.CreateNewBatchWunit($scope.batch) // pass last batch because the last batch is technically the latest batch at this point
        .then(function(res) {
            
           
            $scope.resetData(res.data);
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
            
    
            CreateBatchSrv.CreateNewBatchWunit($scope.batch) // pass last batch because the last batch is technically the latest batch at this point
            .then(function(res) {
               /* console.log("SAVE:",$scope.batch);
                console.log("RES DATA:",res.data);
                console.log("RES itemtobeback:",res.data.itemtobeback);
                console.log("RES datashow:",res.data.data);*/
                
               
    
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
    
            
    
        
           
    
    
            
           
        }
    
        $scope.ClearBatch = function() {
            $scope.batch = {};
            $scope.qty = 0;
            $scope.incrementingqty = 0;
            $scope.totalqty = 0;
            $scope.batch.batchqty = 0;
                $scope.batch.mfgdate = '';
                $scope.batch.iscasepick = '';
                $scope.format = '';
       
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
                    $scope.batch.freshness = "";
                    $scope.batch.batchno = "X";
                    $scope.batch = $scope.lastBatch;
                    $scope.GetPalletQtys($scope.batch);
            
    
        }
    
        $scope.goBack = function() {
            LoadingService.GoBack();
        }
    

        $scope.HideModal = function(){
    
            $scope.ordrqty.hide();
          }
      
          $scope.OpenModal = function(){
            LoadingService.StartLoading();
            if($scope.ValidateViewQTYLogTracking()){
                $scope.LogTracking();

            }else{
                LoadingService.StopLoading(); 
                $scope.ordrqty.show();
            }
            //$scope.ordrqty.show();
            
          }


          $scope.LogTracking = function() {
           

         var Data = _.findWhere($rootScope.validationparent, { stage: "637479430648371070" }); 
 
         CreateBatchSrv.CaptureLog(Data.stage,Data.name) // pass last batch because the last batch is technically the latest batch at this point
         .then(function(res) {
             if(res.data === 'Successfully Capture Log'){
                $scope.ordrqty.show();
                LoadingService.StopLoading(); 
             }else{
                LoadingService.PopAlert(res.data);
                 LoadingService.StopLoading();        
             }           
         }, function(err) {
             LoadingService.StopLoading();
             LoadingService.PopAlert("1st done", err.data);
         })

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
            LoadingService.StopLoading();
            LoadingService.PopAlert("Cannot get data", err.data);
        })
}

        
        $scope.init();
    }
    ])