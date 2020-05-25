export default function EnquiryProduct2PickList() {
  const customData = require("../../EnquiryProduct2PickList.json");
  // console.log("custom data  : " + customData);
  let picklistValues = {};

  customData.fields.map((field, index) => {
    if (field.picklistValues.length) {
      //console.log('' + index + ' - ' + field.name);
      picklistValues[field.name] = field.picklistValues.map(pick => {
        //console.log(pick)
        return pick.label;
      });
    }
  });
  return picklistValues;
}
