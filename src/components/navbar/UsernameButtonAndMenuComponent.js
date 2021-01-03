import React, {Fragment} from 'react';


import { auth } from "../../firebase/firebase";
import { useDispatch } from "react-redux"

//Redux
// import { connect } from 'react-redux';
// import { logoutUser, updatingUserSituation } from '../../../redux/actions/userActions';

//Material UI
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';


export default function UsernameButtonAndMenuComponent() {
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null); 
    }

    function handleLogout() {
        auth
        .signOut()
        .then(() => {
          console.log("Sign-out successful.")
          alert("User has been successfully signed out!")
          dispatch({ type: "LOGOUT" })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    //TO-DO USERNAME
    const [username, setusername] = React.useState("USERNAME");
    React.useEffect(() => {
        if (username) {
            function truncate(str, n){
                return (str.length > n) ? str.substr(0, n-1) + '...' : str;
            };
            setusername(truncate(username, 12))
        }
        // return () => {}
    }, [username])


    return (
        <Fragment>
            {/* {(!props.onlyIcon)?(
                <Button
                 variant="outlined"
                 color="inherit"
                 size="small"
                 endIcon={<AccountCircleIcon />}
                 aria-controls="simple-menu" 
                 aria-haspopup="true" 
                 onClick={handleClick}
                >
                 {username}
                </Button>
            ):(
                <IconButton
                edge="end"
                aria-label="profile-menu"
                color="inherit"
                size="small"
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleClick}
                >
                <AccountCircleIcon />
                </IconButton>
            )} */}
            <Button
                 variant="outlined"
                 color="inherit"
                 size="small"
                 endIcon={<AccountCircleIcon />}
                 aria-controls="simple-menu" 
                 aria-haspopup="true" 
                 onClick={handleClick}
                >
                 {username}
            </Button>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <MenuItem disabled onClick={handleClose}>My Profile</MenuItem>
                <MenuItem disabled onClick={handleClose}>Language</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}

// const mapStateToProps = (state) => ({
//     username: state.user.credentials.username,
//     // plublicPlatformInfo: state.platform.plublicPlatformInfo,
//     // platform: state.platform
//     // projectId: state.project.projectSelected.projectId,
//     // fieldId: state.field.fieldSelected.fieldId, 
// });
 
// export default connect(
//     mapStateToProps,
//     { logoutUser, updatingUserSituation }
// )(UsernameButtonAndMenuComponent);
