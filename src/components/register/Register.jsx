import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Avatar,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CloseIcon from "@mui/icons-material/Close";
import rawJsonData from "../Userprofile/profile/eduction/jsondata/data.json";
import Navbar from "../navbar/Navbar";
import "./Register.scss";
import PaymentSuccessScanner from "../common/PaymentSuccessScanner";
import ScannerImg from "../../assets/Scanner.jpeg";

import { toast } from "react-toastify";
import { useSignupMutation } from "../api/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LoadingComponent } from "../../App";
import CustomAutocomplete from "../Autocomplete/CustomAutocomplete";
import TokenService from "../token/tokenService";
import { post } from "../api/authHooks";

const datas = rawJsonData.reduce((acc, curr) => ({ ...acc, ...curr }), {});

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mutate, isPending } = useSignupMutation();
  const searchParams = new URLSearchParams(location.search);
  const planType = searchParams.get("type");

  const [showScanner, setShowScanner] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [signupResponse, setSignupResponse] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const [citySuggestions, setCitySuggestions] = useState(datas.cities || []);
  const [talukSuggestions, setTalukSuggestions] = useState([]);

  const getUserRole = () => {
    switch (planType) {
      case "PremiumUser":
        return "PremiumUser";
      case "SilverUser":
        return "SilverUser";
      default:
        return "FreeUser";
    }
  };

  const initialFormState = {
    user_role: getUserRole(),
    marital_status: "",
    profilefor: "",
    gender: "",
    date_of_birth: "",
    age: "",
    educational_qualification: "",
    occupation: "",
    income_per_month: "",
    country: "",
    mother_tongue: "",
    name_of_parent: "",
    parent_name: "",
    religion: "Hindu",
    caste: "",
    address: "",
    occupation_country: "",
    state: "",
    city: "",
    first_name: "",
    last_name: "",
    username: "",
    mobile_no: "",
    password: "",
    confirmPassword: "",
    refered_by: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [promoterName, setPromoterName] = useState("");
  const [promoterError, setPromoterError] = useState("");
  const [isValidatingPromoter, setIsValidatingPromoter] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, user_role: getUserRole() }));
  }, [planType]);

  useEffect(() => {
    if (formData.state) {
      const filteredCities =
        datas.cities?.filter((city) =>
          city.toLowerCase().includes(formData.state.toLowerCase())
        ) || [];
      setCitySuggestions(filteredCities);
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = datas.districts?.find(
        (d) => d.name.toLowerCase() === formData.district.toLowerCase()
      );
      setTalukSuggestions(selectedDistrict?.taluks || []);
    }
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "refered_by") {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
      return;
    }
    if (name === "mobile_no") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    if (name === "age") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    if (name === "date_of_birth") {
      const age = calculateAge(value);
      setFormData((prev) => ({ ...prev, [name]: value, age: age.toString() }));
    } else if (name === "district") {
      const selectedDistrict = datas.districts?.find(
        (d) => d.name.toLowerCase() === value.toLowerCase()
      );
      setTalukSuggestions(selectedDistrict?.taluks || []);
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleVerifyPromoter = async () => {
    const code = formData.refered_by?.trim().toUpperCase();
    if (code !== formData.refered_by) {
      setFormData((prev) => ({ ...prev, refered_by: code || "" }));
    }
    if (!code) {
      setPromoterError("Please enter a Sponsor Code first");
      setPromoterName("");
      return;
    }
    setIsValidatingPromoter(true);
    setPromoterError("");
    setPromoterName("");
    setFormData((prev) => ({ ...prev, refered_name: "" }));
    try {
      const response = await post("/api/promoter/promocheck", { promocode: code });
      if (response?.success && response?.data?.promoterName) {
        setPromoterName(response.data.promoterName);
        setFormData((prev) => ({ ...prev, refered_name: response.data.promoterName }));
        toast.success(`Sponsor verified: ${response.data.promoterName}`);
      } else {
        setPromoterError(response?.message || "Invalid Sponsor Code");
        toast.error(response?.message || "Invalid Sponsor Code");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Invalid Sponsor Code or inactive promoter";
      setPromoterError(msg);
      toast.error(msg);
    } finally {
      setIsValidatingPromoter(false);
    }
  };

  const handleClear = () => {
    setFormData(initialFormState);
    setPromoterName("");
    setPromoterError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(formData.mobile_no)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      mutate(formData, {
        onSuccess: (response) => {
          if (response.success) {
            setSignupResponse(response);
            if (formData.user_role === "PremiumUser" || formData.user_role === "SilverUser") {
              setShowScanner(true);
            } else {
              setShowSuccessDialog(true);
            }
          } else {
            console.error(response.message);
            toast.error(response.message);
          }
        },
        onError: (error) => {
          console.error("Signup error:", error);
          toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        }
      });
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleScannerSubmit = () => {
    setShowScanner(false);
    setShowSuccessDialog(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    navigate("/home");
  };

  const isValidAge = (value) => {
    if (value === "") return true;
    return /^\d+$/.test(value);
  };

  return (
    <>
      <Navbar />
      {isPending && <LoadingComponent />}
      <div className="register-page-container" style={{ backgroundImage: `url('/hero-background.jpg')` }}>
        <div className="branding-section">
          <h1>Shreeganda <span>MATRIMONY</span></h1>
          <p className="tagline">Uniting Hearts, Creating Bonds</p>
        </div>

        <div className="register-form-wrapper">
          <div className="form-header">
            <h2>Create Your Profile</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* LEFT COLUMN - Personal, Social & Career */}
              <div className="form-column">
                <div className="form-row">
                  <div className="label-col">Profile For:</div>
                  <div className="input-col">
                    <Select fullWidth name="profilefor" value={formData.profilefor} onChange={handleChange} className="mui-input-custom" displayEmpty>
                      <MenuItem value="" disabled>Profile Created by:</MenuItem>
                      <MenuItem value="Self">Self</MenuItem>
                      <MenuItem value="Son">Son</MenuItem>
                      <MenuItem value="Daughter">Daughter</MenuItem>
                      <MenuItem value="Brother">Brother</MenuItem>
                      <MenuItem value="Sister">Sister</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Gender:</div>
                  <div className="input-col">
                    <Select fullWidth name="gender" value={formData.gender} onChange={handleChange} className="mui-input-custom" displayEmpty>
                      <MenuItem value="" disabled>Select Gender</MenuItem>
                      <MenuItem value="BrideGroom">Male</MenuItem>
                      <MenuItem value="Bride">Female</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Marital Status:</div>
                  <div className="input-col">
                    <Select fullWidth name="marital_status" value={formData.marital_status} onChange={handleChange} className="mui-input-custom" displayEmpty>
                      <MenuItem value="" disabled>Marital Status</MenuItem>
                      {datas.marritalStatus?.map((item, idx) => (
                        <MenuItem key={idx} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Religion:</div>
                  <div className="input-col">
                    <Select fullWidth name="religion" value={formData.religion} onChange={handleChange} className="mui-input-custom">
                      <MenuItem value="Hindu">Hindu</MenuItem>
                      <MenuItem value="Muslim">Muslim</MenuItem>
                      <MenuItem value="Christian">Christian</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Caste:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={datas.casteValues ?? []} label="Caste" name="caste" value={formData.caste} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Date of Birth:</div>
                  <div className="input-col">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={formData.date_of_birth ? dayjs(formData.date_of_birth) : null}
                        onChange={(newValue) => {
                          const dob = newValue ? newValue.toISOString().split("T")[0] : "";
                          const age = dob ? calculateAge(dob) : "";
                          setFormData((prev) => ({ ...prev, date_of_birth: dob, age: age.toString() }));
                        }}
                        maxDate={dayjs()}
                        slotProps={{ textField: { fullWidth: true, required: true, className: "mui-input-custom" } }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Age:</div>
                  <div className="input-col">
                    <TextField fullWidth name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="mui-input-custom" InputLabelProps={{ shrink: !!formData.age }} error={!isValidAge(formData.age)} helperText={!isValidAge(formData.age) ? "Please enter a valid number" : ""} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Education:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={datas.qualificationValues ?? []} label="Educational Qualification" name="educational_qualification" value={formData.educational_qualification} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Occupation:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={datas.occupationValues ?? []} label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Income/Annum:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={datas.incomeValues ?? []} label="Income Per Annum" name="income_per_month" value={formData.income_per_month} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Country:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={datas.countries ?? []} label="Country" name="country" value={formData.country} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Mother Tongue:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={datas.languageValues ?? []} label="Mother Tongue" name="mother_tongue" value={formData.mother_tongue} onChange={handleChange} />
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN - Family, Address & Login Details */}
              <div className="form-column">
                <div className="form-row">
                  <div className="label-col">Select Parents:</div>
                  <div className="input-col">
                    <Select fullWidth name="name_of_parent" value={formData.name_of_parent} onChange={handleChange} className="mui-input-custom" displayEmpty>
                      <MenuItem value="" disabled>Select Parents</MenuItem>
                      <MenuItem value="Father">Father</MenuItem>
                      <MenuItem value="Mother">Mother</MenuItem>
                      <MenuItem value="Guardian">Guardian</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Parent Name:</div>
                  <div className="input-col">
                    <TextField fullWidth name="parent_name" value={formData.parent_name} onChange={handleChange} placeholder="Parent / Guardian Name" className="mui-input-custom" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Address:</div>
                  <div className="input-col">
                    <TextField fullWidth name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="mui-input-custom" multiline rows={2} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Occ. Country:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={datas.countries ?? []} label="Occupation Country" name="occupation_country" value={formData.occupation_country} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">State:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={datas.states || []} label="Select State" name="state" value={formData.state} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">City:</div>
                  <div className="input-col">
                    <CustomAutocomplete options={citySuggestions} label="Select City" name="city" value={formData.city} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">First Name:</div>
                  <div className="input-col">
                    <TextField fullWidth name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" className="mui-input-custom" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Last Name:</div>
                  <div className="input-col">
                    <TextField fullWidth name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" className="mui-input-custom" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Mobile:</div>
                  <div className="input-col">
                    <TextField
                      fullWidth name="mobile_no" value={formData.mobile_no} onChange={handleChange}
                      placeholder="Mobile Number" className="mui-input-custom" required
                      inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
                      error={formData.mobile_no && !/^[0-9]{10}$/.test(formData.mobile_no)}
                      helperText={formData.mobile_no && !/^[0-9]{10}$/.test(formData.mobile_no) ? "Please enter a valid 10-digit mobile number" : ""}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Email:</div>
                  <div className="input-col">
                    <TextField fullWidth type="email" name="username" value={formData.username} onChange={handleChange} placeholder="Email ID" className="mui-input-custom" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Password:</div>
                  <div className="input-col">
                    <TextField fullWidth type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="mui-input-custom" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-col">Confirm Pwd:</div>
                  <div className="input-col">
                    <TextField fullWidth type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="mui-input-custom" />
                  </div>
                </div>

              </div>
            </div>

            {/* Dedicated 2-Column Row for Sponsor Code and Sponsor Name */}
            <div className="form-grid" style={{ marginTop: "12px", marginBottom: "8px" }}>
              <div className="form-column">
                <div className="form-row">
                  <div className="label-col">Sponsor Code:</div>
                  <div className="input-col">
                    <Box display="flex" gap={1}>
                      <TextField
                        fullWidth
                        name="refered_by"
                        value={formData.refered_by || ""}
                        onChange={handleChange}
                        placeholder="Promoter ID / Sponsor Code"
                        className="mui-input-custom"
                        inputProps={{ maxLength: 8 }}
                      />
                      <Button
                        type="button"
                        variant="contained"
                        onClick={handleVerifyPromoter}
                        disabled={isValidatingPromoter || !formData.refered_by}
                        sx={{
                          bgcolor: "#D4AF37",
                          color: "#111",
                          fontWeight: 700,
                          "&:hover": { bgcolor: "#b89728" },
                          textTransform: "none",
                          minWidth: "85px",
                          borderRadius: "6px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                        }}
                      >
                        {isValidatingPromoter ? "..." : "Verify"}
                      </Button>
                    </Box>
                    {promoterError && (
                      <Typography variant="caption" sx={{ color: "#ffcdd2", fontWeight: 600, display: "block", mt: 0.5 }}>
                        ✖ {promoterError}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-column">
                <div className="form-row">
                  <div className="label-col">Sponsor Name:</div>
                  <div className="input-col">
                    <TextField
                      fullWidth
                      name="refered_name"
                      value={promoterName || ""}
                      placeholder="Sponsor Name (Auto-filled on verify)"
                      className="mui-input-custom"
                      InputProps={{
                        readOnly: true,
                        startAdornment: promoterName ? (
                          <span style={{ color: "#22c55e", fontWeight: "bold", marginRight: "8px" }}>✔</span>
                        ) : null
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: promoterName ? "#f0fdf4 !important" : "#ffffff !important",
                          "& input": {
                            color: promoterName ? "#166534 !important" : "#555 !important",
                            fontWeight: promoterName ? 600 : 400
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="checkbox-row" style={{ marginTop: "12px", marginBottom: "16px" }}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the Terms &amp; Conditions</label>
            </div>

            <input type="hidden" name="user_role" value={formData.user_role} />

            <div className="submit-btn-row">
              <button type="button" className="register-btn clear-btn" onClick={handleClear}>
                Clear
              </button>
              <button type="submit" className="register-btn" disabled={isPending}>
                Register Now
              </button>
            </div>

            <Box sx={{ textAlign: "center", mt: 3, pt: 2, borderTop: "1px dashed #e5e7eb" }}>
              <Typography variant="body2" sx={{ color: "#eff2f6ff", fontSize: "0.95rem" }}>
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/home", { state: { openDialog: true } })}
                  style={{
                    color: "#51b6f0ff",
                    fontWeight: 700,
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "4px"
                  }}
                >
                  Sign In
                </span>
              </Typography>
            </Box>
          </form>
        </div>
      </div>

      {/* Payment Scanner Dialog */}
      <PaymentSuccessScanner
        open={showScanner}
        onClose={handleScannerSubmit}
        userType={formData.type_of_user || "Premium"}
        buttonText="Submit"
      />

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onClose={handleSuccessClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", color: "#4caf50", fontWeight: "bold", position: "relative" }}>
          Registration Successful!
          <IconButton
            onClick={handleSuccessClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
            Thank you for registering with Shreeganda Matrimony. 
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}>
            Your details have been successfully submitted and our team will review them shortly.
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", mt: 3, color: "text.secondary" }}>
            If you have any queries, please reach us at: <br />
            <a href="mailto:shreegandamatrimonysupport@gmail.com" style={{ color: "#1976d2", textDecoration: "none", fontWeight: 500 }}>shreegandamatrimonysupport@gmail.com</a>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button 
            onClick={handleSuccessClose} 
            variant="contained" 
            sx={{
              bgcolor: '#e11d48',
              color: 'white',
              '&:hover': {
                bgcolor: '#c0392b',
                color: 'white',
              }
            }}
          >
            Continue to Website
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Register;