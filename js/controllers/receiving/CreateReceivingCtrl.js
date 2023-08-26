//Receiving Controller
app.controller('CreateReceivingCtrl', ['$scope', 'LoginService', '$ionicModal' ,'LoadingService', 'ReceiveSrv', '$cordovaBarcodeScanner','$timeout', '$cordovaToast', 'StorageService','ionicDatePicker', 
function($scope, LoginService,$ionicModal, LoadingService, ReceiveSrv, $cordovaBarcodeScanner,$timeout, $cordovaToast, StorageService,ionicDatePicker) {





    $scope.init = function () {
        // LoadingService.StartLoading();
        $scope.wc = LoginService.userProfile.warehouseCode;
        
        $scope.ddReceiverType = [];
        $scope.supplier = [];
        $scope.ddReceiverType = [];
        $scope.GetReceiverType();
        $scope.receive = {};
        $scope.ResetData();

        

        $scope.GetOpenwrrhdr('');
        $scope.searchParam = '';
        $scope.response = '';
        


    }


    $scope.GetOpenwrrhdr = function (param) {
    
      var currentCanBeLoaded = $scope.moreDataCanBeLoaded;
      LoadingService.StartLoading(); 
      if (!param) {
          param = '';
      }
      if ($scope.selectedParam != param) {
          $scope.setParam(param);
          pg = 1;
          page = 1;
          $scope.supplier = [];
      }
    }

    $scope.setParam = function (param) {
      $scope.selectedParam = param;
  }


  $scope.redirectMe = function (supname,supcode) {
    $scope.receive.suppliername = supname;
    $scope.receive.supplier = supcode;
    console.log(supname,supcode);
    $scope.HideModal();
      }

      
   



    $scope.GetReceiverType = function () {
        LoadingService.StartLoading(); 
        ReceiveSrv.GetReceiverType()
              .then(function (res) {
                $scope.ddReceiverType = res.data;
                $scope.GetSupplier();
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            })   
      }

      $scope.GetSupplier = function () {
        ReceiveSrv.GetSupplier()
              .then(function (res) {
                $scope.supplier = res.data;
                console.log(res);
                LoadingService.StopLoading(); 
              }, function (err) {
                console.log(err);
                $scope.moreDataCanBeLoaded = false;
                LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data + " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
                $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
                
            })    
      }

      $scope.HideModal = function(){
    
        $scope.supplierlistmodal.hide();
      }
  
      $scope.OpenModal = function(){
        
       
        $scope.supplierlistmodal.show();
      }


      $ionicModal.fromTemplateUrl('templates/suppliermodal.html', {
        id: 'receivinglistmodal',
        scope: $scope
    }).then(function (modal) {
        $scope.supplierlistmodal = modal;
    });




    var ReceivedDP = {

        callback: function (val) {  //Mandatory
            $scope.receive.datereceived=moment(val).format('MM/DD/YYYY');
              
              // Note: when selectMode is 'week' or 'month', the returned object has "start" and "end" keys with the start and end times.
            },
            titleLabel: 'Select Date Received',
            dateFormat: 'MM/dd/yyyy',
            mondayFirst: true,          //Optional
            disableWeekdays: [],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup',      //Optional
            selectMode: 'day'           //Optional
  
  
        
      };


      var RefdDP = {


      

        callback: function (val) {  //Mandatory
            $scope.receive.refdate=moment(val).format('MM/DD/YYYY');
              
              // Note: when selectMode is 'week' or 'month', the returned object has "start" and "end" keys with the start and end times.
            },
            titleLabel: 'Select Date Received',
            dateFormat: 'MM/dd/yyyy',
            mondayFirst: true,          //Optional
            disableWeekdays: [],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup',      //Optional
            selectMode: 'day'           //Optional
  
  
        
      };

    $scope.ReceivedDatePicker = function(){
        ionicDatePicker.openDatePicker(ReceivedDP);
    }

    $scope.ReferenceDatePicker = function(){
        ionicDatePicker.openDatePicker(RefdDP);
    }



    $scope.CreateReceive = function () {
     LoadingService.StartLoading(); 
     
      ReceiveSrv.CreateReceive($scope.receive)
       
        .then(function (res) {
          $scope.ResetData();
          LoadingService.StopLoading(); 
          $cordovaToast.show(res.data, 'short', 'bottom');
        }, function (err) {
          console.log(err);
          $scope.moreDataCanBeLoaded = false;
          LoadingService.PopAlert("Something went wrong", "Error Message: "+err.data+ " Please try again later<br><br>Code : " + err.status + "<br> Status : " + err.statusText);
          $timeout(function () { $scope.moreDataCanBeLoaded = currentCanBeLoaded }, 1000);
          LoadingService.StopLoading(); 
        })   
      }


    $scope.createDisabled = function(){
        if($scope.receive.rrtype == "" || $scope.receive.datereceived == "" || $scope.receive.supplier == "" || $scope.receive.doc == ""
         || $scope.receive.reference == "" || $scope.receive.refdate == ""){
            
          return true; 
        }else{
            console.log("false");
          return false;
        }
      }

     

      $scope.ResetData = function(){
        var datetoday = new Date();
var m = datetoday.getMonth()+1;
var d = datetoday.getDate();
var y = datetoday.getFullYear();

//var dt = moment(month+"/"+day+"/"+yr).format('MM/DD/YYYY');

var dt = (m <= 9 ? '0' + m : m) + '/'+ (d <= 9 ? '0' + d : d)  + '/'+ y;
       
       
        $scope.receive.rrtype = "";
        $scope.receive.datereceived =  dt;
        $scope.receive.supplier = "";
        $scope.receive.doc = "";
        $scope.receive.refdate = dt;
        $scope.receive.reference = "";
        $scope.receive.po = "";
        $scope.receive.remarks = "";
      }


      $scope.goBack = function(){
        LoadingService.GoBack();
      }

    $scope.init();
}]);
