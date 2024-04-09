import Marionette from "backbone.marionette";
import template from "./StockQuoteCard.html";
import _ from "underscore";
import "./stock-quote-card.scss";

export const StockQuoteCard = Marionette.View.extend({
    tagName: "section",
    className: "stock-card",
    template: _.template(template),

    templateContext() {
        const change = this.model.get("change");
        const changePercent = this.model.get("changePercent");
        const arrowDirection = change >= 0 ? "up" : "down";
        const changeClass = change >= 0 ? "positive" : "negative";
        const percentClass = `percent-${arrowDirection}`;
        const changePercentFixed = `${parseFloat(changePercent).toFixed(2)}%`;
        const changeFixed = parseFloat(change).toFixed(2);

        return {
            /**
             * @param {number|string} value
             * @returns {number} dollar-formatted value
             */
            formatMoney: (value) => {
                const number = typeof value === "string" ? parseFloat(value) : value;
                return new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(number);
            },
            changeClass: changeClass,
            changeFixed: changeFixed,
            percentClass: percentClass,
            changePercentFixed: changePercentFixed,
        };
    },
    /**
     * @returns {string} stock graph indicator top position
     */
    onRender() {
        const high = this.model.get("high");
        const low = this.model.get("low");
        const price = this.model.get("price");
        const range = high - low;
        let top;

        if (range === 0) {
            top = "50%";
        } else {
            const positionRange = (price - low) / range;
            const position = 10 + (1 - positionRange) * 100;
            top = `${position.toFixed(2)}%`;
        }

        this.$(".stock-graph-indicator").css("top", top);
    },
});
