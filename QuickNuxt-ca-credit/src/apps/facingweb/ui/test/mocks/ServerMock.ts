import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { environment, mockData } from '../test-env';

const SEED = 'mwX3u3R3M+fcLIJ3W2y5MaF9j2Oh1xEBenE8Mdat4hM=';
const KEY = '9BvZfaM6tLgXiofStRO3k+zDEtazTmC74vHR/W09EWc=';

export class ServerMock {
    private currentServer;

    private validateRequest(request: Request) {
        const mk = request.headers.get('Magic-Key');
        console.log(mk);

        if (mk !== KEY) {
            return HttpResponse.json({ error: 'unauthorized' }, { status: 401 });
        }
        return null;
    }

    private withAuth = (handler: any) => {
        return ({ request, params, cookies }: any) => {
            const error = this.validateRequest(request);
            if (error) return error;
            return handler({ request, params, cookies });
        };
    };

    private mockDefault = [
        http.get(`http://${environment.localHostUrl}/mapp/optiondlg`, this.withAuth(({ request, params, cookies }) => {
            const data = { selection: mockData.defaultSelection };
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json(data, status);
        })),
        http.post(`http://${environment.localHostUrl}/mapp/buttons/show`, this.withAuth(({ request, params, cookies }) => {
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json({}, status);
        })),
        http.post(`http://${environment.localHostUrl}/mapp/buttons/hide`, this.withAuth(({ request, params, cookies }) => {
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json({}, status);
        })),
        http.post(`http://${environment.localHostUrl}/mapp/optiondlg`, this.withAuth(({ request, params, cookies }) => {
            const data = { pageId: environment.optionDlgPageId };
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json(data, status);
        })),
        http.post(`http://${environment.localHostUrl}/mapp/takeFacialMasterPhoto`, this.withAuth(({ request, params, cookies }) => {
            const data = { pageId: environment.cameraPageId };
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json(data, status);
        })),
        http.post(`http://${environment.localHostUrl}/mapp/browsePhoto`, this.withAuth(({ request, params, cookies }) => {
            const data = { pageId: environment.browsePageId };
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json(data, status);
        })),
        http.get(`http://${environment.localHostUrl}/mapp/gps`, this.withAuth(({ request, params, cookies }) => {
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json(mockData.MockGpsAddressReturn, status);
        })),
        http.put(`http://${environment.localHostUrl}/mapp/gps`, this.withAuth(({ request, params, cookies }) => {
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json({ testStatus: 200 }, status);
        })),
        http.post(`http://${environment.localHostUrl}/mapp/saveImage`, this.withAuth(({ request, params, cookies }) => {
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json(mockData.SaveImageReturn, status);
        })),
    ];

    private mockModePlayground = [
        http.post(`http://${environment.localHostUrl}/mapp/whoareyou`, async ({ request, params, cookies }) => {
            const data = { mode: environment.playgroundMode, host: environment.localHostUrl, version: SEED };
            const status = { status: 200, statusText: 'OK' };
            await new Promise(resolve => setTimeout(resolve, 300));
            return HttpResponse.json(data, status);
        }),
        http.post(`http://${environment.localHostUrl}/mdev/getpageid`, ({ request, params, cookies }) => {
            const data = { pageId: environment.playgroundpageId };
            const status = { status: 200, statusText: 'OK' };
            return HttpResponse.json(data, status);
        }),
    ];

    public StartMockServer(mode: keyof ModeType) {
        switch (mode) {
            case "mana":
                {
                }
            case "playground":
                {
                    this.currentServer = setupServer(...this.mockModePlayground.concat(this.mockDefault));
                    this.currentServer.listen();
                }
            case "undefine":
            default:
                {
                    this.currentServer = setupServer(...this.mockDefault);
                }
        }
    }

    public ResetServer() {
        this.currentServer.resetHandlers();
    }

    public StopServer() {
        this.currentServer.close();
    }
}

interface ModeType {
    mana;
    playground;
    undefine;
}

