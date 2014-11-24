var app = angular.module('app', ['ngResource'], function($httpProvider){
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});

app.factory('Events', ['$resource', function($resource) {
  return $resource('http://py00.tataufo.com/event/list', null, null);
}]);

app.controller('MainCtrl', ['$scope', '$http', 'Events', function($scope, $http, Events) {
  $scope.status = 0;
  $scope.pageSize = 10;
  $scope.currentPage = 0;

  $scope.approve = function(id) {
    $scope.status = 1;
    if(window.confirm('确认通过？')) {
      updateEvent(id);
    }
  }

  $scope.reject = function(id) {
    $scope.status = 2;
    if(window.confirm('确认不通过？')) {
      updateEvent(id);
    }
  }

  var removeEvent = function(res) {
    _.remove($scope.events, function(e){ return e.pk === res.data.pk; });
  }

  var updateEvent = function(id) {
    var url = 'http://py00.tataufo.com/event/' + id + '/update/';
    $http.post(url, { 'status': $scope.status, 'body': 'hello world' }).success(removeEvent);
  }

  var getEventsForPage = function (page) {
    Events.get({ status: 0, city: '北京', start: page * $scope.pageSize }, function(res){
      $scope.events = res.data;
      $scope.total = res.total;
      $scope.pageCount = Math.ceil($scope.total / $scope.pageSize);
    });
  }

  $scope.$watch('currentPage', function(newValue, oldValue){
    getEventsForPage(newValue);
  });

  //$scope.$digest();

}]);
