import { Ticket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Ticket className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium bg-gradient-primary bg-clip-text text-transparent">
              EventHub
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2024 EventHub. Book your next experience.
          </p>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
