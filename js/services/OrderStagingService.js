app.service('OrderStagingService', ['$http', '$q', '$rootScope', 'LoginService',
    function ($http, $q, $rootScope, LoginService) {

        var OrderStagingService = this;
        OrderStagingService.ir = '';
        OrderStagingService.loc = '';
        OrderStagingService.issuanceList = [];
        OrderStagingService.locList = [];
       

        OrderStagingService.getStagingIRList = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-irstaging-list?wc=' + wc)
                .then(function (res) {
                    OrderStagingService.issuanceList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        OrderStagingService.getLocStaging = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-locstaging-list?wc=' + wc)
                .then(function (res) {
                    OrderStagingService.locList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        OrderStagingService.TransfertoStaging = function (ir,loc,wc,ea,notes) {
            var defer = $q.defer();
            console.log(ir,loc,wc,ea,notes);
            $http.get($rootScope.url + 'tm-get-trasnfer-staging-list?ir=' + ir+'&loc='+loc+'&wc='+wc+'&ea='+ea+'&notes='+notes)
                .then(function (res) {
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


        OrderStagingService.StagingToReleasingList = function (wc) {
            var defer = $q.defer();
        
            $http.get($rootScope.url + 'tm-get-staging-confirmation-list?&wc='+wc)
                .then(function (res) {
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }



        OrderStagingService.Confirmation = function (ir,wc) {
            var defer = $q.defer();
            console.log(ir,wc);
            $http.get($rootScope.url + 'tm-get-staging-confirmation?ir=' + ir+'&wc='+wc)
                .then(function (res) {
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        OrderStagingService.IRList = function (wc) {
            var defer = $q.defer();
        
            $http.get($rootScope.url + 'tm-get-onlyirstaging-list?wc='+wc)
                .then(function (res) {
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        OrderStagingService.AddtoStaging = function (wc,ir,loc,qty,creaby) {
            var defer = $q.defer();
        
            $http.get($rootScope.url + 'tm-get-staging-addtostaging?wc='+wc+'&ir='+ir+'&loc='+loc+'&qty='+qty+'&creaby='+creaby)
                .then(function (res) {
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }





        return OrderStagingService;
    }])