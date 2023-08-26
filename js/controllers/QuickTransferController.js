app.controller('QuickTransferController', ['$scope', 'LoginService', 'LoadingService', '$cordovaBarcodeScanner', '$cordovaToast', 'QuickTransferSrv',
    function ($scope, LoginService, LoadingService, $cordovaBarcodeScanner, $cordovaToast, QuickTransferSrv) {

        $scope.init = function () {
            $scope.params = {};
            $scope.batch = {};
        }

        $scope.GetBatchInquiry = function (batchno) {
            $scope.ClearBatch();
            console.log(batchno);
            if (batchno) {
                QuickTransferSrv.GetBatchInquiry(batchno)
                    .then(function (res) {
                        console.log(res);
                        $scope.batch = res.data;
                        $scope.batch.ManufacturingDate = new Date(QuickTransferSrv.batchInfo.ManufacturingDate);
                        $scope.batch.ExpiryDate = new Date(QuickTransferSrv.batchInfo.ExpiryDate);
                        $cordovaToast.show('Received data', 'short', 'bottom');
                    }, function (err) {
                        console.log(err);
                        LoadingService.PopAlert("Something went wrong", err.data);
                    })
            }
        }

        $scope.StockTransfer = function () {
            QuickTransferSrv.StocksTransfer($scope.batch, $scope.params.location)
                .then(
                function (res) {
                    $cordovaToast.show(res.data, 'short', 'bottom');
                    $scope.ClearAll();
                }, function (err) {
                    LoadingService.PopAlert("Can't Transfer Item", err.data);
                })
        }


        $scope.ClearBatch = function () {
            $scope.batch = {};
        }

        //for batch label
        $scope.ScanBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.params.batchno = data.text;
                    $scope.GetBatchInquiry($scope.params.batchno);
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }

        $scope.ScanLocation = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.params.location = data.text;
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }

        $scope.ClearAll = function () {
            $scope.batch = {};
            $scope.params.batchno = "";
            $scope.params.location = "";
        }



        $scope.goBack = function () {
            LoadingService.GoBack();
        }

        $scope.init();
    }
])