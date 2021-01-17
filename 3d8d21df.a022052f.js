(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{71:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"metadata",(function(){return c})),t.d(r,"rightToc",(function(){return u})),t.d(r,"default",(function(){return l}));var a=t(3),n=t(7),o=(t(0),t(83)),i={id:"about",title:"About",sidebar_label:"About",slug:"/"},c={unversionedId:"about",id:"about",isDocsHomePage:!1,title:"About",description:"Idearium Lib is group of es6 packages built by Idearium for Idearium. We use these packages across all of our development work and applications on a daily basis. You'll find most of these packages on NPM.",source:"@site/docs/about.md",slug:"/",permalink:"/idearium-lib/docs/",editUrl:"https://github.com/idearium/idearium-lib/tree/feature-monorepo/docusaurus/docs/about.md",version:"current",sidebar_label:"About",sidebar:"sidebar",next:{title:"@idearium/apm",permalink:"/idearium-lib/docs/apm"}},u=[{value:"Monorepo",id:"monorepo",children:[]},{value:"Versioning",id:"versioning",children:[]},{value:"Publishing",id:"publishing",children:[]},{value:"Docs",id:"docs",children:[]}],s={rightToc:u};function l(e){var r=e.components,t=Object(n.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,t,{components:r,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Idearium Lib is group of es6 packages built by Idearium for Idearium. We use these packages across all of our development work and applications on a daily basis. You'll find most of these packages on ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.npmjs.com/search?q=%40idearium"}),"NPM"),"."),Object(o.b)("h2",{id:"monorepo"},"Monorepo"),Object(o.b)("p",null,"The ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/idearium/idearium-lib"}),"Idearium Lib repository")," is a monorepo. It features all of our ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/idearium/idearium-lib/tree/monorepo/packages"}),"packages"),". We use Yarn's workspaces feature to make it easy to manage multiple packages in one Git repository."),Object(o.b)("h2",{id:"versioning"},"Versioning"),Object(o.b)("p",null,"Each package is individually versioned. We don't version the entire repository."),Object(o.b)("p",null,"We use semver for versioning, however, each version is prefixed with the package is corresponds to, for example, ",Object(o.b)("code",null,"@idearium/lists-v1.0.0"),"."),Object(o.b)("p",null,"You can find all of ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/idearium/idearium-lib/releases"}),"our releases on GitHub"),"."),Object(o.b)("h2",{id:"publishing"},"Publishing"),Object(o.b)("p",null,"We use GitHub Actions and workflows to test our packages and publish them at the appropriate time."),Object(o.b)("p",null,"Each package has a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/idearium/idearium-lib/tree/monorepo/.github/workflows"}),"workflow")," to handle the idiosyncrasies of each particular package."),Object(o.b)("p",null,"You can find all of ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/idearium/idearium-lib/releases"}),"our releases on GitHub"),"."),Object(o.b)("h2",{id:"docs"},"Docs"),Object(o.b)("p",null,"The Idearium Lib docs are auto deployed whenever there is a change made and the PR is merged into the main branch (feature-monorepo)."))}l.isMDXComponent=!0},83:function(e,r,t){"use strict";t.d(r,"a",(function(){return p})),t.d(r,"b",(function(){return m}));var a=t(0),n=t.n(a);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=n.a.createContext({}),l=function(e){var r=n.a.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},p=function(e){var r=l(e.components);return n.a.createElement(s.Provider,{value:r},e.children)},b={inlineCode:"code",wrapper:function(e){var r=e.children;return n.a.createElement(n.a.Fragment,{},r)}},d=n.a.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),p=l(t),d=a,m=p["".concat(i,".").concat(d)]||p[d]||b[d]||o;return t?n.a.createElement(m,c(c({ref:r},s),{},{components:t})):n.a.createElement(m,c({ref:r},s))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=d;var c={};for(var u in r)hasOwnProperty.call(r,u)&&(c[u]=r[u]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=t[s];return n.a.createElement.apply(null,i)}return n.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);