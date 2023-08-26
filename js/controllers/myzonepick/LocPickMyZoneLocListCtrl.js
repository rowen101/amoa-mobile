//Location List Controller
app.controller('LocPickMyZoneLocListCtrl', ['$scope', 'LocationPickingService', '$state', '$rootScope', 'LoadingService', '$cordovaBarcodeScanner','LoginService',
function ($scope, LocationPickingService, $state, $rootScope, LoadingService, $cordovaBarcodeScanner, LoginService) {

    $scope.init = function () {
        LoadingService.StartLoading();
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.zone = LocationPickingService.zone;
        $scope.getLocList();
        $scope.turnClearAppData = 'ASC';
        $scope.userrole = LoginService.getProfile().userrole;
        
    }

    $scope.Scanshow = function(){

        if($rootScope.scanpicking.length === 0){
            return false;
                }else{
                    var ans = _.findWhere($rootScope.scanpicking, { stage: "637478832517712799" });        
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
                  var ans = _.findWhere(data, { stage: "637478832517712799" });        
                  if (ans) {
                    return true;
                  } else {
                    return false;
                  }*/
    }
    


    $scope.getLocList = function () {
        console.log($scope.wc);
        LocationPickingService.GetLocationList($scope.wc,$scope.zone)
            .then(function (res) {
                //success
                $scope.locList = LocationPickingService.locList;
if($scope.locList.length === 1){
   
    if($scope.Scanshow()){

    }else{
        var LocCode = $scope.locList.find(m => m.LocCode != " ").LocCode;
        //$scope.redirectMe(LocCode);

    }
}else if ($scope.list.length === 0) {
    $state.go('app.637474456413227577');
}
            }, function (err) {
                //err
                LoadingService.PopAlert("Something went wrong","Error Message: "+err.data+ " Sorry we cant get the Location-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).
            finally(function () {
                //stop ion refresher
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            })
    };

    $scope.redirectMe = function (loc) {
        // $rootScope.loc = loc;
        LocationPickingService.loc = loc;
        $state.go('app.myzonelocpickinglist');
    };


    $scope.ordering = function(val){
        console.log($scope.locList);
        if( val === 'ASC'){

            $scope.locList = _.sortBy($scope.locList, 'PickSeq','LocCode');  

          //  $scope.locList = $filter('orderBy')($scope.locList , 'LocCode', false);
        }else{
            $scope.locList = _.sortBy($scope.locList, 'PickSeq','LocCode').reverse();

           // $scope.locList = $filter('orderBy')($scope.locList , 'LocCode', true);
        }
        
        
    
    }

    $scope.checkredirectMe = function(loc){

if($scope.Scanshow()){

}else{
    $scope.redirectMe(loc);
}

    }


$scope.ScanLocation = function(){
    
    
    
    $cordovaBarcodeScanner.scan().then(function(data){
        if(!data.cancelled)
        {
            var d =  $scope.locList.find(m => m.LocCode == data.text.toUpperCase());
            if(d != undefined){
                $scope.redirectMe(data.text.toUpperCase());
            }else{
                
                LoadingService.PopAlert("Location Not Found");
            }
        } 
        },function(err){
            LoadingService.PopAlert("Something went wrong", err.data);
        })

}



    

     $scope.goBack = function(){
      LoadingService.GoBack();
    }

    
    $scope.ScanBarcode = function(){
        $cordovaBarcodeScanner.scan().then(function(data){
        if(!data.cancelled)
        {
           
            $scope.searchParam = data.text;
        } 
        },function(err){
            LoadingService.PopAlert("Something went wrong", err.data);
        })
    }
    $scope.init();

}]);
