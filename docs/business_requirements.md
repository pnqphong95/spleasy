# SPLEASY - BUSINESS REQUIREMENTS DOCUMENT (MVP)

| Meta Data | Details |
| :--- | :--- |
| **Project** | Spleasy (Web App) |
| **Version** | 1.0 (MVP - Minimum Viable Product) |
| **Goal** | Instant group expense splitting utility. No registration required. |
| **Platform** | Web Application (Mobile First Design) |

---

## 1. Product Overview
**Spleasy** is a utility web application designed to help groups of friends, families, or travelers track shared expenses and calculate debts transparently and quickly.

**Core Value Proposition:**
* **Instant:** No app download, no account registration, no email verification.
* **Simple:** Create Group -> Share Link -> Add Expense -> Done.
* **Transparent:** Real-time visibility of who paid what for whom.

---

## 2. Functional Requirements

### 2.1. Group Management & Access
This flow replaces the traditional "Sign Up / Log In" process.

| ID | Feature Name | Detailed Description |
| :--- | :--- | :--- |
| **F1.1** | **Create New Group** | - User inputs **Group Name** (e.g., "Da Lat Trip 2026").<br>- (Optional) User sets a **4-digit PIN** for basic security.<br>- System generates a unique `Session ID` / Slug. |
| **F1.2** | **Share Group** | - Generate a unique URL: `spleasy.app/g/<group-id>`.<br>- "Copy Link" button for easy sharing via messaging apps (Zalo/Messenger/WhatsApp). |
| **F1.3** | **Join Group (Link)** | - **Scenario A (New User):** Prompt for Display Name (and PIN). Store identity in `LocalStorage`.<br>- **Scenario B (Returning):** Check `LocalStorage`. If session exists, welcome user back and skip setup. |
| **F1.4** | **Join Group (Manual)** | - User enters Group ID + PIN + Display Name manually from Home Screen. |
| **F1.5** | **Leave Group** | - "Exit" button to clear user identity from the current browser session. |

### 2.2. Expense Tracking
Any user with the link and a Display Name can add/edit/delete expenses (Trust-based model).

| ID | Feature Name | Detailed Description |
| :--- | :--- | :--- |
| **F2.1** | **Add Expense** | - Input Form: Amount, Description/Note.<br>- **Payer:** Dropdown list. Defaults to the **Current User's Name**. Can be changed to another member if paying on their behalf.<br>- **Timestamp:** Automatically captures the current time (`Date.now()`). |
| **F2.2** | **Select Beneficiaries** | - Checkbox list of all group members.<br>- **Default:** "Select All".<br>- User unchecks members who are not involved in this specific expense. |
| **F2.3** | **Splitting Logic** | - **Equal Split Only (MVP).**<br>- Formula: `Debt per person = Total Amount / Count of Checked Members`. |
| **F2.4** | **Activity Log** | - Displays a list of expenses in reverse chronological order (newest first).<br>- Summary format: *"Alice paid 300k for Dinner (3 people)"*. |

### 2.3. Reporting & Settlement
The "brain" of the application.

| ID | Feature Name | Detailed Description |
| :--- | :--- | :--- |
| **F3.1** | **Net Balances** | - Display a list of members with their financial status:<br>  + **Positive (+):** User paid more than their share (To receive).<br>  + **Negative (-):** User paid less than their share (To pay).<br>- **Validation:** Sum of Positives must always equal Sum of Negatives (Checksum = 0). |
| **F3.2** | **Settlement Plan** | - Apply **Debt Simplification Algorithm** (Minimize Cash Flow).<br>- Goal: Reduce the total number of necessary transactions.<br>- **Output:** A list of clear instructions:<br>  1. *"Bob pays Alice: 150k"*<br>  2. *"Charlie pays Alice: 50k"* |

---

## 3. Non-Functional Requirements

* **Performance:** Page load time under 1 second. Adding an expense must feel instantaneous (Optimistic UI).
* **UX/UI:**
    * **Mobile-First:** Optimized for smartphones as users will be on the go.
    * **Input Formatting:** Currency inputs must support thousands separators (e.g., 100,000 or 100.000) to prevent zero-error mistakes.
* **Data Storage:**
    * **Cloud:** Group data and expenses stored in a real-time database (e.g., Firestore/MongoDB) for synchronization.
    * **Local:** User identity (Display Name) stored in `LocalStorage`.
* **Security (MVP):**
    * Basic PIN protection for group access.
    * No complex SSL or encryption required beyond standard HTTPS (since data is not highly sensitive financial info).
