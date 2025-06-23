import { EmailSubscriptionForm } from "../_root/user/forms/EmailSubscriptionForm";

export const SubscribeEmail = () => {
  return (
    <div className="flex flex-col mt-16 mb-8 items-center">
      <h3 className="font-bold text-3xl">Subscribe now & get 20% off</h3>
      <p className="text-muted py-4">
        Offer valid until 20 June 2025. Subscribe and purchase any product at
        20% discount
      </p>
      <EmailSubscriptionForm></EmailSubscriptionForm>
    </div>
  );
};
