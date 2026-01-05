# Web3Forms Setup Instructions

## Step 1: Get Your Access Key
1. Go to [https://web3forms.com](https://web3forms.com)
2. Sign up for a free account
3. Create a new form
4. Copy your Access Key

## Step 2: Update the Contact Form
1. Open `src/components/Contact.js`
2. Find the line: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',`
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual access key from Web3Forms

## Step 3: Test the Form
1. Fill out the contact form on your website
2. Submit the form
3. Check your email for the message
4. Check the Web3Forms dashboard for submissions

## Features Included:
- ✅ Real form submission to your email
- ✅ Loading states and success/error messages
- ✅ Form validation
- ✅ Fallback to mailto if Web3Forms fails
- ✅ Beautiful animations and UI feedback
- ✅ Mobile responsive design

## Free Plan Limits:
- 250 submissions per month
- Email notifications
- Spam protection
- No credit card required

## Example Access Key Format:
```
access_key: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
```

Make sure to keep your access key secure and don't commit it to public repositories!