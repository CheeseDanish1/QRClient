// import React, { useState } from "react";
// import InfoIcon from "@mui/icons-material/Info";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import { addEvent, testEmail, testText, uploadImage } from "../utils/api";
// import QrCode from "../Components/QrCode";
// import constants from "../constants.json";
// import Switch from "@mui/material/Switch";

// function CreateEvent({ addUserEvents, userId }) {
//   // document.title = "Create New Event";

//   const [startTimeEnabled, setStartTimeEnabled] = useState(false);
//   const [endTimeEnabled, setEndTimeEnabled] = useState(false);
//   const [maxCapacityEnabled, setMaxCapacityEnabled] = useState(false);
//   const [fileEnabled, setFileEnabled] = useState(false);

//   const [testEmailAddress, setTestEmailAddress] = useState("");
//   const [testPhoneNumber, setTestPhoneNumber] = useState("");
//   const [file, setFile] = useState();

//   const [companyName, setCompanyName] = useState("");
//   const [fontColor, setFontColor] = useState("#000000");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [maxCapacity, setMaxCapacity] = useState("");
//   const [furtherContact, setFurtherContact] = useState("None");

//   const [landingText, setLandingText] = useState("");

//   // Default Email HTMl
//   const [emailHtml, setEmailHtml] = useState(
//     `<div
//     style="
//       font-family: Arial, sans-serif;
//       background-color: #f2f2f2;
//       margin: 0;
//       padding: 0;
//     "
//   >
//     <div
//       style="
//         max-width: 600px;
//         margin: 0 auto;
//         padding: 20px;
//         background-color: #ffffff;
//         border-radius: 10px;
//         box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//       "
//     >
//       <p style="color: #555">
//         Thank you for using our services. Find your personalized QR code:
//       </p>
//       <p style="color: #555">
//         Get your QR code scanned to receive the desired item
//       </p>
//       <p style="color: #555">Best regards,<br />Your Company Name</p>
//     </div>
//   </div>
//    `
//   );
//   const [phoneText, setPhoneText] = useState("");

//   const [ageChecked, setAgeChecked] = useState(false);
//   const [nameChecked, setNameChecked] = useState(false);
//   const [phoneChecked, setPhoneChecked] = useState(false);
//   const [emailChecked, setEmailChecked] = useState(false);

//   const [event, setEvent] = useState(null);
//   const [error, setError] = useState(null);

//   const APP_URI = constants.PRODUCTION_APP_URI;

//   const handleTestEmail = (e) => {
//     e.preventDefault();

//     if (!testEmailAddress)
//       return setError("You must provide an email address to test with");

//     testEmail({ emailAddress: testEmailAddress, emailHTML: emailHtml });
//   };

//   const handleTestText = (e) => {
//     e.preventDefault();

//     if (!testPhoneNumber)
//       return setError("You must provide a phone number to test with");

//     // TODO: Add test phone (and phone in general)
//     testText({ phoneNumber: testPhoneNumber, phoneContent: phoneText });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setError("");

//     if (!companyName) return setError("You must include a company name");
//     if (startTimeEnabled && !startTime)
//       return setError("You must include a start time or disable it");

//     if (endTimeEnabled && !endTime)
//       return setError("You must include an end time or disable it");

//     if (maxCapacityEnabled && !maxCapacity)
//       return setError("You must include a maximum capacity or disable it");

//     if (fileEnabled && !file)
//       return setError("You must include a file or disable it");

//     if (maxCapacityEnabled && isNaN(maxCapacity))
//       return setError("Maximum capacity must be a number");

//     if (phoneChecked + emailChecked < 1)
//       return setError("You must use phone or email");

//     if (!fontColor)
//       return setError("You must have a font color (use #000000 for black)");

//     let hexCodeRegExp = new RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/i);
//     if (!hexCodeRegExp.test(fontColor))
//       return setError("You must use a valid hex color");

