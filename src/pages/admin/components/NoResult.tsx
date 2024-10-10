import Search from "@mui/icons-material/Search"
import { primaryColor } from "../../../utils/data"

const NoResult = () => {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4 mt-16">
                <Search sx={{ width: "3em", height: "3em", color: primaryColor }} />
                <p className="text-center text-2xl font-bold text-[#444]">Oops! No Data...</p>
            </div>
        </>
    )
}

export default NoResult