
var ELEMENT = 'element';
var ATTRIBUTE = 'attribute';
var CONSOLE = 'console';

function jinjupResponseView(targetId, targetType){
	if(!targetType)
	{
		targetType = ELEMENT;
	}
	this.targetId = targetId;
	this.targetType = targetType;
	this.id = '';
	this.content;
	this.childViews = [];
};


exports.createResponseView = function(targetId, targetType) {
	return new jinjupResponseView(targetId, targetType);
};
exports.createAttributeView = function(targetId){
	return new jinjupResponseView(targetId, ATTRIBUTE);
};
exports.createConsoleView = function(targetId){
	return new jinjupResponseView(targetId, CONSOLE);
};


