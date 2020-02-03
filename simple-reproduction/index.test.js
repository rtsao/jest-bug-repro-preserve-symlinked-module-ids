const id1 = require("needs-preserved-id");
const id2 = require("has-browser-field");

test("module should have reference equality", () => {
  expect(id1).toBe(id2);
});
