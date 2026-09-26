# Parliament Path

BUILD A CINEMATIC YOUTH PARLIAMENT WEBSITE

Create a premium, highly immersive website for a Youth Parliament activity.

This should NOT look like a conventional college event website.

The core concept is:

“ENTER THE PARLIAMENT. FIND YOUR VOICE.”

The entire landing experience should feel like the visitor is physically approaching and entering the Parliament of India.

Scrolling is the primary interaction.

The user should not feel like they are simply scrolling through webpage sections.

They should feel like:

they are travelling through Parliament.

1. IMPORTANT REFERENCE

Before implementing the animation, visit and study this website:

https://www.scrolltide.co/#t-house

Use it as the interaction and motion reference.

Study:

scroll-controlled camera movement

depth

parallax

spatial transitions

animation pacing

typography movement

foreground/background separation

how the scene changes as the user scrolls

reverse scrolling behavior

continuous transitions

I want a similar quality of interaction, not a copy.

Do NOT copy:

proprietary code

assets

branding

exact artwork

exact composition

Create an original Youth Parliament experience.

2. THE SIX MAIN CINEMATIC STATES

The opening experience should be built as one continuous scroll-driven scene with six major visual states.

These are NOT six separate pages.

They are six stages of one journey.

STATE 01 — APPROACHING PARLIAMENT

The initial screen shows a majestic representation of the Parliament of India.

Composition:

Parliament building as the dominant visual

wide cinematic framing

architectural symmetry

subtle Indian flag

warm daylight

atmospheric depth

long approach/foreground

elegant typography

Main heading:

YOUTH PARLIAMENT

Supporting text:

Your Voice. Your Parliament. Your Future.

Small scroll instruction:

SCROLL TO ENTER

The first screen should feel prestigious and cinematic.

STATE 02 — MOVING TOWARD THE ENTRANCE

As the user scrolls:

The camera should physically approach Parliament.

Do NOT simply zoom one image.

Create multiple depth layers:

Background
↓
Sky / atmosphere
↓
Distant architecture
↓
Parliament building
↓
Entrance
↓
Foreground steps / columns
↓
Typography


Each layer should move at a different rate.

The camera should gradually transition from:

wide exterior

to:

close entrance perspective

Typography should become less prominent as the architecture takes over.

STATE 03 — THE PARLIAMENT ENTRANCE

Continue scrolling.

The camera reaches the Parliament entrance.

The doors should now dominate the screen.

The doors are initially closed.

Show a subtle visual cue:

SCROLL TO ENTER

The surrounding architecture should have realistic depth and shadows.

Do not suddenly switch to another section.

The camera should remain inside the same environment.

STATE 04 — THE DOORS OPEN

This is the signature moment of the entire website.

As the user continues scrolling:

THE PARLIAMENT DOORS OPEN.

Treat both doors as separate objects.

Left door

Moves/rotates outward toward the left.

Right door

Moves/rotates outward toward the right.

At the same time:

camera moves forward

interior becomes visible

interior light appears

shadows change

perspective changes

depth increases

The animation must be controlled by scroll progress.

If the user scrolls backward:

the doors must close naturally.

Do not make this a one-time click animation.

The scroll position should directly control the state.

STATE 05 — ENTERING PARLIAMENT

Once the doors open, the camera must continue moving forward.

Do NOT stop at the doorway.

The user should physically cross the threshold.

The visual sequence should feel like:

OUTSIDE
   ↓
ENTRANCE
   ↓
OPEN DOORS
   ↓
THRESHOLD
   ↓
INTERIOR
   ↓
PARLIAMENTARY CHAMBER


Lighting should transition naturally:

Outside

Warm daylight.

Entrance

Mixed exterior/interior light.

Inside

Elegant warm institutional lighting.

The exterior should gradually disappear behind the camera.

STATE 06 — YOUTH PARLIAMENT EXPERIENCE

After entering Parliament, the interior becomes the environment for the actual website.

Show a sophisticated parliamentary chamber-inspired environment containing:

parliamentary seating

desks

central podium

microphones

architectural details

warm institutional lighting

Then begin revealing the actual Youth Parliament information.

The cinematic journey transitions into the functional website.

3. CONTENT AFTER ENTERING

After the cinematic entrance, create these sections.

ABOUT YOUTH PARLIAMENT

Explain:

what Youth Parliament is

its purpose

what participants experience

Use the project's actual content if provided.

Do not invent official information.

WHY PARTICIPATE

Present key benefits such as:

Public Speaking

Parliamentary Procedure

Leadership

Policy Discussion

Teamwork

Civic Awareness

Use elegant editorial layouts rather than generic SaaS cards.

ELIGIBILITY

Display the actual eligibility information provided by the project.

TIMELINE

Display:

important dates

registration period

event dates

important deadlines

Only use confirmed project information.

GUIDELINES

Present participant guidelines in a clean institutional design.

4. REGISTRATION — THE DESTINATION

The entire cinematic experience should eventually lead toward registration.

Create a prominent final section:

REGISTER FOR YOUTH PARLIAMENT

Supporting copy:

Your voice deserves a seat at the table.

Primary CTA:

START REGISTRATION

The registration form should be functional and easy to use.

Do not sacrifice usability for visual effects.

The form should feel like a refined institutional/parliamentary document rather than a generic SaaS form.

5. VISUAL DESIGN

Use a sophisticated Indian institutional palette.

Suggested colors:

warm ivory

sandstone

deep navy

charcoal

muted gold/brass

restrained saffron

restrained green

Do NOT overuse the Indian flag colors.

Do NOT create a neon/cyberpunk website.

