import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserAccount, DivProps } from "../styledComponents/DashAccount";
import { getToken, decodeToken } from "../auth/Auth";
import EditAccount from "./EditAccount";

const YearlyAccount = props => {
  const history = useHistory();
  const token = getToken();

  const tokenId = decodeToken(token);

  let data;
  if (props.data) {
    data = props.data;
  }

  const handleSubscriptionCancellation = props.handleSubscriptionCancellation;

  const handleReturn = e => {
    e.preventDefault();
    history.push("/data");
  };

  return (
    <UserAccount>
      <div className="container">
        <div className="container-row">
          <div className="container-row-col-top col">
            <div>
              <h1>Account Access</h1>
              <span>Benefits included with your account subscription</span>
            </div>
            <EditAccount data={tokenId} />
          </div>
          <div className="container-row-col-middle col">
            <div className="account-box">
              <div className="account-box-header">
                <h1>Premium Account</h1>
                <span>{data.databankUser.paypal_plan || props.planName}</span>
              </div>
              <div className="account-box-features">
                <div className="account-box-features-list">
                  <span>Download data into an excel file</span>
                  <span>Change Data Filters</span>
                  <span>Cross-Filter Data by Date</span>
                  <span>Additional Filtering Options</span>
                </div>
              </div>
            </div>
          </div>
          <div className="container-row-col-bottom col">
            <DivProps props={props}>
              <div>
                {data && data.databankUser.p_next_billing_time ? (
                  <span>
                    Your subscription will expire on{" "}
                    {new Date(
                      parseInt(data.databankUser.p_next_billing_time)
                    ).toDateString()}
                  </span>
                ) : (
                  <button
                    className="cancel"
                    onClick={handleSubscriptionCancellation}
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
              <button className="button-return" onClick={handleReturn}>
                Return to Data
              </button>
            </DivProps>
          </div>
        </div>
      </div>
    </UserAccount>
  );
};

export default YearlyAccount;
