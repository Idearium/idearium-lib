(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{77:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return n})),t.d(a,"metadata",(function(){return r})),t.d(a,"rightToc",(function(){return u})),t.d(a,"default",(function(){return c}));var l=t(3),i=t(7),s=(t(0),t(85)),n={id:"lists",title:"@idearium/lists"},r={unversionedId:"lists",id:"lists",isDocsHomePage:!1,title:"@idearium/lists",description:"A library to make it easy to work with application lists. Application lists are used to record any fixed parts of your application, and use the following terminology:",source:"@site/docs/lists.md",slug:"/lists",permalink:"/idearium-lib/docs/lists",editUrl:"https://github.com/idearium/idearium-lib/tree/feature-monorepo/docusaurus/docs/lists.md",version:"current",sidebar:"sidebar",previous:{title:"@idearium/encryption",permalink:"/idearium-lib/docs/encryption"},next:{title:"@idearium/log",permalink:"/idearium-lib/docs/log"}},u=[{value:"Installation",id:"installation",children:[{value:"Beta installation",id:"beta-installation",children:[]}]},{value:"Usage",id:"usage",children:[{value:"Create a library file",id:"create-a-library-file",children:[]},{value:"Use the library file",id:"use-the-library-file",children:[]}]},{value:"Functions",id:"functions",children:[{value:"getKeys",id:"getkeys",children:[]},{value:"getList",id:"getlist",children:[]},{value:"getListKey",id:"getlistkey",children:[]},{value:"getListValue",id:"getlistvalue",children:[]},{value:"getSelectList",id:"getselectlist",children:[]},{value:"getSelectListWithKeys",id:"getselectlistwithkeys",children:[]},{value:"getSelectListWithValues",id:"getselectlistwithvalues",children:[]},{value:"getValues",id:"getvalues",children:[]}]}],d={rightToc:u};function c(e){var a=e.components,t=Object(i.a)(e,["components"]);return Object(s.b)("wrapper",Object(l.a)({},d,t,{components:a,mdxType:"MDXLayout"}),Object(s.b)("p",null,"A library to make it easy to work with application lists. Application lists are used to record any fixed parts of your application, and use the following terminology:"),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"export default {\n    group: {\n        list: {\n            key: 'value'\n        }\n    },\n};\n")),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("inlineCode",{parentName:"li"},"group")," is used to define a group of lists which share a context (usually described by the group name)."),Object(s.b)("li",{parentName:"ul"},Object(s.b)("inlineCode",{parentName:"li"},"list")," is the list itself.")),Object(s.b)("h2",{id:"installation"},"Installation"),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-shell"}),"$ yarn add -E @idearium/lists\n")),Object(s.b)("h3",{id:"beta-installation"},"Beta installation"),Object(s.b)("p",null,"If you need to install a beta version, you can:"),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-shell"}),"$ yarn add -E @idearium/lists@beta\n")),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("p",null,"To use ",Object(s.b)("inlineCode",{parentName:"p"},"@idearium/lists"),", follow these steps:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("a",Object(l.a)({parentName:"li"},{href:"#create-a-library-file"}),"Create a library file.")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("a",Object(l.a)({parentName:"li"},{href:"#use-the-library-file"}),"Use the library file within your app."))),Object(s.b)("h3",{id:"create-a-library-file"},"Create a library file"),Object(s.b)("p",null,"Start by creating a library file containing your lists. Import ",Object(s.b)("inlineCode",{parentName:"p"},"@idearium/lists")," and use it to wrap export so that your list is augmented with help functions to access your lists in various formats."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"// lib/lists.js\n\nimport lists from '@idearium/lists';\n\nconst groupedLists = {\n    common: {\n        days: {\n            friday: 'Friday',\n            monday: 'Monday',\n            saturday: 'Saturday',\n            sunday: 'Sunday',\n            thursday: 'Thursday',\n            tuesday: 'Tuesday',\n            wednesday: 'Wednesday'\n        },\n        states: {\n            ACT: 'Australian Capital Territory',\n            NSW: 'New South Wales',\n            NT: 'Northern Territory',\n            QLD: 'Queensland',\n            SA: 'South Australia',\n            TAS: 'Tasmania',\n            VIC: 'Victoria',\n            WA: 'Western Australia'\n        }\n    }\n};\n\nexport default lists({ lists: groupedLists });\n")),Object(s.b)("h3",{id:"use-the-library-file"},"Use the library file"),Object(s.b)("p",null,"You can now use the lists anywhere in your app."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"import lists from './lists';\n\nconst days = lists.getKeys({ group: 'common', list: 'days' });\n// days == ['friday','monday','saturday','sunday','thursday','tuesday','wednesday']\n\nconst states = lists.getKeys({ group: 'common', list: 'states' });\n// states == ['ACT','NSW','NT','QLD','SA','TAS','VIC', 'WA']\n")),Object(s.b)("h2",{id:"functions"},"Functions"),Object(s.b)("p",null,"Once setup, there are a number of functions you can use to retrieve data from your lists."),Object(s.b)("h3",{id:"getkeys"},"getKeys"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"getKeys")," will return an array of the keys from a list."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"const days = getKeys({ group: 'common', list: 'days' });\n// days == ['friday','monday','saturday','sunday','thursday','tuesday','wednesday']\n")),Object(s.b)("h3",{id:"getlist"},"getList"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"getList")," will return a list without any modification."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"const days = getList({ group: 'common', list: 'days' });\n// days == {friday: 'Friday', monday: 'Monday', saturday: 'Saturday', sunday: 'Sunday', thursday: 'Thursday',tuesday: 'Tuesday', wednesday: 'Wednesday'}\n")),Object(s.b)("h3",{id:"getlistkey"},"getListKey"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"getListKey")," will return a specific key from a list."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"const day = getListKey({ group: 'common', list: 'days', value: 'Thursday' });\n// days == 'thursday'\n")),Object(s.b)("h3",{id:"getlistvalue"},"getListValue"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"getListValue")," will return a specific value from a list."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"const day = getListValue({ group: 'common', key: 'thursday', list: 'days' });\n// days == 'Thursday'\n")),Object(s.b)("h3",{id:"getselectlist"},"getSelectList"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"getSelectList")," will return an array of objects with label (",Object(s.b)("inlineCode",{parentName:"p"},"value"),") and value (",Object(s.b)("inlineCode",{parentName:"p"},"key"),") properties."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"const days = getSelectList({ group: 'common', list: 'days' });\n// days == [{label: 'Friday', value: 'friday'}, {label: 'Monday', value: 'monday'}, {label:'Saturday', value:'saturday'}, {label: 'Sunday', value: 'sunday'}, {label: 'Thursday', value: 'thursday'}, {label: 'Tuesday', value: 'tuesday'}, {label: 'Wednesday', value: 'wednesday'}]\n")),Object(s.b)("h3",{id:"getselectlistwithkeys"},"getSelectListWithKeys"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"getSelectListWithKeys")," will return an array of objects with label and value properties, using only the ",Object(s.b)("inlineCode",{parentName:"p"},"key"),"."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"const days = getSelectListWithKeys({ group: 'common', list: 'days' });\n// days == [{label: 'friday', value: 'friday'}, {label: 'monday', value: 'monday'}, {label:'saturday', value:'saturday'}, {label: 'sunday', value: 'sunday'}, {label: 'thursday', value: 'thursday'}, {label: 'tuesday', value: 'tuesday'}, {label: 'wednesday', value: 'wednesday'}]\n")),Object(s.b)("h3",{id:"getselectlistwithvalues"},"getSelectListWithValues"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"getSelectListWithValues")," will return an array of objects with label and value properties, using only the ",Object(s.b)("inlineCode",{parentName:"p"},"value"),"."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"const days = getSelectListWithValues({ group: 'common', list: 'days' });\n// days == [{label: 'Friday', value: 'Friday'}, {label: 'Monday', value: 'Monday'}, {label:'Saturday', value:'Saturday'}, {label: 'Sunday', value: 'Sunday'}, {label: 'Thursday', value: 'Thursday'}, {label: 'Tuesday', value: 'Tuesday'}, {label: 'Wednesday', value: 'Wednesday'}]\n")),Object(s.b)("h3",{id:"getvalues"},"getValues"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"getValues")," will return an array of the values from a list."),Object(s.b)("pre",null,Object(s.b)("code",Object(l.a)({parentName:"pre"},{className:"language-JavaScript"}),"const days = getValues({ group: 'common', list: 'days' });\n// days == ['Friday','Monday','Saturday','Sunday','Thursday','Tuesday','Wednesday']\n")))}c.isMDXComponent=!0}}]);