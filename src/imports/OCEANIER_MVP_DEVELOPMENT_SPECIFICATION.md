# **OCEANIER MVP DEVELOPMENT SPECIFICATION** 

# **Chapter 1 — Project Overview** 

Version: MVP v1.0 

# **1.1 Project Name** 

Oceanier 

# **1.2 Project Type** 

AI Workflow Platform (SaaS) 

# **1.3 Project Goal** 

Build a SaaS platform that allows businesses to install, configure, deploy, and manage AIpowered business workflows without requiring technical knowledge. 

# **1.4 Target Users** 

- Small Businesses 

- Medium Businesses 

- Startups 

- Agencies 

- Enterprise Customers 

# **1.5 Core Features** 

- Authentication 

- Organization Management 

- Subscription Management 

- Token (Fuel) Management 

- AI Assistant (Parley) 

- AI Workflow Installation 

- Workflow Configuration 

- Prompt Customization 

- Trigger Management 

- Knowledge Base 

- Website Widget 

- Messenger Deployment 

- API Deployment 

- Business Dashboard 

- Analytics 

- Billing 

- Custom Workflow Request 

- Admin Panel 

# **1.6 Technology Stack** 

## **Frontend** 

- Next.js 

- React 

- TypeScript 

- TailwindCSS 

- Framer Motion 

- Shadcn UI 

## **Backend** 

- Supabase 

- PostgreSQL 

- Supabase Auth 

- Supabase Storage 

- Supabase Edge Functions 

## **Workflow Engine** 

- n8n 

## **AI Providers** 

- OpenAI 

- Anthropic Claude 

- Google Gemini 

- Kimi 

## **Payments** 

- Stripe 

## **Hosting** 

Frontend 

- Vercel 

Backend 

- Supabase 

Workflow Engine 

- n8n Server 

# **1.7 User Roles** 

## **Owner** 

Full access 

## **Admin** 

Organization management 

Workflow management 

Knowledge management 

Member management 

## **Member** 

Use workflows 

View analytics 

Manage assigned workflows 

## **Super Admin** 

Oceanier internal access 

Customer management 

Subscription management 

Workflow publishing 

Custom workflow requests 

Platform analytics 

# **1.8 Subscription Plans** 

Starter 

Growth 

Business 

Enterprise 

Every subscription includes 

- Monthly Token Allocation 

- Workflow Limit 

- Knowledge Storage Limit 

- Team Member Limit 

- Deployment Limit 

# **1.9 Trial** 

Duration 

7 Days 

Includes 

- Trial Token Balance 

- Full Platform Access 

- All Starter Features 

After expiration 

- Workflows paused 

- Dashboard accessible 

- Upgrade required 

# **1.10 Core Navigation** 

Public Website 

- Home 

- Features 

- Pricing 

- Contact 

- Login 

- Start Trial 

### Authenticated Platform 

- Home 

- Solutions 

- Knowledge 

- Usage 

- Custom Requests 

- Settings 

# **1.11 Authentication Flow** 

Visitor 

### ↓ 

Signup 

### ↓ 

Verify Email 

### ↓ 

Create Organization 

### ↓ 

Start Trial 

### ↓ 

Parley Onboarding 

↓ 

Dashboard 

# **1.12 Organization Flow** 

Owner creates organization 

↓ 

Organization Profile 

↓ 

Invite Members 

↓ 

Assign Roles 

↓ 

Ready 

# **1.13 Main Business Flow** 

Signup 

↓ 

Organization Created 

↓ 

Trial Activated 

↓ 

Parley Analysis 

↓ 

Business Profile Generated 

### ↓ 

Recommended Solutions 

### ↓ 

Install Solution 

↓ 

Configure 

↓ 

Deploy 

↓ 

Monitor 

# **1.14 AI Assistant** 

Name 

Parley 

Responsibilities 

- Business onboarding 

- Business analysis 

- Workflow recommendation 

- Workflow configuration 

- Knowledge collection 

- Custom workflow request generation 

- Platform navigation assistance 

# **1.15 Solution Categories** 

- Customer Support 

- Lead Generation 

- Appointment Booking 

- Research 

- Internal Knowledge 

- Meta Automation 

# **1.16 Deployment Channels** 

- Website Widget 

- Meta Messenger 

- API 

# **1.17 Token System** 

Every AI request consumes Tokens. 

Tokens are deducted after successful execution. 

Users can 

- Purchase Tokens 

- View Usage 

- View Remaining Balance 

- View Token History 

# **1.18 Knowledge Sources** 

Organization Knowledge 

- PDF 

- DOCX 

- TXT 

- Website URL 

- FAQ 

Solution Knowledge 

- Additional PDFs 

- Additional URLs 

- Additional FAQs 

# **1.19 Custom Workflow Requests** 

User submits 

- Business Information 

- Contact Information 

- Problem Description 

Request is stored in Admin Panel. 

Status lifecycle: 

New 

### ↓ 

Under Review 

### ↓ 

Quoted 

### ↓ 

Accepted 

### ↓ 

Development 

### ↓ 

Completed 

### ↓ 

Closed 

# **1.20 Dashboard Metrics** 

Display 

- Active Solutions 

- Conversations 

- Leads 

- Meetings 

- Token Balance 

- Estimated Hours Saved 

- Recent Activity 

# **1.21 Development Principles** 

- Responsive Design 

- Mobile Friendly 

- Server Components where applicable 

- TypeScript Strict Mode 

- Component-based Architecture 

- Reusable UI Components 

- Role-based Authorization 

- Row Level Security 

- API-first Architecture 

- Modular Folder Structure 

# **Chapter 2 — Authentication & Organization Module** 

Version: MVP v1.0 

# **2.1 Module Objective** 

Provide a secure authentication system with organization-based access control. 

Every user belongs to at least one organization. 

Every resource belongs to an organization. 

All platform data is isolated by organization. 

# **2.2 Authentication Features** 

The authentication module includes: 

- Sign Up 

- Login 

- Email Verification 

- Forgot Password 

- Reset Password 

- Logout 

- Session Management 

- Protected Routes 

- Organization Creation 

- Organization Invitation 

- Organization Switching 

- Role Management 

# **2.3 Authentication Flow** 

```
Landing Page
```

```
↓
Start Free Trial
```

```
↓
Signup
↓
```

```
Email Verification
```

```
↓
Create Organization
```

```
↓
Start Trial
↓
Parley Onboarding
```

```
↓
Dashboard
```

# **2.4 Login Flow** 

```
Login
```

```
↓
Email + Password
```

```
↓
Supabase Auth
↓
Validate Session
```

```
↓
```

```
Redirect Dashboard
```

If user belongs to multiple organizations: 

```
Login
```

```
↓
```

```
Organization Selector
```

```
↓
Dashboard
```

# **2.5 Signup Screen** 

UI Components 

### Header 

- Oceanier Logo 

### Title 

- Create your Oceanier Account 

### Fields 

- Full Name 

- Email 

- Password 

- Confirm Password 

### Checkboxes 

- Accept Terms 

- Accept Privacy Policy 

### Buttons 

- Create Account 

### Secondary Link 

- Already have an account? 

### Validation 

### Full Name 

- Required 

- Minimum 2 characters 

Email 

- Valid email 

- Unique 

Password 

Minimum 

- 8 characters 

Must contain 

- Uppercase 

- Lowercase 

- Number 

Confirm Password 

- Must match 

Backend 

Create user using Supabase Auth. 

Create user profile. 

Send verification email. 

# **2.6 Email Verification** 

User receives verification email. 

Click link. 

Supabase verifies account. 

Redirect: 

```
Create Organization
```

# **2.7 Login Screen** 

Fields 

Email 

Password 

Remember Me 

Forgot Password 

Button 

Login 

Backend 

Authenticate with Supabase. 

Load organizations. 

Create session. 

Redirect. 

# **2.8 Forgot Password** 

Fields 

Email 

Button 

Send Reset Link 

Backend 

Supabase Password Reset 

Reset Screen 

Fields 

New Password 

Confirm Password 

Save 

Redirect 

Login 

# **2.9 Logout** 

Logout button available in user menu. 

Backend 

Destroy session. 

Redirect 

Landing Page 

# **2.10 Session Management** 

Use Supabase Session. 

Auto refresh token. 

Auto logout on expiration. 

Protected routes require active session. 

# **2.11 Create Organization** 

Immediately after signup. 

Fields 

Organization Name 

Website (Optional) 

Industry 

Country 

Timezone 

Logo (Optional) 

Button 

Continue 

Backend 

Create organization. 

Assign current user as Owner. 

Activate trial. 

Create default workspace. 

# **2.12 Organization Switcher** 

Visible in navbar. 

Shows 

Current Organization 

