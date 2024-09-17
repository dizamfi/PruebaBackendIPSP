const net = require('net');
const readline = require('readline');
const { arregloTagsCabala1, arregloTagsCabala1General, arregloTagsCabala1TCP, arregloTagsCabala1Antenas } = require('./helpers/cabala1/arregloTagsCabala1');
const { arregloTagsCabala2, arregloTagsCabala2General, arregloTagsCabala2TCP, arregloTagsCabala2Antenas } = require('./helpers/cabala2/arregloTagsCabala2');
const { arregloTagsPrecSantaMonica, arregloTagsSanDiego, arregloTagsSanFranscisco, arregloTagsSantaBarbara, arregloTagsSantaMonicaA, arregloTagsSantaRosaA, arregloTagsSantaRosaB, arregloTagsPrecSantaMonicaGeneral, arregloTagsPrecSantaMonicaTCP, arregloTagsSanDiegoGeneral, arregloTagsSanDiegoTCP, arregloTagsSanFransciscoGeneral, arregloTagsSanFransciscoTCP, arregloTagsSantaBarbaraGeneral, arregloTagsSantaBarbaraTCP, arregloTagsSantaMonicaAGeneral, arregloTagsSantaMonicaATCP, arregloTagsSantaRosaAGeneral, arregloTagsSantaRosaATCP, arregloTagsSantaRosaBGeneral, arregloTagsSantaRosaBTCP, arregloTagsPrecSantaMonicaAntenas, arregloTagsSanDiegoAntenas, arregloTagsSanFransciscoAntenas, arregloTagsSantaBarbaraAntenas, arregloTagsSantaMonicaAAntenas, arregloTagsSantaRosaAAntenas, arregloTagsSantaRosaBAntenas, arregloTagsEstadoBombasCalifornia } = require('./helpers/arregloTagsCalifornia');
const { arregloTagsCamarpasaAntenas, arregloTagsCamarpasa, arregloTagsCamarpasaGeneral, arregloTagsCamarpasaTCP, arregloTags1B, arregloTags1BGeneral, arregloTags1BTCP, arregloTags1BAntenas, arregloTagsApendice, arregloTagsApendiceGeneral, arregloTagsApendiceTCP, arregloTagsApendiceAntenas, arregloTagsDePesca, arregloTagsDePescaGeneral, arregloTagsDePescaTCP, arregloTagsDePescaAntenas, arregloTagsEstadoBombasChanduy, arregloTagsPanamao, arregloTagsPanamaoGeneral, arregloTagsPanamaoTCP, arregloTagsPanamaoAntenas } = require('./helpers/arregloTags');
const { generarTags, generarTagsTA, generarTagsTCP, arregloTagsPC01Antenas, arregloTagsPC02Antenas, arregloTagsPC03Antenas, arregloTagsPC04Antenas, arregloTagsPC05Antenas, arregloTagsPC06Antenas, arregloTagsPC07Antenas, arregloTagsPC08Antenas, arregloTagsPC09Antenas, arregloTagsPC10Antenas, arregloTagsPC11Antenas, arregloTagsPC12Antenas, arregloTagsPC13Antenas, arregloTagsPC14Antenas, arregloTagsPC15Antenas, arregloTagsPC16Antenas, arregloTagsPC17Antenas, arregloTagsPC18Antenas, arregloTagsPS01Antenas, arregloTagsPS02Antenas, arregloTagsPS03Antenas, arregloTagsPS04Antenas, arregloTagsPS05Antenas, arregloTagsPS06Antenas, arregloTagsPS07Antenas, arregloTagsPS08Antenas, arregloTagsPS09Antenas, arregloTagsPS10Antenas, arregloTagsPS11Antenas, arregloTagsPS12Antenas, arregloTagsPS13Antenas, arregloTagsPS14Antenas, arregloTagsPS15Antenas, arregloTagsPS16Antenas, arregloTagsPS17Antenas, arregloTagsPS18Antenas, arregloTagsPS19Antenas, arregloTagsPS20Antenas, arregloTagsAntenasSectoriales, arregloTagsPiscinasGeneral } = require('./helpers/california/arregloTagsAireacion');
const tags = require('./models/tags');


