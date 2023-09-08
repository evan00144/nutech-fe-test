import React, { useEffect, useState } from "react";
import {  Modal } from "react-bootstrap";

export default function ModalComponent({ modal,children }: any) {
  const [modalProps, setModalProps] = useState({
    show: false,
  });
  useEffect(() => {
    setModalProps((prev) => {
      return {
        ...prev,
        ...modal,
      };
    });
  }, [modal]);
  return (
    <Modal
      show={modalProps?.show}
      size="sm"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton> */}
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      {/* </Modal.Header> */}
      <Modal.Body className="py-4">
        {children}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
