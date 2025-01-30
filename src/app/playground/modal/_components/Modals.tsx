"use client";

import React, { ReactNode } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<Props> = (props) => {
  const { isOpen, onClose, children } = props;
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      closeTimeoutMS={300}
      ariaHideApp={false}
      className="relative z-50 h-screen w-screen bg-black/50"
      overlayClassName="fixed inset-0 bg-black_main flex items-center justify-center z-50"
    >
      <div className="flex size-full flex-col items-center justify-center">
        <div className="flex w-full justify-end md:w-[640px]">
          <button className="px-3 py-0.5  md:px-1" onClick={onClose}>
            <FontAwesomeIcon
              className="cursor-pointer text-2xl text-white hover:text-gray-300"
              icon={faXmark}
            />
          </button>
        </div>
        <div className="w-full bg-white p-3 md:w-[640px] md:rounded-md">
          {children}
        </div>
      </div>
    </ReactModal>
  );
};
