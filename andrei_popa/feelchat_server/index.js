const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let CLIENTS=[];
// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  let newClient=null;
  if(!CLIENTS.find(c=>c.conn==ws)){
    newClient={conn:ws,id:CLIENTS.length+1,new:true}
    CLIENTS.push(newClient);
    ws.send(JSON.stringify({id:newClient.id}));
  }

  ws.on('message', function incoming(data) {    
    wss.clients.forEach(function each(client) {    
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));            
      }
    });
  });
});
console.log("server started")