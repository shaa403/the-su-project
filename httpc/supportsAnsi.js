
"use strict";

import os from "node:os";

const env = process.env;

/**
 * From the chronos `supportsAnsi` utility function : 
 * This function checks whether Ansi escape codes are supported in the terminal.
 * This function is a copy of the chronos `supportsAnsi` utility function, which is also
 * a streamlined version of keqingrong's `supports-ansi` library.
 * 
 * repository of the chronos's `supports-ansi` lib : `https://github.com/super-user-d0/chronos`
 * repository of the keqingrong's `supports-ansi` lib : `https://github.com/keqingrong/supports-ansi`
 * @returns {boolean}
 */
export default function supportsAnsi() {
  if (!process.stdout.isTTY) {
    return false;
  }
  if (process.platform === "win32") {
    const osRelease = os.release().split(".");
    if (
      parseInt(osRelease[0], 10) >= 10 && 
      parseInt(osRelease[2], 10) >= 14393 
    ) {
      return true;
    }
  }
  const pattern = [
    "^xterm",  "^rxvt", "^eterm", "^screen", "^tmux", "^vt100", "^vt102", "^vt220", "^vt320",
    "ansi", "scoansi", "cygwin", "linux", "konsole", "bvterm" 
  ].join("|");
  const regex = new RegExp(pattern, "i");
  if (
    env?.TERM &&
    env.TERM !== "dumb" &&
    regex.test(env.TERM)
  ) {
    return true;
  }
  
  const isConEmuAnsiOn = (env.ConEmuANSI || "").toLowerCase() === "on";
  if (isConEmuAnsiOn) {
    return true;
  }

  if (!!env.ANSICON) {
    return true;
  }

  return false;
};
