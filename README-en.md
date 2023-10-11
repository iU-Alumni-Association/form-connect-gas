# Google Form Slack Notification Tool

This project provides a Google Apps Script-based system for receiving responses from Google Forms and sending notifications to Slack. It also supports creating calendar events based on responses from specific forms.

## Key Features

- Real-time notifications to Slack for responses from Google Form.
- Enhance message visibility by adding emojis according to the response content.
- Generate a Google Calendar event creation link if a date and time response is provided.
- Include the form's public URL in the notification message.

## Setup

1. Create a new Google Apps Script project.
2. Copy the above code and paste it into the project.
3. Add Slack's Webhook URL as `ACCESS_TOKEN` in the script properties.

## Usage

1. When you receive a response on Google Form, it will be notified in real-time to the designated Slack channel.
2. The notification includes detailed response information, a link to the form, and a link to Google Calendar if necessary.

## Precautions

- Do not publicly disclose the Slack Webhook URL. If mistakenly disclosed, it may be misused.
- Since this script is based on Google Apps Script, be aware of Google's usage restrictions.

## Contribution

This project is open source. If you have bug reports or suggestions for improvements, please create an Issue.

## Image Preview

#### Slack Notification Image
<img width="462" alt="image-slack-form" src="https://github.com/iU-Alumni-Association/form-connect-gas/assets/147612244/d5d67017-a613-496a-bc24-7dc486de2f56">

## Code Overview

### Backend (Google Apps Script)

#### Google Form Slack Notification Function

This function captures responses from Google Form and sends a message to Slack. It also has features to apply specific processing and assemble a message. It automatically creates a calendar event based on the response and generates a link to the form. The assembled message is sent to Slack via Slack's Webhook URL.

**Main variable descriptions:**
- **form**: The Google Form object that received a response.
  
- **formTitle**: The title of the Google Form.
  
- **formUrl**: Public URL of the Google Form.
  
- **respondentEmail**: Email address of the respondent.
  
- **itemResponses**: An array containing all response contents.
  
- **message**: The content of the message being sent to Slack.
  
- **dateValue**: Date-formatted response (if present).
  
- **timeValue**: Time-formatted response (if present).
  
- **nameValue**: The response to a question titled "name" or the email address of the respondent.

**Main functionalities & flow:**
1. Retrieve responses from the Google Form.
2. Assemble a message to be sent to Slack.
   - Including the form title, respondent's email address, etc.
   - Insert appropriate emojis for each response.
   - Automatically create a Google Calendar event based on the response.
3. Send the assembled message to Slack via the Slack Webhook URL.

This function is for receiving Google Form responses in real-time and notifying the content to Slack. It also supports the creation of Google Calendar events based on specific response data (e.g., date and time).
