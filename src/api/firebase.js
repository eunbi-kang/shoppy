import { initializeApp } from "firebase/app";
import {v4 as uuid} from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
const database = getDatabase(app);

/* User Login */
export function login() {
  signInWithPopup(auth, provider)
    .catch(console.error);
}

/* User Logout */
export function logout() {
  signOut(auth).catch(console.error);
}


/* User Session */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    // 1. 사용자가 있는 경우에 (로그인 한 경우)
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
}

/* User가 Admin 권한을 가지고 있는지 확인하는 Logic (isAdmin : true / false) */
async function adminUser(user) {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin }
      }
      return user;
    });
}

/* 새로운 제품을 추가하는 Login (Product, ImageURL) */
export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `products/${uuid()}`), {
    ...product, 
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  })
}