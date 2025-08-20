const servicesData = [
  {
    id: "s1",
    name: "Website Development",
    shortDesc: "Build a modern responsive website",
    fullDesc:
      "Complete front-end & back-end website development tailored to your brand identity.",
    price: 20000,
    addOns: [
      { id: "a1", name: "SEO Optimization", price: 5000 },
      { id: "a2", name: "Content Writing", price: 3000 },
    ],
  },
  {
    id: "s2",
    name: "Mobile App Development",
    shortDesc: "Cross-platform mobile applications",
    fullDesc:
      "Native and hybrid app development for Android and iOS platforms.",
    price: 30000,
    addOns: [
      { id: "a3", name: "Push Notifications", price: 2000 },
      { id: "a4", name: "App Maintenance", price: 7000 },
    ],
  },
  {
    id: "s3",
    name: "Digital Marketing",
    shortDesc: "Increase your online presence & sales",
    fullDesc:
      "Social media marketing, PPC ads, email campaigns, and influencer marketing.",
    price: 15000,
    addOns: [
      { id: "a5", name: "Weekly Reports", price: 1000 },
      { id: "a6", name: "Extra Campaigns", price: 4000 },
    ],
  },
];

export default servicesData;
