import React, { useEffect } from "react";
import { FaUsers, FaEnvelope, FaGift, FaCheckCircle } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import "./dashboard.scss";
import { getAllUserCounts } from "../../api/Admin";
import { toast } from "react-toastify";
import { LoadingTextSpinner } from "../../../utils/common";
import profileImg1 from "../../../assets/profile.jpg";
import profileImg2 from "../../../assets/profile.jpg";

const Dashboard = () => {
  const { data: usersObj = {}, isFetching: isLoading, isError, error } = getAllUserCounts();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Error fetching data");
    }
  }, [isError, error]);

  const recentUsers = [
    { name: "Anjali Sharma", religion: "Hindu", age: 25, img: profileImg1 },
    { name: "Rahul Verma", religion: "Hindu", age: 26, img: profileImg2 },
    { name: "Priya Patel", religion: "Jain", age: 24, img: profileImg1 },
    { name: "Akash Kumar", religion: "Hindu", age: 28, img: profileImg2 },
  ];

  const recentPayments = [
    { name: "Anjali Sharma", religion: "Hindu", id: "4jd7j3921", package: "Elite", date: "April, 2024", amount: "7999", img: profileImg1 },
    { name: "Rahul Verma", religion: "Hindu", id: "4jd7j3922", package: "Premium", date: "April, 2024", amount: "4999", img: profileImg2 },
    { name: "Priya Patel", religion: "Jain", id: "4jd7j3923", package: "Premium", date: "April, 2022", amount: "4999", img: profileImg1 },
  ];

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <div className="dashboard-loading-wrapper">
          <LoadingTextSpinner />
        </div>
      ) : (
        <div className="dashboard-content-main">
          {/* Top Cards Row */}
          <div className="top-cards-row">
            <div className="stat-card orange">
              <div className="stat-icon-wrapper">
                <FaUsers />
                <span className="stat-label">Total Users</span>
              </div>
              <div className="stat-value">{usersObj?.totalPaidUsers ? (Number(usersObj?.freeUser || 0) + Number(usersObj?.totalPaidUsers || 0)) : "12,585"}</div>
            </div>
            
            <div className="stat-card green">
              <div className="stat-icon-wrapper">
                <MdCurrencyRupee />
                <span className="stat-label">Payments Received</span>
              </div>
              <div className="stat-value">₹25,25,000</div>
            </div>

            <div className="stat-card purple">
              <div className="stat-icon-wrapper">
                <FaGift />
                <span className="stat-label">Active Packages</span>
              </div>
              <div className="stat-value">780</div>
            </div>

            <div className="stat-card red">
              <div className="stat-icon-wrapper">
                <FaEnvelope />
                <span className="stat-label">Support Tickets</span>
              </div>
              <div className="stat-value">56</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-header">
                <h3>New Registrations</h3>
                <span>Past 7 Days &gt;</span>
              </div>
              <svg className="svg-chart" viewBox="0 0 500 150" preserveAspectRatio="none">
                {/* Y-axis grid lines */}
                <line x1="40" y1="20" x2="500" y2="20" className="grid-line" />
                <line x1="40" y1="50" x2="500" y2="50" className="grid-line" />
                <line x1="40" y1="80" x2="500" y2="80" className="grid-line" />
                <line x1="40" y1="110" x2="500" y2="110" className="grid-line" />
                
                {/* Labels */}
                <text x="20" y="25" className="axis-label" textAnchor="end">500</text>
                <text x="20" y="55" className="axis-label" textAnchor="end">400</text>
                <text x="20" y="85" className="axis-label" textAnchor="end">200</text>
                <text x="20" y="115" className="axis-label" textAnchor="end">100</text>

                {/* X labels */}
                <text x="50" y="140" className="axis-label">Mon</text>
                <text x="120" y="140" className="axis-label">Tue</text>
                <text x="190" y="140" className="axis-label">Wed</text>
                <text x="260" y="140" className="axis-label">Thu</text>
                <text x="330" y="140" className="axis-label">Fri</text>
                <text x="400" y="140" className="axis-label">Sat</text>
                <text x="470" y="140" className="axis-label">Sun</text>

                {/* Blue Chart Area and Line */}
                <polygon points="50,110 50,120 120,70 190,80 260,50 330,60 400,30 470,20 470,120" className="chart-area blue" />
                <polyline points="50,120 120,70 190,80 260,50 330,60 400,30 470,20" className="chart-line blue" />
                
                {/* Points */}
                <circle cx="50" cy="120" r="4" className="chart-point blue" />
                <circle cx="120" cy="70" r="4" className="chart-point blue" />
                <circle cx="190" cy="80" r="4" className="chart-point blue" />
                <circle cx="260" cy="50" r="4" className="chart-point blue" />
                <circle cx="330" cy="60" r="4" className="chart-point blue" />
                <circle cx="400" cy="30" r="4" className="chart-point blue" />
                <circle cx="470" cy="20" r="4" className="chart-point blue" />
              </svg>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Revenue</h3>
                <span>Past 7 Days &gt;</span>
              </div>
              <svg className="svg-chart" viewBox="0 0 500 150" preserveAspectRatio="none">
                {/* Y-axis grid lines */}
                <line x1="50" y1="20" x2="500" y2="20" className="grid-line" />
                <line x1="50" y1="60" x2="500" y2="60" className="grid-line" />
                <line x1="50" y1="100" x2="500" y2="100" className="grid-line" />
                <line x1="50" y1="140" x2="500" y2="140" className="grid-line" />
                
                {/* Labels */}
                <text x="40" y="25" className="axis-label" textAnchor="end">₹3000</text>
                <text x="40" y="65" className="axis-label" textAnchor="end">₹2000</text>
                <text x="40" y="105" className="axis-label" textAnchor="end">₹1000</text>
                <text x="40" y="145" className="axis-label" textAnchor="end">₹0</text>

                {/* X labels */}
                {/* Mon to Sun align with data points */}
                <text x="60" y="160" className="axis-label">Mon</text>
                <text x="130" y="160" className="axis-label">Tue</text>
                <text x="200" y="160" className="axis-label">Wed</text>
                <text x="270" y="160" className="axis-label">Thu</text>
                <text x="340" y="160" className="axis-label">Fri</text>
                <text x="410" y="160" className="axis-label">Sat</text>
                <text x="480" y="160" className="axis-label">Sun</text>

                {/* Green Line */}
                <polygon points="60,110 60,120 130,80 200,90 270,70 340,65 410,40 480,20 480,140" className="chart-area green" />
                <polyline points="60,120 130,80 200,90 270,70 340,65 410,40 480,20" className="chart-line green" />
                
                <circle cx="60" cy="120" r="4" className="chart-point green" />
                <circle cx="130" cy="80" r="4" className="chart-point green" />
                <circle cx="200" cy="90" r="4" className="chart-point green" />
                <circle cx="270" cy="70" r="4" className="chart-point green" />
                <circle cx="340" cy="65" r="4" className="chart-point green" />
                <circle cx="410" cy="40" r="4" className="chart-point green" />
                <circle cx="480" cy="20" r="4" className="chart-point green" />
              </svg>
            </div>
          </div>

          {/* Lists Row */}
          <div className="lists-row">
            <div className="list-card">
              <h3>Recent Users</h3>
              <div className="list-grid">
                {recentUsers.map((user, i) => (
                  <div className="user-item" key={i}>
                    <img src={user.img} alt={user.name} className="user-avatar" />
                    <div className="user-info">
                      <div>
                        <h4>{user.name}</h4>
                        <p>Religion: {user.religion} &nbsp; Age: {user.age}</p>
                        <span className="verified-badge"><FaCheckCircle /> Verified</span>
                      </div>
                      <button className="action-btn">View Profile</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="list-card">
              <h3>Recent Payments</h3>
              <div className="list-column">
                {recentPayments.map((pay, i) => (
                  <div className="payment-item" key={i}>
                    <div className="payment-left">
                      <img src={pay.img} alt={pay.name} className="pay-avatar" />
                      <div className="pay-info">
                        <h4>{pay.name}</h4>
                        <p>Religion: {pay.religion}</p>
                      </div>
                    </div>
                    <div className="payment-middle">
                      <div>Payment ID: <strong>{pay.id}</strong></div>
                      <div>Package: <strong>{pay.package}</strong></div>
                      <div>{pay.date}</div>
                    </div>
                    <div className="payment-right">
                      <div className="amount">₹ {pay.amount}</div>
                      <button className="action-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

