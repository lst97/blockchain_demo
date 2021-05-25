class Coinbase{
    constructor(amount, pk){
        this.amount = amount;
        this.pk = pk;
    }
}

class TX{
    id = 0;
    sig = 0;
    constructor(amount, sender, reciver){
        this.amount = amount;
        this.sender = sender;
        this.reciver = reciver;
    }

    sign(sk){

    }
    
    verify(pk){


    }

}

class Block{
    Nonce = 0; // to be calculate
    Hash = 0; // to be calculate
    Tx = [];
    constructor(perviousBlock, cb){
        this.Id += perviousBlock.id + 1;
        this.Coinbase = cb;
        this.Perv = perviousBlock.Hash;
    }

    constructor(cb){
        this.Id = 0;
        this.Coinbase = cb;
        this.Prev = 0;
    }

    addTx(tx){
        // Verify Sig - TODO (maybe move to verify)
        let txLen = this.Tx.length;
        if(txLen){
            tx.id = txLen;
        }
        this.Tx.append(tx);
    }
}
