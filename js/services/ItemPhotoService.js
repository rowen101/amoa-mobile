app.service('ItemPhotoSrv', ['$http', '$q', '$rootScope',
    function ($http, $q, $rootScope) {

        var ItemPhotoSrv = this;

        ItemPhotoSrv.itemMaster = {};
        
        

        ItemPhotoSrv.GetActiveItemMasterList = function (param, wc, tk, pg) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-active-item-master-list?param=' + param + '&wc='+wc+'&tk=' + tk + '&pg=' + pg)
                .then(function (res) {
                    ItemPhotoSrv.itemListObj = res.data;
                    console.log("res.data: ",res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


        ItemPhotoSrv.GetActiveItemMasterListCount = function (wc) {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-active-item-master-list-count?wc='+wc)
                .then(function (res) {
                    ItemPhotoSrv.itemMaster = res.data;
                    console.log("res.data: ",res.data);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        
        

        ItemPhotoSrv.ImageUpdate  = function(
            ItemCode,
            image
          ) {

            var imageupdate = { itemcode: ItemCode, image: image};
            console.log(imageupdate);
            var defer = $q.defer();
            $http.post($rootScope.url + "tm-image-update",imageupdate)
            .then(function (res) {
                defer.resolve(res);
            }, function (res) {
                defer.reject(res);
                console.log(res);
            })
            return defer.promise;
        }


        ItemPhotoSrv.ImageMultipleUpdate  = function(itemCheckList) {
      
            var imageupdate = {itemCheckList};
            console.log(imageupdate);
           // console.log(imageupdate);
            
            var defer = $q.defer();
            $http.post($rootScope.url + "tm-image-multiple-update",imageupdate)
                .then(function (res) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }


        //ItemMasterSrv.GetItemOnHandList = function(itemcode,wc)
        ItemPhotoSrv.GetItemOnHandList = function (itemcode, wc, tk, pg) {
            console.log(pg);
            var defer = $q.defer();
            //$http.get($rootScope.url + 'tm-get-item-on-hand-list?param='+itemcode+'&wc='+wc)
            $http.get($rootScope.url + 'tm-get-item-on-hand-list?param=' + itemcode + '&wc=' + wc + '&tk=' + tk + '&pg=' + pg)
                .then(function (res) {
                    // ItemMasterSrv.itemInventoryList = res.data;
                    ItemPhotoSrv.itemInventoryListObj = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }

        ItemPhotoSrv.GetItemBatchInventoryList = function (itemcode, wc)//for item inventory 
        {
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-batch-inventory-list?itemcode=' + itemcode + '&wc=' + wc)
                .then(function (res) {
                    ItemPhotoSrv.BatchInventoryList = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                    console.log(res);
                })
            return defer.promise;
        }




        return ItemPhotoSrv;

    }])