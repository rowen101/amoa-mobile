app.controller('StoRConfirmCtrl', ['$scope', 'OrderStagingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner','$cordovaToast','$ionicPopup','$ionicModal',
    function ($scope, OrderStagingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner,$cordovaToast,$ionicPopup,$ionicModal) {


        $scope.init = function () {
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.list = [];
            $scope.datapicked = {};
            $scope.notes = [];
            $scope.StagingToReleasingList();
            $scope.pickitemlist = {};
            $scope.title = 'Staging to Releasing';
        }

   /*     $scope.Scanshow = function(){
if($rootScope.scanreleasing.length === 0){

     return false;
}else{
    var ans = _.findWhere($rootScope.scanreleasing, { stage: "637483142116573150" });        
    if (ans) {
      return true;
    } else {
      return false;
    }
}

         
                      
        }*/



        $scope.StagingToReleasingList = function () {
            LoadingService.StartLoading();
            OrderStagingService.StagingToReleasingList($scope.wc)
                .then(function (res) {
                    if(res.data.length == 0){
                        LoadingService.PopAlert("No  Data Found");
                    }else{
                        $scope.list = res.data;
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

        $scope.Confirm = function (ir) {  
            var confirmPopup = $ionicPopup.confirm({
                title: 'Are you sure to Confirm?',
                subTitle: 'Staging to  Releasing Confirmation: '+ir,
              });
              confirmPopup.then(function(res) {
                if(res) {
                LoadingService.StartLoading();
                OrderStagingService.Confirmation(ir,$scope.wc)
                .then(function (res) {
                    if(res.data == "Record successfully save"){
                        LoadingService.PopAlert(res.data);
                        $scope.NotesModal.hide();
                        $scope.init();
                    }else{
                        //$scope.NotesModal.hide();
                        LoadingService.PopAlert(res.data);
                        //$scope.init();
                    }
                    
                    
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        
                } else {
                        
                }
              });
           
        }


        $scope.OpenNotes = function (data) {  
            $scope.notes = [];
            $scope.datapicked = {};

            $scope.datapicked = data;
            $scope.notes = data.Notes.split("<skip>");
            $scope.NotesModal.show();
           
        }


        $ionicModal.fromTemplateUrl('templates/notes.html', {
            id: 'NotesModal',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.NotesModal = modal;
        });


        $scope.ScanLocation = function (ir,loc) {

            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                   // var d =  $scope.locList.find(m => m.LocCode == data.text);
                    if(loc === data.text.toUpperCase()){
                        OrderReleaseService.rnum = ir;
                        
                        $state.go('app.releasingitem');
                    }else{
                        LoadingService.PopAlert("Location not the same");
                    }     
                }           
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
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


        $scope.init();

    }]);

