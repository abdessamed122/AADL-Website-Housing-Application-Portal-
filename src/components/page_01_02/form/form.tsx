import "./form.css";
import { useState } from "react";

import captcha_img from "../../../assets/captcha_full.png";
// ! this contains both the form and the buttons for submission

import terms_img from "../../../assets/terms_logo.png";
// import question_svg from "../../../assets/question_mark.svg";

import correct_logo from "../../../assets/icons8-correct-64.svg";

// import nss from "../../../assets/nss.png";
// import NIN from "../../../assets/NIN.png";
interface FormInterface {
  pageNumber: number;
  hide_show_numberLine: any;
  setActiveBubble: any;
  setIsAdleLogoVisible: any;
  children?: React.ReactNode; // Allows optional child elements
}

function Form(props: FormInterface) {
  const [currentPage, setCurrentPage] = useState(props.pageNumber);

  // ! i only need to enable-disable NEXT for page 01 and 02
  //! dependingon valid and green
  // page 01 : has phone number and wilya
  // page 02 : has NIN and NSS
  // const [page_01_continue, set_page_01_continue] = useState(false);
  // const [page_02_continue, set_page_02_continue] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("+213");
  const [phoneNumberGreen, setPhoneNumberGreen] = useState(false);

  const [notARobot, setNotARobot] = useState(false);

  const [selectedWilaya, setSelectedWilaya] = useState("ولاية الإقامة");

  const [NIN, setNIN] = useState("");
  const [NINGreen, setNINGreen] = useState(false);

  const [NSS, setNSS] = useState("");
  const [NSSGreen, setNSSGreen] = useState(false);

  const [accepted, setAccepted] = useState(false);

  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const wilayas = [
    { number: 1, name: "Adrar" },
    { number: 2, name: "Chlef" },
    { number: 3, name: "Laghouat" },
    { number: 4, name: "Oum El Bouaghi" },
    { number: 5, name: "Batna" },
    { number: 6, name: "Béjaïa" },
    { number: 7, name: "Biskra" },
    { number: 8, name: "Béchar" },
    { number: 9, name: "Blida" },
    { number: 10, name: "Bouira" },
    { number: 11, name: "Tamanghasset" },
    { number: 12, name: "Tébessa" },
    { number: 13, name: "Tiaret" },
    { number: 14, name: "Tizi Ouzou" },
    { number: 15, name: "Algiers" },
    { number: 16, name: "Djelfa" },
    { number: 17, name: "Jijel" },
    { number: 18, name: "Setif" },
    { number: 19, name: "Saïda" },
    { number: 20, name: "Skikda" },
    { number: 21, name: "Sidi Bel Abbes" },
    { number: 22, name: "Tlemcen" },
    { number: 23, name: "Tiaret" },
    { number: 24, name: "Tizi Ouzou" },
    { number: 25, name: "El Oued" },
    { number: 26, name: "Khenchela" },
    { number: 27, name: "M’Sila" },
    { number: 28, name: "Mascara" },
    { number: 29, name: "Mostaganem" },
    { number: 30, name: "Médéa" },
    { number: 31, name: "Mila" },
    { number: 32, name: "Ain Defla" },
    { number: 33, name: "Naama" },
    { number: 34, name: "Oran" },
    { number: 35, name: "El Bayadh" },
    { number: 36, name: "Illizi" },
    { number: 37, name: "Bordj Bou Arréridj" },
    { number: 38, name: "Boumerdès" },
    { number: 39, name: "El Tarf" },
    { number: 40, name: "Tindouf" },
    { number: 41, name: "Tissemsilt" },
    { number: 42, name: "Ghardaïa" },
    { number: 43, name: "Relizane" },
    { number: 44, name: "Annaba" },
    { number: 45, name: "Béjaïa" },
    { number: 46, name: "Tlemcen" },
  ];
  const handleChange = (event: any) => {
    setSelectedWilaya(event.target.value);
  };
  const handlePhoneNumberChange = (event: any) => {
    let inputValue = event.target.value;

    // ! clean it and rreplace non-numeric characters :
    inputValue = inputValue.replace(/[^0-9]/g, "");
    if (inputValue.length > 12) {
      inputValue = inputValue.slice(0, 12);
    }
    // ! green it :
    if (inputValue.length == 12 && validPhoneNumber) {
      setPhoneNumberGreen(true);
    } else {
      setPhoneNumberGreen(false);
    }

    // ! valid phone number :
    if (inputValue[3] == 6 || inputValue[3] == 7 || inputValue[3] == 5) {
      console.log(inputValue);
      setValidPhoneNumber(true);
    } else if (inputValue.length == 3) {
      console.log(inputValue.length);
      setValidPhoneNumber(true);
    } else {
      setValidPhoneNumber(false);
    }

    // ! starts with +213 :
    console.log(inputValue);
    // If it starts with +21 or +2, correct it to +213
    if (inputValue.startsWith("21")) {
      inputValue = "+213" + inputValue.slice(3); // Replaces +21 with +213
    } else if (inputValue.startsWith("2")) {
      inputValue = "+213" + inputValue.slice(2); // Replaces +2 with +213
    }

    // If it doesn't start with +213, prepend it
    if (!inputValue.startsWith("213")) {
      inputValue = "+213" + inputValue.replace(/^\+?213/, "");
    }
    setPhoneNumber(inputValue);
  };
  // ! NIN AND ITS VALIDATION
  const [validNIN, setValidNIN] = useState(true);

  const handleNINchange = (event: any) => {
    let inputValue = event.target.value;

    // ! clean it and rreplace non-numeric characters :
    inputValue = inputValue.replace(/[^0-9]/g, "");
    if (inputValue.length > 18) {
      inputValue = inputValue.slice(0, 18);
    }

    // ! Green it :
    if (inputValue.length == 18 && search_forNIN_user(inputValue)) {
      setNINGreen(true);
      setValidNIN(true);
    } else {
      // todo : condition here is :: length<>18 or ninUser_doesnt_exist :
      setNINGreen(false);
      // ! edge case for the NIN :
      if (inputValue.length < 18) {
        setValidNIN(true);
      } else {
        setValidNIN(false);
      }
    }

    setNIN(inputValue); // Update the state with the input value
  };
  const handleNSSchange = (event: any) => {
    let inputValue = event.target.value;

    // ! clean it and rreplace non-numeric characters :
    inputValue = inputValue.replace(/[^0-9]/g, "");
    if (inputValue.length > 12) {
      inputValue = inputValue.slice(0, 12);
    }
    //! Green it :
    if (inputValue.length == 12) {
      setNSSGreen(true);
    } else {
      setNSSGreen(false);
    }
    setNSS(inputValue); // Update the state with the input value
  };

  function showTerms() {
    props.setIsAdleLogoVisible(false);
    setCurrentPage(4);
  }
  function navigatePage(page: number) {
    setCurrentPage(page);
  }

  function go_to_page02() {
    if (validPhoneNumber && phoneNumberGreen) {
      navigatePage(2);
    }
  }

  function accept(isAccepted: boolean) {
    setAccepted(isAccepted);
    props.setIsAdleLogoVisible(true);
    navigatePage(3);
  }
  function handleGoToTheLastPage() {
    if (accepted && notARobot) {
      navigatePage(5);
    }
  }

  // ! fake database operations :

  const fake_NIN_database = [
    "111111111111111111",
    "222222222222222222",
    "333333333333333333",
    "444444444444444444",
    "555555555555555555",
    "666666666666666666",
    "777777777777777777",
    "888888888888888888",
    "999999999999999999",
  ];

  function search_forNIN_user(NIN: string): boolean {
    let exist = false;

    fake_NIN_database.forEach((nin) => {
      if (nin == NIN.toString()) {
        exist = true;
      }
    });

    console.log(`AFTER COMPARING WE HAVE : ${exist}`);
    console.log(`${NIN.length} NIN ${NIN}`);

    return exist;
  }

  // To get the current NIN and NSS values:
  console.log("Current NIN:", NIN);
  console.log("Current NSS:", NSS);

  // ! page 01 :
  if (currentPage == 1) {
    // NUMBER LINE CONFIGS
    props.hide_show_numberLine(true);
    props.setActiveBubble(1);
    // HIDE THE aadle LOGO
    props.setIsAdleLogoVisible(true);

    return (
      <div className="form-container">
        {/* ! spaing  */}
        <div className="spacer"></div>
        {/* the fields */}
        {/* PHONE NUMBER */}
        <h1 className="field-text">رقم الهاتف النقال</h1>
        <input
          className={
            phoneNumberGreen ? "phone-input-field green" : "phone-input-field"
          }
          type="text"
          value={phoneNumber.toString()}
          onChange={handlePhoneNumberChange}
        />
        <div
          className={
            validPhoneNumber ? "hint-txt" : "hint-txt " + "invalidPhoneNumber"
          }
        >
          {validPhoneNumber
            ? "example: +213558851620."
            : "Invalid Phone Number"}
        </div>
        {/* <p id="number-hint">ex : +213558851622</p> */}
        {/* WILIAYA */}
        {/* WILIAYA */}
        <div className="spacer"></div>
        <h1 className="field-text">قم بتحديد ولاية الإقامة</h1>
        <div className="spacer"></div>
        {/* DROP DOWN */}
        <div className="input-container">
          <select
            id="wilayas"
            value={selectedWilaya}
            onChange={handleChange}
            className="wilayas-dropdown"
          >
            <option value="" disabled>
              {selectedWilaya ? `ولاية - ${selectedWilaya}` : "ولاية"}
            </option>
            {wilayas.map((wilaya) => (
              <option key={wilaya.number} value={wilaya.name}>
                {wilaya.number} - {wilaya.name}
              </option>
            ))}
          </select>
        </div>
        {/* SUBMIT BUTTONS  */}
        <div className="buttons-container">
          {/* <button id="cancel-txt">إلغاء </button> */}
          <button
            id="continue-button"
            className={
              validPhoneNumber && phoneNumberGreen
                ? ""
                : "page-one-two-grayable"
            }
            onClick={go_to_page02}
          >
            متابعة
          </button>
        </div>
      </div>
    );

    // ! page 02 :
  } else if (currentPage == 2) {
    // NUMBER LINE CONFIGS
    props.hide_show_numberLine(true);
    props.setActiveBubble(2);
    // HIDE THE aadle LOGO
    props.setIsAdleLogoVisible(true);

    return (
      <div className="form-container">
        {/* ! spaing  */}
        <div className="spacer"></div>
        {/* the fields */}
        {/* PHONE NUMBER */}
        <h1 className="field-text"> رقم التعريف الوطني - NIN </h1>
        <div className="input-postIcons-container">
          <input
            className={
              NINGreen ? "phone-input-field green" : "phone-input-field"
            }
            type="text"
            placeholder="NIN"
            value={NIN.toString()
            }
            onChange={handleNINchange}
          />
          <a href={NIN} target="_blank">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.877075 7.49972C0.877075 3.84204 3.84222 0.876892 7.49991 0.876892C11.1576 0.876892 14.1227 3.84204 14.1227 7.49972C14.1227 11.1574 11.1576 14.1226 7.49991 14.1226C3.84222 14.1226 0.877075 11.1574 0.877075 7.49972ZM7.49991 1.82689C4.36689 1.82689 1.82708 4.36671 1.82708 7.49972C1.82708 10.6327 4.36689 13.1726 7.49991 13.1726C10.6329 13.1726 13.1727 10.6327 13.1727 7.49972C13.1727 4.36671 10.6329 1.82689 7.49991 1.82689ZM8.24993 10.5C8.24993 10.9142 7.91414 11.25 7.49993 11.25C7.08571 11.25 6.74993 10.9142 6.74993 10.5C6.74993 10.0858 7.08571 9.75 7.49993 9.75C7.91414 9.75 8.24993 10.0858 8.24993 10.5ZM6.05003 6.25C6.05003 5.57211 6.63511 4.925 7.50003 4.925C8.36496 4.925 8.95003 5.57211 8.95003 6.25C8.95003 6.74118 8.68002 6.99212 8.21447 7.27494C8.16251 7.30651 8.10258 7.34131 8.03847 7.37854L8.03841 7.37858C7.85521 7.48497 7.63788 7.61119 7.47449 7.73849C7.23214 7.92732 6.95003 8.23198 6.95003 8.7C6.95004 9.00376 7.19628 9.25 7.50004 9.25C7.8024 9.25 8.04778 9.00601 8.05002 8.70417L8.05056 8.7033C8.05924 8.6896 8.08493 8.65735 8.15058 8.6062C8.25207 8.52712 8.36508 8.46163 8.51567 8.37436L8.51571 8.37433C8.59422 8.32883 8.68296 8.27741 8.78559 8.21506C9.32004 7.89038 10.05 7.35382 10.05 6.25C10.05 4.92789 8.93511 3.825 7.50003 3.825C6.06496 3.825 4.95003 4.92789 4.95003 6.25C4.95003 6.55376 5.19628 6.8 5.50003 6.8C5.80379 6.8 6.05003 6.55376 6.05003 6.25Z"
                fill="#000000"
              />
            </svg>
          </a>
        </div>
        {/* todo : NIN ERROR */}
        <div className={validNIN ? "hint-txt validNIN" : "hint-txt inValidNIN"}>
          لا يوجد مستعمل بهذا الرقم
        </div>

        {/* WILIAYA */}
        {/* WILIAYA */}
        <div className="spacer"></div>
        <div className="spacer"></div>

        <h1 className="field-text"> رقم الضمان الإجتماعي- NSS</h1>
        <div className="input-postIcons-container">
          <input
            className={
              NSSGreen ? "phone-input-field green" : "phone-input-field"
            }
            type="text"
            placeholder="NSS"
            value={NSS.toString()}
            onChange={handleNSSchange}
          />
          <a
            href="https://upload.wikimedia.org/wikipedia/commons/9/9e/La_carte_CHIFA.jpg"
            target="_blank"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.877075 7.49972C0.877075 3.84204 3.84222 0.876892 7.49991 0.876892C11.1576 0.876892 14.1227 3.84204 14.1227 7.49972C14.1227 11.1574 11.1576 14.1226 7.49991 14.1226C3.84222 14.1226 0.877075 11.1574 0.877075 7.49972ZM7.49991 1.82689C4.36689 1.82689 1.82708 4.36671 1.82708 7.49972C1.82708 10.6327 4.36689 13.1726 7.49991 13.1726C10.6329 13.1726 13.1727 10.6327 13.1727 7.49972C13.1727 4.36671 10.6329 1.82689 7.49991 1.82689ZM8.24993 10.5C8.24993 10.9142 7.91414 11.25 7.49993 11.25C7.08571 11.25 6.74993 10.9142 6.74993 10.5C6.74993 10.0858 7.08571 9.75 7.49993 9.75C7.91414 9.75 8.24993 10.0858 8.24993 10.5ZM6.05003 6.25C6.05003 5.57211 6.63511 4.925 7.50003 4.925C8.36496 4.925 8.95003 5.57211 8.95003 6.25C8.95003 6.74118 8.68002 6.99212 8.21447 7.27494C8.16251 7.30651 8.10258 7.34131 8.03847 7.37854L8.03841 7.37858C7.85521 7.48497 7.63788 7.61119 7.47449 7.73849C7.23214 7.92732 6.95003 8.23198 6.95003 8.7C6.95004 9.00376 7.19628 9.25 7.50004 9.25C7.8024 9.25 8.04778 9.00601 8.05002 8.70417L8.05056 8.7033C8.05924 8.6896 8.08493 8.65735 8.15058 8.6062C8.25207 8.52712 8.36508 8.46163 8.51567 8.37436L8.51571 8.37433C8.59422 8.32883 8.68296 8.27741 8.78559 8.21506C9.32004 7.89038 10.05 7.35382 10.05 6.25C10.05 4.92789 8.93511 3.825 7.50003 3.825C6.06496 3.825 4.95003 4.92789 4.95003 6.25C4.95003 6.55376 5.19628 6.8 5.50003 6.8C5.80379 6.8 6.05003 6.55376 6.05003 6.25Z"
                fill="#000000"
              />
            </svg>
          </a>
        </div>

        {/* SUBMIT BUTTONS  */}
        <div className="buttons-container">
          <button id="cancel-txt" onClick={() => navigatePage(1)}>
            إلغاء
          </button>
          <button
            id="continue-button"
            onClick={() => {
              if (NINGreen && NSSGreen) {
                navigatePage(3);
              }
            }}
            className={NINGreen && NSSGreen ? "" : "page-one-two-grayable"}
          >
            متابعة
          </button>
        </div>
      </div>
    );
    // ! PAGE 03
  } else if (currentPage == 3) {
    // NUMBER LINE CONFIGS
    props.hide_show_numberLine(true);
    props.setActiveBubble(3);
    return (
      <div className="form-container">
        {/* ! spaing  */}
        <div className="spacer"></div>
        {/* the fields */}
        {/* PHONE NUMBER */}
        {/* <h1 className="field-text"> رقم التعريف الوطني - NIN </h1> */}

        {/* CAPTCHA */}
        <div className="captcha-box">
          {/* captcha content */}
          <div className="text-and-checkbox-container">
            <input
              type="checkbox"
              name=""
              id="captcha-box"
              checked={notARobot}
              onClick={() => setNotARobot(!notARobot)}
            />
            <h1 id="robot-txt">I'm not a robot</h1>
          </div>
          <img src={captcha_img} alt="" height="50px" />
        </div>
        {/* WILIAYA */}
        {/* WILIAYA */}
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>

        <h1 className="conditions-txt" onClick={showTerms}>
          من خلال إكمال هذا النموذج، أوافق على{" "}
          <span className="terms-highlight">الشروط والأحكام</span>
        </h1>

        {/* SUBMIT BUTTONS  -- GRAYABLE*/}
        <div
          className="buttons-container"
          title={accepted ? "" : "يرجى الموافقة على الشروط والاحكام"}
        >
          <button id="cancel-txt" onClick={() => navigatePage(2)}>
            إلغاء{" "}
          </button>
          <button
            id="grayable-button"
            className={accepted && notARobot ? "normal" : "grayable"}
            onClick={() => handleGoToTheLastPage()}
          >
            متابعة
          </button>
        </div>
      </div>
    );
    //! PAGE 04
  } else if (currentPage == 4) {
    // NUMBER LINE CONFIGS
    props.hide_show_numberLine(false);
    // props.setActiveBubble(1)
    return (
      <div className="form-container" style={{ marginTop: "16px" }}>
        {/* ! spaing  */}
        <div className="conditions-container">
          <div className="image_and_header">
            <img src={terms_img} alt="" height="40px" />
            <h1 className="full-conditions-text">
              الموافقة على شروط وإجراءات الحصول على السكن في إطار برنامج البيع
              بالإيجار
            </h1>
          </div>
          <hr />
          {/* CONDITIONS */}
          <ul>
            <li>
              <p>
                أن يكون المتقدم جزائري الجنسية ومقيمًا في الجزائر بشكل دائم.
              </p>
            </li>
            <li>
              <p>
                أصرح أنني لست متزوجة أو متزوجا من شخص يملك مسكنا، ولم يسبق لي أو
                له الحصول على مسكن أو قطعة أرضية للبناء.
              </p>
            </li>
            <li>
              <p>
                أصرح أنني لست مالكا لأي عقار، سواء مسكن فردي، تجاري، أو عقار
                صناعي.
              </p>
            </li>
            <li>
              <p>
                أصرح أنني أقيم إقامة دائمة في المكان المحدد بالطلب، و أنني لست
                حاصلاً على أي دعم مادي مخصص للسكن.
              </p>
            </li>
            <li>
              <p>
                أصرح أنني على علم بالشروط المتعقلة ببرنامج البيع بالإيجار بموجب
                القرار الوزاري رقم 105 الصادر في 23 أبريل 2001، و أتعهد بتوفير و
                تسديد المستحقات المالية.
              </p>
            </li>
            <li>
              <p>ألا يقل دخله الشهري عن 24000 دينار جزائري.</p>
            </li>
            <li>
              <p>سداد الأقساط الشهرية في المواعيد المحددة.</p>
            </li>
          </ul>
          {/* submit buttons  */}
          {/* SUBMIT BUTTONS  */}
          <div className="buttons-container">
            <button id="cancel-txt" onClick={() => accept(false)}>
              إلغاء{" "}
            </button>
            <button id="continue-button" onClick={() => accept(true)}>
              موافقة
            </button>
          </div>
        </div>
      </div>
    );
  } else if (currentPage == 5) {
    // NUMBER LINE CONFIGS
    props.hide_show_numberLine(false);
    // props.setActiveBubble(1);
    // HIDE THE aadle LOGO
    props.setIsAdleLogoVisible(false);

    return (
      <div className="last-page-form-container">
        <h1 id="last-page-title"> اكتملت عملية التسجيل</h1>
        <h1 id="last-page-sub-title"> يرجى التحقق من المعلومات الشخصية</h1>

        {/* the fields */}
        {/* PHONE NUMBER */}
        <h1 className="field-text"> رقم الهاتف النقال</h1>
        <div className="input-and-update-container">
          <div onClick={() => navigatePage(1)} className="update-buttons">
            تعديل
          </div>
          <input
            className={
              phoneNumberGreen ? "phone-input-field green" : "phone-input-field"
            }
            type="text"
            // placeholder="NIN"
            value={phoneNumber.toString()}
            // onChange={handleNINchange}
          />
        </div>
        {/* WILIAYA */}
        <h1 className="field-text"> ولاية الإقامة</h1>

        <div className="input-and-update-container">
          <div onClick={() => navigatePage(1)} className="update-buttons">
            تعديل
          </div>
          <input
            className="phone-input-field"
            type="text"
            // placeholder="NIN"
            value={selectedWilaya.toString()}
            // onChange={handleNINchange}
          />
        </div>
        {/* NIN NUMBER*/}
        <h1 className="field-text">رقم التعريف الوطني - NIN</h1>

        <div className="input-and-update-container">
          <div onClick={() => navigatePage(2)} className="update-buttons">
            تعديل
          </div>
          <input
            className={
              NINGreen ? "phone-input-field green" : "phone-input-field"
            }
            type="text"
            // placeholder="NIN"
            value={NIN.toString()}
            // onChange={handleNINchange}
          />
        </div>
        {/* NSS NUMBER */}
        <h1 className="field-text">رقم الضمان الإجتماعي- NSS</h1>

        <div className="input-and-update-container">
          <div onClick={() => navigatePage(2)} className="update-buttons">
            تعديل
          </div>
          <input
            className={
              NSSGreen ? "phone-input-field green" : "phone-input-field"
            }
            type="text"
            // placeholder="NIN"
            value={NSS.toString()}
            // onChange={handleNINchange}
          />
        </div>
        {/* SUBMIT BUTTONS  */}
        <div className="buttons-container">
          <button id="continue-button" onClick={() => navigatePage(6)}>
            تأكيد
          </button>
        </div>
      </div>
    );
  } else if (currentPage == 6) {
    // HIDE THE aadle LOGO
    props.setIsAdleLogoVisible(false);

    return (
      <div className="submission-successful">
        <img height="128px" width="128px" src={correct_logo} alt="" />
        <h1>تمت عملية التسجيل بنجاح</h1>
        <h2>يرجى زيارة الموقع لاحقا للاطلاع على النتائج</h2>
      </div>
    );
  }
}

export default Form;
