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

**Introduction and Consent Activity**

* First activity launched when the user first opens the app. It
provides basic information about the project, and a consent form with a button
for the user to indicate consent to sharing data. 
* If user consents, app generates a random UUID and posts this to the API in a JSON string as user_UUID. E.g.:
```JSON
{"user_UUID": "550e8400-e29b-41d4-a716-446655440000"}
```

**Main Switchboard Activity**

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

**Report Adult Mosquito Activity and Report Breeding Site Activity**

* These are two activities presented presented in a form-like layout (the same
layout is used for each activity, with minor changes). The layout includes the
following rows that can be checked off when complete.
    * Checklist. Clicking on this row takes the user to a checklist with
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
    * Send report: This is a button at the bottom of the report that the user clicks
when the report is done. If the report is an adult mosquito report and includes
(1) the checklist and (2) a location, or if it is a breeding site report and
includes (1) the checklist, (2) a location, and (3) at least one attached photo,
then the user is shown a confirmation dialog. Clicking yes on the confirmation
dialog stores the report in the phone’s internal database and attempts to
upload it (including the photos) to the server immediately if a connection is
available or during a future sync if not. 


Apart from the photos, reports are posted to the API as JSON strings with the following fields:

* version_UUID: UUID randomly generated on phone to identify each unique report version. Must be exactly 36 characters (32 hex digits plus 4 hyphens).
* version_number: The report version number. Should be an integer that increments by 1 for each repor version. Note
that the user keeps only the most recent version on the device, but all versions are stored on the server.
* user: user_UUID for the user sending this report. Must be exactly 36 characters (32 hex digits plus 4 hyphens) and user must have already registered this ID.
* report_id: 4-digit alpha-numeric code generated on user phone to identify each unique report from that user. Digits should lbe randomly drawn from the set of all lowercase and uppercase alphabetic characters and 0-9, but excluding 0, o, and O to avoid confusion if we ever need user to be able to refer to a report ID in correspondence with MoveLab (as was previously the case when we had them sending samples).
* server_upload_time: Date and time on server when report uploaded. (Automatically generated by server.)
* phone_upload_time: Date and time on phone when it uploaded fix. Format as [ECMA 262](http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) date time string (e.g. "2014-05-17T12:34:56.123+01:00".
* creation_time:Date and time on phone when first version of report was created. Format as [ECMA 262](http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) date time string
(e.g. "2014-05-17T12:34:56.123+01:00".
* version_time:Date and time on phone when this version of report was created. Format as [ECMA 262](http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) date time string (e
.g. "2014-05-17T12:34:56.123+01:00".
* type: Type of report: 'adult', 'site', or 'mission'.
* mission: If this report was a response to a mission, the unique id field of that mission.
* location_choice: Did user indicate that report relates to current location of phone ("current") or to a location selected manually on the map ("selected")?
* current_location_lon: Longitude of user's current location. In decimal degrees.
* current_location_lat: Latitude of user's current location. In decimal degrees.
* selected_location_lon: Latitude of location selected by user on map. In decimal degrees.
* selected_location_lat: Longitude of location selected by user on map. In decimal degrees.
* note: Note user attached to report.
* package_name: Name of tigatrapp package from which this report was submitted.
* package_version: Version number of tigatrapp package from which this report was submitted.
* device_manufacturer: Manufacturer of device from which this report was submitted.
* device_model: Model of device from which this report was submitted.
* os:  Operating system of device from which this report was submitted.
* os_version: Operating system version of device from which this report was submitted.
* os_language: Language setting of operating system on device from which this report was submitted. 2-digit [ISO 639-1](http://www.iso.org/iso/home/standards/language_codes.htm) language code.
* app_language:Language setting, within tigatrapp, of device from which this report was submitted. 2-digit [ISO 639-1](http://www.iso.org/iso/home/standards/language_codes.htm) language code.
* responses:
    * question: Question that the user responded to.
    * answer: Answer that user selected.


**View/Edit Data Activity**

* This activity is a full-screen map on which the user’s reports are plotted with
clickable icons.
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

**Gallery Activity**

* This is a gallery of photos, with short descriptions, which the user can flip
through to learn about tiger mosquitos.
