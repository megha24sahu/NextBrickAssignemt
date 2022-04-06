import {
    LightningElement,
    track,
    api
} from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import updateCon from '@salesforce/apex/AccountContactController.updateCon';
// import standard toast event 
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent'

export default class CreateContactFormCmp extends LightningElement {
    contactObject = CONTACT_OBJECT;
    firstname = FIRSTNAME_FIELD;
    lastname = LASTNAME_FIELD;
    phone = PHONE_FIELD;
    email = EMAIL_FIELD;
    contactId;
    @api openModal;
    @api accRecId;
    @track error;

    handleSuccess(event) {
        this.contactId = event.detail.id
        if(this.contactId)
            this.updateContactWithAcc();
        const evt = new ShowToastEvent({
            title: "SUCCESS",
            message: "Contact created",
            variant: "success"
        });
        this.dispatchEvent(evt);
        this.closeModal();
    }

    updateContactWithAcc() {
        return updateCon({
            conId: this.contactId,
            accId: this.accRecId
            
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            this.error = error;
        });
    }

    handleError() {
        const evt = new ShowToastEvent({
            title: 'Toast Error',
            message: 'Some unexpected error',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
        this.closeModal();
    }

    closeModal() {
        this.openModal = false;
        const custEvent = new CustomEvent(
            'modalvaluechange', {
                detail: this.openModal
            });
        this.dispatchEvent(custEvent);
    }


}