import React from "react";
import { MdMailOutline, MdPhoneIphone } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

const style = {
  shared: {
    width: 20,
    height: 20,
    marginRight: '10px',
  },
  arrowLeft: {
    color: '#30BBB5',
    opacity: 0.61,
  },
  mail: {
    color: '#b5b8cf',
  },
  phone: {
    marginLeft: '5px'
  },
};

export const ViewUser = ({ result, setDisplay, className }) => {
  const {
    id,
    age,
    pic,
    name,
    address,
    email,
    phone,
    phone2,
    reg
  } = result;
  return (
    <section data-id={id} className={`ViewChild${className}`}>
      <article onClick={setDisplay}>
        <FaArrowLeft style={{ ...style.shared, ...style.arrowLeft }} />
        <h6>RESULTS</h6>
      </article>
      <section className="Profile-section">
        <aside className="Profile-pic">
          <img src={pic} alt="" />
        </aside>
        <article className="Profile-info">

          <div>
            <h6 className="Name">{name}</h6>
            <h6 className="Age">{age}</h6>
          </div>

          <p className="Address">{address}</p>

          <span className="Email">
            <MdMailOutline style={{ ...style.shared, ...style.mail }} />
            {email}
          </span>

          <span className="Joined">JOINED: {' '} {reg}</span>

          <span className="Phone">
            <FiPhoneCall style={{ ...style.shared, ...style.phone }} />
            {phone}
          </span>
          <span className="Phone2">
            <MdPhoneIphone style={{ ...style.shared, ...style.phone }} />
            {phone2}
          </span>
        </article>
      </section>
    </section>
  );
};
