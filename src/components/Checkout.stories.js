import Checkout from "./Checkout";

export default {
  title: "Components/Checkout",
  component: Checkout,
  argTypes: {
    result: {
      control: {
        type: "select",
        options: ["ok", "card_error"],
      },
      defaultValue: "ok",
    },
    amount: {
      control: {
        type: "number",
      },
      defaultValue: 10000,
    },
    paymentIntent: {
      table: { disable: true },
    },
  },
};

export const Main = (args, { argTypes }) => {
  args.paymentIntent = {
    client_secret: args.result,
    amount: args.amount,
  };

  return {
    components: { Checkout },
    template: '<Checkout :payment-intent="paymentIntent"/>',
    props: Object.keys(argTypes),
  };
};
