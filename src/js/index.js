// Import Stylesheet
import "../scss/index.scss";
// Import ImageSlider Class Library
import ImageSilder from "./lib/ImageSlider.js";
// Import Utility Functions
import getObjectProps from "./utils/getObjectProps";
import createElement from "./utils/createElement";
import getComponentName from "./utils/getComponentName";
import CardComponent from "./lib/pages/home/components/Card.component";
import ImageListComponent from "./lib/pages/home/components/ImageList.component";
import { images } from "./utils/imageListData";
import HomePage from "./lib/pages/home/Home.module";

// -----------------------------------------------------------------------
// FETCH PAGE DATA
// -----------------------------------------------------------------------
// const fetch = await fetch(`${assetsHost}/assets/Slider_Image_1.png`);
// const data = await fetch.json();
// console.log("Data: ", data);

// fetch("http://127.0.0.1:5501/src/js/data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("data: ", data);
//     const contentElements = document.querySelectorAll("[data-content-id]");
//     console.log("contentElements: ", contentElements);

//     for (let i = 0; i < contentElements.length; i++) {
//       console.log(contentElements[i].dataset.contentId);

//       const dataContent = getObjectProps(
//         data,
//         contentElements[i].dataset.contentId
//       );
//       console.log("DataContent: ", dataContent);

//       if (typeof dataContent === "string") {
//         contentElements[i].innerText = getObjectProps(
//           data,
//           contentElements[i].dataset.contentId
//         );
//       }
//       // Check if the property value if an object
//       else if (dataContent?.__type == "cta-btn") {
//         contentElements[i].innerText = dataContent.text;
//         contentElements[i].setAttribute("href", dataContent.link);
//       }
//       // Check if the property value is an array
//       else if (dataContent?.length > 0) {
//         dataContent.map((element, elementIndex) => {
//           const componentName = getComponentName(
//             contentElements[i].dataset.contentId
//           );
//           console.log("ComponentName: ", componentName);
//           // Define options for the imgList's image element class attribute value
//           const imgListClassOptions = {
//             ImgSlider: "hero__img-slider__img",
//             imgDatas: "hero__client-logos__img",
//           };

//           // Define element attributes
//           const attributes = {
//             parent: [
//               {
//                 name: "class",
//                 value: imgListClassOptions[componentName],
//               },
//               {
//                 name: "data-img-index",
//                 // The image index should start at 1
//                 value: `${elementIndex + 1}`,
//               },
//             ],
//             child: element.attributes,
//           };
//           let htmlTag = createElement(element.__type, attributes);
//           console.log("htmlTag: ", htmlTag);
//           // Append the htmlTag to the current contet element
//           contentElements[i].append(htmlTag);
//         });
//       } else if (
//         contentElements[i].dataset.contentId === "aboutUsSection.statement"
//       ) {
//         console.log("Card DataContent: ", dataContent);
//         const statementCard = new CardComponent(dataContent);
//         console.log("statementCard: ", statementCard);
//         contentElements[i].innerHTML = statementCard.html;
//       }
//       contentElements[i].classList.remove("skeleton");
//       contentElements[i].classList.remove("skeleton-cta");
//     }

//     // Initialize the image slider
//     // new ImageSilder({
//     //   imgSliderIdentifier: "#hero-img-slider",
//     //   dataAttributeIdentifier: "data-img-index",
//     // });

//     // const ImageList__Component = new ImageListComponent({
//     //   ulElementAttr: [{ name: "class", value: "test" }],
//     //   images: images(data.heroSection.clientLogos),
//     // });

//     // console.log({ ImageList__Component });
//     // console.log("ImageList__Component: ", ImageList__Component.template);

//   });

new HomePage();
