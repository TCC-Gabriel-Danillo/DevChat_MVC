import "./async-storage";
import "./useAuthPrompt";
import "./redux-persist";
import "./react-navigation";
import "./firebase-utils";
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