Dropdown 

Available Organizations 

Switch Organization 

Reload organization context. 

# **2.13 Organization Invitation** 

Owner/Admin 

↓ 

Invite Member 

### ↓ 

Enter Email 

↓ 

Assign Role 

↓ 

Send Invitation 

### ↓ 

Email Received 

### ↓ 

Accept Invitation 

### ↓ 

Join Organization 

# **2.14 User Roles** 

## **Owner** 

Permissions 

- Full access 

- Delete organization 

- Billing 

- Members 

- Solutions 

- Knowledge 

- Settings 

## **Admin** 

Permissions 

- Invite members 

- Configure solutions 

- Manage knowledge 

- Analytics 

- Deployments 

### Cannot 

- Delete organization 

- Change subscription 

## **Member** 

Permissions 

- Use installed solutions 

- Upload knowledge 

- View analytics 

- Edit assigned configurations 

Cannot 

- Billing 

- Members 

- Organization settings 

# **2.15 User Profile** 

Fields 

Name 

Email 

Profile Photo 

Language 

Timezone 

Notification Preferences 

Password 

# **2.16 Organization Profile** 

Fields 

Company Name 

Website 

Industry 

Country 

Timezone 

Logo 

Company Description 

Support Email 

# **2.17 Organization Settings** 

Editable 

Business Hours 

Default Language 

Default Timezone 

Default AI Tone 

Notification Email 

# **2.18 Trial Logic** 

New organization receives 

- Trial Status = Active 

- Trial Days = 7 

- Initial Fuel Allocation 

Scheduler checks 

Daily 

If trial expired 

↓ 

Pause workflows 

↓ 

Restrict new executions 

↓ 

Show Upgrade Banner 

# **2.19 Database Tables** 

## **users** 

```
id
email
created_at
```

## **profiles** 

```
id
user_id
name
avatar
timezone
language
```

## **organizations** 

```
id
name
website
industry
country
timezone
logo
trial_start
trial_end
subscription_status
created_at
```

## **organization_members** 

```
id
organization_id
user_id
role
joined_at
```

## **organization_invites** 

```
id
organization_id
email
role
status
expires_at
```

# **2.20 API Endpoints** 

## **Authentication** 

```
POST /auth/signup
POST /auth/login
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
```

## **Organization** 

```
POST /organizations
```

```
GET /organizations
PATCH /organizations/:id
DELETE /organizations/:id
```

## **Members** 

```
GET /organizations/:id/members
POST /organizations/:id/invite
```

```
PATCH /members/:id
DELETE /members/:id
```

# **2.21 Permissions** 

Every API validates 

Authenticated User 

↓ 

Organization Membership 

↓ 

Role 

↓ 

Requested Resource 

Only then execute request. 

# **2.22 Error Handling** 

Example 

```
{
  "success": false,
  "message": "Organization not found."
}
{
  "success": false,
  "message": "Permission denied."
}
```

```
{
  "success": false,
  "message": "Invalid credentials."
}
```

# **2.23 Acceptance Criteria** 

- ✓ User can sign up. 

- ✓ User verifies email. 

- ✓ User creates organization. 

- ✓ Trial starts automatically. 

- ✓ User logs in. 

- ✓ User logs out. 

- ✓ Owner can invite members. 

- ✓ Members can join. 

- ✓ Organization switching works. 

- ✓ Role permissions are enforced. 

- ✓ Protected routes require authentication. 

- ✓ Trial expiration pauses workflow execution. 

# **Chapter 3 — Parley AI Onboarding & Business Discovery** 

Version: MVP v1.0 

# **3.1 Module Objective** 

The objective of this module is to onboard every new organization through Parley. 

Parley collects business information, analyzes the business, creates the organization profile, recommends suitable Solutions, and guides the user into the platform. 

Every newly created organization must complete the onboarding process before accessing the main dashboard. 

# **3.2 Module Features** 

This module includes: 

- Welcome Screen 

- AI Conversation 

- Business Information Collection 

- Website Analysis 

- Document Upload 

- Knowledge Collection 

- Business Profile Generation 

- Solution Recommendation 

- Initial Solution Installation 

- Onboarding Completion 

# **3.3 User Flow** 

```
Signup
```

```
↓
```

```
Create Organization
↓
Launch Parley
↓
Business Interview
↓
Website & Knowledge Collection
↓
Business Analysis
↓
Solution Recommendation
↓
Install Selected Solutions
↓
Dashboard
```

# **3.4 Welcome Screen** 

UI Elements 

- Oceanier Logo 

- Parley Avatar 

- Welcome Message 

### Headline 

Welcome to Oceanier 

### Subheading 

I'm Parley. I'll help you set up AI workflows for your business in just a few minutes. 

Primary Button 

- Get Started 

# **3.5 Conversation Interface** 

The onboarding is presented as a conversational interface. 

Layout 

Left Panel 

- Conversation History 

Right Panel 

- Current Question 

- Suggested Answers (when applicable) 

- Text Input 

- Upload Button 

- Continue Button 

# **3.6 Business Information Collection** 

Parley asks the following information in sequence. 

Question 1 

Business Name 

Question 2 

Business Website 

Optional 

If no website exists, user may skip. 

### Question 3 

Industry 

Examples: 

- Healthcare 

- Education 

- Restaurant 

- Real Estate 

- E-commerce 

- Marketing Agency 

- Finance 

- SaaS 

- Manufacturing 

- Other 

Question 4 

Describe your business. 

Free text. 

### Question 5 

What would you like to automate? 

Examples displayed: 

- Customer Support 

- Lead Collection 

- Appointment Booking 

- Social Media 

- Internal Knowledge 

- Sales 

- Other 

Multiple selections allowed. 

# **3.7 Website Analysis** 

If a website is provided: 

Backend performs: 

- Crawl homepage 

- Extract business information 

- Extract services 

- Extract contact details 

- Extract FAQs (if available) 

The extracted content is stored as Organization Knowledge. 

# **3.8 Knowledge Collection** 

Parley asks: 

Would you like to upload additional business information? 

Supported uploads: 

- PDF 

- DOCX 

- TXT 

Additional options: 

- Website URL 

- FAQ Text 

All uploaded content becomes Organization Knowledge. 

# **3.9 Business Analysis** 

After collecting information, the backend generates a Business Profile. 

The Business Profile includes: 

- Industry 

- Business Category 

- Primary Services 

- Business Goals 

- Recommended Solution Categories 

This profile is stored and can be updated later. 

# **3.10 Business Profile** 

Stored Information 

- Organization ID 

- Industry 

- Category 

- Description 

- Website 

- Services 

- Automation Goals 

- Created Date 

- Updated Date 

# **3.11 Solution Recommendation** 

Based on the Business Profile, Parley retrieves matching Solutions. 

Each recommendation displays: 

- Solution Name 

- Short Description 

- Estimated Token Usage 

- Business Benefits 

- Install Button 

Multiple Solutions may be selected. 

# **3.12 Solution Selection** 

The user may: 

- Install immediately 

- Skip installation 

- Return later 

Selected Solutions proceed to configuration. 

# **3.13 Initial Configuration** 

For each selected Solution, Parley requests only the minimum required information. 

Example fields: 

- Welcome Message 

- Business Hours 

- Support Email 

- Default Language 

The configuration is saved with the Solution. 

# **3.14 AI Instructions** 

Each installed Solution contains editable AI Instructions. 

Sections: 

- Role 

- Business Context 

- Tone 

- Rules 

- Things to Avoid 

- Examples 

- Advanced Prompt 

Changes are saved as the active instruction set for that Solution. 

# **3.15 Trigger Configuration** 

Each Solution includes Trigger Settings. 

Supported trigger types: 

- Website Chat 

- Meta Messenger 

- API Request 

- Scheduled Time 

Supported schedule modes: 

- Always Active 

- Business Hours 

- Custom Schedule 

Configuration is stored per Solution. 

# **3.16 Completion** 

After onboarding: 

The organization status becomes: 

```
Onboarding Completed
```

The user is redirected to the Dashboard. 

Parley remains available from the platform sidebar. 

# **3.17 Database Tables** 

## **business_profiles** 

Fields: 

```
id
organization_id
industry
category
description
website
```

```
services
automation_goals
created_at
updated_at
```

## **onboarding_sessions** 

Fields: 

```
id
organization_id
status
current_step
completed_at
created_at
```

## **onboarding_answers** 

Fields: 

```
id
session_id
question
answer
created_at
```

# **3.18 API Endpoints** 

## **Onboarding** 

```
POST /onboarding/start
POST /onboarding/answer
GET /onboarding/session
POST /onboarding/complete
```

## **Business Profile** 

```
GET /business-profile
PATCH /business-profile
```

## **Website Analysis** 

