app.service('LoadingService', ['$ionicLoading', '$ionicPopup','$ionicHistory',
 function ($ionicLoading, $ionicPopup, $ionicHistory) {
    var LoadingService = this;

    LoadingService.StartLoading = function () {
        $ionicLoading.show({
            /*   animation: 'fade-in',
               content: 'Loading',
               maxWidth: 200,
               showBackdrop: true,
               showDelay: 0*/
            template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>'
        });
    }

    LoadingService.StopLoading = function () {
        $ionicLoading.hide();
    }

    LoadingService.PopAlert = function (t, temp) {
        $ionicPopup.alert({
            title: t,
            template: temp
        });

    }

    LoadingService.GoBack = function(){
        $ionicHistory.goBack();
    }

    return LoadingService;
}])