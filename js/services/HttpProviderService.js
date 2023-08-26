app.service('HttpProviderService', ['$q',
    function ($q) {
        var HttpProviderService = this;
        HttpProviderService.Token = '';
        HttpProviderService.serverwarehouseId = '';

        HttpProviderService.SetProviders = function (tkn, sId) {
            HttpProviderService.Token = tkn;
            HttpProviderService.serverwarehouseId = sId;
        }

         HttpProviderService.SetWarehouseProvider = function (sId) {
            HttpProviderService.serverwarehouseId = sId;
        }
        return HttpProviderService;
    }]);