```
POST /website/analyze
```

## **Recommendations** 

```
GET /solutions/recommended
```

# **3.19 Validation Rules** 

### Business Name 

- Required 

### Industry 

- Required 

### Automation Goal 

- At least one selection required 

### Website 

- Optional 

- Must be a valid URL if provided 

### Document Upload 

- Maximum file size defined by plan 

- Supported formats only 

# **3.20 Business Logic** 

- Onboarding begins immediately after organization creation. 

- Users cannot access the main dashboard until onboarding is completed. 

- Website analysis runs only if a valid website is provided. 

- Uploaded documents are added to Organization Knowledge. 

- Recommendations are generated from the Business Profile. 

- AI Instructions and Trigger Settings are initialized with default values during Solution installation. 

# **3.21 Acceptance Criteria** 

- ✓ User completes onboarding through Parley. 

- ✓ Business information is stored successfully. 

- ✓ Website analysis completes when applicable. 

- ✓ Documents are uploaded and linked to the organization. 

- ✓ Business Profile is generated. 

- ✓ Recommended Solutions are displayed. 

- ✓ User installs one or more Solutions. 

- ✓ Initial configuration is saved. 

- ✓ AI Instructions are editable. 

- ✓ Trigger Settings are configurable. 

- ✓ User reaches the dashboard after onboarding. 

# **Chapter 4 — Solutions Module (Marketplace, Installation & Management)** 

Version: MVP v1.0 

# **4.1 Module Objective** 

The Solutions Module allows organizations to discover, install, configure, deploy, manage, and monitor AI Solutions. 

A Solution represents a complete business automation package that is ready for immediate use. 

Solutions are created and published only by Oceanier. 

# **4.2 Module Features** 

The module includes: 

- Solution Catalog 

- Search 

- Categories 

- Featured Solutions 

- Solution Details 

- Install Wizard 

- Configuration 

- AI Instructions 

- Trigger Settings 

- Integrations 

- Deployment 

- Version Management 

- Enable / Disable 

- Delete 

- Update 

# **4.3 Navigation** 

Sidebar 

```
Solutions
```

Clicking opens the Solutions page. 

# **4.4 Solutions Page Layout** 

Top Navigation 

- Search Bar 

- Category Filter 

- Status Filter 

Main Content 

- Featured Solutions 

- Installed Solutions 

- Available Solutions 

# **4.5 Categories** 

Default Categories 

- Customer Support 

- Sales 

- Lead Generation 

- Appointment Booking 

- Marketing 

- Research 

- Internal Knowledge 

- Meta Automation 

- Productivity 

# **4.6 Solution Card** 

Each Solution card displays: 

- Icon 

- Name 

- Category 

- Short Description 

- Estimated Monthly Token Usage 

- Current Version 

- Install Status 

Primary Action 

- Install 

- Open 

- Update 

# **4.7 Search** 

Search by: 

- Solution Name 

- Category 

- Description 

Results update in real time. 

# **4.8 Filters** 

Status 

- Installed 

- Not Installed 

- Active 

- Paused 

Category 

Multiple selection allowed. 

# **4.9 Solution Detail Page** 

Displays: 

Header 

- Icon 

- Name 

- Category 

- Version 

- Install Button 

Overview 

- Description 

- Business Benefits 

- Supported Channels 

Configuration Summary 

Token Estimate 

Supported Knowledge Sources 

Deployment Channels 

Version History 

# **4.10 Installation Flow** 

```
Solution Detail
```

```
↓
```

```
Install
```

```
↓
```

```
Configuration
```

```
↓
```

```
Knowledge Selection
```

```
↓
```

```
AI Instructions
```

```
↓
Trigger Settings
```

```
↓
```

```
Deployment
↓
Completed
```

# **4.11 Configuration** 

Each Solution defines its required configuration fields. 

Example 

Customer Support Solution 

Fields 

- Business Name 

- Welcome Message 

- Support Email 

- Business Hours 

- Default Language 

All values are editable after installation. 

# **4.12 Knowledge Selection** 

User selects: 

Organization Knowledge 

or 

Additional Solution Knowledge 

User may upload new documents during installation. 

# **4.13 AI Instructions** 

Every Solution contains editable AI Instructions. 

Sections 

Role 

Business Context 

Tone 

Rules 

Things To Avoid 

Examples 

Advanced Prompt 

Users can edit and save all sections. 

# **4.14 Trigger Settings** 

Each Solution supports configurable triggers. 

Trigger Types 

- Website Chat 

- Meta Messenger 

- API Request 

- Scheduled 

Schedule Modes 

- Always Active 

- Business Hours 

- Custom Schedule 

Users may enable or disable each trigger. 

# **4.15 Integrations** 

Supported MVP Integrations 

- Website Widget 

- Meta Messenger 

- REST API 

Each integration displays: 

- Status 

- Connected 

- Not Connected 

Configuration is stored per Solution. 

# **4.16 Deployment** 

After installation 

User clicks 

Deploy 

Backend: 

- Validates configuration 

- Validates knowledge 

- Generates deployment 

- Activates Solution 

Deployment status becomes: 

```
Active
```

# **4.17 Installed Solution Dashboard** 

Each installed Solution contains: 

Overview 

Configuration AI Instructions 

Triggers Knowledge Integrations Analytics Logs Settings 

# **4.18 Overview Tab** 

Displays 

- Solution Status 

- Current Version 

- Installation Date 

- Last Activity 

- Monthly Token Usage 

- Active Channels 

# **4.19 Configuration Tab** 

Editable configuration fields. 

Save button. 

Reset to default. 

# **4.20 AI Instructions Tab** 

Editable sections 

Role 

Business Context 

Tone 

Rules 

Things To Avoid 

Examples 

Advanced Prompt 

Buttons 

Save 

Restore Default 

# **4.21 Triggers Tab** 

Displays 

Current triggers 

Schedule 

Status 

Edit 

Enable 

Disable 

# **4.22 Knowledge Tab** 

Displays 

Organization Knowledge 

Solution Knowledge 

Upload 

Delete 

Sync 

Re-index 

# **4.23 Integrations Tab** 

Website Widget 

Messenger 

API 

Each integration displays 

Status 

Configuration 

Reconnect 

Disconnect 

# **4.24 Analytics Tab** 

Displays 

Messages 

Successful Executions 

Failed Executions 

Leads Generated 

Meetings Booked 

Token Consumption 

Average Response Time 

# **4.25 Logs Tab** 

Displays execution history. 

Columns 

- Date 

- Trigger 

- Status 

- Tokens Used 

- Execution Time 

Supports filtering by date and status. 

# **4.26 Settings Tab** 

Options 

Pause Solution 

Resume Solution 

Delete Solution 

Update Version 

# **4.27 Version Management** 

Every Solution has: 

Current Version 

Previous Versions 

Update Notes 

Users can update to the latest published version. 

# **4.28 Solution Status** 

Available statuses 

```
Draft
Published
Installed
Active
Paused
Updating
Deleted
```

# **4.29 Delete Solution** 

Confirmation required. 

Backend 

Stops deployment. 

Deletes configuration. 

Retains execution history. 

# **4.30 Database Tables** 

## **solutions** 

```
id
name
category
description
icon
version
status
estimated_tokens
created_at
updated_at
```

## **organization_solutions** 

```
id
organization_id
solution_id
status
installed_at
updated_at
```

## **solution_configs** 

```
id
organization_solution_id
config_json
updated_at
```

## **solution_prompts** 

```
id
organization_solution_id
role
business_context
tone
rules
avoid
examples
advanced_prompt
updated_at
```

## **solution_triggers** 

```
id
organization_solution_id
trigger_type
schedule_type
schedule_value
status
updated_at
```

## **solution_integrations** 

```
id
organization_solution_id
integration
status
config_json
updated_at
```

# **4.31 API Endpoints** 

## **Solutions** 

```
GET /solutions
```

```
GET /solutions/:id
POST /solutions/install
```

```
PATCH /solutions/:id
DELETE /solutions/:id
```

## **Configuration** 

```
GET /solutions/:id/config
```

```
PATCH /solutions/:id/config
```

## **AI Instructions** 

```
GET /solutions/:id/instructions
```

```
PATCH /solutions/:id/instructions
```

## **Triggers** 

```
GET /solutions/:id/triggers
```

```
PATCH /solutions/:id/triggers
```

## **Integrations** 

```
GET /solutions/:id/integrations
```

```
PATCH /solutions/:id/integrations
```

## **Deployment** 

```
POST /solutions/:id/deploy
```

```
POST /solutions/:id/pause
POST /solutions/:id/resume
```

# **4.32 Validation Rules** 

- Solution must be published before installation. 

- Required configuration fields must be completed. 

