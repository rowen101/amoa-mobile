app.controller('ReItemCtrl', ['$scope', 'OrderReleaseService','CusPickingService', 'LoginService', '$ionicLoading','$ionicModal', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
    function ($scope, OrderReleaseService,CusPickingService, LoginService, $ionicLoading,$ionicModal, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.rnum = OrderReleaseService.rnum;
            $scope.title = "Items For Release"
            $scope.list =[];
            $scope.IRhead = {};
            $scope.notes = [];
            $scope.getItemReleasing($scope.rnum);
        
        }




   

        $scope.Scanshow = function(){
            if($rootScope.scanreleasing.length === 0){
            
                 return false;
            }else{
                var ans = _.findWhere($rootScope.scanreleasing, { stage: "637483301635293885" });        
                if (ans) {
                  return true;
                } else {
                  return false;
                }
            }
        }

        $scope.Scanshowadmin = function(){
            if($rootScope.scanreleasing.length === 0){
            
                 return false;
            }else{
                var ans = _.findWhere($rootScope.scanreleasing, { stage: "637483299226611386" });        
                if (ans) {
                  return true;
                } else {
                  return false;
                }
            }
        }
        

        $scope.expandText = function(){ 
            var element = document.getElementById("txtnotes");
            element.style.height =  element.scrollHeight + "px";
        }


        $scope.getItemReleasing = function (rnum) {
            LoadingService.StartLoading();
            OrderReleaseService.getItemReleasing(rnum)
                .then(function (res) {
                    console.log(res.data);
                    $scope.list = res.data.itemlist;
                    if(res.data.itemlist.length == 0){
                       // LoadingService.PopAlert(res.data);
                        $scope.ReleaseInfoModal.hide();
                        $state.go('app.home');
                    }
                    
                    $scope.IRhead = res.data.IRhead;
                    console.log(res.data);
                    console.log($scope.IRhead.LP);
                    $scope.notes = $scope.IRhead.NOTES.split("<skip>");
                   
                   // console.log($scope.notes);
                    var y  = $scope.IRhead.NOTES.replace(/<skip>/g, " \n \n");
                    console.log(y);
                    $scope.IRhead.NOTES = y;
                    //console.log($scope.IRhead.NOTES);
                
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }


        $scope.OrderReleased = function (itmcde,plnqty) {
            
            LoadingService.StartLoading();
            var reqnum = _.findWhere($scope.list, { ITMCDE: itmcde });
            if(reqnum == undefined){
                LoadingService.PopAlert("Quantity Exceeded");
                LoadingService.StopLoading();
            }else{
                OrderReleaseService.OrderRelease(reqnum.REQNUM,plnqty,itmcde,0)
                .then(function (res) {
                    console.log(res.data);
                    if(res.data === "Successfully"){
                        //$scope.ScanItem();
                    }else if(res.data === "Completed All Item"){
                        LoadingService.PopAlert(res.data);
                        $scope.ReleaseInfoModal.hide();
                        $state.go('app.home');
                        //$state.go('app.home');
                    }else if(res.data === "Quantity Exceeded"){
                        LoadingService.PopAlert(res.data);
                    }else{
                        $scope.ReleaseInfoModal.hide();
                        $scope.init();
                        
                       // $scope.ScanItem();
                    }
                    
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
            }
            
        }

      
        $scope.OrderRelease = function (itmcde,plnqty) {
            LoadingService.StartLoading();
            var reqnum = _.findWhere($scope.list, { ITMCDE: itmcde });
            if(reqnum == undefined){
                LoadingService.PopAlert("Quantity Exceeded");
                LoadingService.StopLoading();
            }else{
                OrderReleaseService.OrderRelease(reqnum.REQNUM,plnqty,itmcde,1)
                .then(function (res) {
                    console.log(res.data);
                    if(res.data === "Successfully"){
                        $scope.ScanItem();
                    }else if(res.data === "Completed All Item"){
                        LoadingService.PopAlert(res.data);
                        $state.go('app.home');
                    }else if(res.data === "Quantity Exceeded"){
                        LoadingService.PopAlert(res.data);
                    }else{
                        $scope.init();
                      //  $scope.ScanItem();
                    }
                    LoadingService.StopLoading();
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
            }
            
        }


        





        $scope.showInfoModal = function(itmcde){
           
          // console.log("$scope.pickitemlist: "+$scope.pickitemlist.ITMDSC);
          if($scope.Scanshow()){
            $scope.pickitemlist = {};
            $scope.pickitemlist = _.findWhere($scope.list, { ITMCDE: itmcde });
            console.log($scope.pickitemlist);
            $scope.ReleaseInfoModal.show();
          }else{
           
          }
         
  
        }


        $scope.ScanItem = function () {
          
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    var itm = $scope.list.find(m =>
                         m.ITMCDE== data.text
                         || m.BarCode  == data.text
                         || m.CsCode  == data.text
                         || m.PcCode == data.text
                         || m.PkCode  == data.text
                         || m.SubCode  == data.text);
                    if(itm != undefined){

                                if(itm.ISCASEPICK){
                        
                                    if(itm.CsCode  == data.text){
                                    $scope.OrderRelease(itm.ITMCDE,1);
                                    }else{
                                    $scope.GetDropCode(data.text,itm,false);
                                    }

                                }else{


                                    if(itm.UNTMS1 == "PC"){

                                        if(itm.PcCode == data.text){

                                        $scope.OrderRelease(itm.ITMCDE,1);
                                    
                                    }else{
                                        $scope.GetDropCode(data.text,itm,false);
                                     
                                    }

                                    }else if(itm.UNTMS1 == "PCK"){

                                        if(itm.PkCode == data.text){

                                        $scope.OrderRelease(itm.ITMCDE,1);
                                
                                    }else{
                                        $scope.GetDropCode(data.text,itm,false);
                                 
                                    }
                                    }else{
                                        $scope.GetDropCode(data.text,itm,false);
                                     
                                    }

                            

                                        }

                        



                                    }else{

                                    $scope.GetDropCodeItemcode(data.text);

                            
                                    }



                   
                   // $scope.searchParam = data.text;
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data);
            })
        }



        $scope.ScanItemdata = function (pickedItem) {
          //  console.log(pickedItem);
          //  $scope.OrderReleased(pickedItem.ITMCDE,pickedItem.qty);
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
               // var data = '14800092114165';
if(pickedItem.ISCASEPICK){
        
    if(pickedItem.CsCode  == data.text){
        $scope.OrderReleased(pickedItem.ITMCDE,pickedItem.qty);
    }else{
        $scope.GetDropCode(data.text,pickedItem,true);
    }

}else{

    if(pickedItem.UNTMS1 == "PC"){

        if(pickedItem.PcCode == data.text){

            $scope.OrderReleased(pickedItem.ITMCDE,pickedItem.qty);
            
        }else{
            $scope.GetDropCode(data.text,pickedItem,true);
             
        }

}else if(pickedItem.UNTMS1 == "PCK"){

        if(pickedItem.PkCode == data.text){

            $scope.OrderReleased(pickedItem.ITMCDE,pickedItem.qty);
        
        }else{
            $scope.GetDropCode(data.text,pickedItem,true);
         
    }
}else{
            $scope.GetDropCode(data.text,pickedItem,true);
             
}

}


              

                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data);
            })
        }

 

        $scope.GetDropCode = function (param,pickedItem,quantify) {
            LoadingService.StartLoading();
            CusPickingService.getItemCodeDropDown(param,pickedItem.ITMCDE)
                .then(function (res) {
                   if(pickedItem.ISCASEPICK){
                    if(res.data === "FALSE"){
                        LoadingService.PopAlert("Item Case Code not Found Or the Item is Already Scanned");
                    }else{
                        if(quantify){
                            $scope.OrderReleased(pickedItem.ITMCDE,pickedItem.qty);
                        }else{
                            $scope.OrderRelease(pickedItem.ITMCDE,1);
                        }
                        
                    }
                   }else{
                    if(pickedItem.UNTMS1 == "PC"){
                        if(res.data === "FALSE"){
                            LoadingService.PopAlert("Item Pccode not Found Or the Item is Already Scanned");
                        }else{
                            if(quantify){
                                $scope.OrderReleased(pickedItem.ITMCDE,pickedItem.qty);
                            }else{
                                $scope.OrderRelease(pickedItem.ITMCDE,1);
                            }
                        }
                    }else if(pickedItem.UNTMS1 == "PCK"){
                        if(res.data === "FALSE"){
                            LoadingService.PopAlert("Item Pkcode not Found Or the Item is Already Scanned");
                        }else{
                            if(quantify){
                                $scope.OrderReleased(pickedItem.ITMCDE,pickedItem.qty);
                            }else{
                                $scope.OrderRelease(pickedItem.ITMCDE,1);
                            }
                        }
                    }else{
                        if(res.data === "FALSE"){
                            LoadingService.PopAlert("Item not Found Or the Item is Already Scanned");
                        }else{
                            if(quantify){
                                $scope.OrderReleased(pickedItem.ITMCDE,pickedItem.qty);
                            }else{
                                $scope.OrderRelease(pickedItem.ITMCDE,1);
                            }
                        }
                    }
                   }
                    
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }


        $scope.GetDropCodeItemcode = function (param) {
            LoadingService.StartLoading();
            CusPickingService.getItemCode(param)
                .then(function (res) {
                    var itm = $scope.list.find(m =>
                        m.ITMCDE== res.data.ITMCDE);
                        if(itm != undefined){
                            if(itm.UNTMS1 == res.data.UOM){

                                $scope.OrderRelease(itm.ITMCDE,1);

                            }else{

                                if(res.data.UOM == "CS"){
                                    LoadingService.PopAlert("Item Cscode not Found  Or the Item is Already Scanned");
                                }else if(res.data.UOM  == "PC"){
                                    LoadingService.PopAlert("Item Pccode not Found  Or the Item is Already Scanned");
                                }else if(res.data.UOM  == "PCK"){
                                    LoadingService.PopAlert("Item Pkcode not Found  Or the Item is Already Scanned");
                                }else{
                                    LoadingService.PopAlert("Item not Found Or the Item is Already Scanned");
                                }
                                

                            }
                            
                        }else{
                            LoadingService.PopAlert("Item not Found Or the Item is Already Scanned");
                        }


                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }


        



        $scope.goBack = function () {
            LoadingService.GoBack();
        }



        $ionicModal.fromTemplateUrl('templates/releasing/ReleaseInfoModal.html', {
            id: 'ReleaseInfoModal',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.ReleaseInfoModal = modal;
        });


        $scope.init();

    }]);

