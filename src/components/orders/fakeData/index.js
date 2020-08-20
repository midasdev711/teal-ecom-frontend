const fakeData = [
  {
    id: 1,
    key: 1,
    order_id: "1006",
    created_date: "Saturday at 06:54 pm",
    customer: {
      first_name: "Jordan",
      last_name: "Handeson",
      address: "Centralia, WA, United States",
      order: 1,
      phone: "+13603887146",
      id: 1
    },
    total: 66.89,
    status_payment: "paid",
    fulfillment: "Unfulfilled",
    items: [
      {
        status: "Unfulfilled",
        name: "Indestructible Shoes",
        image:
          "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_1_300x300_cc63d031-a9b3-4a95-8fb4-e12f8cf7e49d_small.jpg?v=1596714418",
        style: "Black / US 9 - 9.5 | EU 43",
        sku: 112
      }
    ],
    delivery: "Expedited",
    tags: ["aaa", "xxx"]
  },
  {
    id: 2,
    key: 2,
    order_id: "1005",
    created_date: "Saturday at 06:54 pm",
    customer: {
      first_name: "Jordan",
      last_name: "Handeson",
      address: "Centralia, WA, United States",
      order: 1,
      phone: "+13603887146",
      id: 1
    },
    total: 66.89,
    status_payment: "pending",
    fulfillment: "Fulfilled",
    items: [
      {
        status: "Fulfilled",
        name: "Indestructible Shoes",
        image:
          "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_1_300x300_cc63d031-a9b3-4a95-8fb4-e12f8cf7e49d_small.jpg?v=1596714418",
        style: "Black / US 9 - 9.5 | EU 43",
        sku: 112
      }
    ],
    delivery: "Standard",
    tags: ["aaa", "xxx"]
  }
];

const productsTree = [
  {
    id: 1,
    image:
      "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_1_300x300_cc63d031-a9b3-4a95-8fb4-e12f8cf7e49d_small.jpg?v=1596714418",
    name: "Indestructible Shoes",
    isChecked: false,
    list: [
      {
        id: 1,
        color: "Black",
        size: "US 4.5 - 5 | EU 36",
        stock: 109,
        price: 59.99,
        isChecked: false
      },
      {
        id: 2,
        color: "Black",
        size: "US 4.5 - 5 | EU 36",
        stock: 109,
        price: 59.99,
        isChecked: false
      },
      {
        id: 3,
        color: "Black",
        size: "US 4.5 - 5 | EU 36",
        stock: 109,
        price: 59.99,
        isChecked: false
      },
      {
        id: 4,
        color: "Black",
        size: "US 4.5 - 5 | EU 36",
        stock: 109,
        price: 59.99,
        isChecked: false
      },
      {
        id: 5,
        color: "Black",
        size: "US 4.5 - 5 | EU 36",
        stock: 109,
        price: 59.99,
        isChecked: false
      },
      {
        id: 6,
        color: "Black",
        size: "US 4.5 - 5 | EU 36",
        stock: 109,
        price: 59.99,
        isChecked: false
      },
      {
        id: 7,
        color: "Black",
        size: "US 4.5 - 5 | EU 36",
        stock: 109,
        price: 59.99,
        isChecked: false
      },
      {
        id: 8,
        color: "Black",
        size: "US 4.5 - 5 | EU 36",
        stock: 109,
        price: 59.99,
        isChecked: false
      }
    ]
  }
];

const draftsData = [
  {
    id: 1,
    key: 1,
    order_id: "D1",
    created_date: "04:12 am",
    customer: {
      first_name: "Jordan",
      last_name: "Handeson",
      address: "Centralia, WA, United States",
      order: 1,
      phone: "+13603887146",
      id: 1,
    },
    status: "open",
    total: 66.89,
  },
  {
    id: 2,
    key: 2,
    order_id: "D2",
    created_date: "Yesterday at 09:07 pm",
    customer: {
      first_name: "Jordan",
      last_name: "Handeson",
      address: "Centralia, WA, United States",
      order: 1,
      phone: "+13603887146",
      id: 1,
    },
    status: "open",
    total: 79.79,
  },
  {
    id: 3,
    key: 3,
    order_id: "D3",
    created_date: "Yesterday at 09:07 pm",
    customer: {
      first_name: "Jordan",
      last_name: "Handeson",
      address: "Centralia, WA, United States",
      order: 1,
      phone: "+13603887146",
      id: 1,
    },
    status: "open",
    total: 66.99,
  },
];

const customer = [
  {
    profile_url:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "BOB",
    email: "bob@gmail.com",
    address: {
      address_one: "4012 Town ship",
      address_two: "",
      city: "Da Nang",
      state: "hoakhanh",
      country: "VietNam",
      zipcode: "395010",
    },
  },
  {
    profile_url:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Charly",
    email: "charly@gmail.com",
    address: {
      address_one: "Royal coffe",
      address_two: "",
      city: "Boise",
      state: "Idaho",
      country: "USA",
      zipcode: "83703",
    },
  },
  {
    profile_url:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Vir",
    email: "vir@gmail.com",
    address: {
      address_one: "",
      address_two: "",
      city: "meridian",
      state: "Idaho",
      country: "USA",
      zipcode: "83705",
    },
  },
];

export {
  fakeData,
  draftsData,
  productsTree,
  customer,
};

export default {
  fakeData,
  draftsData,
  productsTree,
  customer,
};