const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
} = require("../index");


// reset the DOM before every test
beforeEach(() => {
  document.body.innerHTML = `
    <div id="container"></div>
    <div id="dynamic-content"></div>
    <div id="element-to-remove" id="removable"></div>
    <form id="user-form">
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
    <div id="error-message" class="hidden"></div>
  `;
});

describe("addElementToDOM", () => {

  test("adds content to the correct DOM element", () => {
    // call the function with our container's id and some content
    addElementToDOM("container", "<p>Hello World</p>");

    const container = document.getElementById("container");

    expect(container.innerHTML).toContain("Hello World");
  });

  test("does nothing if the container id does not exist", () => {
    // Should not throw, just silently return because of the guard clause
    expect(() => addElementToDOM("non-existent", "content")).not.toThrow();
  });

});


describe("removeElementFromDOM", () => {

  test("removes an existing element from the DOM", () => {
    // confirm the element exists before removing it
    expect(document.getElementById("element-to-remove")).not.toBeNull();

    // Remove it
    removeElementFromDOM("element-to-remove");

    expect(document.getElementById("element-to-remove")).toBeNull();
  });

  test("does nothing if the element does not exist", () => {
    // should not throw an error for a missing id
    expect(() => removeElementFromDOM("ghost-element")).not.toThrow();
  });

});


describe("simulateClick", () => {

  test("updates the DOM container with the expected content", () => {
    // simulateClick calls addElementToDOM internally
    simulateClick("dynamic-content", "Button Clicked!");

    const dynamicContent = document.getElementById("dynamic-content");

    expect(dynamicContent.innerHTML).toContain("Button Clicked!");
  });

});

describe("handleFormSubmit", () => {

  test("updates the page when the form input contains valid text", () => {
    const input = document.querySelector("#user-form input");
    input.value = "My new task";

    handleFormSubmit("user-form", "dynamic-content");

    const container = document.getElementById("dynamic-content");
    const errorMessage = document.getElementById("error-message");

    expect(container.innerHTML).toBe("My new task");

    expect(errorMessage.textContent).toBe("");
    expect(errorMessage.classList.contains("hidden")).toBe(true);
  });


  test("displays error message 'Input cannot be empty' when input is empty", () => {
    // leave the input empty (default value is already "")
    const input = document.querySelector("#user-form input");
    input.value = "";

    handleFormSubmit("user-form", "dynamic-content");

    const errorMessage = document.getElementById("error-message");

    // error message should be visible with the correct text
    expect(errorMessage.textContent).toBe("Input cannot be empty");

    expect(errorMessage.classList.contains("hidden")).toBe(false);
  });

});