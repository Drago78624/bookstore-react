import React from "react";
import PaymentMethodForm from "../../components/profile/PaymentMethodForm";

const Profile = () => {
  return (
    <div className="p-2 container max-w-[992px] mx-auto">
      <h2 className="font-semibold text-3xl my-4">Hello, Maaz Ahmed!</h2>
      <div>
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Payment Methods
          </div>
          <div className="collapse-content">
            <PaymentMethodForm />
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Order History
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">Addresses</div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Password Reset
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
