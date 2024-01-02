import firestore from '@react-native-firebase/firestore';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const usersCollection = firestore().collection('users');
const transactionsCollection = firestore().collection('transactions');
const tokensCollection = firestore().collection('tokens');
const dnsTextsCollection = firestore().collection('dnsDetails');
const favouriteCurrenciesCollection = firestore().collection('favouriteCurrencies');
const txnsCollection = firestore().collection('transactionDetails');

const userCollection = {
  getUser: async docname => {
    try {
      const res = (await usersCollection.doc(docname).get()).data();
      return res;
    } catch (e) {
      return undefined;
    }
  },
  addUser: async paramobj => {
    const docname = paramobj.phoneNumber;
    // console.log(docname);
    const res = (await usersCollection.doc(docname).get()).data();
    if (!res) {
      usersCollection
        .doc(docname)
        .set(paramobj)
        .then(() => {
          console.log('User added!');
        });
    } else {
      console.log('user aleardy exist');
    }
  },
  updateUser: paramobj => {
    const docname = paramobj.phoneNumber;
    // console.log(docname);
   return usersCollection
      .doc(docname)
      .update(paramobj)
      .then(() => {
        console.log('User updated!');
        return true;
      });
  },
  delUser: paramobj => {
    const docname = paramobj.phoneNumber;
    // console.log(docname);
   return usersCollection
      .doc(docname)
      .delete(paramobj)
      .then(() => {
        console.log('User delated!');
        return true;
      });
  },
  deleteUser: () => {
    firestore()
      .collection('users')
      .doc('user2')
      .delete()
      .then(() => {
        console.log('user document deleted!');
      });
  },
  checkUser: async number => {
    const docname = number;
    const res = (await usersCollection.doc(docname).get()).data();
    return res ? true : false;
  },
  getAllUser : async (phoneNumbersArray) => {
    try {
      const snapshot = await usersCollection.where('phoneNumber', 'in',phoneNumbersArray).get();
      console.log(snapshot?.docs,"snapshot");
  
      if (snapshot.empty) {
        return []; 
      }
  
      const users = snapshot.docs.map(doc => doc.data());
      console.log(users,"users")
      return users;
    
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
};


export const transactionCollection = {
  getTransaction: async docname => {
    try {
      const res = await transactionsCollection.where("phoneNumber", "==", docname).get();
      console.log(res,"res")
      if (!res.empty) {
        // const data = res.docs[0].data();
        const resp = res?.docs?.map(item=>item.data());       
        return resp;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  addTransaction: async paramobj => {
    const docname = paramobj.order_id;
    // console.log(docname);
    const res = (await transactionsCollection.doc(docname).get()).data();
    if (!res) {
      transactionsCollection
        .doc(docname)
        .set(paramobj)
        .then(() => {
          console.log('Transaction added!');
        });
    } else {
      console.log('Transaction orderid already exist');
    }
  },

};

export const tokenCollection = {
  getTokens: async docname => {
    try {
      const res = await tokensCollection.where("walletAddress", "==", docname).get();
      console.log(res,"res")
      if (!res.empty) {
        // const data = res.docs[0].data();
        const resp = res?.docs?.map(item=>item.data());       
        return resp;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  addTokens: async paramobj => {
    const docname = paramobj.txHash;
    // console.log(docname);
    const res = (await tokensCollection.doc(docname).get()).data();
    if (!res) {
      tokensCollection
        .doc(docname)
        .set(paramobj)
        .then(() => {
          console.log('Token added!');
        });
    } else {
      console.log('Tx already exist');
    }
  },

};

export const dnsTextCollection = {
  getDnaText: async docname => {
    try {
      const res = await dnsTextsCollection.where("phoneNumber", "==", docname).get();
      console.log(res,"res")
      if (!res.empty) {
        // const data = res.docs[0].data();
        const resp = res?.docs?.map(item=>item.data());       
        return resp;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  addDnaText: async paramobj => {
    const docname = paramobj.phoneNumber;
    console.log(docname);
    const res = (await dnsTextsCollection.doc(docname).get()).data();
    if (!res) {
    console.log(res,"res")

      return dnsTextsCollection
        .doc(docname)
        .set(paramobj)
        .then(() => {
          console.log('DnaText  added!');
          return true
        }).catch((err)=>{
          console.log(err,"err")
          return false
        });
    } else {
      const res = await dnsTextsCollection.where("phoneNumber", "==", docname).get();
      if (!res.empty) {
        // const data = res.docs[0].data();
        const resp = res?.docs?.map(item=>item.data());
        let r = [...resp,paramobj]   
        console.log(r,"resp") 
        // dnsTextsCollection
        // .doc(docname)
        // .set(paramobj)
        // .then(() => {
        //   console.log('DnaText  added!');
        // }).catch((err)=>{
        //   console.log(err,"err")
        // });   
        // return resp;
        return true
      }
      console.log('Tx already exist');
    }
  },

};

export const favouriteCurrencyCollection = {
  getCurrency: async docname => {
    try {
      const res = (await favouriteCurrenciesCollection.doc(docname).get()).data();
      return res;
    } catch (e) {
      return undefined;
    }
  },
  addCurrency: async paramobj => {
    const docname = paramobj.phoneNumber;
    // console.log(docname);
    const res = (await favouriteCurrenciesCollection.doc(docname).get()).data();
    if (!res) {
      favouriteCurrenciesCollection
        .doc(docname)
        .set(paramobj)
        .then((res) => {
          console.log('Currency added!');

          return res;
        });
    } else {
      console.log('Currency aleardy exist');
      
    }
  },
  updateCurrency: paramobj => {
    const docname = paramobj.phoneNumber;
    // console.log(docname);
   return favouriteCurrenciesCollection
      .doc(docname)
      .update(paramobj)
      .then(() => {
        console.log('User updated!');
        return true;
      });
  },
  deleteCurrency: () => {
    firestore()
      .collection('favouriteCurrencies')
      .doc('user2')
      .delete()
      .then(() => {
        console.log('user document deleted!');
      });
  },
  checkCurrency: async number => {
    console.log(number,"number")
    const docname = number;
    const res = (await favouriteCurrenciesCollection.doc(docname).get()).data();
    console.log(res,"res")
    return res ? true : false;
  },
  checkCur: async number => {
    console.log(number,"number")
    const docname = number;
    const res = (await favouriteCurrenciesCollection.doc(docname).get()).data();
    console.log(res,"res")
    return res?.favTokens.length>0? true : false;
  },
};

export const txnCollection = {
  getTxn: async docname => {
    try {
      const res = await txnsCollection.where("phoneNumber", "==", docname).get();
      console.log(res,"res")
      if (!res.empty) {
        // const data = res.docs[0].data();
        const resp = res?.docs?.map(item=>item.data())    
        return resp;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  addTxn: async paramobj => {
    const docname = paramobj.phoneNumber;
    // console.log(docname);
    const res = (await txnsCollection.doc(docname).get()).data();
    if (!res) {
      console.log("hello1");
      txnsCollection
        .doc(docname)
        .set(paramobj)
        .then(() => {
          console.log('Txn added::::::::!');
        });
    } else {
      console.log("hello2:::::::::::::::::::::::::::::::::");
      let resp = {...res}
      let pObj = {...paramobj}
      console.log({phoneNumber:res.phoneNumber,txns:[...resp.txns,...pObj.txns]},"pObj::::::::::::::::::::::")
      let d = {phoneNumber:res.phoneNumber,txns:[...resp.txns,...pObj.txns]}
      console.log(d,"ddddd::::::::::::::::::::::::::")
      await txnsCollection
      .doc(docname)
      .update(d)
      .then(() => {
        console.log('Txn updated:::::::::!');
        return true;
      }).catch((err)=>{
        console.log(err,"errrr:::::::::::::::::::::::")
      });
    }
  },

};





const applicationfilesstorage = {
  uploadfile: async () => {},
  getfile: () => {},
  delete: () => {},
};

export default userCollection;

export {applicationfilesstorage};
