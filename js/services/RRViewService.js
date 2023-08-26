app.service('RRViewSrv',  ['$q', '$rootScope', '$http', 'LoginService',
    function ($q, $rootScope, $http, LoginService) {
    var RRViewSrv = this;


  RRViewSrv.getProfile = function () {
        RRViewSrv.userProfile = LoginService.getProfile();
        RRViewSrv.wc = RRViewSrv.userProfile.warehouseCode;
    }

    RRViewSrv.GetRRList = function(param,tk,pg){
        RRViewSrv.getProfile();
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-open-rr-list?param='+param+'&wc=' + RRViewSrv.wc+'&tk=' + tk + '&pg=' + pg)
            .then(function (res) {
                RRViewSrv.rrList = res.data;
               // console.log("RRViewSrv.rrList:"+res.data);
                
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }

    RRViewSrv.GetRRListwUnit = function(param,tk,pg){
        RRViewSrv.getProfile();
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-open-rr-listwUnit?param='+param+'&wc=' + RRViewSrv.wc+'&tk=' + tk + '&pg=' + pg)
            .then(function (res) {
                RRViewSrv.rrList = res.data;
                console.log("RRViewSrv.rrList:"+res);
                
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }


    return RRViewSrv;
}])