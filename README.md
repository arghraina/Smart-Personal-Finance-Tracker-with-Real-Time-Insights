# Dependencies:
    Core Dependencies
- - React & React DOM – UI library for building components.
- - React Router DOM – Client-side routing
- - Zustand – Lightweight state management
- - Framer Motion – Animations and transitions
- - Recharts – Data visualization (charts)
- - Lucide React – Icon library
- - Clsx – Utility for conditional classNames
- - Tailwind CSS – Utility-first CSS framework

- Complete Installation: `npm install react react-dom react-router-dom zustand framer-motion recharts lucide-react clsx tailwindcss @tailwindcss/vite @tailwindcss/cli`

# Basics:
- I have used lucide-react for clean and modern SVG icons, `npm install lucide-react`.

- In the `Header.jsx` file, Admin Toggle Button is implemented which controls access. If you are in Admin controle, you can modify the data , whereas if you are in viwer only mode, you can only see the data.

# Database:
- I have used only the temporary data which is there in the `src/store/Usestore.jsx`, which has been asked in the assignment as the it is frontend driven. We can also add the backend to extend this database.

# Toggling the modes:
- For now, I have put simple Toggle option to switch, but once we have a good backend ready with this project, we can like keep the `Password Authentication` to switch between Viewer and Admin modes.

# Data persistence:
- I have used Zustand to save the state in the Browser Storage. I have used this to maintain the Toggle button. Basically, without it , the app forgets everything, but with this user state persists `npm install zustand`. So, now even when the page refreshes, the state of the Toggle button persists.
- Also, although the data is hard-coded, but once a change is made in the UI, say Add or Delete, it actually reflects in dashboard.
To revisit to original form, we do `localStorage.clear()` in the console.
- It also manages the state of Read and Unread messages/notifications. When an item is added or deleted, a notification is generated and can be seen by clicking on the notification icon in Header Section. It flashes the number of unread messages on top of it which gets cleared after we see the message.

# Category Normalisatoin: 
- To maintain clean and consistent data, the app automatically standardizes category names entered by users.
- - Converts all input to a uniform format (e.g., transport, TRANSPORT, tRaNsPoRt → Transport)
- - Supports multi-word categories (e.g., stock market → Stock Market)
- - Prevents duplicate or fragmented categories caused by inconsistent casing
- This ensures better filtering, cleaner insights, and a more professional data structure without requiring extra effort from the user.

# Graphs:
- I have used the recharts for building all the charts, `npm install recharts`.

# Pagerwrapper component:
- PageWrapper is a reusable animation component built with Framer Motion that provides smooth page transitions. It wraps its children with a motion container that fades and slides content into view when mounted, and animates it out when unmounted.
- - Initial state: Slightly below with zero opacity
- - Animate state: Moves into position with full opacity.
- - Exit state: Slides up and fades out
- - Transition: Smooth 0.3s animation