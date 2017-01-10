/* eslint-disable import/prefer-default-export */

const port = '80';
const { protocol, hostname } = window.location;
const customHost = typeof CUSTOMAPIHOST !== 'undefined' && CUSTOMAPIHOST;
const apiHost = customHost || `${protocol}//${hostname}`;

export const apiUrl = `${apiHost}:${port}/api`;