//     uploadImage(fileEnabled, file).then((data) => {
//       if (!error)
//         addEvent({
//           imagePath: data.filename,
//           companyName,
//           startTime: startTimeEnabled ? new Date(startTime) : "",
//           endTime: endTimeEnabled ? new Date(endTime) : "",
//           maxCapacity: maxCapacityEnabled ? maxCapacity : 0,
//           furtherContact,
//           fontColor,
//           fields: {
//             age: ageChecked,
//             name: nameChecked,
//             phone: phoneChecked,
//             email: emailChecked,
//           },
//           text: {
//             eventLandingText: landingText,
//             emailHTML: emailHtml,
//             phoneText: phoneText,
//           },
//           createdBy: userId,
//         }).then((res) => {
//           if (res.error) return setError(res.message);
//           addUserEvents(res.event);
//           setEvent({
//             uuid: res.event.uuid,
//             companyName: res.event.companyName,
//             _id: res.event._id,
//           });
//         });
//     });
//   };

//   // TODO: Make this event private

//   const styles = {
//     mainContainer: {
//       backgroundColor: "#f0f0f0",
//       // height: "100%",
//       width: "100%",
//       display: "flex",
//       justifyContent: "center",
//     },
//     innerContainer: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       borderRadius: "10px",
//       width: "80%",
//       paddingLeft: "20px",
//     },
//     textInput: {
//       width: "100%",
//       padding: "10px",
//       margin: "5px 0",
//       border: "1px solid #ccc",
//       borderRadius: "5px",
//     },
//   };

//   return (
//     <div style={styles.mainContainer}>
//       <div style={styles.innerContainer}>
//         <h2>Create a New Event</h2>

//         <form
//           style={{ width: "60%", marginBottom: "20px" }}
//           className="registration-form"
//           onSubmit={!event ? handleSubmit : (e) => e.preventDefault()}
//         >
//           <div className="company-name form-group">
//             <label htmlFor="companyName">Company Name*</label>
//             <input
//               type="text"
//               id="companyName"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               required
//               style={styles.textInput}
//             />
//           </div>

//           <div className="landing-text form-group">
//             <label htmlFor="landingText">
//               Landing Page Text{" "}
//               <Tooltip title="Text at the top of the screen of the event form">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//             </label>
//             <input
//               type="text"
//               id="landingText"
//               defaultValue={"Recieve Promotion from {CompanyName}"}
//               value={landingText}
//               onChange={(event) => setLandingText(event.target.value)}
//               required
//               style={styles.textInput}
//             />
//           </div>

//           <div className="font-color form-group">
//             <label htmlFor="fontColor">
//               Text Font Color (Hex){" "}
//               <Tooltip title="Change font color to not interfere with background">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//             </label>
//             <input
//               type="text"
//               id="fontColor"
//               value={fontColor}
//               onChange={(event) => setFontColor(event.target.value)}
//               required
//               style={styles.textInput}
//             />
//           </div>

//           <div className="start-time form-group">
//             <label
//               htmlFor="startTime"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               Start Time*
//               <Tooltip title="Begin accepting submissions at certain time">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//               <Switch
//                 checked={startTimeEnabled}
//                 onChange={(event) => setStartTimeEnabled(event.target.checked)}
//               />
//             </label>
//             <input
//               type="datetime-local"
//               id="startTime"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               style={styles.textInput}
//               disabled={!startTimeEnabled}
//             />
//           </div>

//           <div className="end-time form-group">
//             <label
//               htmlFor="endTime"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               End Time
//               <Tooltip title="Stop accepting submissions after a certain time (optional)">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//               <Switch
//                 checked={endTimeEnabled}
//                 onChange={(event) => setEndTimeEnabled(event.target.checked)}
//               />
//             </label>
//             <input
//               type="datetime-local"
//               id="endTime"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               style={styles.textInput}
//               disabled={!endTimeEnabled}
//             />
//           </div>

