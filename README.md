Tigatrapp - HTML5 Mobile Application
=====================================

Tigatrapp is a citizen science tool for studying the spread of tiger mosquitoes in Spain. This repository contains the code for an HTML5 version of the app that will work on any device with a browser and allow offline use. It is at an easly stage and it is being actively developed right now. If you have any ideas for improvement, please contribute!

The basic set of features that we are aiming for in the final product are as follows:


Features
-----------------

**General**

* Free and open source software licensed under GPLv3.
* Multilingual: User can select between Catalan, Spanish, and
English.
* Similar to [Android version](https://play.google.com/store/apps/details?id=ceab.movelab.tigerapp). Provdes user with a tool for submitting repors on adult mosquitoes and breeding sites, and for viewing the crowdsourced webmap.
* Optimized for mobile, touchscreen use.
* Functions offline.

_Introduction and Consent Activity_

* First activity launched when the user first opens the app. It
provides basic information about the project, and a consent form with a button
for the user to indicate consent to sharing data. 
* If user consents, app generates a random UUID and posts this to the API in a JSON string as user_UUID. E.g.:

```
   {"user_UUID": "550e8400-e29b-41d4-a716-446655440000"}
```

_Main Switchboard Activity_

* This is a simple switchboard that displays four buttons for navigating to the
app’s main activities:
    * Report Breeding Site,
    * Report Adult Mosquito,
    * View/Edit Data.
    * Photo Gallery,
* This activity also includes a menu with the following options and suboptions:
    * Share App: lets the user automatically share the app’s web address
and a short slogan via email, Twitter, Facebook, etc.
    * About: takes user to a simple set of “About” views that show
information on the app’s copyright, license, and funding.
    * Tigatrapp Project: Links to the Atrapaeltigre and MoveLab websites.
    * Help: Link to the Help website (which we are building separately for
use by all versions.

_Report Adult Mosquito Activity and Report Breeding Site Activity_

* These are two activities presented presented in a form-like layout (the same
layout is used for each activity, with minor changes). The layout includes the
following rows that can be checked off when complete.
    * Checklist. Clicking on this row takes the user to a checklist with three
questions to help with identifying tiger mosquitoes or breeding sites
(depending on the activity being done). The user responds by selecting
from multiple choice drop-down menus / spinners. Each question also
has a help pop-up that includes text and an image. If the user provides
an answer to each question (even if it is “no” or “not sure”) the
checkbox for this row is marked off.
    * Location. This row has two sub-rows on which the user can specify if
the mosquito/breeding site was seen at his or her current location or at
some other location, which the user can specify on a map.
* For the user to be able to choose current location, the app must
have already obtained this location. It tries to do this by listening
for network and/or GPS locations as soon as the user opens the
report activity. The user is notified that the location has been
found by a change in the icon used in this sub-row, and if the
user presses on this row before a location has been found a
message indicates that it cannot yet be selected.
* For selecting a location from the map, the user is presented with
a map that initially centers (1) in Blanes, then (2) on the user’s
location as soon as that has been found. However, map stops
this centering routine as soon as the user touches it (to avoid
the frustration of having the map recenter just when one selects
a location).
* Photo: Clicking this row brings up a dialog/activity in which the user can attach
new phones taken from the device’s camera or existing photos from the file
system. The user can also view and delete photos that have already been
attached. The photo row on the report itself displays the number of photos
attached. Including a photo is mandatory for submitting a breeding site report
and optional for submitting an adult report.
* Note: Clicking this row brings up a text input field in which the user can write a
note to be included with the report. Each report has only one note, but the
note can be added to or edited.
→ Note input - Android Dialogue
* Send report: This is a button at the bottom of the report that the user clicks
when the report is done. If the report is an adult mosquito report and includes
(1) the checklist and (2) a location, or if it is a breeding site report and
includes (1) the checklist, (2) a location, and (3) at least one attached photo,
then the user is shown a confirmation dialog. Clicking yes on the confirmation
dialog stores the report in the phone’s internal database and attempts to
upload it (including the photos) to the server immediately if a connection is
available or during a future sync if not.

_View/Edit Data Activity_

* This activity is a full-screen map on which the user’s reports are plotted with
clickable icons. We may use the same webmap that we are using for the other
versions here, although we will need to work out how editing reports works.
* Adult reports and breeding site reports are differentiated by color.
* Clicking on an icon brings up a tabbed window that contains the report
information: One tab has all of the checklist questions and the user’s
response, the next has the attached photos, and the last has any note that the
user wrote.
* The user is given options to delete or edit the report. Clicking on edit brings
the user back to the initial report layout, but in this case the report is already
populated by the existing responses and the user can update these
responses.
* If the user updates a report, the changes are saved on the device and
transmitted to the server as a new version. The user only sees the most
recent version of each report, but the server stores all versions.
Gallery Activity
* This is a gallery of photos, with short descriptions, which the user can flip
through to learn about tiger mosquitos.
