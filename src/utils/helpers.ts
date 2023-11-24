export const catchAsync = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export const trimObject = (obj, emptyValues = [null, undefined, '']) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (!emptyValues.includes(value)) {
      result[key] = value;
    }
  }

  return result;
};

export const msleep = (msecs: number) => {
  return new Promise((resolve) => setTimeout(resolve, msecs));
};
