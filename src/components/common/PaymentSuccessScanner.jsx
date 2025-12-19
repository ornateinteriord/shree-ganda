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
          color: "#326633",
        }}
      >
        Payment Successful!
      </DialogTitle> */}

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: 500,
              fontSize: { xs: "1rem", sm: "1.125rem" },
            }}
          >
            Congratulations! You have successfully upgraded to {userType}.
          </Typography> */}

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "0.875rem", sm: "1rem" },
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
              maxWidth: "300px",
              height: "auto",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 1,
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Scan this QR code with your mobile device to complete the payment process.
          </Typography>
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
            backgroundColor: "#326633",
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