app.service('LocationPickingService', ['$http', '$q', '$rootScope', 'LoginService',
    function ($http, $q, $rootScope, LoginService) {

        var LocationPickingService = this;
        LocationPickingService.picklistId = '';
        LocationPickingService.issuanceRequest = '';
        LocationPickingService.zone = '';
        LocationPickingService.fromzone = '';

        LocationPickingService.GetPicklist = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-pick-list?wc=' + wc)
                .then(function (res) {
                    LocationPickingService.picklist = res.data;
                    console.log("GetPicklist:"+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        LocationPickingService.GeItemToPick = function (picklistId, wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-loc-picklist-picking?pickid=' + picklistId + '&wc=' + wc)
                .then(function (res) {
                    LocationPickingService.pickingList = res.data;
                    console.log("GeItemToPick:"+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        LocationPickingService.PickItem = function (palnum, lot, qty) {
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


        LocationPickingService.GetIRList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-issuance-list?wc=' + wc)
                .then(function (res) {
                    LocationPickingService.issuanceList = res.data;
                    console.log("GetIRList:"+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        LocationPickingService.GetIRToPick = function (ir, wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-loc-ir-picking?ir=' + ir + '&wc=' + wc)
                .then(function (res) {
                    LocationPickingService.irToPick = res.data;
                    console.log("GetIRToPick:"+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


        LocationPickingService.GetZoneList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-zone-list?wc=' + wc)
                .then(function (res) {
                    LocationPickingService.zoneList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

    
   


        LocationPickingService.getMyZoneList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-myzone-list?wc=' + wc+'&param='+LoginService.userProfile.alias)
                .then(function (res) {
                    LocationPickingService.zoneList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        LocationPickingService.GetLocationList = function (wc,zone) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-myzoneloc-list?wc=' + wc+'&zone='+zone)
                .then(function (res) {
                    LocationPickingService.locList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }


        LocationPickingService.GetWaveLocToPick = function (loc, wc) {

            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-myzone-loc-picking-list?loc='+loc+'&wc=' + wc)
                .then(function (res) {
                    LocationPickingService.locToPick = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }


        return LocationPickingService;
    }])