const { connectionDB } = require('./db/config');


connectionDB();


const getEbCabala1 = () => {
    let objeto = [];
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala1()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEbCabala1Gral =  () => {
    let objeto = [];
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala1General()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();   
                    });
                   
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        
    }
};

const getEbCabala1TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala1TCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbCabala1Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala1Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbCabala2 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala2()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error)
    }
};

const getEbCabala2Gral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala2General()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();    
                    });
                   
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
       
    }
};

const getEbCabala2TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala2TCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbCabala2Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala2Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    
    }
};

const getEbPrecSantaMonica =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPrecSantaMonica()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbPrecSantaMonicaGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPrecSantaMonicaGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbPrecSantaMonicaTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPrecSantaMonicaTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();  
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbPrecSantaMonicaAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPrecSantaMonicaAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};


const getEbSanDiego =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanDiego()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSanDiegoGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanDiegoGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSanDiegoTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanDiegoTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSanDiegoAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanDiegoAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSanFranscisco =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFranscisco()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();  
                    });
                    
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSanFransciscoGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFransciscoGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSanFransciscoTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFransciscoTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();  
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSanFransciscoAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFransciscoAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};


const getEbSantaBarbara =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaBarbara()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaBarbaraGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaBarbaraGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaBarbaraTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaBarbaraTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save(); 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaBarbaraAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaBarbaraAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaMonicaA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaMonicaA()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaMonicaAGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaMonicaAGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaMonicaATCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaMonicaATCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaMonicaAAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaMonicaAAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaRosaA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaA()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaRosaAGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaAGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaRosaATCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaATCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaRosaAAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaAAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save(); 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaRosaB =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaB()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaRosaBGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaBGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaRosaBTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaBTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbSantaRosaBAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaBAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEb1B =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1B()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEb1BGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1BGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEb1BTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1BTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save(); 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEb1BAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1BAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbApendice =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsApendice()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save(); 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbApendiceGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsApendiceGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save(); 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbApendiceTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsApendiceTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbApendiceAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsApendiceAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbCamarpasa =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasa()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbCamarpasaGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasaGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbCamarpasaAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasaAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbCamarpasaTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasaTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbDePesca =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsDePesca()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();  
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbDePescaGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsDePescaGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save(); 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbDePescaTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsDePescaTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbDePescaAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsDePescaAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbPanamao =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPanamao()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbPanamaoGral =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPanamaoGeneral()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbPanamaoTCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPanamaoTCP()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})
                        data.value = ex.Value
                        await data.save();
                           
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getEbPanamaoAntenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPanamaoAntenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC01 = () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_01'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC01TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_01_TA_01', 'PC_01_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC01Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC01Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC02 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC02Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC02Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC02TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_02_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC02TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_02_TA_01'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC03 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC03Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC03Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC03TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_03_TA_01','PC_03_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC03TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_03_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC04 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_04'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC04Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC04Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC04TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_04_TA_01'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC04TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_04_TA_02','PC_04_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC05 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC05Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC05Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC05TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_05_TA_01','PC_05_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC05TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_05_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC06 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC06Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC06Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC06TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_06_TA_02','PC_06_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC06TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_06_TA_01'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }  
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC07 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC07Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC07Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }  
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC07TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_07_TA_01','PC_07_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC07TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_07_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        } 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC08 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_08'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC08Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC08Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC08TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_08_TA_02','PC_08_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        } 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC08TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_08_TA_01'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC09 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_09'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC09Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC09Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC09TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_09_TA_01','PC_09_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC09TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_09_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC10 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_10'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        } 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC10Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC10Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC10TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_10_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        } 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC10TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_10_TA_01','PC_10_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        } 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC11 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_11'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC11Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC11Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        } 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC11TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_11_TA_01','PC_11_TA_02','PC_11_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC12 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_12'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC12Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC12Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                   
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC12TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_12_TA_01','PC_12_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC12TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_12_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC13 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_13'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }  
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC13Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC13Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC13TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_13_TA_02','PC_13_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC13TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_13_TA_01'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        } 
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC14 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_14'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC14Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC14Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                    
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC14TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_14_TA_02','PC_14_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }  
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC14TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_14_TA_01'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC15 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_15'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC15Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC15Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC15TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_15_TA_01','PC_15_TA_02','PC_15_TA_04'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                    
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC15TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_15_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC16 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_16'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC16Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC16Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC16TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_16_TA_01','PC_16_TA_02','PC_16_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }   
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC17 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_17'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC17Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC17Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC17TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_17_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC17TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_17_TA_01','PC_17_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC18 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PC_18'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC18Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPC18Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC18TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PC_18_TA_01','PC_18_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }  
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPC18TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PC_18_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO1 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_01'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });  
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO1Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS01Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                 
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO1TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_01_TA_01','PIS_01_TA_03','PIS_01_TA_05','PIS_01_TA_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS01TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_01_TA_02','PIS_01_TA_04','PIS_01_TA_06','PIS_01_TA_08'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO2 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });                 
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO2Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS02Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });                  
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO2TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_02_TA_01','PIS_02_TA_03','PIS_02_TA_05','PIS_02_TA_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS02TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_02_TA_02','PIS_02_TA_04','PIS_02_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });                  
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO3 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO3Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS03Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO3TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_03_TA_01','PIS_03_TA_02','PIS_03_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS03TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_03_TA_04','PIS_03_TA_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO4 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_04'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO4Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS04Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO4TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_04_TA_03','PIS_04_TA_04'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS04TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_04_TA_01','PIS_04_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO5 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO5Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS05Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO5TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_05_TA_01','PIS_05_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS05TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_05_TA_02','PIS_05_TA_04'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO6 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO6Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS06Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO6TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_06_TA_03','PIS_06_TA_04'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS06TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_06_TA_01','PIS_06_TA_02'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO7 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO7Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS07Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO7TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_07_TA_01','PIS_07_TA_03','PIS_07_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS07TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_07_TA_02','PIS_07_TA_04','PIS_07_TA_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO8 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_08'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO8Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS08Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO8TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_08_TA_02','PIS_08_TA_04','PIS_08_TA_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS08TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_08_TA_01','PIS_08_TA_03','PIS_08_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO9 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_09'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO9Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS09Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPISO9TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_09_TA_01','PIS_09_TA_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS09TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_09_TA_02','PIS_09_TA_03','PIS_09_TA_04','PIS_09_TA_05','PIS_09_TA_06','PIS_09_TA_08'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS10 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_10'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS10Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS10Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS10TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_10_TA_01','PIS_10_TA_02','PIS_10_TA_03','PIS_10_TA_04'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS11 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_11'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS11Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS11Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPIS11TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_11_TA_01','PIS_11_TA_03','PIS_11_TA_04','PIS_11_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS11TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_11_TA_02','PIS_11_TA_05','PIS_11_TA_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS12 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_12'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS12Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS12Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS12TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_12_TA_01','PIS_12_TA_03','PIS_12_TA_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS12TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_12_TA_02','PIS_12_TA_04','PIS_12_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS13 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_13'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS13Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS13Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS13TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_13_TA_01','PIS_13_TA_02','PIS_13_TA_04','PIS_13_TA_05','PIS_13_TA_08'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS13TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_13_TA_03','PIS_13_TA_06','PIS_13_TA_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS14 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_14'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS14Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS14Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS14TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_14_TA_01','PIS_14_TA_04','PIS_14_TA_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS14TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_14_TA_02','PIS_14_TA_03','PIS_14_TA_05','PIS_14_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS15 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_15'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS15Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS15Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS15TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_15_TA_02','PIS_15_TA_05','PIS_15_TA_07'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS15TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_15_TA_01','PIS_15_TA_03','PIS_15_TA_04','PIS_15_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS16 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_16'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS16Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS16Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS16TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_16_TA_01','PIS_16_TA_02','PIS_16_TA_04','PIS_16_TA_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS16TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_16_TA_03','PIS_16_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS17 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_17'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS17Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS17Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS17TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_17_TA_01','PIS_17_TA_02','PIS_17_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS17TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_17_TA_03','PIS_17_TA_04','PIS_17_TA_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS18 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_18'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS18Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS18Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }    
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS18TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_18_TA_02','PIS_18_TA_05','PIS_18_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS18TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_18_TA_01','PIS_18_TA_03','PIS_18_TA_04'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }     
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS19 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_19'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS19Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS19Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                   
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS19TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_19_TA_01','PIS_19_TA_02','PIS_19_TA_04','PIS_19_TA_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }        
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS19TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_19_TA_03'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS20 =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTags(['PIS_20'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS20Antenas =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPS20Antenas()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }         
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS20TA =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTA(['PIS_20_TA_01','PIS_20_TA_04','PIS_20_TA_06'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getPIS20TCP =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${generarTagsTCP(['PIS_20_TA_02','PIS_20_TA_03','PIS_20_TA_05'])}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }       
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getAntenasSectoriales =  () => {
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsAntenasSectoriales()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async(ex, i) => {
                        let data = await tags.findOne({ tag:  ex.Name})

                        if(data) {
                            data.value = ex.Value
                            await data.save();
                        } else {
                            data = new tags({
                                tag: ex.Name,
                                value: ex.Value
                            });
                            await data.save();
                        }      
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};


const piscinas = () => {
    getPC01(),
    getPC01TA(),
    getPC02(),
    getPC02TA(),
    getPC02TCP(),
    getPC03(),
    getPC03TA(),
    getPC03TCP(),
    getPC04(),
    getPC04TCP(),
    getPC04TA(),
    getPC05(),
    getPC05TA(),
    getPC05TCP(),
    getPC06(),
    getPC06TA(),
    getPC06TCP(),
    getPC07(),
    getPC07TA(),
    getPC07TCP(),
    getPC08(),
    getPC08TA(),
    getPC08TCP(),
    getPC09(),
    getPC09TA(),
    getPC09TCP(),
    getPC10(),
    getPC10TA(),
    getPC10TCP(),
    getPC11(),
    getPC11TA(),
    getPC12(),
    getPC12TA(),
    getPC12TCP(),
    getPC13(),
    getPC13TA(),
    getPC13TCP(),
    getPC14(),
    getPC14TA(),
    getPC14TCP(),
    getPC15(),
    getPC15TA(),
    getPC15TCP(),
    getPC16(),
    getPC16TA(),
    getPC17(),
    getPC17TA(),
    getPC17TCP(),
    getPC18(),
    getPC18TA(),
    getPC18TCP(),
    getPISO1(),
    getPISO1TA(),
    getPIS01TCP(),
    getPISO2(),
    getPISO2TA(),
    getPIS02TCP(),
    getPISO3(),
    getPISO3TA(),
    getPIS03TCP(),
    getPISO4(),
    getPISO4TA(),
    getPIS04TCP(),
    getPISO5(),
    getPISO5TA(),
    getPIS05TCP(),
    getPISO6(),
    getPISO6TA(),
    getPIS06TCP(),
    getPISO7(),
    getPISO7TA(),
    getPIS07TCP(),
    getPISO8(),
    getPISO8TA(),
    getPIS08TCP(),
    getPISO9(),
    getPISO9TA(),
    getPIS09TCP(),
    getPIS10(),
    getPIS10TA(),
    getPIS11(),
    getPIS11TA(),
    getPIS11TCP(),
    getPIS12(),
    getPIS12TA(),
    getPIS12TCP(),
    getPIS13(),
    getPIS13TA(),
    getPIS13TCP(),
    getPIS14(),
    getPIS14TA(),
    getPIS14TCP(),
    getPIS15(),
    getPIS15TA(),
    getPIS15TCP(),
    getPIS16(),
    getPIS16TA(),
    getPIS16TCP(),
    getPIS17(),
    getPIS17TA(),
    getPIS17TCP(),
    getPIS18(),
    getPIS18TA(),
    getPIS18TCP(),
    getPIS19(),
    getPIS19TA(),
    getPIS19TCP(),
    getPIS20(),
    getPIS20TA(),
    getPIS20TCP(),
    getPC01Antenas(),
    getPC02Antenas(),
    getPC03Antenas(),
    getPC04Antenas(),
    getPC05Antenas(),
    getPC06Antenas(),
    getPC07Antenas(),
    getPC08Antenas(),
    getPC09Antenas(),
    getPC10Antenas(),
    getPC11Antenas(),
    getPC12Antenas(),
    getPC13Antenas(),
    getPC14Antenas(),
    getPC15Antenas(),
    getPC16Antenas(),
    getPC17Antenas(),
    getPC18Antenas(),
    getPISO1Antenas(),
    getPISO2Antenas(),
    getPISO3Antenas(),
    getPISO4Antenas(),
    getPISO5Antenas(),
    getPISO6Antenas(),
    getPISO7Antenas(),
    getPISO8Antenas(),
    getPISO9Antenas(),
    getPIS10Antenas(),
    getPIS11Antenas(),
    getPIS12Antenas(),
    getPIS13Antenas(),
    getPIS14Antenas(),
    getPIS15Antenas(),
    getPIS16Antenas(),
    getPIS17Antenas(),
    getPIS18Antenas(),
    getPIS19Antenas(),
    getPIS20Antenas(),
    getAntenasSectoriales()
}


const ebChanduyHistorial = () => {
    getEb1B(),
    getEbApendice(),
    getEbCamarpasa(),
    getEbDePesca(),
    getEbPanamao(),
    getEb1BGral(),
    getEbApendiceGral(),
    getEbCamarpasaGral(),
    getEbDePescaGral(),
    getEbPanamaoGral(),
    getEb1BTCP(),
    getEbApendiceTCP(),
    getEbCamarpasaTCP(),
    getEbDePescaTCP(),
    getEbPanamaoTCP(),
    getEbCamarpasaAntenas(),
    getEb1BAntenas(),
    getEbApendiceAntenas(),
    getEbDePescaAntenas(),
    getEbPanamaoAntenas(),
    getEbCabala1(),
    getEbCabala1Gral(),
    getEbCabala1TCP(),
    getEbCabala1Antenas(),
    getEbCabala2(),
    getEbCabala2Gral(),
    getEbCabala2TCP(),
    getEbCabala2Antenas(),
    getEbPrecSantaMonica(),
    getEbSanDiego(),
    getEbSanFranscisco(),
    getEbSantaBarbara(),
    getEbSantaMonicaA(),
    getEbSantaRosaA(),
    getEbSantaRosaB(),
    getEbPrecSantaMonicaGral(),
    getEbPrecSantaMonicaTCP(),
    getEbSanDiegoGral(),
    getEbSanDiegoTCP(),
    getEbSanFransciscoGral(),
    getEbSanFransciscoTCP(),
    getEbSantaBarbaraGral(),
    getEbSantaBarbaraTCP(),
    getEbSantaMonicaAGral(),
    getEbSantaMonicaATCP(),
    getEbSantaRosaAGral(),
    getEbSantaRosaATCP(),
    getEbSantaRosaBGral(),
    getEbSantaRosaBTCP(),
    getEbPrecSantaMonicaAntenas(),
    getEbSanDiegoAntenas(),
    getEbSanFransciscoAntenas(),
    getEbSantaBarbaraAntenas(),
    getEbSantaMonicaAAntenas(),
    getEbSantaRosaAAntenas(),
    getEbSantaRosaBAntenas()
}

const ebChanduyHistorial2 = () => {
    getEb1B(),
    getEbApendice(),
    getEbCamarpasa(),
    getEbDePesca(),
    getEbPanamao(),
    getEbCabala1(),
    getEbCabala2(),
    getEbPrecSantaMonica(),
    getEbSanDiego(),
    getEbSanFranscisco(),
    getEbSantaBarbara(),
    getEbSantaMonicaA(),
    getEbSantaRosaA(),
    getEbSantaRosaB()
}

//setInterval(ebChanduyHistorial2, 3000);
//setInterval(ebChanduyHistorial, 8000);
setInterval(piscinas, 20000);

