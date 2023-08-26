app.service('ItemPickingService', ['$http', '$q', '$rootScope', 'LoginService',
    function ($http, $q, $rootScope, LoginService) {

        var ItemPickingService = this;
        ItemPickingService.fromzone = '';
        ItemPickingService.picklistId = '';
        ItemPickingService.issuanceNo = '';
        ItemPickingService.IRItemCode = '';
        ItemPickingService.zone = '';
        ItemPickingService.zonePickId = '';

        ItemPickingService.GetPicklist = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-pick-list?wc=' + wc)
                .then(function (res) {
                    ItemPickingService.picklist = res.data;
                    console.log("GetPicklist: "+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ItemPickingService.GeItemToPick = function (picklistId, wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-picklist-picking?pickid=' + picklistId + '&wc=' + wc)
                .then(function (res) {
                    ItemPickingService.pickingList = res.data;
                    console.log("GeItemToPick: "+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ItemPickingService.PickItem = function (palnum, lot, qty) {
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


        ItemPickingService.GetIRList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-issuance-list?wc=' + wc)
                .then(function (res) {
                    ItemPickingService.issuanceList = res.data;
                    console.log("GetIRList: "+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }
        
        ItemPickingService.GetIRItemList = function (wc,issuanceNo) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-pick-issuance-item-list?wc=' + wc + '&issuanceNo='+issuanceNo)
                .then(function (res) {
                    ItemPickingService.IRItemList = res.data;
                    console.log("GetIRItemList: "+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }
       

        ItemPickingService.GetIRToPick = function (ir, itemCode, wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-ir-picking?ir=' + ir + '&itemCode='+itemCode+'&wc=' + wc)
                .then(function (res) {
                    ItemPickingService.irToPick = res.data;
                    console.log("GetIRToPick: "+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


        ItemPickingService.GetZoneList = function (wc) {
            var defer = $q.defer();
        
            $http.get($rootScope.url + 'tm-get-zone-list?wc=' + wc)
                .then(function (res) {
                    ItemPickingService.zoneList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }
  

        ItemPickingService.GetZonePickList = function (wc,zone) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-zone-pick-list?wc=' + wc + '&zone=' + zone )
                .then(function (res) {
                    ItemPickingService.zonePickList = res.data;
                    console.log("GetZonePickList: "+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
    
            return defer.promise;
        }

        ItemPickingService.GetZoneToPick = function (zone, pickId,wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-zone-picking?zone=' + zone + '&pickid=' + pickId+'&wc=' + wc)
                .then(function (res) {
                    ItemPickingService.zoneToPick = res.data;
                    console.log("GetZoneToPick: "+res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


        ItemPickingService.GetMyZoneList = function (wc) {
            var defer = $q.defer();
            console.log(wc);
            $http.get($rootScope.url + 'tm-get-myzone-list?wc=' + wc+'&param='+LoginService.userProfile.alias)
                .then(function (res) {
                    ItemPickingService.zoneList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }


        ItemPickingService.GetItemList = function (wc,zone) {
            var defer = $q.defer();
            console.log(wc);
            $http.get($rootScope.url + 'tm-get-myzoneitem-code-list?wc=' + wc+'&zone='+zone)
                .then(function (res) {
                    ItemPickingService.itemList = res.data;
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }




        
        ItemPickingService.GetWaveItemToPick = function (itemCode, wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-wave-item-picking-list?itemCode='+itemCode+'&wc=' + wc)
                .then(function (res) {
                    ItemPickingService.locToPick = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })

            return defer.promise;
        }

        



        return ItemPickingService;
    }])