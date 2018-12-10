import CliInitializer from './Initializer';
import Cli from './Cli';

export default {
  __init__: [ 'cliInitializer' ],
  cli: [ 'type', Cli ],
  cliInitializer: [ 'type', CliInitializer ]
};