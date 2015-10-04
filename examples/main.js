(function () {
    angular.module('appmera', ['angular-fn']);
    
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula mollis dolor, consectetur lobortis tellus luctus ac. Phasellus feugiat, tortor a suscipit accumsan, ligula nulla eleifend nisl, at pulvinar magna quam tincidunt sapien. Donec vulputate viverra egestas. Fusce fringilla venenatis arcu, vel interdum turpis volutpat id. Integer maximus lectus elementum dui semper pulvinar. Sed ligula arcu, rutrum quis posuere nec, feugiat sed nibh.';
    
    angular.module('appmera').controller('MainCtrl', ['$scope', '$timeout', 'fnBlockUi', function ($scope, $timeout, fnBlockUi) {
        
        $timeout(fnBlockUi('deneme'), 5000);
        
        $scope.lorem = lorem;
        
        fnBlockUi('withCustomTemplate', 5000);
        fnBlockUi('withExternalTemplate', 4000);
    }]);
} ());