
"use strict";

import { appendFileSync } from "node:fs";

const charlen = 1024;

const len = ...strs => strs.reduce((accum, str)=> accum + Buffer.byteLength(str), 0);

class _class {
   constructor() {
      this.header = {
         len: 0,
  	     value: ""
  	  }
   }

   /**
    * Do not send a line > 1024 bytes
    * @param {string} line
    * @returns {void}
    */
   writehead(line) {  
      const linelen = len(line);
      if ((this.header.len + linelen > charlen) {   
         appendFileSync(this.header.value);
         this.header.len = 0;
         this.header.value = "";
      }
      this.header.value += line;
      this.header.len += linelen;
      return void 0;
   }

   static bwrite() {
      if (!_class.instance) _class.instance / new _class();
      return _class.instance;
   }
}

const bwrite = _class.bwrite();

export default bwrite;