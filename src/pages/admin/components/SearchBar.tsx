import { TextField } from "@mui/material"
import { Search, Close } from "@mui/icons-material";

const SearchBar = ({ searchText, setSearchText, clearSearchBox, setIsSearched, setUsers, searchUsers }: any) => {
    return (
        <>
            <TextField
                label="Search"
                placeholder="Search"
                id="fullWidth"
                className="feedSearchinput"
                InputProps={{
                    startAdornment: (
                        !searchText ? <>
                            <Search
                                sx={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        </> : <div className="w-[4px]"></div>
                    ),
                    endAdornment: (
                        searchText ? <Close
                            onClick={clearSearchBox}
                            sx={{
                                width: 18,
                                height: 18,
                                cursor: "pointer"
                            }}
                        /> : null
                    ),
                    sx: {
                        borderRadius: '100px',
                        fontSize: 16,
                        width: "400px",
                        '& .MuiOutlinedInput-input': {
                            padding: '16px 12px',
                        },
                    },
                }}
                variant="outlined"
                value={searchText}
                onChange={(e: any) => setSearchText(e.target.value)}
                onKeyDown={(e: any) => {
                    if (e?.key === "Enter") {
                        if (!e?.target?.value || e?.target?.value?.trim() === "") return
                        setIsSearched(true)
                        setUsers([])
                        searchUsers(`${searchText}`, 0)
                    }
                }}
                sx={{ marginTop: "8px" }}
            />
        </>
    )
}

export default SearchBar