app.service('ItemMasterSrv', ['$http', '$q', '$rootScope',
    function ($http, $q, $rootScope) {

        var ItemMasterSrv = this;

        ItemMasterSrv.itemMaster = {};

        ItemMasterSrv.GetActiveItemMasterList = function (param, wc, tk, pg) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-active-item-master-list?param=' + param + '&wc='+wc+'&tk=' + tk + '&pg=' + pg)
                .then(function (res) {
                    console.log(res)
                    ItemMasterSrv.itemListObj = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ItemMasterSrv.BarcodeUpdate = function (ic, bc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-barcode-update?itemcode=' + ic + '&barcode=' + bc)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        //ItemMasterSrv.GetItemOnHandList = function(itemcode,wc)
        ItemMasterSrv.GetItemOnHandList = function (itemcode, wc, tk, pg) {
            console.log(pg);
            var defer = $q.defer();
            //$http.get($rootScope.url + 'tm-get-item-on-hand-list?param='+itemcode+'&wc='+wc)
            $http.get($rootScope.url + 'tm-get-item-on-hand-list?param=' + itemcode + '&wc=' + wc + '&tk=' + tk + '&pg=' + pg)
                .then(function (res) {
                    // ItemMasterSrv.itemInventoryList = res.data;
                    ItemMasterSrv.itemInventoryListObj = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ItemMasterSrv.GetItemBatchInventoryList = function (itemcode, wc)//for item inventory 
        {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-batch-inventory-list?itemcode=' + itemcode + '&wc=' + wc)
                .then(function (res) {
                    ItemMasterSrv.BatchInventoryList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ItemMasterSrv.GetItemCode = function (param)//for item inventory 
        {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-from-code?param=' + param)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }




        return ItemMasterSrv;

    }])