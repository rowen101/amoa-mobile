app.factory('QuickTransferSrv', ['$http', '$q', '$rootScope', 'LoginService', '$filter',
    function ($http, $q, $rootScope, LoginService, $filter) {

        var QuickTransferSrv = this;

        QuickTransferSrv.GetBatchInquiry = function (param) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-batch-inventory?param=' + param + '&wc=' + LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    QuickTransferSrv.batchInfo = res.data;
                    console.log(res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        QuickTransferSrv.StocksTransfer = function (batch, newLoc) {
            var defer = $q.defer();
            var objModel = {
                batch: batch,
                newLocationCode: newLoc,
                userId: LoginService.userProfile.emailAlias
            };
            $http.post($rootScope.url + 'sproc-tm-stocks-transfer', objModel)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }



        QuickTransferSrv.StocksTransferring = function (batch) {
            console.log("Batch",batch);
            var defer = $q.defer();
            var objModel = {
                batch: batch,
                newLocationCode: batch.SuggestedLocationCode,
                userId: LoginService.userProfile.emailAlias
            };
            console.log("objModel",objModel);
            $http.post($rootScope.url + 'sproc-tm-stocks-transferauto', objModel)
                .then(function (res) {
                    defer.resolve(res);
                    
                }, function (res) {
                    defer.reject(res);
                    console.log("res",res);
                })
            return defer.promise;
        }



        QuickTransferSrv.GetBatch = function (param) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-quick-stock-transfer?param=' + param + '&wc=' + LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    QuickTransferSrv.batchInfo = res.data;
                    console.log(res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }



        return QuickTransferSrv;
    }])