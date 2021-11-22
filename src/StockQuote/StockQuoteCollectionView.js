import Marionette from 'backbone.marionette';
import { StockQuoteCard } from './StockQuoteCard';

export const StockQuoteCollectionView = Marionette.CollectionView.extend({
    childView: StockQuoteCard,
});

