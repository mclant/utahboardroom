export function getRequest({ url }) {
  return fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        const resp = await response.json()
        throw new Error(resp?.message)
      }
      return response.json()
    })
    .then((response) => {
      if (response.status === "error") {
      } else {
        return response
      }
    })
}

export function postRequest({ url, body }) {
  return fetch(url, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      if (!response.ok) {
        const resp = await response
        throw new Error(resp?.message)
      }
      return response
    })
    .then((response) => {
      if (response.status === "error") {
      } else {
        return response
      }
    })
}

export function postRequestJson({ url, body }) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      if (!response.ok) {
        const resp = await response
        throw new Error(resp?.message)
      }
      return response
    })
    .then((response) => {
      if (response.status === "error") {
      } else {
        return response
      }
    })
}
