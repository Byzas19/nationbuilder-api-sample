import axios from "axios";
import Fakerator from "fakerator";

const API_PATH = "nationbuilder.com/api/v2/donations";

export const createDonation = async (nation_slug, access_token) => {
  const fakerator = Fakerator();
  const firstName = fakerator.names.firstName();
  const lastName = fakerator.names.lastName();
  const amount = Math.floor(Math.random() * 100) + 1;

  const donation = {
    data: {
      type: "donations",
      attributes: {
        amount_in_cents: amount * 100,
        email: `${firstName}${lastName}@gmail.com`,
        first_name: firstName,
        last_name: lastName,
        payment_type_id: "1",
      },
    },
  };

  console.log("Attempting to create new donation");

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
    if (response.status == 201) {
      console.log(`New donation created for ${firstName} ${lastName}`);
      return true;
    }
  } catch (error) {
    console.log(error.response.data);
  }
  console.log(`status ${error.response.status} - ${error.response.statusText}`);
  return false;
};

export const getDonations = async (nation_slug, access_token) => {
  try {
    const response = await axios.get(
      `https://${nation_slug}.${API_PATH}?page[number]=1&page[size]=100&fields[donations]=first_name,last_name,amount_in_cents,created_at&access_token=${access_token}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.status == 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log(
      `status ${error.response.status} - ${error.response.statusText}`
    );
    console.log(error.response.data);
  }
  return [];
};
