app.service('CusPickingService', ['$http', '$q', '$rootScope', 'LoginService',
    function ($http, $q, $rootScope, LoginService) {

        var CusPickingService = this;
        CusPickingService.irnumb = '';
        CusPickingService.cusName = '';
        CusPickingService.zone = '';
        CusPickingService.loc = '';
       

        CusPickingService.GetCusList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-bycustomer-list-foruser?wc=' + wc+'&param='+LoginService.userProfile.alias)
                .then(function (res) {
                
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        CusPickingService.GetCusCodeList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-customer-list?wc=' + wc)
                .then(function (res) {
                
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        //Zone
        CusPickingService.getCustomerPickListbyAssignZone = function (wc,ir) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-byassignzone-list?wc=' + wc+'&ir='+ir+'&param='+LoginService.userProfile.alias)
                .then(function (res) {
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        //Location
        CusPickingService.getCustomerPickListbyLoc = function (wc,zone,ir) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-byzoneloc-list?wc=' + wc+'&zone='+zone+'&ir='+ir)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        //Item

        CusPickingService.GetWaveLocToPicks = function (wc,zone,ir,loc) {

            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-cus-item-list?wc='+wc+'&zone=' + zone+'&ir='+ir+'&loc='+loc)
                .then(function (res) {
                    console.log(res.data);
                    CusPickingService.locToPick = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        CusPickingService.GetWaveLocToPick = function (loc, wc) {

            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-myzone-loc-picking-list?loc='+loc+'&wc=' + wc)
                .then(function (res) {
                    CusPickingService.locToPick = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        //Item Picking

        CusPickingService.PickItem = function (palnum, lot, qty) {
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

        
// Get drop down list code
        CusPickingService.getItemCodeDropDown = function (param,itemcode) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-from-dropdown?param='+param+'&itemcode=' + itemcode)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        CusPickingService.getItemCode = function (param) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-itemuom-from-code?param='+param)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }



        return CusPickingService;
    }])