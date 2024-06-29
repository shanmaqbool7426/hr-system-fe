const { LedIcon, HandFreeIcon, HeadPhone, MobileIcon, KeyboardIcon } = require("@/components/svg")

export default function IconCompnent({ icon }) {

    switch (icon) {
        case 'Led':
            return <LedIcon />
        case 'HandFree':
            return <HandFreeIcon />
        case 'HeadPhone':
            return <HeadPhone />
        case 'Keyboard':
            return <KeyboardIcon />
        case 'Mobile':
            return <MobileIcon />
        default:
            <>FF</>
    }
}
