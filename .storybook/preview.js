import "../src/assets/tailwind.css";

const _Stripe = window.Stripe;

window.Stripe = (key, options) => {
  const stripe = new _Stripe(key, options || {});

  return new Proxy(stripe, {
    get: function (obj, prop) {
      switch (prop) {
        case "confirmCardPayment":
          return (secret) =>
            new Promise((resolve) =>
              setTimeout(() => {
                switch (secret) {
                  case "card_error":
                    resolve({ error: secret });
                    break;
                  case "ok":
                  default:
                    resolve({});
                }
              }, 1000)
            );
        default:
          return obj[prop];
      }
    },
  });
};
