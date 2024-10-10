import { CircularProgress } from '@mui/material'

const Loading = () => {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4 mt-16">
                <CircularProgress size={50} color='primary' />
                <p className="text-center text-2xl font-bold text-[#444]">Loading...</p>
            </div>
        </>
    )
}

export default Loading