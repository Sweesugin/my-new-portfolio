// Example project data format with optional case study fields
export const projectsExample = [
  {
    title: "Travai – Travel Planner",
    category: "Travel",
    tools: ["Python", "Flask", "React", "PostgreSQL"],
    role: "Full Stack Developer",
    desc: "Dynamic itinerary planning, budget tracking, and third-party API integrations.",
    img: "/travel-planner.png",
    github: "https://github.com/owner/travai",
    demo: "https://travai.example.com",
    // optional pre-written case study (if present, modal will use this verbatim)
    caseStudy: {
      overview: "Travai is a travel planning application that personalizes itineraries...",
      challenge: "Planning multi-stop trips with changing constraints...",
      solution: "Built a modular itinerary engine using Flask APIs and a React front-end...",
      features: ["Personalized itinerary builder", "Budget estimator", "Real-time availability checks"],
      results: ["Reduced planning time by 40%", "Increased bookings by 12%"]
    }
  },
  {
    title: "Pet Wellness Tracker",
    category: "Healthcare",
    tools: ["FastAPI", "PostgreSQL", "React", "JWT"],
    desc: "Secure REST APIs for tracking vaccinations, health records and activity.",
    github: "https://github.com/owner/pet-wellness"
  }
];
