import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <div className="user-layout">
      <div className="user-navbar">
        <nav>
        </nav>
      </div>
      <div className="user-content">
        <Outlet />
      </div>
      <footer className="user-footer">
      </footer>
    </div>
  );
};

export default VendorLayout;