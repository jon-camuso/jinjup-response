## jinjup Response

A JavaScript object containing response information resulting from an asynchronous HTTP request to a node.js server.

## Properties

```js
{
	targetId:'';
	targetType:'';
	id:'';
	content:{};
	childViews = [];
}
```

The targetId property is the DOM element id of the element or the mode (log, error, info, warn) of the client console targeted for update.
The targetType property indicates whether the target is an 'element' or a 'console' item.
The id property is the id of the outer most element contained in the content property
The childViews property is an array of more jinjup reponse objects to be processed recursively by the jinjup client.


## Methods

Default method for created a jinjup response:

	createResponseView()

For returning console information call:

	createConsoleView()

Soon to be implemented is support for returning attribute information:

	createAttributeView()


## Examples

Require jinjup Response in your Node.js application

	var jjResponse = require('jinjup-response');

Return HTML

```js
		self.app.get('/asynch/new_content', function(req, res){

			var responseView = jjResponse.createResponseView('content');			
			responseView.content = '<div>Insert this div into my element having the id "content".</div>';
		
			res.send(JSON.stringify(responseView));
		});
```

Return a jinjup HTML Object

	var jjHtml = require('jinjup-html-controls');

```js
		self.app.get('/asynch/new_content', function(req, res){

			var responseView = jjResponse.createResponseView('content');
			
			var div = jjHtml.div();			
			div.textContent = 'Insert this div into my element having the id "content".';
			
			responseView.content = div;
		
			res.send(JSON.stringify(responseView));
		});
```

Return console information:

```js
		self.app.get('/asynch/path_to_console_test', function(req, res){

			var logView = jjResponse.createConsoleView('log');
			logView.content = 'test log';

			var errorView = jjResponse.createConsoleView('error');
			errorView.content = 'test error';

			var warnView = jjResponse.createConsoleView('warn');
			warnView.content = 'test warning';

			var info = jjResponse.createConsoleView('info');
			info.content = 'test information';
		
			responseView.childViews.push(logView);
			responseView.childViews.push(errorView);
			responseView.childViews.push(warnView);
			responseView.childViews.push(info);

			res.send(JSON.stringify(responseView));
		});
```


## Real life Example

jinjup Response containing jinjup HTML control object as content:

```js
{
   "targetId":"content",
   "targetType":"element",
   "id":"",
   "childViews":[],
   "content":{
      "tagName":"article",
      "childNodes":[
         {
            "tagName":"h1",
            "childNodes":[
               {
                  "nodeType":"text",
                  "nodeValue":"About JinJup"
               }
            ],
            "attributes":{},
            "nodeType":"element"
         },
         {
            "tagName":"p",
            "childNodes":[
               {
                  "nodeType":"text",
                  "nodeValue":"The jinjup libraries are intended to enable rapid and easy creation of HTML content, that is both ajax enabled and SEO freindly, using pure JavaScript on the client and on the server."
               }
            ],
            "attributes":{},
            "nodeType":"element"
         },
         {
            "tagName":"p",
            "childNodes":[],
            "attributes":{},
            "nodeType":"element"
         }
      ],
      "attributes":{},
      "nodeType":"element"
   }
}