app.controller('LocListCtrl', ['$scope', 'OrderStagingService', 'LoginService', '$ionicLoading','$ionicPopup' ,'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$ionicModal',
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

            
    
                $scope.title = "Adding To Staging Pick Location";
            

        }


       

                  
        
        

        $scope.ScanLocation = function () {

            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    var d =  $scope.locList.find(m => m.LOCCDE == data.text.toUpperCase());
                    if(d != undefined){
                        $scope.searchParam = data.text;
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
                    $scope.locList = res.data;
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




    

        $scope.redirectMe = function(loc) {

           
                OrderStagingService.loc = loc;
                $scope.loc = loc;
                $scope.addtostaging.show();
            
            
            };


            $scope.AddtoStaging = function (ir,loc,qty) {
                LoadingService.StartLoading();
                console.log($scope.wc,ir,loc,qty,$scope.emailAlias);
                OrderStagingService.AddtoStaging($scope.wc,ir,loc,qty,$scope.emailAlias)
                    .then(function (res) {
                        
                        if(res.data == "Successfully Added"){
                            
                            OrderStagingService.ir = '';
                            OrderStagingService.loc = '';
                            $scope.addtostaging.hide();
                            $state.go('app.637540908821993060');
                            LoadingService.StopLoading();
                            LoadingService.PopAlert(res.data);
                        }else{
                            LoadingService.PopAlert(res.data);
                            LoadingService.StopLoading();
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

        $ionicModal.fromTemplateUrl('templates/addtostaging.html', {
            id: 'addtostaging',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.addtostaging = modal;
        });

        $scope.init();

    }]);

