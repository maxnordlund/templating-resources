import {Compose} from './compose';
import {If} from './if';
import {With} from './with';
import {Repeat} from './repeat';
import {Show} from './show';
import {GlobalBehavior} from './global-behavior';
import {SanitizeHtmlValueConverter} from './sanitize-html';
import {
  ThrottleBindingBehavior,
  DebounceBindingBehavior,
  OneWayBindingBehavior,
  TwoWayBindingBehavior,
  OneTimeBindingBehavior,
  SignalBindingBehavior
} from './binding-behaviors';
import {BindingSignaler} from './binding-signaler';

function install(aurelia){
  aurelia.globalizeResources(
    './compose',
    './if',
    './with',
    './repeat',
    './show',
    './global-behavior',
    './sanitize-html',
    './binding-behaviors'
  );
}

export {
  Compose,
  If,
  With,
  Repeat,
  Show,
  SanitizeHtmlValueConverter,
  GlobalBehavior,
  ThrottleBindingBehavior,
  DebounceBindingBehavior,
  OneWayBindingBehavior,
  TwoWayBindingBehavior,
  OneTimeBindingBehavior,
  SignalBindingBehavior,
  BindingSignaler,
  install
};
