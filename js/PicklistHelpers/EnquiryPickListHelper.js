export default function enquiryPickList() {
  const customData = require("../../EnquiryPickList.json");
  // console.log("custom data  : " + customData);
  let picklistValues = {};

  customData.fields.map((field, index) => {
    if (field.picklistValues.length) {
      //console.log('' + index + ' - ' + field.name);
      picklistValues[field.name] = field.picklistValues.map(pick => {
        //console.log(JSON.stringify(pick));
        return {label: pick.label, value: pick.value};
      });
    }
  });

  return picklistValues;
}
