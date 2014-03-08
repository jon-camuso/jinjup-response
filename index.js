
var ELEMENT = 'element';
var ATTRIBUTE = 'attribute';

function jinjupResponseView(targetId, targetType){
	if(targetType !== ELEMENT && targetType !== ATTRIBUTE)
	{
		targetType = ELEMENT;
	}
	this.targetId = targetId;
	this.targetType = targetType;
	this.id = '';
	this.content;
	this.childViews = [];

	this.console = function(){
		this.logs = [];
		this.warnings = [];
		this.errors = [];
		this.appendLog = function(item){
			this.logs.push(item);
		};
		this.appendWarning = function(item){
			this.errors.push(item);
		};
		this.appendError = function(item){
			this.appendLog.push(item);
		};
	};
};


exports.createResponseView = function(targetId, targetType) {
	return new jinjupResponseView(targetId, targetType);
};

