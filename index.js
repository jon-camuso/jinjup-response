/*
jinjup-response v0.1.0
jinjup.com 
Copyright (c) 2013-2014 Jon Camuso <jcamuso@exechos.com>
MIT Licensed
*/

// Initialize a jinjup Response
//
// @param	{String}	method
// @param	{Object}	subject
// @param	{Object} || {String}	content
//
function Response(method, subject, content)
{
	this.responses = null;
	this.method = method ? method : '';
	this.subject = subject;
	this.content = content ? content : null;

	this.appendResponse = function (response)
	{
		if (response instanceof Response)
		{
			if (!this.responses)
			{
				this.responses = [];
			}
			this.responses.push(response);
		}
	}
};

// Initialize a jinjup Response Subject
//
// @param	{String}	space
// @param	{String}	type
// @param	{String}	path
// @param	{String}	name
//
function Subject(space, type, path, name)
{
	this.space = space;
	this.type = type;
	this.path = path;
	if (name)
	{
		this.name = name;
	}
};
var tempSubject = function () { };
tempSubject.prototype = Subject.prototype;

function Element(path)
{
	Subject.call(this, 'dom', 'element', path);
};
Element.prototype = new tempSubject();
Element.prototype.constructor = Subject;

function Attribute(path, name)
{
	Subject.call(this, 'dom', 'attribute', path, name);
};
Attribute.prototype = new tempSubject();
Attribute.prototype.constructor = Subject;

function Console(path)
{
	Subject.call(this, 'console', 'console', path);
};
Console.prototype = new tempSubject();
Console.prototype.constructor = Subject;

var tempConsole = function () { };
tempConsole.prototype = Console.prototype;

function Log()
{
	Console.call(this, 'log');
};
Log.prototype = new tempConsole();
Log.prototype.constructor = Console;

function Warn()
{
	Console.call(this, 'warn');
};
Warn.prototype = new tempConsole();
Warn.prototype.constructor = Console;

function Info()
{
	Console.call(this, 'info');
};
Info.prototype = new tempConsole();
Info.prototype.constructor = Console;

function Error(path)
{
	Console.call(this, 'error');
};
Error.prototype = new tempConsole();
Error.prototype.constructor = Console;


// Create a new Response
//
exports.createResponse = function (method, subject, content)
{
	return new Response(method, subject, content);
}

// Insert content (element, html or text) into element resolved by target
//
exports.postElement = function (path, content)
{
	return new Response('post', new Element(path), content);
}

// Replace existing element(s) @ path with content
//
exports.putElement = function (path, content)
{
	return new Response('put', new Element(path), content);
}

// Update element(s) set target[attribute] equal to content
//
exports.putAttribute = function (path, name, content)
{
	return new Response('put', new Attribute(path, name), content);
}

// Delete target element
// 
exports.deleteElement = function (path)
{
	return new Response('delete', new Element(path));
}

// Delete target element[attribute] attribute
// 
exports.deleteAttribute = function (path, name)
{
	return new Response('delete', new Attribute(path, name));
}

// Insert information into consol space
//
exports.postConsole = function (path, content)
{
	return new Response('post', new Console(path), content);
}

// Insert content into consol Log
//
exports.postLog = function (content)
{
	return new Response('post', new Log(), content);
}

// Insert content into consol Error
//
exports.postError = function (content)
{
	return new Response('post', new Error(), content);
}

// Insert content into consol Warn
//
exports.postWarn = function (content)
{
	return new Response('post', new Warn(), content);
}

// Insert content into consol Info
//
exports.postInfo = function (content)
{
	return new Response('post', new Info(), content);
}

