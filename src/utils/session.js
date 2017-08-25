export function headers() {
  let headers = {
    'Content-Type': 'application/json',
  }

  if (localStorage.jwt) {
    Object.assign(headers, {
      'Authorization': `Bearer ${localStorage.jwt}`,
    });
  }

  return headers;
}

export function requestOptions(options = {}) {
  return {...options, headers: headers()};
}
