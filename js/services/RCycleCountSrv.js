app.service('RCycleountSrv', ['$http', '$q', '$rootScope', 'LoginService',
function ($http, $q, $rootScope,LoginService) {


    var RCycleountSrv = this;
    RCycleountSrv.itemMaster = {};
    RCycleountSrv.itemListObj = [];
    RCycleountSrv.GetRCCCount = function(){
        var defer = $q.defer();
        
        $http.get($rootScope.url + 'tm-get-randomcyclecount-count?wc='+ LoginService.userProfile.warehouseCode+'&empid='+ LoginService.userProfile.emailAlias)
            .then(function (res) {
                RCycleountSrv.itemMaster.total = res.data.total;
                RCycleountSrv.itemMaster.response = res.data.response;
                RCycleountSrv.itemMaster.CCID = res.data.CCID;  
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                
            })
        return defer.promise;
    }


    RCycleountSrv.GetRCCList = function(rn){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-randomcyclecount-list?randomnumber='+ rn +'&wc='+ LoginService.userProfile.warehouseCode)
            .then(function (res) {
            
                RCycleountSrv.itemListObj = res.data;
                console.log(res);
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    RCycleountSrv.PostHeaderRCC = function(list,total){
        var rcc = { list: list, total: total,wc: LoginService.userProfile.warehouseCode,emplid: LoginService.userProfile.emailAlias};
        
        var defer = $q.defer();
        $http.post($rootScope.url + 'tm-post-header-randomcyclecount',rcc)
            .then(function (res) {
                
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }


 
    

    

    return RCycleountSrv;

}]);