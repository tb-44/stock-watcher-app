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
            console.warn('No input detected, aborting search');
            alert('No input detected, please input stock symbol for search');

            return;
        }

        this.ui.stockSearchInput.val('');

        this.trigger('stockSearch', {symbol: symbol.toUpperCase()});
    },
});

export default MainView;
