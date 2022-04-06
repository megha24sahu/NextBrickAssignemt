import {
    LightningElement,
    track
} from 'lwc';
import getAccounts from '@salesforce/apex/AccountContactController.getAccountList';
import geAccSearchList from '@salesforce/apex/AccountContactController.geAccSearchList';
// import standard toast event 
import { ShowToastEvent} from 'lightning/platformShowToastEvent'
import Hot from '@salesforce/resourceUrl/Hot';
import Warm from '@salesforce/resourceUrl/Warm';
import Cool from '@salesforce/resourceUrl/Cool';
export default class ShowAccountCmp extends LightningElement {

    @track accounts = [];
    error;
    accRecId;

    hot = Hot + '/images/Hot.png';
    warm = Warm + '/images/Warm.png';
    cool = Cool + '/images/Cool.png';

    hotTrue = false;
    warmTrue = false;
    coolTrue = false;

    oldAccList = [];
    remainingAccountList = [];

    connectedCallback() {
        this.loadAccount();
    }

    loadAccount() {
        return getAccounts()
            .then(result => {
                //this.accounts = result;
                if(result.length <= 10){
                    this.accounts = result;
                }else{
                    result.forEach((acc,index) => {
                        if(index < 10){
                            this.accounts.push(acc);
                        }else{
                            this.remainingAccountList.push(acc);
                        }
                    });
                }
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
            });
    }

    handleToggleSection(event) {
        this.accRecId = event.detail.openSections;
    }

    @track searchValue = '';

    // update searchValue var when input field value change
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }

    handleSearchKeyword() {
        if (this.searchValue !== '') {
            this.oldAccList = this.accounts;
            this.accounts = [];
            geAccSearchList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    let updatedRecords = [...this.accounts, ...result];
                    this.accounts = updatedRecords;
                })
                .catch(error => {

                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.accounts = null;
                });
        } else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }

    }

    handleClear(){
        this.accounts = this.oldAccList
    }

    handleScroll(event){
        if(this.remainingAccountList.length > 0){
            this.remainingAccountList.forEach((acc,index) => {
                if(index <5){
                    this.accounts.push(acc);
                    this.remainingAccountList.shift();
                }
            });
        }
    }

}