# API Key Management - Manual Testing Checklist

## Prerequisites
- Development server running at http://localhost:3000
- User account created (sign up if needed)
- Logged in to the application

---

## Test 1: Navigation to API Keys Page

### Steps:
1. Sign in to your account
2. Check the header navigation bar
3. Verify "API Keys" link is visible (should appear after login)
4. Click on "API Keys" link

### Expected Results:
- [ ] "API Keys" link appears in header for authenticated users
- [ ] Link also appears in mobile menu when hamburger is clicked
- [ ] Clicking link navigates to `/dashboard/api-keys`
- [ ] Page loads without errors

---

## Test 2: Create API Key

### Steps:
1. Navigate to `/dashboard/api-keys`
2. Locate the "Create New API Key" card
3. Enter a token name (e.g., "My Test Key")
4. Click "Generate API Key" button

### Expected Results:
- [ ] Form accepts text input
- [ ] Button shows "Creating..." loading state
- [ ] Success toast notification appears
- [ ] Green success card displays with full token visible
- [ ] Warning message: "Make sure to copy your API key now. You won't be able to see it again!"
- [ ] Token list below updates with new token

---

## Test 3: Copy Token to Clipboard

### Steps:
1. After creating a token, click "Copy" button in the green success card
2. Paste into a text editor to verify
3. Click "Done" to dismiss the success card
4. In the token list, click "Copy" button on an existing token

### Expected Results:
- [ ] Success toast: "Token copied to clipboard"
- [ ] Token is actually copied (verify by pasting)
- [ ] Copy works from both the success card and token list
- [ ] Toast appears for ~3 seconds then disappears

---

## Test 4: Token List Display

### Steps:
1. View the "Your API Keys" section
2. Examine each token entry

### Expected Results:
- [ ] Tokens are displayed in descending order (newest first)
- [ ] Each token shows:
  - [ ] Token name
  - [ ] Status badge (Active/Inactive) in green/red
  - [ ] Masked token value (e.g., `abc1...xyz9` - first 4 and last 4 chars)
  - [ ] Created date in readable format
  - [ ] Expiration date (if set)
- [ ] "Copy" button on each token
- [ ] "Delete" button in red on each token
- [ ] If no tokens exist: "No API keys yet. Create one to get started."

---

## Test 5: Delete Token - Confirmation Dialog

### Steps:
1. Click "Delete" button on any token
2. Observe the confirmation dialog
3. Click "Cancel"
4. Click "Delete" again
5. Click "Delete" in the dialog to confirm

### Expected Results:
- [ ] Confirmation dialog appears with:
  - [ ] Title: "Are you sure?"
  - [ ] Warning message about permanence
  - [ ] "Cancel" button (gray)
  - [ ] "Delete" button (red)
- [ ] Clicking "Cancel" closes dialog without deleting
- [ ] Clicking "Delete" removes token from list
- [ ] Success toast: "API key deleted successfully"
- [ ] Token list updates automatically

---

## Test 6: Delete Token - Try Outside Click

### Steps:
1. Click "Delete" button
2. Click outside the dialog (on the backdrop)

### Expected Results:
- [ ] Dialog closes without deleting token
- [ ] Token remains in the list

---

## Test 7: Empty Token Name Validation

### Steps:
1. Leave token name field empty
2. Click "Generate API Key"

### Expected Results:
- [ ] Error toast appears: "Please enter a token name"
- [ ] No token is created
- [ ] Form remains visible

---

## Test 8: Dark Mode Compatibility

### Steps:
1. Toggle to dark mode using the moon/sun icon in header
2. Review all API key components
3. Toggle back to light mode

### Expected Results:
- [ ] All text is readable in dark mode
- [ ] Cards have proper dark mode backgrounds
- [ ] Success card (green) is visible in dark mode
- [ ] Status badges are readable in dark mode
- [ ] Buttons have proper contrast
- [ ] Dialog/modal has dark background
- [ ] Loading spinner is visible in dark mode
- [ ] No flashing or layout shifts when toggling

---

## Test 9: Loading States

### Steps:
1. Create a new token
2. Observe button states
3. Delete a token
4. Observe UI behavior

### Expected Results:
- [ ] "Generate API Key" button shows "Creating..." while processing
- [ ] Button is disabled during creation
- [ ] Spinner appears while initial page loads
- [ ] No UI freezing or hanging

---

## Test 10: Responsive Design

### Steps:
1. Resize browser window to mobile size (~375px width)
2. Test all functionality on mobile view
3. Open mobile menu (hamburger icon)

### Expected Results:
- [ ] Cards stack properly on mobile
- [ ] Buttons are tap-friendly (not too small)
- [ ] Token list is scrollable
- [ ] Dialog is centered and responsive
- [ ] Copy/Delete buttons are accessible
- [ ] "API Keys" link appears in mobile menu
- [ ] No horizontal scrolling

---

## Test 11: Multiple Tokens

### Steps:
1. Create 3-5 tokens with different names
2. Review the list

### Expected Results:
- [ ] All tokens display correctly
- [ ] Each has unique name
- [ ] All show masked token values
- [ ] Can copy and delete any token
- [ ] List scrolls if needed

---

## Test 12: Session Timeout/Authentication

### Steps:
1. While on API keys page, sign out
2. Try to access `/dashboard/api-keys` directly without login

### Expected Results:
- [ ] Redirected to `/auth/signin` when signed out
- [ ] Cannot access page without authentication
- [ ] After signing back in, page loads correctly

---

## Test 13: API Endpoint Testing (Advanced)

### Steps:
1. Create an API key
2. Copy the full token
3. Use curl or Postman to test:
   ```bash
   # List tokens
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/v1/token

   # Get specific token
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/v1/token/TOKEN_ID
   ```

### Expected Results:
- [ ] Valid token returns list of user's tokens
- [ ] Invalid token returns 401 error
- [ ] Token can access protected endpoints
- [ ] Response is proper JSON format

---

## Bug Tracking

### Issues Found:
| # | Issue Description | Severity | Status |
|---|------------------|----------|--------|
| 1 |                  |          |        |
| 2 |                  |          |        |
| 3 |                  |          |        |

---

## Test Summary

**Date Tested:** __________
**Tested By:** __________
**Browser:** __________
**OS:** __________

**Tests Passed:** ___ / 13
**Tests Failed:** ___ / 13

**Overall Status:** ☐ PASS ☐ FAIL ☐ NEEDS REVIEW

---

## Notes

_Add any additional observations, performance issues, or suggestions here:_

---

## Automated Test Results

✅ All 11 automated tests passed (see `test-api-keys.sh`):
- Server health check
- Authentication redirects
- API endpoint security
- Bearer token validation
- Route registration
