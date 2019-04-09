import amplitude from 'amplitude-js';
import UAParser from 'ua-parser-js';

const amplitudeInstance = amplitude.getInstance();

amplitudeInstance.init(process.env.AMPLITUDE_API_KEY);

const logEvent = ({ name, properties = {} }) => {
  const additionalInformation = {
    url: window.location.href,
    ref: window.document.referrer,
    ...properties,
  };

  amplitudeInstance.logEvent(name, additionalInformation);
};

const identifyUser = () => {
  // TO-DO: get parsed user from JWT token
  // const user = {};

  // amplitudeInstance.setUserId(user.id);
  amplitudeInstance.setUserProperties(UAParser(navigator.userAgent));
};

// eslint-disable-next-line no-unused-vars
export default store => next => (action) => {
  const result = next(action);

  const { amplitude: actionAmplitude = {} } = action;
  const { event, identify } = actionAmplitude;

  if (event) {
    logEvent(event);
  }

  if (identify) {
    identifyUser();
  }

  return result;
};
