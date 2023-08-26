
app.controller('WaveItemListCtrl', ['$scope', 'WavePickService', '$state', '$rootScope', 'LoadingService', '$cordovaBarcodeScanner', 'LoginService',
    function ($scope, WavePickService, $state, $rootScope, LoadingService, $cordovaBarcodeScanner, LoginService) {

        $scope.init = function () {
            LoadingService.StartLoading();
            $scope.wc = LoginService.userProfile.warehouseCode;
            $scope.GetItemList();
        }

        $scope.GetItemList = function () {
            WavePickService.GetItemList($scope.wc)
                .then(function (res) {
                    //success
                    $scope.list = WavePickService.itemList;
                    console.log($scope.list);
                }, function (err) {
                    LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+" Sorry we cant get the ItemCode-list of Warehouse '" + $scope.wc + "'. Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                }).finally(function () {
                    //stop ion refresher
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                })
        };

        $scope.redirectMe = function (itmCode) {
            WavePickService.itemCode = itmCode;
            WavePickService.itemDesc = _.findWhere($scope.list, { ItemCode: itmCode }).ItemDesc
            $state.go('app.waveitempicking');
        };


        $scope.goBack = function () {
            LoadingService.GoBack();
        }
        $scope.ScanBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.search = data.text;
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data);
            })
        }


        $scope.init();

    }]);