- At least one deployment channel must be configured before activation. 

- AI Instructions must always contain a Role and Business Context. 

- Trigger configuration must pass schedule validation. 

- Integration credentials must be verified before deployment. 

# **4.33 Business Logic** 

- Organizations may install multiple Solutions. 

- Each Solution has an independent configuration. 

- AI Instructions are stored per organization. 

- Trigger settings are stored per organization. 

- Deployments are independent for each organization. 

- Solution updates do not overwrite organization-specific configuration. 

- Execution logs remain available after a Solution is paused or deleted. 

# **4.34 Acceptance Criteria** 

- ✓ User can browse all published Solutions. 

- ✓ User can search and filter Solutions. 

- ✓ User can view Solution details. 

- ✓ User can install a Solution. 

- ✓ User can configure the Solution. 

- ✓ User can edit AI Instructions. 

- ✓ User can configure Trigger Settings. 

- ✓ User can connect deployment channels. 

- ✓ User can deploy the Solution. 

- ✓ User can pause, resume, update, and delete the Solution. 

- ✓ Analytics and execution logs are available for each installed Solution. 

# **Chapter 5 — Knowledge Base & AI Context Management** 

Version: MVP v1.0 

# **5.1 Module Objective** 

The Knowledge Base module enables organizations to provide business information that AI Solutions use to answer questions, generate responses, and automate workflows. 

Knowledge belongs to the organization and can optionally be assigned to individual Solutions. 

# **5.2 Module Features** 

The module includes: 

- Organization Knowledge 

- Solution Knowledge 

- File Upload 

- Website Crawling 

- FAQ Management 

- Knowledge Library 

- Knowledge Assignment 

- Knowledge Sync 

- Re-index 

- Delete 

- Processing Status 

# **5.3 Navigation** 

Sidebar 

```
Knowledge
```

# **5.4 Page Layout** 

Top Section 

- Upload Files 

- Add Website 

- Add FAQ 

- Refresh Knowledge 

Main Content 

Tabs 

- All Knowledge 

- Documents 

- Websites 

- FAQs 

# **5.5 Organization Knowledge** 

Organization Knowledge is shared across all installed Solutions unless overridden. 

Supported Sources 

- PDF 

- DOCX 

- TXT 

- Website 

- FAQ 

# **5.6 Solution Knowledge** 

Each Solution can have additional knowledge. 

Examples 

Customer Support Solution 

Uses 

- Organization Knowledge 

- Product Manual PDF 

- Warranty PDF 

Lead Qualification Solution 

Uses 

- Organization Knowledge 

- Pricing PDF 

# **5.7 File Upload** 

Supported Formats 

- PDF 

- DOCX 

- TXT 

Each uploaded file displays 

- File Name 

- File Type 

- File Size 

- Upload Date 

- Processing Status 

- Assigned Solutions 

# **5.8 Upload Flow** 

```
Select File
```

```
↓
```

```
Upload
```

```
↓
```

```
Virus Check
```

```
↓
```

```
Extract Text
```

```
↓
```

```
Chunk Document
```

```
↓
```

```
Generate Embeddings
```

```
↓
Store
```

```
↓
Ready
```

# **5.9 Website Knowledge** 

User enters 

Website URL 

System crawls 

- Homepage 

- Internal Pages 

- Public Content 

Stores extracted content as Organization Knowledge. 

# **5.10 Website Configuration** 

Fields 

Website URL 

Crawl Depth 

Maximum Pages 

Auto Sync 

# **5.11 Website Sync** 

If Auto Sync is enabled 

Backend periodically 

- Crawl website 

- Detect changes 

- Update knowledge 

- Re-index content 

# **5.12 FAQ Management** 

User creates FAQ entries. 

Each FAQ contains 

Question 

Answer 

Category (Optional) 

Status 

Active / Inactive 

# **5.13 Knowledge Assignment** 

Each knowledge item displays 

Assigned To 

Options 

- Entire Organization 

- Selected Solutions 

Multiple Solution assignment supported. 

# **5.14 Knowledge Library** 

Columns 

- Name 

- Type 

- Source 

- Status 

- Assigned Solutions 

- Last Updated 

Actions 

View 

Assign 

Sync 

Delete 

# **5.15 Knowledge Details** 

Displays 

Source Information 

Extracted Text Preview 

Assignment 

Last Sync 

Processing History 

# **5.16 Processing Status** 

Available Statuses 

```
Queued
Uploading
Processing
Embedding
Ready
Failed
```

# **5.17 Sync** 

Manual Sync 

Button 

Sync Now 

Backend 

Reprocesses 

- Documents 

- Websites 

Updates embeddings. 

# **5.18 Delete Knowledge** 

Delete Confirmation 

Backend 

Removes 

- Source 

- Chunks 

- Embeddings 

Updates assigned Solutions. 

# **5.19 Search** 

Search by 

- File Name 

- Website 

- FAQ 

- Content 

# **5.20 Filters** 

Filter by 

- Type 

- Status 

- Assigned Solution 

# **5.21 Storage Rules** 

Files stored in 

Supabase Storage 

Metadata stored in 

PostgreSQL 

Embeddings stored in 

pgvector 

# **5.22 AI Usage** 

During Solution execution 

Backend 

Loads 

Organization Knowledge 

### ↓ 

Solution Knowledge 

### ↓ 

Relevant Chunks 

### ↓ 

Provides Context 

↓ 

Calls AI Provider 

# **5.23 Database Tables** 

## **knowledge_sources** 

```
id
organization_id
type
title
status
created_at
updated_at
```

## **knowledge_documents** 

```
id
knowledge_source_id
storage_path
file_name
file_size
mime_type
```

## **website_sources** 

```
id
knowledge_source_id
url
crawl_depth
max_pages
auto_sync
last_synced
```

## **faq_items** 

```
id
organization_id
question
answer
category
status
created_at
updated_at
```

## **document_chunks** 

```
id
knowledge_source_id
chunk_index
content
created_at
```

## **embeddings** 

```
id
chunk_id
embedding_model
vector
created_at
```

## **knowledge_assignments** 

```
id
knowledge_source_id
organization_solution_id
created_at
```

# **5.24 API Endpoints** 

## **Knowledge** 

```
GET /knowledge
POST /knowledge/upload
DELETE /knowledge/:id
PATCH /knowledge/:id
```

## **Website** 

```
POST /knowledge/website
POST /knowledge/website/sync
```

## **FAQ** 

```
GET /knowledge/faqs
POST /knowledge/faqs
PATCH /knowledge/faqs/:id
DELETE /knowledge/faqs/:id
```

## **Assignment** 

```
POST /knowledge/assign
```

```
DELETE /knowledge/assign
```

# **5.25 Validation Rules** 

### Documents 

- Supported file types only 

- Maximum upload size based on subscription 

### Website 

- Valid HTTPS URL 

- Publicly accessible 

### FAQ 

- Question required 

- Answer required 

### Assignment 

- Knowledge source must exist 

- Solution must belong to organization 

# **5.26 Business Logic** 

- Organization Knowledge is available to all installed Solutions by default. 

- Solution-specific Knowledge supplements Organization Knowledge. 

- Deleted knowledge is removed from future AI executions. 

- Sync updates existing content instead of creating duplicates. 

- Re-indexing replaces previous embeddings. 

- Solutions always use the latest indexed version of assigned knowledge. 

# **5.27 Acceptance Criteria** 

- ✓ User can upload supported documents. 

- ✓ User can add website sources. 

- ✓ User can create FAQ entries. 

- ✓ Uploaded knowledge is processed successfully. 

- ✓ Embeddings are generated. 

- ✓ Knowledge can be assigned to one or more Solutions. 

- ✓ Users can manually sync website knowledge. 

- ✓ Users can delete knowledge sources. 

- ✓ AI Solutions consume assigned knowledge during execution. 

- ✓ Knowledge processing status is visible. 

# **Chapter 6 — Workflow Execution Engine** 

Version: MVP v1.0 

# **6.1 Module Objective** 

The Workflow Execution Engine is responsible for executing installed Solutions. 

It validates the request, loads the Solution configuration, prepares the AI context, triggers the workflow, records execution data, deducts tokens, and returns the response. 

The execution engine is completely transparent to the end user. 

# **6.2 Module Features** 

The module includes: 

- Trigger Detection 

- Workflow Loading 

- Configuration Loading 

- AI Instruction Loading 

- Knowledge Retrieval 

- AI Provider Selection 

- Workflow Execution 

- Token Usage Calculation 

- Token Deduction 

- Execution Logging 

- Error Handling 

- Retry Handling 

# **6.3 Execution Flow** 

```
Trigger
```

```
↓
```

```
Receive Request
```

```
↓
```

```
Authentication
```

