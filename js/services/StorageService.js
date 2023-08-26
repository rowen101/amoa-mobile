// create a new factory
app.factory ('StorageService', ['$localStorage', function ($localStorage) {

    $localStorage = $localStorage.$default({
        searchlist : [],
        warehouseCode : '',
        serverid : '',
        username : '',
        serverwarehouseId : null
    });

    var _getSearchlist = function () {
        return $localStorage.searchlist;
    };
    var _setSearchlist = function(params){
        $localStorage.searchlist = params;
    };
    var _getWar = function(){
        return $localStorage.warehouseCode;
    };
    var _setWar = function(params){
        $localStorage.warehouseCode = params;
    };
    var _getServer = function(){
        return $localStorage.serverid;
    };
    var _setServer = function(params){
        $localStorage.serverid = params;
    };

     var _delSearchList = function () {
       delete $localStorage.searchlist;
     }

      var _setUsername = function(params){
        $localStorage.username = params;
      }

      var _getUsername = function(){
        return $localStorage.username;
      }

      var _setServerUrl = function(params){
        $localStorage.serverUrl = params;
      }

      var _getServerUrl = function(){
        return $localStorage.serverUrl;
      }


      var _setServerWarehouseId = function(params){
        $localStorage.serverwarehouseId = params;
      }

      var _getServerWarehouseId = function(){
        return $localStorage.serverwarehouseId;
      }
    // var _remove = function (thing) {
    //   $localStorage.locations.splice($localStorage.locations.indexOf(thing), 1);
    // }
        var _reset = function(){
            $localStorage.$reset();
        }
    return {
        getSearchlist: _getSearchlist,
        setSearchlist: _setSearchlist,
        delSearchList: _delSearchList,
        getWar: _getWar,
        setWar: _setWar,
        getServer: _getServer,
        setServer: _setServer,
        getUsername: _getUsername,
        setUsername: _setUsername,
        getServerWarehouseId: _getServerWarehouseId,
        setServerWarehouseId: _setServerWarehouseId,
        getServerUrl : _getServerUrl,
        setServerUrl : _setServerUrl,
        //    add: _add,
        // remove: _remove,
        reset : _reset,
        searchlist :  $localStorage.searchlist,
    };
}])