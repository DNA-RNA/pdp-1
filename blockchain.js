const SHA256 = require('crypto-js/sha256');
class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress= toAddress;
        this.amount = amount;
    }
}
class Block{
    constructor(timestamp,transactions,previousHash=''){
        this.timestamp= timestamp;
        this.transactions= transactions;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }
    calculateHash(){
             return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash= this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        //genesis bloğunu içeren dizi
        this.chain= [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock(){
        return new Block("11/05/2020","Genesis block","0");
    }
    getLatesBlock(){
        return this.chain[this.chain.length -1];
    }
    minePendingTransactions(miningRewardAddress){
        let blok = new Block(Date.now(),this.pendingTransactions);
        blok.mineBlock(this.difficulty);

        console.log('Blok successfully mined!');
        this.chain.push(blok);

        this.pendingTransactions = [ 
            new Transaction(null,miningRewardAddress,this.miningReward)
        ];
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(adres){
        let balance =0;
        for( const blok of this.chain){
            for(const trans of blok.transactions){
                if(trans.fromAddress === adres){
                    balance -= trans.amount;
                }

                if(trans.toAddress === adres){
                    balance += trans.amount;
                }
               
            }
        }
        return balance;

    }

    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            //hash değeri hala geçerli mi
            if(currentBlock.hash === currentBlock.calculateHash()){
                return true;
            }
            //bir önceki bloğa işaret edip etmediği
            if(currentBlock.previousHash === previousBlock.hash){
                return true;
            }
        }
        return false;
    }
}
module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;