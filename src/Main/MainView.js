import Marionette from 'backbone.marionette';
import template from './MainTemplate.html';
import _ from 'underscore';
import './main.scss';

const MainView = Marionette.View.extend({
    template: _.template(template),
    el: '#app',

    ui: {
        stockSearchForm: '#stock-search',
        stockSearchInput: '#stock-search-input',
        stockSearchButton: '#stock-search-button'
    },

    events: {
        'submit @ui.stockSearchForm': 'searchStock',
        'click @ui.stockSearchButton': 'searchStock',
    },

    searchStock: function(e) {
        e.preventDefault();

        const symbol = this.ui.stockSearchInput.val();

        if (symbol.length < 1) {
            // @TODO - show the user a warning here
            console.warn('No input detected, aborting search');

            return;
        }

        this.ui.stockSearchInput.val('');

        this.trigger('stockSearch', {symbol: symbol.toUpperCase()});
    },
});

export default MainView;
