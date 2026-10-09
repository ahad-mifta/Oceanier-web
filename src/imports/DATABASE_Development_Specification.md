# 

# Module 01 — Authentication & Database (MVP)

---

# System Architecture

```
User
    │
    ▼
Supabase Auth
    │
    ▼
User Profile
    │
    ▼
Businesses
    │
    ├──────────────┐
    │              │
Business 1     Business 2
    │              │
    ▼              ▼
Installed Crews
    │
Knowledge Base
    │
Workflow Executions
```

---

# Authentication Flow

Oceanier will use **Supabase Authentication**.

Authentication methods:

- Email + Password
- Google Login (OAuth)

No phone authentication.

No magic link.

No social login besides Google for MVP.

---

## User Signup Flow

```
Signup

↓

Email

↓

Password

↓

Confirm Password

↓

Email Verification

↓

Create User Profile

↓

Redirect to Dashboard

↓

If no Business exists

↓

Start Onboarding
```

---

## Login Flow

```
Login

↓

Supabase Auth

↓

JWT Session

↓

Load User Profile

↓

Load Businesses

↓

Open Dashboard
```

---

## Forgot Password

Flow:

```
Forgot Password

↓

Email

↓

Reset Link

↓

New Password

↓

Login
```

---

# Session Management

Supabase manages:

- Access Token
- Refresh Token

Frontend stores only the Supabase session.

No custom JWT implementation.

---

# User Roles

Only two roles exist.

## User

Default.

Can manage only their own businesses.

---

## Admin

Oceanier internal staff.

Can:

- View users
- Manage crews
- Manage custom requests
- Manage pricing
- View analytics

Admin accounts are manually assigned in the database.

---

# Database Structure

---

# Table: profiles

Stores user information.

```
id (uuid)

auth_user_id (uuid)

full_name

email

avatar_url

country

timezone

created_at

updated_at
```

Relationship:

```
1 User

↓

1 Profile
```

---

# Table: businesses

Each user can create unlimited businesses.

Example:

John

↓

Business 1

ABC Restaurant

Business 2

XYZ Real Estate

Business 3

ABC Fashion

---

Fields

```
id

profile_id

business_name

slug

industry

website

description

logo_url

country

timezone

currency

business_size

created_at

updated_at
```

Relationship

```
Profile

↓

Businesses
```

One-to-Many

---

# Business Status

```
active

inactive

deleted
```

Never hard delete.

---

# Table: business_settings

Separate configuration.

```
id

business_id

language

default_ai_provider

timezone

notification_email

branding_color

created_at
```

---

# Table: subscriptions

Subscription belongs to the user account, not each business.

Reason:

One customer pays once.

Uses multiple businesses.

Fields

```
id

profile_id

plan

billing_cycle

status

started_at

expires_at
```

---

# Table: fuel_wallet

Single wallet.

Shared across businesses.

Fields

```
id

profile_id

balance

trial_balance

last_updated
```

---

# Table: fuel_transactions

```
id

wallet_id

business_id

type

credits

usd_cost

description

created_at
```

Examples

```
+500 Monthly Credits

-14 AI Chat

-120 Workflow Run

+100 Purchased Credits
```

---

# Table: ai_solutions

Master catalog.

Oceanier managed only.

Examples

```
Customer Support

Lead Qualification

Meta Automation

Email Assistant
```

Fields

```
id

name

slug

description

category

icon

thumbnail

status

is_featured

current_version

created_at
```

---

# Table: solution_versions

Stores workflow definitions.

```
id

solution_id

version

configuration_json

workflow_json

prompt_json

published

created_at
```

Every update creates a new version.

Never overwrite.

---

# Table: installed_solutions

This is the most important table.

Relationship

```
Business

↓

Installed Solution
```

Example

ABC Restaurant

↓

Customer Support

↓

Own configuration

XYZ Fashion

↓

Customer Support

↓

Different configuration

Fields

```
id

business_id

solution_id

version_id

display_name

status

installed_at

last_execution
```

---

# Table: solution_configuration

Stores user customizations.

```
id

installed_solution_id

configuration_json

prompt_overrides

trigger_settings

created_at

updated_at
```

Everything configurable is stored here.

No duplicated workflow code.

---

# Table: knowledge_sources

Business-specific knowledge.

```
id

business_id

type

status

created_at
```

Types

```
Website

PDF

FAQ

Text

URL
```

---

# Table: knowledge_files

```
id

knowledge_source_id

filename

storage_path

mime_type

file_size

processed

created_at
```

---

# Table: website_sources

```
id

knowledge_source_id

website_url

crawl_depth

last_crawled

status
```

---

# Table: faqs

```
id

business_id

question

answer

created_at
```

---

# Table: ai_providers

Master table.

```
id

name

model

provider

cost_input

cost_output

enabled
```

Examples

GPT-5

Claude

Gemini

Kimi

---

# Table: workflow_executions

Stores every run.

```
id

business_id

installed_solution_id

trigger_type

status

started_at

finished_at

fuel_used

provider

model
```

---

# Table: execution_logs

Detailed logs.

```
id

execution_id

step_name

status

input_json

output_json

duration_ms

created_at
```

---

# Table: custom_solution_requests

Generated when users request something beyond the built-in Solutions.

```
id

profile_id

business_id

title

description

website

priority

status

admin_notes

quoted_price

created_at
```

Status

```
Pending

Reviewing

Quoted

Accepted

Building

Completed

Cancelled
```

---

# Row Level Security (RLS)

Every table that contains customer data must enforce ownership.

Policy pattern:

```
profiles.id == auth.uid()
```

Business data:

```
business.profile_id == auth.uid()
```

Installed Solutions:

```
installed_solution.business.profile_id == auth.uid()
```

Knowledge:

```
knowledge.business.profile_id == auth.uid()
```

Workflow executions:

```
execution.business.profile_id == auth.uid()
```

This ensures users can only access their own data without requiring application-layer filtering.

---

# Storage Buckets

Use Supabase Storage with separate buckets for clarity and security:

```
avatars
```

```
business-logos
```

```
knowledge-files
```

```
solution-assets
```

```
temp-uploads
```

Each bucket should have access policies tied to the authenticated user's ownership.

---

# MVP Database Relationships

```
Profile
│
├── Businesses
│     │
│     ├── Business Settings
│     │
│     ├── Installed Solutions
│     │      │
│     │      ├── Solution Configuration
│     │      ├── Workflow Executions
│     │      └── Execution Logs
│     │
│     ├── Knowledge Sources
│     │      ├── Knowledge Files
│     │      ├── Website Sources
│     │      └── FAQs
│     │
│     └── Custom Solution Requests
│
├── Subscription
│
└── Fuel Wallet
       │
       └── Fuel Transactions

AI Solutions
│
└── Solution Versions
```