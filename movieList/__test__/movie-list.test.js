const { Builder, Capabilities, By } = require("selenium-webdriver");
require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => driver.get("http://127.0.0.1:5500/movieList/index.html"));

afterAll(async () => await driver.quit);

test("add a movie", async () => {
  const input = await driver.findElement(By.xpath("//input"));

  const searchTerm = "Tenet";

  await input.sendKeys(searchTerm);
  const button = await driver.findElement(By.css("button"));

  await button.click();

  const result = await driver.findElement(By.xpath("//li/span")).getText();

  expect(result).toBe(searchTerm);

  await driver.sleep(3000);

  const deleteButton = await driver.findElement(By.id(`${searchTerm}`));

  await deleteButton.click();
});
