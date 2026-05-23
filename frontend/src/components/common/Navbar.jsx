import { useNavigate, Link } from "react-router-dom";

import { PiGraduationCapFill } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { HiOutlineUserAdd } from "react-icons/hi";

import Button from "../ui/Button";

export default function Navbar() {

  const navigate = useNavigate();

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        border-b-2 border-deep-lavender-400
        bg-butter-cream-100
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <Link
            to="/"
            className="
              flex items-center gap-3
              text-deep-lavender-500
            "
          >
            <div
              className="
                p-2
                border-2 border-deep-lavender-400
                bg-butter-cream-200
              "
            >
              <PiGraduationCapFill className="text-2xl" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              MOOC Sphere
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-3">

            <Button
              text="Login"
              icon={<FiLogIn />}
              onClick={() => navigate("/login")}
            />

            <Button
              text="Sign Up"
              icon={<HiOutlineUserAdd />}
              type="primary"
              onClick={() => navigate("/signup")}
            />

          </nav>
        </div>
      </div>
    </header>
  );
}