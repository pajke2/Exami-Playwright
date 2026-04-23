# Exami E2E Test Plan

## Application Overview

Comprehensive E2E test plan for the Exami education platform, covering user registration, login, quiz and practice modes, subscription management, and various edge cases.

## Test Scenarios

### 1. Authentication

**Seed:** `e2e/seed.spec.ts`

#### 1.1. User Registration - Valid Data

**File:** `tests/authentication/registration.spec.ts`

**Steps:**
  1. Navigate to /register
    - expect: Registration form is displayed with fields for Full Name, Username, Email, Password, Confirm Password
  2. Fill in Full Name: 'John Doe', Username: 'johndoe', Email: 'john@example.com', Password: 'Password123', Confirm Password: 'Password123'
    - expect: Form accepts valid inputs
  3. Click 'Create account' button
    - expect: Account is created successfully, user is redirected to login or dashboard

#### 1.2. User Registration - Invalid Email

**File:** `tests/authentication/registration.spec.ts`

**Steps:**
  1. Fill form with invalid email 'invalidemail' and submit
    - expect: Error message displayed for invalid email

#### 1.3. User Registration - Password Mismatch

**File:** `tests/authentication/registration.spec.ts`

**Steps:**
  1. Fill passwords 'pass1' and 'pass2' and submit
    - expect: Error message for password mismatch

#### 1.4. User Registration - Duplicate Username

**File:** `tests/authentication/registration.spec.ts`

**Steps:**
  1. Register with existing username
    - expect: Error message for duplicate username

#### 1.5. User Login - Valid Credentials

**File:** `tests/authentication/login.spec.ts`

**Steps:**
  1. Navigate to /login
    - expect: Login form displayed
  2. Enter valid username/email and password, click 'Sign in'
    - expect: User logged in, redirected to dashboard

#### 1.6. User Login - Invalid Credentials

**File:** `tests/authentication/login.spec.ts`

**Steps:**
  1. Enter wrong password and submit
    - expect: Error message 'Invalid credentials'

#### 1.7. User Login - Non-existent User

**File:** `tests/authentication/login.spec.ts`

**Steps:**
  1. Enter non-existent email and submit
    - expect: Error message

#### 1.8. User Logout

**File:** `tests/authentication/logout.spec.ts`

**Steps:**
  1. Click 'Logout' from menu
    - expect: User logged out, redirected to login

#### 1.9. Forgot Password

**File:** `tests/authentication/forgot-password.spec.ts`

**Steps:**
  1. Click 'Forgot password?', enter email, submit
    - expect: Password reset email sent

### 2. Quiz Mode

**Seed:** `e2e/seed.spec.ts`

#### 2.1. Start and Complete Quiz

**File:** `tests/quiz/quiz-flow.spec.ts`

**Steps:**
  1. Navigate to subject > category > Quiz tab
    - expect: Quiz page displayed with start button
  2. Click 'Start Quiz'
    - expect: Quiz starts, questions displayed
  3. Answer all questions, submit
    - expect: Questions answered, score displayed

#### 2.2. Quiz Timeout

**File:** `tests/quiz/quiz-flow.spec.ts`

**Steps:**
  1. Start quiz, wait 20 minutes without submitting
    - expect: Quiz auto-submits on timeout

#### 2.3. Partial Quiz Submission

**File:** `tests/quiz/quiz-flow.spec.ts`

**Steps:**
  1. Answer some questions, submit early
    - expect: Partial score calculated

#### 2.4. Quiz with Network Interruption

**File:** `tests/quiz/quiz-flow.spec.ts`

**Steps:**
  1. Simulate network failure during quiz
    - expect: Quiz handles interruption gracefully

#### 2.5. Leaderboard Display

**File:** `tests/quiz/leaderboard.spec.ts`

**Steps:**
  1. View leaderboard tab
    - expect: Leaderboard shows rankings

#### 2.6. Score Update on Leaderboard

**File:** `tests/quiz/leaderboard.spec.ts`

**Steps:**
  1. Complete quiz, check leaderboard
    - expect: New score appears on leaderboard

#### 2.7. Save Question During Quiz

**File:** `tests/quiz/saved-questions.spec.ts`

**Steps:**
  1. During quiz, save a question
    - expect: Question saved

#### 2.8. Review Wrong Answers

**File:** `tests/quiz/wrong-answers.spec.ts`

**Steps:**
  1. View Wrong Answers tab after quiz
    - expect: Wrong answers listed

### 3. Practice Mode

