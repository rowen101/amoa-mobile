app.service('LocInquirySrv', ['$http', '$q', '$rootScope',
function ($http, $q, $rootScope) {

    var LocInquirySrv = this;

    LocInquirySrv.GetLocationMasterList = function(itemcode,wc,tk,pg)
    {
       var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-location-master-list?param='+itemcode+'&wc='+wc+'&tk='+tk+'&pg='+pg)
            .then(function (res) {
                 LocInquirySrv.locMasterListObj = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }
     
      LocInquirySrv.GetLocBatchInventoryList  = function (locCode, wc)//for item inventory 
        {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-loc-batch-inventory-list?locCode=' + locCode + '&wc=' + wc)
                .then(function (res) {
                    LocInquirySrv.BatchInventoryList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

     
    return LocInquirySrv;

}])