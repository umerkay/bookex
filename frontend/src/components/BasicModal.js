import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BasicModal(props) {

  return (
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    {/* <Modal.Footer> */}
        {/* <button className='btn' onClick={props.handleClose}>Close</button> */}
        {/* <button className='btn btn-main' onClick={props.handleAction}>{props.action}</button> */}
    {/* </Modal.Footer> */}
    </Modal>
  );
}