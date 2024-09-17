const net = require('net');
const readline = require('readline');
const WebSocket = require('ws');
const tags = require('./models/tags'); // Asegúrate de que la ruta a tu modelo sea correcta
const { arregloTagsPS18Antenas } = require('./helpers/california/arregloTagsAireacion');
const { arregloTags1B, arregloTags1BGeneral, arregloTags1BAntenas, arregloTags1BTCP } = require('./helpers/arregloTags');

const wss = new WebSocket.Server({ port: 5050 }); // Configura el puerto WebSocket

let interval = null; // Para guardar el setInterval
let activeClients = 0; // Contador de clientes conectados
let dataCache = {
    getEb1B: [],
    getEb1BGral: [],
    getEb1BTCP: [],
    getEb1BAntenas: []
}; // Cache para almacenar los datos

let completedFuntions = 0
// Función para leer los datos del servicio externo

const checkAllFuntionsComplete = () => {
    if (completedFuntions === 4) {
        broadcastData()
        completedFuntions = 0
    }
}

const broadcastData = () => {
    //wss.clients.forEach(client => {
        //if (client.readyState === WebSocket.OPEN) {
            //console.log("Sending data: ", JSON.stringify(dataCache))
            //client.send(JSON.stringify(dataCache));
        //}
    //});

    clientSubscriptions.forEach((isSubscribed, client) => {
        if (isSubscribed) {
            console.log("Sending data: ", JSON.stringify(dataCache))
            client.send(JSON.stringify(dataCache));
        }
    })

}



const getEb1B = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1B()}},"ClientCookie":"myReadTagRequest1"}\n`;
            let obje = {};
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    dataCache.getEb1B = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(3)] = ex.Value;     
                    });
                    dataCache.getEb1B.push(obje)
                    obje = {}
                    completedFuntions++
                    checkAllFuntionsComplete()
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEb1BGral = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1BGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            let obje = {};
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    dataCache.getEb1BGral = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(3)] = ex.Value;     
                    });
                    dataCache.getEb1BGral.push(obje)
                    obje = {}
                    completedFuntions++
                    checkAllFuntionsComplete()
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEb1BTCP = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1BTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            let obje = {};
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    dataCache.getEb1BTCP = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(3)] = ex.Value;     
                    });
                    dataCache.getEb1BTCP.push(obje)
                    obje = {}
                    completedFuntions++
                    checkAllFuntionsComplete()
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEb1BAntenas = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1BAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            let obje = {};
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    dataCache.getEb1BAntenas = [];
                    arreglo.forEach((ex, i) => {
                        obje[ex.Name.slice(7)] = ex.Value;     
                    });
                    dataCache.getEb1BAntenas.push(obje)
                    obje = {}
                    completedFuntions++
                    checkAllFuntionsComplete()
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const executeAllFuntions = () => {
    getEb1BAntenas(),
    getEb1B(),
    getEb1BGral(),
    getEb1BTCP()
}

const subscribedClients = new Set()
const clientSubscriptions = new Map()

// Manejar la conexión de nuevos clientes WebSocket
wss.on('connection', (ws) => {

    clientSubscriptions.set(ws, false)

    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`)
        if (message.toString() === '1b'){
            console.log('Cliente suscrito')
            console.log('aquii')
            
            clientSubscriptions.set(ws, true);
            activeClients++;

            // Enviar los datos almacenados al nuevo cliente
            //if (dataCache.length > 0) {
                //ws.send(JSON.stringify(dataCache));
            //}

            // Si no hay un interval en ejecución, iniciar uno
            if (!interval) {
                interval = setInterval(executeAllFuntions, 2000); // Ejecutar cada 5 segundos
            }
        } else if (message.toString() === 'no1b'){
            clientSubscriptions.set(ws, false);
            console.log('Cliente desuscrito')
        }
        
    })

    

    // Manejar la desconexión del cliente
    ws.on('close', () => {
        //activeClients--;
        //if (activeClients === 0) {
            //clearInterval(interval); // Detener el interval si no hay clientes
            //interval = null;
        //}

        clientSubscriptions.delete(ws);
        console.log('Cliente desconectado')
    });

    // Manejar errores
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server running on ws://localhost:8080');