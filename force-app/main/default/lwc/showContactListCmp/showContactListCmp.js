import {
    LightningElement,
    track,
    api
} from 'lwc';
import getContacts from '@salesforce/apex/AccountContactController.getContactList';

export default class ShowContactListCmp extends LightningElement {

    contacts = [];
    error;
    showCon = false;
    accountId;
    @track conId;
    @track left;
    @track top;
    @track showModal = false;

    @api get accId() {
        return this.accountId;
    }

    set accId(value) {
        if (value) {
            this.setAttribute('accId', value);
            this.accountId = value;
            this.handleValueChange(value);
        }
    }

    handleValueChange(value) {
        this.contacts = [];
        return getContacts({
                accId: value
            })
            .then(result => {
                let updatedRecords = [...this.contacts, ...result];
                this.contacts = updatedRecords;
                if (this.contacts.length > 0) {
                    this.showCon = true;
                } else {
                    this.showCon = false;
                }
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });
    }

    handleClick(event) {
        this.conId = event.target.getAttribute('data-id');
        this.left = event.clientX;
        this.top = event.clientY;
    }

    hideData() {
        this.conId = "";
    }

    handleAdd() {
        this.showModal = true;
    }

    hanldemodalValueChange(event) {
        this.showModal = event.detail;
    }

}