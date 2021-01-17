(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{61:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return b}));var r=n(3),a=n(7),i=(n(0),n(83)),c={id:"encryption",title:"@idearium/encryption"},o={unversionedId:"encryption",id:"encryption",isDocsHomePage:!1,title:"@idearium/encryption",description:"A library to make encrypting and decrypting plain text in Node.js painless.",source:"@site/docs/encryption.md",slug:"/encryption",permalink:"/idearium-lib/docs/encryption",editUrl:"https://github.com/idearium/idearium-lib/tree/feature-monorepo/docusaurus/docs/encryption.md",version:"current",sidebar:"sidebar",previous:{title:"@idearium/apm",permalink:"/idearium-lib/docs/apm"},next:{title:"@idearium/lists",permalink:"/idearium-lib/docs/lists"}},l=[{value:"Installation",id:"installation",children:[{value:"Beta installation",id:"beta-installation",children:[]}]},{value:"Usage",id:"usage",children:[{value:"Create a library file",id:"create-a-library-file",children:[]},{value:"Use the library file",id:"use-the-library-file",children:[]}]},{value:"Advanced usage",id:"advanced-usage",children:[{value:"Encryption algorithms",id:"encryption-algorithms",children:[]}]},{value:"Use <code>decrypt</code> and <code>encrypt</code> directly",id:"use-decrypt-and-encrypt-directly",children:[]}],p={rightToc:l};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"A library to make encrypting and decrypting plain text in Node.js painless."),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"$ yarn add -E @idearium/encryption\n")),Object(i.b)("h3",{id:"beta-installation"},"Beta installation"),Object(i.b)("p",null,"If you need to install a beta version, you can:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"$ yarn add -E @idearium/encryption@beta\n")),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("p",null,"To use ",Object(i.b)("inlineCode",{parentName:"p"},"@idearium/encryption"),", follow these steps:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"#create-a-library-file"}),"Create a library file.")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"#use-the-library-file"}),"Use the library file within your app."))),Object(i.b)("h3",{id:"create-a-library-file"},"Create a library file"),Object(i.b)("p",null,"Start by creating a library file which you'll export the functions generated by ",Object(i.b)("inlineCode",{parentName:"p"},"atomic")," and use these within your application."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-JavaScript"}),"// lib/encryption.js\n\nimport { atomic } from '@idearium/encryption';\n\nconst iv = '6iz68yjtmVj&r7$H';\nconst key = 'AsRdgU=cwnu8BCXNpgV2gAQk8XL;4oTW';\n\nexport const {decrypt, encrypt} = atomic({ iv, key });\n\n")),Object(i.b)("h3",{id:"use-the-library-file"},"Use the library file"),Object(i.b)("p",null,"Now you can use the library file you've created to actually encrypt and decrypt information in your app."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-JavaScript"}),"// another-file.js\n\nimport assert from 'assert';\nimport {decrypt, encrypt} from './lib/encryption.js';\n\nconst text = 'Some text;\nconst encrypted = encrypt({ text });\nconst decrypted = decrypt({ text: encrypted });\n\nconst matches = assert.equal(text, decrypted);\n")),Object(i.b)("h2",{id:"advanced-usage"},"Advanced usage"),Object(i.b)("p",null,"This library also allows you to do the following:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Change the encryption algorithm."),Object(i.b)("li",{parentName:"ul"},"Directly use the ",Object(i.b)("inlineCode",{parentName:"li"},"encrypt")," and ",Object(i.b)("inlineCode",{parentName:"li"},"decrypt")," functions exported by the library.")),Object(i.b)("h3",{id:"encryption-algorithms"},"Encryption algorithms"),Object(i.b)("p",null,"By default, this library uses the ",Object(i.b)("inlineCode",{parentName:"p"},"aes-256-ctr")," algorithm. However, you can use any encryption algorithm supported by Node.js:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-JavaScript"}),"// lib/encryption.js\n\nimport { atomic } from '@idearium/encryption';\n\nconst algorithm = 'aes-256-cbc';\nconst iv = '6iz68yjtmVj&r7$H';\nconst key = 'AsRdgU=cwnu8BCXNpgV2gAQk8XL;4oTW';\n\nexport const {decrypt, encrypt} = atomic({ algorithm, iv, key });\n\n")),Object(i.b)("p",null,"Some algorithm's such as ",Object(i.b)("inlineCode",{parentName:"p"},"rc4")," don't require an IV, in which case you can pass ",Object(i.b)("inlineCode",{parentName:"p"},"null"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-JavaScript"}),"\nexport default atomic({\n    algorithm: 'rc4',\n    iv: null,\n    key: 'Z4nDPfxKjPGGCqA2wVKjMMB{nyL^ytWNbWyzLg4xbvxX6ioxvxRw'\n});\n\n")),Object(i.b)("h2",{id:"use-decrypt-and-encrypt-directly"},"Use ",Object(i.b)("inlineCode",{parentName:"h2"},"decrypt")," and ",Object(i.b)("inlineCode",{parentName:"h2"},"encrypt")," directly"),Object(i.b)("p",null,"The examples above show how to use the library with ",Object(i.b)("inlineCode",{parentName:"p"},"atomic")," which returns an object with keys ",Object(i.b)("inlineCode",{parentName:"p"},"decrypt")," and ",Object(i.b)("inlineCode",{parentName:"p"},"encrypt"),". These keys contain functions which are bound to the same ",Object(i.b)("inlineCode",{parentName:"p"},"algorithm"),", ",Object(i.b)("inlineCode",{parentName:"p"},"iv")," and ",Object(i.b)("inlineCode",{parentName:"p"},"key")," values provided to ",Object(i.b)("inlineCode",{parentName:"p"},"atomic"),". This makes it easy to encrypt and decrypt using the same settings."),Object(i.b)("p",null,"However, there are some instances in which you might only want to encrypt or decrypt some text (for example, encrypting a value to send to a third party). In this instance you can use the ",Object(i.b)("inlineCode",{parentName:"p"},"decrypt")," and ",Object(i.b)("inlineCode",{parentName:"p"},"encrypt")," functions exported by the library:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-JavaScript"}),"\nimport { encrypt } from `@idearium/encryption`;\n\nexport default ({ algorithm = 'rc4',\n    iv = null,\n    key = 'Z4nDPfxKjPGGCqA2wVKjMMB{nyL^ytWNbWyzLg4xbvxX6ioxvxRw' } = {}) =>\n        encrypt({ algorithm, iv, key });\n\n")))}b.isMDXComponent=!0},83:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return y}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),b=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=b(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=b(n),u=r,y=s["".concat(c,".").concat(u)]||s[u]||d[u]||i;return n?a.a.createElement(y,o(o({ref:t},p),{},{components:n})):a.a.createElement(y,o({ref:t},p))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,c=new Array(i);c[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var p=2;p<i;p++)c[p]=n[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);