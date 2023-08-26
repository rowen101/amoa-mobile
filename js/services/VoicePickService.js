app.service('VoicePickSrv', ['$http', '$q', '$rootScope', 'LoginService',
function ($http, $q, $rootScope, LoginService) {

    var VoicePickSrv = this;
    VoicePickSrv.picklistId = '';
    VoicePickSrv.issuanceRequest = '';
    VoicePickSrv.zone = '';

    VoicePickSrv.GetPicklist = function (wc) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-vp-pick-list?wc=' + wc)
            .then(function (res) {
                VoicePickSrv.picklist = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }

    VoicePickSrv.GeItemToPick = function (picklistId, wc) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-vp-loc-picklist-picking?pickid=' + picklistId + '&wc=' + wc)
            .then(function (res) {
                VoicePickSrv.pickingList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }

    // VoicePickSrv.PickItem = function (palnum, lot, qty) {
    //     var objData = {
    //         batchno: palnum,
    //         confirmqty: qty,
    //         warehouse: LoginService.userProfile.warehouseCode,
    //         crea_by: LoginService.userProfile.emailAlias,
    //         actuallot: lot
    //     }
    //     var defer = $q.defer();
    //     $http.post($rootScope.url + 'tm-sproc-confirm-issuance-pick', objData)
    //         .then(function (res) {
    //             defer.resolve(res);
    //         }, function (res) {
    //             defer.reject(res)
    //         })
    //     return defer.promise;
    // }


    VoicePickSrv.GetIRList = function (wc) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-vp-issuance-list?wc=' + wc)
            .then(function (res) {
                VoicePickSrv.issuanceList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }

    VoicePickSrv.GetIRToPick = function (ir, wc) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-vp-loc-ir-picking?ir=' + ir + '&wc=' + wc)
            .then(function (res) {
                VoicePickSrv.irToPick = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }


    VoicePickSrv.GetZoneList = function (wc) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-vp-zone-list?wc=' + wc)
            .then(function (res) {
                VoicePickSrv.zoneList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }

    VoicePickSrv.GetZoneToPick = function (zone, wc) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-vp-loc-zone-picking?zone=' + zone + '&wc=' + wc)
            .then(function (res) {
                VoicePickSrv.zoneToPick = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }


    return VoicePickSrv;
}])