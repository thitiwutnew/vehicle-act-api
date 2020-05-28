const model = require("../../repositories");
const _ = require("lodash");
const calculateActStatus = require("../../utils/calculateActStatus");

module.exports = async function (payload, filter) {
  let Act = await model.Act.find(payload).sort({ _id: -1 });
  let ActData = Act.map((val, index) => {
    return {
      ..._.omit(val, ["__v"]),
      ...calculateActStatus(val.actExpireDate)
    };
  });

  return filter !== undefined
    ? ActData.filter((x) =>
        filter.includes(x.statusexpired)
      )
    : ActData;
};
