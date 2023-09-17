import {
  getDonations as getDonationsV1,
  createDonation as createDonationV1,
} from "./v1/index.js";
import {
  getDonations as getDonationsV2,
  createDonation as createDonationV2,
} from "./v2/index.js";

import "dotenv/config";

const access_token_v1 = process.env.ACCESS_TOKEN_V1;
const access_token_v2 = process.env.ACCESS_TOKEN_V2;
const nation_slug = process.env.NATION_SLUG;

console.log("Access token V1: " + access_token_v1);
console.log("Access token V2: " + access_token_v2);
console.log("Nation Slug: " + nation_slug);

const run = async (createDonation, getDonations, access_token) => {
  try {
    const success = await createDonation(nation_slug, access_token);
    if (success) {
      const donations = await getDonations(nation_slug, access_token);
      if (donations.length > 0) {
        console.log("Donations found: " + donations.length);
        return donations;
      } else {
        console.log("No donations found!");
      }
    }
  } catch (exception) {
    console.log(exception);
  }
};

const runV1 = async () => {
  const donations = await run(
    createDonationV1,
    getDonationsV1,
    access_token_v1
  );
  donations.forEach((item) => {
    console.log(
      `Name: ${item.first_name} ${item.last_name}, Amount: ${item.amount}, Created On: ${item.created_at}`
    );
  });
};

const runV2 = async () => {
  const donations = await run(
    createDonationV2,
    getDonationsV2,
    access_token_v2
  );
  donations.forEach((item) => {
    console.log(
      `Name: ${item.attributes.first_name} ${item.attributes.last_name}, 
      Amount: ${item.attributes.amount_in_cents}, Created On: ${item.attributes.created_at}`
    );
  });
};

console.log("Using V1 API");
runV1().then(() => {
  console.log("Using V2 API");
  runV2();
});
