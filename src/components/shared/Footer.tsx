import Brand from "@/assets/hero_section/Brand.png";
import { Facebook, Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center mb-6">
          {/* Brand Logo & Name */}
          <h1 className="text-3xl font-bold flex items-center text-primary">
            <Image src={Brand} alt="Savorly Logo" width={40} height={40} />
            <span>avorly</span>
          </h1>

          <p className="text-gray-600 mt-3 max-w-md">
            Bringing you the freshest flavors, crafted with love. From our
            kitchen to your table—every meal, a moment to savor.
          </p>
        </div>

        <hr className="border-primary my-6 w-3/4 mx-auto" />

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-gray-600 hover:text-red-500 transition-colors"
              aria-label="Follow us on social media"
            >
              <Icon className="w-6 h-6" />
            </Link>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-4">
          &copy; {new Date().getFullYear()} Savorly. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
