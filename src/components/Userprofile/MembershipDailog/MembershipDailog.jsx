import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { membershipOptions } from "../../../assets/memberShipOptions/MemberShipPlans";

const MembershipDialog = ({ open, onClose, onSelectPlan }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    // Map plan names to user roles
    const planRoles = {
      'SILVER MEMBERSHIP': 'SilverUser',
      'PREMIUM MEMBERSHIP': 'PremiumUser'
    };
    
    const planType = planRoles[plan.name] || 'FreeUser';
    
    // Call the onSelectPlan callback to show the payment scanner dialog
    // instead of navigating to a separate page
    if (onSelectPlan) {
      onSelectPlan(plan);
    }
    
    // Close the dialog
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle
        sx={{
          fontSize: isMobile ? "1.25rem" : "1.5rem",
          fontWeight: 700,
          textAlign: "center",
          p: isMobile ? 2 : 3,
        }}
      >
        Membership Plans
        <IconButton
          sx={{
            position: "absolute",
            right: isMobile ? 8 : 15,
            top: isMobile ? 8 : 15,
          }}
          onClick={onClose}
        >
          <AiOutlineClose />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          p: isMobile ? 1 : 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 2,
          }}
        >
          {membershipOptions.map((plan, index) => (
            <Box key={index}>
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 4,
                  border: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8,
                  },
                  background: plan.gradient,
                  color: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: isMobile ? 55 : 16,
                      right: 16,
                      bgcolor: "rgba(255,255,255,0.2)",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {plan.discount}
                  </Box>

                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "white",
                    }}
                  >
                    {plan.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{
                        fontWeight: 800,
                        mr: 1,
                      }}
                    >
                      {plan.discountedPrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        opacity: 0.8,
                      }}
                    >
                      {plan.originalPrice}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)", height:'1px' }} />

                  <List dense>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                        <CheckCircle sx={{ fontSize: 18, mr: 1.5 }} />
                     <Typography variant="body2" sx={{color:'#fff'}}>{feature}</Typography>
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Validity: {plan.duration}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      bgcolor: "white",
                      color: plan.color,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.9)",
                      },
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Get Started
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      textAlign: "center",
                      opacity: 0.8,
                      color:'#fff'
                    }}
                  >
                    Have Promocode? Get ₹100 discount
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
  <Button
    variant="outlined"
    onClick={onClose}
    sx={{
      color: "#333",
      borderColor: "#ccc",
      fontWeight: "bold",
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)", 
        borderColor: "#bbb",
      },
    }}
  >
    Cancel
  </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MembershipDialog;