# CallX Platform Sitemap

## Main Application Routes

### Public Routes
- `/` - **Homepage** - Landing page with role selection
- `/guide` - **Guide Dashboard** (Coming Soon)
- `/*` - **404 Not Found** - Error page for invalid routes

### Portal Routes
- `/agency` - **Agency Portal** (Full dashboard interface)
- `/super-admin` - **Super Admin Portal** (Platform management)
- `/agent` - **Agent Dashboard** (Agent interface)
- `/publisher` - **Publisher Dashboard** (Coming Soon)
- `/advertiser` - **Advertiser Dashboard** (Coming Soon)

---

## Agency Portal Structure (`/agency`)

### Dashboard Section
- **Dashboard** - Main agency overview and KPIs

### Business Operations
- **Offers** - Manage agency offers and campaigns
- **Realtime Report** - Real-time call monitoring and analytics
- **Applications** - Track customer applications and conversions
- **Call History** - Historical call records with AI summaries
- **Contacts** - Contact management and lead tracking
- **Leads List** - Comprehensive lead management

### Settings & Configuration
- **General** - Basic agency settings and configuration
- **Team Members** - Agent management and team administration
- **Campaigns** - Campaign setup and management
- **Scripts & AI** - Call scripts and AI prompt customization
- **Publishers** - Publisher relationships and management
- **Referrals** - Referral program configuration
- **Notifications** - Alert and notification preferences
- **Upgrade Plans** - Subscription and billing management

### Additional Report Views
- **Agent Reports** - Detailed agent performance analytics
- **Contacts Reports** - Lead and contact analytics
- **Call Credits Management** - Agent bid settings and credit management

---

## Super Admin Portal Structure (`/super-admin`)

### Dashboard & Analytics
- **Executive Dashboard** - High-level platform overview and KPIs
- **Advanced Analytics** - Deep-dive analytics and business intelligence
- **Compliance Reporting** - Regulatory compliance monitoring

### Reports (17 Types)
#### Campaign & Call Reports
- **Realtime** - Live call monitoring across all agencies
- **Campaigns** - Campaign performance analytics
- **Campaigns by Publisher** - Publisher-specific campaign data
- **Publisher by Manager** - Manager performance by publisher
- **IVR Fees** - Interactive Voice Response cost tracking
- **Key Press** - Call interaction analytics

#### Offer & Revenue Reports
- **Offers** - Offer performance across platform
- **Offers by Publisher** - Publisher-specific offer data
- **Promo Numbers** - Promotional number tracking
- **Offers by Promo #** - Performance by promotional numbers

#### Entity Performance Reports
- **Advertisers** - Advertiser performance and spend
- **Publishers** - Publisher performance and revenue
- **Agents** - Individual agent performance metrics
- **Agent List Report** - Comprehensive agent listing and stats
- **Agencies** - Agency performance comparison

### Entity Management
- **Agencies** - Agency onboarding, management, and oversight
- **Agents** - Cross-agency agent management
- **Advertisers** - Advertiser relationship and campaign management
- **Publishers** - Publisher network management
- **Campaigns** - Platform-wide campaign oversight
- **Offers** - Offer creation, management, and optimization

### Agency Management
- **Agency Applications** - New agency application processing
- **Products** - Product catalog and configuration
- **Carriers** - Insurance carrier management and integration

### Lead & Contact Management
- **Leads Management** - Platform-wide lead tracking and distribution
- **Contacts Management** - Global contact database management
- **Customer Management** - End customer relationship management

### System & Administration
- **System Health** - Platform monitoring, alerts, and diagnostics
- **User & Role Management** - User permissions and access control
- **Goals Management** - Platform-wide goal setting and tracking
- **AI Prompt Management** - AI script and prompt configuration
- **Cost & API Management** - Cost tracking and API integration management
- **Minimum Bid Management** - Vertical-specific minimum bid configuration
- **Call Settings Management** - Global call routing and settings
- **Platform Settings** - Core platform configuration

### Special Views
- **Agency Agents View** - Detailed view of agents within specific agencies
- **Offer Statistics** - Detailed offer performance analytics
- **Offer Details** - Comprehensive offer information and management

---

## Agent Dashboard Structure (`/agent`)

### Main Sections
- **Dashboard** - Agent performance overview and daily metrics
- **Applications** - Customer application management
- **Call History** - Personal call history and summaries
- **Contacts** - Agent-specific contact management
- **Settings** - Personal agent settings and preferences
- **Insights** - Performance insights and recommendations

### Call Management
- **Active Calls** - Live call interface and controls
- **Call Scripts** - Dynamic script delivery during calls
- **Call Disposition** - Post-call categorization and notes
- **Client Information** - Customer data during calls

---

## Navigation Patterns

### Agency Portal Navigation
- **Sidebar Navigation** - Collapsible sidebar with categorized sections
- **Tab-based Views** - Multi-tab interfaces for complex sections
- **Modal Dialogs** - Detailed forms and information overlays

### Super Admin Navigation
- **Hierarchical Sidebar** - Expandable sections with sub-menus
- **Breadcrumb Navigation** - Clear path indication in deep views
- **Context Switching** - Easy switching between agencies and entities

### Common UI Patterns
- **Search & Filtering** - Consistent search patterns across all data tables
- **Export Functionality** - Data export capabilities for reports
- **Real-time Updates** - Live data updates where applicable
- **Responsive Design** - Mobile-friendly interfaces across all portals

---

## Data Flow & Integrations

### Inter-Portal Relationships
- **Agency ↔ Super Admin** - Agency management and oversight
- **Agent ↔ Agency** - Agent performance tracking and management
- **Leads → All Portals** - Lead distribution and tracking across portals

### External Integrations
- **Supabase Backend** - Database and authentication
- **API Integrations** - Third-party service connections
- **Real-time Communications** - Live call and data streaming

---

*Last Updated: January 2025*
*Platform Version: CallX v2.0*