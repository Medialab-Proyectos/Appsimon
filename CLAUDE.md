# CLAUDE.md

Next.js 16 + React 19 + TypeScript app, wrapped with Capacitor for Android. Deployed to Vercel (appsimon.vercel.app); the Android app loads the hosted site via Capacitor `server.url`.

## Commands

- `npm run dev` — Next dev server
- `npm run build` — production build (outputs to `out/` for Capacitor `webDir`)
- `npm start` — serve built app
- `npm run lint` — ESLint

## Structure

- `app/` — Next.js App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/ui/` — shadcn/ui Radix primitives
- `components/simon/` — app-specific components
- `components/theme-provider.tsx` — next-themes wrapper
- `hooks/`, `lib/utils.ts` — shared helpers (`cn` etc.)
- `android/` — Capacitor Android project
- `capacitor.config.ts` — appId `com.appsimon.app`, loads remote URL
- `styles/` — Tailwind/global styles

## Stack notes

- UI: Tailwind + shadcn/ui (Radix) + lucide-react; `components.json` configures shadcn
- Forms: react-hook-form + zod via `@hookform/resolvers`
- Charts: recharts; Toasts: sonner
- Package manager: npm (pnpm-lock was removed so Vercel uses npm — do not reintroduce it)
- Capacitor 6, targets Android only

# Claude Workspace

## Read first

Always read these files before doing design or audit work:

- ./context/project-context.md
- ./context/business-rules.md
- ./context/design-principles.md

These files are the source of truth for:

- product context
- business constraints
- design expectations
- UX principles
- domain rules

Do not skip them.

## Main agents

Primary agents for UX work:

- ux-interface-orchestrator
- ux-auditor-orchestrator

## When to use each agent

### Use `ux-interface-orchestrator` when the user asks to:

- create a new interface
- redesign a screen
- propose a flow
- generate structure, wireframes or UI direction
- define layout, components or interaction model

### Use `ux-auditor-orchestrator` when the user asks to:

- audit a screen, flow or product
- evaluate usability
- detect friction, anti-patterns or UX risks
- review accessibility, microcopy or IA
- prioritize UX findings and recommendations

## Available skills

- behavioral-ux
- creative-ui-landing
- ia-ux-architect
- ui-master-audit
- ux-accessibility-ergonomics
- ux-core-cognitive-biases
- ux-engagement
- ux-iso-ieee
- ux-klm-goms
- ux-microcopy-audit
- ux-ui-patterns
- zero-ui-game-ux
- ux-narrative-hero-journey
- cx-digital-experience

## Skill selection rules

Do not use all skills at once.
Select only the skills that materially improve the task.

### For interface creation

Prioritize:

- ia-ux-architect
- ux-ui-patterns
- ui-master-audit
- ux-accessibility-ergonomics
- ux-microcopy-audit

Add only if relevant:

- behavioral-ux
- ux-engagement
- zero-ui-game-ux
- creative-ui-landing
- ux-narrative-hero-journey
- cx-digital-experience

### For UX audits

Prioritize:

- ux-ui-patterns
- ux-accessibility-ergonomics
- ux-microcopy-audit
- ia-ux-architect
- ux-klm-goms
- ux-iso-ieee

Add only if relevant:

- behavioral-ux
- ux-core-cognitive-biases
- ux-engagement
- zero-ui-game-ux
- ux-narrative-hero-journey
- ui-master-audit
- cx-digital-experience

## Agent behavior

When asked to create an interface:

1. Read context files
2. Identify product, user, device and flow type
3. Select only relevant skills
4. Build structure and task flow first
5. Refine with interaction patterns, microcopy, accessibility and visual quality
6. Self-audit before final output

When asked to audit an interface or flow:

1. Read context files
2. Identify the user goal and task being evaluated
3. Detect which UX layers need review:
   - UI
   - IA
   - accessibility
   - microcopy
   - efficiency
   - behavioral design
   - CX
4. Select only the relevant skills
5. Produce evidence-based findings
6. Prioritize by severity and impact
7. Recommend concrete actions, not generic advice

## Audit output format

When using `ux-auditor-orchestrator`, always return:

- Executive summary
- Prioritized findings
- Evidence
- Why it is a problem
- User impact
- Business impact
- Severity
- Recommendation
- Quick wins
- Strategic improvements
- Skills used and why

## Quality bar

Always:

- be specific
- justify findings
- connect recommendations to evidence
- avoid generic UX advice
- avoid theory dumping
- prioritize actionable output
