import React from 'react';
import style from './Modal.module.css'

const Modal = ({ open, setOpenModal, children }) => {


  return <>
    <div id='containerModal' className={open ? style.modal : (style.modal, style.closeModal)} onClick={(e) => {
      if (e.target.id == 'containerModal') {
        setOpenModal(false)
        e.currentTarget.classList.add('closeModal')
      }
    }}>
      <div id='modal' className={style.modalContent}>
        {children}
      </div>
    </div >
  </>;

};

export default Modal;