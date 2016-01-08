'use strict';

define([], function(){
	var elementHandlers = {
		tr: function(parent) {
			if(parent !== null) return parent.insertRow();
			else return this['*'](parent, 'tr');
		},
		td: function(parent) {
			if(parent !== null) return parent.insertCell();
			else return this['*'](parent, 'td');
		},
		text: function(parent) {
			var textNode =  document.createTextNode('New Node Inserted here');
			if(parent !== null) parent.appendChild(textNode);
			return textNode;
		},
		'*': function(parent, elementName) {
			var element = document.createElement(elementName);
			if(parent !== null) parent.appendChild(element);
			return element;
		}

	};

	function createElement(elementName, options) {
		options = options || {};
		var element = null;
		
		if(elementHandlers.hasOwnProperty(elementName)) {
			element = elementHandlers[elementName](options.parent);
		} 
		else{
			element = elementHandlers['*'](options.parent, elementName);
		} 

		decorateElement(element, options);

		return element;
	}

	var indexes = [{ name: 'zero'}, { name: 'one'}, { name: 'two'}];
	function getElementsByIndex(index) {
		return indexes[index];
	}

	function decorateElement(element, options) {
		if(options.text !== undefined) {
			setTextToElement(element, options.text);
		}
		if(options.className !== null) {
			element.className = options.className;
		}
	}

	function setTextToElement(element, text){
		//Modern browsers
		if(element.textContent !== null){
			element.textContent = text;
		} else {
			element.innerHTML = text;
		}
	}

	// Calling without second parameter will enable  default display
	function display(element, state) {
		state = state || null;
		element.style.display = state;

	}

	function removeClassName(element, className) {
		var classes = element.className.split(' ');

		if(~classes.indexOf(className)) {
			classes.splice(classes.indexOf(className), 1);
			element.className = classes.join(' ');
		}
		
	}

	function addClassName(element, className) {
		var classes = element.className.split(' ');

		if(!~classes.indexOf(className)) {
			classes.push(className);
			element.className = classes.join(' ');
		}
		
	}

	function addEventListener(element, type, cb){
		if(window.addEventListener) {
			element.addEventListener(type, cb, false);
		} else if(window.attachEvent){
			element.attachEvent('on' + type, cb);
		} else {
			element['on' + type] = cb;
		}
	}

	function removeEventListener(element, type, cb){
		if(window.addEventListener){
			element.removeEventListener(type, cb, false);
		} else if (window.attachEvent){
			element.detachEvent('on' + type, cb);
		} else {
			element['on' + type];
		}
	}


	return {
		create: createElement
	  ,	text: setTextToElement
	  ,	display: display
	  , on: addEventListener
	  , off: removeEventListener
	  , removeClass: removeClassName
	  , addClass: addClassName
	}

});