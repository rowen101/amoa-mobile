app.factory('IssuanceService', ['$http', '$q', '$rootScope', 'LoginService', function ($http, $q, $rootScope, LoginService) {

    var IssuanceService = this;

    IssuanceService.IssuanceList = {};
    IssuanceService.IssuancePickList = {};
    IssuanceService.IssuancePalleteList = {};
    IssuanceService.userProfile = {};
    IssuanceService.wc = '';

    IssuanceService.getProfile = function () {
        IssuanceService.userProfile = LoginService.getProfile();
        IssuanceService.wc = IssuanceService.userProfile.warehouseCode;
        //   $http.defaults.headers.common['SERVERID'] = LoginService.userProfile.s; // FOR Header of server
        console.log(IssuanceService.userProfile);
    }

    IssuanceService.getIssuanceList = function () {
        IssuanceService.getProfile();
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-issuance-list?wc=' + IssuanceService.wc)
            .then(function (res) {
                IssuanceService.IssuanceList = res.data;
                defer.resolve(res);
            }, function (res) {
                console.log("error Get issuanceNo List");
                console.log(res);
                defer.reject(res);
            })

        return defer.promise;
    }

    IssuanceService.getIssuancePickList = function () {
        IssuanceService.getProfile();
        console.log('temcode' + $rootScope.issuanceNo);
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-issuance-pick-list?wc=' + IssuanceService.wc + '&issuanceNo=' + IssuanceService.issuanceNo + '')
            .then(function (res) {
                IssuanceService.IssuancePickList = res.data;
                console.log(res);
                defer.resolve(res);
            }, function (res) {
                console.log("error Get Issuance Picklist");
                console.log(res);
                defer.reject(res);
            });


        return defer.promise;
    }


    IssuanceService.getIssuancePalleteList = function () {
        IssuanceService.getProfile();
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-issuance-pallete-list?pickid=' + IssuanceService.IssuancePickId + '&issuanceNo=' + IssuanceService.issuanceNo + '&wc=' + IssuanceService.wc + '')
            .then(function (res) {
                IssuanceService.IssuancePalleteList = res.data;
                console.log(res);
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }

    IssuanceService.PickItem = function (palnum, lot, qty) {
        var objData = {
                 batchno : palnum,
                 confirmqty : qty,
                 warehouse : IssuanceService.wc,
                 crea_by : IssuanceService.userProfile.userId,
                 actuallot : lot
             }
            var defer = $q.defer();
             $http.post($rootScope.url + 'tm-sproc-confirm-issuance-pick',objData)
            .then(function (res) {
                defer.resolve(res);
            },function (res) {
                defer.reject(res)
            })

        return defer.promise;
    }

    return IssuanceService;
}])