import devConfig from './webpack.config.dev';
import prodConfig from './webpack.config.prod';

export default (env, argv) => { //https://webpack.js.org/configuration/configuration-types/#exporting-a-function
  //console.log(env);
  //console.log(argv);
  const isProduction = (env && env.prod === true) ? true : false;
  const config = isProduction ? prodConfig : devConfig;
  return config;
};
