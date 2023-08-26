app.service('PickListService', ['$http', '$q', '$rootScope', 'LoginService', 
function ($http, $q, $rootScope, LoginService) {

    var PickListService = this;
    PickListService.pickid = '';
    PickListService.PickList = [];
    PickListService.PalleteList = [];
    PickListService.userProfile = {};
    PickListService.wc = '';
    PickListService.itemCode = '';
    PickListService.itemDesc = '';
    
    PickListService.getProfile = function () {
        PickListService.userProfile = LoginService.getProfile();
        PickListService.wc = PickListService.userProfile.warehouseCode;
        //   $http.defaults.headers.common['SERVERID'] = LoginService.userProfile.s; // FOR Header of server
       // console.log(PickListService.userProfile);
    }

    PickListService.getPickList = function () {
        PickListService.getProfile();
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-pick-list?wc=' + PickListService.wc)
            .then(function (res) {
                PickListService.PickList = res.data;
                
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
        return defer.promise;
    }
    
    
    PickListService.getPalleteItemList = function () {
        PickListService.getProfile();
        var defer = $q.defer();
         $http.get($rootScope.url + 'tm-get-pallete-item-list?pickid=' + PickListService.pickid + '&wc=' + PickListService.wc)
            .then(function (res) {
                PickListService.ItemList = res.data;
                console.log("getPalleteItemList:"+res.data);
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res.data);
            })
        return defer.promise;
    }

    PickListService.getPalleteList = function () {
        PickListService.getProfile();
        var defer = $q.defer();
       /* $http.get($rootScope.url + 'tm-get-pallete-list?pickid=' + PickListService.pickid + '&wc=' +
       PickListService.wc)*/
         $http.get($rootScope.url + 'tm-get-pallete-list?pickid=' + PickListService.pickid + '&itemcode='+ PickListService.itemCode+'&wc=' + PickListService.wc)
            .then(function (res) {
                PickListService.PalleteList = res.data;
                console.log("getPalleteList:"+res.data);
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
            })
        return defer.promise;
    }

    PickListService.PickItem = function (palnum, lot, qty) {
        // PickListService.getProfile();//Still thinking if will need to add if else before picking
   
            // $http.post($rootScope.url + 'PickPalNum?palnum=' + palnum + '&lot=' + lot + '&qty=' + qty + '&userid=' + LoginService.userProfile.emailAlias + '&wc='+ PickListService.wc)
             var objData = {
                 batchno : palnum,
                 confirmqty : qty,
                 warehouse : PickListService.wc,
                 crea_by : PickListService.userProfile.emailAlias,
                 actuallot : lot
             }
             console.log(objData);
            var defer = $q.defer();
             $http.post($rootScope.url + 'tm-sproc-confirm-issuance-pick',objData)
            .then(function (res) {
                
                defer.resolve(res);
            },function (res) {
                defer.reject(res)
            })


        return defer.promise;
    }





    return PickListService;

}])