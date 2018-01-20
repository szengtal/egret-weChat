declare module Zlib {
    class Deflate{
        constructor(data: any,options?:any);
        compress():any;
    }

    class RawDeflate{
        constructor(data: any,options?:any);
        compress():any;
    }

    class RawInflate{
        constructor(data: any,options?:any);
        decompress():any;
    }

    class Inflate{
        constructor(data: any,options?:any);
        decompress():any;
    }


    class Gzip{
        constructor(data: any,options?:any);
        compress():any;
    }

    class Gunzip{
        constructor(data: any,options?:any);
        decompress():any;
    }
    
}
