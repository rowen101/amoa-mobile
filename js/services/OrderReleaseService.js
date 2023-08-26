app.service('OrderReleaseService', ['$http', '$q', '$rootScope', 'LoginService', 
function ($http, $q, $rootScope, LoginService) {

    var OrderReleaseService = this;
    OrderReleaseService.pickid = '';
    OrderReleaseService.itemCode = '';
    OrderReleaseService.issuanceNo = '';
    OrderReleaseService.itemCode = '';

    OrderReleaseService.IRList = [];
    OrderReleaseService.rnum = '';
    OrderReleaseService.itemlist = [];
    OrderReleaseService.loc = '';
    OrderReleaseService.locList = [];

    OrderReleaseService.getPickList = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-picklist-by-printed?wc=' + LoginService.userProfile.warehouseCode +'&isprinted=3')
            .then(function (res) {
                OrderReleaseService.PickList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }
     
    
    OrderReleaseService.getPalleteItemList = function () {
        var defer = $q.defer();
         $http.get($rootScope.url + 'tm-get-item-list?pickid=' + OrderReleaseService.pickid + '&wc=' + LoginService.userProfile.warehouseCode + '&IsPrinted=3')
            .then(function (res) {
                OrderReleaseService.ItemList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    OrderReleaseService.getPalleteList = function () {
        var defer = $q.defer();
         $http.get($rootScope.url + 'tm-get-check-pallete-list?pickid=' + OrderReleaseService.pickid + '&itemcode='+ OrderReleaseService.itemCode+'&wc=' + LoginService.userProfile.warehouseCode + '&IsPrinted=3')
            .then(function (res) {
                OrderReleaseService.PalleteList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    OrderReleaseService.CheckItem = function (palnum, lot, qty) {
             var objData = {
                 batchno : palnum,
                 confirmqty : qty,
                 warehouse : LoginService.userProfile.warehouseCode,
                 crea_by : LoginService.userProfile.emailAlias,
                 actuallot : lot
             }
            var defer = $q.defer();
             $http.post($rootScope.url + 'tm-sproc-confirm-order-release',objData)
            .then(function (res) {
                defer.resolve(res);
            },function (res) {
                defer.reject(res)
            })


        return defer.promise;
    }



    
    OrderReleaseService.GetIssuanceList = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-check-issuance-list?wc=' + LoginService.userProfile.warehouseCode)
            .then(function (res) {
                OrderReleaseService.IssuanceList = res.data;
                defer.resolve(res);
            }, function (res) {
                console.log("error Get issuanceNo List");
                console.log(res);
                defer.reject(res);
            })

        return defer.promise;
    }

    OrderReleaseService.GetCheckIssuanceItemList = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-check-issuance-item-list?wc=' + LoginService.userProfile.warehouseCode + '&issuanceNo=' + OrderReleaseService.issuanceNo + '')
            .then(function (res) {
                OrderReleaseService.ItemList = res.data;
                console.log(res);
                defer.resolve(res);
            }, function (res) {
                console.log("error Get Issuance Picklist");
                console.log(res);
                defer.reject(res);
            });


        return defer.promise;
    }


    OrderReleaseService.GetIRToCheck = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-ir-to-check?ir=' + OrderReleaseService.issuanceNo + '&itemcode=' + OrderReleaseService.itemCode + '&wc=' + LoginService.userProfile.warehouseCode + '')
            .then(function (res) {
                OrderReleaseService.IssuancePalleteList = res.data;
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }

    OrderReleaseService.getIRReleasing = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-irreleasing-list?wc=' + LoginService.userProfile.warehouseCode)
            .then(function (res) {
                OrderReleaseService.IRList = res.data;
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }

    OrderReleaseService.getItemReleasing = function (ir) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-itemreleasing-list?ir='+ir+'&wc=' + LoginService.userProfile.warehouseCode)
            .then(function (res) {
                OrderReleaseService.itemlist = res.data;
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }

    OrderReleaseService.getLocReleasing = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-locreleasing-list?wc=' + LoginService.userProfile.warehouseCode)
            .then(function (res) {
                OrderReleaseService.locList = res.data;
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }

    OrderReleaseService.getLoctoIRReleasing = function (loc) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-loctoIR-releasing-list?wc=' + LoginService.userProfile.warehouseCode+'&loc='+loc)
            .then(function (res) {
                OrderReleaseService.IRList = res.data;
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }


    OrderReleaseService.OrderRelease = function (reqnum,plnqty,itmcde,scan) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-order-release?reqnum='+reqnum+'&wc=' + LoginService.userProfile.warehouseCode+'&plnqty='+plnqty+'&releaseby='+LoginService.userProfile.emailAlias+'&itmcde='+itmcde+'&scan='+scan)
            .then(function (res) {
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }

    OrderReleaseService.Itemcode = function (param) {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-item-from-code?param='+param)
            .then(function (res) {
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }


    

    return OrderReleaseService;

}])