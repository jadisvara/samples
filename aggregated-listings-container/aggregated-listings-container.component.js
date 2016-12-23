'use strict';
define(['event.angular.app.directives.module', 'utils', 'tracking'], function (app, utils, tracking) {
    app.component('aggregatedListingsContainer', {
        templateUrl: '/Areas/event/aggregated-listings-container/aggregated-listings-container.html',
        replace: true,
        bindings: {
            listings: '<',
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
            onQuantityChange: '&',
            highlightedListings: '<',
            onSelectListing: '&',
            onHighlightListing: '&',
            onGoBack: '&',
            canGoBack: '<'
        },
        controller: ['stateService', '$scope', 'debounce', function (stateService, $scope, debounce) {
            var $ctrl = this;
            $ctrl.state = stateService;
            $ctrl.goBack = goBack;
            $ctrl.$onChanges = onChanges;


            function onChanges(changes) {
                if (changes.highlightedListings) {
                    $ctrl.highlightedListings = changes.highlightedListings.currentValue;
                }
            }

            function goBack() {
                $ctrl.canGoBack = false;
                $ctrl.onGoBack();
            }
        }]
    });
});