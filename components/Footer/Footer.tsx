import { CheckSquare } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <a href="/" className="flex items-center gap-2 font-bold text-foreground">
        <CheckSquare className="w-5 h-5 text-accent" />
        Taskflow
      </a>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Taskflow. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
