app.controller('StockReplenishmentListCtrl', ['$scope', '$ionicModal', 'LoadingService', 'StockReplenishmentSrv', '$cordovaBarcodeScanner','StorageService','$state',
 function ($scope, $ionicModal, LoadingService,StockReplenishmentSrv, $cordovaBarcodeScanner, StorageService,$state) {

     $scope.init = function(){
         $scope.itemForRepList = [];
         $scope.GetItemList();
         $scope.GetItemForReplenishment();
         $scope.item = {};
     }

     $scope.GetItemForReplenishment = function(){
           LoadingService.StartLoading();
           StockReplenishmentSrv.GetItemForReplenishment()
           .then(function(res){
               $scope.itemForRepList = StockReplenishmentSrv.itemForRepList;
               console.log($scope.itemForRepList);
           },function(err){
               console.log(err);
               LoadingService.PopAlert('Something went wrong', err.data);
           }).finally(function(){
               LoadingService.StopLoading();  
               $scope.$broadcast('scroll.refreshComplete');
           })
     }
     
     $scope.GetItemList = function(){
         $scope.searchList =  $scope.searchList = StorageService.getSearchlist();
         $scope.itemList = _.where($scope.searchList,{type:'item'});
     }


     $scope.ScanBarcode = function(){
         $cordovaBarcodeScanner.scan().then(function(data){
             if(!data.cancelled)
             {
                 $scope.searchParam = data.text.toUpperCase();
             }
         },function(err){
             LoadingService.PopAlert("Something went wrong", err.data);
         })
     }
     
     
     $ionicModal.fromTemplateUrl('templates/replenishmentmoreinfomodal.html', {
         id : 'replenishmentmoreinfomodal',
         scope: $scope
     }).then(function(modal) {
         $scope.replenishmentmoreinfomodal = modal;
     });
     
     $scope.GetItemInfo = function(itemcode){
         $scope.item = _.findWhere( $scope.itemForRepList, { ItemCode : itemcode});
     }
     
     $scope.SelectItem = function(param){
          $scope.searchParam = param;
          $scope.selectedParam = param;
     }
     
     $scope.ReplenishItem = function(){
         StockReplenishmentSrv.itemToReplenish = $scope.item;
         $scope.replenishmentmoreinfomodal.hide();
         $state.go('app.stockreplenishment');
    }
     
     


     $scope.goBack = function(){
         LoadingService.GoBack();
     }

     $scope.init();
 }])
