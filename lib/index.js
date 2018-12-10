import CliInitializer from './initializer';
import Cli from './Cli';

export default {
  __init__: [ 'cliInitializer' ],
  cli: [ 'type', Cli ],
  cliInitializer: [ 'type', CliInitializer ]
};