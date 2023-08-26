app.controller('BatchInquiryCtrl', ['$scope', 'LoginService', '$ionicModal', 'LoadingService', 'BatchInventorySrv', '$cordovaBarcodeScanner', 'StorageService', 'filterFilter', '$timeout', 
    function ($scope, LoginService, $ionicModal, LoadingService, BatchInventorySrv, $cordovaBarcodeScanner, StorageService, filterFilte, $timeout) {

        var tk = 20;
        var page = 0;
        $scope.batchMaster = {};
        $scope.batchInquiryList = [];
        $scope.moreDataCanBeLoaded = false;

        $scope.init = function () {
            $scope.searchParam = '';
            $scope.GetBatchInquiryList('', 1);
        }

        $scope.goBack = function () {
            LoadingService.GoBack();
        }

        $scope.resetCanBeLoaded = function (param) {
            if (param != $scope.selectedParam) {
                $scope.moreDataCanBeLoaded = true;
            }
        }

        $scope.setParam = function (param) {
            $scope.selectedParam = param;
        }

        $scope.ResetItemList = function () {
            $scope.batchInquiryList = [];
        }


        $scope.GetBatchInquiryList = function (param, pg) //used for drag down to refresh
        {
            var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
            $scope.moreDataCanBeLoaded = false;
            
            if (!param) {
                param = '';
            }
            if ($scope.selectedParam != param) {
                $scope.setParam(param);
                pg = 1;
                page = 1;
                $scope.batchInquiryList = [];
            }
            if (pg == 1) {
                page = 1;
                $scope.batchInquiryList = [];
            }
            LoadingService.StartLoading();
            BatchInventorySrv.GetBatchInquiryList(param, LoginService.userProfile.warehouseCode, tk, pg)
                .then(function (res) {
                    console.log(res);
                    $scope.itemCount = BatchInventorySrv.BatchInquiryObj.totalItem;
                    for (var i = 0; i < BatchInventorySrv.BatchInquiryObj.list.length; i++) {
                        $scope.batchInquiryList.push(BatchInventorySrv.BatchInquiryObj.list[i]);
                    }
                    $scope.moreDataCanBeLoaded = BatchInventorySrv.BatchInquiryObj.canNext;

                }, function (err) {
                    $scope.moreDataCanBeLoaded = false;
                    page--;
                    LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                    $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                }).finally(function (res) {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.loadMore = function (param) {
            page++;
            $scope.GetBatchInquiryList(param, page);
        };

        $scope.setBatchMaster = function (batchno) {
            console.log(batchno);
            $scope.item = _.findWhere($scope.batchInquiryList, { BatchNo: batchno });
            console.log($scope.item);
        }

        $scope.SearchBarcode = function () {//for searching
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.searchParam = data.text;
                    $scope.GetBatchInquiryList($scope.searchParam, 1);
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data.message);
            })
        }

        $ionicModal.fromTemplateUrl('templates/stockiteminfomodal.html', {
            id: 'stockiteminfomodal',
            scope: $scope
        }).then(function (modal) {
            $scope.stockiteminfomodal = modal;
        });





        $scope.init();
    }
])