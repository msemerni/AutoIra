try{const e=window.location.href,t="http://venues.placer.team:8080/",o="http://staging-venues.placer.team:8080/",n={},r="oid:pl",i="addr:city",a="addr:postcode",l="addr:state",c="addr:street",d="analytics:url:pl";if(0!==e.indexOf(t)&&0!==e.indexOf(o))throw new Error(`Switch to Venues Editor\n(${t} or\n${o})\n`);{const t=document.querySelectorAll(".tag-list .key-wrap>input"),o=document.querySelectorAll(".tag-list .value-wrap>input");for(let e=0;e<t.length;e++)n[t[e].value]=o[e].value;const s=document.querySelector(".zoom-to-selection-control>.disabled");if(!n[r]||s)throw copyToClipboard({}),new Error("Pick a point first\n");n.fullAddress=`${n[c]}, ${n[i]}, ${n[l]} ${n[a]}`;try{n.analyticsUrlCutted=n[d].substring(0,n[d].indexOf("?"))}catch{alert(`Missing/wrong ${d}`)}n.venueURL=e}copyToClipboard(n)}catch(e){alert(`${e}\nCopy failed!`)}function copyToClipboard(e){const t=document.createElement("textarea");t.id="bufferDivCopy",t.style.cssText="\n      position: absolute;\n      top: -99999px;\n      left: -99999px;\n      z-index: -99999;\n      opacity: 0;\n      ",t.innerHTML=JSON.stringify(e),document.body.append(t),t.select(),document.execCommand("copy"),t.remove()}