import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { CloseCross } from '../svg'

export default function Modal({ children, onClose, title, size = "md" }) {

    return (
        <div className="fixed inset-0 z-10 w-screen h-screen bg-black/70">
            <Dialog open={true} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
                <div className="fixed inset-0 z-10 w-screen h-screen">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className={`zt-card w-full ${size === "md" ? "max-w-md" : "max-w-lg"}`}
                        >
                            <DialogTitle as="h5" className="zt-cardTitle relative">
                                {title}
                                <button onClick={onClose} className="absolute top-0 right-0">
                                    <CloseCross />
                                </button>
                            </DialogTitle>
                            {children}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