//           <div className="max-capacity form-group">
//             <label
//               htmlFor="maxCapacity"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               Maximum Event Capacity{" "}
//               <Tooltip title="Stop accepting submissions after a certain amount of people (optional)">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//               <Switch
//                 checked={maxCapacityEnabled}
//                 onChange={(event) =>
//                   setMaxCapacityEnabled(event.target.checked)
//                 }
//               />
//             </label>
//             <input
//               type="number"
//               id="maxCapacity"
//               value={maxCapacity}
//               onChange={(e) => setMaxCapacity(e.target.value)}
//               style={styles.textInput}
//               disabled={!maxCapacityEnabled}
//             />
//           </div>

//           <div className="email-html">
//             <label
//               htmlFor="emailHTML"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               Email HTML{" "}
//               <Tooltip title="HTML Code for the email being sent. A plain message is also accepted. QR Code gets automatically appended">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//             </label>
//             <textarea
//               id="emailHTML"
//               value={emailHtml}
//               rows={4}
//               cols={4}
//               onChange={(e) => setEmailHtml(e.target.value)}
//               style={styles.textInput}
//             />
//             <div>
//               <label htmlFor="testEmail">Test Email: </label>
//               <input
//                 type="text"
//                 id="testEmail"
//                 value={testEmailAddress}
//                 placeholder="Email address"
//                 onChange={(e) => setTestEmailAddress(e.target.value)}
//               />
//             </div>
//             <button onClick={handleTestEmail}>Test Email</button>
//           </div>

//           <div className="phone-text">
//             <label
//               htmlFor="phoneText"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               Phone Message Text{" "}
//               <Tooltip title="What will be texted along with QR Code to user">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//             </label>
//             <input
//               type="text"
//               id="phoneText"
//               value={phoneText}
//               onChange={(e) => setPhoneText(e.target.value)}
//               style={styles.textInput}
//             />
//             <div>
//               <label htmlFor="testPhone">Test Text Message: </label>
//               <input
//                 type="text"
//                 id="testPhone"
//                 value={testPhoneNumber}
//                 placeholder="Phone Number"
//                 onChange={(e) => setTestPhoneNumber(e.target.value)}
//               />
//             </div>
//             <button onClick={handleTestText}>Test Text Message</button>
//           </div>

//           <div className="further-contact form-group">
//             <label
//               htmlFor="furtherContact"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               Further Contact{" "}
//               <Tooltip title="Users consent to letting company use their information for further marketing">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//             </label>
//             <select
//               id="furtherContact"
//               value={furtherContact}
//               onChange={(e) => setFurtherContact(e.target.value)}
//               style={styles.textInput}
//             >
//               <option value="None">None</option>
//               <option value="Required">Required</option>
//               <option value="Optional">Optional</option>
//             </select>
//           </div>

//           <div className="background-file">
//             <label
//               htmlFor="backgroundFile"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               Background Image{" "}
//               <Tooltip title="Background Image for form. Ensure proper aspect ratio">
//                 <IconButton>
//                   <InfoIcon />
//                 </IconButton>
//               </Tooltip>
//               <Switch
//                 checked={fileEnabled}
//                 onChange={(event) => setFileEnabled(event.target.checked)}
//               />
//             </label>

//             <input
//               type="file"
//               id="backgroundFile"
//               accept=".png;.jpg"
//               onChange={(e) => {
//                 const formData = new FormData();
//                 formData.append(
//                   "image",
//                   e.target.files[0],
//                   e.target.files[0].name
//                 );
//                 setFile(formData);
//               }}
//               style={styles.textInput}
//               disabled={!fileEnabled}
//             />
//           </div>

