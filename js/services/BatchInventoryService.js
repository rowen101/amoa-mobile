app.factory('BatchInventorySrv', ['$http', '$q', '$rootScope',  
function ($http, $q, $rootScope) {

    var BatchInventorySrv = this;




//     BatchInventorySrv.GetBatchInventoryLocItem = function (param) {//for location and item code as param
//         var defer = $q.defer();
//         $http.get($rootScope.url + 'tm-get-batch-inventory-location-item-list?param='+param+'&wc=' + LoginService.userProfile.warehouseCode)
//             .then(function (res) {
//                 BatchInventorySrv.BatchInventoryList = res.data;
//                 defer.resolve(res);
//             }, function (res) {
//                 defer.reject(res);
//             })

//         return defer.promise;
//     }

//  BatchInventorySrv.GetBatchInventoryBlLot= function (param) {//for bl# and lot# as param
//         var defer = $q.defer();
//         $http.get($rootScope.url + 'tm-get-batch-inventory-bl-lot-list?param='+param+'&wc=' + LoginService.userProfile.warehouseCode)
//             .then(function (res) {
//                 BatchInventorySrv.BatchInventoryList = res.data;
//                 defer.resolve(res);
//             }, function (res) {
//                 defer.reject(res);
//             })

//         return defer.promise;
//     }

     BatchInventorySrv.GetBatchInquiryList= function (param,wc,tk,pg) {//for bl# and lot# as param
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-batch-inquiry-list?param='+param+'&wc='+wc+'&tk='+tk+'&pg='+pg)
            .then(function (res) {
                BatchInventorySrv.BatchInquiryObj = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }





    return BatchInventorySrv;
}])