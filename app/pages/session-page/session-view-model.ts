import { Observable } from "data/observable";
import {Session, Speaker, RoomInfo} from '../../shared/interfaces'


export class SessionViewModel extends Observable implements Session{
    
    private _session: Session
    private _favourite: boolean
    private _startDate: Date
    private _endDate: Date

    constructor(source?: Session){

        super()

        if(source){
            this._session = source
            this._startDate = this.fixDate(new Date(source.start))
            this._endDate=this.fixDate(new Date(source.end))
        }
    }

    get range(): string {
        var startMinutes = this.startDate.getMinutes() + '';
        var endMinutes = this.endDate.getMinutes() + '';
        var startAM = this.startDate.getHours() < 12 ? 'am' : 'pm';
        var endAM = this.endDate.getHours() < 12 ? 'am' : 'pm';

        var startHours = (this.startDate.getHours() <= 12 ? this.startDate.getHours() : this.startDate.getHours() - 12) + '';
        var endHours = (this.endDate.getHours() <= 12 ? this.endDate.getHours() : this.endDate.getHours() - 12) + '';

        return (startHours.length === 1 ? '0' + startHours : startHours) + ':' + (startMinutes.length === 1 ? '0' + startMinutes : startMinutes) + startAM +
            ' - ' + (endHours.length === 1 ? '0' + endHours : endHours) + ':' + (endMinutes.length === 1 ? '0' + endMinutes : endMinutes) + endAM;
    }

    private fixDate(date:Date){
        return new Date(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDay(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
    }

    get startDate():Date{
        return this._startDate
    }
    get endDate():Date{
        return this._endDate
    }

    get id(): string{
        return this._session.id
    };
    get title(): string{
        return this._session.title
    };
    get start(): string{
        return this._session.start
    };
    get end(): string{
        return this._session.end
    };
    get room(): string{
        if(this._session.room){
            return this._session.room
        }
        if (this._session.roomInfo){
            return this._session.roomInfo.name
        }
        return null
    };
    get roomInfo(): RoomInfo{
        return this._session.roomInfo
    };
    get speakers(): Speaker[]{
        return this._session.speakers
    };
    get description(): string{
        return this._session.description
    };
    get descriptionShort(): string{
        if(this.description.length>160){
            return this.description.substr(0,160) + '...'
        }
        else{
            return this.description
        }
        
    };
    get calendarEventId(): string{
        return this._session.calendarEventId
    };
    get isBreak(): boolean{
        return this._session.isBreak
    };

    get favourite(): boolean{
        return this._favourite;
    }

    set favourite(value: boolean){
        if(value !=this._favourite && !this._session.isBreak){
            this._favourite = value
            this.notifyPropertyChange('favourite', value)
        }
    }

    

    public toggleFavourite(){
        //console.log('function works in the viewmodel file....')
        this.favourite = !this.favourite;
    }
}