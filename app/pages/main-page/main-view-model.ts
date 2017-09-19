import {Observable} from 'data/observable';
import { Session, Speaker } from '../../shared/interfaces';
import { GestureEventData } from 'ui/gestures';
import { SessionViewModel } from '../../pages/session-page/session-view-model';
import { SessionService } from '../../services/session-service';

export class MainViewModel extends Observable {

    //private _counter: number;
    //private _message: string;

    private _allSessions : SessionViewModel[] ;
    private _sessions: SessionViewModel[];
    private _sessionService = new SessionService();

    constructor() {

        super();  
     
        this._allSessions = new Array<SessionViewModel>(); 
        
        this.set('isLoading', true);
        this._sessionService.loadSessions<Session[]>().then(
            (result:Session[])=>{
                this.pushSessions(result);
                this.onDataLoaded();
            }
        )

        // Initialize default values.
        //this._counter = 42;
        //this.updateMessage();
    }

    private pushSessions(sessionsFromService: Array<Session>){
        sessionsFromService.forEach(session => {
            var newSession = new SessionViewModel(session)
            this._allSessions.push(newSession);
        }); 
    }

    private onDataLoaded(){
        this.set('isLoading', false);
        this.filter() 

    }

    private filter(){
        this._sessions = this._allSessions;
        this.notifyPropertyChange('sessions', this._sessions)
    }

    get sessions(): SessionViewModel[] {
        return this._sessions;
    }

    // get message(): string {
    //     return this._message;
    // }

    set sessions(sessions) {
        this._sessions = sessions;
    }

    // public toggleFavourite(args: GestureEventData){

    //     let session = <SessionViewModel>args.view.bindingContext;
    //     session.toggleFavourite()
    // }
    //public toggleFavourite(){
        
        //let session = <SessionViewModel>args.view.bindingContext;
        //session.toggleFavourite()
        //console.log('this was tapped dude')
    //}
    
    // set message(value: string) {
    //     if (this._message !== value) {
    //         this._message = value;
    //         this.notifyPropertyChange('message', value)
    //     }
    // }

    public onTap() {
        console.log('i have been tapped')
    }

    // private updateMessage() {
    //     if (this._counter <= 0) {
    //         this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    //     } else {
    //         this.message = `${this._counter} taps left`;
    //     }
    // }
}