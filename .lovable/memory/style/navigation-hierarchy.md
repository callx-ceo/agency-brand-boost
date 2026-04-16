---
name: Navigation Hierarchy
description: Sidebar uses collapsible accordion sections; workspace subtabs are nested in sidebar under My Workspace
type: design
---
All three sidebars (SuperAdmin, Agency, Publisher) use collapsible accordion-style section headers.
- Sections collapse/expand on click with chevron indicators.
- The section containing the active view auto-expands.
- Multiple sections can be open simultaneously.
- SuperAdmin Reports section has a nested collapsible for "All Reports" sub-items.
- "My Workspace" is a collapsible sidebar section with subtabs: Live Calls, My History, My Contacts, My Applications, My Calendar, My Referrals, My Settings, My Support.
- Workspace subtab IDs use `workspace-` prefix (e.g., `workspace-live-calls`, `workspace-history`, `workspace-calendar`).
- LiveCallWorkspace component accepts `activeTab` prop — no internal tab bar.
- Use semantic tokens (text-primary, bg-primary/10, text-muted-foreground, bg-muted) for active/hover states.
