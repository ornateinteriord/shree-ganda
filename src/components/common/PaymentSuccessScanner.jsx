import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PaymentSuccessScanner = ({ open, onClose, userType }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: { xs: "10px", sm: "20px" },
        },
      }}
    >
      {/* <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          color: "#7c2d12",
        }}
      >
        Payment Successful!
      </DialogTitle> */}

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 3, md: 6 },
            py: 2
          }}
        >
          {/* Left Side: QR Code */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mb: 2,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              Please scan the QR code below for payment confirmation:
            </Typography>

            <Box
              component="img"
              src="/ShreeScanner.jpeg"
              alt="Payment Scanner"
              sx={{
                width: "100%",
                maxWidth: "200px",
                height: "auto",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                mb: 1
              }}
            />

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 1,
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                maxWidth: "250px"
              }}
            >
              Scan this QR code with your mobile device to complete the payment process.
            </Typography>
          </Box>

          {/* Right Side: Email Info */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center",
            flex: 1,
            borderLeft: { xs: "none", md: "1px solid #eee" },
            borderTop: { xs: "1px solid #eee", md: "none" },
            pt: { xs: 3, md: 0 },
            pl: { xs: 0, md: 4 }
          }}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                fontWeight: 500,
                color: "rgba(0, 0, 0, 0.8)",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                mb: 2
              }}
            >
              Please share the payment screenshot to this mail:
            </Typography>
            <a 
              href="mailto:shreegandaenterprises@gmail.com" 
              style={{ 
                color: "#7c2d12", 
                textDecoration: "none", 
                fontWeight: 600,
                fontSize: "1.1rem",
                padding: "10px 15px",
                backgroundColor: "#fff3e0",
                borderRadius: "8px",
                border: "1px dashed #7c2d12"
              }}
            >
              shreegandaenterprises@gmail.com
            </a>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "#7c2d12",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            padding: "8px 24px",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            "&:hover": {
              backgroundColor: "#285228",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSuccessScanner;