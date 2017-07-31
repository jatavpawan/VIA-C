angular.module('filter.controllers', [])

.controller('FilterCtrl', function($scope, $state) {
    $scope.filter = {};
    $scope.setFilters = function() {
        if(localStorage.getItem("productName"))
            $scope.filter.product_name = localStorage.getItem("productName");
        if(localStorage.getItem("minPrice"))
            $scope.filter.min_price = Number(localStorage.getItem("minPrice"));
        if(localStorage.getItem("maxPrice"))
            $scope.filter.max_price = Number(localStorage.getItem("maxPrice"));
        if(localStorage.getItem("productId"))
            $scope.filter.product_id = Number(localStorage.getItem("productId"));
    };
    $scope.setFilters();
    $scope.filterProduct = function(filter) {
        if(filter.product_name)
            localStorage.setItem("productName",filter.product_name);
        else
            localStorage.setItem("productName",'');
        if(filter.min_price)
            localStorage.setItem("minPrice",filter.min_price);
        else
            localStorage.setItem("minPrice",'');
        if(filter.max_price)
            localStorage.setItem("maxPrice",filter.max_price);
        else
            localStorage.setItem("maxPrice",'');
        if(filter.product_id)
            localStorage.setItem("productId",filter.product_id);
        else
            localStorage.setItem("productId",'');
        $state.go('app.product');
    };
})