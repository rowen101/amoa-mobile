app.controller('StagingLocCtrl', ['$scope', 'OrderStagingService', 'LoginService', '$ionicLoading','$ionicPopup' ,'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$ionicModal',
    function ($scope, OrderStagingService, LoginService, $ionicLoading,$ionicPopup, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$ionicModal) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode; 
            $scope.emailAlias = LoginService.userProfile.emailAlias;
           // console.log(OrderStagingService.ir);
            $scope.ir = OrderStagingService.ir;
            $scope.loc = '';
            $scope.notes = '';
            $scope.getLocStaging();
            $scope.turnClearAppData = 'ASC'
            $scope.ordering($scope.turnClearAppData);

            
            console.log($scope.Scanshow());
                $scope.title = "Staging Pick Location";
            

        }


        $scope.Scanshow = function(){

            if($rootScope.scanstaging.length === 0){
                return false;
                    }else{
                        var ans = _.findWhere($rootScope.scanstaging, { stage: "637483111828038710" });        
                        if (ans) {
                          return true;
                        } else {
                          return false;
                        }
                    }
          /*  $scope.scan = $rootScope.menuList;
                    var data = _.findWhere($rootScope.menuList, {
                        stage: "637483036831001002"
                      }).pages;
                    if(data){
                        return true;
                    }else{
             var ans = _.findWhere(data, { stage: "637483111828038710" });        
                      if (ans) {
                        return true;
                      } else {
                        return false;
                      }
}*/

                  
        }
        

        $scope.ScanLocation = function () {

            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    var d =  $scope.locList.find(m => m.LOCCDE == data.text.toUpperCase());
                    if(d != undefined){
                        $scope.redirectMe(data.text.toUpperCase());
                      //  $scope.TransfertoStaging($scope.ir,data.text,$scope.wc,$scope.emaialalias,$scope.notes);
                    }else{
                        LoadingService.PopAlert("Location not the same");
                    }     
                }           
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }






        $scope.getLocStaging = function () {
            LoadingService.StartLoading();
            OrderStagingService.getLocStaging($scope.wc)
                .then(function (res) {
                    $scope.locList = OrderStagingService.locList;
                    if($scope.locList.length === 1){
if($scope.Scanshow()){

}else{
    var LOCCDE = $scope.locList.find(m => m.LOCCDE != " ").LOCCDE;
                        
  //  $scope.redirectMe(LOCCDE);
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

     


        $scope.ordering = function(val){
            if( val === 'ASC'){
    
                $scope.locList = _.sortBy($scope.locList, 'LOCCDE');

            }else{
                $scope.locList = _.sortBy($scope.locList, 'LOCCDE').reverse();

            }
            
            
        
        }




        $scope.click = function(loc){

if($scope.Scanshow()){

}else{
    $scope.redirectMe(loc);
}

        }

        $scope.redirectMe = function(loc) {

           
                OrderStagingService.loc = loc;
                $scope.loc = loc;
                $state.go('app.stagingIR');
            

         //   OrderStagingService.loc = loc;
         //   $scope.loc = loc;

            

          /*  if(OrderStagingService.ir != undefined){

                OrderStagingService.loc = loc;
                
            var confirmPopup = $ionicPopup.confirm({
                title: 'Order transfer to staging:?',
                subTitle: 'Transfer '+OrderStagingService.ir+' to '+OrderStagingService.loc+' ?'
              });
              confirmPopup.then(function(res) {
                if(res) {
                
                    $scope.TransfertoStaging(OrderStagingService.ir,OrderStagingService.loc,$scope.wc,$scope.emailAlias);
                           
                } else {
                  
                }
              });

            }else{

                OrderStagingService.loc = loc;
                $state.go('app.stagingir');

            }*/
            
            };


            $scope.TransfertoStaging = function (ir,loc,wc,ea,notes) {
                LoadingService.StartLoading();
                OrderStagingService.TransfertoStaging(ir,loc,wc,ea,notes)
                    .then(function (res) {
                        
                        //if(res.data == "Successfully Transferred to Staging"){
                            LoadingService.PopAlert(res.data);
                            OrderStagingService.ir = '';
                            OrderStagingService.loc = '';
                            $state.go('app.637481161681677075');
                            
                       // }
                       
                    }
                    , function (err) {
                        LoadingService.PopAlert("Something went wrong", err.data);
                    })
                    .finally(function () {
                        LoadingService.StopLoading();
                        $scope.$broadcast('scroll.refreshComplete');
                    })
            }



            


        $scope.ScanBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.searchParam = data.text;
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data);
            })
        }

        $scope.goBack = function () {
          
                LoadingService.GoBack();
            
        }

        $ionicModal.fromTemplateUrl('templates/staging/stagingConfirmation.html', {
            id: 'stagingConfirmation',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.stagingConfirmation = modal;
        });

        $scope.init();

    }]);

