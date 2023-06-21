// process.stdin
// .pipe(process.stdout);

import {Readable, Writable, Transform} from 'node:stream';

class OnetoHundreadStream extends Readable{

    index  = 1;
    _read(){
        const i = this.index++; 

        setTimeout(() => {
            if( i > 100){
                this.push(null);
            }else{
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        },1000)  
    }
}

class InverseNumberStram extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * - 1;

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable{
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10 )
        callback()
    }
}





new OnetoHundreadStream()
.pipe(new InverseNumberStram())
.pipe(new MultiplyByTenStream())