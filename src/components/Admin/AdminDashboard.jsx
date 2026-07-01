import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import {  FaUser, FaUsers, FaServer, FaReceipt, FaBars, FaChevronDown, FaChevronUp, FaDashcube, FaIdBadge } from 'react-icons/fa';
import { TbMessageReportFilled } from 'react-icons/tb';
import { IoIosNotifications } from 'react-icons/io';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, List, ListItem, ListItemText, IconButton, Typography, Menu, MenuItem, Avatar, Badge, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Box, useMediaQuery } from '@mui/material';
import { PremiumLoader } from '../../utils/common';
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { getAllUserCounts } from '../api/Admin';

const AdminDashboard = () => {
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openUserManagement, setOpenUserManagement] = useState(false);
  const [openAssistanceService, setOpenAssistanceService] = useState(false);
  const [openPromoterManagement, setOpenPromoterManagement] = useState(false);
  const [openPromoterReceipts, setOpenPromoterReceipts] = useState(false);
  const [openPromoterReports, setOpenPromoterReports] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Admin",
    email: "admin@example.com",
    phone: "123-456-7890",
    profilePicture: null,
  });
  const [activePath, setActivePath] = useState('');
  const location = useLocation();
  
  const navigate = useNavigate();
  const adminName = "Admin";
  
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/admin'); 
    }
    setActivePath(location.pathname);
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleNavClick = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

const closeAllDropdowns = () => {
  setOpenUserManagement(false);
  setOpenAssistanceService(false);
  setOpenPromoterManagement(false);
  setOpenPromoterReceipts(false);
  setOpenPromoterReports(false);
};

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleUserManagement = () => {
      closeAllDropdowns();
    setOpenUserManagement(!openUserManagement);
  };

  const toggleAssistanceService = () => {
      closeAllDropdowns();
    setOpenAssistanceService(!openAssistanceService);
  };

  const togglePromoterManagement = () => {
      closeAllDropdowns();
    setOpenPromoterManagement(!openPromoterManagement);
  };
  const toggleReceiptsManagement = () => {
      closeAllDropdowns();
    setOpenPromoterReceipts(!openPromoterReceipts);
  };
  const toggleReportManagement = () => {
      closeAllDropdowns();
    setOpenPromoterReports(!openPromoterReports);
  };
  
  const navigateUserTable = () => {
    handleNavClick('/admin/user-table');
  };
  const handleDashboard=()=>{
      closeAllDropdowns();
    handleNavClick('/admin/dashboard');
  }
  const navigateUserUpgrade=()=>{
    handleNavClick('/admin/userData');
  }
  
  const navigateRenewals=()=>{
    handleNavClick('/admin/renewals');
  }
  const navigateresetpass=()=>{
    handleNavClick('/admin/resetpass');
  }
  const navigateImageVerify=()=>{
    handleNavClick('/admin/imageverify');
  }
  const navigatePendingdata=()=>{
    handleNavClick('/admin/pendingdata');
  }
  const navigateSuccessdata=()=>{
    handleNavClick('/admin/successdata');
  }
  const navigatePromoterdata=()=>{
    handleNavClick('/admin/promotersdata');
  }
  const navigatePaytopromoters=()=>{
    handleNavClick('/admin/paytopromoters');
  }
  const navigatePromotersEarn=()=>{
    handleNavClick('/admin/promoterearn');
  }
  const navigatePromotersData=()=>{
    handleNavClick('/admin/promoters');
  }
  const navigatePromotersUsers=()=>{
    handleNavClick('/admin/promotersusers');
  }
  const navigateOnlineTransaction=()=>{
    handleNavClick('/admin/onlinetransaction');
  }
  const navigateAssistanceData=()=>{
    handleNavClick('/admin/assistance');
  }
  const navigateReceiptsvocher=()=>{
    handleNavClick('/admin/receiptsvocher');
  }

  const navigateUserReports=()=>{
    handleNavClick('/admin/userreports');
  }
  const navigateRenewalReports=()=>{
    handleNavClick('/admin/renewalreports');
  }
  const navigateReceiptsReportsdata=()=>{
    handleNavClick('/admin/receiptsreports');
  }
  const navigateNotification=()=>{
      closeAllDropdowns();
    handleNavClick('/admin/notification');
  }
  
  // Check if a path is active
  const isActive = (path) => {
    return activePath === path;
  };

  // Profile dialog handlers
  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
    setIsSidebarOpen(false);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
const handleLogoutDialogOpen = () => {
  setLogoutDialogOpen(true);
  handleMenuClose(); 
};

const handleLogoutDialogClose = () => {
  setLogoutDialogOpen(false);
};