//           <div className="checkbox-group">
//             <label>Information to Collect:</label>
//             <div className="checkbox">
//               <input
//                 type="checkbox"
//                 checked={emailChecked}
//                 onChange={() => setEmailChecked(!emailChecked)}
//               />
//               <label>Email</label>
//             </div>
//             <div className="checkbox">
//               <input
//                 type="checkbox"
//                 checked={phoneChecked}
//                 onChange={() => setPhoneChecked(!phoneChecked)}
//               />
//               <label>Phone</label>
//             </div>
//             <div className="checkbox">
//               <input
//                 type="checkbox"
//                 checked={ageChecked}
//                 onChange={() => setAgeChecked(!ageChecked)}
//               />
//               <label>Age</label>
//             </div>
//             <div className="checkbox">
//               <input
//                 type="checkbox"
//                 checked={nameChecked}
//                 onChange={() => setNameChecked(!nameChecked)}
//               />
//               <label>Name</label>
//             </div>
//           </div>

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           <button
//             style={{
//               backgroundColor: !event ? "#007bff" : "#6baaff",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               padding: "10px 20px",
//               cursor: !event ? "pointer" : "default",
//               fontSize: "16px",
//               width: "100%",
//               marginTop: "20px",
//             }}
//             type="submit"
//           >
//             Submit
//           </button>

//           {/* QR Code */}
//           {!!event && (
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <h2>Save this qr code to get to your event!</h2>
//               <QrCode linkTo={APP_URI + "/event/" + event.uuid} />
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateEvent;

import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import QrCode from "../Components/QrCode";
import constants from "../constants.json";

import { addEvent, testEmail, testText, uploadImage } from "../utils/api";

