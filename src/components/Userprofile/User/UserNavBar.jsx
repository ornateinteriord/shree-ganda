import { useEffect, useState, Suspense } from "react";
import { FaBars } from "react-icons/fa";
import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Box,
  CssBaseline,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  useMediaQuery,
} from "@mui/material";
// Theme is now provided globally in main.jsx
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import TokenService from "../../token/tokenService";
import {
  useChangePassword,
  useGetMemberDetails,
} from "../../api/User";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../../App";
import { PremiumLoader } from "../../../utils/common";
import SidebarMenu from "../../sidebar/SidebarMenu";

const drawerWidth = 240;

// Theme is now imported globally from src/theme.js

const UserNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const location = useLocation();
  const navigation = useNavigate();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const registerNo = TokenService.getRegistrationNo();

  const {
    data: userProfile,
    isLoading,
    isError,
    error,
  } = useGetMemberDetails(registerNo);

  const { mutate: changePassword, isPending } = useChangePassword();

  // Determine the selected item based on current route
  const getSelectedItemFromRoute = () => {
    const path = location.pathname;
    if (path.includes("userdashboard")) return "Dashboard";
    if (path.includes("profile")) return "My Profile";
    if (path.includes("MyMatches")) return "My Matches";
    if (path.includes("myintrest")) return "My Interest";
    if (path.includes("viewAll")) return "View All";
    if (path.includes("search")) return "Search";
    return "Dashboard"; // Default to Dashboard
  };

  const [selectedItem, setSelectedItem] = useState(getSelectedItemFromRoute());

  // Update selected item when route changes
  useEffect(() => {
    setSelectedItem(getSelectedItemFromRoute());
  }, [location.pathname]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
    handleMenuClose();
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleConfirmLogout = () => {
    handleCloseLogoutDialog();
    navigation("/home");
    TokenService.removeToken();
    window.dispatchEvent(new Event("storage"));
  };

  const handleOpenChangePassword = () => {
    setOpenChangePasswordDialog(true);
    handleMenuClose();
  };

  const handleCloseChangePassword = () => {
    setOpenChangePasswordDialog(false);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPasswordChange = () => {
    if (passwordData.oldPassword === passwordData.newPassword) {
      toast.error("New password cannot be the same as the old password.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password don't match");
      return;
    }

    changePassword(
      {
        registrationNo: registerNo,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password changed successfully");
          handleCloseChangePassword();
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to change password"
          );
        },
      }
    );
  };

  const handleDashboardClick = () => {
    navigation("/user/userdashboard");
  };

  const handleProfileClick = () => {
    navigation("/user/profile");
  };

  const handleMatchesClick = () => {
    navigation("/user/MyMatches");
  };

  const handleInterestClick = () => {
    navigation("/user/myintrest");
  };

  const handleViewAllClick = () => {
    navigation("/user/viewAll");
  };

  const handleSearchClick = () => {
    navigation("/user/search");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);

  // On first render, ensure we're on the dashboard if no specific route is set
  useEffect(() => {
    if (location.pathname === "/user" || location.pathname === "/user/") {
      navigation("/user/userdashboard");
    }
  }, [location.pathname, navigation]);

  // Close sidebar on small screens when a menu item is clicked
  const handleMenuItemClick = (handler) => {
    if (!isLargeScreen) {
      setIsSidebarOpen(false);
    }
    handler();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          background: "#991b1b",
          height: "60px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!isLargeScreen && (
            <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
              <FaBars style={{ fontSize: "20px" }} />
            </IconButton>
          )}

          <Box sx={{ textAlign: "left", width: "100%", display: 'flex', alignItems: 'center', ml: 1 }}>
            {isLargeScreen && (
              <Link to="/" style={{ textDecoration: "none", color: "inherit", display: 'inline-flex', alignItems: 'center' }}>
                <img src="/ShreeLogo.png" alt="Shreeganda Matrimony" style={{ height: "50px", width: "auto", borderRadius: '8px', objectFit: 'contain', display: 'block' }} />
              </Link>
            )}
          </Box>

          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Typography
              color="#fff"
              fontFamily={"Outfit sans-serif"}
              fontSize={"20px"}
              marginRight={"10px"}
              textTransform={"capitalize"}
            >
              {userProfile?.first_name}
            </Typography>
            <Avatar
              src={userProfile?.image}
              sx={{
                color: "black",
                fontWeight: "500px",
                textTransform: "uppercase",
              }}
            >
              {userProfile?.first_name[0] || ""}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick(handleProfileClick)}>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleOpenChangePassword}>
              <Box display="flex" alignItems="center">
                Change Password
              </Box>
            </MenuItem>
            <MenuItem onClick={handleOpenLogoutDialog}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? drawerWidth : 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isSidebarOpen ? drawerWidth : 0,
            boxSizing: "border-box",
            background: "#991b1b",
            color: "#fff",
            transition: "width 0.6s ease, opacity 0.6s ease",
            opacity: isSidebarOpen ? 1 : 0,
          },
        }}
      >
        <Toolbar />
        {!isLargeScreen && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <Link to="/" style={{ textDecoration: "none", display: 'inline-flex', alignItems: 'center' }}>
              <img src="/ShreeLogo.png" alt="Shreeganda Matrimony" style={{ height: "48px", width: "auto", borderRadius: '8px', objectFit: 'contain' }} />
            </Link>
          </Box>
        )}
        <SidebarMenu
          selectedItem={selectedItem}
          handleDashboardClick={() =>
            handleMenuItemClick(handleDashboardClick)
          }
          handleProfileClick={() => handleMenuItemClick(handleProfileClick)}
          handleMatchesClick={() => handleMenuItemClick(handleMatchesClick)}
          handleInterestClick={() => handleMenuItemClick(handleInterestClick)}
          handleViewAllClick={() => handleMenuItemClick(handleViewAllClick)}
          handleSearchClick={() => handleMenuItemClick(handleSearchClick)}
          handleOpenLogoutDialog={handleOpenLogoutDialog}
          userProfile={userProfile}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: 1,
          paddingLeft: isSidebarOpen ? `30px` : "20px",
          transition: "padding-left 0.4s ease",
        }}
      >
        <Toolbar />
        <Suspense fallback={
          <PremiumLoader />
        }>
          <Outlet />
        </Suspense>
      </Box>

      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontWeight: 600, color: "black" }} id="alert-dialog-title">
          Confirm Logout
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black" }}
          >
            Are you sure you want to logout from your account?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseLogoutDialog}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              fontSize: "18px",
              fontWeight: 500,
              color: "black",
              borderColor: "black",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderColor: "black",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirmLogout}
            color="error"
            variant="contained"
            autoFocus
            sx={{
              textTransform: "capitalize",
              fontSize: "18px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openChangePasswordDialog}
        onClose={handleCloseChangePassword}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle sx={{ fontWeight: "bold" }} id="form-dialog-title">
          Change Password
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              lineHeight: { xs: 1.3, sm: 1.5 },
            }}
          >
            Please enter your current password and new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="oldPassword"
            label="Current Password"
            type="password"
            fullWidth
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
          />
          <TextField
            margin="dense"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
          <TextField
            margin="dense"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseChangePassword}
            sx={{
              textTransform: "capitalize",
              fontSize: "18px",
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitPasswordChange}
            sx={{
              textTransform: "capitalize",
              fontSize: "18px",
              color: "#2e7d32", // Using success color from theme
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            disabled={isPending}
          >
            {isPending ? "Changing..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading && <LoadingComponent />}
    </Box>
  );
};

export default UserNavBar;