##### `↓` 

```
Organization Validation
```

##### `↓` 

```
Solution Validation
```

##### `↓` 

```
Trigger Validation
```

##### `↓` 

```
Load Configuration
```

##### `↓` 

```
Load AI Instructions
```

##### `↓` 

```
Load Knowledge
```

##### `↓` 

```
Build AI Context
```

##### `↓` 

```
Execute Workflow (n8n)
```

```
↓
```

```
Call AI Provider
```

##### `↓` 

```
Receive Response
```

##### `↓` 

```
Execute Remaining Workflow Steps
```

##### `↓` 

```
Calculate Token Usage
```

##### `↓` 

```
Deduct Tokens
```

```
↓
```

```
Store Logs
```

```
↓
Return Response
```

# **6.4 Supported Trigger Types** 

Website Widget 

Triggered when a visitor sends a message. 

Meta Messenger 

Triggered when a new Messenger conversation or message is received. 

API 

Triggered by an authenticated API request. 

Scheduled Trigger 

Triggered automatically based on the configured schedule. 

# **6.5 Execution Request** 

Every execution request contains: 

- Organization ID 

- Solution ID 

- Trigger Type 

- Trigger Source 

- User Identifier (if applicable) 

- Input Payload 

- Timestamp 

# **6.6 Authentication Validation** 

Before execution: 

Verify: 

- Organization exists 

- Subscription is active or within trial 

- Solution is active 

- Trigger is enabled 

- Token balance is sufficient 

If any validation fails, execution is rejected. 

# **6.7 Solution Loading** 

Load: 

- Solution Metadata 

- Current Version 

- Configuration 

- AI Instructions 

- Trigger Settings 

- Integration Settings 

# **6.8 Knowledge Loading** 

Load: 

- Organization Knowledge 

- Solution Knowledge 

Retrieve relevant content using semantic search. 

Return only the most relevant knowledge required for the current execution. 

# **6.9 AI Context Assembly** 

Create the AI request context using: 

- System Instructions 

- Business Context 

- Organization Information 

- Retrieved Knowledge 

- Current User Input 

- Previous Conversation Context (if applicable) 

The assembled context is passed to the workflow. 

# **6.10 Workflow Execution** 

Oceanier sends the execution request to the corresponding n8n workflow. 

The workflow is responsible for: 

- Business logic 

- AI provider calls 

- External integrations 

- Data processing 

- Returning the final output 

# **6.11 AI Provider Execution** 

Supported providers: 

- OpenAI 

- Anthropic Claude 

- Google Gemini 

- Kimi 

Provider selection is managed internally by Oceanier. 

The selected provider is not exposed to end users. 

# **6.12 External Integrations** 

A workflow may interact with: 

- Website Widget 

- Meta Messenger 

- REST API 

- Internal Knowledge Service 

Additional integrations are handled through n8n. 

# **6.13 Response Processing** 

After the workflow completes: 

Validate: 

- Response format 

- Output status 

- Token usage 

- Execution status 

Prepare response for delivery. 

# **6.14 Token Calculation** 

Each execution records: 

- Input Tokens 

- Output Tokens 

- Total Tokens 

Convert provider token usage into Oceanier Fuel consumption according to the platform's billing configuration. 

# **6.15 Token Deduction** 

Fuel is deducted only after a successful execution. 

If execution fails before an AI provider call, no Fuel is deducted. 

If provider usage occurs before failure, Fuel is deducted based on actual consumption. 

All deductions are recorded in the transaction history. 

# **6.16 Execution Logging** 

Each execution stores: 

- Execution ID 

- Organization 

- Solution 

- Trigger 

- Start Time 

- End Time 

- Duration 

- Status 

- Fuel Used 

- AI Provider 

- Workflow Version 

# **6.17 Execution Status** 

Available statuses: 

```
Queued
Running
Completed
```

```
Failed
Cancelled
```

# **6.18 Retry Logic** 

Automatic retry is supported for transient failures. 

Maximum retries: 

3 

Retry interval: 

Configurable per workflow. 

Retries are not attempted for authentication or validation failures. 

# **6.19 Error Handling** 

Errors include: 

- Invalid Configuration 

- Trigger Disabled 

- Knowledge Not Available 

- Provider Error 

- Workflow Failure 

- Token Limit Exceeded 

- Subscription Expired 

Return standardized error responses. 

# **6.20 Conversation Handling** 

For conversational Solutions: 

Store: 

- Conversation ID 

- Messages 

- Session Timestamp 

- Associated Solution 

- Associated Organization 

Conversation history is used to maintain context during future interactions. 

# **6.21 Scheduled Execution** 

Scheduled workflows execute automatically. 

Scheduler checks: 

- Trigger Status 

- Schedule Configuration 

- Solution Status 

- Subscription Status 

- Available Fuel 

Eligible workflows are queued for execution. 

# **6.22 Database Tables** 

## **workflow_executions** 

```
id
organization_id
solution_id
workflow_id
trigger_type
status
started_at
completed_at
duration_ms
fuel_used
provider
created_at
```

## **execution_inputs** 

```
id
execution_id
input_payload
created_at
```

## **execution_outputs** 

```
id
execution_id
output_payload
created_at
```

## **execution_errors** 

```
id
execution_id
error_code
error_message
created_at
```

## **conversations** 

```
id
organization_id
solution_id
visitor_identifier
started_at
updated_at
```

## **conversation_messages** 

```
id
conversation_id
sender
message
fuel_used
created_at
```

# **6.23 API Endpoints** 

## **Workflow Execution** 

```
POST /execute
```

## **Execution History** 

```
GET /executions
```

## **Execution Details** 

```
GET /executions/:id
```

## **Conversations** 

```
GET /conversations
```

```
GET /conversations/:id
```

# **6.24 Validation Rules** 

Execution requires: 

- Active organization 

- Active subscription or trial 

- Installed Solution 

- Enabled trigger 

- Valid configuration 

- Available Fuel 

All validations must succeed before execution begins. 

# **6.25 Business Logic** 

- Every execution is associated with one organization and one Solution. 

- AI context is assembled dynamically for each execution. 

- Knowledge retrieval occurs before AI provider invocation. 

- Fuel consumption is calculated from provider usage. 

- Successful executions update analytics. 

- Failed executions generate logs and optional retries. 

- Conversation history is maintained for conversational workflows. 

# **6.26 Acceptance Criteria** 

✓ Workflow executes when a valid trigger is received. 

✓ Configuration is loaded correctly. 

✓ Knowledge is retrieved successfully. 

✓ AI provider returns a response. 

✓ Fuel is calculated accurately. 

✓ Fuel is deducted after execution. 

- ✓ Execution logs are stored. 

✓ Conversation history is maintained. 

✓ Scheduled workflows execute automatically. 

✓ Errors are recorded and returned consistently. 

# **Chapter 7 — Fuel, Subscription & Billing Module** 

Version: MVP v1.0 

# **7.1 Module Objective** 

The Billing Module manages subscriptions, Fuel allocation, Fuel consumption, Fuel purchases, recurring billing, invoices, payment history, and subscription lifecycle. 

Every organization must have one active subscription or an active trial to execute AI Solutions. 

# **7.2 Module Features** 

The module includes: 

- Subscription Management 

- 7-Day Trial 

- Fuel Wallet 

- Fuel Consumption 

- Fuel Purchase 

- Monthly Renewal 

- Annual Renewal 

- Stripe Checkout 

- Invoice History 

- Payment History 

- Usage Reports 

- Subscription Upgrade 

- Subscription Downgrade 

- Subscription Cancellation 

# **7.3 Subscription Plans** 

Available plans 

### Starter 

- Monthly Billing 

- Annual Billing 

### Growth 

- Monthly Billing 

- Annual Billing 

### Business 

- Monthly Billing 

- Annual Billing 

### Enterprise 

- Custom Pricing 

# **7.4 Plan Structure** 

Each plan defines 

- Monthly Fuel Allocation 

- Maximum Team Members 

- Maximum Active Solutions 

- Maximum Knowledge Storage 

- Maximum Monthly Executions 

- Deployment Channels 

- API Access 

- Support Level 

Plan values are configurable through the Admin Panel. 

# **7.5 Trial** 

Every new organization receives 

- 7-Day Trial 

- Trial Fuel Allocation 

- Access to all platform features 

Trial begins immediately after organization creation. 

Trial status is stored with the subscription. 

# **7.6 Fuel Wallet** 

Each organization has one Fuel Wallet. 

The wallet stores: 

- Current Balance 

- Total Purchased 

- Total Consumed 

- Total Bonus Fuel 

- Last Updated 

The wallet is the only source of available Fuel. 

# **7.7 Fuel Lifecycle** 

```
Purchase Subscription
```

