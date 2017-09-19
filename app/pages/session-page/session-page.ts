import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Button } from "ui/button";
import { Label } from "ui/label";
import { ScrollView } from "ui/scroll-view";
import { SessionViewModel } from "../session-page/session-view-model";

import * as fakeDataServiceModule from "../../services/fake-data-service"

let vm: SessionViewModel;
let page: Page;

export function navigatingTo(args: EventData) {
    
    page = <Page>args.object;
    let firstSession = loadFirstSessionViaFaker();
    vm = new SessionViewModel(firstSession); 
    // vm.set("toggleFavourite", function(eventData) {
    //     console.log("button is tapped!");
    // });
    page.bindingContext = vm; 

}

export function toggleFavourite(){
    console.log("function in typescript works!!!");
    vm.toggleFavourite();
}

export function toggleDescription(args: EventData) {
    var btn = <Button>args.object;
    var txtDesc = <Label>page.getViewById('txtDescription');
    var scroll = <ScrollView>page.getViewById('scroll');

    if (btn.text === 'MORE') {
        btn.text = 'LESS';
        txtDesc.text = vm.description;
    }
    else {
        btn.text = 'MORE';
        txtDesc.text = vm.descriptionShort;
        scroll.scrollToVerticalOffset(0, false);
    }
}



export function loadFirstSessionViaFaker<T>(){
    let speakers = fakeDataServiceModule.generateSpeakers();
    let roomInfos = fakeDataServiceModule.generateRoomInfos();
    let sessions = <any> fakeDataServiceModule.generateSessions(speakers, roomInfos);

    let nonBreakSessions = sessions.filter(s=>{
        return !s.isBreak && s.speakers.length > 0;
    })

    return nonBreakSessions[0];
}