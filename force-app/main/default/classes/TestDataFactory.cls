public with sharing class TestDataFactory {

    public static List<Account> createAccount(){
        List<Account> accToBeInsert = new List<Account>();
        for (Integer i=0;i<5;i++) {
            Account acc= new Account();
            acc.Name = 'TestAcc'+i;
            accToBeInsert.add(acc);
        }
        return accToBeInsert;
    }

    public static List<Contact> createContact(String accId){
        List<Contact> conToBeInsert = new List<Contact>();
            for (Integer i=0;i<5;i++) {
                Contact con= new Contact();
                con.LastName = 'TestCon'+i;
                con.AccountId = accId;
                conToBeInsert.add(con);
            }
        
        return conToBeInsert;
    }
    
}
