angular.module('website', ['ngAnimate', 'ngTouch'])
.controller('MainCtrl', function ($scope, $timeout, $location, $anchorScroll) {
 //.controller('MainCtrl', function ($scope, $timeout) {
debugger;
     $scope.slides = [
         { image: '../images/1.jpg', description: 'Image 00' },
         { image: '../images/2.jpg', description: 'Image 01' },
         { image: '../images/3.jpg', description: 'Image 02' },
         { image: '../images/4.jpg', description: 'Image 03' },
         { image: '../images/5.jpg', description: 'Image 04' },
         { image: '../images/6.jpg', description: 'Image 05' }
     ];

     $scope.Scroll = function (id) {
         $location.hash(id);
         console.log($location.hash());
         $anchorScroll();
     };

     $scope.direction = 'left';
     $scope.currentIndex = 0;

     $scope.OpenWindow = function (url) {
         window.open("http://" + url, '_blank');
     }

     $scope.addPatientDetails = function () {
         window.location.href = pageUrl + "addpatient.html";
     };

     $scope.viewPatientDetails = function () {
         window.location.href = pageUrl + "viewpatient.html";
     };

     $scope.Home = function () {
         window.location.href = pageUrl + "index.html";
     };

     $scope.setCurrentSlideIndex = function (index) {
         $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
         $scope.currentIndex = index;
     };

     $scope.isCurrentSlideIndex = function (index) {
         return $scope.currentIndex === index;
     };

     $scope.prevSlide = function () {
         $scope.direction = 'left';
         $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
     };

     $scope.nextSlide = function () {
         $scope.direction = 'right';
         $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
     };
     
     var timer;
     var sliderFunc = function () {
         timer = $timeout(function () {
             $scope.prevSlide();
             timer = $timeout(sliderFunc, 2000);
         }, 2000);
     };
     
     $("#imageArea").hover(function () {
         $timeout.cancel(timer);
     },function() {
         sliderFunc();
     });

     sliderFunc();

 })
 .animation('.slide-animation', function () {
     return {
         beforeAddClass: function (element, className, done) {
             var scope = element.scope();

             if (className == 'ng-hide') {
                 var finishPoint = element.parent().width();
                 if (scope.direction !== 'right') {
                     finishPoint = -finishPoint;
                 }
                 TweenMax.to(element, 0.5, { left: finishPoint, onComplete: done });
             }
             else {
                 done();
             }
         },
         removeClass: function (element, className, done) {
             var scope = element.scope();

             if (className == 'ng-hide') {
                 element.removeClass('ng-hide');

                 var startPoint = element.parent().width();
                 if (scope.direction === 'right') {
                     startPoint = -startPoint;
                 }

                 TweenMax.fromTo(element, 0.5, { left: startPoint }, { left: 0, onComplete: done });
             }
             else {
                 done();
             }
         }
     };
 });