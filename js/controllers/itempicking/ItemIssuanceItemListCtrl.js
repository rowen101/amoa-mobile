//Issuance PickList Controller
app.controller('ItemPickIssuanceItemListCtrl', ['$scope', 'ItemPickingService', '$ionicLoading', 'LoadingService', '$rootScope', '$state','$cordovaBarcodeScanner','LoginService',
function ($scope, ItemPickingService, $ionicLoading, LoadingService, $rootScope, $state,$cordovaBarcodeScanner,LoginService,) {
   $scope.init = function () {
       LoadingService.StartLoading();
       $scope.issuanceNo = ItemPickingService.issuanceNo;
       $scope.GetIssuanceItemList();

   }

   $scope.GetIssuanceItemList = function () {
       ItemPickingService.GetIRItemList(LoginService.userProfile.warehouseCode,$scope.issuanceNo)
           .then(function (res) {
               $scope.ItemList = ItemPickingService.IRItemList;
               console.log(res);
               if ($scope.ItemList.length === 0) {
                   $state.go('app.636385913371875412');
               }
           }, function (err) {
               LoadingService.PopAlert("Something went wrong","Error Message: "+err.data+" Sorry we cant get the ItemList of Issuance '" + $scope.issuanceNo + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
           }).
           finally(function () {
               LoadingService.StopLoading();
               $scope.$broadcast('scroll.refreshComplete');
           })



   }

   $scope.redirectMe = function (item) {
     ItemPickingService.IRItemCode = item;
       $state.go('app.itempickissuancepalletelist');
   }

       $scope.ScanBarcode = function(){
       $cordovaBarcodeScanner.scan().then(function(data){
       if(!data.cancelled)
       {
           $scope.searchPickList = data.text;
       } 
       },function(err){
           LoadingService.PopAlert("Something went wrong", err.data);
       })
   }


   $scope.init();

}]);

