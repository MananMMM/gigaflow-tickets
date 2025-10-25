import { Event } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "concert":
        return "bg-primary/20 text-primary";
      case "cinema":
        return "bg-accent/20 text-accent";
      case "theater":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden bg-secondary">
        <img 
          src={event.image_url} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor(event.category)}`}>
              {event.category.toUpperCase()}
            </span>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.start_time)} at {formatTime(event.start_time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{event.available_seats} seats available</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">${event.price}</span>
            <span className="text-sm text-muted-foreground">per ticket</span>
          </div>
          
          <Link to={`/events/${event.event_id}`}>
            <Button className="bg-gradient-accent hover:opacity-90 transition-opacity">
              <Ticket className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
