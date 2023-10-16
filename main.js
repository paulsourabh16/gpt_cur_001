var ajaxCall = (key, prompt) => {
  const data = {
        model: "text-embedding-ada-002",
        input: prompt,
        deployment: "text-embedding-ada",
        chunk_size: 1
        // max_tokens: 1024,
        // n: 1,
        // temperature: 0.5,
      };
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "https://api.openai.com/v1/embeddings",
      dataType: "json",
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
        return(response.data[0].embedding);
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
