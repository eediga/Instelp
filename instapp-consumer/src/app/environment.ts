
export const FIREBASE_CONFIG = {
          apiKey: "AIzaSyBKmS1n_rjvWTzmtdTG0TEpZg5V0mWCIOk",
          authDomain: "fir-ionic-a0119.firebaseapp.com",
          databaseURL: "https://fir-ionic-a0119.firebaseio.com",
          projectId: "fir-ionic-a0119",
          storageBucket: "",
          messagingSenderId: "989431211159"
        };
      
export const snapshotToArray = snapshot=>{

          let returnArray = [];
          snapshot.forEach(element =>{
                    // correct let item = element.val();
                    // item.key = element.key;

                    let item = {key: element.key,value: element.val()}
                    
                   returnArray.push(item);
                    
          });
          return returnArray;
}