Do NOT use excessive gradients.

Do NOT use excessive glassmorphism.

The visual identity should communicate:

Indian + Democratic + Institutional + Youthful + Premium

6. TYPOGRAPHY

Use an elegant editorial typography system.

Use:

refined serif typography for major ceremonial headlines

clean sans-serif typography for information and UI

The typography should also participate in the animation.

It should:

appear

move

recede

scale

fade

transition with the camera

Do not keep all text permanently fixed.

7. CAMERA AND SCROLL SYSTEM

Use a proper scroll-driven animation architecture.

If using React/Next.js, use suitable technologies such as:

Framer Motion

GSAP

Lenis

CSS 3D transforms

Use these only where appropriate.

The scroll should map to a normalized progress value:

0 → 1


That progress controls:

camera position

Parliament scale

depth layers

door position

door rotation

lighting

typography

interior transition

content reveal

Do NOT create independent random animations.

The whole experience should behave like one timeline.

8. DOOR ANIMATION

Make this extremely convincing.

Conceptually:

CLOSED

┌─────────────────────┐
│        DOORS        │
│        CLOSED       │
└─────────────────────┘

          ↓ scroll

OPENING

← LEFT       RIGHT →

          ↓ scroll

FULLY OPEN

┌─────┐             ┌─────┐
│     │             │     │
│     │   ENTER     │     │
│     │             │     │
└─────┘             └─────┘


The camera should move forward simultaneously.

The user should feel that they are physically entering.

9. SIX VISUAL FRAMES SHOULD FEEL CONNECTED

The six major states should transition like this:

01

Parliament exterior

↓

02

Approaching entrance

↓

03

Entrance close-up

↓

04

Doors opening

↓

05

Camera crossing threshold

↓

06

Inside Youth Parliament

There should be NO hard cuts.

10. NAVIGATION

Keep the initial navigation minimal.

Possible:

YOUTH PARLIAMENT

left side

About
Experience
Schedule
Register

right side

The navigation should not compete with the cinematic experience.

As the user enters Parliament, the navigation can become more visible.

11. RESPONSIVE DESIGN

The experience must work on:

desktop

laptop

tablet

mobile

Desktop:

Full cinematic experience.

Mobile:

Adapt the composition rather than simply shrinking it.

The Parliament should remain recognizable.

The door-opening sequence should remain understandable.

The camera should still appear to enter.

12. PERFORMANCE

The site should feel smooth and premium.

Target approximately:

60 FPS where reasonably achievable.

Optimize:

images

assets

animation calculations

scroll handlers

rendering

lazy loading

If a layered 2.5D solution creates the same visual effect more efficiently than full 3D, prefer the efficient solution.

The visual result matters more than unnecessary technical complexity.

13. ACCESSIBILITY

Respect:

prefers-reduced-motion

For reduced-motion users:

minimize camera movement

simplify door animation

reduce parallax

maintain readable content

preserve complete functionality

14. IMPORTANT — DO NOT MAKE IT LOOK AI-GENERATED

Avoid:

random decorative elements

meaningless 3D objects

excessive particles

generic futuristic effects

random gradients

generic cards

stock-looking illustrations

excessive animations

Every animation must have a purpose.

The design should feel intentionally art-directed.

15. FUNCTIONAL REQUIREMENTS

The website must be a real functional website.

Implement:

responsive navigation

smooth scrolling

working registration CTA

registration form

form validation

proper section navigation

mobile menu

accessible buttons

responsive typography

If a backend or registration system already exists in the project, preserve it.

Do not replace working functionality unnecessarily.

16. IMPLEMENTATION PROCESS

Follow this sequence:

STEP 1

Inspect the Scrolltide reference:

https://www.scrolltide.co/#t-house

STEP 2

Understand the existing project structure.

STEP 3

Build the six-stage cinematic Parliament sequence.

STEP 4

Implement the scroll-driven camera.

STEP 5

Implement the Parliament doors.

STEP 6

Implement the camera crossing the doorway.

STEP 7

Transition into Youth Parliament content.

STEP 8

Build the informational sections.

STEP 9

Build the registration experience.

STEP 10

Test everything in the browser.

17. TESTING

After building:

Test slow scrolling

Every transition should be visible.

Test fast scrolling

The animation should remain stable.

Test reverse scrolling

The entire cinematic sequence should reverse naturally.

Test halfway scrolling

The scene should remain coherent at any scroll position.

Test mobile

The experience must remain usable.

Test registration

The registration flow must work.

Test performance

Avoid jank and excessive loading.

18. FINAL EXPERIENCE

The final website should communicate this story:

I SEE PARLIAMENT
       ↓
I APPROACH PARLIAMENT
       ↓
I REACH THE ENTRANCE
       ↓
THE DOORS OPEN
       ↓
I ENTER PARLIAMENT
       ↓
I DISCOVER YOUTH PARLIAMENT
       ↓
I LEARN
       ↓
I PARTICIPATE
       ↓
I REGISTER


The signature moment is:

SCROLL → DOORS OPEN → CAMERA ENTERS PARLIAMENT

Make that moment exceptionally polished.

FINAL INSTRUCTION

Do not give me a static mockup.

Do not give me only a concept.

Actually build the website.

Visit the Scrolltide reference.

Implement the cinematic interaction.

Make the Parliament entrance the central visual experience.

The final result should feel like:

A visitor is entering the Parliament of India through the act of scrolling, and inside they discover the Youth Parliament.

Build the complete experience accordingly.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://parliament-passage.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b5811165-e312-4455-95b4-dc9b31873476).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
