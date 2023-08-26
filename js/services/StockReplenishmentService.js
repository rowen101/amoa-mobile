app.service('StockReplenishmentSrv', ['$http', '$q', '$rootScope', 'LoginService',
    function ($http, $q, $rootScope, LoginService) {
        var StockReplenishmentSrv = this;

        StockReplenishmentSrv.itemToReplenish = {};
        StockReplenishmentSrv.locationList = [];

        StockReplenishmentSrv.GetItemForReplenishment = function () {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-for-replenishment?wc=' + LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    StockReplenishmentSrv.itemForRepList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }

        StockReplenishmentSrv.GetReplenishmentBatchInventory = function (wc, itemcode) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-replenishment-batch-inventory?wc=' + wc + '&itemcode=' + itemcode)
                .then(function (res) {
                    StockReplenishmentSrv.batchInvList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }

        StockReplenishmentSrv.GetLocList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-picking-loc-list?wc='+wc)
                .then(function (res) {
                    StockReplenishmentSrv.locationList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }

        StockReplenishmentSrv.ReplenishStock = function (list, location, timestamp, itemCode, userId) {
            var defer = $q.defer();
            var objData = {
                list: list,
                userId: userId,
                timestamp: timestamp,
                suggestedLocation: location,
                ItemCode : itemCode
            }
            $http.post($rootScope.url + 'tm-replenish-stock', objData)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }


        return StockReplenishmentSrv;
    }]);