/*
  ============================================================
  LI CONSTRUCTION LLC: SITE CONTENT
  ============================================================
  This is the only file you need to edit to change the text,
  projects, contact details and links on the site.

  Everything below is SAMPLE content. Replace it before the
  site goes live (phone, email, address, stats, reviews, etc).

  Tips:
  - Leave a value as "" or [] to hide that part of the page.
  - Images go in assets/img/ and are referenced like
    "assets/img/kitchen-1.jpg". Empty image = styled placeholder.
  - Service icons you can use: home, grid, bath, roof, paint,
    deck, hammer, ruler
  ============================================================
*/

window.SITE_DATA = {
  seo: {
    title: "Li Construction LLC | Remodeling and Building",
    description: "Li Construction LLC provides remodeling, additions and general construction. Request a free quote today."
  },

  company: {
    name: "Li Construction",
    suffix: "LLC",
    tagline: "Remodeling and general construction",
    about: "Remodeling, additions and general construction with clear quotes and clean job sites.",
    phone: "(555) 555-0100",
    email: "info@example.com",
    address: "123 Main Street, City, ST 00000",
    hours: "Mon to Fri, 7:00 am to 5:00 pm",
    license: "",
    serviceAreas: ["Your City", "Nearby City", "Another City"]
  },

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    google: ""
  },

  nav: [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" }
  ],

  hero: {
    eyebrow: "Licensed general contractor",
    headline: "Built right.",
    headlineAccent: "Built to last.",
    text: "From kitchen remodels to full additions, we plan carefully, build cleanly and keep you updated from the first walkthrough to the final inspection.",
    image: "",
    primaryButton: { label: "Get a free quote", href: "#contact" },
    secondaryButton: { label: "See our work", href: "#projects" },
    pointsTitle: "Why homeowners call us",
    points: [
      "Free, itemized estimates",
      "One point of contact from start to finish",
      "Clean, safe job sites",
      "Written schedule and scope"
    ]
  },

  services: {
    eyebrow: "What we do",
    heading: "Services",
    intro: "Pick a service below or tell us about something custom in the quote form.",
    items: [
      { icon: "home", title: "Home remodeling", description: "Whole-home updates, layout changes and interior renovations handled by one team." },
      { icon: "grid", title: "Kitchen remodeling", description: "Cabinets, counters, flooring, lighting and plumbing, planned and built to fit how you cook." },
      { icon: "bath", title: "Bathroom remodeling", description: "Tile, vanities, showers and tubs, with careful waterproofing behind the finish." },
      { icon: "hammer", title: "Additions and framing", description: "Room additions, second stories and structural work built to code." },
      { icon: "roof", title: "Roofing and repairs", description: "Repairs and replacements to keep the weather where it belongs." },
      { icon: "deck", title: "Decks and outdoor", description: "Decks, patios and outdoor living spaces that match your home." }
    ]
  },

  projects: {
    eyebrow: "Recent work",
    heading: "Projects",
    intro: "A look at some of our recent jobs. Click a project for details.",
    items: [
      {
        title: "Open-concept kitchen remodel",
        category: "Kitchen",
        location: "City, ST",
        year: "2025",
        scope: "Full kitchen remodel",
        summary: "Sample description. Describe what the client wanted, what you changed and anything that made the job interesting.",
        image: "",
        gallery: []
      },
      {
        title: "Primary bathroom renovation",
        category: "Bathroom",
        location: "City, ST",
        year: "2025",
        scope: "Bathroom renovation",
        summary: "Sample description. Mention materials, timeline or special requests from the client.",
        image: "",
        gallery: []
      },
      {
        title: "Second-story addition",
        category: "Additions",
        location: "City, ST",
        year: "2024",
        scope: "Addition and framing",
        summary: "Sample description. Add square footage, number of rooms or permit details if you like.",
        image: "",
        gallery: []
      },
      {
        title: "Backyard deck and patio",
        category: "Exterior",
        location: "City, ST",
        year: "2024",
        scope: "Deck and patio",
        summary: "Sample description. Note the materials used, such as composite decking or pavers.",
        image: "",
        gallery: []
      },
      {
        title: "Whole-home refresh",
        category: "Remodel",
        location: "City, ST",
        year: "2024",
        scope: "Interior remodel",
        summary: "Sample description. Flooring, paint, lighting and trim updated throughout.",
        image: "",
        gallery: []
      },
      {
        title: "Roof replacement",
        category: "Exterior",
        location: "City, ST",
        year: "2023",
        scope: "Roofing",
        summary: "Sample description. Mention the roofing material and how long the job took.",
        image: "",
        gallery: []
      }
    ]
  },

  about: {
    eyebrow: "About us",
    heading: "A local crew that treats your home like its own",
    paragraphs: [
      "Write a short story about the company here: who started it, how long you have been building and what you care about.",
      "Add a second paragraph about how you work with clients, such as clear communication, fair pricing and showing up on time."
    ],
    points: ["Licensed and insured", "Written estimates", "Warranty on workmanship"],
    image: ""
  },

  stats: [
    { value: "10+", label: "Years of experience" },
    { value: "150+", label: "Projects completed" },
    { value: "100%", label: "Free estimates" },
    { value: "5", label: "Service areas" }
  ],

  process: {
    eyebrow: "How it works",
    heading: "Our process",
    steps: [
      { title: "Free consultation", text: "We visit, listen to your goals and look at the space." },
      { title: "Clear quote", text: "You get an itemized written estimate and a realistic schedule." },
      { title: "Build", text: "Our crew does the work, keeps the site clean and keeps you updated." },
      { title: "Final walkthrough", text: "We walk the job with you and fix anything on the punch list." }
    ]
  },

  reviews: {
    eyebrow: "Reviews",
    heading: "What clients say",
    items: [
      { quote: "Sample review. Replace this with a real client review.", name: "Client name", detail: "Kitchen remodel, City" },
      { quote: "Sample review. Replace this with a real client review.", name: "Client name", detail: "Bathroom renovation, City" },
      { quote: "Sample review. Replace this with a real client review.", name: "Client name", detail: "Addition, City" }
    ]
  },

  cta: {
    heading: "Ready to start your project?",
    text: "Tell us what you have in mind and we will get back to you within one business day.",
    button: { label: "Request a free quote", href: "#contact" }
  },

  contact: {
    eyebrow: "Contact",
    heading: "Request a free quote",
    intro: "Fill out the form and we will reach out to talk through your project.",
    /*
      FORM SETTINGS
      - Leave formEndpoint empty: the form opens the visitor's email app
        with the message filled in (works anywhere, no setup).
      - Or paste a form service URL, for example a Formspree endpoint
        like "https://formspree.io/f/xxxxxxxx", and the form will submit
        in the background and show a thank-you message.
    */
    formEndpoint: "",
    submitLabel: "Send request"
  }
};
