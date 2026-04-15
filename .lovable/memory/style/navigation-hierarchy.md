---
name: Navigation Hierarchy
description: Sidebar uses collapsible accordion sections; only active section auto-expands
type: design
---
All three sidebars (SuperAdmin, Agency, Publisher) use collapsible accordion-style section headers.
- Sections collapse/expand on click with chevron indicators.
- The section containing the active view auto-expands.
- Multiple sections can be open simultaneously.
- SuperAdmin Reports section has a nested collapsible for "All Reports" sub-items.
- My Workspace subtabs (Live Calls, My History, My Contacts, My Applications, My Referrals, My Settings, My Support) live inside the workspace view, not as sidebar items.
- Use semantic tokens (text-primary, bg-primary/10, text-muted-foreground, bg-muted) for active/hover states.
