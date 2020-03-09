!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("ra-realtime"),require("path-browserify"),require("firebase/app"),require("firebase/firestore"),require("firebase/auth"),require("firebase/storage"),require("react-admin")):"function"==typeof define&&define.amd?define(["exports","ra-realtime","path-browserify","firebase/app","firebase/firestore","firebase/auth","firebase/storage","react-admin"],r):r(e.reactAdminFirebase={},e.realtimeSaga,e.path,e.firebase,0,0,0,e.reactAdmin)}(this,function(e,r,t,n,o,i,a,s){function u(e,r){l&&console.log("react-admin-firebase: ",e,r)}function c(e,r){l&&console.error("react-admin-firebase: ",e,r)}r=r&&r.hasOwnProperty("default")?r.default:r,t=t&&t.hasOwnProperty("default")?t.default:t;var l=!1;function p(e,r){(e&&e.debug||r.logging)&&(l=!0)}function f(e,r){try{var t=e()}catch(e){return r(e)}return t&&t.then?t.then(void 0,r):t}function h(e,r){if(!e)return r;if(!r)throw new Error("Resource name must be a string of length greater than 0 characters");var n=t.join("/",e,"/",r,"/");if((n.split("/").length-1)%2)throw new Error('The rootRef path must point to a "document" not a "collection"\ne.g. /collection/document/ or /collection/document/collection/document/');return n.slice(1,-1)}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var d=function(e,r){this.fireWrapper=e,this.options=r,this.resources={},this.db=e.db()};function m(e,r,t){e.sort(function(e,n){var o,i,a=e[r],s=n[r];return Number.isFinite(a)&&Number.isFinite(s)?(o=a,i=s):(o=(e[r]||"").toString().toLowerCase(),i=(n[r]||"").toString().toLowerCase()),o>i?"asc"===t?1:-1:o<i?"asc"===t?-1:1:0})}d.prototype.GetResource=function(e){var r=this.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r},d.prototype.TryGetResourcePromise=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e,r)).then(function(){var r=t.resources[e];if(!r)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return r})}catch(e){return Promise.reject(e)}},d.prototype.RefreshResource=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e,r)).then(function(){var n=t.resources[e];u("resourceManager.RefreshResource",{relativePath:e});var o=t.applyQuery(n.collection,r);return Promise.resolve(o.get()).then(function(e){n.list=e.docs.map(function(e){return t.parseFireStoreDocument(e)})})})}catch(e){return Promise.reject(e)}},d.prototype.GetSingleDoc=function(e,r){try{var t=this;return Promise.resolve(t.initPath(e)).then(function(){return Promise.resolve(t.resources[e].collection.doc(r).get()).then(function(e){if(!e.exists)throw new Error("react-admin-firebase: No id found matching: "+r);return t.parseFireStoreDocument(e)})})}catch(e){return Promise.reject(e)}},d.prototype.initPath=function(e,r){try{var t=this,n=h(t.options.rootRef,e);return u("resourceManager.initPath:::",{absolutePath:n}),Promise.resolve(t.isCollectionAccessible(n,r)).then(function(r){var o=t.resources[e];if(r){if(!o){var i=t.db.collection(n);t.resources[e]={collection:i,list:[],path:e,pathAbsolute:n}}}else o&&t.removeResource(e)})}catch(e){return Promise.reject(e)}},d.prototype.parseFireStoreDocument=function(e){var r=e.data();return Object.keys(r).forEach(function(e){var t=r[e];t&&t.toDate&&t.toDate instanceof Function&&(r[e]=t.toDate())}),Object.assign({},{id:e.id},r)},d.prototype.getUserLogin=function(){try{var e=this;return new Promise(function(r,t){e.fireWrapper.auth().onAuthStateChanged(function(e){r(e)})})}catch(e){return Promise.reject(e)}},d.prototype.isCollectionAccessible=function(e,r){try{var t=!1,n=this,o=f(function(){var t=n.db.collection(e),o=n.applyQuery(t,r);return Promise.resolve(o.get()).then(function(){})},function(){return t=!0,!1});return o&&o.then?o.then(function(e){return!t||e}):!t||o}catch(e){return Promise.reject(e)}},d.prototype.removeResource=function(e){delete this.resources[e]},d.prototype.applyQuery=function(e,r){return r?r(e):e};var v=function(e,r){this.fireWrapper=e,this.options=r,this.db=e.db(),this.rm=new d(this.fireWrapper,this.options)};v.prototype.apiGetList=function(e,r){try{u("apiGetList",{resourceName:e,params:r});var t=r.filter.collectionQuery;return delete r.filter.collectionQuery,Promise.resolve(this.tryGetResource(e,"REFRESH",t)).then(function(e){var t=e.list;if(null!=r.sort){var n=r.sort;m(t,n.field,"ASC"===n.order?"asc":"desc")}var o=function(e,r){if(!(t=r)||"{}"===JSON.stringify(t))return e;var t,n=Object.keys(r);return e.filter(function(e){return n.reduce(function(t,n){var o=r[n];null!=o&&null!=o||(o="");var i=o.toString().toLowerCase(),a=e[n];if(null==a)return!1;var s=a.toString().toLowerCase().includes(i);return t||s},!1)})}(t,r.filter),i=(r.pagination.page-1)*r.pagination.perPage;return{data:o.slice(i,i+r.pagination.perPage),total:e.list.length}})}catch(e){return Promise.reject(e)}},v.prototype.apiGetOne=function(e,r){try{var t=this;return u("apiGetOne",{resourceName:e,params:r}),f(function(){return Promise.resolve(t.rm.GetSingleDoc(e,r.id)).then(function(e){return{data:e}})},function(){throw new Error("Error getting id: "+r.id+" from collection: "+e)})}catch(e){return Promise.reject(e)}},v.prototype.apiCreate=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){return u("apiCreate",{resourceName:e,resource:n,params:r}),Promise.resolve(t.getCurrentUserEmail()).then(function(e){var o=!1;function i(i){if(o)return i;var a=t.db.collection("collections").doc().id;return Promise.resolve(t.parseDataAndUpload(n,a,r.data)).then(function(r){var o=t.options.timestamps?Object.assign({},r,{createdate:t.fireWrapper.serverTimestamp(),lastupdate:t.fireWrapper.serverTimestamp(),createdby:e,updatedby:e}):Object.assign({},r);return Promise.resolve(n.collection.doc(a).set(o,{merge:!1})).then(function(){return{data:Object.assign({},r,{id:a})}})})}var a=r.data&&r.data.id,s=function(){if(a){var i=r.data.id;return Promise.resolve(t.parseDataAndUpload(n,i,r.data)).then(function(r){if(!i)throw new Error("id must be a valid string");var a=t.options.timestamps?Object.assign({},r,{createdate:t.fireWrapper.serverTimestamp(),lastupdate:t.fireWrapper.serverTimestamp(),createdby:e,updatedby:e}):Object.assign({},r);return Promise.resolve(n.collection.doc(i).set(a,{merge:!0})).then(function(){return o=!0,{data:Object.assign({},r,{id:i})}})})}}();return s&&s.then?s.then(i):i(s)})})}catch(e){return Promise.reject(e)}},v.prototype.apiUpdate=function(e,r){try{var t=this,n=r.id;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(o){return u("apiUpdate",{resourceName:e,resource:o,params:r}),Promise.resolve(t.getCurrentUserEmail()).then(function(e){return Promise.resolve(t.parseDataAndUpload(o,n,r.data)).then(function(r){var i=t.options.timestamps?Object.assign({},r,{lastupdate:t.fireWrapper.serverTimestamp(),updatedby:e}):Object.assign({},r);return o.collection.doc(n).update(i).catch(function(e){c("apiUpdate error",{error:e})}),{data:Object.assign({},r,{id:n})}})})})}catch(e){return Promise.reject(e)}},v.prototype.apiUpdateMany=function(e,r){try{var t=this;return delete r.data.id,Promise.resolve(t.tryGetResource(e)).then(function(n){u("apiUpdateMany",{resourceName:e,resource:n,params:r});var o=r.ids;return Promise.resolve(t.getCurrentUserEmail()).then(function(e){return Promise.resolve(Promise.all(o.map(function(o){try{return Promise.resolve(t.parseDataAndUpload(n,o,r.data)).then(function(r){var i=t.options.timestamps?Object.assign({},r,{lastupdate:t.fireWrapper.serverTimestamp(),updatedby:e}):Object.assign({},r);return n.collection.doc(o).update(i).catch(function(e){c("apiUpdateMany error",{error:e})}),Object.assign({},r,{id:o})})}catch(e){return Promise.reject(e)}}))).then(function(e){return{data:e}})})})}catch(e){return Promise.reject(e)}},v.prototype.apiDelete=function(e,r){try{return Promise.resolve(this.tryGetResource(e)).then(function(t){return u("apiDelete",{resourceName:e,resource:t,params:r}),t.collection.doc(r.id).delete().catch(function(e){c("apiDelete error",{error:e})}),{data:r.previousData}})}catch(e){return Promise.reject(e)}},v.prototype.apiDeleteMany=function(e,r){try{var t=this;return Promise.resolve(t.tryGetResource(e)).then(function(n){u("apiDeleteMany",{resourceName:e,resource:n,params:r});for(var o=[],i=t.db.batch(),a=0,s=r.ids;a<s.length;a+=1){var l=s[a];i.delete(n.collection.doc(l)),o.push({id:l})}return i.commit().catch(function(e){c("apiDeleteMany error",{error:e})}),{data:o}})}catch(e){return Promise.reject(e)}},v.prototype.apiGetMany=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){return u("apiGetMany",{resourceName:e,resource:t,params:r}),Promise.resolve(Promise.all(r.ids.map(function(e){return t.collection.doc(e).get()}))).then(function(e){return{data:e.map(function(e){return Object.assign({},e.data(),{id:e.id})})}})})}catch(e){return Promise.reject(e)}},v.prototype.apiGetManyReference=function(e,r){try{return Promise.resolve(this.tryGetResource(e,"REFRESH")).then(function(t){u("apiGetManyReference",{resourceName:e,resource:t,params:r});var n=t.list,o=r.target,i=r.id,a=n.filter(function(e){return e[o]===i});if(null!=r.sort){var s=r.sort;m(n,s.field,"ASC"===s.order?"asc":"desc")}var c=(r.pagination.page-1)*r.pagination.perPage;return{data:a.slice(c,c+r.pagination.perPage),total:a.length}})}catch(e){return Promise.reject(e)}},v.prototype.tryGetResource=function(e,r,t){try{var n=this;function o(){return n.rm.TryGetResourcePromise(e,t)}var i=function(){if(r)return Promise.resolve(n.rm.RefreshResource(e,t)).then(function(){})}();return i&&i.then?i.then(o):o()}catch(e){return Promise.reject(e)}},v.prototype.getCurrentUserEmail=function(){try{return Promise.resolve(this.rm.getUserLogin()).then(function(e){return e?e.email:"annonymous user"})}catch(e){return Promise.reject(e)}},v.prototype.parseDataAndUpload=function(e,r,t){try{var n=this;if(!t)return t;var o=e.collection.doc(r).path;return Promise.resolve(Promise.all(Object.keys(t).map(function(i){try{function a(){return s&&"object"==typeof s&&!s.hasOwnProperty("rawFile")?n.parseDataAndUpload(e,r,s):Promise.resolve(n.parseDataField(s,o,i)).then(function(){})}var s=t[i],u=Array.isArray(s),c=function(){if(u)return Promise.resolve(Promise.all(s.map(function(t,a){return s[a]&&s[a].hasOwnProperty("rawFile")?Promise.all([n.parseDataField(s[a],o,i+a)]):Promise.all(Object.keys(t).map(function(s){var u=t[s];return u&&"object"==typeof u&&!u.hasOwnProperty("rawFile")?n.parseDataAndUpload(e,r,u):n.parseDataField(u,o,i+s+a)}))}))).then(function(){})}();return Promise.resolve(c&&c.then?c.then(a):a())}catch(e){return Promise.reject(e)}}))).then(function(){return t})}catch(e){return Promise.reject(e)}},v.prototype.parseDataField=function(e,r,t){try{if(!e||!e.hasOwnProperty("rawFile"))return;var n=Object.keys(e).find(function(e){return"rawFile"!==e&&"title"!==e});return Promise.resolve(this.uploadAndGetLink(e.rawFile,r,t)).then(function(r){e[n]=r,delete e.rawFile})}catch(e){return Promise.reject(e)}},v.prototype.uploadAndGetLink=function(e,r,n){try{var o=t.join(r,n);return Promise.resolve(this.saveFile(o,e))}catch(e){return Promise.reject(e)}},v.prototype.saveFile=function(e,r){try{u("saveFile() saving file...",{storagePath:e,rawFile:r});var t=this.fireWrapper.storage().ref(e).put(r);return f(function(){return Promise.resolve(new Promise(function(e,r){return t.then(e).catch(r)})).then(function(r){return Promise.resolve(r.ref.getDownloadURL()).then(function(t){return u("saveFile() saved file",{storagePath:e,taskResult:r,getDownloadURL:t}),t})})},function(e){c("storage/unknown"===e.code?'saveFile() error saving file, No bucket found! Try clicking "Get Started" in firebase -> storage':"saveFile() error saving file",{storageError:e})})}catch(e){return Promise.reject(e)}};var y,P=function(){};P.prototype.init=function(e,r){this.app=function(e,r){return r.app?r.app:n.apps.length?n.app():n.initializeApp(e)}(e,r),this.firestore=this.app.firestore()},P.prototype.db=function(){return this.firestore},P.prototype.serverTimestamp=function(){return n.firestore.FieldValue.serverTimestamp()},P.prototype.auth=function(){return this.app.auth()},P.prototype.storage=function(){return this.app.storage()};var g=function(e,r){var t=r||{};u("Auth Client: initializing...",{firebaseConfig:e,options:t});var n=new P;n.init(e,t),this.auth=n.auth()};g.prototype.HandleAuthLogin=function(e){try{var r=this,t=e.username,n=e.password;return f(function(){return Promise.resolve(r.auth.signInWithEmailAndPassword(t,n)).then(function(e){return u("HandleAuthLogin: user sucessfully logged in",{user:e}),e})},function(){throw u("HandleAuthLogin: invalid credentials",{params:e}),new Error("Login error: invalid credentials")})}catch(e){return Promise.reject(e)}},g.prototype.HandleAuthLogout=function(e){try{return Promise.resolve(this.auth.signOut()).then(function(){})}catch(e){return Promise.reject(e)}},g.prototype.HandleAuthError=function(e){},g.prototype.HandleAuthCheck=function(e){try{var r=this;return f(function(){return Promise.resolve(r.getUserLogin()).then(function(e){u("HandleAuthCheck: user is still logged in",{user:e})})},function(e){throw u("HandleAuthCheck: ",{e:e}),new Error("Auth check error: "+e)})}catch(e){return Promise.reject(e)}},g.prototype.getUserLogin=function(){try{var e=this;return new Promise(function(r,t){e.auth.onAuthStateChanged(function(e){e?r(e):t("User not logged in")})})}catch(e){return Promise.reject(e)}},g.prototype.HandleGetCurrent=function(){try{var e=this;return f(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return u("HandleGetCurrent: current user",{user:e}),e})},function(e){return u("HandleGetCurrent: no user is logged in",{e:e}),null})}catch(e){return Promise.reject(e)}},g.prototype.HandleGetPermissions=function(){try{var e=this;return f(function(){return Promise.resolve(e.getUserLogin()).then(function(e){return Promise.resolve(e.getIdTokenResult()).then(function(e){return e.claims})})},function(e){return u("HandleGetPermission: no user is logged in or tokenResult error",{e:e}),null})}catch(e){return Promise.reject(e)}},e.FirebaseRealTimeSaga=function(e,t){return r(function(e,r){return function(t,n,o){var i=r||{};if((!Array.isArray(i.watch)||i.watch.includes(n))&&(!Array.isArray(i.dontwatch)||!i.dontwatch.includes(n)))return{subscribe:function(r){return e(t,n,o).then(function(e){return r.next(e)}).catch(function(e){return r.error(e)}),{unsubscribe:function(){}}}}}}(e,t))},e.FirebaseDataProvider=function(e,r){var t=r||{};!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider");r.rootRef&&h(r.rootRef,"test")}(e,t),p(e,t),u("react-admin-firebase:: Creating FirebaseDataProvider",{firebaseConfig:e,options:t});var n=new P;return n.init(e,r),y=new v(n,t),function(e,r,t){try{switch(u("FirebaseDataProvider: event",{type:e,resourceName:r,params:t}),e){case s.GET_MANY:return Promise.resolve(y.apiGetMany(r,t));case s.GET_MANY_REFERENCE:return Promise.resolve(y.apiGetManyReference(r,t));case s.GET_LIST:return Promise.resolve(y.apiGetList(r,t));case s.GET_ONE:return Promise.resolve(y.apiGetOne(r,t));case s.CREATE:return Promise.resolve(y.apiCreate(r,t));case s.UPDATE:return Promise.resolve(y.apiUpdate(r,t));case s.UPDATE_MANY:return Promise.resolve(y.apiUpdateMany(r,t));case s.DELETE:return Promise.resolve(y.apiDelete(r,t));case s.DELETE_MANY:return Promise.resolve(y.apiDeleteMany(r,t));default:return Promise.resolve({})}}catch(e){return Promise.reject(e)}}},e.FirebaseAuthProvider=function(e,r){!function(e,r){if(!(e||r&&r.app))throw new Error("Please pass the Firebase firebaseConfig object or options.app to the FirebaseAuthProvider")}(e,r);var t=new g(e,r);return p(e,r),function(e,r){try{switch(u("Auth Event: ",{type:e,params:r}),e){case s.AUTH_LOGIN:return Promise.resolve(t.HandleAuthLogin(r));case s.AUTH_LOGOUT:return Promise.resolve(t.HandleAuthLogout(r));case s.AUTH_ERROR:return Promise.resolve(t.HandleAuthError(r));case s.AUTH_CHECK:return Promise.resolve(t.HandleAuthCheck(r));case"AUTH_GETCURRENT":return Promise.resolve(t.HandleGetCurrent());case s.AUTH_GET_PERMISSIONS:return Promise.resolve(t.HandleGetPermissions());default:throw new Error("Unhandled auth type:"+e)}}catch(e){return Promise.reject(e)}}}});
//# sourceMappingURL=index.umd.js.map
