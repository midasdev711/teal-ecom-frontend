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


export {
  fakeData,
};

export default {
  fakeData,
};