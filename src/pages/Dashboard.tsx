import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket, CreditCard, XCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockBookings, mockEvents, mockTickets } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const userBookings = mockBookings.filter(b => b.user_id === user.id);

  const handleCancelBooking = (bookingId: number) => {
    const booking = mockBookings.find(b => b.booking_id === bookingId);
    if (booking && booking.status === "pending") {
      booking.status = "cancelled";
      const event = mockEvents.find(e => e.event_id === booking.event_id);
      if (event) {
        event.available_seats += booking.quantity;
      }
      toast({
        title: "Booking Cancelled",
        description: "Your seats have been released",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your event bookings and tickets</p>
        </div>

        {userBookings.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-card border-border">
            <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">Start exploring events and book your first experience</p>
            <Button onClick={() => navigate("/events")} className="bg-gradient-accent hover:opacity-90">
              Browse Events
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {userBookings.map((booking) => {
              const event = mockEvents.find(e => e.event_id === booking.event_id);
              const ticket = mockTickets.find(t => t.ticket_id === booking.ticket_id);
              
              if (!event || !ticket) return null;

              return (
                <Card key={booking.booking_id} className="p-6 bg-gradient-card border-border">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 aspect-video overflow-hidden rounded-lg bg-secondary flex-shrink-0">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(event.start_time)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Ticket className="h-4 w-4" />
                              <span>{booking.quantity}x {ticket.type.toUpperCase()} tickets</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              <span className="font-medium text-foreground">${ticket.price * booking.quantity}</span>
                            </div>
                          </div>
                        </div>

                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.toUpperCase()}
                        </Badge>
                      </div>

                      {booking.status === "pending" && (
                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancelBooking(booking.booking_id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Booking
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
