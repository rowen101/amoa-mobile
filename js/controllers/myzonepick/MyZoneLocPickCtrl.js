app.controller('MyZoneLocPickCtrl', ['$scope', 'LocationPickingService','CusPickingService', 'LoginService', '$ionicLoading', 'LoadingService', '$rootScope', '$state', '$cordovaBarcodeScanner', '$ionicModal', '$cordovaToast',
    function ($scope, LocationPickingService,CusPickingService, LoginService, $ionicLoading, LoadingService, $rootScope, $state, $cordovaBarcodeScanner, $ionicModal, $cordovaToast) {
        $scope.pickDetail = {};
        $scope.filter = {};
        $scope.filter.lot = true;

        $scope.init = function () {
           
            $scope.loc = LocationPickingService.loc;
            $scope.GeItemToPick();
        }


        $scope.Scanshow = function(){
            if($rootScope.scanpicking.length === 0){
                return false;
                    }else{
                        var ans = _.findWhere($rootScope.scanpicking, { stage: "637475295689004807" });        
                        if (ans) {
                          return true;
                        } else {
                          return false;
                        }
                    }
         /*   $scope.scan = $rootScope.menuList;
                    var data = _.findWhere($rootScope.menuList, {
                        stage: "637469366253816551"
                      }).pages;
                      var ans = _.findWhere(data, { stage: "637475295689004807" });        
                      if (ans) {
                        return true;
                      } else {
                        return false;
                      }*/
        }
    
    
    
        $scope.ScanLocation = function (itm) {

          

          

            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {

                    if(itm.IsCasePick){
                        if(itm.CsCode === data.text){
                        $scope.PickItem(itm.PalleteNo);
                         }else{
                            $scope.GetDropCode(data.text,itm); 
                        }
                    }else{
                        if(itm.Uom === "PC"){
                                        if(itm.PcCode == data.text){
                                             $scope.PickItem(itm.PalleteNo);
                                     
                                        }else{
                                            $scope.GetDropCode(data.text,itm); 
                                          
                                        }
    
                            }else if(itm.Uom == "PCK"){
    
                                        if(itm.PkCode == data.text){
                                            
                                           $scope.PickItem(itm.PalleteNo);
                                        
                                        }else{
                                            $scope.GetDropCode(data.text,itm); 
                                    }
                            }else{
                                $scope.GetDropCode(data.text,itm);          
                                }
                            }      
                          
                }
            
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }



        $scope.GetDropCode = function (param,itm) {
            LoadingService.StartLoading();
            CusPickingService.getItemCodeDropDown(param,itm.ItemCode)
                .then(function (res) {
                   if(itm.IsCasePick){
                    if(res.data === "FALSE"){
                        LoadingService.PopAlert("Invalid Item Casecode");
                    }else{
                        $scope.PickItem(itm.PalleteNo);
                    }
                   }else{
                    if(itm.Uom == "PC"){
                        if(res.data === "FALSE"){
                            LoadingService.PopAlert("Invalid Item Pccode");
                        }else{
                            $scope.PickItem(itm.PalleteNo);
                        }
                    }else if(itm.Uom == "PCK"){
                        if(res.data === "FALSE"){
                            LoadingService.PopAlert("Invalid Item Pkcode");
                        }else{
                            $scope.PickItem(itm.PalleteNo);
                        }
                    }else{
                        if(res.data === "FALSE"){
                            LoadingService.PopAlert("Invalid Code");
                        }else{
                            $scope.PickItem(itm.PalleteNo);
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


        $scope.GeItemToPick = function () {
            LoadingService.StartLoading();
            LocationPickingService.GetWaveLocToPick($scope.loc, LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    $scope.list = LocationPickingService.locToPick;
                    if ($scope.list.length === 0) {
                        $state.go('app.myzonelocpicklist');
                    }else if($scope.list.length === 1){
                        var PalleteNo = $scope.list.find(m => m.PalleteNo != " ").PalleteNo;
                        $scope.showMoreInfoModal(PalleteNo);
                    }
                    console.log("$scope.list:"+res);
                }
                , function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
                .finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }



        $scope.showMoreInfoModal = function (palnum) {
            try {
                console.log(palnum);
                $scope.moreInfoModal.show();
                $scope.pickedItem = _.findWhere($scope.list, { 'PalleteNo': palnum });
                console.log("$scope.pickedItem:"+$scope.pickedItem);
            }
            catch (err) {
                console.log(err.message);
            }
        }

        $scope.PickItem = function (palnum) {
            LoadingService.StartLoading();
            if ($scope.filter.lot == true) {
                $scope.pickDetail.lot = '';
            }
            var qtyLeft = $scope.filter.qty == true ? 0 : $scope.pickDetail.qty;
           // $cordovaToast.show(qtyLeft, 'short', 'bottom');
            LocationPickingService.PickItem(palnum, $scope.pickDetail.lot, qtyLeft)
                .then(function (res) {
                    $scope.moreInfoModal.hide();
                    $scope.pickDetail = {};
                    $scope.GeItemToPick();
                    $cordovaToast.show(res.data, 'short', 'bottom');
                }, function (err) {
                    LoadingService.PopAlert('Something went wrong', err.data);
                }).finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.ResetFilter = function () {
            $scope.filter = {};
            $scope.filter.qty = false;
            $scope.filter.lot = true;
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

        $ionicModal.fromTemplateUrl('templates/moreInfoModal.html', {
            id: 'moreInfoModal',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.moreInfoModal = modal;
        });



        $scope.init();

    }]);

