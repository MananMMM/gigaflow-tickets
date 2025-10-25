import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Music, Film, Theater, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/data/mockData";

const Index = () => {
  const featuredEvents = mockEvents.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Gateway to Amazing Experiences</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Discover & Book
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Unforgettable Events
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From electrifying concerts to captivating theater performances and blockbuster cinema experiences. 
              Your next adventure awaits.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/events">
                <Button size="lg" className="bg-gradient-accent hover:opacity-90 transition-opacity">
                  <Calendar className="mr-2 h-5 w-5" />
                  Browse Events
                </Button>
              </Link>
              <Link to="/events?category=concert">
                <Button size="lg" variant="outline">
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/events?category=concert">
            <div className="group p-8 rounded-2xl bg-gradient-card border border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <Music className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Concerts</h3>
              <p className="text-muted-foreground">Live music experiences from top artists</p>
            </div>
          </Link>
          
          <Link to="/events?category=cinema">
            <div className="group p-8 rounded-2xl bg-gradient-card border border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <Film className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">Cinema</h3>
              <p className="text-muted-foreground">Latest blockbusters on the big screen</p>
            </div>
          </Link>
          
          <Link to="/events?category=theater">
            <div className="group p-8 rounded-2xl bg-gradient-card border border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <Theater className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Theater</h3>
              <p className="text-muted-foreground">Captivating stage performances</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
            <p className="text-muted-foreground">Don't miss out on these amazing experiences</p>
          </div>
          <Link to="/events">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
