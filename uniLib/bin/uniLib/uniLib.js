/*!
 * uniLib - JS for Debug
 * @licence uniLib - v0.1.0 (2018-01-19)
 * qq:93749937 | Licence: helojo
 */
/* pako 1.0.5 nodeca/pako */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.pako=t()}}(function(){return function t(e,a,i){function n(s,o){if(!a[s]){if(!e[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(r)return r(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var d=a[s]={exports:{}};e[s][0].call(d.exports,function(t){var a=e[s][1][t];return n(a?a:t)},d,d.exports,t,e,a,i)}return a[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=l.assign({level:w,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:p,to:""},t||{});var e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=o.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==b)throw new Error(d[a]);if(e.header&&o.deflateSetHeader(this.strm,e.header),e.dictionary){var n;if(n="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===_.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=o.deflateSetDictionary(this.strm,n),a!==b)throw new Error(d[a]);this._dict_set=!0}}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}function s(t,e){return e=e||{},e.gzip=!0,n(t,e)}var o=t("./zlib/deflate"),l=t("./utils/common"),h=t("./utils/strings"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=Object.prototype.toString,u=0,c=4,b=0,g=1,m=2,w=-1,p=0,v=8;i.prototype.push=function(t,e){var a,i,n=this.strm,r=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:e===!0?c:u,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===_.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new l.Buf8(r),n.next_out=0,n.avail_out=r),a=o.deflate(n,i),a!==g&&a!==b)return this.onEnd(a),this.ended=!0,!1;0!==n.avail_out&&(0!==n.avail_in||i!==c&&i!==m)||("string"===this.options.to?this.onData(h.buf2binstring(l.shrinkBuf(n.output,n.next_out))):this.onData(l.shrinkBuf(n.output,n.next_out)))}while((n.avail_in>0||0===n.avail_out)&&a!==g);return i===c?(a=o.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===b):i!==m||(this.onEnd(b),n.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===b&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Deflate=i,a.deflate=n,a.deflateRaw=r,a.gzip=s},{"./utils/common":3,"./utils/strings":4,"./zlib/deflate":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0===(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=s.inflateInit2(this.strm,e.windowBits);if(a!==h.Z_OK)throw new Error(d[a]);this.header=new _,s.inflateGetHeader(this.strm,this.header)}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}var s=t("./zlib/inflate"),o=t("./utils/common"),l=t("./utils/strings"),h=t("./zlib/constants"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=t("./zlib/gzheader"),u=Object.prototype.toString;i.prototype.push=function(t,e){var a,i,n,r,d,f,_=this.strm,c=this.options.chunkSize,b=this.options.dictionary,g=!1;if(this.ended)return!1;i=e===~~e?e:e===!0?h.Z_FINISH:h.Z_NO_FLUSH,"string"==typeof t?_.input=l.binstring2buf(t):"[object ArrayBuffer]"===u.call(t)?_.input=new Uint8Array(t):_.input=t,_.next_in=0,_.avail_in=_.input.length;do{if(0===_.avail_out&&(_.output=new o.Buf8(c),_.next_out=0,_.avail_out=c),a=s.inflate(_,h.Z_NO_FLUSH),a===h.Z_NEED_DICT&&b&&(f="string"==typeof b?l.string2buf(b):"[object ArrayBuffer]"===u.call(b)?new Uint8Array(b):b,a=s.inflateSetDictionary(this.strm,f)),a===h.Z_BUF_ERROR&&g===!0&&(a=h.Z_OK,g=!1),a!==h.Z_STREAM_END&&a!==h.Z_OK)return this.onEnd(a),this.ended=!0,!1;_.next_out&&(0!==_.avail_out&&a!==h.Z_STREAM_END&&(0!==_.avail_in||i!==h.Z_FINISH&&i!==h.Z_SYNC_FLUSH)||("string"===this.options.to?(n=l.utf8border(_.output,_.next_out),r=_.next_out-n,d=l.buf2string(_.output,n),_.next_out=r,_.avail_out=c-r,r&&o.arraySet(_.output,_.output,n,r,0),this.onData(d)):this.onData(o.shrinkBuf(_.output,_.next_out)))),0===_.avail_in&&0===_.avail_out&&(g=!0)}while((_.avail_in>0||0===_.avail_out)&&a!==h.Z_STREAM_END);return a===h.Z_STREAM_END&&(i=h.Z_FINISH),i===h.Z_FINISH?(a=s.inflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===h.Z_OK):i!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),_.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===h.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Inflate=i,a.inflate=n,a.inflateRaw=r,a.ungzip=n},{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(t,e,a){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;a.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(var i in a)a.hasOwnProperty(i)&&(t[i]=a[i])}}return t},a.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,a,i,n){if(e.subarray&&t.subarray)return void t.set(e.subarray(a,a+i),n);for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){var e,a,i,n,r,s;for(i=0,e=0,a=t.length;e<a;e++)i+=t[e].length;for(s=new Uint8Array(i),n=0,e=0,a=t.length;e<a;e++)r=t[e],s.set(r,n),n+=r.length;return s}},r={arraySet:function(t,e,a,i,n){for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){return[].concat.apply([],t)}};a.setTyped=function(t){t?(a.Buf8=Uint8Array,a.Buf16=Uint16Array,a.Buf32=Int32Array,a.assign(a,n)):(a.Buf8=Array,a.Buf16=Array,a.Buf32=Array,a.assign(a,r))},a.setTyped(i)},{}],4:[function(t,e,a){"use strict";function i(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&r))return String.fromCharCode.apply(null,n.shrinkBuf(t,e));for(var a="",i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a}var n=t("./common"),r=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var o=new n.Buf8(256),l=0;l<256;l++)o[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;o[254]=o[254]=1,a.string2buf=function(t){var e,a,i,r,s,o=t.length,l=0;for(r=0;r<o;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),l+=a<128?1:a<2048?2:a<65536?3:4;for(e=new n.Buf8(l),s=0,r=0;s<l;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},a.buf2binstring=function(t){return i(t,t.length)},a.binstring2buf=function(t){for(var e=new n.Buf8(t.length),a=0,i=e.length;a<i;a++)e[a]=t.charCodeAt(a);return e},a.buf2string=function(t,e){var a,n,r,s,l=e||t.length,h=new Array(2*l);for(n=0,a=0;a<l;)if(r=t[a++],r<128)h[n++]=r;else if(s=o[r],s>4)h[n++]=65533,a+=s-1;else{for(r&=2===s?31:3===s?15:7;s>1&&a<l;)r=r<<6|63&t[a++],s--;s>1?h[n++]=65533:r<65536?h[n++]=r:(r-=65536,h[n++]=55296|r>>10&1023,h[n++]=56320|1023&r)}return i(h,n)},a.utf8border=function(t,e){var a;for(e=e||t.length,e>t.length&&(e=t.length),a=e-1;a>=0&&128===(192&t[a]);)a--;return a<0?e:0===a?e:a+o[t[a]]>e?a:e}},{"./common":3}],5:[function(t,e,a){"use strict";function i(t,e,a,i){for(var n=65535&t|0,r=t>>>16&65535|0,s=0;0!==a;){s=a>2e3?2e3:a,a-=s;do n=n+e[i++]|0,r=r+n|0;while(--s);n%=65521,r%=65521}return n|r<<16|0}e.exports=i},{}],6:[function(t,e,a){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],7:[function(t,e,a){"use strict";function i(){for(var t,e=[],a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}function n(t,e,a,i){var n=r,s=i+a;t^=-1;for(var o=i;o<s;o++)t=t>>>8^n[255&(t^e[o])];return t^-1}var r=i();e.exports=n},{}],8:[function(t,e,a){"use strict";function i(t,e){return t.msg=D[e],e}function n(t){return(t<<1)-(t>4?9:0)}function r(t){for(var e=t.length;--e>=0;)t[e]=0}function s(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(R.arraySet(t.output,e.pending_buf,e.pending_out,a,t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))}function o(t,e){C._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,s(t.strm)}function l(t,e){t.pending_buf[t.pending++]=e}function h(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function d(t,e,a,i){var n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,R.arraySet(e,t.input,t.next_in,n,a),1===t.state.wrap?t.adler=N(t.adler,e,n,a):2===t.state.wrap&&(t.adler=O(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)}function f(t,e){var a,i,n=t.max_chain_length,r=t.strstart,s=t.prev_length,o=t.nice_match,l=t.strstart>t.w_size-ft?t.strstart-(t.w_size-ft):0,h=t.window,d=t.w_mask,f=t.prev,_=t.strstart+dt,u=h[r+s-1],c=h[r+s];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do if(a=e,h[a+s]===c&&h[a+s-1]===u&&h[a]===h[r]&&h[++a]===h[r+1]){r+=2,a++;do;while(h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&r<_);if(i=dt-(_-r),r=_-dt,i>s){if(t.match_start=e,s=i,i>=o)break;u=h[r+s-1],c=h[r+s]}}while((e=f[e&d])>l&&0!==--n);return s<=t.lookahead?s:t.lookahead}function _(t){var e,a,i,n,r,s=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=s+(s-ft)){R.arraySet(t.window,t.window,s,s,0),t.match_start-=s,t.strstart-=s,t.block_start-=s,a=t.hash_size,e=a;do i=t.head[--e],t.head[e]=i>=s?i-s:0;while(--a);a=s,e=a;do i=t.prev[--e],t.prev[e]=i>=s?i-s:0;while(--a);n+=s}if(0===t.strm.avail_in)break;if(a=d(t.strm,t.window,t.strstart+t.lookahead,n),t.lookahead+=a,t.lookahead+t.insert>=ht)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+ht-1])&t.hash_mask,t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<ht)););}while(t.lookahead<ft&&0!==t.strm.avail_in)}function u(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(_(t),0===t.lookahead&&e===I)return vt;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,o(t,!1),0===t.strm.avail_out))return vt;if(t.strstart-t.block_start>=t.w_size-ft&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.strstart>t.block_start&&(o(t,!1),0===t.strm.avail_out)?vt:vt}function c(t,e){for(var a,i;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a)),t.match_length>=ht)if(i=C._tr_tally(t,t.strstart-t.match_start,t.match_length-ht),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=ht){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function b(t,e){for(var a,i,n;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=ht-1,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a),t.match_length<=5&&(t.strategy===q||t.match_length===ht&&t.strstart-t.match_start>4096)&&(t.match_length=ht-1)),t.prev_length>=ht&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-ht,i=C._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-ht),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=ht-1,t.strstart++,i&&(o(t,!1),0===t.strm.avail_out))return vt}else if(t.match_available){if(i=C._tr_tally(t,0,t.window[t.strstart-1]),i&&o(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return vt}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=C._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function g(t,e){for(var a,i,n,r,s=t.window;;){if(t.lookahead<=dt){if(_(t),t.lookahead<=dt&&e===I)return vt;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=ht&&t.strstart>0&&(n=t.strstart-1,i=s[n],i===s[++n]&&i===s[++n]&&i===s[++n])){r=t.strstart+dt;do;while(i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&n<r);t.match_length=dt-(r-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=ht?(a=C._tr_tally(t,1,t.match_length-ht),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function m(t,e){for(var a;;){if(0===t.lookahead&&(_(t),0===t.lookahead)){if(e===I)return vt;break}if(t.match_length=0,a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function w(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}function p(t){t.window_size=2*t.w_size,r(t.head),t.max_lazy_match=Z[t.level].max_lazy,t.good_match=Z[t.level].good_length,t.nice_match=Z[t.level].nice_length,t.max_chain_length=Z[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=ht-1,t.match_available=0,t.ins_h=0}function v(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=V,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new R.Buf16(2*ot),this.dyn_dtree=new R.Buf16(2*(2*rt+1)),this.bl_tree=new R.Buf16(2*(2*st+1)),r(this.dyn_ltree),r(this.dyn_dtree),r(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new R.Buf16(lt+1),this.heap=new R.Buf16(2*nt+1),r(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new R.Buf16(2*nt+1),r(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function k(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=Q,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?ut:wt,t.adler=2===e.wrap?0:1,e.last_flush=I,C._tr_init(e),H):i(t,K)}function y(t){var e=k(t);return e===H&&p(t.state),e}function x(t,e){return t&&t.state?2!==t.state.wrap?K:(t.state.gzhead=e,H):K}function z(t,e,a,n,r,s){if(!t)return K;var o=1;if(e===Y&&(e=6),n<0?(o=0,n=-n):n>15&&(o=2,n-=16),r<1||r>$||a!==V||n<8||n>15||e<0||e>9||s<0||s>W)return i(t,K);8===n&&(n=9);var l=new v;return t.state=l,l.strm=t,l.wrap=o,l.gzhead=null,l.w_bits=n,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=r+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+ht-1)/ht),l.window=new R.Buf8(2*l.w_size),l.head=new R.Buf16(l.hash_size),l.prev=new R.Buf16(l.w_size),l.lit_bufsize=1<<r+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new R.Buf8(l.pending_buf_size),l.d_buf=1*l.lit_bufsize,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,y(t)}function B(t,e){return z(t,e,V,tt,et,J)}function S(t,e){var a,o,d,f;if(!t||!t.state||e>L||e<0)return t?i(t,K):K;if(o=t.state,!t.output||!t.input&&0!==t.avail_in||o.status===pt&&e!==F)return i(t,0===t.avail_out?P:K);if(o.strm=t,a=o.last_flush,o.last_flush=e,o.status===ut)if(2===o.wrap)t.adler=0,l(o,31),l(o,139),l(o,8),o.gzhead?(l(o,(o.gzhead.text?1:0)+(o.gzhead.hcrc?2:0)+(o.gzhead.extra?4:0)+(o.gzhead.name?8:0)+(o.gzhead.comment?16:0)),l(o,255&o.gzhead.time),l(o,o.gzhead.time>>8&255),l(o,o.gzhead.time>>16&255),l(o,o.gzhead.time>>24&255),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,255&o.gzhead.os),o.gzhead.extra&&o.gzhead.extra.length&&(l(o,255&o.gzhead.extra.length),l(o,o.gzhead.extra.length>>8&255)),o.gzhead.hcrc&&(t.adler=O(t.adler,o.pending_buf,o.pending,0)),o.gzindex=0,o.status=ct):(l(o,0),l(o,0),l(o,0),l(o,0),l(o,0),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,zt),o.status=wt);else{var _=V+(o.w_bits-8<<4)<<8,u=-1;u=o.strategy>=G||o.level<2?0:o.level<6?1:6===o.level?2:3,_|=u<<6,0!==o.strstart&&(_|=_t),_+=31-_%31,o.status=wt,h(o,_),0!==o.strstart&&(h(o,t.adler>>>16),h(o,65535&t.adler)),t.adler=1}if(o.status===ct)if(o.gzhead.extra){for(d=o.pending;o.gzindex<(65535&o.gzhead.extra.length)&&(o.pending!==o.pending_buf_size||(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending!==o.pending_buf_size));)l(o,255&o.gzhead.extra[o.gzindex]),o.gzindex++;o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),o.gzindex===o.gzhead.extra.length&&(o.gzindex=0,o.status=bt)}else o.status=bt;if(o.status===bt)if(o.gzhead.name){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.name.length?255&o.gzhead.name.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.gzindex=0,o.status=gt)}else o.status=gt;if(o.status===gt)if(o.gzhead.comment){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.comment.length?255&o.gzhead.comment.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.status=mt)}else o.status=mt;if(o.status===mt&&(o.gzhead.hcrc?(o.pending+2>o.pending_buf_size&&s(t),o.pending+2<=o.pending_buf_size&&(l(o,255&t.adler),l(o,t.adler>>8&255),t.adler=0,o.status=wt)):o.status=wt),0!==o.pending){if(s(t),0===t.avail_out)return o.last_flush=-1,H}else if(0===t.avail_in&&n(e)<=n(a)&&e!==F)return i(t,P);if(o.status===pt&&0!==t.avail_in)return i(t,P);if(0!==t.avail_in||0!==o.lookahead||e!==I&&o.status!==pt){var c=o.strategy===G?m(o,e):o.strategy===X?g(o,e):Z[o.level].func(o,e);if(c!==yt&&c!==xt||(o.status=pt),c===vt||c===yt)return 0===t.avail_out&&(o.last_flush=-1),H;if(c===kt&&(e===U?C._tr_align(o):e!==L&&(C._tr_stored_block(o,0,0,!1),e===T&&(r(o.head),0===o.lookahead&&(o.strstart=0,o.block_start=0,o.insert=0))),s(t),0===t.avail_out))return o.last_flush=-1,H}return e!==F?H:o.wrap<=0?j:(2===o.wrap?(l(o,255&t.adler),l(o,t.adler>>8&255),l(o,t.adler>>16&255),l(o,t.adler>>24&255),l(o,255&t.total_in),l(o,t.total_in>>8&255),l(o,t.total_in>>16&255),l(o,t.total_in>>24&255)):(h(o,t.adler>>>16),h(o,65535&t.adler)),s(t),o.wrap>0&&(o.wrap=-o.wrap),0!==o.pending?H:j)}function E(t){var e;return t&&t.state?(e=t.state.status,e!==ut&&e!==ct&&e!==bt&&e!==gt&&e!==mt&&e!==wt&&e!==pt?i(t,K):(t.state=null,e===wt?i(t,M):H)):K}function A(t,e){var a,i,n,s,o,l,h,d,f=e.length;if(!t||!t.state)return K;if(a=t.state,s=a.wrap,2===s||1===s&&a.status!==ut||a.lookahead)return K;for(1===s&&(t.adler=N(t.adler,e,f,0)),a.wrap=0,f>=a.w_size&&(0===s&&(r(a.head),a.strstart=0,a.block_start=0,a.insert=0),d=new R.Buf8(a.w_size),R.arraySet(d,e,f-a.w_size,a.w_size,0),e=d,f=a.w_size),o=t.avail_in,l=t.next_in,h=t.input,t.avail_in=f,t.next_in=0,t.input=e,_(a);a.lookahead>=ht;){i=a.strstart,n=a.lookahead-(ht-1);do a.ins_h=(a.ins_h<<a.hash_shift^a.window[i+ht-1])&a.hash_mask,a.prev[i&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=i,i++;while(--n);a.strstart=i,a.lookahead=ht-1,_(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=ht-1,a.match_available=0,t.next_in=l,t.input=h,t.avail_in=o,a.wrap=s,H}var Z,R=t("../utils/common"),C=t("./trees"),N=t("./adler32"),O=t("./crc32"),D=t("./messages"),I=0,U=1,T=3,F=4,L=5,H=0,j=1,K=-2,M=-3,P=-5,Y=-1,q=1,G=2,X=3,W=4,J=0,Q=2,V=8,$=9,tt=15,et=8,at=29,it=256,nt=it+1+at,rt=30,st=19,ot=2*nt+1,lt=15,ht=3,dt=258,ft=dt+ht+1,_t=32,ut=42,ct=69,bt=73,gt=91,mt=103,wt=113,pt=666,vt=1,kt=2,yt=3,xt=4,zt=3;Z=[new w(0,0,0,0,u),new w(4,4,8,4,c),new w(4,5,16,8,c),new w(4,6,32,32,c),new w(4,4,16,16,b),new w(8,16,32,32,b),new w(8,16,128,128,b),new w(8,32,128,256,b),new w(32,128,258,1024,b),new w(32,258,258,4096,b)],a.deflateInit=B,a.deflateInit2=z,a.deflateReset=y,a.deflateResetKeep=k,a.deflateSetHeader=x,a.deflate=S,a.deflateEnd=E,a.deflateSetDictionary=A,a.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(t,e,a){"use strict";function i(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}e.exports=i},{}],10:[function(t,e,a){"use strict";var i=30,n=12;e.exports=function(t,e){var a,r,s,o,l,h,d,f,_,u,c,b,g,m,w,p,v,k,y,x,z,B,S,E,A;a=t.state,r=t.next_in,E=t.input,s=r+(t.avail_in-5),o=t.next_out,A=t.output,l=o-(e-t.avail_out),h=o+(t.avail_out-257),d=a.dmax,f=a.wsize,_=a.whave,u=a.wnext,c=a.window,b=a.hold,g=a.bits,m=a.lencode,w=a.distcode,p=(1<<a.lenbits)-1,v=(1<<a.distbits)-1;t:do{g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=m[b&p];e:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,0===y)A[o++]=65535&k;else{if(!(16&y)){if(0===(64&y)){k=m[(65535&k)+(b&(1<<y)-1)];continue e}if(32&y){a.mode=n;break t}t.msg="invalid literal/length code",a.mode=i;break t}x=65535&k,y&=15,y&&(g<y&&(b+=E[r++]<<g,g+=8),x+=b&(1<<y)-1,b>>>=y,g-=y),g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=w[b&v];a:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,!(16&y)){if(0===(64&y)){k=w[(65535&k)+(b&(1<<y)-1)];continue a}t.msg="invalid distance code",a.mode=i;break t}if(z=65535&k,y&=15,g<y&&(b+=E[r++]<<g,g+=8,g<y&&(b+=E[r++]<<g,g+=8)),z+=b&(1<<y)-1,z>d){t.msg="invalid distance too far back",a.mode=i;break t}if(b>>>=y,g-=y,y=o-l,z>y){if(y=z-y,y>_&&a.sane){t.msg="invalid distance too far back",a.mode=i;break t}if(B=0,S=c,0===u){if(B+=f-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}else if(u<y){if(B+=f+u-y,y-=u,y<x){x-=y;do A[o++]=c[B++];while(--y);if(B=0,u<x){y=u,x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}}else if(B+=u-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}for(;x>2;)A[o++]=S[B++],A[o++]=S[B++],A[o++]=S[B++],x-=3;x&&(A[o++]=S[B++],x>1&&(A[o++]=S[B++]))}else{B=o-z;do A[o++]=A[B++],A[o++]=A[B++],A[o++]=A[B++],x-=3;while(x>2);x&&(A[o++]=A[B++],x>1&&(A[o++]=A[B++]))}break}}break}}while(r<s&&o<h);x=g>>3,r-=x,g-=x<<3,b&=(1<<g)-1,t.next_in=r,t.next_out=o,t.avail_in=r<s?5+(s-r):5-(r-s),t.avail_out=o<h?257+(h-o):257-(o-h),a.hold=b,a.bits=g}},{}],11:[function(t,e,a){"use strict";function i(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function n(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new w.Buf16(320),this.work=new w.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function r(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=T,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new w.Buf32(bt),e.distcode=e.distdyn=new w.Buf32(gt),e.sane=1,e.back=-1,Z):N}function s(t){var e;return t&&t.state?(e=t.state,e.wsize=0,e.whave=0,e.wnext=0,r(t)):N}function o(t,e){var a,i;return t&&t.state?(i=t.state,e<0?(a=0,e=-e):(a=(e>>4)+1,e<48&&(e&=15)),e&&(e<8||e>15)?N:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,s(t))):N}function l(t,e){var a,i;return t?(i=new n,t.state=i,i.window=null,a=o(t,e),a!==Z&&(t.state=null),a):N}function h(t){return l(t,wt)}function d(t){if(pt){var e;for(g=new w.Buf32(512),m=new w.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(y(z,t.lens,0,288,g,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;y(B,t.lens,0,32,m,0,t.work,{bits:5}),pt=!1}t.lencode=g,t.lenbits=9,t.distcode=m,t.distbits=5}function f(t,e,a,i){var n,r=t.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new w.Buf8(r.wsize)),i>=r.wsize?(w.arraySet(r.window,e,a-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(n=r.wsize-r.wnext,n>i&&(n=i),w.arraySet(r.window,e,a-i,n,r.wnext),i-=n,i?(w.arraySet(r.window,e,a-i,i,0),r.wnext=i,r.whave=r.wsize):(r.wnext+=n,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=n))),0}function _(t,e){var a,n,r,s,o,l,h,_,u,c,b,g,m,bt,gt,mt,wt,pt,vt,kt,yt,xt,zt,Bt,St=0,Et=new w.Buf8(4),At=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return N;a=t.state,a.mode===X&&(a.mode=W),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,c=l,b=h,xt=Z;t:for(;;)switch(a.mode){case T:if(0===a.wrap){a.mode=W;break}for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(2&a.wrap&&35615===_){a.check=0,Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0),_=0,u=0,a.mode=F;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&_)<<8)+(_>>8))%31){t.msg="incorrect header check",a.mode=_t;break}if((15&_)!==U){t.msg="unknown compression method",a.mode=_t;break}if(_>>>=4,u-=4,yt=(15&_)+8,0===a.wbits)a.wbits=yt;else if(yt>a.wbits){t.msg="invalid window size",a.mode=_t;break}a.dmax=1<<yt,t.adler=a.check=1,a.mode=512&_?q:X,_=0,u=0;break;case F:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.flags=_,(255&a.flags)!==U){t.msg="unknown compression method",a.mode=_t;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=_t;break}a.head&&(a.head.text=_>>8&1),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=L;case L:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.time=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,Et[2]=_>>>16&255,Et[3]=_>>>24&255,a.check=v(a.check,Et,4,0)),_=0,u=0,a.mode=H;case H:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.xflags=255&_,a.head.os=_>>8),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=j;case j:if(1024&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length=_,a.head&&(a.head.extra_len=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0}else a.head&&(a.head.extra=null);a.mode=K;case K:if(1024&a.flags&&(g=a.length,g>l&&(g=l),g&&(a.head&&(yt=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Array(a.head.extra_len)),w.arraySet(a.head.extra,n,s,g,yt)),512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,a.length-=g),a.length))break t;a.length=0,a.mode=M;case M:if(2048&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.name+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=P;case P:if(4096&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.comment+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.comment=null);a.mode=Y;case Y:if(512&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(65535&a.check)){t.msg="header crc mismatch",a.mode=_t;break}_=0,u=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=X;break;case q:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}t.adler=a.check=i(_),_=0,u=0,a.mode=G;case G:if(0===a.havedict)return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,C;t.adler=a.check=1,a.mode=X;case X:if(e===E||e===A)break t;case W:if(a.last){_>>>=7&u,u-=7&u,a.mode=ht;break}for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}switch(a.last=1&_,_>>>=1,u-=1,3&_){case 0:a.mode=J;break;case 1:if(d(a),a.mode=at,e===A){_>>>=2,u-=2;break t}break;case 2:a.mode=$;break;case 3:t.msg="invalid block type",a.mode=_t}_>>>=2,u-=2;break;case J:for(_>>>=7&u,u-=7&u;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if((65535&_)!==(_>>>16^65535)){t.msg="invalid stored block lengths",a.mode=_t;break}if(a.length=65535&_,_=0,u=0,a.mode=Q,e===A)break t;case Q:a.mode=V;case V:if(g=a.length){if(g>l&&(g=l),g>h&&(g=h),0===g)break t;w.arraySet(r,n,s,g,o),l-=g,s+=g,h-=g,o+=g,a.length-=g;break}a.mode=X;break;case $:
for(;u<14;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.nlen=(31&_)+257,_>>>=5,u-=5,a.ndist=(31&_)+1,_>>>=5,u-=5,a.ncode=(15&_)+4,_>>>=4,u-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=_t;break}a.have=0,a.mode=tt;case tt:for(;a.have<a.ncode;){for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.lens[At[a.have++]]=7&_,_>>>=3,u-=3}for(;a.have<19;)a.lens[At[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,zt={bits:a.lenbits},xt=y(x,a.lens,0,19,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid code lengths set",a.mode=_t;break}a.have=0,a.mode=et;case et:for(;a.have<a.nlen+a.ndist;){for(;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(wt<16)_>>>=gt,u-=gt,a.lens[a.have++]=wt;else{if(16===wt){for(Bt=gt+2;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_>>>=gt,u-=gt,0===a.have){t.msg="invalid bit length repeat",a.mode=_t;break}yt=a.lens[a.have-1],g=3+(3&_),_>>>=2,u-=2}else if(17===wt){for(Bt=gt+3;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=3+(7&_),_>>>=3,u-=3}else{for(Bt=gt+7;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=11+(127&_),_>>>=7,u-=7}if(a.have+g>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=_t;break}for(;g--;)a.lens[a.have++]=yt}}if(a.mode===_t)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=_t;break}if(a.lenbits=9,zt={bits:a.lenbits},xt=y(z,a.lens,0,a.nlen,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid literal/lengths set",a.mode=_t;break}if(a.distbits=6,a.distcode=a.distdyn,zt={bits:a.distbits},xt=y(B,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,zt),a.distbits=zt.bits,xt){t.msg="invalid distances set",a.mode=_t;break}if(a.mode=at,e===A)break t;case at:a.mode=it;case it:if(l>=6&&h>=258){t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,k(t,b),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,a.mode===X&&(a.back=-1);break}for(a.back=0;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(mt&&0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.lencode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,a.length=wt,0===mt){a.mode=lt;break}if(32&mt){a.back=-1,a.mode=X;break}if(64&mt){t.msg="invalid literal/length code",a.mode=_t;break}a.extra=15&mt,a.mode=nt;case nt:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=rt;case rt:for(;St=a.distcode[_&(1<<a.distbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.distcode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,64&mt){t.msg="invalid distance code",a.mode=_t;break}a.offset=wt,a.extra=15&mt,a.mode=st;case st:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.offset+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=_t;break}a.mode=ot;case ot:if(0===h)break t;if(g=b-h,a.offset>g){if(g=a.offset-g,g>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=_t;break}g>a.wnext?(g-=a.wnext,m=a.wsize-g):m=a.wnext-g,g>a.length&&(g=a.length),bt=a.window}else bt=r,m=o-a.offset,g=a.length;g>h&&(g=h),h-=g,a.length-=g;do r[o++]=bt[m++];while(--g);0===a.length&&(a.mode=it);break;case lt:if(0===h)break t;r[o++]=a.length,h--,a.mode=it;break;case ht:if(a.wrap){for(;u<32;){if(0===l)break t;l--,_|=n[s++]<<u,u+=8}if(b-=h,t.total_out+=b,a.total+=b,b&&(t.adler=a.check=a.flags?v(a.check,r,b,o-b):p(a.check,r,b,o-b)),b=h,(a.flags?_:i(_))!==a.check){t.msg="incorrect data check",a.mode=_t;break}_=0,u=0}a.mode=dt;case dt:if(a.wrap&&a.flags){for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=_t;break}_=0,u=0}a.mode=ft;case ft:xt=R;break t;case _t:xt=O;break t;case ut:return D;case ct:default:return N}return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,(a.wsize||b!==t.avail_out&&a.mode<_t&&(a.mode<ht||e!==S))&&f(t,t.output,t.next_out,b-t.avail_out)?(a.mode=ut,D):(c-=t.avail_in,b-=t.avail_out,t.total_in+=c,t.total_out+=b,a.total+=b,a.wrap&&b&&(t.adler=a.check=a.flags?v(a.check,r,b,t.next_out-b):p(a.check,r,b,t.next_out-b)),t.data_type=a.bits+(a.last?64:0)+(a.mode===X?128:0)+(a.mode===at||a.mode===Q?256:0),(0===c&&0===b||e===S)&&xt===Z&&(xt=I),xt)}function u(t){if(!t||!t.state)return N;var e=t.state;return e.window&&(e.window=null),t.state=null,Z}function c(t,e){var a;return t&&t.state?(a=t.state,0===(2&a.wrap)?N:(a.head=e,e.done=!1,Z)):N}function b(t,e){var a,i,n,r=e.length;return t&&t.state?(a=t.state,0!==a.wrap&&a.mode!==G?N:a.mode===G&&(i=1,i=p(i,e,r,0),i!==a.check)?O:(n=f(t,e,r,r))?(a.mode=ut,D):(a.havedict=1,Z)):N}var g,m,w=t("../utils/common"),p=t("./adler32"),v=t("./crc32"),k=t("./inffast"),y=t("./inftrees"),x=0,z=1,B=2,S=4,E=5,A=6,Z=0,R=1,C=2,N=-2,O=-3,D=-4,I=-5,U=8,T=1,F=2,L=3,H=4,j=5,K=6,M=7,P=8,Y=9,q=10,G=11,X=12,W=13,J=14,Q=15,V=16,$=17,tt=18,et=19,at=20,it=21,nt=22,rt=23,st=24,ot=25,lt=26,ht=27,dt=28,ft=29,_t=30,ut=31,ct=32,bt=852,gt=592,mt=15,wt=mt,pt=!0;a.inflateReset=s,a.inflateReset2=o,a.inflateResetKeep=r,a.inflateInit=h,a.inflateInit2=l,a.inflate=_,a.inflateEnd=u,a.inflateGetHeader=c,a.inflateSetDictionary=b,a.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(t,e,a){"use strict";var i=t("../utils/common"),n=15,r=852,s=592,o=0,l=1,h=2,d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],f=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],_=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],u=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,a,c,b,g,m,w){var p,v,k,y,x,z,B,S,E,A=w.bits,Z=0,R=0,C=0,N=0,O=0,D=0,I=0,U=0,T=0,F=0,L=null,H=0,j=new i.Buf16(n+1),K=new i.Buf16(n+1),M=null,P=0;for(Z=0;Z<=n;Z++)j[Z]=0;for(R=0;R<c;R++)j[e[a+R]]++;for(O=A,N=n;N>=1&&0===j[N];N--);if(O>N&&(O=N),0===N)return b[g++]=20971520,b[g++]=20971520,w.bits=1,0;for(C=1;C<N&&0===j[C];C++);for(O<C&&(O=C),U=1,Z=1;Z<=n;Z++)if(U<<=1,U-=j[Z],U<0)return-1;if(U>0&&(t===o||1!==N))return-1;for(K[1]=0,Z=1;Z<n;Z++)K[Z+1]=K[Z]+j[Z];for(R=0;R<c;R++)0!==e[a+R]&&(m[K[e[a+R]]++]=R);if(t===o?(L=M=m,z=19):t===l?(L=d,H-=257,M=f,P-=257,z=256):(L=_,M=u,z=-1),F=0,R=0,Z=C,x=g,D=O,I=0,k=-1,T=1<<O,y=T-1,t===l&&T>r||t===h&&T>s)return 1;for(;;){B=Z-I,m[R]<z?(S=0,E=m[R]):m[R]>z?(S=M[P+m[R]],E=L[H+m[R]]):(S=96,E=0),p=1<<Z-I,v=1<<D,C=v;do v-=p,b[x+(F>>I)+v]=B<<24|S<<16|E|0;while(0!==v);for(p=1<<Z-1;F&p;)p>>=1;if(0!==p?(F&=p-1,F+=p):F=0,R++,0===--j[Z]){if(Z===N)break;Z=e[a+m[R]]}if(Z>O&&(F&y)!==k){for(0===I&&(I=O),x+=C,D=Z-I,U=1<<D;D+I<N&&(U-=j[D+I],!(U<=0));)D++,U<<=1;if(T+=1<<D,t===l&&T>r||t===h&&T>s)return 1;k=F&y,b[k]=O<<24|D<<16|x-g|0}}return 0!==F&&(b[x+F]=Z-I<<24|64<<16|0),w.bits=O,0}},{"../utils/common":3}],13:[function(t,e,a){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],14:[function(t,e,a){"use strict";function i(t){for(var e=t.length;--e>=0;)t[e]=0}function n(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function r(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function s(t){return t<256?lt[t]:lt[256+(t>>>7)]}function o(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function l(t,e,a){t.bi_valid>W-a?(t.bi_buf|=e<<t.bi_valid&65535,o(t,t.bi_buf),t.bi_buf=e>>W-t.bi_valid,t.bi_valid+=a-W):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)}function h(t,e,a){l(t,a[2*e],a[2*e+1])}function d(t,e){var a=0;do a|=1&t,t>>>=1,a<<=1;while(--e>0);return a>>>1}function f(t){16===t.bi_valid?(o(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}function _(t,e){var a,i,n,r,s,o,l=e.dyn_tree,h=e.max_code,d=e.stat_desc.static_tree,f=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,u=e.stat_desc.extra_base,c=e.stat_desc.max_length,b=0;for(r=0;r<=X;r++)t.bl_count[r]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<G;a++)i=t.heap[a],r=l[2*l[2*i+1]+1]+1,r>c&&(r=c,b++),l[2*i+1]=r,i>h||(t.bl_count[r]++,s=0,i>=u&&(s=_[i-u]),o=l[2*i],t.opt_len+=o*(r+s),f&&(t.static_len+=o*(d[2*i+1]+s)));if(0!==b){do{for(r=c-1;0===t.bl_count[r];)r--;t.bl_count[r]--,t.bl_count[r+1]+=2,t.bl_count[c]--,b-=2}while(b>0);for(r=c;0!==r;r--)for(i=t.bl_count[r];0!==i;)n=t.heap[--a],n>h||(l[2*n+1]!==r&&(t.opt_len+=(r-l[2*n+1])*l[2*n],l[2*n+1]=r),i--)}}function u(t,e,a){var i,n,r=new Array(X+1),s=0;for(i=1;i<=X;i++)r[i]=s=s+a[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=d(r[o]++,o))}}function c(){var t,e,a,i,r,s=new Array(X+1);for(a=0,i=0;i<K-1;i++)for(dt[i]=a,t=0;t<1<<et[i];t++)ht[a++]=i;for(ht[a-1]=i,r=0,i=0;i<16;i++)for(ft[i]=r,t=0;t<1<<at[i];t++)lt[r++]=i;for(r>>=7;i<Y;i++)for(ft[i]=r<<7,t=0;t<1<<at[i]-7;t++)lt[256+r++]=i;for(e=0;e<=X;e++)s[e]=0;for(t=0;t<=143;)st[2*t+1]=8,t++,s[8]++;for(;t<=255;)st[2*t+1]=9,t++,s[9]++;for(;t<=279;)st[2*t+1]=7,t++,s[7]++;for(;t<=287;)st[2*t+1]=8,t++,s[8]++;for(u(st,P+1,s),t=0;t<Y;t++)ot[2*t+1]=5,ot[2*t]=d(t,5);_t=new n(st,et,M+1,P,X),ut=new n(ot,at,0,Y,X),ct=new n(new Array(0),it,0,q,J)}function b(t){var e;for(e=0;e<P;e++)t.dyn_ltree[2*e]=0;for(e=0;e<Y;e++)t.dyn_dtree[2*e]=0;for(e=0;e<q;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*Q]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function g(t){t.bi_valid>8?o(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function m(t,e,a,i){g(t),i&&(o(t,a),o(t,~a)),N.arraySet(t.pending_buf,t.window,e,a,t.pending),t.pending+=a}function w(t,e,a,i){var n=2*e,r=2*a;return t[n]<t[r]||t[n]===t[r]&&i[e]<=i[a]}function p(t,e,a){for(var i=t.heap[a],n=a<<1;n<=t.heap_len&&(n<t.heap_len&&w(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!w(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i}function v(t,e,a){var i,n,r,o,d=0;if(0!==t.last_lit)do i=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],n=t.pending_buf[t.l_buf+d],d++,0===i?h(t,n,e):(r=ht[n],h(t,r+M+1,e),o=et[r],0!==o&&(n-=dt[r],l(t,n,o)),i--,r=s(i),h(t,r,a),o=at[r],0!==o&&(i-=ft[r],l(t,i,o)));while(d<t.last_lit);h(t,Q,e)}function k(t,e){var a,i,n,r=e.dyn_tree,s=e.stat_desc.static_tree,o=e.stat_desc.has_stree,l=e.stat_desc.elems,h=-1;for(t.heap_len=0,t.heap_max=G,a=0;a<l;a++)0!==r[2*a]?(t.heap[++t.heap_len]=h=a,t.depth[a]=0):r[2*a+1]=0;for(;t.heap_len<2;)n=t.heap[++t.heap_len]=h<2?++h:0,r[2*n]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=s[2*n+1]);for(e.max_code=h,a=t.heap_len>>1;a>=1;a--)p(t,r,a);n=l;do a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],p(t,r,1),i=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=i,r[2*n]=r[2*a]+r[2*i],t.depth[n]=(t.depth[a]>=t.depth[i]?t.depth[a]:t.depth[i])+1,r[2*a+1]=r[2*i+1]=n,t.heap[1]=n++,p(t,r,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],_(t,e),u(r,h,t.bl_count)}function y(t,e,a){var i,n,r=-1,s=e[1],o=0,l=7,h=4;for(0===s&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=s,s=e[2*(i+1)+1],++o<l&&n===s||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==r&&t.bl_tree[2*n]++,t.bl_tree[2*V]++):o<=10?t.bl_tree[2*$]++:t.bl_tree[2*tt]++,o=0,r=n,0===s?(l=138,h=3):n===s?(l=6,h=3):(l=7,h=4))}function x(t,e,a){var i,n,r=-1,s=e[1],o=0,d=7,f=4;for(0===s&&(d=138,f=3),i=0;i<=a;i++)if(n=s,s=e[2*(i+1)+1],!(++o<d&&n===s)){if(o<f){do h(t,n,t.bl_tree);while(0!==--o)}else 0!==n?(n!==r&&(h(t,n,t.bl_tree),o--),h(t,V,t.bl_tree),l(t,o-3,2)):o<=10?(h(t,$,t.bl_tree),l(t,o-3,3)):(h(t,tt,t.bl_tree),l(t,o-11,7));o=0,r=n,0===s?(d=138,f=3):n===s?(d=6,f=3):(d=7,f=4)}}function z(t){var e;for(y(t,t.dyn_ltree,t.l_desc.max_code),y(t,t.dyn_dtree,t.d_desc.max_code),k(t,t.bl_desc),e=q-1;e>=3&&0===t.bl_tree[2*nt[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}function B(t,e,a,i){var n;for(l(t,e-257,5),l(t,a-1,5),l(t,i-4,4),n=0;n<i;n++)l(t,t.bl_tree[2*nt[n]+1],3);x(t,t.dyn_ltree,e-1),x(t,t.dyn_dtree,a-1)}function S(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return D;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return I;for(e=32;e<M;e++)if(0!==t.dyn_ltree[2*e])return I;return D}function E(t){bt||(c(),bt=!0),t.l_desc=new r(t.dyn_ltree,_t),t.d_desc=new r(t.dyn_dtree,ut),t.bl_desc=new r(t.bl_tree,ct),t.bi_buf=0,t.bi_valid=0,b(t)}function A(t,e,a,i){l(t,(T<<1)+(i?1:0),3),m(t,e,a,!0)}function Z(t){l(t,F<<1,3),h(t,Q,st),f(t)}function R(t,e,a,i){var n,r,s=0;t.level>0?(t.strm.data_type===U&&(t.strm.data_type=S(t)),k(t,t.l_desc),k(t,t.d_desc),s=z(t),n=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=n&&(n=r)):n=r=a+5,a+4<=n&&e!==-1?A(t,e,a,i):t.strategy===O||r===n?(l(t,(F<<1)+(i?1:0),3),v(t,st,ot)):(l(t,(L<<1)+(i?1:0),3),B(t,t.l_desc.max_code+1,t.d_desc.max_code+1,s+1),v(t,t.dyn_ltree,t.dyn_dtree)),b(t),i&&g(t)}function C(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(ht[a]+M+1)]++,t.dyn_dtree[2*s(e)]++),t.last_lit===t.lit_bufsize-1}var N=t("../utils/common"),O=4,D=0,I=1,U=2,T=0,F=1,L=2,H=3,j=258,K=29,M=256,P=M+1+K,Y=30,q=19,G=2*P+1,X=15,W=16,J=7,Q=256,V=16,$=17,tt=18,et=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],at=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],it=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],nt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],rt=512,st=new Array(2*(P+2));i(st);var ot=new Array(2*Y);i(ot);var lt=new Array(rt);i(lt);var ht=new Array(j-H+1);i(ht);var dt=new Array(K);i(dt);var ft=new Array(Y);i(ft);var _t,ut,ct,bt=!1;a._tr_init=E,a._tr_stored_block=A,a._tr_flush_block=R,a._tr_tally=C,a._tr_align=Z},{"../utils/common":3}],15:[function(t,e,a){"use strict";function i(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}e.exports=i},{}],"/":[function(t,e,a){"use strict";var i=t("./lib/utils/common").assign,n=t("./lib/deflate"),r=t("./lib/inflate"),s=t("./lib/zlib/constants"),o={};i(o,n,r,s),e.exports=o},{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")});

/*
* A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
* Digest Algorithm, as defined in RFC 1321.
* Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
* Distributed under the BSD License
* See http://pajhome.org.uk/crypt/md5 for more info.
*/
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var md5 = /** @class */ (function () {
    function md5() {
        this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
        this.b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    }
    /*
     * These are the privates you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    md5.prototype.hex_md5 = function (s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); };
    md5.prototype.b64_md5 = function (s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); };
    md5.prototype.any_md5 = function (s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); };
    md5.prototype.hex_hmac_md5 = function (k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
    md5.prototype.b64_hmac_md5 = function (k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
    md5.prototype.any_hmac_md5 = function (k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); };
    /*
     * Perform a simple self-test to see if the VM is working
     */
    md5.prototype.md5_vm_test = function () {
        return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    };
    /*
     * Calculate the MD5 of a raw string
     */
    md5.prototype.rstr_md5 = function (s) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
    };
    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    md5.prototype.rstr_hmac_md5 = function (key, data) {
        var bkey = this.rstr2binl(key);
        if (bkey.length > 16)
            bkey = this.binl_md5(bkey, key.length * 8);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
        return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
    };
    /*
     * Convert a raw string to a hex string
     */
    md5.prototype.rstr2hex = function (input) {
        try {
            this.hexcase;
        }
        catch (e) {
            this.hexcase = 0;
        }
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
                + hex_tab.charAt(x & 0x0F);
        }
        return output;
    };
    /*
     * Convert a raw string to a base-64 string
     */
    md5.prototype.rstr2b64 = function (input) {
        try {
            this.b64pad;
        }
        catch (e) {
            this.b64pad = '';
        }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8)
                    output += this.b64pad;
                else
                    output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    };
    /*
     * Convert a raw string to an arbitrary string encoding
     */
    md5.prototype.rstr2any = function (input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;
        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }
        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. All remainders are stored for later
         * use.
         */
        var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }
        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);
        return output;
    };
    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    md5.prototype.str2rstr_utf8 = function (input) {
        var output = "";
        var i = -1;
        var x, y;
        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            /* Encode output as utf-8 */
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
        return output;
    };
    /*
     * Encode a string as utf-16
     */
    md5.prototype.str2rstr_utf16le = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    };
    md5.prototype.str2rstr_utf16be = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
        return output;
    };
    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    md5.prototype.rstr2binl = function (input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    };
    /*
     * Convert an array of little-endian words to a string
     */
    md5.prototype.binl2rstr = function (input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    };
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    md5.prototype.binl_md5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return [a, b, c, d];
    };
    /*
     * These privates implement the four basic operations the algorithm uses.
     */
    md5.prototype.md5_cmn = function (q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    };
    md5.prototype.md5_ff = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    md5.prototype.md5_gg = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    md5.prototype.md5_hh = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    md5.prototype.md5_ii = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    md5.prototype.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    md5.prototype.bit_rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    return md5;
}());

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: chatcommand.proto
var Pmd;
(function (Pmd) {
    var ChatType;
    (function (ChatType) {
        ChatType[ChatType["ChatType_Map"] = 2] = "ChatType_Map";
    })(ChatType = Pmd.ChatType || (Pmd.ChatType = {}));
    var Chat = /** @class */ (function () {
        function Chat() {
        }
        Chat.prototype.GetType = function () { return 'Pmd.Chat'; };
        return Chat;
    }());
    Pmd.Chat = Chat;
    (function (Chat) {
        var Param;
        (function (Param) {
            Param[Param["CommonChatUserPmd_CS"] = 1] = "CommonChatUserPmd_CS";
            Param[Param["GMCommandChatUserPmd_C"] = 2] = "GMCommandChatUserPmd_C";
            Param[Param["GMCommandListChatUserPmd_S"] = 4] = "GMCommandListChatUserPmd_S";
            Param[Param["PrivateChatUserPmd_CS"] = 5] = "PrivateChatUserPmd_CS";
        })(Param = Chat.Param || (Chat.Param = {}));
    })(Chat = Pmd.Chat || (Pmd.Chat = {}));
    var CommonChatUserPmd_CS = /** @class */ (function () {
        function CommonChatUserPmd_CS() {
        }
        CommonChatUserPmd_CS.prototype.GetType = function () { return 'Pmd.CommonChatUserPmd_CS'; };
        return CommonChatUserPmd_CS;
    }());
    Pmd.CommonChatUserPmd_CS = CommonChatUserPmd_CS;
    (function (CommonChatUserPmd_CS) {
        var ChatType;
        (function (ChatType) {
            /**
             * 世界聊天
             */
            ChatType[ChatType["ChatType_None"] = 0] = "ChatType_None";
            /**
             * 大厅聊天
             */
            ChatType[ChatType["ChatType_Lobby"] = 1] = "ChatType_Lobby";
            /**
             * 房间聊天
             */
            ChatType[ChatType["ChatType_Room"] = 2] = "ChatType_Room";
            /**
             * 机器人聊天
             */
            ChatType[ChatType["ChatType_Robot"] = 4] = "ChatType_Robot";
        })(ChatType = CommonChatUserPmd_CS.ChatType || (CommonChatUserPmd_CS.ChatType = {}));
    })(CommonChatUserPmd_CS = Pmd.CommonChatUserPmd_CS || (Pmd.CommonChatUserPmd_CS = {}));
    (function (CommonChatUserPmd_CS) {
        var ChatPos;
        (function (ChatPos) {
            /**
             * 普通聊天输出
             */
            ChatPos[ChatPos["ChatPos_None"] = 0] = "ChatPos_None";
            /**
             * 普通聊天输出
             */
            ChatPos[ChatPos["ChatPos_Normal"] = 1] = "ChatPos_Normal";
            /**
             * 系统提示输出
             */
            ChatPos[ChatPos["ChatPos_Sys"] = 2] = "ChatPos_Sys";
            /**
             * 冒泡提示
             */
            ChatPos[ChatPos["ChatPos_Tips"] = 4] = "ChatPos_Tips";
            /**
             * 右下角弹出
             */
            ChatPos[ChatPos["ChatPos_Pop"] = 8] = "ChatPos_Pop";
            /**
             * 私聊输出
             */
            ChatPos[ChatPos["ChatPos_Private"] = 16] = "ChatPos_Private";
            /**
             * 重要信息，屏幕中央输出(电视)
             */
            ChatPos[ChatPos["ChatPos_Important"] = 32] = "ChatPos_Important";
            /**
             * 荣耀信息
             */
            ChatPos[ChatPos["ChatPos_Honor"] = 64] = "ChatPos_Honor";
            /**
             * GM系统公告输出位置
             */
            ChatPos[ChatPos["ChatPos_Gm"] = 128] = "ChatPos_Gm";
            /**
             * VIP
             */
            ChatPos[ChatPos["ChatPos_GmVip"] = 144] = "ChatPos_GmVip";
            /**
             * 固定显
             */
            ChatPos[ChatPos["ChatPos_ImportantDown"] = 160] = "ChatPos_ImportantDown";
        })(ChatPos = CommonChatUserPmd_CS.ChatPos || (CommonChatUserPmd_CS.ChatPos = {}));
    })(CommonChatUserPmd_CS = Pmd.CommonChatUserPmd_CS || (Pmd.CommonChatUserPmd_CS = {}));
    var GMCommandChatUserPmd_C = /** @class */ (function () {
        function GMCommandChatUserPmd_C() {
        }
        GMCommandChatUserPmd_C.prototype.GetType = function () { return 'Pmd.GMCommandChatUserPmd_C'; };
        return GMCommandChatUserPmd_C;
    }());
    Pmd.GMCommandChatUserPmd_C = GMCommandChatUserPmd_C;
    var GMHelpInfo = /** @class */ (function () {
        function GMHelpInfo() {
        }
        GMHelpInfo.prototype.GetType = function () { return 'Pmd.GMHelpInfo'; };
        return GMHelpInfo;
    }());
    Pmd.GMHelpInfo = GMHelpInfo;
    var GMCommandListChatUserPmd_S = /** @class */ (function () {
        function GMCommandListChatUserPmd_S() {
        }
        GMCommandListChatUserPmd_S.prototype.GetType = function () { return 'Pmd.GMCommandListChatUserPmd_S'; };
        return GMCommandListChatUserPmd_S;
    }());
    Pmd.GMCommandListChatUserPmd_S = GMCommandListChatUserPmd_S;
    var PrivateChatUserPmd_CS = /** @class */ (function () {
        function PrivateChatUserPmd_CS() {
        }
        PrivateChatUserPmd_CS.prototype.GetType = function () { return 'Pmd.PrivateChatUserPmd_CS'; };
        return PrivateChatUserPmd_CS;
    }());
    Pmd.PrivateChatUserPmd_CS = PrivateChatUserPmd_CS;
})(Pmd || (Pmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: forwardcommand.proto
var Pmd;
(function (Pmd) {
    var Forward = /** @class */ (function () {
        function Forward() {
        }
        Forward.prototype.GetType = function () { return 'Pmd.Forward'; };
        return Forward;
    }());
    Pmd.Forward = Forward;
    (function (Forward) {
        var Param;
        (function (Param) {
            Param[Param["UserJsMessageForwardUserPmd_CS"] = 1] = "UserJsMessageForwardUserPmd_CS";
            /**
             * LoginLobbyRes							= 3;
             */
            Param[Param["WebSocketForwardUserPmd_C"] = 4] = "WebSocketForwardUserPmd_C";
            Param[Param["WebSocketForwardUserPmd_S"] = 5] = "WebSocketForwardUserPmd_S";
        })(Param = Forward.Param || (Forward.Param = {}));
    })(Forward = Pmd.Forward || (Pmd.Forward = {}));
    /**
     * 长连接时玩家跟区服务器的通信是通过网关转发的,统一用这个消息互相传递
     */
    var UserJsMessageForwardUserPmd_CS = /** @class */ (function () {
        function UserJsMessageForwardUserPmd_CS() {
        }
        UserJsMessageForwardUserPmd_CS.prototype.GetType = function () { return 'Pmd.UserJsMessageForwardUserPmd_CS'; };
        return UserJsMessageForwardUserPmd_CS;
    }());
    Pmd.UserJsMessageForwardUserPmd_CS = UserJsMessageForwardUserPmd_CS;
    /**
     * HTTP请求切换到websocket链接
     */
    var WebSocketForwardUserPmd_C = /** @class */ (function () {
        function WebSocketForwardUserPmd_C() {
        }
        WebSocketForwardUserPmd_C.prototype.GetType = function () { return 'Pmd.WebSocketForwardUserPmd_C'; };
        return WebSocketForwardUserPmd_C;
    }());
    Pmd.WebSocketForwardUserPmd_C = WebSocketForwardUserPmd_C;
    var WebSocketForwardUserPmd_S = /** @class */ (function () {
        function WebSocketForwardUserPmd_S() {
        }
        WebSocketForwardUserPmd_S.prototype.GetType = function () { return 'Pmd.WebSocketForwardUserPmd_S'; };
        return WebSocketForwardUserPmd_S;
    }());
    Pmd.WebSocketForwardUserPmd_S = WebSocketForwardUserPmd_S;
})(Pmd || (Pmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: logincommand.proto
var Pmd;
(function (Pmd) {
    /**
     * 区服务器状态
     */
    var ZoneState;
    (function (ZoneState) {
        /**
         * 关闭状态ZoneState_Shutdown
         */
        ZoneState[ZoneState["Shutdown"] = 0] = "Shutdown";
        /**
         * 正常运行ZoneState_Normal
         */
        ZoneState[ZoneState["Normal"] = 1] = "Normal";
        /**
         * 爆满ZoneState_Fullly
         */
        ZoneState[ZoneState["Fullly"] = 2] = "Fullly";
        /**
         * 正在启动ZoneState_Starting
         */
        ZoneState[ZoneState["Starting"] = 3] = "Starting";
    })(ZoneState = Pmd.ZoneState || (Pmd.ZoneState = {}));
    var ServerShutDownLoginUserPmd_S = /** @class */ (function () {
        function ServerShutDownLoginUserPmd_S() {
        }
        ServerShutDownLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ServerShutDownLoginUserPmd_S'; };
        return ServerShutDownLoginUserPmd_S;
    }());
    Pmd.ServerShutDownLoginUserPmd_S = ServerShutDownLoginUserPmd_S;
    var OnlineStateLoginUserPmd_CS = /** @class */ (function () {
        function OnlineStateLoginUserPmd_CS() {
        }
        OnlineStateLoginUserPmd_CS.prototype.GetType = function () { return 'Pmd.OnlineStateLoginUserPmd_CS'; };
        return OnlineStateLoginUserPmd_CS;
    }());
    Pmd.OnlineStateLoginUserPmd_CS = OnlineStateLoginUserPmd_CS;
    var LoginReturnFailReason;
    (function (LoginReturnFailReason) {
        /**
         * 密码错误
         */
        LoginReturnFailReason[LoginReturnFailReason["Password"] = 1] = "Password";
        /**
         * 区服务器已关闭
         */
        LoginReturnFailReason[LoginReturnFailReason["ServerShutdown"] = 2] = "ServerShutdown";
        /**
         * 客户端游戏版本号太低
         */
        LoginReturnFailReason[LoginReturnFailReason["VersionTooLow"] = 3] = "VersionTooLow";
        /**
         * 没有找到登录token,需要重新平台验证
         */
        LoginReturnFailReason[LoginReturnFailReason["UserTokenFind"] = 4] = "UserTokenFind";
        /**
         * token错误
         */
        LoginReturnFailReason[LoginReturnFailReason["UserTokenTempId"] = 5] = "UserTokenTempId";
        /**
         * token已过期
         */
        LoginReturnFailReason[LoginReturnFailReason["UserTokenTimeOut"] = 6] = "UserTokenTimeOut";
        /**
         * 重复登录
         */
        LoginReturnFailReason[LoginReturnFailReason["LoginDulicate"] = 7] = "LoginDulicate";
        /**
         * 没有可用网关
         */
        LoginReturnFailReason[LoginReturnFailReason["NoGatewaytDown"] = 8] = "NoGatewaytDown";
        /**
         * 账号正在使用中
         */
        LoginReturnFailReason[LoginReturnFailReason["AccountUsing"] = 9] = "AccountUsing";
        /**
         * 网关人数满
         */
        LoginReturnFailReason[LoginReturnFailReason["GatewayUserMax"] = 10] = "GatewayUserMax";
        /**
         * 外挂惩罚
         */
        LoginReturnFailReason[LoginReturnFailReason["WaiGuaPunish"] = 11] = "WaiGuaPunish";
        /**
         * 未到开服时间
         */
        LoginReturnFailReason[LoginReturnFailReason["ServerStartTime"] = 12] = "ServerStartTime";
    })(LoginReturnFailReason = Pmd.LoginReturnFailReason || (Pmd.LoginReturnFailReason = {}));
    var ZoneInfoBitMask;
    (function (ZoneInfoBitMask) {
        ZoneInfoBitMask[ZoneInfoBitMask["ZoneInfoBitMask_None"] = 0] = "ZoneInfoBitMask_None";
        /**
         * 正常运营
         */
        ZoneInfoBitMask[ZoneInfoBitMask["ZoneInfoBitMask_Normal"] = 1] = "ZoneInfoBitMask_Normal";
        /**
         * 支持沙箱模式
         */
        ZoneInfoBitMask[ZoneInfoBitMask["ZoneInfoBitMask_SandBox"] = 2] = "ZoneInfoBitMask_SandBox";
        /**
         * 暂未开放
         */
        ZoneInfoBitMask[ZoneInfoBitMask["ZoneInfoBitMask_NoOpen"] = 4] = "ZoneInfoBitMask_NoOpen";
    })(ZoneInfoBitMask = Pmd.ZoneInfoBitMask || (Pmd.ZoneInfoBitMask = {}));
    /**
     * 平台枚举
     */
    var PlatType;
    (function (PlatType) {
        /**
         * 本平台
         */
        PlatType[PlatType["PlatType_Normal"] = 0] = "PlatType_Normal";
        /**
         * UC平台
         */
        PlatType[PlatType["PlatType_UC"] = 4] = "PlatType_UC";
        /**
         * 手上活
         */
        PlatType[PlatType["PlatType_LeZhuan"] = 67] = "PlatType_LeZhuan";
        /**
         * 微信
         */
        PlatType[PlatType["PlatType_WeChat"] = 68] = "PlatType_WeChat";
        /**
         * play68
         */
        PlatType[PlatType["PlatType_Play68"] = 69] = "PlatType_Play68";
        /**
         * 爱贝云
         */
        PlatType[PlatType["PlatType_AiBei"] = 70] = "PlatType_AiBei";
        /**
         * Facebook
         */
        PlatType[PlatType["PlatType_Facebook"] = 71] = "PlatType_Facebook";
        /**
         * GooglePlay
         */
        PlatType[PlatType["PlatType_GooglePlay"] = 72] = "PlatType_GooglePlay";
        /**
         * 性之助（就叫这个名字）
         */
        PlatType[PlatType["PlatType_XingZhiZhu"] = 73] = "PlatType_XingZhiZhu";
        /**
         * 火舞
         */
        PlatType[PlatType["PlatType_HuoWu"] = 74] = "PlatType_HuoWu";
        /**
         * 彩果
         */
        PlatType[PlatType["PlatType_CaiGuo"] = 77] = "PlatType_CaiGuo";
        /**
         * 1758
         */
        PlatType[PlatType["PlatType_1758"] = 79] = "PlatType_1758";
        /**
         * 达派手机助手
         */
        PlatType[PlatType["PlatType_DAPAI"] = 80] = "PlatType_DAPAI";
        /**
         * 嗨乐app
         */
        PlatType[PlatType["PlatType_HILE"] = 82] = "PlatType_HILE";
        /**
         * 爱爱游
         */
        PlatType[PlatType["PlatType_AAY"] = 86] = "PlatType_AAY";
        /**
         * 微游联盟
         */
        PlatType[PlatType["PlatType_WEIYOU"] = 90] = "PlatType_WEIYOU";
        /**
         * 万游在线
         */
        PlatType[PlatType["PlatType_9g"] = 99] = "PlatType_9g";
        /**
         * 手机
         */
        PlatType[PlatType["PlatType_MOBILE"] = 129] = "PlatType_MOBILE";
        /**
         * 雪池
         */
        PlatType[PlatType["PlatType_XueChi"] = 133] = "PlatType_XueChi";
        /**
         * 白鹭开放平台
         */
        PlatType[PlatType["PlatType_Egret"] = 134] = "PlatType_Egret";
        /**
         * 鎏信
         */
        PlatType[PlatType["PlatType_AoXin"] = 140] = "PlatType_AoXin";
        /**
         * 火速,云游平台
         */
        PlatType[PlatType["PlatType_HUOSU"] = 145] = "PlatType_HUOSU";
        /**
         * 荣强网络
         */
        PlatType[PlatType["PlatType_RONGQIANG"] = 151] = "PlatType_RONGQIANG";
        /**
         * AAAapp
         */
        PlatType[PlatType["PlatType_WXApp"] = 152] = "PlatType_WXApp";
        /**
         * 荣强app
         */
        PlatType[PlatType["PlatType_RongQiangApp"] = 153] = "PlatType_RongQiangApp";
    })(PlatType = Pmd.PlatType || (Pmd.PlatType = {}));
    /**
     * 玩家在线状态
     */
    var OnlineState;
    (function (OnlineState) {
        /**
         * 离线
         */
        OnlineState[OnlineState["OnlineState_Offline"] = 0] = "OnlineState_Offline";
        /**
         * 在线
         */
        OnlineState[OnlineState["OnlineState_Online"] = 1] = "OnlineState_Online";
        /**
         * 网络差
         */
        OnlineState[OnlineState["OnlineState_Slow"] = 2] = "OnlineState_Slow";
        /**
         * 离开,切后台
         */
        OnlineState[OnlineState["OnlineState_Leave"] = 3] = "OnlineState_Leave";
        /**
         * 电话中
         */
        OnlineState[OnlineState["OnlineState_Calling"] = 4] = "OnlineState_Calling";
    })(OnlineState = Pmd.OnlineState || (Pmd.OnlineState = {}));
    /**
     * 区服务器信息
     */
    var ZoneInfo = /** @class */ (function () {
        function ZoneInfo() {
        }
        ZoneInfo.prototype.GetType = function () { return 'Pmd.ZoneInfo'; };
        return ZoneInfo;
    }());
    Pmd.ZoneInfo = ZoneInfo;
    /**
     * 区服务器信息列表,选区列表
     */
    var ZoneInfoListLoginUserPmd_S = /** @class */ (function () {
        function ZoneInfoListLoginUserPmd_S() {
        }
        ZoneInfoListLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ZoneInfoListLoginUserPmd_S'; };
        return ZoneInfoListLoginUserPmd_S;
    }());
    Pmd.ZoneInfoListLoginUserPmd_S = ZoneInfoListLoginUserPmd_S;
    /**
     * 请求区服务器信息列表,选区列表
     */
    var RequestZoneInfoListLoginUserPmd_C = /** @class */ (function () {
        function RequestZoneInfoListLoginUserPmd_C() {
        }
        RequestZoneInfoListLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.RequestZoneInfoListLoginUserPmd_C'; };
        return RequestZoneInfoListLoginUserPmd_C;
    }());
    Pmd.RequestZoneInfoListLoginUserPmd_C = RequestZoneInfoListLoginUserPmd_C;
    /**
     * 请求玩有在所有区的角色信息，及区在线信息
     */
    var RequestUserZoneInfoLoginUserPmd_C = /** @class */ (function () {
        function RequestUserZoneInfoLoginUserPmd_C() {
        }
        RequestUserZoneInfoLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.RequestUserZoneInfoLoginUserPmd_C'; };
        return RequestUserZoneInfoLoginUserPmd_C;
    }());
    Pmd.RequestUserZoneInfoLoginUserPmd_C = RequestUserZoneInfoLoginUserPmd_C;
    var UserZoneInfo = /** @class */ (function () {
        function UserZoneInfo() {
        }
        UserZoneInfo.prototype.GetType = function () { return 'Pmd.UserZoneInfo'; };
        return UserZoneInfo;
    }());
    Pmd.UserZoneInfo = UserZoneInfo;
    var RequestUserZoneInfoLoginUserPmd_S = /** @class */ (function () {
        function RequestUserZoneInfoLoginUserPmd_S() {
        }
        RequestUserZoneInfoLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.RequestUserZoneInfoLoginUserPmd_S'; };
        return RequestUserZoneInfoLoginUserPmd_S;
    }());
    Pmd.RequestUserZoneInfoLoginUserPmd_S = RequestUserZoneInfoLoginUserPmd_S;
    /**
     * 客户端发到登录服务器
     */
    var MobileRegistRequestRandCodeLoginUserPmd_C = /** @class */ (function () {
        function MobileRegistRequestRandCodeLoginUserPmd_C() {
        }
        MobileRegistRequestRandCodeLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.MobileRegistRequestRandCodeLoginUserPmd_C'; };
        return MobileRegistRequestRandCodeLoginUserPmd_C;
    }());
    Pmd.MobileRegistRequestRandCodeLoginUserPmd_C = MobileRegistRequestRandCodeLoginUserPmd_C;
    var MobileRegistReturnRandCodeLoginUserPmd_S = /** @class */ (function () {
        function MobileRegistReturnRandCodeLoginUserPmd_S() {
        }
        MobileRegistReturnRandCodeLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.MobileRegistReturnRandCodeLoginUserPmd_S'; };
        return MobileRegistReturnRandCodeLoginUserPmd_S;
    }());
    Pmd.MobileRegistReturnRandCodeLoginUserPmd_S = MobileRegistReturnRandCodeLoginUserPmd_S;
    /**
     * 客户端发到登录服务器,如果创建成功,直接登录
     */
    var MobileRegistRequestCreateAccountLoginUserPmd_C = /** @class */ (function () {
        function MobileRegistRequestCreateAccountLoginUserPmd_C() {
        }
        MobileRegistRequestCreateAccountLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.MobileRegistRequestCreateAccountLoginUserPmd_C'; };
        return MobileRegistRequestCreateAccountLoginUserPmd_C;
    }());
    Pmd.MobileRegistRequestCreateAccountLoginUserPmd_C = MobileRegistRequestCreateAccountLoginUserPmd_C;
    /**
     * 手机注册失败返回, 当成功后，返回UserRequestPlatTokenLoginOkLoginUserPmd_S协议，客户端直接选区
     */
    var MobileRegistReturnCreateAccountFailLoginUserPmd_S = /** @class */ (function () {
        function MobileRegistReturnCreateAccountFailLoginUserPmd_S() {
        }
        MobileRegistReturnCreateAccountFailLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.MobileRegistReturnCreateAccountFailLoginUserPmd_S'; };
        return MobileRegistReturnCreateAccountFailLoginUserPmd_S;
    }());
    Pmd.MobileRegistReturnCreateAccountFailLoginUserPmd_S = MobileRegistReturnCreateAccountFailLoginUserPmd_S;
    /**
     * 请求邮箱注册//客户端发到登录服务器
     */
    var EmailRegistRequestCreateAccountLoginUserPmd_C = /** @class */ (function () {
        function EmailRegistRequestCreateAccountLoginUserPmd_C() {
        }
        EmailRegistRequestCreateAccountLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.EmailRegistRequestCreateAccountLoginUserPmd_C'; };
        return EmailRegistRequestCreateAccountLoginUserPmd_C;
    }());
    Pmd.EmailRegistRequestCreateAccountLoginUserPmd_C = EmailRegistRequestCreateAccountLoginUserPmd_C;
    /**
     * 当邮箱注册失败后，会返回，当成功后，返回UserRequestPlatTokenLoginOkLoginUserPmd_S协议，客户端直接选区 //客户端发到登录服务器
     */
    var EmailRegistReturnCreateAccountLoginUserPmd_S = /** @class */ (function () {
        function EmailRegistReturnCreateAccountLoginUserPmd_S() {
        }
        EmailRegistReturnCreateAccountLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.EmailRegistReturnCreateAccountLoginUserPmd_S'; };
        return EmailRegistReturnCreateAccountLoginUserPmd_S;
    }());
    Pmd.EmailRegistReturnCreateAccountLoginUserPmd_S = EmailRegistReturnCreateAccountLoginUserPmd_S;
    /**
     * 玩家使用密码登录验证请求
     */
    var UserRequestPlatTokenByPasswordLoginUserPmd_C = /** @class */ (function () {
        function UserRequestPlatTokenByPasswordLoginUserPmd_C() {
        }
        UserRequestPlatTokenByPasswordLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.UserRequestPlatTokenByPasswordLoginUserPmd_C'; };
        return UserRequestPlatTokenByPasswordLoginUserPmd_C;
    }());
    Pmd.UserRequestPlatTokenByPasswordLoginUserPmd_C = UserRequestPlatTokenByPasswordLoginUserPmd_C;
    /**
     * 玩家第三方验证登录请求
     */
    var UserRequestPlatTokenByThirdLoginUserPmd_C = /** @class */ (function () {
        function UserRequestPlatTokenByThirdLoginUserPmd_C() {
        }
        UserRequestPlatTokenByThirdLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.UserRequestPlatTokenByThirdLoginUserPmd_C'; };
        return UserRequestPlatTokenByThirdLoginUserPmd_C;
    }());
    Pmd.UserRequestPlatTokenByThirdLoginUserPmd_C = UserRequestPlatTokenByThirdLoginUserPmd_C;
    /**
     * 玩家请求登录成功返回
     */
    var UserRequestPlatTokenLoginOkLoginUserPmd_S = /** @class */ (function () {
        function UserRequestPlatTokenLoginOkLoginUserPmd_S() {
        }
        UserRequestPlatTokenLoginOkLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.UserRequestPlatTokenLoginOkLoginUserPmd_S'; };
        return UserRequestPlatTokenLoginOkLoginUserPmd_S;
    }());
    Pmd.UserRequestPlatTokenLoginOkLoginUserPmd_S = UserRequestPlatTokenLoginOkLoginUserPmd_S;
    /**
     * 玩家请求登录失败返回
     */
    var UserRequestPlatTokenLoginFailLoginUserPmd_S = /** @class */ (function () {
        function UserRequestPlatTokenLoginFailLoginUserPmd_S() {
        }
        UserRequestPlatTokenLoginFailLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.UserRequestPlatTokenLoginFailLoginUserPmd_S'; };
        return UserRequestPlatTokenLoginFailLoginUserPmd_S;
    }());
    Pmd.UserRequestPlatTokenLoginFailLoginUserPmd_S = UserRequestPlatTokenLoginFailLoginUserPmd_S;
    /**
     * 请求登录某个区,发给LoginServer
     */
    var UserLoginRequestLoginUserPmd_C = /** @class */ (function () {
        function UserLoginRequestLoginUserPmd_C() {
        }
        UserLoginRequestLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.UserLoginRequestLoginUserPmd_C'; };
        return UserLoginRequestLoginUserPmd_C;
    }());
    Pmd.UserLoginRequestLoginUserPmd_C = UserLoginRequestLoginUserPmd_C;
    /**
     * 登录某个区的错误返回,LoginServer返回
     */
    var UserLoginReturnFailLoginUserPmd_S = /** @class */ (function () {
        function UserLoginReturnFailLoginUserPmd_S() {
        }
        UserLoginReturnFailLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.UserLoginReturnFailLoginUserPmd_S'; };
        return UserLoginReturnFailLoginUserPmd_S;
    }());
    Pmd.UserLoginReturnFailLoginUserPmd_S = UserLoginReturnFailLoginUserPmd_S;
    /**
     * 登录某个区正确时的返回,LoginServer返回
     */
    var UserLoginReturnOkLoginUserPmd_S = /** @class */ (function () {
        function UserLoginReturnOkLoginUserPmd_S() {
        }
        UserLoginReturnOkLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.UserLoginReturnOkLoginUserPmd_S'; };
        return UserLoginReturnOkLoginUserPmd_S;
    }());
    Pmd.UserLoginReturnOkLoginUserPmd_S = UserLoginReturnOkLoginUserPmd_S;
    /**
     *  发给网关的登录消息,这个消息也可以指定是否尝试断线重连
     *  只有在游戏中断开时
     */
    var UserLoginTokenLoginUserPmd_C = /** @class */ (function () {
        function UserLoginTokenLoginUserPmd_C() {
        }
        UserLoginTokenLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.UserLoginTokenLoginUserPmd_C'; };
        return UserLoginTokenLoginUserPmd_C;
    }());
    Pmd.UserLoginTokenLoginUserPmd_C = UserLoginTokenLoginUserPmd_C;
    /**
     * 发给网关的断线重连消息
     */
    var UserLoginReconnectLoginUserPmd_C = /** @class */ (function () {
        function UserLoginReconnectLoginUserPmd_C() {
        }
        UserLoginReconnectLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.UserLoginReconnectLoginUserPmd_C'; };
        return UserLoginReconnectLoginUserPmd_C;
    }());
    Pmd.UserLoginReconnectLoginUserPmd_C = UserLoginReconnectLoginUserPmd_C;
    /**
     * 通知客户端发送日志的地址和日志级别
     */
    var ClientLogUrlLoginUserPmd_S = /** @class */ (function () {
        function ClientLogUrlLoginUserPmd_S() {
        }
        ClientLogUrlLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ClientLogUrlLoginUserPmd_S'; };
        return ClientLogUrlLoginUserPmd_S;
    }());
    Pmd.ClientLogUrlLoginUserPmd_S = ClientLogUrlLoginUserPmd_S;
    var MessageBoxLoginUserPmd_S = /** @class */ (function () {
        function MessageBoxLoginUserPmd_S() {
        }
        MessageBoxLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.MessageBoxLoginUserPmd_S'; };
        return MessageBoxLoginUserPmd_S;
    }());
    Pmd.MessageBoxLoginUserPmd_S = MessageBoxLoginUserPmd_S;
    /**
     * 请求注册帐号
     */
    var RequestAccountRegisterLoginUserPmd_C = /** @class */ (function () {
        function RequestAccountRegisterLoginUserPmd_C() {
        }
        RequestAccountRegisterLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.RequestAccountRegisterLoginUserPmd_C'; };
        return RequestAccountRegisterLoginUserPmd_C;
    }());
    Pmd.RequestAccountRegisterLoginUserPmd_C = RequestAccountRegisterLoginUserPmd_C;
    /**
     * 请求注册帐号
     */
    var ReturnAccountRegisterLoginUserPmd_S = /** @class */ (function () {
        function ReturnAccountRegisterLoginUserPmd_S() {
        }
        ReturnAccountRegisterLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ReturnAccountRegisterLoginUserPmd_S'; };
        return ReturnAccountRegisterLoginUserPmd_S;
    }());
    Pmd.ReturnAccountRegisterLoginUserPmd_S = ReturnAccountRegisterLoginUserPmd_S;
    /**
     * 发给网关的主动退出消息
     */
    var UserLogoutTokenLoginUserPmd_C = /** @class */ (function () {
        function UserLogoutTokenLoginUserPmd_C() {
        }
        UserLogoutTokenLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.UserLogoutTokenLoginUserPmd_C'; };
        return UserLogoutTokenLoginUserPmd_C;
    }());
    Pmd.UserLogoutTokenLoginUserPmd_C = UserLogoutTokenLoginUserPmd_C;
    /**
     * 如果是重连成功需要给老的客户度发送踢下线消息，否则会永远抢下去
     */
    var ReconnectKickoutLoginUserPmd_S = /** @class */ (function () {
        function ReconnectKickoutLoginUserPmd_S() {
        }
        ReconnectKickoutLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ReconnectKickoutLoginUserPmd_S'; };
        return ReconnectKickoutLoginUserPmd_S;
    }());
    Pmd.ReconnectKickoutLoginUserPmd_S = ReconnectKickoutLoginUserPmd_S;
    var ReconnectErrorLoginUserPmd_S = /** @class */ (function () {
        function ReconnectErrorLoginUserPmd_S() {
        }
        ReconnectErrorLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ReconnectErrorLoginUserPmd_S'; };
        return ReconnectErrorLoginUserPmd_S;
    }());
    Pmd.ReconnectErrorLoginUserPmd_S = ReconnectErrorLoginUserPmd_S;
    /**
     * 服务器主动踢玩家下线
     */
    var ServerKickoutLoginUserPmd_S = /** @class */ (function () {
        function ServerKickoutLoginUserPmd_S() {
        }
        ServerKickoutLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ServerKickoutLoginUserPmd_S'; };
        return ServerKickoutLoginUserPmd_S;
    }());
    Pmd.ServerKickoutLoginUserPmd_S = ServerKickoutLoginUserPmd_S;
    /**
     * 平台用户信息
     */
    var PlatInfo = /** @class */ (function () {
        function PlatInfo() {
        }
        PlatInfo.prototype.GetType = function () { return 'Pmd.PlatInfo'; };
        return PlatInfo;
    }());
    Pmd.PlatInfo = PlatInfo;
    /**
     * 第三方平台登录
     */
    var ThirdPlatLoginUserPmd_C = /** @class */ (function () {
        function ThirdPlatLoginUserPmd_C() {
        }
        ThirdPlatLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.ThirdPlatLoginUserPmd_C'; };
        return ThirdPlatLoginUserPmd_C;
    }());
    Pmd.ThirdPlatLoginUserPmd_C = ThirdPlatLoginUserPmd_C;
    /**
     * 客户端请求得到自己的IP
     */
    var RequestClientIPLoginUserPmd_C = /** @class */ (function () {
        function RequestClientIPLoginUserPmd_C() {
        }
        RequestClientIPLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.RequestClientIPLoginUserPmd_C'; };
        return RequestClientIPLoginUserPmd_C;
    }());
    Pmd.RequestClientIPLoginUserPmd_C = RequestClientIPLoginUserPmd_C;
    /**
     * 返回客户端IP
     */
    var ReturnClientIPLoginUserPmd_S = /** @class */ (function () {
        function ReturnClientIPLoginUserPmd_S() {
        }
        ReturnClientIPLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ReturnClientIPLoginUserPmd_S'; };
        return ReturnClientIPLoginUserPmd_S;
    }());
    Pmd.ReturnClientIPLoginUserPmd_S = ReturnClientIPLoginUserPmd_S;
    var CheckVersionLoginUserPmd_C = /** @class */ (function () {
        function CheckVersionLoginUserPmd_C() {
        }
        CheckVersionLoginUserPmd_C.prototype.GetType = function () { return 'Pmd.CheckVersionLoginUserPmd_C'; };
        return CheckVersionLoginUserPmd_C;
    }());
    Pmd.CheckVersionLoginUserPmd_C = CheckVersionLoginUserPmd_C;
    /**
     * 返回客户端配置config
     */
    var ClientConfigUpdateLoginUserPmd_S = /** @class */ (function () {
        function ClientConfigUpdateLoginUserPmd_S() {
        }
        ClientConfigUpdateLoginUserPmd_S.prototype.GetType = function () { return 'Pmd.ClientConfigUpdateLoginUserPmd_S'; };
        return ClientConfigUpdateLoginUserPmd_S;
    }());
    Pmd.ClientConfigUpdateLoginUserPmd_S = ClientConfigUpdateLoginUserPmd_S;
})(Pmd || (Pmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: nullcommand.proto
var Pmd;
(function (Pmd) {
    var JsonCompressKey = /** @class */ (function () {
        function JsonCompressKey() {
        }
        JsonCompressKey.prototype.GetType = function () { return 'Pmd.JsonCompressKey'; };
        return JsonCompressKey;
    }());
    Pmd.JsonCompressKey = JsonCompressKey;
    var TickRequestNullUserPmd_CS = /** @class */ (function () {
        function TickRequestNullUserPmd_CS() {
        }
        TickRequestNullUserPmd_CS.prototype.GetType = function () { return 'Pmd.TickRequestNullUserPmd_CS'; };
        return TickRequestNullUserPmd_CS;
    }());
    Pmd.TickRequestNullUserPmd_CS = TickRequestNullUserPmd_CS;
    var TickReturnNullUserPmd_CS = /** @class */ (function () {
        function TickReturnNullUserPmd_CS() {
        }
        TickReturnNullUserPmd_CS.prototype.GetType = function () { return 'Pmd.TickReturnNullUserPmd_CS'; };
        return TickReturnNullUserPmd_CS;
    }());
    Pmd.TickReturnNullUserPmd_CS = TickReturnNullUserPmd_CS;
    var SetPingTimeNullUserPmd_CS = /** @class */ (function () {
        function SetPingTimeNullUserPmd_CS() {
        }
        SetPingTimeNullUserPmd_CS.prototype.GetType = function () { return 'Pmd.SetPingTimeNullUserPmd_CS'; };
        return SetPingTimeNullUserPmd_CS;
    }());
    Pmd.SetPingTimeNullUserPmd_CS = SetPingTimeNullUserPmd_CS;
    /**
     * 设置心跳超时检测时间,每个游戏可能会不一样,这个时间也决定了ping值得刷新时间
     */
    var SetTickTimeoutNullUserPmd_CS = /** @class */ (function () {
        function SetTickTimeoutNullUserPmd_CS() {
        }
        SetTickTimeoutNullUserPmd_CS.prototype.GetType = function () { return 'Pmd.SetTickTimeoutNullUserPmd_CS'; };
        return SetTickTimeoutNullUserPmd_CS;
    }());
    Pmd.SetTickTimeoutNullUserPmd_CS = SetTickTimeoutNullUserPmd_CS;
    /**
     * json压缩约定消息
     */
    var JsonCompressNullUserPmd_CS = /** @class */ (function () {
        function JsonCompressNullUserPmd_CS() {
        }
        JsonCompressNullUserPmd_CS.prototype.GetType = function () { return 'Pmd.JsonCompressNullUserPmd_CS'; };
        return JsonCompressNullUserPmd_CS;
    }());
    Pmd.JsonCompressNullUserPmd_CS = JsonCompressNullUserPmd_CS;
})(Pmd || (Pmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: pmd.proto
var Pmd;
(function (Pmd) {
    /**
     * HTTP请求错误返回定义
     */
    var HttpReturnCode;
    (function (HttpReturnCode) {
        /**
         * 无错误
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_Null"] = 0] = "HttpReturnCode_Null";
        /**
         * 数据库出错
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_DbError"] = 2] = "HttpReturnCode_DbError";
        /**
         * lua脚本错误
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_LuaScriptError"] = 4] = "HttpReturnCode_LuaScriptError";
        /**
         * 找不到游戏区列表
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_GameZoneListError"] = 5] = "HttpReturnCode_GameZoneListError";
        /**
         * 签名检查错误，需要重新登录
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_SignError"] = 11] = "HttpReturnCode_SignError";
        /**
         * 服务器未开
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_ServerShutDown"] = 12] = "HttpReturnCode_ServerShutDown";
        /**
         * Json语法格式错误
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_JsonSyntaxError"] = 13] = "HttpReturnCode_JsonSyntaxError";
        /**
         * Json消息格式错误
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_JsonMessageError"] = 14] = "HttpReturnCode_JsonMessageError";
        /**
         * tokenvalue为空
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_TokenValueError"] = 15] = "HttpReturnCode_TokenValueError";
        /**
         * uid与登录uid不同
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_WaiGuaUidError"] = 16] = "HttpReturnCode_WaiGuaUidError";
        /**
         * [过期字段]
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_NoGatewaytDown"] = 17] = "HttpReturnCode_NoGatewaytDown";
        /**
         * 没有可用网关
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_NoGatewayDown"] = 17] = "HttpReturnCode_NoGatewayDown";
        /**
         * 没有可用Sdk服务器
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_NoSdkServer"] = 18] = "HttpReturnCode_NoSdkServer";
        /**
         * 签名错误
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_SdkCheckSignErr"] = 19] = "HttpReturnCode_SdkCheckSignErr";
        /**
         * 第三方服务器验证错误
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_Sdk3PartyServerErr"] = 20] = "HttpReturnCode_Sdk3PartyServerErr";
        /**
         * proto解析错误
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_ProtobufErr"] = 21] = "HttpReturnCode_ProtobufErr";
        /**
         * 网关错误
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_GatewayErr"] = 22] = "HttpReturnCode_GatewayErr";
        /**
         * 响应超时,目前设置为20秒
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_Timeout"] = 23] = "HttpReturnCode_Timeout";
        /**
         * 账号正在使用中
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_AccountUsing"] = 24] = "HttpReturnCode_AccountUsing";
        /**
         * 线上时，platid＝0被限制
         */
        HttpReturnCode[HttpReturnCode["HttpReturnCode_OnlinePlatidErr"] = 25] = "HttpReturnCode_OnlinePlatidErr";
    })(HttpReturnCode = Pmd.HttpReturnCode || (Pmd.HttpReturnCode = {}));
    /**
     * 游戏类型信息,以后可能会扩充
     */
    var GameZoneInfo = /** @class */ (function () {
        function GameZoneInfo() {
        }
        GameZoneInfo.prototype.GetType = function () { return 'Pmd.GameZoneInfo'; };
        return GameZoneInfo;
    }());
    Pmd.GameZoneInfo = GameZoneInfo;
})(Pmd || (Pmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: sdkcommand.proto
var Pmd;
(function (Pmd) {
    /**
     *  代理通知游戏服有玩家充值
     *  对于协议里面的部分字段，比如玩家ID，商品ID等字段需要看平台充值协议，可能平台只能提供一个订单ID参数。
     *  这时候就在平台上实现内部订单号生成，通过订单号来查找这些信息。
     *  平台回调sdk后通知游戏,AS2PSRechargeCommand
     */
    var NotifyRechargeRequestSdkPmd_S = /** @class */ (function () {
        function NotifyRechargeRequestSdkPmd_S() {
        }
        NotifyRechargeRequestSdkPmd_S.prototype.GetType = function () { return 'Pmd.NotifyRechargeRequestSdkPmd_S'; };
        return NotifyRechargeRequestSdkPmd_S;
    }());
    Pmd.NotifyRechargeRequestSdkPmd_S = NotifyRechargeRequestSdkPmd_S;
    /**
     * 平台回调sdk后通知游戏平台,PS2ASRechargeCommand
     */
    var NotifyRechargeReturnSdkPmd_C = /** @class */ (function () {
        function NotifyRechargeReturnSdkPmd_C() {
        }
        NotifyRechargeReturnSdkPmd_C.prototype.GetType = function () { return 'Pmd.NotifyRechargeReturnSdkPmd_C'; };
        return NotifyRechargeReturnSdkPmd_C;
    }());
    Pmd.NotifyRechargeReturnSdkPmd_C = NotifyRechargeReturnSdkPmd_C;
    /**
     * 玩家登录平台的基础信息
     */
    var PlatBaseData = /** @class */ (function () {
        function PlatBaseData() {
        }
        PlatBaseData.prototype.GetType = function () { return 'Pmd.PlatBaseData'; };
        return PlatBaseData;
    }());
    Pmd.PlatBaseData = PlatBaseData;
    /**
     * 创建订单号，有些需要于第三方沟通，有的不需要
     */
    var CreatePlatOrderRequestSdkPmd_C = /** @class */ (function () {
        function CreatePlatOrderRequestSdkPmd_C() {
        }
        CreatePlatOrderRequestSdkPmd_C.prototype.GetType = function () { return 'Pmd.CreatePlatOrderRequestSdkPmd_C'; };
        return CreatePlatOrderRequestSdkPmd_C;
    }());
    Pmd.CreatePlatOrderRequestSdkPmd_C = CreatePlatOrderRequestSdkPmd_C;
    /**
     * 创建订单号，有些需要于第三方沟通，有的不需要
     */
    var CreatePlatOrderReturnSdkPmd_S = /** @class */ (function () {
        function CreatePlatOrderReturnSdkPmd_S() {
        }
        CreatePlatOrderReturnSdkPmd_S.prototype.GetType = function () { return 'Pmd.CreatePlatOrderReturnSdkPmd_S'; };
        return CreatePlatOrderReturnSdkPmd_S;
    }());
    Pmd.CreatePlatOrderReturnSdkPmd_S = CreatePlatOrderReturnSdkPmd_S;
    /**
     * ISO用，玩家请求充值后通知sdk服务器去苹果服务器查询,PS2ASRechargeQueryCommand
     */
    var RechargeQueryRequestIOSSdkPmd_C = /** @class */ (function () {
        function RechargeQueryRequestIOSSdkPmd_C() {
        }
        RechargeQueryRequestIOSSdkPmd_C.prototype.GetType = function () { return 'Pmd.RechargeQueryRequestIOSSdkPmd_C'; };
        return RechargeQueryRequestIOSSdkPmd_C;
    }());
    Pmd.RechargeQueryRequestIOSSdkPmd_C = RechargeQueryRequestIOSSdkPmd_C;
})(Pmd || (Pmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: unilightclient.proto
var Pmd;
(function (Pmd) {
    var HttpPackage = /** @class */ (function () {
        function HttpPackage() {
        }
        HttpPackage.prototype.GetType = function () { return 'Pmd.HttpPackage'; };
        return HttpPackage;
    }());
    Pmd.HttpPackage = HttpPackage;
    var HttpPackageReturn = /** @class */ (function () {
        function HttpPackageReturn() {
        }
        HttpPackageReturn.prototype.GetType = function () { return 'Pmd.HttpPackageReturn'; };
        return HttpPackageReturn;
    }());
    Pmd.HttpPackageReturn = HttpPackageReturn;
    /**
     *  请求区列表【不需要签名】【无时序要求】
     *  返回的内容是ZoneInfoListLoginUserPmd_S的内容，但消息类型标注还是&quot;RequestZoneList&quot;
     *  本消息中的字段均拷贝自ZoneInfoListLoginUserPmd_S，用于接收下行数据，上行请求无须填写
     */
    var RequestZoneList = /** @class */ (function () {
        function RequestZoneList() {
        }
        RequestZoneList.prototype.GetType = function () { return 'Pmd.RequestZoneList'; };
        return RequestZoneList;
    }());
    Pmd.RequestZoneList = RequestZoneList;
    /**
     * 选区【必须签名】
     */
    var RequestSelectZone = /** @class */ (function () {
        function RequestSelectZone() {
        }
        RequestSelectZone.prototype.GetType = function () { return 'Pmd.RequestSelectZone'; };
        return RequestSelectZone;
    }());
    Pmd.RequestSelectZone = RequestSelectZone;
    var RequestSelectZoneReturn = /** @class */ (function () {
        function RequestSelectZoneReturn() {
        }
        RequestSelectZoneReturn.prototype.GetType = function () { return 'Pmd.RequestSelectZoneReturn'; };
        return RequestSelectZoneReturn;
    }());
    Pmd.RequestSelectZoneReturn = RequestSelectZoneReturn;
    /**
     * 平台登录【不需要签名】
     */
    var PlatTokenLogin = /** @class */ (function () {
        function PlatTokenLogin() {
        }
        PlatTokenLogin.prototype.GetType = function () { return 'Pmd.PlatTokenLogin'; };
        return PlatTokenLogin;
    }());
    Pmd.PlatTokenLogin = PlatTokenLogin;
    var PlatTokenLoginReturn = /** @class */ (function () {
        function PlatTokenLoginReturn() {
        }
        PlatTokenLoginReturn.prototype.GetType = function () { return 'Pmd.PlatTokenLoginReturn'; };
        return PlatTokenLoginReturn;
    }());
    Pmd.PlatTokenLoginReturn = PlatTokenLoginReturn;
})(Pmd || (Pmd = {}));

var uniLib;
(function (uniLib) {
    /**
     * 反射
     */
    var Reflect = /** @class */ (function () {
        function Reflect(obj) {
            this.parse(obj);
        }
        Reflect.prototype.parse = function (obj) {
            for (var str in obj) {
                // if (obj.hasOwnProperty(str)) {
                this[str] = obj[str];
                // }
            }
        };
        return Reflect;
    }());
    uniLib.Reflect = Reflect;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var initOptions = /** @class */ (function () {
        function initOptions() {
            /**
             * 压缩方式
             */
            this.compressType = 0;
            /**
             * 日志级别
             */
            this.logLevel = 7;
            /**
             * 大厅模式
             */
            this.lobbyMode = false;
            this.scaleMode = "fixedWidth";
        }
        return initOptions;
    }());
    uniLib.initOptions = initOptions;
    /**
    * 初始化库
    * @method uniLib.init
    * @param debugMode {boolen} 是否开启调试模式
    * @param payMode {boolen} 是否支付模块
    * @param payMode {boolen} 是否支付模块
    */
    function init(param, callBack, thisObj, scaleMode, lobbyMode) {
        if (scaleMode === void 0) { scaleMode = "fixedWidth"; }
        if (lobbyMode === void 0) { lobbyMode = false; }
        if (param instanceof Object || typeof (callBack) == "function") {
            uniLib.Console.init(param.debug, param.logLevel);
            Global.initOpt = param;
            if (param.designWidth) {
                Global.designWidth = param.designWidth;
            }
            if (param.designHeight) {
                Global.designHeight = param.designHeight;
            }
            if (param.reloadDefine) {
                Global.reloadDefine = param.reloadDefine;
            }
            if (uniLib["ScreenUtils"])
                uniLib["ScreenUtils"].init(param.scaleMode);
            uniLib.PayMgr.Instance.isOpen = param.openPay;
            if (param.shareData) {
                Global.shareData = param.shareData;
            }
            Global.lobbyMode = param.lobbyMode;
            if (param.nativeStorage) {
                Global.nativeStorage = param.nativeStorage;
            }
            if (param.msgTimeOutSec) {
                Global.msgTimeOutSec = param.msgTimeOutSec;
            }
            if (param.reLoginUrl) {
                Global.reLoginUrl = param.reLoginUrl;
            }
            if (param.CdnDomains) {
                Global.CdnDomains = param.CdnDomains;
                for (var i = 0; i < Global.CdnDomains.length; i++) {
                    Global.CdnDomains[i] = uniLib.StringUtils.validNetUrl(Global.CdnDomains[i]);
                }
            }
            if (param.platId) {
                Global.platId = param.platId;
            }
            if (param.gameRemotePaths) {
                uniLib.GameModuleUtils.gameLoadRemote = true;
                uniLib.GameModuleUtils.gameRemotePaths = param.gameRemotePaths;
            }
            if (param.appId) {
                Global.appId = param.appId;
                if (uniLib.Global.isH5 == true) {
                    Global.reLoginUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Global.appId + "&redirect_uri=http%3a%2f%2fwx.zqgame.com%2faddons%2fzqgame%2fgamelogin.php&response_type=code&scope=snsapi_userinfo&state=" + Global.appId + "#wechat_redirect";
                }
            }
            else {
                if (uniLib.Global.isH5 == true) {
                    var appid = uniLib.BrowersUtils.GetRequest("appid");
                    if (!uniLib.StringUtils.stringIsNullOrEmpty(appid)) {
                        Global.appId = uniLib.BrowersUtils.GetRequest("appid");
                    }
                    Global.reLoginUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Global.appId + "&redirect_uri=http%3a%2f%2fwx.zqgame.com%2faddons%2fzqgame%2fgamelogin.php&response_type=code&scope=snsapi_userinfo&state=" + Global.appId + "#wechat_redirect";
                }
            }
            if (param.compressType) {
                uniLib.CompressUtil.init(param.compressType, callBack, thisObj);
            }
            else {
                if (callBack)
                    callBack.call(thisObj);
            }
        }
        else {
            uniLib.Console.init(param);
            //Global.initPlatInfo();
            if (uniLib["ScreenUtils"])
                uniLib["ScreenUtils"].init(scaleMode);
            uniLib.PayMgr.Instance.isOpen = callBack;
            if (thisObj) {
                Global.shareData = thisObj;
            }
            Global.lobbyMode = lobbyMode;
        }
        if (uniLib["ResUtils"]) {
            uniLib["ResUtils"].init();
        }
        // Set URL of your WebSocketMain.swf here:
        //window["WEB_SOCKET_SWF_LOCATION"] = "WebSocketMain.swf";
        //window["WEB_SOCKET_DEBUG"] = true;
        if (uniLib["ZQGameSdk"]) {
            uniLib["ZQGameSdk"].getCallStatus(Global.PhoneCallStatus, Global);
            uniLib["ZQGameSdk"].hideVk();
        }
    }
    uniLib.init = init;
    //export function initLoginInfo(token:string):void{
    //    Global.token = token;
    //}
    //export function initPlatInfo(platinfo?: Pmd.PlatInfo): void {
    //    if (platinfo) {
    //        Global.platInfo = platinfo;
    //    } else {
    //        var platstr: string = Utils.getLocalStorage("platStr");
    //        if (!StringUtils.stringIsNullOrEmpty(platstr)) {
    //            this.platInfo = BrowersUtils.GetRequests(platstr);
    //            if (this.platInfo["debug"] != null) {
    //                delete this.platInfo["debug"];
    //            }
    //        } else {
    //            this.platInfo = new Pmd.PlatInfo();
    //            this.platInfo.account = BrowersUtils.GetRequest("account");
    //            this.platInfo.email = BrowersUtils.GetRequest("email");
    //            this.platInfo.platid = BrowersUtils.GetRequest("platid");
    //            this.platInfo.gender = BrowersUtils.GetRequest("gender");
    //            this.platInfo.nickname = BrowersUtils.GetRequest("nickname");
    //            this.platInfo.timestamp = BrowersUtils.GetRequest("timestamp");
    //            if (BrowersUtils.GetRequest("gameid"))
    //                this.platInfo["gameid"] = BrowersUtils.GetRequest("gameid");
    //            if (BrowersUtils.GetRequest("uid"))
    //                this.platInfo["uid"] = BrowersUtils.GetRequest("uid");
    //            this.platInfo.sign = BrowersUtils.GetRequest("sign");
    //        }
    //    }
    //}
    function cloneObj(obj) {
        var newobj, str;
        if (typeof obj !== 'object') {
            return;
        }
        else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }
    uniLib.cloneObj = cloneObj;
    var Global = /** @class */ (function () {
        function Global() {
        }
        Global.PhoneCallStatus = function (msg) {
            if (msg.data.callState == "callDisconnected") {
                if (egret.Capabilities.supportVersion < "3.2.6") {
                    setTimeout(function () {
                        if (uniLib["ZQGameSdk"]) {
                            uniLib["ZQGameSdk"].speakerActive();
                        }
                    }, 4000);
                }
            }
        };
        //新建事件
        Global.Event = function (type, obj, bubbles, cancelable) {
            if (obj === void 0) { obj = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            return new uniLib.ZqEvent(type, obj);
        };
        //派发事件
        Global.dispatchEvent = function (type, obj, bubbles, cancelable) {
            if (obj === void 0) { obj = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var event = new uniLib.ZqEvent(type, obj, bubbles, cancelable);
            uniLib.ZqListener.getInstance().dispatchEvent(event);
        };
        Global.hasEventListener = function (type) {
            return uniLib.ZqListener.getInstance().hasEventListener(type);
        };
        //监听事件
        Global.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            uniLib.ZqListener.getInstance().addEventListener(type, listener, thisObject, useCapture, priority);
        };
        //移除监听事件
        Global.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            uniLib.ZqListener.getInstance().removeEventListener(type, listener, thisObject, useCapture);
        };
        //JSON字典压缩
        Global.Compress = function (msg) {
            if (!Global.jsonCompress) {
                for (var i = 0; i < Global.jsonCompress.msglist.length; i++) {
                    if (Global.jsonCompress.msglist[i] == msg["do"]) {
                        msg["do"] = i + 1;
                    }
                }
                return msg;
            }
            return msg;
        };
        //JSON字典解压
        Global.DeCompress = function (msg) {
            for (var i = 0; i < Global.jsonCompress.msglist.length; i++) {
                if (i + 1 == msg["do"]) {
                    msg["do"] = Global.jsonCompress.msglist[i];
                    break;
                }
            }
            return msg;
        };
        Global.DeCompressDefult = function (msg) {
            for (var i = 0; i < Global.jsonCompressDefault.msglist.length; i++) {
                if (i + 1 == msg["do"]) {
                    msg["do"] = Global.jsonCompressDefault.msglist[i];
                    break;
                }
            }
            return msg;
        };
        Object.defineProperty(Global, "lobbyMode", {
            /**
            * 是否大厅模式
            */
            get: function () {
                //if (uniLib["GameModuleUtils"])
                //    return uniLib["GameModuleUtils"].isLobbyMode();
                return this._lobbyMode;
            },
            set: function (b) {
                this._lobbyMode = b;
            },
            enumerable: true,
            configurable: true
        });
        Global.getZoneInfo = function (gameId) {
            if (this.zoneList == null)
                return;
            var len = this.zoneList.length;
            for (var i = 0; i < len; i++) {
                if (this.zoneList[i].gameid == gameId)
                    return this.zoneList[i];
            }
            uniLib.Console.error("找不到游戏区信息 gameId:" + gameId);
            return null;
        };
        /**
         * 是否测试服
         */
        Global.isTestServer = function () {
            if (uniLib.Global.gameConfig && uniLib.Global.gameConfig.login_url) {
                if (uniLib.Global.gameConfig.login_url.indexOf("14.17.104") >= 0 || uniLib.Global.gameConfig.login_url.indexOf("server.login.bwgame") >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        };
        Object.defineProperty(Global, "resVersion", {
            /**
            * 资源版本
            */
            get: function () {
                var vs = "";
                if (uniLib.Global.isH5) {
                    var elm = document.querySelector('meta[name="res-version"]');
                    if (elm != null)
                        vs = elm.getAttribute('content');
                    if (vs != null && vs != "") {
                        vs = "_" + vs;
                    }
                }
                return vs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global, "thmVersion", {
            /**
            * 皮肤版本
            */
            get: function () {
                var vs = "";
                if (uniLib.Global.isH5) {
                    var elm = document.querySelector('meta[name="thm-version"]');
                    if (elm != null)
                        vs = elm.getAttribute('content');
                    if (vs != null && vs != "") {
                        vs = "_" + vs;
                    }
                }
                return vs;
            },
            enumerable: true,
            configurable: true
        });
        Global.initPlatInfo = function (platinfo, callBack, thisObj) {
            if (Global.platInfo == null) {
                Global.platInfo = new Pmd.PlatInfo();
                if (platinfo && platinfo != null) {
                    Global.platInfo = platinfo;
                }
                else {
                    if (Global.isH5) {
                        uniLib.Utils.getLocalStorage("platStr", function (data) {
                            var platstr = data;
                            var values;
                            if (!uniLib.StringUtils.stringIsNullOrEmpty(platstr)) {
                                values = uniLib.BrowersUtils.GetRequests(platstr);
                            }
                            else {
                                values = uniLib.BrowersUtils.GetRequests();
                            }
                            for (var str in values) {
                                if (str != "debug") {
                                    if (str == "extData") {
                                        Global.platInfo[str] = decodeURIComponent(values[str]);
                                    }
                                    else {
                                        Global.platInfo[str] = values[str];
                                    }
                                }
                                if (str == "code") {
                                    Global.platInfo.sign = values[str];
                                }
                                if (str == "appid") {
                                    Global.platInfo.platappid = values[str];
                                }
                            }
                            var pid = Number(Global.platInfo.platid);
                            if (!pid || pid == 0) {
                                if (Global.platInfo.platappid && !uniLib.StringUtils.stringIsNullOrEmpty(Global.platInfo.platappid)) {
                                    Global.platInfo.platid = 68;
                                }
                                else {
                                    Global.platInfo.platid = pid;
                                }
                            }
                            else {
                                Global.platInfo.platid = pid;
                            }
                        });
                    }
                }
            }
            //if (callBack) {
            if (uniLib.Global.isH5) {
                if (Global.defaultConfig) {
                    uniLib.PayMgr.Instance.initPayPlatById(Number(Global.defaultConfig.pay_platid), callBack, thisObj);
                }
            }
            else {
                if (callBack != null) {
                    if (thisObj)
                        callBack.call(thisObj, Global.platInfo.platid);
                    else
                        callBack(Global.platInfo.platid);
                }
            }
            // console.error("initPlatInfo:" + JSON.stringify(Global.platInfo));
            //}
            return Global.platInfo;
        };
        /**
         * 判断是否微信小游戏
         */
        Global.isWxGame = function () {
            if (egret.hasDefinition("wx") && wx["env"] && wx["env"]["USER_DATA_PATH"]) {
                var envStr = wx["env"]["USER_DATA_PATH"];
                if (envStr) {
                    if (envStr.indexOf("wxfile://") >= 0 || envStr.indexOf("http://") >= 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        Global.setPlatInfo = function (str, platId, gameId) {
            uniLib.Utils.setLocalStorage(gameId + "|" + platId + "|platToken", str);
        };
        Global.setPlatToken = function (str, platId, gameId) {
            Global.platId = platId;
            Global.gameId = gameId;
            if (str && str.platinfo) {
                if (str.platinfo.account) {
                    uniLib.NetMgr.PlatUID = str.platinfo.account;
                }
                else {
                    uniLib.NetMgr.PlatUID = str.platinfo.uid;
                }
            }
            else {
                uniLib.NetMgr.PlatUID = uniLib.NetMgr.UID + "";
            }
            console.log("cache_platinfo:" + JSON.stringify(str));
            uniLib.Utils.setLocalStorage(gameId + "|" + platId + "|platToken", encodeURIComponent(JSON.stringify(str)));
        };
        Global.getPlatToken = function (onGetCached, thisObj) {
            var obj = uniLib.Utils.getLocalStorage(Global.gameId + "|" + Global.getPlatId() + "|platToken", function (data) {
                var info;
                console.log("get_platinfo:" + data);
                if (data && Global.isCacheToken == true) {
                    try {
                        data = decodeURIComponent(data);
                    }
                    catch (e) {
                        console.error("decode_error");
                    }
                    info = JSON.parse(data);
                    uniLib.NetMgr.UID = Number(info.uid);
                    if (info.platinfo) {
                        if (info.platinfo.account) {
                            uniLib.NetMgr.PlatUID = info.platinfo.account;
                        }
                        else {
                            uniLib.NetMgr.PlatUID = info.platinfo.uid;
                        }
                    }
                    else {
                        uniLib.NetMgr.PlatUID = info.uid;
                    }
                    uniLib.BrowersUtils.extData.inviter = uniLib.NetMgr.UID.toString();
                    uniLib.NetMgr.SID = info.sid;
                    uniLib.NetMgr.PlatToken = info.unigame_plat_login;
                    uniLib.NetMgr.PlatKey = info.unigame_plat_key;
                    uniLib.NetMgr.platTokenTimeOut = info.unigame_plat_login_life;
                    if (info.platinfo != null && Global.platInfo != null) {
                        Global.platInfo.platid = info.platinfo.platid;
                        if (info.platinfo) {
                            if (info.platinfo.account) {
                                uniLib.NetMgr.PlatUID = info.platinfo.account;
                            }
                            else {
                                uniLib.NetMgr.PlatUID = info.platinfo.uid;
                            }
                        }
                        uniLib.NetMgr.PlatSession = info.platinfo.sign;
                    }
                    if (info.GatewayUrl) {
                        if (uniLib.NetMgr.http)
                            uniLib.NetMgr.http.GatewayUrl = info.GatewayUrl;
                    }
                }
                if (onGetCached)
                    onGetCached.call(thisObj, info);
            });
            return obj;
        };
        /**
         * 打开代理系统地址
         * @param agentUrl
         * @param code
         * @param uid
         */
        Global.openAgent = function (agentUrl, code, platid, gameid, model) {
            var url = agentUrl + "?code=" + code + "&platid=" + platid + "&gameid=" + gameid; // + "&zoneid=" + this.zoneId;
            if (uniLib["ZQGameSdk"]) {
                uniLib["ZQGameSdk"].openWeb(url, model);
            }
        };
        Global.getPlatId = function () {
            var platid = 0;
            if (this.platId != 0) {
                return this.platId;
            }
            else {
                if (Global.isH5) {
                    if (Global.platInfo == null) {
                        uniLib.Utils.getLocalStorage("platStr", function (data) {
                            var platstr = data;
                            if (!uniLib.StringUtils.stringIsNullOrEmpty(platstr)) {
                                platid = Number(uniLib.BrowersUtils.GetRequest("platid", platstr));
                            }
                            else if (uniLib.BrowersUtils.GetRequest("platid")) {
                                platid = parseInt(uniLib.BrowersUtils.GetRequest("platid"));
                            }
                            else
                                platid = Pmd.PlatType.PlatType_Normal;
                        });
                    }
                    else if (Global.platInfo.platid) {
                        platid = Global.platInfo.platid;
                    }
                }
                else {
                    if (Global.platInfo)
                        platid = Global.platInfo.platid;
                    else
                        platid = Pmd.PlatType.PlatType_Normal;
                }
            }
            return platid;
        };
        Global.isActive = true;
        Global.debugLevel = 0;
        Global.version = 161128235600;
        Global.compressType = 0;
        Global.compressMin = 0;
        Global.msgTimeOutSec = 0;
        /**
         * 素材宽度
         */
        Global.designWidth = 1280;
        /**
         * 素材高度
         */
        Global.designHeight = 720;
        Global.isRestarting = false;
        Global.PLAT_TOKEN_KEY = "plat_token_key";
        /**
         * 当前游戏接入平台id
         */
        //public static platId: number;
        Global.gameId = 0;
        Global.lobbyGameId = 0;
        Global.is_sandbox = 0;
        //public static socketLoginSuc: Function;
        //public static socketLoginFail: Function;
        //public static socketLoginObj: Function;
        //public static wechatAppId: string = "wx0e52b1eba8f9fb14";
        Global.appId = "wx0e52b1eba8f9fb14";
        Global.thirdPlatDir = "thirdPlatDir/";
        //全局字体颜色表--可以扩展
        Global.TextColors = {
            white: 0xFFFFFF,
            milkWhite: 0xfbf1af,
            grayWhite: 0xceb6a2,
            yellow: 0xffff00,
            lightYellow: 0xffd375,
            orangeYellow: 0xff9900,
            red: 0xf11300,
            green: 0x00e500,
            blue: 0x1a94d7,
            grayBlue: 0x2f5177,
            purple: 0xe938f2,
            pink: 0xFF3030,
            black: 0x2e2d2d,
            golden: 0xFFD700 //金色
        };
        Global._lobbyMode = false;
        Global.isInGame = false;
        Global.reLoginUrl = "";
        // public static CdnDomains: string[] = [];
        Global.CdnDomains = ["http://h5.publish.gamelaoyou.com/", "http://h5.publish.bwgame.com.cn/"];
        //public static platId: number=0;
        Global.payPlatId = 0;
        /**
        * 苹果bundleId
        */
        Global.bundleId = "";
        Global.zipmd5 = "";
        Global.configmd5 = "";
        /**
        * 是否缓存token
        */
        Global.isCacheToken = true;
        /**
        * 日志地址
        */
        Global.logUrl = "http://server.login.bwgame.com.cn:8020/logger/clientlog";
        /**
         * 获取IP地址服务器
         */
        Global.ipUrl = "http://123.207.17.91:5999/http/remoteip/json";
        /**
        * GM等级
        */
        Global.gmlevel = 0;
        Global.token = "";
        Global.platId = 0;
        Global.zoneId = 0;
        return Global;
    }());
    uniLib.Global = Global;
})(uniLib || (uniLib = {}));
if (typeof global == 'undefined') {
    var global = window;
}
if (typeof __global == 'undefined') {
    var __global = global;
}
var testh5 = function () {
    var b;
    // if (this["navigator"]) {
    //     b = true;
    // } else {
    //     b = false;
    // }
    if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
        b = false;
    }
    else {
        b = true;
    }
    // try {
    //     if (global) {
    //         b = false;
    //     }
    // } catch (e) {
    // }
    return b;
};
uniLib.Global.isH5 = testh5();
//delete testh5;

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var BitmapBlink = /** @class */ (function (_super) {
        __extends(BitmapBlink, _super);
        /*** @param target 目标位图
        * @param time 闪啊闪的时间
        * @isAuto 是否立即执行，默认是ture，也可以设置false，外部调用start方法
        */
        function BitmapBlink(target, time, isAuto) {
            if (isAuto === void 0) { isAuto = true; }
            var _this = _super.call(this) || this;
            _this._target = target;
            _this._time = time;
            if (isAuto) {
                _this.start();
            }
            return _this;
        }
        BitmapBlink.prototype.start = function () {
            this._currTime = egret.getTimer();
            this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        };
        BitmapBlink.prototype.runDown = function (e) {
            this._target.alpha -= 0.045;
            if (this.checkOver()) {
                return;
            }
            if (this._target.alpha <= 0.6) {
                this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
                this._target.addEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
            }
        };
        BitmapBlink.prototype.runUp = function (e) {
            this._target.alpha += 0.045;
            if (this.checkOver()) {
                return;
            }
            if (this._target.alpha >= 1) {
                this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
                this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
            }
        };
        BitmapBlink.prototype.checkOver = function () {
            var nowTime = egret.getTimer();
            if (nowTime - this._currTime >= this._time) {
                this.destroy();
                return true;
            }
            return false;
        };
        BitmapBlink.prototype.destroy = function () {
            this._target.alpha = 1;
            this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
            this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
            this.dispatchEventWith(egret.Event.COMPLETE, false, this._target);
            this._target = null;
        };
        return BitmapBlink;
    }(egret.EventDispatcher));
    uniLib.BitmapBlink = BitmapBlink;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    /**
    * 图片button类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved.
    * 可以有图片，文字，动画
    * todo:九宫格、多动画、图字等
    */
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        /**
        * imgName       图片
        * backFun       点击方法 如果需要在backFun中使用this的，小心使用这个
        * descStr       按钮描述
        * fontSize      字体大小
        * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
        * 注意：如果有动画的话，只有动画结束才会触发click事件
        */
        function Button(context, imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
            if (backFun === void 0) { backFun = null; }
            if (descStr === void 0) { descStr = ""; }
            if (fontSize === void 0) { fontSize = 30; }
            if (cartoonType === void 0) { cartoonType = 1; }
            if (assetsName === void 0) { assetsName = "assets"; }
            var _this = _super.call(this) || this;
            _this.assets = RES.getRes("assets"); //名称不一样的话需要修改
            _this.isPlayCartoon = false;
            _this.cartoonType = 1;
            _this.param = { context: null, data: null }; //回调参数
            _this.param.context = context;
            _this.init(imgName, backFun, descStr, fontSize, cartoonType, assetsName);
            return _this;
        }
        Button.prototype.init = function (imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
            if (backFun === void 0) { backFun = null; }
            if (descStr === void 0) { descStr = ""; }
            if (fontSize === void 0) { fontSize = 30; }
            if (cartoonType === void 0) { cartoonType = 1; }
            if (assetsName === void 0) { assetsName = "assets"; }
            this.cartoonType = cartoonType;
            this.backFun = backFun;
            this.btnImg = new egret.Bitmap();
            if (assetsName != "assets") {
                this.assets = RES.getRes(assetsName);
            }
            this.btnImg.texture = this.assets.getTexture(imgName);
            this.addChild(this.btnImg);
            if (descStr != "") {
                this.textField = new egret.TextField();
                this.addChild(this.textField);
                this.textField.size = fontSize;
                this.textField.textAlign = "center";
                this.textField.stroke = 1;
                this.textField.strokeColor = 0x000000;
                this.textField.text = descStr;
                this.textField.width = this.btnImg.width;
                this.textField.x = this.btnImg.width / 2 - this.textField.width / 2;
                this.textField.y = this.btnImg.height / 2 - this.textField.height / 2;
            }
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        };
        Button.prototype.onbuttonTouchTap = function (e) {
            if (this.isPlayCartoon) {
                return;
            }
            this.isPlayCartoon = true;
            var onComplete2 = function () {
                this.isPlayCartoon = false;
            };
            var onComplete1 = function () {
                if (this.cartoonType == 1) {
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
                }
                else if (this.cartoonType == 2) {
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
                }
                else if (this.cartoonType == 3) {
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 100).call(onComplete2, this);
                }
            };
            egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
            egret.setTimeout(function () {
                if (this.backFun != null) {
                    this.backFun.apply(this.param.context, [this.param.data]);
                }
            }, this, 300);
        };
        //设置绑定数据
        Button.prototype.setBindData = function (data) {
            this.param.data = data;
        };
        //获取绑定数据
        Button.prototype.getBindData = function () {
            return this.param.data;
        };
        Button.prototype.getBitmap = function () {
            return this.btnImg;
        };
        return Button;
    }(egret.DisplayObjectContainer));
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    /**
    * 图片button类
    */
    var CommonButton = /** @class */ (function (_super) {
        __extends(CommonButton, _super);
        function CommonButton(nomalRes, selectedRes, disableRes, w, h, txt, fontSize, color, s9_n, s9_u, s9_d) {
            if (fontSize === void 0) { fontSize = 30; }
            if (color === void 0) { color = 0x000000; }
            if (s9_n === void 0) { s9_n = null; }
            if (s9_u === void 0) { s9_u = null; }
            if (s9_d === void 0) { s9_d = null; }
            var _this = _super.call(this) || this;
            _this.isSelected = false;
            _this.liveSelected = false;
            _this.touchEnabled = true;
            _this.touchChildren = false;
            _this.init(nomalRes, selectedRes, disableRes, w, h, txt, fontSize, color, s9_n, s9_u, s9_d);
            return _this;
        }
        CommonButton.prototype.init = function (nomalRes, selectedRes, disableRes, w, h, txt, fontSize, color, s9_n, s9_u, s9_d) {
            if (fontSize === void 0) { fontSize = 30; }
            if (color === void 0) { color = 0x000000; }
            if (s9_n === void 0) { s9_n = null; }
            if (s9_u === void 0) { s9_u = null; }
            if (s9_d === void 0) { s9_d = null; }
            if (typeof (nomalRes) == "string") {
                this._nomal_bg = uniLib.DisplayUtils.createBitmapByName(nomalRes);
            }
            else {
                this._nomal_bg = nomalRes;
            }
            if (s9_n)
                this._nomal_bg.scale9Grid = s9_n;
            if (w)
                this._nomal_bg.width = w;
            if (h)
                this._nomal_bg.height = h;
            this.addChild(this._nomal_bg);
            if (selectedRes) {
                this._selected_bg = uniLib.DisplayUtils.createBitmapByName(selectedRes);
                if (s9_u)
                    this._selected_bg.scale9Grid = s9_u;
                if (w)
                    this._selected_bg.width = w;
                if (h)
                    this._selected_bg.height = h;
                this.addChild(this._selected_bg);
                this._selected_bg.visible = false;
            }
            if (disableRes) {
                this._disable_bg = uniLib.DisplayUtils.createBitmapByName(disableRes);
                if (s9_d)
                    this._disable_bg.scale9Grid = s9_d;
                if (w)
                    this._disable_bg.width = w;
                if (h)
                    this._disable_bg.height = h;
                this.addChild(this._disable_bg);
                this._disable_bg.visible = false;
            }
            if (txt) {
                this._lableNomalColor = color;
                this._lable = uniLib.DisplayUtils.createTextLabel(color, "center", txt, fontSize);
                this._lable.x = (this.width - this._lable.width) >> 1;
                this._lable.y = (this.height - this._lable.height) >> 1;
                this.addChild(this._lable);
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onbuttonBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onbuttonEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onbuttonEnd, this);
        };
        Object.defineProperty(CommonButton.prototype, "fontFamily", {
            set: function (family) {
                this._lable.fontFamily = family;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonButton.prototype, "fontSelectedColor", {
            set: function (color) {
                this._lableSelectedColor = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonButton.prototype, "select", {
            get: function () {
                return this.isSelected;
            },
            set: function (b) {
                if (b == true) {
                    this.selected();
                }
                else {
                    this.unselected();
                }
            },
            enumerable: true,
            configurable: true
        });
        CommonButton.prototype.selected = function () {
            this.isSelected = true;
            //this.liveSelected = true;
            if (this._selected_bg) {
                this._selected_bg.visible = true;
                this._nomal_bg.visible = false;
            }
            if (this._lableSelectedColor) {
                this._lable.textColor = this._lableSelectedColor;
            }
        };
        Object.defineProperty(CommonButton.prototype, "text", {
            set: function (txt) {
                if (this._lable == null) {
                    this._lableNomalColor = 0x000000;
                    this._lable = uniLib.DisplayUtils.createTextLabel(this._lableNomalColor, "center", txt, 30);
                    this._lable.x = (this.width - this._lable.width) >> 1;
                    this._lable.y = (this.height - this._lable.height) >> 1;
                    this.addChild(this._lable);
                }
                this._lable.text = txt;
            },
            enumerable: true,
            configurable: true
        });
        CommonButton.prototype.unselected = function () {
            this.isSelected = false;
            this.liveSelected = false;
            if (this._selected_bg) {
                this._selected_bg.visible = false;
                this._nomal_bg.visible = true;
            }
            if (this._lableSelectedColor) {
                this._lable.textColor = this._lableNomalColor;
            }
        };
        CommonButton.prototype.onbuttonBegin = function (e) {
            if (this.isSelected == false)
                this.selected();
        };
        CommonButton.prototype.onbuttonEnd = function (e) {
            if (this.liveSelected == false)
                this.unselected();
        };
        Object.defineProperty(CommonButton.prototype, "disable", {
            get: function () {
                return this._disable;
            },
            set: function (b) {
                this._disable = b;
                if (this._disable_bg) {
                    this._disable_bg.visible = b;
                    if (this._disable == true) {
                        this.touchEnabled = false;
                        this._nomal_bg.visible = false;
                        this._selected_bg.visible = false;
                    }
                    else {
                        this.touchEnabled = true;
                        this._nomal_bg.visible = true;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * icon下方添加文字
         */
        CommonButton.prototype.setBottomLabel = function (txt, color, size, x, width, gap) {
            var tf = new egret.TextField();
            if (width != -1) {
                tf.width = width;
            }
            tf.fontFamily = "微软雅黑";
            tf.textColor = color;
            tf.textAlign = egret.HorizontalAlign.CENTER;
            tf.text = txt;
            tf.size = size;
            tf.x = x;
            tf.y = this._nomal_bg.y + this._nomal_bg.height + gap;
            this.addChild(tf);
        };
        Object.defineProperty(CommonButton.prototype, "toggle", {
            set: function (b) {
                if (b) {
                    this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onbuttonBegin, this);
                    this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onbuttonEnd, this);
                    this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onbuttonEnd, this);
                }
                else {
                    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onbuttonBegin, this);
                    this.addEventListener(egret.TouchEvent.TOUCH_END, this.onbuttonEnd, this);
                    this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onbuttonEnd, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        CommonButton.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onbuttonBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onbuttonEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onbuttonEnd, this);
        };
        return CommonButton;
    }(egret.DisplayObjectContainer));
    uniLib.CommonButton = CommonButton;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var DebugView = /** @class */ (function (_super) {
        __extends(DebugView, _super);
        function DebugView(rect) {
            var _this = _super.call(this) || this;
            _this._isShow = true;
            _this.isInStage = false;
            _this._rect = rect;
            _this.ChatHeight = 0;
            _this.message = [];
            _this.downPoint = new egret.Point();
            _this.isFriend = _this.isMove = false;
            _this.ChatHeight = _this._rect.height;
            _this._touchBg = new egret.Sprite();
            _this._touchBg.graphics.clear();
            _this._touchBg.graphics.beginFill(0x000000, 0.7);
            _this._touchBg.graphics.drawRect(0, 0, _this._rect.width, _this._rect.height);
            _this._touchBg.graphics.endFill();
            _this._touchBg.width = _this._rect.width;
            _this._touchBg.height = _this._rect.height;
            _this._touchBg.touchEnabled = false;
            _this.addChild(_this._touchBg);
            var btnHeight = 30;
            var w = (uniLib.Global.screenWidth - 10) / 3;
            var bg = uniLib.DisplayUtils.createShape(1, w, btnHeight, 0xffffff);
            bg.cacheAsBitmap = true;
            _this.close_btn = new uniLib.CommonButton(bg);
            _this.close_btn.text = "关闭";
            _this.close_btn.y = uniLib.Global.screenHeight - btnHeight;
            _this.addChild(_this.close_btn);
            var bg2 = uniLib.DisplayUtils.createShape(1, w, btnHeight, 0xffffff);
            bg2.cacheAsBitmap = true;
            _this.clear_btn = new uniLib.CommonButton(bg2);
            _this.clear_btn.x = uniLib.Global.screenWidth / 3;
            _this.clear_btn.text = "清空";
            _this.clear_btn.y = uniLib.Global.screenHeight - btnHeight;
            _this.addChild(_this.clear_btn);
            var bg3 = uniLib.DisplayUtils.createShape(1, w, btnHeight, 0xffffff);
            bg3.cacheAsBitmap = true;
            _this.ignore_btn = new uniLib.CommonButton(bg3);
            _this.ignore_btn.x = uniLib.Global.screenWidth / 3 * 2;
            _this.ignore_btn.text = "不再提示";
            _this.ignore_btn.y = uniLib.Global.screenHeight - btnHeight;
            _this.addChild(_this.ignore_btn);
            _this.add();
            return _this;
        }
        Object.defineProperty(DebugView, "Instance", {
            get: function () {
                if (this._self == null) {
                    this._self = new DebugView(new egret.Rectangle(0, 0, uniLib.Global.screenWidth, uniLib.Global.screenHeight));
                }
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        DebugView.prototype.resize = function () {
            this._rect = new egret.Rectangle(0, 0, uniLib.Global.screenWidth, uniLib.Global.screenHeight);
            this.ChatHeight = this._rect.height;
            this._touchBg.graphics.clear();
            this._touchBg.graphics.beginFill(0x000000, 0.7);
            this._touchBg.graphics.drawRect(0, 0, this._rect.width, this._rect.height);
            this._touchBg.graphics.endFill();
            this._touchBg.width = this._rect.width;
            this._touchBg.height = this._rect.height;
            this._touchBg.touchEnabled = false;
            var btnHeight = 30;
            var w = (uniLib.Global.screenWidth - 10) / 3;
            this.close_btn.text = "关闭";
            this.close_btn.y = uniLib.Global.screenHeight - btnHeight;
            this.addChild(this.close_btn);
            this.clear_btn.x = uniLib.Global.screenWidth / 3;
            this.clear_btn.text = "清空";
            this.clear_btn.y = uniLib.Global.screenHeight - btnHeight;
            this.addChild(this.clear_btn);
            this.ignore_btn.x = uniLib.Global.screenWidth / 3 * 2;
            this.ignore_btn.text = "不再提示";
            this.ignore_btn.y = uniLib.Global.screenHeight - btnHeight;
            this.addChild(this.ignore_btn);
        };
        DebugView.prototype.add = function () {
            //this._touchBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMessageSpriteDown, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
            this.ignore_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHideNever, this);
            this.clear_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClear, this);
            this.x = this._rect.x;
            this.y = this._rect.y;
            this.messageSprite = new egret.Sprite();
            this.messageSprite.touchChildren = false;
            this.messageSprite.touchEnabled = false;
            this.addChild(this.messageSprite);
            this.messageSprite.mask = this._rect;
        };
        DebugView.prototype.onTouchClose = function (e) {
            this.hide();
        };
        DebugView.prototype.onTouchHideNever = function (e) {
            this.hide();
            this._isShow = false;
        };
        DebugView.prototype.onTouchClear = function (e) {
            this.clear();
            this.add();
            this.hide();
        };
        DebugView.prototype.check = function () {
            if (this._isShow == true && this.isInStage && this.message && this.message.length > 0) {
                this.show();
            }
        };
        DebugView.prototype.clear = function () {
            this.message = [];
            this.removeChild(this.messageSprite);
            //this._touchBg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMessageSpriteDown, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
            this.ignore_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHideNever, this);
            this.clear_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClear, this);
        };
        DebugView.prototype.show = function () {
            if (this.message && this.message.length > 0) {
                egret.MainContext.instance.stage.addChildAt(this, egret.MainContext.instance.stage.numChildren);
                this.isInStage = true;
            }
        };
        DebugView.prototype.hide = function () {
            uniLib.DisplayUtils.removeFromParent(this);
            this.isInStage = false;
        };
        /**
         * 添加聊天消息
         * txt 文本内容
         * uid 用户id 0表示系统消息
         * name 用户昵称  f9d546  e712fa
         */
        DebugView.prototype.addLog = function (txt) {
            if (uniLib.Global.debugLevel == 0 || this._isShow == false) {
                return;
            }
            var label = new egret.TextField();
            label.multiline = true;
            label.width = uniLib.Global.screenWidth;
            label.y = this.messageSprite.height;
            label.textColor = 0xff0000;
            //label.width = Global.stage.width;
            label.text = txt;
            this.messageSprite.addChild(label);
            this.message.push(label);
            if (this.messageSprite.height > this.ChatHeight - 20 && !this.isMove) {
                this.messageSprite.y = -(this.messageSprite.height - this.ChatHeight) - 40;
                this.messageSprite.mask.y = this.messageSprite.height - this.ChatHeight + 45;
            }
            if (this._isShow) {
                this.show();
            }
        };
        DebugView.prototype.addTxt = function (container, txt, d) {
            container.addChild(txt);
            txt.x = 5;
            txt.y = (txt.height + 8) * d;
        };
        DebugView.prototype.onMessageSpriteDown = function (a) {
            this.isMove = true;
            this.downPoint = new egret.Point(a.stageX, a.stageY);
            //Global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this)
        };
        DebugView.prototype.onTouchMove = function (a) {
            var b = a.stageY - this.downPoint.y;
            if (a.stageY > this.downPoint.y || a.stageY < this.downPoint.y) {
                this.messageSprite.y += b;
                this.messageSprite.mask.y -= b;
            }
            this.downPoint = new egret.Point(a.stageX, a.stageY);
            //Global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onChatTouchUp, this)
        };
        DebugView.prototype.onChatTouchUp = function (a) {
            if (15 <= this.messageSprite.y || this.messageSprite.height < this.ChatHeight) {
                egret.Tween.get(this.messageSprite).to({ y: 0 }, 100);
                egret.Tween.get(this.messageSprite.mask).to({ y: 0 }, 100);
            }
            else {
                if (this.messageSprite.y < -(this.messageSprite.height - this.ChatHeight - 20)) {
                    egret.Tween.get(this.messageSprite).to({ y: -(this.messageSprite.height - this.ChatHeight) - 40 }, 100);
                    egret.Tween.get(this.messageSprite.mask).to({ y: this.messageSprite.height - this.ChatHeight + 45 }, 100);
                }
                this.isMove = false;
            }
            //Global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            //Global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onChatTouchUp, this);
        };
        DebugView._self = null;
        return DebugView;
    }(egret.Sprite));
    uniLib.DebugView = DebugView;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    /**
 *
 * 新手引导
 *
 */
    var GameGuide = /** @class */ (function (_super) {
        __extends(GameGuide, _super);
        function GameGuide(handBit, circleBit) {
            var _this = _super.call(this) || this;
            _this.guideHand = handBit;
            _this.circle = circleBit;
            _this.addListener();
            return _this;
        }
        /*
         * 刷新初始状态
         * true为下注引导
         * false为滑动引导
         */
        GameGuide.prototype.initStatus = function (isBet) {
            this.createBaseScene();
            if (isBet == true) {
                this.createBetScene();
            }
            else {
                this.createSlipScene();
            }
        };
        /**
       * 显示滑动引导
       */
        GameGuide.prototype.onShowSlipGuide = function () {
            this.disposeScene();
            this.createSlipScene();
        };
        /**
         * 显示下注引导
         */
        GameGuide.prototype.onShowBetGuide = function () {
            this.disposeScene();
            this.createBetScene();
        };
        /**
         * 创建场景
         */
        GameGuide.prototype.createBaseScene = function () {
            if (!this.cirPanel) {
                this.cirPanel = new egret.Sprite;
                this.addChild(this.cirPanel);
            }
            if (!this.handPanel) {
                this.handPanel = new egret.Sprite;
                this.addChild(this.handPanel);
            }
        };
        /**
        * 创建下注引导
        */
        GameGuide.prototype.createBetScene = function () {
            if (!this.tips) {
                this.tips = this.createTextField("点击这里下注", 35, 108, 0x00E4FF, 30);
                this.handPanel.addChild(this.tips);
            }
            this.betGuideEffect();
        };
        /**
         * 创建向右滑动引导
         */
        GameGuide.prototype.createSlipScene = function () {
            if (uniLib.UserInfo.slipStatus == 0) {
                this.dispose();
                return;
            }
            if (uniLib.UserInfo.slipStatus == 1) {
                this.leftSlipGuideEffect();
            }
            else if (uniLib.UserInfo.slipStatus == 2) {
                this.rightSlipGuideEffect();
            }
        };
        /**
            创建监听
          */
        GameGuide.prototype.addListener = function () {
            uniLib.ZqListener.getInstance().addEventListener(uniLib.ZqEvent.HIDE_SLIP_GAME_GUIDE, this.onHideSlipHandler, this);
        };
        GameGuide.prototype.removeListener = function () {
            uniLib.ZqListener.getInstance().removeEventListener(uniLib.ZqEvent.HIDE_SLIP_GAME_GUIDE, this.onHideSlipHandler, this);
        };
        GameGuide.prototype.onHideSlipHandler = function () {
            this.disposeScene();
            this.createSlipScene();
        };
        GameGuide.prototype.createGuideHand = function (x, y, ro, scale) {
            if (ro === void 0) { ro = 0; }
            if (scale === void 0) { scale = 0.8; }
            if (this.guideHand) {
                this.guideHand.scaleX = scale;
                this.guideHand.scaleY = scale;
                this.guideHand.x = x;
                this.guideHand.y = y;
                this.guideHand.rotation = ro;
                this.handPanel.addChild(this.guideHand);
            }
        };
        GameGuide.prototype.addCircleEffect = function (x, y) {
            if (this.circle) {
                this.circle.alpha = 1;
                this.circle.scaleX = 0.2;
                this.circle.scaleY = 0.2;
                this.circle.x = x;
                this.circle.y = y;
                this.cirPanel.addChild(this.circle);
            }
        };
        GameGuide.prototype.betGuideEffect = function () {
            this.createGuideHand(80, 155);
            this.addCircleEffect(92, 258);
            egret.Tween.get(this.guideHand, { loop: true }).wait(200).to({ y: 125 }, 400, egret.Ease.sineIn).wait(500).
                to({ y: 155 }, 300, egret.Ease.sineIn);
            egret.Tween.get(this.circle, { loop: true }).to({ scaleX: 1, scaleY: 1, x: 45, y: 222, alpha: 0 }, 1400, egret.Ease.sineIn);
        };
        GameGuide.prototype.leftSlipGuideEffect = function () {
            if (!this.tips) {
                this.tips = this.createTextField("向右滑动屏幕", 35, 880, 0x00E4FF, 30);
                this.handPanel.addChild(this.tips);
            }
            this.createGuideHand(100, 870, 180, 1);
            this.addCircleEffect(55, 710);
            egret.Tween.get(this.guideHand, { loop: true }).wait(200).to({ x: 270 }, 1200, egret.Ease.sineIn).wait(300).
                to({ x: 100 }, 100, egret.Ease.sineIn);
            egret.Tween.get(this.circle, { loop: true }).wait(200).to({ scaleX: 1, scaleY: 1, x: 225, y: 650, alpha: 0 }, 1400, egret.Ease.sineIn).wait(200);
        };
        GameGuide.prototype.rightSlipGuideEffect = function () {
            if (!this.tips) {
                this.tips = this.createTextField("向左滑动屏幕", 350, 880, 0x00E4FF, 30);
                this.handPanel.addChild(this.tips);
            }
            this.createGuideHand(550, 870, 180, 1);
            this.addCircleEffect(500, 710);
            egret.Tween.get(this.guideHand, { loop: true }).wait(200).to({ x: 380 }, 1200, egret.Ease.sineIn).wait(300).
                to({ x: 550 }, 100, egret.Ease.sineIn);
            egret.Tween.get(this.circle, { loop: true }).wait(200).to({ scaleX: 1, scaleY: 1, x: 240, y: 650, alpha: 0 }, 1400, egret.Ease.sineIn).wait(200);
        };
        GameGuide.prototype.createTextField = function (txt, x, y, color, size) {
            var text = new egret.TextField;
            text.x = x;
            text.y = y;
            text.fontFamily = "微软雅黑";
            text.textColor = color;
            text.text = txt;
            text.size = size;
            text.lineSpacing = 2;
            return text;
        };
        GameGuide.prototype.disposeScene = function () {
            if (this.guideHand) {
                egret.Tween.removeTweens(this.guideHand);
            }
            if (this.circle) {
                egret.Tween.removeTweens(this.circle);
            }
            if (this.tips) {
                uniLib.DisplayUtils.removeFromParent(this.tips);
            }
            this.tips = null;
            if (this.handPanel) {
                uniLib.DisplayUtils.removeAllChildren(this.handPanel);
            }
            if (this.cirPanel) {
                uniLib.DisplayUtils.removeAllChildren(this.cirPanel);
            }
        };
        GameGuide.prototype.dispose = function () {
            this.removeListener();
            this.disposeScene();
            if (this.handPanel) {
                uniLib.DisplayUtils.removeAllChildren(this.handPanel);
                uniLib.DisplayUtils.removeFromParent(this.handPanel);
            }
            this.handPanel = null;
            if (this.cirPanel) {
                uniLib.DisplayUtils.removeAllChildren(this.cirPanel);
                uniLib.DisplayUtils.removeFromParent(this.cirPanel);
            }
            this.cirPanel = null;
            this.circle = null;
            this.guideHand = null;
        };
        return GameGuide;
    }(egret.Sprite));
    uniLib.GameGuide = GameGuide;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var MsgBox = /** @class */ (function (_super) {
        __extends(MsgBox, _super);
        function MsgBox(txt, title, okTxt, confirmCall, cacelTxt, cacelCall, callObj, skin) {
            if (title === void 0) { title = "温馨提示"; }
            if (okTxt === void 0) { okTxt = "确定"; }
            var _this = _super.call(this) || this;
            _this.skinName = MsgBox.exml;
            _this.title = title;
            if (cacelTxt) {
                if (cacelCall)
                    _this._cacelCall = cacelCall;
                _this.cacelButton.visible = true;
                // this.okButton.horizontalCenter = -80;
                // this.cacelButton.horizontalCenter = 80;
            }
            else {
                _this.cacelButton.visible = false;
                _this.okButton.horizontalCenter = 0;
            }
            if (confirmCall)
                _this._okCall = confirmCall;
            if (callObj)
                _this._callObj = callObj;
            _this.okButton.label = okTxt;
            _this.contentText.text = txt;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
            return _this;
        }
        MsgBox.setDefaultSkin = function (skin) {
            MsgBox.exml = skin;
        };
        MsgBox.prototype.onTouch = function (e) {
            var target = e.target;
            switch (target) {
                case this.okButton:
                    uniLib.PopUpMgr.removePopUp(this);
                    if (this._okCall)
                        this._okCall.call(this._callObj);
                    break;
                case this.cacelButton:
                    uniLib.PopUpMgr.removePopUp(this);
                    if (this._cacelCall)
                        this._cacelCall.call(this._callObj);
                    break;
            }
        };
        MsgBox.exml = "<e:Skin class=\"Test\" width=\"400\" height=\"300\" xmlns:e=\"http://ns.egret.com/eui\">\n    <e:Rect left=\"0\" right=\"0\" top=\"0\" bottom=\"0\" fillColor=\"0xffffff\" />\n    <e:Group id=\"moveArea\" top=\"0\" right=\"0\" left=\"0\" height=\"45\">\n        <e:Image width=\"100%\" height=\"100%\"></e:Image>\n        <e:Label id=\"titleDisplay\" textColor=\"0x000000\" horizontalCenter=\"0\" verticalCenter=\"0\" size=\"20\"></e:Label>\n    </e:Group>\n    <e:Button id=\"okButton\" label=\"\u786E\u5B9A\" bottom=\"9\" horizontalCenter=\"0\" width=\"106\" height=\"49\"></e:Button>\n    <e:Button id=\"cacelButton\" label=\"\u53D6\u6D88\" bottom=\"9\" horizontalCenter=\"0\" width=\"106\" height=\"49\"></e:Button>\n    <e:Label id=\"contentText\" textColor=\"0x000000\" text=\"\u6807\u7B7E\" y=\"65\" width=\"357\" textAlign=\"center\" height=\"165\"\n             horizontalCenter=\"0\" />\n</e:Skin>";
        return MsgBox;
    }(eui.Panel));
    uniLib.MsgBox = MsgBox;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
     * 对象工厂
     */
    var ObjectFactory = /** @class */ (function () {
        function ObjectFactory(key, min, max) {
            if (min === void 0) { min = 5; }
            if (max === void 0) { max = 10; }
            this._prexKey = "";
            this._minCount = 0;
            this._maxCount = 0;
            this.m_FishFactory = {};
            this._prexKey = key;
            this._minCount = min;
            this._maxCount = max;
        }
        ObjectFactory.prototype.free = function (obj) {
            var sp;
            var ar = this.createArray(this.key(false));
            var index = ar.indexOf(obj);
            if (index == -1) {
                return;
            }
            ar.splice(index, 1);
            var ar2 = this.createArray(this.key(true));
            ar2.push(obj);
            var len = ar2.length > this._maxCount ? (ar2.length - this._minCount) : 0;
            var i = 0;
            while (i < len) {
                sp = ar2.shift();
                sp = null;
                i++;
            }
        };
        ObjectFactory.prototype.setCount = function (_min, _max) {
            if (_max === void 0) { _max = 0; }
            this._minCount = _min;
            this._maxCount = _max;
        };
        ObjectFactory.prototype.active = function (cls) {
            var arr = this.createArray(this.key(true));
            var obj;
            if (arr.length == 0) {
                //ConsoleManager.log("新的");
                obj = new cls;
            }
            else {
                //ConsoleManager.log("旧的");
                obj = arr.shift();
            }
            this.createArray(this.key(false)).push(obj);
            return obj;
        };
        ObjectFactory.prototype.isNew = function () {
            return this.createArray(this.key(true)).length == 0;
        };
        ObjectFactory.prototype.empty = function () {
            var obj = this.m_FishFactory[this.key(true)];
            if (obj != null) {
                this.m_FishFactory[this.key(true)] = null;
                delete this.m_FishFactory[this.key(true)];
            }
        };
        ObjectFactory.prototype.createArray = function (key) {
            var arr = this.m_FishFactory[key];
            if (arr == null) {
                arr = new Array();
                this.m_FishFactory[key] = arr;
            }
            return arr;
        };
        ObjectFactory.prototype.key = function (b) {
            return this._prexKey + "&" + (b ? ("free") : ("atv"));
        };
        ObjectFactory.prototype.getKey = function () {
            return this._prexKey;
        };
        return ObjectFactory;
    }());
    uniLib.ObjectFactory = ObjectFactory;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
     * 对象工厂管理器
     */
    var ObjectFactoryGroup = /** @class */ (function () {
        function ObjectFactoryGroup(cls, min, max) {
            if (min === void 0) { min = 5; }
            if (max === void 0) { max = 10; }
            this._mainKey = "";
            this._min = 0;
            this._max = 0;
            this.vector = new Array();
            this.subKey = new Array();
            this._clazz = cls;
            this._mainKey = this._clazz;
            this._min = min;
            this._max = max;
        }
        ObjectFactoryGroup.prototype.free = function (obj, key) {
            this.getFactory(key).free(obj);
        };
        ObjectFactoryGroup.prototype.active = function (key) {
            return this.getFactory(key).active(this._clazz);
        };
        ObjectFactoryGroup.prototype.isNew = function (key) {
            return this.getFactory(key).isNew();
        };
        ObjectFactoryGroup.prototype.setCount = function (key, _min, _max) {
            if (_max === void 0) { _max = 0; }
            this.getFactory(key).setCount(_min, _max);
        };
        ObjectFactoryGroup.prototype.empty = function (key) {
            this.getFactory(key).empty();
        };
        ObjectFactoryGroup.prototype.setAllCount = function (_min, _max) {
            if (_max === void 0) { _max = 0; }
            var obj;
            var length = this.vector.length;
            for (var i = 0; i < length; i++) {
                obj = this.vector[i];
                obj.setCount(_min, _max);
            }
        };
        ObjectFactoryGroup.prototype.getFactory = function (_key) {
            var factory;
            var length = this.vector.length;
            for (var i = 0; i < length; i++) {
                factory = this.vector[i];
                if (factory.getKey() == this.key(_key)) {
                    return factory;
                }
            }
            factory = new uniLib.ObjectFactory(this.key(_key), this._min, this._max);
            this.vector.push(factory);
            return factory;
        };
        ObjectFactoryGroup.prototype.key = function (_key) {
            return this._mainKey + "_" + _key;
        };
        ObjectFactoryGroup.prototype.createFactory = function (key, min, max) {
            if (max === void 0) { max = 0; }
            return new uniLib.ObjectFactory(this.key(key), min, max);
        };
        return ObjectFactoryGroup;
    }());
    uniLib.ObjectFactoryGroup = ObjectFactoryGroup;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var PageGroup = /** @class */ (function (_super) {
        __extends(PageGroup, _super);
        function PageGroup(mask) {
            var _this = _super.call(this) || this;
            _this.pages = [];
            _this.selectIndex = -1;
            _this.pageWidth = 640;
            _this.touchEnabled = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            _this.mask = mask;
            if (_this.mask)
                _this.pageWidth = _this.mask.width;
            _this.btnGroup = new uniLib.StatusBtnGroup();
            _this.btnGroup.x = 300;
            _this.btnGroup.y = mask.height - 20;
            _this.addChild(_this.btnGroup);
            return _this;
        }
        PageGroup.prototype.addPage = function (page) {
            this.pages.push(page);
            this.childNum = this.pages.length;
            this.btnGroup.setChildNum(this.childNum);
            this.btnGroup.x = this.pageWidth / 2 - this.btnGroup.width / 2;
            if (this.childNum > 1) {
                this.touchEnabled = true;
            }
            else {
                this.touchEnabled = false;
            }
        };
        PageGroup.prototype.reset = function () {
            for (var i = 0; i < this.childNum; i++) {
                this.removePage(this.pages[i]);
            }
            this.removePage(this.currentPage);
            this.removePage(this.leftPage);
            this.removePage(this.rightPage);
            this.leftPage = null;
            this.rightPage = null;
            this.currentPage = null;
            this.pages.length = 0;
            this.childNum = this.pages.length;
            this.btnGroup.setChildNum(0);
        };
        PageGroup.prototype.onTouchBegin = function (event) {
            if (!this.touchEnabled)
                return;
            this.startTouchX = event.stageX;
            this.currentPageX = this.currentPage.x;
        };
        PageGroup.prototype.onTouchMove = function (event) {
            if (!this.touchEnabled)
                return;
            var gap = event.stageX - this.startTouchX;
            if (Math.abs(gap) > 10) {
                this.touchChildren = false;
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
            if (this.currentPage) {
                this.currentPage.x = this.currentPageX + gap;
                if (this.currentPage.x > 0) {
                    if (!this.leftPage) {
                        if (this.selectIndex > 0) {
                            this.leftPage = this.pages[this.selectIndex - 1];
                        }
                    }
                    if (this.leftPage) {
                        if (!this.leftPage.parent) {
                            this.addChild(this.leftPage);
                        }
                        this.leftPage.x = this.currentPage.x - this.pageWidth;
                    }
                }
                else if (this.currentPage.x < 0) {
                    if (!this.rightPage) {
                        if (this.selectIndex < this.childNum - 1) {
                            this.rightPage = this.pages[this.selectIndex + 1];
                        }
                    }
                    if (this.rightPage) {
                        if (!this.rightPage.parent) {
                            this.addChild(this.rightPage);
                        }
                        this.rightPage.x = this.currentPage.x + this.pageWidth;
                    }
                }
            }
        };
        PageGroup.prototype.onTouchEnd = function (event) {
            if (!this.touchEnabled)
                return;
            this.touchChildren = true;
            var gap = event.stageX - this.startTouchX;
            if (Math.abs(gap) > 20) {
                event.stopPropagation();
                event.stopImmediatePropagation();
                if (gap > 20) {
                    if (this.leftPage) {
                        egret.Tween.get(this.currentPage).to({ x: this.pageWidth }, 100);
                        egret.Tween.get(this.leftPage).to({ x: 0 }, 100).call(this.showLeftPageEnd, this);
                    }
                    else {
                        this.removePage(this.leftPage);
                        this.removePage(this.rightPage);
                        this.leftPage = null;
                        this.rightPage = null;
                        egret.Tween.get(this.currentPage).to({ x: 0 }, 100);
                    }
                }
                else {
                    if (this.rightPage) {
                        egret.Tween.get(this.currentPage).to({ x: -this.pageWidth }, 100);
                        egret.Tween.get(this.rightPage).to({ x: 0 }, 100).call(this.showRightPageEnd, this);
                    }
                    else {
                        this.removePage(this.leftPage);
                        this.removePage(this.rightPage);
                        this.leftPage = null;
                        this.rightPage = null;
                        egret.Tween.get(this.currentPage).to({ x: 0 }, 100);
                    }
                }
            }
            else {
                if (this.leftPage) {
                    egret.Tween.get(this.leftPage).to({ x: -this.pageWidth }, 100);
                }
                if (this.rightPage) {
                    egret.Tween.get(this.rightPage).to({ x: this.pageWidth }, 100);
                }
                egret.Tween.get(this.currentPage).to({ x: 0 }, 100).call(this.showCurrentPageEnd, this);
            }
        };
        PageGroup.prototype.showCurrentPageEnd = function () {
            this.leftPage = null;
            this.rightPage = null;
        };
        PageGroup.prototype.showLeftPageEnd = function () {
            this.removePage(this.currentPage);
            this.removePage(this.rightPage);
            this.currentPage = this.leftPage;
            this.selectIndex = this.selectIndex - 1;
            this.leftPage = null;
            this.rightPage = null;
            this.updateBtnGroupSelected();
        };
        PageGroup.prototype.showRightPageEnd = function () {
            this.removePage(this.currentPage);
            this.removePage(this.leftPage);
            this.currentPage = this.rightPage;
            this.selectIndex = this.selectIndex + 1;
            this.leftPage = null;
            this.rightPage = null;
            this.updateBtnGroupSelected();
        };
        PageGroup.prototype.setSelectIndex = function (value) {
            this.selectIndex = value;
            this.removePage(this.currentPage);
            this.removePage(this.leftPage);
            this.removePage(this.rightPage);
            this.leftPage = null;
            this.rightPage = null;
            this.currentPage = this.pages[this.selectIndex];
            this.currentPage.x = 0;
            this.addChild(this.currentPage);
            this.updateBtnGroupSelected();
        };
        PageGroup.prototype.getSelectIndex = function () {
            return this.selectIndex;
        };
        PageGroup.prototype.updateBtnGroupSelected = function () {
            this.btnGroup.setSelectIndex(this.selectIndex);
        };
        PageGroup.prototype.setChildNum = function (value) {
            if (this.childNum == value) {
                return;
            }
            this.childNum = value;
        };
        PageGroup.prototype.getChildNum = function () {
            return this.childNum;
        };
        PageGroup.prototype.removePage = function (page) {
            if (page && this.contains(page)) {
                this.removeChild(page);
            }
        };
        return PageGroup;
    }(egret.Sprite));
    uniLib.PageGroup = PageGroup;
})(uniLib || (uniLib = {}));

// module uniLib {
//     export class Scroller extends egret.Sprite {
//         private content: egret.DisplayObject;
//         private lastTouchPoint: egret.Point;
//         private firstTouchPoint: egret.Point;
//         private maskRect: egret.Rectangle;
//         private maxX: number = 0;
//         private minX: number = 0;
//         private maxY: number = 0;
//         private minY: number = 0;
//         private isCanRollX: boolean;
//         private isCanRollY: boolean = true;
//         private isShowBg: boolean = true;
//         private bgColor: number = 0xffffff;
//         private bgAlpha: number = 1;
//         private bg: egret.Bitmap;
//         private bgSh: egret.Shape;
//         public constructor(content: egret.DisplayObject, mask: egret.Rectangle, isShowBg: boolean = true, bgColor: number = 0xebebeb, bgAlpha: number = 1) {
//             super();
//             this.touchEnabled = true;
//             this.content = content;
//             this.content.touchEnabled = true;
//             this.addChild(this.content);
//             this.maskRect = mask;
//             this.mask = this.maskRect;
//             this.isShowBg = isShowBg;
//             this.bgColor = bgColor;
//             this.bgAlpha = bgAlpha;
//             this.updateBg();
//             this.minX = this.maskRect.width - this.content.width > 0 ? 0 : this.maskRect.width - this.content.width;
//             this.minY = this.maskRect.height - this.content.height > 0 ? 0 : this.maskRect.height - this.content.height;
//             this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
//             this.content.addEventListener(egret.Event.RESIZE, this.onContentResize, this);
//             this.lastTouchPoint = new egret.Point();
//         }
//         public updateMask(mask: egret.Rectangle): void {
//             this.maskRect = mask;
//             this.mask = this.maskRect;
//             this.updateBg();
//             this.onContentResize(null);
//         }
//         private updateBg(): void {
//             if (!this.isShowBg) {
//                 return;
//             }
//             //            if(!this.bg) {
//             //                this.bg = new egret.Bitmap();
//             //                var sp: egret.Shape = new egret.Shape();
//             //                sp.graphics.beginFill(this.bgColor,this.bgAlpha);
//             //                sp.graphics.drawRect(0,0,1,1);
//             //                sp.graphics.endFill();
//             //                var te: egret.RenderTexture = new egret.RenderTexture();
//             //                te.drawToTexture(sp);
//             //                this.bg.texture = te;
//             //            }
//             //            this.bg.width = ChatView.CHAT_WIDTH;
//             //            this.bg.height = this.mask.height;
//             //            this.addChildAt(this.bg,0); 
//             if (!this.bgSh) {
//                 this.bgSh = new egret.Shape();
//                 this.addChildAt(this.bgSh, 0);
//             }
//             this.bgSh.graphics.clear();
//             this.bgSh.graphics.beginFill(this.bgColor, this.bgAlpha);
//             this.bgSh.graphics.drawRect(0, 0, this.mask.width, this.mask.height);
//             this.bgSh.graphics.endFill();
//         }
//         private onContentResize(event: egret.Event): void {
//             this.minX = this.maskRect.width - this.content.width > 0 ? 0 : this.maskRect.width - this.content.width;
//             var minY: number = this.maskRect.height - this.content.height > 0 ? 0 : this.maskRect.height - this.content.height;
//             if (this.minY < minY) {
//                 egret.Tween.removeTweens(this.content);
//                 this.content.y = minY;
//             } else {
//                 egret.Tween.removeTweens(this.content);
//                 egret.Tween.get(this.content).to({ y: minY }, 100);
//             }
//             this.minY = minY;
//         }
//         private onTouchBegin(event: egret.TouchEvent): void {
//             this.minX = this.maskRect.width - this.content.width > 0 ? 0 : this.maskRect.width - this.content.width;
//             this.minY = this.maskRect.height - this.content.height > 0 ? 0 : this.maskRect.height - this.content.height;
//             egret.Tween.removeTweens(this.content);
//             this.lastTouchPoint = new egret.Point(event.stageX, event.stageY);
//             this.firstTouchPoint = new egret.Point(event.stageX, event.stageY);
//             var stage = this.stage;
//             stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
//             stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
//             stage.addEventListener(egret.Event.LEAVE_STAGE, this.onLeave, this);
//             event.preventDefault();
//         }
//         private lastGapX: number = 0;
//         private lastGapY: number = 0;
//         private onTouchMove(event: egret.TouchEvent): void {
//             var gap: number = 0;
//             if (this.isCanRollX) {
//                 this.checkX(event.stageX);
//                 //                
//                 //                if(this.firstTouchPoint.x > 0){
//                 //                    
//                 //                }
//                 //                gap = event.stageX - this.firstTouchPoint.x;
//                 //                if(gap)
//                 //                gap = event.stageX - this.lastTouchPoint.x;
//                 //                this.lastGapX = gap;
//                 //                if(this.content.x + gap > 0) {
//                 //                    this.content.x = this.content.x + gap / 2;
//                 //                } else if(this.content.x + gap < this.minX) {
//                 //                    this.content.x = this.content.x + gap / 2;
//                 //                }
//                 //                else {
//                 //                    this.content.x = this.content.x + gap;
//                 //                }
//                 //
//                 //                this.lastTouchPoint.x = event.stageX;
//             }
//             if (this.isCanRollY) {
//                 this.checkY(event.stageY);
//                 //                var gap: number = event.stageY - this.lastTouchPoint.y;
//                 //                this.lastGapY = gap;
//                 //                if(this.content.y + gap > 0) {
//                 //                    this.content.y = this.content.y + gap / 2;
//                 //                } else if(this.content.y + gap < this.minY) {
//                 //                    this.content.y = this.content.y + gap / 2;
//                 //                }
//                 //                else {
//                 //                    this.content.y = this.content.y + gap;
//                 //                }
//                 //
//                 //                this.lastTouchPoint.y = event.stageY;
//             }
//             //            if(Math.abs(this.lastGapX) >= 2 || Math.abs(this.lastGapY) >= 2){
//             //                this.content.touchChildren = false;
//             //            }
//         }
//         private checkX(pos: number): void {
//             var gap: number = 0;
//             if (this.firstTouchPoint.x > 0) {
//                 gap = pos - this.firstTouchPoint.x;
//                 if (Math.abs(gap) < 20) {
//                     return;
//                 } else {
//                     this.firstTouchPoint.x = -1;
//                 }
//             }
//             gap = pos - this.lastTouchPoint.x;
//             this.lastGapX = gap;
//             if (this.content.x + gap > 0) {
//                 this.content.x = this.content.x + gap / 2;
//             } else if (this.content.x + gap < this.minX) {
//                 this.content.x = this.content.x + gap / 2;
//             }
//             else {
//                 this.content.x = this.content.x + gap;
//             }
//             this.lastTouchPoint.x = pos;
//         }
//         private checkY(pos: number): void {
//             var gap: number = 0;
//             if (this.firstTouchPoint.y > 0) {
//                 gap = pos - this.firstTouchPoint.y;
//                 if (Math.abs(gap) < 20) {
//                     return;
//                 } else {
//                     this.firstTouchPoint.y = -1;
//                 }
//             }
//             gap = pos - this.lastTouchPoint.y;
//             this.lastGapY = gap;
//             if (this.content.y + gap > 0) {
//                 this.content.y = this.content.y + gap / 2;
//             } else if (this.content.y + gap < this.minY) {
//                 this.content.y = this.content.y + gap / 2;
//             }
//             else {
//                 this.content.y = this.content.y + gap;
//             }
//             this.lastTouchPoint.y = pos;
//         }
//         private onTouchEnd(event: egret.TouchEvent): void {
//             event.stopPropagation();
//             event.stopImmediatePropagation();
//             this.content["touchChildren"] = true;
//             //这里不用this.stage目的是为了防止出错
//             egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
//             egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
//             var time: number = 1000;
//             if (this.isCanRollX) {
//                 if (Math.abs(this.lastGapX) > 5 && this.content.x < 0 && this.content.x > this.minX) {
//                     var newx: number = this.content.x + this.lastGapX * 30;
//                     if (newx > 0) {
//                         newx = newx / 2;
//                     } else if (newx < this.minX) {
//                         newx = newx - (newx - this.minX) / 2;
//                     }
//                     egret.Tween.get(this.content).to({ x: newx }, time, egret.Ease.circOut).call(function (): void {
//                         this.rollEnd();
//                     }, this);
//                 } else {
//                     this.rollEnd();
//                 }
//             }
//             if (this.isCanRollY) {
//                 if (Math.abs(this.lastGapY) > 5 && this.content.y < 0 && this.content.y > this.minY) {
//                     var newy: number = this.content.y + this.lastGapY * 30;
//                     if (newy > 0) {
//                         newy = newy / 2;
//                         if (newy > this.maskRect.height / 2) {
//                             newy = this.maskRect.height / 2;
//                         }
//                         time = 500;
//                     } else if (newy < this.minY) {
//                         newy = newy - (newy - this.minY) / 2;
//                         if (newy < this.minY - this.maskRect.height / 2) {
//                             newy = this.minY - this.maskRect.height / 2;
//                         }
//                         time = 500;
//                     }
//                     egret.Tween.get(this.content).to({ y: newy }, time, egret.Ease.circOut).call(function (): void {
//                         this.rollEnd();
//                     }, this);
//                 } else {
//                     this.rollEnd();
//                 }
//             }
//         }
//         private rollEnd(): void {
//             if (this.content.x > 0) {
//                 egret.Tween.get(this.content).to({ x: 0 }, 200);
//             } else if (this.content.x < this.minX) {
//                 egret.Tween.get(this.content).to({ x: this.minX }, 200);
//             }
//             if (this.content.y > 0) {
//                 //                this.content.y = 0;
//                 egret.Tween.get(this.content, null, null, true).to({ y: 0 }, 200);
//             } else if (this.content.y < this.minY) {
//                 egret.Tween.get(this.content).to({ y: this.minY }, 200);
//             }
//         }
//         private onLeave(event: egret.Event): void {
//             this.onTouchEnd(null);
//         }
//     }
// }

var uniLib;
(function (uniLib) {
    var SlideBar = /** @class */ (function () {
        function SlideBar(center, left, right, stage) {
            this.curDir = "center"; //当前界面 left  right center
            this.left = left;
            this.right = right;
            this.center = center;
            this.stage = stage;
            this.addListener();
        }
        /**
          创建监听
        */
        SlideBar.prototype.addListener = function () {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        SlideBar.prototype.removeListener = function () {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        /**
         * 恢复到初始居中状态
         */
        SlideBar.prototype.initStatus = function () {
            if (this.curDir == "center")
                return;
            if (this.curDir == "left") {
                this.disposeLeftBar();
                this.onTrunCenter();
            }
            else if (this.curDir == "right") {
                this.disposeRightBar();
                this.onTrunCenter();
            }
        };
        /**
         * 显示左边框
         */
        SlideBar.prototype.showLeftBar = function () {
            if (this.curDir == "left")
                return;
            this.onTrunRight();
        };
        SlideBar.prototype.onTouchBegin = function (event) {
            if (!this.center.touchEnabled)
                return;
            this.startTouchPoint = new egret.Point(event.stageX, event.stageY);
        };
        SlideBar.prototype.onTouchMove = function (event) {
            var gapX = event.stageX - this.startTouchPoint.x;
            var gapY = event.stageY - this.startTouchPoint.y;
            if (Math.abs(gapX) >= 20 && Math.abs(gapX) >= Math.abs(gapY)) {
                this.canShowBar = true;
                this.center.touchChildren = false;
            }
        };
        SlideBar.prototype.onTouchEnd = function (event) {
            if (!this.canShowBar) {
                return;
            }
            this.canShowBar = false;
            if (!this.center.touchEnabled)
                return;
            this.center.touchChildren = true;
            var gap = event.stageX - this.startTouchPoint.x;
            if (Math.abs(gap) > 20) {
                if (gap > 20) {
                    if (this.curDir == "center") {
                        this.onTrunRight();
                    }
                    else if (this.curDir == "right") {
                        this.disposeRightBar();
                        this.onTrunCenter();
                    }
                }
                else {
                    if (this.curDir == "center") {
                        this.onTrunLeft();
                    }
                    else if (this.curDir == "left") {
                        this.disposeLeftBar();
                        this.onTrunCenter();
                    }
                }
            }
            else {
                this.disposeLeftBar();
                this.disposeRightBar();
                this.onTrunCenter();
            }
        };
        //向右滑 显示左边栏
        SlideBar.prototype.onTrunRight = function () {
            egret.Tween.get(this.center).to({ x: this.left.width }, 500).call(this.disposeTween, this, [this.center]);
            if (uniLib.UserInfo.slipStatus == 1) {
                uniLib.UserInfo.slipStatus = 2;
            }
            this.curDir = "left";
            egret.Tween.get(this.left).to({ x: 0 }, 500).call(this.disposeTween, this, [this.left]);
            uniLib.ZqListener.getInstance().dispatchEvent(new uniLib.ZqEvent(uniLib.ZqEvent.HIDE_SLIP_GAME_GUIDE));
        };
        //向左滑 显示右边栏
        SlideBar.prototype.onTrunLeft = function () {
            egret.Tween.get(this.center).to({ x: -this.right.width }, 500).call(this.disposeTween, this, [this.center]);
            uniLib.UserInfo.slipStatus = 0;
            this.curDir = "right";
            egret.Tween.get(this.right).to({ x: (uniLib.Global.screenWidth - this.right.width) }, 500).call(this.disposeTween, this, [this.right]);
            uniLib.ZqListener.getInstance().dispatchEvent(new uniLib.ZqEvent(uniLib.ZqEvent.HIDE_SLIP_GAME_GUIDE));
        };
        SlideBar.prototype.onTrunCenter = function () {
            this.curDir = "center";
            egret.Tween.get(this.center).to({ x: 0 }, 500).call(this.disposeTween, this, [this.center]);
        };
        SlideBar.prototype.disposeLeftBar = function () {
            if (this.left) {
                egret.Tween.get(this.left).to({ x: -this.left.width }, 500).call(this.disposeTween, this, [this.left]);
            }
        };
        SlideBar.prototype.disposeRightBar = function () {
            if (this.right) {
                egret.Tween.get(this.right).to({ x: uniLib.Global.screenWidth }, 500).call(this.disposeTween, this, [this.right]);
            }
        };
        SlideBar.prototype.disposeTween = function (param) {
            if (param) {
                egret.Tween.removeTweens(param);
            }
        };
        SlideBar.prototype.dispose = function () {
            this.removeListener();
        };
        return SlideBar;
    }());
    uniLib.SlideBar = SlideBar;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var StatusBtn = /** @class */ (function (_super) {
        __extends(StatusBtn, _super);
        function StatusBtn(normalTexture, selectedTexture) {
            var _this = _super.call(this) || this;
            _this.index = -1;
            _this.normalTexture = normalTexture;
            _this.selectedTexture = selectedTexture;
            _this.normalBitmap = new egret.Bitmap(_this.normalTexture);
            _this.selectedBitmap = new egret.Bitmap(_this.selectedTexture);
            _this.addChild(_this.normalBitmap);
            return _this;
        }
        Object.defineProperty(StatusBtn.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                if (this._selected == value) {
                    return;
                }
                this._selected = value;
                if (this._selected) {
                    this.addChild(this.selectedBitmap);
                    if (this.contains(this.normalBitmap)) {
                        this.removeChild(this.normalBitmap);
                    }
                }
                else {
                    this.addChild(this.normalBitmap);
                    if (this.contains(this.selectedBitmap)) {
                        this.removeChild(this.selectedBitmap);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return StatusBtn;
    }(egret.Sprite));
    uniLib.StatusBtn = StatusBtn;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var StatusBtnGroup = /** @class */ (function (_super) {
        __extends(StatusBtnGroup, _super);
        function StatusBtnGroup(normalTexture, selectedTexture, gap) {
            if (gap === void 0) { gap = 10; }
            var _this = _super.call(this) || this;
            _this.selectIndex = 0;
            _this.btns = [];
            _this.gap = 10;
            _this.normalTexture = normalTexture;
            _this.selectedTexture = selectedTexture;
            _this.gap = gap;
            _this.init();
            return _this;
        }
        StatusBtnGroup.prototype.setSelectIndex = function (value) {
            this.selectIndex = value;
            if (this.selectIndex >= this.btns.length) {
                this.selectIndex = this.btns.length - 1;
            }
            if (this.currentSelecedBtn) {
                this.currentSelecedBtn.selected = false;
            }
            this.currentSelecedBtn = this.btns[this.selectIndex];
            this.currentSelecedBtn.selected = true;
        };
        StatusBtnGroup.prototype.getSelectIndex = function () {
            return this.selectIndex;
        };
        StatusBtnGroup.prototype.setChildNum = function (value) {
            if (this.childNum == value) {
                return;
            }
            this.childNum = value;
            if (this.childNum <= this.btns.length) {
                this.btns.length = this.childNum;
            }
            else {
                for (var i = this.btns.length; i < this.childNum; i++) {
                    this.btns.push(this.getNewBtn());
                }
            }
            this.resetChildren();
        };
        StatusBtnGroup.prototype.getChildNum = function () {
            return this.childNum;
        };
        StatusBtnGroup.prototype.resetChildren = function () {
            this.removeChildren();
            if (this.btns.length < 2) {
                return;
            }
            var btn;
            for (var i = 0; i < this.btns.length; i++) {
                btn = this.btns[i];
                btn.selected = false;
                btn.x = i * (btn.width + this.gap);
                this.addChild(btn);
            }
            this.setSelectIndex(this.selectIndex);
        };
        StatusBtnGroup.prototype.getNewBtn = function () {
            //            var btn: StatusBtn = new StatusBtn(RES.getRes("statusBtn_normal"),RES.getRes("statusBtn_selected"));
            var btn = new uniLib.StatusBtn(this.normalTexture, this.selectedTexture);
            return btn;
        };
        StatusBtnGroup.prototype.init = function () {
            var sh;
            var rt;
            if (!this.normalTexture) {
                sh = new egret.Shape();
                sh.graphics.beginFill(0xA9A9A9);
                sh.graphics.drawCircle(5, 5, 5);
                sh.graphics.endFill();
                rt = new egret.RenderTexture();
                rt.drawToTexture(sh);
                this.normalTexture = rt;
            }
            if (!this.selectedTexture) {
                sh = new egret.Shape();
                sh.graphics.beginFill(0x6D7278);
                sh.graphics.drawCircle(5, 5, 5);
                sh.graphics.endFill();
                rt = new egret.RenderTexture();
                rt.drawToTexture(sh);
                this.selectedTexture = rt;
            }
        };
        return StatusBtnGroup;
    }(egret.Sprite));
    uniLib.StatusBtnGroup = StatusBtnGroup;
})(uniLib || (uniLib = {}));

/**
* 资源常量
*/
var CommonConsts = /** @class */ (function () {
    function CommonConsts() {
    }
    /**
    * 是否在游戏中 标示
    */
    CommonConsts.LOBBY_LASTGAME = "lobby_lastGame";
    CommonConsts.UNI_LAST_PLAT_INFO = "uni_last_plat_info";
    return CommonConsts;
}());

var uniLib;
(function (uniLib) {
    var Dispatcher = /** @class */ (function () {
        function Dispatcher() {
            this._funcMap = {};
        }
        Dispatcher.prototype.dispatch = function ($noticeType, data) {
            if (data === void 0) { data = null; }
            var funcVector = this._funcMap[$noticeType];
            var i = 0;
            if (funcVector == null)
                return;
            while (i < funcVector.length) {
                if (funcVector[i]) {
                    funcVector[i][0].call(funcVector[i][1], data);
                }
                i++;
            }
            return true;
        };
        Dispatcher.prototype.addListener = function (noticeType, listener, thisObj) {
            if (this._funcMap[noticeType]) {
                var index = this.getNoticeIndex(noticeType, listener, thisObj);
                if (index == -1)
                    this._funcMap[noticeType].push([listener, thisObj]);
            }
            else {
                this._funcMap[noticeType] = [];
                this._funcMap[noticeType].push([listener, thisObj]);
            }
        };
        Dispatcher.prototype.hasListener = function (noticeType) {
            if (this._funcMap[noticeType] && this._funcMap[noticeType].length > 0) {
                return true;
            }
            return false;
        };
        Dispatcher.prototype.removeListener = function (noticeType, listener, thisObj) {
            if (this._funcMap[noticeType]) {
                var index = this.getNoticeIndex(noticeType, listener, thisObj);
                if (index != -1)
                    this._funcMap[noticeType].splice(index, 1);
            }
        };
        Dispatcher.prototype.getNoticeIndex = function (noticeType, listener, thisObj) {
            var data = this._funcMap[noticeType];
            for (var i in data) {
                if (data[i][0] == listener && data[i][1] == thisObj) {
                    return Number(i);
                }
            }
            return -1;
        };
        return Dispatcher;
    }());
    uniLib.Dispatcher = Dispatcher;
})(uniLib || (uniLib = {}));

////function clone(): any {
////    return this.slice(0);
////}
////function removeFirst(predicate: (value: any, index: number) => boolean, fromIndex?: number): boolean {
////    if (predicate == null)
////        return false;
////    if (fromIndex == null)
////        fromIndex = 0;
////    else if (fromIndex < 0 || fromIndex >= this.length)
////        return false;
////    for (let i = fromIndex; i < this.length; i++) {
////        if (predicate(this[i], i)) {
////            this.splice(i, 1);
////            return true;
////        }
////    }
////    return false;
////}
////function removeAll(predicate: (value: any, index: number) => boolean, fromIndex?: number): number {
////    if (fromIndex == null)
////        fromIndex = 0;
////    if (fromIndex < 0 || fromIndex >= this.length)
////        return 0;
////    if (predicate == null) {
////        var length = this.length;
////        this.splice(fromIndex, this.length);
////        return length - this.length;
////    }
////    // 逆序遍历，防止下标错乱
////    var count = 0;
////    for (let i = this.length - 1; i >= fromIndex; i--) {
////        if (predicate(this[i], i)) {
////            this.splice(i, 1);
////            count++;
////        }
////    }
////    return count;
////}
//module uniLib {
//	/**
//	 * 可记录调用"this"的函数代理
//	 */
//	export class SinglecastEvent {
//		public action: Function;
//		public self: any;
//		constructor(action?: Function, self?: any) {
//			this.action = action;
//			this.self = self;
//		}
//		call(...argArray: any[]): any {
//			return this.apply(argArray);
//		}
//		apply(argArray?: any): any {
//			if (this.action == null)
//				return;
//			return this.action.apply(this.self, argArray);
//		}
//	}
//	/**
//	 * 多播事件
//	 */
//	export class MulticastEvent {
//		private list: SinglecastEvent[]; // 回调函数列表
//		call(...argArray: any[]): any {
//			return this.apply(argArray);
//		}
//		apply(argArray?: any): void {
//			let len = this.length;
//			if (len == 0)
//				return;
//			// 单播情况的优化
//			if (len == 1) {
//				let f = this.list[0];
//				f.apply(argArray);
//				return;
//			}
//            // 多播调用时必须拷贝一份，避免调用过程中容器修改
//            for (let f of this.list.clone()) {
//				f.apply(argArray);
//			}
//		}
//		/**
//		 * 挂载事件回调
//		 * @param action
//		 * @return 返回挂载的事件回调函数本身，方便lambda挂载结果记录以供移除
//		 */
//		add(action: Function, thisArg?: any): Function {
//			if (action == null)
//				return action;
//			if (this.list == null)
//				this.list = [];
//			this.list.push(new SinglecastEvent(action, thisArg));
//			return action;
//		}
//		/**
//		 * 卸载事件回调
//		 * @param action
//		 * @return 卸载成功，false表示该事件中并不包含给定的回调
//		 */
//		remove(action: Function): boolean {
//			if (typeof action !== "function" || this.list == null)
//				return false;
//			return this.list.removeFirst(i => i.action == action);
//		}
//		/**
//		 * 卸载所有以指定对象作为调用this的回调函数
//		 */
//		removeOn(thisArg: any): number{
//			if (this.list == null)
//				return 0;
//			return this.list.removeAll(i => i.self == thisArg);
//		}
//		/**
//		 * 卸载所有挂载的事件
//		 */
//		removeAll(): void {
//			this.list = null;
//		}
//		/**
//		 * 得到事件中包含的回调数目
//		 */
//		get length(): number {
//			if (this.list == null)
//				return 0;
//			return this.list.length;
//		}
//	}
//}

var uniLib;
(function (uniLib) {
    /**
     * 自定义事件类
     */
    var UserInfoEnum;
    (function (UserInfoEnum) {
        /**
         * 筹码
         */
        UserInfoEnum[UserInfoEnum["CHIPS"] = 0] = "CHIPS";
        /**
         * 体验币
         */
        UserInfoEnum[UserInfoEnum["FREECHIPS"] = 1] = "FREECHIPS";
        /**
         * 第三方货币
         */
        UserInfoEnum[UserInfoEnum["PLAT_POINT"] = 2] = "PLAT_POINT";
        /**
        * 银行存款
        */
        UserInfoEnum[UserInfoEnum["BANK_CHIPS"] = 3] = "BANK_CHIPS";
        /**
        * 昵称
        */
        UserInfoEnum[UserInfoEnum["NICKNAME"] = 4] = "NICKNAME";
        /**
        *
        */
        UserInfoEnum[UserInfoEnum["GIFTCOUPON"] = 5] = "GIFTCOUPON";
        /**
         * 头像
         */
        UserInfoEnum[UserInfoEnum["HEADURL"] = 6] = "HEADURL";
        /**
         * 捕鱼大厅金币
         */
        UserInfoEnum[UserInfoEnum["GOLDCHIPS"] = 7] = "GOLDCHIPS";
        /**
        * 房卡
        */
        UserInfoEnum[UserInfoEnum["FANGKA"] = 8] = "FANGKA";
        /**
         * 钻石
         */
        UserInfoEnum[UserInfoEnum["DIAMOND"] = 9] = "DIAMOND";
    })(UserInfoEnum = uniLib.UserInfoEnum || (uniLib.UserInfoEnum = {}));
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
     * 自定义事件类
     */
    var ZqEvent = /** @class */ (function () {
        function ZqEvent(type, obj, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            /**
             * 舞台大小发生变化
             */
            //public static STAGE_RESIZE: string = "stage_resize";
            this.CLASS_NAME = "ZqEvent";
            //super(type, bubbles, cancelable);
            //if (obj) {
            this.type = type;
            this._obj = obj;
            //}
        }
        ZqEvent.prototype.clone = function (obj) {
            return new ZqEvent(this.type, obj ? obj : this._obj);
        };
        ZqEvent.prototype.toString = function () {
            uniLib.Console.log(this.CLASS_NAME, "type", "bubbles", "cancelable");
        };
        Object.defineProperty(ZqEvent.prototype, "param", {
            /**
             * 传参获取
             * @returns {Object}
             */
            get: function () {
                return this._obj;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 房间聊天事件
         */
        ZqEvent.CHAT_ROOM = "chat_room";
        /**
         * 私聊事件
         */
        ZqEvent.CHAT_PRIVATE = "chat_private";
        /**
         * 系统公告
         */
        ZqEvent.CHAT_SYSTEM = "chat_system";
        /**
         * 系统紧急公告
         */
        ZqEvent.CHAT_IMPORTANT = "chat_important";
        /**
         * 大厅发给房间 通知后台公告
         */
        ZqEvent.EVENT_L2G_NOTICE = "event_l2g_notice";
        /**
         * GM消息
         */
        ZqEvent.CHAT_GM = "chat_gm";
        ZqEvent.GM_BEFORE = "gm_before";
        ZqEvent.GM_END = "gm_end";
        /**
         * 用户喇叭
         */
        ZqEvent.CHAT_HORN = "chat_horn";
        /**
        * 用户信息
        */
        ZqEvent.USER_INFO = "user_info";
        /**
         * 百人长跑马灯
         */
        ZqEvent.CHAT_HUNDRED = "chat_hundred";
        /**
         * 普通场跑马灯
         */
        ZqEvent.CHAT_COMMONGAME = "chat_commongame";
        /**
         * 大厅跑马灯
         */
        ZqEvent.CHAT_LOBBY = "chat_lobby";
        /**
         * 退出游戏 大厅请求刷新用户信息
         */
        ZqEvent.UPDATE_USER_INFO = "update_user_info";
        ZqEvent.CHECK_VERSION_UPDATE = "check_version_update";
        /**
        * 公用模块
        */
        ZqEvent.COMMON_MODEL = "common_model";
        /**
        * 公用模块
        */
        //public static COMMON_EVENT: string = "common_event";
        /**
        * 大厅发送给游戏
        */
        ZqEvent.EVENT_L2G = "event_l2g";
        /**
        * 游戏发送给大厅
        */
        ZqEvent.EVENT_G2L = "event_g2l";
        ZqEvent.EVENT_ACTIVE_SOCKET_CACHE_OK = "on_active_socket_cache_ok";
        ZqEvent.EVENT_SERVER_SHUTDOWN = "on_server_shutdown";
        ZqEvent.EVENT_SERVER_DEBUG_LEVEL = "on_server_debug_level";
        /**
        * GM命令事件
        */
        ZqEvent.GM_INFO = "gm_info";
        ZqEvent.KICK_OUT = "kick_out";
        /**
        * 断线重连成功
        */
        ZqEvent.ON_RECONNEC = "on_reconnect";
        ZqEvent.ON_SERVER_SHUTDOWN = "on_server_shutdown";
        ZqEvent.ON_GETZONEINFO = "on_get_zoneinfo";
        /**
        * 通知重启事件
        */
        ZqEvent.ON_RESTART = "on_restart";
        /**
        * 网络异常
        */
        ZqEvent.NET_ERRER = "net_error";
        ZqEvent.SHARE = "share";
        ZqEvent.TASK_EVENT = "task_event";
        /**
        * 在线用户数量事件
        */
        ZqEvent.ONLINE_NUM = "online_num";
        /*
         * 隐藏左右滑动提示
         */
        ZqEvent.HIDE_SLIP_GAME_GUIDE = "hide_slip_game_guide";
        /**
         * 底层向egret层发送消息事件
         */
        ZqEvent.NATIVE_TO_EGERET = "native_to_egret";
        return ZqEvent;
    }());
    uniLib.ZqEvent = ZqEvent;
})(uniLib || (uniLib = {}));

// 使用方法
//  sp.touchEnabled=true;//开启触点事件
// //单击
// sp.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
//     uniLib.Console.log("我单击了圆",e.stageX,e.stageY);
//     //全局侦听发送消息和自定义事件,这里的自定义事件,也可以自己封装成强类型即可,比如LEvent.MYCIRCLE
//     lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent("mycircle",.1,false));
//     //元件自身发送消息和自定义事件,同上
//     sp.dispatchEvent(new lcp.LEvent("mycircle1",.5));
// },this);
// //当前元件侦听自定义事件获取数据
// sp.addEventListener("mycircle1",(e)=>{
//    uniLib.Console.log(e.param);//自定义事件参数param,可以传入任意对象,然后自行解析即可.
//    sp.y=1000*parseFloat(e.param);
// },this);
// //全局侦听自定义事件获取数据
// uniLib.ZqListener.getInstance().addEventListener("mycircle",(e)=>{
//     uniLib.Console.log(e.param);//同上
//     sp.alpha=parseFloat(e.param);
// },this);
var uniLib;
(function (uniLib) {
    /**
     * 全局侦听类及消息处理
     */
    var ZqListener = /** @class */ (function () {
        function ZqListener() {
            this.CLASS_NAME = "ZqListener";
            this.isInit = false;
            if (this.isInit) {
                //                egret.Logger.warning("不可以实例化"+this.CLASS_NAME+"类,请实例Lcp."+this.CLASS_NAME+".getInstance()开始");
            }
            if (this._dispatcher == null) {
                this._dispatcher = new uniLib.Dispatcher();
                this.isInit = true;
            }
        }
        ZqListener.getInstance = function () {
            if (this._instance == null)
                this._instance = new ZqListener();
            return this._instance;
        };
        ZqListener.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            this._dispatcher.addListener(type, listener, thisObject);
        };
        ZqListener.prototype.hasEventListener = function (type) {
            return this._dispatcher.hasListener(type);
        };
        ZqListener.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this._dispatcher.removeListener(type, listener, thisObject);
        };
        //public hasEventListener(type: string): boolean {
        //    return this._dispatcher.hasEventListener(type);
        //}
        //public willTrigger(type: string): boolean {
        //    return this._dispatcher.willTrigger(type);
        //}
        ZqListener.prototype.dispatchEvent = function (event) {
            return this._dispatcher.dispatch(event.type, event);
        };
        ZqListener.prototype.toString = function () {
            return this._dispatcher.toString();
        };
        return ZqListener;
    }());
    uniLib.ZqListener = ZqListener;
})(uniLib || (uniLib = {}));



var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var RoomInfo = /** @class */ (function () {
        function RoomInfo() {
        }
        return RoomInfo;
    }());
    uniLib.RoomInfo = RoomInfo;
    var IGameConfig = /** @class */ (function (_super) {
        __extends(IGameConfig, _super);
        function IGameConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 是否显示返回按钮
             */
            _this.showBack = true;
            /**
            * 游戏默认朝向
            */
            _this.defaultOrientation = "auto";
            /**
             * 游戏是否为横屏模式
             */
            _this.isLandscape = true;
            /**
             * 自动隐藏加载loading
             */
            _this.preloadUIAutoHide = true;
            /**
             * 退出时需要销毁的资源
             */
            _this.candestroyGrps = [];
            /**
            * 是否体验币模式 true有体验币 false无体验币
            */
            _this.hasTestChips = false;
            return _this;
        }
        return IGameConfig;
    }(uniLib.Reflect));
    uniLib.IGameConfig = IGameConfig;
})(uniLib || (uniLib = {}));









var uniLib;
(function (uniLib) {
    var IUserInfo = /** @class */ (function () {
        function IUserInfo() {
        }
        return IUserInfo;
    }());
    uniLib.IUserInfo = IUserInfo;
})(uniLib || (uniLib = {}));


var uniLib;
(function (uniLib) {
    var CommonModelMgr = /** @class */ (function () {
        function CommonModelMgr() {
            this._models = {};
        }
        Object.defineProperty(CommonModelMgr, "Instance", {
            get: function () {
                if (this._self == null) {
                    this._self = new CommonModelMgr();
                }
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        CommonModelMgr.prototype.addEvents = function () {
            //uniLib.Global.addEventListener(uniLib.ZqEvent.COMMON_MODEL, this.onCommonMode, this);
        };
        CommonModelMgr.prototype.registerCommonModel = function (modelId, model, loadGroupName) {
            if (this._models[modelId] == null) {
                this._models[modelId] = model;
                this._models["loadName_" + modelId] = loadGroupName;
            }
            else {
                uniLib.Console.warn("registerCommonModel:公用模块只能注册一次");
            }
        };
        CommonModelMgr.prototype.openCommonModel = function (modelId, openType, param, openFunc, thisObj) {
            if (openType === void 0) { openType = 0; }
            var md;
            if (!this._models[modelId])
                return;
            var self = this;
            function openModel() {
                if (openFunc) {
                    //自定义打开方式
                    md = new self._models[modelId](param);
                    openFunc.call(thisObj, md);
                }
                else {
                    if (openType == 0) {
                        md = new self._models[modelId](param);
                        uniLib.PopUpMgr.addPopUp(md, null, true, true);
                    }
                    else {
                        uniLib.UIMgr.instance.showUI(self._models[modelId], param);
                    }
                }
            }
            if (this._models["loadName_" + modelId]) {
                uniLib.ResLoadMgr.instance.load(this._models["loadName_" + modelId], openModel, function () { uniLib.Console.error("加载资源组失败:" + "loadName_" + modelId); }, null, uniLib.UIMgr.instance.tipsLoadUI, true, true);
            }
            else
                openModel();
            return md;
        };
        CommonModelMgr.prototype.showCommonUI = function (UIId, data) {
            if (!this._models[UIId])
                return;
            return uniLib.UIMgr.instance.showUI(this._models[UIId], data);
        };
        CommonModelMgr.prototype.getCommonUI = function (UIId, data) {
            if (!this._models[UIId])
                return;
            var obj = new this._models[UIId](data);
            return obj;
        };
        CommonModelMgr._self = null;
        return CommonModelMgr;
    }());
    uniLib.CommonModelMgr = CommonModelMgr;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
    * 网络管理
    */
    var NetMgr = /** @class */ (function () {
        function NetMgr() {
        }
        /**
         * 查询游戏区列表
         * @method uniLib.NetMgr.init
         * @param url {string} 登陆URL
         * @param gameID {Number} 游戏ID
         * @param zoneId {Number} 区服ID
         * @param onGetZoneList {Function} 登陆成功回调
         * @param onGetZoneListError {Function} 登陆失败回调
         * @param thisObj  当前对象。永远都this
         */
        NetMgr.reQuestZoneList = function (gameID, url, onGetZoneList, onGetZoneListError, thisObj) {
            if (this.http) {
                this.http.requestZoneList(gameID, onGetZoneList, thisObj);
            }
            else {
                var rq = new uniLib.HttpClient();
                rq.init(url, gameID);
                rq.requestZoneList(gameID, onGetZoneList, thisObj);
            }
        };
        //private _platLoginSucc: Function;
        //private _platLoginFail: Function;
        //private _platLoginObj: any;
        /**
         * 初始化平台网络连接
         * @method uniLib.NetMgr.init
         * @param url {string} 登陆URL
         * @param gameID {number} 游戏ID
         * @param zoneId {number} 区服ID null:自动选区 -1:不自动选区
         * 后续参数可选,推荐先初始化再使用h5platLogin进行登录
         * @param callBack {function} 登陆成功回调
         * @param loginFail {function} 登陆失败回调
         * @param thisObj  当前对象。永远都this
         */
        NetMgr.init = function (url, gameID, zoneId, callBack, loginFail, thisObj, gateway) {
            this.LoginUrl = url;
            if (gameID)
                uniLib.Global.gameId = gameID;
            if (gameID && uniLib.Global.zoneList) {
                for (var i = uniLib.Global.zoneList.length - 1; i >= 0; i--) {
                    if (gameID == uniLib.Global.zoneList[i].gameid)
                        zoneId = uniLib.Global.zoneList[i].zoneid;
                }
            }
            if (uniLib.Global.lobbyGameId == 0) {
                uniLib.Global.lobbyGameId = gameID;
            }
            if (this.http == null || this.LoginUrl != this.http.LoginUrl) {
                this.http = new uniLib.HttpClient();
                this.http.init(url, gameID, zoneId);
                if (gateway) {
                    this.http.GatewayUrl = gateway;
                }
                if (callBack && callBack != null) {
                    this.http.h5platLogin(null, callBack, loginFail, thisObj);
                }
            }
            else {
                if (callBack)
                    callBack.call(thisObj, uniLib.Global.platInfo);
            }
            //if (Global.gameId == 0) {
            //}
        };
        /**
         * 获取是否已经有token本地数据, TODO:待加入zoneid信息到token的获取
         * @param onGetToken
         * @param thisObj
         * @param platid
         * @param gameId
         * @param zoneid
         */
        NetMgr.getPlatToken = function (onGetToken, thisObj, platid, gameId, zoneid) {
            uniLib.Utils.getLocalStorage(gameId + "|" + platid + "|platToken", function (data) {
                var info;
                Pmd.PlatInfo;
                if (data) {
                    info = JSON.parse(data);
                    NetMgr.UID = Number(info.uid);
                    if (info.account)
                        if (info.account) {
                            NetMgr.PlatUID = info.account;
                        }
                        else {
                            NetMgr.PlatUID = info.uid;
                        }
                    uniLib.BrowersUtils.extData.inviter = NetMgr.UID.toString();
                    NetMgr.SID = info.sid;
                    if (info.GatewayUrl) {
                        if (NetMgr.http)
                            NetMgr.http.GatewayUrl = info.GatewayUrl;
                    }
                    NetMgr.PlatToken = info.unigame_plat_login;
                    NetMgr.PlatKey = info.unigame_plat_key;
                    NetMgr.platTokenTimeOut = info.unigame_plat_login_life;
                    if (info.platinfo != null) {
                        if (uniLib.Global.platInfo) {
                            uniLib.Global.platInfo.platid = info.platinfo.platid;
                        }
                        else {
                            uniLib.Global.platId = info.platinfo.platid;
                        }
                        if (info.platinfo.account) {
                            NetMgr.PlatUID = info.platinfo.account;
                        }
                        else {
                            NetMgr.PlatUID = info.platinfo.uid;
                        }
                        NetMgr.PlatSession = info.platinfo.sign;
                    }
                }
                onGetToken.call(thisObj, info);
            });
        };
        /**
         * 登录游戏
         * @param zoneId
         * @param callBack
         * @param loginFail
         * @param thisObj
         */
        NetMgr.h5platLogin = function (zoneId, callBack, loginFail, thisObj) {
            if (this.http) {
                this.http.h5platLogin(zoneId, callBack, loginFail, thisObj);
            }
            else {
                uniLib.Console.warn("请先使用NetMgr.init初始化网络模块!");
            }
        };
        /**
         * 初始化平台socket连接
         * @method uniLib.NetMgr.initSocket
         * @param onLogin {Function} 连接ws成功回调
         * @param onLoginFail {Function} 连接ws失败回调
         * @param chatMessage {Function} 聊天消息接收函数
         * @param thisObj  当前对象。永远都this
         * @param compress  数据压缩类型,当前支持3种:CompressUtils.FLATE, CompressUtils.GZIP, CompressUtils.ZLIB
         * @param encrypt 数据加密类型,当前支持2种：aes
         */
        NetMgr.initSocket = function (onLogin, onLoginFail, thisObj, compress, encrypt, encryptKey, islobby, reconnect_seq, gatewayurl) {
            if (islobby === void 0) { islobby = false; }
            if (reconnect_seq === void 0) { reconnect_seq = false; }
            var self = this;
            if (this.ws == null) {
                if (thisObj.loopback) {
                    self.ws = new uniLib.JsonSocket(null, self.http.GameID, 0, false); // TODO: 这里不应该由客户端来调整url
                    self.ws.login(onLogin, null, thisObj);
                    onLogin.call(thisObj);
                    return;
                }
                var loginRoomCallBack = function (rev) {
                    if (rev == null) {
                        uniLib.Console.warn("initSocket:网络请求失败,请检查网络");
                        if (onLoginFail) {
                            onLoginFail.call(thisObj);
                        }
                        return true;
                    }
                    //this.WSURL = rev.gatewayurl + "/json";
                    uniLib.Global.logintempid = rev.logintempid;
                    if (uniLib.Global.LobbyPlatInfo && (!gatewayurl || gatewayurl == "")) {
                        //gatewayurl如果指定,说明是临时房间用的代理,不能存档
                        uniLib.Global.LobbyPlatInfo.GatewayUrlWs = rev.jsongatewayurl;
                    }
                    self.ws = new uniLib.JsonSocket(rev.jsongatewayurl, self.http.GameID, self.http.ZoneID, islobby); // TODO: 这里不应该由客户端来调整url
                    var cmd;
                    cmd = new Pmd.UserLoginTokenLoginUserPmd_C();
                    cmd.gameid = self.http.GameID;
                    cmd.zoneid = self.http.ZoneID;
                    cmd.accountid = rev.accountid;
                    cmd.logintempid = rev.logintempid;
                    if (uniLib.Global.zipmd5)
                        cmd.zipmd5 = uniLib.Global.zipmd5;
                    if (uniLib.Global.configmd5)
                        cmd.configmd5 = uniLib.Global.configmd5;
                    if (uniLib.Global.bundleId)
                        cmd.bundlename = uniLib.Global.bundleId;
                    cmd.timestamp = Math.floor(Date.now() / 1000);
                    if (reconnect_seq) {
                        cmd.lastseq = 0xFFFFFFFF;
                    }
                    //cmd.tokenmd5 = "xyz";//GX.MD5(String(cmd.accountid) + String(cmd.logintempid) + String(cmd.timestamp) + String(cmd.timestamp))
                    if (NetMgr.PlatKey == null) {
                        NetMgr.PlatKey = "";
                    }
                    //cmd.tokenmd5 = "fdsfadsfdsfdsafadsf";
                    cmd.tokenmd5 = "" + uniLib.StringUtils.MD5(String(cmd.accountid) + String(cmd.logintempid) + String(cmd.timestamp) + NetMgr.PlatKey);
                    //if (uniLib.Global.isH5) {
                    cmd.compress = uniLib.CompressUtil.compressStr[uniLib.Global.compressType];
                    if (uniLib.Global.compressMin > 0)
                        cmd.compressmin = uniLib.Global.compressMin;
                    cmd.version = 20160805;
                    //    cmd.encrypt = "aes";
                    //    cmd.encryptkey = "xyz";
                    //}
                    //uniLib.Console.log(cmd);
                    cmd.url = rev.jsongatewayurl;
                    self.ws.loginData = cmd;
                    self.ws.login(onLogin, onLoginFail, thisObj);
                    //ws.send(cmd);
                    return true;
                };
                if (uniLib.Global.LobbyPlatInfo && (uniLib.Global.LobbyPlatInfo.GatewayUrlWs || (gatewayurl && gatewayurl != ""))) {
                    var rev = new Pmd.WebSocketForwardUserPmd_S();
                    rev.accountid = Number(NetMgr.UID);
                    rev.logintempid = uniLib.Global.logintempid ? uniLib.Global.logintempid : 0;
                    if (gatewayurl && gatewayurl != "") {
                        rev.jsongatewayurl = gatewayurl;
                    }
                    else {
                        rev.jsongatewayurl = uniLib.Global.LobbyPlatInfo.GatewayUrlWs;
                    }
                    loginRoomCallBack(rev);
                }
                else {
                    var loginroom = new Pmd.WebSocketForwardUserPmd_C();
                    loginroom.accountid = Number(NetMgr.UID);
                    this.httpSend(loginroom, function (rev) { return loginRoomCallBack(rev); });
                }
            }
        };
        /**
         * 用户第三方平台uid
         */
        NetMgr.getThirdPlatId = function () {
            return NetMgr.PlatUID;
        };
        NetMgr.getIp = function (onGet, thisObj, url) {
            var req = new uniLib.HttpRequest(onGet, null, thisObj);
            if (url) {
            }
            else {
                url = uniLib.Global.ipUrl;
            }
            req.open(url);
            req.send();
        };
        NetMgr.post = function (url, onBack, thisObj) {
            var req = new uniLib.HttpRequest(onBack, null, thisObj);
            req.open(url);
            req.send();
        };
        /**
         * 登出
         */
        NetMgr.logout = function () {
            //if (Global.LoginScene && Global.LoginScene != null) {
            // if (this.http) {
            uniLib.Utils.clearLocalStorage(uniLib.Global.gameId + "|" + uniLib.Global.getPlatId() + "|platToken");
            // }
            this.UID = 0;
            this.ZoneUID = "";
            this.SID = "";
            this.PlatUID = "";
            this.PlatSession = "";
            this.PlatToken = "";
            this.PlatKey = "";
            this.platTokenTimeOut = 0;
            this.http = null;
            this.closeSocket();
            NetMgr.UID = 0;
            NetMgr.ZoneUID = "";
            NetMgr.SID = "";
            NetMgr.PlatUID = "";
            NetMgr.PlatSession = "";
            NetMgr.PlatToken = "";
            NetMgr.PlatKey = "";
            NetMgr.platTokenTimeOut = 0;
            NetMgr.http = null;
            NetMgr.closeSocket();
            uniLib.Global.platInfo = null;
            uniLib.Global.LobbyPlatInfo = null;
            if (uniLib["SceneMgr"] && uniLib.Global.LoginScene)
                uniLib["SceneMgr"].instance.changeScene(uniLib.Global.LoginScene);
            //}
        };
        /**
         * 断开socket连接
         */
        NetMgr.closeSocket = function (b) {
            if (b === void 0) { b = false; }
            if (this.ws) {
                this.ws.close(b);
                this.ws = null;
            }
        };
        /**
         * 发送短连接消息
         * @method uniLib.NetMgr.httpSend
         * @param msg {any} 消息内容
         * @param callback {function} 发送消息回调
         * @param compress {function} 数据压缩方式
         */
        NetMgr.httpSend = function (msg, callback, compress) {
            if (this.http) {
                this.http.send(msg, callback, compress);
            }
            else {
                uniLib.Console.warn("httpSend:网络不可用,请检查网络");
            }
        };
        /**
         * 发送长连接消息
         * @method uniLib.NetMgr.tcpSend
         * @param msg {any} 消息内容
         */
        NetMgr.tcpSend = function (msg) {
            if (this.ws) {
                var type = msg["GetType"] ? msg["GetType"]() : (msg["cmd_name"] || msg["do"]);
                if (type != "Pmd.UserLoginTokenLoginUserPmd_C" &&
                    type != "Pmd.TickReturnNullUserPmd_CS" &&
                    type != "Pmd.PrivateChatUserPmd_CS" &&
                    type != "Pmd.GMCommandListChatUserPmd_S" &&
                    type != "Pmd.UserLoginReconnectLoginUserPmd_C" &&
                    type != "Pmd.SetTickTimeoutNullUserPmd_CS" &&
                    type != "Pmd.CommonChatUserPmd_CS" &&
                    type != "Pmd.GMCommandChatUserPmd_C") {
                    this.ws.send(msg);
                }
                else {
                    this.ws.sendPlat(msg);
                }
            }
            else {
                uniLib.Utils.restart("网络不可用,点击确定重试", "确定");
                uniLib.Console.warn("tcpSend:网络不可用,请检查网络:" + JSON.stringify(msg));
            }
        };
        NetMgr.sendEcho = function (sec) {
            if (sec === void 0) { sec = 8; }
            if (this.ws) {
                if (this.ws.setMsgTimeout(sec, "")) {
                    this.ws.sendEcho();
                }
            }
        };
        NetMgr.setTickSec = function (sec) {
            if (sec === void 0) { sec = 30; }
            if (this.ws) {
                this.ws.setTickSec(sec);
            }
        };
        NetMgr.sendChatVo = function (chat, pos) {
            if (pos === void 0) { pos = Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Normal; }
            var msg;
            switch (pos) {
                case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Normal:
                case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_None:
                    msg = new Pmd.CommonChatUserPmd_CS();
                    msg.info = chat.msg;
                    msg.chatpos = pos;
                    msg.name = name;
                    break;
                case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Private:
                    msg = new Pmd.PrivateChatUserPmd_CS();
                    msg.info = chat.msg;
                    msg.id = chat.userId;
                    msg.name = chat.userName;
                    break;
                default:
                    msg = new Pmd.CommonChatUserPmd_CS();
                    msg.info = chat.msg;
                    msg.chatpos = pos;
                    break;
            }
            this.tcpSend(msg);
        };
        /**
         * 发送聊天消息
         * @method uniLib.NetMgr.sendChat
         * @param txt {string} 聊天内容
         * @param name {显示名称} 聊天内容
         * @param pos {聊天位置} 公聊 私聊等
         */
        NetMgr.sendChat = function (txt, name, pos) {
            if (pos === void 0) { pos = Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Normal; }
            try {
                var uid = 0;
                if (txt.match(/^[//]/)) {
                    var str = txt.substring(2, txt.length);
                    var arr = str.split(" ");
                    var gmsg = new Pmd.GMCommandChatUserPmd_C();
                    gmsg.method = gmsg.method = str.substring(0, str.indexOf(" ") > -1 ? str.indexOf(" ") : str.length);
                    gmsg.params = uniLib.StringUtils.sTrim(str.substring(str.indexOf(" "), str.length));
                    //if (gmsg.method == "peer") {
                    //    var puid: string = gmsg.params.split("=")[1];
                    //    uniLib.UserInfo.uid = Number(puid);
                    //}
                    var func;
                    switch (gmsg.method) {
                        case "peer":
                            var params = uniLib.StringUtils.getVariables(gmsg.params);
                            if (uniLib["UserInfo"])
                                uniLib["UserInfo"].uid = Number(params.id);
                            break;
                        case "gm":
                            break;
                        case "help":
                            break;
                    }
                    func = uniLib.getDefinitionByName("uniLib.GM_Before");
                    if (func) {
                        try {
                            func(gmsg, function () {
                                NetMgr.tcpSend(gmsg);
                            });
                        }
                        catch (e) {
                        }
                    }
                    else {
                        NetMgr.tcpSend(gmsg);
                    }
                    //this.tcpSend(gmsg);
                }
                else {
                    if (txt.match(/^\[.+\]:/)) {
                        uid = Number(txt.substring(0, txt.indexOf(":")).slice(1, -1));
                        txt = txt.substring(txt.indexOf(":") + 1, txt.length);
                    }
                    var msg;
                    if (uid != 0) {
                        msg = new Pmd.PrivateChatUserPmd_CS();
                        msg.info = txt;
                        msg.id = uid;
                        msg.name = name;
                    }
                    else {
                        msg = new Pmd.CommonChatUserPmd_CS();
                        msg.info = txt;
                        msg.chatpos = pos;
                        msg.name = name;
                    }
                    this.tcpSend(msg);
                }
            }
            catch (e) {
                uniLib.Console.warn("ws网络不可用,请检查网络");
            }
        };
        /**
         * 获取手机注册验证码
         * @param tel
         * @param randcode
         * @param callBack
         * @param thisObj
         * @param url
         */
        NetMgr.GetPhoneCode = function (tel, randcode, callBack, thisObj, url) {
            //var htp: HttpClient = new HttpClient();
            var msg = new Pmd.MobileRegistRequestRandCodeLoginUserPmd_C();
            var type = msg["GetType"] ? msg["GetType"]() : (msg["cmd_name"] || msg["do"]);
            msg.mobilenum = tel;
            msg.gameid = this.http.GameID;
            var sdurl = url ? url : this.http.LoginUrl;
            this.http.sendTo(sdurl, type, msg, callBack);
            //var _resq = new HttpRequest(callBack, null, thisObj);
            //_resq.open(url);
            //_resq.send(JSON.stringify(msg));
        };
        /**
         * 手机验证码快速注册登录
         * @param tel
         * @param code
         * @param password
         * @param callBack
         * @param loginfail
         * @param thisObj
         * @param url
         * @param opType 0：注册 1:重置
         */
        NetMgr.CodeLogin = function (tel, code, password, parent, opType, callBack, loginfail, thisObj, url) {
            if (opType === void 0) { opType = 0; }
            //var htp: HttpClient = new HttpClient();
            var self = this;
            var msg = new Pmd.MobileRegistRequestCreateAccountLoginUserPmd_C();
            msg.mobilenum = tel;
            msg.randcode = code;
            msg.password = password;
            msg.optype = opType;
            if (parent) {
                msg.parent = parent;
            }
            this.http.initCallBack(callBack, loginfail, thisObj);
            var sdurl = url ? url : this.http.LoginUrl;
            this.http.sendTo(sdurl, msg.GetType(), msg, function (response) {
                self.http.cachePhoneLoginInfo(response, Pmd.PlatType.PlatType_MOBILE);
                self.http.h5platLogin();
                return true;
            });
        };
        /**
         * email快速注册登录
         */
        NetMgr.emailLogin = function (email, password, invitees, tel, callBack, loginfail, thisObj, url) {
            var self = this;
            var msg = new Pmd.EmailRegistRequestCreateAccountLoginUserPmd_C();
            msg.email = email;
            msg.parent = invitees;
            msg.password = password;
            msg.mobilenum = tel;
            this.http.initCallBack(callBack, loginfail, thisObj);
            uniLib.Utils.clearLocalStorage(this.http.GameID + "|" + 128 + "|platToken");
            var sdurl = url ? url : this.http.LoginUrl;
            this.http.sendTo(sdurl, msg.GetType(), msg, function (response) {
                if (response) {
                    self.http.cachePhoneLoginInfo(response, 128);
                    self.http.h5platLogin();
                    return true;
                }
                else {
                    return loginfail(response);
                }
            });
        };
        /**
         * 通过手机号登录
         * @param tel
         * @param pass
         * @param callBack
         * @param loginfail
         * @param thisObj
         * @param url
         */
        NetMgr.LoginByTel = function (tel, pass, callBack, loginfail, thisObj, url) {
            var self = this;
            var msg = new Pmd.UserRequestPlatTokenByPasswordLoginUserPmd_C();
            msg.platid = 129;
            msg.gameid = this.http.GameID;
            msg.account = tel;
            msg.password = pass;
            this.http.initCallBack(callBack, loginfail, thisObj);
            uniLib.Utils.clearLocalStorage(this.http.GameID + "|" + 129 + "|platToken");
            var sdurl = url ? url : this.http.LoginUrl;
            this.http.sendTo(sdurl, msg.GetType(), msg, function (response) {
                if (response) {
                    self.http.cachePhoneLoginInfo(response, msg.platid);
                    self.http.h5platLogin();
                    return true;
                }
            });
        };
        /**
         * 通过邮箱登录
         * @param tel
         * @param pass
         * @param callBack
         * @param loginfail
         * @param thisObj
         * @param url
         */
        NetMgr.LoginByEmail = function (account, pass, callBack, loginfail, thisObj, url) {
            var self = this;
            var msg = new Pmd.UserRequestPlatTokenByPasswordLoginUserPmd_C();
            msg.platid = 128;
            msg.gameid = this.http.GameID;
            msg.account = account;
            msg.password = pass;
            this.http.initCallBack(callBack, loginfail, thisObj);
            uniLib.Utils.clearLocalStorage(this.http.GameID + "|" + 128 + "|platToken");
            var sdurl = url ? url : this.http.LoginUrl;
            this.http.sendTo(sdurl, msg.GetType(), msg, function (response) {
                self.http.cachePhoneLoginInfo(response, msg.platid);
                self.http.h5platLogin();
                return true;
            });
        };
        NetMgr.clearGateWay = function () {
            if (uniLib.Global.LobbyPlatInfo.GatewayUrl) {
                delete uniLib.Global.LobbyPlatInfo.GatewayUrl;
            }
            if (uniLib.Global.LobbyPlatInfo.GatewayUrlWs) {
                delete uniLib.Global.LobbyPlatInfo.GatewayUrlWs;
            }
            var info = uniLib.Utils.getLocalStorage(uniLib.Global.lobbyGameId + "|" + uniLib.Global.getPlatId() + "|platToken");
            if (info) {
                if (info.GatewayUrlWs) {
                    delete info.GatewayUrlWs;
                }
                if (info.GatewayUrl) {
                    delete info.GatewayUrl;
                }
                uniLib.Global.setPlatToken(info, uniLib.Global.getPlatId(), uniLib.Global.lobbyGameId);
                // Utils.setLocalStorage(Global.lobbyGameId + "|" + Global.getPlatId() + "|platToken", JSON.stringify(info));
            }
        };
        /**
         * 兼容邮箱手机登录
         */
        NetMgr.LoginByAccount = function (account, pass, callBack, loginfail, thisObj, url) {
            var self = this;
            var msg = new Pmd.UserRequestPlatTokenByPasswordLoginUserPmd_C();
            msg.platid = Pmd.PlatType.PlatType_MOBILE;
            //var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (uniLib.StringUtils.checkPhone(account)) {
                msg.platid = Pmd.PlatType.PlatType_MOBILE;
            }
            else {
                msg.platid = 128;
            }
            msg.gameid = this.http.GameID;
            msg.account = account;
            msg.password = pass;
            uniLib.Utils.clearLocalStorage(this.http.GameID + "|" + 128 + "|platToken");
            this.http.initCallBack(callBack, loginfail, thisObj);
            var sdurl = url ? url : this.http.LoginUrl;
            this.http.sendTo(sdurl, msg.GetType(), msg, function (response) {
                if (response) {
                    self.http.cachePhoneLoginInfo(response, msg.platid);
                    self.http.h5platLogin();
                    return true;
                }
                else {
                    if (loginfail) {
                        loginfail.call(thisObj);
                    }
                }
            });
        };
        /**
         * 账号绑定
         * @param account
         * @param pass
         * @param callBack
         * @param loginfail
         * @param thisObj
         * @param url
         */
        NetMgr.bindAccount = function (account, pass, callBack, loginfail, thisObj, url) {
            var self = this;
            var msg = new Pmd.EmailRegistRequestCreateAccountLoginUserPmd_C();
            msg.email = account;
            msg.password = pass;
            msg.isbind = true;
            msg.uid = this.UID;
            var sdurl = url ? url : this.http.LoginUrl;
            this.http.sendTo(sdurl, msg.GetType(), msg, function (response) {
                if (response.retcode == 0) {
                    callBack.call(thisObj);
                }
                else {
                    loginfail.call(thisObj);
                }
                //self.http.cachePhoneLoginInfo(response);
                //self.http.h5platLogin();
                return true;
            });
        };
        NetMgr.accountLogin = function (account, pass, callBack, loginfail, thisObj, url) {
            var self = this;
            var msg = new Pmd.UserRequestPlatTokenByPasswordLoginUserPmd_C();
            msg.platid = 128;
            msg.gameid = this.http.GameID;
            msg.account = account;
            msg.password = pass;
            uniLib.Utils.clearLocalStorage(this.http.GameID + "|" + 128 + "|platToken");
            this.http.initCallBack(callBack, loginfail, thisObj);
            var sdurl = url ? url : this.http.LoginUrl;
            this.http.sendTo(sdurl, msg.GetType(), msg, function (response) {
                self.http.cachePhoneLoginInfo(response, msg.platid);
                self.http.h5platLogin();
                return true;
            });
        };
        NetMgr.checkMsgTimeout = function (msec) {
            if (this.ws != null) {
                return new Date().getTime() - this.ws.lastRecvTime >= msec;
            }
            return true;
        };
        NetMgr.setMsgTimeout = function (sec, msg) {
            if (this.ws != null) {
                return this.ws.setMsgTimeout(sec, msg);
            }
            return false;
        };
        /**
         * 获取token
         */
        NetMgr.getToken = function (gameId) {
            var token;
            var lastLoginPlat = Number(uniLib.Utils.getLocalStorage(CommonConsts.UNI_LAST_PLAT_INFO));
            if (!gameId && uniLib.Global.gameConfig) {
                gameId = uniLib.Global.gameConfig.gameid;
            }
            if (lastLoginPlat >= 0) {
                var tokenData = uniLib.Utils.getCachedPlatInfo(null, gameId, lastLoginPlat);
                if (tokenData) {
                    token = JSON.parse(tokenData);
                    uniLib.Global.initPlatInfo(token.platinfo);
                }
            }
            return token;
        };
        return NetMgr;
    }());
    uniLib.NetMgr = NetMgr;
    var ChatMsgItemVo = /** @class */ (function () {
        function ChatMsgItemVo() {
            this.userId = "";
            this.type = 0;
            this.userName = "";
        }
        return ChatMsgItemVo;
    }());
    uniLib.ChatMsgItemVo = ChatMsgItemVo;
})(uniLib || (uniLib = {}));

/// <reference path="../../3party/includes/pay.d.ts" />
var uniLib;
(function (uniLib) {
    /**
    * 支付管理
    */
    var PayMgr = /** @class */ (function () {
        function PayMgr() {
        }
        Object.defineProperty(PayMgr, "Instance", {
            get: function () {
                if (this._self == null) {
                    this._self = new PayMgr();
                    //this._self.initJsByPlatId(Global.platId);
                }
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化支付平台
         * @param platId {number} 支付平台ID
         * @param callBack {Function} 初始化成功回调
         * @param thisObj  当前对象。永远都this
         */
        PayMgr.prototype.initPayPlatById = function (platId, callBack, thisObj) {
            var self = this;
            if (this.isOpen == false)
                return;
            if (!platId || platId == null) {
                platId = uniLib.Global.platInfo.platid;
            }
            if (uniLib.Global.isH5) {
                switch (platId) {
                    // case Pmd.PlatType.PlatType_Normal:
                    case Pmd.PlatType.PlatType_AiBei:
                    case Pmd.PlatType.PlatType_LeZhuan:
                        uniLib.BrowersUtils.LoadJS("aibei", uniLib.BrowersUtils.getPlatLibDir() + "aibei_v1.1.0.js" /*, callBack, thisObj*/);
                        if (callBack != null) {
                            if (thisObj)
                                callBack.call(thisObj, platId);
                            else
                                callBack(platId);
                        }
                        break;
                    case Pmd.PlatType.PlatType_Play68:
                        uniLib.BrowersUtils.LoadJS("play68", uniLib.BrowersUtils.getPlatLibDir() + "play68_sdk.js", callBack, thisObj);
                        break;
                    case Pmd.PlatType.PlatType_WeChat:
                        uniLib.BrowersUtils.LoadJS("weixin", uniLib.BrowersUtils.getPlatLibDir() + "weixinapi.min.js", function () {
                            self.initWechat(callBack, thisObj);
                        });
                        break;
                    case Pmd.PlatType.PlatType_WEIYOU:
                        uniLib.Global.appId = "wxa569805aa50c7fa7";
                        uniLib.BrowersUtils.LoadJS("weixin", uniLib.BrowersUtils.getPlatLibDir() + "weixinapi.min.js", function () {
                            self.initWechat(callBack, thisObj);
                        });
                        break;
                    case Pmd.PlatType.PlatType_RONGQIANG:
                        uniLib.Global.appId = "wx463fb53ff525bbaa";
                        uniLib.BrowersUtils.LoadJS("weixin", uniLib.BrowersUtils.getPlatLibDir() + "weixinapi.min.js", function () {
                            self.initWechat(callBack, thisObj);
                        });
                        break;
                    case Pmd.PlatType.PlatType_DAPAI:
                        uniLib.BrowersUtils.LoadJS("dapai", uniLib.BrowersUtils.getPlatLibDir() + "dapaisdk.js", callBack, thisObj);
                        break;
                    case Pmd.PlatType.PlatType_AoXin:
                        uniLib.BrowersUtils.LoadJS("aoxin", "http://libs.baidu.com/jquery/1.10.2/jquery.min.js", function () {
                            uniLib.BrowersUtils.LoadJS("aoxin", "http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function () {
                                uniLib.BrowersUtils.LoadJS("aoxin", uniLib.BrowersUtils.getPlatLibDir() + "aoxinShare.js", callBack, thisObj);
                            });
                        });
                        break;
                    case Pmd.PlatType.PlatType_HUOSU:
                        uniLib.BrowersUtils.LoadJS("huosu", "http://yun.huosu.com/src/api/js/huosuh5sdk.js", function () {
                            if (thisObj)
                                callBack.call(thisObj, platId);
                            else
                                callBack(platId);
                        }, thisObj);
                        break;
                    case Pmd.PlatType.PlatType_Egret:
                        uniLib.BrowersUtils.LoadJS("nest", uniLib.BrowersUtils.getPlatLibDir() + "nest.min.js", function () {
                            if (thisObj)
                                callBack.call(thisObj, platId);
                            else
                                callBack(platId);
                        }, thisObj);
                        break;
                    case Pmd.PlatType.PlatType_9g:
                        window.parent.postMessage({
                            action: "share",
                            data: {},
                            imgurl: uniLib.Global.shareData.imgUrl,
                            title: uniLib.Global.shareData.title,
                            content: uniLib.Global.shareData.desc
                        }, "*");
                        break;
                    // case Pmd.PlatType.PlaType_59Game:
                    //     BrowersUtils.LoadJS("game59", "http://m.59yx.com/Public/jssdk/js/jssdk.js", function () {
                    //         if (thisObj)
                    //             callBack.call(thisObj, platId);
                    //         else
                    //             callBack(platId);
                    //     }, thisObj);
                    //     break;
                    default:
                        if (callBack != null) {
                            if (thisObj)
                                callBack.call(thisObj, platId);
                            else
                                callBack(platId);
                        }
                        break;
                }
            }
        };
        PayMgr.prototype.initWechat = function (callBack, thisObj) {
            if (uniLib.Global.shareData == null)
                return;
            var url = "http://weixin.zqgame.com/GetJsSdkTicket?appid=" + uniLib.Global.appId + "&url=" + encodeURIComponent(location.href.split("#")[0]);
            var _xhr = uniLib.BrowersUtils.getXHR();
            _xhr.open("GET", url, true);
            _xhr.setRequestHeader("Content-Type", "multipart/form-data");
            _xhr.responseType = "text";
            _xhr.send();
            var self = this;
            _xhr.onreadystatechange = function () {
                if (_xhr.readyState == 4) {
                    var ioError = (_xhr.status >= 400 || _xhr.status == 0);
                    if (ioError) {
                        //alert("微信签名加载失败:" + ioError);
                    }
                    else {
                        if (_xhr.responseText.length > 0) {
                            self.initWechatInfo(_xhr.responseText, callBack, thisObj);
                        }
                    }
                }
            };
            //var self = this;
            //var reqst: HttpRequest = new HttpRequest(function (data) {
            //    self.initWechatInfo(data, callBack, thisObj);
            //});
            //var url: string = "http://weixin.zqgame.com/GetJsSdkTicket?appid=" + Global.wechatAppId + "&url=" + encodeURIComponent(location.href.split("#")[0]);
            //reqst.open(url);
            //reqst.send();
        };
        PayMgr.prototype.initWechatInfo = function (signTxt, callBack, thisObj) {
            try {
                this.signPackage = JSON.parse(signTxt);
                //基本配置
                this.getWeiXinConfig();
                wx.ready(function () {
                    //                window["WeixinJSBridge"].invoke('closeWindow', {}, function (res) { alert(res.err_msg); });
                    uniLib.BrowersUtils.setShareInfo();
                });
            }
            catch (e) {
                console.error("获取微信权限失败");
            }
            if (callBack)
                callBack.call(thisObj);
        };
        PayMgr.prototype.getWeiXinConfig = function () {
            //var bodyConfig: BodyConfig = new BodyConfig();
            var bodyConfig = {};
            bodyConfig.debug = false; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            bodyConfig.appId = this.signPackage.appid; // 必填，公众号的唯一标识
            bodyConfig.timestamp = this.signPackage.timestamp; // 必填，生成签名的时间戳
            bodyConfig.nonceStr = this.signPackage.nonceStr; // 必填，生成签名的随机串
            bodyConfig.signature = this.signPackage.signature; // 必填，签名，见附录1
            bodyConfig.jsApiList = [
                // 所有要调用的 API 都要加到这个列表中
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'chooseWXPay',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'onVoicePlayEnd',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'translateVoice',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ];
            wx.config(bodyConfig);
        };
        /**
         * 打开或者跳转到平台支付
         * @param order {Cmd.RechargeChipsPlatOrderRet_S} 订单信息
         * @param callBack {Function} 支付成功回调函数
         * @param itemName {string} 商品描述
         * @param price {mumber} 商品价格
         * @param count {mumber} 购买商品数量 默认1个
         */
        PayMgr.prototype.pay = function (info, callBack, thisObj) {
            if (uniLib.Global.isH5 == true) {
                switch (Number(info.payplatid)) {
                    case undefined:
                        break;
                    case Pmd.PlatType.PlatType_LeZhuan:
                    case Pmd.PlatType.PlatType_AiBei:
                    case Pmd.PlatType.PlatType_Normal:
                        this.payAiBei(info.platOrder, uniLib.BrowersUtils.getLocationUrl(), info.sign);
                        break;
                    case Pmd.PlatType.PlatType_Play68:
                        Play68.onpaysucc = callBack;
                        Play68.pay(info.gameOrder, info.goodName, info.price / 100, info.count);
                        //Play68.pay(order.gameOrder, encodeURIComponent(Global.lastGoldNum + StringConsts.CURRENCY), Global.lastPrice, 1);
                        break;
                    case Pmd.PlatType.PlatType_HuoWu:
                    case Pmd.PlatType.PlatType_XingZhiZhu:
                    case Pmd.PlatType.PlatType_HuoWu:
                    case Pmd.PlatType.PlatType_CaiGuo:
                    case Pmd.PlatType.PlatType_XueChi:
                    case Pmd.PlatType.PlatType_AoXin:
                        uniLib.BrowersUtils.redirectUrl(info.payUrl);
                        break;
                    case Pmd.PlatType.PlatType_9g:
                        var g9data = {
                            action: "pay",
                            orderid: info.gameOrder,
                            money: info.price,
                            product: info.goodName,
                            // icon: "http://.. ",	// 商店图片（可选参数）
                            spid: "aaayxzx",
                            sign: info.sign,
                            // notify: "http://",	// 建议此参数直接提供给9G存入数据库
                            uid: uniLib.Global.platInfo.uid,
                            token: uniLib.NetMgr.PlatSession
                        };
                        if (window && window.parent)
                            window.parent.postMessage(g9data, "*");
                        break;
                    case Pmd.PlatType.PlatType_1758:
                        uniLib.BrowersUtils.parentRedirectUrl(uniLib.BrowersUtils.getLocationUrl());
                        break;
                    case Pmd.PlatType.PlatType_WeChat:
                    case Pmd.PlatType.PlatType_WEIYOU:
                    case Pmd.PlatType.PlatType_RONGQIANG:
                        var arr = info.sign.split("|");
                        this.payWechat(arr[0], arr[1], arr[2], arr[3]);
                        break;
                    case Pmd.PlatType.PlatType_DAPAI:
                        yunyou.redirecturl = uniLib.BrowersUtils.getLocationUrl();
                        yunyou.order_token = info.sign;
                        //yunyou.retfunc = function (data) {
                        //    uniLib.Console.log(data);
                        //};
                        yunyou.pay();
                        break;
                    case Pmd.PlatType.PlatType_HUOSU:
                        var orderInfo = { "goodsId": info.goodId, "goodsNum": info.count, "out_orderno": info.gameOrder };
                        HuoSuSdk.pay(orderInfo, callBack, "返回游戏");
                        break;
                }
            }
            else {
                if (uniLib["ZQGameSdk"])
                    uniLib["ZQGameSdk"].pay(info, callBack, thisObj);
            }
        };
        PayMgr.prototype.payByPmd = function (pmd, callBack, thisObj, NetMgr) {
            var _this = this;
            var info = pmd;
            this._lastOrder_S = info;
            if (uniLib.Global.isH5 == true) {
                switch (Number(info.payplatid)) {
                    case undefined:
                        break;
                    case Pmd.PlatType.PlatType_LeZhuan:
                    case Pmd.PlatType.PlatType_AiBei:
                    case Pmd.PlatType.PlatType_Normal:
                        this.payAiBei(info.platorder, uniLib.BrowersUtils.getLocationUrl(), info.sign);
                        break;
                    case Pmd.PlatType.PlatType_Play68:
                        Play68.onpaysucc = callBack;
                        Play68.pay(info.gameorder, info.gamemoney.toString(), info.ordermoney / 100, info.goodnum);
                        //Play68.pay(order.gameOrder, encodeURIComponent(Global.lastGoldNum + StringConsts.CURRENCY), Global.lastPrice, 1);
                        break;
                    case Pmd.PlatType.PlatType_HuoWu:
                    case Pmd.PlatType.PlatType_XingZhiZhu:
                    case Pmd.PlatType.PlatType_HuoWu:
                    case Pmd.PlatType.PlatType_CaiGuo:
                    case Pmd.PlatType.PlatType_XueChi:
                    case Pmd.PlatType.PlatType_AoXin:
                        uniLib.BrowersUtils.redirectUrl(info.redirecturl);
                        break;
                    case Pmd.PlatType.PlatType_9g:
                        var g9data = {
                            action: "pay",
                            orderid: info.gameorder,
                            money: info.ordermoney,
                            product: info.gamemoney,
                            // icon: "http://.. ",	// 商店图片（可选参数）
                            spid: "aaayxzx",
                            sign: info.sign,
                            // notify: "http://",	// 建议此参数直接提供给9G存入数据库
                            uid: uniLib.Global.platInfo.uid,
                            token: NetMgr.PlatSession
                        };
                        if (window && window.parent)
                            window.parent.postMessage(g9data, "*");
                        break;
                    case Pmd.PlatType.PlatType_1758:
                        uniLib.BrowersUtils.parentRedirectUrl(uniLib.BrowersUtils.getLocationUrl());
                        break;
                    case Pmd.PlatType.PlatType_WeChat:
                    case Pmd.PlatType.PlatType_WEIYOU:
                    case Pmd.PlatType.PlatType_RONGQIANG:
                        var arr = info.sign.split("|");
                        this.payWechat(arr[0], arr[1], arr[2], arr[3]);
                        break;
                    case Pmd.PlatType.PlatType_DAPAI:
                        yunyou.redirecturl = uniLib.BrowersUtils.getLocationUrl();
                        yunyou.order_token = info.sign;
                        //yunyou.retfunc = function (data) {
                        //    uniLib.Console.log(data);
                        //};
                        yunyou.pay();
                        break;
                    case Pmd.PlatType.PlatType_HUOSU:
                        var orderInfo = { "goodsId": info.goodid, "goodsNum": info.goodnum, "out_orderno": info.gameorder };
                        HuoSuSdk.pay(orderInfo, callBack, "返回游戏");
                        break;
                }
            }
            else {
                info.roleid = NetMgr.getThirdPlatId();
                info.goodname = PayMgr.Instance.lastRechargeInfo.goodname;
                info.gooddesc = PayMgr.Instance.lastRechargeInfo.gooddesc;
                if (uniLib["ZQGameSdk"]) {
                    uniLib["ZQGameSdk"].payByPmd(info, function (data) {
                        if (data.code == 0) {
                            var msg = new Pmd.RechargeQueryRequestIOSSdkPmd_C();
                            msg.gameorder = _this._lastOrder_S.gameorder;
                            msg.originalmoney = _this._lastOrder_S.ordermoney;
                            msg.roleid = NetMgr.UID;
                            msg.ordermoney = _this._lastOrder_S.ordermoney;
                            msg.token = _this._lastOrder_S.sign;
                            if (data.data && data.data.paytoken)
                                msg.token = data.data.paytoken;
                            msg.extdata = _this._lastOrder_S.data.extdata;
                            msg.payplatid = _this._lastOrder_S.payplatid;
                            NetMgr.tcpSend(msg);
                        }
                        if (callBack) {
                            callBack(data, thisObj);
                        }
                    }, thisObj);
                }
            }
        };
        PayMgr.prototype.payCallBack = function (data) {
        };
        /**
         * 打开或者跳转到平台支付
         * @param order {Cmd.RechargeChipsPlatOrderRet_S} 订单信息
         * @param callBack {Function} 支付成功回调函数
         * @param itemName {string} 商品描述
         * @param price {mumber} 商品价格
         * @param count {mumber} 购买商品数量 默认1个
         */
        PayMgr.prototype.weChatPay = function (info, callBack, thisObj) {
            if (uniLib.Global.isH5 == true) {
                switch (Number(uniLib.Global.platInfo.platid)) {
                    case undefined:
                        break;
                    case Pmd.PlatType.PlatType_LeZhuan:
                    case Pmd.PlatType.PlatType_Normal:
                        this.payAiBei(info.platorder, uniLib.BrowersUtils.getLocationUrl(), info.sign);
                        break;
                    case Pmd.PlatType.PlatType_Play68:
                        Play68.onpaysucc = callBack;
                        Play68.pay(info.gameorder, /*info.goodName*/ "", info.ordermoney / 100, info.goodnum);
                        //Play68.pay(order.gameOrder, encodeURIComponent(Global.lastGoldNum + StringConsts.CURRENCY), Global.lastPrice, 1);
                        break;
                    case Pmd.PlatType.PlatType_HuoWu:
                    case Pmd.PlatType.PlatType_XingZhiZhu:
                    case Pmd.PlatType.PlatType_HuoWu:
                    case Pmd.PlatType.PlatType_CaiGuo:
                    case Pmd.PlatType.PlatType_XueChi:
                    case Pmd.PlatType.PlatType_AoXin:
                        uniLib.BrowersUtils.redirectUrl(info.redirecturl);
                        break;
                    case Pmd.PlatType.PlatType_9g:
                        var g9data = {
                            action: "pay",
                            orderid: info.gameorder,
                            money: info.ordermoney,
                            product: info.goodnum,
                            // icon: "http://.. ",	// 商店图片（可选参数）
                            spid: "aaayxzx",
                            sign: info.sign,
                            // notify: "http://",	// 建议此参数直接提供给9G存入数据库
                            uid: uniLib.Global.platInfo.uid,
                            token: uniLib.NetMgr.PlatSession
                        };
                        if (window && window.parent)
                            window.parent.postMessage(g9data, "*");
                        break;
                    case Pmd.PlatType.PlatType_1758:
                        uniLib.BrowersUtils.parentRedirectUrl(uniLib.BrowersUtils.getLocationUrl());
                        break;
                    case Pmd.PlatType.PlatType_WeChat:
                    case Pmd.PlatType.PlatType_WEIYOU:
                    case Pmd.PlatType.PlatType_RONGQIANG:
                        var arr = info.sign.split("|");
                        this.payWechat(arr[0], arr[1], arr[2], arr[3]);
                        break;
                    case Pmd.PlatType.PlatType_DAPAI:
                        yunyou.redirecturl = uniLib.BrowersUtils.getLocationUrl();
                        yunyou.order_token = info.sign;
                        //yunyou.retfunc = function (data) {
                        //    uniLib.Console.log(data);
                        //};
                        yunyou.pay();
                        break;
                    case Pmd.PlatType.PlatType_HUOSU:
                        var orderInfo = { "goodsId": info.goodid, "goodsNum": info.goodnum, "out_orderno": info.gameorder };
                        HuoSuSdk.pay(orderInfo, callBack, "返回游戏");
                        break;
                }
            }
            //else {
            //    if (uniLib["ZQGameSdk"]) {
            //        uniLib["ZQGameSdk"].pay(info, callBack, thisObj);
            //    }
            //}
        };
        PayMgr.prototype.payAiBei = function (transId, redirecturl, sign, cpurl, callBack) {
            if (this.aibeiPay == null) {
                this.aibeiPay = new AiBeiPay();
                window["aibeiBack"] = callBack;
            }
            if (transId == undefined) {
                return;
            }
            var data = {};
            data.transId = transId; //下单编号
            //data.retFunc = "aibeiBack";//当用户点击“返回游戏”按钮时调用该函数。回调函数的参数为支付结果数据，与购买结果通知e.data数据一致
            data.baseZIndex = 100;
            data.closeTxt = "返回游戏"; //自定义返回游戏按钮
            data.redirecturl = redirecturl; //当支付页面跳出收银台后，查询结果页回跳地址（必填）
            //data.cpurl = cpurl;//返回商户地址，可以不填写
            data.sign = sign; //用RSA(transId+redirecturl+cpurl)签名数据 
            this.aibeiPay.clickAibei(data); //调起收银台的JS函数
        };
        //private aibeiBack(data: any): void {
        //    if (data.Type == 0 && data.RetCode == 0) {
        //        switch (data.OrderStatus) {
        //            case 0:
        //                //MsgTipsManager.showTxt("支付成功");
        //                //data.TransId
        //                break;
        //            case 1:
        //                //MsgTipsManager.showTxt("支付失败");
        //                break;
        //            case 4:
        //                //MsgTipsManager.showTxt("系统异常");
        //                break;
        //        }
        //    }
        //}
        //private play68Back(): void {
        //    //MsgTipsManager.showTxt("支付成功");
        //}
        PayMgr.prototype.payWechat = function (sign, nonce_str, prepay_id, time) {
            //if (wx) {
            //    wx.chooseWXPay({
            //        timestamp: time, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            //        nonceStr: nonce_str, // 支付签名随机串，不长于 32 位
            //        package: "prepay_id=" + prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            //        signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            //        paySign: sign, // 支付签名
            //        success: function (res) {
            //            // 支付成功后的回调函数
            //            if (res.err_msg == "get_brand_wcpay_request:ok") {
            //                alert("支付成功");
            //            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            //        }
            //    });
            //}
            var onWxBridgeReady = function () {
                window["WeixinJSBridge"].invoke('getBrandWCPayRequest', {
                    "appId": uniLib.Global.appId,
                    "timeStamp": time,
                    "nonceStr": nonce_str,
                    "package": "prepay_id=" + prepay_id,
                    "signType": "MD5",
                    "paySign": sign //微信签名 
                }, function (res) {
                    if (res.err_msg == "get_brand_wcpay_request：ok") {
                        //alert("支付成功");
                    } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                });
            };
            if (typeof window["WeixinJSBridge"] == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onWxBridgeReady, false);
                }
                else if (document["attachEvent"]) {
                    document["attachEvent"]('WeixinJSBridgeReady', onWxBridgeReady);
                    document["attachEvent"]('onWeixinJSBridgeReady', onWxBridgeReady);
                }
            }
            else {
                onWxBridgeReady();
            }
        };
        PayMgr._self = null;
        return PayMgr;
    }());
    uniLib.PayMgr = PayMgr;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var PopUpMgr = /** @class */ (function () {
        function PopUpMgr() {
        }
        /**
         * 初始化弹出层
         * @param container
         */
        PopUpMgr.init = function (container) {
            if (container)
                this._container = container;
            else if (uniLib.SceneMgr.instance.currentScene.topLayer)
                this._container = uniLib.SceneMgr.instance.currentScene.topLayer;
            else
                this._container = uniLib.SceneMgr.instance.currentScene;
        };
        /**
         *
         * @param panel 需要弹出的面板类或者实例
         * @param cotainer 面板所属容器,不传则会放在初始化的容器上，如果没有初始化则自动添加到当前场景的topLayer层
         * @param center 是否居中
         * @param modal 是否模态 true/false/number 为数字类型时表示遮罩的透明度
         * @param index 添加的深度 /boolean 点击区域外关闭
         * @param effectType 弹出效果
         * @param popUpWidth 弹出层宽度
         * @param popUpHeight 弹出层高度
         * @param panelParam 弹出类实例化需要传入的参数
         */
        PopUpMgr.addPopUp = function (panel, cotainer, center, modal, index, effectType, popUpWidth, popUpHeight, panelParam) {
            if (cotainer === void 0) { cotainer = null; }
            if (center === void 0) { center = false; }
            if (index === void 0) { index = 0; }
            if (effectType === void 0) { effectType = 0; }
            if (popUpWidth === void 0) { popUpWidth = 0; }
            if (popUpHeight === void 0) { popUpHeight = 0; }
            var ctw = uniLib.Global.screenWidth;
            var cth = uniLib.Global.screenHeight;
            var outHide;
            if (this.outSideHide == true) {
                outHide = true;
            }
            else {
                if (typeof (index) == "boolean") {
                    outHide = index;
                }
            }
            var onClose = function (e) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                var target = e.target;
                uniLib.PopUpMgr.removePopUp(panel);
            };
            if (panel.prototype) {
                panel = new panel(panelParam);
            }
            else {
            }
            var c_scale_x = panel.scaleX;
            var c_scale_y = panel.scaleY;
            //panel.hashCode
            var panelName = egret.getQualifiedClassName(panel);
            if (this.popupDic[panelName] == null) {
                this.popupDic[panelName] = [];
            }
            this.popupDic[panelName].push(panel);
            if (this._container == null || this._container.parent == null) {
                if (uniLib.SceneMgr.instance.currentScene) {
                    if (uniLib.SceneMgr.instance.currentScene.topLayer) {
                        this._container = uniLib.SceneMgr.instance.currentScene.topLayer;
                    }
                    else
                        this._container = uniLib.SceneMgr.instance.currentScene;
                }
                else {
                    this._container = egret.MainContext.instance.stage;
                }
            }
            if (uniLib.SceneMgr.instance.currentScene && uniLib.SceneMgr.instance.currentScene.scaleX != 1) {
                ctw = uniLib.Global.designHeight / uniLib.SceneMgr.instance.currentScene.scaleX;
                cth = uniLib.Global.designWidth / uniLib.SceneMgr.instance.currentScene.scaleY;
            }
            var contain = (cotainer == null ? this._container : cotainer);
            if (contain.contains(panel)) {
                return;
            }
            var aph;
            if (typeof (modal) == "number") {
                aph = modal;
            }
            else {
                aph = this.maskAlpha;
            }
            if (modal) {
                var pname = egret.getQualifiedClassName(panel) + panel.hashCode;
                this.darkSpriteDic[pname] = uniLib.DisplayUtils.createMask(aph, ctw, cth);
                if (!contain.contains(this.darkSpriteDic[pname])) {
                    contain.addChild(this.darkSpriteDic[pname]);
                }
                this.darkSpriteDic[pname].touchEnabled = true;
                if (outHide == true) {
                    this.darkSpriteDic[pname].once(egret.TouchEvent.TOUCH_TAP, onClose, this);
                }
                egret.Tween.get(this.darkSpriteDic[pname]).to({ alpha: 1 }, 150);
                this.darkSpriteDic[pname].visible = true;
            }
            // if (!contain || !contain.stage)
            //     return;
            if (typeof (index) == "number") {
                if (index > 0) {
                    contain.addChildAt(panel, index);
                }
                else {
                    contain.addChild(panel);
                }
            }
            else if (index == null) {
                contain.addChild(panel);
            }
            this.curPanel = panel;
            if (popUpWidth != 0 && contain) {
                panel.x = ctw / 2 - popUpWidth / 2;
                panel.y = cth / 2 - popUpHeight / 2;
            }
            else {
                if (panel.anchorOffsetX == 0) {
                    popUpWidth = panel.width;
                    popUpHeight = panel.height;
                }
            }
            //以下是弹窗动画
            var leftX = ctw / 2 - popUpWidth / 2;
            var upY = cth / 2 - popUpHeight / 2;
            //临时修改2015/11/4
            //if (upY < 0) upY = 0;
            //if (leftX < 0) leftX = 0;
            switch (effectType) {
                case PopUpEffect.NOMAL:
                    if (center) {
                        panel.x = leftX;
                        panel.y = upY;
                    }
                    break;
                case PopUpEffect.CENTER:
                    if (center) {
                        panel.x = leftX;
                        panel.y = upY;
                    }
                    panel.alpha = 0;
                    panel.scaleX = 0.5;
                    panel.scaleY = 0.5;
                    panel.x = panel.x + popUpWidth / 4;
                    panel.y = panel.y + popUpHeight / 4;
                    egret.Tween.get(panel).to({ alpha: 1, scaleX: c_scale_x, scaleY: c_scale_y, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4 }, 300, egret.Ease.backOut);
                    break;
                case PopUpEffect.CENTER_S:
                    panel.alpha = 0;
                    panel.scaleX = 0.5;
                    panel.scaleY = 0.5;
                    panel.x = panel.x + popUpWidth / 4;
                    panel.y = panel.y + popUpHeight / 4;
                    egret.Tween.get(panel).to({ alpha: 1, scaleX: c_scale_x, scaleY: c_scale_y, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4 }, 600, egret.Ease.elasticOut);
                    break;
                case PopUpEffect.LEFT:
                    if (center) {
                        panel.x = -popUpWidth;
                        egret.Tween.get(panel).to({ x: leftX }, 500, egret.Ease.cubicOut);
                    }
                    else {
                        panel.x = -popUpWidth;
                        egret.Tween.get(panel).to({ x: 0 }, 500, egret.Ease.cubicOut);
                    }
                    break;
                case PopUpEffect.RIGHT:
                    if (center) {
                        panel.x = popUpWidth;
                        egret.Tween.get(panel).to({ x: leftX }, 500, egret.Ease.cubicOut);
                    }
                    else {
                        panel.x = popUpWidth;
                        egret.Tween.get(panel).to({ x: 0 }, 500, egret.Ease.cubicOut);
                    }
                    break;
                case PopUpEffect.TOP:
                    if (center) {
                        panel.y = -popUpHeight;
                        egret.Tween.get(panel).to({ y: upY }, 500, egret.Ease.cubicOut);
                    }
                    else {
                        panel.y = -popUpHeight;
                        egret.Tween.get(panel).to({ y: 0 }, 500, egret.Ease.cubicOut);
                    }
                    break;
                case PopUpEffect.BOTTOM:
                    if (center) {
                        panel.y = contain.stage.stageHeight;
                        egret.Tween.get(panel).to({ y: upY }, 500, egret.Ease.cubicOut);
                    }
                    else {
                        panel.y = popUpHeight;
                        egret.Tween.get(panel).to({ y: 0 }, 500, egret.Ease.cubicOut);
                    }
                    break;
                default:
                    break;
            }
            return panel;
        };
        /**
        * 移除面板方法
        * @param panel       	面板
        * @param effectType     弹出效果,查询字典 PopUpEffect
        */
        PopUpMgr.removePopUp = function (panel, effectType) {
            if (effectType === void 0) { effectType = 0; }
            var isInstance = true;
            if (panel.prototype) {
                isInstance = false;
            }
            else {
                isInstance = true;
            }
            //panel.hashCode
            var panelName = egret.getQualifiedClassName(panel);
            if (this.popupDic[panelName]) {
                if (isInstance) {
                    for (var i = 0; i < this.popupDic[panelName].length; i++) {
                        if (this.popupDic[panelName][i] == panel) {
                            this.removePanel(this.popupDic[panelName][i], effectType);
                            // delete this.popupDic[panelName][i];
                            this.popupDic[panelName].splice(i, 1);
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.popupDic[panelName].length; i++) {
                        this.removePanel(this.popupDic[panelName][i], effectType);
                        this.popupDic[panelName].shift();
                    }
                }
            }
        };
        PopUpMgr.clearPopus = function () {
            if (this.popupDic) {
                for (var str in this.popupDic) {
                    for (var i = 0; i < this.popupDic[str].length; i++) {
                        this.removePanel(this.popupDic[str][i]);
                        this.popupDic[str].shift();
                    }
                }
            }
        };
        PopUpMgr.removePanel = function (panel, effectType) {
            if (effectType === void 0) { effectType = 0; }
            var pname = egret.getQualifiedClassName(panel) + panel.hashCode;
            var onComplete = function () {
                if (this.darkSpriteDic[pname] && this.darkSpriteDic[pname].parent) {
                    this.darkSpriteDic[pname].parent.removeChild(this.darkSpriteDic[pname]);
                }
                this.darkSpriteDic[pname] = null;
                delete this.darkSpriteDic[pname];
            };
            if (this.darkSpriteDic[pname]) {
                egret.Tween.get(this.darkSpriteDic[pname]).to({ alpha: 0 }, 100).call(onComplete, this);
            }
            var hideTime = 600;
            //以下是弹窗动画
            switch (effectType) {
                case PopUpEffect.NOMAL:
                    hideTime = 0;
                    break;
                case PopUpEffect.CENTER:
                    egret.Tween.get(panel).to({ alpha: 0, scaleX: 0, scaleY: 0, x: panel.x + panel.width / 2, y: panel.y + panel.height / 2 }, 300);
                    break;
                case PopUpEffect.CENTER_S:
                    egret.Tween.get(panel).to({ alpha: 0, scaleX: 0, scaleY: 0, x: panel.x + panel.width / 2, y: panel.y + panel.height / 2 }, 600, egret.Ease.elasticOut);
                    break;
                case PopUpEffect.LEFT:
                    egret.Tween.get(panel).to({ x: -panel.width }, 600, egret.Ease.cubicOut);
                    break;
                case PopUpEffect.RIGHT:
                    egret.Tween.get(panel).to({ x: panel.width }, 600, egret.Ease.cubicOut);
                    break;
                case PopUpEffect.TOP:
                    egret.Tween.get(panel).to({ y: -panel.height }, 600, egret.Ease.cubicOut);
                    break;
                case PopUpEffect.BOTTOM:
                    egret.Tween.get(panel).to({ y: panel.height }, 600, egret.Ease.cubicOut);
                    break;
                default:
                    break;
            }
            egret.setTimeout(function () {
                if (panel["destroy"]) {
                    panel.destroy();
                }
                uniLib.DisplayUtils.removeFromParent(panel);
            }, this, hideTime);
        };
        /**
         * 是否已经弹出面板
         * @param panel
         */
        PopUpMgr.hasPopup = function (panel) {
            var isInstance = true;
            var panelName = egret.getQualifiedClassName(panel);
            if ((typeof (panel) == "object" && panel.prototype)) {
                isInstance = true;
            }
            else {
                isInstance = false;
            }
            if (isInstance) {
                if (!panel.stage) {
                    return false;
                }
                for (var i = 0; i < this.popupDic[panelName].length; i++) {
                    if (this.popupDic[panelName][i] == panel) {
                        return true;
                    }
                }
            }
            else {
                if (this.popupDic[panelName] && this.popupDic[panelName].length > 0) {
                    for (var i = 0; i < this.popupDic[panelName].length; i++) {
                        if (this.popupDic[panelName][i].stage) {
                            return true;
                        }
                        else {
                            uniLib.DisplayUtils.removeFromParent(this.popupDic[panelName][i]);
                        }
                    }
                }
            }
            return false;
        };
        /**
         * 大小变化时统一通知打开的窗口大小变化
         */
        PopUpMgr.resize = function () {
        };
        //public static darkSprite: egret.Sprite;
        PopUpMgr.darkSpriteDic = {};
        PopUpMgr.popupDic = new Object();
        PopUpMgr.maskAlpha = 0.7;
        /**
         * 弹出面板点击区域外时自动关闭
         */
        PopUpMgr.outSideHide = false;
        return PopUpMgr;
    }());
    uniLib.PopUpMgr = PopUpMgr;
    /**
   * 弹出效果
   */
    var PopUpEffect;
    (function (PopUpEffect) {
        /**
        * 没有动画
        */
        PopUpEffect[PopUpEffect["NOMAL"] = 0] = "NOMAL";
        /**
        * 从中间轻微弹出
        */
        PopUpEffect[PopUpEffect["CENTER"] = 1] = "CENTER";
        /**
        * 从中间猛烈弹出
        */
        PopUpEffect[PopUpEffect["CENTER_S"] = 2] = "CENTER_S";
        /**
        * 从左向右
        */
        PopUpEffect[PopUpEffect["LEFT"] = 3] = "LEFT";
        /**
        * 从右向左
        */
        PopUpEffect[PopUpEffect["RIGHT"] = 4] = "RIGHT";
        /**
        * 从上到下
        */
        PopUpEffect[PopUpEffect["TOP"] = 5] = "TOP";
        /**
        * 从下到上
        */
        PopUpEffect[PopUpEffect["BOTTOM"] = 6] = "BOTTOM";
    })(PopUpEffect = uniLib.PopUpEffect || (uniLib.PopUpEffect = {}));
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    /**
    * 资源加载管理(单例)
    */
    var ResLoadMgr = /** @class */ (function (_super) {
        __extends(ResLoadMgr, _super);
        function ResLoadMgr() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._autoHide = true;
            _this._curLoadingId = 0;
            /**
             * 本次是否取消加载
             */
            _this._isCacelLoading = false;
            /**
             * 当前正在加载的资源组
             */
            _this.curLoadingGrp = "";
            _this._currentLoadIndex = 0;
            return _this;
        }
        Object.defineProperty(ResLoadMgr, "instance", {
            get: function () {
                if (this._self == null) {
                    this._self = new ResLoadMgr();
                    this._self.initLoadingUI();
                }
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        ResLoadMgr.prototype.initLoadingUI = function () {
            this._loadingMap = {};
            this._thisObj = {};
            this._loadSucc = {};
            this._loadError = {};
        };
        /**
         * 加载多个资源组
         */
        ResLoadMgr.prototype.loadGrps = function (grpNames, loadSucc, loadError, thisObj, loadIngClass, autoHideLoadUI, isprocess, mustResList) {
            if (autoHideLoadUI === void 0) { autoHideLoadUI = true; }
            if (isprocess === void 0) { isprocess = true; }
            if (this.curLoadingGrp != "") {
                uniLib.Console.warn("资源组 [" + this.curLoadingGrp + "] 正在加载,请等待后台加载完成");
                return;
            }
            var grpName = "merge_" + grpNames.toString();
            RES.createGroup(grpName, grpNames, true);
            ResLoadMgr.instance.load(grpName, function (event) {
                uniLib.ResUtils.removeGroup(grpName);
                if (loadSucc) {
                    loadSucc.call(thisObj, event);
                }
            }, function (e) {
                uniLib.ResUtils.removeGroup(grpName);
                if (loadError) {
                    loadError.call(thisObj, e);
                }
            }, thisObj, loadIngClass, autoHideLoadUI, isprocess, mustResList);
            return grpName;
        };
        /**
         * 加载多个资源
         * @param groups
         * @param loadSucc
         * @param loadError
         * @param thisObj
         * @param loadIngClass
         */
        ResLoadMgr.prototype.loadReses = function (resNames, loadSucc, loadError, thisObj, loadIngClass, autoHideLoadUI, isprocess, mustResList) {
            if (autoHideLoadUI === void 0) { autoHideLoadUI = true; }
            if (isprocess === void 0) { isprocess = true; }
            if (this.curLoadingGrp != "") {
                uniLib.Console.warn("资源组 [" + this.curLoadingGrp + "] 正在加载,请等待后台加载完成");
                return;
            }
            var grpName = "merge_" + resNames.toString();
            RES.createGroup(grpName, resNames, true);
            ResLoadMgr.instance.load(grpName, function (event) {
                uniLib.ResUtils.removeGroup(grpName);
                if (loadSucc) {
                    loadSucc.call(thisObj, event);
                }
            }, loadError, thisObj, loadIngClass, autoHideLoadUI, isprocess, mustResList);
            return grpName;
        };
        /**
         * 取消加载资源
         */
        ResLoadMgr.prototype.cacelLoad = function (grpName) {
            if (!grpName) {
                grpName = this.curLoadingGrp;
                // this.curLoadingGrp = "";//后续再打开
            }
            this._isCacelLoading = true;
        };
        /**
         * 加载资源组
         */
        ResLoadMgr.prototype.load = function (groupName, loadSucc, loadError, thisObj, loadIngClass, autoHideLoadUI, isprocess, mustResList) {
            if (autoHideLoadUI === void 0) { autoHideLoadUI = true; }
            if (isprocess === void 0) { isprocess = true; }
            if (this.curLoadingGrp != "") {
                uniLib.Console.warn("资源组 [" + this.curLoadingGrp + "] 正在加载,请等待后台加载完成");
                return;
            }
            if (!isprocess || isprocess == null) {
                isprocess = true;
            }
            if (loadIngClass) {
                this._loadingClass = loadIngClass;
                if (!this._loadingClass.prototype) {
                    if (isprocess) {
                        uniLib.UIMgr.instance.showProcessBar(loadIngClass);
                    }
                    else {
                        uniLib.UIMgr.instance.showLoadingTimeout(loadIngClass);
                    }
                }
            }
            else {
                this._loadingClass = uniLib.UIMgr.instance.commonLoadUI;
            }
            if (mustResList && mustResList != null) {
                uniLib.ResUtils.setMustRes(mustResList);
            }
            // if (this._loadSucc)
            //     this._loadSucc = null;
            // if (this._loadError)
            //     this._loadError = null;
            // if (this._thisObj)
            //     this._thisObj = null;
            if (loadSucc)
                this._loadSucc[groupName] = loadSucc;
            if (loadError)
                this._loadError[groupName] = loadError;
            if (thisObj)
                this._thisObj[groupName] = thisObj;
            if (autoHideLoadUI != null) {
                this._autoHide = autoHideLoadUI;
            }
            else {
                this._autoHide = true;
            }
            this.curLoadingGrp = groupName;
            this._isCacelLoading = false;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onUniLibResProgress, this);
            RES.loadGroup(groupName);
        };
        /**
         * 加载多个资源组(暂未实现完)
         * @param groups
         * @param loadSucc
         * @param loadError
         * @param thisObj
         * @param loadIngClass
         */
        ResLoadMgr.prototype.loadArr = function (groups, loadSucc, loadError, thisObj, loadIngClass) {
            if (this._currentLoadArr && this._currentLoadArr.length > 0) {
                this._currentLoadArr.concat(groups);
            }
            else {
                this._currentLoadArr = groups;
                this._currentLoadIndex = 0;
            }
        };
        ///**
        // * 加载资源组
        // */
        //public load(groupname: string, gameId?: number): void {
        //    if (gameId)
        //        this._curLoadingId = gameId;
        //    //this._loadingUI.show();
        //    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        //    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //    RES.loadGroup(groupname);
        //}
        /**
         * 资源组加载完成
         */
        ResLoadMgr.prototype.onUniLibResLoadComplete = function (event) {
            this.curLoadingGrp = "";
            var grpName = event.groupName;
            if (event.groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onUniLibResProgress, this);
            }
            if (this._loadingClass && this._autoHide == true && egret.is(this._loadingClass.prototype, "egret.DisplayObjectContainer"))
                uniLib.UIMgr.instance.hideLoading(this._loadingClass);
            if (this._loadingClass)
                this._loadingClass = null;
            if (this._loadSucc[grpName] && this._isCacelLoading == false) {
                this._loadSucc[grpName].call(this._thisObj[grpName], event);
            }
            else {
                this._isCacelLoading = false;
            }
            this.removeLoadDic(grpName);
        };
        /**
        * 资源组加载出错
        */
        ResLoadMgr.prototype.onUniLibResLoadError = function (event) {
            this.curLoadingGrp = "";
            //TODO
            var grpName = event.groupName;
            uniLib.Console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            if (event.groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onUniLibResProgress, this);
                if (this._loadError[grpName] && this._isCacelLoading == false) {
                    this._loadError[grpName].call(this._thisObj[grpName], event);
                }
                else {
                    this._isCacelLoading = false;
                }
                // this.removeRefrence();
                this.removeLoadDic(grpName);
            }
        };
        ResLoadMgr.prototype.removeLoadDic = function (grpName) {
            this._loadError[grpName] = null;
            delete this._loadError[grpName];
            this._thisObj[grpName] = null;
            delete this._thisObj[grpName];
            this._loadSucc[grpName] = null;
            delete this._loadSucc[grpName];
        };
        /**
         * 资源组加载进度
         */
        ResLoadMgr.prototype.onUniLibResProgress = function (event) {
            //this._loadingUI.setProgress(event.groupName, event.itemsLoaded, event.itemsTotal);
            var grpName = event.groupName;
            if (this._loadingClass && this._isCacelLoading == false) {
                if (egret.is(this._loadingClass.prototype, "egret.DisplayObjectContainer")) {
                    uniLib.UIMgr.instance.showProcessBar(this._loadingClass, event.itemsLoaded, event.itemsTotal, "", event.groupName);
                }
                else {
                    this._loadingClass.call(this._thisObj[grpName], event);
                }
            }
        };
        /**
         * 加载资源配置
         */
        ResLoadMgr.prototype.loadConfig = function (url, resRoot, callBack, thisObj) {
            RES.destroyRes(url);
            RES.getResByUrl(url, function (data) {
                if (data && data.groups) {
                    // if (Global.initOpt.lobbyCommonResGrps && Global.initOpt.lobbyCommonResGrps.length > 0) {
                    //     ResUtils.clearCfgByConfigName(Global.initOpt.lobbyCommonResGrps, data);
                    // }
                    if (RES.hasOwnProperty("parseConfig")) {
                        RES.parseConfig(data, resRoot);
                    }
                    RES.destroyRes(url);
                    callBack.call(thisObj);
                }
                else {
                    console.error("游戏config加载失败:" + url);
                }
            }, this);
        };
        ResLoadMgr.prototype.loadedCfg = function (data) {
        };
        ResLoadMgr.prototype.removeRefrence = function () {
            if (this._loadSucc)
                this._loadSucc = null;
            if (this._loadingClass)
                this._loadingClass = null;
            if (this._loadError)
                this._loadSucc = null;
            if (this._thisObj)
                this._thisObj = null;
        };
        ResLoadMgr._self = null;
        return ResLoadMgr;
    }(egret.EventDispatcher));
    uniLib.ResLoadMgr = ResLoadMgr;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
    * 场景管理（单例）
    */
    var SceneMgr = /** @class */ (function () {
        function SceneMgr() {
            /**
             * 当前场景
             */
            this._currentScene = null;
            /**
             * 上一个场景
             */
            this._lastScene = null;
            /**
             * 抛出场景状态事件
             * iType: 事件类型
             * iData: 需要传递的数据
             */
            //public dispatchSceneStateEvent(iType: string, iData: any): void {
            //    var evt: SceneStateEvent = new SceneStateEvent(SceneStateEvent.EVENT_SCENE);
            //    var data = new EventData();
            //    data.iType = iType;
            //    data.iData = iData;
            //    evt.data = data;
            //    this.dispatchEvent(evt);
            //}
        }
        Object.defineProperty(SceneMgr, "instance", {
            get: function () {
                if (this._self == null) {
                    this._self = new SceneMgr();
                    if (this._self.sceneLayer == null) {
                        this._self.sceneLayer = new egret.DisplayObjectContainer();
                        egret.MainContext.instance.stage.addChild(this._self.sceneLayer);
                    }
                }
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        SceneMgr.prototype.init = function (scene) {
            if (this._currentScene == null)
                this._currentScene = scene;
        };
        /**
         * 改变当前场景
         *
         *
         * island 是否横屏模式
         */
        SceneMgr.prototype.changeScene = function (sceneClass, params, bMode, island) {
            //if (params == null) {
            //    params = { "addToStage": true }
            //}
            ////这里待优化
            //if (bMode) {
            //    var currentGameScene: any = (<LobbyScene>this._currentScene).currentGame;
            //    if (currentGameScene != null) {
            //        //this._lastScene = this._currentScene;
            //        if (currentGameScene.parent) {
            //            currentGameScene.parent.removeChild(currentGameScene);
            //        }
            //        currentGameScene.destroy();
            //    }
            //    currentGameScene = new sceneClass(params);
            //    if (params.hasOwnProperty("addToStage") == true) {
            //        (<LobbyScene>this._currentScene).gameLayer.addChild(currentGameScene);
            //    }
            //    return currentGameScene;
            //}
            //if (egret.getQualifiedClassName(sceneClass) == "LobbyScene" || (egret.getQualifiedClassName(this._currentScene) != "LobbyScene")) {
            // if (Global.screenWidth != egret.MainContext.instance.stage.width && egret.MainContext.instance.stage.width != egret.MainContext.instance.stage.stageWidth) {
            //     Global.screenWidth = egret.MainContext.instance.stage.width;
            // }
            // if (Global.screenHeight != egret.MainContext.instance.stage.height && egret.MainContext.instance.stage.height != egret.MainContext.instance.stage.stageHeight) {
            //     Global.screenHeight = egret.MainContext.instance.stage.height;
            // }
            var self = this;
            var onAddToStage = function (e) {
                // e.currentTarget.removeEventListener(egret.Event.ADDED_TO_STAGE, onAddToStage, this);
                if (self._lastScene && self._lastScene != self._currentScene) {
                    if (self._lastScene["destroy"]) {
                        self._lastScene.destroy();
                    }
                    else {
                        uniLib.Console.warn("场景销毁方法不存在");
                    }
                    //self._lastScene.removeChildren();
                    self._lastScene = null;
                }
            };
            if (bMode && uniLib.Global.isInGame) {
                var currentGameScene = this._currentScene.currentGame;
                if (currentGameScene != null) {
                    //this._lastScene = this._currentScene;
                    if (currentGameScene.parent) {
                        currentGameScene.parent.removeChild(currentGameScene);
                    }
                    currentGameScene.destroy();
                }
                currentGameScene = new sceneClass(params);
                // if (currentGameScene.width > Global.designWidth || currentGameScene.height > Global.designHeight) {
                //     currentGameScene.scaleX = Global.designWidth / currentGameScene.width;
                //     currentGameScene.scaleY = Global.designHeight / currentGameScene.height;
                // }
                this._currentScene.currentGame = currentGameScene;
                //if (params.hasOwnProperty("addToStage") == true) {
                this._currentScene.gameLayer.addChild(currentGameScene);
                //}
                uniLib.PopUpMgr.init();
                return currentGameScene;
            }
            else {
                //if (Global.isLobbyMode) {
                var newScene = new sceneClass(params);
                //xuyong 临时修改
                // if (newScene.width > newScene.height) {
                //     if (newScene.width > Global.designHeight && newScene.height > Global.designWidth) {
                //         newScene.scaleX = 1136 / 1280;
                //         newScene.scaleY = 640 / 720;
                //     }
                // } else {
                //     if (newScene.width > Global.designWidth && newScene.height > Global.designHeight) {
                //         newScene.scaleX = 640 / 720;
                //         newScene.scaleY = 1136 / 1280;
                //     }
                // }
                // if (newScene.width > Global.designWidth && newScene.height > Global.designHeight) {
                //     if(newScene.width>newScene.height){
                //         newScene.scaleX = Global.designWidth / newScene.width;
                //         newScene.scaleY = Global.designHeight / newScene.height;
                //     }else{
                //         newScene.scaleX = Global.designHeight / newScene.width;
                //         newScene.scaleY = Global.designWidth / newScene.height;
                //     } 
                // }
                // var sceneIdx: number = 0;
                if (this._currentScene != null) {
                    this._lastScene = this._currentScene;
                    //if (this._lastScene.parent) {
                    //    this._lastScene.parent.removeChild(this._lastScene);
                    //}
                    //this._lastScene.removeChildren();
                    // sceneIdx = DisplayUtils.getChildIndex(this._lastScene);
                    uniLib.DisplayUtils.removeFromParent(this._lastScene);
                    //last = this._lastScene;
                    //this._lastScene.unRegisterEvent();
                }
                this._currentScene = newScene;
                //if (params.hasOwnProperty("addToStage") == true) {
                this._currentScene.once(egret.Event.ADDED_TO_STAGE, onAddToStage, this);
                this.sceneLayer.addChild(this._currentScene);
                // egret.MainContext.instance.stage.addChild(this._currentScene);
                uniLib.DebugView.Instance.check();
                //}
                uniLib.PopUpMgr.init();
                //this._lastScene.destroy();
                return this._currentScene;
            }
            // if (Global.isInGame == false){
            // } else {
            // }
        };
        Object.defineProperty(SceneMgr.prototype, "currentScene", {
            /**
             * 获取当前场景
             */
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 新的场景加载完成后关闭上一个场景
         */
        SceneMgr.prototype.lastSceneLeave = function () {
            if (this._lastScene != null) {
                if (this._lastScene.parent) {
                    this._lastScene.parent.removeChild(this._lastScene);
                }
                this._lastScene.destroy();
                this._lastScene = null;
            }
        };
        SceneMgr._self = null;
        return SceneMgr;
    }());
    uniLib.SceneMgr = SceneMgr;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var MySoundChannel = /** @class */ (function () {
        function MySoundChannel() {
            this.isStopped = false;
            this.isMusic = false;
            this.name = "";
            this.position = 0;
            this.egret_channel = null;
        }
        MySoundChannel.prototype.stop = function () {
            if (this.egret_channel) {
                //uniLib.Console.log("[SOUND MySoundChannel stop] " + this.egret_channel.position +":" + this.isStopped + ":" + this.egret_channel);
                this.position = this.egret_channel.position;
                this.egret_channel.stop();
                this.isStopped = true;
                this.egret_channel = null;
            }
        };
        return MySoundChannel;
    }());
    /**
    * 音频管理
    */
    var SoundMgr = /** @class */ (function () {
        function SoundMgr() {
            this._soundRes = {}; //egret.Sound
            this._musicVolume = 1;
            this._soundVolume = 1;
            this._musicOpen = true;
            this._soundOpen = true;
            //private lastSoundName: string;
            //private lastPlayTime: number;
            this._activeSound = {};
            this._activeSoundLoop = {};
            this._soundPause = false;
            this.loadTimeDic = {};
            this._currentMusicIndex = 0;
            this._currentMusicChanel = null;
        }
        Object.defineProperty(SoundMgr, "instance", {
            get: function () {
                var self = this;
                if (this._instance == null) {
                    this._instance = new SoundMgr();
                    uniLib.Utils.getLocalStorage(SoundMgr.SOUND_TOGGLE, function (data) {
                        if (data != null) {
                            self._instance.soundOpen = Boolean(data);
                        }
                    });
                    uniLib.Utils.getLocalStorage(SoundMgr.MUSIC_TOGGLE, function (data) {
                        if (data != null) {
                            self._instance.musicOpen = Boolean(data);
                        }
                    });
                    if (egret.Capabilities.supportVersion < "3.2.6") {
                        setTimeout(function () {
                            uniLib.ZQGameSdk.speakerActive();
                            //uniLib.Console.log("[SOUND uniLib.ZQGameSdk.speakerActive] ");
                        }, 10000);
                    }
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        SoundMgr.prototype.onActive = function (e) {
            if (this._musicOpen) {
                if (egret.Capabilities.supportVersion < "3.2.6") {
                    setTimeout(function () {
                        uniLib.ZQGameSdk.speakerActive();
                        SoundMgr.instance.resumeBgMusic();
                    }, 2000);
                }
            }
        };
        SoundMgr.prototype.onDeActive = function (e) {
            if (egret.Capabilities.supportVersion < "3.2.6") {
                SoundMgr.instance.pauseBgMusic();
            }
        };
        Object.defineProperty(SoundMgr.prototype, "soundPause", {
            get: function () {
                return this._soundPause;
            },
            set: function (b) {
                this._soundPause = b;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 播放音效
         * @param soundName
         * @param loops
         * @param position
         * @param playEndBack
         * @param thisObj
         */
        SoundMgr.prototype.playSound = function (soundName, loops, position, playEndBack, thisObj) {
            if (loops === void 0) { loops = 1; }
            if (!this._soundOpen || this._soundPause == true)
                return;
            var self = this;
            var channel;
            if (this._activeSound[soundName] && this._activeSound[soundName]["$loops"] == 0) {
                return;
            }
            if (playEndBack) {
                var onSoundEnd = function (soundName, channel) {
                    channel.stop(); //这里stop有冗余,不这样做,有可能导致内存泄露,有空再优化写法
                    self.stopSound(soundName);
                    if (playEndBack)
                        playEndBack.call(thisObj);
                };
                //this.lastPlayTime = new Date().getTime();
                channel = this.play(soundName, loops, position, [onSoundEnd], false);
            }
            else {
                channel = this.play(soundName, loops, position, [], false);
            }
            if (channel != null)
                this._activeSound[soundName] = channel;
            return channel;
        };
        //public onSoundEnd(soundName: string, playEnd?: Function,thisObj?:any): void {
        //    if (this._activeSound[soundName] != null && this._activeSound[soundName] != undefined) {
        //        this._activeSound[soundName].stop();
        //        this._activeSound[soundName] = null;
        //        delete this._activeSound[soundName];
        //    }
        //}
        SoundMgr.prototype.stopSounds = function () {
            for (var i in this._activeSound) {
                if (this._activeSound[i] != null && this._activeSound[i] != undefined) {
                    this._activeSound[i].stop();
                    this._activeSound[i] = null;
                    delete this._activeSound[i];
                }
            }
            for (var i in this._soundRes) {
                this._soundRes[i] = null;
                delete this._soundRes[i];
            }
            uniLib.ResUtils.resetSoundLoadTimes();
        };
        SoundMgr.prototype.stopSound = function (soundName) {
            if (this._activeSound[soundName] != null && this._activeSound[soundName] != undefined) {
                this._activeSound[soundName].stop();
                this._activeSound[soundName].dispatchEventWith(egret.Event.SOUND_COMPLETE);
                this._activeSound[soundName] = null;
                delete this._activeSound[soundName];
            }
        };
        SoundMgr.prototype.play = function (soundName, loops, position, asyn, isMusic) {
            if (loops === void 0) { loops = 1; }
            if (isMusic === void 0) { isMusic = true; }
            //soundName = "hb_backSound_1_mp3";
            var self = this;
            var callSoundBack;
            if (asyn && asyn.length > 0) {
                callSoundBack = function (e) {
                    var endChanel = e.currentTarget;
                    //uniLib.Console.log("[SOUND removeEventListener] " + soundName);
                    if (endChanel != null && endChanel != undefined) {
                        endChanel.removeEventListener(egret.Event.SOUND_COMPLETE, callSoundBack, self);
                        if (asyn != null && asyn != undefined) {
                            if (asyn.length > 1)
                                asyn[0].call(asyn[1], soundName, endChanel);
                            else
                                asyn[0](soundName, endChanel);
                        }
                    }
                };
            }
            var onLoadSound = function (data) {
                self._soundRes[soundName] = data;
                if (isMusic == true) {
                    var reset = true;
                    if (self._currentMusicChanel && self.loadTimeDic[self._currentMusicChanel.name] != null && self.loadTimeDic[soundName] != null && self.loadTimeDic[self._currentMusicChanel.name] > self.loadTimeDic[soundName]) {
                        reset = false;
                    }
                    if (reset == true) {
                        var channel = self.play(soundName, loops, position, asyn, isMusic);
                        self.resetCurrentMusic(channel, soundName);
                    }
                }
                else if (new Date().getTime() - self.loadTimeDic[soundName] <= 1000) {
                    self.loadTimeDic[soundName] = 0;
                    self._activeSound[soundName] = self.play(soundName, loops, position, asyn, isMusic);
                }
            };
            var lastTime = 0;
            if (this.loadTimeDic[soundName] != null) {
                lastTime = this.loadTimeDic[soundName];
            }
            this.loadTimeDic[soundName] = new Date().getTime();
            if (this._soundRes[soundName] == null || this._soundRes[soundName] == undefined) {
                if (RES.hasRes(soundName)) {
                    var res = RES.getRes(soundName);
                    if (res != null || res != undefined) {
                        onLoadSound(res);
                    }
                    else {
                        uniLib.Console.log("sound声音资源没有预加载到本地,建议进行预加载:" + soundName);
                        uniLib.ResUtils.getRes(soundName, onLoadSound, null, egret.URLLoaderDataFormat.SOUND);
                    }
                }
                else
                    uniLib.ResUtils.getRes(soundName, onLoadSound, null, egret.URLLoaderDataFormat.SOUND);
                return null;
            }
            if (this._soundRes[soundName]) {
                if (isMusic == false && new Date().getTime() - lastTime < 100) {
                    this.loadTimeDic[soundName] = lastTime;
                    return null;
                }
                var channel = this._soundRes[soundName].play(position, loops);
                if (channel != null && channel != undefined) {
                    if (callSoundBack) {
                        channel.addEventListener(egret.Event.SOUND_COMPLETE, callSoundBack, self);
                    }
                    var volume = (isMusic == true ? this._musicVolume : this._soundVolume);
                    channel.volume = volume;
                    return channel;
                }
                else {
                    return null;
                }
            }
            return null;
        };
        SoundMgr.prototype.randomSounds = function (soundsName) {
            if (soundsName)
                this._bgMusics = soundsName;
            var idx = Math.floor(this._bgMusics.length * Math.random());
            this.play(this._bgMusics[idx], 0);
        };
        SoundMgr.prototype.playBgMusic = function (musics, position) {
            var self = this;
            self._bgMusics = musics;
            if (position)
                self._currentMusicIndex = position;
            if (!self._musicOpen)
                return;
            //self.playMusic();
            if (self._bgMusics.length > 0) {
                if (self._currentMusicIndex >= self._bgMusics.length) {
                    self._currentMusicIndex = 0;
                }
                if (self._currentMusicChanel == null || self._bgMusics[self._currentMusicIndex] != self._currentMusicChanel.name) {
                    var channel = self.play(self._bgMusics[self._currentMusicIndex], 1, position, [self.onMusicEnd, self]);
                    self.resetCurrentMusic(channel, self._bgMusics[self._currentMusicIndex]);
                }
            }
        };
        SoundMgr.prototype.onMusicEnd = function (e) {
            var self = this;
            //e.currentTarget.removeEventListener(egret.Event.SOUND_COMPLETE, this.onMusicEnd, this);
            self._currentMusicIndex++;
            if (self._currentMusicIndex == self._bgMusics.length)
                self._currentMusicIndex = 0;
            if (!self._musicOpen)
                return;
            if (self._bgMusics.length > 0) {
                var channel = self.play(self._bgMusics[self._currentMusicIndex], 1, 0, [self.onMusicEnd, self]);
                self.resetCurrentMusic(channel, self._bgMusics[self._currentMusicIndex]);
            }
        };
        SoundMgr.prototype.resetCurrentMusic = function (channel, musicName) {
            if (channel == null || channel == undefined) {
                return;
            }
            var mychannel = new MySoundChannel();
            mychannel.name = musicName;
            mychannel.isMusic = true;
            mychannel.egret_channel = channel;
            mychannel.res = this._soundRes[musicName];
            if (this._currentMusicChanel != null && this._currentMusicChanel != mychannel && this._currentMusicChanel.name != mychannel.name) {
                this.stopBgMusic();
            }
            //Console.error("musicName:" + musicName);
            this._currentMusicChanel = mychannel;
            this._currentMusicChanel.isStopped = false;
            this._currentMusicChanel.egret_channel.volume = this._musicVolume;
        };
        SoundMgr.prototype.stopBgMusic = function () {
            if (this._currentMusicChanel) {
                this._currentMusicChanel.stop();
                this.loadTimeDic[this._currentMusicChanel.name] = 0;
                this._currentMusicChanel = null;
            }
        };
        SoundMgr.prototype.pauseBgMusic = function () {
            if (this._currentMusicChanel) {
                this._currentMusicChanel.stop();
            }
        };
        SoundMgr.prototype.resumeBgMusic = function () {
            if (!this._musicOpen || (this._currentMusicChanel && !this._currentMusicChanel.isStopped))
                return;
            var self = this;
            var position = 0;
            if (this._currentMusicChanel) {
                position = this._currentMusicChanel.position;
            }
            if (this._bgMusics && this._bgMusics.length > 0) {
                var channel = this.play(this._bgMusics[this._currentMusicIndex], 1, position, [self.onMusicEnd, self]);
                this.resetCurrentMusic(channel, this._bgMusics[this._currentMusicIndex]);
            }
        };
        SoundMgr.prototype.isPlayingBgMusic = function () {
            if (this._currentMusicChanel && this._currentMusicChanel.isStopped == false)
                return true;
            return false;
        };
        SoundMgr.prototype.isSoundPlaying = function (soundName) {
            if (this._activeSound[soundName] && this._activeSound[soundName].position)
                return true;
            else
                return false;
        };
        Object.defineProperty(SoundMgr.prototype, "musicVolume", {
            get: function () {
                return this._musicVolume;
            },
            set: function (value) {
                this._musicVolume = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundMgr.prototype, "soundVolume", {
            get: function () {
                return this._soundVolume;
            },
            set: function (value) {
                this._soundVolume = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundMgr.prototype, "musicOpen", {
            get: function () {
                return this._musicOpen;
            },
            set: function (b) {
                this._musicOpen = b;
                if (!b)
                    this.pauseBgMusic();
                else
                    this.resumeBgMusic();
                uniLib.Utils.setLocalStorage(SoundMgr.MUSIC_TOGGLE, this._musicOpen);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundMgr.prototype, "soundOpen", {
            get: function () {
                return this._soundOpen;
            },
            set: function (b) {
                this._soundOpen = b;
                uniLib.Utils.setLocalStorage(SoundMgr.SOUND_TOGGLE, this._soundOpen);
            },
            enumerable: true,
            configurable: true
        });
        SoundMgr.isFirst = true;
        SoundMgr.SOUND_TOGGLE = "sound_toggle";
        SoundMgr.MUSIC_TOGGLE = "music_toggle";
        return SoundMgr;
    }());
    uniLib.SoundMgr = SoundMgr;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * StatistcsMgr
 * 统计管理
 */
var uniLib;
(function (uniLib) {
    var StatistcsMgr = /** @class */ (function (_super) {
        __extends(StatistcsMgr, _super);
        function StatistcsMgr() {
            return _super.call(this) || this;
        }
        Object.defineProperty(StatistcsMgr, "instance", {
            get: function () {
                if (this._self == null) {
                    this._self = new StatistcsMgr();
                }
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        StatistcsMgr.prototype.init = function () {
            this.sendedKb = 0;
            this.receiveKb = 0;
            this.sendB = 0;
            this.receiveB = 0;
            this.secondTimer = new egret.Timer(1000, 0);
            this.secondTimer.addEventListener(egret.TimerEvent.TIMER, this.dispatchSecondEvent, this);
            this.secondTimer.start();
            this.requestPing();
        };
        /**
         * 每秒流量值
         */
        StatistcsMgr.prototype.dispatchSecondEvent = function (evt) {
            if (uniLib.Console.isDevMode)
                return;
            this.dispatchEventWith(StatistcsMgr.SENDANDRECEIVE, false, { "send": this.sendB, "receive": this.receiveB });
            this.sendB = this.receiveB = 0;
        };
        /**
         * 请求ping值
         */
        StatistcsMgr.prototype.requestPing = function () {
            var ping = new Pmd.SetPingTimeNullUserPmd_CS();
            uniLib.NetMgr.ws.sendPlat(ping);
        };
        Object.defineProperty(StatistcsMgr.prototype, "socketStatus", {
            /**
             * socket连接状态
             */
            set: function (str) {
                this.dispatchEventWith(StatistcsMgr.SOCKETSTATUS, false, str);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
        * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
        *
        * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)              一个字节
        * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)      两个字节
        * 000800 - 00D7FF
         00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz       三个字节
        * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
        *
        * 注: Unicode在范围 D800-DFFF 中不存在任何字符
        * {@link http://zh.wikipedia.org/wiki/UTF-8}
        *
        * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
        * 000000 - 00FFFF  两个字节
        * 010000 - 10FFFF  四个字节
        *
        * {@link http://zh.wikipedia.org/wiki/UTF-16}
        * @param  {String} str
        * @param  {String} charset utf-8, utf-16
        * @return {Number}
        */
        StatistcsMgr.prototype.messageCharStatistics = function (str, type, charset) {
            if (charset === void 0) { charset = "utf-8"; }
            if (uniLib.Console.isDevMode)
                return;
            var total = 0, charCode, i, len;
            charset = charset ? charset.toLowerCase() : '';
            if (charset === 'utf-16' || charset === 'utf16') {
                for (i = 0, len = str.length; i < len; i++) {
                    charCode = str.charCodeAt(i);
                    if (charCode <= 0xffff) {
                        total += 2;
                    }
                    else {
                        total += 4;
                    }
                }
            }
            else {
                for (i = 0, len = str.length; i < len; i++) {
                    charCode = str.charCodeAt(i);
                    if (charCode <= 0x007f) {
                        total += 1;
                    }
                    else if (charCode <= 0x07ff) {
                        total += 2;
                    }
                    else if (charCode <= 0xffff) {
                        total += 3;
                    }
                    else {
                        total += 4;
                    }
                }
            }
            if (type == "send") {
                this.sendB += total;
                this.sendedKb += (total / 1024);
            }
            else {
                this.receiveB += total;
                this.receiveKb += (total / 1024);
            }
            this.dispatchEventWith(StatistcsMgr.SENDEDANDRECEIVED, false, { "sended": this.sendedKb, "received": this.receiveKb });
        };
        StatistcsMgr.prototype.destroy = function () {
            if (this.secondTimer) {
                this.secondTimer.removeEventListener(egret.TimerEvent.TIMER, this.dispatchSecondEvent, this);
                this.secondTimer.stop();
            }
        };
        StatistcsMgr.PING = "ping";
        StatistcsMgr.SENDANDRECEIVE = "sendAndReceive";
        StatistcsMgr.SENDEDANDRECEIVED = "sendedAndReceived";
        StatistcsMgr.SOCKETSTATUS = "socketStatus";
        StatistcsMgr._self = null;
        return StatistcsMgr;
    }(egret.EventDispatcher));
    uniLib.StatistcsMgr = StatistcsMgr;
})(uniLib || (uniLib = {}));
var Pmd;
(function (Pmd) {
    function OnSetPingTimeNullUserPmd_CS(rev) {
        uniLib.StatistcsMgr.instance.dispatchEventWith(uniLib.StatistcsMgr.PING, false, rev.pingmsec);
    }
    Pmd.OnSetPingTimeNullUserPmd_CS = OnSetPingTimeNullUserPmd_CS;
})(Pmd || (Pmd = {}));

var uniLib;
(function (uniLib) {
    /**
    * UI管理
    */
    var UIMgr = /** @class */ (function () {
        function UIMgr() {
            /**
            * ui字典
            */
            this._uis = new Object();
            this._loadings = new Object();
            this._effects = {};
        }
        Object.defineProperty(UIMgr, "instance", {
            get: function () {
                if (this._self == null) {
                    this._self = new UIMgr();
                }
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIMgr.prototype, "DefaultLoading", {
            set: function (view) {
                this.defaultLoadingView = view;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 显示UI
         * @param ui 显示类
         * @param data 数据
         * @param cache 是否缓存
         */
        UIMgr.prototype.showUI = function (ui, data, parent, cache, drag, x, y) {
            if (cache === void 0) { cache = false; }
            if (drag === void 0) { drag = false; }
            var self = this;
            var uiName = egret.getQualifiedClassName(ui);
            var onUIRemoveFromStage = function (e) {
                if (self._uis[uiName] && self._uis[uiName].hasEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, self))
                    self._uis[uiName].removeEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, self);
                //DisplayUtils.removeFromParent(self._uis[uiName]);
                if (self._uis[uiName]["destroy"])
                    self._uis[uiName].destroy();
                if (cache == false) {
                    self._uis[uiName] = null;
                    delete self._uis[uiName];
                }
            };
            if (this._uis[uiName] == null) {
                this._uis[uiName] = new ui(data);
                if (x) {
                    this._uis[uiName].x = x;
                }
                if (y) {
                    this._uis[uiName].y = y;
                }
            }
            else {
                if (this._uis[uiName]["updateUIData"]) {
                    this._uis[uiName]["updateUIData"](data);
                }
            }
            if (this._uis[uiName]) {
                if (cache == false) {
                    if (!this._uis[uiName].hasEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, this))
                        this._uis[uiName].addEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, this);
                }
                if (this._uis[uiName].stage == null || this._uis[uiName].parent == null) {
                    if (parent && parent != null && parent instanceof egret.DisplayObjectContainer) {
                        parent.addChild(this._uis[uiName]);
                    }
                    else {
                        if (uniLib.SceneMgr.instance.currentScene && uniLib.SceneMgr.instance.currentScene.topLayer) {
                            //if (SceneMgr.instance.currentScene.scaleX != 1) {
                            //}
                            uniLib.SceneMgr.instance.currentScene.topLayer.addChild(this._uis[uiName]);
                        }
                        else {
                            egret.MainContext.instance.stage.addChild(this._uis[uiName]);
                        }
                    }
                }
                else {
                    //外部更新UI数据,暂时不处理
                    //this._uis[uiName]
                }
                if (drag == true) {
                    //this._uis[uiName].addEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, this);
                    // var tap6: neoges.PanGesture = new neoges.PanGesture(this._uis[uiName]);
                    // tap6.addEventListener(neoges.GestureEvent.BEGAN, this.onPanBegan, this);
                    // tap6.addEventListener(neoges.GestureEvent.UPDATE, this.onPanUpdate, this);
                    // tap6.addEventListener(neoges.GestureEvent.ENDED, this.onPanEnd, this);
                }
                return this._uis[uiName];
            }
        };
        Object.defineProperty(UIMgr.prototype, "commonLoadUI", {
            get: function () {
                return this._commonLoadUI;
            },
            set: function (loadClass) {
                this._commonLoadUI = loadClass;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIMgr.prototype, "tipsLoadUI", {
            get: function () {
                return this._tipsLoadUI;
            },
            set: function (loadClass) {
                this._tipsLoadUI = loadClass;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 显示Loading
         */
        UIMgr.prototype.showProcessBar = function (loadClass, loaded, total, desc, resourceName, force, container) {
            if (force === void 0) { force = false; }
            return this.showLoading(loadClass, loaded, total, desc, resourceName, force, "", container);
        };
        UIMgr.prototype.showLoadingParam = function (loadClass, param, container) {
            return this.showLoading(loadClass, 2, 100, "", "", false, "", container, param);
        };
        UIMgr.prototype.showLoadingTimeout = function (loadClass, key, timeout_msec, desc) {
            if (key === void 0) { key = ""; }
            if (timeout_msec === void 0) { timeout_msec = 20000; }
            if (desc === void 0) { desc = ""; }
            this.showLoading(loadClass ? loadClass : this._tipsLoadUI, null, null, desc, null, false, key);
            var self = this;
            if (timeout_msec) {
                setTimeout(function () {
                    self.hideLoading(loadClass, key);
                }, timeout_msec);
            }
        };
        UIMgr.prototype.showLoading = function (loadClass, loaded, total, desc, resourceName, force, uiName, container, loadingParam) {
            if (force === void 0) { force = false; }
            if (uiName === void 0) { uiName = ""; }
            if (uiName == "") {
                if (loadClass && loadClass != null) {
                    uiName = egret.getQualifiedClassName(loadClass);
                }
                else {
                    uiName = egret.getQualifiedClassName(this._commonLoadUI);
                    loadClass = this._commonLoadUI;
                }
            }
            else {
                if (loadClass == null) {
                    uiName = egret.getQualifiedClassName(this._tipsLoadUI);
                    loadClass = this._tipsLoadUI;
                }
            }
            if (uniLib.StringUtils.stringIsNullOrEmpty(uiName) || loadClass == null)
                return;
            if (this._loadings[uiName] == null) {
                this._loadings[uiName] = new loadClass(loadingParam);
            }
            else {
                if (this._loadings[uiName]["update"] && loadingParam) {
                    this._loadings[uiName].update(loadingParam);
                }
            }
            if (this._loadings[uiName].stage == null) {
                if (this._loadings[uiName]["setProgress"]) {
                    this._loadings[uiName].setProgress(2, 100);
                }
                if (container) {
                    container.addChild(this._loadings[uiName]);
                }
                else if (uniLib.SceneMgr.instance.currentScene) {
                    if (uniLib.SceneMgr.instance.currentScene.currentGame && uniLib.SceneMgr.instance.currentScene.currentGame.parent) {
                        uniLib.SceneMgr.instance.currentScene.currentGame.addChild(this._loadings[uiName]);
                    }
                    else if (uniLib.SceneMgr.instance.currentScene.tipsLayer) {
                        uniLib.SceneMgr.instance.currentScene.tipsLayer.addChild(this._loadings[uiName]);
                    }
                    else {
                        egret.MainContext.instance.stage.addChild(this._loadings[uiName]);
                    }
                }
                else
                    egret.MainContext.instance.stage.addChild(this._loadings[uiName]);
            }
            if (this._loadings[uiName]["setProgress"]) {
                this._loadings[uiName].setProgress(loaded, total, desc, resourceName, force);
            }
        };
        /**
         * 显示例子效果
         * @param parName {string} 粒子名称
         * @param duration {number} 播放时间
         * @param starX {number} 开始位置x
         * @param starY {number} 开始位置y
         */
        UIMgr.prototype.showParticle = function (parName, duration, starX, starY) {
            var parComplete = function (e) {
                this._effects[parName].removeEventListener(egret.Event.COMPLETE, parComplete, this);
                uniLib.DisplayUtils.removeFromParent(e.target);
            };
            try {
                if (this._effects[parName] == null) {
                    this._effects[parName] = uniLib.DisplayUtils.createParticle(parName);
                }
                if (starX)
                    this._effects[parName].emitterX = starX;
                if (starY)
                    this._effects[parName].emitterY = starY;
                if (this._effects[parName].stage == null) {
                    if (uniLib.SceneMgr.instance.currentScene.effectLayer) {
                        uniLib.SceneMgr.instance.currentScene.effectLayer.addChild(this._effects[parName]);
                    }
                    else
                        uniLib.SceneMgr.instance.currentScene.addChild(this._effects[parName]);
                    this._effects[parName].start(duration);
                    this._effects[parName].addEventListener(egret.Event.COMPLETE, parComplete, this);
                }
                else {
                    //外部更新UI数据,暂时不处理
                    //this._uis[uiName]
                }
            }
            catch (e) {
                uniLib.Console.error("找不到粒子效果");
            }
            return this._effects[parName] || null;
        };
        UIMgr.prototype.hideLoading = function (loadClass, uiName, destroy, rm_now) {
            if (uiName === void 0) { uiName = ""; }
            if (destroy === void 0) { destroy = true; }
            if (rm_now === void 0) { rm_now = true; }
            if (uniLib.GameModuleUtils.lastGameInfo && uniLib.GameModuleUtils.lastGameInfo.preloadUIAutoHide == false && uniLib.GameModuleUtils.lastGameInfo.preloadUI) {
                loadClass = uniLib.GameModuleUtils.lastGameInfo.preloadUI;
                rm_now = false;
            }
            if (uiName == "") {
                if (loadClass && loadClass != null) {
                    uiName = egret.getQualifiedClassName(loadClass);
                }
                else {
                    uiName = egret.getQualifiedClassName(this._commonLoadUI);
                    loadClass = this._commonLoadUI;
                }
            }
            if (this._loadings[uiName] != null) {
                // if (this._loadings[uiName]["setProgress"]) {
                //     this._loadings[uiName].setProgress(2, 100);
                // }
                if (rm_now == true) {
                    uniLib.DisplayUtils.removeFromParent(this._loadings[uiName]);
                }
                else {
                    if (this._loadings[uiName]["destroy"]) {
                        this._loadings[uiName]["destroy"]();
                    }
                    else {
                        uniLib.DisplayUtils.removeFromParent(this._loadings[uiName]);
                    }
                }
                if (destroy) {
                    //console.error("hideLoading:" + uiName);
                    this._loadings[uiName] = null;
                    delete this._loadings[uiName];
                }
            }
        };
        UIMgr.prototype.hideUI = function (ui, destroy) {
            if (destroy === void 0) { destroy = true; }
            var uiName = egret.getQualifiedClassName(ui);
            uniLib.DisplayUtils.removeFromParent(this._uis[uiName]);
            if (destroy) {
                this._uis[uiName] = null;
                delete this._uis[uiName];
            }
        };
        UIMgr.prototype.destroyUI = function (ui) {
            var uiName = egret.getQualifiedClassName(ui);
            if (this._uis[uiName] != null && this._uis[uiName] != undefined) {
                uniLib.DisplayUtils.removeFromParent(this._uis[uiName]);
                delete this._uis[uiName];
            }
        };
        UIMgr.prototype.clearOldSceneUis = function () {
            //var common_uiName: string = "";
            //common_uiName = egret.getQualifiedClassName(this._commonLoadUI);
            if (this._uis) {
                for (var uiName in this._uis) {
                    var element = this._uis[uiName];
                    if (element && element.parent == null) {
                        delete this._uis[uiName];
                    }
                }
            }
            if (this._loadings) {
                for (var uiName in this._loadings) {
                    var element = this._loadings[uiName];
                    if (element && element.parent == null) {
                        delete this._loadings[uiName];
                    }
                }
            }
        };
        UIMgr._self = null;
        return UIMgr;
    }());
    uniLib.UIMgr = UIMgr;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    ////////////////////////////////////////////////////////////////////////
    /// 消息收发过程中的实用类
    function checkServerReturnCodeError(recv, errorObj) {
        if (recv == null)
            return true;
        if (uniLib.StringUtils.stringIsNullOrEmpty(recv.errno))
            return false;
        if (recv.errno == "0")
            return false;
        return true;
    }
    uniLib.checkServerReturnCodeError = checkServerReturnCodeError;
    function doServerReturnCodeError(recv, self) {
        if (recv == null)
            return true;
        if (!recv.errno) {
            recv.errno = "0";
        }
        switch (Number(recv["errno"])) {
            //case Pmd.HttpReturnCode.HttpReturnCode_DbError:
            case Pmd.HttpReturnCode.HttpReturnCode_SignError:
                if (uniLib.Global.isH5) {
                    uniLib.HttpClient._reconnectTimes++;
                    if (uniLib.HttpClient._reconnectTimes > 5) {
                        uniLib.Utils.clearLocalStorage();
                        uniLib.Global.LobbyPlatInfo = null;
                        uniLib.Utils.restart("登录服务器失败,请重新登录!", "确定");
                    }
                    else {
                        self.reLogin();
                    }
                }
                else {
                    uniLib.Utils.clearLocalStorage();
                    uniLib.Global.LobbyPlatInfo = null;
                    uniLib.Utils.restart("欢迎回来，点击确定将登录游戏", "确定");
                }
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_ServerShutDown:
                //Utils.clearLocalStorage();
                if (uniLib.Global.hasEventListener(uniLib.ZqEvent.ON_SERVER_SHUTDOWN)) {
                    uniLib.Global.dispatchEvent(uniLib.ZqEvent.ON_SERVER_SHUTDOWN, { "gameId": self.GameID, "zoneId": self.ZoneID });
                }
                else {
                    //Global.LobbyPlatInfo = null;
                    uniLib.Utils.restart("连接服务器失败,请重新尝试!", "确定");
                }
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_GameZoneListError:
                uniLib.Utils.clearLocalStorage();
                uniLib.Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("找不到游戏区列个,请重新登录!", "确定");
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_JsonSyntaxError:
            case Pmd.HttpReturnCode.HttpReturnCode_JsonMessageError:
                uniLib.Utils.clearLocalStorage();
                uniLib.Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("登陆协议语法错误,请重新尝试!", "确定");
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_TokenValueError:
                uniLib.Utils.clearLocalStorage();
                uniLib.Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("认证信息为空 ,请重新尝试!", "确定");
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_LuaScriptError:
                if (uniLib.Global.debugLevel > 0) {
                    uniLib.Utils.restart("游戏服务器脚本出错,请重新尝试!", "确定");
                }
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_SdkCheckSignErr:
                uniLib.Utils.clearLocalStorage();
                uniLib.Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("第三方认证错误 ,请重新尝试!", "确定");
                return false;
            // break;
            case Pmd.HttpReturnCode.HttpReturnCode_NoSdkServer:
            case Pmd.HttpReturnCode.HttpReturnCode_Sdk3PartyServerErr:
                uniLib.Utils.clearLocalStorage();
                uniLib.Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("第三方认证服务器未开 ,请重新尝试!", "确定");
                return false;
            // break;
            case Pmd.HttpReturnCode.HttpReturnCode_NoGatewaytDown:
                //Utils.clearLocalStorage();
                //Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("没有可用网关,请重新尝试!", "确定");
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_ProtobufErr:
                uniLib.Utils.clearLocalStorage();
                uniLib.Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("协议语法错误,请重新尝试!", "确定");
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_GatewayErr:
                uniLib.Utils.clearLocalStorage();
                uniLib.Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("网关错误,请重新尝试!", "确定");
                break;
            case Pmd.HttpReturnCode.HttpReturnCode_Timeout:
                //Utils.clearLocalStorage();
                //Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("登陆协议返回超时,请重新尝试!", "确定");
                return false;
            // break;
            default:
                uniLib.Utils.clearLocalStorage();
                uniLib.Global.LobbyPlatInfo = null;
                uniLib.Utils.restart("登录服务器失败,请重新登录!", "确定");
                break;
        }
        return true;
    }
    uniLib.doServerReturnCodeError = doServerReturnCodeError;
})(uniLib || (uniLib = {}));

/// <reference path="Common.ts" />
var uniLib;
(function (uniLib) {
    /**
     * 基于`HTTP`的json通信
     */
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
            this.checkingGateWayUrl = false;
            this.OnResponse = function (msg) {
                // 得到消息响应函数
                var segments = msg.do.split(".");
                segments[segments.length - 1] = "On" + segments[segments.length - 1];
                var f;
                var defineName = "";
                for (var i = 0; i < segments.length; i++) {
                    defineName += segments[i] + (i == segments.length - 1 ? "" : ".");
                }
                if (uniLib.getDefinitionByName(defineName) != null) {
                    f = uniLib.getDefinitionByName(defineName);
                }
                if (f == null) {
                    uniLib.Console.warn("[HTTP RUN] unprocessed network message: " + JSON.stringify(msg));
                    return false;
                }
                // 消息响应
                try {
                    f(msg["data"]);
                    return true;
                }
                catch (e) {
                    uniLib.Console.error("[HTTP RUN ERROR]" + e.toString() + "\n" + JSON.stringify(msg));
                }
                return false;
            };
        }
        /**
         * 初始化登陆信息
         */
        HttpClient.prototype.init = function (url, gameID, zoneId) {
            this.LoginUrl = url;
            //if (Boolean(BrowersUtils.GetRequest("debug")) === true) {
            //if (BrowersUtils.GetRequest("port")) {
            //    var oldPort: string = this.LoginUrl.slice(StringUtils.getPosition(this.LoginUrl, ":", 2), StringUtils.getPosition(this.LoginUrl, "/", 3));
            //    this.LoginUrl = this.LoginUrl.replace(oldPort + "/", ":" + BrowersUtils.GetRequest("port") + "/");
            //}
            this.GameID = Number(gameID);
            this.ZoneID = Number(zoneId);
            if (uniLib.BrowersUtils.GetRequest("debug") == "true") {
                if (uniLib.BrowersUtils.GetRequest("loginUrl")) {
                    this.LoginUrl = uniLib.BrowersUtils.GetRequest("loginUrl");
                }
                if (!uniLib.StringUtils.stringIsNullOrEmpty(uniLib.BrowersUtils.GetRequest("gameid"))) {
                    this.GameID = Number(uniLib.BrowersUtils.GetRequest("gameid"));
                }
                if (uniLib.BrowersUtils.GetRequest("zoneid") != null && uniLib.BrowersUtils.GetRequest("zoneid") != NaN) {
                    this.ZoneID = Number(uniLib.BrowersUtils.GetRequest("zoneid"));
                }
                if (uniLib.BrowersUtils.GetRequest("cacheToken") == "false") {
                    uniLib.Global.isCacheToken = false;
                }
            }
            //if (zoneId) {
            //    this.ZoneID = zoneId;
            //} else if (!StringUtils.stringIsNullOrEmpty(BrowersUtils.GetRequest("zoneid"))) {
            //    this.ZoneID = Number(BrowersUtils.GetRequest("zoneid"));
            //}
        };
        HttpClient.prototype.initCallBack = function (callback, loginFail, obj) {
            if (callback)
                this._loginCallBackFunction = callback;
            if (loginFail)
                this._loginFail = loginFail;
            if (obj)
                this._loginCallBackObj = obj;
        };
        /**
         * 登陆平台
         */
        HttpClient.prototype.h5platLogin = function (zoneId, callback, loginFail, obj) {
            if (zoneId) {
                this.ZoneID = zoneId;
            }
            if (callback)
                this._loginCallBackFunction = callback;
            if (loginFail) {
                this._loginFail = loginFail;
            }
            if (obj)
                this._loginCallBackObj = obj;
            if (uniLib.StringUtils.stringIsNullOrEmpty(this.LoginUrl) || !this.GameID) {
                uniLib.Console.error("请先使用init方法初始化连接信息");
                return;
            }
            ////xuyong//准备移到global.init
            //if (browersutils.getrequest("platid")) {
            //    global.platid = parseint(browersutils.getrequest("platid"));
            //} else
            //    global.platid = pmd.plattype.plattype_normal;
            ////paymgr.instance.initpayplatbyid(global.platid);
            //Global.
            //if (uniLib.Global.isH5) {
            //    var platstr: string = Utils.getLocalStorage("platStr");
            //    if (!StringUtils.stringIsNullOrEmpty(platstr)) {
            //        var values: any = BrowersUtils.GetRequests(platstr);
            //        for (var str in values) {
            //            if (str == "platid") {
            //                Global.platInfo[str] = values[str];
            //                break;
            //            }
            //        }
            //    } else {
            //        Global.platInfo.platid = BrowersUtils.GetRequest("platid");
            //    }
            //}
            this.platInfo = uniLib.Global.initPlatInfo();
            //if (this.platInfo.platid == Pmd.PlatType.PlatType_RONGQIANG || this.platInfo.platid == Pmd.PlatType.PlatType_RongQiangApp)
            //    this.ZoneID = 100;
            if (this.ZoneID) {
                this.login(this.platInfo);
            }
            else {
                this.requestZoneList(this.GameID, this.onGetZoneList, this);
            }
        };
        HttpClient.prototype.onGetZoneList = function (data) {
            var onLineNum = 0;
            if (data && data.zonelist && data.zonelist.length > 0) {
                data.zonelist.sort(function (a, b) {
                    return a.onlinenum - b.onlinenum;
                });
                this.ZoneID = data.zonelist[0].zoneid;
            }
            //for (var i in this.ZoneList) {
            //    if (this.ZoneList[i].state == Pmd.ZoneState.Normal) {
            //        if (onLineNum == 0 || onLineNum > this.ZoneList[i].onlinenum) {
            //            onLineNum = this.ZoneList[i].onlinenum;
            //            this.ZoneID = this.ZoneList[i].zoneid;
            //        }
            //    }
            //}
            if (this.ZoneID)
                this.login(this.platInfo);
            else
                uniLib.Console.error("当前没有区服可用!!!");
        };
        /**
         * 登陆验证
         * @param callback: 登陆回调
         */
        HttpClient.prototype.login = function (msg) {
            if (uniLib.Global.LobbyPlatInfo /* && Global.LobbyPlatInfo.platinfo != null && Global.LobbyPlatInfo.platinfo.uid == msg.uid*/) {
                uniLib.NetMgr.UID = Number(uniLib.Global.LobbyPlatInfo.uid);
                uniLib.BrowersUtils.extData.inviter = uniLib.NetMgr.UID.toString();
                //this.SID = Global.LobbyPlatInfo.sid;
                if (uniLib.Global.LobbyPlatInfo["GatewayUrl"])
                    this.GatewayUrl = uniLib.Global.LobbyPlatInfo["GatewayUrl"];
                uniLib.NetMgr.PlatToken = uniLib.Global.LobbyPlatInfo.unigame_plat_login;
                uniLib.NetMgr.PlatKey = uniLib.Global.LobbyPlatInfo.unigame_plat_key;
                uniLib.NetMgr.platTokenTimeOut = uniLib.Global.LobbyPlatInfo.unigame_plat_login_life;
                if (uniLib.Global.LobbyPlatInfo.platinfo) {
                    this.platInfo = uniLib.Global.LobbyPlatInfo.platinfo;
                    // NetMgr.PlatUID = Global.LobbyPlatInfo.platinfo.uid;
                    if (this.platInfo.account) {
                        uniLib.NetMgr.PlatUID = this.platInfo.account;
                    }
                    else {
                        uniLib.NetMgr.PlatUID = this.platInfo.uid;
                    }
                }
                else {
                    uniLib.NetMgr.PlatUID = uniLib.NetMgr.UID.toString();
                }
                if (this.ZoneID) {
                    if (this._loginCallBackFunction)
                        this._loginCallBackFunction.call(this._loginCallBackObj, uniLib.Global.LobbyPlatInfo.platinfo);
                    uniLib.Utils.setLocalStorage(CommonConsts.UNI_LAST_PLAT_INFO, uniLib.Global.platId);
                    //if (this._loginFail)
                    //    this._loginFail = null;
                    //if (this._loginCallBackObj)
                    //    this._loginCallBackObj = null;
                }
            }
            else {
                var platLogin = new Pmd.PlatTokenLogin();
                platLogin.platinfo = msg;
                // if (platLogin.platinfo) {
                //     if (platLogin.platinfo.account == null || platLogin.platinfo.account == "") {
                //         let userKey: string = Utils.getLocalStorage("agent_user_Key");//游客信息
                //         if (userKey) {
                //             platLogin.platinfo.imei = Date.now() + "-" + Math.random();
                //             platLogin.platinfo.account = Date.now() + "-" + Math.random();
                //             Utils.setLocalStorage("agent_user_Key", platLogin.platinfo.imei);//保存游客信息
                //         } else {
                //             platLogin.platinfo.imei = userKey;
                //             platLogin.platinfo.account = userKey;
                //         }
                //     }
                // }
                this.initLogin(uniLib.Global.platInfo.platid, platLogin);
            }
        };
        //private _xhr: XMLHttpRequest;
        /**
         * 底层消息发送
         * @param url: 目标地址
         * @param method: 发送消息的`do`字段值，标识消息行为
         * @param message: 消息内容
         * @param callback: 消息响应函数，缺省采用`OnResponse`
         */
        HttpClient.prototype.sendTo = function (url, method, message, callback, compress) {
            //if (!uniLib.Global.isH5) {
            //    compress = CompressUtil.NONE;
            //}
            var _this = this;
            if (compress === void 0) { compress = uniLib.CompressType.NONE; }
            var cmd = new Pmd.HttpPackage();
            var time;
            if (method == "Pmd.CreatePlatOrderRequestSdkPmd_C") {
                uniLib.PayMgr.Instance.lastRechargeInfo = message;
            }
            cmd.do = method;
            cmd["data"] = message;
            if (!uniLib.StringUtils.stringIsNullOrEmpty(uniLib.NetMgr.ZoneUID))
                cmd.uid = uniLib.NetMgr.ZoneUID;
            else if (uniLib.NetMgr.UID)
                cmd.uid = uniLib.NetMgr.UID.toString();
            if (this.GameID)
                cmd.gameid = this.GameID;
            if (this.ZoneID && this.ZoneID != -1)
                cmd.zoneid = this.ZoneID;
            if (!uniLib.StringUtils.stringIsNullOrEmpty(uniLib.NetMgr.PlatToken)) {
                cmd.unigame_plat_login = uniLib.NetMgr.PlatToken;
                time = Math.floor(new Date().getTime() / 1000);
                cmd.unigame_plat_timestamp = time;
            }
            var str = JSON.stringify(cmd);
            var tmpstr;
            var sliceStr = "?";
            //if (!StringUtils.stringIsNullOrEmpty(this.SID)) {
            //    url += sliceStr + "smd=md5&sign=" + StringUtils.MD5(str + this.SID);
            //    sliceStr = "&";
            //}
            if (!uniLib.StringUtils.stringIsNullOrEmpty(uniLib.NetMgr.PlatKey)) {
                url += sliceStr + "unigame_plat_sign=" + uniLib.StringUtils.MD5(str + (time ? time.toString() : "") + uniLib.NetMgr.PlatKey) + "&do=" + cmd.do;
                sliceStr = "?";
            }
            this._resq = new uniLib.HttpRequest(function (e) { return _this.onHttpComplete(e, callback, compress); }, function (e) {
                if (callback == null || callback(null) == false) {
                    if (this.onHttpError() == false) {
                        uniLib.Utils.restart("登陆错误,请重新登陆", "确定");
                    }
                    uniLib.Console.error("网络请求失败,请检查网络:" + url);
                }
            }, this);
            tmpstr = str;
            if (compress != uniLib.CompressType.NONE) {
                url += sliceStr + "compress=" + uniLib.CompressUtil.compressStr[compress];
                sliceStr = "?";
                var u8 = uniLib.CompressUtil.stringToArray(str, new Array(str.length));
                //console.error(u8);
                str = uniLib.CompressUtil.compressByType(u8, compress);
                //console.error(str);
                this._resq.dataFormat = "binary";
                //if (loader)
                //    loader.dataFormat = "binary";
                //if (_xhr)
                //    _xhr.responseType = "arraybuffer";
            }
            if (uniLib.Global.platInfo && uniLib.Global.platInfo.imei) {
                url += sliceStr + "imei=" + uniLib.Global.platInfo.imei;
                sliceStr = "?";
                if (uniLib.Global.platInfo.osname) {
                    url += sliceStr + "osname=" + uniLib.Global.platInfo.osname;
                    sliceStr = "?";
                }
            }
            if (uniLib.Console.isDevMode) {
                //var tempStr = str.match(/"do":".*?"/)[0];
                //var otherTxt = str.split(/"do":".*?"/);
                //uniLib.Console.log("[%cHTTP SEND" + "%c] " + otherTxt[0] + "%c" + tempStr + "%c" + otherTxt[1] + "\n" + url, "color:blue;font-weight:bold", "", "color:blue", "");
                uniLib.Console.log("[HTTP SEND] " + tmpstr + "\n" + url);
            }
            this._resq.open(url);
            this._resq.send(str);
        };
        HttpClient.prototype.onHttpComplete = function (msg, callback, compress) {
            var self = this;
            var url;
            var js;
            //if (uniLib.getQualifiedClassName(msg) == "egret.Event") {
            //    var loader = msg.target;
            //    url = loader._request.url;
            //    js = loader.data;
            //} else {
            //    url = msg.url;
            //    js = msg.data;
            //}
            url = self._resq.url;
            js = msg;
            //var loader: egret.URLLoader = <egret.URLLoader>event.target;
            //var url = loader._request.url;
            var recv;
            if (compress != uniLib.CompressType.NONE) {
                var u8 = new Uint8Array(js);
                js = uniLib.CompressUtil.uncompressByType(u8, compress);
                js = uniLib.CompressUtil.Utf8ArrayToStr(js);
            }
            if (uniLib.Console.isDevMode) {
                //var mach: any = js.match(/"do":".*?"/);
                //if (mach != null && mach.length > 0) {
                //    var tempStr = js.match(/"do":".*?"/)[0];
                //    var otherTxt = js.split(/"do":".*?"/);
                //    uniLib.Console.log("[%cHTTP RECV" + "%c] " + otherTxt[0] + "%c" + tempStr + "%c" + otherTxt[1] + "\n" + url, "color:green;font-weight:bold", "", "color:green", "");
                //} else {
                //    uniLib.Console.log("[%cHTTP RECV" + "%c] " + js + "\n" + url, "color:green;font-weight:bold");
                //}
                uniLib.Console.log("[HTTP RECV] " + js + "\n" + url);
            }
            recv = JSON.parse(js);
            if (recv.gameid)
                self.GameID = recv.gameid;
            if (recv.zoneid)
                self.ZoneID = recv.zoneid;
            if (uniLib.checkServerReturnCodeError(recv, self)) {
                if (recv.do == "Pmd.MobileRegeristReturnCreateAccountFailLoginUserPmd_S" || recv.do == "Pmd.UserRequestPlatTokenLoginFailLoginUserPmd_S" || recv.do == "plat-token-login" || recv.do == "request-select-zone" || recv.do == "Pmd.EmailRegeristReturnCreateAccountFailLoginUserPmd_S") {
                    uniLib.Utils.clearLocalStorage(uniLib.Global.gameId + "|" + uniLib.Global.getPlatId() + "|platToken");
                    if (self.onHttpError(null, recv) == true) {
                        return;
                    }
                }
                if (recv.do == "Pmd.MobileRegistReturnRandCodeLoginUserPmd_S" || recv.do == "Pmd.MobileRegeristReturnRandCodeLoginUserPmd_S" || recv.do == "Pmd.MobileRegistRequestRandCodeLoginUserPmd_C") {
                    if (callback(recv) == true) {
                        return;
                    }
                }
                uniLib.Console.error("[HTTP RECV ERROR] " + js + "\n" + url);
                uniLib.doServerReturnCodeError(recv, self);
                return;
            }
            HttpClient._reconnectTimes = 0;
            if (callback != null) {
                callback(recv["data"]);
            }
            else if (self.OnResponse != null) {
                self.OnResponse(recv);
            }
        };
        HttpClient.prototype.reLogin = function () {
            uniLib.Utils.clearLocalStorage(uniLib.Global.gameId + "|" + uniLib.Global.getPlatId() + "|platToken");
            uniLib.Global.LobbyPlatInfo = null;
            this.h5platLogin();
        };
        HttpClient.prototype.onHttpError = function (event, data) {
            if (event === void 0) { event = null; }
            //var loader: egret.URLLoader = <egret.URLLoader>event.target;
            //var url = loader._request.url;
            if (this._loginFail) {
                var ret = this._loginFail.call(this._loginCallBackObj, data ? data.data : 0); //这个回调必须返回true或者false,表示是否已经处理了该错误,如果没有处理错误,底层会继续处理抛出异常,方便排错
                this._loginFail = null;
                this._loginCallBackFunction = null;
                this._loginCallBackObj = null;
                if (ret == true) {
                    return true;
                }
            }
            else {
                uniLib.Console.log("onHttpError _loginFail nil");
            }
            return false;
            //uniLib.Console.error("[HTTP SEND ERROR] " + url);
        };
        /**
         * 登陆
         * @param callback: 登陆返回
         */
        HttpClient.prototype.initLogin = function (loginType, msg, compress) {
            if (compress === void 0) { compress = uniLib.CompressType.NONE; }
            var self = this;
            uniLib.Global.getPlatToken(function (data) {
                // console.error("test22:"+JSON.stringify(data));
                if (data != null && uniLib.Global.isCacheToken == true) {
                    var platLogin = data;
                    // if (self.GameID == 170 || self.GameID == 188)
                    //     Global.LobbyPlatInfo = platLogin;
                    if (uniLib.Global.LobbyPlatInfo == null && uniLib.Global.lobbyMode == true) {
                        uniLib.Global.LobbyPlatInfo = platLogin;
                    }
                    if (platLogin.GatewayUrl) {
                        self.GatewayUrl = platLogin.GatewayUrl;
                        if (self._loginCallBackFunction)
                            self._loginCallBackFunction.call(self._loginCallBackObj, platLogin.platinfo);
                        if (self._loginFail) {
                            self._loginFail = null;
                        }
                        if (self._loginCallBackObj)
                            self._loginCallBackObj = null;
                        uniLib.Utils.setLocalStorage(CommonConsts.UNI_LAST_PLAT_INFO, uniLib.Global.platId);
                    }
                    else {
                        if (self.ZoneID != -1) {
                            self.selectZone(self.ZoneID, function () {
                                self.loginSuccess(self.platInfo);
                            }, self);
                        }
                    }
                }
                else {
                    // if (!msg.platinfo.platid) {
                    //     msg.platinfo.platid = 0;
                    // }
                    if (msg.platinfo) {
                        if (!msg.platinfo.platid || Number(msg.platinfo.platid == 0)) {
                            if (msg.platinfo.account == null || msg.platinfo.account == "") {
                                if (msg.platinfo.imei) {
                                    msg.platinfo.account = msg.platinfo.imei;
                                }
                                else {
                                    var userKey = uniLib.Utils.getLocalStorage("agent_user_Key"); //游客信息
                                    if (userKey) {
                                        if (msg.platinfo.imei == null || msg.platinfo.imei == "")
                                            msg.platinfo.imei = userKey;
                                        msg.platinfo.account = userKey;
                                    }
                                    else {
                                        userKey = Date.now() + "-" + Math.random();
                                        uniLib.Utils.setLocalStorage("agent_user_Key", userKey); //保存游客信息
                                        if (msg.platinfo.imei == null || msg.platinfo.imei == "")
                                            msg.platinfo.imei = userKey;
                                        msg.platinfo.account = userKey;
                                    }
                                }
                            }
                        }
                    }
                    self.sendTo(self.LoginUrl, "plat-token-login", msg, function (recv) {
                        if (self.cacheLoginInfo(recv) == false) {
                            return false;
                        }
                        //self._loginFail = null;//这里不需要,要等选区成功后再loginSuccess去掉更安全
                        if (self.ZoneID != -1) {
                            self.selectZone(self.ZoneID, function () {
                                self.loginSuccess(recv.platinfo);
                            }, self, compress);
                        }
                        else {
                            self.loginSuccess(recv.platinfo);
                        }
                        return true;
                    }, compress);
                }
                uniLib.Global.zoneId = self.ZoneID;
            });
            /* else if (this.hasPlatInfoCached() && Global.getPlatToken().platinfo.uid == msg.platinfo.uid) {
            var platLogin: Pmd.PlatTokenLoginReturn = Global.getPlatToken();
            if (this.GameID == 170 || this.GameID == 188)
                Global.LobbyPlatInfo = platLogin;
            if (this.ZoneID != -1) {
                this.selectZone(this.ZoneID, function () {
                    self.loginSuccess(this.platInfo);
                }, self);
            }
        } */
        };
        HttpClient.prototype.loginSuccess = function (data) {
            if (this._loginCallBackFunction) {
                this._loginCallBackFunction.call(this._loginCallBackObj, data);
            }
            if (this._loginFail) {
                this._loginFail = null;
            }
            uniLib.Utils.setLocalStorage(CommonConsts.UNI_LAST_PLAT_INFO, uniLib.Global.platId);
        };
        /**
        * 查询区列表
        *
        **/
        HttpClient.prototype.requestZoneList = function (gameId, callback, obj, compress) {
            var _this = this;
            var msg = new Pmd.RequestZoneList();
            this.sendTo(this.LoginUrl, "request-zone-list", msg, function (recv) {
                _this.ZoneList = recv.zonelist;
                if (callback != null) {
                    callback.call(obj, recv);
                }
                return true;
            }, compress);
        };
        HttpClient.prototype.reSelectZone = function (callBack, thisObj) {
            var self = this;
            self.GatewayUrl = null;
            uniLib.Global.LobbyPlatInfo["GatewayUrl"] = null;
            self.selectZone(self.ZoneID, function () {
                callBack.call(thisObj);
            }, self);
        };
        HttpClient.prototype.selectZone = function (zoneId, callBack, thisObj, compress) {
            if (compress === void 0) { compress = uniLib.CompressType.NONE; }
            var self = this;
            //var onInited = function (): void {
            if (zoneId)
                self.ZoneID = zoneId;
            var cmd_gateway = new Pmd.RequestSelectZone();
            self.sendTo(self.LoginUrl, "request-select-zone", cmd_gateway, function (recv) {
                //var reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
                //var ips = reg.exec(recv.gatewayurl);
                //if (ips && ips.length > 0 && (ips[0] == "114.119.6.83" || ips[0] == "14.17.104.56")) {
                //    if (ips[0] == "114.119.6.83") {
                //        recv.gatewayurl = recv.gatewayurl.replace(ips[0], "login.publish.bwgame.com.cn");
                //    } else
                //        recv.gatewayurl = recv.gatewayurl.replace(ips[0], "server.login.bwgame.com.cn");
                //}
                if (recv && recv.gatewayurl)
                    self.GatewayUrl = recv.gatewayurl;
                uniLib.Global.getPlatToken(function (data) {
                    if (data != null && uniLib.Global.isCacheToken == true) {
                        var info = data;
                        if (info) {
                            if (recv) {
                                if (recv.gatewayurl) {
                                    info.GatewayUrl = recv.gatewayurl;
                                    info.GatewayUrlWs = recv.gatewayurlws + "/json";
                                }
                            }
                            if (uniLib.Global.isCacheToken == true) {
                                uniLib.Global.setPlatToken(info, uniLib.Global.getPlatId(), self.GameID);
                            }
                        }
                        if (recv && recv["zoneuid"])
                            uniLib.NetMgr.ZoneUID = recv["zoneuid"];
                        // if (self.GameID == 170 || self.GameID == 188) {
                        //     Global.LobbyPlatInfo["GatewayUrl"] = recv.gatewayurl;
                        // }
                        uniLib.Global.LobbyPlatInfo = info;
                    }
                });
                if (callBack) {
                    callBack.call(thisObj);
                }
                return true;
            }, compress);
            //}
            //PayMgr.Instance.initPayPlatById(Global.platId, onInited);
        };
        /**
         * 高级消息发送
         * @param method: 发送消息的`do`字段值，标识消息行为
         * @param message: 消息内容
         * @param callback: 消息响应函数，缺省采用`OnResponse`
         */
        HttpClient.prototype.sendMessage = function (method, message, callback, compress, url) {
            var self = this;
            if (url) {
                this.sendTo(url, method, message, callback, compress);
                return;
            }
            if (uniLib.StringUtils.stringIsNullOrEmpty(this.GatewayUrl)) {
                var info;
                if (this.checkingGateWayUrl == false) {
                    this.checkingGateWayUrl = true;
                    if (uniLib.Global.LobbyPlatInfo) {
                        info = uniLib.Global.LobbyPlatInfo;
                        if (info && info.GatewayUrl) {
                            this.GatewayUrl = info.GatewayUrl;
                        }
                        else {
                            //console.error("没有找到登录数据，请登录后再发送请求：" + JSON.stringify(message));
                            this.selectZone(null, function () {
                                self.sendTo(this.GatewayUrl, method, message, callback, compress);
                            }, this, compress);
                            return;
                        }
                    }
                    else {
                        uniLib.Global.getPlatToken(function (data) {
                            if (data != null && uniLib.Global.isCacheToken == true) {
                                var info = data;
                                if (info && info.GatewayUrl)
                                    self.GatewayUrl = info.GatewayUrl;
                                else {
                                    uniLib.Console.error("没有找到登录数据，请登录后再发送请求：" + JSON.stringify(message));
                                    return;
                                }
                            }
                            else {
                                self.selectZone(null, function () {
                                    self.sendTo(self.GatewayUrl, method, message, callback, compress);
                                }, self, compress);
                                return;
                            }
                        });
                    }
                }
            }
            /* real send */
            this.sendTo(this.GatewayUrl, method, message, callback, compress);
        };
        /**
         * 应用层消息发送
         * @param message: protobuf生成消息
         * @param callback: 消息响应函数，缺省采用`OnResponse`对应的分发方式
         */
        HttpClient.prototype.send = function (message, callback, compress, url) {
            this.sendMessage(message["GetType"] ? message["GetType"]() : (message["do"] || message["cmd_name"]), message, callback, compress, url);
        };
        /**
         * 应用层消息直接发送给自己并进行响应，通常用于本地模拟或调试
         * @param message: protobuf生成消息
         * @param callback: 消息响应函数，缺省采用`OnResponse`对应的分发方式
         */
        HttpClient.prototype.sendToMe = function (message, callback) {
            if (callback != null) {
                callback(message);
            }
            else if (this.OnResponse != null) {
                var cmd = new Pmd.HttpPackageReturn();
                cmd.gameid = this.GameID;
                cmd.zoneid = this.ZoneID;
                //cmd.uid = this.UID;
                cmd.do = message.GetType();
                cmd["data"] = message;
                this.OnResponse(cmd);
            }
        };
        //private hasPlatInfoCached(): boolean {
        //    try {
        //        Utils.getLocalStorage(this.GameID + "|" + (Global.platInfo.platid == null ? 0 : Global.platInfo.platid) + "|platToken", function (data) {
        //            var cookie = data;
        //            return (cookie != null ? true : false);
        //        });
        //    } catch (e) {
        //        return false;
        //    }
        //}
        // public getCachedPlatInfo(onGetCached: Function, thisObj?: any): any {
        //     var platid: number = 0;
        //     //if (Global.platInfo) {
        //     //    platid = Global.platInfo.platid == null ? 0 : Global.platInfo.platid;
        //     //}
        //     platid = Global.getPlatId();
        //     var obj = Global.getPlatToken(onGetCached,thisObj);
        //     return obj;
        // }
        HttpClient.prototype.cacheLoginInfo = function (info) {
            if (!info) {
                return false;
            }
            var platid = 0;
            if (info.platinfo) {
                if (info.platinfo.account) {
                    uniLib.NetMgr.PlatUID = info.platinfo.account;
                }
                else {
                    uniLib.NetMgr.PlatUID = info.platinfo.uid;
                }
                // NetMgr.PlatUID = info.platinfo.uid;
                uniLib.NetMgr.PlatSession = info.platinfo.sign;
                platid = uniLib.Global.getPlatId();
            }
            uniLib.NetMgr.UID = Number(info.uid);
            //info.platinfo.platid
            uniLib.BrowersUtils.extData.inviter = uniLib.NetMgr.UID.toString();
            uniLib.NetMgr.SID = info.sid;
            uniLib.NetMgr.PlatToken = info.unigame_plat_login;
            uniLib.NetMgr.PlatKey = info.unigame_plat_key;
            uniLib.NetMgr.platTokenTimeOut = info.unigame_plat_login_life;
            // if (Global.gameId == 170 || Global.gameId == 188)
            //     Global.LobbyPlatInfo = info;
            if (uniLib.Global.lobbyMode == true)
                uniLib.Global.LobbyPlatInfo = info;
            try {
                if (uniLib.Global.isCacheToken == true) {
                    // Utils.setLocalStorage(this.GameID + "|" + platid + "|platToken", JSON.stringify(info));
                    uniLib.Global.setPlatToken(info, platid, this.GameID);
                }
            }
            catch (e) {
            }
            return true;
        };
        HttpClient.prototype.cachePhoneLoginInfo = function (info, platid) {
            //NetMgr.PlatUID = info.platinfo.uid;
            uniLib.NetMgr.UID = Number(info.uid);
            //NetMgr.PlatSession = info.platinfo.sign;
            uniLib.BrowersUtils.extData.inviter = uniLib.NetMgr.UID.toString();
            //NetMgr.SID = info.sid;
            uniLib.NetMgr.PlatToken = info.platlogin;
            uniLib.NetMgr.PlatKey = info.platkey;
            uniLib.NetMgr.platTokenTimeOut = info.platloginlife;
            var cinfo = {};
            cinfo.uid = info.uid;
            cinfo.unigame_plat_login = info.platlogin;
            cinfo.unigame_plat_key = info.platkey;
            cinfo.unigame_plat_login_life = info.platloginlife;
            uniLib.Global.platId = platid;
            // if (Global.gameId == 170 || Global.gameId == 188)
            //     Global.LobbyPlatInfo = cinfo;
            if (uniLib.Global.lobbyMode == true) {
                uniLib.Global.LobbyPlatInfo = cinfo;
            }
            try {
                if (uniLib.Global.isCacheToken == true) {
                    // Utils.setLocalStorage(this.GameID + "|" + platid + "|platToken", JSON.stringify(cinfo));
                    uniLib.Global.setPlatToken(cinfo, platid, this.GameID);
                }
            }
            catch (e) {
            }
        };
        HttpClient.prototype.delLocalStoryge = function () {
            try {
                uniLib.Utils.clearLocalStorage(uniLib.Global.gameId + "|" + uniLib.Global.getPlatId() + "|platToken");
            }
            catch (e) {
            }
        };
        /**
         * @remark http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
         */
        HttpClient.prototype.generateUUID = function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };
        HttpClient._reconnectTimes = 0; //这里是所有HTTP请求统一使用一个计数,因为每次连接都会重新new,否则会变成0
        return HttpClient;
    }());
    uniLib.HttpClient = HttpClient;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var HttpRequest = /** @class */ (function () {
        function HttpRequest(callBack, err, thisObj) {
            this.isOriType = true;
            this._dtype = "text";
            this._call = callBack;
            this._err = err;
            this._this = thisObj;
        }
        HttpRequest.prototype.open = function (url, data, isFormData) {
            var _this = this;
            if (isFormData === void 0) { isFormData = false; }
            var self = this;
            var onReadyState = function () {
                if (self._xhr.readyState == 4) {
                    var ioError = (self._xhr.status >= 400 || self._xhr.status == 0);
                    if (ioError) {
                        self.onHttpError(self._xhr.status);
                        //alert("连接服务器失败，请检查您的网络。");
                    }
                    else {
                        if (self._dtype == "arraybuffer" && self._xhr.response.byteLength > 0) {
                            self.onCallBack(self._xhr.response);
                        }
                        else {
                            self.onCallBack(self._xhr.responseText);
                        }
                    }
                }
                else if (self._xhr.readyState == 1) {
                    if (data)
                        self._xhr.send(data);
                }
            };
            self.url = url;
            this._xhr = uniLib.BrowersUtils.getXHR();
            if (window["XMLHttpRequest"]) {
                this.isOriType = true;
            }
            else {
                this.isOriType = false;
            }
            if (!this.isOriType) {
                this._xhr.dataFormat = this._dtype;
                this._xhr.addEventListener("complete", function (e) { return _this.onCallBack(e); }, this);
                this._xhr.addEventListener("ioError", this.onHttpError, this);
            }
            else {
                this._xhr.open("post", url, true);
                if (!isFormData) {
                    this._xhr.setRequestHeader("Content-Type", "multipart/form-data");
                }
                this._xhr.responseType = this._dtype;
                this._xhr.onreadystatechange = onReadyState;
            }
        };
        Object.defineProperty(HttpRequest.prototype, "dataFormat", {
            set: function (dtype) {
                if (this.isOriType == true) {
                    if (dtype == "binary") {
                        dtype = "arraybuffer";
                    }
                    if (this._xhr)
                        this._xhr.responseType = dtype;
                }
                else {
                    if (this._xhr)
                        this._xhr.dataFormat = dtype;
                }
                this._dtype = dtype;
            },
            enumerable: true,
            configurable: true
        });
        HttpRequest.prototype.onCallBack = function (e) {
            if (e === void 0) { e = null; }
            if (this._call) {
                if (this.isOriType == true) {
                    this._call.call(this._this, e);
                }
                else {
                    console.error(e.currentTarget.data.byteLength);
                    this._call.call(this._this, e.currentTarget.data);
                }
            }
        };
        HttpRequest.prototype.onHttpError = function (e) {
            if (e === void 0) { e = null; }
            if (this._err)
                this._err.call(this._this, e);
        };
        /**
         * 发送数据
         * @param data
         */
        HttpRequest.prototype.send = function (data) {
            if (this.isOriType == true) {
                this._xhr.send(data);
            }
            else {
                var request = new egret["URLRequest"](this.url);
                //request.requestHeaders.push(new egret.URLRequestHeader("Content-Type", "multipart/form-data"));
                request.method = "post";
                request.data = data;
                this._xhr.load(request);
            }
        };
        HttpRequest.prototype.destroy = function () {
            this._call = null;
            this._err = null;
            this._this = null;
        };
        return HttpRequest;
    }());
    uniLib.HttpRequest = HttpRequest;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var LoopbackSocket = /** @class */ (function () {
        function LoopbackSocket() {
        }
        return LoopbackSocket;
    }());
    uniLib.LoopbackSocket = LoopbackSocket;
    var MyWebSocket = /** @class */ (function () {
        function MyWebSocket(url, typ) {
            if (typ === void 0) { typ = null; }
            this._url = "";
            this._url = url;
            if (typ == SockType.LOOPBACK) {
                this.sockType = typ;
                this.socket = new LoopbackSocket;
            }
            else if (window["WebSocket"]) {
                this.sockType = SockType.NORMAL;
                try {
                    this.socket = new WebSocket(url);
                }
                catch (e) {
                    uniLib.Console.error("[WS MyWebSocket ERROR] " + e.toString());
                }
            }
            else {
                this.sockType = SockType.EGRET;
                this.socket = new egret["WebSocket"]();
                this.SetBinarytype(SockByinaryType.STRING);
                this.socket.connectByUrl(url);
            }
        }
        Object.defineProperty(MyWebSocket.prototype, "url", {
            get: function () {
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        MyWebSocket.prototype.SetBinarytype = function (binarytype) {
            if (this.sockType == SockType.EGRET) {
                if (binarytype == SockByinaryType.STRING) {
                    this.socket.type = egret["WebSocket"].TYPE_STRING;
                }
                else if (binarytype == SockByinaryType.BINARY) {
                    this.socket.type = egret["WebSocket"].TYPE_BINARY;
                }
            }
            else if (this.sockType == SockType.LOOPBACK) {
            }
            else {
                if (binarytype == SockByinaryType.STRING) {
                    //this.socket.binarytype = egret.WebSocket.TYPE_STRING;
                }
                else if (binarytype == SockByinaryType.BINARY) {
                    this.socket.binaryType = "arraybuffer";
                }
            }
        };
        return MyWebSocket;
    }());
    uniLib.MyWebSocket = MyWebSocket;
    /**
      * 基于`WebSocket`的`json`通信
      */
    var JsonSocket = /** @class */ (function () {
        /**
         * 平台专用socket
         *
         */
        function JsonSocket(url, gameId, zoneId, isLobby) {
            if (isLobby === void 0) { isLobby = false; }
            this.isOpenCompress = false;
            this.lastEchoTime = 0;
            this.reconnectDelay = 5000;
            this.isConnected = 0;
            this.isConnecting = false;
            this.needReconnect = true;
            /**
             * 断线重连尝试次数
             */
            this._reconnectTimes = 0; //这里的计数不能是static的,与HttpClient有差别
            this._maxCeconnectTimes = 10; //最大重连次数
            this._active = true; //前后台标志
            this._active_reconnect = false; //后台状态不断线重连
            this._areconnect = false;
            /**
            * 心跳检测时间
            */
            this.tickSec = 30;
            this.msgTimeoutMSec = 0;
            /**
            * 心跳检测超时次数
            */
            this.tickTimes = 2;
            this.lastRecvTime = 0;
            this.lastseq = 0;
            this.gameId = 0;
            this.zoneId = 0;
            this.isLobby = false;
            this.wsurl = url;
            var self = this;
            this.gameId = Number(gameId);
            this.zoneId = Number(zoneId);
            this.isLobby = isLobby;
            if (this.isLobby) {
                this.logName = "[Lobby]";
            }
            else {
                this.logName = "[Game]";
            }
            this.sendCache = new Array();
        }
        JsonSocket.prototype.getSocket = function () {
            return this.mysocket.socket;
        };
        JsonSocket.prototype.checkNeedReconnect = function () {
            var self = this;
            if (uniLib.Utils.isrebooting == false) {
                if (self.isConnected == 1) {
                    var need_reconnect = false;
                    if (self.mysocket != null) {
                        if (self.mysocket.sockType == SockType.EGRET) {
                            if (self.getSocket().connected == false) {
                                self.log("checkNeedReconnect0:" + self.isConnected); // + self.getSocket().connected+ ":"
                                need_reconnect = true;
                            }
                        }
                        else {
                            if (self.getSocket().readyState != 1) {
                                self.log("checkNeedReconnect1:" + ":" + self.isConnected); // + self.getSocket().readyState
                                need_reconnect = true;
                            }
                        }
                    }
                    else {
                        self.log("checkNeedReconnect2:" + ":" + self.isConnected); // + self.getSocket().readyState
                        need_reconnect = true;
                    }
                    if (need_reconnect == true) {
                        self.reConnect();
                    }
                }
                else {
                    self.log("checkNeedReconnect3:" + self.isConnected);
                }
            }
        };
        JsonSocket.prototype.resetReconnectNum = function () {
            this._reconnectTimes = 0;
        };
        JsonSocket.prototype.pauseReconnect = function () {
        };
        /**
         * 登录socket验证
         *
         */
        JsonSocket.prototype.login = function (onLogin, onLoginFail, thisObj) {
            if (onLogin)
                this.socketLoginSuc = onLogin;
            if (onLoginFail)
                this.socketLoginFail = onLoginFail;
            if (thisObj)
                this.socketLoginObj = thisObj;
            //this.mysocket.connectByUrl(this.wsurl);
            if (thisObj.loopback) {
                this.sockType = SockType.LOOPBACK;
            }
            this.connect();
        };
        JsonSocket.prototype.connect = function () {
            var self = this;
            if (this.sockType != SockType.LOOPBACK) {
                self.close(true); //先关闭下,否则会重现重复登陆问题
            }
            self.isConnecting = true;
            if (uniLib.ZQGameSdk.lastNetState && uniLib.ZQGameSdk.lastNetState.data) {
                if (uniLib.ZQGameSdk.lastNetState.data[uniLib.ZQGameSdk.NETSTATE] == uniLib.NetState.NO_SIGNAL) {
                    uniLib.ZQGameSdk.getNetStateType(null, null, true);
                    clearTimeout(self.connectingTimeout);
                    self.connectingTimeout = setTimeout(function () {
                        self.log("[WS OPENING WAIT] " + self.wsurl);
                        self.connect();
                    }, 1000);
                    return;
                }
            }
            self.msgTimeoutMSec = 0;
            if (this.sendCache == null) {
                this.sendCache = new Array();
            }
            this.log("[WS OPENING NEW1] " + this.wsurl);
            this.mysocket = new MyWebSocket(this.wsurl, this.sockType);
            this.sockType = this.mysocket.sockType;
            if (this.mysocket.sockType == SockType.NORMAL) {
                this.getSocket().onopen = this.onSocketOpen.bind(this);
                this.getSocket().onmessage = this.onReceiveMessage.bind(this);
                this.getSocket().onclose = this.onSocketClose.bind(this);
                this.getSocket().onerror = this.onSocketError.bind(this);
            }
            else if (this.sockType == SockType.LOOPBACK) {
                return;
            }
            else {
                this.getSocket().addEventListener("socketData", this.onReceiveMessage, this);
                this.getSocket().addEventListener("connect", this.onSocketOpen, this);
                this.getSocket().addEventListener("close", this.onSocketClose, this);
                this.getSocket().addEventListener("ioError", this.onSocketError, this);
            }
            if (global) {
            }
            else {
                if (egret && uniLib.BrowersUtils.GetRequest("debug") != "true") {
                    egret["MainContext"].instance.stage.addEventListener(egret.Event.DEACTIVATE, this.onDeactive, this);
                    egret["MainContext"].instance.stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
                }
            }
            if (self.connectingTimeout) {
                clearTimeout(self.connectingTimeout);
                self.connectingTimeout = null;
            }
            if (this.isLobby == true) {
                self.connectingTimeout = setTimeout(function () {
                    if (self.isConnecting == true) {
                        self.isConnecting = false;
                        if (self.socketLoginFail) {
                            self.socketLoginFail.call(self.socketLoginObj);
                            self.warn("connectingTimeout:self.socketLoginFail");
                        }
                        else {
                            self.onCloseConnect();
                        }
                        self.connectingTimeout = null;
                    }
                }, 15000);
            }
            else {
                self.connectingTimeout = setTimeout(function () {
                    if (self.isConnecting == true) {
                        self.isConnecting = false;
                        self.onCloseConnect();
                        // Utils.restart("网络异常,重新登陆可继续游戏", "确定");
                        self.connectingTimeout = null;
                    }
                }, 20000);
            }
        };
        JsonSocket.prototype.onDeactive = function (e) {
            this._deactiveTime = Date.now();
            if (this._active == false) {
                return;
            }
            this._active = false;
            if (this.isLobby == false) {
                this.recvCache = new Array();
            }
            // this._closeTimeOut = egret.setTimeout(this.onSleep, this, 5000);
        };
        // private onSleep(): void {
        //     this._areconnect = true;
        //     uniLib.NetMgr.closeSocket(true);
        // }
        /**
         * 显示Loading
         */
        JsonSocket.prototype.showRecnectTip = function () {
            if (uniLib["UIMgr"] && this.isConnected != 1) {
                if (uniLib.Global.isInGame == true) {
                    if (this.isLobby == false && uniLib["UIMgr"] && uniLib["UIMgr"].instance.tipsLoadUI) {
                        uniLib["UIMgr"].instance.showLoadingTimeout(uniLib["UIMgr"].instance.tipsLoadUI, "reconnect", 0);
                    }
                }
                else {
                    uniLib["UIMgr"].instance.showLoadingTimeout(uniLib["UIMgr"].instance.tipsLoadUI, "reconnect", 0);
                }
            }
        };
        JsonSocket.prototype.onActive = function (e) {
            if (Date.now() - this._deactiveTime > 5000) {
                this.close(true);
            }
            var self = this;
            // this.msgTimeoutMSec=3000;//切后台后断线处理
            if (this._active == true) {
                return;
            }
            this.showRecnectTip();
            this._active = true;
            if (this.isLobby == false) {
                if (this.recvCache) {
                    this.recvCache.forEach(function (str) {
                        //self.log("[onActive]" + str);
                        self.parseData(str);
                    });
                }
                this.recvCache = null;
                if (this._active_reconnect == true) {
                    this._active_reconnect = false;
                    this.reConnect();
                }
            }
            else {
                var req = new Pmd.OnlineStateLoginUserPmd_CS();
                req.state = 1;
                this.send(req);
            }
            this.lastRecvTime = new Date().getTime();
            if (this.setMsgTimeout(8, "")) {
                var requestMsg = new Pmd.TickRequestNullUserPmd_CS();
                requestMsg.requesttime = Math.floor(Date.now() / 1000);
                this.sendPlat(requestMsg);
            }
            if (self.isConnecting == true && self.connectingTimeout) {
                clearTimeout(self.connectingTimeout);
                self.connectingTimeout = null;
                if (this.isLobby == true) {
                    self.connectingTimeout = setTimeout(function () {
                        if (self.isConnecting == true) {
                            self.isConnecting = false;
                            if (self.socketLoginFail) {
                                self.socketLoginFail.call(self.socketLoginObj);
                            }
                            else {
                                self.onCloseConnect();
                            }
                            self.connectingTimeout = null;
                        }
                    }, 15000);
                }
                else {
                    self.connectingTimeout = setTimeout(function () {
                        if (self.isConnecting == true) {
                            self.isConnecting = false;
                            self.onCloseConnect();
                            uniLib.Utils.restart("网络异常,重新登陆可继续游戏", "确定");
                            self.connectingTimeout = null;
                        }
                    }, 20000);
                }
            }
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_ACTIVE_SOCKET_CACHE_OK, self.gameId);
            uniLib.ZQGameSdk.getNetStateType(null, null, true);
        };
        JsonSocket.prototype.onSocketOpen = function () {
            var self = this;
            if (self.connectingTimeout) {
                clearTimeout(self.connectingTimeout);
                self.connectingTimeout = null;
            }
            self.isConnected = 1;
            self.isConnecting = false;
            //uniLib.StatistcsMgr.instance.socketStatus = "connecting";
            var cache = this.sendCache;
            this.sendCache = new Array();
            if (this.loginData) {
                this.sendPlat(this.loginData);
                if (uniLib.Global.compressType != uniLib.CompressType.NONE) {
                    this.mysocket.SetBinarytype(SockByinaryType.BINARY);
                    this.isOpenCompress = true;
                }
                this.loginData = null;
            }
            if (cache != null && cache.length > 0) {
                cache.forEach(function (str) {
                    if (self.sockSend(str) == true) {
                        self.log("[WS SEND CACHE] " + str);
                    }
                    //uniLib.StatistcsMgr.instance.messageCharStatistics(str, "send", "utf-8");
                });
                this.sendCache = new Array();
            }
            if (uniLib["UIMgr"])
                uniLib["UIMgr"].instance.hideLoading(uniLib["UIMgr"].instance.tipsLoadUI, "reconnect");
            //var msg: Pmd.SetTickTimeoutNullUserPmd_CS = new Pmd.SetTickTimeoutNullUserPmd_CS();
            //msg.sec = 120;
            //this.send(msg);
            if (this.timerActive /* && this.timerActive.running*/) {
                clearInterval(this.timerActive);
                this.timerActive = null;
            }
        };
        JsonSocket.prototype.setTickSec = function (sec) {
            if (sec === void 0) { sec = 30; }
            this.tickSec = sec;
        };
        JsonSocket.prototype.onTickActive = function () {
            var now = new Date().getTime();
            var diff = now - this.lastRecvTime;
            if (this._active == false /*|| now - this.lastRecvTime < 1000*/) {
                return;
            }
            if (diff >= this.tickSec * this.tickTimes * 1000) {
                //var requestMsg: Pmd.TickRequestNullUserPmd_CS = new Pmd.TickRequestNullUserPmd_CS();
                //requestMsg.requesttime = Math.floor(Date.now() / 1000);
                //this.sendPlat(requestMsg);
                this.checkNeedReconnect();
            }
            else if (diff >= this.tickSec * 1000 /** this.tickTimes*/ + 10000) {
                this.reConnect();
            }
            else if (this.msgTimeoutMSec > 0 && diff >= this.msgTimeoutMSec) {
                if (uniLib.Utils.isrebooting == false) {
                    this.msgTimeoutMSec = 0;
                    this.reConnect();
                }
                //}else if(this.isLobby == false && diff >= 10000 && Utils.isrebooting == false){
                //	    if(this.setMsgTimeout(10,"")) {
                //		    this.sendEcho();
                //	    }
            }
            else if (this.isLobby == false) {
                this.checkNeedReconnect();
            }
        };
        JsonSocket.prototype.setMsgTimeout = function (sec, msg) {
            if (this.msgTimeoutMSec == 0) {
                this.msgTimeoutMSec = sec * 1000;
                this.lastRecvTime = new Date().getTime();
                return true;
            }
            return false;
        };
        JsonSocket.prototype.sockSend = function (data) {
            if ((this.isConnected == 0 || this.mysocket == null)) {
                if (!this.isConnecting && !this.connectingTimeout) {
                    this.reConnect();
                }
                if (this.sendCache == null) {
                    this.sendCache = new Array();
                }
                this.warn("[WS SEND ERROR] can't send message when websocket closed: " + data + ":" + this.isConnected + ":" + this.sendCache);
                if (this.sendCache != null && this.sendCache.length == 0) {
                    this.sendCache.push(data);
                    this.log("[WS CACHE sockSend0]:" + data);
                }
                return false; //这里先return,会丢失这个操作的消息,以后可以缓存起来,但是感觉有风险
            }
            if (this.isConnected != 1) {
                this.warn("[WS SEND ERROR] wait for connecting: " + this.isConnected + ":" + data);
                if (this.sendCache != null && this.sendCache.length == 0) {
                    this.sendCache.push(data);
                    this.log("[WS CACHE sockSend1]:" + data);
                }
                return false; //这里先return,会丢失这个操作的消息,以后可以缓存起来,但是感觉有风险
            }
            var msg;
            if (uniLib.Global.compressType != uniLib.CompressType.NONE && this.isOpenCompress == true) {
                var u8 = uniLib.CompressUtil.encodeUTF8(data);
                if (uniLib.Global.compressMin > 0) {
                    if (u8.byteLength >= uniLib.Global.compressMin) {
                        msg = uniLib.CompressUtil.compressByType(u8, uniLib.Global.compressType);
                    }
                    else {
                        msg = u8.buffer;
                    }
                }
                else {
                    msg = uniLib.CompressUtil.compressByType(u8, uniLib.Global.compressType);
                }
            }
            else {
                msg = data;
            }
            if (this.mysocket.sockType == SockType.NORMAL) {
                //this.log("sockSend1 " + msg);
                this.getSocket().send(msg);
                //this.log("sockSend1 finished " + msg);
            }
            else {
                if (this.isOpenCompress == true) {
                    //this.log("sockSend2 " + msg);
                    var byte /*: egret.ByteArray*/ = new egret.ByteArray();
                    byte.writeBytes(msg, 0, msg.byteLength);
                    byte.position = 0;
                    this.getSocket().writeBytes(byte, 0, byte.bytesAvailable);
                }
                else
                    //this.log("sockSend3 " + msg);
                    this.getSocket().writeUTF(msg);
            }
            return true;
        };
        JsonSocket.prototype.parseData = function (data) {
            //uniLib.StatistcsMgr.instance.messageCharStatistics(data, "receive", "utf-8");
            //this.log("[WS RECV] " + data);
            var message = JSON.parse(data);
            if (message instanceof Array) {
                for (var i = 0; i < message.length; i++) {
                    this.dispatch(message[i]);
                }
            }
            else {
                this.dispatch(message);
            }
        };
        JsonSocket.prototype.uncompressData = function (data) {
            var u8 = new Uint8Array(data);
            return uniLib.CompressUtil.uncompressByType(u8, uniLib.Global.compressType);
        };
        JsonSocket.prototype.onReceiveMessage = function (e) {
            if (e === void 0) { e = null; }
            this.lastRecvTime = new Date().getTime();
            this.msgTimeoutMSec = 0;
            if (this.mysocket == null)
                return;
            var self = this;
            //try {
            var str;
            //读取字符串信息
            if (this.mysocket.sockType == SockType.EGRET) {
                if (uniLib.Global.compressType != uniLib.CompressType.NONE) {
                    var byte /*: egret.ByteArray*/ = new egret.ByteArray();
                    this.getSocket().readBytes(byte);
                    if (uniLib.Global.compressMin > 0) {
                        if (byte.bytesAvailable >= uniLib.Global.compressMin) {
                            str = self.uncompressData(byte.buffer);
                            //} else if (byte.bytesAvailable && byte.bytesAvailable > 0){
                        }
                        else {
                            str = byte.buffer;
                        }
                    }
                    else {
                        //WHJ 这里如果服务器主动关闭会返回0
                        if (byte.bytesAvailable > 0) {
                            str = self.uncompressData(byte.buffer);
                        }
                    }
                }
                else {
                    str = this.getSocket().readUTF();
                }
            }
            else {
                if (uniLib.Global.compressType != uniLib.CompressType.NONE) {
                    //WHJ 这里如果服务器主动关闭会返回0
                    if (uniLib.Global.compressMin >= 0 && e.data.byteLength > 0 && e.data.byteLength >= uniLib.Global.compressMin) {
                        str = self.uncompressData(e.data);
                    }
                    else {
                        str = e.data;
                    }
                }
                else {
                    str = e.data;
                }
            }
            //WHJ 这里如果服务器主动关闭会返回0
            if (str && str != "") {
                if (str != "{}") {
                    if (self._active == true || !this.recvCache) {
                        this.parseData(str);
                    }
                    else {
                        this.recvCache.push(str);
                    }
                }
                else {
                    //this.log("[WS RECV ECHO]");
                }
            }
            else {
                this.warn("[WS RUN ERROR] server request colose socket");
                //this.onSocketClose();
            }
            //}
            //catch (e) {
            //    this.error("[WS RUN ERROR] ");
            //    return;
            //}
        };
        JsonSocket.prototype.onSocketClose = function (e) {
            if (e === void 0) { e = null; }
            var self = this;
            self.isConnected = 0;
            self.isConnecting = false;
            //uniLib.StatistcsMgr.instance.socketStatus = "close";
            if (this.mysocket != null) {
                this.warn("[WS CLOSING onSocketClose0] " + this.mysocket.sockType + ":" + uniLib.Global.compressType + ":" + this.wsurl);
            }
            else {
                this.warn("[WS CLOSING onSocketClose1] " + this.mysocket);
            }
            setTimeout(function () {
                if (self.isConnected == 0) {
                    self.onCloseConnect();
                }
                else {
                    self.warn("[WS CLOSING onSocketClose:]" + self.isConnected);
                }
            }, 2000);
        };
        JsonSocket.prototype.onCloseConnect = function () {
            var self = this;
            if (this.isConnected == 2 || uniLib.Utils.isrebooting == true) {
                this.warn("[WS CLOSING onCloseConnect]");
                return;
            }
            self.isConnected = 0;
            if (self._reconnectTimes < self._maxCeconnectTimes) {
                if (self.reConnect()) {
                    if (uniLib.ZQGameSdk) {
                        uniLib.ZQGameSdk.getNetStateType();
                    }
                    if (!uniLib["ZQGameSdk"].lastNetState || !uniLib["ZQGameSdk"].lastNetState.data || uniLib["ZQGameSdk"].lastNetState.data[uniLib["ZQGameSdk"].NETSTATE] != uniLib["NetState"].NO_SIGNAL) {
                        self._reconnectTimes++;
                    }
                    else {
                        this.error("[WS reConnect] not network avalible");
                    }
                }
            }
            else if (uniLib.Global.isRestarting == false) {
                if (!self.socketLoginFail || self.socketLoginFail.call(self.socketLoginObj) == false) {
                    uniLib.Global.isRestarting = true;
                    uniLib.Console.info("ZQGameSdk.restart");
                    if (uniLib.Global.isH5 == true) {
                        if (uniLib.Global.reLoginUrl != "") {
                            uniLib.BrowersUtils.redirect(uniLib.Global.reLoginUrl);
                        }
                        else {
                            uniLib.BrowersUtils.reload();
                        }
                    }
                    else {
                        if (self.isLobby == true) {
                            //Utils.clearLocalStorage(); //中途重启登陆服务器没必要清楚认证信息
                        }
                        //uniLib.Global.dispatchEvent(ZqEvent.ON_RESTART, ["连接服务器失败,请重新打开游戏", "确定"]);
                        if (uniLib["ZQGameSdk"])
                            uniLib["ZQGameSdk"].getConfig("网络不稳定,需要重新连接", "", "确定");
                    }
                }
            }
            return;
            //if (self._reconnectTimes >= 5 && this.socketLoginFail) {
            //   this.socketLoginFail.call(this.socketLoginObj ? this.socketLoginObj : this)
            //}
            //this.mysocket = null;
        };
        JsonSocket.prototype.onSocketError = function (e) {
            if (e === void 0) { e = null; }
            var self = this;
            self.isConnected = 0;
            self.isConnecting = false;
            //uniLib.StatistcsMgr.instance.socketStatus = "error";
            this.warn("[WS Error] ");
            if (!uniLib.Global.isInGame) {
                self._maxCeconnectTimes = 5;
            }
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.NET_ERRER);
            clearTimeout(self.connectingTimeout);
            self.connectingTimeout = setTimeout(function () {
                if (self.isConnected == 0) {
                    self.onCloseConnect();
                    //self.onCloseConnect();
                }
                else {
                    self.warn("[WS CLOSING onSocketClose:]" + self.isConnected);
                }
            }, 2000);
        };
        JsonSocket.prototype.reConnect = function () {
            var self = this;
            if (uniLib.Utils.isrebooting == true || self.isConnecting == true || self.isConnected == 2 || self.needReconnect == false) {
                self.warn("[WS CLOSING reConnect cancel]" + uniLib.Utils.isrebooting + ":" + self.isConnecting + ":" + self.isConnected);
                return false;
            }
            if (this._active == false && self.recvCache) {
                self._active_reconnect = true;
                return true;
            }
            if (uniLib["UIMgr"]) {
                if (uniLib.Global.isInGame == true) {
                    if (self.isLobby == false && uniLib["UIMgr"] && uniLib["UIMgr"].instance.tipsLoadUI) {
                        uniLib["UIMgr"].instance.showLoadingTimeout(uniLib["UIMgr"].instance.tipsLoadUI, "reconnect", 0);
                    }
                }
                else {
                    uniLib["UIMgr"].instance.showLoadingTimeout(uniLib["UIMgr"].instance.tipsLoadUI, "reconnect", 0);
                }
            }
            // self.showRecnectTip();
            //self.error("开始断线重连 秒:" + new Date().getUTCSeconds() + " 剩余重连次数:" + self._reconnectTimes);
            self.isOpenCompress = false;
            var cmd = new Pmd.UserLoginReconnectLoginUserPmd_C();
            cmd.accountid = uniLib.NetMgr.UID;
            cmd.timestamp = Math.floor(Date.now() / 1000);
            cmd.zoneid = self.zoneId;
            cmd.gameid = self.gameId;
            cmd.compress = uniLib.CompressUtil.compressStr[uniLib.Global.compressType];
            cmd.version = 20160805;
            cmd.lastseq = self.lastseq;
            if (uniLib.Global.zipmd5)
                cmd.zipmd5 = uniLib.Global.zipmd5;
            if (uniLib.Global.configmd5)
                cmd.configmd5 = uniLib.Global.configmd5;
            if (uniLib.Global.bundleId)
                cmd.bundlename = uniLib.Global.bundleId;
            if (uniLib.NetMgr.PlatKey == null) {
                uniLib.NetMgr.PlatKey = "";
            }
            cmd.tokenmd5 = "" + uniLib.StringUtils.MD5(String(cmd.accountid) + String(cmd.timestamp) + uniLib.NetMgr.PlatKey);
            cmd.url = this.wsurl;
            self.loginData = cmd;
            self.connect();
            //var onGetNetState: Function = function (data :any) {
            //	this.log("[onGetNetState] " + JSON.stringify(data));
            //}
            //uniLib["ZQGameSdk"].getNetStateType(onGetNetState,self);
            self.isConnected = 2;
            return true;
        };
        JsonSocket.prototype.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            uniLib.Console.log(this.logName + message, optionalParams);
        };
        JsonSocket.prototype.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            uniLib.Console.error(this.logName + message, optionalParams);
        };
        JsonSocket.prototype.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            uniLib.Console.warn(this.logName + message, optionalParams);
        };
        JsonSocket.prototype.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            uniLib.Console.info(this.logName + message, optionalParams);
        };
        JsonSocket.prototype.dispatch = function (message) {
            var self = this;
            if (!self.timerActive && this.mysocket && this.sockType != SockType.LOOPBACK) {
                var setmsg = new Pmd.SetTickTimeoutNullUserPmd_CS();
                setmsg.sec = self.tickSec;
                setmsg.times = self.tickTimes;
                self.sendPlat(setmsg);
                //if (this.isLobby == false && this.lastseq != 0) {//暂时先限制下,有空再加哪个项目需要启用的启用策略
                //   var pingmsg: Pmd.SetPingTimeNullUserPmd_CS = new Pmd.SetPingTimeNullUserPmd_CS();
                //  self.sendPlat(pingmsg);
                //}
                self.timerActive = setInterval(function () {
                    self.onTickActive();
                }, 2000);
            }
            // 标准化对类型的标注
            var cmd_name;
            var msg;
            if (!message.GetType) {
                cmd_name = message["cmd_name"];
                if (!cmd_name) {
                    msg = message; //服务器可以默认省略掉包头JsonSocket.GatewayWrapperName UserJsMessageForwardUserPmd_CS
                }
                else {
                    message.GetType = function () { return cmd_name; };
                }
            }
            if (this.lastseq != 0 && (!message.GetType || message.GetType() == JsonSocket.GatewayWrapperName) && (!cmd_name || cmd_name == JsonSocket.GatewayWrapperName)) {
                if (this.lastseq == 0xFFFFFFFF) {
                    this.lastseq = 1;
                }
                else {
                    this.lastseq++;
                }
            }
            // 采用 UserJsMessageForwardUserPmd_CS 包装的下行消息进行重组
            if (msg || message.GetType() == JsonSocket.GatewayWrapperName) {
                //var msg = JSON.parse(message["msg"]);
                if (!msg) {
                    msg = message["msg"];
                }
                if (uniLib.checkServerReturnCodeError(msg)) {
                    uniLib.doServerReturnCodeError(message, self);
                    this.warn("[WS RUN ERROR] server error0: " + JSON.stringify(message));
                    return false;
                }
                if (uniLib.Global.jsonCompress) {
                    msg = uniLib.Global.DeCompress(msg);
                }
                else if (typeof msg["do"] === "number" && uniLib.Global.jsonCompressDefault) {
                    msg = uniLib.Global.DeCompressDefult(msg);
                }
                cmd_name = msg["do"];
                var logic = msg["data"];
                //logic.GetType() = () => cmd_name;
                message = logic;
            }
            else if (!cmd_name && message.GetType() != JsonSocket.GatewayWrapperName) {
                cmd_name = message.GetType();
            }
            if (uniLib.checkServerReturnCodeError(message)) {
                uniLib.doServerReturnCodeError(message, self);
                this.warn("[WS RUN ERROR] server error1: " + JSON.stringify(message));
                return false;
            }
            // 查找响应函数
            var segments = cmd_name.split(".");
            segments[segments.length - 1] = "On" + segments[segments.length - 1];
            //var f: any = window;
            //for (var i = 0; i < segments.length && f != null; i++) {
            //    f = f[segments[i]];
            //}
            //var self: any = this;
            var f;
            var defineName = "";
            for (var i = 0; i < segments.length; i++) {
                defineName += segments[i] + (i == segments.length - 1 ? "" : ".");
            }
            if (uniLib.getDefinitionByName(defineName) != null) {
                f = uniLib.getDefinitionByName(defineName);
            }
            // 消息处理
            if (f != null) {
                this._reconnectTimes = 0; //成功收到了业务消息,则重置重连次数
                this.log("[WS RECV] " + defineName + ":" + JSON.stringify(msg));
                f(message);
                return true;
            }
            if (defineName === "Pmd.OnUserLoginReturnOkLoginUserPmd_S") {
                uniLib.Console.info("[WS] login to gateway success #");
                if (this.socketLoginSuc) {
                    this.socketLoginSuc.call(this.socketLoginObj ? this.socketLoginObj : this);
                    this.socketLoginSuc = null;
                }
                this.lastseq = 0xFFFFFFFF;
                return true;
            }
            else if (defineName === "Pmd.OnReconnectKickoutLoginUserPmd_S") {
                if (uniLib.Global.hasEventListener(uniLib.ZqEvent.KICK_OUT) == true) {
                    this.close(false);
                    uniLib.Global.dispatchEvent(uniLib.ZqEvent.KICK_OUT, message);
                }
                else {
                    uniLib.Utils.restart(message["desc"] ? message["desc"] : "重复登陆被踢下线！", "确定");
                }
                return true;
            }
            else if (defineName === "Pmd.OnUserLoginReturnFailLoginUserPmd_S") {
                //if (this.reconnectTag == true && this._reconnectTimes < 5) {
                //setTimeout(function (): void {
                //    self.reConnect();
                //    self._reconnectTimes++;
                //}, 3000);
                //    return;
                //}
                uniLib.Console.info("Pmd.OnUserLoginReturnFailLoginUserPmd_S err:" + message["retcode"]);
                switch (message["retcode"]) {
                    case Pmd.LoginReturnFailReason.ServerShutdown://2
                        if ((this.isLobby) || !this.socketLoginFail) {
                            //Utils.clearLocalStorage();
                            //Utils.restart(message["desc"] ? message["desc"] : "登陆过期，请重新登陆！", "确定");
                            if (uniLib.Global.isInGame != true) {
                                //NetMgr.clearGateWay();
                                //Utils.restart("游戏有更新,请重新登陆游戏！", "确定");
                                //} else {
                                clearTimeout(self.connectingTimeout);
                                self.connectingTimeout = setTimeout(function () {
                                    self.reConnect();
                                    self._reconnectTimes++;
                                }, 5000);
                            }
                            return true;
                        }
                        break;
                    case Pmd.LoginReturnFailReason.VersionTooLow://"3"://
                        uniLib.Utils.restart(message["desc"] ? message["desc"] : "版本过低，请重新登陆！", "确定");
                        return true;
                    case Pmd.LoginReturnFailReason.UserTokenFind: //"4"://UserTokenFind
                    case Pmd.LoginReturnFailReason.UserTokenTempId: //"5"://UserTokenTempId
                    case Pmd.LoginReturnFailReason.UserTokenTimeOut://"6"://UserTokenTimeOut
                        uniLib.Utils.clearLocalStorage(uniLib.Global.gameId + "|" + uniLib.Global.getPlatId() + "|platToken");
                        //Utils.restart(message["desc"] ? message["desc"] : "登陆过期，请重新登陆！", "确定");
                        uniLib.Utils.restart("登陆信息过期,请重新登陆游戏！", "确定");
                        return true;
                    // break;
                    case Pmd.LoginReturnFailReason.LoginDulicate: //"7"://LoginDulicate
                    case Pmd.LoginReturnFailReason.NoGatewaytDown: //"8"://NoGatewaytDown
                    case Pmd.LoginReturnFailReason.AccountUsing://"9"://AccountUsing
                        break;
                }
                var isdefault = true;
                if (uniLib["TipsUtils"]) {
                    uniLib["TipsUtils"].showTipsDownToUp(message.retcode + ":" + message.desc, true);
                    isdefault = false;
                }
                if (this.socketLoginFail) {
                    this.socketLoginFail.call(this.socketLoginObj ? this.socketLoginObj : message);
                    isdefault = false;
                    this.warn("[WS socketLoginFail] ");
                }
                if (isdefault) {
                    uniLib.Utils.restart(message["desc"] ? message["desc"] : "未知错误,请重新登陆", "确定");
                }
                return true;
            }
            else if (defineName == "Pmd.OnTickRequestNullUserPmd_CS") {
                var returnMsg = new Pmd.TickReturnNullUserPmd_CS();
                returnMsg.requesttime = message.requesttime;
                returnMsg.mytime = Math.floor(Date.now() / 1000);
                this.sendPlat(returnMsg);
                return true;
            }
            else if (defineName == "Pmd.OnCurrentGmLevelChatUserPmd_S") {
                uniLib.Global.gmlevel = message["gmlevel"];
                if (uniLib.Global.gmlevel > 0) {
                    //uniLib.UIMgr.instance.showUI(GMView, null, false, true);
                }
                return true;
            }
            else if (defineName == "Pmd.OnUserLoginReconnectOkLoginUserPmd_S") {
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.ON_RECONNEC, self.gameId);
                return true;
            }
            else if (defineName == "Pmd.OnGameServerShutDownLoginUserPmd_S") {
                //WHJ 这里暂时不用处理,否则跟断线重连有冲突
                if (self._reconnectTimes >= 5) {
                    uniLib.Global.dispatchEvent(uniLib.ZqEvent.ON_SERVER_SHUTDOWN, message);
                }
                return true;
            }
            else if (defineName == "Pmd.OnZoneInfoListLoginUserPmd_S") {
                uniLib.Global.zoneList = message.zonelist;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.ON_GETZONEINFO, message);
                return true;
            }
            else if (defineName == "Pmd.OnTickReturnNullUserPmd_CS") {
                return true;
            }
            else if (defineName == "Pmd.OnServerShutDownLoginUserPmd_S") {
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_SERVER_SHUTDOWN, message);
                return true;
            }
            else if (defineName == "Pmd.OnServerDebugLevelLoginUserPmd_S") {
                uniLib.Global.debugLevel = message.level;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_SERVER_DEBUG_LEVEL, message);
                return true;
            }
            else if (defineName == "Pmd.OnClientConfigUpdateLoginUserPmd_S") {
                if (message && message.config) {
                    var config = message.config;
                    //ZQGameSdk.updateCfg(config);
                    //if (uniLib.Global.is_sandbox == 1) {
                    if (uniLib["ZQGameSdk"])
                        uniLib["ZQGameSdk"].getConfig("当前客户端版本过低,请点击确定重启更新。", "", "确定");
                    //} else {
                    //    ZQGameSdk.getConfig("当前客户端版本过低,请点击确定重启更新。", "", "确定", "取消");
                    //}
                }
                else if (message && message.zipmd5) {
                    //ZQGameSdk.updateCfg(config);
                    if (uniLib.Global.is_sandbox == 1) {
                        return true;
                    }
                    if (uniLib["ZQGameSdk"])
                        uniLib["ZQGameSdk"].getConfig("当前客户端版本过低,请点击确定重启更新。", "", "确定", "取消");
                }
            }
            this.warn("[WS RUN unprocess] [" + defineName + "]\n" + JSON.stringify(message));
            return false;
        };
        JsonSocket.prototype.sendTimeOut = function (message, loopback) {
            this.send(message, loopback);
            this.setMsgTimeout(8, "sendTimeOut");
        };
        JsonSocket.prototype.send = function (message, loopback) {
            if (message == null)
                return;
            if (loopback == true || this.sockType == SockType.LOOPBACK) {
                this.dispatch(message);
                return;
            }
            // 采用 UserJsMessageForwardUserPmd_CS 包装，以方便网关服务器直接转发
            //if (message.GetType().substr(0, 4) != "Pmd.") {
            /* WHJ 这里不加头了,网关兼容下,可以节省很多流量
                var tp = message["GetType"] ? message["GetType"]() : message["do"];
    
                var wrapper = new Pmd.UserJsMessageForwardUserPmd_CS();
                wrapper.msg = JSON.stringify({
                    "do": tp,
                    "data": message
                });
                message = wrapper;
                message["cmd_name"] = message["cmd_name"] || message.GetType();
                var str: any = JSON.stringify(message);
            // */
            var tp = message["GetType"] ? message["GetType"]() : message["do"];
            if (tp == "Pmd.CreatePlatOrderRequestSdkPmd_C") {
                uniLib.PayMgr.Instance.lastRechargeInfo = message;
            }
            var wrapper = {
                "do": tp,
                "data": message
            };
            var str = JSON.stringify(wrapper);
            if (this.sockSend(str) == true) {
                this.log("[WS SEND send] " + str);
            }
            if (uniLib.Global.msgTimeOutSec != 0) {
                this.setMsgTimeout(uniLib.Global.msgTimeOutSec, "sendTimeOut");
            }
            //uniLib.StatistcsMgr.instance.messageCharStatistics(str, "send", "utf-8");
        };
        JsonSocket.prototype.sendPlat = function (message, loopback) {
            if (message == null)
                return;
            if (loopback == true || this.sockType == SockType.LOOPBACK) {
                this.dispatch(message);
                return;
            }
            var tp = message["GetType"] ? message["GetType"]() : (message["cmd_name"] || message["do"]);
            message["cmd_name"] = tp;
            var str = JSON.stringify(message);
            if (this.sockSend(str) == true) {
                this.log("[WS SEND sendPlat] " + str);
            }
            else {
                this.log("[WS SEND sendPlat Error] " + str);
            }
            //uniLib.StatistcsMgr.instance.messageCharStatistics(str, "send", "utf-8");
        };
        JsonSocket.prototype.sendEcho = function () {
            var time = new Date().getTime();
            if (time - this.lastEchoTime >= 3000) {
                this.lastEchoTime = time;
                this.sockSend("{}");
            }
            //this.log("[WS SEND ECHO]");
        };
        JsonSocket.prototype.close = function (needreconnect) {
            if (needreconnect === void 0) { needreconnect = true; }
            if (this.sockType == SockType.LOOPBACK) {
                return;
            }
            this.isConnected = 0;
            if (this.mysocket != null) {
                if (this.mysocket.sockType == SockType.NORMAL) {
                    this.getSocket().onopen = null;
                    this.getSocket().onmessage = null;
                    this.getSocket().onclose = null;
                    this.getSocket().onerror = null;
                }
                else {
                    this.getSocket().removeEventListener("socketData", this.onReceiveMessage, this);
                    this.getSocket().removeEventListener("connect", this.onSocketOpen, this);
                    this.getSocket().removeEventListener("close", this.onSocketClose, this);
                    this.getSocket().removeEventListener("ioError", this.onSocketError, this);
                }
                if (global) {
                }
                else {
                    if (egret) {
                        egret["MainContext"].instance.stage.removeEventListener(egret.Event.DEACTIVATE, this.onDeactive, this);
                        egret["MainContext"].instance.stage.removeEventListener(egret.Event.ACTIVATE, this.onActive, this);
                    }
                }
                this.warn("[WS CLOSING close] " + Math.floor(new Date().getTime() / 1000) + ":" + this.mysocket.sockType + ":" + uniLib.Global.compressType + ":" + this._reconnectTimes + ":" + this.wsurl);
                if (this.sendCache == null) {
                    this.sendCache = new Array();
                }
                else if (this.sendCache.length > 1) {
                    this.sendCache = [this.sendCache.pop()];
                }
                this.getSocket().close();
                this.mysocket = null;
            }
            if (this.timerActive /* && this.timerActive.running*/) {
                clearInterval(this.timerActive);
                this.timerActive = null;
            }
            this.needReconnect = needreconnect;
            this.isConnecting = false;
        };
        JsonSocket.GatewayWrapperName = "Pmd.UserJsMessageForwardUserPmd_CS";
        return JsonSocket;
    }());
    uniLib.JsonSocket = JsonSocket;
})(uniLib || (uniLib = {}));
var SockType;
(function (SockType) {
    SockType[SockType["NORMAL"] = 0] = "NORMAL";
    SockType[SockType["EGRET"] = 1] = "EGRET";
    SockType[SockType["LOOPBACK"] = 2] = "LOOPBACK";
})(SockType || (SockType = {}));
var SockByinaryType;
(function (SockByinaryType) {
    SockByinaryType[SockByinaryType["STRING"] = 0] = "STRING";
    SockByinaryType[SockByinaryType["BINARY"] = 1] = "BINARY";
})(SockByinaryType || (SockByinaryType = {}));
var Pmd;
(function (Pmd) {
    /**
     * 聊天消息
     */
    function OnCommonChatUserPmd_CS(rev) {
        switch (rev.chatpos) {
            case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_None:
            case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Normal:
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_ROOM, rev);
                break;
            case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Private:
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_PRIVATE, rev);
                break;
            case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Sys:
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_SYSTEM, rev);
                break;
            case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Gm:
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_GM, rev);
                break;
            case 256://喇叭         
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_HORN, rev);
                break;
            case 512:
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_HUNDRED, rev);
                break;
            case 1024://普通场跑马灯
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_COMMONGAME, rev);
                break;
            case 2048://大厅跑马灯
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_LOBBY, rev);
                break;
            case Pmd.CommonChatUserPmd_CS.ChatPos.ChatPos_Important:
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_IMPORTANT, rev);
                break;
        }
    }
    Pmd.OnCommonChatUserPmd_CS = OnCommonChatUserPmd_CS;
    /**
     * 私聊消息
     */
    function OnPrivateChatUserPmd_CS(rev) {
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHAT_PRIVATE, rev);
    }
    Pmd.OnPrivateChatUserPmd_CS = OnPrivateChatUserPmd_CS;
    /**
     * GM命令查询
     */
    function OnGMCommandListChatUserPmd_S(rev) {
        //console.error(JSON.stringify(rev.list));
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.GM_INFO, rev);
    }
    Pmd.OnGMCommandListChatUserPmd_S = OnGMCommandListChatUserPmd_S;
    function OnMessageBoxLoginUserPmd_S(rev) {
        var box = new uniLib.MsgBox(rev.info);
        uniLib.PopUpMgr.addPopUp(box, null, true, true);
    }
    Pmd.OnMessageBoxLoginUserPmd_S = OnMessageBoxLoginUserPmd_S;
})(Pmd || (Pmd = {}));

/**
 * 配置对象
 */
var uniLib;
(function (uniLib) {
    var AppConfig = /** @class */ (function () {
        function AppConfig() {
        }
        return AppConfig;
    }());
    uniLib.AppConfig = AppConfig;
})(uniLib || (uniLib = {}));

/**
 * 扩展数据
 */
var ExtData = /** @class */ (function () {
    function ExtData() {
    }
    return ExtData;
}());

var uniLib;
(function (uniLib) {
    /**
     * 扩展数据
     */
    var ShareData = /** @class */ (function () {
        function ShareData() {
        }
        return ShareData;
    }());
    uniLib.ShareData = ShareData;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
    * 用户信息
    */
    var UserInfo = /** @class */ (function () {
        function UserInfo() {
        }
        Object.defineProperty(UserInfo, "ol_Time", {
            /**
            * 在线礼包时间
            */
            get: function () {
                return this._ol_Time;
            },
            /**
            * 在线礼包时间
            */
            set: function (time) {
                this._ol_Time = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "fangka", {
            get: function () {
                return this._fangka;
            },
            set: function (val) {
                if (this._fangka == val)
                    return;
                this._fangka = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.FANGKA);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "diamond", {
            get: function () {
                return this._diamond;
            },
            set: function (val) {
                if (this._diamond == val)
                    return;
                this._diamond = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.DIAMOND);
            },
            enumerable: true,
            configurable: true
        });
        UserInfo.init = function (info, initGold) {
            if (initGold === void 0) { initGold = true; }
            this.uid = info.uid;
            if (info.headUrl || info.headurl) {
                this._headUrl = info.headUrl || info.headurl;
            }
            else {
                this._headUrl = "";
            }
            this.nickName = info.nickName || info.nickname;
            this.gender = info.gender;
            this.platId = info.platId;
            this.subPlatId = info.subPlatId;
            if (initGold == true && info.remainder) {
                this._chips = info.remainder;
                this._goldChips = info.remainder;
            }
            if (info.hasOwnProperty("chips")) {
                this._chips = info.chips;
            }
            if (info.goldcoin)
                this._goldChips = info.goldcoin;
            if (info.trailscore)
                this._chips = info.trailscore;
            if (info.bankChips)
                this._bankChips = info.bankChips;
            if (info.sumRecharge)
                this.sumRecharge = info.sumRecharge;
            if (info.signature)
                this.signature = info.signature;
            if (info.hasOwnProperty("giftCoupon"))
                this._giftCoupon = info.giftCoupon;
            else if (info.hasOwnProperty("ticket"))
                this._giftCoupon = info.ticket;
            if (info.trailcoin)
                this._freeChips = info.trailcoin;
            if (info.hasOwnProperty("fangka"))
                this._fangka = info.fangka;
            else if (info.hasOwnProperty("card"))
                this.fangka = info.card;
            if (info.hasOwnProperty("diamond"))
                this._diamond = info.diamond;
        };
        Object.defineProperty(UserInfo, "chips", {
            get: function () {
                return this._chips;
            },
            set: function (val) {
                if (this._chips == val)
                    return;
                this._chips = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.CHIPS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "goldChips", {
            /**捕鱼大厅金币 */
            get: function () {
                return this._goldChips;
            },
            /**捕鱼大厅金币 */
            set: function (val) {
                if (this._goldChips == val)
                    return;
                this._goldChips = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.GOLDCHIPS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "freeChips", {
            /**
             * 体验币
             */
            get: function () {
                return this._freeChips;
            },
            /**
             * 体验币
             */
            set: function (val) {
                if (this._freeChips == val)
                    return;
                this._freeChips = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.FREECHIPS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "headUrl", {
            /**
             * 头像
             */
            get: function () {
                return this._headUrl;
            },
            /**
            * 头像
            */
            set: function (val) {
                if (this._headUrl == val)
                    return;
                this._headUrl = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.HEADURL);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "platPoint", {
            get: function () {
                return this._platPoint;
            },
            set: function (val) {
                this._platPoint = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.PLAT_POINT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "bankChips", {
            get: function () {
                return this._bankChips;
            },
            set: function (val) {
                this._bankChips = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.BANK_CHIPS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "nickname", {
            get: function () {
                return this.nickName;
            },
            set: function (name) {
                this.nickName = name;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.NICKNAME);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfo, "giftCoupon", {
            /**
            *获取奖券数量
            */
            get: function () {
                return this._giftCoupon ? this._giftCoupon : 0;
            },
            set: function (cou) {
                this._giftCoupon = cou;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.GIFTCOUPON);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 用户筹码
         */
        UserInfo._chips = 0;
        /**
         * 金币  ---  捕鱼大厅金币<捕鱼大厅专用>
         */
        UserInfo._goldChips = 0;
        /**
         * 体验币 ---  捕鱼大厅体验币<捕鱼大厅专用>
         */
        UserInfo._freeChips = 0;
        /**
        * 奖券数量
        */
        UserInfo._giftCoupon = 0;
        /**
        * 在线礼包时间 为-1时没有礼包可领
        */
        UserInfo._ol_Time = -1;
        /**
         * 是否显示滑动： 0:不显示; 1：右滑; 2：左滑
         */
        UserInfo.slipStatus = 1;
        /**
         * 第三方平台积分余额
         */
        UserInfo._platPoint = 0;
        return UserInfo;
    }());
    uniLib.UserInfo = UserInfo;
})(uniLib || (uniLib = {}));

var game;
(function (game) {
    var WXShareBackVo = /** @class */ (function () {
        function WXShareBackVo() {
        }
        return WXShareBackVo;
    }());
    game.WXShareBackVo = WXShareBackVo;
})(game || (game = {}));

var uniLib;
(function (uniLib) {
    /*
    *当shareIconUrl和shareImageData数据不为""的时候为图片分享
    */
    var WXShareVo = /** @class */ (function () {
        function WXShareVo() {
            this.shareImageUrl = ""; //分享的图片地址（已存至服务器）
            this.shareImageData = ""; //截图base64图片数据   
        }
        return WXShareVo;
    }());
    uniLib.WXShareVo = WXShareVo;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
    * 浏览器工具
    */
    var BrowersUtils = /** @class */ (function () {
        function BrowersUtils() {
        }
        /**
         * 刷新页面
         */
        BrowersUtils.reload = function () {
            if (uniLib.Global.isH5 == true) {
                window.location.reload();
            }
            else {
            }
        };
        BrowersUtils.redirect = function (url) {
            location.href = url;
        };
        BrowersUtils.isLocal = function () {
            return location.href.indexOf("192.168") >= 0;
        };
        /**
         * 判断对象是否为Null
         */
        BrowersUtils.prototype.isNull = function (val) {
            if (val == null)
                return true;
            if (val instanceof String) {
                if (val == null || val.length == 0) {
                    return false;
                }
            }
            return false;
        };
        /**
         * 是否在微信中打开
         */
        BrowersUtils.isWechat = function () {
            if (uniLib.Global.isWxGame() == true) {
                return false;
            }
            var agent = navigator.userAgent.toString();
            // console.dir(agent);
            if (agent.match(/MicroMessenger/i) != null) {
                return "MicroMessenger" == agent.match(/MicroMessenger/i).toString() ? true : false;
            }
            else
                return false;
        };
        /**
         * 获取xhr
         */
        BrowersUtils.getXHR = function () {
            if (window["XMLHttpRequest"]) {
                return new XMLHttpRequest();
            }
            else if (window["ActiveXObject"]) {
                return eval("new ActiveXObject(\"MSXML2.XMLHTTP\")");
            }
            else if (egret && egret["URLLoader"])
                return new egret["URLLoader"]();
        };
        /**
         * 是否PC
         */
        BrowersUtils.isPC = function () {
            var agent = navigator.userAgent.toString(), e = "Android;iPhone;SymbianOS;Windows Phone;iPad;iPod".split(";"), b = true;
            for (var i = 0; i < e.length; i++) {
                if (0 < agent.indexOf(e[i])) {
                    b = false;
                    break;
                }
            }
            return b;
        };
        BrowersUtils.isAndroid = function () {
            var agent = navigator.userAgent.toString();
            if (agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 根据参数名获取请求get参数
         * @param name {string} 参数名
         */
        BrowersUtils.GetRequest = function (name, str) {
            var value = null;
            var search;
            if (uniLib.Global.isH5) {
                if (str != null && str != "") {
                    search = str;
                }
                else {
                    search = location.search;
                }
                var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "gi");
                var matcher = pattern.exec(search);
                if (null != matcher) {
                    try {
                        value = decodeURIComponent(decodeURIComponent(matcher[1]));
                    }
                    catch (e) {
                        try {
                            value = decodeURIComponent(matcher[1]);
                        }
                        catch (e) {
                            value = matcher[1];
                        }
                    }
                }
            }
            return value;
        };
        BrowersUtils.GetRequests = function (s) {
            var str;
            if (s) {
                str = s;
            }
            else {
                str = location.search;
            }
            var theRequest = new Object();
            if (str) {
                if (str.indexOf("?") == 0) {
                    var str = str.substr(1);
                }
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            //var pattern = new RegExp("[?&]" +  + "\=([^&]+)", "g");
            //var matcher = pattern.exec(url);
            //if (null != matcher) {\
            //    try {
            //        value = decodeURIComponent(decodeURIComponent(matcher[1]));
            //    } catch (e) {
            //        try {
            //            value = decodeURIComponent(matcher[1]);
            //        } catch (e) {
            //            value = matcher[1];
            //        }
            //    }
            //}
            return theRequest;
        };
        //进入全屏
        BrowersUtils.requestFullScreen = function () {
            //var de = document.documentElement;
            //if (de.msRequestFullscreen) {
            //    de.msRequestFullscreen();
            //}
        };
        //退出全屏
        BrowersUtils.exitFullscreen = function () {
            //var de = document;
            //if (de.msExitFullscreen) {
            //    de.msExitFullscreen();
            //}
        };
        /**
         * 分享数据更新
         * @param key
         * @param value
         * @param setShare 是否立即设置分享,默认 否
         */
        BrowersUtils.setExtData = function (key, value, setShare) {
            if (setShare === void 0) { setShare = false; }
            if (this.extData == null)
                this.extData = new ExtData();
            this.extData[key] = value;
        };
        /**
         * 获取扩展数据字段
         * @param key
         */
        BrowersUtils.getExtData = function (key) {
            if (key === void 0) { key = ""; }
            if (this.inExtData == null)
                try {
                    this.inExtData = JSON.parse(this.GetRequest("extdata"));
                }
                catch (e) {
                    this.inExtData = eval("(" + this.GetRequest("extdata") + ")");
                    //console.error("extData解析失败,请检查格式");
                }
            if (this.inExtData) {
                if (key)
                    return this.inExtData[key];
                else
                    return this.inExtData;
            }
            return null;
        };
        /**
         * 重置分享内容
         */
        BrowersUtils.resetShareInfo = function () {
            this.extData = new ExtData();
            this.extData.inviter = uniLib.NetMgr.UID.toString();
            this.setShareInfo();
        };
        /**
         * 设置分享
         * @param img icon地址
         * @param title 分享标题
         * @param desc 分享描述
         * @param key 分享扩展数据字段
         * @param value 分享扩展数据内容
         */
        BrowersUtils.setShareInfo = function (img, title, desc, key, value) {
            if (key && value) {
                this.setExtData(key, value);
            }
            var host = "http://login.publish.bwgame.com.cn:8080/";
            var status;
            //if (StringUtils.stringIsNullOrEmpty(this.getExtData("state"))) {
            //    status = "1";
            //} else
            //    status = String(this.getExtData("state"));
            if (location.href.indexOf("h5.publish.bwgame.com.cn") >= 0) {
                status = "1";
            }
            else {
                status = "0";
            }
            if (status == "0")
                host = "http://h5sdk.zqbconnect.com/";
            var tl = new BodyMenuShareTimeline();
            if (title && !uniLib.StringUtils.stringIsNullOrEmpty(title))
                tl.title = title;
            else
                tl.title = uniLib.Global.shareData.title;
            if (uniLib.Global.shareData.link)
                tl.link = uniLib.Global.shareData.link;
            else {
                tl.link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + uniLib.Global.appId + "&redirect_uri=" + host + uniLib.Global.lobbyGameId + "/wechat_" + uniLib.Global.platInfo.platid + "/login_request?extdata=" + JSON.stringify(this.extData) + "&response_type=code&scope=snsapi_base&state=" + status + "connect_redirect=1#wechat_redirect";
            }
            if (img && !uniLib.StringUtils.stringIsNullOrEmpty(img))
                tl.imgUrl = img;
            else
                tl.imgUrl = uniLib.Global.shareData.imgUrl;
            tl.success = function () {
                // 用户确认分享后执行的回调函数
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, 1);
            };
            wx.onMenuShareTimeline(tl);
            var ta = new BodyMenuShareAppMessage();
            if (title && !uniLib.StringUtils.stringIsNullOrEmpty(title))
                ta.title = title;
            else
                ta.title = uniLib.Global.shareData.title;
            if (desc && !uniLib.StringUtils.stringIsNullOrEmpty(desc))
                ta.desc = desc;
            else
                ta.desc = uniLib.Global.shareData.desc;
            if (uniLib.Global.shareData.link) {
                ta.link = ta.dataUrl = uniLib.Global.shareData.link;
            }
            else {
                ta.dataUrl = ta.link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + uniLib.Global.appId + "&redirect_uri=" + host + uniLib.Global.lobbyGameId + "/wechat_" + uniLib.Global.platInfo.platid + "/login_request?extdata=" + JSON.stringify(this.extData) + "&response_type=code&scope=snsapi_base&state=" + status + "&connect_redirect=1#wechat_redirect";
            }
            ta.success = function () {
                // 用户确认分享后执行的回调函数
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, 2);
            };
            if (img && !uniLib.StringUtils.stringIsNullOrEmpty(img))
                ta.imgUrl = img;
            else
                ta.imgUrl = uniLib.Global.shareData.imgUrl;
            wx.onMenuShareAppMessage(ta);
        };
        /**
         * 根据参数名获取cookie值
         * @param name {string} 参数名
         */
        BrowersUtils.getCookie = function (name) {
            if (uniLib.Global.isH5) {
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null)
                    return arr[2];
            }
            else {
            }
            return null;
        };
        /**
         * 根据参数名设置cookie值
         * @param name {string} 参数名
         * @param name {any} cookie过期时间
         */
        BrowersUtils.setCookie = function (name, value, tm) {
            if (uniLib.Global.isH5) {
                if (value instanceof Object) {
                    value = JSON.stringify(value);
                }
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + tm);
                document.cookie = name + "=" + value +
                    ((tm == null) ? "" : ";expires=" + exdate.toUTCString());
            }
            else {
            }
        };
        /**
         * 根据参数名清除cookie值
         * @param name {string} 参数名
         */
        BrowersUtils.delCookie = function (name) {
            if (uniLib.Global.isH5) {
                if (name) {
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    var cval = this.getCookie(name);
                    if (cval != null)
                        document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
                }
                else {
                    var myDate = new Date();
                    myDate.setTime(-1000); //设置时间    
                    var data = document.cookie;
                    var dataArray = data.split("; ");
                    for (var i = 0; i < dataArray.length; i++) {
                        var varName = dataArray[i].split("=");
                        document.cookie = varName[0] + "=''; expires=" + myDate.toUTCString();
                    }
                }
            }
            else {
            }
        };
        /**
         * 获取当前url
         */
        BrowersUtils.getLocationUrl = function () {
            if (uniLib.Global.isH5) {
                return location.href;
            }
        };
        /**
         * 获取平台库目录
         */
        BrowersUtils.getPlatLibDir = function () {
            if (uniLib.Global.isH5) {
                return location.href.substring(0, uniLib.StringUtils.getPosition(location.href, "/", 3)) + "/" + uniLib.Global.thirdPlatDir;
            }
        };
        /**
         * 跳转到目标地址
         * @param url {string} 地址
         */
        BrowersUtils.redirectUrl = function (url) {
            if (uniLib.Global.isH5) {
                location.href = url;
            }
        };
        /**
         * 跳转到目标地址
         * @param url {string} 地址
         */
        BrowersUtils.parentRedirectUrl = function (url) {
            if (uniLib.Global.isH5) {
                parent.window.location.href = url;
            }
        };
        /**
         * 当前浏览器类型
         */
        BrowersUtils.browersType = function () {
            var ua = window.navigator.userAgent.toLowerCase();
            var microStr = "" + ua.match(/MicroMessenger/i);
            if (microStr == "micromessenger") {
                return "wechat";
            }
            else if (("" + ua.match(/windows nt/i)) == "windows nt") {
                return "windows";
            }
            else if (("" + ua.match(/iphone/i)) == "iphone") {
                return "ios";
            }
            else if (("" + ua.match(/android/i)) == "android") {
                return "android";
            }
            else if (("" + ua.match(/ipad/i)) == "ipad") {
                return "ipad";
            }
            else if (("" + ua.match(/linux/i)) == "linux") {
                return "linux";
            }
            else if (("" + ua.match(/mac/i)) == "mac") {
                return "mac";
            }
            else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
                return "ucbrower";
            }
            else {
                uniLib.Console.log("未知系统类型");
            }
        };
        /**
         * 当前平台类型
         */
        BrowersUtils.platformType = function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
                return "micromessenger";
            }
            else if (("" + ua.match(/qzone/i)) == "qzone") {
                return "qzone";
            }
            else if (("" + ua.match(/weibo/i)) == "weibo") {
                return "weibo";
            }
            else if (("" + ua.match(/qq/i)) == "qq") {
                return "qq";
            }
            else if (("" + ua.match(/renren/i)) == "renren") {
                return "renren";
            }
            else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
                return "txmicroblog";
            }
            else if (("" + ua.match(/douban/i)) == "douban") {
                return "douban";
            }
            else {
                return "other";
            }
        };
        BrowersUtils.prototype.staticisVertical = function () {
            var angle = window["orientation"];
            if (angle == 90) {
                return false;
            }
            else {
                return true;
            }
        };
        //private static browers: any;
        //public static browersType(): any {
        //    if (uniLib.Global.isH5) {
        //        if (this.browers == null) {
        //            this.browers = {};
        //            var ua = navigator.userAgent.toLowerCase();
        //            var s;
        //            (s = ua.match(/msie ([\d.]+)/)) ? this.browers.ie = s[1] :
        //                (s = ua.match(/firefox\/([\d.]+)/)) ? this.browers.firefox = s[1] :
        //                    (s = ua.match(/chrome\/([\d.]+)/)) ? this.browers.chrome = s[1] :
        //                        (s = ua.match(/opera.([\d.]+)/)) ? this.browers.opera = s[1] :
        //                            (s = ua.match(/version\/([\d.]+).*safari/)) ? this.browers.safari = s[1] : 0;
        //        }
        //    }
        //    return this.browers;
        //}
        BrowersUtils.LoadJses = function (arr, callBack, thisObj) {
            var len = arr.length;
            var self = this;
            var loadedIdx = 0;
            var onLoadJs = function () {
                loadedIdx++;
                if (loadedIdx == len) {
                    if (callBack)
                        callBack.call(thisObj);
                }
                else {
                    self.LoadJS(arr[loadedIdx].id, arr[loadedIdx].url, onLoadJs, self);
                }
            };
            this.LoadJS(arr[0].id, arr[0].url, onLoadJs, self);
        };
        BrowersUtils.removeJs = function (id) {
            var scriptTag = document.getElementById(id);
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var oScript = document.createElement("script");
            if (scriptTag)
                oHead.removeChild(scriptTag);
        };
        /**
         * 加载JS脚本
         * @param id {string} 元素id值
         * @param fileUrl {string} 文件路径
         * @param callBack {Function} 加载成功回调
         * @param obj this对象
         */
        BrowersUtils.LoadJS = function (id, fileUrl, loaded, loadErr, obj) {
            this._downTryCount = 0;
            var localUrl = uniLib.GameModuleUtils.gameNativeFolder + fileUrl;
            var loadUrl;
            if (uniLib.StringUtils.isNetUrl(fileUrl)) {
                loadUrl = fileUrl;
            }
            else {
                if (uniLib.GameModuleUtils.gameRemotePaths && uniLib.GameModuleUtils.gameRemotePaths.length > 0) {
                    //这里如果目录最后不带/，则补上一个/
                    loadUrl = uniLib.Global.CdnDomains[0] + uniLib.GameModuleUtils.gameRemotePaths[0] + fileUrl;
                }
                else {
                    loadUrl = fileUrl;
                }
            }
            if (uniLib.Global.isH5) {
                var scriptTag = document.getElementById(id);
                var oHead = document.getElementsByTagName('HEAD').item(0);
                var oScript = document.createElement("script");
                if (scriptTag)
                    oHead.removeChild(scriptTag);
                oScript.id = id;
                oScript.type = "text/javascript";
                oScript.src = loadUrl;
                oHead.appendChild(oScript);
                oScript.onerror = function () {
                    if (loadErr != null) {
                        if (scriptTag)
                            oHead.removeChild(scriptTag);
                        if (obj)
                            loadErr.call(obj, id);
                        else
                            loadErr(id);
                    }
                };
                oScript.onload = oScript.onreadystatechange = function () {
                    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                        if (loaded != null) {
                            if (obj)
                                loaded.call(obj, id);
                            else
                                loaded(id);
                        }
                    }
                };
            }
            else {
                if (egret.hasDefinition("egret_native") && !egret_native.isFileExists(localUrl)) {
                    this.loadNative(loadUrl, localUrl, loaded, loadErr, obj, id);
                }
                else {
                    console.error("#native file exits#");
                    try {
                        var require = uniLib.getDefinitionByName("require");
                        require(localUrl);
                        if (loaded != null) {
                            if (obj)
                                loaded.call(obj, id);
                            else
                                loaded(id);
                        }
                    }
                    catch (e) {
                        uniLib.Console.warn("网络原因下载失败了");
                        egret_native.deleteUpdateFile(localUrl);
                    }
                }
            }
        };
        BrowersUtils.loadNative = function (loadUrl, localUrl, loaded, loadErr, obj, id) {
            var promise = egret.PromiseObject.create();
            var self = this;
            promise.onSuccessFunc = function () {
                console.error("#load native success#");
                var require = uniLib.getDefinitionByName("require");
                require(localUrl);
                if (loaded != null) {
                    if (obj)
                        loaded.call(obj, id);
                    else
                        loaded(id);
                }
            };
            promise.onErrorFunc = function () {
                console.error("#load native error# downTryCount:" + this._downTryCount);
                if (self._downTryCount < 3) {
                    self._downTryCount++;
                    self.loadNative(loadUrl, localUrl, loaded, loadErr, obj, id);
                    // egret_native.download(loadUrl, localUrl, promise);
                }
                else {
                    if (loadErr) {
                        if (obj)
                            loadErr.call(obj, id);
                        else
                            loadErr(id);
                    }
                }
            };
            console.error("remoteUrl:" + loadUrl);
            egret_native.download(loadUrl, localUrl, promise);
        };
        BrowersUtils.extData = new ExtData();
        BrowersUtils._downTryCount = 0;
        return BrowersUtils;
    }());
    uniLib.BrowersUtils = BrowersUtils;
})(uniLib || (uniLib = {}));

/// <reference path="../../3party/includes/pako.d.ts" />
var uniLib;
(function (uniLib) {
    /**
    * 压缩工具
    */
    var CompressUtil = /** @class */ (function () {
        function CompressUtil() {
        }
        /**
         * 根据类型初始化压缩库 暂时不用传参数
         */
        CompressUtil.init = function (type, onLoaded, thisObj) {
            if (type === void 0) { type = CompressType.NONE; }
            uniLib.Global.compressType = type;
            //var arr: any[] = [
            //   { id: "huffman", url: RES.getVersionController().getVirtualUrl("resource/script/zlib.js") },
            //]
            //uniLib.BrowersUtils.LoadJses(arr, onLoaded, thisObj);
            if (onLoaded)
                onLoaded.call(thisObj);
        };
        /**
         * 压缩方法
         * @param data {string} 需要压缩的数据
         * @param compressType {string} 压缩类型
         */
        CompressUtil.compressByType = function (data, compressType) {
            switch (compressType) {
                case CompressType.GZIP:
                    return pako.deflate(data);
                case CompressType.FLATE:
                    return pako.deflate(data, { raw: true });
            }
        };
        /**
         * 解压方法
         * @param data {string} 需要解压的数据
         * @param compressType {string} 解压类型
         */
        CompressUtil.uncompressByType = function (data, compressType) {
            switch (compressType) {
                case CompressType.GZIP:
                    return pako.inflate(data, { to: 'string' });
                case CompressType.FLATE:
                    return pako.inflate(data, { to: 'string', raw: true });
            }
        };
        CompressUtil.stringToUint = function (st) {
            var str = encodeURIComponent(st), charList = str.split(''), uintArray = [];
            for (var i = 0; i < charList.length; i++) {
                uintArray.push(charList[i].charCodeAt(0));
            }
            return new Uint8Array(uintArray);
        };
        CompressUtil.uintToString = function (uintArray) {
            var encodedString = String.fromCharCode.apply(null, uintArray), decodedString = decodeURIComponent(encodedString);
            return decodedString;
        };
        CompressUtil.char2buf = function (str) {
            var out = new ArrayBuffer(str.length * 2);
            var u16a = new Uint16Array(out);
            var strs = str.split("");
            for (var i = 0; i < strs.length; i++) {
                u16a[i] = strs[i].charCodeAt();
            }
            return out;
        };
        CompressUtil.buf2char = function (buf) {
            var out = "";
            var u16a = new Uint16Array(buf);
            var single;
            for (var i = 0; i < u16a.length; i++) {
                single = u16a[i].toString(16);
                while (single.length < 4)
                    single = "0".concat(single);
                out += "\\u" + single;
            }
            return eval("'" + out + "'");
        };
        // function uintToString(uintArray) {
        //     var encodedString = String.fromCharCode.apply(null, uintArray),
        //         decodedString = decodeURIComponent(escape(atob(encodedString)));
        //     return decodedString;
        // }
        CompressUtil.Utf8ArrayToStr = function (array) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = array.length;
            i = 0;
            while (i < len) {
                c = array[i++];
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        // 0xxxxxxx
                        out += String.fromCharCode(c);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx   10xx xxxx
                        char2 = array[i++];
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = array[i++];
                        char3 = array[i++];
                        out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        };
        CompressUtil.stringToArray = function (str, array) {
            for (var i = 0; i < str.length; ++i) {
                array[i] = str.charCodeAt(i) & 0xFF;
            }
            return array;
        };
        CompressUtil.arrayLikeToArray = function (arrayFrom, arrayTo) {
            for (var i = 0; i < arrayFrom.length; i++) {
                arrayTo[i] = arrayFrom[i];
            }
            return arrayTo;
        };
        CompressUtil.stringToCodePoints = function (string) {
            /** @type {Array.<number>} */
            var cps = [];
            // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
            var i = 0, n = string.length;
            while (i < string.length) {
                var c = string.charCodeAt(i);
                if (!uniLib.NumberUtils.inRange(c, 0xD800, 0xDFFF)) {
                    cps.push(c);
                }
                else if (uniLib.NumberUtils.inRange(c, 0xDC00, 0xDFFF)) {
                    cps.push(0xFFFD);
                }
                else {
                    if (i == n - 1) {
                        cps.push(0xFFFD);
                    }
                    else {
                        var d = string.charCodeAt(i + 1);
                        if (uniLib.NumberUtils.inRange(d, 0xDC00, 0xDFFF)) {
                            var a = c & 0x3FF;
                            var b = d & 0x3FF;
                            i += 1;
                            cps.push(0x10000 + (a << 10) + b);
                        }
                        else {
                            cps.push(0xFFFD);
                        }
                    }
                }
                i += 1;
            }
            return cps;
        };
        /**
         * @private
         * UTF-8 Encoding/Decoding
         */
        CompressUtil.encodeUTF8 = function (str) {
            var pos = 0;
            var codePoints = this.stringToCodePoints(str);
            var outputBytes = [];
            while (codePoints.length > pos) {
                var code_point = codePoints[pos++];
                if (uniLib.NumberUtils.inRange(code_point, 0xD800, 0xDFFF)) {
                    uniLib.Console.error("encode error:" + code_point);
                }
                else if (uniLib.NumberUtils.inRange(code_point, 0x0000, 0x007f)) {
                    outputBytes.push(code_point);
                }
                else {
                    var count, offset;
                    if (uniLib.NumberUtils.inRange(code_point, 0x0080, 0x07FF)) {
                        count = 1;
                        offset = 0xC0;
                    }
                    else if (uniLib.NumberUtils.inRange(code_point, 0x0800, 0xFFFF)) {
                        count = 2;
                        offset = 0xE0;
                    }
                    else if (uniLib.NumberUtils.inRange(code_point, 0x10000, 0x10FFFF)) {
                        count = 3;
                        offset = 0xF0;
                    }
                    outputBytes.push(uniLib.NumberUtils.div(code_point, Math.pow(64, count)) + offset);
                    while (count > 0) {
                        var temp = uniLib.NumberUtils.div(code_point, Math.pow(64, count - 1));
                        outputBytes.push(0x80 + (temp % 64));
                        count -= 1;
                    }
                }
            }
            return new Uint8Array(outputBytes);
        };
        CompressUtil.base64encode = function (input) {
            try {
                this.b64pad;
            }
            catch (e) {
                this.b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            try {
                input = encodeURIComponent(input);
            }
            catch (e) {
                uniLib.Console.error("error " + e.toString());
            }
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8)
                        output += this.b64pad;
                    else
                        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        };
        CompressUtil.base64decode = function (str) {
            var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                /* c1 */
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == -1);
                if (c1 == -1)
                    break;
                /* c2 */
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == -1);
                if (c2 == -1)
                    break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                /* c3 */
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = base64DecodeChars[c3];
                } while (i < len && c3 == -1);
                if (c3 == -1)
                    break;
                out += String.fromCharCode(((c2 & 0x0F) << 4) | ((c3 & 0x3C) >> 2));
                /* c4 */
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = base64DecodeChars[c4];
                } while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            out = decodeURIComponent(out);
            return out;
        };
        CompressUtil.compressStr = ["", "flate", "zlib", "gzip", "lzw"];
        CompressUtil.b64pad = "";
        return CompressUtil;
    }());
    uniLib.CompressUtil = CompressUtil;
    var CompressType;
    (function (CompressType) {
        CompressType[CompressType["NONE"] = 0] = "NONE";
        CompressType[CompressType["FLATE"] = 1] = "FLATE";
        CompressType[CompressType["ZLIB"] = 2] = "ZLIB";
        CompressType[CompressType["GZIP"] = 3] = "GZIP";
        CompressType[CompressType["LZW"] = 4] = "LZW";
    })(CompressType = uniLib.CompressType || (uniLib.CompressType = {}));
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var ConfigUtils = /** @class */ (function () {
        function ConfigUtils() {
        }
        Object.defineProperty(ConfigUtils, "appConfig", {
            get: function () {
                return this._appConfig;
            },
            enumerable: true,
            configurable: true
        });
        ConfigUtils.initAppConfig = function (cfg) {
            if (!this._appConfig) {
                this._appConfig = cfg;
            }
            return this._appConfig;
        };
        return ConfigUtils;
    }());
    uniLib.ConfigUtils = ConfigUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var LOGLEVEL;
    (function (LOGLEVEL) {
        LOGLEVEL[LOGLEVEL["DEBUG"] = 0] = "DEBUG";
        LOGLEVEL[LOGLEVEL["INFO"] = 1] = "INFO";
        LOGLEVEL[LOGLEVEL["WARN"] = 2] = "WARN";
        LOGLEVEL[LOGLEVEL["ERROR"] = 3] = "ERROR";
        LOGLEVEL[LOGLEVEL["DEBUG_SERVER"] = 4] = "DEBUG_SERVER";
        LOGLEVEL[LOGLEVEL["INFO_SERVER"] = 5] = "INFO_SERVER";
        LOGLEVEL[LOGLEVEL["WARN_SERVER"] = 6] = "WARN_SERVER";
        LOGLEVEL[LOGLEVEL["ERROR_SERVER"] = 7] = "ERROR_SERVER";
    })(LOGLEVEL = uniLib.LOGLEVEL || (uniLib.LOGLEVEL = {}));
    /**
     * 控制台打印管理
     */
    var Console = /** @class */ (function () {
        function Console() {
        }
        Console.setLogLevel = function (level) {
            if (this.isDevMode == true) {
                this.LogLevel = LOGLEVEL.DEBUG;
                //egret.Logger.logLevel = egret.Logger.ALL;
            }
            else {
                this.LogLevel = level;
                egret.Logger.logLevel = egret.Logger.INFO;
            }
        };
        Console.init = function (b, logLevel) {
            if (uniLib.Global.isH5) {
                //if (Boolean(BrowersUtils.GetRequest("debug")) === true) {
                this.isDevMode = b;
                //}
            }
            else {
                this.isDevMode = b;
            }
            this.setLogLevel(logLevel);
            //    if (Global.isH5) {
            //        //if (location.host.indexOf("h5.publish.bwgame.com.cn") >= 0) {
            //        //    Global.logUrl = "http://login.publish.bwgame.com.cn:7000/shen/clientlog";
            //        //} else {
            //        //    Global.logUrl = "http://server.login.bwgame.com.cn:7000/shen/clientlog";
            //        //}
            //        //if (location.host.indexOf("h5.publish.bwgame.com.cn") >= 0 || location.host.indexOf("h5.bwgame.com.cn") >= 0)
            //        window["onerror"] = this.onErr.bind(this);
            //    }
        };
        Console.logToServer = function (level, str) {
            //alert(errorMessage + "  " + scriptURI + "  " + lineNumber + "  " + columnNumber + "  " + errorObj);
            //if (Global.defaultConfig == null) {
            //    return;
            //}
            //if (Global.defaultConfig != null && Global.defaultConfig.debug_level != null) {
            //    if (Number(type) == Global.defaultConfig.debug_level)
            //        return;
            //}
            var errorMessage = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                errorMessage[_i - 2] = arguments[_i];
            }
            if (uniLib.Global.isH5) {
                if (uniLib.BrowersUtils.isLocal() == true)
                    return;
            }
            var str = this.LOG_LEVEL_STR[level] + "\t" + str;
            if (errorMessage) {
                errorMessage.forEach(function (txt) {
                    if (txt) {
                        str += txt;
                    }
                });
            }
            //if (this.err_rqst == null) {
            this.err_rqst = new uniLib.HttpRequest();
            this.err_rqst.open(uniLib.Global.logUrl);
            //}
            this.err_rqst.send(str);
        };
        Console.getLocalLevel = function (level) {
            if (level >= LOGLEVEL.DEBUG_SERVER) {
                level = this.LogLevel - LOGLEVEL.DEBUG_SERVER;
            }
            return level;
        };
        Console.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var level = this.getLocalLevel(this.LogLevel);
            if (level <= LOGLEVEL.DEBUG) {
                if (message == null || message == undefined || (typeof (message) == "string" && message == "")) {
                    this.error("日志不能为空,请加标识头,不能再坑队友了!");
                }
                if (uniLib.Global.isH5) {
                    console.log(new Date().toTimeString().split(" ")[0], "LOG", message, optionalParams);
                }
                else {
                    console.log(message, optionalParams);
                }
                if (level != this.LogLevel) {
                    this.logToServer(level, message, optionalParams);
                }
            }
        };
        Object.defineProperty(Console, "logEnable", {
            get: function () {
                return this.getLocalLevel(this.LogLevel) >= LOGLEVEL.DEBUG;
            },
            enumerable: true,
            configurable: true
        });
        Console.debug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var level = this.getLocalLevel(this.LogLevel);
            if (level <= LOGLEVEL.DEBUG) {
                if (message == null || message == undefined || (typeof (message) == "string" && message == "")) {
                    this.error("日志不能为空,请加标识头,不能再坑队友了!");
                }
                if (uniLib.Global.isH5) {
                    console.log(new Date().toTimeString().split(" ")[0], "DEBUG", message, optionalParams);
                }
                else {
                    console.log(message, optionalParams);
                }
                if (level != this.LogLevel) {
                    this.logToServer(level, message, optionalParams);
                }
            }
        };
        Object.defineProperty(Console, "debugEnable", {
            get: function () {
                return this.getLocalLevel(this.LogLevel) >= LOGLEVEL.DEBUG;
            },
            enumerable: true,
            configurable: true
        });
        Console.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var level = this.getLocalLevel(this.LogLevel);
            if (level <= LOGLEVEL.INFO) {
                if (message == null || message == undefined || (typeof (message) == "string" && message == "")) {
                    this.error("日志不能为空,请加标识头,不能再坑队友了!");
                }
                if (uniLib.Global.isH5) {
                    console.log(new Date().toTimeString().split(" ")[0], "INFO", message, optionalParams);
                }
                else {
                    console.log(message, optionalParams);
                }
                if (level != this.LogLevel) {
                    this.logToServer(level, message, optionalParams);
                }
            }
        };
        Object.defineProperty(Console, "infoEnable", {
            get: function () {
                return this.getLocalLevel(this.LogLevel) >= LOGLEVEL.INFO;
            },
            enumerable: true,
            configurable: true
        });
        Console.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var level = this.getLocalLevel(this.LogLevel);
            if (level <= LOGLEVEL.WARN) {
                if (message == null || message == undefined || (typeof (message) == "string" && message == "")) {
                    this.error("日志不能为空,请加标识头,不能再坑队友了!");
                }
                if (uniLib.Global.isH5) {
                    console.log(new Date().toTimeString().split(" ")[0], "WARN", message, optionalParams);
                }
                else {
                    console.log(message, optionalParams);
                }
                if (level != this.LogLevel) {
                    this.logToServer(level, message, optionalParams);
                }
            }
        };
        Object.defineProperty(Console, "warnEnable", {
            get: function () {
                return this.getLocalLevel(this.LogLevel) >= LOGLEVEL.WARN;
            },
            enumerable: true,
            configurable: true
        });
        Console.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var level = this.getLocalLevel(this.LogLevel);
            if (level <= LOGLEVEL.ERROR) {
                if (message == null || message == undefined || (typeof (message) == "string" && message == "")) {
                    this.error("日志不能为空,请加标识头,不能再坑队友了!");
                }
                if (uniLib.Global.isH5) {
                    console.error(new Date().toTimeString().split(" ")[0], "ERROR", message, optionalParams);
                }
                else {
                    console.log(message, optionalParams);
                }
                if (level != this.LogLevel) {
                    this.logToServer(level, message, optionalParams);
                }
            }
            var str = message;
            if (optionalParams) {
                optionalParams.forEach(function (txt) {
                    if (txt) {
                        str += txt;
                    }
                });
            }
            if (uniLib["DebugView"])
                uniLib["DebugView"].Instance.addLog(str);
        };
        Object.defineProperty(Console, "errorEnable", {
            get: function () {
                return this.getLocalLevel(this.LogLevel) >= LOGLEVEL.ERROR;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否是开发模式
         */
        Console.isDevMode = false;
        Console.LOG_LEVEL_STR = ["[DEBUG]", "[INFO]", "[WARN]", "[ERROR]"];
        /**
         * 日志级别
         */
        Console.LogLevel = 7; //LOGLEVEL.ERROR_SERVER;
        return Console;
    }());
    uniLib.Console = Console;
})(uniLib || (uniLib = {}));
// onerror = function (errorMessage: any, scriptURI?: any, lineNumber?: any, columnNumber?: any, errorObj?: any) {
//     var str = "异常捕获:gameid:" + uniLib.Global.gameId + ":lobbyid:" + uniLib.Global.lobbyGameId + ":" + errorMessage + "url:" + scriptURI + "line:" + lineNumber;
//     uniLib.Console.error(str);
//     if (uniLib["DebugView"])
//         uniLib["DebugView"].Instance.addLog(str);
//     //uniLib["DebugView"].Instance.show();
// }

var uniLib;
(function (uniLib) {
    /**
     * @private
     */
    var getDefinitionByNameCache = {};
    function getDefinitionByName(name) {
        if (!name)
            return null;
        var definition = getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        var paths = name.split(".");
        var length = paths.length;
        definition = global;
        for (var i = 0; i < length; i++) {
            var path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        getDefinitionByNameCache[name] = definition;
        return definition;
    }
    uniLib.getDefinitionByName = getDefinitionByName;
    function hasDefinition(name) {
        var definition = getDefinitionByName(name);
        return definition ? true : false;
    }
    uniLib.hasDefinition = hasDefinition;
    function test(name) {
        var regstr = "^" + name + ".";
        for (var i in getDefinitionByNameCache) {
            if (i.match(regstr)) {
                console.error("匹配成功:" + i);
            }
        }
    }
    uniLib.test = test;
    function delDefinitionByName(name) {
        if (!name)
            return null;
        var regstr = "^" + name + ".";
        if (name.indexOf(".") == -1) {
            for (var i in getDefinitionByNameCache) {
                if (i.match(regstr)) {
                    getDefinitionByNameCache[i] = null;
                    delete getDefinitionByNameCache[i];
                }
            }
        }
        else {
            getDefinitionByNameCache[name] = null;
            delete getDefinitionByNameCache[name];
        }
    }
    uniLib.delDefinitionByName = delDefinitionByName;
    function getQualifiedSuperclassName(value) {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
    uniLib.getQualifiedSuperclassName = getQualifiedSuperclassName;
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__class__")) {
            return prototype["__class__"];
        }
        var constructorString = prototype.constructor.toString().trim();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    uniLib.getQualifiedClassName = getQualifiedClassName;
})(uniLib || (uniLib = {}));
// var __uglobal = __uglobal || this; 

var uniLib;
(function (uniLib) {
    /**
     * 设备API
     */
    var DeviceUtils = /** @class */ (function () {
        function DeviceUtils() {
        }
        /**
         * 调用手机震动
         * @param time 震动时间
         */
        DeviceUtils.vibrate = function (time) {
            if (time === void 0) { time = 1000; }
            if (navigator["vibrate"]) {
                navigator["vibrate"](time);
            }
            else if (navigator["webkitVibrate"]) {
                navigator["webkitVibrate"](time);
            }
        };
        DeviceUtils.uploadFile = function (file) {
            if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
                var reader = new FileReader();
                var self = this;
                reader.onload = (function () {
                    var result = document.getElementById("result");
                    result.innerHTML = '<img id="photoImg" src="' + this.result + '" alt="" />';
                    var texture = new egret.Texture();
                    if (egret["BitmapData"] != null)
                        texture._setBitmapData(eval("new egret.BitmapData(document.getElementById('photoImg'))")); // FOR egret 3.2.4
                    else
                        texture._setBitmapData((document.getElementById("photoImg"))); // FOR egret 3.0.8
                    DeviceUtils.srcImg.texture = texture;
                });
                reader.readAsDataURL(file);
            }
            else {
                console.error("抱歉！当前系统不支持此功能！");
            }
        };
        DeviceUtils.traverseFiles = function (files) {
            if ((typeof files !== "undefined") && (files.length > 0)) {
                DeviceUtils.uploadFile(files[0]);
            }
            else {
                //alert("抱歉！当前系统不支持此功能！");
            }
        };
        /**
         * 调用摄像头
         * @param srcImg
         */
        DeviceUtils.fileUpload = function (srcImg) {
            this.srcImg = srcImg;
            var filesUpload = document.getElementById("files-upload");
            filesUpload.click();
            var self = this;
            filesUpload.addEventListener("change", function () {
                self.traverseFiles(this["files"]);
            }, false);
        };
        //=======================以上内容是调用手机相册和摄像头获取图片方法===============================
        //调用麦克风  
        DeviceUtils.getMic = function () {
            //getUserMedia API 大部分手机不支持，所以暂不考虑
        };
        //调用canvas截屏
        DeviceUtils.getScreen = function () {
        };
        //调用打电话功能
        DeviceUtils.callPhone = function (telNum) {
            try {
                window.open("tel:" + telNum, '_self');
            }
            catch (e) {
            }
        };
        //调用发短信功能
        DeviceUtils.sendMessage = function (telNum) {
            try {
                window.open("sms:" + telNum, '_self');
            }
            catch (e) {
            }
        };
        //获取当前地址
        DeviceUtils.getCurUrl = function () {
            try {
                return location.href;
            }
            catch (e) {
            }
        };
        // 储存数据需要key和value，都必须是字符串
        //public static setLocalData(key: string, value: string): void {
        //    localStorage.setItem(key, value);
        //}
        //// 读取数据
        //public static getLocalData(key: string): string {
        //    return localStorage.getItem(key);
        //}
        //// 删除数据
        //public static deleteLocalData(key: string): void {
        //    localStorage.removeItem(key);
        //}
        //// 将所有数据清空
        //public static clearLocalData(): void {
        //    localStorage.clear();
        //}
        //=======================以下内容是调用手机相册和摄像头获取图片方法===============================
        //在index中增加
        //<div style="display:none">
        //    <input id="files-upload" type="file" width='0' height='0' multiple accept="image/.*;capture=camera" name="file"> 
        //    <div id="result" name="result"></div> 
        //</div>
        //to do 多平台兼容不是很好 uc可以 微信不支持FileReader，目前不知道为什么暂且搁置
        //参考网址
        DeviceUtils.srcImg = new egret.Bitmap();
        //当前游戏角度
        DeviceUtils.curAngle = Number(window["orientation"]);
        return DeviceUtils;
    }());
    uniLib.DeviceUtils = DeviceUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var DisplayUtils = /** @class */ (function () {
        function DisplayUtils() {
        }
        /**
         * 创建资源
         */
        DisplayUtils.createBitmapByName = function (keyName) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(keyName);
            result.texture = texture;
            return result;
        };
        /**
         * 创建动画
         * @param groupName
         * @param keyName
         */
        DisplayUtils.createMovieClicp = function (groupName, keyName) {
            var data = RES.getRes(groupName + "_json"); //获取动画文件的信息配置文件
            var texture = RES.getRes(groupName + "_png"); //获取动画文件的图片
            var mdf = new egret.MovieClipDataFactory(data, texture);
            var mc = new egret.MovieClip(mdf.generateMovieClipData(keyName)); //创建MovieClip
            return mc;
        };
        /**
         * 创建矩形
         * @param alpha
         * @param w
         * @param h
         * @param color
         */
        DisplayUtils.createMask = function (alpha, w, h, color) {
            if (alpha === void 0) { alpha = 0.3; }
            if (color === void 0) { color = 0x000000; }
            var sp = new egret.Sprite();
            sp.graphics.clear();
            sp.graphics.beginFill(color, alpha);
            sp.graphics.drawRect(0, 0, w ? w : uniLib.Global.screenWidth, h ? h : uniLib.Global.screenHeight);
            sp.graphics.endFill();
            return sp;
        };
        /**
         * 创建矩形
         * @param alpha
         * @param w
         * @param h
         * @param color
         */
        DisplayUtils.createShape = function (alpha, w, h, color) {
            if (alpha === void 0) { alpha = 0.3; }
            if (color === void 0) { color = 0x000000; }
            var sp = new egret.Shape();
            sp.graphics.clear();
            sp.graphics.beginFill(color, alpha);
            sp.graphics.drawRect(0, 0, w ? w : uniLib.Global.screenWidth, h ? h : uniLib.Global.screenHeight);
            sp.graphics.endFill();
            return sp;
        };
        /**
         * 创建圆形
         */
        DisplayUtils.createCircle = function (alpha, r, color) {
            if (alpha === void 0) { alpha = 0.3; }
            if (color === void 0) { color = 0x000000; }
            var sp = new egret.Sprite();
            sp.graphics.clear();
            sp.graphics.beginFill(color, alpha);
            sp.graphics.drawCircle(0, 0, r);
            sp.graphics.endFill();
            return sp;
        };
        /**
         * 创建粒子
         * @param keyName
         */
        DisplayUtils.createParticle = function (keyName) {
            var par;
            var texture = RES.getRes(keyName + "_png");
            var config = RES.getRes(keyName + "_json");
            if (particle && particle["GravityParticleSystem"])
                par = new particle["GravityParticleSystem"](texture, config);
            return par;
        };
        /**
         * 创建DragonBones显示对象
         */
        DisplayUtils.createDragonBonesDisplay = function (dragonJson, json, png, bones, cache) {
            var dragonbonesData = RES.getRes(dragonJson);
            if (png && png != null) {
                var textureData = RES.getRes(json);
                var texture = RES.getRes(png);
            }
            else {
                var textureData = RES.getRes(json + "_json");
                var texture = RES.getRes(json + "_png");
            }
            if (uniLib.StringUtils.stringIsNullOrEmpty(bones))
                bones = "armature";
            var armature;
            if (dragonBones) {
                if (egret.Capabilities.engineVersion < "5.0") {
                    var dragonbonesFactory = new dragonBones["EgretFactory"]();
                    dragonbonesFactory.addDragonBonesData(dragonBones["DataParser"].parseDragonBonesData(dragonbonesData));
                    dragonbonesFactory.addTextureAtlas(new dragonBones["EgretTextureAtlas"](texture, textureData));
                    if (cache) {
                        armature = dragonbonesFactory.buildFastArmature(bones);
                        armature.enableAnimationCache(cache);
                    }
                    else
                        armature = dragonbonesFactory.buildArmature(bones);
                }
                else {
                    dragonBones.EgretFactory.factory.parseDragonBonesData(dragonbonesData); // 解析骨骼动画数据
                    dragonBones.EgretFactory.factory.parseTextureAtlasData(textureData, texture); // 解析贴图数据
                    if (cache) {
                        armature = dragonbonesFactory.buildFastArmature(bones);
                        armature.enableAnimationCache(cache);
                    }
                    else {
                        armature = dragonBones.EgretFactory.factory.buildArmature(bones); // 创建 Armature
                    }
                }
            }
            return armature;
        };
        /**
         * 运行龙骨动画
         * @param animationName {string} 指定播放的动画名称.
         * @param playTimes {number} 动画播放次数(0:循环播放, >=1:播放次数, NaN:使用动画数据中的播放时间), 默认值：NaN
         * @returns {AnimationState} 动画播放状态实例
         *
         */
        DisplayUtils.runDragonBonesArmature = function (armature, animationName, playTimes, isPlay) {
            if (isPlay === void 0) { isPlay = true; }
            if (armature == null) {
                uniLib.Console.error("armature不能为空");
                return;
            }
            // if (egret.Capabilities.engineVersion < "4.0") {//4.0以上引擎龙骨时钟引擎自己管理了
            dragonBones["WorldClock"]["clock"].add(armature);
            // }
            if (isPlay) {
                armature.animation.gotoAndPlay(animationName, 0, -1, playTimes, 0);
            }
            else {
                armature.animation.gotoAndStop(animationName, 0);
            }
        };
        /**
         * 删除龙骨动画
         */
        DisplayUtils.destoryDragonBonesArmature = function (armature, animationName) {
            if (armature == null) {
                uniLib.Console.error("armature不能为空");
                return;
            }
            // if (egret.Capabilities.engineVersion < "4.0") {//4.0以上引擎龙骨时钟引擎自己管理了
            dragonBones["WorldClock"]["clock"].remove(armature);
            // }
            armature.animation.stop();
            //egret.stopTick(this.onTicker,this);
            armature.dispose();
        };
        /**
         * 文本资源
         */
        DisplayUtils.createTextLabel = function (color, align, txt, size, width, height, strokeColor, stroke, x, y, rotation, skewX) {
            if (color === void 0) { color = 0x000000; }
            if (align === void 0) { align = "left"; }
            if (txt === void 0) { txt = "none"; }
            if (size === void 0) { size = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (strokeColor === void 0) { strokeColor = 0; }
            if (stroke === void 0) { stroke = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (rotation === void 0) { rotation = 0; }
            if (skewX === void 0) { skewX = 0; }
            var text = new egret.TextField();
            text.textColor = color;
            text.textAlign = align;
            text.fontFamily = "微软雅黑";
            text.text = txt;
            text.size = size;
            if (0 != width)
                text.width = width;
            if (height != 0)
                text.height = height;
            if (strokeColor != 0 && strokeColor != stroke) {
                text.strokeColor = strokeColor;
                text.stroke = stroke;
            }
            text.rotation = rotation;
            if (skewX != 0)
                text.skewX = skewX;
            text.x = x;
            text.y = y;
            return text;
        };
        /**
         * 从父移除
         * @param obj
         */
        DisplayUtils.removeFromParent = function (obj) {
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        };
        /**
         * 从父移除
         * @param obj
         */
        DisplayUtils.getChildIndex = function (obj) {
            if (obj && obj.parent) {
                return obj.parent.getChildIndex(obj);
            }
            return 0;
        };
        /**
        * 移除显示容器中的所有子集但不包括自己
        * @param disContainer
        */
        DisplayUtils.removeAllChildren = function (disContainer) {
            while (disContainer && disContainer.numChildren && disContainer.numChildren > 0) {
                this.removeFromParent(disContainer.getChildAt(0));
            }
        };
        /**
         * 截屏
         * @param obj
         * @param rect
         */
        DisplayUtils.catchScreen = function (obj, rect) {
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(obj);
            return renderTexture.toDataURL("image/png", rect ? rect : new egret.Rectangle(0, 0, obj.width, obj.height));
        };
        /**
         * 截屏
         * @param obj
         * @param rect
         */
        DisplayUtils.catchScreenToTex = function (obj, rect, scale) {
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(obj, rect, scale);
            return renderTexture;
        };
        DisplayUtils.lightArea = function (area, maskAlpha) {
            if (maskAlpha === void 0) { maskAlpha = 0.8; }
            var container = new egret.DisplayObjectContainer();
            var mask = uniLib.DisplayUtils.createShape(maskAlpha, uniLib.Global.screenWidth, uniLib.Global.screenHeight);
            container.addChild(mask);
            container.addChild(area);
            area.blendMode = egret.BlendMode.ERASE;
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(container);
            var bitmap = new egret.Bitmap();
            bitmap.texture = renderTexture;
            return bitmap;
        };
        /**
         * 播放Tween动画组,增加循环播放方式
         */
        DisplayUtils.playTweenGroup = function (target, isLoop) {
            if (isLoop) {
                for (var key in target.items) {
                    target.items[key].props = { loop: true };
                }
            }
            target.play();
        };
        /**
         * 停止时还原默认不循环播放
         */
        DisplayUtils.stopTweenGroup = function (target) {
            if (target.items) {
                for (var key in target.items) {
                    target.items[key].props = { loop: false };
                }
            }
            target.stop();
        };
        DisplayUtils.ticketStarted = false;
        return DisplayUtils;
    }());
    uniLib.DisplayUtils = DisplayUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
     * 龙骨动画类型
     */
    var DragonType = /** @class */ (function () {
        function DragonType() {
        }
        DragonType.MovieClip = "MovieClip";
        DragonType.ARMATURE = "Armature";
        return DragonType;
    }());
    uniLib.DragonType = DragonType;
    /**
     * 管理龙骨动画工具类
     */
    var DragonUtils = /** @class */ (function () {
        function DragonUtils() {
        }
        /**
         * 创建DragonBones极速模式 dragbone 5.0以上版本
         */
        DragonUtils.createFastDragonBones = function (dragoncfg, png, bones, groupName, cache) {
            if (bones === void 0) { bones = "armature"; }
            var armature;
            if (dragonBones.hasMovieGroup(groupName) == false) {
                dragonBones.addMovieGroup(RES.getRes(dragoncfg), RES.getRes(png), groupName);
            }
            armature = dragonBones.buildMovie(bones, groupName);
            if (cache)
                armature.enableAnimationCache(cache); //开启数据缓存，30代表采样帧频，推荐设置为12~30，达到性能和动画流畅度的最佳平衡点。
            return armature;
        };
        // public static stopFastDragonBones(mc: dragonBones.Movie) {
        // }
        // public static destoryFastDragonBones(armature: any, animationName: string): any {
        // }
        /**
         * @language zh_CN
         * 显示龙骨动画;
         * @param frameName 	龙骨动画组名
         * @param mcName 		动画名
         * @param armature		动画类型 DragonType.MovieClip | DragonType.ARMATURE
         * @param x 			位置 x
         * @param y 			位置 y
         * @param container 	动画添加到的显示容器
         * @param playTimes		播放次数
         * @param timeScale 	播放速度
         * @param key			动画唯一key，方便通过Key移除动画文件
         */
        DragonUtils.showFastDragon = function (frameName, mcName, armature, x, y, container, playTimes, timeScale, key) {
            if (frameName === void 0) { frameName = ""; }
            if (mcName === void 0) { mcName = ""; }
            if (armature === void 0) { armature = DragonType.MovieClip; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (playTimes === void 0) { playTimes = 0; }
            var mc;
            if (frameName != "") {
                mc = DragonUtils.createFastDragonBones(frameName + "_ske_dbmv", frameName + "_tex_png", armature, frameName);
                if (!mc)
                    return;
                if (x == null) {
                    mc.x = (uniLib.Global.screenWidth - mc.width) >> 1;
                }
                else {
                    mc.x = x;
                }
                if (y == null) {
                    mc.y = (uniLib.Global.screenHeight - mc.height) >> 1;
                }
                else {
                    mc.y = y;
                }
                if (container == null) {
                    if (uniLib.SceneMgr.instance.currentScene) {
                        container = uniLib.SceneMgr.instance.currentScene.effectLayer;
                    }
                    else {
                        container = egret.MainContext.instance.stage;
                    }
                }
                if (timeScale) {
                    mc.timeScale = timeScale;
                }
                container.addChild(mc);
                if (this.fastDragonGroup[frameName + "_" + container.hashCode] == null) {
                    this.fastDragonGroup[frameName + "_" + container.hashCode] = {};
                }
                if (this.fastDragonGroup[frameName + "_" + container.hashCode][mcName] == null) {
                    this.fastDragonGroup[frameName + "_" + container.hashCode][mcName] = {};
                }
                if (key) {
                    if (this.fastDragonGroup[frameName + "_" + container.hashCode][mcName][key] == null) {
                        this.fastDragonGroup[frameName + "_" + container.hashCode][mcName][key] = {};
                    }
                    this.fastDragonGroup[frameName + "_" + container.hashCode][mcName][key][mc.hashCode] = mc;
                    this.fastDragonKeyGroup[key] = this.fastDragonGroup[frameName + "_" + container.hashCode][mcName];
                }
                else {
                    this.fastDragonGroup[frameName + "_" + container.hashCode][mcName][mc.hashCode] = mc;
                }
                // mc.addEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.movieHandler, this);
                mc.play(mcName, playTimes);
                return mc;
            }
        };
        // private static movieHandler(e: dragonBones.MovieEvent): void {
        // 	var tartegt: dragonBones.Movie = e.movie;
        // 	if (tartegt){
        // 		tartegt.stop();
        // 		tartegt.removeEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.movieHandler, this);
        // 	}
        // }
        /**
         * 通过容器移除龙骨动画
         * @container 	容器
         * @mcName 		动画名称
         * @key			动画唯一标示
         */
        DragonUtils.removeFastDragonbyContainer = function (container, mcName, key) {
            for (var dcfgName in this.fastDragonGroup) {
                if (dcfgName.indexOf("_" + container.hashCode) >= 0) {
                    this.removeDragonFromDic(this.fastDragonGroup[dcfgName], mcName, key);
                    if (!mcName) {
                        delete this.fastDragonGroup[dcfgName];
                    }
                }
            }
        };
        /**
         * 通过龙骨动画文件移除龙骨动画
         * @frameName 	文件名
         * @mcName 		动画名称
         * @key			动画唯一标示
         */
        DragonUtils.removeFastDragonByDragonName = function (frameName, mcName, key) {
            if (frameName === void 0) { frameName = ""; }
            for (var dcfgName in this.fastDragonGroup) {
                if (dcfgName.indexOf(frameName + "_") >= 0) {
                    this.removeDragonFromDic(this.fastDragonGroup[dcfgName], mcName, key);
                    if (!mcName) {
                        delete this.fastDragonGroup[dcfgName];
                    }
                }
            }
        };
        /**
         * 通过key来移动龙骨
         */
        DragonUtils.removeFastDragonByKey = function (key) {
            if (this.fastDragonKeyGroup[key] && this.fastDragonKeyGroup[key][key]) {
                for (var name in this.fastDragonKeyGroup[key][key]) {
                    this.fastDragonKeyGroup[key][key][name].stop();
                    // this.fastDragonKeyGroup[key][key][i].removeEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.movieHandler, this);
                    uniLib.DisplayUtils.removeFromParent(this.fastDragonKeyGroup[key][key][name]);
                    delete this.fastDragonKeyGroup[key][key][name];
                }
                delete this.fastDragonKeyGroup[key][key];
                this.fastDragonKeyGroup[key] = null;
                delete this.fastDragonKeyGroup[key];
            }
        };
        DragonUtils.removeDragonFromDic = function (dic, mcName, key) {
            if (mcName) {
                if (dic[mcName]) {
                    if (key) {
                        if (dic[mcName][key]) {
                            for (var nm in dic[mcName][key]) {
                                if (dic[mcName][key][nm]) {
                                    if (dic[mcName][key] instanceof dragonBones.Movie) {
                                        dic[mcName][key][nm].stop();
                                        // dic[mcName][key][i].removeEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.movieHandler, this);
                                        uniLib.DisplayUtils.removeFromParent(dic[mcName][key][nm]);
                                        delete dic[mcName][key][nm];
                                    }
                                    else {
                                        this.removeDragonFromDic(dic[mcName], key);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        for (var name in dic[mcName]) {
                            if (dic[mcName][name]) {
                                if (dic[mcName][name] instanceof dragonBones.Movie) {
                                    dic[mcName][name].stop();
                                    // dic[mcName][i].removeEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.movieHandler, this);
                                    uniLib.DisplayUtils.removeFromParent(dic[mcName][name]);
                                    delete dic[mcName][name];
                                }
                                else {
                                    this.removeDragonFromDic(dic[mcName], name);
                                }
                            }
                        }
                        delete dic[mcName];
                    }
                }
            }
            else {
                for (var nm in dic) {
                    this.removeDragonFromDic(dic, nm);
                }
            }
        };
        DragonUtils.fastDragonGroup = {};
        DragonUtils.fastDragonKeyGroup = {};
        return DragonUtils;
    }());
    uniLib.DragonUtils = DragonUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var EffectUtils = /** @class */ (function () {
        function EffectUtils() {
        }
        //对象旋转特效
        //obj   旋转对象
        //time  旋转一周用时，毫秒
        EffectUtils.rotationEffect = function (obj, time) {
            if (time === void 0) { time = 1000; }
            if (this.rotationArr == null) {
                this.rotationArr = [];
            }
            if (this.rotationArr[obj.hashCode]) {
                return;
            }
            if ((this.rotationArr[obj.hashCode] == null) || !this.rotationArr[obj.hashCode]) {
                this.rotationArr[obj.hashCode] = true;
            }
            var onComplete1 = function () {
                if (this.rotationArr[obj.hashCode] && (obj != null)) {
                    obj.rotation = 0;
                    egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
                }
            };
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
        };
        //取消对象旋转
        //obj    旋转对象
        EffectUtils.removeRotationEffect = function (obj) {
            if (this.rotationArr == null) {
                this.rotationArr = [];
            }
            this.rotationArr[obj.hashCode] = false;
        };
        //对象闪烁特效
        //obj         闪烁对象
        //interval    闪烁总工时间
        EffectUtils.blinkEffect = function (obj, interval) {
            if (interval === void 0) { interval = 1000; }
            new uniLib.BitmapBlink(obj, interval);
        };
        //抖动对象特效
        //类似ios密码输入错误的特效
        EffectUtils.shakeObj = function (obj) {
            var shakeNum = 80;
            var oldX = obj.x;
            egret.Tween.get(obj).to({ x: obj.x - 10 }, shakeNum);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x - 20 }, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: oldX }, shakeNum);
            }, this, shakeNum * 5);
        };
        //抖动对象特效
        // 1：抖动  2：震动
        EffectUtils.shakeScreen = function (panel, effectType) {
            if (effectType === void 0) { effectType = 1; }
            //var panel = GameConfig.curPanel;
            var shakeNum = 40;
            var oldX = panel.x;
            var oldY = panel.y;
            if (effectType == 1) {
                egret.Tween.get(panel).to({ x: panel.x - 10 }, shakeNum);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: panel.x + 20 }, shakeNum);
                }, this, shakeNum * 2);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: panel.x - 20 }, shakeNum);
                }, this, shakeNum * 3);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: panel.x + 20 }, shakeNum);
                }, this, shakeNum * 4);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: oldX }, shakeNum);
                }, this, shakeNum * 5);
            }
            else {
                egret.Tween.get(panel).to({ x: panel.x - 10, y: panel.y }, shakeNum);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: panel.x + 20, y: panel.y }, shakeNum);
                }, this, shakeNum * 2);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: panel.x, y: panel.y + 15 }, shakeNum);
                }, this, shakeNum * 3);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: panel.x, y: panel.y - 20 }, shakeNum);
                }, this, shakeNum * 4);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: panel.x, y: panel.y + 10 }, shakeNum);
                }, this, shakeNum * 5);
                egret.setTimeout(function () {
                    egret.Tween.get(panel).to({ x: oldX, y: oldY }, shakeNum);
                }, this, shakeNum * 6);
            }
        };
        /**
        * str             提示内容
        * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
        * isWarning       是否是警告，警告是红色
        */
        EffectUtils.showTips = function (str, effectType, isWarning) {
            if (str === void 0) { str = ""; }
            if (effectType === void 0) { effectType = 1; }
            if (isWarning === void 0) { isWarning = false; }
            switch (effectType) {
                case 1: {
                    uniLib.TipsUtils.showTipsDownToUp(str, isWarning);
                    break;
                }
                case 2: {
                    uniLib.TipsUtils.showTipsLeftOrRight(str, isWarning, true);
                    break;
                }
                case 3: {
                    uniLib.TipsUtils.showTipsLeftOrRight(str, isWarning, false);
                    break;
                }
                case 4: {
                    uniLib.TipsUtils.showTipsFromCenter(str, isWarning);
                    break;
                }
                case 5: {
                    uniLib.TipsUtils.showTipsBigToSmall(str, isWarning);
                    break;
                }
                default: {
                    // TODO: Implemente default case
                }
            }
        };
        /**
        * 给显示对象增加特效
        * obj           对象
        * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
        */
        EffectUtils.playEffect = function (obj, cartoonType) {
            if (cartoonType === void 0) { cartoonType = 1; }
            if (this.isPlayEffectPlay) {
                return;
            }
            this.isPlayEffectPlay = true;
            var onComplete2 = function () {
                this.isPlayEffectPlay = false;
            };
            var onComplete1 = function () {
                if (cartoonType == 1) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
                }
                else if (cartoonType == 2) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
                }
                else if (cartoonType == 3) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100).call(onComplete2, this);
                }
            };
            egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        };
        /**
        * 给显示对象增加持续放大特效
        * obj           对象
        */
        EffectUtils.playScaleEffect = function (obj) {
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        obj.scaleX = 1;
                        obj.scaleY = 1;
                        egret.Tween.get(obj).to({ alpha: 1 }, 1000).call(onComplete1, self);
                    };
                    obj.alpha = 1;
                    egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000).call(onComplete2, self);
                }
            };
            onComplete1();
        };
        /**
        * 显示对象上线浮动特效
        * obj           对象
        * time          浮动时间 毫秒
        * space         浮动高度
        * todo          多个对象跳动
        */
        EffectUtils.flyObj = function (obj, time, space) {
            if (space === void 0) { space = 50; }
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        egret.Tween.get(obj).to({ y: obj.y - space }, time).call(onComplete1, this);
                    };
                    egret.Tween.get(obj).to({ y: obj.y + space }, time).call(onComplete2, this);
                }
            };
            onComplete1();
        };
        /**
        * 显示对象摇头特效
        * obj           对象
        * time          浮动时间 毫秒
        * space         摇头幅度
        * todo          多个对象摇头
        * 注意：需要将对象的注册点位置：0.5,1
        */
        EffectUtils.rockObj = function (obj, time, space) {
            if (space === void 0) { space = 20; }
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        egret.Tween.get(obj).to({ rotation: -space }, time).call(onComplete1, this);
                    };
                    egret.Tween.get(obj).to({ rotation: space }, time).call(onComplete2, this);
                }
            };
            onComplete1();
        };
        /**
        * 文字打字机效果
        * obj           文本对象
        * content       文字
        * interval      打字间隔 毫秒
        */
        EffectUtils.typerEffect = function (obj, content, interval) {
            if (content === void 0) { content = ""; }
            if (interval === void 0) { interval = 200; }
            var strArr = content.split("");
            var len = strArr.length;
            for (var i = 0; i < len; i++) {
                egret.setTimeout(function () {
                    obj.appendText(strArr[Number(this)]);
                }, i, interval * i);
            }
        };
        // 存储旋转对象
        EffectUtils.rotationArr = [];
        //========================== a lot of effect will coming! ============================
        EffectUtils.isPlayEffectPlay = false;
        return EffectUtils;
    }());
    uniLib.EffectUtils = EffectUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var FileUtils = /** @class */ (function () {
        function FileUtils() {
        }
        FileUtils.dataURLtoBlob = function (dataurl) {
            var arr = dataurl.split(',');
            var mime = arr[0].match(/:(.*?);/)[1];
            var bstr;
            if (window["atob"]) {
                bstr = atob(arr[1]);
            }
            else {
                bstr = uniLib.CompressUtil.base64decode(arr[1]);
            }
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        };
        /**
         * 通过本地图片url上传图片
         * @param fileUrl
         * @param callBack
         * @param thisObj
         */
        FileUtils.upLoadFileByUrl = function (fileUrl, callBack, thisObj) {
            //var typeStr: string = fileUrl.indexOf(".png") >= 0 ? "image/png" : "image/jpg";
            var file = { uri: fileUrl, type: "image/png", name: 'upload.png' };
            this.upLoadFile(file, callBack, thisObj);
        };
        /**
         * 以文件格式上传base64格式的图片
         * @param dataurl base64图片
         * @param callBack
         * @param thisObj
         * @param filename
         */
        FileUtils.upLoadBase64File = function (dataurl, callBack, thisObj, filename) {
            var file = FileUtils.dataURLtoBlob(dataurl);
            this.upLoadFile(file, callBack, thisObj);
        };
        /**
         * 上传base64格式的图片
         * @param dataurl base64图片
         * @param callBack
         * @param thisObj
         * @param filename
         */
        FileUtils.upLoadBase64 = function (dataurl, callBack, thisObj, filename) {
            var request = new uniLib.HttpRequest(callBack, callBack, thisObj);
            request.open(this.base64FileUploadUrl, null, true);
            request.send(dataurl);
        };
        /**
         * 上传File
         * @param file
         * @param callBack
         * @param thisObj
         */
        FileUtils.upLoadFile = function (file, callBack, thisObj) {
            var data = new FormData();
            if (file) {
                switch (file.type) {
                    case "image/png":
                        data.append("img", file, "image.png");
                        break;
                    case "image/jpg":
                        data.append("img", file, "image.jpg");
                        break;
                    case "audio/amr":
                        data.append("amr", file, "sound.amr");
                        break;
                }
                var request = new uniLib.HttpRequest(callBack, callBack, thisObj);
                request.open(this.fileUploadUrl, null, true);
                request.send(data);
            }
        };
        FileUtils.fileUploadUrl = "http://image.mj.ucjoy.com:8888/form/upload";
        FileUtils.base64FileUploadUrl = "http://image.mj.ucjoy.com:8888/upload";
        return FileUtils;
    }());
    uniLib.FileUtils = FileUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var GameModuleUtils = /** @class */ (function () {
        function GameModuleUtils() {
        }
        /**
         * 检查是否加载了定义
         * @url     通过url是否加载判断
         * @docCls 检查文档类是否存在直接判断
         */
        GameModuleUtils.checkJsIsExist = function (url, docCls) {
            if (uniLib.Global.isH5 == true) {
                if (docCls && docCls != null) {
                    if (uniLib.hasDefinition(docCls)) {
                        return true;
                    }
                }
                else {
                    document.body.setAttribute("style", "");
                    var scripts = document.getElementsByTagName("script");
                    //遍历查询页面中已存在有想要加载的js文件
                    for (var i = 0; i < scripts.length; i++) {
                        if (scripts[i].src.indexOf(url) > -1) {
                            return true;
                        }
                    }
                }
            }
            else {
                // return uniLib.hasDefinition(docCls);//这里先不处理,游戏定义没有清理干净导致第二次加载问题。
            }
            return false;
        };
        GameModuleUtils.isLobbyMode = function () {
            return egret.getQualifiedClassName(uniLib.SceneMgr.instance.currentScene) == "LobbyScene" ? true : false;
        };
        // private static gameCanDestroyGrpsDic:any={};
        GameModuleUtils.LoadGame = function (url, docClassStr, params, loadingGameUI, callBack, obj, autoHideLoadUI) {
            if (autoHideLoadUI === void 0) { autoHideLoadUI = true; }
            if (uniLib.ResLoadMgr.instance.curLoadingGrp != "") {
                uniLib.Console.warn("资源组 [" + uniLib.ResLoadMgr.instance.curLoadingGrp + "] 正在加载,请等待后台加载完成");
                return false;
            }
            // if (params.isLandscape == null || params.isLandscape == undefined) {
            //     params.isLandscape = true;
            // }
            // if (params.isLandscape) {
            // if (params.isLandscape != GameModuleUtils.defaultLandscape) {
            //     if (Global.isH5 == true) {
            //         Global.screenWidth = egret.MainContext.instance.stage.stageHeight;
            //         Global.screenHeight = egret.MainContext.instance.stage.stageWidth;
            //     }
            // }
            // }
            // if (uniLib.ScreenUtils.landscape) {
            // this.defaultDirect = uniLib.ScreenUtils.landscape;
            // }
            // //加载游戏支持远程方式
            // if (this.gameLoadRemote == true) {
            //     if (params.gameCodeUrl.indexOf(this.gameRemoteUrl[0]) == -1) {
            //         url = this.gameRemoteUrl[0] + url;
            //         params.gameCodeUrl = this.gameRemoteUrl[0] + params.gameCodeUrl;
            //         params.gameResRoot = this.gameRemoteUrl[0] + params.gameResRoot;
            //         params.gameResConfigUrl = this.gameRemoteUrl[0] + params.gameResConfigUrl;
            //         if (params.gameTheme)
            //             params.gameTheme = this.gameRemoteUrl[0] + params.gameTheme;
            //     }
            // }
            this.lastGameInfo = params;
            this.lastGameInfo.candestroyGrps = [];
            for (var str in RES["configInstance"]["groupDic"]) {
                this.lastGameInfo.candestroyGrps.push(str);
            }
            if (RES.hasOwnProperty("getVersionController")) {
                url = RES.getVersionController().getVirtualUrl(url);
            }
            var loaded = function (id) {
                // let param = params;
                if (GameModuleUtils.gameRemotePaths && GameModuleUtils.gameRemotePaths.length > 0) {
                    //这里如果目录最后不带/，则补上一个/
                    params.gameResConfigUrl = uniLib.Global.CdnDomains[0] + GameModuleUtils.gameRemotePaths[0] + params.gameResConfigUrl;
                    params.gameResRoot = uniLib.Global.CdnDomains[0] + GameModuleUtils.gameRemotePaths[0] + params.gameResRoot;
                    if (params.gameTheme)
                        params.gameTheme = uniLib.Global.CdnDomains[0] + GameModuleUtils.gameRemotePaths[0] + params.gameTheme;
                }
                if (loadingGameUI) {
                    params.preloadUI = loadingGameUI;
                }
                params.preloadUIAutoHide = autoHideLoadUI;
                var gameMain = GameModuleUtils.getGameStage(docClassStr, params);
                if (gameMain) {
                    console.debug("gamemain:" + gameMain.hashCode);
                    if (uniLib.Global.initOpt && uniLib.Global.initOpt.lobbyResConfigUrl) {
                        GameModuleUtils.lobbyResGrps = [];
                        // var resConfig: RES.ResourceConfig = RES["configInstance"];
                        var grps = uniLib.ResUtils.getGroupDic();
                        for (var str in grps) {
                            if (uniLib.Global.initOpt.lobbyCommonResGrps && uniLib.Global.initOpt.lobbyCommonResGrps.indexOf(str) == -1) {
                                RES.destroyRes(str);
                                GameModuleUtils.lobbyResGrps.push(str);
                                // resConfig["groupDic"][str] = null;
                                // delete resConfig["groupDic"][str];
                            }
                        }
                        // ResUtils.clearResConfigByGroupName(resConfig["groupDic"]);
                        // self.clearResConfigByGroupName(canDestroyGrps);
                    }
                    uniLib.UIMgr.instance.clearOldSceneUis();
                    if (loadingGameUI) {
                        gameMain.preLoadCallBack = function () {
                            if (autoHideLoadUI == true) {
                                uniLib.UIMgr.instance.hideLoading(loadingGameUI);
                            }
                            //(<LobbyScene>SceneMgr.instance.currentScene).uiLayer.visible = false;
                        };
                    }
                    if (callBack) {
                        callBack.call(obj, gameMain);
                    }
                    else {
                        // SoundMgr.instance.stopBgMusic();
                    }
                    //else {
                    //    egret.MainContext.instance.stage.addChild(gameMain);
                    //}
                    if (uniLib.Global.isInGame == false) {
                        uniLib.Global.isInGame = true;
                        uniLib.SceneMgr.instance.currentScene.addGame(gameMain);
                        try {
                            var game = {};
                            game.gameId = params.gameId;
                            game.time = new Date().getTime();
                            uniLib.Utils.setLocalStorage(CommonConsts.LOBBY_LASTGAME, JSON.stringify(game));
                        }
                        catch (e) {
                            uniLib.Console.error("设置游戏GameId失败");
                        }
                    }
                    return true;
                }
                else {
                    if (uniLib.Global.isH5 == false) {
                        if (egret.hasDefinition("egret_native") && egret_native.isFileExists(url)) {
                            egret_native.deleteUpdateFile(url);
                        }
                    }
                    console.error("找不到游戏主类:" + docClassStr);
                    uniLib.UIMgr.instance.hideLoading();
                    return false;
                }
            };
            if (loadingGameUI) {
                if (autoHideLoadUI == true) {
                    uniLib.UIMgr.instance.showProcessBar(loadingGameUI, 2, 100, "正在加载游戏...", "", false);
                }
                else {
                    uniLib.UIMgr.instance.showLoadingParam(loadingGameUI, params.gameId, egret.MainContext.instance.stage);
                }
            }
            if (this.lbscene == null) {
                if (uniLib.SceneMgr.instance.currentScene)
                    this.lbscene = egret.getQualifiedClassName(uniLib.SceneMgr.instance.currentScene);
                else if (params.defaultScene) {
                    this.lbscene = params.defaultScene;
                }
            }
            if (this.checkJsIsExist(url, uniLib.Global.isWxGame() ? docClassStr : null)) {
                // if (this.checkJsIsExist(url)) {
                return loaded();
            }
            else {
                if (loadingGameUI) {
                    uniLib.UIMgr.instance.showLoadingTimeout(loadingGameUI, "", 0);
                }
                this.LoadGameJs(url, function () {
                    return loaded();
                });
            }
            // GameModuleUtils.loadGameTimeOut = egret.setTimeout(function (arg) {
            //     console.error("加载游戏超时关闭loading");
            //     // uniLib.GameModuleUtils.ExitGame();
            //     uniLib.UIMgr.instance.hideLoading();
            //     if (uniLib.Global.isH5 == false) {
            //         if (egret_native.isFileExists(url)) {
            //             egret_native.deleteUpdateFile(url);
            //         }
            //     }
            // }, this, 10000);
        };
        GameModuleUtils.enterGame = function (params, loadingGameUI, callBack, obj, autoHideLoadUI) {
            if (autoHideLoadUI === void 0) { autoHideLoadUI = true; }
            return this.LoadGame(params.gameCodeUrl, params.gameDoc, params, loadingGameUI, callBack, obj, autoHideLoadUI);
        };
        //加载dic
        // public static gameModleLoadedDic: any;
        /**
         * 游戏资源是否已经下载
         * @url 游戏代码路径
         */
        GameModuleUtils.gameDownloaded = function (url) {
            try {
                if (uniLib.Global.isH5 == true) {
                    // if (this.gameModleLoadedDic == null) {
                    //     this.gameModleLoadedDic = {};
                    // }
                    // if (this.gameModleLoadedDic[url] == true) {
                    return true;
                    // }
                }
                else {
                    if (RES.hasOwnProperty("getVersionController")) {
                        url = RES.getVersionController().getVirtualUrl(url);
                    }
                    // var fileUrl: string = url;
                    var localUrl = this.gameNativeFolder + url;
                    // console.error("fileloaded:" + GameModuleUtils.gameModleLoadedDic[fileUrl]);
                    // console.error("fileExist:" + egret_native.isFileExists(fileUrl));
                    if (egret.hasDefinition("egret_native") && egret_native.isFileExists(localUrl)) {
                        return true;
                    }
                }
            }
            catch (e) {
                return false;
            }
            return false;
        };
        // public static initGameLoadedDic(): void {
        //     if (GameModuleUtils.gameModleLoadedDic == null) {
        //         var str = Utils.getLocalStorage("gamemodule_loaded_dic");
        //         if (str && str != "") {
        //             GameModuleUtils.gameModleLoadedDic = JSON.parse(str);
        //             // console.error("###2" + GameModuleUtils.gameModleLoadedDic);
        //         } else {
        //             GameModuleUtils.gameModleLoadedDic = {};
        //             // console.error("###3s" + GameModuleUtils.gameModleLoadedDic);
        //         }
        //     }
        // }
        /**
         * 下载游戏资源
         * @param 游戏参数
         * @loadingGameUI loadingGameUI
         * @loaded 加载回调 返回成功或者失败 true false
         * @obj this引用
         */
        GameModuleUtils.downloadGame = function (params, loaded, progress, loadErr, obj) {
            var codeLoaded = function (id) {
                var gameCfgUrl;
                var gameFolderUrl;
                if (GameModuleUtils.gameRemotePaths && GameModuleUtils.gameRemotePaths.length > 0) {
                    //这里如果目录最后不带/，则补上一个/
                    gameCfgUrl = uniLib.Global.CdnDomains[0] + GameModuleUtils.gameRemotePaths[0] + params.gameResConfigUrl;
                    gameFolderUrl = uniLib.Global.CdnDomains[0] + GameModuleUtils.gameRemotePaths[0] + params.gameResRoot;
                }
                else {
                    gameCfgUrl = params.gameResConfigUrl;
                    gameFolderUrl = params.gameResRoot;
                }
                uniLib.ResUtils.loadGameGroupReses(gameCfgUrl, function (e) {
                    uniLib.ResUtils.removeGroup(params.gameResConfigUrl);
                    if (e) {
                        var canDestroyGrps = e.data;
                        if (canDestroyGrps && canDestroyGrps.length > 0) {
                            for (var i = 0; i < canDestroyGrps.length; i++) {
                                var group = uniLib.ResUtils.getGroupDic(canDestroyGrps[i]);
                                if (group) {
                                    RES.destroyRes(canDestroyGrps[i]);
                                    // resConfig["groupDic"][canDestroyGrps[i]] = null;
                                    // delete resConfig["groupDic"][canDestroyGrps[i]];
                                }
                            }
                            uniLib.ResUtils.clearResConfigByGroupName(canDestroyGrps);
                        }
                    }
                    // GameModuleUtils.initGameLoadedDic();
                    var url = params.gameCodeUrl;
                    if (RES.hasOwnProperty("getVersionController")) {
                        url = RES.getVersionController().getVirtualUrl(url);
                    }
                    // GameModuleUtils.gameModleLoadedDic[url] = true;
                    // Utils.setLocalStorage("gamemodule_loaded_dic", JSON.stringify(GameModuleUtils.gameModleLoadedDic));
                    // console.error(Utils.getLocalStorage("gamemodule_loaded_dic"));
                    if (loaded) {
                        if (obj) {
                            loaded.call(obj, e);
                        }
                        else {
                            loaded(e);
                        }
                    }
                }, progress, function (e) {
                    if (uniLib.Global.isH5 == false) {
                        var localUrl = GameModuleUtils.gameNativeFolder + url;
                        if (egret.hasDefinition("egret_native"))
                            egret_native.deleteUpdateFile(localUrl);
                    }
                    if (loadErr) {
                        if (obj) {
                            loadErr.call(obj, e);
                        }
                        else {
                            loadErr(e);
                        }
                    }
                }, obj, gameFolderUrl);
            };
            // if (uniLib.ScreenUtils.landscape) {
            //     this.defaultDirect = uniLib.ScreenUtils.landscape;
            // }
            var url = params.gameCodeUrl;
            if (RES.hasOwnProperty("getVersionController")) {
                url = RES.getVersionController().getVirtualUrl(url);
            }
            if (this.checkJsIsExist(url)) {
                codeLoaded();
            }
            else {
                this.LoadGameJs(url, codeLoaded, loadErr, this);
            }
        };
        GameModuleUtils.LoadLobby = function (url, docClassStr, params, loadingGameUI, callBack, obj) {
            if (url == null) {
                url = "resource/main.min.js";
            }
            if (RES.hasOwnProperty("getVersionController")) {
                url = RES.getVersionController().getVirtualUrl(url);
            }
            if (docClassStr == null) {
                docClassStr = "AppMain";
            }
            var loaded = function (id) {
                var LbCls = uniLib.getDefinitionByName(docClassStr);
                if (LbCls) {
                    uniLib.SceneMgr.instance.changeScene(LbCls, params);
                }
            };
            if (this.checkJsIsExist(url)) {
                loaded();
            }
            else {
                if (loadingGameUI) {
                    uniLib.UIMgr.instance.showLoadingTimeout(loadingGameUI, "", 0);
                }
                this.LoadGameJs(url, loaded);
            }
        };
        GameModuleUtils.ExitGame = function (stopmusic) {
            var _this = this;
            if (stopmusic === void 0) { stopmusic = true; }
            if (uniLib.Global.lobbyMode == true) {
                uniLib.Global.gameId = uniLib.Global.lobbyGameId;
                uniLib.Global.isInGame = false;
                uniLib.NetMgr.http = null;
                uniLib.NetMgr.closeSocket();
                //uniLib.NetMgr.logout();
                if (stopmusic) {
                    uniLib.SoundMgr.instance.stopSounds();
                    uniLib.SoundMgr.instance.stopBgMusic();
                }
                if (this.defaultLandscape != uniLib.ScreenUtils.landscape) {
                    //if (this.defaultDirect == egret.OrientationMode.LANDSCAPE || this.defaultDirect == egret.OrientationMode.LANDSCAPE_FLIPPED) {
                    //    ScreenUtils.landscape = true;
                    //} else {
                    //    ScreenUtils.landscape = false;
                    //}
                    uniLib.ScreenUtils.landscape = !uniLib.ScreenUtils.landscape;
                }
                var onExit = function () {
                    if (uniLib.Global.isWxGame() == false) {
                        _this.removeGameJs();
                    }
                    if (egret.Capabilities.engineVersion >= "5.0") {
                        if (dragonBones) {
                            dragonBones.removeAllMovieGroup();
                            dragonBones.EgretFactory.factory.clear();
                        }
                    }
                    //重新加载需要重载的定义
                    try {
                        if (uniLib.Global.reloadDefine && uniLib.Global.reloadDefine.length > 0) {
                            uniLib.BrowersUtils.LoadJses(uniLib.Global.reloadDefine);
                        }
                    }
                    catch (e) {
                        console.log("重加载公共资源失败！");
                    }
                    if (uniLib.SceneMgr.instance.currentScene["removeGame"]) {
                        uniLib.SceneMgr.instance.currentScene.removeGame();
                        uniLib.SceneMgr.instance.currentScene.uiLayer.visible = true;
                    }
                    else {
                        var sc = uniLib.getDefinitionByName(_this.lbscene);
                        uniLib.SceneMgr.instance.changeScene(sc);
                    }
                    uniLib.delDefinitionByName("Cmd");
                    if (GameModuleUtils.lastGameInfo && GameModuleUtils.lastGameInfo.defaultScene && GameModuleUtils.lastGameInfo.defaultScene != "") {
                        var arr = GameModuleUtils.lastGameInfo.defaultScene.split(".");
                        var gameDefine = void 0;
                        if (arr.length > 0)
                            gameDefine = arr[0];
                        if (gameDefine)
                            uniLib.delDefinitionByName(gameDefine);
                    }
                    uniLib.UIMgr.instance.clearOldSceneUis();
                    uniLib.Utils.setLocalStorage(CommonConsts.LOBBY_LASTGAME, null);
                    uniLib.Global.dispatchEvent(uniLib.ZqEvent.UPDATE_USER_INFO);
                    uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHECK_VERSION_UPDATE);
                    uniLib.DebugView.Instance.show();
                };
                if (this.lastGameInfo && RES["configInstance"]["groupDic"]) {
                    var candestoryse = [];
                    for (var str in RES["configInstance"]["groupDic"]) {
                        if (this.lastGameInfo.candestroyGrps.indexOf(str) == -1) {
                            candestoryse.push(str);
                        }
                    }
                }
                if (GameModuleUtils.lobbyResGrps && GameModuleUtils.lobbyResGrps.length > 0) {
                    uniLib.UIMgr.instance.showProcessBar(null);
                    uniLib.ResLoadMgr.instance.loadGrps(GameModuleUtils.lobbyResGrps, onExit, null, this, null, false);
                    if (candestoryse && candestoryse.length > 0) {
                        for (var i = 0; i < candestoryse.length; i++) {
                            RES.destroyRes(candestoryse[i]);
                            // var resConfig: RES.ResourceConfig = RES["configInstance"];
                            uniLib.ResUtils.removeGroup(candestoryse[i]);
                        }
                        uniLib.ResUtils.clearResConfigByGroupName(candestoryse);
                    }
                }
                else {
                    onExit();
                }
            }
        };
        GameModuleUtils.reloadGame = function (url, docClassStr, params, loadingGameUI, callBack, obj) {
            if (uniLib.Global.lobbyMode == true) {
                uniLib.Global.gameId = uniLib.Global.lobbyGameId;
                uniLib.Global.isInGame = false;
                uniLib.NetMgr.http = null;
                uniLib.NetMgr.closeSocket();
                if (this.defaultLandscape != uniLib.ScreenUtils.landscape) {
                    //if (this.defaultDirect == egret.OrientationMode.LANDSCAPE || this.defaultDirect == egret.OrientationMode.LANDSCAPE_FLIPPED) {
                    //    ScreenUtils.landscape = true;
                    //} else {
                    //    ScreenUtils.landscape = false;
                    //}
                    uniLib.ScreenUtils.landscape = !uniLib.ScreenUtils.landscape;
                }
                //this.lbscene = egret.getQualifiedClassName(SceneMgr.instance.currentScene);
                //uniLib.NetMgr.logout();
                uniLib.SoundMgr.instance.stopSounds();
                uniLib.SoundMgr.instance.stopBgMusic();
                if (uniLib.SceneMgr.instance.currentScene["removeGame"]) {
                    uniLib.SceneMgr.instance.currentScene.removeGame();
                    uniLib.SceneMgr.instance.currentScene.uiLayer.visible = true;
                }
                else {
                    //var sc = new uniLib.GameScene()
                    uniLib.SceneMgr.instance.changeScene(uniLib.LobbyScene);
                }
                uniLib.delDefinitionByName("Cmd");
                this.removeGameJs();
                uniLib.UIMgr.instance.clearOldSceneUis();
                uniLib.Utils.setLocalStorage(CommonConsts.LOBBY_LASTGAME, null);
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.UPDATE_USER_INFO);
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.CHECK_VERSION_UPDATE);
                this.LoadGame(url, docClassStr, params, loadingGameUI, callBack, obj);
            }
        };
        Object.defineProperty(GameModuleUtils, "lastGame", {
            get: function () {
                var gameId;
                //var game: any = JSON.parse(Utils.getLocalStorage(CommonConsts.LOBBY_LASTGAME));
                //if (game == null || game == undefined) {
                gameId = 0;
                //} else if (game.time) {
                //    var now: number = new Date().getTime();
                //    if (now - Number(game.time) >= 60000) {
                //        gameId = 0;
                //    } else {
                //        gameId = game.gameId;
                //    }
                //} else {
                //    gameId = 0;
                //    Utils.setLocalStorage(CommonConsts.LOBBY_LASTGAME, null)
                //}
                return gameId;
            },
            enumerable: true,
            configurable: true
        });
        GameModuleUtils.LoadGameJs = function (url, loaded, loadErr, obj) {
            //if (!this.checkJsIsExist(url)) {
            uniLib.BrowersUtils.LoadJS("lobbygame", url, loaded, loadErr, obj);
            //}
        };
        GameModuleUtils.getGameStage = function (docClassStr, params) {
            var clazz = uniLib.getDefinitionByName(docClassStr);
            if (clazz) {
                return new clazz(params);
            }
        };
        GameModuleUtils.removeGameJs = function () {
            if (uniLib.Global.isH5 == true) {
                if (document && document.hasOwnProperty("getElementById")) {
                    var scriptTag = document.getElementById("lobbygame");
                    if (document.hasOwnProperty("getElementsByTagName")) {
                        var oHead = document.getElementsByTagName('HEAD').item(0);
                        if (scriptTag)
                            oHead.removeChild(scriptTag);
                    }
                }
            }
        };
        GameModuleUtils.egretLoaded = function () {
            var script = document.getElementById("loading");
            document.body.removeChild(script);
        };
        /**
         * 默认本地文件夹路径
         */
        GameModuleUtils.gameNativeFolder = "";
        /**
         * 启用远程加载
         */
        GameModuleUtils.gameLoadRemote = false;
        return GameModuleUtils;
    }());
    uniLib.GameModuleUtils = GameModuleUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var H5Upload = /** @class */ (function () {
        function H5Upload() {
        }
        H5Upload.selectImage = function (selectedFunc, thisValue) {
            if (uniLib.BrowersUtils.isWechat()) {
                this.selectImageWX(selectedFunc, thisValue);
            }
            else {
                this.selectedHandler = selectedFunc;
                this.thisRef = thisValue;
                var fileInput = document.getElementById("fileInput");
                if (fileInput == null) {
                    fileInput = document.createElement("input");
                    fileInput.id = "fileInput";
                    fileInput.type = "file";
                    fileInput.accept = "image/*";
                    fileInput.style.height = "0px";
                    fileInput.style.display = "block";
                    fileInput.style.overflow = "hidden";
                    document.body.insertBefore(fileInput, document.body.firstChild);
                    fileInput.addEventListener('change', this.tmpSelectFile, false);
                }
                setTimeout(function () { fileInput.click(); }, 100);
            }
        };
        H5Upload.selectImageWX = function (selectedFunc, thisValue) {
            this.selectedHandler = selectedFunc;
            this.thisRef = thisValue;
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    //alert(localIds[0]);
                    this.tmpCreateImage(localIds[0]);
                }
            });
        };
        H5Upload.tmpSelectFile = function (evt) {
            //console.log("image selected...");
            var file = evt.target.files[0];
            var type = file.type;
            if (!type) {
                type = H5Upload.mime[file.name.match(/\.([^\.]+)$/i)[1]];
            }
            var ret = H5Upload.myCreateObjectURL(file);
            if (H5Upload.tmpCreateImage) {
                H5Upload.tmpCreateImage(ret, file);
            }
            var fileInput = document.getElementById("fileInput");
            fileInput.value = "";
        };
        H5Upload.tmpCreateImage = function (uri, file) {
            var self = this;
            var image = new Image();
            image.onload = function () {
                var canvas = document.createElement("canvas");
                if (!uniLib.BrowersUtils.isWechat() && image.height > self.MAX_HEIGHT) {
                    //宽度等比例缩放
                    image.width *= self.MAX_HEIGHT / image.height;
                    image.height = self.MAX_HEIGHT;
                    var ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    var smallURL = canvas.toDataURL("image/png");
                }
                else {
                    smallURL = uri;
                }
                image.width = image.height = 1;
                if (self.selectedHandler) {
                    var msg = new uniLib.ZQGameObj();
                    msg.cmd = uniLib.ZQGameSdk.PICKPHOTO;
                    msg.code = 0;
                    msg.data = {};
                    msg.data.imgBase64 = smallURL;
                    msg.data.imgLen = smallURL.length;
                    msg.data.file = file;
                    self.selectedHandler.call(self.thisRef, msg);
                    // self.selectedHandler(self.thisRef, smallURL, file);
                }
            };
            image.src = uri;
            image.style.visibility = "hidden";
            document.body.appendChild(image);
        };
        H5Upload.myCreateObjectURL = function (blob) {
            if (window.URL != undefined)
                return window['URL']['createObjectURL'](blob);
            else
                return window['webkitURL']['createObjectURL'](blob);
        };
        H5Upload.myResolveObjectURL = function (blob) {
            if (window.URL != undefined)
                window['URL']['revokeObjectURL'](blob);
            else
                window['webkitURL']['revokeObjectURL'](blob);
        };
        H5Upload.getImageData = function (file, bytesFunc, thisValue) {
            this.bytesHandler = bytesFunc;
            this.thisRef = thisValue;
            try {
                var reader = new FileReader();
            }
            catch (err) {
                console.log("no support FileReader");
            }
            function tmpLoad() {
                this.bytesHandler && this.bytesHandler(this.thisRef, this.result);
            }
            reader.onload = tmpLoad;
            reader.readAsArrayBuffer(file);
        };
        H5Upload.mime = { 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp' };
        H5Upload.MAX_HEIGHT = 300;
        return H5Upload;
    }());
    uniLib.H5Upload = H5Upload;
})(uniLib || (uniLib = {}));

//interface SignPackage {
//    appId: string;
//    nonceStr: string;
//    timestamp: number;
//    signature: string;
//    url: string;
//}
//class JSSDK extends BaseScreen {
//    public CLASS_NAME: string = "JSSDK";
//    private btn_sharetimeline: egret.gui.Button;//分享朋友圈按钮
//    private btn_shareappmessage: egret.gui.Button;//分享朋友按钮
//    private btn_shareqq: egret.gui.Button;//分享QQ按钮
//    private btn_shareweibo: egret.gui.Button;//分享微博按钮
//    private btn_showMenuItems: egret.gui.Button;//批量显示菜单项
//    private btn_hideMenuItems: egret.gui.Button;//批量隐藏菜单项
//    private title: egret.gui.TextArea;
//    private desc: egret.gui.TextArea;
//    private link: egret.gui.TextArea;
//    private imgUrl: egret.gui.TextArea;
//    private signPackage: SignPackage;
//    private url: string;
//    /**
//     * 初始化
//     **/
//    public init() {
//        //定义皮肤
//        this.skinName = "skins.jssdk.ShareSkin";
//        //初始化分享内容
//        this.title.text = this.title.text ? this.title.text : "【分享】警惕这些身体求救信号";
//        this.desc.text = this.desc.text ? this.desc.text : "困了就要睡觉，渴了就要喝水，累了就要休息，烦了就要发泄……这些我们都明白，其实有时候身体就会向你发出这样一些健康信号，可惜的是，很多人往往不在意！";
//        this.link.text = this.link.text ? this.link.text : "http://mp.weixin.qq.com/s?biz=MjM5MTIxMzYxMQ==&mid=207223086&idx=1&sn=08bf703c6750bfc88de4317ee1d2d9e6#rd";
//        this.imgUrl.text = this.imgUrl.text ? this.imgUrl.text : "http://mmbiz.qpic.cn/mmbiz/OvWLC4Ooz2bM8cePicfRaRk0ibWvMH7zvr2ARsDF36D9Q3U2kJuiaAR1FusBKiaCJ7h598NjaNYRuicicQTBpr3dFcbg/640?tp=webp";
//        //你的后端数据JSON入口
//        //this.url = "你的后端数据入口，自行配置JSON串，后端语言不限，可以参照PHP/NET程序";
//        this.url = "http://weixin.shinycg.com/php/json.php?url=" + location.href.split("#")[0];
//        //获取签名
//        this.getSignPackage();
//        //this.signPackage = { "appId": "wx75a6aa0068171c6c", "nonceStr": "VQ7xp2uK6dMYgLjD", "timestamp": 1440656891, "url": "http:\/\/weixin.shinycg.com\/php\/json.php", "signature": "6a91a36d82659a1ac29f15de3050cee807d376f5", "rawString": "jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VCOo73m9m1qgU3HEUBkHVm3dv2BrnAwQQs0robQJl6zUvvwHeqBiIcraB-QpxbOLsQ&noncestr=VQ7xp2uK6dMYgLjD×tamp=1440656891&url=http:\/\/weixin.shinycg.com\/php\/json.php" }
//        ////基本配置
//        //this.getWeiXinConfig();
//        ////下面可以加更多接口,可自行扩展
//        //this.getWeiXinShareTimeline();//分享朋友圈
//        //this.getWeiXinShareAppMessage();//分享朋友
//        //this.getWeiXinShareQQ();//分享QQ
//        //this.getWeiXinShareWeiBo();//分享到腾讯微博
//        //this.getWeixinShowMenuItems(["menuItem:share:timeline"]);//显示菜单项
//        //this.getWeixinHideMenuItems();//隐藏菜单项
//            //........................................................
//    }
//    /**
//     * 获取签名分享
//     */
//    private getSignPackage() {
//        var urlloader = new egret.URLLoader();
//        var req = new egret.URLRequest(this.url);
//        urlloader.load(req);
//        req.method = egret.URLRequestMethod.GET;
//        urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
//            this.signPackage = <SignPackage>JSON.parse(e.target.data);
//            //........................................................
//            //基本配置
//            this.getWeiXinConfig();
//            //下面可以加更多接口,可自行扩展
//            this.getWeiXinShareTimeline();//分享朋友圈
//            this.getWeiXinShareAppMessage();//分享朋友
//            this.getWeiXinShareQQ();//分享QQ
//            this.getWeiXinShareWeiBo();//分享到腾讯微博
//            this.getWeixinShowMenuItems(["menuItem:share:timeline"]);//显示菜单项
//            this.getWeixinHideMenuItems();//隐藏菜单项
//            //........................................................
//        }, this);
//    }
//    /**
//     * 获取微信配置
//     */
//    private getWeiXinConfig() {
//        /*
//         * 注意：
//         * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
//         * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
//         * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
//         *
//         * 如有问题请通过以下渠道反馈：
//         * 邮箱地址：weixin-open@qq.com
//         * 邮件主题：【微信JS-SDK反馈】具体问题
//         * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
//         */
//        //配置参数
//        var bodyConfig = new BodyConfig();
//        bodyConfig.debug = true;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//        bodyConfig.appId = this.signPackage.appId;// 必填，公众号的唯一标识
//        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
//        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
//        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1
//        bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//        // 所有要调用的 API 都要加到这个列表中
//            'checkJsApi',//判断当前客户端是否支持指定JS接口
//            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
//            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
//            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
//            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
//            'hideMenuItems',//批量隐藏功能按钮接口
//            'showMenuItems',//批量显示功能按钮接口
//            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
//            'showAllNonBaseMenuItem',//显示所有功能按钮接口
//            'translateVoice',//识别音频并返回识别结果接口
//            'startRecord',//开始录音接口
//            'stopRecord',//停止录音接口
//            'playVoice',//播放语音接口
//            'pauseVoice',//暂停播放接口
//            'stopVoice',//停止播放接口
//            'uploadVoice',//上传语音接口
//            'downloadVoice',//下载语音接口
//            'chooseImage',//拍照或从手机相册中选图接口
//            'previewImage',//预览图片接口
//            'uploadImage',//上传图片接口
//            'downloadImage',//下载图片接口
//            'getNetworkType',//获取网络状态接口
//            'openLocation',//使用微信内置地图查看位置接口
//            'getLocation',//获取地理位置接口
//            'hideOptionMenu',//隐藏右上角菜单接口
//            'showOptionMenu',//显示右上角菜单接口
//            'closeWindow',//关闭当前网页窗口接口
//            'scanQRCode',//调起微信扫一扫接口
//            'chooseWXPay',//发起一个微信支付请求
//            'openProductSpecificView',//跳转微信商品页接口
//            'addCard',//批量添加卡券接口
//            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
//            'openCard'//查看微信卡包中的卡券接口
//        ];
//        wx.config(bodyConfig);
//    }
//    /**
//     * 获取微信分享到朋友圈
//     */
//    private getWeiXinShareTimeline() {
//        this.btn_sharetimeline.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => {
//            var bodyMenuShareTimeline = new BodyMenuShareTimeline();
//            bodyMenuShareTimeline.title = this.title.text;
//            bodyMenuShareTimeline.link = this.link.text;
//            bodyMenuShareTimeline.imgUrl = this.imgUrl.text;
//            bodyMenuShareTimeline.trigger = () => {
//                alert('用户点击分享到朋友圈');
//            };
//            bodyMenuShareTimeline.success = () => {
//                alert('已分享');
//            };
//            bodyMenuShareTimeline.cancel = () => {
//                alert('已取消');
//            };
//            bodyMenuShareTimeline.fail = (res) => {
//                alert(JSON.stringify(res));
//            };
//            wx.onMenuShareTimeline(bodyMenuShareTimeline);
//            alert('已注册获取“分享到朋友圈”状态事件');
//        }, this);
//    }
//    /**
//     * 获取微信分享到朋友
//     */
//    private getWeiXinShareAppMessage() {
//        this.btn_shareappmessage.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => {
//            var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
//            bodyMenuShareAppMessage.title = this.title.text;
//            bodyMenuShareAppMessage.desc = this.desc.text;
//            bodyMenuShareAppMessage.link = this.link.text;
//            bodyMenuShareAppMessage.imgUrl = this.imgUrl.text;
//            bodyMenuShareAppMessage.trigger = () => {
//                alert('用户点击发送给朋友');
//            };
//            bodyMenuShareAppMessage.success = () => {
//                alert('已分享');
//            };
//            bodyMenuShareAppMessage.cancel = () => {
//                alert('已取消');
//            };
//            bodyMenuShareAppMessage.fail = (res) => {
//                alert(JSON.stringify(res));
//            };
//            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
//            alert('已注册获取“发送给朋友”状态事件');
//        }, this);
//    }
//    /**
//     * 获取微信分享到QQ
//     */
//    private getWeiXinShareQQ() {
//        this.btn_shareqq.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => {
//            var bodyMenuShareQQ = new BodyMenuShareQQ();
//            bodyMenuShareQQ.title = this.title.text;
//            bodyMenuShareQQ.desc = this.desc.text;
//            bodyMenuShareQQ.link = this.link.text;
//            bodyMenuShareQQ.imgUrl = this.imgUrl.text;
//            bodyMenuShareQQ.trigger = () => {
//                alert('用户点击分享到QQ');
//            };
//            bodyMenuShareQQ.complete = (res) => {
//                alert(JSON.stringify(res));
//            };
//            bodyMenuShareQQ.success = () => {
//                alert('已分享');
//            };
//            bodyMenuShareQQ.cancel = () => {
//                alert('已取消');
//            };
//            bodyMenuShareQQ.fail = (res) => {
//                alert(JSON.stringify(res));
//            };
//            wx.onMenuShareQQ(bodyMenuShareQQ);
//            alert('已注册获取“分享到QQ”状态事件');
//        }, this);
//    }
//    /**
//     * 获取微信分享到腾讯微博
//     */
//    private getWeiXinShareWeiBo() {
//        this.btn_shareweibo.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => {
//            var bodyMenuShareWeibo = new BodyMenuShareWeibo();
//            bodyMenuShareWeibo.title = this.title.text;
//            bodyMenuShareWeibo.desc = this.desc.text;
//            bodyMenuShareWeibo.link = this.link.text;
//            bodyMenuShareWeibo.imgUrl = this.imgUrl.text;
//            bodyMenuShareWeibo.trigger = () => {
//                alert('用户点击分享到微博');
//            };
//            bodyMenuShareWeibo.complete = (res) => {
//                alert(JSON.stringify(res));
//            };
//            bodyMenuShareWeibo.success = () => {
//                alert('已分享');
//            };
//            bodyMenuShareWeibo.cancel = () => {
//                alert('已取消');
//            };
//            bodyMenuShareWeibo.fail = (res) => {
//                alert(JSON.stringify(res));
//            };
//            wx.onMenuShareWeibo(bodyMenuShareWeibo);
//            alert('已注册获取“分享到微博”状态事件');
//        }, this);
//    }
//    /**
//    * 批量显示菜单项
//    */
//    private getWeixinShowMenuItems(arr_menu: any[] = null) {
//        var _arr_menu: any[] = [
//        //传播类
//            "menuItem:share:appMessage",//发送给朋友
//            "menuItem:share:timeline",//分享到朋友圈
//            "menuItem:share:qq",//分享到QQ
//            "menuItem:share:weiboApp",//分享到Weibo
//            "menuItem:favorite",//收藏
//            "menuItem:share:facebook",//分享到FB
//            "menuItem:share:QZone",//分享到 QQ 空间
//        //保护类
//            "menuItem:editTag",//编辑标签
//            "menuItem:delete",//删除
//            "menuItem:copyUrl",//复制链接
//            "menuItem:originPage",//原网页
//            "menuItem:readMode",//阅读模式
//            "menuItem:openWithQQBrowser",//在QQ浏览器中打开
//            "menuItem:openWithSafari",//在Safari中打开
//            "menuItem:share:email",//邮件
//            "menuItem:share:brand" //一些特殊公众号
//        ];
//        if (arr_menu != null) {
//            _arr_menu = arr_menu;
//        };
//        this.btn_showMenuItems.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => {
//            wx.showMenuItems({
//                menuList: _arr_menu,
//                success: (res) => {
//                    alert('已显示“分享到朋友圈”等按钮');
//                },
//                fail: (res) => {
//                    alert(JSON.stringify(res));
//                }
//            });
//        }, this);
//    }
//    /**
//    * 批量隐藏菜单项
//    */
//    private getWeixinHideMenuItems(arr_menu: any[] = null) {
//        var _arr_menu: any[] = [
//        //传播类
//            "menuItem:share:appMessage",//发送给朋友
//            "menuItem:share:timeline",//分享到朋友圈
//            "menuItem:share:qq",//分享到QQ
//            "menuItem:share:weiboApp",//分享到Weibo
//            "menuItem:favorite",//收藏
//            "menuItem:share:facebook",//分享到FB
//            "menuItem:share:QZone",//分享到 QQ 空间
//        //保护类
//            "menuItem:editTag",//编辑标签
//            "menuItem:delete",//删除
//            "menuItem:copyUrl",//复制链接
//            "menuItem:originPage",//原网页
//            "menuItem:readMode",//阅读模式
//            "menuItem:openWithQQBrowser",//在QQ浏览器中打开
//            "menuItem:openWithSafari",//在Safari中打开
//            "menuItem:share:email",//邮件
//            "menuItem:share:brand" //一些特殊公众号
//        ];
//        if (arr_menu != null) {
//            _arr_menu = arr_menu;
//        };
//        this.btn_hideMenuItems.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => {
//            wx.hideMenuItems({
//                menuList: _arr_menu,
//                success: (res) => {
//                    alert('已隐藏所有传播和保护类按钮');
//                },
//                fail: (res) => {
//                    alert(JSON.stringify(res));
//                }
//            });
//        }, this);
//    }
//} 

var uniLib;
(function (uniLib) {
    /**
   * Number工具
   */
    var NumberUtils = /** @class */ (function () {
        function NumberUtils() {
        }
        /**
         * 随机值范围
         */
        NumberUtils.randomInt = function (min, max) {
            if (0 >= max - min)
                return 0;
            var a = max - min;
            return Math.floor(Math.random() * a) + min;
        };
        NumberUtils.inRange = function (a, min, max) {
            return min <= a && a <= max;
        };
        NumberUtils.div = function (n, d) {
            return Math.floor(n / d);
        };
        NumberUtils.getZeroTimeStamp = function () {
            var date = new Date();
            var dateStr = date.getUTCFullYear() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCDate();
            return new Date(dateStr).getTime() / 1000;
        };
        NumberUtils.getTimeStamp = function () {
            var c = new Date().getTime() / 1000;
            return parseInt(c.toString());
        };
        NumberUtils.getAngle = function (px1, py1, px2, py2) {
            //两点的x、y值
            var x = px2 - px1;
            var y = py2 - py1;
            var hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            //斜边长度
            var cos = x / hypotenuse;
            var radian = Math.acos(cos);
            //求出弧度
            var angle = 180 / (Math.PI / radian);
            //用弧度算出角度        
            if (y < 0) {
                angle = -angle;
            }
            else if ((y == 0) && (x < 0)) {
                angle = 180;
            }
            return angle;
        };
        NumberUtils.getCurrencyUnitByLen = function (len) {
            var str = "";
            switch (len) {
                case 2:
                    str = "百";
                    break;
                case 3:
                    str = "千";
                    break;
                case 4:
                    str = "万";
                    break;
                case 5:
                    str = "十万";
                    break;
                case 6:
                    str = "百万";
                    break;
                case 7:
                    str = "千万";
                    break;
                case 8:
                    str = "亿";
                    break;
                case 9:
                    str = "十亿";
                    break;
                case 10:
                    str = "百亿";
                    break;
                case 11:
                    str = "千亿";
                    break;
                case 12:
                    str = "兆";
                    break;
            }
            return str;
        };
        return NumberUtils;
    }());
    uniLib.NumberUtils = NumberUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
   * 资源工具
   */
    var ResUtils = /** @class */ (function () {
        function ResUtils() {
        }
        ResUtils.resetSoundLoadTimes = function () {
            for (var i in this._resRequestSoundLoadTimes) {
                this._resRequestSoundLoadTimes[i] = null;
                delete this._resRequestSoundLoadTimes[i];
            }
        };
        ResUtils.setMustRes = function (reslist) {
            try {
                this._mustResList = [];
                for (var key in reslist) {
                    var item = reslist[key];
                    if (item && item.resName && this._mustResList.indexOf(item.resName) == -1) {
                        this._mustResList.push(item.resName);
                    }
                }
            }
            catch (e) {
                uniLib.Console.warn("setMustRes:必须资源列表出错,请检查必须资源列表格式");
            }
        };
        ResUtils.init = function () {
            if (this.inited == false) {
                this.inited = true;
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                // if (egret.Capabilities.engineVersion < "5.0") {
                if (typeof (dragonBones) !== "undefined") {
                    egret.startTick(this.onDragonBonesTick, egret.MainContext.instance.stage);
                    // }
                }
            }
        };
        ResUtils.onDragonBonesTick = function (timeStamp) {
            if (typeof (dragonBones) === "undefined")
                return false;
            dragonBones["WorldClock"]["clock"].advanceTime(-1);
            return true;
        };
        ResUtils.onItemLoadError = function (event) {
            //if (event.resItem.name.indexOf("js") != -1) {
            //    uniLib.Console.error("RES.ResourceEvent.ITEM_LOAD_ERROR:", event.resItem.name);
            //} else {
            //    uniLib.Console.warn("RES.ResourceEvent.ITEM_LOAD_ERROR:", event.resItem.name);
            //}
            if (this._mustResList.indexOf(event.resItem.name) >= 0) {
                uniLib.Utils.restart(event.resItem.name + "资源加载失败,请重新启动游戏", "确定");
            }
        };
        //private static mcPool: ObjectFactoryGroup = new ObjectFactoryGroup();
        /**
        * @language zh_CN
        * 解析素材
        * @param source 待解析的新素材标识符
        * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
        * @param thisObject callBack的 this 引用
        */
        ResUtils.getRes = function (source, compFunc, thisObject, type) {
            var self = this;
            function onGetRes(data) {
                if (self._needLoadDicCallBack[source]) {
                    while (self._needLoadDicCallBack[source].length > 0) {
                        var load = self._needLoadDicCallBack[source].shift();
                        load[0].call(load[1], data, source);
                    }
                    delete self._needLoadDicCallBack[source];
                }
                else {
                    if (thisObject != null) {
                        compFunc.call(thisObject, data, source);
                    }
                    else {
                        if (compFunc)
                            compFunc(data, source);
                    }
                }
                if (self._loadingDic.indexOf(source) != -1) {
                    self._asynLoadLevel--;
                    self._loadingDic.splice(self._loadingDic.indexOf(source), 1);
                }
                if (self._needloadDic.length > 0 && this._asynLoadLevel < this.MAX_LOAD_LEVEL) {
                    var loadResName = self._needloadDic.shift();
                    self.getRes(loadResName, onGetRes, self);
                }
            }
            function soundLoaded(evt) {
                self._resRequestSoundLoadTimes[source] = 0;
                var loader2 = evt.target;
                loader2.removeEventListener(egret.Event.COMPLETE, soundLoaded, self);
                loader2.removeEventListener(egret.IOErrorEvent.IO_ERROR, onSoundLoadError, self);
                var sound = loader2.data;
                if (compFunc) {
                    compFunc(sound, source);
                }
            }
            function onSoundLoadError(evt) {
                var loader2 = evt.target;
                loader2.removeEventListener(egret.Event.COMPLETE, soundLoaded, self);
                loader2.removeEventListener(egret.IOErrorEvent.IO_ERROR, onSoundLoadError, self);
                uniLib.Console.error("加载资源失败：" + source);
                if (self._resRequestSoundLoadTimes[source] != null) {
                    if (self._resRequestSoundLoadTimes[source] > 0) {
                        self._resRequestSoundLoadTimes[source]--;
                        var loader = new egret.URLLoader();
                        //设置加载方式为声音
                        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
                        //添加加载完成侦听
                        loader.once(egret.Event.COMPLETE, soundLoaded, self);
                        loader.once(egret.IOErrorEvent.IO_ERROR, onSoundLoadError, self);
                        var resConfig = RES["configInstance"];
                        var item = resConfig.getResourceItem(source);
                        var url = RES.getVersionController().getVirtualUrl(item.url);
                        var request = new egret.URLRequest(url);
                        //开始加载
                        loader.load(request);
                    }
                }
            }
            if (type == egret.URLLoaderDataFormat.SOUND) {
                if (this._resRequestSoundLoadTimes[source] == null) {
                    this._resRequestSoundLoadTimes[source] = 1;
                }
                else if (this._resRequestSoundLoadTimes[source] == 0) {
                    return;
                }
                else {
                    this._resRequestSoundLoadTimes[source]++;
                    return;
                }
                var loader = new egret.URLLoader();
                //设置加载方式为声音
                loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
                //添加加载完成侦听
                loader.once(egret.Event.COMPLETE, soundLoaded, self);
                loader.once(egret.IOErrorEvent.IO_ERROR, onSoundLoadError, self);
                var resConfig = RES["configInstance"];
                var item = resConfig.getResourceItem(source);
                if (item != null) {
                    var url = RES.getVersionController().getVirtualUrl(item.url);
                    //Console.error("将要加载资源：" + source + ":" + url + ":" + item.url);
                    var request = new egret.URLRequest(url);
                    //开始加载
                    loader.load(request);
                }
                else {
                    uniLib.Console.error("找不到将要加载的资源：" + source + "\t" + url);
                }
            }
            else {
                if (RES.hasRes(source)) {
                    var data = RES.getRes(source);
                    if (data) {
                        onGetRes(data);
                    }
                    else {
                        if (this._loadingDic.indexOf(source) >= 0) {
                            var need = [compFunc, thisObject];
                            if (this._needLoadDicCallBack[source] == null)
                                this._needLoadDicCallBack[source] = [];
                            this._needLoadDicCallBack[source].push(need);
                            return;
                        }
                        else {
                            if (this._asynLoadLevel < this.MAX_LOAD_LEVEL) {
                                this._loadingDic.push(source);
                                this._asynLoadLevel++;
                                RES.getResAsync(source, onGetRes, this);
                            }
                            else {
                                var need = [compFunc, thisObject];
                                if (this._needloadDic.indexOf(source) == -1) {
                                    this._needloadDic.push(source);
                                }
                                if (this._needLoadDicCallBack[source] == null)
                                    this._needLoadDicCallBack[source] = [];
                                this._needLoadDicCallBack[source].push(need);
                            }
                        }
                    }
                }
                else {
                    RES.getResByUrl(source, onGetRes, this);
                }
            }
        };
        /**
         * 退出游戏时清理游戏的组和对应资源配置
         */
        ResUtils.clearResConfigByConfigName = function (arr) {
            var configRes = RES["configInstance"];
            for (var key in configRes.groupDic) {
                var group = configRes.groupDic[key];
                for (var keyname in group) {
                    if (arr.indexOf(keyname) >= 0) {
                        if (configRes.keyMap[group[keyname].name]) {
                            group[keyname].name = null;
                            delete group[keyname].name;
                        }
                    }
                }
                configRes.groupDic[key] = null;
                delete configRes.groupDic[key];
            }
        };
        /**
         * 退出游戏时清理游戏的组和对应资源配置
         */
        ResUtils.clearCfgByConfigName = function (arr, resConfig) {
            var dics = [];
            for (var i = 0; i < resConfig.groups.length; i++) {
                if (arr.indexOf(resConfig.groups[i].name) >= 0) {
                    dics = dics.concat(resConfig.groups[i].keys.split(","));
                    resConfig.groups.splice(i, 1);
                }
            }
            for (var i = 0; i < resConfig.resources.length; i++) {
                var res = resConfig.resources[i];
                if (dics.indexOf(res.name) >= 0) {
                    resConfig.resources.splice(i, 1);
                }
            }
            return resConfig;
        };
        /**
        * 退出游戏时通过资源组名清除资源
        * @groupArr 需要清除的资源组数组
        */
        ResUtils.clearResConfigByGroupName = function (groupArr) {
            var configRes = RES["configInstance"];
            for (var i = 0; i < groupArr.length; i++) {
                var itemArr = RES.getGroupByName(groupArr[i]);
                for (var k = 0; k < itemArr.length; k++) {
                    itemArr[k].loaded = false;
                    configRes["keyMap"][itemArr[k].name] = null;
                    // console.log(itemArr[k].name);
                    delete configRes["keyMap"][itemArr[k].name];
                }
                if (configRes["groupDic"][groupArr[i]]) {
                    // if (configRes["groupDic"][groupArr[i]].subkeys) {
                    //     let itemArr: Array<RES.ResourceItem> = RES.getGroupByName(groupArr[i]);
                    //     for (let k = 0; k < itemArr.length; k++) {
                    //         let subkeys = itemArr[k].subkeys;
                    //         let len = subkeys;
                    //         for (let k = 0; k < len; k++) {
                    //             subkeys[k].loaded = false;
                    //             configRes["keyMap"][subkeys[k].name] = null;
                    //             console.log(subkeys[k].name);
                    //             delete configRes["keyMap"][subkeys[k].name];
                    //         }
                    //     }
                    // }
                    configRes["groupDic"][groupArr[i]] = null;
                    delete configRes["groupDic"][groupArr[i]];
                }
            }
        };
        /**
         * 获取图片
         * @param source
         * @param compFunc
         * @param thisObject
         * @param cache
         */
        ResUtils.getBmp = function (source, compFunc, thisObject, cache) {
            if (cache === void 0) { cache = true; }
            var obj;
            if (cache)
                obj = this.resPool.active("bm_" + source);
            if (obj.texture == null) {
                this.getRes(source, function (data) {
                    obj.texture = data;
                    if (compFunc) {
                        compFunc.call(thisObject, obj);
                    }
                });
            }
            return obj;
        };
        /**
         * 回收图片到池
         * @param source
         * @param obj
         */
        ResUtils.freeBmp = function (obj, source) {
            this.resPool.free(obj, "bm_" + source);
        };
        ResUtils.getMovieClip = function (group, name, compFunc, thisObject, cache) {
            if (cache === void 0) { cache = false; }
            var loadNum = 0;
            if (name == null)
                name = "";
            var sources = [group + "_json", group + "_png"];
            function onGetMCRes(data, resName) {
                loadNum++;
                if (loadNum == sources.length) {
                    var mdf = new egret.MovieClipDataFactory(RES.getRes(group + "_json"), RES.getRes(group + "_png"));
                    var mc = new egret.MovieClip(mdf.generateMovieClipData(name)); //创建MovieClip
                    compFunc.call(thisObject, mc);
                    return;
                }
            }
            //if (this.resPool.isNew("mc_" + group + "_" + name)) {
            for (var i in sources) {
                this.getRes(sources[i], onGetMCRes, this);
            }
            //} else {
            //    this.resPool.active("mc_" + group + "_" + name)
            //}
        };
        /**
         * 回收movieClip到池
         * @param source
         * @param obj
         */
        ResUtils.freeMovieClip = function (obj, group, name) {
            //this.resPool.free(obj, "mc_" + group + "_" + name);
        };
        ResUtils.getParticle = function (group, name, compFunc, thisObject) {
            var loadNum = 0;
            if (name == null)
                name = "";
            var sources = [group + "_json", group];
            function onGetRes(data, resName) {
                loadNum++;
                if (loadNum == sources.length) {
                    var par;
                    var texture = RES.getRes(group);
                    var config = RES.getRes(group + "_json");
                    par = new particle.GravityParticleSystem(texture, config);
                    compFunc.call(thisObject, par);
                    return;
                }
            }
            for (var i in sources) {
                this.getRes(sources[i], onGetRes, this);
            }
        };
        ResUtils.loadResConfig = function (configUrl) {
        };
        // private static groupLoadComplete;
        // private static groupLoadProgress;
        // private static groupLoadError;
        // private static onGetResConfig;
        /**
         * 通过gameid加载资源组
         */
        ResUtils.loadGameGroupReses = function (configUrl, complete, progress, loadError, thisObj, resourceFolder) {
            if (resourceFolder === void 0) { resourceFolder = "resource/"; }
            var groups = [];
            var self = this;
            var onGetResConfig = function (e) {
                var canDestroyGrps = []; //可以被销毁的资源组
                if (e && e.groups && e.groups.length > 0) {
                    for (var i = 0; i < e.groups.length; i++) {
                        groups.push(e.groups[i].name);
                        if (ResUtils.isGroupInConfig(e.groups[i].name) == false) {
                            canDestroyGrps.push(e.groups[i].name);
                        }
                    }
                    if (uniLib.Global.initOpt.lobbyCommonResGrps && uniLib.Global.initOpt.lobbyCommonResGrps.length > 0) {
                        ResUtils.clearCfgByConfigName(uniLib.Global.initOpt.lobbyCommonResGrps, e);
                    }
                    if (RES.hasOwnProperty("parseConfig")) {
                        RES.parseConfig(e, resourceFolder);
                    }
                    uniLib.ResLoadMgr.instance.loadGrps(groups, function () {
                        self.loadedConfig[configUrl].status = GROUP_LOAD_STATUS.LOADED;
                        e.data = canDestroyGrps;
                        complete.call(thisObj, e);
                    }, function (e) {
                        if (self.loadedConfig[configUrl]) {
                            self.loadedConfig[configUrl] = null;
                            delete self.loadedConfig[configUrl];
                        }
                        RES.destroyRes(configUrl);
                        ResUtils.clearResConfigByGroupName(canDestroyGrps);
                        if (loadError) {
                            loadError.call(thisObj, e);
                        }
                    }, this, function (e) {
                        if (progress) {
                            progress.call(thisObj, e);
                        }
                    });
                }
                else {
                    if (self.loadedConfig[configUrl]) {
                        self.loadedConfig[configUrl] = null;
                        delete self.loadedConfig[configUrl];
                    }
                    RES.destroyRes(configUrl);
                    ResUtils.clearResConfigByGroupName(canDestroyGrps);
                    if (loadError) {
                        loadError.call(thisObj, e);
                    }
                }
            };
            if (this.loadedConfig[configUrl] == null) {
                this.loadedConfig[configUrl] = {};
                this.loadedConfig[configUrl].status = GROUP_LOAD_STATUS.LOADDING;
                // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigLoaded, this);
                // RES.loadConfig(configUrl, resourceFolder);
                this.getRes(configUrl, onGetResConfig, this);
            }
            else if (this.loadedConfig[configUrl].status == GROUP_LOAD_STATUS.LOADED) {
                complete.call(thisObj);
            }
            else {
            }
        };
        ResUtils.removeGroup = function (grpName) {
            var grpDic = ResUtils.getGroupDic();
            if (grpDic) {
                if (grpDic[grpName]) {
                    grpDic[grpName] = null;
                    delete grpDic[grpName];
                }
                else if (grpDic[grpName]) {
                    grpDic[grpName] = null;
                    delete grpDic[grpName];
                }
            }
        };
        /**
         * 资源组是否已经在资源配置中
         */
        ResUtils.isGroupInConfig = function (grp) {
            var grpRes = ResUtils.getGroupDic(grp);
            if (grpRes) {
                return true;
            }
            else {
                return false;
            }
        };
        ResUtils.getGroupDic = function (grpName) {
            var resConfig = RES["configInstance"];
            var groupDic;
            if (resConfig) {
                if (resConfig["groupDic"] && resConfig["groupDic"]) {
                    if (grpName) {
                        groupDic = resConfig["groupDic"][grpName];
                    }
                    else {
                        groupDic = resConfig["groupDic"];
                    }
                }
                else if (resConfig["config"] && resConfig["config"]["groups"]) {
                    if (grpName) {
                        groupDic = resConfig["config"]["groups"][grpName];
                    }
                    else {
                        groupDic = resConfig["config"]["groups"];
                    }
                }
            }
            return groupDic;
        };
        /**
         * 获得对象工厂池
         * @param obj
         */
        ResUtils.getObjFactoryGroup = function (obj) {
            if (this.objfactorys[obj] == null)
                this.objfactorys[obj] = new uniLib.ObjectFactoryGroup[obj];
            return this.objfactorys[obj];
        };
        ResUtils.MAX_LOAD_LEVEL = 1;
        ResUtils._asynLoadLevel = 0;
        ResUtils._loadingDic = [];
        ResUtils._needloadDic = [];
        ResUtils._needLoadDicCallBack = {};
        ResUtils._resRequestSoundLoadTimes = {};
        ResUtils.resPool = new uniLib.ObjectFactoryGroup(egret.Bitmap);
        ResUtils._mustResList = [];
        ResUtils.inited = false;
        ResUtils.loadedConfig = {};
        ResUtils.objfactorys = [];
        return ResUtils;
    }());
    uniLib.ResUtils = ResUtils;
    var GROUP_LOAD_STATUS;
    (function (GROUP_LOAD_STATUS) {
        GROUP_LOAD_STATUS[GROUP_LOAD_STATUS["LOADDING"] = 0] = "LOADDING";
        GROUP_LOAD_STATUS[GROUP_LOAD_STATUS["LOADED"] = 1] = "LOADED";
    })(GROUP_LOAD_STATUS = uniLib.GROUP_LOAD_STATUS || (uniLib.GROUP_LOAD_STATUS = {}));
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    /**
     * 屏幕工具类
     */
    var ScreenUtils = /** @class */ (function () {
        function ScreenUtils() {
        }
        ScreenUtils.init = function (scale) {
            this.scaleMode = scale;
            if (egret.MainContext.instance.stage.orientation == egret.OrientationMode.LANDSCAPE || egret.MainContext.instance.stage.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
                this._landscape = true;
            }
            else {
                this._landscape = false;
            }
            uniLib.GameModuleUtils.defaultLandscape = this._landscape;
            uniLib.Global.screenWidth = egret.MainContext.instance.stage.stageWidth;
            uniLib.Global.screenHeight = egret.MainContext.instance.stage.stageHeight;
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResizeNotify, this);
            this.resetScaleMode();
            this.scaleFactor = uniLib.Global.screenHeight / uniLib.Global.designHeight;
            //Global.stage = egret.MainContext.instance.stage;
            //if (window) {
            //    window.onbeforeunload = function (event) {
            //        return '确定要退出吗?';
            //    }
            //};
            if (global) {
            }
            else {
                if (egret && uniLib.BrowersUtils.GetRequest("debug") != "true") {
                    egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, ScreenUtils.onDeactive, uniLib.Global);
                    egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, ScreenUtils.onActive, uniLib.Global);
                }
            }
        };
        ScreenUtils.onDeactive = function (e) {
            if (uniLib.Global.isActive == false) {
                return;
            }
            uniLib.Global.isActive = false;
            egret.Tween.pauseTweens(egret.MainContext.instance.stage);
            uniLib.SoundMgr.instance.onDeActive(e);
        };
        ScreenUtils.onActive = function (e) {
            if (uniLib.Global.isActive == true) {
                return;
            }
            uniLib.Global.isActive = true;
            egret.Tween.resumeTweens(egret.MainContext.instance.stage);
            uniLib.SoundMgr.instance.onActive(e);
        };
        /**
         * 屏幕大小发生变化时的消息
         */
        ScreenUtils.onResizeNotify = function () {
            if (uniLib.Global.isH5 == true) {
                uniLib.Global.screenWidth = egret.MainContext.instance.stage.stageWidth;
                uniLib.Global.screenHeight = egret.MainContext.instance.stage.stageHeight;
            }
            else {
                if (this._landscape == true) {
                    uniLib.Global.screenWidth = egret.MainContext.instance.stage.stageHeight;
                    uniLib.Global.screenHeight = egret.MainContext.instance.stage.stageWidth;
                }
                else {
                    uniLib.Global.screenWidth = egret.MainContext.instance.stage.stageWidth;
                    uniLib.Global.screenHeight = egret.MainContext.instance.stage.stageHeight;
                }
            }
            this.scaleFactor = uniLib.Global.screenHeight / uniLib.Global.designHeight;
            if (uniLib.SceneMgr.instance.currentScene) {
                uniLib.SceneMgr.instance.currentScene.resize();
            }
            uniLib.PopUpMgr.resize();
            uniLib.DebugView.Instance.resize();
        };
        ScreenUtils.resetScaleMode = function () {
            //egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
            if (this.scaleMode) {
                egret.MainContext.instance.stage.scaleMode = this.scaleMode;
            }
            else {
                if (egret.Capabilities.isMobile) {
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                }
                else {
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                }
            }
        };
        Object.defineProperty(ScreenUtils, "landscape", {
            get: function () {
                return this._landscape;
            },
            /**
            * 设置横屏
            */
            set: function (b) {
                //if (b != this._landscape) {
                if (this._landscape == b) {
                    return;
                }
                this._landscape = b;
                if (uniLib.Global.isH5 == true) {
                    if (this._landscape == true) {
                        egret.MainContext.instance.stage.orientation = egret.OrientationMode.LANDSCAPE;
                        if (uniLib.GameModuleUtils.defaultLandscape == true) {
                            egret.MainContext.instance.stage.setContentSize(uniLib.Global.designWidth, uniLib.Global.designHeight);
                        }
                        else {
                            uniLib.Global.screenWidth = uniLib.Global.designHeight;
                            uniLib.Global.screenHeight = uniLib.Global.designWidth;
                            egret.MainContext.instance.stage.setContentSize(uniLib.Global.designHeight, uniLib.Global.designWidth);
                        }
                    }
                    else {
                        egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
                        if (uniLib.GameModuleUtils.defaultLandscape == true) {
                            egret.MainContext.instance.stage.setContentSize(uniLib.Global.designHeight, uniLib.Global.designWidth);
                        }
                        else {
                            uniLib.Global.screenWidth = uniLib.Global.designWidth;
                            uniLib.Global.screenHeight = uniLib.Global.designHeight;
                            egret.MainContext.instance.stage.setContentSize(uniLib.Global.designWidth, uniLib.Global.designHeight);
                        }
                    }
                }
                else {
                    //ZQGameSdk.landscape = this._landscape;
                    ////if (this._landscape == true) {
                    //    egret.MainContext.instance.stage.setContentSize(Global.designWidth, Global.designHeight);
                    ////} else {
                    ////    egret.MainContext.instance.stage.setContentSize(Global.designHeight, Global.designWidth);
                    ////}
                    if (this._landscape == true) {
                        //egret.MainContext.instance.stage.setContentSize(Global.designWidth, Global.designHeight);
                        // egret.MainContext.instance.stage.orientation = egret.OrientationMode.PORTRAIT;
                        var scalex = 0;
                        var offsety = 0;
                        // if (GameModuleUtils.defaultLandscape == false) {
                        // Global.screenWidth = Global.designHeight;
                        // Global.screenHeight = Global.designWidth;
                        // egret.MainContext.instance.stage.setContentSize(Global.designHeight, Global.designWidth);
                        // }
                        if (uniLib.Global.screenWidth < uniLib.Global.screenHeight) {
                            //egret.MainContext.instance.stage.height = scalex*Global.designHeight;
                            scalex = uniLib.Global.screenWidth / uniLib.Global.designWidth;
                            offsety = (uniLib.Global.screenHeight - scalex * uniLib.Global.designHeight) / 2;
                            var c = uniLib.Global.screenWidth;
                            uniLib.Global.screenWidth = uniLib.Global.screenHeight;
                            uniLib.Global.screenHeight = c;
                        }
                        else {
                            scalex = uniLib.Global.screenHeight / uniLib.Global.designWidth;
                            offsety = (uniLib.Global.screenWidth - scalex * uniLib.Global.designHeight) / 2;
                        }
                        uniLib.SceneMgr.instance.currentScene.x = uniLib.Global.designWidth;
                        uniLib.SceneMgr.instance.currentScene.y = offsety;
                        uniLib.SceneMgr.instance.currentScene.rotation = 90;
                    }
                    else {
                        // if (GameModuleUtils.defaultLandscape == false) {
                        // Global.screenWidth = Global.screenWidth;
                        // Global.screenHeight = Global.designHeight;
                        // }
                        //egret.MainContext.instance.stage.setContentSize(Global.designHeight, Global.designWidth);
                        var c = uniLib.Global.screenWidth;
                        uniLib.Global.screenWidth = uniLib.Global.screenHeight;
                        uniLib.Global.screenHeight = c;
                        uniLib.SceneMgr.instance.currentScene.rotation = 0;
                        uniLib.SceneMgr.instance.currentScene.x = 0;
                        uniLib.SceneMgr.instance.currentScene.y = 0;
                    }
                }
                // this.onResizeNotify();
                //}
            },
            enumerable: true,
            configurable: true
        });
        ScreenUtils.scaleFactor = 1;
        ScreenUtils._landscape = false;
        return ScreenUtils;
    }());
    uniLib.ScreenUtils = ScreenUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var StringUtils = /** @class */ (function () {
        function StringUtils() {
        }
        /**
         * 字符串是`undefined`、`null`或`""`
         */
        StringUtils.stringIsNullOrEmpty = function (value) {
            return value == null || value.length == 0;
        };
        StringUtils.MD5 = function (message) {
            return new md5().hex_md5(message);
        };
        StringUtils.ltrim = function (s) {
            return s.replace(/(^\s*)/g, "");
        };
        StringUtils.rtrim = function (s) {
            return s.replace(/(\s*$)/g, "");
        };
        StringUtils.trim = function (s) {
            return s.replace(/(^\s*)|(\s*$)/g, "");
        };
        StringUtils.sTrim = function (str) {
            return str.replace(/\s/g, '');
        };
        StringUtils.checkPhone = function (tel) {
            if (!(/^1[34578]\d{9}$/.test(tel))) {
                return false;
            }
            return true;
        };
        StringUtils.checkEmail = function (email) {
            if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email))) {
                return false;
            }
            return true;
        };
        /**
         * 字符串中查找某字符出现次数的位置
         */
        StringUtils.getPosition = function (str, searchfor, count) {
            if (count === void 0) { count = 1; }
            var re = new RegExp(searchfor, "g");
            while (count--) {
                re.test(str);
            }
            var pos = re.lastIndex - searchfor.length;
            if (pos < 0)
                return null;
            else
                return pos;
        };
        /**
         * 远程url修正
         */
        StringUtils.validNetUrl = function (url) {
            var len = url.length;
            var lastChat = url.charAt(len - 1);
            if (lastChat != "/") {
                url = url + "/";
            }
            return url;
        };
        /**
         * 格式化货币字符串
         * @param num {number} 需要格式化的数
         * @param em {string} 单位暂时支持 万
         * @param bSplit {boolean} 使用单位分隔符
         * @param sl {number} 格式化单位长度
         */
        StringUtils.formatCurrency = function (num, em, bSplit, sl) {
            if (bSplit === void 0) { bSplit = false; }
            if (sl === void 0) { sl = 5; }
            var sign = "";
            if (isNaN(num)) {
                num = 0;
            }
            //if (num < 0) {
            //    sign = "-";
            //}
            var strNum = num + "";
            if (em != null) {
                if (em == "万") {
                    if (sl) {
                        if (sl < 5)
                            sl = 5;
                    }
                    else
                        sl = 5;
                    if (strNum.length >= sl) {
                        strNum = strNum.slice(0, strNum.length - 4);
                    }
                    else {
                        em = "";
                    }
                }
            }
            var arr1 = strNum.split(".");
            var hasPoint = false; //是否有小数部分 
            var piontPart = ""; //小数部分 
            var intPart = strNum; //整数部分 
            if (arr1.length >= 2) {
                hasPoint = true;
                piontPart = arr1[1];
                intPart = arr1[0];
            }
            if (bSplit == true) {
                var res = ''; //保存添加逗号的部分 
                var intPartlength = intPart.length; //整数部分长度 
                var maxcount = Math.ceil(intPartlength / 3); //整数部分需要添加几个逗号 
                for (var i = 1; i <= maxcount; i++) {
                    var startIndex = intPartlength - i * 3; //开始位置 
                    if (startIndex < 0) {
                        startIndex = 0;
                    }
                    var endIndex = intPartlength - i * 3 + 3; //结束位置 
                    var part = intPart.substring(startIndex, endIndex) + (bSplit == true ? "," : "");
                    res = part + res;
                }
                res = res.substr(0, res.length - 1); //去掉最后一个逗号 
            }
            else {
                res = intPart;
            }
            var endstr = "";
            if (hasPoint) {
                endstr = "" + sign + res + "." + piontPart;
            }
            else {
                endstr = "" + sign + res;
            }
            if (em != null) {
                endstr += em;
            }
            return endstr;
        };
        /**
         * IP地址解析为整型
         */
        StringUtils.ip2int = function (ip) {
            var num = 0;
            ip = ip.split(".");
            num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
            num = num >>> 0;
            return num;
        };
        /**
         * 整型解析为IP地址
         */
        StringUtils.int2ip = function (num) {
            var str;
            var tt = new Array();
            tt[0] = (num >>> 24) >>> 0;
            tt[1] = ((num << 8) >>> 24) >>> 0;
            tt[2] = (num << 16) >>> 24;
            tt[3] = (num << 24) >>> 24;
            str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
            return str;
        };
        /**
     * 获取字符串实际长度
     */
        StringUtils.getStrRealLength = function (str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                    len += 2;
                }
                else {
                    len++;
                }
            }
            return len;
        };
        /**
         * 时间转为字符串显示
         */
        StringUtils.time2str = function (num) {
            if (num == null)
                return "";
            num = num.toString().length == 10 ? num * 1000 : num;
            var date = new Date();
            date.setTime(num);
            var str = date.getFullYear() + "-" + this.getNumStr(date.getMonth() + 1) + "-" + this.getNumStr(date.getDate()) + "  " + this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
            return str;
        };
        StringUtils.getNumStr = function (num) {
            if (num < 10) {
                return "0" + num;
            }
            return num.toString();
        };
        /**
         * 格式化货币，保留有效位数
         * @param num 需要格式化的数字
         * @param len 单位 最小设置单位万
         */
        StringUtils.formatCurrencyToUnit = function (num, len, bSplit) {
            if (len === void 0) { len = 4; }
            if (bSplit === void 0) { bSplit = true; }
            var hideLen;
            var endStr = "";
            var str = "";
            if (len < 4)
                len = 4;
            var arr1 = num.toString().split(".");
            var hasPoint = false; //是否有小数部分 
            var piontPart = ""; //小数部分 
            var intPart = ""; //整数部分 
            if (arr1.length >= 2) {
                hasPoint = true;
                piontPart = arr1[1];
            }
            intPart = arr1[0];
            if (intPart.length > len) {
                hideLen = intPart.length - len;
            }
            if (hideLen >= len) {
                intPart = intPart.replace(intPart.substr(len, intPart.length), "");
                endStr = uniLib.NumberUtils.getCurrencyUnitByLen(hideLen);
            }
            if (intPart.length >= 4 && bSplit == true) {
                var res = ''; //保存添加逗号的部分 
                var intPartlength = intPart.length; //整数部分长度 
                var maxcount = Math.ceil(intPartlength / 3); //整数部分需要添加几个逗号 
                for (var i = 1; i <= maxcount; i++) {
                    var startIndex = intPartlength - i * 3; //开始位置 
                    if (startIndex < 0) {
                        startIndex = 0;
                    }
                    var endIndex = intPartlength - i * 3 + 3; //结束位置 
                    var part = intPart.substring(startIndex, endIndex) + (bSplit == true ? "," : "");
                    res = part + res;
                }
                res = res.substr(0, res.length - 1); //去掉最后一个逗号 
            }
            else {
                res = intPart;
            }
            str = res + endStr;
            return str;
        };
        /**
         * 格式化货币字符串
         * @param num {number} 需要格式化的数
         * @param bSplit {boolean} 使用单位分隔符 默认false
         * @param txtLen {number} 货币最大显示长度,通过这个值来自动设置单位
         */
        StringUtils.formatCurrencyByTotalLen = function (num, bSplit, txtLen) {
            if (bSplit === void 0) { bSplit = false; }
            if (txtLen === void 0) { txtLen = 8; }
            if (txtLen < 5) {
                txtLen = 5;
            }
            var sign = "";
            if (isNaN(num)) {
                num = 0;
            }
            //if (num < 0) {
            //    sign = "-";
            //}
            var strNum = Number(num) + "";
            var em = "";
            if (strNum.length >= txtLen) {
                if (strNum.length - 4 >= txtLen) {
                    strNum = strNum.slice(0, strNum.length - 8);
                    em = "亿";
                }
                else {
                    strNum = strNum.slice(0, strNum.length - 4);
                    em = "万";
                }
            }
            else {
                em = "";
            }
            var arr1 = strNum.split(".");
            var hasPoint = false; //是否有小数部分 
            var piontPart = ""; //小数部分 
            var intPart = strNum; //整数部分 
            if (arr1.length >= 2) {
                hasPoint = true;
                piontPart = arr1[1];
                intPart = arr1[0];
            }
            if (bSplit == true) {
                var res = ''; //保存添加逗号的部分 
                var intPartlength = intPart.length; //整数部分长度 
                var maxcount = Math.ceil(intPartlength / 3); //整数部分需要添加几个逗号 
                for (var i = 1; i <= maxcount; i++) {
                    var startIndex = intPartlength - i * 3; //开始位置 
                    if (startIndex < 0) {
                        startIndex = 0;
                    }
                    var endIndex = intPartlength - i * 3 + 3; //结束位置 
                    var part = intPart.substring(startIndex, endIndex) + (bSplit == true ? "," : "");
                    res = part + res;
                }
                res = res.substr(0, res.length - 1); //去掉最后一个逗号 
            }
            else {
                res = intPart;
            }
            var endstr = "";
            if (hasPoint) {
                endstr = "" + sign + res + "." + piontPart;
            }
            else {
                endstr = "" + sign + res;
            }
            if (em != null) {
                endstr += em;
            }
            return endstr;
        };
        /**
         * 货币格式转为普通字符串
         * @param str {string} 货币格式
         */
        StringUtils.formatCurrencyNomal = function (str) {
            if (str.indexOf("万") >= 0) {
                str = str.slice(0, str.length - 1);
                str += "0000";
            }
            if (str.indexOf(",") >= 0) {
                var arr = str.split(",");
                str = "";
                for (var i = 0; i < arr.length; i++) {
                    str += arr[i];
                }
            }
            return str;
        };
        /**
         *以"mm:ss"的格式返回时间
         * @param t
         * @return
         *
         */
        StringUtils.formatMMSS = function (second) {
            var m = Math.floor(second / 60) + "";
            var s = second % 60 + "";
            if (m.length < 2)
                m = "0" + m;
            if (s.length < 2)
                s = "0" + s;
            return m + ":" + s;
        };
        /**
         * 以"hh:mm:ss"的格式返回时间
         * @param t
         * @return
         *
         */
        StringUtils.formatHHMMSS = function (second, splitTag) {
            if (splitTag === void 0) { splitTag = ":"; }
            var h = Math.floor(second / 60 / 60) + "";
            var m = (Math.floor(second / 60) - parseInt(h) * 60) + "";
            var s = second % 60 + "";
            if (h.length < 2)
                h = "0" + h;
            if (m.length < 2)
                m = "0" + m;
            if (s.length < 2)
                s = "0" + s;
            return h + splitTag + m + splitTag + s;
        };
        /**
         * 是否是网络地址
         * @param url
         * @returns {boolean}
         */
        StringUtils.isNetUrl = function (url) {
            return url.indexOf("http://") != -1 || url.indexOf("HTTP://") != -1 || url.indexOf("https://") != -1 || url.indexOf("HTTPS://") != -1;
        };
        StringUtils.formatDDHHMMSS = function (second, splitTag) {
            if (splitTag === void 0) { splitTag = ":"; }
            var lessTime = second;
            var d = "";
            var h = "";
            var m = "";
            var s = "";
            var dsplit = "天";
            var hsplit = "时";
            var msplit = "分";
            d = Math.floor(lessTime / 60 / 60 / 24) + "";
            lessTime -= parseInt(d) * 24 * 60 * 60;
            if (lessTime > 0)
                h = Number(lessTime / 60 / 60) + "";
            lessTime -= parseInt(h) * 60 * 60;
            if (lessTime > 0)
                m = Math.floor(lessTime / 60) + "";
            lessTime -= parseInt(m) * 60;
            if (lessTime > 0)
                s = second % 60 + "";
            if (d.length < 2)
                d = "0" + d;
            if (h.length < 2)
                h = "0" + h;
            if (m.length < 2)
                m = "0" + m;
            if (s.length < 2)
                s = "0" + s;
            if (splitTag == "天")
                return d + dsplit + h + hsplit + m + msplit + s;
            return d + splitTag + h + splitTag + m + splitTag + s;
        };
        /**
         * 字符串键值对方式转为json
         * @param str
         */
        StringUtils.getVariables = function (str) {
            var data = str.split("=");
            var obj = {};
            var i = 0;
            while (i < data.length) {
                obj[data[i]] = data[i + 1];
                i += 2;
            }
            return obj;
        };
        //public static deformatTime(timeStr: string): number {
        //    var str: string;
        //    return str;
        //}
        /**
         * 字符串实际长度获取方法
         * @param str
         */
        //public static getStrRealLngth(str: string): any {
        //    var grl = { GetLength: null };
        //    grl.GetLength = function (str) {
        //        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;  //先把中文替换成两个字节的英文，在计算长度
        //    };
        //    return grl.GetLength;
        //}
        StringUtils.prototype.getStrRealLngth = function (str) {
            var k = str.length, b = 0;
            if (k) {
                for (var i = 0; i < k; i++) {
                    if (str.charCodeAt(i) > 255) {
                        b += 2;
                    }
                    else {
                        b = b + 1;
                    }
                }
                return b;
            }
            else {
                return 0;
            }
        };
        return StringUtils;
    }());
    uniLib.StringUtils = StringUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var TimerBase = /** @class */ (function () {
        function TimerBase(_delay, call, thisObj, loop) {
            if (loop === void 0) { loop = 0; }
            this.loopLimit = 0;
            this.last = 0;
            this.jumped = 0;
            this.isStart = false;
            this.begin = 0;
            this.maxRandNum = 30;
            this.delay = _delay;
            this.callFun = call;
            this._thisObj = thisObj;
            this.loopLimit = loop;
        }
        TimerBase.prototype.stop = function () {
            if (TimerBase.timerlists.indexOf(this) != -1) {
                this.isStart = false;
                TimerBase.timerlists.splice(TimerBase.timerlists.indexOf(this), 1);
            }
        };
        TimerBase.prototype.start = function (maxrandnum) {
            if (maxrandnum === void 0) { maxrandnum = 30; }
            if (TimerBase.timer == null) {
                TimerBase.timerNumber = 0;
                TimerBase.timer = new egret.Timer(10);
                TimerBase.timer.addEventListener(egret.TimerEvent.TIMER, TimerBase.timerHandler, TimerBase);
                TimerBase.timer.start();
            }
            this.maxRandNum = maxrandnum;
            this.isStart = true;
            this.current = this.delay;
            this.last = egret.getTimer();
            this.begin = this.last;
            this.jumped = 0;
            TimerBase.timerlists.push(this);
        };
        TimerBase.prototype.remain = function () {
            return this.current;
        };
        TimerBase.prototype.needRender = function () {
            if (!this.isStart) {
                return 0;
            }
            this.current = this.current - (egret.getTimer() - this.last);
            this.last = egret.getTimer();
            var rende = (this.last - this.begin) / this.delay;
            return rende - this.jumped;
        };
        TimerBase.prototype.excute = function () {
            this.jumped++;
            if (this.loopLimit != 0 && this.jumped > this.loopLimit) {
                this.stop();
            }
            this.current = this.delay;
            //this.callFun.bind(this._thisObj);
            //ConsoleManager.log(this._thisObj);
            //ConsoleManager.log(this._thisObj.callFun);
            this.callFun.call(this._thisObj);
        };
        TimerBase.timerHandler = function () {
            var time;
            var rendNum = 0;
            var j = 0;
            var i = 0;
            while (i < TimerBase.timerlists.length) {
                time = TimerBase.timerlists[i];
                i++;
                rendNum = time.needRender();
                if (rendNum > time.maxRandNum) {
                    rendNum = time.maxRandNum;
                }
                j = 0;
                while (j < rendNum) {
                    j++;
                    time.excute();
                }
            }
        };
        TimerBase.TIMERBASE_DELAY = 10;
        TimerBase.timerNumber = 0;
        TimerBase.timerlists = [];
        return TimerBase;
    }());
    uniLib.TimerBase = TimerBase;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var TipsUtils = /** @class */ (function () {
        function TipsUtils() {
            this.exmls = "";
        }
        //从下到上弹出
        TipsUtils.showTipsDownToUp = function (str, isWarning) {
            if (str === void 0) { str = ""; }
            if (isWarning === void 0) { isWarning = false; }
            var effectTips;
            if (typeof (str) == "string") {
                effectTips = new egret.TextField();
                effectTips.size = 24;
                if (isWarning) {
                    effectTips.textColor = uniLib.Global.TextColors.red;
                }
                else {
                    effectTips.textColor = uniLib.Global.TextColors.green;
                }
                effectTips.alpha = 0;
                effectTips.text = str;
                effectTips.strokeColor = 0x000000;
                effectTips.stroke = 2;
                effectTips.bold = true;
                effectTips.textAlign = egret.HorizontalAlign.CENTER;
            }
            else
                effectTips = str;
            effectTips.y = egret.MainContext.instance.stage.stageHeight / 2;
            effectTips.x = egret.MainContext.instance.stage.stageWidth / 2 - effectTips.width / 2;
            if (uniLib.SceneMgr.instance.currentScene != null && uniLib.SceneMgr.instance.currentScene.tipsLayer != null) {
                if (!uniLib.SceneMgr.instance.currentScene.tipsLayer.contains(effectTips)) {
                    uniLib.SceneMgr.instance.currentScene.tipsLayer.addChild(effectTips);
                }
            }
            else {
                //if (Global.stage)
                //    Global.stage.addChild(effectTips);
                egret.MainContext.instance.stage.addChild(effectTips);
            }
            var onComplete2 = function () {
                //if (SceneMgr.instance.currentScene != null) {
                //    if (!SceneMgr.instance.currentScene.tipsLayer.contains(effectTips)) {
                //        SceneMgr.instance.currentScene.tipsLayer.removeChild(effectTips);
                //    }
                //} else {
                //    //if (Global.stage)
                //    //    Global.stage.removeChild(effectTips);
                //    egret.MainContext.instance.stage.removeChild(effectTips);
                //}
                uniLib.DisplayUtils.removeFromParent(effectTips);
                effectTips = null;
            };
            var onComplete1 = function () {
                egret.Tween.get(effectTips).to({ y: effectTips.y - 50, alpha: 0 }, 500).call(onComplete2, this);
            };
            effectTips.visible = true;
            egret.Tween.get(effectTips).to({ y: effectTips.y - 120, alpha: 1 }, 800, egret.Ease.backOut).wait(2000).call(onComplete1, this);
        };
        //从左至右 或者 从右至左
        TipsUtils.showTipsLeftOrRight = function (str, isWarning, isFromeLeft) {
            if (str === void 0) { str = ""; }
            if (isWarning === void 0) { isWarning = false; }
            if (isFromeLeft === void 0) { isFromeLeft = true; }
            var effectTips;
            if (typeof (str) == "string") {
                effectTips = new egret.TextField();
                effectTips.size = 24;
                if (isWarning) {
                    effectTips.textColor = uniLib.Global.TextColors.red;
                }
                else {
                    effectTips.textColor = uniLib.Global.TextColors.green;
                }
                effectTips.alpha = 0;
                effectTips.text = str;
                effectTips.strokeColor = 0x000000;
                effectTips.stroke = 2;
                effectTips.bold = true;
                effectTips.textAlign = egret.HorizontalAlign.CENTER;
            }
            else
                effectTips = str;
            if (isFromeLeft) {
                effectTips.x = -effectTips.width;
            }
            else {
                effectTips.x = uniLib.Global.screenWidth;
            }
            effectTips.y = uniLib.Global.screenHeight / 2;
            if (!uniLib.SceneMgr.instance.currentScene.tipsLayer.contains(effectTips)) {
                uniLib.SceneMgr.instance.currentScene.tipsLayer.addChild(effectTips);
            }
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: uniLib.Global.screenWidth / 2 - effectTips.width / 2 - 50, alpha: 1 }, 300, egret.Ease.sineInOut);
            }
            else {
                egret.Tween.get(effectTips).to({ x: uniLib.Global.screenHeight / 2 - effectTips.width / 2 + 50, alpha: 1 }, 300, egret.Ease.sineInOut);
            }
            egret.setTimeout(function () {
                if (isFromeLeft) {
                    egret.Tween.get(effectTips).to({ x: effectTips.x + 100 }, 500);
                }
                else {
                    egret.Tween.get(effectTips).to({ x: effectTips.x - 100 }, 500);
                }
            }, this, 300);
            egret.setTimeout(function () {
                if (isFromeLeft) {
                    egret.Tween.get(effectTips).to({ x: uniLib.Global.screenWidth }, 300, egret.Ease.sineIn);
                }
                else {
                    egret.Tween.get(effectTips).to({ x: -effectTips.width }, 300, egret.Ease.sineIn);
                }
            }, this, 800);
            egret.setTimeout(function () {
                if (uniLib.SceneMgr.instance.currentScene.tipsLayer.contains(effectTips)) {
                    uniLib.SceneMgr.instance.currentScene.tipsLayer.removeChild(effectTips);
                    effectTips = null;
                }
            }, this, 1100);
        };
        //从里到外
        TipsUtils.showTipsFromCenter = function (str, isWarning) {
            if (str === void 0) { str = ""; }
            if (isWarning === void 0) { isWarning = false; }
            var effectTips;
            if (typeof (str) == "string") {
                effectTips = new egret.TextField();
                effectTips.size = 24;
                if (isWarning) {
                    effectTips.textColor = uniLib.Global.TextColors.red;
                }
                else {
                    effectTips.textColor = uniLib.Global.TextColors.green;
                }
                effectTips.alpha = 0;
                effectTips.text = str;
                effectTips.strokeColor = 0x000000;
                effectTips.stroke = 2;
                effectTips.bold = true;
                effectTips.textAlign = egret.HorizontalAlign.CENTER;
            }
            else
                effectTips = str;
            effectTips.y = uniLib.Global.screenHeight / 2;
            effectTips.scaleX = 0;
            effectTips.scaleY = 0;
            effectTips.anchorOffsetX = effectTips.width >> 1;
            effectTips.anchorOffsetY = effectTips.height >> 1;
            effectTips.x = uniLib.Global.screenWidth / 2;
            if (!uniLib.SceneMgr.instance.currentScene.tipsLayer.contains(effectTips)) {
                uniLib.SceneMgr.instance.currentScene.tipsLayer.addChild(effectTips);
            }
            var onComplete2 = function () {
                if (uniLib.SceneMgr.instance.currentScene.tipsLayer.contains(effectTips)) {
                    uniLib.SceneMgr.instance.currentScene.tipsLayer.removeChild(effectTips);
                    effectTips = null;
                }
            };
            egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
            egret.setTimeout(function () {
                egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
            }, this, 1000);
        };
        //从外到里
        TipsUtils.showTipsBigToSmall = function (str, isWarning) {
            if (str === void 0) { str = ""; }
            if (isWarning === void 0) { isWarning = false; }
            var effectTips;
            if (typeof (str) == "string") {
                effectTips = new egret.TextField();
                effectTips.size = 24;
                if (isWarning) {
                    effectTips.textColor = uniLib.Global.TextColors.red;
                }
                else {
                    effectTips.textColor = uniLib.Global.TextColors.green;
                }
                effectTips.alpha = 0;
                effectTips.text = str;
                effectTips.strokeColor = 0x000000;
                effectTips.stroke = 2;
                effectTips.bold = true;
                effectTips.textAlign = egret.HorizontalAlign.CENTER;
            }
            else
                effectTips = str;
            effectTips.y = uniLib.Global.screenHeight / 2;
            effectTips.anchorOffsetX = effectTips.width >> 1;
            effectTips.anchorOffsetY = effectTips.height >> 1;
            effectTips.scaleX = 4;
            effectTips.scaleY = 4;
            effectTips.x = uniLib.Global.screenWidth / 2;
            if (!uniLib.SceneMgr.instance.currentScene.tipsLayer.contains(effectTips)) {
                uniLib.SceneMgr.instance.currentScene.tipsLayer.addChild(effectTips);
            }
            var onComplete2 = function () {
                if (uniLib.SceneMgr.instance.currentScene.tipsLayer.contains(effectTips)) {
                    uniLib.SceneMgr.instance.currentScene.tipsLayer.removeChild(effectTips);
                    effectTips = null;
                }
            };
            egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
            egret.setTimeout(function () {
                egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
            }, this, 1000);
        };
        return TipsUtils;
    }());
    uniLib.TipsUtils = TipsUtils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.setLocalStorage = function (ky, info) {
            if (uniLib.Global.nativeStorage) {
                uniLib.Global.nativeStorage.save({
                    key: ky,
                    id: ky,
                    rawData: info,
                    expires: null
                });
            }
            else if (window["localStorage"]) {
                localStorage.setItem(ky, info);
            }
            else if (window["document"] && window["document"].cookie) {
                uniLib.BrowersUtils.setCookie(ky, info);
            }
            else if (egret) {
                egret.localStorage.setItem(ky, info);
            }
        };
        Utils.getLocalStorage = function (ky, onGetCallBack) {
            var data;
            if (uniLib.Global.nativeStorage) {
                uniLib.Global.nativeStorage.load({
                    key: ky,
                    id: ky,
                    autoSync: true,
                    syncInBackground: true
                }).then(function (ret) {
                    //如果找到数据，则在then方法中返回
                    onGetCallBack(ret);
                }).catch(function (err) {
                    onGetCallBack(null);
                });
            }
            else if (window["localStorage"]) {
                data = localStorage.getItem(ky);
                if (data != null) {
                    data = decodeURIComponent(data);
                }
                if (onGetCallBack) {
                    onGetCallBack(data);
                }
                return data;
            }
            else if (window["document"] && window["document"].cookie) {
                data = uniLib.BrowersUtils.getCookie(ky);
                if (data != null) {
                    data = decodeURIComponent(data);
                }
                if (onGetCallBack) {
                    onGetCallBack(data);
                }
                return data;
            }
            else if (egret) {
                data = egret.localStorage.getItem(ky);
                if (data != null) {
                    data = decodeURIComponent(data);
                }
                if (onGetCallBack) {
                    onGetCallBack(data);
                }
                return data;
            }
            else {
                if (onGetCallBack) {
                    onGetCallBack(null);
                }
                return null;
            }
        };
        Utils.clearLocalStorage = function (ky) {
            try {
                if (uniLib.Global.lobbyMode == true && uniLib.Global.isInGame == true) {
                    return;
                }
                if (ky) {
                    if (uniLib.Global.nativeStorage) {
                        uniLib.Global.nativeStorage.remove({
                            key: ky
                            //id: ky,
                        });
                    }
                    else if (window["localStorage"]) {
                        localStorage.removeItem(ky);
                    }
                    else if (window["document"] && window["document"].cookie) {
                        uniLib.BrowersUtils.delCookie(ky);
                    }
                    else if (egret) {
                        egret.localStorage.removeItem(ky);
                    }
                }
                else {
                    if (uniLib.Global.nativeStorage) {
                        uniLib.Global.nativeStorage.clearMap();
                    }
                    else if (window["localStorage"]) {
                        localStorage.clear();
                    }
                    else if (window["document"] && window["document"].cookie) {
                        uniLib.BrowersUtils.delCookie();
                    }
                    else if (egret) {
                        egret.localStorage.clear();
                    }
                }
            }
            catch (e) {
            }
        };
        Utils.sortJson = function (old) {
            if (typeof (old) !== 'object' || old === null) {
                return old;
            }
            var copy = Array.isArray(old) ? [] : {};
            var keys = Object.keys(old).sort();
            keys.forEach(function (key) {
                copy[key] = Utils.sortJson(old[key]);
            });
            return copy;
        };
        Utils.isIOS = function () {
            if (uniLib.Global.isH5 == false && egret.Capabilities.os == "iOS")
                return true;
            return false;
        };
        Utils.isAndroid = function () {
            if (uniLib.Global.isH5 == false && egret.Capabilities.os == "Android")
                return true;
            return false;
        };
        Utils.restart = function (str, yes, no) {
            var self = this;
            var old = self.isrebooting;
            self.isrebooting = true;
            if (uniLib.Global.isH5 == true) {
                var r = confirm(str);
                if (r == true) {
                    if (uniLib.Global.reLoginUrl != "") {
                        uniLib.BrowersUtils.redirect(uniLib.Global.reLoginUrl);
                    }
                    else {
                        uniLib.BrowersUtils.reload();
                    }
                }
                else {
                    self.isrebooting = false;
                    alert("取消重启");
                }
            }
            else {
                if (!old) {
                    uniLib.Global.dispatchEvent(uniLib.ZqEvent.ON_RESTART, [str, yes, no]);
                }
                //ZQGameSdk.restart(str, confirm);
            }
        };
        Utils.getCachedPlatInfo = function (onGetCached, gameId, platid, thisObj) {
            if (platid === void 0) { platid = 0; }
            uniLib.Global.platId = platid;
            uniLib.Global.gameId = gameId;
            return uniLib.Global.getPlatToken(onGetCached, thisObj);
        };
        /**
         * 生成url二维码
         * @param url 需要生成二维码的url
         * @param onGet 获取到后的回调函数
         * @param logo 暂时没有支持
         */
        Utils.getUrlQrCode = function (url, onGet, logo) {
            var logoUrl = "";
            var qrcodeurl;
            this.getShortUrl(url, function (url) {
                qrcodeurl = "http://qr.liantu.com/api.php?text=" + url;
                onGet(qrcodeurl);
            });
        };
        Utils.getShortUrl = function (url, onGet) {
            var request = new uniLib.HttpRequest(function (data) {
                if (onGet && data.status == 0) {
                    onGet(data.tinyurl);
                }
            });
            request.open("http://dwz.cn/create.php");
            request.send("url=" + url);
        };
        /**
         * 获取两个经纬度之间的距离
         * @param lat1 纬度1
         * @param lng1 经度1
         * @param lat2 纬度2
         * @param lng2 经度2
         */
        Utils.getDistance = function (lat1, lng1, lat2, lng2) {
            if ((Math.abs(lat1) > 90) || (Math.abs(lat2) > 90)) {
                return 0;
            }
            if ((Math.abs(lng1) > 180) || (Math.abs(lng2) > 180)) {
                return 0;
            }
            var radLat1 = this.rad(lat1);
            var radLat2 = this.rad(lat2);
            var a = radLat1 - radLat2;
            var b = this.rad(lng1) - this.rad(lng2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * this.EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000;
            return s;
        };
        Utils.rad = function (d) {
            return d * Math.PI / 180.0;
        };
        Utils.isrebooting = false;
        Utils.EARTH_RADIUS = 6378137;
        return Utils;
    }());
    uniLib.Utils = Utils;
})(uniLib || (uniLib = {}));

var uniLib;
(function (uniLib) {
    var Location = /** @class */ (function () {
        function Location() {
        }
        return Location;
    }());
    uniLib.Location = Location;
    /**
     * 加群信息
     */
    var QQGroupInfo = /** @class */ (function () {
        function QQGroupInfo() {
        }
        return QQGroupInfo;
    }());
    uniLib.QQGroupInfo = QQGroupInfo;
    var ZQGameSdk = /** @class */ (function () {
        function ZQGameSdk() {
        }
        ZQGameSdk.init = function (call, thisObj, cfg) {
            if (this.isInited == true) {
                return;
            }
            this.isInited = true;
            var _self = this;
            egret.ExternalInterface.addCallback(ZQGameSdk.SENDTOJS, function (message) {
                // uniLib.Console.log("message form native : " + message);//message form native : message from native
                ZQGameSdk.onNativeMessage(message);
            });
            if (call /* && this._callBacks[this.INIT] == null*/) {
                this._callBacks[this.INIT] = [call, thisObj];
            }
            var data = new ZQGameObj();
            data.cmd = ZQGameSdk.INIT;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(data));
            this.wxinit();
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RESTART, this.onRestart, this);
            if (uniLib.Global.isH5 && call) {
                var res = void 0;
                if (cfg) {
                    res = cfg;
                }
                else {
                    res = RES.getRes("config_json");
                }
                if (res) {
                    if (res[uniLib.Global.appId]) {
                        uniLib.Global.gameConfig = res[uniLib.Global.appId];
                    }
                    else {
                        for (var str in res) {
                            if (str.indexOf(uniLib.Global.appId) >= 0) {
                                uniLib.Global.gameConfig = res[str];
                                break;
                            }
                        }
                    }
                    uniLib.Global.defaultConfig = uniLib.Global.gameConfig;
                    // if (Global.isWxGame() == true) {
                    //     wx.login({
                    //         success: function () {
                    //             wx.getUserInfo({
                    //                 fail: function (res) {
                    //                     // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                    //                     if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
                    //                         // 处理用户拒绝授权的情况
                    //                     }
                    //                 }
                    //             })
                    //         }
                    //     })
                    // } else {
                    // }
                    call.call(thisObj, uniLib.Global.gameConfig);
                }
                else {
                    call.call(thisObj);
                }
            }
        };
        ZQGameSdk.onRestart = function (e) {
            var data = e.param;
            var desc;
            var config;
            var cacel;
            if (data[0])
                desc = data[0];
            if (data[1])
                config = data[1];
            if (data[2])
                cacel = data[2];
            this.restart(desc, config, cacel);
        };
        ZQGameSdk.onNativeMessage = function (value) {
            //try {
            //console.error("from native:"+value);
            var msg = JSON.parse(value);
            //console.error("msg cmd:" + msg.cmd);
            if (msg.cmd) {
                console.error("call func Name:" + msg.cmd);
                if (msg.cmd == this.CALL_STATE) {
                    if (msg.data.callState == "callDisconnected") {
                        this._callState = CallState.DISCONNECTED;
                    }
                    else {
                        this._callState = CallState.CONNECTED;
                    }
                }
                if (msg.cmd == this.LOCATIONINFO) {
                    if (msg.code == 0) {
                        if (msg.data) {
                            ZQGameSdk.location.lng = Number(msg.data.longitude);
                            ZQGameSdk.location.lat = Number(msg.data.latitude);
                        }
                    }
                }
                if (msg.cmd == this.RECORD_STOP) {
                    if (msg.data && msg.data.voiceDuration) {
                        uniLib.SoundMgr.instance.pauseBgMusic();
                        uniLib.SoundMgr.instance.soundPause = true;
                        setTimeout(function () {
                            uniLib.SoundMgr.instance.resumeBgMusic();
                            uniLib.SoundMgr.instance.soundPause = false;
                        }, msg.data.voiceDuration);
                    }
                    else {
                        uniLib.SoundMgr.instance.resumeBgMusic();
                        uniLib.SoundMgr.instance.soundPause = false;
                    }
                }
                if (msg.cmd == this.INIT) {
                    uniLib.Global.bundleId = msg.data.bundleId;
                    //uniLib.Global.defaultConfig = msg.data.bundleInfo;
                    if (msg.data) {
                        uniLib.Global.zipmd5 = msg.data.zipmd5;
                        if (msg.data && msg.data.bundleInfo) {
                            this.updateBundleCfg(msg.data.bundleInfo);
                        }
                    }
                }
                if (msg.cmd == this.UPDATE_CFG) {
                    if (msg.state == 0 && msg.data && msg.data.config) {
                        uniLib.Global.gameConfig = msg.data.config;
                        uniLib.Global.payPlatId = msg.data.config.pay_platid;
                        uniLib.Global.platId = msg.data.config.platid;
                        uniLib.Global.configmd5 = uniLib.StringUtils.MD5(JSON.stringify(uniLib.Utils.sortJson(msg.data.config)));
                    }
                }
                if (this._callBacks[msg.cmd]) {
                    //console.error(value);
                    if (this._callBacks[msg.cmd][1] && this._callBacks[msg.cmd][1] != null) {
                        this._callBacks[msg.cmd][0].call(this._callBacks[msg.cmd][1], msg);
                    }
                    else {
                        if (this._callBacks[msg.cmd][0])
                            this._callBacks[msg.cmd][0](msg);
                        uniLib.Global.dispatchEvent(uniLib.ZqEvent.NATIVE_TO_EGERET, msg);
                    }
                }
                else {
                    uniLib.Global.dispatchEvent(uniLib.ZqEvent.NATIVE_TO_EGERET, msg);
                }
                if (msg.cmd == this.LOGIN) {
                    this.hideVk();
                    if (this._callBacks[this.LOGIN]) {
                        this._callBacks[this.LOGIN] = null;
                        delete this._callBacks[this.LOGIN];
                    }
                    // if (this._callBacks[this.LOGOUT]) {
                    //     this._callBacks[this.LOGOUT] = null;
                    //     delete this._callBacks[this.LOGOUT];
                    // }
                }
                else if (msg.cmd == this.NETSTATE) {
                    ZQGameSdk.lastNetState = msg;
                    if (msg.data[ZQGameSdk.NETSTATE]) {
                        ZQGameSdk.netState = msg.data[ZQGameSdk.NETSTATE];
                    }
                    if (ZQGameSdk.lastNetState.data && !ZQGameSdk.lastNetState.data[msg.cmd]) {
                        ZQGameSdk.lastNetState.data[msg.cmd] = 0;
                    }
                }
                else if (msg.cmd == this.UPDATE_CFG) {
                    for (var str in msg.data) {
                        uniLib.Global.defaultConfig[str] = msg.data[str];
                        uniLib.Global.gameConfig[str] = msg.data[str];
                    }
                }
            }
            //} catch (error) {
            //    console.error("接收消息出错:" + value)
            //}
        };
        /**
         * 初始化微信
         */
        ZQGameSdk.wxinit = function (wxappid) {
            var data = new ZQGameObj();
            data.cmd = ZQGameSdk.initWX;
            if (wxappid) {
                data.data = {};
                data.data.wxappid = wxappid;
            }
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(data));
        };
        /**
         * 登录
         */
        ZQGameSdk.Login = function (onLogin, onLogout, thisObj, loginData) {
            if (thisObj && thisObj != null) {
                if (onLogin && onLogin != null && this._callBacks[this.LOGIN] == null) {
                    this._callBacks[this.LOGIN] = [onLogin, thisObj];
                }
                if (onLogout && onLogout != null && this._callBacks[this.LOGOUT] == null) {
                    this._callBacks[this.LOGOUT] = [onLogout, thisObj];
                }
            }
            var ret = {};
            ret.cmd = ZQGameSdk.LOGIN;
            //if (loginData && loginData != null) {
            ret.data = {};
            if (typeof (loginData) == "number" || typeof (loginData) == "string") {
                ret.data.platid = loginData;
            }
            else if (loginData && loginData.platid) {
                ret.data.platid = loginData.platid;
            }
            else {
                ret.data = null;
            }
            if (loginData) {
                var code = uniLib.BrowersUtils.GetRequest("code");
                if (loginData == -1 || loginData.platid == 0 || !uniLib.StringUtils.stringIsNullOrEmpty(code)) {
                    ret.code = 0;
                    ret.data = {};
                    if (loginData == -1) {
                        ret.data.platid = 0;
                        ret.data.payplatid = 0;
                    }
                    else if (typeof (loginData) == "object") {
                        ret.data.platid = loginData.platid;
                        ret.data.payplatid = loginData.payplatid;
                    }
                    else if (code) {
                        if (uniLib.Global.gameConfig) {
                            ret.data.platid = uniLib.Global.gameConfig.platid;
                            if (uniLib.Global.gameConfig.payplatid) {
                                ret.data.payplatid = uniLib.Global.gameConfig.payplatid;
                            }
                            else {
                                ret.data.payplatid = uniLib.Global.gameConfig.platid;
                            }
                        }
                        if (uniLib.Global.appId) {
                            ret.data.appid = uniLib.Global.appId;
                        }
                        ret.data.session = code;
                    }
                    if (onLogin) {
                        if (thisObj) {
                            onLogin.call(thisObj, ret);
                        }
                        else {
                            onLogin(ret);
                        }
                    }
                    return;
                }
            }
            //} else {
            //    data.data = 0;
            //} 
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(ret));
        };
        ZQGameSdk.Logout = function () {
            var data = new ZQGameObj();
            data.cmd = ZQGameSdk.LOGOUT;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(data));
        };
        ZQGameSdk.exit = function () {
            var data = new ZQGameObj();
            data.cmd = ZQGameSdk.EXITGAME;
            data.data = true;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(data));
        };
        ZQGameSdk.restart = function (desc, confirm, cancel) {
            if (!cancel) {
                uniLib.NetMgr.closeSocket();
                //if (uniLib["SoundMgr"]) {
                //    uniLib["SoundMgr"].instance.stopBgMusic();
                //    uniLib["SoundMgr"].instance.stopSounds();
                //}
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.RESTART;
            var data = {};
            data.desc = desc;
            data.confirm = confirm ? confirm : "确定";
            data.cancel = cancel ? cancel : "";
            msg.data = data;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.update = function (data) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.UPDATE;
            msg.data = data;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 支付
         */
        ZQGameSdk.pay = function (data, call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.PAY] == null) {
                    this._callBacks[this.PAY] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.PAY;
            msg.data = data;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 使用pmd协议直接进行支付操作
         * @param data
         * @param call
         * @param thisObj
         */
        ZQGameSdk.payByPmd = function (data, call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.PAY_PMD] == null) {
                    this._callBacks[this.PAY_PMD] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.PAY_PMD;
            msg.data = data;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.share = function (data, call, thisObj) {
            this.wxinit();
            if (call && call != null) {
                if (call && call != null) {
                    this._callBacks[this.SHARE] = [call, thisObj];
                }
            }
            if (ZQGameSdk.defaultWXShareVo) {
                if (!data.webpageUrl) {
                    data.webpageUrl = ZQGameSdk.defaultWXShareVo.webpageUrl;
                }
                if (!data.title) {
                    data.title = ZQGameSdk.defaultWXShareVo.title;
                }
                if (!data.description) {
                    data.description = ZQGameSdk.defaultWXShareVo.description;
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.SHARE;
            msg.data = data;
            uniLib.Console.log(JSON.stringify(msg));
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /*
        *uid
        */
        ZQGameSdk.recordInit = function (data, call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.RECORD_INIT] == null) {
                    this._callBacks[this.RECORD_INIT] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.RECORD_INIT;
            msg.data = data;
            uniLib.Console.log(JSON.stringify(msg));
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        // public static lastRecordTaggle:boolean=false;
        ZQGameSdk.startRecord = function (call, thisObj) {
            this.lastRecordTime = new Date().getTime();
            if (this.canRecord == false) {
                return;
            }
            this.canRecord = false;
            uniLib.SoundMgr.instance.pauseBgMusic();
            uniLib.SoundMgr.instance.soundPause = true;
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.RECORD_START] == null) {
                    this._callBacks[this.RECORD_START] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.RECORD_START;
            uniLib.Console.log("startRecord:" + JSON.stringify(msg));
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.stopRecord = function (call, thisObj) {
            this.canRecord = true;
            if (call && call != null) {
                if (call && call != null /* && this._callBacks[this.RECORD_STOP] == null*/) {
                    this._callBacks[this.RECORD_STOP] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.RECORD_STOP;
            uniLib.Console.log("stopRecord:" + JSON.stringify(msg));
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
            // if (new Date().getTime() - this.lastRecordTime < 1000) {
            uniLib.SoundMgr.instance.resumeBgMusic();
            uniLib.SoundMgr.instance.soundPause = false;
            // }
            if (egret.Capabilities.supportVersion < "3.2.6") {
                this.speakerActive();
            }
        };
        ZQGameSdk.playRecord = function (recordId, call, thisObj) {
            if (call && call != null) {
                if (call && call != null) {
                    this._callBacks[this.RECORD_PLAY] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.RECORD_PLAY;
            msg.data = recordId;
            uniLib.Console.log("playRecord:" + JSON.stringify(msg));
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.stopPlayRecord = function (recordId, call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.RECORD_PLAY_STOP] == null) {
                    this._callBacks[this.RECORD_PLAY_STOP] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.RECORD_PLAY_STOP;
            msg.data = recordId;
            uniLib.Console.log(JSON.stringify(msg));
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.xfSpeechInit = function (appId, call, thisObj, data) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.XF_SPEECH_INIT] == null) {
                    this._callBacks[this.XF_SPEECH_INIT] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.XF_SPEECH_INIT;
            msg.data = {};
            msg.data.appId = appId;
            msg.data.setParam = data;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        // public static xfSpeechABNStart(resultCall?: Function, endCall?: Function, thisObj?: any,data?:XFSetParam): void {
        //     if (resultCall && resultCall != null) {
        //         if (this._callBacks[this.XF_SPEECH_RESULT] == null) {
        //             this._callBacks[this.XF_SPEECH_RESULT] = [resultCall, thisObj];
        //         }
        //     }
        //     if (endCall && endCall != null) {
        //         if (endCall && endCall != null && this._callBacks[this.XF_SPEECH_END] == null) {
        //             this._callBacks[this.XF_SPEECH_END] = [endCall, thisObj];
        //         }
        //     }
        //     var msg: ZQGameObj = new ZQGameObj();
        //     msg.cmd = ZQGameSdk.XF_ABN_START;
        //     msg.data = data;
        //     egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        // }
        /**
         * 上传用户词表
         */
        ZQGameSdk.xfUpdateWords = function (words, call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.XF_WORDS_UP] == null) {
                    this._callBacks[this.XF_WORDS_UP] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.XF_WORDS_UP;
            msg.data = {};
            msg.data.words = words;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.xfUpLoadGrammer = function () {
        };
        ZQGameSdk.xfSpeechStart = function (resultCall, endCall, thisObj, data) {
            if (resultCall && resultCall != null) {
                if (this._callBacks[this.XF_SPEECH_RESULT] == null) {
                    this._callBacks[this.XF_SPEECH_RESULT] = [resultCall, thisObj];
                }
            }
            if (endCall && endCall != null) {
                if (endCall && endCall != null && this._callBacks[this.XF_SPEECH_END] == null) {
                    this._callBacks[this.XF_SPEECH_END] = [endCall, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.XF_SPEECH_START;
            msg.data = data;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.xfSpeechStop = function (call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.XF_SPEECH_START] == null) {
                    this._callBacks[this.XF_SPEECH_START] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.XF_SPEECH_STOP;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.xfSpeechCacel = function (call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.XF_SPEECH_START] == null) {
                    this._callBacks[this.XF_SPEECH_START] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.XF_SPEECH_CACEL;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        Object.defineProperty(ZQGameSdk, "landscape", {
            set: function (b) {
                var msg = new ZQGameObj();
                msg.cmd = ZQGameSdk.LANDSCAPE;
                msg.data = b;
                egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 打开网页
         */
        ZQGameSdk.openWeb = function (webUrl, model, webHeight, webWidth, webX, webY) {
            if (model === void 0) { model = 0; }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.OPENWEB;
            var data = {};
            data.webUrl = webUrl;
            if (webHeight)
                data.webHeight = webHeight;
            if (webWidth)
                data.webWidth = webWidth;
            if (webX)
                data.webX = webX;
            if (webY)
                data.webY = webY;
            if (model)
                data.model = model;
            else
                data.model = WEBMODEL.AUTO;
            msg.data = data;
            if (uniLib.Global.isH5 == true) {
                window.open(webUrl);
            }
            else {
                egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
            }
        };
        ZQGameSdk.prototype.regListenr = function () {
        };
        /**复制内容到剪切板 */
        ZQGameSdk.nativeCopyStr = function (str) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.NATIVECOPY;
            msg.data = {};
            msg.data.copyStr = str;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.getConfig = function (desc, url, confirm, cancel) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.GET_CONFIG;
            msg.data = {};
            if (url)
                msg.data.configUrl = url;
            msg.data.desc = desc;
            msg.data.confirm = confirm ? confirm : "确定";
            msg.data.cancel = cancel ? cancel : "";
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**获取剪切板的内容 */
        ZQGameSdk.getNaviveBoard = function (call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.NETSTATE] == null) {
                    this._callBacks[this.NETSTATE] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.GETNATIVEBOARD;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**获取网络连接类型 */
        ZQGameSdk.getNetStateType = function (call, thisObj, force) {
            if (this.lastGetNetStateTime == null) {
                this.lastGetNetStateTime = new Date().getTime();
            }
            else if (!force) {
                if (new Date().getTime() - this.lastGetNetStateTime <= 2000) {
                    return;
                }
                this.lastGetNetStateTime = new Date().getTime();
            }
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.NETSTATE] == null) {
                    this._callBacks[this.NETSTATE] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.NETSTATE;
            if (!uniLib.Utils.isIOS() || !uniLib.ZQGameSdk.lastNetState) {
                egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
            }
        };
        /**
         * 一键加QQ群
         */
        ZQGameSdk.joinQQGroup = function (data) {
            var msg = new ZQGameObj();
            msg.data = data;
            msg.cmd = ZQGameSdk.JOIN_QQ_GROUP;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 获取电话状态
         * @param call
         * @param thisObj
         */
        ZQGameSdk.getCallStatus = function (call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.CALL_STATE] == null) {
                    this._callBacks[this.CALL_STATE] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.CALL_STATE;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
            return this._callState;
        };
        /**获取电池剩余量 */
        ZQGameSdk.getBatteryPer = function (call, thisObj) {
            if (call && call != null) {
                if (call && call != null && this._callBacks[this.BATTERY] == null) {
                    this._callBacks[this.BATTERY] = [call, thisObj];
                }
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.BATTERY;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 本地消息推送
         * @param title
         * @param txt
         * @param time
         */
        ZQGameSdk.localPush = function (title, txt, time) {
            if (time === void 0) { time = 0; }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.LOCALPUSH;
            msg.data = {};
            msg.data.pushTitle = title;
            msg.data.pushMessage = txt;
            msg.data.pushTime = time.toString();
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 手机震动
         * @param sec 震动时间
         */
        ZQGameSdk.vibrate = function (msec) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.VIBRATE;
            msg.data = {};
            msg.data.delayTime = msec.toString();
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 激活扬声器
         */
        ZQGameSdk.speakerActive = function () {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.SPEAKERACTIVE;
            msg.data = {};
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 获取经纬度
         * @param onGetLocation 回调中包含经纬度字段：经度 longitude, 纬度 latitude
         * @param thisObj
         */
        ZQGameSdk.getLocation = function (onGetLocation, thisObj) {
            if (onGetLocation && onGetLocation != null && this._callBacks[this.LOCATIONINFO] == null) {
                this._callBacks[this.LOCATIONINFO] = [onGetLocation, thisObj];
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.LOCATIONINFO;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
            return ZQGameSdk.location;
        };
        /**
         * 更新zip包
         * @param zipName
         * @param zipBinStr
         * @param onUpdate
         * @param thisObj
         */
        ZQGameSdk.updateZip = function (zipJson, onUpdate, thisObj) {
            if (onUpdate && onUpdate != null && this._callBacks[this.UPDATE_ZIP] == null) {
                this._callBacks[this.UPDATE_ZIP] = [onUpdate, thisObj];
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.UPDATE_ZIP;
            msg.data = zipJson;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 打开手机相册
         * @param zipName
         * @param zipBinStr
         * @param onUpdate
         * @param thisObj
         * @param type  0 头像 1头像裁剪 2摄像头 3摄像头裁剪
         */
        ZQGameSdk.pickPhoto = function (call, thisObj, type) {
            if (type === void 0) { type = PICKPHOTO_TYPE.NORMAL; }
            if (call && call != null) {
                // if (call && call != null && this._callBacks[this.PICKPHOTO] == null) {
                this._callBacks[this.PICKPHOTO] = [call, thisObj];
                // }
            }
            if (uniLib.Global.isH5) {
                uniLib.H5Upload.selectImage(call, thisObj);
            }
            else {
                var msg = new ZQGameObj();
                msg.cmd = ZQGameSdk.PICKPHOTO;
                msg.code = type;
                msg.data = {};
                msg.data.code = type;
                egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
            }
        };
        /**
         * 更新Apk包
         * @param apkJson
         * @param onUpdate
         * @param thisObj
         */
        ZQGameSdk.updateApk = function (apkJson, onUpdate, thisObj) {
            if (onUpdate && onUpdate != null && this._callBacks[this.UPDATE_APK] == null) {
                this._callBacks[this.UPDATE_APK] = [onUpdate, thisObj];
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.UPDATE_APK;
            msg.data = apkJson;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 隐藏虚拟按键
         */
        ZQGameSdk.hideVk = function () {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.HIDE_VK;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * talkingdata自定义事件
         */
        ZQGameSdk.tdEvent = function (data) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.TD_EVENT;
            msg.data = data;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 埋点数据
         */
        ZQGameSdk.trackPoint = function (mark) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.TRACK_POINT;
            msg.data = mark;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 更新native层的config
         * @param state
         * @param onUpdate
         * @param thisObj
         */
        ZQGameSdk.updateCfg = function (cfg) {
            //if (onUpdate && onUpdate != null && this._callBacks[this.UPDATE_CFG] == null) {
            //    this._callBacks[this.UPDATE_CFG] = [onUpdate, thisObj];
            //}
            this.updateBundleCfg(cfg);
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.UPDATE_CFG;
            msg.data = {};
            msg.data.state = CONFIG_STATE.UPDATE;
            msg.data.config = cfg;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.updateBundleCfg = function (bundleConfig) {
            uniLib.Global.gameConfig = uniLib.Utils.sortJson(bundleConfig);
            if (uniLib.Global.gameConfig.lobbyId) {
                uniLib.Global.gameConfig.lobbyId = Number(uniLib.Global.gameConfig.lobbyId);
            }
            uniLib.Global.is_sandbox = uniLib.Global.gameConfig.is_sandbox;
            uniLib.Global.configmd5 = uniLib.StringUtils.MD5(JSON.stringify(uniLib.Global.gameConfig));
            //uniLib.Global.gameConfig = msg.data.bundleInfo;
            uniLib.Global.payPlatId = uniLib.Global.gameConfig.pay_platid;
            uniLib.Global.platId = uniLib.Global.gameConfig.platid;
            uniLib.Global.defaultConfig = uniLib.Global.gameConfig;
        };
        ZQGameSdk.pullCfg = function (onDown, thisObj) {
            if (onDown && onDown != null && this._callBacks[this.UPDATE_CFG] == null) {
                this._callBacks[this.UPDATE_CFG] = [onDown, thisObj];
            }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.UPDATE_CFG;
            msg.data = {};
            msg.data.state = CONFIG_STATE.DOWN;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 游密初始化
         */
        ZQGameSdk.ymInit = function (appKey, appSecret) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.YM_INIT;
            msg.data = {};
            msg.data.appKey = appKey;
            msg.data.appSecret = appSecret;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 游密加入房间
         */
        ZQGameSdk.ymJoin = function (uid, rid) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.YM_JOIN;
            msg.data = {};
            msg.data.uid = uid;
            msg.data.rid = rid;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 游密开始录视频
         */
        ZQGameSdk.ymStart = function () {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.YM_STAT;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 游密打开视频窗口
         */
        ZQGameSdk.ymOpen = function (uid, x, y, w, h, place) {
            if (place === void 0) { place = YM_PLACE.TOP; }
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.YM_OPEN;
            msg.data = {};
            msg.data.uid = uid;
            msg.data.x = x;
            msg.data.y = y;
            msg.data.w = w;
            msg.data.h = h;
            msg.data.place = place;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        /**
         * 游密关闭视屏窗口
         */
        ZQGameSdk.ymClose = function (uid) {
            var msg = new ZQGameObj();
            msg.cmd = ZQGameSdk.YM_OPEN;
            msg.data = {};
            msg.data.uid = uid;
            egret.ExternalInterface.call(ZQGameSdk.SENDTONATIVE, JSON.stringify(msg));
        };
        ZQGameSdk.SENDTONATIVE = "sendToNative";
        ZQGameSdk.SENDTOJS = "sendToJs";
        ZQGameSdk.INIT = "init";
        ZQGameSdk.INIT_APP_BUNDLE_INFO = "init_app_bundle_info";
        ZQGameSdk.LOGIN = "login";
        ZQGameSdk.initWX = "initWX";
        ZQGameSdk.LOGOUT = "logout";
        ZQGameSdk.PAY = "pay";
        ZQGameSdk.PAY_PMD = "pay_pmd";
        ZQGameSdk.SHARE = "share";
        ZQGameSdk.XF_SPEECH_TYPE_ISA = "isa"; //听写服务器
        ZQGameSdk.XF_SPEECH_TYPE_ASR = "asr"; //听写服务器
        ZQGameSdk.LANDSCAPE = "landscape";
        ZQGameSdk.RECORD_INIT = "recordInit"; //初始化呀呀语音数据
        ZQGameSdk.RECORD_START = "recordStart"; //录音开始
        ZQGameSdk.RECORD_STOP = "recordStop"; //录音停止
        ZQGameSdk.RECORD_PLAY = "recordPlay"; //播放录音
        ZQGameSdk.RECORD_PLAY_STOP = "recordPlayStop"; //停止播放
        ZQGameSdk.XF_SPEECH_INIT = "xfSpeechInit"; //初始化讯飞语音
        ZQGameSdk.XF_SPEECH_START = "xfSpeechStart"; //讯飞语音启动识别服务
        ZQGameSdk.XF_SPEECH_RESULT = "xfSpeechResult"; //讯飞语音启动识别服务
        ZQGameSdk.XF_SPEECH_VOL = "xfSpeechVol"; //讯飞语音音量大小回调
        ZQGameSdk.XF_SPEECH_STOP = "xfSpeechStop"; //讯飞停止语音服务
        ZQGameSdk.XF_SPEECH_CACEL = "xfSpeechCacel"; //讯飞停止语音服务
        ZQGameSdk.XF_SPEECH_END = "xfSpeechEnd"; //讯飞停止语音服务
        ZQGameSdk.XF_WORDS_UP = "xfWordsUp"; //讯飞上传词表
        ZQGameSdk.XF_ABN_START = "xfABNStart"; //讯飞开始识别命令词
        ZQGameSdk.CALL_STATE = "callState"; //电话状态
        ZQGameSdk.JOIN_QQ_GROUP = "QQGroupInfo"; //一键加QQ群
        ZQGameSdk.HOT_UPDATE = "hotUpdate";
        ZQGameSdk.PICKPHOTO = "pickPhoto";
        /**
        * 退出游戏
        */
        ZQGameSdk.EXITGAME = "exitGame";
        /**
       * 重启游戏
       */
        ZQGameSdk.RESTART = "restart";
        /**
        * 打开游戏的退出面板
        */
        ZQGameSdk.OPENEXIT = "openExit";
        /**
         * 打开网页
         */
        ZQGameSdk.OPENWEB = "openWeb";
        /**原生层复制功能 */
        ZQGameSdk.NATIVECOPY = "nativeCopy";
        /**获取剪切板 */
        ZQGameSdk.GETNATIVEBOARD = "getNativeBoard";
        /**网络状态更新 状态见NetState枚举值*/
        ZQGameSdk.NETSTATE = "netState";
        /**
         * 当前网络状态
         */
        ZQGameSdk.netState = 0;
        /**手机电池电量更新 */
        ZQGameSdk.BATTERY = "battery";
        /**本地推送 */
        ZQGameSdk.LOCALPUSH = "localPush";
        /**震动 */
        ZQGameSdk.VIBRATE = "vibrate";
        ZQGameSdk.SPEAKERACTIVE = "speakerActive";
        /**
         * 上传登录数据到原生层
         */
        ZQGameSdk.UPDATE = "update";
        ZQGameSdk.KEYDOWN = "keydown";
        ZQGameSdk.LOCATIONINFO = "locationInfo";
        /**
        * 更新zip包
        */
        ZQGameSdk.UPDATE_ZIP = "updateZip";
        /**
        * 强制更新apk
        */
        ZQGameSdk.UPDATE_APK = "updateApk";
        /**
        * 拉取config的开关
        */
        ZQGameSdk.UPDATE_CFG = "updateCfg";
        /**
        * 重启拉取最新配置
        */
        ZQGameSdk.GET_CONFIG = "getConfig";
        ZQGameSdk.YM_INIT = "ym_init";
        ZQGameSdk.YM_JOIN = "ym_join";
        ZQGameSdk.YM_STAT = "ym_stat";
        ZQGameSdk.YM_OPEN = "ym_open";
        ZQGameSdk.YM_CLSE = "ym_clse";
        /**
         * 隐藏虚拟按键
         */
        ZQGameSdk.HIDE_VK = "hide_vk";
        /**
         * talkingdata自定义事件
         */
        ZQGameSdk.TD_EVENT = "td_event";
        /**
         * 埋点数据
         */
        ZQGameSdk.TRACK_POINT = "track_point";
        //private static _location: egret.Point = new egret.Point();
        ZQGameSdk._callBacks = {};
        ZQGameSdk.location = new Location();
        ZQGameSdk.isInited = false;
        ZQGameSdk._callState = 0;
        // private static lastActiveSpeachTime: number=0;
        ZQGameSdk.lastRecordTime = 0;
        // private static lastRecordStopTime:number=0;
        ZQGameSdk.canRecord = true;
        return ZQGameSdk;
    }());
    uniLib.ZQGameSdk = ZQGameSdk;
    var ZQGameObj = /** @class */ (function () {
        function ZQGameObj() {
        }
        return ZQGameObj;
    }());
    uniLib.ZQGameObj = ZQGameObj;
    var ZipJson = /** @class */ (function () {
        function ZipJson() {
        }
        return ZipJson;
    }());
    uniLib.ZipJson = ZipJson;
    var ApkJson = /** @class */ (function () {
        function ApkJson() {
        }
        return ApkJson;
    }());
    uniLib.ApkJson = ApkJson;
    var XFSetParam = /** @class */ (function () {
        function XFSetParam() {
        }
        return XFSetParam;
    }());
    uniLib.XFSetParam = XFSetParam;
    var YM_PLACE;
    (function (YM_PLACE) {
        YM_PLACE[YM_PLACE["TOP"] = 0] = "TOP";
        YM_PLACE[YM_PLACE["BOTTOM"] = 1] = "BOTTOM"; //最底层
    })(YM_PLACE = uniLib.YM_PLACE || (uniLib.YM_PLACE = {}));
    var GRAMMARTYPE;
    (function (GRAMMARTYPE) {
        GRAMMARTYPE[GRAMMARTYPE["ONLINE"] = 0] = "ONLINE";
        GRAMMARTYPE[GRAMMARTYPE["OFFLINE"] = 1] = "OFFLINE"; //离线
    })(GRAMMARTYPE = uniLib.GRAMMARTYPE || (uniLib.GRAMMARTYPE = {}));
    var SPEECHTYPE;
    (function (SPEECHTYPE) {
        SPEECHTYPE[SPEECHTYPE["SPEECH"] = 0] = "SPEECH";
        SPEECHTYPE[SPEECHTYPE["GRAMMAR"] = 1] = "GRAMMAR"; //命令词服务
    })(SPEECHTYPE = uniLib.SPEECHTYPE || (uniLib.SPEECHTYPE = {}));
    /**
    * config操作
    */
    var CONFIG_STATE;
    (function (CONFIG_STATE) {
        CONFIG_STATE[CONFIG_STATE["UPDATE"] = 0] = "UPDATE";
        CONFIG_STATE[CONFIG_STATE["DOWN"] = 1] = "DOWN";
    })(CONFIG_STATE = uniLib.CONFIG_STATE || (uniLib.CONFIG_STATE = {}));
    var NetState;
    (function (NetState) {
        NetState[NetState["NO_SIGNAL"] = 0] = "NO_SIGNAL";
        NetState[NetState["WIFI"] = 1] = "WIFI";
        NetState[NetState["DATA_FLOWS"] = 2] = "DATA_FLOWS";
        NetState[NetState["WIFI_AND_DATA"] = 3] = "WIFI_AND_DATA";
    })(NetState = uniLib.NetState || (uniLib.NetState = {}));
    var CallState;
    (function (CallState) {
        CallState[CallState["DISCONNECTED"] = 0] = "DISCONNECTED";
        CallState[CallState["CONNECTED"] = 1] = "CONNECTED";
    })(CallState = uniLib.CallState || (uniLib.CallState = {}));
    var WEBMODEL;
    (function (WEBMODEL) {
        WEBMODEL[WEBMODEL["AUTO"] = 0] = "AUTO";
        WEBMODEL[WEBMODEL["EXPLORER"] = 1] = "EXPLORER";
        WEBMODEL[WEBMODEL["LAND"] = 2] = "LAND"; //反向
    })(WEBMODEL = uniLib.WEBMODEL || (uniLib.WEBMODEL = {}));
    var PICKPHOTO_TYPE;
    (function (PICKPHOTO_TYPE) {
        PICKPHOTO_TYPE[PICKPHOTO_TYPE["NORMAL"] = 0] = "NORMAL";
        PICKPHOTO_TYPE[PICKPHOTO_TYPE["AVAR"] = 1] = "AVAR"; //截取头像
    })(PICKPHOTO_TYPE = uniLib.PICKPHOTO_TYPE || (uniLib.PICKPHOTO_TYPE = {}));
})(uniLib || (uniLib = {}));

/**
  * 面板基类
  */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var BasePanel = /** @class */ (function (_super) {
        __extends(BasePanel, _super);
        // 构造函数
        function BasePanel(assetsName) {
            if (assetsName === void 0) { assetsName = "assets"; }
            var _this = _super.call(this) || this;
            _this.w = 0;
            _this.h = 0;
            _this.assets = RES.getRes(assetsName);
            _this.w = uniLib.Global.screenWidth;
            _this.h = uniLib.Global.screenHeight;
            _this.initPanel();
            return _this;
        }
        // 初始化面板
        BasePanel.prototype.initPanel = function () {
        };
        // 初始化面板数据
        BasePanel.prototype.initData = function () {
        };
        // 进入面板
        BasePanel.prototype.onEnter = function () {
        };
        // 退出面板
        BasePanel.prototype.onExit = function () {
        };
        // 关闭面板
        BasePanel.prototype.closePanel = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        // 获取面板宽度
        BasePanel.prototype.getWidth = function () {
            return this.width;
        };
        // 获取面板高度
        BasePanel.prototype.getHeight = function () {
            return this.height;
        };
        return BasePanel;
    }(egret.DisplayObjectContainer));
    uniLib.BasePanel = BasePanel;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var GMView = /** @class */ (function (_super) {
        __extends(GMView, _super);
        function GMView() {
            var _this = _super.call(this) || this;
            var exmlText = "<?xml version='1.0' encoding='utf-8' ?>\n            <e:Skin width=\"340\" height=\"70\" xmlns:e=\"http://ns.egret.com/eui\"><e:Rect right=\"0\" left=\"0\" top=\"0\" bottom=\"0\" fillColor=\"0x3B2C2C\"/>\n            <e:EditableText id=\"str_input\" width=\"218\" height=\"37\" x=\"12\" y=\"17\" text=\"\u8BF4\u70B9\u4EC0\u4E48\u5427\" verticalAlign=\"middle\" />\n                    <e:Button id=\"btn_send\" label=\"\u53D1\u9001\" x=\"235\" y=\"10\" />\n                        <e:List height=\"266\" width=\"335\" x=\"2\" y=\"-269\" />\n                            </e:Skin>";
            _this.skinName = exmlText;
            return _this;
            //this.btn_send = new uniLib.CommonButton(
            //uniLib.Global.addEventListener(ZqEvent.GM_BEFORE, this.onGMBefore, this);
        }
        //private onGMBefore(e: uniLib.ZqEvent) {
        //    var data: any = e.param;
        //    var func: any;
        //    switch (data.method) {
        //        case "peer":
        //            var params: any = StringUtils.getVariables(data.params);
        //            uniLib.UserInfo.uid = Number(params.id);
        //            break;
        //        case "gm":
        //            break;
        //        case "help":
        //            break;
        //    }
        //    func = uniLib.getDefinitionByName("uniLib.GM_Before");
        //    if (func) {
        //        try {
        //            func(data, function () {
        //                NetMgr.tcpSend(data);
        //            });
        //        }
        //        catch (e) {
        //        }
        //    }
        //    //if (data.method == "peer") {
        //    //    var puid: string = gmsg.params.split("=")[1];
        //    //    uniLib.UserInfo.uid = Number(puid);
        //    //}
        //}
        GMView.prototype.childrenCreated = function () {
            this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuch, this);
            this.str_input.prompt = "说点什么吧";
        };
        GMView.prototype.onTuch = function (e) {
            uniLib.NetMgr.sendChat(this.str_input.text);
        };
        return GMView;
    }(eui.Component));
    uniLib.GMView = GMView;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var GameDoc = /** @class */ (function (_super) {
        __extends(GameDoc, _super);
        function GameDoc(params) {
            var _this = _super.call(this) || this;
            _this.uiLayer = new egret.DisplayObjectContainer();
            _this.topLayer = new egret.DisplayObjectContainer();
            _this.effectLayer = new egret.DisplayObjectContainer();
            _this.mainUILayer = new egret.DisplayObjectContainer();
            _this.maskLayer = new egret.DisplayObjectContainer();
            _this.tipsLayer = new egret.DisplayObjectContainer();
            _this.thmLoaded = false;
            _this.resLoaded = false;
            if (params)
                _this._gameInfo = params;
            uniLib.SceneMgr.instance.init(_this);
            _this.initBaseLayers();
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        //初始化场景类
        GameDoc.prototype.initBaseLayers = function () {
            this.addChild(this.uiLayer);
            this.addChild(this.topLayer);
            this.addChild(this.effectLayer);
            this.addChild(this.mainUILayer);
            this.addChild(this.maskLayer);
            this.addChild(this.tipsLayer);
            this.awake();
            //if(this._gameInfo.gameId == 150 && this._gameInfo.defaultOrientation != egret.OrientationMode.LANDSCAPE){
            //    this.scaleX = 1136 / 1280;
            //    this.scaleY = 640 / 720;
            //}
        };
        /**
         * 场景构造完成
         */
        GameDoc.prototype.awake = function () {
        };
        GameDoc.prototype.onAddToStage = function (e) {
            if (e === void 0) { e = null; }
            //初始化Resource资源加载库
            //initiate Resource loading library
            if (this._gameInfo) {
                this.preLoadAndInit();
            }
            else {
                this.start(e);
            }
        };
        GameDoc.prototype.preLoadAndInit = function () {
            if (this._gameInfo.gameTheme && this._gameInfo.gameTheme != "") {
                var theme = new eui.Theme(this._gameInfo.gameTheme, this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, this.loadedthm, this);
            }
            else {
                this.thmLoaded = true;
            }
            // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadedCfg, this);
            // RES.loadConfig(this._gameInfo.gameResConfigUrl, this._gameInfo.gameResRoot);
            console.error("preLoadAndInit");
            RES.destroyRes(this._gameInfo.gameResConfigUrl);
            RES.getResByUrl(this._gameInfo.gameResConfigUrl, this.loadedCfg, this);
        };
        //private onUniThemeComplete(): void {
        //    this.loadCfg();
        //}
        GameDoc.prototype.loadedthm = function (event) {
            this.thmLoaded = true;
            this.cfgComplete();
        };
        // private loadedCfg(event: RES.ResourceEvent): void {
        //     this.resLoaded = true;
        //     RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadedCfg, this);
        //     this.cfgComplete();
        // }
        GameDoc.prototype.loadedCfg = function (data) {
            console.error(data);
            if (data && data.groups) {
                if (uniLib.GameModuleUtils.loadGameTimeOut) {
                    egret.clearTimeout(uniLib.GameModuleUtils.loadGameTimeOut);
                }
                this.resLoaded = true;
                // if (GameModuleUtils.lastGameInfo) {
                //     GameModuleUtils.lastGameInfo.candestroyGrps = [];
                // }
                // for (let i: number = 0; i < data.groups.length; i++) {
                //     if (ResUtils.isGroupInConfig(data.groups[i].name) == false) {
                //         GameModuleUtils.lastGameInfo.candestroyGrps.push(data.groups[i].name);
                //     }
                // }
                if (uniLib.Global.initOpt.lobbyCommonResGrps && uniLib.Global.initOpt.lobbyCommonResGrps.length > 0) {
                    uniLib.ResUtils.clearCfgByConfigName(uniLib.Global.initOpt.lobbyCommonResGrps, data);
                }
                if (RES.hasOwnProperty("parseConfig")) {
                    RES.parseConfig(data, this._gameInfo.gameResRoot);
                }
                RES.destroyRes(this._gameInfo.gameResConfigUrl);
                this.cfgComplete();
            }
            else {
                console.error("游戏config加载失败:" + this._gameInfo.gameResConfigUrl);
            }
        };
        GameDoc.prototype.start = function (e) {
            if (e === void 0) { e = null; }
        };
        /**
         * 配置文件加载完成,开始预加载preload资源组。
         * configuration file loading is completed, start to pre-load the preload resource group
         */
        GameDoc.prototype.cfgComplete = function () {
            console.error("thmLoaded:" + this.thmLoaded + " resLoaded:" + this.resLoaded);
            if (this.thmLoaded == true && this.resLoaded == true) {
                if (this._gameInfo.preLoad && this._gameInfo.preLoad != "") {
                    console.error("this._gameInfo.preLoad:" + this._gameInfo.preLoad);
                    uniLib.ResLoadMgr.instance.load(this._gameInfo.preLoad, this.onResComplete, this.onResError, this, this._gameInfo.preloadUI, this._gameInfo.preloadUIAutoHide);
                }
                else {
                    this.preLoadEnd();
                    if (this["preLoadCallBack"])
                        this["preLoadCallBack"]();
                }
            }
        };
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        GameDoc.prototype.onResComplete = function (event) {
            if (event.groupName == this._gameInfo.preLoad) {
                //this.stage.removeChild(this.loadingView);//通知大厅关闭Loading
                this.preLoadEnd();
                if (this["preLoadCallBack"])
                    this["preLoadCallBack"]();
            }
        };
        GameDoc.prototype.preLoadEnd = function () {
        };
        GameDoc.prototype.resize = function () {
        };
        GameDoc.prototype.destroy = function () {
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        GameDoc.prototype.onResError = function (event) {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            //this.onResourceLoadComplete(event);
        };
        /**
         * 返回大厅
         */
        GameDoc.prototype.backToLobby = function () {
            //this.parent.removeChild(this);
            if (egret.getQualifiedSuperclassName(uniLib.SceneMgr.instance.currentScene) == "LobbyScene") {
                uniLib.SceneMgr.instance.currentScene.removeGame();
            }
        };
        return GameDoc;
    }(egret.DisplayObjectContainer));
    uniLib.GameDoc = GameDoc;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var GameScene = /** @class */ (function (_super) {
        __extends(GameScene, _super);
        //构造方法
        function GameScene(param) {
            var _this = _super.call(this) || this;
            // 游戏界面层 游戏资源需要添加到这一层 否则会覆盖loading的显示
            _this.uiLayer = new egret.DisplayObjectContainer();
            // 弹窗层 如 设置之类的
            _this.topLayer = new egret.DisplayObjectContainer();
            // 特效层 如 飘字之类的
            _this.effectLayer = new egret.DisplayObjectContainer();
            // 主UI层 如 底部功能栏
            _this.mainUILayer = new egret.DisplayObjectContainer();
            // 通讯遮罩层 
            _this.maskLayer = new egret.DisplayObjectContainer();
            // 旋转屏幕提示层 
            _this.tipsLayer = new egret.DisplayObjectContainer();
            _this.initBaseLayers();
            _this.once(egret.Event.ADDED_TO_STAGE, _this.start, _this);
            return _this;
        }
        //初始化场景类
        GameScene.prototype.initBaseLayers = function () {
            this.addChild(this.uiLayer);
            this.addChild(this.effectLayer);
            this.addChild(this.topLayer);
            this.addChild(this.mainUILayer);
            this.addChild(this.maskLayer);
            this.addChild(this.tipsLayer);
            this.awake();
        };
        /**
         * 场景构造完成
         */
        GameScene.prototype.awake = function () {
        };
        /**
         * 场景初始化完成并添加到舞台
         */
        GameScene.prototype.start = function (e) {
            if (e === void 0) { e = null; }
        };
        /**
         * 大小变化时
         */
        GameScene.prototype.resize = function () {
        };
        /**
        * 场景销毁时
        */
        GameScene.prototype.destroy = function () {
        };
        return GameScene;
    }(egret.DisplayObjectContainer));
    uniLib.GameScene = GameScene;
})(uniLib || (uniLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    var LobbyScene = /** @class */ (function (_super) {
        __extends(LobbyScene, _super);
        //构造方法
        function LobbyScene(param) {
            var _this = _super.call(this) || this;
            // 游戏界面层
            _this.uiLayer = new egret.DisplayObjectContainer();
            // 弹窗层 如 设置之类的
            _this.topLayer = new egret.DisplayObjectContainer();
            // 特效层 如 飘字之类的
            _this.effectLayer = new egret.DisplayObjectContainer();
            // 主UI层 如 底部功能栏
            _this.mainUILayer = new egret.DisplayObjectContainer();
            // 通讯遮罩层 
            _this.maskLayer = new egret.DisplayObjectContainer();
            // 旋转屏幕提示层 
            _this.tipsLayer = new egret.DisplayObjectContainer();
            /**
             * 游戏层
             */
            _this.gameLayer = new egret.DisplayObjectContainer();
            uniLib.SceneMgr.instance.init(_this);
            _this.initBaseLayers();
            _this.once(egret.Event.ADDED_TO_STAGE, _this.start, _this);
            return _this;
        }
        //初始化场景类
        LobbyScene.prototype.initBaseLayers = function () {
            this.addChild(this.uiLayer);
            this.addChild(this.topLayer);
            //this.addChild(this.gameLayer);
            this.addChild(this.effectLayer);
            this.addChild(this.mainUILayer);
            this.addChild(this.maskLayer);
            this.addChild(this.tipsLayer);
            this.awake();
        };
        /**
         * 场景构造完成
         */
        LobbyScene.prototype.awake = function () {
        };
        /**
         * 场景初始化完成并添加到舞台
         */
        LobbyScene.prototype.start = function (e) {
            if (e === void 0) { e = null; }
            //super.$onAddToStage();
        };
        LobbyScene.prototype.resize = function () {
        };
        /**
        * 场景销毁时
        */
        LobbyScene.prototype.destroy = function () {
        };
        LobbyScene.prototype.addGame = function (game) {
            this.currentGame = game;
            if (this._bgMask == null) {
                this._bgMask = uniLib.DisplayUtils.createMask(0, uniLib.Global.screenWidth, uniLib.Global.screenHeight);
                this._bgMask.touchEnabled = true;
                //egret.Tween.get(this._bgMask).to({ alpha: 1 }, 100);
                this._bgMask.visible = true;
            }
            this.gameLayer.addChild(this._bgMask);
            //this.gameLayer.visible = true;
            this.gameLayer.addChild(game);
            this.addChildAt(this.gameLayer, 1);
            //game.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeGame, this);
        };
        LobbyScene.prototype.removeGame = function (e) {
            if (e === void 0) { e = null; }
            //this.currentGame.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeGame, this);
            var curGameScene = uniLib.SceneMgr.instance.currentScene.currentGame;
            //console.error(curGameScene);
            if (curGameScene) {
                if (curGameScene.parent)
                    curGameScene.parent.removeChild(curGameScene);
                curGameScene.destroy();
                curGameScene = null;
            }
            uniLib.DisplayUtils.removeFromParent(this.gameLayer);
            this.gameLayer.removeChildren();
            //if (this.currentGame.parent)
            //    this.currentGame.parent.removeChild(this.currentGame);
            //if (this.currentGame && this.currentGame.destroy) {
            //    this.currentGame.destroy();
            //}
            this.currentGame = null;
            //this.gameLayer.visible = false;
            // uniLib.GameModuleUtils.removeGameJs();
            //if (uniLib.Global.isH5) {
            //}
        };
        return LobbyScene;
    }(egret.DisplayObjectContainer));
    uniLib.LobbyScene = LobbyScene;
})(uniLib || (uniLib = {}));

//  /**
//    * UI管理类
//    */
//module PanelManager {
//    //var startPanel:StartPanel;
//    //var gamePanel:GamePanel;
//    //var gameOverPanel:GameOverPanel;
//	// 初始化所有面板
//	export function initPanel():void{ 
//		var _width=document.documentElement.clientWidth;
//    	var _height=document.documentElement.clientHeight;
//    	if(_width < _height){
//    		GlobalData.initIsVertical = true;
//    	}
//        Global.addEventListener(MainNotify.openStartPanelNotify,this.openStartPanel,this)
//        Global.addEventListener(MainNotify.closeStartPanelNotify,this.closeStartPanel,this)
//        Global.addEventListener(MainNotify.openGamePanelNotify,this.openGamePanel,this)
//        Global.addEventListener(MainNotify.closeGamePanelNotify,this.closeGamePanel,this)
//        Global.addEventListener(MainNotify.openGameOverPanelNotify,this.openGameOverPanel,this)
//        Global.addEventListener(MainNotify.closeGameOverPanelNotify,this.closeGameOverPanel,this)
//	} 
//	// 打开开始界面
//	export function openStartPanel():void{ 
//		if(this.startPanel == null){
//			this.startPanel = new StartPanel();
//			PopUpManager.addPopUp(this.startPanel,false,0,0,0);
//		}
//	} 
//	// 关闭开始界面
//	export function closeStartPanel():void{ 
//		if(this.startPanel != null){
//			PopUpManager.removePopUp(this.startPanel,3);
//			this.startPanel = null;
//		}
//	} 
//	// 打开游戏界面
//	export function openGamePanel():void{ 
//		if(this.gamePanel == null){
//			this.gamePanel = new GamePanel();
//			PopUpManager.addPopUp(this.gamePanel,false,0,0,3);
//		}
//	} 
//	// 关闭游戏界面
//	export function closeGamePanel():void{ 
//		if(this.gamePanel != null){
//			PopUpManager.removePopUp(this.gamePanel,3);
//			this.gamePanel = null;
//		}
//	} 
//	// 打开结束界面
//	export function openGameOverPanel():void{ 
//		if(this.gameOverPanel == null){
//			this.gameOverPanel = new GameOverPanel();
//			PopUpManager.addPopUp(this.gameOverPanel,false,0,0,3);
//		}
//	} 
//	// 关闭结束界面
//	export function closeGameOverPanel():void{ 
//		if(this.gameOverPanel != null){
//			PopUpManager.removePopUp(this.gameOverPanel,3);
//			this.gameOverPanel = null;
//		}
//	} 
//}

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uniLib;
(function (uniLib) {
    /**
     * 统计
     */
    var StatistcsView = /** @class */ (function (_super) {
        __extends(StatistcsView, _super);
        function StatistcsView() {
            var _this = _super.call(this) || this;
            _this.init();
            _this.socketStatus.text = "connecting";
            uniLib.StatistcsMgr.instance.addEventListener(uniLib.StatistcsMgr.SENDANDRECEIVE, _this.updataSendAndReceive, _this);
            uniLib.StatistcsMgr.instance.addEventListener(uniLib.StatistcsMgr.PING, _this.updataPing, _this);
            uniLib.StatistcsMgr.instance.addEventListener(uniLib.StatistcsMgr.SOCKETSTATUS, _this.updataSocketStatus, _this);
            uniLib.StatistcsMgr.instance.addEventListener(uniLib.StatistcsMgr.SENDEDANDRECEIVED, _this.updataSendedAndReceived, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.destroy, _this);
            uniLib.StatistcsMgr.instance.init();
            return _this;
        }
        StatistcsView.prototype.updataSendAndReceive = function (evt) {
            var data = evt.data;
            this.sendB.text = data.send + "B/s";
            this.recevieB.text = data.receive + "B/s";
        };
        StatistcsView.prototype.updataPing = function (evt) {
            this.ping.text = evt.data + "ms";
        };
        StatistcsView.prototype.updataSocketStatus = function (evt) {
            this.socketStatus.text = evt.data;
        };
        StatistcsView.prototype.updataSendedAndReceived = function (evt) {
            this.sendKb.text = evt.data.sended.toFixed(2) + "kb";
            this.recevieKb.text = evt.data.received.toFixed(2) + "kb";
        };
        StatistcsView.prototype.init = function () {
            this.createTextField("Ping");
            this.ping = this.createTextFieldX();
            this.createTextField("Status");
            this.socketStatus = this.createTextFieldX();
            this.createTextField("send");
            this.sendB = this.createTextFieldX();
            this.createTextField("receive");
            this.recevieB = this.createTextFieldX();
            this.createTextField("sended");
            this.sendKb = this.createTextFieldX();
            this.createTextField("recevied");
            this.recevieKb = this.createTextFieldX();
        };
        StatistcsView.prototype.createTextField = function (str) {
            var tf = new egret.TextField();
            tf.text = str;
            tf.y = this.height + 5;
            tf.fontFamily = "微软雅黑";
            tf.size = 18;
            this.addChild(tf);
            return tf;
        };
        StatistcsView.prototype.createTextFieldX = function () {
            var tf = new egret.TextField;
            tf.x = 150;
            tf.y = this.height - 13;
            tf.fontFamily = "微软雅黑";
            tf.size = 18;
            this.addChild(tf);
            return tf;
        };
        StatistcsView.prototype.destroy = function () {
            uniLib.StatistcsMgr.instance.removeEventListener(uniLib.StatistcsMgr.SENDANDRECEIVE, this.updataSendAndReceive, this);
            uniLib.StatistcsMgr.instance.removeEventListener(uniLib.StatistcsMgr.PING, this.updataPing, this);
            uniLib.StatistcsMgr.instance.removeEventListener(uniLib.StatistcsMgr.SOCKETSTATUS, this.updataSocketStatus, this);
            uniLib.StatistcsMgr.instance.removeEventListener(uniLib.StatistcsMgr.SENDEDANDRECEIVED, this.updataSendedAndReceived, this);
            uniLib.StatistcsMgr.instance.destroy();
        };
        return StatistcsView;
    }(egret.DisplayObjectContainer));
    uniLib.StatistcsView = StatistcsView;
})(uniLib || (uniLib = {}));
