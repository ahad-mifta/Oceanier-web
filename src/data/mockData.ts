import { Headphones, Target, Calendar, Search, BookOpen, Share2, Upload, CheckCircle, Zap } from "lucide-react";
import { LIME } from "../constants";

export const execData = [
  { day: "Mon", executions: 240, fuel: 1800 },
  { day: "Tue", executions: 380, fuel: 2900 },
  { day: "Wed", executions: 310, fuel: 2300 },
  { day: "Thu", executions: 490, fuel: 3700 },
  { day: "Fri", executions: 420, fuel: 3200 },
  { day: "Sat", executions: 180, fuel: 1400 },
  { day: "Sun", executions: 150, fuel: 1100 },
];

export const fuelPieData = [
  { name: "Customer Support", value: 42, color: "#3b82f6" },
  { name: "Lead Gen", value: 28, color: LIME },
  { name: "Scheduling", value: 18, color: "#8b5cf6" },
  { name: "Research", value: 12, color: "#f59e0b" },
];

export const orgData = [
  { month: "Jan", orgs: 12 }, { month: "Feb", orgs: 19 }, { month: "Mar", orgs: 28 },
  { month: "Apr", orgs: 41 }, { month: "May", orgs: 58 }, { month: "Jun", orgs: 74 },
  { month: "Jul", orgs: 93 },
];

export const solutions = [
  { id: 1, name: "Customer Support AI", category: "Customer Support", icon: Headphones, description: "24/7 AI-powered customer support that resolves tickets, answers FAQs, and escalates complex issues automatically.", fuel: "1,200 / mo", status: "active", installs: 234, color: "#3b82f6", tags: ["Chat", "Email", "Widget"] },
  { id: 2, name: "Lead Qualifier", category: "Lead Generation", icon: Target, description: "Capture, qualify, and score inbound leads automatically. Integrates with your CRM and sends hot leads instantly.", fuel: "800 / mo", status: "active", installs: 189, color: LIME, tags: ["Website", "Messenger"] },
  { id: 3, name: "Appointment Scheduler", category: "Appointment Booking", icon: Calendar, description: "Let AI book, reschedule, and confirm appointments. Connects to Google Calendar and sends automatic reminders.", fuel: "600 / mo", status: "active", installs: 156, color: "#8b5cf6", tags: ["Calendar", "SMS"] },
  { id: 4, name: "Research Assistant", category: "Research", icon: Search, description: "AI-powered research that scans the web, summarizes findings, and delivers structured reports on any topic.", fuel: "1,500 / mo", status: "published", installs: 98, color: "#f59e0b", tags: ["Reports", "API"] },
  { id: 5, name: "Internal Knowledge Bot", category: "Internal Knowledge", icon: BookOpen, description: "Give your team instant answers from your docs, SOPs, and internal wikis. No more digging through folders.", fuel: "400 / mo", status: "published", installs: 213, color: "#10b981", tags: ["Slack", "API"] },
  { id: 6, name: "Meta Automation", category: "Meta Automation", icon: Share2, description: "Auto-respond to Meta Messenger conversations, qualify social leads, and route them to the right department.", fuel: "900 / mo", status: "published", installs: 145, color: "#ec4899", tags: ["Messenger", "Meta Ads"] },
];

export const knowledgeItems = [
  { id: 1, name: "Product Manual v2.pdf", type: "PDF", size: "4.2 MB", status: "Ready", date: "2026-07-15", linked: ["Customer Support AI"] },
  { id: 2, name: "FAQ Document.docx", type: "DOCX", size: "1.1 MB", status: "Ready", date: "2026-07-10", linked: ["Customer Support AI", "Lead Qualifier"] },
  { id: 3, name: "acmecorp.com", type: "Website", size: "—", status: "Ready", date: "2026-07-08", linked: ["All Solutions"] },
  { id: 4, name: "Pricing Guide Q3.pdf", type: "PDF", size: "2.8 MB", status: "Processing", date: "2026-07-20", linked: [] },
  { id: 5, name: "Support Policies.txt", type: "TXT", size: "0.3 MB", status: "Ready", date: "2026-07-05", linked: ["Customer Support AI"] },
];

export const activities = [
  { id: 1, message: "Customer Support AI resolved 14 tickets", time: "2 min ago", icon: Headphones, color: "#3b82f6" },
  { id: 2, message: "Lead Qualifier captured 3 new leads from website", time: "18 min ago", icon: Target, color: LIME },
  { id: 3, message: "Pricing Guide Q3.pdf uploaded and processing", time: "1 hr ago", icon: Upload, color: "#8b5cf6" },
  { id: 4, message: "5,000 Fuel purchased — wallet updated", time: "3 hr ago", icon: Zap, color: "#f59e0b" },
  { id: 5, message: "Appointment Scheduler deployed to website", time: "Yesterday", icon: CheckCircle, color: "#10b981" },
];

export const mockOrgs = [
  { id: 1, name: "Acme Corp", plan: "Business", trial: false, fuel: 12400, solutions: 4, members: 8, status: "active", created: "2026-05-12" },
  { id: 2, name: "TechStart Ltd", plan: "Starter", trial: true, fuel: 850, solutions: 1, members: 2, status: "trial", created: "2026-07-18" },
  { id: 3, name: "Global Agency", plan: "Growth", trial: false, fuel: 7200, solutions: 3, members: 5, status: "active", created: "2026-06-03" },
  { id: 4, name: "RetailPlus", plan: "Business", trial: false, fuel: 0, solutions: 2, members: 4, status: "suspended", created: "2026-04-20" },
  { id: 5, name: "MedCenter", plan: "Enterprise", trial: false, fuel: 48000, solutions: 6, members: 22, status: "active", created: "2026-03-01" },
];

export const PARLEY_CONVOS = [
  {
    user: "I run an e-commerce store selling clothing.",
    reply: "I found 5 opportunities for your store:\n✓ 24/7 customer support agent\n✓ Abandoned cart recovery\n✓ Order tracking assistant\n✓ Returns & refunds automation\n✓ Product recommendation engine",
  },
  {
    user: "I own a real estate agency.",
    reply: "I discovered 4 automation wins:\n✓ Lead qualification & scoring\n✓ Property inquiry assistant\n✓ Customer follow-up sequences\n✓ Document processing & analysis",
  },
  {
    user: "We run a healthcare clinic.",
    reply: "Here are 4 AI crew recommendations:\n✓ Appointment booking assistant\n✓ Patient FAQ & intake support\n✓ Staff knowledge base agent\n✓ Insurance query handler",
  },
  {
    user: "I have a digital marketing agency.",
    reply: "I identified 4 growth automations:\n✓ Client reporting assistant\n✓ Content brief generator\n✓ Campaign performance analyst\n✓ Lead nurturing sequences",
  },
];
