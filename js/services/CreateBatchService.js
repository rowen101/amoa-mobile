app.factory('CreateBatchSrv', ['$http', '$q', '$rootScope', 'LoginService', '$filter',
    function ($http, $q, $rootScope, LoginService, $filter) {

        var CreateBatchSrv = this;
        CreateBatchSrv.itemcde = '';
        CreateBatchSrv.SetItem = function (itm) {
            CreateBatchSrv.itemcde = itm;
        }


        CreateBatchSrv.ViewQtyList = function (param) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-open-viewqty-list?param=' + param+'&wc='+ LoginService.userProfile.warehouseCode)
                .then(function (res) {
                   
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }





        CreateBatchSrv.GetItemInfo = function (param) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-info?param=' + param)
                .then(function (res) {
                    console.log(res.data);

                    CreateBatchSrv.ItemInfo = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }


        CreateBatchSrv.GetItemInfos = function (param,rrnumb) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-infos?param=' + param+ '&rrnumb='+rrnumb+'&wc='+LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    console.log(res.data);

                    CreateBatchSrv.ItemInfo = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }

        


       


        CreateBatchSrv.GetMfgExpiry = function (lotno, itemcode) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-mfg-expiry?lotno=' + lotno + '&itemcode=' + itemcode)
                .then(function (res) {
                    
                    CreateBatchSrv.MfgExpiry = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }

        CreateBatchSrv.SetRRNumber = function (rrNum) {
            CreateBatchSrv.selectedRRNumber = rrNum;
        }

       

        CreateBatchSrv.CreateNewBatch = function (branchObj) {
            var dup = JSON.parse(JSON.stringify(branchObj));
           
            dup.mfgdate = $filter('date')(dup.mfgdate, "yyyy/MM/dd");
            dup.expdate = $filter('date')(dup.expdate, "yyyy/MM/dd");
            console.log("1:"+dup);
            var defer = $q.defer();
            $http.post($rootScope.url + 'tm-create-new-batch', dup)
                .then(function (res) {
               //     console.log("DATA:",res.data);
                  
             
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log("DATA:",res);
                })
            return defer.promise;
        }


        CreateBatchSrv.CreateNewBatchWunit = function (branchObj) {
            
            var dup = JSON.parse(JSON.stringify(branchObj));
           
            dup.mfgdate = $filter('date')(dup.mfgdate, "yyyy/MM/dd");
            dup.expdate = $filter('date')(dup.expdate, "yyyy/MM/dd");
            console.log(dup);
            var defer = $q.defer();
            $http.post($rootScope.url + 'tm-create-new-batchwithunit', dup)
                .then(function (res) {
                    console.log("DATA:",res.data);
                  
             
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log("DATA:",res);
                })
            return defer.promise;
        }

        CreateBatchSrv.CaptureLog = function (menucode,menuname) {
            
           
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-open-viewqty-capture-logs?wc=' + LoginService.userProfile.warehouseCode + '&menucode=' + menucode+ '&menuname=' + menuname+ '&userid=' + LoginService.userProfile.userId)
                .then(function (res) {
                    console.log("DATA:",res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log("DATA:",res);
                })
            return defer.promise;
        }


        return CreateBatchSrv;
    }])


