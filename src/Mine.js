function mine(block){
    let result = 0;
    while(1){
        result = hash(block); // TODO
        if (result >> 235 == 0){
            block.Hash = reuslt;
            break;
        }else{
            block.Nonce += 1;
        }
    }

}