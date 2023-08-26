app.service('WavePickService', ['$http', '$q', '$rootScope', 'LoginService',
    function ($http, $q, $rootScope, LoginService) {

        var WavePickService = this;
        WavePickService.loc = '';
        WavePickService.itemCode = '';
        WavePickService.itemDesc  = '';
      WavePickService.GetLocationList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-loc-list?wc=' + wc)
                .then(function (res) {
                    WavePickService.locList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        WavePickService.GetWaveLocToPick = function (loc, wc) {
            var defer = $q.defer();
            console.log("wc is "+ wc)
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-wave-loc-picking-list?loc='+loc+'&wc=' + wc)
                .then(function (res) {
                    WavePickService.locToPick = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

  WavePickService.GetItemList = function (wc) {
      console.log(wc);
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-code-list?wc=' + wc)
                .then(function (res) {
                    WavePickService.itemList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }
      
        WavePickService.GetWaveItemToPick = function (itemCode, wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-wave-item-picking-list?itemCode='+itemCode+'&wc=' + wc)
                .then(function (res) {
                    WavePickService.locToPick = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        WavePickService.PickItem = function (palnum, lot, qty) {
            var objData = {
                batchno: palnum,
                confirmqty: qty,
                warehouse: LoginService.userProfile.warehouseCode,
                crea_by: LoginService.userProfile.emailAlias,
                actuallot: lot
            }
            var defer = $q.defer();
            $http.post($rootScope.url + 'tm-sproc-confirm-issuance-pick', objData)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res)
                })
            return defer.promise;
        }



  
        return WavePickService;
    }])