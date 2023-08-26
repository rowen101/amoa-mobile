app.service('ReceiveSrv', ['$http', '$q', '$rootScope', 'LoginService', '$filter',
    function ($http, $q, $rootScope, LoginService,$filter) {

        var ReceiveSrv = this;  

        ReceiveSrv.itemMaster = {};
        ReceiveSrv.checker = '';
        ReceiveSrv.itm = '';
        
        ReceiveSrv.GetWRRHDR = function (param, tk, pg) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-wrrhdr-list?param=' + param + '&wc='+  LoginService.userProfile.warehouseCode+ '&tk='+tk + '&pg='+pg)
                .then(function (res) {
                    console.log(res)
                    ReceiveSrv.itemListObj = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


       

        ReceiveSrv.GetReceivingList = function () {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-receiving-list?wc='+  LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ReceiveSrv.GetOpenwrrhdrDetails = function (param) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-wrrhdr-details?param=' + param + '&wc='+  LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    ReceiveSrv.itemMaster = res.data;
                
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }



    

        ReceiveSrv.postUpdateReceiving = function (param) {
            var defer = $q.defer();
            var data = { param: param, emplId: LoginService.userProfile.emailAlias};
            $http.post($rootScope.url + 'tm-post-update-receive', data)
                .then(function (res) {
                    console.log(res);
                    ReceiveSrv.response = res.data;
                
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }



        ReceiveSrv.postPostingReceiving = function (param) {
            var defer = $q.defer();
            var data = { param: param, emplId: LoginService.userProfile.emailAlias};
            $http.post($rootScope.url + 'tm-post-posting-receive', data)
                .then(function (res) {
                    console.log(res);
                    ReceiveSrv.response = res.data;
                
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ReceiveSrv.GetReceiverType = function () {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-dropdown-receivertype')
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ReceiveSrv.GetSupplier = function () {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-dropdown-supplier')
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


        ReceiveSrv.CreateReceive = function (branchObj) {
            var dup = JSON.parse(JSON.stringify(branchObj));
            
        
            dup.datereceived = $filter('date')(dup.datereceived, "yyyy/MM/dd");
            dup.refdate = $filter('date')(dup.refdate, "yyyy/MM/dd");
            dup.warehouseCode = LoginService.userProfile.warehouseCode;
            dup.createdby = LoginService.userProfile.emailAlias;
            dup.supplier = branchObj.supplier;
            dup.suppliername = branchObj.suppliername;
            console.log(dup);
            var defer = $q.defer();
            $http.post($rootScope.url + 'tm-post-new-receive', dup)
                .then(function (res) {
                   
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log("DATA:",res);
                })
            return defer.promise;
        }




        ReceiveSrv.PostCheckReceiving = function (rrnumb) {
            
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-checking-receive?rrnumb='+rrnumb+'&wc='+LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        //View Receiving
        ReceiveSrv.getViewRRNumb = function () {
            
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-receiving-view-rr?wc='+LoginService.userProfile.warehouseCode+'&creaby='+LoginService.userProfile.emailAlias)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }



        ReceiveSrv.getViewBatch = function () {
            
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-receiving-view-batch?wc='+LoginService.userProfile.warehouseCode+ '&creaby='+LoginService.userProfile.emailAlias)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }



        ReceiveSrv.getViewChecker = function () {
            
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-checker-view-checker?wc='+LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ReceiveSrv.getViewperChecker = function (creaby) {
            
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-checker-view-perchecker?wc='+LoginService.userProfile.warehouseCode+'&crea_by='+creaby)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ReceiveSrv.getViewItem = function () {
            
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-checker-view-item?wc='+LoginService.userProfile.warehouseCode+ '&creaby='+LoginService.userProfile.emailAlias)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


        ReceiveSrv.getViewperItem = function (itemcode) {
            
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-checker-view-peritem?wc='+LoginService.userProfile.warehouseCode+'&itemcode='+itemcode+ '&creaby='+LoginService.userProfile.emailAlias)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }




        return ReceiveSrv;

    }])