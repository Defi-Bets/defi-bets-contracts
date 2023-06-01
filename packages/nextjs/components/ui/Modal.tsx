import React from "react";
import cn from "classnames";

type Props = {
  children: React.ReactNode;
  open: boolean;
  // add disableClickOutside
};

const Modal = ({ children, open }: Props) => {
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });
  return (
    <>
      {/* <input type="checkbox" className="modal-toggle" /> */}
      <div className={modalClass}>
        <div className="modal-box">{children}</div>
      </div>
    </>
  );
};

export default Modal;
