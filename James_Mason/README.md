#Basic HTTP Server
This is a basic HTTP server.  It responds to two routes, '/time' and '/greet'.

'/time' returns the current server time to the client when a GET request is performed by the client.

'/greet/name' returns a personal greeting to the client ([name]) when a GET request is performed by the client.  Name must be a single word string in this case.  The client may also perform a POST request to '/greet' where [name] will be collected from a JSON object with a name property.  For example, sending the JSON object '{"name": "John"}' will return "Hello John".

###cURL Usage Examples:

After starting the server, the following console commands will return these results.

`$curl -H "Content-Type: application/json" -X POST -d '{"name": "YourName"}' http://localhost:3000/greet`

Returns: `Hello YourName`
In the above case, if a [name] is specified in the URL as well (http://localhost:3000/greet/AnotherName), the name property of the JSON object will be the [name] returned in the 'Hello [name]' string.

`$curl -X GET http://localhost:3000/greet/YourName`

Returns: `Hello YourName`

`$curl -X GET http://localhost:3000/time`

Returns: `The current local server time is [hour]:[minute]:[second] on [month]/[day]/[year]`

###Browser Usage Examples:

After starting the server, the searching the following in your browser's address bar will direct the user to the following results.

`http://localhost:3000/time`

Directs the user to a page displaying the string, `The current local server time is [hour]:[minute]:[second] on [month]/[day]/[year]`.

`http://localhost:3000/greet/YourName`

Directs the user to a page displaying the string, `Hello YourName`.
