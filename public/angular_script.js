
var app = angular
  .module("demo", ["ui.bootstrap", "ngRoute"])
  .config(function ($routeProvider, $locationProvider) {
    console.log("hiiiiiiiii")
    $routeProvider
      .when('/', {
        templateUrl: "frontpage",
        controller: 'indexController'
      })
      .when('/tableboard',{
        templateUrl: "tableboard",
        controller: 'ngtableCtrl'
      })
      .when('/create_account',{
        templateUrl: 'create_account',
        controller:"pushcontroller"
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })

  .controller('indexController', function ($scope, $location,$rootScope,$http) {
    $scope.validationFun = function (path, username, password) {
      $rootScope.username=username
      $http({
        method: 'GET',
        url: 'http://localhost:4000/data/'+$rootScope.username+"/"+password,
  
      }).then(function sappuccess(response) {
        console.log(response.data)
        if(response.data=="data_present"){
          $location.path(path);
          $scope.warn=""
        }
        else{
          $scope.warn="UserName Or Password Not Correc!"
        }
      }, function error(response) {
        console.log("error")
      })    
        

    }
  })

  .controller("ngtableCtrl", function ($scope, $http,$rootScope) {
    $http({
      method: 'GET',
      url: 'http://localhost:4000/username/'+$rootScope.username,

    }).then(function sappuccess(response) {
      console.log(response.data)
      $scope.itemsDetails = response.data

      $scope.curPage = 1,
        $scope.itemsPerPage = 2,
        // $scope.maxSize = 5;

        items = $scope.itemsDetails;

      console.log($scope)

      $scope.numOfPages = function () {
        return Math.ceil(items.length / $scope.itemsPerPage);
      };

      $scope.$watch('curPage + numPerPage', function () {
        var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
          end = begin + $scope.itemsPerPage;
        console.log(begin)
        console.log(end)
        $scope.filteredItems = items.slice(begin, end);
      });
    }, function error(response) {
      console.log("error")
    })
  })

  .controller('pushcontroller',function($scope,$http){
    console.log("---------------------------------------------------------------------")
    $scope.pushfun=function(value){
            console.log("pushfun calllllllllllllllllllllllllllllllllllllll")
            $scope.data = {
            'UserNameNew' : '',
            'PasswordNew' : ''
            }
            $scope.data=value   
            var c=$scope.data
            console.log(c.UserNameNew)
            console.log(c.PasswordNew)
            
            if( c.UserNameNew!=undefined & c.PasswordNew!=undefined){
                    var res = $http.post('http://localhost:4000/push', c)
            }
    }

})