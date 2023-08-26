app.controller('LocPickZoneCtrl', ['$scope', 'LocationPickingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner',
    function ($scope, LocationPickingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner) {


        $scope.init = function () {
           
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.alias = LoginService.userProfile.emailAlias;
            if($state.current.name == "app.637474456413227577"){
                $scope.GetMyZoneList();
                $scope.title = $scope.alias + " Zone list";
            }else{
                $scope.GetZoneList();
                $scope.title =  "Zone list for "+$scope.wc;
            }
        }



        $scope.GetZoneList = function () {
            LoadingService.StartLoading();



            if($state.current.name == "app.637474456413227577"){
               
                LocationPickingService.getMyZoneList(LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = LocationPickingService.zoneList;

                if($scope.list.length === 1){
    var zoning = $scope.list.find(m => m.Zone != " ").Zone;
                  //  console.log(zoning); 
   // $scope.redirectMe(zoning);
                }

                    
                       

                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })


            }else{
              
                
                LocationPickingService.GetZoneList(LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = LocationPickingService.zoneList;
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

        $scope.GetMyZoneList = function () {
            LoadingService.StartLoading();
            LocationPickingService.getMyZoneList(LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = LocationPickingService.zoneList;

                if($scope.list.length === 1){
    var zoning = $scope.list.find(m => m.Zone != " ").Zone;
                    console.log(zoning); 
    $scope.redirectMe(zoning);
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

        $scope.redirectMe = function (zone) {
            LocationPickingService.zone = zone;
            LocationPickingService.fromzone = $state.current.name;
            if($state.current.name == "app.637474456413227577"){
                $state.go('app.myzonelocpicklist');
            }else{
                $state.go('app.loczonepicking');
            }
            
            
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

        


        $scope.init();

    }]);

