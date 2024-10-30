
"use strict";

/*import { appendFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";*/

//const charlen = 1024;

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

   /**
   17     * Do not send a line > 1024 bytes
   18     * @param {string} line
   19     * @returns {void}
   20     
   21    writehead(line) {
   22       const linelen = len(line);
   23       if ((this.header.len + linelen > charlen)) {
   24          const cwd = join(process.cwd(), "x");
   25          if (!existsSync(cwd)) writeFileSync(cwd, "");
   26          appendFileSync(cwd, this.header.value);
   27          this.header.len = 0;
   28          this.header.value = "";
   29       }
   30       this.header.value += line;
   31       this.header.len += linelen;
   32       return void 0;
   33    }
   */

   static bwrite() {
      if (!_class.instance) _class.instance = new _class();
      return _class.instance;
   }
}

const bwrite = _class.bwrite();

export default bwrite;
