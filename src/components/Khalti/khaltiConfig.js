import myKey from './khaltiKey'
 

let khaltiConfig = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "64af6372d9792b625cdbb9e3",
    "productName": "My store",
    "productUrl": "http://localhost:3000/products/64af6372d9792b625cdbb9e3",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default khaltiConfig;