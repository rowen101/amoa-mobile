app.controller('CycleCountController', ['$scope', 'LoginService', 'LoadingService', '$cordovaBarcodeScanner', '$cordovaToast', 'CycleCountSrv',
    function ($scope, LoginService, LoadingService, $cordovaBarcodeScanner, $cordovaToast, CycleCountSrv) {

        $scope.init = function () {
            $scope.batch = {};
            $scope.test = {};
        }

        $scope.GetBatchInfo = function (batchno) {
            CycleCountSrv.GetBatchInfo(batchno)
                .then(function (res) {
                    $scope.batch = res.data;
                    $scope.batchno = $scope.batch.batchno;
                    $scope.batch.mfgdate = new Date(CycleCountSrv.batchInfo.mfgdate);
                    $scope.batch.expdate = new Date(CycleCountSrv.batchInfo.expdate);
                    $cordovaToast.show('Received data', 'short', 'bottom');
                }, function (err) {
                    console.log(err);
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
        }

        $scope.CycleCount = function () {
            CycleCountSrv.UpdateCycleCount($scope.batch.batchno, $scope.batch.actualqty)
                .then(function (res) {
                    $cordovaToast.show('Saved Completed', 'short', 'bottom');
                    $scope.ClearBatch();
                },
                function (err) {
                    LoadingService.PopAlert("Something went wrong", err.data);
                })
        }

        $scope.ClearBatch = function () {
            $scope.batch = {};
        }

        $scope.ScanBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.batchno = data.text;
                    $scope.GetBatchInfo(data.text);
                }
            }, function (err) {
                LoadingService.PopAlert("Cannot scan barcode", err.data);
            })
        }



        $scope.goBack = function () {
            LoadingService.GoBack();
        }

        $scope.init();
    }
])