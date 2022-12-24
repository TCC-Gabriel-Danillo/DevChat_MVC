import "../__mocks__/async-storage";
import "../__mocks__/useAuthPrompt";
import "../__mocks__/redux-persist";
import "../__mocks__/react-navigation";
import "../__mocks__/firebase-utils";
jest
  .useFakeTimers({
    doNotFake: [
      "nextTick",
      "setImmediate",
      "clearImmediate",
      "setInterval",
      "clearInterval",
      "setTimeout",
      "clearTimeout",
    ],
  })
  .setSystemTime(new Date());
