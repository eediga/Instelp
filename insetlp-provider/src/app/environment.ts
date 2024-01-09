
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDyj47w2SmJFRNc5w-njHBjCrh1D8dmWpE",
  authDomain: "driver1-87fb5.firebaseapp.com",
  databaseURL: "https://driver1-87fb5.firebaseio.com",
  projectId: "driver1-87fb5",
  storageBucket: "",
  messagingSenderId: "1087133831423"
          };
        
  
          export const snapshotToArray = snapshot=>{
        
            let returnArray = [];
            snapshot.forEach(element =>{
                let item = element.val();
                item.key = element.key;
                returnArray.push(item);
            });
            return returnArray;
          }