**Seed:** `e2e/seed.spec.ts`

#### 3.1. Start Practice Session

**File:** `tests/practice/practice-flow.spec.ts`

**Steps:**
  1. Click 'Start Practice Session'
    - expect: Practice starts
  2. Answer questions
    - expect: Feedback provided after each answer

#### 3.2. Practice Progress Tracking

**File:** `tests/practice/practice-flow.spec.ts`

**Steps:**
  1. Answer multiple questions
    - expect: Progress indicator updates

#### 3.3. Practice with Interruptions

**File:** `tests/practice/practice-flow.spec.ts`

**Steps:**
  1. Interrupt and resume practice
    - expect: Session resumes

### 4. Subscription Management

**Seed:** `e2e/seed.spec.ts`

#### 4.1. View Current Plan

**File:** `tests/subscription/manage-subscription.spec.ts`

**Steps:**
  1. Go to profile > Subscription
    - expect: Current plan displayed

#### 4.2. Upgrade Subscription

**File:** `tests/subscription/manage-subscription.spec.ts`

**Steps:**
  1. Click 'Manage Subscription', select plan, pay
    - expect: Payment processed, plan upgraded

#### 4.3. Expired Subscription

**File:** `tests/subscription/manage-subscription.spec.ts`

**Steps:**
  1. With expired sub, try premium feature
    - expect: Access restricted

#### 4.4. Failed Payment

**File:** `tests/subscription/manage-subscription.spec.ts`

**Steps:**
  1. Attempt payment with invalid card
    - expect: Error handled

#### 4.5. Downgrade Subscription

**File:** `tests/subscription/manage-subscription.spec.ts`

**Steps:**
  1. Change to lower plan
    - expect: Plan downgraded

### 5. User Profile and Settings

**Seed:** `e2e/seed.spec.ts`

#### 5.1. Update Profile Information

**File:** `tests/profile/edit-profile.spec.ts`

**Steps:**
  1. Edit name, bio, etc., save
    - expect: Profile updated

#### 5.2. Change Password

**File:** `tests/profile/edit-profile.spec.ts`

**Steps:**
  1. Enter current and new password
    - expect: Password changed

#### 5.3. Configure Notifications

**File:** `tests/profile/notifications.spec.ts`

**Steps:**
  1. Toggle notification switches
    - expect: Settings saved

### 6. Friends and Social

**Seed:** `e2e/seed.spec.ts`

#### 6.1. Send Friend Request

**File:** `tests/friends/friend-request.spec.ts`

**Steps:**
  1. Search user, send request
    - expect: Request sent

#### 6.2. Accept Friend Request

**File:** `tests/friends/friend-request.spec.ts`

**Steps:**
  1. Accept incoming request
    - expect: Friends added

#### 6.3. Friends Leaderboard

**File:** `tests/friends/leaderboard.spec.ts`

**Steps:**
  1. View friends tab in leaderboard
    - expect: Friends rankings shown

### 7. Navigation and UI

**Seed:** `e2e/seed.spec.ts`

#### 7.1. Navigate Subjects and Categories

**File:** `tests/navigation/subject-navigation.spec.ts`

**Steps:**
  1. Click subject card
    - expect: Categories displayed
  2. Switch between tabs
    - expect: Tabs accessible

#### 7.2. Responsive Design

**File:** `tests/navigation/responsive.spec.ts`

**Steps:**
  1. Resize browser window
    - expect: UI adapts

#### 7.3. Loading States

**File:** `tests/navigation/loading-states.spec.ts`

**Steps:**
  1. Perform actions that load data
    - expect: Loading indicators shown

### 8. Error Handling

**Seed:** `e2e/seed.spec.ts`

#### 8.1. API Timeout

**File:** `tests/error/api-failures.spec.ts`

**Steps:**
  1. Simulate API timeout
    - expect: Error message displayed

#### 8.2. Network Failure During Quiz

**File:** `tests/error/network-interruption.spec.ts`

**Steps:**
  1. Disconnect network during quiz
    - expect: Graceful handling

### 9. Role-Based Access

**Seed:** `e2e/seed.spec.ts`

#### 9.1. Free User Restrictions

**File:** `tests/access/free-user.spec.ts`

**Steps:**
  1. Try access premium quiz as free user
    - expect: Premium content blocked

#### 9.2. Subscribed User Access

**File:** `tests/access/subscribed-user.spec.ts`

**Steps:**
  1. Access all features as subscribed user
    - expect: Full access
