app.controller('CusPickLocListCtrl', ['$scope', 'CusPickingService', 'LoginService','$ionicModal', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
    function ($scope, CusPickingService, LoginService,$ionicModal, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


        $scope.init = function () {

        $scope.locList = [];
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.zone = CusPickingService.zone;
        $scope.ir = CusPickingService.irnumb;
        $scope.GetCusList();
        $scope.turnClearAppData = 'ASC';
            
            
        }

        $scope.Scanshow = function(){

            if($rootScope.scanpicking.length === 0){
                return false;
                    }else{
                        var ans = _.findWhere($rootScope.scanpicking, { stage: "637479667688748465" });        
                        if (ans) {
                          return true;
                        } else {
                          return false;
                        }
                    }
          /*  $scope.scan = $rootScope.menuList;
                    var data = _.findWhere($rootScope.menuList, {
                        stage: "637469366253816551"
                      }).pages;
                      var ans = _.findWhere(data, { stage: "637479667688748465" });        
                      if (ans) {
                        return true;
                      } else {
                        return false;
                      }*/
        }
        


        $scope.GetCusList = function () {
            LoadingService.StartLoading();
            CusPickingService.getCustomerPickListbyLoc($scope.wc,$scope.zone,$scope.ir)
            .then(function (res) {
              
                $scope.locList = res.data;
                if($scope.locList.length === 1){
   
                if($scope.Scanshow()){

                                     }
                else{
                var LocCode = $scope.locList.find(m => m.LocCode != " ").LocCode;
               // $scope.redirectMe(LocCode);
                    }
                                                }
                else if($scope.loclist.length === 0){
                    $state.go('app.cuspickbyassignzonelist');
                    
                }
                                                
            }, function (err) {
                
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the Location-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).
            finally(function () {
               
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
                                        };


                                    

        $scope.redirectMe = function (loc) {
            if($scope.Scanshow()){
                console.log("No");
            }else{
                CusPickingService.loc = loc;
                $state.go('app.cuspickbyitemlist');
            }
           
        }


        $scope.ordering = function(val){
            console.log($scope.locList);
            if( val === 'ASC'){
                $scope.locList = _.sortBy($scope.locList, 'PickSeq','LocCode');      
            }else{
                $scope.locList = _.sortBy($scope.locList, 'PickSeq','LocCode').reverse();
   
            }
                                        }

$scope.ScanLocation = function(){
  
    
 $cordovaBarcodeScanner.scan().then(function(data){
 if(!data.cancelled)
{
 var d =  $scope.locList.find(m => m.LocCode == data.text.toUpperCase());
if(d != undefined){
//$scope.redirectMe(data.text.toUpperCase());
CusPickingService.loc = d.LocCode;
                $state.go('app.cuspickbyitemlist');
    
}else{
LoadingService.PopAlert("Location Not Found");
    }
} 
},function(err){
LoadingService.PopAlert("Something went wrong", err.data);
})
                                        
                                 }
                                        



        $scope.init();

    }]);

