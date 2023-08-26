//View Controller
app.controller('CheckerViewPickedCtrl', ['$scope', 'LoginService', 'LoadingService', '$http', '$rootScope', '$state','ViewTransactionSrv',
 function ($scope, LoginService, LoadingService, $http, $rootScope, $state,ViewTransactionSrv) {

    $scope.init = function () {
        $scope.type = {};
        $scope.type.selected = '1';
        $scope.userid = LoginService.userProfile.emailAlias;
        $scope.wc = LoginService.userProfile.warehouseCode;
        $scope.GetViews();
    }

    $scope.GetViews = function () {
        LoadingService.StartLoading();
            if ($scope.type.selected == 1) {
                ViewTransactionSrv.GetLastPickedItem($scope.userid)
                .then(function(res){
                    $scope.PickedItems = [];// clear
                     if(ViewTransactionSrv.lastItem)
                     {
                        $scope.noPickedItems = false;
                        $scope.PickedItems.push(ViewTransactionSrv.lastItem); 
                        $scope.viewHeader = $scope.PickedItems.PicklistID;
                     }
                     else
                     {
                        $scope.noPickedItems = true;
                        $scope.noPickedMessage = 'There is no record of an item being picked in the last 24 hours';
                     }
                },function(err){
                    console.log(err);
                     LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we can't get the last picked item. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                }).finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
            }
            else if ($scope.type.selected == 2) {
                ViewTransactionSrv.GetLastPickList($scope.userid)
                    .then(function (res) {
                    $scope.PickedItems = [];
                    console.log(res.data);
                    if (res.data.length != 0) {
                        $scope.noPickedItems = false;
                        $scope.PickedItems = ViewTransactionSrv.itemList;
                        $scope.viewHeader = $scope.PickedItems[0].PicklistID;
                    }
                    else{
                        $scope.noPickedItems = true;
                        $scope.noPickedMessage = 'There is no record of any item that has been picked in the last 24 hours';
                    }
                }, function (data) {
                    LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Sorry we can't get the last pick-list. Please try again later<br><br>Code : " + data.status + "<br> Status : " + data.statusText);
                }).finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
            }
            else if ($scope.type.selected == 3) {
                  ViewTransactionSrv.GetViewPickList($scope.userid)
                    .then(function (res) {
                     $scope.PickListItems = [];
                    if(res.data.length != 0){
                        $scope.noPickedItems = false;
                        $scope.PickListItems = ViewTransactionSrv.PickListItems;
                        $scope.viewHeader = '';
                    }
                    else{
                        $scope.noPickedItems = true;
                        $scope.noPickedMessage = 'There is no record of any picklist that has been picked in the last 24 hours';
                    }
                }, function (data) {
                    LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+" Sorry we can't get the pick-list. Please try again later<br><br>Code : " + data.status + "<br> Status : " + data.statusText);
                }).finally(function () {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
            }
        

    }

    $scope.redirect = function (pickid) {
        $rootScope.viewPickId = pickid;
        $state.go('app.checkerviewpalletelist')
    }

    $scope.goBack = function(){
        LoadingService.GoBack();
    }

    $scope.init();

}])