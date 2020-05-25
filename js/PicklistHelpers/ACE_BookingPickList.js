export default function ACE_BookingPickList() {
    const customData = require("../../ACE_BookingPickList.json");
    // console.log("custom data  : " + customData);
    let picklistValues = {};
  
    customData.fields.map((field, index) => {
      if (field.picklistValues.length) {
        //console.log('' + index + ' - ' + field.name);
        picklistValues[field.name] = field.picklistValues.map(pick => {
          return pick.label;
        });
      }
    });
  
    return picklistValues;
  }
  