```
↓
```

```
Allocate Monthly Fuel
```

```
↓
```

```
Execute Workflow
```

```
↓
```

```
Deduct Fuel
```

```
↓
```

```
Fuel Balance Updated
```

```
↓
```

```
Purchase Additional Fuel (Optional)
```

```
↓
```

```
Continue Execution
```

# **7.8 Monthly Renewal** 

On successful renewal: 

- Renew subscription period 

- Allocate monthly Fuel 

- Generate invoice 

- Record payment 

Unused Fuel handling follows the configured platform policy. 

# **7.9 Annual Renewal** 

On successful annual renewal: 

- Extend subscription 

- Allocate Fuel according to annual plan configuration 

- Generate invoice 

- Record payment 

# **7.10 Fuel Purchase** 

Organizations can purchase additional Fuel at any time. 

Purchase Flow 

```
Select Fuel Package
```

```
↓
```

```
Stripe Checkout
```

```
↓
```

```
Payment Success
```

```
↓
```

```
Fuel Added
```

```
↓
```

```
Transaction Recorded
```

```
↓
```

```
Receipt Generated
```

# **7.11 Fuel Packages** 

Fuel packages are configurable. 

Each package contains: 

- Package Name 

- Fuel Amount 

- Price 

- Currency 

- Active Status 

# **7.12 Subscription Upgrade** 

### Flow 

```
Current Plan
```

```
↓
Choose New Plan
```

```
↓
Stripe Checkout
```

```
↓
```

```
Payment Success
```

```
↓
```

```
Subscription Updated
```

```
↓
Fuel Allocation Updated
```

```
↓
Invoice Generated
```

# **7.13 Subscription Downgrade** 

Downgrades become effective at the next renewal date. 

Current plan remains active until the billing period ends. 

# **7.14 Subscription Cancellation** 

Cancellation Flow 

```
Cancel Subscription
```

```
↓
Confirmation
```

```
↓
Subscription Ends at Renewal Date
↓
Workflows Paused
↓
Dashboard Remains Accessible
```

# **7.15 Fuel Consumption** 

Fuel is deducted after each successful execution. 

Each deduction records: 

- Organization 

- Solution 

- Execution 

- Provider Usage 

- Fuel Consumed 

- Timestamp 

# **7.16 Wallet Transactions** 

Transaction Types 

```
Trial Allocation
Monthly Allocation
```

```
Annual Allocation
```

```
Fuel Purchase
```

```
Workflow Consumption
Refund
```

```
Admin Adjustment
```

Every wallet modification creates a transaction. 

Wallet balances are never updated directly. 

# **7.17 Payment Processing** 

Payment Provider 

Stripe 

Supported Billing 

- Monthly 

- Annual 

- Fuel Purchase 

# **7.18 Stripe Events** 

Supported Webhooks 

- Checkout Completed 

- Subscription Created 

- Subscription Updated 

- Subscription Renewed 

- Subscription Cancelled 

- Invoice Paid 

- Invoice Failed 

- Payment Failed 

Each webhook updates the local database. 

# **7.19 Invoice History** 

Each invoice displays 

- Invoice Number 

- Date 

- Plan 

- Billing Period 

- Amount 

- Tax 

- Total 

- Status 

- Download PDF 

# **7.20 Payment History** 

Displays 

- Payment Date 

- Amount 

- Currency 

- Payment Method 

- Status 

# **7.21 Usage Dashboard** 

Displays 

Current Fuel Balance 

Fuel Used This Month 

Remaining Fuel 

Estimated Remaining Days 

Monthly Executions 

Top Fuel Consuming Solutions 

# **7.22 Billing Settings** 

Organization Owner can 

- Update Billing Address 

- Update Company Information 

- Change Payment Method 

- View Active Subscription 

- Manage Auto Renewal 

- Download Invoices 

# **7.23 Database Tables** 

## **subscriptions** 

```
id
organization_id
plan_id
status
billing_cycle
trial_start
trial_end
current_period_start
current_period_end
stripe_subscription_id
```

```
created_at
updated_at
```

## **plans** 

```
id
name
monthly_price
annual_price
monthly_fuel
max_members
max_solutions
knowledge_storage
max_executions
created_at
updated_at
```

## **wallets** 

```
id
organization_id
balance
total_purchased
total_consumed
total_bonus
updated_at
```

## **wallet_transactions** 

```
id
wallet_id
transaction_type
fuel_amount
reference_id
created_at
```

## **fuel_packages** 

```
id
name
fuel_amount
price
currency
status
created_at
```

## **invoices** 

```
id
organization_id
invoice_number
subscription_id
amount
currency
status
stripe_invoice_id
issued_at
```

## **payments** 

```
id
organization_id
invoice_id
amount
currency
payment_method
status
stripe_payment_id
paid_at
```

# **7.24 API Endpoints** 

## **Subscription** 

```
GET /subscription
```

```
PATCH /subscription
POST /subscription/upgrade
POST /subscription/cancel
```

## **Wallet** 

```
GET /wallet
GET /wallet/history
```

## **Fuel** 

```
GET /fuel/packages
```

```
POST /fuel/purchase
```

## **Billing** 

```
GET /billing/invoices
```

```
GET /billing/payments
```

```
PATCH /billing/payment-method
```

# **7.25 Validation Rules** 

- Organization must have an active subscription or trial to execute workflows. 

- Fuel purchases require successful payment confirmation. 

- Wallet balance cannot become negative. 

- Subscription upgrades require successful payment. 

- Billing actions are restricted to the Organization Owner. 

# **7.26 Business Logic** 

- One active subscription per organization. 

- One Fuel Wallet per organization. 

- Fuel is allocated according to the active subscription. 

- Every Fuel change creates a wallet transaction. 

- Fuel is deducted only after successful workflow execution. 

- Trial organizations follow the same billing logic, using trial allocations. 

- Subscription expiration pauses workflow execution until billing is restored. 

# **7.27 Acceptance Criteria** 

- ✓ New organizations receive a trial subscription. 

- ✓ Fuel Wallet is created automatically. 

- ✓ Monthly and annual subscriptions are supported. 

- ✓ Additional Fuel can be purchased. 

- ✓ Fuel is deducted correctly after workflow execution. 

- ✓ Wallet transactions are recorded. 

- ✓ Stripe payments update subscriptions. 

- ✓ Invoices are generated and accessible. 

- ✓ Subscription upgrades and cancellations work correctly. 

✓ Workflow execution is blocked when there is no active subscription or available Fuel. 

# **Chapter 8 — Dashboard, Analytics & Reporting** 

Version: MVP v1.0 

# **8.1 Module Objective** 

The Dashboard is the primary workspace after login. It provides organizations with a complete overview of their AI operations, Solution performance, Fuel usage, workflow activity, and business outcomes. 

All metrics displayed are organization-specific. 

# **8.2 Module Features** 

The Dashboard includes: 

- Business Overview 

- Fuel Overview 

- Installed Solutions 

- Recent Activity 

- Workflow Analytics 

- Lead Analytics 

- Conversation Analytics 

- Execution History 

- Quick Actions 

- Notifications 

# **8.3 Navigation** 

Sidebar 

```
Home
```

The Home page is the default route after onboarding. 

# **8.4 Dashboard Layout** 

Header 

### Displays: 

- Organization Name 

- Current Plan 

- Fuel Balance 

- User Menu 

Main Sections 

1. KPI Cards 

2. AI Activity 

3. Installed Solutions 

4. Workflow Analytics 

5. Recent Activity 6. Notifications 

# **8.5 KPI Cards** 

Display the following metrics: 

- Active Solutions 

- Total Workflow Executions 

- Total Conversations 

- Total Leads Captured 

- Fuel Remaining 

- Fuel Consumed (Current Month) 

- Estimated Hours Saved 

Each card links to its corresponding module. 

# **8.6 Fuel Widget** 

### Displays: 

- Current Fuel Balance 

- Monthly Allocation 

- Fuel Used This Month 

- Estimated Days Remaining 

Actions: 

- Buy Fuel 

- Upgrade Plan 

# **8.7 Installed Solutions Widget** 

Displays all installed Solutions. 

Each card includes: 

- Solution Name 

- Status 

- Deployment Channels 

- Last Execution 

- Fuel Used Today 

Actions: 

- Open 

- Pause 

- Resume 

# **8.8 Workflow Activity** 

Displays the latest workflow executions. 

Columns: 

- Time 

- Solution 

- Trigger 

- Status 

- Fuel Used 

####  Duration 

### Filters: 

- Today 

- 7 Days 

- 30 Days 

# **8.9 Conversation Analytics** 

### Displays: 

- Total Conversations 

- Active Conversations 

- Average Response Time 

- Average Conversation Length 

