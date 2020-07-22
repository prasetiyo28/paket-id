const async = require('async');

const misc = require('../helpers/misc');

const message = {
  sendResponse: (res, msgCode, data) => {
    return misc.responses(
      res,
      {
        msg_success: false,
        msg_code: msgCode,
        msg_client: msgCode
      },
      data
    );
  }
}
  


module.exports = message;
