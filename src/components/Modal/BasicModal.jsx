import React from "react";
import Modal from "./Modal";
import PasswordUpdated from "./PasswordUpdated";


const BasicModal = ({ popup, setPopup, hide, state, setState, noicon }) => { 

  return (
    <Modal show={popup} hide={setPopup} noicon={noicon}>
      {(() => {
        switch (state) {
          case 1: { return <PasswordUpdated setstate={setState} setPopup={setPopup} size={'sm'} /> }

          default:
            break;
        }
      })()}
    </Modal>
  );
};

export default BasicModal;