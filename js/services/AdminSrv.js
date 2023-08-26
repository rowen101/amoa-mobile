app.factory('AdminSrv', ['$http', '$q', '$rootScope', 'LoginService' , 
function ($http, $q, $rootScope,LoginService) {

    var AdminSrv = this;
    AdminSrv.zone = '';





    AdminSrv.GetzonelistForAvailable= function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-zone-list-tobe-assign?wc='+LoginService.userProfile.warehouseCode)
            .then(function (res) {
               console.log(res.data);
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }


    AdminSrv.GetzonelistUsers= function (zone) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-zone-listusers-assign?wc='+LoginService.userProfile.warehouseCode+'&zone='+zone+'&id='+LoginService.userProfile.warehouseId)
            .then(function (res) {
               console.log(res.data);
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }





    return AdminSrv;
}])