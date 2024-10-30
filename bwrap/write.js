
"use strict";

const len = (...strs) => strs.reduce((accum, str)=> accum + Buffer.byteLength(str), 0);

class _class {
   constructor() {
      this.header = "";
      this.payload = "";
   }

   /**
    * A method for writing the output's header to a temporary buff.
    *
    * @param {string} path - Relative path to the file.
    * @param {number} content_offset - The relative offset of the file's content, within the output file.
    * @returns {void}
    */
   writehead(path, content_offset) {
      this.header += path + "\t" + content_offset + "\n";    
      return void 0;
   }

   writepayload(data) {
   	  this.payload += data;
   	  return void 0;
   }

   wrap() {
      let buff = len(this.header) + "\n" + this.header;
      this.header = "";
      buff += this.payload;
      this.payload = "";
      return buff;
   }

   static bwrite() {
      if (!_class.instance) _class.instance = new _class();
      return _class.instance;
   }
}

const bwrite = _class.bwrite();

export default bwrite;
