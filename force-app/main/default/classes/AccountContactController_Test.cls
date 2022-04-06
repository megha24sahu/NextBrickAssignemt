@isTest
public with sharing class AccountContactController_Test {

    @TestSetup
    static void makeData(){
        List<Account> accToBeInsert = TestDataFactory.createAccount();
        insert accToBeInsert;
        List<Contact> conToBeInsert = TestDataFactory.createContact(accToBeInsert[0].Id);
        insert conToBeInsert;
    }

    @isTest
    public static void getAccountListTest(){
        List<Account> fetchAcc =  AccountContactController.getAccountList();
        System.assertNotEquals(fetchAcc, Null);
        System.assertEquals(fetchAcc.size(), 5);
    }

    @isTest
    public static void getContactListTest(){
        Account fetchAcc =  [Select id from account limit 1];
        
        List<Contact> fetchcon =  AccountContactController.getContactList(fetchAcc.Id);
        System.assertNotEquals(fetchcon, Null);
        
        System.assertEquals(fetchcon.size(), 5);
    }

    @isTest
    public static void geAccSearchListTest(){
        List<Account> fetchAcc =  AccountContactController.geAccSearchList('Test');
        System.assertNotEquals(fetchAcc, Null);

        //List<Account> fetchAcc1 =  AccountContactController.geAccSearchList('Demo');
        //System.assertEquals(fetchAcc1.size(), Null);
    }
   
}
