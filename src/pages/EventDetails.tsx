import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, Ticket } from "lucide-react";
import { mockEvents, mockTickets, mockBookings, Booking } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");

  const event = mockEvents.find(e => e.event_id === Number(id));
  const eventTickets = mockTickets.filter(t => t.event_id === Number(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button onClick={() => navigate("/events")}>Back to Events</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
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

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book tickets",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    if (!selectedTicketType) {
      toast({
        title: "Select Ticket Type",
        description: "Please select a ticket type to continue",
        variant: "destructive"
      });
      return;
    }

    if (quantity > event.available_seats) {
      toast({
        title: "Not Enough Seats",
        description: `Only ${event.available_seats} seats available`,
        variant: "destructive"
      });
      return;
    }

    const selectedTicket = eventTickets.find(t => t.type === selectedTicketType);
    if (!selectedTicket) return;

    const newBooking: Booking = {
      booking_id: mockBookings.length + 1,
      user_id: user.id,
      event_id: event.event_id,
      ticket_id: selectedTicket.ticket_id,
      quantity,
      status: "pending",
      booking_date: new Date().toISOString()
    };

    mockBookings.push(newBooking);
    event.available_seats -= quantity;

    toast({
      title: "Booking Successful!",
      description: `Reserved ${quantity} ${selectedTicketType} ticket(s) for ${event.title}`,
    });

    navigate("/dashboard");
  };

  const selectedTicket = eventTickets.find(t => t.type === selectedTicketType);
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video overflow-hidden rounded-2xl bg-secondary">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="inline-block px-4 py-1 rounded-full text-xs font-medium mb-4 bg-primary/20 text-primary">
                {event.category.toUpperCase()}
              </span>
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{formatDate(event.start_time)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {formatTime(event.start_time)} - {formatTime(event.end_time)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {event.available_seats} of {event.total_seats} seats available
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-3">About this event</h3>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gradient-card border-border sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Book Your Tickets</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ticket Type</label>
                  <Select value={selectedTicketType} onValueChange={setSelectedTicketType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTickets.map(ticket => (
                        <SelectItem key={ticket.ticket_id} value={ticket.type}>
                          {ticket.type.toUpperCase()} - ${ticket.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    max={event.available_seats}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Price per ticket</span>
                    <span className="font-medium">${selectedTicket?.price || 0}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">×{quantity}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-accent hover:opacity-90 transition-opacity"
                  size="lg"
                  onClick={handleBooking}
                  disabled={!selectedTicketType || event.available_seats === 0}
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  {event.available_seats === 0 ? "Sold Out" : "Book Now"}
                </Button>

                {!user && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please <span className="text-primary cursor-pointer" onClick={() => navigate("/login")}>login</span> to book tickets
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetails;
