import concertSymphony from "@/assets/concert-symphony.jpg";
import cinemaInception from "@/assets/cinema-inception.jpg";
import theaterHamlet from "@/assets/theater-hamlet.jpg";
import concertRock from "@/assets/concert-rock.jpg";
import cinemaCosmic from "@/assets/cinema-cosmic.jpg";
import theaterChicago from "@/assets/theater-chicago.jpg";

export interface User {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface Event {
  event_id: number;
  title: string;
  category: 'cinema' | 'theater' | 'concert';
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  price: number;
  total_seats: number;
  available_seats: number;
  image_url: string;
}

export interface Ticket {
  ticket_id: number;
  event_id: number;
  type: 'standard' | 'vip' | 'premium';
  price: number;
}

export interface Booking {
  booking_id: number;
  user_id: number;
  event_id: number;
  ticket_id: number;
  quantity: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  booking_date: string;
}

export interface Payment {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_method: 'credit_card' | 'debit_card' | 'paypal' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paid_at: string | null;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    full_name: "John Doe",
    email: "john@example.com",
    password_hash: "hashed_password_123",
    created_at: "2024-01-01T00:00:00Z"
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    event_id: 1,
    title: "The Dark Symphony",
    category: "concert",
    description: "Experience an unforgettable night of orchestral music featuring classical masterpieces and contemporary compositions.",
    location: "Grand Concert Hall, New York",
    start_time: "2024-12-15T19:00:00Z",
    end_time: "2024-12-15T22:00:00Z",
    price: 75,
    total_seats: 500,
    available_seats: 342,
    image_url: concertSymphony
  },
  {
    event_id: 2,
    title: "Inception Redux",
    category: "cinema",
    description: "Christopher Nolan's masterpiece returns to the big screen in stunning 4K. A mind-bending thriller about dream infiltration.",
    location: "Empire Cinema, Los Angeles",
    start_time: "2024-12-20T20:00:00Z",
    end_time: "2024-12-20T23:00:00Z",
    price: 25,
    total_seats: 300,
    available_seats: 156,
    image_url: cinemaInception
  },
  {
    event_id: 3,
    title: "Hamlet - Modern Interpretation",
    category: "theater",
    description: "Shakespeare's timeless tragedy reimagined in a contemporary setting with a stellar cast.",
    location: "Broadway Theater, New York",
    start_time: "2024-12-18T19:30:00Z",
    end_time: "2024-12-18T22:30:00Z",
    price: 120,
    total_seats: 400,
    available_seats: 87,
    image_url: theaterHamlet
  },
  {
    event_id: 4,
    title: "Rock Legends Live",
    category: "concert",
    description: "A celebration of rock music featuring tribute bands performing hits from Led Zeppelin, Queen, and The Rolling Stones.",
    location: "Madison Square Garden, New York",
    start_time: "2024-12-22T20:00:00Z",
    end_time: "2024-12-22T23:30:00Z",
    price: 95,
    total_seats: 1000,
    available_seats: 523,
    image_url: concertRock
  },
  {
    event_id: 5,
    title: "Cosmic Journey",
    category: "cinema",
    description: "An IMAX 3D experience exploring the wonders of our universe with breathtaking visuals and narration.",
    location: "Science Museum IMAX, London",
    start_time: "2024-12-16T14:00:00Z",
    end_time: "2024-12-16T15:45:00Z",
    price: 30,
    total_seats: 200,
    available_seats: 95,
    image_url: cinemaCosmic
  },
  {
    event_id: 6,
    title: "Chicago - The Musical",
    category: "theater",
    description: "The Tony Award-winning musical about fame, fortune, and murder in 1920s Chicago.",
    location: "West End Theater, London",
    start_time: "2024-12-25T19:00:00Z",
    end_time: "2024-12-25T22:00:00Z",
    price: 110,
    total_seats: 350,
    available_seats: 142,
    image_url: theaterChicago
  }
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  { ticket_id: 1, event_id: 1, type: "standard", price: 75 },
  { ticket_id: 2, event_id: 1, type: "vip", price: 150 },
  { ticket_id: 3, event_id: 2, type: "standard", price: 25 },
  { ticket_id: 4, event_id: 3, type: "standard", price: 120 },
  { ticket_id: 5, event_id: 3, type: "premium", price: 200 },
  { ticket_id: 6, event_id: 4, type: "standard", price: 95 },
  { ticket_id: 7, event_id: 4, type: "vip", price: 180 },
  { ticket_id: 8, event_id: 5, type: "standard", price: 30 },
  { ticket_id: 9, event_id: 6, type: "standard", price: 110 },
  { ticket_id: 10, event_id: 6, type: "premium", price: 175 }
];

// Mock Bookings
export const mockBookings: Booking[] = [];

// Mock Payments
export const mockPayments: Payment[] = [];
