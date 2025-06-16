// Mock authentication service for development
interface MockUser {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  subscription_tier: "free" | "pro" | "enterprise" | "business";
  created_at: string;
}

interface AuthResponse {
  user?: MockUser;
  error?: { message: string };
}

class MockAuthService {
  private users: MockUser[] = [
    {
      id: "1",
      email: "demo@discoveryai.com",
      full_name: "Demo User",
      company_name: "DiscoveryAI",
      subscription_tier: "pro",
      created_at: new Date().toISOString(),
    },
  ];

  private currentUser: MockUser | null = null;
  private listeners: ((user: MockUser | null) => void)[] = [];

  constructor() {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem("mockAuth_user");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  onAuthStateChange(callback: (user: MockUser | null) => void) {
    this.listeners.push(callback);
    // Immediately call with current state
    callback(this.currentUser);

    return {
      unsubscribe: () => {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
          this.listeners.splice(index, 1);
        }
      },
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }

  async signUp(
    email: string,
    password: string,
    fullName: string,
    companyName?: string,
  ): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      return { error: { message: "User already exists" } };
    }

    // Create new user
    const newUser: MockUser = {
      id: Date.now().toString(),
      email,
      full_name: fullName,
      company_name: companyName,
      subscription_tier: "free",
      created_at: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem("mockAuth_user", JSON.stringify(newUser));
    this.notifyListeners();

    return { user: newUser };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return { error: { message: "Invalid email or password" } };
    }

    this.currentUser = user;
    localStorage.setItem("mockAuth_user", JSON.stringify(user));
    this.notifyListeners();

    return { user };
  }

  async signOut(): Promise<{ error?: { message: string } }> {
    this.currentUser = null;
    localStorage.removeItem("mockAuth_user");
    this.notifyListeners();
    return {};
  }

  getCurrentUser(): MockUser | null {
    return this.currentUser;
  }

  async updateProfile(
    updates: Partial<MockUser>,
  ): Promise<{ error?: { message: string } }> {
    if (!this.currentUser) {
      return { error: { message: "No user logged in" } };
    }

    this.currentUser = { ...this.currentUser, ...updates };
    localStorage.setItem("mockAuth_user", JSON.stringify(this.currentUser));
    this.notifyListeners();

    return {};
  }
}

export const mockAuth = new MockAuthService();
export type { MockUser };
