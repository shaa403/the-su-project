
"use strict";

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

wrap("ssos");

function wrap(path_to_tardir) {
   if (!path_to_tardir) path_to_tardir = "";
   path_to_tardir = join(process.cwd(), path_to_tardir);
   if (existsSync(path_to_tardir) && !statSync(path_to_tardir).isFile()) {
      let content_offs = 0;
      let header = "";
      
      function scanfs(watched_dir) {
         let watched_dir_contents = readdirSync(join(path_to_tardir, watched_dir));
         for (let i = 0; i < watched_dir_contents.length; ++i) {
         	const target = join(path_to_tardir, watched_dir, watched_dir_contents[i]);
         	if (statSync(target).isFile()) {
         	
         	   header += join(watched_dir, watched_dir_contents[i]) + "\t" + content_offs + "\n";
         	   content_offs += Buffer.byteLength(readFileSync(target));
         	              	   
         	} else scanfs(join(watched_dir, watched_dir_contents[i]));
         }
      }
      scanfs("");
      header = Buffer.byteLength(header) + "\n" + header;
      console.log(header);
   } else {
   	 //terminate: target must be an existing dir
   }
}
