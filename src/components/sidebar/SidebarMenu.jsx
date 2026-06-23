import React from "react";
import { List, ListItem, Box, Button, Typography, Chip } from "@mui/material";
import {
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaHeart,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { Dashboard } from "@mui/icons-material";

const SidebarMenu = ({
  selectedItem,
  handleDashboardClick,
  handleProfileClick,
  handleMatchesClick,
  handleInterestClick,
  handleViewAllClick,
  handleSearchClick,
  handleOpenLogoutDialog,
  userProfile,
}) => {
  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      onClick: handleDashboardClick,
    },
    {
      text: "My Profile",
      icon: <FaUser />,
      onClick: handleProfileClick,
    },
    {
      text: "My Matches",
      icon: <FaUsers />,
      onClick: handleMatchesClick,
    },
    {
      text: "My Interest",
      icon: <FaHeart />,
      onClick: handleInterestClick,
    },
    {
      text: "View All",
      icon: <FaUsersViewfinder />,
      onClick: handleViewAllClick,
    },
    {
      text: "Search",
      icon: <FaSearch />,
      onClick: handleSearchClick,
    },
    {
      text: "Logout",
      icon: <FaSignOutAlt />,
      onClick: handleOpenLogoutDialog,
    },
  ];

  return (
    <Box sx={{ 
      height: '100%',
      backgroundColor: "#faf3e0", 
      color: "#5d2a18",
      borderRight: "1px solid #d4c4a8",
      overflow: "auto",
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' }
    }}>
      <List sx={{ padding: 0 }}>
        <ListItem sx={{ 
          backgroundColor: "#7c2d12", 
          color: "white", 
          flexDirection: "column", 
          py: 3,
          borderBottom: "2px solid #5d2a18"
        }}>
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography
              variant="h5"
              textTransform={"capitalize"}
              sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
            >
              {userProfile?.first_name}
            </Typography>
            <Chip
              label={userProfile?.type_of_user || "FreeUser"}
              size="small"
              sx={{
                mt: 1,
                fontSize: "0.8rem",
                backgroundColor:
                  userProfile?.type_of_user === "PremiumUser" ||
                    userProfile?.type_of_user === "SilverUser"
                    ? "#FFD700"
                    : "#87CEEB",
                color: "black",
                fontWeight: "bold",
              }}
            />
          </Box>
        </ListItem>

        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              disablePadding
              onClick={item.onClick}
              sx={{
                backgroundColor:
                  selectedItem === item.text ? "#e6d5b8" : "transparent",
                "&:hover": {
                  backgroundColor: "#f0e2cc",
                },
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
            >
              <Button
                variant="text"
                startIcon={React.cloneElement(item.icon, { style: { color: "#7c2d12", fontSize: "18px" } })}
                sx={{
                  color: "#5d2a18",
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  px: 3,
                  py: 1,
                  width: "100%",
                  justifyContent: "flex-start",
                  fontWeight: selectedItem === item.text ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {item.text}
              </Button>
            </ListItem>
            <Box sx={{ height: "1px", backgroundColor: "#d4c4a8", mx: 1 }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SidebarMenu;