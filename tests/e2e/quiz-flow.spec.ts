import { test, expect } from "@playwright/test";

test.describe("Quiz flow — Trilha Iniciante", () => {
  test("completes full quiz flow from home to result", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Claude Code Quiz/i })).toBeVisible();
    await expect(page.getByText("Iniciante")).toBeVisible();
    await expect(page.getByText("Intermediário")).toBeVisible();
    await expect(page.getByText("Avançado")).toBeVisible();

    await page.getByRole("button", { name: /Jogar trilha Iniciante/i }).click();

    await expect(page.url()).toContain("/quiz/iniciante");

    for (let i = 0; i < 10; i++) {
      await expect(page.getByText(`Pergunta ${i + 1}`)).toBeVisible();
      await page.getByRole("button", { name: /Verdadeiro/i }).click();
      await expect(page.getByRole("status")).toBeVisible();
      await page.getByRole("button", { name: /Próxima|Ver resultado/i }).click();
    }

    await expect(page.getByText(/100|Trilha Iniciante/i)).toBeVisible();
    await expect(page.getByText(/Compartilhar resultado/i)).toBeVisible();
  });

  test("keyboard navigation works", async ({ page }) => {
    await page.goto("/quiz/iniciante");
    await page.waitForSelector("text=Pergunta 1");

    await page.keyboard.press("v");
    await expect(page.getByRole("status")).toBeVisible();

    await page.keyboard.press("Enter");
    await page.waitForSelector("text=Pergunta 2");
  });

  test("resultado page renders from URL params", async ({ page }) => {
    await page.goto("/resultado?track=avancado&score=80&time=120000");

    await expect(page.getByText("80")).toBeVisible();
    await expect(page.getByText(/Avançado/i)).toBeVisible();
    await expect(page.getByText(/Compartilhar/i)).toBeVisible();
  });
});
