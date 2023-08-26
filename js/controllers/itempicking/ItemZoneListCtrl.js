//ZONE LIST CONTROLLER
app.controller('ItemPickZoneListCtrl', ['$scope', 'ItemPickingService','LoginService', '$state', '$rootScope', '$ionicHistory', 'LoadingService', 
function ($scope, ItemPickingService,LoginService, $state, $rootScope, $ionicHistory, LoadingService) {

    $scope.init = function () {
    
        LoadingService.StartLoading();
        $scope.alias = LoginService.userProfile.emailAlias;
        $scope.wc = LoginService.userProfile.warehouseCode; // for View Title so it shows Pick Zone in {{warehouse code}}
        if($state.current.name == "app.637474458499882116"){
            $scope.getMyZoneList();
            $scope.title = $scope.alias + " Zone list";
        }else{
            $scope.getZoneList();
            $scope.title =  "Zone list for "+$scope.wc;
        }
       
      
    }

    $scope.getMyZoneList = function () {
        ItemPickingService.GetMyZoneList($scope.wc)
            .then(function (res) {
                //success
                $scope.zoneList = ItemPickingService.zoneList;
                
            }, function (err) {
                //err
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the Zone-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).
            finally(function () {
                // Stop the ion-refresher from spinning
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }


    $scope.getZoneList = function () {
        ItemPickingService.GetZoneList($scope.wc)
            .then(function (res) {
                //success
                $scope.zoneList = ItemPickingService.zoneList;
                
               
               console.log($scope.zoneList);
            }, function (err) {
                //err
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we cant get the Zone-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
            }).
            finally(function () {
                // Stop the ion-refresher from spinning
                LoadingService.StopLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.redirectMe = function (zone) {
        // $rootScope.zone = zone;
        ItemPickingService.fromzone = $state.current.name;
        ItemPickingService.zone = zone;
        if($state.current.name == "app.637474458499882116"){
            $state.go('app.myzoneitempicklist');
        }else{
            $state.go('app.itempickzonepicklist');
        }
       
    }

     $scope.goBack = function(){
      LoadingService.GoBack();
    }

    $scope.init();
}]);
