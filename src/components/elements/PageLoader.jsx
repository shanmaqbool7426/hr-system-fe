import { EclipseLoader } from "../svg";

export default function PageLoader() {
    return (<>
        <div className="text-themePrimary fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-gray-100 z-20">
            <EclipseLoader />
        </div>
        <div className="text-themePrimary fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20">
            <span className="text-2xl">Loading...</span>
        </div>
    </>)
}