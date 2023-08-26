app.service('StockTransferSrv', ['$http', '$q', '$rootScope', 'LoginService',
function ($http, $q, $rootScope,LoginService) {


    var StockTransferSrv = this;

    StockTransferSrv.GetBatchInventoryList = function(param, wc){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-stock-transfer-list?param=' + param+'&wc='+ LoginService.userProfile.warehouseCode)
            .then(function (res) {
                StockTransferSrv.batchInventoryList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }


    StockTransferSrv.GetPutAwayList = function(param){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-put-away-list?param=' + param+'&locCode='+LoginService.userProfile.warehouseCode+'RCV&wc='+ LoginService.userProfile.warehouseCode)
            .then(function (res) {
                StockTransferSrv.putAwayList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    

    StockTransferSrv.CheckIfLocationExist = function(locationCode){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-check-if-location-exist?locationCode=' + locationCode + '&warehouseCode='+ LoginService.userProfile.warehouseCode)
            .then(function (res) {
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    StockTransferSrv.StocksTransfer = function(list, newLoc){
        var defer = $q.defer();
        var objModel = {
            list : list,
            newLocationCode : newLoc,
            userId : LoginService.userProfile.emailAlias
        };
        $http.post($rootScope.url + 'sproc-tm-stocks-transfer',objModel)
            .then(function (res) {
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }


    StockTransferSrv.GetTransferList = function(){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-autotransfer-list?wc='+LoginService.userProfile.warehouseCode)
            .then(function (res) {
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    StockTransferSrv.GetStockTransferConfirmation = function(batchnumber,wc,trancode,crea){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-stocktransfer-confirm?batchnumber='+batchnumber+'&warcode=' + LoginService.userProfile.warehouseCode+'&trancode='+trancode+'&crea='+crea)
            .then(function (res) {
                defer.resolve(res);
            }, function (res) { 
                defer.reject(res);              
            })
        return defer.promise;
    }
    

    

    return StockTransferSrv;

}]);