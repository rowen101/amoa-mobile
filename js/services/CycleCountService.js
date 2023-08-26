app.factory('CycleCountSrv', ['$http', '$q', '$rootScope', 'LoginService', '$filter',
function ($http, $q, $rootScope, LoginService, $filter) {

    var CycleCountSrv = this;

    CycleCountSrv.GetBatchInfo = function(batchno){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-cyclecount-details?batchno=' + batchno + '&warehouse='+  LoginService.userProfile.warehouseCode)
            .then(function (res) {
                CycleCountSrv.batchInfo = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    CycleCountSrv.UpdateCycleCount = function(batchno, qty){
        var defer = $q.defer();
        $http.put($rootScope.url + 'tm-update-cyclecount?batchno=' + batchno + '&warehouse='+  LoginService.userProfile.warehouseCode +'&qty='+qty)
            .then(function (res) {
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    return CycleCountSrv;
}])