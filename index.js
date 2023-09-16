import { getDonations, createDonation } from "./v1/index.js";

import "dotenv/config";

const access_token = process.env.ACCESS_TOKEN;
const nation_slug = process.env.NATION_SLUG;

console.log("Access token: " + access_token);
console.log("Nation Slug: " + nation_slug);

const runV1 = async () => {
  try {
    const success = await createDonation(nation_slug, access_token);
    if (success) {
      const donations = await getDonations(nation_slug, access_token);
      console.log(donations);
    }
  } catch (exception) {
    console.log(exception);
  }
};

runV1();
