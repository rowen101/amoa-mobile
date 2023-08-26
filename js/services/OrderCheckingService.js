app.service('OrderCheckingService', ['$http', '$q', '$rootScope', 'LoginService', 
function ($http, $q, $rootScope, LoginService) {

    var OrderCheckingService = this;
    OrderCheckingService.pickid = '';
    OrderCheckingService.itemCode = '';
    OrderCheckingService.issuanceNo = '';
    OrderCheckingService.itemCode = '';

    OrderCheckingService.getPickList = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-check-pick-list?wc=' + LoginService.userProfile.warehouseCode)
            .then(function (res) {
                OrderCheckingService.PickList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }
       OrderCheckingService.getPickListByPrinted = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-picklist-by-printed?wc=' + LoginService.userProfile.warehouseCode +'&isprinted=3')
            .then(function (res) {
                OrderCheckingService.PickList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }
    
    OrderCheckingService.getPalleteItemList = function () {
        var defer = $q.defer();
         $http.get($rootScope.url + 'tm-get-item-list?pickid=' + OrderCheckingService.pickid + '&wc=' + LoginService.userProfile.warehouseCode + '&IsPrinted=2')
            .then(function (res) {
                OrderCheckingService.ItemList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    OrderCheckingService.getPalleteList = function () {
        var defer = $q.defer();
         $http.get($rootScope.url + 'tm-get-check-pallete-list?pickid=' + OrderCheckingService.pickid + '&itemcode='+ OrderCheckingService.itemCode+'&wc=' + LoginService.userProfile.warehouseCode + '&IsPrinted=2')
            .then(function (res) {
                OrderCheckingService.PalleteList = res.data;
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    OrderCheckingService.CheckItem = function (palnum, lot, qty) {
             var objData = {
                 batchno : palnum,
                 confirmqty : qty,
                 warehouse : LoginService.userProfile.warehouseCode,
                 crea_by : LoginService.userProfile.emailAlias,
                 actuallot : lot
             }
            var defer = $q.defer();
             $http.post($rootScope.url + 'tm-sproc-confirm-issuance-check',objData)
            .then(function (res) {
                defer.resolve(res);
            },function (res) {
                defer.reject(res)
            })


        return defer.promise;
    }



    
    OrderCheckingService.GetIssuanceList = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-check-issuance-list?wc=' + LoginService.userProfile.warehouseCode)
            .then(function (res) {
                OrderCheckingService.IssuanceList = res.data;
                defer.resolve(res);
            }, function (res) {
                console.log("error Get issuanceNo List");
                console.log(res);
                defer.reject(res);
            })

        return defer.promise;
    }

    OrderCheckingService.GetCheckIssuanceItemList = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-check-issuance-item-list?wc=' + LoginService.userProfile.warehouseCode + '&issuanceNo=' + OrderCheckingService.issuanceNo + '')
            .then(function (res) {
                OrderCheckingService.ItemList = res.data;
                console.log(res);
                defer.resolve(res);
            }, function (res) {
                console.log("error Get Issuance Picklist");
                console.log(res);
                defer.reject(res);
            });


        return defer.promise;
    }


    OrderCheckingService.GetIRToCheck = function () {
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-ir-to-check?ir=' + OrderCheckingService.issuanceNo + '&itemcode=' + OrderCheckingService.itemCode + '&wc=' + LoginService.userProfile.warehouseCode + '')
            .then(function (res) {
                OrderCheckingService.IssuancePalleteList = res.data;
                defer.resolve(res);
            },function (res) {
                defer.reject(res);
            })

        return defer.promise;
    }

    return OrderCheckingService;

}])