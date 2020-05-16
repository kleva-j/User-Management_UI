import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";

const style = {
  shared: {
    width: 20,
    height: 20,
  },
  mail: {
    paddingRight: '5px',
  },
  phone: {
    paddingRight: '5px',
  },
  arrowRight: {
    color: '#FFFFFF',
  },
};

export const UserItem = (props) => {
  const {
    userDetails: {
      name,
      pic,
      address,
      email,
      phone,
      id,
    },
    setUser,
    setDisplay
  } = props;
  return (
    <section data-id={id} className="UserItem">
      <div className="Profile-pic">
        <img src={pic} alt="" />
      </div>
      <div className="Info-section">
        <h6>{name}</h6>
        <p className="Address">{address}</p>
        <div className="Extra-info">
          <span>
            <span className="Email">
              <MdMailOutline style={{ ...style.shared, ...style.mail }} />
              {email}
            </span>
            <span className="Phone">
              <FiPhoneCall style={{ ...style.shared, ...style.phone }} />
              {phone}
            </span>
          </span>
          <div className="ArrowRight" onClick={() => {
            setUser({ ...props.userDetails });
            setDisplay()
          }}>
            <FaArrowRight style={{ ...style.shared, ...style.arrowRight }} />
          </div>
        </div>
      </div>
    </section>
  );
};
