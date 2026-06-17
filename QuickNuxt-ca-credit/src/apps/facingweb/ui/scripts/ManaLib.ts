import { IManaLibProvider } from './contracts/IManaLibProvider'
import { ManaLibProvider } from './ManaLibProvider';
import { HttpHelper } from '../helper/httpHelper';

console.log("Welcome from ManaLib");

var magicKey = "";
var baseUrl = "http://localhost:9000";
var socket: WebSocket;
var socketMapper: Map<string, any> = new Map<string, any>();

var environment = new Promise<any>((res, rej) => { environmentresolver = res });
var environmentresolver: any;

var pageid = new Promise<any>((res, rej) => { pageidResolver = res });
var pageidResolver: any;

var setupConnectToMana = new Promise((resolve, reject) => {
    socketReadyResolver = resolve;
    socketReadyRejector = reject;
});
var socketReadyResolver: any;
var socketReadyRejector: any;

(async () => {
    await setupEnvironment();
})();

if ((<any>window).pageId) {
    pageidResolver((<any>window).pageId)
} else {
    (<any>window).setPageId = (pageId: string) => {
        pageidResolver(pageId);
    }
}

async function getPageid(): Promise<any> { return pageid }

async function doubleSha256(message: string) {
    const msgBuffer = new TextEncoder().encode(message);

    const hashBuffer_1 = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashBuffer_2 = await crypto.subtle.digest('SHA-256', hashBuffer_1);

    const bytes = new Uint8Array(hashBuffer_2);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
}

async function whoamI(): Promise<any> {
    try {
        return await HttpHelper.post(`${baseUrl}/mapp/whoareyou`);
    }
    catch {
        return { mode: "undefine", host: "" };
    }
}

async function hashKey(seed): Promise<any> {
    try {
        magicKey = await doubleSha256(seed);
        HttpHelper.setMagicKey(magicKey);
    } catch (ex) {
    }
}

function setupWebsocket(url: string, pageid: string): Promise<any> {
    var loopCounting = 0;

    var retry = setInterval(
        () => {
            let data = JSON.stringify({ Id: pageid, IsMContent: true });
            console.log("Sending socket to Mana:", data);
            socket.send(data);
            loopCounting++;
            if (loopCounting == 20) {
                clearInterval(retry);
                socketReadyRejector();
            }
        }
        , 100);

    socket = new WebSocket(url);
    socket.onmessage = (event) => {
        console.log("WebSocket message received:", JSON.stringify(event.data));
        var data = JSON.parse(event.data);

        if (data.PageId) {
            clearInterval(retry);
            socketReadyResolver(data.PageId);
        }
        switch (data.Action?.toLocaleLowerCase()) {
            case "submit".toLocaleLowerCase(): {
                if (socketMapper.has(data.ButtonId)) {
                    socketMapper.get(data.ButtonId)(data);
                }
                break;
            }
            case "typeinput".toLocaleLowerCase(): {
                if (socketMapper.has(data.InputId)) {
                    socketMapper.get(data.InputId)(data);
                }
                break;
            }
            case "submitselection".toLocaleLowerCase(): {
                if (socketMapper.has(data.PageId)) {
                    socketMapper.get(data.PageId)(data);
                }
                break;
            }
            case "takefacialmasterphoto".toLocaleLowerCase(): {
                if (socketMapper.has(data.PageId)) {
                    socketMapper.get(data.PageId)(data);
                }
                break;
            }
            case "browsephoto".toLocaleLowerCase(): {
                if (socketMapper.has(data.PageId)) {
                    socketMapper.get(data.PageId)(data);
                }
                break;
            }
            case "updategps".toLocaleLowerCase(): {
                if (socketMapper.has(data.PageId)) {
                    socketMapper.get(data.PageId)(data);
                }
                break;
            }
            default: break;
        }
    };

    socket.onerror = (err) => {
        console.error("WebSocket error:", JSON.stringify(err));
    };

    socket.onopen = async () => {
        console.log("WebSocket connected");
    };

    socket.onclose = async (event) => {
        console.warn("WebSocket closed: ", JSON.stringify(event));

        var env = await getEnvirontment();
        if (env.mode == "mobile" || env.mode == "playground") {
            setupWebsocket(url, pageid);
        }
    };

    return setupConnectToMana;
}

export async function setupEnvironment() {
    var contextresult = await whoamI();
    await hashKey(contextresult.version)
    if (contextresult.mode == "undefine") {
        pageidResolver("");
    }
    else if (contextresult.mode == "playground") {
        setTimeout(async () => {
            if (!pageid) {
                const res = await HttpHelper.post(`${baseUrl}/mdev/getpageid`);
                pageidResolver(res.pageId);
            }
        }, 300);
    }

    var pageid = await getPageid();

    try {
        await setupWebsocket(`ws://${contextresult.host}/mana`, pageid);
    } catch (ex) { }

    environmentresolver({ pageid: pageid, mode: contextresult.mode, host: contextresult.host });
}

export async function getManaContext(): Promise<IManaLibProvider> {
    var env = await getEnvirontment();
    return new ManaLibProvider(`http://${env.host}`, env.pageid, socketMapper);
}

export async function getEnvirontment(): Promise<any> {
    return environment;
}

export async function registerSocketmapper(id: string, callback: (data: any) => void) {
    socketMapper.set(id, callback);
}

export function getMagicKey(): string {
    return magicKey;
};