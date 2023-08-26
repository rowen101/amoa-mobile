app.service('ViewTransactionSrv', ['$http', '$q', '$rootScope', 'LoginService',
function ($http, $q, $rootScope,LoginService) {


    var ViewTransactionSrv = this;
 ViewTransactionSrv.viewPickId = '';

 /*
ViewTransactionSrv.GetLastPickedItem = function(userid){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-last-picked-item?userid=' + userid)
            .then(function (res) {
                ViewTransactionSrv.lastItem = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }

    ViewTransactionSrv.GetLastPickList = function(userid){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-last-pick-list?userid=' + userid)
            .then(function (res) {
                ViewTransactionSrv.itemList = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }

    ViewTransactionSrv.GetViewPickList = function(userid){
         var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-view-pick-list?userid=' + userid)
            .then(function (res) {
                ViewTransactionSrv.PickListItems = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }

    ViewTransactionSrv.GetViewPalleteList = function(userid, pickid){
        console.log(userid)
           console.log(pickid)
        var defer = $q.defer();
           $http.get($rootScope.url + 'tm-get-view-pallete-list?userid=' + userid + '&pickid=' + pickid)
            .then(function (res) {
                ViewTransactionSrv.PickedItems  = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    } */


    ViewTransactionSrv.GetLastPickedItem = function(userid){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-last-picked-item?userid=' + userid)
            .then(function (res) {
                ViewTransactionSrv.lastItem = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }

    ViewTransactionSrv.GetLastPickList = function(userid){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-last-pick-list?userid=' + userid)
            .then(function (res) {
                ViewTransactionSrv.itemList = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }

    ViewTransactionSrv.GetViewPickList = function(userid){
         var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-view-pick-list?userid=' + userid)
            .then(function (res) {
                ViewTransactionSrv.PickListItems = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }

    ViewTransactionSrv.GetViewPalleteList = function(userid, pickid){
        console.log(userid)
           console.log(pickid)
        var defer = $q.defer();
           $http.get($rootScope.url + 'tm-get-view-pallete-list?userid=' + userid + '&pickid=' + pickid)
            .then(function (res) {
                ViewTransactionSrv.PickedItems  = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }



    //
    ViewTransactionSrv.GetLastPickedItemDay = function(){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-last-pick-list-day?modyby='+LoginService.userProfile.emailAlias+'&wc='+LoginService.userProfile.warehouseCode)
            .then(function (res) {
                console.log(res.data);
                ViewTransactionSrv.itemList = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }

    ViewTransactionSrv.GetLastPickedItemWeek = function(){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-last-pick-list-week?modyby='+LoginService.userProfile.emailAlias+'&wc='+LoginService.userProfile.warehouseCode)
            .then(function (res) {
                ViewTransactionSrv.itemList = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }
    
    ViewTransactionSrv.GetLastPickedItemMonth = function(){
        var defer = $q.defer();
        $http.get($rootScope.url + 'tm-get-last-pick-list-month?modyby='+LoginService.userProfile.emailAlias+'&wc='+LoginService.userProfile.warehouseCode)
            .then(function (res) {
                ViewTransactionSrv.itemList = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }
    

    

    return ViewTransactionSrv;

}]);