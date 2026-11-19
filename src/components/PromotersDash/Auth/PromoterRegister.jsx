import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  LockOutlined,
  ArrowBack,
  PhoneIphone,
  EmailOutlined,
  BadgeOutlined,
  BusinessOutlined,
  AccountBalanceOutlined,
  CasinoOutlined,
  LoginOutlined,
  Handshake,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { usePromoterRegister } from "../../api/Promoter";
import { extractErrorMessage } from "../../api/Auth";
import "./PromoterAuth.scss";

const PromoterRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    promoter_name: "",
    promoter_id: "",
    mobile: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    company_name: "",
    account_number: "",
    bank_ifsc: "",
    country: "India",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: registerPromoter, isPending } = usePromoterRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    if (name === "promoter_id") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.toUpperCase().replace(/\s/g, ""),
      }));
      return;
    }

    if (name === "bank_ifsc") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.toUpperCase().replace(/\s/g, ""),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePromoterId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generated = `SG${randomNum}`;
    setFormData((prev) => ({ ...prev, promoter_id: generated }));
    toast.info(`Generated Promoter ID: ${generated}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      promoter_name,
      promoter_id,
      mobile,
      email,
      username,
      password,
      confirmPassword,
      company_name,
      account_number,
      bank_ifsc,
      country,
    } = formData;

    if (!promoter_name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!mobile || mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!username.trim() || username.length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      promoter_name: promoter_name.trim(),
      promoter_id: promoter_id.trim() || undefined,
      mobile: mobile.trim(),
      email: email.trim(),
      username: username.trim(),
      password,
      company_name: company_name.trim(),
      account_number: account_number.trim(),
      bank_ifsc: bank_ifsc.trim(),
      country: country.trim() || "India",
    };

    registerPromoter(payload, {
      onSuccess: (res) => {
        if (res?.success) {
          toast.success(
            res?.message ||
              "Registration successful! Your account is pending admin approval."
          );
          setTimeout(() => {
            navigate("/promoter/login");
          }, 1500);
        } else {
          toast.error(res?.message || "Registration failed. Please try again.");
        }
      },
      onError: (err) => {
        const errorMsg = extractErrorMessage(
          err,
          "Registration failed. Please verify details."
        );
        toast.error(errorMsg);
      },
    });
  };

  return (
    <div className="promoter-auth-page">
      <Link to="/home" className="auth-back-btn" title="Back to Home">
        <ArrowBack fontSize="small" />
        <span>Back to Home</span>
      </Link>

      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="brand-badge">
            <Handshake className="badge-icon" />
            <span>Join Our Network</span>
          </div>
          <h1 className="auth-title">Become a Promoter</h1>
          <p className="auth-subtitle">
            Earn rewards and partner commissions with Shreeganda Matrimony
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label className="field-label" htmlFor="promoter_name">
                Full Name *
              </label>
              <TextField
                id="promoter_name"
                name="promoter_name"
                placeholder="e.g. Ramesh Kumar"
                fullWidth
                value={formData.promoter_name}
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
              <label className="field-label" htmlFor="promoter_id">
                <span>Preferred Promoter Code</span>
                <span className="helper-link" onClick={generatePromoterId}>
                  Auto-Generate
                </span>
              </label>
              <TextField
                id="promoter_id"
                name="promoter_id"
                placeholder="e.g. SG1024 (leave blank for auto)"
                fullWidth
                value={formData.promoter_id}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Generate Random Code">
                        <IconButton
                          onClick={generatePromoterId}
                          edge="end"
                          size="small"
                          sx={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          <CasinoOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label className="field-label" htmlFor="mobile">
                Mobile Number *
              </label>
              <TextField
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="10-digit mobile"
                fullWidth
                value={formData.mobile}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphone />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="email">
                Email Address *
              </label>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="you@domain.com"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label className="field-label" htmlFor="username">
                Choose Username *
              </label>
              <TextField
                id="username"
                name="username"
                placeholder="e.g. ramesh_promoter"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LoginOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="company_name">
                Agency / Company Name (Optional)
              </label>
              <TextField
                id="company_name"
                name="company_name"
                placeholder="e.g. Shree Enterprises"
                fullWidth
                value={formData.company_name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label className="field-label" htmlFor="password">
                Password (min 6 characters) *
              </label>
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                fullWidth
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
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="confirmPassword">
                Confirm Password *
              </label>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                fullWidth
                value={formData.confirmPassword}
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
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        size="small"
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label className="field-label" htmlFor="account_number">
                Bank Account Number
              </label>
              <TextField
                id="account_number"
                name="account_number"
                placeholder="For payout deposits"
                fullWidth
                value={formData.account_number}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="bank_ifsc">
                Bank IFSC Code
              </label>
              <TextField
                id="bank_ifsc"
                name="bank_ifsc"
                placeholder="e.g. SBIN0001234"
                fullWidth
                value={formData.bank_ifsc}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="submit-btn"
            disabled={isPending}
            fullWidth
            sx={{ mt: 1 }}
          >
            {isPending ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Registering Account...</span>
              </Box>
            ) : (
              <span>Submit Registration</span>
            )}
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Already have a promoter account?
            <Link to="/promoter/login">Sign In Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoterRegister;