- AI Resolution Rate 

### Charts: 

- Daily Conversations 

- Weekly Conversations 

- Monthly Conversations 

# **8.10 Workflow Analytics** 

### Charts: 

### Workflow Executions 

- Daily 

- Weekly 

- Monthly 

### Success Rate 

- Successful Executions 

- Failed Executions 

Trigger Distribution 

Displays executions by: 

- Website Widget 

- Meta Messenger 

- API 

- Scheduled 

# **8.11 Fuel Analytics** 

Displays: 

- Daily Fuel Usage 

- Monthly Fuel Usage 

- Fuel Usage by Solution 

- Fuel Usage by Trigger 

### Charts: 

- Line Chart 

- Pie Chart 

# **8.12 Lead Analytics** 

Displays: 

- Total Leads 

- Qualified Leads 

- Meetings Booked 

- Conversion Rate 

### Charts: 

- Leads Over Time 

- Conversion Funnel 

# **8.13 Estimated Hours Saved** 

Calculation: 

Each successful workflow execution contributes to an estimated time saving. 

Dashboard displays: 

- Hours Saved Today 

- Hours Saved This Month 

- Lifetime Hours Saved 

# **8.14 Recent Activity** 

Displays chronological events: 

Examples: 

- Solution Installed 

- Solution Updated 

- Workflow Executed 

- Fuel Purchased 

- Knowledge Uploaded 

- Team Member Invited 

- Custom Request Submitted 

# **8.15 Notifications** 

Displays: 

- Trial Expiring 

- Subscription Renewal 

- Fuel Running Low 

- Failed Workflows 

- New Platform Updates 

Notifications are dismissible. 

# **8.16 Quick Actions** 

Buttons: 

- Install Solution 

- Upload Knowledge 

- Buy Fuel 

- Request Custom AI Solution 

# **8.17 Reports** 

Users can generate reports for: 

- Workflow Usage 

- Fuel Consumption 

- Solution Performance 

- Conversation Statistics 

- Lead Generation 

Export formats: 

- CSV 

- PDF 

# **8.18 Date Filters** 

Available filters: 

- Today 

- Last 7 Days 

- Last 30 Days 

- Last 90 Days 

- Custom Range 

All dashboard metrics respect the selected date range. 

# **8.19 Database Tables** 

## **dashboard_snapshots** 

```
id
organization_id
snapshot_date
active_solutions
workflow_executions
fuel_used
conversations
leads
hours_saved
created_at
```

## **notifications** 

```
id
organization_id
title
message
type
status
created_at
```

## **activity_logs** 

```
id
organization_id
activity_type
reference_id
description
created_at
```

# **8.20 API Endpoints** 

## **Dashboard** 

```
GET /dashboard
```

## **Analytics** 

```
GET /analytics/workflows
```

```
GET /analytics/fuel
```

```
GET /analytics/conversations
```

```
GET /analytics/leads
```

## **Reports** 

```
POST /reports/export
```

## **Notifications** 

```
GET /notifications
```

```
PATCH /notifications/:id/read
```

## **Activity** 

```
GET /activities
```

# **8.21 Validation Rules** 

- Dashboard data is restricted to the active organization. 

- Reports respect the selected date range. 

- Only available metrics are included in exports. 

- Notifications are user-specific within the organization. 

# **8.22 Business Logic** 

- Dashboard metrics are generated from execution logs and transaction history. 

- Fuel analytics use wallet transactions. 

- Workflow analytics use execution records. 

- Conversation analytics use conversation history. 

- Lead analytics use captured lead records. 

- Activity logs are generated automatically from platform events. 

- Notifications are created by system events and administrative actions. 

# **8.23 Acceptance Criteria** 

✓ Dashboard loads after successful onboarding. 

- ✓ KPI cards display current organization metrics. 

- ✓ Fuel balance is updated in real time. 

- ✓ Installed Solutions show current status. 

- ✓ Workflow analytics display accurate execution data. 

- ✓ Fuel analytics reflect wallet transactions. 

- ✓ Conversation and lead analytics are available. 

- ✓ Recent activity logs are displayed chronologically. 

- ✓ Reports can be exported. 

- ✓ Notifications are delivered and can be marked as read. 

# **Chapter 9 — Parley AI Assistant** 

Version: MVP v1.0 

# **9.1 Module Objective** 

Parley is Oceanier's built-in AI Assistant. 

Parley is the primary interface between the user and the platform. It helps users discover Solutions, configure workflows, answer platform questions, modify existing configurations, and submit custom AI solution requests. 

Parley does **not** create arbitrary workflows directly. It works only with Oceanier's published Solutions and configuration system. 

# **9.2 Module Features** 

The module includes: 

- AI Chat Interface 

- Business Context Awareness 

- Platform Navigation 

- Solution Recommendation 

- Solution Configuration 

- Prompt Editing Assistance 

- Trigger Configuration Assistance 

- Knowledge Upload Assistance 

- Custom AI Solution Request 

- Conversation History 

# **9.3 Navigation** 

Parley is accessible from every authenticated page. 

Desktop: 

- Floating chat button (bottom-right) 

- Expandable side panel 

Mobile: 

- Full-screen modal 

# **9.4 User Interface** 

### Header 

Displays: 

- Parley Avatar 

- "Ask Parley" 

- New Conversation 

- Conversation History 

### Chat Area 

### Displays: 

- User messages 

- AI responses 

- Loading state 

- Typing indicator 

### Input Area 

Components: 

- Text input 

- Attach file button 

- Send button 

# **9.5 Initial Context** 

Every conversation automatically includes: 

- Organization Profile 

- Installed Solutions 

- Active Subscription 

- Current Fuel Balance 

- Available Knowledge Sources 

This context is loaded without user interaction. 

# **9.6 Supported User Actions** 

Parley can assist with: 

- Finding a Solution 

- Installing a Solution 

- Configuring a Solution 

- Editing AI Instructions 

- Changing Trigger Settings 

- Uploading Knowledge 

- Viewing Fuel Usage 

- Explaining platform features 

- Creating a Custom AI Solution Request 

# **9.7 Solution Recommendation** 

When asked for automation suggestions, Parley: 

1. Reviews the Business Profile. 

2. Identifies relevant automation goals. 

3. Searches published Solutions. 

4. Returns a ranked list of recommended Solutions. 

Each recommendation includes: 

- Solution Name 

- Purpose 

- Estimated Fuel Usage 

- Install Action 

# **9.8 Configuration Assistance** 

Parley can update configuration fields through conversation. 

Example: 

User: 

Change my support email. 

Parley: 

- Validates the request. 

- Updates the Solution configuration. 

- Confirms the change. 

# **9.9 Prompt Editing** 

Users may ask Parley to update AI Instructions. 

Example: 

Make the chatbot sound more professional. 

Parley edits the appropriate prompt section and requests confirmation before saving. 

Prompt changes are stored in the Solution's configuration. 

# **9.10 Trigger Configuration** 

Parley can update: 

- Trigger Type 

- Business Hours 

- Schedule 

- Enable / Disable Trigger 

Changes are validated before saving. 

# **9.11 Knowledge Assistance** 

Parley can: 

- Recommend missing knowledge. 

- Explain why additional documents may improve results. 

- Guide users to upload files or website URLs. 

Uploads are completed through the Knowledge module. 

# **9.12 Platform Navigation** 

Users can ask: 

- "Where are my invoices?" 

- "Open my Fuel history." 

- "Show my installed Solutions." 

Parley responds with a short explanation and navigates the user to the relevant page. 

# **9.13 Custom AI Solution Request** 

If Parley determines that the requested automation cannot be fulfilled using existing Solutions, it offers the user the option to submit a Custom AI Solution Request. 

The request form contains: 

- Contact Name 

- Email 

- Organization 

- Problem Description 

- Desired Outcome 

After submission: 

- The request is stored. 

- A confirmation is shown. 

- The Admin Panel receives the new request. 

No pricing is shown during submission. 

# **9.14 Conversation History** 

Each conversation stores: 

- Conversation ID 

- Organization ID 

- User ID 

- Title 

- Messages 

- Created Date 

- Updated Date 

Users can: 

- View previous conversations. 

- Rename conversations. 

- Delete conversations. 

# **9.15 Conversation Actions** 

Available actions: 

- New Conversation 

- Rename 

- Delete 

- Continue 

# **9.16 AI Response Types** 

Parley responses may include: 

- Plain text 

- Recommended Solutions 

- Configuration confirmation 

- Navigation actions 

- Validation errors 

Responses are rendered according to their type. 

# **9.17 Database Tables** 

## **parley_conversations** 

```
id
organization_id
user_id
title
created_at
updated_at
```

## **parley_messages** 

