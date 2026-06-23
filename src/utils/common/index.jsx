import { Box, CircularProgress, Typography, keyframes } from "@mui/material";

export const isSilverOrPremiumUser = (role = " ") => {
  const normalizedRole = role.toLowerCase();
  return normalizedRole === "silveruser" || normalizedRole === "premiumuser";
};

export const LoadingTextSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 1,
        height: "50vh",
      }}
    >
      <CircularProgress size={60} color="#000" />
      <Typography color="#000">Loading...</Typography>
    </Box>
  );
};

const pulse = keyframes`
  0% { transform: scale(0.8); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 20px rgba(212, 175, 55, 0.6); }
  100% { transform: scale(0.8); opacity: 0.8; }
`;

export const PremiumLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '60vh',
        width: '100%',
        background: 'transparent',
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          size={80}
          thickness={2.5}
          sx={{
            color: '#d4af37', // Gold color for premium feel
            animationDuration: '1.5s',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #991b1b, #7c2d12)',
              animation: `${pulse} 2s infinite ease-in-out`,
            }}
          />
        </Box>
      </Box>
      <Typography
        variant="h6"
        sx={{
          mt: 3,
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #991b1b, #d4af37)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px',
          animation: 'fade 1.5s infinite alternate',
          '@keyframes fade': {
            '0%': { opacity: 0.7 },
            '100%': { opacity: 1 }
          }
        }}
      >
        Curating Your Experience...
      </Typography>
    </Box>
  );
};

export const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};