const handleConfirmLogout = () => {
  localStorage.removeItem('token');
  navigate('/home');
  setLogoutDialogOpen(false);
};
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: URL.createObjectURL(file),
    }));
  };

  return (
    <div>
    <div className={`Dash-app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Navbar */}
      <nav className="Dashnavbar">
        <div className="Dashmenu">
          <IconButton onClick={toggleSidebar}>
            <FaBars style={{ color: '#fff', fontSize: '1.8rem' }} />
          </IconButton>
          {isLargeScreen && (
            <Link to="/" style={{ textDecoration: "none", color: "inherit", display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <img src="/ShreeLogo.png" alt="Shreeganda Matrimony" style={{ height: "54px", width: "auto", borderRadius: '8px', objectFit: 'contain', display: 'block' }} />
            </Link>
          )}
        </div>
        <div className="nav-right">
        <Badge color="error" variant="dot">
        <IoMdNotifications fontSize={40} cursor={'pointer'}/>
        </Badge>
         
        <IconButton onClick={handleMenuOpen}>
            <Avatar alt="Admin Profile" src="/path-to-profile-pic.jpg" style={{background:'black'}}/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem 
              onClick={handleLogoutDialogOpen}
            >
              Logout
            </MenuItem>
          </Menu>
          <Typography style={{ color: '#fff', marginRight: '10px',fontSize:'22px',fontWeight:'bold',fontFamily:'Outfit sans-serif' }}>
            {adminName}
          </Typography>
         
        </div>
      </nav>
    </div>
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{
          overflowY: 'auto',
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          '&::-webkit-scrollbar': {
            display: 'none', 
          }
        }}>
          {!isLargeScreen && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px 15px 10px 15px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <Link to="/" style={{ textDecoration: "none", display: 'inline-flex', alignItems: 'center' }}>
                <img src="/ShreeLogo.png" alt="Shreeganda Matrimony" style={{ height: "48px", width: "auto", borderRadius: '8px', objectFit: 'contain' }} />
              </Link>
            </div>
          )}
          {/* Sidebar Header */}
          <div className="sidebar-header" style={{ padding: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar 
                alt="Admin" 
                src={userProfile.profilePicture || "/path-to-profile-pic.jpg"} 
                style={{ border: '2px solid rgba(255,255,255,0.5)', width: 40, height: 40 }}
              />
              <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{adminName}</Typography>
            </div>
            {/* Removed the redundant toggle button here */}
          </div>

          <List sx={{ width: '100%', padding: 0 }}>
          <ListItem
            onClick={handleProfileDialogOpen}
            sx={{ 
              cursor: 'pointer',
              padding: '8px 20px',
              color: '#5d2a18',
              backgroundColor: isActive('/admin/profile') ? '#e6d5b8' : 'transparent',
              '&:hover': {
                backgroundColor: '#f0e2cc',
                color: '#7c2d12'
              }
            }}
          >
            <CgProfile style={{ marginRight: '12px', fontSize: '18px', color: '#7c2d12' }} /> 
            <Typography style={{ fontSize: '0.95rem', fontWeight: isActive('/admin/profile') ? 'bold' : 'normal' }}>Profile</Typography>
          </ListItem>
          <div className="sidebar-divider" />

            <ListItem 
              onClick={handleDashboard} 
              sx={{ 
                cursor: 'pointer',
                padding: '8px 20px',
                color: '#5d2a18',
                backgroundColor: isActive('/admin/dashboard') ? '#e6d5b8' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f0e2cc',
                  color: '#7c2d12'
                }
              }}
            >
              <FaDashcube style={{ marginRight: '12px', fontSize: '18px', color: '#7c2d12' }} /> 
              <Typography style={{ fontSize: '0.95rem', fontWeight: isActive('/admin/dashboard') ? 'bold' : 'normal' }}>Dashboard</Typography>
            </ListItem>
            <div className="sidebar-divider" />

            {/* User Management Dropdown */}
           <ListItem 
              button 
              onClick={toggleUserManagement}
              sx={{ 
                cursor: 'pointer',
                padding: '8px 20px',
                color: '#5d2a18',
                backgroundColor: openUserManagement ? '#e6d5b8' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f0e2cc',
                  color: '#7c2d12'
                },
              }}
            >
              <FaUser style={{ marginRight: '12px', fontSize: '18px', color: '#7c2d12' }} />
              <ListItemText primary="User Management" primaryTypographyProps={{ style: { fontSize: '0.95rem', fontWeight: openUserManagement ? 'bold' : 'normal' } }} />
              {openUserManagement ? <FaChevronUp style={{ color: '#7c2d12', fontSize: '14px' }} /> : <FaChevronDown style={{ color: '#7c2d12', fontSize: '14px' }} />}
            </ListItem>
            <Collapse in={openUserManagement} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%', backgroundColor: 'rgba(124, 45, 18, 0.05)' }}>
                <ListItem 
                  button 
                  onClick={navigateUserTable}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/user-table') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="User Table" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
          
                <ListItem 
                  button 
                  onClick={navigateUserUpgrade}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/userData') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="User Upgrade" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
      
                <ListItem 
                  button 
                  onClick={navigateRenewals}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/renewals') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Renewal" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>             
    
                <ListItem 
                  button 
                  onClick={navigateresetpass}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/resetpass') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Password" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
          
                <ListItem 
                  button 
                  onClick={navigateImageVerify}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/imageverify') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Image Verification" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
              </List>
            </Collapse>
            <div className="sidebar-divider" />

            {/* Assistance Service Dropdown */}
            <ListItem 
              button 
              onClick={toggleAssistanceService}
              sx={{ 
                cursor: 'pointer',
                padding: '8px 20px',
                color: '#5d2a18',
                backgroundColor: openAssistanceService ? '#e6d5b8' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f0e2cc',
                  color: '#7c2d12'
                }
              }}
            >
              <FaServer style={{ marginRight: '12px', fontSize: '18px', color: '#7c2d12' }} />
              <ListItemText primary="Assistance Service" primaryTypographyProps={{ style: { fontSize: '0.95rem', fontWeight: openAssistanceService ? 'bold' : 'normal' } }} />
              {openAssistanceService ? <FaChevronUp style={{ color: '#7c2d12', fontSize: '14px' }} /> : <FaChevronDown style={{ color: '#7c2d12', fontSize: '14px' }} />}
           </ListItem>
            <Collapse in={openAssistanceService} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%', backgroundColor: 'rgba(124, 45, 18, 0.05)' }}>
                <ListItem 
                  button 
                  onClick={navigatePendingdata}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/pendingdata') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Pending" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
          
                <ListItem 
                  button 
                  onClick={navigateSuccessdata}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/successdata') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Success" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
           
                <ListItem 
                  button 
                  onClick={navigatePromoterdata}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/promotersdata') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Promoter User" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
              </List>
            </Collapse>
            <div className="sidebar-divider" />

            {/* Promoter Management Dropdown */}
            <ListItem 
              button 
              onClick={togglePromoterManagement}
              sx={{ 
                cursor: 'pointer',
                padding: '8px 20px',
                color: '#5d2a18',
                backgroundColor: openPromoterManagement ? '#e6d5b8' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f0e2cc',
                  color: '#7c2d12'
                }
              }}
            >
              <FaUsers style={{ marginRight: '12px', fontSize: '18px', color: '#7c2d12' }} />
              <ListItemText primary="Promoter Management" primaryTypographyProps={{ style: { fontSize: '0.95rem', fontWeight: openPromoterManagement ? 'bold' : 'normal' } }} />
              {openPromoterManagement ? <FaChevronUp style={{ color: '#7c2d12', fontSize: '14px' }} /> : <FaChevronDown style={{ color: '#7c2d12', fontSize: '14px' }} />}
            </ListItem>
            <Collapse in={openPromoterManagement} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%', backgroundColor: 'rgba(124, 45, 18, 0.05)' }}>
                <ListItem 
                  button 
                  onClick={navigatePromotersData}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/promoters') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Promoters" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
             
                <ListItem 
                  button 
                  onClick={navigatePromotersUsers}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/promotersusers') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Promoter Users" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
              
                <ListItem 
                  button 
                  onClick={navigatePromotersEarn}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/promoterearn') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Promoter Earnings" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
      
                <ListItem 
                  button 
                  onClick={navigatePaytopromoters}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/paytopromoters') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Pay to Promoters" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
              </List>
            </Collapse>
            <div className="sidebar-divider" />
           
             {/* Promoter Receipts Dropdown */}
            <ListItem 
              button 
              onClick={toggleReceiptsManagement}
              sx={{ 
                cursor: 'pointer',
                padding: '8px 20px',
                color: '#5d2a18',
                backgroundColor: openPromoterReceipts ? '#e6d5b8' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f0e2cc',
                  color: '#7c2d12'
                }
              }}
            >
              <FaReceipt style={{ marginRight: '12px', fontSize: '18px', color: '#7c2d12' }} />
              <ListItemText primary="Receipts" primaryTypographyProps={{ style: { fontSize: '0.95rem', fontWeight: openPromoterReceipts ? 'bold' : 'normal' } }} />
              {openPromoterReceipts ? <FaChevronUp style={{ color: '#7c2d12', fontSize: '14px' }} /> : <FaChevronDown style={{ color: '#7c2d12', fontSize: '14px' }} />}
            </ListItem>
            <Collapse in={openPromoterReceipts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%', backgroundColor: 'rgba(124, 45, 18, 0.05)' }}>
                <ListItem 
                  button 
                  onClick={navigateOnlineTransaction}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/onlinetransaction') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Online Transaction" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
        
                <ListItem 
                  button 
                  onClick={navigateAssistanceData}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/assistance') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Assistance Online Transaction" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
               
                <ListItem 
                  button 
                  onClick={navigateReceiptsvocher}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/receiptsvocher') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Receipt Voucher" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
              </List>
            </Collapse>
            <div className="sidebar-divider" />

               {/* Reports Dropdown */}
             <ListItem 
               button 
               onClick={toggleReportManagement}
               sx={{ 
                 cursor: 'pointer',
                 padding: '8px 20px',
                 color: '#5d2a18',
                 backgroundColor: openPromoterReports ? '#e6d5b8' : 'transparent',
                 '&:hover': {
                   backgroundColor: '#f0e2cc',
                   color: '#7c2d12'
                 }
               }}
             >
               <TbMessageReportFilled style={{ marginRight: '12px', fontSize: '18px', color: '#7c2d12' }} /> 
              <ListItemText primary="Reports" primaryTypographyProps={{ style: { fontSize: '0.95rem', fontWeight: openPromoterReports ? 'bold' : 'normal' } }} />
              {openPromoterReports ? <FaChevronUp style={{ color: '#7c2d12', fontSize: '14px' }} /> : <FaChevronDown style={{ color: '#7c2d12', fontSize: '14px' }} />}
            </ListItem>
            <Collapse in={openPromoterReports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%', backgroundColor: 'rgba(124, 45, 18, 0.05)' }}>
                <ListItem 
                  button 
                  onClick={navigateUserReports}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/userreports') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Users" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
               
                <ListItem 
                  button 
                  onClick={navigateRenewalReports}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/renewalreports') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Renewals" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
              
                <ListItem 
                  button 
                  onClick={navigateReceiptsReportsdata}
                  sx={{
                    padding: '5px 20px 5px 50px',
                    color: isActive('/admin/receiptsreports') ? '#7c2d12' : '#5d2a18',
                    '&:hover': { color: '#7c2d12', backgroundColor: '#f0e2cc' }
                  }}
                >
                  <ListItemText primary="Receipts" primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} />
                </ListItem>
              </List>
            </Collapse>
            <div className="sidebar-divider" />

            {/* notification */}
            <ListItem 
              button 
              onClick={navigateNotification}
              sx={{ 
                cursor: 'pointer',
                padding: '8px 20px',
                color: '#5d2a18',
                backgroundColor: isActive('/admin/notification') ? '#e6d5b8' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f0e2cc',
                  color: '#7c2d12'
                }
              }}
            >
              <IoIosNotifications style={{ marginRight: '12px', fontSize: '18px', color: '#7c2d12' }} />
              <ListItemText primary="Notifications" primaryTypographyProps={{ style: { fontSize: '0.95rem', fontWeight: isActive('/admin/notification') ? 'bold' : 'normal' } }} />
            </ListItem>
          </List>
        </aside>

        {/* Logout Confirmation Dialog */}
<Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
  <DialogTitle>Confirm Logout</DialogTitle>
  <DialogContent>
    <Typography>
    Are you sure you want to logout from your account?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button 
      onClick={handleLogoutDialogClose} 
      color="primary"
    >
      Cancel
    </Button>
    <Button 
      onClick={handleConfirmLogout} 
      color="error" 
      variant="contained"
    >
      Logout
    </Button>
  </DialogActions>
</Dialog>

         {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onClose={handleProfileDialogClose}>
      <DialogTitle color='black' fontWeight={700} display={'flex'} 
      justifyContent={'center'} mt={1} fontSize={24}>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={userProfile.name}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userProfile.email}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={userProfile.phone}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          style={{
            marginTop: "10px",
            textTransform: "capitalize",
            background: "#34495e",
          }}

        >
          Upload Profile Picture
          <input
            type="file"
            hidden
            onChange={handleImageUpload}
          />
        </Button>

        {userProfile.profilePicture && (
          <img
            src={userProfile.profilePicture}
            alt="Profile Preview"
            style={{ marginTop: "10px", width: "100%", borderRadius: "10px" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleProfileDialogClose}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleProfileDialogClose} 
          color="success"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>

        {/* Main Content */}
        <div
          className="main-content"
          style={{
            paddingLeft: isSidebarOpen ? '280px' : '0px',
            paddingTop: isSidebarOpen ? '10px' : '10px',
            transition: 'padding-left 0.3s ease',
          }}
        >
          <Suspense fallback={
            <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <PremiumLoader />
            </Box>
          }>
            <Outlet />
          </Suspense>
        </div>
      </div>
    
  );
}

export default AdminDashboard;