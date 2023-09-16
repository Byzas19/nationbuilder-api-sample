import axios from "axios";
import Fakerator from "fakerator";

const API_PATH = "nationbuilder.com/api/v1/donations";

export const createDonation = async (nation_slug, access_token) => {
  const fakerator = Fakerator();
  const firstName = fakerator.names.firstName();
  const lastName = fakerator.names.lastName();
  const address = fakerator.entity.address();
  const amount = Math.floor(Math.random() * 100) + 1;

  const donation = {
    donation: {
      amount: amount,
      amount_in_cents: amount * 100,
      email: `${firstName}${lastName}@gmail.com`,
      first_name: firstName,
      last_name: lastName,
      payment_type_name: "Cash",
      payment_type_ngp_code: "C",
      billing_address: {
        address1: address.street,
        city: address.city,
        state: address.state,
        country_code: "US",
        zip: address.zip,
        zip5: address.zip,
      },
    },
  };

  console.log("Attempting to create new donation: " + JSON.stringify(donation));

  try {
    const response = await axios.post(
      `https://${nation_slug}.${API_PATH}?access_token=${access_token}`,
      donation,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.status == 200) {
      console.log("Response: " + JSON.stringify(response.data));
      return true;
    }
  } catch (error) {
    console.log(
      `status ${error.response.status} - ${error.response.statusText}`
    );
    console.log(error.response.data);
  }
  return false;
};

export const getDonations = async (nation_slug, access_token) => {
  try {
    const response = await axios.get(
      `https://${nation_slug}.${API_PATH}?limit=100&access_token=${access_token}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(
      `status ${error.response.status} - ${error.response.statusText}`
    );
    console.log(error.response.data);
  }
  return [];
};
