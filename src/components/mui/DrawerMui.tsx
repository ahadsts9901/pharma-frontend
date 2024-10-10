import "./index.css"
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AiFillProduct } from "react-icons/ai";
import { companyName, primaryColor } from '../../utils/data';
import logo from "/logo.webp"
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl, defaultProfilePicture } from '../../utils/core';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import ConfirmAlertMUI from './ConfirmAlertMUI';
import axios from 'axios';
import { logout, setIsAdminDrawerOpen } from '../../redux/user';
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine as LogoutIcon } from "react-icons/ri";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawerMUI({ children }: any) {

    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const state = useSelector((state: any) => state)
    const currentUser = state?.user
    const isAdminDrawerOpen = state?.isAdminDrawerOpen

    // window data
    const [pathName, setPathName] = React.useState<string | null>(null)

    React.useEffect(() => {
        setPathName(window?.location?.pathname)
    }, [])

    const [open, setOpen] = React.useState<any>(isAdminDrawerOpen);

    const sideBarData = [
        {
            label: "Products",
            route: "/admin",
            similarRoutes: ["/admin"],
            icon: <AiFillProduct style={{ width: "18px", height: "18px" }} />
        },
    ]

    const handleDrawerOpen = () => {
        setOpen(true);
        dispatch(setIsAdminDrawerOpen(true))
    };

    const handleDrawerClose = () => {
        setOpen(false);
        dispatch(setIsAdminDrawerOpen(false))
    };

    // menu

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event?.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // confirmation alert

    const [alertData, setAlertdata] = React.useState<any>(null)
    const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false)

    // loading

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    // logout

    const _logout = async () => {
        try {
            setIsLoading(true)
            await axios.post(`${baseUrl}/api/v1/auth/logout`, {}, {
                withCredentials: true
            })
            setIsLoading(false)
            dispatch(logout())
            setAlertdata(null)
            setIsAlertOpen(false)
            navigate("/login")

        } catch (error: any) {
            console.error(error)
            setIsLoading(false)
        }

    }

    return (
        <>
            <ConfirmAlertMUI
                open={isAlertOpen}
                setOpen={setIsAlertOpen}
                title={alertData?.title}
                description={alertData?.description}
                fun={alertData?.fun}
                isLoading={isLoading}
            />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" className='appbar-ui-style'>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "flex-start"
                                }}
                            >
                                <p style={{ fontWeight: "bold", wordSpacing: "4px" }}>{companyName}</p>
                            </div>
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{ padding: 0 }}
                                >
                                    <div className='flex items-center'>
                                        <img src={currentUser?.profilePhoto || defaultProfilePicture} alt="profile picture"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                                borderRadius: "100px",
                                                cursor: "pointer",
                                                background: "#EDEDED",
                                            }}
                                        />
                                    </div>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    sx={{ borderRadius: 0, padding: 0 }}
                                >
                                    {/* <MenuItem onClick={handleClose}
                                    ><PersonIcon
                                            sx={{ width: 18, height: 18 }}
                                        /> <span
                                            style={{
                                                marginLeft: "4px",
                                                paddingLeft: "3px"
                                            }}
                                        >Profile</span></MenuItem> */}
                                    <MenuItem
                                        onClick={() => {
                                            setAlertdata({
                                                title: "Logout?",
                                                description: "Are you sure you want to logout?. The action cannot be undone",
                                                fun: _logout,
                                            })
                                            setIsAlertOpen(true)
                                            handleClose()
                                        }}
                                        sx={{ padding: "16px" }}
                                    ><LogoutIcon /> <span style={{
                                        marginLeft: "4px",
                                        paddingLeft: "4px",
                                    }}>Logout</span></MenuItem>
                                </Menu>
                            </>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <div
                            style={{
                                display: "flex",
                                gap: "16px",
                                alignItems: "center",
                                margin: "auto"
                            }}
                        >
                            <img src={logo} width={30} height={30} alt='logo'
                                className='user-profile-picture'
                            />
                            <p style={{fontWeight: "bold"}}>{companyName}</p>
                        </div>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List sx={{ padding: 0 }}>
                        {sideBarData?.map((data: any, i: number) => (
                            <ListItem key={i} disablePadding
                                onClick={() => navigate(data?.route)}
                                sx={{
                                    display: 'block',
                                    color: pathName === data?.route ? primaryColor : ""
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minWidth: 0,
                                        minHeight: 48,
                                        justifyContent: open ? 'flex-start' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            mr: open ? 3 : 0,
                                            justifyContent: 'center',
                                            color: pathName === data?.route ? primaryColor : "",
                                        }}
                                    >
                                        {data?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={data?.label} sx={{
                                        opacity: open ? 1 : 0,
                                        display: open ? "block" : "none"
                                    }} className={`${pathName === data?.route ? "font-bold" : ""}`} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    {/* <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    {children}
                </Box>
            </Box>
        </>
    );
}