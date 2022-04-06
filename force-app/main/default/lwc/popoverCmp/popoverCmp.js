import {
    api,
    LightningElement,
    track
} from 'lwc';

export default class PopoverCmp extends LightningElement {

    @track conId;
    @track top = 50;
    @track left = 50;

    @api
    get conRecId() {
        return this.conId;
    }

    set conRecId(value) {
        this.conId = value;
    }

    @api
    get topmargin() {
        return this.top;
    }

    set topmargin(value) {
        this.top = value;
    }

    @api
    get leftmargin() {
        return this.left;
    }

    set leftmargin(value) {
        this.left = value;
    }

    get boxClass() {
        return `background-color:white; top:${this.top - 280}px; left:${this.left}px`;
    }

}