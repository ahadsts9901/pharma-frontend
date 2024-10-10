import "./main.css"
import { useState } from 'react'
import PasswordMUI from '../../../components/mui/PasswordMUI'
import { educationArray, educationOptions, emailPattern, usernamePattern, genderArray, passwordPattern, defaultProfilePicture as profilePicture } from '../../../utils/core'
import { Button, Divider, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Copyright } from '../../login/Login';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AlertMUI from '../../../components/mui/AlertMUI';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment"


const AddStudentForm = ({ isOpen, setIsOpen, getUsers }: any) => {

    console.log(isOpen)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [profileBse64, setProfileBse64] = useState<null | string>(null)
    const [_profilePicture, set_ProfilePicture] = useState<any>(null)
    const [firstName, setFirstName] = useState<null | string>(null)
    const [lastName, setLastName] = useState<null | string>(null)
    const [fatherName, setFatherName] = useState<null | string>(null)
    const [dateOfBirth, setDateOfBirth] = useState<any>(null)
    const [email, setEmail] = useState<null | string>(null)
    const [cnic, setCnic] = useState<null | string>(null)
    const [password, setPassword] = useState<null | string>(null)
    const [repeatPassword, setRepeatPassword] = useState<null | string>(null)
    const [gender, setGender] = useState<string | null>("MALE")
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [phoneNumber, setPhoneNumber] = useState<null | string>(null)
    const [phoneNumberPublic, setPhoneNumberPublic] = useState<null | string>(null)
    const [fatherCnic, setFatherCnic] = useState<null | string>(null)
    const [education, setEducation] = useState<null | string>("")
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [successMessage, setSuccessMessage] = useState<null | string>(null)

    const addStudent = async (e: any) => {

        e?.preventDefault()

        if (!firstName || firstName.trim() === "") {
            setErrorMessage("Firstname is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!usernamePattern?.test(firstName)) {
            setErrorMessage("Firstname is invalid")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!lastName || lastName.trim() === "") {
            setErrorMessage("Lastname is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!usernamePattern?.test(lastName)) {
            setErrorMessage("Lastname is invalid")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!email || email?.trim() === "") {
            setErrorMessage("Email is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!emailPattern?.test(email.toLowerCase())) {
            setErrorMessage("Email is invalid")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!cnic || cnic.trim() === "") {
            setErrorMessage("CNIC is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!fatherName || fatherName.trim() === "") {
            setErrorMessage("Fathername is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!usernamePattern?.test(fatherName)) {
            setErrorMessage("Fathername is invalid")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!phoneNumber || phoneNumber?.trim() === "") {
            setErrorMessage("Personal phone number is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!phoneNumberPublic || phoneNumberPublic?.trim() === "") {
            setErrorMessage("Second phone number is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (phoneNumber === phoneNumberPublic) {
            setErrorMessage("Phone numbers cannot be the same")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!fatherCnic || fatherCnic.trim() === "") {
            setErrorMessage("Father CNIC is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (fatherCnic === cnic) {
            setErrorMessage("You CNIC & Father's CNIC cannot be the same")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }


        if (!password || password.trim() === "") {
            setErrorMessage("Password is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!passwordPattern?.test(password)) {
            setErrorMessage("Password must be alphanumeric and 8 to 24 characters long")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (password !== repeatPassword) {
            setErrorMessage("Passwords do not match")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!gender || gender?.trim() === "") {
            setErrorMessage("Gender is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!genderArray.includes(gender.toUpperCase())) {
            setErrorMessage("Gender is invalid")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!dateOfBirth || dateOfBirth.trim() === "") {
            setErrorMessage("Date of birth is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!education || education.trim() === "") {
            setErrorMessage("Education is required")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        if (!educationArray?.includes(education.toUpperCase())) {
            setErrorMessage("Please select education from options")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        try {

            setIsLoading(true)

            const formData: any = new FormData()
            formData.append("profilePicture", _profilePicture)
            formData.append("firstName", firstName)
            formData.append("lastName", lastName)
            formData.append("fatherName", fatherName)
            formData.append("dateOfBirth", dateOfBirth)
            formData.append("email", email)
            formData.append("cnic", cnic)
            formData.append("fatherCnic", fatherCnic)
            formData.append("phoneNumber", phoneNumber)
            formData.append("phoneNumberPublic", phoneNumberPublic)
            formData.append("password", password)
            formData.append("gender", gender)
            formData.append("isAdmin", isAdmin)
            formData.append("education", education?.toUpperCase())

            await axios.post("/api/v1/student", formData, { withCredentials: true })

            setIsLoading(false)
            setErrorMessage(null)
            setSuccessMessage(`${isAdmin ? "Admin" : "Student"} Added Successfully`)
            getUsers(0)
            setTimeout(() => {
                setSuccessMessage(null)
                setIsOpen(false)
            }, 1500)

        } catch (error: any) {
            setIsLoading(false)
            console.error(error)
            setErrorMessage(error?.response?.data?.message)
            setSuccessMessage(null)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }

    }

    return (
        <>
            {
                errorMessage && <AlertMUI status="error" text={errorMessage} />
            }
            {
                successMessage && <AlertMUI status="success" text={successMessage} />
            }
            <form onSubmit={addStudent} className='w-fit flex flex-col justify-start items-center gap-4 p-4 pt-[100px] addStudentForm'>
                <>
                    <label htmlFor="profilePic" className='cursor-pointer'>
                        <img src={profileBse64 || profilePicture} alt=""
                            className='w-[100px] h-[100px] object-cover object-center rounded-full bg-[#ccc]'
                        />
                    </label>
                    <input type="file" id="profilePic" hidden accept='image/*'
                        onChange={(e: any) => {
                            const base64Url = URL.createObjectURL(e?.target?.files[0])
                            setProfileBse64(base64Url)
                            set_ProfilePicture(e?.target?.files[0])
                        }}
                    />
                </>
                <>
                    <>
                        <div className='flex justify-around items-center gap-4'>
                            <TextField id="outlined-basic" label="First Name * " variant="outlined" onChange={(e: any) => setFirstName(e?.target?.value)} />
                            <TextField id="outlined-basic" label="Last Name * " variant="outlined" onChange={(e: any) => setLastName(e?.target?.value)} />
                        </div>
                        <div className='flex justify-around items-center gap-4'>
                            <TextField id="outlined-basic" label="Email * " type='email' variant="outlined" onChange={(e: any) => setEmail(e?.target?.value)} />
                            <TextField id="outlined-basic" label="CNIC * " type="number" variant="outlined"
                                onChange={(e: any) => {
                                    if (`${e?.target?.value}`.length > 13) {
                                        e.target.value = `${e?.target?.value}`?.slice(0, 13);
                                    }
                                    setCnic(e?.target?.value?.toString())
                                }} />
                        </div>
                    </>
                    <>
                        <div className='flex justify-around items-center gap-4'>
                            <TextField id="outlined-basic" label="Father Name * " variant="outlined" onChange={(e: any) => setFatherName(e?.target?.value)} />
                            <TextField id="outlined-basic" label="Father CNIC * " type="number" variant="outlined"
                                onChange={(e: any) => {
                                    if (`${e?.target?.value}`.length > 13) {
                                        e.target.value = `${e?.target?.value}`?.slice(0, 13);
                                    }
                                    setFatherCnic(e?.target?.value?.toString())
                                }} />
                        </div>
                    </>
                    <>
                        <div className='w-full flex justify-around items-center gap-4 dateCont'>
                            <>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DemoContainer components={['DatePicker']}
                                        sx={{ padding: 0 }}
                                    >
                                        <DatePicker label="Date of birth * "
                                            sx={{ width: "196px!important" }}
                                            onChange={(e: any) => setDateOfBirth(moment(e).format())}
                                            maxDate={moment(new Date())}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </>
                            <>
                                <FormControl sx={{ width: "196px" }}>
                                    <InputLabel id="demo-simple-select-label"
                                        sx={{ background: "#fff" }}
                                    >Education * </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={education}
                                        label="Gender"
                                        onChange={(e: any) => setEducation(e?.target?.value)}
                                    >
                                        {
                                            educationOptions?.map((education: string, i: number) => <MenuItem key={i} value={education.toUpperCase()}>{education}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </>
                        </div>
                    </>
                    <>
                        <div className='flex justify-around items-center gap-4'>
                            <TextField id="outlined-basic" label="Phone number personal * " type="number" variant="outlined"
                                onChange={(e: any) => {
                                    if (`${e?.target?.value}`.length > 11) {
                                        e.target.value = `${e?.target?.value}`?.slice(0, 11);
                                    }
                                    setPhoneNumber(e?.target?.value?.toString())
                                }} />
                            <TextField id="outlined-basic" label="Phone number not-personal * " type="number" variant="outlined"
                                onChange={(e: any) => {
                                    if (`${e?.target?.value}`.length > 11) {
                                        e.target.value = `${e?.target?.value}`?.slice(0, 11);
                                    }
                                    setPhoneNumberPublic(e?.target?.value?.toString())
                                }} />
                        </div>
                    </>
                    <>
                        <div className='flex justify-around items-center gap-4'>
                            <span className='w-[196px]'>
                                <PasswordMUI
                                    label="Password * "
                                    onChange={(value: any) => setPassword(value)}
                                    name="password"
                                />
                            </span>
                            <span className='w-[196px]'>
                                <PasswordMUI
                                    label="Repeat Password * "
                                    onChange={(value: any) => setRepeatPassword(value)}
                                    name="repeat password"
                                />
                            </span>
                        </div>
                    </>
                    <>
                        <FormControl sx={{ width: "100%", paddingLeft: "16px", paddingTop: "16px" }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(e: any) => setGender(e?.target?.value?.toUpperCase())}
                                defaultValue="male"
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </>
                    <>
                        <FormControlLabel sx={{ width: "100%", paddingLeft: "16px" }} control={<Switch onChange={() => setIsAdmin(!isAdmin)} />} label="Admin" />
                    </>
                    <>
                        <Button type='submit' color='primary' variant="contained" disabled={isLoading} fullWidth
                            sx={{ marginTop: "12px" }}
                        >
                            <AddCircleIcon sx={{ marginRight: "12px" }} /> {isLoading ? "Processing" : "Add Student"}
                        </Button>
                        <div className="w-full mt-4">
                            <Divider />
                            <div className='w-full p-4'>
                                <Copyright />
                            </div>
                        </div>
                    </>
                </>
            </form>
        </>
    )
}

export default AddStudentForm