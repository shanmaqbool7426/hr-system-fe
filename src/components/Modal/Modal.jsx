import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


export default function Modal({ show, hide, children }) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className={`zt-modal fdf`} onClose={hide}>
        <Dialog.Overlay className="zt-modalBackdrop" />
        {children}
      </Dialog>
    </Transition.Root>
  );
}