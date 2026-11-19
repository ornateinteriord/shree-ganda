import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  LockOutlined,
  ArrowBack,
  HowToRegOutlined,
  Handshake,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../api/Auth";
import TokenService from "../../token/tokenService";
import "./PromoterAuth.scss";

const PromoterLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { mutate: login, isPending } = useLoginMutation();

  useEffect(() => {
    // If already logged in as promoter, redirect to dashboard
    const role = TokenService.getRole()?.toString().toLowerCase();
    if (TokenService.getToken() && role === "promoter") {
      navigate("/PromotAdmin", { replace: true });
    }

    const savedUser = localStorage.getItem("shreeganda_promoter_username");
    if (savedUser) {
      setFormData((prev) => ({ ...prev, username: savedUser }));
      setRememberMe(true);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = formData.username.trim();
    const password = formData.password;

    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("shreeganda_promoter_username", username);
    } else {
      localStorage.removeItem("shreeganda_promoter_username");
    }

    login({
      username: username,
      password: password,
    });
  };

  return (
    <div className="promoter-auth-page">
      <Link to="/home" className="auth-back-btn" title="Back to Home">
        <ArrowBack fontSize="small" />
        <span>Back to Home</span>
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-badge">
            <Handshake className="badge-icon" />
            <span>Promoter Portal</span>
          </div>
          <h1 className="auth-title">Shreeganda Matrimony</h1>
          <p className="auth-subtitle">
            Sign in to access your referrals, commissions & performance
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="field-label" htmlFor="promoter-username">
              Username, Email, or Promoter ID
            </label>
            <TextField
              id="promoter-username"
              name="username"
              placeholder="e.g. SG1024 or promoter_user"
              fullWidth
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <label className="field-label" htmlFor="promoter-password">
              Password
            </label>
            <TextField
              id="promoter-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              fullWidth
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      aria-label="toggle password visibility"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="form-options">
            <FormControlLabel
              className="remember-me"
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                />
              }
              label="Remember me"
            />
          </div>

          <Button
            type="submit"
            className="submit-btn"
            disabled={isPending}
            fullWidth
          >
            {isPending ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Signing In...</span>
              </Box>
            ) : (
              <span>Sign In as Promoter</span>
            )}
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have a promoter account?
            <Link to="/promoter/register">Apply Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoterLogin;
