var ajaxCall = (key, prompt) => {
  const data = {
        prompt: prompt,
        max_tokens: 40,
      };
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "https://api.openai.com/v1/engines/davinci-codex/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      data: JSON.stringify(data),
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};

// const url = "https://api.openai.com/v1";

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(apiKey, prompt) {
      const { response } = await ajaxCall(
        apiKey,
        prompt
      );
        return(response.choices[0].text);
      // return apiKey;
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();