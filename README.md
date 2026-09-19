# Memoria
Project Implementation Plan
Mobile app for dementia caregiving instruction and emergency guidance — React Native (Figma Dev Mode → JSX) + Expo, runnable in Expo Go

1. Overview
Memoria teaches caregivers and family members how to care for dementia patients: daily-care steps, warning signs, emergency response, and the medical/behavioral context behind each practice (non-verbal cues, mood shifts, dignity-preserving communication). 26 Figma frames (mobile, 412×917) define the full UI. This plan turns those frames into a working React Native app that runs on a real phone through Expo Go.
This revision replaces the earlier React web plan. The screens, feature set, and data model are unchanged; the UI layer, navigation, notification mechanism, and delivery method are not. The frames were always designed at phone size, so building natively removes the browser-emulating-a-phone compromise rather than adding scope.

2. Tech Stack
Frontend: React Native (JSX) via Expo (managed workflow), with Expo Router for file-based navigation
Runtime/testing: Expo Go on each team member's phone — no Android Studio or Xcode required during development
Styling: StyleSheet.create per component, with colors/spacing/typography pulled from Figma Dev Mode into a shared JS theme module (base palette: #A665DF purple, #EADBF9 / #FBF7FF backgrounds). No CSS files — React Native has no DOM and no cascade
Fonts: expo-font with @expo-google-fonts/*, one file per weight, loaded behind the splash screen
State: React Context (auth + patient profile) plus local component state; Zustand if global state grows
Backend: Supabase (Auth + Postgres) — free tier, fast to set up for a student project. Session persistence via @react-native-async-storage/async-storage, with react-native-url-polyfill required for the client to work on device
Calendar/dates: react-native-calendars for the month view, date-fns for date logic, @react-native-community/datetimepicker for date/time entry
Reminders: expo-notifications with locally scheduled notifications (the Web Notification API and setInterval polling do not exist / do not run in the background on mobile)
Video: expo-video (VideoView) in place of the HTML5 <video> element
Local preferences: AsyncStorage in place of localStorage
Delivery: Expo Go QR code during development and demos; EAS Build for an installable Android APK to submit. Vercel is not used — there is no web URL to deploy

3. Screens → React Native Component Map
Every exported frame maps to one screen component and one Expo Router file. Routes come from file paths, so the route column below is also the file to create under app/.
Figma frame
Component
Route file / purpose
1. Onboarding & Auth
Welcome Interface.svg
WelcomeScreen
app/index.jsx — app intro / entry point
User Login Menu.svg
LoginRoleSelect
app/login-role.jsx — caregiver / family path
Login Menu.svg
LoginForm
app/login.jsx — email + password sign-in
Registration Menu.svg
RegisterForm
app/register.jsx — new account sign-up
Patient and Guardian Info.svg / -1.svg
PatientGuardianForm (2 steps)
app/patient-info.jsx — patient + guardian details
2. Core Shell
Dashboard.svg
DashboardScreen
app/(tabs)/dashboard.jsx — quick links, alerts, progress
Header.svg / Header-1/2/3.svg
AppHeader (prop variants)
Shared component; native header disabled via headerShown: false
(bottom tab bar, if present)
Expo Router Tabs
app/(tabs)/_layout.jsx — Dashboard, Courses, Tools, Profile
3. Learning Modules
Course Menu.svg / Course Menu-1.svg
CourseListScreen (2 states)
app/(tabs)/courses/index.jsx — browse care topics
Week Course.svg
CourseWeekScreen
app/courses/[courseId]/week/[weekNumber].jsx
Module Type 1.svg
ModuleScreen
app/courses/[courseId]/module/[moduleId].jsx
Reading 2.svg / Reading 3.svg
ReadingScreen (variants)
app/courses/[courseId]/index.jsx — context & tips
Videos.svg
VideoLibraryScreen
app/videos.jsx — expo-video player list
4. Caregiver Tools
Calendar.svg
CalendarScreen
app/calendar/index.jsx — care schedule overview
Calendar Creator.svg
CalendarEventForm
app/calendar/new.jsx — add/edit a care event
Reminder.svg
RemindersScreen
app/reminders.jsx — medication / task reminders
Notes creator.svg
NoteEditorScreen
app/notes/new.jsx (and edit via [noteId])
NOTES.svg / NOTES (INSIDE).svg
NotesListScreen / NoteDetailScreen
app/notes/index.jsx / app/notes/[noteId].jsx
5. Account
Profile Menu.svg
ProfileScreen
app/(tabs)/profile.jsx — caregiver + patient summary
Settings Menu.svg
SettingsScreen
app/settings.jsx — preferences, notifications, sign out

Dynamic segments use square brackets ([courseId]) instead of :courseId, and arrive as strings from useLocalSearchParams().
4. Figma Dev Mode Workflow
Since the team is unfamiliar with this step, follow this loop for every screen:
Open the frame in Figma Dev Mode → Inspect panel, and set the platform selector to React Native if available so values come out as numbers rather than px strings.
Copy the measured values (color, spacing, radius, font size) into that component's StyleSheet.create block — don't hand-guess. Anything shared goes into src/theme instead of being repeated.
Export images/icons as PNG (1x/2x/3x) or SVG into assets/. For SVG you need react-native-svg; PNG is the lower-friction choice for a student timeline.
Build the component structurally first with flexbox (remember flexDirection defaults to column), then style it.
Compare the rendered screen on a real phone side-by-side with the Figma frame before moving on — not in a browser.
Reuse Header variants and shared buttons/cards as small components instead of rebuilding per screen.
Treat 412×917 as the design reference, not a fixed canvas: real phones vary, so use flex and useWindowDimensions() rather than absolute pixel positions, and wrap screens in SafeAreaView for notch and home-indicator clearance.
5. Folder Structure
app/                             Expo Router routes (thin wrappers that render a screen)
├── _layout.jsx                  Root Stack, AuthProvider, font loading, notification handler
├── (tabs)/                      Bottom tab bar group (if the frames include one)
├── courses/
│   └── [courseId]/              Dynamic course, week, and module routes
├── notes/                       List, create, and detail routes
└── calendar/                    List, create, and detail routes

src/
├── components/                  Shared UI: Header, Button, Input, Card
├── screens/                     Each screen holds its .jsx and its StyleSheet
│   ├── auth/                    Welcome, LoginRoleSelect, Login, Register, PatientGuardianInfo
│   ├── dashboard/
│   ├── courses/                 CourseList, CourseWeek, Module, Reading, Videos
│   ├── tools/                   Calendar, Reminders, Notes
│   └── account/                 Profile, Settings
├── context/                     AuthContext, PatientContext
├── lib/                         supabaseClient.js, API helpers, notifications.js
└── theme/                       colors.js, spacing.js, typography.js, index.js

assets/                          Icons and images exported from Figma; app icon and splash
app.json                         Name, slug, scheme, icon, splash, android.package
.env                             EXPO_PUBLIC_ variables (gitignored)

There is no routes/ folder and no styles/global.css: navigation is defined by the app/ file tree, and styling lives with each component plus the shared theme.
6. Data Model (Supabase tables)
Entity / table
Key fields
User (Caregiver)
Managed by Supabase auth.users: id, email. Role and patient link derived via the patients row
patients
id, user_id (→ auth.users), name, age, dementia_stage, guardian_name, guardian_contact, emergency_contacts, created_at
courses
id, title, category (daily care / warning signs / emergency / stages), description
modules
id, course_id (→ courses), title, steps (jsonb), context_text, media_url, order_index
notes
id, patient_id (→ patients), author_id (→ auth.users), title, body, created_at
reminders
id, patient_id (→ patients), type (medication/task), time, repeat, done, notification_id
calendar_events
id, patient_id (→ patients), title, date, time, notes

notification_id is new: it stores the identifier returned by scheduleNotificationAsync so a reminder that is edited or completed can have its pending notification cancelled. Row Level Security is enabled on patients, notes, reminders, and calendar_events; courses and modules stay publicly readable. Because the anon key ships inside the installed app, RLS is the only thing protecting patient data.
7. Implementation Phases
Phase
Focus
Key tasks
Output
Phase 1 Setup
Project foundation
Init Expo project; add Expo Router and native deps with npx expo install; confirm the app opens in Expo Go on every teammate's phone; extract design tokens into src/theme; scaffold all routes with placeholders.
Blank app running on a phone with navigation + theme
Phase 2 Auth & Onboarding
Screens group 1
Build Welcome, Login, Register, Patient/Guardian Info; wire Supabase auth with AsyncStorage session persistence; form validation; keyboard handling.
Sign-up → login flow that survives a force-quit
Phase 3 Core + Learning
Screens groups 2 & 3
Build Header + Dashboard shell and tab bar; build Course list, Week, Module, Reading, Video screens with FlatList; seed and connect real course content in Supabase.
Browsable care-instruction library
Phase 4 Caregiver Tools
Screens group 4
Build Calendar, Reminder, Notes screens with full CRUD; schedule local notifications via expo-notifications, including the Android notification channel and permission flow.
Working scheduling + notes, with reminders that fire
Phase 5 Account + Polish
Screens group 5 + QA
Build Profile/Settings; test on both iOS and Android and on a small and large phone; empty/error/loading states; offline behavior; Android back button; fix against Figma spec.
Feature-complete app
Phase 6 Ship
Demo & submit
Add env vars to eas.json; fill in app.json (icon, splash, package name); run eas build -p android --profile preview for an installable APK; final walkthrough vs. Figma frames; record a backup demo video.
Installable build + rehearsed demo

Phase 6 no longer means "deploy to a URL." Expo Go runs the app off a teammate's dev server, so a permanent artifact requires an EAS build. Decide in Phase 1 whether the submission is a live demo or an APK, because the APK path needs an Expo account and a build run that can take a while to queue.
8. Definition of "Fully Functional"
All 26 screens built and navigable end-to-end on a physical phone (Welcome → Auth → Dashboard → Courses/Tools/Account)
Auth works: sign up, log in, and the session persists after the app is force-quit and reopened
Patient/Guardian info is saved and shown on Profile
Course content is real data (not placeholder), readable end-to-end, with videos that play
Notes and reminders can be created, edited, and deleted, and persist across app restarts
Calendar events display on the correct dates, and a scheduled reminder actually fires a notification on the device — including while the app is closed
The app runs correctly on both iOS and Android Expo Go, and on at least one small and one large screen
Loading, empty, and error states exist on every screen that fetches data; no crash or blank screen when offline
The app is distributable: either a rehearsed Expo Go demo (with tunnel fallback) or an installable EAS build handed to the instructor
