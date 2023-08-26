app.controller('LocationInquiryCtrl', ['$scope', 'LoginService', '$ionicModal', 'LoadingService', 'LocInquirySrv', '$cordovaBarcodeScanner', 'StorageService', 'filterFilter', '$state', '$timeout', 
    function ($scope, LoginService, $ionicModal, LoadingService, LocInquirySrv, $cordovaBarcodeScanner, StorageService, filterFilter, $state, $timeout) {

        var tk = 20;
        var page = 0;
        $scope.locMaster = {};
        $scope.locMasterList = [];
        $scope.moreDataCanBeLoaded = false;

        $scope.init = function () {
            $scope.searchParam = '';
            // $scope.GetItemOnHandList('');
            $scope.GetLocationList();
            $scope.GetLocationMasterList('', 1);
        }

        $scope.GetLocationList = function(){
           var list = StorageService.getSearchlist();
           $scope.searchList = _.where(list,{type:'loc'});
        }

        $scope.SelectLocation = function(param){
            $scope.searchParam = param;
            $scope.GetLocationMasterList( $scope.searchParam , 1);
       }

        $scope.goBack = function () {
            LoadingService.GoBack();
        }

        $scope.resetCanBeLoaded = function (param) {
            if (param != $scope.selectedParam) {
                $scope.moreDataCanBeLoaded = true;
            }
        }

        $scope.setParam = function (param) {
            $scope.selectedParam = param;
        }

        $scope.ResetLocMasterList = function () {
            $scope.locMasterList = [];
        }


        $scope.GetLocationMasterList = function (param, pg) //used for drag down to refresh
        {
            var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
            $scope.moreDataCanBeLoaded=false;
            if (!param) {
                param = '';
            }
            if ($scope.selectedParam != param) {
                $scope.setParam(param);
                pg = 1;
                page = 1;
                $scope.locMasterList = [];
            }
            if (pg == 1) {
                page = 1;
                $scope.locMasterList = [];
            }
            LoadingService.StartLoading();
            LocInquirySrv.GetLocationMasterList(param, LoginService.userProfile.warehouseCode, tk, pg)
                .then(function (res) {
                    console.log(res);
                    $scope.itemCount = LocInquirySrv.locMasterListObj.totalItem;
                    for (var i = 0; i < LocInquirySrv.locMasterListObj.list.length; i++) {
                        $scope.locMasterList.push(LocInquirySrv.locMasterListObj.list[i]);
                    }
                    $scope.moreDataCanBeLoaded = LocInquirySrv.locMasterListObj.canNext;

                }, function (err) {
                    $scope.moreDataCanBeLoaded = false;
                    page--;
                    LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                     $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                }).finally(function (res) {
                    LoadingService.StopLoading();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.$broadcast('scroll.refreshComplete');
                   
                })
        }

        $scope.loadMore = function (param) {
            page++;
            $scope.GetLocationMasterList(param, page);
        };

        $scope.setLocationMaster = function (locCode) {
            $scope.locMaster = _.findWhere($scope.locMasterList, { LocationCode: locCode });
        }

        $scope.SearchBarcode = function () {//for searching
            $cordovaBarcodeScanner.scan().then(function (data) {
                if (!data.cancelled) {
                    $scope.searchParam = data.text;
                    $scope.GetLocationMasterList($scope.searchParam, 1);
                }
            }, function (err) {
                LoadingService.PopAlert("Something went wrong", err.data.message);
            })
        }


        $scope.redirectInfo = function () {
            LocInquirySrv.locMaster = $scope.locMaster;
            $state.go('app.locationinquiryinfo');
        }
        $ionicModal.fromTemplateUrl('templates/stockiteminfomodal.html', {
            id: 'stockiteminfomodal',
            scope: $scope
        }).then(function (modal) {
            $scope.stockiteminfomodal = modal;
        });

        $scope.init();
    }
])