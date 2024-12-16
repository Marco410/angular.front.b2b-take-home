function format(object: Record<string, any>) {
  let str = '?';
  for (const key in object) {
    if (object[key] || object[key] === 0) {
      let value = object[key];
      if (value instanceof Array) {
        if (value.length > 0 && value.every((val) => val)) {
          value = value.join(',');
          str += '&' + key + '=' + encodeURIComponent(value);
        }
      } else if (value || value === 0) {
        str += '&' + key + '=' + encodeURIComponent(value);
      }
    }
  }
  return str;
}

export default format;
