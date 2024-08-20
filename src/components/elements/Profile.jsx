import Image from "next/legacy/image"

export default function Profil({ name, lastName, image, width, height, nameClass }) {
    return (<>
        {
            image ?
                <figure className="w-10 h-10 m-0 overflow-hidden rounded-full cursor-pointer">
                    <Image
                        src={image}
                        width={width}
                        height={height}
                        quality={100}
                        priority={true}
                        placeholder="blur"
                        blurDataURL={image}
                        alt="user picture"
                    />

                </figure > :
                <div className={`flex items-center capitalize justify-center bg-gray-300 dark:bg-gray-700 dark:text-white rounded-full ${nameClass}`}>
                    {name && name[0]}{lastName && lastName[0]}
                </div>
        }
    </>)
}

Profil.defaultProps = {
    lastName: null,
    width: 40,
    height: 40,
    nameClass: 'w-10 h-10 text-xl'
}