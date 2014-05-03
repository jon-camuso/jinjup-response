## jinjup Response

A JavaScript object containing response information resulting from an asynchronous HTTP request to a node.js server.

## Response Properties

```js
{
	// Indicates to client what action to perform
	// post, put or delete
	//
	method
	
	// Indicates to client on what to perform the action
	// (see Response Subject below)
	//
	subject

	// Data to be delivered to client
	//
	content

	// Additional responses to be processed
	//
	responses
}
```

## Response Methods

Append a response to another response

	appendResponse()

Default method for created a jinjup response:

	createResponse()

Insert content (element, html or text) into element resolved by target

	postElement(path, content)

Replace existing element(s) @ path with content

	putElement(path, content)

Update element(s) set target[attribute] equal to content

	putAttribute(path, name, content)

Delete target element

	deleteElement(path)

Delete target element[attribute] attribute

	deleteAttribute(path, name)

	postConsole(path, content)

	postLog(content)

	postError(content)

	postWarn(content)

	postInfo(content)


## Response Subject Properties

```js
{
	// Indicates the client space in which to perform the action
	// Examples are 'console' and 'dom'
	//
	space
	
	// Indicates client item on what to perform the action
	// Examples include 'element', 'attribute' and 'console'
	//
	type

	// For types 'element' and attribute the path is a selector
	// that resolves to either the actual element or the containing
	// element targeted to be acted upon.  For 'console' type the path
	// resolves to the console method to be invoked - log, error etc.
	//
	path

	// For type 'attribute' indicates the name of the attribute to 
	// be acted upon.
	//
	name
}
```


## Examples

Require jinjup Response in your Node.js application

	var jjResponse = require('jinjup-response');

Return HTML

```js
		self.app.get('/asynch/new_content', function(req, res){

			var newContent = jjResponse.postElement('#content',
													'<div>Insert this div into my element having the id "content".</div>');

			res.send(JSON.stringify(newContent));
		});
```

Return a jinjup HTML Object

	var jjHtml = require('jinjup-html-controls');

```js
		self.app.get('/asynch/new_content', function(req, res){

			var div = jjHtml.div();			
			div.textContent = 'Insert this div into my element having the id "content".';

			var responseView = jjResponse.postElement('#content', div);
			
			res.send(JSON.stringify(responseView));
		});
```

Return console information:

```js
		self.app.get('/asynch/path_to_console_test', function(req, res){

			var logView = jjResponse.postLog('test log');

			var errorView = jjResponse.postError('test error');

			var warnView = jjResponse.postWarn('test warn');

			var info = jjResponse.postInfo('test info');
		
			logView.appendResponse(errorView);
			logView.appendResponse(warnView);
			logView.appendResponse(info);

			res.send(JSON.stringify(logView));
		});
```


## Real life Example

jinjup Response containing jinjup HTML control object as content:

```js
{
   "method":"put",
   "subject":{
      "space":"dom",
      "type":"element",
      "path":"#content"
   },
   "content":{
      "tagName":"div",
      "childNodes":[
         {
            "tagName":"article",
            "childNodes":[
               {
                  "tagName":"h1",
                  "childNodes":[
                     {
                        "nodeType":"text",
                        "nodeValue":"Contact the Author of JinJup"
                     }
                  ],
                  "attributes":{

                  },
                  "nodeType":"element"
               },
               {
                  "tagName":"p",
                  "childNodes":[
                     {
                        "nodeType":"text",
                        "nodeValue":"Jon Camuso"
                     }
                  ],
                  "attributes":{

                  },
                  "nodeType":"element"
               },
               {
                  "tagName":"p",
                  "childNodes":[

                  ],
                  "attributes":{

                  },
                  "nodeType":"element"
               }
            ],
            "attributes":{

            },
            "nodeType":"element"
         }
      ],
      "attributes":{
         "id":"content"
      },
      "nodeType":"element"
   }
}

```
