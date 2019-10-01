let scroll_functions = [];
let off_scroll_functions = [];
/**
 * @name jQuery onscrollTo Plugin
 * @author Josh Brown
 * @copyright Use it if you want but the code probably isn't great because I wrote it XD.
 * @version 1.2
 * @param {Object} options
 * @param {String} options.name - Name of the function, used to delete with onscrollTOff
 * @param {Number} options.max
 * @param {String} options.min
 * @param {Function} options.when - the function when the threshold is met
 * @param {Function} options.whenNot - the function when the threshold is not met (usually the reverse what ever when does)
 * @param {boolean} options.nextIsWhen - this is to make sure we don't run when or whenNot if we don't need to. Default is true.
 */
$.fn.onscrollTo = function (options) {
    const index = off_scroll_functions.findIndex(aFunc => aFunc.name === options.name);
    if(index !== -1){
        scroll_functions.push(off_scroll_functions[index]);
        off_scroll_functions.splice(index);
    } else {
        options.nextIsWhen = options.nextIsWhen || true;
        options.max = options.max || -1;
        options.min = options.min || -1;
        scroll_functions.push(options)
    }
};
$.fn.onscrollToOff = function (name,options) {
    console.log("cancelled: " + name);
    const theIndex = scroll_functions.findIndex(aFunc => name === aFunc.name);
    if(theIndex>=0) {
        let theFunction = scroll_functions[theIndex];
        scroll_functions.splice(scroll_functions[theIndex]);
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                theFunction[key] = options[key];
            }
        }
        off_scroll_functions.push(theFunction);
    }
};

/* end scorll stuff */
