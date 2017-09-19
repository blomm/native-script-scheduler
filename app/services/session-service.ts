
import * as fakeDataServiceModule from './fake-data-service'

export class SessionService{

    private _useHttpService: boolean = false; 

    public loadSessions<T>():Promise<T>{
        if(this._useHttpService){
            return this.loadSessionsViaHttp<T>()
        }
        else{
            return this.loadSessionsViaFaker<T>()
        }
    }

    public loadSessionsViaHttp<T>():Promise<T>{
        return new Promise<T>(()=>{})
    }

    public loadSessionsViaFaker<T>():Promise<T>{
        return new Promise<T>((resolve, reject)=>{
            let speakers = fakeDataServiceModule.generateSpeakers();
            let roomInfos = fakeDataServiceModule.generateRoomInfos();
            let sessions = <any> fakeDataServiceModule.generateSessions(speakers, roomInfos);
            resolve(sessions);
        })
    }
}