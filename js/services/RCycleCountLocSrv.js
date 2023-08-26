app.factory('RCycleCountLocSrv', ['$http', '$q', '$rootScope', 'LoginService', '$filter',
    function ($http, $q, $rootScope, LoginService, $filter) {

        var RCycleCountLocSrv = this;



        

        RCycleCountLocSrv.SetCCID = function (ccid) {
            RCycleCountLocSrv.selectedCCID = ccid;
        }




        RCycleCountLocSrv.GetLocationCCID = function(ccid){
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-location-FromCCID?ccid='+ ccid+'&wc='+LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    RCycleCountLocSrv.LocListObj = res.data;
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }

        RCycleCountLocSrv.StartCycleCount = function(id){
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-update-start-location?id='+ id)
                .then(function (res) {
                    RCycleCountLocSrv.LocListObj = res.data;
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }

        RCycleCountLocSrv.EndCycleCount = function(id){
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-update-end-location?id='+ id+'&by='+LoginService.userProfile.emailAlias+'&wc='+LoginService.userProfile.warehouseCode)
                .then(function (res) {
                    RCycleCountLocSrv.LocListObj = res.data;
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }


        RCycleCountLocSrv.GetItemCCID = function(LOCCDE,CCID){
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-item-FromLOCCDE?LOCCDE='+ LOCCDE+'&CCID='+CCID+'&WARCDE='+LoginService.userProfile.warehouseCode)
                .then(function (res) {    
                    RCycleCountLocSrv.itemListObj = res.data;
                    console.log(res.data);
                   
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }


        RCycleCountLocSrv.GetItemDetailsCCID = function(LOCCDE,CCID,itemcode){
            var defer = $q.defer();
            $http.get($rootScope.url + 'tm-get-itemdetails-FromLOCCDE?LOCCDE='+ LOCCDE+'&CCID='+CCID+'&WARCDE='+LoginService.userProfile.warehouseCode+'&ITMCDE='+itemcode)
                .then(function (res) {    
                    if(res.data.PICPATH != null){
                        res.data.path = "https://apps.fastlogistics.com.ph/fastdrive/AMOA/randomcyclecount/"+res.data.PICPATH;    
                    }else{
                        res.data.path = null;
                    }
                    
                    RCycleCountLocSrv.itemset = res.data;
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }


        RCycleCountLocSrv.PostItemCCID = function(item,ccid,loc){

            var data = JSON.parse(JSON.stringify(item));  
            data.ACTUALQTY = item.ACTUALQTY;
            data.CCID = ccid;
            data.ITMCDE = item.ITMCDE;
            data.LOCCDE = loc;
            data.REMARKS = item.REMARKS;
            data.WARCDE = LoginService.userProfile.warehouseCode;
            data.CREA_BY = LoginService.userProfile.emailAlias;
            data.photo = item.photo;
           var defer = $q.defer();
            $http.post($rootScope.url + 'tm-post-item-FromLOCCDE',data)
                .then(function (res) { 
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }

        RCycleCountLocSrv.PutItemCCID = function(item,ccid,loc){

            var data = JSON.parse(JSON.stringify(item));  
            data.ACTUALQTY = item.ACTUALQTY;
            data.CCID = ccid;
            data.ITMCDE = item.ITMCDE;
            data.LOCCDE = loc;
            data.REMARKS = item.REMARKS;
            data.WARCDE = LoginService.userProfile.warehouseCode;
            data.CREA_BY = LoginService.userProfile.emailAlias;
            data.photo = item.photo;
       
           var defer = $q.defer();
            $http.post($rootScope.url + 'tm-post-updateitem-FromLOCCDE',data)
                .then(function (res) { 
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }


        RCycleCountLocSrv.DeleteItemCCID = function(item,ccid,loc){

            var data = JSON.parse(JSON.stringify(item));  
            data.ACTUALQTY = item.ACTUALQTY;
            data.CCID = ccid;
            data.ITMCDE = item.ITMCDE;
            data.LOCCDE = loc;
            data.REMARKS = item.REMARKS;
            data.WARCDE = LoginService.userProfile.warehouseCode;
            data.CREA_BY = LoginService.userProfile.emailAlias;
                       
           var defer = $q.defer();
            $http.post($rootScope.url + 'tm-post-deleteitem-FromLOCCDE',data)
                .then(function (res) { 
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }



        RCycleCountLocSrv.isPostedCCID = function(ccid){
            
           var defer = $q.defer();
            $http.get($rootScope.url + 'tm-post-posting-header?ccid='+ccid+'&modyby='+LoginService.userProfile.emailAlias+'&wc='+LoginService.userProfile.warehouseCode)
                .then(function (res) { 
                    console.log(res);
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                })
            return defer.promise;
        }


        RCycleCountLocSrv.isCancelCCID = function(ccid){
        
            var defer = $q.defer();
             $http.get($rootScope.url + 'tm-post-cancel-header?ccid='+ccid+'&modyby='+LoginService.userProfile.emailAlias+'&wc='+LoginService.userProfile.warehouseCode)
                 .then(function (res) { 
                     console.log(res);
                     defer.resolve(res);
                 }, function (res) {
                     defer.reject(res);
                 })
             return defer.promise;
         }



       

        return RCycleCountLocSrv;
    }])