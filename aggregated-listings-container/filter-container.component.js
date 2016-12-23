'use strict';

define(['event.angular.app.directives.module'], function (app) {
    app.component('filterContainer', {
        templateUrl: '/Areas/event/aggregated-listings-container/filter-container.html',
        replace: true,
        bindings: {
            price: '<',
            quantity: '<',
            priceProportion: '<',
            priceProportionMax: '<',
            minPrice: '<',
            maxPrice: '<',
            priceFilterLevel: '<',
            upperRangePrice: '<',
            availableQuantities: '<',
            onPriceChange: '&',
            onQuantityChange: '&'
        },
        controller: ['stateService', 'eventService', '$scope', function (stateService, eventService, $scope) {
            var $ctrl = this;
            $ctrl.state = stateService;
            $ctrl.isSliderDisabled = $ctrl.state.sigleFPListing;
            $ctrl.onQuantityChanged = onQuantityChanged;


            function onQuantityChanged(newQuantity) {
                $ctrl.onQuantityChange({ newQuantity: newQuantity.hasOwnProperty('key') ? newQuantity.key : newQuantity });
            }
        }]
    });
});