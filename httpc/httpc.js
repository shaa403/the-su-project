#!/usr/bin/env node

"use strict";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { request as HTTPREQUEST } from "node:http";
import { request as HTTPSREQUEST } from "node:https";
import supportsAnsi from "./supportsAnsi.js";

const cmd = process.argv[2];
const fn_ansi = () => {
  const isSupported = supportsAnsi();
  return {
  	dim: isSupported ? "\x1b[2m" : "",
    green: isSupported ? "\x1b[92m" : "",
    blue: isSupported ? "\x1b[94m" : "",
   	reset: isSupported ? "\x1b[0m" : "",
  }
}

httpc(cmd);

function httpc(rq) {  
  try { 
    const ansi = fn_ansi();
    let rqBuf = join(process.cwd(), "httpc.json");
    if (existsSync(rqBuf)) {
  	   rqBuf = JSON.parse(readFileSync(rqBuf, "ascii"));
  	   if (Array.isArray(rqBuf) && rqBuf.length !== 0 && !rq) 
  	     for (let i = 0; i < rqBuf.length; ++i) fn_request(rqBuf[i]);
  	   else if (Array.isArray(rqBuf) && rqBuf.length !== 0 && rq) 
  	     fn_request(rqBuf[rq]);
  	   else if (typeof rqBuf === "object") fn_request(rqBuf);
  	   else 
  	     console.log("%shttpc.json must either be an array, or an object%s", ansi.dim, ansi.reset);
    } else 
       console.log("%scannot locate %s%s", ansi.dim, rqBuf, ansi.reset);
  } catch(e) {
     const ansi = fn_ansi();
     console.log("%s%s%s", ansi.dim, e.message, ansi.reset);
  }
}

function fn_request(rqObj) {
  const ansi = fn_ansi();
  const socketParameters = [
     rqObj.url, 
     {
        insecureHTTPHeaders: true,
        headers: rqObj.headers,
        method: rqObj.method,	
     }, 
     ((request)=> {
  	     let payload = "";
  	     request.setEncoding("utf-8");
  	     request.on("data", (chunk) => payload += chunk);
  	     request.on("end", ()=> {
  	       const headers = request.headers;
  	       console.log(" %s %s", request.statusCode, rqObj.url,);
  	       Object.entries(headers).forEach(keyval => {
  	       	  console.log(" %s%s%s: %s%s%s", ansi.green, keyval[0], ansi.reset, ansi.blue, keyval[1], ansi.reset);
  	       });
  	       if (payload) {
  	          process.stdout.write("\r\n");
  	          console.log(payload);
  	       } 
  	       process.stdout.write("------------------------------------------ \r\n");
  	     });
     })
  ];
  const request = rqObj.url.startsWith("https") ? HTTPSREQUEST(...socketParameters) : HTTPREQUEST(...socketParameters);
  request.on("error", (e)=> console.log("%s%s%s", ansi.dim, e.message, ansi.reset));
  if (rqObj.body) 
     request.write(typeof rqObj.body === "object" ? JSON.stringify(rqObj.body) : rqObj.body);
  request.end();
}

