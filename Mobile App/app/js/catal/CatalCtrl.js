angular.module('twirll.controllers',[])

  .controller('CatalCtrl',
  	function($scope,$log,$state,localStorageService,$http,$ionicPopup,$timeout,//ng resources
    apiUrl,//constants
    Catalogue,Content,CheckIn){
	
      var lastcheckin =  localStorageService.get('lastcheckin');
      
      $scope.searchtext = '';
      //get catalogue stores based on business id (checkin) 
      //console.log(lastcheckin.businessprofile_id);

      Catalogue.storesinfo(lastcheckin.businessprofile_id)
      .then(function(success){
        //request success
         // console.log(success);
          $scope.levels = success;

      },function(error){
        //request error 

      }); 

      $scope.gotosearch = function(){
        $state.go('cataloguesearch');
      }

	/*====Go to content page======*/	
      	$scope.showContent=function(){
		$state.go('content');
	
	}	
    /*====Go to content page======*/


/*=======Content Controller Starts Code here=======*/

/*====lastCheckin Starts Here=======*/
var day  =  {"days":"20"};
//var news =JSON.parse(day);
 CheckIn.lastCheckIn(day)
      .then(function(success){
        
alert(success);

      },function(error){
        //request error 

      }); 
/*====lastCheckin Ends Here=======*/



  Content.fetchContent(lastcheckin.businessprofile_id)
      .then(function(success){
        //request success
          //console.log(success);
          $scope.contents = success;

      },function(error){
        //request error 

      }); 

	$scope.productDetail=function(x)
	{
		localStorageService.set("productDetail", JSON.stringify(x));
		$state.go('manualItem');
	}	

	var productDetail = localStorageService.get('productDetail');
	$scope.product =  productDetail;
	$scope.longTap=false;
	$scope.test=function(products)
	{
		console.log(products);
		var current = localStorageService.get('products');
		
		localStorageService.set("products", JSON.stringify(current));
		$scope.longTap=true;
	}
	$scope.checkOut=function()
	{

		$state.go('contentInformation');

	}
	var productInfo = localStorageService.get('products');
	console.log(productInfo);

	$scope.addCart=function(){

 		var alertPopup = $ionicPopup.alert({
       
       		template: ' Add to cart is complete'
    		 });
     		alertPopup.then(function(res) {
       		$scope.longTap=false;
		$(".list > a").each(function(){
			$(this).css('background-color', '');
		})
     });
	$timeout(function() {
      		alertPopup.close(); 
   	}, 3000); 

}
/*=======Content Controller Ends Code here=======*/

        $scope.navTitle = 
                  '<span class="logo"><cite>Harry Hatti</cite></span>'+ 
                  '<span class="icons_all">'+
                       '<a href="#cataloguesearch" > <img src="img/icon_img.png"></a>'+
                        '<a href="#" ng-click="gotourl()"> <img src="img/assets/bell.png"> </a><a href="#" ng-click="takeback()"> <img src="img/assets/cart.png"></a><a href="#" class="ion-android-more-vertical"></a></span>';
	    
  	})

.directive("hold", function($ionicGesture){
return {
	restrict: 'A',
	link: function ($scope, $element, $attr){
		var handleHold = function(e){
			$scope.$apply($attr.hold);
		}
		
		$ionicGesture.on('hold', handleHold, $element);
		
	}
}
})
.directive('ngToBlack', function() {
    return {
        restrict: 'AE',
        replace: true,
        link: function(scope, elem, attrs) {
            elem.bind('hold', function() {
                elem.css("background-color", "#EFF1F5");
               
            });
            elem.bind('mouseover', function() {
                elem.css('cursor', ' ');
            });
        }
    };
});

