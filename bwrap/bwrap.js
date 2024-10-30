
"use strict";

import bwrite from "./write.js";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

wrap("ssos");

function wrap(path_to_tardir) {
   if (!path_to_tardir) path_to_tardir = "";
   path_to_tardir = join(process.cwd(), path_to_tardir);
   if (existsSync(path_to_tardir) && !statSync(path_to_tardir).isFile()) {
      let content_offs = 0;
      
      function scanfs(watched_dir) {
         let watched_dir_contents = readdirSync(join(path_to_tardir, watched_dir));
         for (let i = 0; i < watched_dir_contents.length; ++i) {
         	const target = join(path_to_tardir, watched_dir, watched_dir_contents[i]);
         	if (statSync(target).isFile()) {
         	
         	   bwrite.writehead(join(watched_dir, watched_dir_contents[i]), content_offs);
               const content = readFileSync(target);
               bwrite.writepayload(content);
         	   content_offs += Buffer.byteLength(content);
         	              	   
         	} else scanfs(join(watched_dir, watched_dir_contents[i]));
         }
      }
      scanfs("");
      console.log(bwrite.wrap());
   } else {
   	 //terminate: target must be an existing dir
   }
}
