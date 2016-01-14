var route = exports.route = function(handle, pathname){
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function'){
    return handle[pathname]();
  } else {
    console.log('No handler found in route for ' + pathname);
  }
};