function CreateEvent({ addUserEvents, userId }) {
  const [startTimeEnabled, setStartTimeEnabled] = useState(false);
  const [endTimeEnabled, setEndTimeEnabled] = useState(false);
  const [maxCapacityEnabled, setMaxCapacityEnabled] = useState(false);
  const [fileEnabled, setFileEnabled] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [testPhoneNumber, setTestPhoneNumber] = useState("");
  const [file, setFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [fontColor, setFontColor] = useState("#000000");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [furtherContact, setFurtherContact] = useState("None");
  const [landingText, setLandingText] = useState("");
  const [emailHtml, setEmailHtml] = useState(
    `<div
    style="
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      margin: 0;
      padding: 0;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <p style="color: #555">
        Thank you for using our services. Find your personalized QR code:
      </p>
      <p style="color: #555">
        Get your QR code scanned to receive the desired item
      </p>
      <p style="color: #555">Best regards,<br />Your Company Name</p>
    </div>
  </div>`
  );
  const [phoneText, setPhoneText] = useState("");
  const [ageChecked, setAgeChecked] = useState(false);
  const [nameChecked, setNameChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  const APP_URI = constants.PRODUCTION_APP_URI;

  const handleTestEmail = (e) => {
    e.preventDefault();
    if (!testEmailAddress) {
      return setError("You must provide an email address to test with");
    }
    testEmail({ emailAddress: testEmailAddress, emailHTML: emailHtml });
  };

  const handleTestText = (e) => {
    e.preventDefault();
    if (!testPhoneNumber) {
      return setError("You must provide a phone number to test with");
    }
    testText({ phoneNumber: testPhoneNumber, phoneContent: phoneText });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!companyName) {
      return setError("You must include a company name");
    }
    if (startTimeEnabled && !startTime) {
      return setError("You must include a start time or disable it");
    }
    if (endTimeEnabled && !endTime) {
      return setError("You must include an end time or disable it");
    }
    if (maxCapacityEnabled && !maxCapacity) {
      return setError("You must include a maximum capacity or disable it");
    }
    if (fileEnabled && !file) {
      return setError("You must include a file or disable it");
    }
    if (maxCapacityEnabled && isNaN(maxCapacity)) {
      return setError("Maximum capacity must be a number");
    }
    if (phoneChecked + emailChecked < 1) {
      return setError("You must use phone or email");
    }
    if (!fontColor) {
      return setError("You must have a font color (use #000000 for black)");
    }
    let hexCodeRegExp = new RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/i);
    if (!hexCodeRegExp.test(fontColor)) {
      return setError("You must use a valid hex color");
    }
    uploadImage(fileEnabled, file).then((data) => {
      if (!error) {
        addEvent({
          imagePath: data.filename,
          companyName,
          startTime: startTimeEnabled ? new Date(startTime) : "",
          endTime: endTimeEnabled ? new Date(endTime) : "",
          maxCapacity: maxCapacityEnabled ? maxCapacity : 0,
          furtherContact,
          fontColor,
          fields: {
            age: ageChecked,
            name: nameChecked,
            phone: phoneChecked,
            email: emailChecked,
          },
          text: {
            eventLandingText: landingText,
            emailHTML: emailHtml,
            phoneText: phoneText,
          },
          createdBy: userId,
        }).then((res) => {
          if (res.error) return setError(res.message);
          addUserEvents(res.event);
          setEvent({
            uuid: res.event.uuid,
            companyName: res.event.companyName,
            _id: res.event._id,
          });
        });
      }
    });
  };

  const styles = {
    mainContainer: {
      backgroundColor: "#f0f0f0",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    innerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "10px",
      width: "80%",
      paddingLeft: "20px",
    },
    textInput: {
      width: "100%",
      padding: "10px",
      margin: "5px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.innerContainer}>
        <Typography variant="h4" gutterBottom>
          Create a New Event
        </Typography>
        <form
          style={{ width: "60%", marginBottom: "20px" }}
          className="registration-form"
          onSubmit={!event ? handleSubmit : (e) => e.preventDefault()}
        >
          <div className="company-name form-group">
            <label htmlFor="companyName">Company Name*</label>
            <TextField
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              style={styles.textInput}
            />
          </div>

          <div className="landing-text form-group">
            <label htmlFor="landingText">
              Landing Page Text{" "}
              <Tooltip title="Text at the top of the screen of the event form">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </label>
            <TextField
              type="text"
              id="landingText"
              defaultValue={"Receive Promotion from {CompanyName}"}
              value={landingText}
              onChange={(event) => setLandingText(event.target.value)}
              required
              style={styles.textInput}
            />
          </div>

          <div className="font-color form-group">
            <label htmlFor="fontColor">
              Text Font Color (Hex){" "}
              <Tooltip title="Change font color to not interfere with background">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </label>
            <TextField
              type="text"
              id="fontColor"
              value={fontColor}
              onChange={(event) => setFontColor(event.target.value)}
              required
              style={styles.textInput}
            />
          </div>

          <div className="start-time form-group">
            <label
              htmlFor="startTime"
              style={{ display: "flex", alignItems: "center" }}
            >
              Start Time*
              <Tooltip title="Begin accepting submissions at a certain time">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControlLabel
                control={
                  <Switch
                    checked={startTimeEnabled}
                    onChange={(event) =>
                      setStartTimeEnabled(event.target.checked)
                    }
                  />
                }
                label=""
              />
            </label>
            <TextField
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={styles.textInput}
              disabled={!startTimeEnabled}
            />
          </div>

          <div className="end-time form-group">
            <label
              htmlFor="endTime"
              style={{ display: "flex", alignItems: "center" }}
            >
              End Time
              <Tooltip title="Stop accepting submissions after a certain time (optional)">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControlLabel
                control={
                  <Switch
                    checked={endTimeEnabled}
                    onChange={(event) =>
                      setEndTimeEnabled(event.target.checked)
                    }
                  />
                }
                label=""
              />
            </label>
            <TextField
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={styles.textInput}
              disabled={!endTimeEnabled}
            />
          </div>

          <div className="max-capacity form-group">
            <label
              htmlFor="maxCapacity"
              style={{ display: "flex", alignItems: "center" }}
            >
              Maximum Event Capacity{" "}
              <Tooltip title="Stop accepting submissions after a certain amount of people (optional)">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControlLabel
                control={
                  <Switch
                    checked={maxCapacityEnabled}
                    onChange={(event) =>
                      setMaxCapacityEnabled(event.target.checked)
                    }
                  />
                }
                label=""
              />
            </label>
            <TextField
              type="number"
              id="maxCapacity"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              style={styles.textInput}
              disabled={!maxCapacityEnabled}
            />
          </div>

          <div className="email-html">
            <label
              htmlFor="emailHTML"
              style={{ display: "flex", alignItems: "center" }}
            >
              Email HTML{" "}
              <Tooltip title="HTML Code for the email being sent. A plain message is also accepted. QR Code gets automatically appended">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </label>
            <TextField
              id="emailHTML"
              value={emailHtml}
              multiline
              rows={4}
              variant="outlined"
              onChange={(e) => setEmailHtml(e.target.value)}
              style={styles.textInput}
            />
            <div>
              <label htmlFor="testEmail">Test Email: </label>
              <TextField
                type="text"
                id="testEmail"
                value={testEmailAddress}
                placeholder="Email address"
                onChange={(e) => setTestEmailAddress(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTestEmail}
            >
              Test Email
            </Button>
          </div>

          <div className="phone-text">
            <label
              htmlFor="phoneText"
              style={{ display: "flex", alignItems: "center" }}
            >
              Phone Message Text{" "}
              <Tooltip title="What will be texted along with QR Code to the user">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </label>
            <TextField
              type="text"
              id="phoneText"
              value={phoneText}
              onChange={(e) => setPhoneText(e.target.value)}
              style={styles.textInput}
            />
            <div>
              <label htmlFor="testPhone">Test Text Message: </label>
              <TextField
                type="text"
                id="testPhone"
                value={testPhoneNumber}
                placeholder="Phone Number"
                onChange={(e) => setTestPhoneNumber(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTestText}
            >
              Test Text Message
            </Button>
          </div>

          <div className="further-contact form-group">
            <label
              htmlFor="furtherContact"
              style={{ display: "flex", alignItems: "center" }}
            >
              Further Contact{" "}
              <Tooltip title="Users consent to letting the company use their information for further marketing">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </label>
            <Select
              id="furtherContact"
              value={furtherContact}
              onChange={(e) => setFurtherContact(e.target.value)}
              style={styles.textInput}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Required">Required</MenuItem>
              <MenuItem value="Optional">Optional</MenuItem>
            </Select>
          </div>

          <div className="background-file">
            <label
              htmlFor="backgroundFile"
              style={{ display: "flex", alignItems: "center" }}
            >
              Background Image{" "}
              <Tooltip title="Background Image for the form. Ensure proper aspect ratio">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <FormControlLabel
                control={
                  <Switch
                    checked={fileEnabled}
                    onChange={(event) => setFileEnabled(event.target.checked)}
                  />
                }
                label=""
              />
            </label>
            <input
              type="file"
              id="backgroundFile"
              accept=".png, .jpg"
              onChange={(e) => setFile(e.target.files[0])}
              style={styles.textInput}
              disabled={!fileEnabled}
            />
          </div>

          <div className="checkbox-group">
            <Typography variant="body1">Information to Collect:</Typography>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailChecked}
                    onChange={() => setEmailChecked(!emailChecked)}
                  />
                }
                label="Email"
              />
            </div>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={phoneChecked}
                    onChange={() => setPhoneChecked(!phoneChecked)}
                  />
                }
                label="Phone"
              />
            </div>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ageChecked}
                    onChange={() => setAgeChecked(!ageChecked)}
                  />
                }
                label="Age"
              />
            </div>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={nameChecked}
                    onChange={() => setNameChecked(!nameChecked)}
                  />
                }
                label="Name"
              />
            </div>
          </div>

          {error && (
            <Typography variant="body2" style={{ color: "red" }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color={!event ? "primary" : "secondary"}
            style={{
              color: "white",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: !event ? "pointer" : "default",
              fontSize: "16px",
              width: "100%",
              marginTop: "20px",
            }}
            type="submit"
          >
            Submit
          </Button>

          {!!event && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Save this QR code to get to your event!
              </Typography>
              <QrCode linkTo={APP_URI + "/event/" + event.uuid} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
