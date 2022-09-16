import { createStorefrontClient } from "@shopify/hydrogen-ui-alpha";

export const client = createStorefrontClient({
  storeDomain: "hydrogen-preview",
  publicStorefrontToken: "3b580e70970c4528da70c98e097c2fa0",
  storefrontApiVersion: "2022-07",
});
