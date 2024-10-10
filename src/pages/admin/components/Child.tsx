import { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { primaryColor } from '../../../utils/data';
import { Button, Checkbox, darken, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { theme } from '../../../utils/muiTheme';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SideBarDrawer from '../../../components/mui/SideBarDrawer';
import AddStudentForm from './AddStudentForm';
import { educationOptions, genderOptions, paginationRowsPerPageData } from '../../../utils/core';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import moment from 'moment';
import SearchBar from "./SearchBar"
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axios from 'axios';
import UsersTable from './UserTable';
import NoResult from './NoResult';
import Loading from './Loading';



const Child = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

    const [gender, setGender] = useState<null | string>(null)
    const [education, setEducation] = useState<null | string>(null)
    const [dob, setDob] = useState<null | string>(null)

    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const [isDisabled, setIsDisabled] = useState<boolean | null>(null)
    const [isSuspended, setIsSuspended] = useState<boolean | null>(null)
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null)

    const [searchText, setSearchText] = useState<null | string>(null)
    const [isSearched, setIsSearched] = useState<boolean>(false)

    const [totalDocs, setTotalDocs] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)

    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        getUsers(0)
    }, [])

    useEffect(() => {
        setTotalPages(Math.ceil(totalDocs / rowsPerPage) ? Math.ceil(totalDocs / rowsPerPage) : 1)
    }, [totalDocs, rowsPerPage])

    useEffect(() => {

        if (isSearched) {
            if (!searchText) return
            searchUsers(searchText, pageNumber)
        } else {
            setSearchText("")
            getUsers(pageNumber)
        }

    }, [rowsPerPage, pageNumber, gender, education, dob, isAdmin, isDisabled, isSuspended, isEmailVerified])

    const getUsers = async (pageNumber: number) => {

        try {

            setIsLoading(true)

            const genderQuery = `${gender && gender?.length ? `&gender=${gender}` : ""}`
            const educationQuery = `${education && education?.length ? `&education=${education}` : ""}`
            const dobQuery = `${dob && dob?.length ? `&dateOfBirth=${dob}` : ""}`

            const adminQuery = `${isAdmin !== null ? `&isAdmin=${isAdmin}` : ""}`
            const disabledQuery = `${isDisabled !== null ? `&isDisabled=${isDisabled}` : ""}`
            const suspendedQuery = `${isSuspended !== null ? `&isSuspended=${isSuspended}` : ""}`
            const emailQuery = `${isEmailVerified !== null ? `&isEmailVerified=${isEmailVerified}` : ""}`

            const query = `${genderQuery}${educationQuery}${dobQuery}${adminQuery}${disabledQuery}${suspendedQuery}${emailQuery}`

            const getStudentsUrl = `/api/v1/student?page=${pageNumber}&pageSize=${rowsPerPage}${query}`

            const resp = await axios.get(getStudentsUrl, {
                withCredentials: true
            })

            setUsers(resp?.data?.users)
            setTotalDocs(resp?.data?.totalDocuments)

            setIsLoading(false)

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }

    }

    const searchUsers = async (text: string, pageNumber: number) => {

        if (!text || text?.trim() === "") return

        try {

            setIsLoading(true)

            const resp = await axios.get(`/api/v1/student/search?q=${text}&page=${pageNumber}&pageSize=${rowsPerPage}`, {
                withCredentials: true
            })

            setUsers(resp?.data?.users)
            setTotalDocs(resp?.data?.totalDocuments)

            setIsLoading(false)
            setIsSearched(true)

        } catch (error: any) {
            console.error(error)
            setIsLoading(false)
        }

    }

    const clearSearchBox = async () => {

        if (!isSearched) {
            setSearchText("")
            setIsSearched(false)
            return
        }

        setSearchText("")
        setIsSearched(false)
        getUsers(0)

    }

    useEffect(() => {

        if (!searchText || searchText?.trim() === "") clearSearchBox()

    }, [searchText])

    return (
        <>
            <SideBarDrawer open={isSidebarOpen} setOpen={setIsSidebarOpen}>
                <AddStudentForm isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} getUsers={getUsers} />
            </SideBarDrawer>
            <div className='p-8 w-full flex flex-col justify-start items-start gap-4'>
                <>
                    <div className='w-full flex justify-between items-center'>
                        <p className={`text-[${primaryColor}] text-[24px] flex justify-start items-start gap-2 font-bold`}> <PersonIcon sx={{ fontSize: 30, color: primaryColor }} /> Students</p>
                        <Button variant='contained' color="primary"
                            onClick={() => setIsSidebarOpen(true)}
                            sx={{
                                backgroundColor: darken(theme.palette.primary.main, 0.2),
                                '&:hover': {
                                    backgroundColor: darken(theme.palette.primary.main, 0.3),
                                }
                            }}
                        ><AddCircleIcon sx={{ marginRight: "12px" }} /> Add Student</Button>
                    </div>
                </>
                <>
                    <div className='w-full flex flex-col justify-start items-start gap-4'>
                        <>
                            <SearchBar
                                searchText={searchText}
                                setSearchText={setSearchText}
                                clearSearchBox={clearSearchBox}
                                setIsSearched={setIsSearched}
                                setUsers={setUsers}
                                searchUsers={searchUsers}
                            />
                        </>
                        <>
                            <div className='flex justify-start items-start gap-4'>
                                <span className='w-[196px]'>
                                    <FormControl sx={{ width: "196px", marginTop: "8px" }}>
                                        <InputLabel id="demo-simple-select-label"
                                            sx={{ background: "#fff" }}
                                        >Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={gender ? gender : ""}
                                            label="Gender"
                                            onChange={(e: any) => setGender(e?.target?.value?.toUpperCase())}
                                        >
                                            {
                                                genderOptions?.map((gender: string, i: number) => <MenuItem key={i} value={gender?.toUpperCase()}>{gender}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </span>
                                <span className='w-[196px]'>
                                    <FormControl sx={{ width: "196px", marginTop: "8px" }}>
                                        <InputLabel id="demo-simple-select-label"
                                            sx={{ background: "#fff" }}
                                        >Education</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={education ? education : ""}
                                            label="Education"
                                            onChange={(e: any) => setEducation(e?.target?.value?.toUpperCase())}
                                        >
                                            {
                                                educationOptions?.map((education: string, i: number) => <MenuItem key={i} value={education?.toUpperCase()}>{education}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </span>
                                <>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Date of birth"
                                                sx={{ width: "196px!important" }}
                                                onChange={(e: any) => setDob(moment(e).format())}
                                                maxDate={moment(new Date())}
                                                value={dob ? moment(dob) : null}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </>
                            </div>
                        </>
                        <div className='w-full flex justify-start items-center gap-2 flex-wrap'>
                            <FormControlLabel control={<Checkbox checked={isDisabled == true} onChange={() => setIsDisabled(!isDisabled)} />} label="Disabled" />
                            <FormControlLabel control={<Checkbox checked={isSuspended == true} onChange={() => setIsSuspended(!isSuspended)} />} label="Suspended" />
                            <FormControlLabel control={<Checkbox checked={isAdmin == true} onChange={() => setIsAdmin(!isAdmin)} />} label="Admin" />
                            <FormControlLabel control={<Checkbox checked={isEmailVerified == true} onChange={() => setIsEmailVerified(!isEmailVerified)} />} label="Email verified" />
                            <Button disabled={isLoading} style={{ padding: "4px 24px" }} onClick={() => {
                                setGender(null)
                                setEducation(null)
                                setDob(null)
                                setIsAdmin(null)
                                setIsDisabled(null)
                                setIsSuspended(null)
                                setIsEmailVerified(null)
                            }} variant="outlined" color="primary">Clear Filters</Button>
                        </div>
                    </div>
                </>
                <>
                    {
                        isLoading ? <Loading /> : users?.length ? <UsersTable users={users} isLoading={isLoading} /> : <NoResult />
                    }
                </>
                <>
                    {
                        (users?.length > 0) && !isLoading &&
                        <>
                            <div className="w-full flex justify-between items-center">
                                <>
                                    <div className="flex justify-start items-center gap-2">
                                        <Select
                                            disabled={totalDocs <= 10}
                                            variant="standard"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            defaultValue={10}
                                            value={rowsPerPage}
                                            onChange={(e: any) => setRowsPerPage(e?.target?.value)}
                                            sx={{
                                                width: 50,
                                            }}
                                        >
                                            {
                                                paginationRowsPerPageData?.map((row: any) => (
                                                    <MenuItem value={row}
                                                        key={row}
                                                    >
                                                        {row}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <p className="font-bold"
                                            style={{
                                                color: (totalDocs <= 10) ? "#979797" : ""
                                            }}
                                        >rows per page</p>
                                    </div>
                                </>
                                <>
                                    <div className="flex justify-end items-center gap-2">
                                        <FirstPageIcon
                                            onClick={() => {
                                                setPageNumber(0)
                                            }}
                                            style={{
                                                cursor: (Math.ceil((pageNumber + 1) / rowsPerPage) > 1) ? "pointer" : "",
                                                pointerEvents: (Math.ceil((pageNumber + 1) / rowsPerPage) > 1) ? "auto" : "none",
                                                color: (Math.ceil((pageNumber + 1) / rowsPerPage) > 1) ? "" : "#979797"
                                            }} />
                                        <ChevronLeftIcon
                                            onClick={() => {
                                                setPageNumber(Math.max(0, pageNumber - rowsPerPage))
                                            }}
                                            style={{
                                                cursor: (Math.ceil((pageNumber + 1) / rowsPerPage) > 1) ? "pointer" : "",
                                                pointerEvents: (Math.ceil((pageNumber + 1) / rowsPerPage) > 1) ? "auto" : "none",
                                                color: (Math.ceil((pageNumber + 1) / rowsPerPage) > 1) ? "" : "#979797"
                                            }} />
                                        <div className="flex justify-center items-center gap-4">
                                            <p className="py-2 px-4 flex justify-center items-center border rounded-md">{Math.ceil((pageNumber + 1) / rowsPerPage)}</p>
                                            <p className="font-bold">of {Math.ceil(totalPages)} {Math.ceil(totalPages) > 1 ? "pages" : "page"}</p>
                                        </div>
                                        <ChevronRightIcon
                                            onClick={() => {
                                                setPageNumber(pageNumber + rowsPerPage)
                                            }}
                                            style={{
                                                cursor: (Math.ceil((pageNumber + 1) / rowsPerPage) < totalPages) ? "pointer" : "",
                                                pointerEvents: (Math.ceil((pageNumber + 1) / rowsPerPage) < totalPages) ? "auto" : "none",
                                                color: (Math.ceil((pageNumber + 1) / rowsPerPage) < totalPages) ? "" : "#979797"
                                            }} />
                                        <LastPageIcon
                                            onClick={() => setPageNumber(totalPages > 0 ? (totalPages - 1) * rowsPerPage : 0)}
                                            style={{
                                                cursor: (Math.ceil((pageNumber + 1) / rowsPerPage) < totalPages) ? "pointer" : "",
                                                pointerEvents: (Math.ceil((pageNumber + 1) / rowsPerPage) < totalPages) ? "auto" : "none",
                                                color: (Math.ceil((pageNumber + 1) / rowsPerPage) < totalPages) ? "" : "#979797"
                                            }} />
                                    </div>
                                </>
                            </div>
                        </>
                    }
                </>
            </div >
        </>
    )
}

export default Child