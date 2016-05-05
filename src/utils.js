import React from 'react';

export const findAllByType = (children, type) => {
  const result = [];
  const targetType = type && (type.displayName || type.name);

  React.Children.forEach(children, child => {
    if (child && child.type && (child.type.displayName || child.type.name) === targetType) {
      result.push(child);
    }
  });

  return result;
};

export const isObject = (value) => {
  const type = typeof value;

  return !!value && (type === 'object' || type === 'function');
};

export const isFunction = (value) => {
  const tag = isObject(value) ? Object.prototype.toString.call(value) : '';

  return tag === '[object Function]' || tag === '[object GeneratorFunction]';
};
