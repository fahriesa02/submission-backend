const respondSuccess = ({respondMessage = '', respondData = {}}) => ({
  status: 'success',
  message: respondMessage,
  data: respondData,
});

const respondFailure = ({respondMessage = '', respondData = {}, withData = true}) => {
  if (withData) {
    return {
      status: 'fail',
      message: respondMessage,
      data: respondData,
    };
  }
  return {
    status: 'fail',
    message: respondMessage,
  };
};

const respondError = (respondMessage = '') => ({
  status: 'error',
  message: respondMessage,
});

module.exports = {respondSuccess, respondError, respondFailure};
