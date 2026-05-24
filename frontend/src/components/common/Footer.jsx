import { Link } from "react-router-dom";

import { PiGraduationCapFill } from "react-icons/pi";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      className="
        border-t-2 border-deep-lavender-400
        bg-butter-cream-100
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        <div
          className="
            flex flex-col md:flex-row
            items-center justify-between
            gap-8
          "
        >

          {/* Brand */}
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

            <div>
              <h2 className="text-xl font-bold">
                MOOC Sphere
              </h2>

              <p className="text-sm text-deep-lavender-300">
                Built for modern learning
              </p>
            </div>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-4">

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="
                p-3
                border-2 border-deep-lavender-300
                text-deep-lavender-500
                hover:bg-butter-cream-200
              "
            >
              <FiGithub className="text-xl" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="
                p-3
                border-2 border-deep-lavender-300
                text-deep-lavender-500
                hover:bg-butter-cream-200
              "
            >
              <FiLinkedin className="text-xl" />
            </a>

            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noreferrer"
              className="
                p-3
                border-2 border-deep-lavender-300
                text-deep-lavender-500
                hover:bg-butter-cream-200
              "
            >
              <SiLeetcode className="text-xl" />
            </a>

          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-8 pt-6
            border-t border-deep-lavender-200
            text-center
            text-sm
            text-deep-lavender-300
          "
        >
          © {new Date().getFullYear()} MOOC Sphere. All rights reserved.
        </div>

      </div>
    </footer>
  );
}