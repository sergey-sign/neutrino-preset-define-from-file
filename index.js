const { DefinePlugin } = require('webpack');
const path = require('path');

const defaultOptions = {
  fileName: '',
  contentName: '',
  required: false,
}
const pluginName = 'define';

module.exports = ({ config }, rawOptions={}) => {
  const options = Object.assign({}, defaultOptions, rawOptions);
  const filePath = path.resolve(process.cwd(), options.fileName);

  let content = {};
  try{
    const data = require(filePath);
    Object.entries(data).forEach(([key, value]) =>
      content[key] = JSON.stringify(value));
  }
  catch(e){
    if(options.required)
      throw e
    else
      console.error(`${pluginName}:`, e.message);
  }

  return config
  .plugin(pluginName)
  .use(DefinePlugin, [options.contentName ? {[options.contentName]: content} : content])
}
