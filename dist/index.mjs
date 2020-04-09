import e from"ra-realtime";import r from"path-browserify";import{firestore as t,apps as n,app as o,initializeApp as i}from"firebase/app";import"firebase/firestore";import"firebase/auth";import"firebase/storage";import{CREATE as a,DELETE as s,DELETE_MANY as c,GET_LIST as u,GET_MANY as l,GET_MANY_REFERENCE as p,GET_ONE as f,UPDATE as m,UPDATE_MANY as h,AUTH_LOGIN as d,AUTH_LOGOUT as v,AUTH_ERROR as P,AUTH_CHECK as y,AUTH_GET_PERMISSIONS as g}from"react-admin";var b=function(e,r){return function(t,n,o){var i=r||{};if((!Array.isArray(i.watch)||i.watch.includes(n))&&(!Array.isArray(i.dontwatch)||!i.dontwatch.includes(n)))return{subscribe:function(r){return e(t,n,o).then(function(e){return r.next(e)}).catch(function(e){return r.error(e)}),{unsubscribe:function(){}}}}}};function w(r,t){return e(b(r,t))}function j(e,r){R&&console.log("react-admin-firebase: ",e,r)}function A(e,r){R&&console.error("react-admin-firebase: ",e,r)}var R=!1;function F(e,r){(e&&e.debug||r.logging)&&(R=!0)}function G(e,r){try{var t=e()}catch(e){return r(e)}return t&&t.then?t.then(void 0,r):t}function D(e,t){if(!e)return t;if(!t)throw new Error("Resource name must be a string of length greater than 0 characters");var n=r.join("/",e,"/",t,"/");if((n.split("/").length-1)%2)throw new Error('The rootRef path must point to a "document" not a "collection"\ne.g. /collection/document/ or /collection/document/collection/document/');return n.slice(1,-1)}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var C=function(e,r){this.fireWrapper=e,this.options=r,this.resources={},this.db=e.db()};function U(e,r,t){e.sort(function(e,n){var o,i,a=e[r],s=n[r];return Number.isFinite(a)&&Number.isFinite(s)?(o=a,i=s):(o=(e[r]||"").toString().toLowerCase(),i=(n[r]||"").toString().toLowerCase()),o>i?"asc"===t?1:-1:o<i?"asc"===t?-1:1:0})}C.prototype.GetResource=function(e){var r=this.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r},C.prototype.TryGetResourcePromise=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e,r)).then(function(){var r=t.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r})}catch(e){return Promise.reject(e)}},C.prototype.RefreshResource=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e,r)).then(function(){var n=t.resources[e];j("resourceManager.RefreshResource",{relativePath:e});var o=t.applyQuery(n.collection,r);return Promise.resolve(o.get()).then(function(e){n.list=e.docs.map(function(e){return t.parseFireStoreDocument(e)})})})}catch(e){return Promise.reject(e)}},C.prototype.GetSingleDoc=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e)).then(function(){return Promise.resolve(t.resources[e].collection.doc(r).get()).then(function(e){if(!e.exists)throw new Error("react-admin-firebase: No id found matching: "+r);return t.parseFireStoreDocument(e)})})}catch(e){return Promise.reject(e)}},C.prototype.initPath=function(e,r){try{var t=this,n=D(t.options.rootRef,e);return j("resourceManager.initPath:::",{absolutePath:n}),Promise.resolve(t.isCollectionAccessible(n,r)).then(function(r){var o=t.resources[e];if(r){if(!o){var i=t.db.collection(n);t.resources[e]={collection:i,list:[],path:e,pathAbsolute:n}}}else o&&t.removeResource(e)})}catch(e){return Promise.reject(e)}},C.prototype.parseFireStoreDocument=function(e){var r=e.data();return Object.keys(r).forEach(function(e){var t=r[e];t&&t.toDate&&t.toDate instanceof Function&&(r[e]=t.toDate())}),Object.assign({},{id:e.id},r)},C.prototype.getUserLogin=function(){try{var e=this;return Promise.resolve(new Promise(function(r,t){e.fireWrapper.auth().onAuthStateChanged(function(e){r(e)})}))}catch(e){return Promise.reject(e)}},C.prototype.isCollectionAccessible=function(e,r){try{var t=!1,n=this,o=G(function(){var t=n.db.collection(e),o=n.applyQuery(t,r);return Promise.resolve(o.get()).then(function(){})},function(){return t=!0,!1});return Promise.resolve(o&&o.then?o.then(function(e){return!t||e}):!t||o)}catch(e){return Promise.reject(e)}},C.prototype.removeResource=function(e){delete this.resources[e]},C.prototype.applyQuery=function(e,r){return r?r(e):e};var E=function(e,r){this.fireWrapper=e,this.options=r,this.db=e.db(),this.rm=new C(this.fireWrapper,this.options)};E.prototype.apiGetList=function(e,r){try{j("apiGetList",{resourceName:e,params:r});var t=r.filter.collectionQuery;return delete r.filter.collectionQuery,Promise.resolve(this.tryGetResource(e,"REFRESH",t)).then(function(e){var t=e.list;if(null!=r.sort){var n=r.sort;U(t,n.field,"ASC"===n.order?"asc":"desc")}var o=function(e,r){if(!(t=r)||"{}"===JSON.stringify(t))return e;var t,n=Object.keys(r);return e.filter(function(e){return n.reduce(function(t,n){var o=r[n];null!=o&&null!=o||(o="");var i=o.toString().toLowerCase(),a=e[n];if(null==a)return!1;var s=a.toString().toLowerCase().includes(i);return t||s},!1)})}(t,r.filter),i=(r.pagination.page-1)*r.pagination.perPage;return{data:o.slice(i,i+r.pagination.perPage),total:e.list.length}})}catch(e){return Promise.reject(e)}},E.prototype.apiGetOne=function(e,r){try{var t=this;return j("apiGetOne",{resourceName:e,params:r}),Promise.resolve(G(function(){return Promise.resolve(t.rm.GetSingleDoc(e,r.id)).then(function(e){return{data:e}})},function(){throw new Error("Error getting id: "+r.id+" from collection: "+e)}))}catch(e){return Promise.reject(e)}},E.prototype.apiCreate=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){return j("apiCreate",{resourceName:e,resource:n,params:r}),Promise.resolve(t.getCurrentUserEmail()).then(function(e){var o=!1;function i(i){if(o)return i;var a=t.db.collection("collections").doc().id;return Promise.resolve(t.parseDataAndUpload(n,a,r.data)).then(function(r){var o=t.options.timestamps?Object.assign({},r,{createdate:t.fireWrapper.serverTimestamp(),lastupdate:t.fireWrapper.serverTimestamp(),createdby:e,updatedby:e}):Object.assign({},r);return Promise.resolve(n.collection.doc(a).set(o,{merge:!1})).then(function(){return{data:Object.assign({},r,{id:a})}})})}var a=r.data&&r.data.id,s=function(){if(a){var i=r.data.id;return Promise.resolve(t.parseDataAndUpload(n,i,r.data)).then(function(r){if(!i)throw new Error("id must be a valid string");var a=t.options.timestamps?Object.assign({},r,{createdate:t.fireWrapper.serverTimestamp(),lastupdate:t.fireWrapper.serverTimestamp(),createdby:e,updatedby:e}):Object.assign({},r);return Promise.resolve(n.collection.doc(i).set(a,{merge:!0})).then(function(){return o=!0,{data:Object.assign({},r,{id:i})}})})}}();return s&&s.then?s.then(i):i(s)})})}catch(e){return Promise.reject(e)}},E.prototype.apiUpdate=function(e,r){try{var t=this,n=r.id;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(o){return j("apiUpdate",{resourceName:e,resource:o,params:r}),Promise.resolve(t.getCurrentUserEmail()).then(function(e){return Promise.resolve(t.parseDataAndUpload(o,n,r.data)).then(function(r){var i=t.options.timestamps?Object.assign({},r,{lastupdate:t.fireWrapper.serverTimestamp(),updatedby:e}):Object.assign({},r);return o.collection.doc(n).update(i).catch(function(e){A("apiUpdate error",{error:e})}),{data:Object.assign({},r,{id:n})}})})})}catch(e){return Promise.reject(e)}},E.prototype.apiUpdateMany=function(e,r){try{var t=this;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(n){j("apiUpdateMany",{resourceName:e,resource:n,params:r});var o=r.ids;return Promise.resolve(t.getCurrentUserEmail()).then(function(e){return Promise.resolve(Promise.all(o.map(function(o){try{return Promise.resolve(t.parseDataAndUpload(n,o,r.data)).then(function(r){var i=t.options.timestamps?Object.assign({},r,{lastupdate:t.fireWrapper.serverTimestamp(),updatedby:e}):Object.assign({},r);return n.collection.doc(o).update(i).catch(function(e){A("apiUpdateMany error",{error:e})}),Object.assign({},r,{id:o})})}catch(e){return Promise.reject(e)}}))).then(function(e){return{data:e}})})})}catch(e){return Promise.reject(e)}},E.prototype.apiDelete=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){return j("apiDelete",{resourceName:e,resource:t,params:r}),t.collection.doc(r.id).delete().catch(function(e){A("apiDelete error",{error:e})}),{data:r.previousData}})}catch(e){return Promise.reject(e)}},E.prototype.apiDeleteMany=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){j("apiDeleteMany",{resourceName:e,resource:n,params:r});for(var o=[],i=t.db.batch(),a=0,s=r.ids;a<s.length;a+=1){var c=s[a];i.delete(n.collection.doc(c)),o.push({id:c})}return i.commit().catch(function(e){A("apiDeleteMany error",{error:e})}),{data:o}})}catch(e){return Promise.reject(e)}},E.prototype.apiGetMany=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){return j("apiGetMany",{resourceName:e,resource:t,params:r}),Promise.resolve(Promise.all(r.ids.map(function(e){return t.collection.doc(e).get()}))).then(function(e){return{data:e.map(function(e){return Object.assign({},e.data(),{id:e.id})})}})})}catch(e){return Promise.reject(e)}},E.prototype.apiGetManyReference=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){j("apiGetManyReference",{resourceName:e,resource:t,params:r});var n=t.list,o=r.target,i=r.id,a=n.filter(function(e){return e[o]===i});if(null!=r.sort){var s=r.sort;U(n,s.field,"ASC"===s.order?"asc":"desc")}var c=(r.pagination.page-1)*r.pagination.perPage;return{data:a.slice(c,c+r.pagination.perPage),total:a.length}})}catch(e){return Promise.reject(e)}},E.prototype.tryGetResource=function(e,r,t){try{var n=this;function o(){return n.rm.TryGetResourcePromise(e,t)}var i=function(){if(r)return Promise.resolve(n.rm.RefreshResource(e,t)).then(function(){})}();return Promise.resolve(i&&i.then?i.then(o):o())}catch(e){return Promise.reject(e)}},E.prototype.getCurrentUserEmail=function(){try{return Promise.resolve(this.rm.getUserLogin()).then(function(e){return e?e.email:"annonymous user"})}catch(e){return Promise.reject(e)}},E.prototype.parseDataAndUpload=function(e,r,t,n,o){try{var i=this;if(!t)return Promise.resolve(t);var a=n||e.collection.doc(r).path;return Promise.resolve(Promise.all(Object.keys(t).map(function(n){try{function s(){var t=!1;function s(e){return t?e:(j("parseDataAndUpload : calling parseDataField",{val:c,docPath:a,fieldName:n}),Promise.resolve(Promise.all([i.parseDataField(c,a,n)])))}var u=a.split("/");u[u.length-1]!==o&&(a+="/"+o);var l=function(){if(c&&"object"==typeof c&&!c.hasOwnProperty("rawFile"))return j("parseDataAndUpload : recalling with",{r:e,id:r,val:c,docPath:a,fieldName:n}),t=!0,Promise.resolve(i.parseDataAndUpload(e,r,c,a,n))}();return l&&l.then?l.then(s):s(l)}var c=t[n],u=Array.isArray(c),l=function(){if(u)return Promise.resolve(Promise.all(c.map(function(t,s){try{return c[s]&&c[s].hasOwnProperty("rawFile")?Promise.resolve(Promise.all([i.parseDataField(c[s],a,n+s)])):Promise.all(Object.keys(t).map(function(c){try{var u=!1;function l(e){return u?e:Promise.resolve(i.parseDataField(p,a,(o?"/"+o:"")+"/"+n+"/"+s+"/"+c))}var p=t[c],f=function(){if(p&&"object"==typeof p&&!p.hasOwnProperty("rawFile"))return a+="/"+s+"/"+n,u=!0,Promise.resolve(i.parseDataAndUpload(e,r,p,a,n))}();return Promise.resolve(f&&f.then?f.then(l):l(f))}catch(e){return Promise.reject(e)}}))}catch(e){return Promise.reject(e)}}))).then(function(){})}();return Promise.resolve(l&&l.then?l.then(s):s())}catch(e){return Promise.reject(e)}}))).then(function(){return console.log("data",t),t})}catch(e){return Promise.reject(e)}},E.prototype.parseDataField=function(e,r,t){try{if(!e||!e.hasOwnProperty("rawFile"))return Promise.resolve();var n=Object.keys(e).find(function(e){return"rawFile"!==e&&"title"!==e});return Promise.resolve(this.uploadAndGetLink(e.rawFile,r,t)).then(function(r){e[n]=r,delete e.rawFile})}catch(e){return Promise.reject(e)}},E.prototype.uploadAndGetLink=function(e,t,n){try{var o=r.join(t,n);return Promise.resolve(this.saveFile(o,e))}catch(e){return Promise.reject(e)}},E.prototype.saveFile=function(e,r){try{j("saveFile() saving file...",{storagePath:e,rawFile:r});var t=this.fireWrapper.storage().ref(e).put(r);return Promise.resolve(G(function(){return Promise.resolve(new Promise(function(e,r){return t.then(e).catch(r)})).then(function(r){return Promise.resolve(r.ref.getDownloadURL()).then(function(t){return j("saveFile() saved file",{storagePath:e,taskResult:r,getDownloadURL:t}),t})})},function(e){A("storage/unknown"===e.code?'saveFile() error saving file, No bucket found! Try clicking "Get Started" in firebase -> storage':"saveFile() error saving file",{storageError:e})}))}catch(e){return Promise.reject(e)}};var S,O=function(){};function L(e,r){var t=r||{};!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider");r.rootRef&&D(r.rootRef,"test")}(e,t),F(e,t),j("react-admin-firebase:: Creating FirebaseDataProvider",{firebaseConfig:e,options:t});var n=new O;return n.init(e,r),S=new E(n,t),function(e,r,t){try{switch(j("FirebaseDataProvider: event",{type:e,resourceName:r,params:t}),e){case l:return Promise.resolve(S.apiGetMany(r,t));case p:return Promise.resolve(S.apiGetManyReference(r,t));case u:return Promise.resolve(S.apiGetList(r,t));case f:return Promise.resolve(S.apiGetOne(r,t));case a:return Promise.resolve(S.apiCreate(r,t));case m:return Promise.resolve(S.apiUpdate(r,t));case h:return Promise.resolve(S.apiUpdateMany(r,t));case s:return Promise.resolve(S.apiDelete(r,t));case c:return Promise.resolve(S.apiDeleteMany(r,t));default:return Promise.resolve({})}}catch(e){return Promise.reject(e)}}}O.prototype.init=function(e,r){this.app=function(e,r){return r.app?r.app:n.length?o():i(e)}(e,r),this.firestore=this.app.firestore()},O.prototype.db=function(){return this.firestore},O.prototype.serverTimestamp=function(){return t.FieldValue.serverTimestamp()},O.prototype.auth=function(){return this.app.auth()},O.prototype.storage=function(){return this.app.storage()};var H=function(e,r){var t=r||{};j("Auth Client: initializing...",{firebaseConfig:e,options:t});var n=new O;n.init(e,t),this.auth=n.auth()};function k(e,r){!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider")}(e,r);var t=new H(e,r);return F(e,r),function(e,r){try{switch(j("Auth Event: ",{type:e,params:r}),e){case d:return Promise.resolve(t.HandleAuthLogin(r));case v:return Promise.resolve(t.HandleAuthLogout(r));case P:return Promise.resolve(t.HandleAuthError(r));case y:return Promise.resolve(t.HandleAuthCheck(r));case"AUTH_GETCURRENT":return Promise.resolve(t.HandleGetCurrent());case g:return Promise.resolve(t.HandleGetPermissions());default:throw new Error("Unhandled auth type:"+e)}}catch(e){return Promise.reject(e)}}}H.prototype.HandleAuthLogin=function(e){try{var r=this,t=e.username,n=e.password;return Promise.resolve(G(function(){return Promise.resolve(r.auth.signInWithEmailAndPassword(t,n)).then(function(e){return j("HandleAuthLogin: user sucessfully logged in",{user:e}),e})},function(){throw j("HandleAuthLogin: invalid credentials",{params:e}),new Error("Login error: invalid credentials")}))}catch(e){return Promise.reject(e)}},H.prototype.HandleAuthLogout=function(e){try{return Promise.resolve(this.auth.signOut()).then(function(){})}catch(e){return Promise.reject(e)}},H.prototype.HandleAuthError=function(e){return Promise.resolve()},H.prototype.HandleAuthCheck=function(e){try{var r=this;return Promise.resolve(G(function(){return Promise.resolve(r.getUserLogin()).then(function(e){j("HandleAuthCheck: user is still logged in",{user:e})})},function(e){throw j("HandleAuthCheck: ",{e:e}),new Error("Auth check error: "+e)}))}catch(e){return Promise.reject(e)}},H.prototype.getUserLogin=function(){try{var e=this;return Promise.resolve(new Promise(function(r,t){e.auth.onAuthStateChanged(function(e){e?r(e):t("User not logged in")})}))}catch(e){return Promise.reject(e)}},H.prototype.HandleGetCurrent=function(){try{var e=this;return Promise.resolve(G(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return j("HandleGetCurrent: current user",{user:e}),e})},function(e){return j("HandleGetCurrent: no user is logged in",{e:e}),null}))}catch(e){return Promise.reject(e)}},H.prototype.HandleGetPermissions=function(){try{var e=this;return Promise.resolve(G(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.claims})})},function(e){return j("HandleGetPermission: no user is logged in or tokenResult error",{e:e}),null}))}catch(e){return Promise.reject(e)}};export{w as FirebaseRealTimeSaga,L as FirebaseDataProvider,k as FirebaseAuthProvider};
//# sourceMappingURL=index.mjs.map
