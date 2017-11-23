!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/build/",t(t.s=4)}([function(e,t,n){"use strict";function r(){d.ready!==!1&&(f.update(d.domElement),i.default.visible=s.visible,a()),requestAnimationFrame(r)}function a(){c.render(i.default,s)}function o(){d.onResizeElement(),d.copyElementSizeTo(c.domElement),null!==f.arController&&d.copyElementSizeTo(f.arController.canvas)}var l=n(2),i=function(e){return e&&e.__esModule?e:{default:e}}(l),u="https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data",c=new THREE.WebGLRenderer({alpha:!0});c.setClearColor(new THREE.Color("lightgrey"),0),c.setSize(640,480),c.domElement.style.position="absolute",c.domElement.style.top="0px",c.domElement.style.left="0px",document.body.appendChild(c.domElement);var s=new THREE.Camera;i.default.add(s),window.addEventListener("resize",o);var d=new THREEx.ArToolkitSource({sourceType:"webcam"});d.init(o);var f=new THREEx.ArToolkitContext({detectionMode:"mono",cameraParametersUrl:u+"/data/camera_para.dat"});f.init(function(){s.projectionMatrix.copy(f.getProjectionMatrix())});new THREEx.ArMarkerControls(f,s,{type:"pattern",patternUrl:u+"/data/patt.hiro",changeMatrixMode:"cameraTransformMatrix"});i.default.visible=!1,r()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SIZE=1,t.FOCAL=3},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),a=n(1),o=["#02f3b8","#7fbcfb","#62ff70","#afc0ac","#60cc5c","#00cebb","#abffc6"],l=[{label:"webgl",value:533e4},{label:"d3.js",value:139e5},{label:"nantes",value:998e5},{label:"camembert",value:147e5}].map(function(e,t){var n=e.label;return{value:e.value,label:n,color:o[t%o.length]}}).sort(function(e,t){return t.value-e.value}),i=new THREE.Scene,u=new THREE.SpotLight;u.castShadow=!0,u.position.set(0,a.FOCAL,a.FOCAL),i.add(u);var c=new THREE.PointLight(1193046);c.position.set(a.FOCAL,0,a.FOCAL),i.add(c);var s=Math.max.apply(Math,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(l.map(function(e){return e.value}))),d=l.map(function(e){return e.value}).reduce(function(e,t){return e+t}),f=-Math.PI/4,E=new THREE.Group;i.add(E),E.rotation.x=-Math.PI/2,E.translateY(-.5),window.CONTAINER=E,l.forEach(function(e){var t=e.value,n=e.color,o=e.label,l=2*Math.PI*t/d,i=a.SIZE/10*Math.cos(f+l/2),u=a.SIZE/10*Math.sin(f+l/2),c=new THREE.MeshPhongMaterial({color:n}),p=new THREE.Shape;p.moveTo(i,u),p.arc(0,0,a.SIZE/2,f,f+l,!1),p.lineTo(i,u);var m=new THREE.ExtrudeGeometry(p,{step:2,amount:t*a.SIZE/4/s+a.SIZE/4,bevelEnabled:!0,bevelThickness:.01,bevelSize:.01,bevelSegments:1}),v=new THREE.Mesh(m,c);v.position.y=.5,E.add(v);var b=(0,r.makeTextSprite)(o);b.position.set(a.SIZE*Math.cos(f+l/2),a.SIZE*Math.sin(f+l/2)+.5,t*a.SIZE/2/s+a.SIZE/2),E.add(b),f+=l}),t.default=i},function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.fontFace||"sans-serif",r=t.fontSize||30,a=document.createElement("canvas"),o=a.getContext("2d");o.font=r+"px "+n;var l=o.measureText(e);a.width=l.width,a.height=r,o.fillStyle="rgba(255, 255, 255, 0.5)",o.fillRect(0,0,l.width+4,r),o.fillStyle="#000",o.font=r+"px "+n,o.fillText(e,2,r-2);var i=new THREE.Texture(a);i.needsUpdate=!0;var u=new THREE.SpriteMaterial({map:i}),c=new THREE.Sprite(u);return c.scale.set(l.width/130,r/130,1/130),c}Object.defineProperty(t,"__esModule",{value:!0}),t.makeTextSprite=r},function(e,t,n){e.exports=n(0)}]);