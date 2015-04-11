import {inject} from 'aurelia-dependency-injection';
import {ONE_WAY, TWO_WAY, ONE_TIME, Listener, BindingSignaler} from 'aurelia-binding';

export class ThrottleBindingBehavior {
  connect(binding, source, timeout = 200) {
    var timeoutId = null, value, last = 0, elapsed, intercept, info;

    intercept = updateTargetFn => {
      return newValue => {
        value = newValue;
        elapsed = +new Date() - last;
        if (elapsed >= timeout) {
          last = +new Date();
          updateTargetFn(value);
          return;
        }
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            timeoutId = null;
            last = +new Date();
            updateTargetFn(value);
          }, timeout - elapsed);
        }
      };
    };

    info = {
      unbind: () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
      }
    };

    if (binding.mode === TWO_WAY || binding instanceof Listener) {
      info.interceptUpdateSource = intercept;
    } else {
      info.interceptUpdateTarget = intercept;
    }

    return info;
  }
}

export class DebounceBindingBehavior {
  connect(binding, source, timeout = 200) {
    var timeoutId = null, value, intercept, info;
    intercept = updateTargetFn => {
      return newValue => {
        value = newValue;
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          updateTargetFn(value);
        }, timeout);
      };
    };

    info = {
      unbind: () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
      }
    };

    if (binding.mode === TWO_WAY || binding instanceof Listener) {
      info.interceptUpdateSource = intercept;
    } else {
      info.interceptUpdateTarget = intercept;
    }

    return info;
  }
}

export class OneTimeBindingBehavior {
  connect(binding) {
    binding.mode = ONE_TIME;
  }
}

export class OneWayBindingBehavior {
  connect(binding) {
    binding.mode = ONE_WAY;
  }
}

export class TwoWayBindingBehavior {
  connect(binding) {
    binding.mode = TWO_WAY;
  }
}

@inject(BindingSignaler)
export class SignalBindingBehavior {
  constructor(signaler) {
    this.signaler = signaler;
  }

  connect(binding, source, name) {
    var signaler = this.signaler;
    signaler.registerBinding(binding, source, name);
    return {
      unbind: () => {
        signaler.unregisterBinding(binding);
      }
    }
  }
}
