import { Platform } from "react-native";
import Purchases, { LOG_LEVEL, PurchasesPackage } from "react-native-purchases";
import Env from "../../../common/@core/Env";
import { I_loggedInResponse } from "../../../common/@core/Interfaces";

export const PRODUCT_IDENTIFIER = [
  'com.example.login.reactapp.template.9.9.weekly',
  'com.example.login.reactapp.template.45.3month',
  'com.example.login.reactapp.template.55.forever'
]

export const ENTITLEMENTS = [
  'pro_subcription',
];

export const initRevenueCat = (userLogged: I_loggedInResponse) => {
  Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  if (Platform.OS === 'ios') {
    Purchases.configure({ apiKey: Env.REVENUE_CAT_PUBLIC_API_KEY, appUserID: userLogged.userId });
    console.log('Purchases.configure({ apiKey: Env.REVENUE_CAT_PUBLIC_API_KEY, appUserID: userLogged.userId });', {
      REVENUE_CAT_PUBLIC_API_KEY: Env.REVENUE_CAT_PUBLIC_API_KEY,
      userId: userLogged.userId,
    });
  } else if (Platform.OS === 'android') {
    console.log('Missing support purchase for android!');
  }
}

export const getOffering = async (): Promise<PurchasesPackage[] | null | undefined> => {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      // Display current offering with offerings.current

      console.log(JSON.stringify(offerings.current.availablePackages));
      return offerings.current.availablePackages;
    }

  } catch (e) {
    console.log(e);
    return null;
  }
}

export const fetchAndCheckStatus = async () => {
  try {
    const entitlement = ENTITLEMENTS[0];
    const customerInfo = await Purchases.getCustomerInfo();
    console.log(JSON.stringify(customerInfo));
    
    if(typeof customerInfo.entitlements.active[entitlement] !== "undefined") {
      // Grant user "pro" access
      console.log('\n\n *** BUY SUCCESS [' + entitlement +'] ***\n\n');
    }
  } catch (e) {
   // Error fetching purchaser info
  }
}

export const buyByProductIdentifier = async (product?: PurchasesPackage): Promise<boolean> => {
  if (!product) return false;
  // Using packages
  try {
    const entitlement = ENTITLEMENTS[0];
    const purchaseMade = await Purchases.purchasePackage(product);
    if (typeof purchaseMade.customerInfo.entitlements.active[entitlement] !== "undefined") {
      // Unlock that great "pro" content
      console.log('\n\n *** BUY SUCCESS [' + entitlement +'] ***\n\n');
    }
    console.log(JSON.stringify(purchaseMade));

    return true;
  } catch (e: any) {
    if (!e.userCancelled) {
      console.log(e);
      return true;
    }

    return false;
  }
}
