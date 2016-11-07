var app = angular.module('users', ['ui.router']) ;

app.config(function($stateProvider, $urlRouterProvider) {
 
  $urlRouterProvider.otherwise('/user/1');
  
    $stateProvider.state('user', {
			url: '/user/:currID',
            templateUrl: 'info.html',
			controller: function ($http,$stateParams,$scope,$state) {
				 $http.get("https://api.github.com/user/"+$stateParams.currID)
					.then( function (response) {$scope.currUser1=response.data;},function (response) {$scope.selected=1; $state.go('Error');})}
			
        }).state('Error',{url:'/user/1',templateUrl:'info.html'})
});

app.controller('getUsers',function($scope,$http){

	$scope.limit=0;
	$scope.selected=1;

	$http.get("https://api.github.com/user/1").then(function(response) {$scope.selected=1; $scope.currUser1=response.data; });
	
	$http.get("https://api.github.com/users").then(function(response){
		
		$scope.Users=response.data;
		$scope.limit=Object.keys(response.data).length;
	});
	
	$scope.changeName=function(id){		
		$http.get("https://api.github.com/user/"+id).then(function(response){	
			$scope.currUser1=response.data;
		});
		
		$scope.selected=id;	
	}
	$scope.isActive = function(id) {return $scope.selected === id;};
	
	$scope.loadMore=function(){
		var ele=document.getElementById('app1');
		
		if($scope.SZ!=$scope.limit)
			ele.style.height=ele.offsetHeight+600+'px';
		
		$scope.SZ+=12;
		
		if($scope.SZ>$scope.limit)
			$scope.SZ=$scope.limit;
		
			
	}	
});

