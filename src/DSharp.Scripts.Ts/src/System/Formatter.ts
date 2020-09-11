import { neutralCulture } from "./Globalization/Culture";
import { isValue } from "../Helpers";
import { typeName } from "../TypeSystem";
import { formatters } from "./FormatterStore";

// Formatting Helpers
var _formatPlaceHolderRE = /(\{[^\}^\{]+\})/g;

export function format(cultureOrFormat, ...args: any[]) {
    var culture = neutralCulture;
    var format = cultureOrFormat;
    var values = args;

    if (cultureOrFormat.constructor != String) {
        culture = cultureOrFormat;
        format = values[0];
        values = values.slice(1);
    }

    return format.replace(_formatPlaceHolderRE,
        function (str, match) {
            var index = parseInt(match.substr(1), 10);
            var value = values[index];
            if (!isValue(value)) {
                return '';
            }

            var formatter = formatters[typeName(value)];
            if (formatter) {
                var formatSpec = '';
                var formatIndex = match.indexOf(':');
                if (formatIndex > 0) {
                    formatSpec = match.substring(formatIndex + 1, match.length - 1);
                }
                if (formatSpec && (formatSpec != 'i')) {
                    return formatter(value, formatSpec, culture);
                }
            }
            return culture == neutralCulture ? value.toString() : value.toLocaleString();
        });
}