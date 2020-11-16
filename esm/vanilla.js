
/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * @param {any} query .. should be {HTMLElement|string|JQuery}
 * @return {HTMLElement}
 */
export function getDom( query ){

	if( query.jquery ){
		return query[0];
	}

	if( query instanceof HTMLElement ){
		return query;
	}

	if( query.indexOf('<') > -1 ){
		let div = document.createElement('div');
		div.innerHTML = query.trim(); // Never return a text node of whitespace as the result
		return div.querySelector(':first-child');
	}

	return document.querySelector(query);
};

/**
 * Dispatch an event
 *
 * @param {HTMLElement} dom_el
 * @param {string} event_name
 */
export function triggerEvent( dom_el, event_name ){
	var event = document.createEvent('HTMLEvents');
	event.initEvent(event_name, true, false);
	dom_el.dispatchEvent(event)
};

/**
 * Apply CSS rules to a dom element
 *
 * @param {HTMLElement} dom_el
 * @param {object} css
 */
export function applyCSS( dom_el, css){
	Object.keys(css).forEach(function(name){
		dom_el.style[name] = css[name];
	});
}


/**
 * Add css classes
 *
 */
export function addClasses( elmts ){

	var classes		= classesArray.apply(null,arguments);
	elmts			= castAsArray(elmts);

	elmts.map( el => {
		classes.map( cls => {
			el.classList.add( cls );
		});
	});
}

/**
 * Remove css classes
 *
 */
 export function removeClasses( elmts ){

 	var classes 	= classesArray.apply(null,arguments);
	elmts		= castAsArray(elmts);

	elmts.map( el => {
		classes.map(cls => {
	 		el.classList.remove( cls );
		});
 	});
 }


/**
 * Return arguments
 *
 * @return {array}
 */
export function classesArray(){
	var classes = [];
	for( let i = 1; i < arguments.length; i++ ){
		let _classes = arguments[i];
		if( typeof _classes === 'string' ){
			_classes = _classes.trim().split(/[\11\12\14\15\40]/);
		}
		if( Array.isArray(_classes) ){
			classes = classes.concat(_classes);
		}
	}

	return classes.filter(Boolean);
}


/**
 * Create an array from arg if it's not already an array
 *
 *
 * @param {any} arg
 * @return {array}
 */
export function castAsArray(arg){
	if( !Array.isArray(arg) ){
 		arg = [arg];
 	}
	return arg;
}


/**
 * Get the closest node to the evt.target matching the selector
 * Stops at wrapper
 *
 * param {HTMLElement} target
 * @param {string} selector
 * @param {HTMLElement} [wrapper=null]
 * return {HTMLElement}
 */
export function parentMatch( target, selector, wrapper ){

	if( wrapper && !wrapper.contains(target) ){
		return;
	}

	while( target && target.matches ){

		if( target.matches(selector) ){
			return target;
		}

		target = target.parentNode;
	}
}

/**
 * Get the first or last item from a querySelectorAll result
 *
 * > 0 - right (last)
 * < 0 - left (first)
 *
 * @param {HTMLElement} el
 * @param {string} query
 * @param {number} direction
 * @return {HTMLElement}
 */
export function querySelectorEnd( el, query, direction){
	var result = el.querySelectorAll(query);
	if( !result ){
		return;
	}

	return getTail(result,direction);
};


/**
 * Get the first or last item from an array
 *
 * @param {array|NodeList} array
 * @param {number} direction
 * @return {any}
 */
export function getTail( array, direction ){

	if( direction > 0 ){
		return array[array.length-1];
	}

	return array[0];
}

/**
 * Return true if an object is empty
 *
 * @param {object} obj
 * @return {boolean}
 */
export function isEmptyObject(obj){
	return (Object.keys(obj).length === 0);
}


/**
 * Get the index of an element amongst sibling nodes of the same type
 *
 * @param {Element} el
 * @param {string} [amongst=null]
 * @return {number}
 */
export function nodeIndex( el, amongst ){
	if (!el) return -1;

	amongst = amongst || el.nodeName;

	var i = 0;
	while( el = el.previousElementSibling ){

		if( el.matches(amongst) ){
			i++;
		}
	}
	return i;
}