```
id
conversation_id
sender
message
fuel_used
created_at
```

## **custom_solution_requests** 

```
id
organization_id
contact_name
email
problem_description
desired_outcome
status
created_at
updated_at
```

# **9.18 API Endpoints** 

## **Parley** 

```
POST /parley/chat
```

## **Conversations** 

```
GET /parley/conversations
```

```
GET /parley/conversations/:id
DELETE /parley/conversations/:id
```

## **Custom Requests** 

```
POST /custom-requests
```

```
GET /custom-requests
```

# **9.19 Validation Rules** 

- User must belong to an active organization. 

- Only organization data may be accessed. 

- Configuration changes require valid target Solutions. 

- Prompt updates require confirmation. 

- Trigger updates must pass schedule validation. 

- Custom request submissions require all mandatory fields. 

# **9.20 Business Logic** 

- Parley operates within the context of the active organization. 

- Recommendations are generated from the Business Profile and published Solutions. 

- Configuration changes update the underlying Solution configuration. 

- Prompt modifications update the Solution's AI Instructions. 

- Navigation requests redirect users to the appropriate module. 

- Custom AI Solution Requests are stored and made available to administrators for follow-up. 

# **9.21 Acceptance Criteria** 

✓ Users can chat with Parley from any authenticated page. 

✓ Parley provides Solution recommendations. 

✓ Parley updates Solution configurations. 

- ✓ Parley assists with prompt editing. 

- ✓ Parley modifies Trigger Settings. 

✓ Parley guides users to the Knowledge module. 

✓ Parley navigates users to relevant pages. 

✓ Users can submit Custom AI Solution Requests. 

✓ Conversation history is persistent and manageable. 

✓ All actions are restricted to the active organization. 

# **Chapter 10 — Admin Panel** 

Version: MVP v1.0 

# **10.1 Module Objective** 

The Admin Panel is an internal system used exclusively by Oceanier staff to manage the platform, publish Solutions, monitor organizations, handle billing, process custom AI solution requests, and oversee platform operations. 

The Admin Panel is not accessible to customers. 

# **10.2 Admin Roles** 

Super Admin 

Full platform access. 

Permissions: 

- Manage all organizations 

- Manage all Solutions 

- Manage subscriptions 

- Manage Fuel packages 

- View analytics 

- View workflow executions 

- Manage custom requests 

- Manage platform settings 

Admin 

Permissions: 

- Manage Solutions 

- Review custom requests 

- View organizations 

- View analytics 

### Cannot: 

- Delete organizations 

- Change billing configuration 

- Modify system settings 

# **10.3 Admin Navigation** 

### Sidebar 

```
Dashboard
Organizations
Solutions
Custom Requests
```

```
Subscriptions
Fuel Packages
Workflow Executions
Platform Analytics
Settings
```

# **10.4 Admin Dashboard** 

### Displays platform-wide KPIs. 

### Cards: 

- Total Organizations 

- Active Trials 

- Paid Organizations 

- Active Solutions 

- Total Workflow Executions 

- Monthly Revenue 

- Fuel Consumed 

- Open Custom Requests 

Charts: 

- New Organizations 

- Revenue 

- Workflow Executions 

- Fuel Usage 

# **10.5 Organizations Module** 

Displays all organizations. 

Columns: 

- Organization Name 

- Plan 

- Trial Status 

- Subscription Status 

- Fuel Balance 

- Active Solutions 

- Members 

- Created Date 

Actions: 

- View 

- Suspend 

- Reactivate 

# **10.6 Organization Details** 

Displays: 

Company Information 

- Name 

- Website 

- Industry 

- Country 

Subscription 

- Plan 

- Renewal Date 

- Billing Cycle 

Fuel Wallet 

- Current Balance 

- Monthly Usage 

Installed Solutions Recent Activity Members 

# **10.7 Solutions Module** 

Displays all published Solutions. 

Columns: 

- Name 

- Category 

- Current Version 

- Status 

- Total Installations 

- Monthly Executions 

Actions: 

- Create 

- Edit 

- Publish 

- Unpublish 

- Archive 

# **10.8 Create Solution** 

Fields: 

- Solution Name 

- Category 

- Description 

- Icon 

- Estimated Fuel Usage 

- Current Version 

Configuration Schema 

Prompt Template 

Trigger Configuration 

Deployment Channels 

Knowledge Requirements 

Status 

# **10.9 Edit Solution** 

Editable: 

- Metadata 

- Prompt Template 

- Configuration Schema 

- Trigger Schema 

- Deployment Channels 

- Version Notes 

Publishing creates a new version. 

Existing customer configurations are preserved. 

# **10.10 Custom AI Solution Requests** 

Displays submitted requests. 

Columns: 

- Organization 

- Contact Name 

- Submission Date 

- Status 

### Statuses: 

```
New
```

```
Under Review
```

```
Quoted
```

```
Accepted
```

```
Development
Completed
Rejected
Closed
```

### Actions: 

- View 

- Assign 

- Update Status 

- Add Internal Notes 

# **10.11 Request Details** 

Displays: 

- Organization 

- Contact Information 

- Business Description 

- Requested Solution 

- Desired Outcome 

- Attached Files 

- Internal Notes 

# **10.12 Subscription Management** 

Displays: 

- Organization 

- Plan 

- Billing Cycle 

- Renewal Date 

- Status 

Actions: 

- Upgrade 

- Downgrade 

- Cancel 

- Reactivate 

# **10.13 Fuel Package Management** 

Displays available Fuel packages. 

Fields: 

- Package Name 

- Fuel Amount 

- Price 

- Currency 

- Status 

Actions: 

- Create 

- Edit 

- Disable 

# **10.14 Workflow Executions** 

Displays platform-wide execution history. 

Columns: 

- Organization 

- Solution 

- Trigger 

- Status 

- Fuel Used 

- Duration 

- Provider 

- Timestamp 

Filters: 

- Organization 

- Solution 

- Status 

- Date Range 

# **10.15 Platform Analytics** 

### Displays: 

### Organizations 

- Growth 

- Churn 

- Trial Conversion 

### Revenue 

- MRR 

- ARR 

- Fuel Sales 

### Usage 

- Executions 

- Conversations 

- Fuel Consumption 

### Solutions 

- Most Installed 

- Most Active 

- Highest Fuel Consumption 

# **10.16 Settings** 

Platform configuration: 

- Default Trial Duration 

- Default Fuel Allocation 

- Stripe Configuration 

- Email Templates 

- Platform Announcements 

# **10.17 Notifications** 

Admins receive notifications for: 

- New Organizations 

- Trial Expirations 

- Payment Failures 

- New Custom Requests 

- Workflow Failures 

# **10.18 Database Tables** 

## **admin_notes** 

```
id
request_id
admin_id
note
created_at
```

## **solution_versions** 

```
id
solution_id
version
release_notes
published_at
published_by
```

## **platform_settings** 

```
key
value
updated_at
```

# **10.19 API Endpoints** 

## **Organizations** 

```
GET /admin/organizations
```

```
GET /admin/organizations/:id
```

```
PATCH /admin/organizations/:id
```

## **Solutions** 

```
GET /admin/solutions
```

```
POST /admin/solutions
```

```
PATCH /admin/solutions/:id
```

```
POST /admin/solutions/:id/publish
```

## **Custom Requests** 

```
GET /admin/custom-requests
```

```
PATCH /admin/custom-requests/:id
```

## **Billing** 

```
GET /admin/subscriptions
```

```
PATCH /admin/subscriptions/:id
```

## **Fuel** 

```
GET /admin/fuel-packages
```

```
POST /admin/fuel-packages
```

```
PATCH /admin/fuel-packages/:id
```

## **Analytics** 

```
GET /admin/analytics
```

# **10.20 Validation Rules** 

- Admin routes require authenticated admin users. 

- Publishing requires a valid Solution configuration. 

- Organization suspension immediately pauses workflow execution. 

- Fuel package prices must be greater than zero. 

- Status changes are logged for auditing. 

# **10.21 Business Logic** 

- Admin actions are audited. 

- Publishing creates immutable Solution versions. 

- Customer-specific configurations remain unchanged after Solution updates. 

- Custom requests progress through predefined status stages. 

- Platform analytics aggregate organization-level metrics. 

- Platform settings affect newly created organizations unless otherwise specified. 

# **10.22 Acceptance Criteria** 

- ✓ Admins can manage organizations. 

- ✓ Admins can create and publish Solutions. 

- ✓ Version history is maintained. 

- ✓ Custom AI Solution Requests can be tracked and updated. 

- ✓ Subscriptions and Fuel packages can be managed. 

- ✓ Platform-wide analytics are available. 

- ✓ Administrative actions are restricted by role. 

✓ All critical actions are logged. 

