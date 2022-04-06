public with sharing class AccountContactController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Rating, Phone FROM Account limit 50000];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String accId) {
        return [SELECT Id, Name, Title, Email, Phone FROM Contact Where AccountId = : accId limit 10];
    }

    @AuraEnabled(cacheable=true)
    public static list<Account> geAccSearchList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
		
       // create contact list to store search result 
        list<Account> accListRecord = new list<Account>();
     
	   // query contact records
        for(Account accObj : [Select id,Name From Account
                                    WHERE name LIKE : searchKeyword]){
           accListRecord.add(accObj);
        }
        
         if(accListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return accListRecord;
    }

    @AuraEnabled
    public static String updateCon(String conId, string accId) {
        Contact cont = new Contact(id =conId );
        cont.AccountId = accId;
        update cont;
        return 'Update Success.';
    }

}