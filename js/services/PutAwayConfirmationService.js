


/*app.service('PutAwayConfirmationService', ['$http', '$q', '$rootScope','LoginService',
function ($http, $q, $rootScope,LoginService) {

        var PutAwayConfirmationService = this;
        console.log(LoginService.userProfile.warehouseCode);
        PutAwayConfirmationService.itemMaster = {};

        PutAwayConfirmationSRV.GetAutoPutAwayList = function (param,wc, tk, pg,select,sc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-autoputaway-listed?param='+ param + '&wc='+LoginService.userProfile.warehouseCode+'&tk=' + tk + '&pg=' + pg+'&selected='+select+'&sc='+sc)
                .then(function (res) {
                    //PutAwayConfirmationSRV.itemPutawayListObj = res.data;
                    console.log("Okie:"+res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log("reject:"+res);
                })
            return defer.promise;
        } */

    /*    app.service('PutAwayConfirmationService',  ['$q', '$rootScope', '$http', 'LoginService',
        function ($q, $rootScope, $http, LoginService) {
        var PutAwayConfirmationService = this;
        PutAwayConfirmationService.itemMaster = {};
        PutAwayConfirmationService.itemListObj = [];
    
     
        PutAwayConfirmationService.GetActiveItemMasterList = function(param, tk, pg,select,sc){
            
            console.log($rootScope.url + 'tm-get-autoputaway-listed?param='+ param + '&wc='+LoginService.userProfile.warehouseCode+'&tk=' + tk + '&pg=' + pg+'&selected='+select+'&sc='+sc);
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-autoputaway-listed?param='+ param + '&wc='+LoginService.userProfile.warehouseCode+'&tk=' + tk + '&pg=' + pg+'&selected='+select+'&sc='+sc)
                .then(function (res) {
                    PutAwayConfirmationService.itemListObj = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }



        PutAwayConfirmationService.GetAutoPutAwayConfirmation = function(batchnumber,wc,trancode,crea){
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-autoputaway-confirm?batchnumber='+batchnumber+'&warcode=' + LoginService.userProfile.warehouseCode+'&trancode='+trancode+'&crea='+crea)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) { 
                    defer.reject(res);              
                })
            return defer.promise;
        }

        return PutAwayConfirmationService;

    }]) */


    app.service('PutAwayConfirmationSRV', ['$http', '$q', '$rootScope', 'LoginService',
function ($http, $q, $rootScope,LoginService) {


    var PutAwayConfirmationSRV = this;
    PutAwayConfirmationSRV.itemMaster = {};
    

    PutAwayConfirmationSRV.GetActiveItemMasterList = function(param, tk, pg,select,sc){
        var defer = $q.defer();
        
        $http.get($rootScope.url + 'tm-get-autoputaway-list?param='+ param + '&wc='+LoginService.userProfile.warehouseCode+'&tk=' + tk + '&pg=' + pg+'&selected='+select+'&sc='+sc)
            .then(function (res) {
                PutAwayConfirmationSRV.itemListObj = res.data;
            
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }


    PutAwayConfirmationSRV.GetPutAwayList = function(){
        var defer = $q.defer();
        
        $http.get($rootScope.url + 'tm-get-autoputawayall-list?wc='+LoginService.userProfile.warehouseCode)
            .then(function (res) {
                PutAwayConfirmationSRV.itemListObj = res.data;
            
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    PutAwayConfirmationSRV.GetActiveItemMasterListReplenish = function(){
        var defer = $q.defer();
        
        $http.get($rootScope.url + 'tm-get-autoreplenishment-list?&wc='+LoginService.userProfile.warehouseCode)
            .then(function (res) {
                PutAwayConfirmationSRV.itemListObj = res.data;
            
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    
    PutAwayConfirmationSRV.GetAutoPutAwayConfirmation = function(batchnumber,wc,trancode,crea){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-autoputaway-confirm?batchnumber='+batchnumber+'&warcode=' + LoginService.userProfile.warehouseCode+'&trancode='+trancode+'&crea='+crea)
            .then(function (res) {
                defer.resolve(res);
            }, function (res) { 
                defer.reject(res);              
            })
        return defer.promise;
    }

    PutAwayConfirmationSRV.GetStockReplenishmentConfirmation = function(batchnumber,wc,trancode,crea){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-stockreplenishment-confirm?batchnumber='+batchnumber+'&warcode=' + LoginService.userProfile.warehouseCode+'&trancode='+trancode+'&crea='+crea)
            .then(function (res) {
                defer.resolve(res);
            }, function (res) { 
                defer.reject(res);              
            })
        return defer.promise;
    }

 
    

    

    return PutAwayConfirmationSRV;

}]);