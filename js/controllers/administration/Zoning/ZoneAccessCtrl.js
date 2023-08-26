app.controller('ZoneAccessCtrl', ['$scope', 'AdminSrv', 'LoginService', '$ionicLoading','$ionicPopup' ,'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$ionicModal',
    function ($scope, AdminSrv, LoginService, $ionicLoading,$ionicPopup, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$ionicModal) {


        $scope.init = function () {
            $scope.zone = AdminSrv.zone;
            $scope.title = "Zone "+$scope.zone;
           
            $scope.list = [];
            $scope.changedlist = [];
            $scope.GetzonelistUsers();
            

        }



        $scope.GetzonelistUsers = function () {
            LoadingService.StartLoading();
            AdminSrv.GetzonelistUsers($scope.zone)
                .then(function (res) { 
                    $scope.list = res.data.uazlist; 
                    $scope.userlist = res.data.count;
                    console.log($scope.userlist);
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data.message);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

      


        $scope.AddChanged = function (user) {
           // console.log(user);
            var list = $scope.list;
            var get = this.list.indexOf(user);
            if(this.list[get].access === "true"){
                this.list[get].access = "false";
            }else{
                this.list[get].access = "true";
            }
            
           

            var check = $scope.list.find(m => m.User == user.User);

            console.log(check.User+" | "+check.access);
            if(check.access == true || check.access == "true"){
                $scope.userlist = $scope.userlist+1;
            }else{
                $scope.userlist = $scope.userlist-1;
            }
           
            var get = $scope.changedlist.find(m => m.User == user.User);
          if(get == undefined){
            $scope.changedlist.push(user);
           
          }else{
            
            for (var i = 0; i < $scope.changedlist.length; i++) {
            
                if($scope.changedlist[i].User == user.User){
                    
                  $scope.changedlist.splice(i,1);
                  break;
                }else{
                    
                }
              
              
            } 


          }

            

           
        }


        $scope.testcolor = function(valid) {
            if(valid == "true" || valid == true){
                return 'white';
            }else{
                return 'black';
            }
            
               
                      
            }
            
            $scope.testbgcolor = function(valid) {
                if(valid == "true" || valid == true){
                     return '#32CD32';
                }else{
                    return '#FFFFFF';
                }
              
                      
                      
            }







            $scope.ShowDiff = function () {
                $scope.differencemodal.show();
            }

            $scope.ZoneAccessEdit = function(){

                console.log($scope.changedlist);

            }


            $ionicModal.fromTemplateUrl('templates/differencemodal.html', {
                id: 'differencemodal',
                scope: $scope
            }).then(function (modal) {
                $scope.differencemodal = modal;
            });
        


       
        $scope.init();

    }]);

