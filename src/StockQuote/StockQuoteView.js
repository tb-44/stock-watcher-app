import Marionette from 'backbone.marionette';
import template from './StockQuoteCard.html';
import _ from 'underscore';
import './stock-quote-card.scss';

export const StockQuoteView = Marionette.View.extend({
    tagName: 'section',
    className: 'stock-card',
    template: _.template(template),

    templateContext() {
        return {
            /**
             * @param {number|string} value
             * @returns {*}
             */
            formatMoney: value => value, // @TODO - complete the format money method, don't just return the input.
        };
    },
});
