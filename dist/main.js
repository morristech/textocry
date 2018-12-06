!function(e){var t={};function r(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(s,o,function(t){return e[t]}.bind(null,o));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){var s={corePath:"https://cdn.jsdelivr.net/gh/naptha/tesseract.js-core@0.1.0/index.js",langPath:"https://tessdata.projectnaptha.com/3.02/"},o=r(1).version;s.workerPath="https://cdn.jsdelivr.net/gh/naptha/tesseract.js@"+o+"/dist/worker.js",t.defaultOptions=s,t.spawnWorker=function(e,t){if(window.Blob&&window.URL)var r=new Blob(['importScripts("'+t.workerPath+'");']),s=new Worker(window.URL.createObjectURL(r));else s=new Worker(t.workerPath);return s.onmessage=function(t){var r=t.data;e._recv(r)},s},t.terminateWorker=function(e){e.worker.terminate()},t.sendPacket=function(e,t){!function e(t,r){if("string"==typeof t){if(/^\#/.test(t))return e(document.querySelector(t),r);if(/(blob|data)\:/.test(t)){var s=new Image;return s.src=t,void(s.onload=(t=>e(s,r)))}var o=new XMLHttpRequest;return o.open("GET",t,!0),o.responseType="blob",o.onload=(t=>e(o.response,r)),o.onerror=function(s){/^https?:\/\//.test(t)&&!/^https:\/\/crossorigin.me/.test(t)&&(console.debug("Attempting to load image with CORS proxy"),e("https://crossorigin.me/"+t,r))},void o.send(null)}if(t instanceof File){var n=new FileReader;return n.onload=(t=>e(n.result,r)),void n.readAsDataURL(t)}if(t instanceof Blob)return e(URL.createObjectURL(t),r);if(t.getContext)return e(t.getContext("2d"),r);if("IMG"==t.tagName||"VIDEO"==t.tagName){var a=document.createElement("canvas");a.width=t.naturalWidth||t.videoWidth,a.height=t.naturalHeight||t.videoHeight;var i=a.getContext("2d");return i.drawImage(t,0,0),e(i,r)}if(t.getImageData){var c=t.getImageData(0,0,t.canvas.width,t.canvas.height);return e(c,r)}return r(t);throw new Error("Missing return in loadImage cascade")}(t.payload.image,function(r){t.payload.image=r,e.worker.postMessage(t)})}},function(e){e.exports={name:"tesseract.js",version:"1.0.14",description:"Pure Javascript Multilingual OCR",main:"src/index.js",scripts:{start:'concurrently --kill-others "watchify src/index.js  -t [ envify --NODE_ENV development ] -t [ babelify --presets [ es2015 ] ] -o dist/tesseract.dev.js --standalone Tesseract" "watchify src/browser/worker.js  -t [ envify --NODE_ENV development ] -t [ babelify --presets [ es2015 ] ] -o dist/worker.dev.js" "http-server -p 7355"',build:"browserify src/index.js -t [ babelify --presets [ es2015 ] ] -o dist/tesseract.js --standalone Tesseract && browserify src/browser/worker.js -t [ babelify --presets [ es2015 ] ] -o dist/worker.js && uglifyjs dist/tesseract.js --source-map -o dist/tesseract.min.js && uglifyjs dist/worker.js --source-map -o dist/worker.min.js",release:"npm run build && git commit -am 'new release' && git push && git tag `jq -r '.version' package.json` && git push origin --tags && npm publish"},browser:{"./src/node/index.js":"./src/browser/index.js"},author:"",license:"Apache-2.0",devDependencies:{"babel-preset-es2015":"^6.16.0",babelify:"^7.3.0",browserify:"^13.1.0",concurrently:"^3.1.0",envify:"^3.4.1","http-server":"^0.9.0",pako:"^1.0.3","uglify-js":"^3.4.9",watchify:"^3.7.0"},dependencies:{"file-type":"^3.8.0","isomorphic-fetch":"^2.2.1","is-url":"1.2.2","jpeg-js":"^0.2.0","level-js":"^2.2.4","node-fetch":"^1.6.3","object-assign":"^4.1.0","png.js":"^0.2.1","tesseract.js-core":"^1.0.2"},repository:{type:"git",url:"https://github.com/naptha/tesseract.js.git"},bugs:{url:"https://github.com/naptha/tesseract.js/issues"},homepage:"https://github.com/naptha/tesseract.js"}},function(e,t,r){const s=r(0),o=r(4),n=r(5),a=r(1).version,i=function(e={}){var t=new c(Object.assign({},s.defaultOptions,e));return t.create=i,t.version=a,t};class c{constructor(e){this.worker=null,this.workerOptions=e,this._currentJob=null,this._queue=[]}recognize(e,t={}){return this._delay(r=>{"string"==typeof t&&(t={lang:t}),t.lang=t.lang||"eng",r._send("recognize",{image:e,options:t,workerOptions:this.workerOptions})})}detect(e,t={}){return this._delay(r=>{r._send("detect",{image:e,options:t,workerOptions:this.workerOptions})})}terminate(){this.worker&&s.terminateWorker(this),this.worker=null,this._currentJob=null,this._queue=[]}_delay(e){this.worker||(this.worker=s.spawnWorker(this,this.workerOptions));var t=new n(this);return this._queue.push(r=>{this._queue.shift(),this._currentJob=t,e(t)}),this._currentJob||this._dequeue(),t}_dequeue(){this._currentJob=null,this._queue.length&&this._queue[0]()}_recv(e){"resolve"===e.status&&"recognize"===e.action&&(e.data=o(e.data)),this._currentJob.id===e.jobId?this._currentJob._handle(e):console.warn("Job ID "+e.jobId+" not known.")}}e.exports=i()},function(e,t,r){"use strict";r.r(t);var s=r(2),o=r.n(s);function n(e){chrome.tabs.sendMessage(e.id,{message:"init"},e=>{e&&clearTimeout(t)});var t=setTimeout(()=>{chrome.tabs.insertCSS(e.id,{file:"vendor/jquery.Jcrop.min.css",runAt:"document_start"}),chrome.tabs.insertCSS(e.id,{file:"css/content.css",runAt:"document_start"}),chrome.tabs.executeScript(e.id,{file:"vendor/jquery.min.js",runAt:"document_start"}),chrome.tabs.executeScript(e.id,{file:"vendor/jquery.Jcrop.min.js",runAt:"document_start"}),chrome.tabs.executeScript(e.id,{file:"content/content.js",runAt:"document_start"}),setTimeout(()=>{chrome.tabs.sendMessage(e.id,{message:"init"})},100)},100)}chrome.storage.sync.get(e=>{e.method||chrome.storage.sync.set({method:"crop"}),e.format||chrome.storage.sync.set({format:"png"}),void 0===e.dpr&&chrome.storage.sync.set({dpr:!0})}),chrome.browserAction.onClicked.addListener(e=>{n(e)}),chrome.commands.onCommand.addListener(e=>{"take-screenshot"===e&&chrome.tabs.getSelected(null,e=>{n(e)})}),chrome.runtime.onMessage.addListener((e,t,r)=>("capture"===e.message?chrome.storage.sync.get(t=>{chrome.tabs.getSelected(null,s=>{chrome.tabs.captureVisibleTab(s.windowId,{format:t.format},n=>{!function(e,t,r,s,n,a,i){var c=t.y*r,u=t.x*r,l=t.w*r,h=t.h*r,d=1!==r&&s?l:t.w,p=1!==r&&s?h:t.h,g=null;g||(g=document.createElement("canvas"),document.body.appendChild(g));g.width=d,g.height=p;var m=new Image;m.onload=(()=>{var e=g.getContext("2d");e.drawImage(m,u,c,l,h,0,0,d,p);var t=g.toDataURL(`image/${n}`);o.a.recognize(t,{lang:"eng"}).then(function(e){document.oncopy=function(t){t.clipboardData.setData("text/plain",e.text),t.preventDefault()},document.execCommand("copy",!1,null),chrome.tabs.sendMessage(a.id,{message:"loaded"},e=>{e&&clearTimeout(timeout)})}),i(t)}),m.src=e}(n,e.area,e.dpr,t.dpr,t.format,s,e=>{r({message:"extracted"})})})})}):"active"===e.message&&(e.active?chrome.storage.sync.get(e=>{"crop"===e.method&&(chrome.browserAction.setTitle({tabId:t.tab.id,title:"Select region"}),chrome.browserAction.setBadgeText({tabId:t.tab.id,text:"⯐"}))}):(chrome.browserAction.setTitle({tabId:t.tab.id,title:"Copy text from image"}),chrome.browserAction.setBadgeText({tabId:t.tab.id,text:""}))),!0))},function(e,t){e.exports=function(e){return e.paragraphs=[],e.lines=[],e.words=[],e.symbols=[],e.blocks.forEach(function(t){t.page=e,t.lines=[],t.words=[],t.symbols=[],t.paragraphs.forEach(function(r){r.block=t,r.page=e,r.words=[],r.symbols=[],r.lines.forEach(function(s){s.paragraph=r,s.block=t,s.page=e,s.symbols=[],s.words.forEach(function(o){o.line=s,o.paragraph=r,o.block=t,o.page=e,o.symbols.forEach(function(n){n.word=o,n.line=s,n.paragraph=r,n.block=t,n.page=e,n.line.symbols.push(n),n.paragraph.symbols.push(n),n.block.symbols.push(n),n.page.symbols.push(n)}),o.paragraph.words.push(o),o.block.words.push(o),o.page.words.push(o)}),s.block.lines.push(s),s.page.lines.push(s)}),r.page.paragraphs.push(r)})}),e}},function(e,t,r){const s=r(0);let o=0;e.exports=class{constructor(e){this.id="Job-"+ ++o+"-"+Math.random().toString(16).slice(3,8),this._instance=e,this._resolve=[],this._reject=[],this._progress=[],this._finally=[]}then(e,t){return this._resolve.push?this._resolve.push(e):e(this._resolve),t&&this.catch(t),this}catch(e){return this._reject.push?this._reject.push(e):e(this._reject),this}progress(e){return this._progress.push(e),this}finally(e){return this._finally.push(e),this}_send(e,t){s.sendPacket(this._instance,{jobId:this.id,action:e,payload:t})}_handle(e){var t=e.data;let r=!1;"resolve"===e.status?(0===this._resolve.length&&console.log(t),this._resolve.forEach(e=>{var r=e(t);r&&"function"==typeof r.then&&console.warn("TesseractJob instances do not chain like ES6 Promises. To convert it into a real promise, use Promise.resolve.")}),this._resolve=t,this._instance._dequeue(),r=!0):"reject"===e.status?(0===this._reject.length&&console.error(t),this._reject.forEach(e=>e(t)),this._reject=t,this._instance._dequeue(),r=!0):"progress"===e.status?this._progress.forEach(e=>e(t)):console.warn("Message type unknown",e.status),r&&this._finally.forEach(e=>e(t))}}}]);