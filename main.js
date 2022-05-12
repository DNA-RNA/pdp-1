const {Blockchain, Transaction} = require('./blockchain');
let bitCoin= new Blockchain();

bitCoin.createTransaction(new Transaction('adres1','adres2',100));
bitCoin.createTransaction(new Transaction('adres2','adres1',50));
console.log(' \n Miner işlemi başlıyor-->');
bitCoin.minePendingTransactions('ranas adres');
console.log('\n Rana nın bakiyesi ', bitCoin.getBalanceOfAddress('ranas adres'));
console.log(' \n Miner işlemi  ikince kez başlıyor-->');
bitCoin.minePendingTransactions('ranas adres');
console.log('Blockchain gecerli mi ?'+ bitCoin.isChainValid());
console.log('\n Rana nın bakiyesi ', bitCoin.getBalanceOfAddress('ranas adres'));

